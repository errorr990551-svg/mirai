import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/amity/OneDrive/Desktop/mirai/frontend';
const masterData = JSON.parse(fs.readFileSync(path.join(rootDir, 'extracted_products.json'), 'utf8'));

console.log('Total raw products in extracted_products.json:', masterData.length);

const targetParts = ['LM2596R5', 'LM2576ADJ', 'LM2596R5v2', 'L7824CV', 'CD4051BE', 'MB6S', '20D511K', 'CD4001BE', 'HEF4081BP', 'Si2302'];

targetParts.forEach(part => {
  const p = masterData.find(item => item['Part#'] === part);
  if (p) {
    console.log(`Part: ${part}`);
    console.log(` - Category in JSON: ${p['Category']}`);
    console.log(` - URL Slug in JSON: ${p['URL Slug']}`);
    console.log(` - Full Name: ${p['Full Name']}`);
  } else {
    console.log(`Part: ${part} - NOT FOUND in JSON`);
  }
});
