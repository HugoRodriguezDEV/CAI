import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, '../../templates');

type ResourceType = 'skill';

export async function addCommand(type: ResourceType, name: string, cwd: string) {
  if (type === 'skill') {
    await addSkill(name, cwd);
  } else {
    console.error(`Unknown type "${type}". Available: skill`);
    process.exit(1);
  }
}

async function addSkill(name: string, cwd: string) {
  const skillsDir = path.join(TEMPLATES_DIR, 'claude', 'skills');
  const filename = name.endsWith('.md') ? name : `${name}.md`;
  const src = path.join(skillsDir, filename);

  try {
    await fs.access(src);
  } catch {
    const available = await listSkills();
    console.error(`Skill "${name}" not found.`);
    if (available.length > 0) {
      console.error(`Available: ${available.join(', ')}`);
    }
    process.exit(1);
  }

  const commandsDir = path.join(cwd, '.claude', 'commands');
  await fs.mkdir(commandsDir, { recursive: true });

  const dest = path.join(commandsDir, filename);
  try {
    await fs.access(dest);
    console.log(`  skip  .claude/commands/${filename} (already exists)`);
  } catch {
    await fs.copyFile(src, dest);
    console.log(`  add   .claude/commands/${filename}`);
  }
}

export async function listSkills(): Promise<string[]> {
  const skillsDir = path.join(TEMPLATES_DIR, 'claude', 'skills');
  try {
    const files = await fs.readdir(skillsDir);
    return files.filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));
  } catch {
    return [];
  }
}
