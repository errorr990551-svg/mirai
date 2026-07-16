import xlsx from 'xlsx';
import path from 'path';

const filePath = 'c:/Users/amity/OneDrive/Desktop/mirai/frontend/MiraiTech_SEO_Issues_Developer_Workbook.xlsx';
const workbook = xlsx.readFile(filePath);

console.log('Sheet Names:', workbook.SheetNames);

for (const name of workbook.SheetNames) {
  const sheet = workbook.Sheets[name];
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log(`\n--- Sheet: "${name}" - Rows: ${data.length} ---`);
  if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    console.log('Sample Row 1:', JSON.stringify(data[0], null, 2));
    if (data.length > 1) {
      console.log('Sample Row 2:', JSON.stringify(data[1], null, 2));
    }
  }
}
