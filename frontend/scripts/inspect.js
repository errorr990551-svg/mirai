import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./src/data/cityPages.json', 'utf8'));
console.log('Total pages:', pages.length);

const tn = pages.filter(p => p.state && p.state.toLowerCase().includes('tamil'));
console.log('\n--- TAMIL NADU ---');
tn.forEach(p => console.log(`${p.city} | ${p.slug} | detailed: ${!!p.hasDetailedBlueprint}`));

const mh = pages.filter(p => p.state && p.state.toLowerCase().includes('maharashtra'));
console.log('\n--- MAHARASHTRA ---');
mh.forEach(p => console.log(`${p.city} | ${p.slug} | detailed: ${!!p.hasDetailedBlueprint}`));
