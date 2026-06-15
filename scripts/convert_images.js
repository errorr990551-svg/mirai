import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

productImages.forEach(img => {
  let matchedProduct = null;
  const normalizedFile = img.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const p of sortedProducts) {
    const part = p['Part#'];
    const partLower = part.toLowerCase();
    const normalizedPart = partLower.replace(/[^a-z0-9]/g, '');
    
    // Check if the filename starts with the normalized part number, or contains it as a word
    if (normalizedFile.startsWith(normalizedPart) || img.toLowerCase().includes(partLower)) {
      matchedProduct = p;
      break;
    }
  }
  
  if (matchedProduct) {
    matchedImages.push({ file: img, product: matchedProduct });
  } else {
    unmatchedImages.push(img);
  }
});

console.log(`Total potential product images found: ${productImages.length}`);
console.log(`Matched images for conversion: ${matchedImages.length}`);

if (unmatchedImages.length > 0) {
  console.log(`Warning: Found ${unmatchedImages.length} unmatched images:`, unmatchedImages);
}

// Perform sequential conversion to avoid thread/file exhaustion
async function convertAll() {
  let successCount = 0;
  let errorCount = 0;
  
  for (const item of matchedImages) {
    const srcPath = path.join(publicDir, item.file);
    const destName = item.product['Hero Image Filename'];
    
    if (!destName) {
      console.log(`❌ No Hero Image Filename configured in database for part ${item.product['Part#']}`);
      errorCount++;
      continue;
    }
    
    const destPath = path.join(publicDir, destName);
    
    try {
      console.log(`🔄 Converting: "${item.file}" -> "${destName}"...`);
      
      // Convert to WebP format using sharp
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
        
      successCount++;
      
      // Clean up the original file if it has a different filename than the destination
      if (item.file !== destName) {
        fs.unlinkSync(srcPath);
        console.log(`  ✅ Successfully converted and removed original: "${item.file}"`);
      } else {
        console.log(`  ✅ Successfully processed (kept original since it is already webp and matches name)`);
      }
    } catch (err) {
      console.error(`  ❌ Error converting "${item.file}":`, err.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Conversion complete!`);
  console.log(`   Successfully converted: ${successCount}`);
  console.log(`   Failed: ${errorCount}`);
}

convertAll().catch(err => {
  console.error("Fatal error during conversion:", err);
  process.exit(1);
});
