import { listSkills } from './add.js';

export async function listCommand(type: string) {
  if (type === 'skills') {
    const skills = await listSkills();
    if (skills.length === 0) {
      console.log('No skills available.');
      return;
    }
    console.log('Available skills:');
    for (const skill of skills) {
      console.log(`  ${skill}`);
    }
  } else {
    console.error(`Unknown type "${type}". Available: skills`);
    process.exit(1);
  }
}
