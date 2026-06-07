import { listResources } from './add.js';

export async function listCommand(type: 'skills' | 'agents') {
  const resourceType = type === 'skills' ? 'skill' : 'agent';
  const resources = await listResources(resourceType);
  
  if (resources.length === 0) {
    console.log(`No ${type} available.`);
    return;
  }
  
  console.log(`Available ${type}:`);
  for (const res of resources) {
    console.log(`  ${res}`);
  }
}
