#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('cai')
  .description('CLI para inicializar skills, templates y configuraciones de IA')
  .version('1.0.0');

program
  .command('init <tool>')
  .description('Inicializa CLAUDE.md / GEMINI.md y sus carpetas correspondientes (claude | gemini)')
  .action(async (tool: string) => {
    const valid = ['claude', 'gemini'];
    if (!valid.includes(tool)) {
      console.error(`Tool "${tool}" not supported. Use: ${valid.join(', ')}`);
      process.exit(1);
    }
    await initCommand(tool as 'claude' | 'gemini', process.cwd());
  });

program
  .command('add <tool> <type> <name>')
  .description('Agrega un recurso individual al proyecto (tool: claude|gemini, type: skill|agent, name: nombre)')
  .action(async (tool: string, type: string, name: string) => {
    const validTools = ['claude', 'gemini'];
    if (!validTools.includes(tool)) {
      console.error(`Tool "${tool}" not supported. Use: ${validTools.join(', ')}`);
      process.exit(1);
    }
    const validTypes = ['skill', 'agent'];
    if (!validTypes.includes(type)) {
      console.error(`Type "${type}" not supported. Use: ${validTypes.join(', ')}`);
      process.exit(1);
    }
    await addCommand(tool as 'claude' | 'gemini', type as 'skill' | 'agent', name, process.cwd());
  });

program
  .command('list <type>')
  .description('Lista recursos disponibles (skills | agents)')
  .action(async (type: string) => {
    const validTypes = ['skills', 'agents'];
    if (!validTypes.includes(type)) {
      console.error(`Type "${type}" not supported. Use: ${validTypes.join(', ')}`);
      process.exit(1);
    }
    await listCommand(type as 'skills' | 'agents');
  });

program.parse(process.argv);
