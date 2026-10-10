import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { apCitiesPart1 } from './data/ap_cities_part1.js';
import { apCitiesPart2 } from './data/ap_cities_part2.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const apCitiesData = [
  ...apCitiesPart1,
  ...apCitiesPart2
];

export function createCitySchema(c) {
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
    "areaServed": c.serviceAreas ? c.serviceAreas.areas.split(',').map(s => s.trim()) : [c.city, "Andhra Pradesh"]
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

  const productItems = (c.mosfetDistributor?.popularParts || []).map((part, idx) => ({
    "@type": "Product",
    "position": idx + 1,
    "name": `${part.partNumber} ${part.polarity || part.channel || ''} Power MOSFET`,
    "model": part.partNumber,
    "brand": {
      "@type": "Brand",
      "name": part.manufacturer || part.brand || "Manufacturer"
    },
    "description": `${part.partNumber} ${part.polarity || part.channel || ''} MOSFET in ${part.package} package (${part.ratings || ''}). Suitable for ${part.application}. Available with Certificate of Conformance from Mirai Technologies.`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "0.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mirai Technologies"
      }
    }
  }));

  const itemList = {
    "@type": "ItemList",
    "name": `Popular Power MOSFETs Supplied in ${c.city}`,
    "itemListElement": productItems
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      breadcrumbs,
      faqPage,
      itemList
    ]
  };
}

// 1. Write to ap_cities_data.js
const apCitiesDataPath = path.join(__dirname, 'ap_cities_data.js');
const exportContent = `export const apCitiesData = ${JSON.stringify(apCitiesData, null, 2)};\n`;
fs.writeFileSync(apCitiesDataPath, exportContent, 'utf8');
console.log(`✅ Successfully generated ${apCitiesData.length} Andhra Pradesh cities in ${apCitiesDataPath}`);

// 2. Format and inject into cityPages.json
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
let cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

const targetSlugs = new Set(apCitiesData.map(c => c.slug.toLowerCase()));
const targetCities = new Set(apCitiesData.map(c => c.city.toLowerCase()));

// Remove any existing Andhra Pradesh entries
const filteredCityPages = cityPages.filter(p => {
  if (p.state === 'Andhra Pradesh') return false;
  if (targetSlugs.has(p.slug.toLowerCase())) return false;
  return true;
});

const formattedApCities = apCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList, ItemList",
  introduction: c.whyTrust?.content?.join('\n\n') || '',
  whyMirai: c.whyTrust?.content?.[0] || '',
  heroContent: c.heroSub,
  ctaText: `Send your BOM, part number list, or requirements to sales@miraitechnologies.net or WhatsApp +91 93213 98188 for fast delivery to ${c.city}.`,
  footerGeoText: `Mirai Technologies supplies authentic electronic components, power MOSFETs, ICs, and passives to OEMs, EMS, and machinery manufacturers across ${c.city} and Andhra Pradesh.`,
  schema: createCitySchema(c)
}));

const updatedCityPages = [
  ...formattedApCities,
  ...filteredCityPages
];

fs.writeFileSync(cityPagesPath, JSON.stringify(updatedCityPages, null, 2), 'utf8');
console.log(`✅ Successfully updated cityPages.json with ${formattedApCities.length} Andhra Pradesh cities! Total pages: ${updatedCityPages.length}`);
