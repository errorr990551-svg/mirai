import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../Mirai_Technologies_100_City_SEO_Pack.xlsx');
const workbook = xlsx.readFile(filePath);

// Read City Pages Content
const contentSheet = workbook.Sheets['🌆 City Pages Content'];
const contentData = xlsx.utils.sheet_to_json(contentSheet);

// Read Schema JSON-LD
const schemaSheet = workbook.Sheets['📐 Schema JSON-LD'];
const schemaData = xlsx.utils.sheet_to_json(schemaSheet);

// Map schema by City name
const schemaByCity = {};
schemaData.forEach(row => {
  const city = String(row['City'] || '').trim().toLowerCase();
  const rawSchema = row['Complete Schema JSON-LD (paste in <head> of city page)'];
  if (city && rawSchema) {
    // Extract JSON between <script> tags if it contains them
    let jsonStr = rawSchema.trim();
    if (jsonStr.includes('<script')) {
      const match = jsonStr.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (match && match[1]) {
        jsonStr = match[1].trim();
      }
    }
    try {
      schemaByCity[city] = JSON.parse(jsonStr);
    } catch (e) {
      console.warn(`Could not parse JSON schema for city: ${row['City']}. Storing as raw string. Error: ${e.message}`);
      schemaByCity[city] = rawSchema;
    }
  }
});

// Compile final list
const compiledPages = contentData.map(row => {
  const city = String(row['City'] || '').trim();
  const cityKey = city.toLowerCase();
  
  // Extract and clean fields
  const p = {
    sNo: row['S.No'],
    city: city,
    state: String(row['State'] || '').trim(),
    slug: String(row['Page URL Slug'] || '').trim(),
    metaTitle: String(row['Meta Title (≤60 chars)'] || '').trim(),
    metaDescription: String(row['Meta Description (≤160 chars)'] || '').trim(),
    h1: String(row['H1 Tag'] || '').trim(),
    h2s: String(row['H2 Tags (pipe-separated)'] || '').trim().split('|').map(s => s.trim()).filter(Boolean),
    primaryKeyword: String(row['Primary Keyword'] || '').trim(),
    secondaryKeywords: String(row['Secondary Keywords'] || '').trim(),
    targetIndustries: String(row['Target Industries in City'] || '').trim(),
    heroContent: String(row['Hero Section Content (2-3 sentences)'] || '').trim(),
    introduction: String(row['Introduction Paragraph (full ~150 words)'] || '').trim(),
    whyMirai: String(row['Why Mirai Technologies Section (~150 words)'] || '').trim(),
    productCategories: String(row['Product Categories Section (~200 words)'] || '').trim(),
    industriesWeServe: String(row['Industries We Serve in [City] (~150 words)'] || '').trim(),
    whyAuthorisedDistributor: String(row['Why Authorised Distributor Matters (~120 words)'] || '').trim(),
    technicalSupport: String(row['Technical Procurement Support (~100 words)'] || '').trim(),
    ctaText: String(row['CTA Section Text'] || '').trim(),
    footerGeoText: String(row['Page Footer Geo Text'] || '').trim(),
    canonicalUrl: String(row['Canonical URL'] || '').trim(),
    ogTitle: String(row['OG Title'] || '').trim(),
    ogDescription: String(row['OG Description'] || '').trim(),
    robotsMeta: String(row['Robots Meta'] || 'index, follow').trim(),
    
    // Image alts
    altHero: String(row['Alt Text – Hero Image'] || '').trim(),
    altProduct1: String(row['Alt Text – Product Image 1'] || '').trim(),
    altProduct2: String(row['Alt Text – Product Image 2'] || '').trim(),
    altProduct3: String(row['Alt Text – Product Image 3'] || '').trim(),
    altProduct4: String(row['Alt Text – Product Image 4'] || '').trim(),
    
    // Breadcrumb
    breadcrumbText: String(row['Breadcrumb Text'] || '').trim(),
    
    // FAQs
    faqs: [
      { q: row['FAQ 1 Q'], a: row['FAQ 1 A'] },
      { q: row['FAQ 2 Q'], a: row['FAQ 2 A'] },
      { q: row['FAQ 3 Q'], a: row['FAQ 3 A'] },
      { q: row['FAQ 4 Q'], a: row['FAQ 4 A'] },
      { q: row['FAQ 5 Q'], a: row['FAQ 5 A'] }
    ].filter(faq => faq.q && faq.a).map(faq => ({ q: String(faq.q).trim(), a: String(faq.a).trim() })),
    
    // Internal Links and schema
    internalLinks: String(row['Internal Links (anchor | URL)'] || '').trim(),
    schemaTypeFlags: String(row['Schema Type Flags'] || '').trim(),
    schema: schemaByCity[cityKey] || null
  };
  
  return p;
});

const outputPath = path.join(__dirname, '../src/data/cityPages.json');
fs.writeFileSync(outputPath, JSON.stringify(compiledPages, null, 2), 'utf-8');
console.log(`Successfully compiled ${compiledPages.length} city pages into ${outputPath}`);
