import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tnCitiesData } from './tn_cities_data.js';
import { mhCitiesData } from './mh_cities_data.js';
import { karnatakaCitiesData } from './karnataka_cities_data.js';
import { gujaratCitiesData } from './gujarat_cities_data.js';
import { mpCitiesData } from './mp_cities_data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
const redirectsPath = path.join(__dirname, '../src/data/redirects.js');

console.log('Loading existing cityPages.json...');
const existingCityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

// Duplicate / legacy slugs to purge
const slugsToRemove = new Set([
  '/power-mosfets-supplier-chennai',
  '/integrated-circuits-supplier-chennai',
  '/power-mosfets-supplier-coimbatore',
  '/power-mosfets-supplier-mumbai',
  '/igbts-supplier-mumbai',
  '/integrated-circuits-supplier-mumbai',
  '/microcontrollers-supplier-mumbai',
  '/transistors-optocouplers-supplier-mumbai',
  '/voltage-regulators-supplier-mumbai',
  '/diodes-rectifiers-supplier-mumbai',
  '/power-mosfets-supplier-pune',
  '/igbts-supplier-pune',
  '/electronic-component-distributor-in-aurangabad',
  '/electronic-component-distributor-in-hubli-dharwad'
]);

const tnCityNames = new Set(tnCitiesData.map(c => c.city.toLowerCase()));
const mhCityNames = new Set(mhCitiesData.map(c => c.city.toLowerCase()));
const kaCityNames = new Set(karnatakaCitiesData.map(c => c.city.toLowerCase()));
const gjCityNames = new Set(gujaratCitiesData.map(c => c.city.toLowerCase()));
const mpCityNames = new Set(mpCitiesData.map(c => c.city.toLowerCase()));
mhCityNames.add('aurangabad');
kaCityNames.add('hubli-dharwad');
kaCityNames.add('bangalore');

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

// 1. Format TN cities
const formattedTnCities = tnCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
  schema: createCitySchema(c)
}));

// 2. Format MH cities
const formattedMhCities = mhCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
  schema: createCitySchema(c)
}));

// 3. Format KA cities
const formattedKaCities = karnatakaCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
  schema: createCitySchema(c)
}));

// 4. Format GJ cities
const formattedGjCities = gujaratCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
  schema: createCitySchema(c)
}));

// 5. Format MP cities
const formattedMpCities = mpCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList",
  schema: createCitySchema(c)
}));

// 6. Clean up other existing cities
const keptCities = existingCityPages
  .filter(p => {
    if (slugsToRemove.has(p.slug)) return false;
    if (p.state === 'Tamil Nadu' && tnCityNames.has(p.city.toLowerCase())) return false;
    if (p.state === 'Maharashtra' && mhCityNames.has(p.city.toLowerCase())) return false;
    if (p.state === 'Karnataka' && kaCityNames.has(p.city.toLowerCase())) return false;
    if (p.state === 'Gujarat' && gjCityNames.has(p.city.toLowerCase())) return false;
    if (p.state === 'Madhya Pradesh' && mpCityNames.has(p.city.toLowerCase())) return false;
    return true;
  })
  .map(p => {
    // Stringify and clean up text
    let str = JSON.stringify(p);
    
    // A1: authorised -> authorized
    str = str.replace(/authorised/g, 'authorized');
    str = str.replace(/Authorised/g, 'Authorized');

    // A2: IGST invoice -> GST invoice
    str = str.replace(/CoC, IGST invoice/g, 'CoC, GST invoice');

    // Driver arrays
    str = str.replace(/7-segment driver ICs \(ULN2003\)/g, 'Darlington driver arrays (ULN2003)');
    
    // Diode voltage ranges
    str = str.replace(/voltage ratings 50V–1000V/g, '20V to 1000V');
    str = str.replace(/voltage ratings 50V-1000V/g, '20V to 1000V');

    // Quotation turnaround
    str = str.replace(/same-day quotations/g, 'quotations within 24 hours');
    str = str.replace(/within 2 business hours/g, 'within 24 hours');

    // MOQ
    str = str.replace(/no fixed minimum order quantity[^\n"]*single-piece[^\n"]*/g, 
      'low MOQ flexibility, from prototype to production lots; exact MOQ confirmed in your quote');

    // Fix truncated meta descriptions
    str = str.replace(/sales@mirait\.\.\./g, 'sales@miraitechnologies.net. Low MOQ, CoC, GST invoice.');

    // Remove "Loading premium experience..."
    str = str.replace(/Loading premium experience\.\.\./g, '');

    // Old city link fixes
    str = str.replace(/\/electronic-component-distributor-in-hubli-dharwad/g, '/electronic-component-distributor-in-hubballi-dharwad');
    str = str.replace(/\/electronic-component-distributor-in-aurangabad/g, '/electronic-component-distributor-in-chhatrapati-sambhajinagar');

    const obj = JSON.parse(str);

    // Tirunelveli special fixes
    if (obj.city === 'Tirunelveli') {
      if (obj.metaDescription && obj.metaDescription.includes('sales@mirait')) {
        obj.metaDescription = "Authorized distributor of Power MOSFETs, IGBTs, ICs & semiconductors in Tirunelveli. Genuine parts, fast delivery, CoC, GST invoice. Low MOQ.";
      }
      if (obj.metaTitle && obj.metaTitle.length > 60) {
        obj.metaTitle = "Tirunelveli Electronic Component & MOSFET Distributor | Mirai";
      }
      if (obj.productCategories) {
        obj.productCategories = obj.productCategories.replace(/Tirunelveli's Power and allied industries/g, "Tirunelveli's wind-power, engineering and allied industries");
      }
    }

    return obj;
  });

console.log(`Formatted MH cities: ${formattedMhCities.length}`);
console.log(`Formatted TN cities: ${formattedTnCities.length}`);
console.log(`Formatted KA cities: ${formattedKaCities.length}`);
console.log(`Formatted GJ cities: ${formattedGjCities.length}`);
console.log(`Formatted MP cities: ${formattedMpCities.length}`);
console.log(`Kept other cities: ${keptCities.length}`);

const finalCityPages = [
  ...formattedMhCities,
  ...formattedTnCities,
  ...formattedKaCities,
  ...formattedGjCities,
  ...formattedMpCities,
  ...keptCities
];

console.log(`Final total city pages: ${finalCityPages.length}`);

fs.writeFileSync(cityPagesPath, JSON.stringify(finalCityPages, null, 2), 'utf8');
console.log(`✅ Successfully wrote updated ${cityPagesPath}`);

// Update redirects.js
let redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
if (!redirectsContent.includes('"/electronic-component-distributor-in-aurangabad"')) {
  redirectsContent = redirectsContent.replace('export default {', 'export default {\n  "/electronic-component-distributor-in-aurangabad": "/electronic-component-distributor-in-chhatrapati-sambhajinagar",\n  "/electronic-component-distributor-in-hubli-dharwad": "/electronic-component-distributor-in-hubballi-dharwad",');
  fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
  console.log('✅ Updated redirects.js');
}
