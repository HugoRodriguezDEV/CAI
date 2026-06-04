import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, '../../templates');

type Tool = 'claude' | 'gemini';

export async function initCommand(tool: Tool, cwd: string) {
  const templateDir = path.join(TEMPLATES_DIR, tool);

  await ensureTemplateExists(templateDir, tool);

  if (tool === 'claude') {
    await initClaude(templateDir, cwd);
  } else {
    await initGemini(templateDir, cwd);
  }
}

async function initClaude(templateDir: string, cwd: string) {
  const claudeDir = path.join(cwd, '.claude');
  const commandsDir = path.join(claudeDir, 'commands');

  await fs.mkdir(commandsDir, { recursive: true });

  const claudeMdSrc = path.join(templateDir, 'CLAUDE.md');
  const claudeMdDest = path.join(cwd, 'CLAUDE.md');
  await copyIfNotExists(claudeMdSrc, claudeMdDest, 'CLAUDE.md');

  const skillsDir = path.join(templateDir, 'skills');
  const skills = await safeReadDir(skillsDir);

  for (const skill of skills) {
    const src = path.join(skillsDir, skill);
    const dest = path.join(commandsDir, skill);
    await copyIfNotExists(src, dest, `.claude/commands/${skill}`);
  }

  console.log(`\nClaude initialized in ${cwd}`);
}

async function initGemini(templateDir: string, cwd: string) {
  const geminiMdSrc = path.join(templateDir, 'GEMINI.md');
  const geminiMdDest = path.join(cwd, 'GEMINI.md');
  await copyIfNotExists(geminiMdSrc, geminiMdDest, 'GEMINI.md');

  console.log(`\nGemini initialized in ${cwd}`);
}

async function copyIfNotExists(src: string, dest: string, label: string) {
  try {
    await fs.access(dest);
    console.log(`  skip  ${label} (already exists)`);
  } catch {
    await fs.copyFile(src, dest);
    console.log(`  add   ${label}`);
  }
}

async function safeReadDir(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

async function ensureTemplateExists(templateDir: string, tool: string) {
  try {
    await fs.access(templateDir);
  } catch {
    console.error(`No template found for "${tool}"`);
    process.exit(1);
  }
}
