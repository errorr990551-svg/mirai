import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { odishaCitiesData } from './odisha_cities_data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');

console.log('Loading existing cityPages.json...');
let cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

// Helper to create Schema graph for a city
function createCitySchema(c) {
  const fullUrl = `https://miraitechnologies.net${c.slug}`;
  
  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${fullUrl}#localbusiness`,
    "name": `Mirai Technologies - Electronic Components & MOSFET Distributor in ${c.city}`,
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
    "areaServed": c.serviceAreas ? c.serviceAreas.areas.split(',').map(s => s.trim()) : [c.city, "Odisha"]
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

// Slugs & city names of Odisha cities
const targetSlugs = new Set(odishaCitiesData.map(c => c.slug.toLowerCase()));
const targetCities = new Set(odishaCitiesData.map(c => c.city.toLowerCase()));

// Filter out any existing / previous Odisha cities
const nonUpdatedPages = cityPages.filter(p => {
  if (targetSlugs.has((p.slug || '').toLowerCase())) return false;
  if (targetCities.has((p.city || '').toLowerCase())) return false;
  if ((p.state || '').toLowerCase() === 'odisha') return false;
  return true;
});

console.log(`Original cities count: ${cityPages.length}`);
console.log(`Non-Odisha cities preserved: ${nonUpdatedPages.length}`);

// Format all 10 Odisha cities with full blueprint metadata matching Maharashtra / West Bengal
const formattedOdishaCities = odishaCitiesData.map(c => {
  return {
    ...c,
    canonicalUrl: `https://miraitechnologies.net${c.slug}`,
    hasDetailedBlueprint: true,
    schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList, ItemList",
    introduction: c.whyTrust?.content?.join('\n\n') || '',
    whyMirai: c.whyTrust?.content?.[0] || '',
    heroContent: c.heroSub,
    ctaText: `Send your BOM, part number list, or repair spares to sales@miraitechnologies.net or WhatsApp +91 93213 98188 for fast dispatch to ${c.city}.`,
    footerGeoText: `Mirai Technologies supplies authentic electronic components, power MOSFETs, ICs, and passives to OEMs, industrial plants, workshops and labs across ${c.city} and Odisha.`,
    schema: createCitySchema(c)
  };
});

// Final combined array: keep clean order
const finalCityPages = [
  ...formattedOdishaCities,
  ...nonUpdatedPages
];

fs.writeFileSync(cityPagesPath, JSON.stringify(finalCityPages, null, 2), 'utf8');
console.log(`✅ Successfully updated cityPages.json! Total pages: ${finalCityPages.length}`);
console.log(`✅ Odisha detailed blueprint cities added/updated: ${formattedOdishaCities.length}`);
