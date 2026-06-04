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
    .description('Inicializa CLAUDE.md y skills en el proyecto actual (claude | gemini)')
    .action(async (tool) => {
    const valid = ['claude', 'gemini'];
    if (!valid.includes(tool)) {
        console.error(`Tool "${tool}" not supported. Use: ${valid.join(', ')}`);
        process.exit(1);
    }
    await initCommand(tool, process.cwd());
});
program
    .command('add <type> <name>')
    .description('Agrega un recurso individual al proyecto (tipo: skill)')
    .action(async (type, name) => {
    await addCommand(type, name, process.cwd());
});
program
    .command('list <type>')
    .description('Lista recursos disponibles (tipo: skills)')
    .action(async (type) => {
    await listCommand(type);
});
program.parse(process.argv);
