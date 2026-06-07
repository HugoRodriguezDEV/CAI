import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, '../../templates');

type Tool = 'claude' | 'gemini';
type ResourceType = 'skill' | 'agent';

export async function addCommand(tool: Tool, type: ResourceType, name: string, cwd: string) {
  const baseDir = path.join(TEMPLATES_DIR, type === 'skill' ? 'skills' : 'agents');
  
  // 1. Search for the folder
  let srcFolder: string | null = null;
  if (name.includes('/') || name.includes('\\')) {
    // Exact relative path
    const targetPath = path.join(baseDir, name);
    try {
      const stats = await fs.stat(targetPath);
      if (stats.isDirectory()) {
        srcFolder = targetPath;
      }
    } catch {
      srcFolder = null;
    }
  } else {
    // Recursive search by folder name
    srcFolder = await findFolderRecursively(baseDir, name);
  }

  if (!srcFolder) {
    const available = await listResources(type);
    console.error(`\nError: ${type === 'skill' ? 'Skill' : 'Agent'} "${name}" not found in templates.`);
    if (available.length > 0) {
      console.log(`Available ${type === 'skill' ? 'skills' : 'agents'}:`);
      for (const res of available) {
        console.log(`  ${res}`);
      }
    }
    process.exit(1);
  }

  const folderName = path.basename(srcFolder);
  const destFolder = path.join(cwd, `.${tool}`, type === 'skill' ? 'skills' : 'agents', folderName);

  // Parse skill description from SKILL.md before copy
  let description = 'Custom skill';
  if (type === 'skill') {
    const skillMdPath = path.join(srcFolder, 'SKILL.md');
    try {
      const skillContent = await fs.readFile(skillMdPath, 'utf-8');
      const meta = parseFrontmatter(skillContent);
      if (meta.description) {
        description = meta.description;
      }
    } catch {
      // Fallback
    }
  }

  console.log(`\nAdding ${type} "${folderName}" to ${tool}...`);
  try {
    await copyDirRecursively(srcFolder, destFolder);
    console.log(`Successfully added ${type} to .${tool}/${type === 'skill' ? 'skills' : 'agents'}/${folderName}`);
    
    if (type === 'skill') {
      await registerSkillInConfig(cwd, tool, folderName, description);
    }
  } catch (err: any) {
    console.error(`Error copying folder: ${err.message}`);
    process.exit(1);
  }
}

async function findFolderRecursively(dir: string, targetName: string): Promise<string | null> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === targetName) {
          return path.join(dir, entry.name);
        }
        const nested = await findFolderRecursively(path.join(dir, entry.name), targetName);
        if (nested) return nested;
      }
    }
  } catch {
    return null;
  }
  return null;
}

async function copyDirRecursively(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursively(srcPath, destPath);
    } else {
      try {
        await fs.access(destPath);
        console.log(`  skip  ${entry.name} (already exists)`);
      } catch {
        await fs.copyFile(srcPath, destPath);
        console.log(`  add   ${entry.name}`);
      }
    }
  }
}

export async function listResources(type: ResourceType): Promise<string[]> {
  const baseDir = path.join(TEMPLATES_DIR, type === 'skill' ? 'skills' : 'agents');
  try {
    return await getResources(baseDir, '');
  } catch {
    return [];
  }
}

async function getResources(baseDir: string, relativePath: string): Promise<string[]> {
  const currentDir = path.join(baseDir, relativePath);
  let entries: any[] = [];
  try {
    entries = await fs.readdir(currentDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const hasSkillMd = entries.some(e => e.isFile() && e.name.toLowerCase() === 'skill.md');
  const hasSubdirs = entries.some(e => e.isDirectory());

  if (hasSkillMd || (!hasSubdirs && entries.length > 0)) {
    return [relativePath];
  }

  let resources: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      const subResources = await getResources(baseDir, subRelative);
      resources = resources.concat(subResources);
    }
  }
  return resources;
}

function parseFrontmatter(content: string): { name?: string; description?: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const result: Record<string, string> = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim().toLowerCase();
      const value = line.substring(colonIdx + 1).trim();
      result[key] = value;
    }
  }
  return result;
}

async function registerSkillInConfig(cwd: string, tool: Tool, skillName: string, description: string) {
  const configFilename = tool === 'claude' ? 'CLAUDE.md' : 'GEMINI.md';
  const configPath = path.join(cwd, configFilename);

  let content = '';
  try {
    content = await fs.readFile(configPath, 'utf-8');
  } catch {
    // If the config file doesn't exist, we don't modify it
    return;
  }

  const skillPath = `.${tool}/skills/${skillName}/SKILL.md`;
  const skillEntry = `- **${skillName}**: ${description} (Uso: [SKILL.md](${skillPath}))`;

  // Check if it already contains reference to this skill
  if (content.includes(skillPath) || content.includes(`skills/${skillName}`)) {
    return;
  }

  const skillsHeaderRegex = /#\s+Skills\b/i;
  if (skillsHeaderRegex.test(content)) {
    // Insert under # Skills section
    const lines = content.split('\n');
    let headerIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/#\s+Skills\b/i.test(lines[i])) {
        headerIdx = i;
        break;
      }
    }
    
    // Find the end of the Skills section (next header or end of file)
    let insertIdx = lines.length;
    for (let i = headerIdx + 1; i < lines.length; i++) {
      if (lines[i].trim().startsWith('#')) {
        insertIdx = i;
        break;
      }
    }
    
    lines.splice(insertIdx, 0, skillEntry);
    content = lines.join('\n');
  } else {
    // Append a new "# Skills" section
    content = content.trimEnd() + `\n\n# Skills\n\n${skillEntry}\n`;
  }

  await fs.writeFile(configPath, content, 'utf-8');
  console.log(`  update ${configFilename} (registered skill "${skillName}")`);
}
