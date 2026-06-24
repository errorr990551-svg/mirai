import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../Mirai_Technologies_100_City_SEO_Pack.xlsx');
const workbook = xlsx.readFile(filePath);

for (const name of workbook.SheetNames) {
  const sheet = workbook.Sheets[name];
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log(`Sheet: "${name}" - Rows: ${data.length}`);
}
