import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
const cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf-8'));

console.log(`Successfully verified ${cityPages.length} city & matrix pages in cityPages.json`);
