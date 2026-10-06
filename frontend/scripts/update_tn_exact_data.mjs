import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tnDataPath = path.join(__dirname, 'tn_cities_data.js');

import { tnCitiesData } from './tn_cities_data.js';

const contactInfoBlock = {
  phones: ["+91 93213 98188", "+91 98201 22744", "+91 91368 10360"],
  office: "401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007",
  registered: "B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034"
};

for (const c of tnCitiesData) {
  // Add contactInfo to all TN cities
  c.contactInfo = contactInfoBlock;

  // Capitalize H3 if lowercase
  if (c.landscape && c.landscape.items) {
    c.landscape.items.forEach(it => {
      if (it.h3 && it.h3.length > 0) {
        it.h3 = it.h3.charAt(0).toUpperCase() + it.h3.slice(1);
      }
    });
  }
  if (c.productSections) {
    c.productSections.forEach(sec => {
      if (sec.items) {
        sec.items.forEach(it => {
          if (it.h3 && it.h3.length > 0) {
            it.h3 = it.h3.charAt(0).toUpperCase() + it.h3.slice(1);
          }
        });
      }
    });
  }

  // Spec Snapshot fixes
  if (c.specSnapshot && c.specSnapshot.rows) {
    if (c.city === 'Vellore' || c.city === 'Madurai') {
      c.specSnapshot.rows.forEach(r => {
        if (r.browseText === 'ICs' || (r.col1 && r.col1.includes('IC'))) {
          r.col2 = "TI, ST, NXP, Microchip, ADI";
          if (r.parts) r.parts = "TI, ST, NXP, Microchip, ADI";
        }
      });
    }

    if (c.city === 'Tiruppur') {
      c.specSnapshot.rows.forEach(r => {
        if (r.browseText === 'MCUs' || (r.col1 && r.col1.includes('Industrial'))) {
          r.col2 = "MCUs; buck/boost/LDO regulators";
          if (r.parts) r.parts = "MCUs; buck/boost/LDO regulators";
        }
      });
    }

    if (c.city === 'Salem') {
      c.specSnapshot.rows.forEach(r => {
        if (r.browseText === 'Diodes' || (r.col1 && r.col1.includes('Diode'))) {
          r.col3 = "SMA/SMB/SMC; DO-35/DO-41";
          if (r.spec) r.spec = "SMA/SMB/SMC; DO-35/DO-41";
        }
      });
    }

    if (c.city === 'Chennai') {
      c.specSnapshot.rows.forEach(r => {
        if (r.browseText === 'Capacitors' || (r.col1 && r.col1.includes('Capacitor'))) {
          r.col3 = "C0G/NP0 MLCC, 0402–1812";
          if (r.spec) r.spec = "C0G/NP0 MLCC, 0402–1812";
        }
      });
    }
  }

  // Trichy (Tiruchirappalli)
  if (c.city === 'Tiruchirappalli') {
    if (c.qualityCompliance && c.qualityCompliance.points) {
      c.qualityCompliance.points = c.qualityCompliance.points.filter(pt => !pt.includes('supplied defence units since 1999'));
      c.qualityCompliance.registeredAddressNote = "Registered Address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034.";
    }
  }
}

const fileExport = `export const tnCitiesData = ${JSON.stringify(tnCitiesData, null, 2)};\n`;
fs.writeFileSync(tnDataPath, fileExport, 'utf8');
console.log('✅ Successfully wrote updated tn_cities_data.js with contact block, capitalized H3s, and spec snapshots');
