/**
 * build_products.mjs
 * Run: node scripts/build_products.mjs
 * Generates src/data/products.js from extracted_products.json + Excel workbook
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── 1. Load source data ────────────────────────────────────────────────────
const masterData = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'extracted_products.json'), 'utf8')
);

const wb = XLSX.readFile(path.join(ROOT, 'Mirai_Technologies_SEO_Brief_v3_COMPLETE.xlsx'));
const pricesSheet   = XLSX.utils.sheet_to_json(wb.Sheets['💰 PRICES & STOCK']);
const keywordsSheet = XLSX.utils.sheet_to_json(wb.Sheets['🔑 KEYWORDS']);
const imagesSheet   = XLSX.utils.sheet_to_json(wb.Sheets['🖼️ IMAGE BRIEF']);
const categorySheet = XLSX.utils.sheet_to_json(wb.Sheets['🏷️ CATEGORY PAGES']);
const linkMapSheet  = XLSX.utils.sheet_to_json(wb.Sheets['🔗 LINK MAP']);

// ── 2. Build lookup maps ────────────────────────────────────────────────────
const linkMap = {};
linkMapSheet.forEach(r => {
  const from = r['From Page'];
  if (!linkMap[from]) linkMap[from] = [];
  linkMap[from].push({
    toPartNumber:    r['To Page'],
    anchorText:      r['Anchor Text'] || '',
    location:        r['Location on Page'] || '',
    type:            r['Link Type'] || '',
    priority:        r['Priority'] || '',
  });
});
const priceMap = {};
pricesSheet.forEach(r => {
  priceMap[r['Part#']] = {
    price:           r['Schema Price (numeric only)'] || null,
    priceDisplay:    r['IndiaMART Price'] || null,
    moq:             r['MOQ (pcs)'] || '10',
    stockStatus:     r['Stock Status'] || 'In Stock',
    whatsappUrl:     r['WhatsApp CTA URL'] || '',
    whatsappMsg:     r['WhatsApp Pre-filled Message'] || '',
    bulkNote:        r['Bulk Pricing Note'] || '',
    gstRate:         r['GST Rate'] || '18% GST applicable',
  };
});

const keywordMap = {};
keywordsSheet.forEach(r => {
  keywordMap[r['Part#']] = {
    primaryKeyword:    r['Primary Keyword'] || '',
    searchIntent:      r['Search Intent'] || '',
    lsiKeywords:       r['LSI Keywords'] || '',
    longTailVariants:  r['Long-Tail Variants'] || '',
    contentType:       r['Content Type'] || '',
  };
});

const imageMap = {};
imagesSheet.forEach(r => {
  const part = r['Part#'];
  if (!imageMap[part]) imageMap[part] = {};
  const type = r['Img#'] || '';
  if (type.includes('Hero'))    imageMap[part].hero    = r;
  if (type.includes('Pinout'))  imageMap[part].pinout  = r;
  if (type.includes('App'))     imageMap[part].appCircuit = r;
});

// ── 3. Category mappings from JSON Category → canonical slug ───────────────
const CATEGORY_SLUG_MAP = {
  'Integrated Circuit':   'integrated-circuit',
  'Integrated Circuits':  'integrated-circuit',
  'MOSFET Transistor':    'mosfet-transistor',
  'Transistor':           'transistor',
  'Microcontroller':      'microcontroller',
  'IC Chip':              'ic-chip',
  'Ic':                   'ic-chip',
  'Electronic Components':'electronic-components',
};

// Voltage regulator parts (from Transistor category in JSON, but belong to voltage-regulator)
const REGULATOR_PARTS = new Set(['LM2596R5', 'LM2576ADJ', 'LM2596R5v2', 'L7824CV']);

function getCategorySlug(product) {
  const part = product['Part#'];
  if (REGULATOR_PARTS.has(part)) return 'voltage-regulator';
  return CATEGORY_SLUG_MAP[product['Category']] || 'integrated-circuit';
}

// ── 4. Parse Key Specifications text into structured object ─────────────────
function parseKeySpecs(raw) {
  if (!raw) return {};
  const specs = {};
  raw.split('\n').forEach(line => {
    line = line.replace(/^•\s*/, '').trim();
    if (!line) return;
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      specs[key] = val;
    }
  });
  return specs;
}

