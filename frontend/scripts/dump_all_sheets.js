import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const workbookPath = 'c:/Users/amity/OneDrive/Desktop/mirai/frontend/MiraiTech_SEO_Issues_Developer_Workbook.xlsx';
const outputPath = 'c:/Users/amity/.gemini/antigravity-ide/brain/7b573b91-4f07-48c3-880e-b63c0d3106c0/workbook_contents.md';

const workbook = xlsx.readFile(workbookPath);

let mdContent = `# MiraiTech SEO Issues Developer Workbook Dump\n\n`;

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });
  
  mdContent += `## Sheet: ${sheetName}\n\n`;
  if (data.length === 0) {
    mdContent += `*Empty sheet*\n\n`;
    continue;
  }
  
  const headers = Object.keys(data[0]);
  
  // Create markdown table header
  mdContent += `| ${headers.join(' | ')} |\n`;
  mdContent += `| ${headers.map(() => '---').join(' | ')} |\n`;
  
  for (const row of data) {
    const rowValues = headers.map(h => {
      let val = row[h];
      if (typeof val === 'string') {
        // Escape pipeline symbol for markdown tables
        val = val.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
      }
      return val;
    });
    mdContent += `| ${rowValues.join(' | ')} |\n`;
  }
  mdContent += `\n`;
}

fs.writeFileSync(outputPath, mdContent, 'utf-8');
console.log('Successfully wrote workbook dump to:', outputPath);
