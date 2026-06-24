import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../Mirai_Technologies_100_City_SEO_Pack.xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets['🌆 City Pages Content'];
const data = xlsx.utils.sheet_to_json(sheet);

console.log('Total rows:', data.length);
const summary = data.map((row, index) => ({
  index: index + 1,
  city: row['City'],
  state: row['State'],
  slug: row['Page URL Slug']
}));

console.log(JSON.stringify(summary.slice(0, 15), null, 2));
console.log('...');
console.log(JSON.stringify(summary.slice(-5), null, 2));
