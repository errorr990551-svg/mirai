/**
 * build_products.mjs
 * Run: node scripts/build_products.mjs
 * Generates src/data/products.js from:
 * 1. extracted_products.json + Mirai_Technologies_SEO_Brief_v3_COMPLETE.xlsx (83 IC/semiconductors)
 * 2. mirai_content_batch2_capacitors_resistors.xlsx (384 SMD Capacitors + 612 Through-Hole Resistors)
 * 3. mirai_resistor_content_batch1.xlsx (714 SMD Resistors)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── 1. Helper Functions ──────────────────────────────────────────────────────

function parseAEOFAQ(faqStr) {
  if (!faqStr) return [];
  const parts = String(faqStr).split('|').map(s => s.trim()).filter(Boolean);
  const faqs = [];
  parts.forEach(p => {
    const qMatch = p.match(/Q:\s*(.*?)\s*A:\s*(.*)/i);
    if (qMatch) {
      faqs.push({ q: qMatch[1].trim(), a: qMatch[2].trim() });
    }
  });
  return faqs;
}

function cleanUrlSlug(rawSlug, defaultPrefix, sku) {
  if (rawSlug) {
    let slug = String(rawSlug).trim().replace(/^\/product\//, '').replace(/^\//, '');
    if (slug) return slug;
  }
  const cleanSku = String(sku).toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${defaultPrefix}/${cleanSku}`;
}

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

function truncateToWordBoundary(text, maxLen) {
  if (!text || text.length <= maxLen) return text || '';
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace).trim();
  }
  return truncated.trim();
}

function cleanMetaTitle(title, partNumber) {
  if (!title) return `${partNumber} — Buy Online India | Mirai Technologies`;
  if (title.includes('Rds') || title.includes('Rds(on') || title.includes('Rds(o') || title.includes('Rds(')) {
    const rdsIndex = title.search(/,\s*Rds/i);
    if (rdsIndex !== -1) {
      const prefix = title.substring(0, rdsIndex).trim();
      title = `${prefix} | Buy Online India`;
    }
  }
  if (title.length > 60) {
    title = truncateToWordBoundary(title, 60);
  }
  return title;
}

function cleanMetaDescription(desc, partNumber, specs) {
  if (!desc) return `Buy ${partNumber} online from Mirai Technologies Mumbai. Genuine components, low MOQs, and fast delivery in India. GST invoice available.`;
  
  let rdsSpec = '';
  for (const key of Object.keys(specs)) {
    if (key.toLowerCase().includes('rds(on)')) {
      rdsSpec = specs[key].split(' ')[0].trim();
      break;
    }
  }
  
  if (rdsSpec) {
    desc = desc.replace(/Rds\(on\)=.*?(\s*₹)/i, `Rds(on)=${rdsSpec}. $1`);
  }
  
  desc = desc.replace(/\.\./g, '.');
  desc = desc.replace(/,\s*\./g, '.');
  desc = desc.replace(/\s+/g, ' ').trim();
  
  if (desc.length > 160) {
    desc = truncateToWordBoundary(desc, 157) + '...';
  } else if (desc.length < 140) {
    const suffix = ' Pan-India delivery.';
    if (desc.length + suffix.length <= 160) {
      desc = desc + suffix;
    }
  }
  return desc;
}

function normalizeProductSlug(urlSlug, catSlug, partNum) {
  let slug = urlSlug || `${catSlug}/${partNum.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const productId = slug.split('/').pop();
  if (slug.startsWith('integrated-circuits/') || 
      slug.startsWith('ic-chip/') || 
      slug.startsWith('ic/') || 
      slug.startsWith('integrated-circuit/')) {
    slug = `integrated-circuit/${productId}`;
  }
  return slug;
}

// ── 2. Load Master Semiconductor Data ────────────────────────────────────────

const jsonPath = path.join(ROOT, 'extracted_products.json');
let masterData = [];
if (fs.existsSync(jsonPath)) {
  masterData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

const excelPath = path.join(ROOT, 'Mirai_Technologies_SEO_Brief_v3_COMPLETE.xlsx');
let priceMap = {};
let keywordMap = {};
let imageMap = {};
let linkMap = {};
let categorySheetData = [];

if (fs.existsSync(excelPath)) {
  const wb = XLSX.readFile(excelPath);
  const pricesSheet   = XLSX.utils.sheet_to_json(wb.Sheets['💰 PRICES & STOCK']);
  const keywordsSheet = XLSX.utils.sheet_to_json(wb.Sheets['🔑 KEYWORDS']);
  const imagesSheet   = XLSX.utils.sheet_to_json(wb.Sheets['🖼️ IMAGE BRIEF']);
  categorySheetData   = XLSX.utils.sheet_to_json(wb.Sheets['🏷️ CATEGORY PAGES']);
  const linkMapSheet  = XLSX.utils.sheet_to_json(wb.Sheets['🔗 LINK MAP']);

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

  keywordsSheet.forEach(r => {
    keywordMap[r['Part#']] = {
      primaryKeyword:    r['Primary Keyword'] || '',
      searchIntent:      r['Search Intent'] || '',
      lsiKeywords:       r['LSI Keywords'] || '',
      longTailVariants:  r['Long-Tail Variants'] || '',
      contentType:       r['Content Type'] || '',
    };
  });

  imagesSheet.forEach(r => {
    const part = r['Part#'];
    if (!imageMap[part]) imageMap[part] = {};
    const type = r['Img#'] || '';
    if (type.includes('Hero'))    imageMap[part].hero    = r;
    if (type.includes('Pinout'))  imageMap[part].pinout  = r;
    if (type.includes('App'))     imageMap[part].appCircuit = r;
  });
}

const CATEGORY_SLUG_MAP = {
  'Integrated Circuit':   'integrated-circuit',
  'Integrated Circuits':  'integrated-circuit',
  'MOSFET Transistor':    'mosfet-transistor',
  'Transistor':           'transistor',
  'Microcontroller':      'microcontroller',
  'IC Chip':              'integrated-circuit',
  'Ic':                   'integrated-circuit',
  'Electronic Components':'electronic-components',
};

const REGULATOR_PARTS = new Set(['LM2596R5', 'LM2576ADJ', 'LM2596R5v2', 'L7824CV']);

function getCategorySlug(product) {
  const part = product['Part#'];
  if (REGULATOR_PARTS.has(part)) return 'voltage-regulator';
  return CATEGORY_SLUG_MAP[product['Category']] || 'integrated-circuit';
}

function parsePrice(part) {
  const p = priceMap[part];
  if (!p) return null;
  const num = parseFloat(String(p.price).replace(/[^\d.]/g, ''));
  return isNaN(num) ? null : num;
}

// ── 3. Build Master Semiconductor Products ──────────────────────────────────

const masterProducts = masterData.map(raw => {
  const partNum = raw['Part#'];
  const price   = priceMap[partNum] || {};
  const kw      = keywordMap[partNum] || {};
  const imgs    = imageMap[partNum] || {};
  const catSlug = getCategorySlug(raw);

  const urlSlug   = normalizeProductSlug(raw['URL Slug'], catSlug, partNum);
  const productId = urlSlug.split('/').pop();

  const rawLinks = linkMap[partNum] || [];
  const resolvedLinks = rawLinks.map(l => {
    const targetProduct = masterData.find(p => p['Part#'] === l.toPartNumber);
    let toSlug = '';
    if (targetProduct) {
      const targetCatSlug = getCategorySlug(targetProduct);
      const targetSlug = targetProduct['URL Slug'] || `${targetCatSlug}/${l.toPartNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      toSlug = normalizeProductSlug(targetSlug, targetCatSlug, l.toPartNumber);
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
    categoryGroup:  'Semiconductors',
    brand:          raw['Brand'] || '',
    package:        raw['Package'] || '',
    pins:           raw['Pins'] || '',
    supplyVoltage:  raw['Supply Voltage'] || '',
    currentOutput:  raw['Current/Output'] || '',
    applications:   raw['Applications'] || '',
    alternatives:   raw['Alternatives'] || '',
    datasheetUrl:   raw['Datasheet URL'] || '',
    priority:       raw['Priority'] || 'Medium',
    shortDescription: raw['Short Description (50-80 words)'] || '',
    longDescription: raw['Long Description (SEO/GEO)'] || raw['Short Description (50-80 words)'] || '',
    keySpecsRaw:    raw['Key Specifications'] || '',
    specs:          parseKeySpecs(raw['Key Specifications']),
    metaTitle:       cleanMetaTitle(raw['Meta Title (≤60 chars)'] || '', partNum),
    metaDescription: cleanMetaDescription(raw['Meta Description (≤160 chars)'] || '', partNum, parseKeySpecs(raw['Key Specifications'])),
    primaryKeyword:  raw['Primary Keyword'] || kw.primaryKeyword || '',
    lsiKeywords:     raw['LSI Keywords'] || kw.lsiKeywords || '',
    h2Tags:          raw['H2 Tags'] || '',
    price:           parsePrice(partNum),
    priceDisplay:    price.priceDisplay || null,
    moq:             price.moq || '10',
    stockStatus:     price.stockStatus || 'In Stock',
    whatsappUrl:     price.whatsappUrl || `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(partNum)}`,
    whatsappMsg:     price.whatsappMsg || `Hi, I want to buy ${partNum}. Please share best price and availability.`,
    bulkNote:        price.bulkNote || '',
    gstRate:         price.gstRate || '18% GST applicable',
    faqs: [
      { q: raw['FAQ Q1'] || '', a: raw['FAQ A1'] || '' },
      { q: raw['FAQ Q2'] || '', a: raw['FAQ A2'] || '' },
      { q: raw['FAQ Q3'] || '', a: raw['FAQ A3'] || '' },
    ].filter(faq => faq.q),
    heroImage: {
      filename: raw['Hero Image Filename'] || '',
      alt:      raw['Hero Image Filename'] || '',
      title:    imgs.hero?.['Title Attribute'] || `Buy ${partNum} Online India`,
    },
    pinoutImage: {
      filename: raw['Pinout Image Filename'] || '',
      alt:      raw['Pinout Image Filename'] || '',
      title:    imgs.pinout?.['Title Attribute'] || `${partNum} Pinout Diagram`,
    },
    appCircuitImage: {
      filename: raw['App Circuit Image Filename'] || '',
      alt:      raw['App Circuit Image Filename'] || '',
      title:    imgs.appCircuit?.['Title Attribute'] || `${partNum} Application Circuit`,
    },
    alternativesLinks,
    relatedLinks,
    fbtLinks,
  };
});

// ── 4. Load Batch 2 Excel Products (Capacitors & Resistors) ────────────────

const batch2Path = path.join(ROOT, 'mirai_content_batch2_capacitors_resistors.xlsx');
let smdCapacitors = [];
let thtResistors = [];

if (fs.existsSync(batch2Path)) {
  const wb2 = XLSX.readFile(batch2Path);
  const capRows = XLSX.utils.sheet_to_json(wb2.Sheets['SMD Capacitors']);
  const thrRows = XLSX.utils.sheet_to_json(wb2.Sheets['Through-Hole Resistors']);

  smdCapacitors = capRows.map(r => {
    const fullSlug = cleanUrlSlug(r['URL Slug'], 'capacitor', r.SKU);
    const productId = fullSlug.split('/').pop();
    return {
      id: productId,
      partNumber: r.SKU,
      fullSlug: fullSlug,
      name: r['Product Name'],
      h1: `${r['Product Name']} – Buy Online India`,
      category: 'smd-ceramic-capacitor',
      categoryLabel: r['Sub-Category'] || 'SMD Ceramic Capacitor',
      categoryGroup: 'Passive Components',
      brand: r.Brand || 'Mirai Technologies',
      package: r.Package || '',
      packageSize: r['Package Size'] || '',
      capacitance: r.Capacitance || '',
      dielectric: r.Dielectric || '',
      voltageRating: r['Voltage Rating'] || '',
      applications: r['Key Applications'] || '',
      datasheetUrl: '',
      priority: 'Medium',
      shortDescription: r['Short Description'] || '',
      longDescription: r['Long Description (SEO/GEO)'] || r['Short Description'] || '',
      keySpecsRaw: `• Package: ${r.Package || ''}\n• Package Size: ${r['Package Size'] || ''}\n• Capacitance: ${r.Capacitance || ''}\n• Dielectric: ${r.Dielectric || ''}\n• Voltage Rating: ${r['Voltage Rating'] || ''}`,
      specs: {
        'Package': r.Package || '',
        'Package Size': r['Package Size'] || '',
        'Capacitance': r.Capacitance || '',
        'Dielectric': r.Dielectric || '',
        'Voltage Rating': r['Voltage Rating'] || '',
      },
      metaTitle: r['Meta Title (SEO)'] || `${r['Product Name']} | Mirai Technologies`,
      metaDescription: r['Meta Description (SEO)'] || `Buy ${r['Product Name']} from Mirai Technologies Mumbai. Low MOQ, GST invoice, pan-India delivery.`,
      primaryKeyword: `buy ${r.SKU} India`,
      lsiKeywords: `${r.SKU} price, ${r['Product Name']} distributor Mumbai, buy ${r.SKU} online`,
      h2Tags: `${r['Product Name']} Specifications, Applications, Buy in India, Why Mirai Technologies`,
      price: null,
      priceDisplay: null,
      moq: '100',
      stockStatus: 'In Stock',
      whatsappUrl: `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(r['Product Name'])}`,
      whatsappMsg: `Hi, I want to buy ${r['Product Name']}. Please share best price and availability.`,
      bulkNote: 'Contact for bulk tape & reel / OEM rates',
      gstRate: '18% GST applicable',
      faqs: parseAEOFAQ(r['FAQ Block (AEO Schema)']),
      heroImage: { filename: '', alt: '', title: `Buy ${r.SKU} Online India` },
      pinoutImage: { filename: '', alt: '', title: `${r.SKU} Specifications` },
      appCircuitImage: { filename: '', alt: '', title: `${r.SKU} Application` },
      alternativesLinks: [],
      relatedLinks: [],
      fbtLinks: [],
    };
  });

  thtResistors = thrRows.map(r => {
    const fullSlug = cleanUrlSlug(r['URL Slug'], 'resistor', r.SKU);
    const productId = fullSlug.split('/').pop();
    return {
      id: productId,
      partNumber: r.SKU,
      fullSlug: fullSlug,
      name: r['Product Name'],
      h1: `${r['Product Name']} – Buy Online India`,
      category: 'through-hole-resistor',
      categoryLabel: r['Sub-Category'] || 'Through-Hole Resistor',
      categoryGroup: 'Passive Components',
      brand: r.Brand || 'Mirai Technologies',
      package: r.Package || 'Axial (THT)',
      packageSize: r['Package Size'] || '',
      resistance: r.Resistance || '',
      tolerance: r.Tolerance || '',
      powerRating: r['Power Rating'] || '',
      maxVoltage: r['Max Voltage'] || '',
      applications: r['Key Applications'] || '',
      datasheetUrl: '',
      priority: 'Medium',
      shortDescription: r['Short Description'] || '',
      longDescription: r['Long Description (SEO/GEO)'] || r['Short Description'] || '',
      keySpecsRaw: `• Package: ${r.Package || 'Axial (THT)'}\n• Resistance: ${r.Resistance || ''}\n• Tolerance: ${r.Tolerance || ''}\n• Power Rating: ${r['Power Rating'] || ''}\n• Max Voltage: ${r['Max Voltage'] || ''}`,
      specs: {
        'Package': r.Package || 'Axial (THT)',
        'Resistance': r.Resistance || '',
        'Tolerance': r.Tolerance || '',
        'Power Rating': r['Power Rating'] || '',
        'Max Voltage': r['Max Voltage'] || '',
      },
      metaTitle: r['Meta Title (SEO)'] || `${r['Product Name']} | Mirai Technologies`,
      metaDescription: r['Meta Description (SEO)'] || `Buy ${r['Product Name']} from Mirai Technologies Mumbai. Low MOQ, GST invoice, pan-India delivery.`,
      primaryKeyword: `buy ${r.SKU} India`,
      lsiKeywords: `${r.SKU} price, ${r['Product Name']} distributor Mumbai, buy ${r.SKU} online`,
      h2Tags: `${r['Product Name']} Specifications, Applications, Buy in India, Why Mirai Technologies`,
      price: null,
      priceDisplay: null,
      moq: '50',
      stockStatus: 'In Stock',
      whatsappUrl: `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(r['Product Name'])}`,
      whatsappMsg: `Hi, I want to buy ${r['Product Name']}. Please share best price and availability.`,
      bulkNote: 'Contact for bulk pack / OEM rates',
      gstRate: '18% GST applicable',
      faqs: parseAEOFAQ(r['FAQ Block (AEO Schema)']),
      heroImage: { filename: '', alt: '', title: `Buy ${r.SKU} Online India` },
      pinoutImage: { filename: '', alt: '', title: `${r.SKU} Specifications` },
      appCircuitImage: { filename: '', alt: '', title: `${r.SKU} Application` },
      alternativesLinks: [],
      relatedLinks: [],
      fbtLinks: [],
    };
  });
}

// ── 5. Load Batch 1 Resistor Products (SMD Resistors) ──────────────────────

const batch1Path = path.join(ROOT, 'mirai_resistor_content_batch1.xlsx');
let smdResistors = [];

if (fs.existsSync(batch1Path)) {
  const wb1 = XLSX.readFile(batch1Path);
  const smdRows = XLSX.utils.sheet_to_json(wb1.Sheets['Resistors - SEO Content']);

  smdResistors = smdRows.map(r => {
    const fullSlug = cleanUrlSlug(r['URL Slug'], 'resistor', r.SKU);
    const productId = fullSlug.split('/').pop();
    return {
      id: productId,
      partNumber: r.SKU,
      fullSlug: fullSlug,
      name: r['Product Name'],
      h1: `${r['Product Name']} – Buy Online India`,
      category: 'smd-resistor',
      categoryLabel: r['Sub-Category'] || 'SMD Resistor',
      categoryGroup: 'Passive Components',
      brand: r.Brand || 'Mirai Technologies',
      package: r.Package || '',
      packageSize: r['Package Size'] || '',
      resistance: r.Resistance || '',
      tolerance: r.Tolerance || '',
      powerRating: r['Power Rating'] || '',
      maxVoltage: r['Max Voltage'] || '',
      operatingTemp: r['Operating Temp'] || '',
      applications: r['Key Applications'] || '',
      datasheetUrl: '',
      priority: 'Medium',
      shortDescription: r['Short Description'] || '',
      longDescription: r['Long Description (SEO/GEO)'] || r['Short Description'] || '',
      keySpecsRaw: `• Package: ${r.Package || ''}\n• Resistance: ${r.Resistance || ''}\n• Tolerance: ${r.Tolerance || ''}\n• Power Rating: ${r['Power Rating'] || ''}\n• Max Voltage: ${r['Max Voltage'] || ''}\n• Operating Temp: ${r['Operating Temp'] || ''}`,
      specs: {
        'Package': r.Package || '',
        'Resistance': r.Resistance || '',
        'Tolerance': r.Tolerance || '',
        'Power Rating': r['Power Rating'] || '',
        'Max Voltage': r['Max Voltage'] || '',
        'Operating Temp': r['Operating Temp'] || '',
      },
      metaTitle: r['Meta Title (SEO)'] || `${r['Product Name']} | Mirai Technologies`,
      metaDescription: r['Meta Description (SEO)'] || `Buy ${r['Product Name']} from Mirai Technologies Mumbai. Low MOQ, GST invoice, pan-India delivery.`,
      primaryKeyword: `buy ${r.SKU} India`,
      lsiKeywords: `${r.SKU} price, ${r['Product Name']} distributor Mumbai, buy ${r.SKU} online`,
      h2Tags: `${r['Product Name']} Specifications, Applications, Buy in India, Why Mirai Technologies`,
      price: null,
      priceDisplay: null,
      moq: '100',
      stockStatus: 'In Stock',
      whatsappUrl: `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(r['Product Name'])}`,
      whatsappMsg: `Hi, I want to buy ${r['Product Name']}. Please share best price and availability.`,
      bulkNote: 'Contact for bulk tape & reel / OEM rates',
      gstRate: '18% GST applicable',
      faqs: parseAEOFAQ(r['FAQ Block (AEO Schema)']),
      heroImage: { filename: '', alt: '', title: `Buy ${r.SKU} Online India` },
      pinoutImage: { filename: '', alt: '', title: `${r.SKU} Specifications` },
      appCircuitImage: { filename: '', alt: '', title: `${r.SKU} Application` },
      alternativesLinks: [],
      relatedLinks: [],
      fbtLinks: [],
    };
  });
}

// Helper for generic batch product mapping
function mapGenericProduct(r, defaultPrefix, categoryId, categoryGroup, defaultMoq = '50') {
  const fullSlug = cleanUrlSlug(r['URL Slug'], defaultPrefix, r.SKU);
  const productId = fullSlug.split('/').pop();
  
  const specKeys = ['Package', 'Package Size', 'Package Type', 'Inductance', 'Capacitance', 'Voltage Rating', 'Current Rating', 'Dielectric', 'Resistance', 'Tolerance', 'Power Rating', 'Max Voltage', 'Zener Voltage', 'Power Dissipation', 'Standoff Voltage', 'Color', 'Forward Voltage', 'Rated Current', 'Wavelength', 'Frequency', 'Load Capacitance', 'Pitch', 'Rows', 'Pin Count', 'Gender', 'Mount Type', 'Side', 'Orientation', 'Contact Orientation', 'Connector Type', 'Footprint', 'Actuator Height', 'Switch Type', 'Configuration', 'Coil Voltage', 'Contact Rating'];
  const specs = {};
  specKeys.forEach(k => {
    if (r[k]) specs[k] = String(r[k]).trim();
  });

  const keySpecsLines = Object.entries(specs).map(([k, v]) => `• ${k}: ${v}`).join('\n');

  return {
    id: productId,
    partNumber: r.SKU,
    fullSlug: fullSlug,
    name: r['Product Name'],
    h1: `${r['Product Name']} – Buy Online India`,
    category: categoryId,
    categoryLabel: r['Sub-Category'] || r.Category || categoryId,
    categoryGroup: categoryGroup,
    brand: r.Brand || 'Mirai Technologies',
    package: r.Package || '',
    packageSize: r['Package Size'] || r['Package Type'] || '',
    applications: r['Key Applications'] || '',
    datasheetUrl: '',
    priority: 'Medium',
    shortDescription: r['Short Description'] || '',
    longDescription: r['Long Description (SEO/GEO)'] || r['Short Description'] || '',
    keySpecsRaw: keySpecsLines,
    specs: specs,
    metaTitle: r['Meta Title (SEO)'] || `${r['Product Name']} | Mirai Technologies`,
    metaDescription: r['Meta Description (SEO)'] || `Buy ${r['Product Name']} from Mirai Technologies Mumbai. Low MOQ, GST invoice, pan-India delivery.`,
    primaryKeyword: `buy ${r.SKU} India`,
    lsiKeywords: `${r.SKU} price, ${r['Product Name']} distributor Mumbai, buy ${r.SKU} online`,
    h2Tags: `${r['Product Name']} Specifications, Applications, Buy in India, Why Mirai Technologies`,
    price: null,
    priceDisplay: null,
    moq: defaultMoq,
    stockStatus: 'In Stock',
    whatsappUrl: `https://wa.me/917942964662?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(r['Product Name'])}`,
    whatsappMsg: `Hi, I want to buy ${r['Product Name']}. Please share best price and availability.`,
    bulkNote: 'Contact for bulk / OEM rates',
    gstRate: '18% GST applicable',
    faqs: parseAEOFAQ(r['FAQ Block (AEO Schema)']),
    heroImage: { filename: '', alt: '', title: `Buy ${r.SKU} Online India` },
    pinoutImage: { filename: '', alt: '', title: `${r.SKU} Specifications` },
    appCircuitImage: { filename: '', alt: '', title: `${r.SKU} Application` },
    alternativesLinks: [],
    relatedLinks: [],
    fbtLinks: [],
  };
}

// ── 5.1 Load Batch 3 Excel Products (Inductors, Electrolytic & Tantalum Capacitors) ──────
const batch3Path = path.join(ROOT, 'mirai_content_batch3_inductors_capacitors.xlsx');
let batch3Products = [];

if (fs.existsSync(batch3Path)) {
  const wb3 = XLSX.readFile(batch3Path);
  const indRows  = XLSX.utils.sheet_to_json(wb3.Sheets['SMD Inductors']);
  const elecRows = XLSX.utils.sheet_to_json(wb3.Sheets['Electrolytic Capacitors']);
  const tantRows = XLSX.utils.sheet_to_json(wb3.Sheets['Tantalum Capacitors']);

  const inductors = indRows.map(r => mapGenericProduct(r, 'inductor', 'smd-power-inductor', 'Passive Components', '50'));
  const elecCaps  = elecRows.map(r => mapGenericProduct(r, 'capacitor', 'electrolytic-capacitor', 'Passive Components', '10'));
  const tantCaps  = tantRows.map(r => mapGenericProduct(r, 'capacitor', 'tantalum-capacitor', 'Passive Components', '50'));

  batch3Products = [...inductors, ...elecCaps, ...tantCaps];
}

// ── 5.2 Load Batch 4 Excel Products (Diodes, LEDs & Crystals) ───────────────────
const batch4Path = path.join(ROOT, 'mirai_content_batch4_diodes_leds_crystals.xlsx');
let batch4Products = [];

if (fs.existsSync(batch4Path)) {
  const wb4 = XLSX.readFile(batch4Path);
  const zenerRows  = XLSX.utils.sheet_to_json(wb4.Sheets['Zener Diodes']);
  const rectRows   = XLSX.utils.sheet_to_json(wb4.Sheets['Rectifier-Schottky-Bridge']);
  const tvsRows    = XLSX.utils.sheet_to_json(wb4.Sheets['TVS Diodes']);
  const ledRows    = XLSX.utils.sheet_to_json(wb4.Sheets['LEDs']);
  const xtalRows   = XLSX.utils.sheet_to_json(wb4.Sheets['Crystals & Oscillators']);

  const zeners   = zenerRows.map(r => mapGenericProduct(r, 'diode', 'zener-diode', 'Semiconductors', '50'));
  const rects    = rectRows.map(r => mapGenericProduct(r, 'diode', 'rectifier-schottky-diode', 'Semiconductors', '50'));
  const tvss     = tvsRows.map(r => mapGenericProduct(r, 'diode', 'tvs-diode', 'Semiconductors', '50'));
  const leds     = ledRows.map(r => mapGenericProduct(r, 'led', 'led', 'Optoelectronics', '100'));
  const crystals = xtalRows.map(r => mapGenericProduct(r, 'crystal', 'crystal-oscillator', 'Frequency Control', '20'));

  batch4Products = [...zeners, ...rects, ...tvss, ...leds, ...crystals];
}

// ── 5.3 Load Batch 5 Excel Products (Connectors, Switches & Relays) ───────────
const batch5Path = path.join(ROOT, 'mirai_content_batch5_connectors_switches_relays.xlsx');
let batch5Products = [];

if (fs.existsSync(batch5Path)) {
  const wb5 = XLSX.readFile(batch5Path);
  const pinHeaderRows  = XLSX.utils.sheet_to_json(wb5.Sheets['Pin Headers'] || []);
  const jstRows       = XLSX.utils.sheet_to_json(wb5.Sheets['JST-Wire Connectors'] || []);
  const termBlockRows = XLSX.utils.sheet_to_json(wb5.Sheets['Terminal Blocks'] || []);
  const ffcRows       = XLSX.utils.sheet_to_json(wb5.Sheets['FFC-FPC Connectors'] || []);
  const usbRows       = XLSX.utils.sheet_to_json(wb5.Sheets['USB-Power Connectors'] || []);
  const switchRows    = XLSX.utils.sheet_to_json(wb5.Sheets['Switches'] || []);
  const relayRows     = XLSX.utils.sheet_to_json(wb5.Sheets['Relays'] || []);

  const pinHeaders  = pinHeaderRows.map(r => mapGenericProduct(r, 'connector', 'pin-header', 'Connectors', '50'));
  const jstConns    = jstRows.map(r => mapGenericProduct(r, 'connector', 'jst-wire-connector', 'Connectors', '50'));
  const termBlocks  = termBlockRows.map(r => mapGenericProduct(r, 'connector', 'terminal-block', 'Connectors', '20'));
  const ffcConns    = ffcRows.map(r => mapGenericProduct(r, 'connector', 'ffc-fpc-connector', 'Connectors', '50'));
  const usbConns    = usbRows.map(r => mapGenericProduct(r, 'connector', 'usb-power-connector', 'Connectors', '20'));
  const switches    = switchRows.map(r => mapGenericProduct(r, 'switch', 'switch', 'Electromechanical', '20'));
  const relays      = relayRows.map(r => mapGenericProduct(r, 'relay', 'relay', 'Electromechanical', '10'));

  batch5Products = [...pinHeaders, ...jstConns, ...termBlocks, ...ffcConns, ...usbConns, ...switches, ...relays];
}

// ── 6. Merge All Products ────────────────────────────────────────────────────

const products = [
  ...masterProducts,
  ...smdCapacitors,
  ...thtResistors,
  ...smdResistors,
  ...batch3Products,
  ...batch4Products,
  ...batch5Products,
];

// ── 7. Build Categories Array ────────────────────────────────────────────────

const fallbackBaseCategories = [
  {
    id: 'integrated-circuit',
    name: 'Integrated Circuits',
    slug: 'integrated-circuit',
    metaTitle: 'Integrated Circuits (IC) Distributor India — Mirai Technologies',
    metaDescription: 'Authorized stockist of op-amps, comparators, interface ICs, timers & PMICs in India.',
    h1: 'Integrated Circuits (ICs) Catalog',
    description: 'Genuine integrated circuits from Texas Instruments, STMicroelectronics, NXP, Microchip, and Analog Devices.',
    priority: 'High',
  },
  {
    id: 'mosfet-transistor',
    name: 'MOSFET Transistors',
    slug: 'mosfet-transistor',
    metaTitle: 'Power MOSFET Distributor India — Mirai Technologies',
    metaDescription: 'N-channel and P-channel power MOSFETs in TO-220, TO-247, DPAK, D2PAK packages.',
    h1: 'Power MOSFET Transistors Catalog',
    description: 'High performance power MOSFETs from Infineon, ON Semi, STMicroelectronics, and Vishay.',
    priority: 'High',
  },
  {
    id: 'transistor',
    name: 'BJT Transistors',
    slug: 'transistor',
    metaTitle: 'Transistor Distributor India — Mirai Technologies',
    metaDescription: 'BJT, NPN, PNP, and Darlington transistors for switching and signal amplification.',
    h1: 'Bipolar Junction Transistors (BJTs)',
    description: 'General purpose and power transistors for motor control, switching, and signal processing.',
    priority: 'High',
  },
  {
    id: 'microcontroller',
    name: 'Microcontrollers (MCU)',
    slug: 'microcontroller',
    metaTitle: 'Microcontroller Distributor India — Mirai Technologies',
    metaDescription: '8-bit, 16-bit, and 32-bit microcontrollers (STM32, PIC, ATmega, ESP32).',
    h1: 'Microcontrollers & Embedded Processors',
    description: 'High performance microcontrollers for industrial automation, IoT, and embedded electronics.',
    priority: 'High',
  },
  {
    id: 'voltage-regulator',
    name: 'Voltage Regulators',
    slug: 'voltage-regulator',
    metaTitle: 'Voltage Regulator IC Distributor India — Mirai Technologies',
    metaDescription: 'Linear LDO and switching voltage regulators (L78xx, LM2596, LM2576).',
    h1: 'Voltage Regulators & PMICs',
    description: 'Step-down buck converters, boost regulators, and low-dropout (LDO) linear regulators.',
    priority: 'High',
  }
];

const catRows = categorySheetData.filter(r => typeof r['__EMPTY'] === 'number');

const baseCategories = catRows.length > 0
  ? catRows
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
      })
  : fallbackBaseCategories;

const passiveCategories = [
  {
    id: 'smd-ceramic-capacitor',
    name: 'SMD Ceramic Capacitors',
    slug: 'smd-ceramic-capacitor',
    metaTitle: 'SMD Ceramic Capacitors Distributor India | MLCC 0402-1812 — Mirai Technologies',
    metaDescription: 'Buy SMD ceramic capacitors (MLCC) in 0402, 0603, 0805, 1206, 1210, 1812 packages. C0G/NP0 & X7R dielectrics, 16V-50V ratings. Low MOQ, GST invoice, pan-India delivery.',
    h1: 'SMD Ceramic Capacitors (MLCC) – Buy Online India',
    h2Tags: 'SMD Ceramic Capacitor Specifications, Package Sizes, C0G vs X7R Dielectric, Buy in India',
    primaryKeyword: 'SMD ceramic capacitor distributor India',
    lsiKeywords: '0402 MLCC capacitor, C0G NP0 capacitor buy, X7R SMD capacitor price Mumbai, surface mount ceramic capacitor reel',
    description: 'Mirai Technologies stocks 384+ SMD ceramic capacitor (MLCC) SKUs across standard EIA package sizes (0402, 0603, 0805, 1206, 1210, 1812) with C0G/NP0 and X7R dielectrics. Ideal for RF tuning, decoupling, high-frequency filtering, and power management circuits in OEM/EMS manufacturing.',
    featuredProducts: [],
    filters: 'Package Size, Capacitance, Dielectric, Voltage Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'through-hole-resistor',
    name: 'Through-Hole Resistors',
    slug: 'through-hole-resistor',
    metaTitle: 'Through-Hole Resistors Distributor India | Carbon & Metal Film — Mirai Technologies',
    metaDescription: 'Buy axial through-hole carbon film and metal film resistors in 1/4W, 1/2W, 1W ratings with 1% & 5% tolerance. Genuine stock, low MOQ, GST invoice, pan-India delivery.',
    h1: 'Through-Hole Resistors – Carbon & Metal Film India',
    h2Tags: 'Through-Hole Resistor Specifications, Axial Package, Carbon vs Metal Film, Buy in India',
    primaryKeyword: 'through hole resistor buy India',
    lsiKeywords: '1/4W carbon film resistor 5%, axial lead resistor distributor Mumbai, 1W metal film resistor 1%, THT resistor stockist',
    description: 'Through-hole axial lead resistors available in E24 standard resistance values from 1 Ohm to 10M Ohm. High reliability carbon film and metal film resistors rated 1/4W to 1W for prototyping, industrial power supplies, educational kits, and PCB repair.',
    featuredProducts: [],
    filters: 'Resistance, Tolerance, Power Rating, Max Voltage',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'smd-resistor',
    name: 'SMD Chip Resistors',
    slug: 'smd-resistor',
    metaTitle: 'SMD Chip Resistors Distributor India | 0402, 0603, 0805, 1206 — Mirai Technologies',
    metaDescription: 'Buy 1% precision thick-film SMD resistors in 0402, 0603, 0805, 1206, 1210 footprints. Genuine stock in reels/cut-tape from Mirai Technologies Mumbai. GST invoice & fast dispatch.',
    h1: 'SMD Chip Resistors – 1% Precision Surface Mount',
    h2Tags: 'SMD Resistor Specifications, 0402-1210 Packages, 1% Tolerance, Buy in India',
    primaryKeyword: 'SMD resistor distributor India',
    lsiKeywords: '0402 1% resistor, 0603 SMD chip resistor price, 0805 precision resistor stock, thick film chip resistor OEM',
    description: 'Precision 1% thick-film SMD chip resistors across 0402, 0603, 0805, 1206, and 1210 surface-mount packages. Rated for operating temperatures from -55°C to +155°C for high-density SMT PCB assembly, automotive electronics, and industrial automation.',
    featuredProducts: [],
    filters: 'Package Size, Resistance, Tolerance, Power Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'resistor',
    name: 'Resistors (SMD & Through-Hole)',
    slug: 'resistor',
    metaTitle: 'Resistors Distributor India | SMD Chip & Through-Hole Resistors — Mirai Technologies',
    metaDescription: 'Authorized stockist of SMD chip resistors and through-hole axial resistors in India. 1,300+ resistor SKUs in stock. Low MOQ, GST billing, pan-India delivery.',
    h1: 'Resistors Catalog – SMD & Through-Hole',
    h2Tags: 'Resistor Types, SMD vs Through-Hole, Precision Values, Bulk Pricing',
    primaryKeyword: 'resistors distributor India',
    lsiKeywords: 'buy resistors online India, SMD resistor reel, carbon film resistor bulk, electronics components resistor',
    description: 'Complete catalog of over 1,300 resistor SKUs including 1% precision SMD chip resistors (0402-1210) and through-hole carbon/metal film axial resistors (1/4W-1W).',
    featuredProducts: [],
    filters: 'Sub-Category, Package, Resistance, Power Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'capacitor',
    name: 'Capacitors (SMD Ceramic & MLCC)',
    slug: 'capacitor',
    metaTitle: 'Capacitors Distributor India | SMD Ceramic MLCC — Mirai Technologies',
    metaDescription: 'Buy ceramic MLCC and SMD capacitors online in India. C0G, NP0, X7R dielectrics from 0402 to 1812 sizes. Low MOQ, GST invoice, same-day dispatch.',
    h1: 'Capacitors Catalog – SMD Ceramic & MLCC',
    h2Tags: 'Capacitor Types, MLCC Packages, Dielectric Ratings, Buy Online',
    primaryKeyword: 'capacitor distributor India',
    lsiKeywords: 'buy MLCC capacitor India, SMD ceramic capacitor reel, C0G capacitor stock, X7R 50V capacitor',
    description: 'Complete catalog of SMD ceramic capacitors (MLCC) with C0G/NP0 and X7R dielectrics across 0402 to 1812 packages, rated 16V to 50V.',
    featuredProducts: [],
    filters: 'Package, Capacitance, Dielectric, Voltage Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'passive-components',
    name: 'Passive Components',
    slug: 'passive-components',
    metaTitle: 'Passive Electronic Components Distributor India | Resistors & Capacitors — Mirai',
    metaDescription: 'Buy passive electronic components in bulk across India. 1,700+ SMD resistors, THT resistors, and SMD ceramic capacitors in stock with GST invoice.',
    h1: 'Passive Electronic Components Catalog',
    h2Tags: 'Passive Components Overview, Resistors, Capacitors, OEM Sourcing',
    primaryKeyword: 'passive components distributor India',
    lsiKeywords: 'buy passive components online, SMD resistors and capacitors Mumbai, electronics manufacturing components',
    description: 'Mirai Technologies distributes over 1,700 passive component SKUs including SMD chip resistors, axial through-hole resistors, and SMD ceramic capacitors for industrial, automotive, and consumer electronics manufacturing.',
    featuredProducts: [],
    filters: 'Category, Package, Spec',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'smd-power-inductor',
    name: 'SMD Power Inductors',
    slug: 'smd-power-inductor',
    metaTitle: 'SMD Power Inductors Distributor India | 0402-1812 — Mirai Technologies',
    metaDescription: 'Buy SMD power inductors in 0402, 0603, 0805, 1206, 1210, 1812 packages. High current ratings, shielded & unshielded. Low MOQ, GST invoice, fast pan-India delivery.',
    h1: 'SMD Power Inductors – Buy Online India',
    h2Tags: 'SMD Inductor Specifications, Package Sizes, Inductance & Current Ratings, Buy in India',
    primaryKeyword: 'SMD power inductor distributor India',
    lsiKeywords: '0402 chip inductor, SMD power choke price Mumbai, 10uH SMD inductor reel, power inductor stockist',
    description: 'Mirai Technologies stocks 390+ SMD power inductor SKUs across EIA package sizes (0402 to 1812). Shielded ferrite core construction for low EMI in DC-DC converters, switching regulators, and RF power filtering circuits.',
    featuredProducts: [],
    filters: 'Package, Inductance, Rated Current',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'inductor',
    name: 'Inductors (SMD & Power Chokes)',
    slug: 'inductor',
    metaTitle: 'Inductors Distributor India | SMD Power Inductors & Chokes — Mirai Technologies',
    metaDescription: 'Authorized stockist of SMD power inductors and RF chip inductors in India. 390+ inductor SKUs in stock. Low MOQ, GST billing, pan-India delivery.',
    h1: 'Inductors Catalog – SMD & Power Chokes',
    h2Tags: 'Inductor Types, Package Sizes, Power Filtering, Bulk Pricing',
    primaryKeyword: 'inductors distributor India',
    lsiKeywords: 'buy inductors online India, power choke reel, chip inductor bulk, electronic components inductor',
    description: 'Complete catalog of over 390 inductor SKUs including SMD chip inductors (0402-1812) for DC-DC converters, power supplies, and noise suppression.',
    featuredProducts: [],
    filters: 'Package, Inductance, Rated Current',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'electrolytic-capacitor',
    name: 'Radial Electrolytic Capacitors',
    slug: 'electrolytic-capacitor',
    metaTitle: 'Radial Electrolytic Capacitors Distributor India — Mirai Technologies',
    metaDescription: 'Buy radial aluminium electrolytic capacitors from 1uF to 10,000uF, rated 6.3V to 100V. In-stock at Mirai Technologies Mumbai with GST billing.',
    h1: 'Radial Aluminium Electrolytic Capacitors',
    h2Tags: 'Electrolytic Capacitor Specifications, Voltage Ratings, Capacitance Range, Applications',
    primaryKeyword: 'radial electrolytic capacitor buy India',
    lsiKeywords: 'aluminium electrolytic capacitor 50V, radial lead capacitor Mumbai, bulk decoupling capacitor',
    description: 'High reliability radial aluminium electrolytic capacitors for power supply filtering, bulk decoupling, and audio coupling applications across through-hole circuit designs.',
    featuredProducts: [],
    filters: 'Capacitance, Voltage Rating, Package',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'tantalum-capacitor',
    name: 'SMD Tantalum Capacitors',
    slug: 'tantalum-capacitor',
    metaTitle: 'SMD Tantalum Capacitors Distributor India | Case A-D — Mirai Technologies',
    metaDescription: 'Buy SMD tantalum capacitors in EIA Case A, B, C, D packages (0.1uF to 220uF, 4V to 50V). Low ESR, high stability, GST invoice, pan-India delivery.',
    h1: 'SMD Tantalum Capacitors (Case A-D)',
    h2Tags: 'Tantalum Capacitor Specifications, EIA Case Sizes, Voltage & Capacitance Ratings',
    primaryKeyword: 'SMD tantalum capacitor distributor India',
    lsiKeywords: 'case A tantalum cap, case B 10uH tantalum, low ESR tantalum capacitor India, surface mount tantalum',
    description: 'Precision SMD tantalum capacitors in EIA case sizes A, B, C, and D for space-constrained, high-reliability decoupling, power filtering, and timing circuits.',
    featuredProducts: [],
    filters: 'Package, Capacitance, Voltage Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'zener-diode',
    name: 'Zener Diodes',
    slug: 'zener-diode',
    metaTitle: 'Zener Diodes Distributor India | SOD-123, DO-35, SOT-23 — Mirai Technologies',
    metaDescription: 'Buy Zener diodes in SOD-123, DO-35, SOT-23 packages from 2.4V to 75V ratings. Genuine stock, low MOQ, GST billing, pan-India delivery.',
    h1: 'Zener Diodes – Voltage Reference & Protection',
    h2Tags: 'Zener Diode Specifications, Package Types, Voltage Ratings, Applications',
    primaryKeyword: 'zener diode distributor India',
    lsiKeywords: '5.1V zener diode, 12V zener diode SOD-123, zener diode price Mumbai, voltage regulator diode',
    description: 'Comprehensive stock of Zener diodes across standard surface mount (SOD-123, SOT-23) and axial through-hole (DO-35, DO-41) packages for voltage regulation, overvoltage protection, and voltage clamping.',
    featuredProducts: [],
    filters: 'Package, Zener Voltage, Power Dissipation',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'rectifier-schottky-diode',
    name: 'Rectifier & Schottky Diodes',
    slug: 'rectifier-schottky-diode',
    metaTitle: 'Rectifier & Schottky Diodes Distributor India — Mirai Technologies',
    metaDescription: 'Buy general purpose rectifier diodes, fast recovery, and Schottky barrier diodes in SMA, SMB, SMC, DO-41 packages. GST billing & fast dispatch.',
    h1: 'Rectifier & Schottky Barrier Diodes',
    h2Tags: 'Rectifier Diode Specifications, Schottky vs Silicon, Current & Voltage Ratings',
    primaryKeyword: 'rectifier schottky diode distributor India',
    lsiKeywords: '1A 50V rectifier diode, Schottky diode SMA, bridge rectifier module, power diode India',
    description: 'High efficiency Schottky diodes and silicon rectifier diodes rated from 20V to 1000V and 0.5A to 10A for AC-DC rectification, reverse polarity protection, and freewheeling diode applications.',
    featuredProducts: [],
    filters: 'Package, Voltage Rating, Current Rating',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'tvs-diode',
    name: 'TVS Diodes (Transient Voltage Suppressors)',
    slug: 'tvs-diode',
    metaTitle: 'TVS Diodes Distributor India | ESD & Surge Protection — Mirai Technologies',
    metaDescription: 'Buy unidirectional & bidirectional TVS diodes in SMAJ, SMBJ, SMCJ, DO-15, DO-214 packages. ESD & surge protection components in stock.',
    h1: 'TVS Diodes – ESD & Transient Surge Protection',
    h2Tags: 'TVS Diode Specifications, Standoff Voltage, Uni/Bidirectional, Surge Protection',
    primaryKeyword: 'TVS diode distributor India',
    lsiKeywords: '5V TVS diode, SMAJ5.0A surge protector, ESD protection diode India, transient voltage suppressor',
    description: 'Transient Voltage Suppressor (TVS) diodes in SMA, SMB, SMC, and axial packages designed to clamp ESD spikes, switching transients, and voltage surges in sensitive electronic systems.',
    featuredProducts: [],
    filters: 'Package, Standoff Voltage',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'diode',
    name: 'Diodes & Rectifiers',
    slug: 'diode',
    metaTitle: 'Diodes & Rectifiers Distributor India | Zener, TVS, Schottky — Mirai Technologies',
    metaDescription: 'Authorized stockist of Zener, Schottky, TVS, and general-purpose rectifier diodes in India. 480+ diode SKUs in stock with GST billing.',
    h1: 'Diodes & Rectifiers Catalog',
    h2Tags: 'Diode Categories, Zener vs TVS vs Schottky, Package Types, Bulk Supply',
    primaryKeyword: 'diodes distributor India',
    lsiKeywords: 'buy diodes online India, Schottky diode bulk, Zener diode stockist, TVS diode surge protection',
    description: 'Complete catalog of 485+ diode SKUs including Zener diodes, fast-switching Schottky barrier rectifiers, TVS surge protection diodes, and bridge rectifiers.',
    featuredProducts: [],
    filters: 'Sub-Category, Package, Spec',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'led',
    name: 'LEDs & Optoelectronics',
    slug: 'led',
    metaTitle: 'LEDs & Optoelectronics Distributor India | 3mm, 5mm, SMD — Mirai Technologies',
    metaDescription: 'Buy standard and high-brightness LEDs in 3mm, 5mm THT and 0603, 0805, 1206 SMD packages across Red, Green, Blue, Yellow, White colors. GST invoice.',
    h1: 'LEDs & Optoelectronic Components',
    h2Tags: 'LED Specifications, Color & Wavelength, Forward Voltage, Package Sizes',
    primaryKeyword: 'LED distributor India',
    lsiKeywords: '3mm red LED, 0805 green SMD LED, white high brightness LED India, optoelectronic indicator',
    description: 'Single-color, bi-color, and RGB LEDs in standard 3mm/5mm through-hole and 0603-1206 surface-mount packages for status indication, backlighting, and illumination.',
    featuredProducts: [],
    filters: 'Package, Color, Forward Voltage',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'crystal-oscillator',
    name: 'Crystals & Crystal Oscillators',
    slug: 'crystal-oscillator',
    metaTitle: 'Quartz Crystals & Oscillators Distributor India — Mirai Technologies',
    metaDescription: 'Buy 32.768kHz, 8MHz, 12MHz, 16MHz, 24MHz, 25MHz quartz crystals in HC-49S, SMD 3225, 5032 packages. In-stock at Mirai Technologies Mumbai.',
    h1: 'Quartz Crystals & Crystal Oscillators',
    h2Tags: 'Crystal Resonator Specifications, Frequency Range, Package Types, RTC & MCU Clocks',
    primaryKeyword: 'quartz crystal distributor India',
    lsiKeywords: '32.768kHz RTC crystal, 16MHz HC-49S crystal oscillator, SMD 3225 quartz crystal India',
    description: 'High stability quartz crystal resonators and crystal clock oscillators for MCU timing, real-time clock (RTC) circuits, and wireless communication baud-rate generation.',
    featuredProducts: [],
    filters: 'Package, Frequency, Load Capacitance',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'pin-header',
    name: 'Pin Headers & Male Connectors',
    slug: 'pin-header',
    metaTitle: 'Pin Headers Distributor India | 2.54mm, 2.0mm Pitch Male Headers — Mirai',
    metaDescription: 'Buy 2.54mm, 2.0mm 1-row and 2-row pin headers (male plugs, straight & right-angle). Low MOQ, GST billing, pan-India delivery.',
    h1: 'Pin Headers & Male Board Connectors',
    h2Tags: 'Pin Header Specifications, Pitch & Pin Counts, Straight vs Right-Angle, Applications',
    primaryKeyword: 'pin header distributor India',
    lsiKeywords: '2.54mm male header, Berg strip connector, 40 pin breakaway header India, PCB pin header',
    description: 'Male pin headers in 2.54mm, 2.0mm, and 1.27mm pitch configurations (single row & double row, straight and right-angle THT/SMD) for board-to-board interconnects, sensor modules, and development boards.',
    featuredProducts: [],
    filters: 'Pitch, Rows, Pin Count, Gender, Mount Type',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'jst-wire-connector',
    name: 'JST & Wire-to-Board Connectors',
    slug: 'jst-wire-connector',
    metaTitle: 'JST Wire-to-Board Connectors Distributor India | XH, PH, XH2.54 — Mirai',
    metaDescription: 'Buy JST XH, PH, XH2.54 wire-to-board connectors (male/female plugs, crimp housings & PCB wafers). Genuine stock, low MOQ, GST invoice.',
    h1: 'JST & Wire-to-Board Connectors',
    h2Tags: 'JST Connector Specifications, Series (XH/PH/VH), Wire Side vs PCB Side, Applications',
    primaryKeyword: 'JST wire connector distributor India',
    lsiKeywords: 'JST XH 2.5mm connector, JST PH 2.0mm cable connector, wire to board connector India',
    description: 'High reliability JST-XH, JST-PH, and wire-to-board connectors including pre-crimped wire assemblies, male PCB wafers, female housings, and crimp terminals for power & signal routing.',
    featuredProducts: [],
    filters: 'Pitch, Pin Count, Side',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'terminal-block',
    name: 'Terminal Blocks & Screw Terminals',
    slug: 'terminal-block',
    metaTitle: 'Screw Terminal Blocks Distributor India | PCB Mount 2.54mm - 5.08mm — Mirai',
    metaDescription: 'Buy PCB screw terminal blocks in 2.54mm, 3.5mm, 3.81mm, 5.0mm, 5.08mm pitch. 2-pin to 12-pin straight & right angle. GST billing.',
    h1: 'PCB Terminal Blocks & Wire Connectors',
    h2Tags: 'Terminal Block Specifications, Pitch Sizes, Screw vs Spring Clamp, High Current Ratings',
    primaryKeyword: 'terminal block distributor India',
    lsiKeywords: 'PCB screw terminal 5.08mm, 2 pin terminal block price Mumbai, pluggable terminal connector India',
    description: 'Industrial PCB screw terminal blocks and pluggable terminal connectors in 2.54mm to 5.08mm pitch ratings for high-current power input, relay outputs, and industrial automation control wiring.',
    featuredProducts: [],
    filters: 'Pitch, Pin Count, Orientation',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'ffc-fpc-connector',
    name: 'FFC / FPC Flexible Ribbon Connectors',
    slug: 'ffc-fpc-connector',
    metaTitle: 'FFC / FPC Connectors Distributor India | 0.5mm & 1.0mm Pitch — Mirai',
    metaDescription: 'Buy 0.5mm and 1.0mm pitch FFC/FPC flexible flat cable connectors (Top/Bottom/Flip-Lock). High density display & camera flex connectors.',
    h1: 'FFC & FPC Connectors (Flexible Flat Cable)',
    h2Tags: 'FFC FPC Connector Specifications, Pitch (0.5mm/1.0mm), Contact Orientation, ZIF/NON-ZIF',
    primaryKeyword: 'FFC FPC connector distributor India',
    lsiKeywords: '0.5mm FPC connector flip lock, 30 pin ribbon cable connector, LCD flex connector India',
    description: 'Zero Insertion Force (ZIF) and Non-ZIF flexible flat cable (FFC) and flexible printed circuit (FPC) connectors in 0.5mm and 1.0mm pitch for LCD displays, camera modules, and compact electronic assemblies.',
    featuredProducts: [],
    filters: 'Pitch, Pin Count, Contact Orientation',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'usb-power-connector',
    name: 'USB & DC Power Connectors',
    slug: 'usb-power-connector',
    metaTitle: 'USB & DC Power Jack Connectors Distributor India | USB-C, USB-A, DC Jack — Mirai',
    metaDescription: 'Buy USB-C, USB-A, Micro-USB ports & 2.1mm DC power jacks (THT & SMD PCB mount). Genuine stock, low MOQ, GST billing.',
    h1: 'USB Ports & DC Power Jack Connectors',
    h2Tags: 'USB Connector Specifications, Type-C / Type-A / Micro, DC Power Jacks, Power Ratings',
    primaryKeyword: 'USB power connector distributor India',
    lsiKeywords: 'USB Type C female socket PCB, 2.1mm DC barrel jack, USB A THT connector price Mumbai',
    description: 'Standard USB-C female sockets, USB-A receptacle connectors, Micro-USB ports, and barrel DC power jack sockets for PCB power input, charging circuits, and peripheral interfacing.',
    featuredProducts: [],
    filters: 'Connector Type, Mount Type',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'connectors',
    name: 'Connectors & Interconnects',
    slug: 'connectors',
    metaTitle: 'Connectors & Interconnects Distributor India | Pin Headers, JST, Terminals — Mirai',
    metaDescription: 'Authorized stockist of pin headers, JST connectors, screw terminal blocks, FFC/FPC connectors, USB-C ports & DC jacks in India.',
    h1: 'Connectors & Interconnect Systems Catalog',
    h2Tags: 'Connector Types, Wire-to-Board, Board-to-Board, High Current Terminals, Bulk Pricing',
    primaryKeyword: 'connectors distributor India',
    lsiKeywords: 'buy connectors online India, pin header bulk, JST connector reel, PCB terminal block stockist',
    description: 'Complete catalog of over 340 connector SKUs including pin headers, JST wire-to-board connectors, PCB screw terminal blocks, FFC/FPC flex ribbon sockets, and USB/DC power connectors.',
    featuredProducts: [],
    filters: 'Sub-Category, Pitch, Pin Count, Mount Type',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'switch',
    name: 'Switches (Tactile, Slide, Toggle, Rocker)',
    slug: 'switch',
    metaTitle: 'Switches Distributor India | Tactile Push Buttons, Slide, DIP, Rocker — Mirai',
    metaDescription: 'Buy tactile push button switches (3x6, 6x6, 12x12), slide switches, DIP switches, and rocker switches for PCB mounting. GST billing.',
    h1: 'Switches – Tactile, Slide, Toggle, DIP & Rocker',
    h2Tags: 'Switch Specifications, Tactile Push Button Sizes, Slide & DIP Switch Types, Applications',
    primaryKeyword: 'switches distributor India',
    lsiKeywords: '6x6 tactile switch 4.3mm, DIP switch 4 position, slide switch PCB mount India, push button switch',
    description: 'High durability SMD and THT tactile push buttons (3x3mm to 12x12mm), slide switches, DIP configuration switches, limit switches, and rocker switches for UI panels and control systems.',
    featuredProducts: [],
    filters: 'Switch Type, Footprint, Actuator Height',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'relay',
    name: 'Relays (Electromechanical & Reed)',
    slug: 'relay',
    metaTitle: 'Relays Distributor India | 3V-24V Coil SPDT/DPDT Electromechanical & Reed — Mirai',
    metaDescription: 'Buy 3V, 5V, 12V, 24V coil relays (5A/10A contact rating, SPDT/DPDT) & SIP/DIP reed relays for industrial control & automation. GST invoice.',
    h1: 'Relays – Electromechanical & Reed Relays',
    h2Tags: 'Relay Specifications, Coil Voltage Ratings, Contact Form (SPDT/DPDT), Contact Amperage',
    primaryKeyword: 'relays distributor India',
    lsiKeywords: '5V relay SPDT 10A, 12V DC PCB relay price Mumbai, reed relay SIP 5V, industrial control relay',
    description: 'Precision electromechanical relays and ultra-fast reed relays with 3V, 5V, 12V, and 24V DC coils and up to 10A contact ratings for industrial automation, smart switching, and signal switching circuits.',
    featuredProducts: [],
    filters: 'Configuration, Coil Voltage, Contact Rating, Mount Type',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  },
  {
    id: 'electromechanical',
    name: 'Electromechanical Components',
    slug: 'electromechanical',
    metaTitle: 'Electromechanical Components Distributor India | Switches & Relays — Mirai',
    metaDescription: 'Authorized stockist of tactile push buttons, DIP switches, slide switches, and 3V-24V power relays in India. 185+ SKUs in stock.',
    h1: 'Electromechanical Components Catalog',
    h2Tags: 'Switches & Relays, Industrial Power Control, Tactile Feedback, Bulk Supply',
    primaryKeyword: 'electromechanical components distributor India',
    lsiKeywords: 'buy switches and relays online India, tactile button bulk, 5V coil relay stock, PCB switch supplier',
    description: 'Complete catalog of 185+ electromechanical component SKUs including tactile push buttons, DIP switches, slide switches, toggle switches, and electromechanical/reed power relays.',
    featuredProducts: [],
    filters: 'Sub-Category, Spec',
    sortOptions: 'Popularity, Name A-Z',
    priority: 'High',
    navigationLinks: []
  }
];

const categories = [...baseCategories, ...passiveCategories];

// Fix MOSFET Category ID if present
const MOSFET_CAT = categories.find(c => c.slug === 'mosfet-transistor');
if (MOSFET_CAT) {
  MOSFET_CAT.id = 'mosfet-transistor';
}

// ── 8. Write Output file (src/data/products.js) ─────────────────────────────

const output = `// AUTO-GENERATED by scripts/build_products.mjs
// Do not edit manually – run: node scripts/build_products.mjs

export const categories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};

export const getProductById = (id) => products.find(p => p.id === id || p.partNumber === id);

export const getProductBySlug = (slug) => {
  const clean = (slug || '').replace(/^\\/product\\//, '').replace(/^\\//, '');
  return products.find(p => p.fullSlug === clean || p.id === clean || p.partNumber === clean);
};

export const getProductsByCategory = (catSlug) => {
  if (catSlug === 'resistor') {
    return products.filter(p => p.category === 'resistor' || p.category === 'smd-resistor' || p.category === 'through-hole-resistor');
  }
  if (catSlug === 'capacitor') {
    return products.filter(p => p.category === 'capacitor' || p.category === 'smd-ceramic-capacitor' || p.category === 'electrolytic-capacitor' || p.category === 'tantalum-capacitor');
  }
  if (catSlug === 'inductor') {
    return products.filter(p => p.category === 'inductor' || p.category === 'smd-power-inductor');
  }
  if (catSlug === 'diode') {
    return products.filter(p => p.category === 'diode' || p.category === 'zener-diode' || p.category === 'rectifier-schottky-diode' || p.category === 'tvs-diode');
  }
  if (catSlug === 'led') {
    return products.filter(p => p.category === 'led' || p.category === 'optoelectronics');
  }
  if (catSlug === 'crystal-oscillator') {
    return products.filter(p => p.category === 'crystal-oscillator' || p.category === 'frequency-control');
  }
  if (catSlug === 'passive-components') {
    return products.filter(p => p.categoryGroup === 'Passive Components' || p.category === 'resistor' || p.category === 'capacitor' || p.category === 'smd-ceramic-capacitor' || p.category === 'smd-resistor' || p.category === 'through-hole-resistor' || p.category === 'smd-power-inductor' || p.category === 'inductor' || p.category === 'electrolytic-capacitor' || p.category === 'tantalum-capacitor');
  }
  if (catSlug === 'connectors' || catSlug === 'connector') {
    return products.filter(p => p.categoryGroup === 'Connectors' || p.category === 'pin-header' || p.category === 'jst-wire-connector' || p.category === 'terminal-block' || p.category === 'ffc-fpc-connector' || p.category === 'usb-power-connector' || p.category === 'connectors');
  }
  if (catSlug === 'electromechanical') {
    return products.filter(p => p.categoryGroup === 'Electromechanical' || p.category === 'switch' || p.category === 'relay');
  }
  return products.filter(p => p.category === catSlug);
};

export const getProductsByPriority = (catSlug) =>
  getProductsByCategory(catSlug).sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return (order[a.priority] ?? 1) - (order[b.priority] ?? 1);
  });

export const getCategoryById = (id) =>
  categories.find(c => c.id === id || c.slug === id);
`;


fs.writeFileSync(path.join(ROOT, 'src', 'data', 'products.js'), output, 'utf8');

console.log(`✅  Generated src/data/products.js`);
console.log(`    Total Products: ${products.length} (Master: ${masterProducts.length}, Batch 5: ${batch5Products.length}, Capacitors: ${smdCapacitors.length}, THT Resistors: ${thtResistors.length}, SMD Resistors: ${smdResistors.length})`);
console.log(`    Total Categories: ${categories.length}`);
console.log(`    Category Slugs: ${categories.map(c => c.slug).join(', ')}`);