// ── 5. Parse price ────────────────────────────────────────────────────────
function parsePrice(part) {
  const p = priceMap[part];
  if (!p) return null;
  const num = parseFloat(String(p.price).replace(/[^\d.]/g, ''));
  return isNaN(num) ? null : num;
}

// ── 6. Build products array ─────────────────────────────────────────────────
const products = masterData.map(raw => {
  const partNum = raw['Part#'];
  const price   = priceMap[partNum] || {};
  const kw      = keywordMap[partNum] || {};
  const imgs    = imageMap[partNum] || {};
  const catSlug = getCategorySlug(raw);

  // Use the URL Slug from the JSON data
  const urlSlug  = raw['URL Slug'] || `${catSlug}/${partNum.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const productId = urlSlug.split('/').pop();

  // Resolve links for this product
  const rawLinks = linkMap[partNum] || [];
  const resolvedLinks = rawLinks.map(l => {
    const targetProduct = masterData.find(p => p['Part#'] === l.toPartNumber);
    let toSlug = '';
    if (targetProduct) {
      const targetCatSlug = getCategorySlug(targetProduct);
      toSlug = targetProduct['URL Slug'] || `${targetCatSlug}/${l.toPartNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }
    return { ...l, toSlug };
  }).filter(l => l.toSlug);

  const alternativesLinks = resolvedLinks.filter(l => l.location === 'Alternatives table');
  const relatedLinks      = resolvedLinks.filter(l => l.location === 'Related Products' || l.location === 'See Also');
  const fbtLinks          = resolvedLinks.filter(l => l.location === 'Frequently Bought Together');

  return {
    id:             productId,
    partNumber:     partNum,
    fullSlug:       urlSlug,
    name:           raw['Full Name'] || partNum,
    h1:             raw['H1 Tag'] || raw['Full Name'],
    category:       catSlug,
    categoryLabel:  raw['Category'],
    brand:          raw['Brand'] || '',
    package:        raw['Package'] || '',
    pins:           raw['Pins'] || '',
    supplyVoltage:  raw['Supply Voltage'] || '',
    currentOutput:  raw['Current/Output'] || '',
    applications:   raw['Applications'] || '',
    alternatives:   raw['Alternatives'] || '',
    datasheetUrl:   raw['Datasheet URL'] || '',
    priority:       raw['Priority'] || 'Medium',
    // Description
    shortDescription: raw['Short Description (50-80 words)'] || '',
    keySpecsRaw:    raw['Key Specifications'] || '',
    specs:          parseKeySpecs(raw['Key Specifications']),
    // SEO
    metaTitle:       raw['Meta Title (≤60 chars)'] || '',
    metaDescription: raw['Meta Description (≤160 chars)'] || '',
    primaryKeyword:  raw['Primary Keyword'] || kw.primaryKeyword || '',
    lsiKeywords:     raw['LSI Keywords'] || kw.lsiKeywords || '',
    h2Tags:          raw['H2 Tags'] || '',
    // Pricing & Stock
    price:           parsePrice(partNum),
    priceDisplay:    price.priceDisplay || null,
    moq:             price.moq || '10',
    stockStatus:     price.stockStatus || 'In Stock',
    whatsappUrl:     price.whatsappUrl || `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(partNum)}`,
    whatsappMsg:     price.whatsappMsg || `Hi, I want to buy ${partNum}. Please share best price and availability.`,
    bulkNote:        price.bulkNote || '',
    gstRate:         price.gstRate || '18% GST applicable',
    // FAQs
    faqs: [
      { q: raw['FAQ Q1'] || '', a: raw['FAQ A1'] || '' },
      { q: raw['FAQ Q2'] || '', a: raw['FAQ A2'] || '' },
      { q: raw['FAQ Q3'] || '', a: raw['FAQ A3'] || '' },
    ].filter(faq => faq.q),
    // Images
    heroImage: {
      filename: raw['Hero Image Filename'] || '',
      alt:      raw['Hero Image Alt Text'] || '',
      title:    imgs.hero?.['Title Attribute'] || `Buy ${partNum} Online India`,
    },
    pinoutImage: {
      filename: raw['Pinout Image Filename'] || '',
      alt:      raw['Pinout Image Alt Text'] || '',
      title:    imgs.pinout?.['Title Attribute'] || `${partNum} Pinout Diagram`,
    },
    appCircuitImage: {
      filename: raw['App Circuit Image Filename'] || '',
      alt:      raw['App Circuit Image Alt Text'] || '',
      title:    imgs.appCircuit?.['Title Attribute'] || `${partNum} Application Circuit`,
    },
    alternativesLinks,
    relatedLinks,
    fbtLinks,
  };
});
const catRows = categorySheet.filter(r => typeof r['__EMPTY'] === 'number');

