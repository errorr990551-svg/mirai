import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = '.';
const publicDir = path.join(ROOT, 'public');
const jsonPath = path.join(ROOT, 'extracted_products.json');

const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const files = fs.readdirSync(publicDir);

const pngFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`Found ${pngFiles.length} PNG/JPG/JPEG files in public.`);

// Sort products by part number length descending to avoid substring matching issues
const sortedProducts = [...products].sort((a, b) => b['Part#'].length - a['Part#'].length);

async function convertAll() {
  let successCount = 0;
  let errorCount = 0;

  for (const file of pngFiles) {
    const normalizedFile = file.toLowerCase().replace(/[^a-z0-9]/g, '');
    let matchedProduct = null;

    for (const p of sortedProducts) {
      const part = p['Part#'];
      const partLower = part.toLowerCase();
      const normalizedPart = partLower.replace(/[^a-z0-9]/g, '');

      // Check if the filename starts with the normalized part number, or contains it as a word
      if (normalizedFile.startsWith(normalizedPart) || file.toLowerCase().includes(partLower)) {
        matchedProduct = p;
        break;
      }
    }

    if (matchedProduct) {
      const srcPath = path.join(publicDir, file);
      // The pinout filename is defined in the database
      const pinoutName = matchedProduct['Pinout Image Filename'] || (matchedProduct['Part#'].toLowerCase().replace(/[^a-z0-9]/g, '') + '-pinout-diagram.webp');
      const destPath = path.join(publicDir, pinoutName);

      try {
        console.log(`🔄 Converting: "${file}" -> "${pinoutName}"...`);
        
        await sharp(srcPath)
          .webp({ quality: 85 })
          .toFile(destPath);

        successCount++;
        
        // Remove original source file
        fs.unlinkSync(srcPath);
        console.log(`  ✅ Successfully converted and removed original: "${file}"`);
      } catch (err) {
        console.error(`  ❌ Error converting "${file}":`, err.message);
        errorCount++;
      }
    } else {
      console.log(`⚠️ Unmatched image: "${file}"`);
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
