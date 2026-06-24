import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../Mirai_Technologies_100_City_SEO_Pack.xlsx');
const workbook = xlsx.readFile(filePath);
const schemaSheet = workbook.Sheets['📐 Schema JSON-LD'];
const schemaData = xlsx.utils.sheet_to_json(schemaSheet);

console.log('Schema rows:', schemaData.length);
if (schemaData.length > 0) {
  console.log('Keys:', Object.keys(schemaData[0]));
  console.log('Row 1:\n', schemaData[0]['Complete Schema JSON-LD (paste in <head> of city page)']);
}
