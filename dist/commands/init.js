import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, '../../templates');
export async function initCommand(tool, cwd) {
    const templateDir = path.join(TEMPLATES_DIR, tool);
    await ensureTemplateExists(templateDir, tool);
    if (tool === 'claude') {
        await initClaude(templateDir, cwd);
    }
    else {
        await initGemini(templateDir, cwd);
    }
}
async function initClaude(templateDir, cwd) {
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
async function initGemini(templateDir, cwd) {
    const geminiMdSrc = path.join(templateDir, 'GEMINI.md');
    const geminiMdDest = path.join(cwd, 'GEMINI.md');
    await copyIfNotExists(geminiMdSrc, geminiMdDest, 'GEMINI.md');
    console.log(`\nGemini initialized in ${cwd}`);
}
async function copyIfNotExists(src, dest, label) {
    try {
        await fs.access(dest);
        console.log(`  skip  ${label} (already exists)`);
    }
    catch {
        await fs.copyFile(src, dest);
        console.log(`  add   ${label}`);
    }
}
async function safeReadDir(dir) {
    try {
        return await fs.readdir(dir);
    }
    catch {
        return [];
    }
}
async function ensureTemplateExists(templateDir, tool) {
    try {
        await fs.access(templateDir);
    }
    catch {
        console.error(`No template found for "${tool}"`);
        process.exit(1);
    }
}
