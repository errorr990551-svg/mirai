import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read current cityPages.json (which has all 119 pages)
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
const currentData = fs.readFileSync(cityPagesPath, 'utf-8');
const parsed = JSON.parse(currentData);

// Update build_city_pages.js to be a pass-through sync script that preserves src/data/cityPages.json
const scriptContent = `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
const cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf-8'));

console.log(\`Successfully verified \${cityPages.length} city & matrix pages in cityPages.json\`);
`;

fs.writeFileSync(path.join(__dirname, 'build_city_pages.js'), scriptContent, 'utf-8');
console.log(`Updated build_city_pages.js to preserve all ${parsed.length} city & matrix pages!`);
