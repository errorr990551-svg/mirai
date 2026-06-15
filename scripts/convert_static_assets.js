import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';
const files = fs.readdirSync(publicDir);

const targetExtensions = new Set(['.png', '.jpg', '.jpeg']);

const toConvert = files.filter(f => {
  const ext = path.extname(f).toLowerCase();
  return targetExtensions.has(ext);
});

console.log(`Found ${toConvert.length} static assets in public/ to convert to WebP...`);

async function run() {
  let success = 0;
  let error = 0;
  
  for (const file of toConvert) {
    const srcPath = path.join(publicDir, file);
    
    // Determine the webp filename
    // e.g. "about.jpeg" -> "about.webp"
    // e.g. "Walsin.jpg.jpeg" -> "Walsin.webp"
    const nameWithoutExt = file.substring(0, file.lastIndexOf('.'));
    const finalName = nameWithoutExt.endsWith('.jpg') 
      ? nameWithoutExt.substring(0, nameWithoutExt.lastIndexOf('.')) + '.webp' 
      : nameWithoutExt + '.webp';
      
    const destPath = path.join(publicDir, finalName);
    
    try {
      console.log(`🔄 Converting: "${file}" -> "${finalName}"...`);
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
        
      success++;
      
      // Clean up original file
      fs.unlinkSync(srcPath);
      console.log(`  ✅ Converted and deleted original.`);
    } catch (err) {
      console.error(`  ❌ Error converting "${file}":`, err.message);
      error++;
    }
  }
  
  console.log(`\n🎉 Completed static asset conversion!`);
  console.log(`   Succeeded: ${success}`);
  console.log(`   Failed: ${error}`);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
