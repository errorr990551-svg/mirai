import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/amity/OneDrive/Desktop/mirai/frontend';
const masterData = JSON.parse(fs.readFileSync(path.join(rootDir, 'extracted_products.json'), 'utf8'));

const p1 = masterData.find(item => item['Part#'] === 'LM2596R5');
const p2 = masterData.find(item => item['Part#'] === 'LM2596R5v2');

console.log('--- LM2596R5 ---');
console.log(JSON.stringify(p1, null, 2));

console.log('\n--- LM2596R5v2 ---');
console.log(JSON.stringify(p2, null, 2));