const categories = catRows
  .filter(r => {
    const name = r['CATEGORY PAGE SEO BRIEFS – 8 LISTING PAGES (NEW in v3 – was missing before)'];
    return name && name !== 'Homepage';
  })
  .map(r => {
    const name     = r['CATEGORY PAGE SEO BRIEFS – 8 LISTING PAGES (NEW in v3 – was missing before)'];
    const urlSlug  = (r['__EMPTY_1'] || '').replace(/^products\//, '').replace(/\/$/, '');

    const categoryLinkKeyMap = {
      'integrated-circuit': 'Category: Integrated Circuit',
      'mosfet-transistor':  'Category: MOSFET Transistor',
      'transistor':         'Category: Transistor',
      'microcontroller':    'Category: Microcontroller',
      'ic-chip':            'Category: IC Chip',
      'electronic-components': 'Category: Electronic Components',
      'voltage-regulator':  'Category: Voltage Regulator',
    };

    const catLinkKey = categoryLinkKeyMap[urlSlug] || `Category: ${name}`;
    const rawCatLinks = linkMap[catLinkKey] || [];
    const navigationLinks = rawCatLinks.map(l => {
      const targetProduct = masterData.find(p => p['Part#'] === l.toPartNumber);
      let toSlug = '';
      if (targetProduct) {
        const targetCatSlug = getCategorySlug(targetProduct);
        toSlug = targetProduct['URL Slug'] || `${targetCatSlug}/${l.toPartNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      }
      return { ...l, toSlug };
    }).filter(l => l.toSlug);

    return {
      id:              urlSlug,
      name,
      slug:            urlSlug,
      metaTitle:       r['__EMPTY_2'] || '',
      metaDescription: r['__EMPTY_3'] || '',
      h1:              r['__EMPTY_4'] || name,
      h2Tags:          r['__EMPTY_5'] || '',
      primaryKeyword:  r['__EMPTY_6'] || '',
      lsiKeywords:     r['__EMPTY_7'] || '',
      description:     r['__EMPTY_8'] || '',
      featuredProducts:(r['__EMPTY_9'] || '').split(',').map(s => s.split('₹')[0].trim()).filter(Boolean),
      filters:         r['__EMPTY_10'] || '',
      sortOptions:     r['__EMPTY_11'] || '',
      priority:        r['__EMPTY_15'] || 'Medium',
      navigationLinks,
    };
  });

// ── 8. Build a map of part → category for quick lookup ─────────────────────
// (Ensure MOSFET category id matches what we set above)
const MOSFET_CAT = categories.find(c => c.slug === 'mosfet-transistor');
if (MOSFET_CAT) {
  MOSFET_CAT.id = 'mosfet-transistor';
}

// ── 9. Write output file ───────────────────────────────────────────────────
const output = `// AUTO-GENERATED by scripts/build_products.mjs
// Do not edit manually – run: node scripts/build_products.mjs

export const categories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};

export const getProductById = (id) => products.find(p => p.id === id);

export const getProductBySlug = (slug) => products.find(p => p.fullSlug === slug || p.id === slug);

export const getProductsByCategory = (catSlug) =>
  products.filter(p => p.category === catSlug);

export const getProductsByPriority = (catSlug) =>
  getProductsByCategory(catSlug).sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return (order[a.priority] ?? 1) - (order[b.priority] ?? 1);
  });

export const getCategoryById = (id) => categories.find(c => c.id === id || c.slug === id);
`;

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'products.js'), output, 'utf8');

console.log(`✅  Generated src/data/products.js`);
console.log(`    Products: ${products.length}`);
console.log(`    Categories: ${categories.length}`);
console.log(`    Category slugs: ${categories.map(c => c.slug).join(', ')}`);
