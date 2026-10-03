import fs from 'fs';

const content = fs.readFileSync('./scripts/update_tamil_nadu_cities.mjs', 'utf8');
const cityMatches = [...content.matchAll(/city:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Cities in update_tamil_nadu_cities.mjs:', cityMatches);
