import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tnCitiesData } from './tn_cities_data.js';
import { mhCitiesData } from './mh_cities_data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
const redirectsPath = path.join(__dirname, '../src/data/redirects.js');

console.log('Loading existing cityPages.json...');
const existingCityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

// Define list of duplicate / legacy slugs to purge
const slugsToRemove = new Set([
  // TN product-duplicate slugs
  '/power-mosfets-supplier-chennai',
  '/integrated-circuits-supplier-chennai',
  '/power-mosfets-supplier-coimbatore',
  // MH product-duplicate slugs
  '/power-mosfets-supplier-mumbai',
  '/igbts-supplier-mumbai',
  '/integrated-circuits-supplier-mumbai',
  '/microcontrollers-supplier-mumbai',
  '/transistors-optocouplers-supplier-mumbai',
  '/voltage-regulators-supplier-mumbai',
  '/diodes-rectifiers-supplier-mumbai',
  '/power-mosfets-supplier-pune',
  '/igbts-supplier-pune',
  // Old Aurangabad slug
  '/electronic-component-distributor-in-aurangabad'
]);

// Slugs of the 10 TN cities and 10 MH cities being replaced/updated
const tnCityNames = new Set(tnCitiesData.map(c => c.city.toLowerCase()));
const mhCityNames = new Set(mhCitiesData.map(c => c.city.toLowerCase()));

// Also handle Aurangabad -> Chhatrapati Sambhajinagar mapping
mhCityNames.add('aurangabad');

// Helper to create Schema for a city
function createCitySchema(c) {
  const fullUrl = `https://miraitechnologies.net${c.slug}`;
  
  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${fullUrl}#localbusiness`,
    "name": `Mirai Technologies - Electronic Components Distributor in ${c.city}`,
    "url": fullUrl,
    "telephone": "+91-93213-98188",
    "email": "sales@miraitechnologies.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "401, Aditya Residency, Chunabhatti Lane, Lamington Road",
      "addressLocality": "Mumbai",
      "postalCode": "400007",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "areaServed": c.city
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://miraitechnologies.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://miraitechnologies.net/market-area"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": c.city
      }
    ]
  };

  const faqList = (c.faqs || []).map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const faqPage = {
    "@type": "FAQPage",
    "mainEntity": faqList
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      breadcrumbs,
      faqPage
    ]
  };
}

// Format TN city entry
const formattedTnCities = tnCitiesData.map(c => {
  return {
    ...c,
    canonicalUrl: `https://miraitechnologies.net${c.slug}`,
    hasDetailedBlueprint: true,
    schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
    schema: createCitySchema(c)
  };
});

// Format MH city entry
const formattedMhCities = mhCitiesData.map(c => {
  return {
    ...c,
    canonicalUrl: `https://miraitechnologies.net${c.slug}`,
    hasDetailedBlueprint: true,
    schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
    schema: createCitySchema(c)
  };
});

// Filter out existing entries that match TN or MH cities or removed duplicate slugs
const keptCities = existingCityPages.filter(p => {
  if (slugsToRemove.has(p.slug)) return false;
  if (p.state === 'Tamil Nadu' && tnCityNames.has(p.city.toLowerCase())) return false;
  if (p.state === 'Maharashtra' && mhCityNames.has(p.city.toLowerCase())) return false;
  return true;
});

console.log(`Original cities count: ${existingCityPages.length}`);
console.log(`Kept other cities count: ${keptCities.length}`);
console.log(`Adding TN cities: ${formattedTnCities.length}`);
console.log(`Adding MH cities: ${formattedMhCities.length}`);

// Combine all cities
const finalCityPages = [
  ...formattedMhCities,
  ...formattedTnCities,
  ...keptCities
];

console.log(`Final total cities count: ${finalCityPages.length}`);

// Write back to cityPages.json
fs.writeFileSync(cityPagesPath, JSON.stringify(finalCityPages, null, 2), 'utf8');
console.log(`✅ Successfully updated ${cityPagesPath}`);

// Now update redirects.js with the new redirect mappings
const redirectUpdates = {
  // TN product duplicates -> clean canonical city pages
  "/power-mosfets-supplier-chennai": "/electronic-component-distributor-in-chennai",
  "/integrated-circuits-supplier-chennai": "/electronic-component-distributor-in-chennai",
  "/power-mosfets-supplier-coimbatore": "/electronic-component-distributor-in-coimbatore",
  // MH product duplicates -> clean canonical city pages
  "/power-mosfets-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/igbts-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/integrated-circuits-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/microcontrollers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/transistors-optocouplers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/voltage-regulators-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/diodes-rectifiers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/power-mosfets-supplier-pune": "/electronic-component-distributor-in-pune",
  "/igbts-supplier-pune": "/electronic-component-distributor-in-pune",
  // Aurangabad -> Chhatrapati Sambhajinagar
  "/electronic-component-distributor-in-aurangabad": "/electronic-component-distributor-in-chhatrapati-sambhajinagar",
  "/aurangabad": "/electronic-component-distributor-in-chhatrapati-sambhajinagar"
};

let redirectsContent = fs.readFileSync(redirectsPath, 'utf8');

// Insert redirect entries into redirectsMap if not already present
let updatedRedirectsMapStr = 'export const redirectsMap = {\n';
const existingRedirectMatches = redirectsContent.match(/export const redirectsMap = \{([\s\S]*?)\};/);

if (existingRedirectMatches) {
  const currentBlock = existingRedirectMatches[1];
  // Parse lines or merge
  const lines = currentBlock.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && l.startsWith('"'));
  
  const mergedMap = {};
  lines.forEach(line => {
    const parts = line.replace(/,$/, '').split(':');
    if (parts.length === 2) {
      const k = parts[0].trim().replace(/^"|"$/g, '');
      const v = parts[1].trim().replace(/^"|"$/g, '');
      mergedMap[k] = v;
    }
  });

  // Add the new ones
  Object.assign(mergedMap, redirectUpdates);

  const formattedLines = Object.entries(mergedMap).map(([k, v]) => `  "${k}": "${v}",`).join('\n');
  const newBlock = `export const redirectsMap = {\n${formattedLines}\n};`;
  redirectsContent = redirectsContent.replace(/export const redirectsMap = \{[\s\S]*?\};/, newBlock);
  fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
  console.log(`✅ Successfully updated ${redirectsPath} with clean redirects`);
}
