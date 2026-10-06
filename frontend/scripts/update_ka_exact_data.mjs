import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kaDataPath = path.join(__dirname, 'karnataka_cities_data.js');

import { karnatakaCitiesData } from './karnataka_cities_data.js';

const kaRelatedCities = {
  "Ballari": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Kalaburagi", url: "/electronic-component-distributor-in-kalaburagi" }
  ],
  "Belagavi": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Kolhapur", url: "/electronic-component-distributor-in-kolhapur" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" }
  ],
  "Davanagere": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" }
  ],
  "Hubballi-Dharwad": [
    { text: "Belagavi", url: "/electronic-component-distributor-in-belagavi" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" }
  ],
  "Kalaburagi": [
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" },
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Hyderabad", url: "/electronic-component-distributor-in-hyderabad" }
  ],
  "Mangaluru": [
    { text: "Mysuru", url: "/electronic-component-distributor-in-mysuru" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" },
    { text: "Kochi", url: "/electronic-component-distributor-in-kochi" }
  ],
  "Mysuru": [
    { text: "Bengaluru", url: "/electronic-component-distributor-in-bengaluru" },
    { text: "Mangaluru", url: "/electronic-component-distributor-in-mangaluru" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" }
  ],
  "Shivamogga": [
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Mangaluru", url: "/electronic-component-distributor-in-mangaluru" },
    { text: "Mysuru", url: "/electronic-component-distributor-in-mysuru" }
  ]
};

const commonProductLinks = [
  { text: "MOSFETs", url: "/products/mosfet-transistor" },
  { text: "Integrated Circuits", url: "/products/integrated-circuit" },
  { text: "Microcontrollers", url: "/products/microcontroller" },
  { text: "Capacitors", url: "/products/capacitor" },
  { text: "Resistors", url: "/products/resistor" },
  { text: "Diodes", url: "/products/diode" },
  { text: "Relays", url: "/products/relay" }
];

for (const c of karnatakaCitiesData) {
  // A2: Meta CoC, IGST invoice -> CoC, GST invoice
  if (c.metaDescription) {
    c.metaDescription = c.metaDescription.replace(/CoC, IGST invoice/g, 'CoC, GST invoice');
    c.metaDescription = c.metaDescription.replace(/authorised/g, 'authorized');
    c.metaDescription = c.metaDescription.replace(/Authorised/g, 'Authorized');
  }

  // Disclaimer update
  if (c.mosfetCalculator) {
    c.mosfetCalculator.disclaimer = "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet. R_DS(on) is quoted at 25°C and rises considerably when the junction is hot.";
  }

  // Update productLinks
  c.productLinks = commonProductLinks;

  // Update related cities
  if (kaRelatedCities[c.city]) {
    c.relatedCities = kaRelatedCities[c.city];
    c.internalLinks = [
      ...kaRelatedCities[c.city],
      { text: "Market Area Hub", url: "/market-area" }
    ];
  }
}

const fileExport = `export const karnatakaCitiesData = ${JSON.stringify(karnatakaCitiesData, null, 2)};\n`;
fs.writeFileSync(kaDataPath, fileExport, 'utf8');
console.log('✅ Successfully wrote updated karnataka_cities_data.js with clean product links and related cities');
