import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { wbCitiesData, createCitySchema } from './build_wb_data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');

console.log('Loading existing cityPages.json...');
let cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

// Slugs of West Bengal cities being replaced/updated
const targetSlugs = new Set(wbCitiesData.map(c => c.slug.toLowerCase()));
const targetCities = new Set(wbCitiesData.map(c => c.city.toLowerCase()));

// Remove existing West Bengal cities matching our 9 new targets, plus legacy Maheshtala
const slugsToRemove = new Set([
  ...targetSlugs,
  '/electronic-component-distributor-in-maheshtala'
]);

const nonUpdatedPages = cityPages.filter(p => {
  if (slugsToRemove.has(p.slug.toLowerCase())) return false;
  if (targetCities.has(p.city.toLowerCase())) return false;
  if (p.city.toLowerCase() === 'maheshtala') return false;
  return true;
});

console.log(`Original cities count: ${cityPages.length}`);
console.log(`Non-updated cities count: ${nonUpdatedPages.length}`);

// Format new West Bengal cities with full blueprint metadata
const formattedWbCities = wbCitiesData.map(c => {
  return {
    ...c,
    canonicalUrl: `https://miraitechnologies.net${c.slug}`,
    hasDetailedBlueprint: true,
    schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList, ItemList",
    introduction: c.whyTrust?.content?.join('\n\n') || '',
    whyMirai: c.whyTrust?.content?.[0] || '',
    heroContent: c.heroSub,
    ctaText: `Send your BOM, part number list, or requirements to sales@miraitechnologies.net or WhatsApp +91 93213 98188 for fast delivery to ${c.city}.`,
    footerGeoText: `Mirai Technologies supplies authentic electronic components, power MOSFETs, ICs, and passives to OEMs, EMS, and machinery manufacturers across ${c.city} and West Bengal.`,
    schema: createCitySchema(c)
  };
});

// Place West Bengal cities together or insert neatly
const finalCityPages = [
  ...formattedWbCities,
  ...nonUpdatedPages
];

fs.writeFileSync(cityPagesPath, JSON.stringify(finalCityPages, null, 2), 'utf8');
console.log(`✅ Successfully updated cityPages.json! Total pages: ${finalCityPages.length}`);
console.log(`✅ West Bengal detailed blueprint cities added/updated: ${formattedWbCities.length}`);
