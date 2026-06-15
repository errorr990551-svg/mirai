import fs from 'fs';
import path from 'path';

const ROOT = '.';
const publicDir = path.join(ROOT, 'public');
const jsonPath = path.join(ROOT, 'extracted_products.json');

const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const files = fs.readdirSync(publicDir);

const staticAssets = new Set([
  'about.jpeg', 'automotive.jpeg', 'banner.jpeg', 'bourns.png',
  'consumer electronics.jpeg', 'defense.jpeg', 'drone.jpeg',
  'emspcb.jpeg', 'favicon.svg', 'hornby.png', 'icons.svg',
  'iksemicon.jpeg', 'industrialautomation.jpeg', 'iot.jpeg',
  'medical.jpeg', 'microchip1.png', 'power.jpeg', 'robots.txt',
  'royalohm.jpeg', 'sitemap.xml', 'solar.jpeg', 'stmicro.png',
  'taejin.png', 'telecommunication.jpeg', 'texas instruments.jpeg',
  'ups.jpeg', 'utc.jpeg', 'walsin.jpg.jpeg'
]);

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

const productImages = files.filter(f => {
  const ext = path.extname(f).toLowerCase();
  if (!imageExtensions.has(ext)) return false;
  if (staticAssets.has(f.toLowerCase())) return false;
  if (f.toLowerCase().includes('whatsapp')) return false;
  return true;
});

// Sort parts by length descending to match longest parts first
const sortedProducts = [...products].sort((a, b) => b['Part#'].length - a['Part#'].length);

const matchedImages = [];
const unmatchedImages = [];
const matchedParts = new Set();

productImages.forEach(img => {
  let matchedPart = null;
  const normalizedFile = img.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const p of sortedProducts) {
    const part = p['Part#'];
    const partLower = part.toLowerCase();
    const normalizedPart = partLower.replace(/[^a-z0-9]/g, '');
    
    // Check if the filename starts with the normalized part number, or contains it as a word
    if (normalizedFile.startsWith(normalizedPart) || img.toLowerCase().includes(partLower)) {
      matchedPart = part;
      break;
    }
  }
  
  if (matchedPart) {
    matchedImages.push({ file: img, part: matchedPart });
    matchedParts.add(matchedPart.toLowerCase());
  } else {
    unmatchedImages.push(img);
  }
});

console.log(`Total potential product images: ${productImages.length}`);
console.log(`Matched images: ${matchedImages.length}`);
console.log(`Unmatched images: ${unmatchedImages.length}`);

matchedImages.forEach(m => {
  console.log(`  File: "${m.file}" -> Part: "${m.part}"`);
});

const missingParts = [];
products.forEach(p => {
  const part = p['Part#'].toLowerCase();
  if (!matchedParts.has(part)) {
    missingParts.push(p['Part#']);
  }
});

console.log(`\nProducts in JSON: ${products.length}`);
console.log(`Products without matched image: ${missingParts.length}`);
console.log('Missing parts:', missingParts);
