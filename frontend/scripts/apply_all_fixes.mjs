import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const mhDataPath = path.join(__dirname, 'mh_cities_data.js');
const kaDataPath = path.join(__dirname, 'karnataka_cities_data.js');
const tnDataPath = path.join(__dirname, 'tn_cities_data.js');
const prerenderPath = path.join(__dirname, 'prerender.mjs');
const cityPagesPath = path.join(ROOT, 'src/data/cityPages.json');

console.log('--- 1. Updating mh_cities_data.js ---');
let mhContent = fs.readFileSync(mhDataPath, 'utf8');

// A1: authorised -> authorized
mhContent = mhContent.replace(/authorised/g, 'authorized');
mhContent = mhContent.replace(/Authorised/g, 'Authorized');

// Solapur: Osmanabad -> Dharashiv
mhContent = mhContent.replace(/Osmanabad/g, 'Dharashiv');

// Navi Mumbai: closeness to the Navi Mumbai and JNPT port region -> closeness to the JNPT port
mhContent = mhContent.replace(/closeness to the Navi Mumbai and JNPT port region/g, 'closeness to the JNPT port');

// Pune: delete standalone "Chinchwad" in areas list (keep "Pimpri-Chinchwad")
mhContent = mhContent.replace(/, Chinchwad,/g, ',');
mhContent = mhContent.replace(/Chinchwad, /g, (match, offset, str) => {
  const before = str.slice(Math.max(0, offset - 10), offset);
  if (before.includes('Pimpri-')) return match;
  return '';
});

// Kolhapur: Satara, Karad
mhContent = mhContent.replace(/, Satara, Karad/g, '');
mhContent = mhContent.replace(/Satara, Karad, /g, '');

// Mumbai: aurangabad -> chhatrapati-sambhajinagar
mhContent = mhContent.replace(/\/electronic-component-distributor-in-aurangabad/g, '/electronic-component-distributor-in-chhatrapati-sambhajinagar');

fs.writeFileSync(mhDataPath, mhContent, 'utf8');
console.log('✅ Updated mh_cities_data.js basic text replacements');

console.log('--- 2. Updating karnataka_cities_data.js ---');
let kaContent = fs.readFileSync(kaDataPath, 'utf8');

// A1: authorised -> authorized
kaContent = kaContent.replace(/authorised/g, 'authorized');
kaContent = kaContent.replace(/Authorised/g, 'Authorized');

// A2: CoC, IGST invoice -> CoC, GST invoice
kaContent = kaContent.replace(/CoC, IGST invoice/g, 'CoC, GST invoice');

// Bengaluru link: hubli-dharwad -> hubballi-dharwad
kaContent = kaContent.replace(/\/electronic-component-distributor-in-hubli-dharwad/g, '/electronic-component-distributor-in-hubballi-dharwad');

// C1: Ballari 14A -> 11A
kaContent = kaContent.replace(/At 14 A: P_cond = 4\.51 W\. Temp rise = 180\.3°C\. T_J = 230\.3°C \(Warning\)\./g,
  'At 11 A: P_cond = 2.78 W. Temp rise = 111.3°C. T_J = 161.3°C (Warning).');

// Davanagere 12A -> 11A
kaContent = kaContent.replace(/At 12 A: P_cond = 3\.6 W\. Temp rise = 144°C\. T_J = 184°C \(Warning\)\./g,
  'At 11 A: P_cond = 3.03 W. Temp rise = 121.0°C. T_J = 161.0°C (Warning).');

// Hubballi-Dharwad 15A -> 13A
kaContent = kaContent.replace(/At 15 A: P_cond = 2\.48 W\. Temp rise = 153\.5°C\. T_J = 193\.5°C \(Warning\)\./g,
  'At 13 A: P_cond = 1.86 W. Temp rise = 115.3°C. T_J = 155.3°C (Warning).');

// Kalaburagi 12A -> 8A
kaContent = kaContent.replace(/At 12 A: P_cond = 5\.2 W\. Temp rise = 207\.4°C\. T_J = 255\.4°C \(Warning\)\./g,
  'At 8 A: P_cond = 2.30 W. Temp rise = 92.2°C. T_J = 140.2°C (Warning).');

// Mangaluru 15A -> 12A
kaContent = kaContent.replace(/At 15 A: P_cond = 2\.7 W\. Temp rise = 167\.4°C\. T_J = 207\.4°C \(Warning\)\./g,
  'At 12 A: P_cond = 1.73 W. Temp rise = 107.1°C. T_J = 147.1°C (Warning).');

// Shivamogga 14A -> 10A
kaContent = kaContent.replace(/At 14 A: P_cond = 4\.9 W\. Temp rise = 196°C\. T_J = 236°C \(Warning\)\. A 75% increase in current nearly triples the loss\./g,
  'At 10 A: P_cond = 2.5 W. Temp rise = 100°C. T_J = 140°C (Warning). A 25% increase in current raises the loss by about 56%.');
kaContent = kaContent.replace(/At 14 A: P_cond = 4\.9 W\. Temp rise = 196°C\. T_J = 236°C \(Warning\)\. … a 75% increase in current nearly triples the loss\./g,
  'At 10 A: P_cond = 2.5 W. Temp rise = 100°C. T_J = 140°C (Warning). … a 25% increase in current raises the loss by about 56%.');

// C2: Belagavi ratings format
kaContent = kaContent.replace(/"80 mΩ at 10 V"/g, '"80 mΩ max at 10 V"');
kaContent = kaContent.replace(/"8\.7 mΩ at 10 V"/g, '"8.7 mΩ max at 10 V"');
kaContent = kaContent.replace(/"60 mΩ at -10 V"/g, '"60 mΩ max at -10 V"');

// Hubballi-Dharwad ratings
kaContent = kaContent.replace(/"44 mΩ at 10 V"/g, '"44 mΩ max at 10 V"');
kaContent = kaContent.replace(/"-100 V \| 117 mΩ"/g, '"-100 V | 117 mΩ max at -10 V"');

// Mangaluru rating
kaContent = kaContent.replace(/"6\.5 mΩ at 10 V"/g, '"6.5 mΩ max at 10 V"');

// Mysuru STP10NK60Z rating
kaContent = kaContent.replace(/0\.65 Ω max at 10 V/g, '0.75 Ω max at 10 V');
kaContent = kaContent.replace(/rDsOn: "0\.65 Ω max at 10 V"/g, 'rDsOn: "0.75 Ω max at 10 V"');
kaContent = kaContent.replace(/rdsOn: "0\.65 Ω max at 10 V"/g, 'rdsOn: "0.75 Ω max at 10 V"');

// Mysuru worked example
kaContent = kaContent.replace(/STP10NK60Z in an LED driver\. R_DS\(on\) 0\.65 Ω \(650 mΩ\), T_A 35°C, θ_JA 62°C\/W \(TO-220, free air\)\. At 1 A: P_cond = 1 x 1 x 0\.65 = 0\.65 W\. Temp rise = 40\.3°C\. T_J = 75\.3°C \(Safe\)\. At 2 A: P_cond = 2\.6 W\. Temp rise = 161\.2°C\. T_J = 196\.2°C \(Warning\)\. High-voltage MOSFETs need a heatsink even at modest currents because on-resistance is high\./g,
  'STP10NK60Z in an LED driver. R_DS(on) 0.75 Ω (750 mΩ), T_A 35°C, θ_JA 62°C/W (TO-220, free air). At 1 A: P_cond = 1 x 1 x 0.75 = 0.75 W. Temp rise = 46.5°C. T_J = 81.5°C (Safe). At 1.5 A: P_cond = 1.69 W. Temp rise = 104.6°C. T_J = 139.6°C (Warning).');

// C3: Ballari areas
kaContent = kaContent.replace(/Anantapur border areas, /g, '');
kaContent = kaContent.replace(/, Raichur/g, '');
kaContent = kaContent.replace(/Raichur, /g, '');

// Shivamogga areas
kaContent = kaContent.replace(/Channagiri, Honnali, /g, '');
kaContent = kaContent.replace(/, Channagiri, Honnali/g, '');

// Disclaimers: append sentence
kaContent = kaContent.replace(/Check the datasheet\."/g, 'Check the datasheet. R_DS(on) is quoted at 25°C and rises considerably when the junction is hot."');

fs.writeFileSync(kaDataPath, kaContent, 'utf8');
console.log('✅ Updated karnataka_cities_data.js');

console.log('--- 3. Updating tn_cities_data.js ---');
let tnContent = fs.readFileSync(tnDataPath, 'utf8');

// A1: authorised -> authorized
tnContent = tnContent.replace(/authorised/g, 'authorized');
tnContent = tnContent.replace(/Authorised/g, 'Authorized');

// Sriperumbudur browse links
tnContent = tnContent.replace(/browseLink: "\/products\/smd-resistor"/g, (match, offset, str) => {
  const before = str.slice(Math.max(0, offset - 1000), offset);
  if (before.includes('Sriperumbudur') || before.includes('Erode')) {
    return 'browseLink: "/products/passive-components"';
  }
  return match;
});
tnContent = tnContent.replace(/browseLink: "\/products\/power-inductor"/g, 'browseLink: "/products/smd-power-inductor"');
tnContent = tnContent.replace(/browseLink: "\/products\/usb-connector"/g, 'browseLink: "/products/usb-power-connector"');

// Hosur browse link
tnContent = tnContent.replace(/browseLink: "\/products\/jst-connector"/g, 'browseLink: "/products/jst-wire-connector"');

// Vellore copy
tnContent = tnContent.replace(/matter more than reel pricing/g, 'matter more than the lowest price');
tnContent = tnContent.replace(/the city's hospital ecosystem attracts device developers\./g, 'instrument and device developers working with local hospitals and labs.');
tnContent = tnContent.replace(/Yes, subject to your quote\./g, 'Yes. Low MOQ applies; the exact MOQ is confirmed in your quote.');

// Tiruppur copy
tnContent = tnContent.replace(/many small shops with small repair budgets\./g, 'many small shops that repair often and buy in small lots.');
tnContent = tnContent.replace(/Relays: 12V and 24V DC coils, up to 10A contacts\./g, 'Relays: 3V to 24V DC coils, up to 10A contacts.');

// Salem copy
tnContent = tnContent.replace(/IGBTs: part of our active range\. Send part numbers to confirm availability\./g, 'IGBTs: available on request. Send part numbers to confirm availability.');

// Erode H2
tnContent = tnContent.replace(/Three Industries and a Campus Belt/g, 'Industries, Campuses and Workshops Around Erode');

// Sriperumbudur copy
tnContent = tnContent.replace(/a few cents' worth of parts/g, 'a few rupees\' worth of parts');
tnContent = tnContent.replace(/Mahindra World City, /g, '');
tnContent = tnContent.replace(/, Mahindra World City/g, '');

// Hosur H2
tnContent = tnContent.replace(/Built for a Town With Two Time Zones of Thinking/g, 'Production in Hosur, Design in Bengaluru');

// Hosur related list: add Bengaluru
tnContent = tnContent.replace(/internalLinks: \[\n\s+\{ text: "Chennai"/g, 'internalLinks: [\n      { text: "Bengaluru", url: "/electronic-component-distributor-in-bengaluru" },\n      { text: "Chennai"');

fs.writeFileSync(tnDataPath, tnContent, 'utf8');
console.log('✅ Updated tn_cities_data.js');

console.log('--- 4. Updating prerender.mjs ---');
let prerenderContent = fs.readFileSync(prerenderPath, 'utf8');

// Replace table cells for popularParts to handle all field names
const oldTableBlock = `                  <tr>
                    <td><strong>\${part.partNumber}</strong></td>
                    <td>\${part.manufacturer}</td>
                    <td>\${part.polarity}</td>
                    <td>\${part.vDs} | \${part.rDsOn}</td>
                    <td>\${part.package}</td>
                    <td>\${part.application}</td>
                  </tr>`;

const newTableBlock = `                  <tr>
                    <td><strong>\${part.partNumber}</strong></td>
                    <td>\${part.manufacturer || part.brand || ''}</td>
                    <td>\${part.polarity || part.channel || part.type || ''}</td>
                    <td>\${part.ratings ? part.ratings : \`\${part.vDs || part.vds || ''} | \${part.rDsOn || part.rdsOn || ''}\`}</td>
                    <td>\${part.package || ''}</td>
                    <td>\${part.application || part.applications || ''}</td>
                  </tr>`;

if (prerenderContent.includes(oldTableBlock)) {
  prerenderContent = prerenderContent.replace(oldTableBlock, newTableBlock);
  console.log('✅ Replaced popularParts table in prerender.mjs');
}

// Replace calculator block to include interactive HTML widget
const oldCalcBlock = `    const mosfetCalculatorHtml = page.mosfetCalculator ? \`
      <section style="margin-top: 32px; background-color: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2>\${page.mosfetCalculator.h2}</h2>
        <p style="margin-top: 8px; color: #475569;">\${page.mosfetCalculator.purpose}</p>
        <div style="margin-top: 16px; font-family: monospace; font-size: 14px; background: #fff; padding: 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
          <p><strong>Formulas:</strong></p>
          <p>Conduction loss: P_cond = (I_RMS)^2 × R_DS(on)</p>
          <p>Junction temperature: T_J = T_A + (P_cond × θ_JA)</p>
        </div>
        \${page.mosfetCalculator.workedExample ? \`
          <div style="margin-top: 16px;">
            <p><strong>Worked Example (\${page.mosfetCalculator.workedExample.part}):</strong> \${page.mosfetCalculator.workedExample.note || ''}</p>
          </div>
        \` : ''}
        <p style="margin-top: 16px; font-size: 12px; color: #64748b; font-style: italic;">\${page.mosfetCalculator.disclaimer || ''}</p>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    \` : '';`;

const newCalcBlock = `    const mosfetCalculatorHtml = page.mosfetCalculator ? \`
      <section style="margin-top: 32px; background-color: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2>\${page.mosfetCalculator.h2}</h2>
        <div class="mosfet-calc" style="margin-top: 16px; background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1;">
          <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <label style="display: flex; flex-direction: column; font-size: 13px; font-weight: 600;">Current (A) <input id="mc-i" type="number" value="\${page.mosfetCalculator.defaultIrms || 5}" step="0.1" style="padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-top: 4px;"></label>
            <label style="display: flex; flex-direction: column; font-size: 13px; font-weight: 600;">R_DS(on) (mΩ) <input id="mc-r" type="number" value="\${page.mosfetCalculator.defaultRdsOn || 25}" step="0.1" style="padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-top: 4px;"></label>
            <label style="display: flex; flex-direction: column; font-size: 13px; font-weight: 600;">Ambient (°C) <input id="mc-ta" type="number" value="\${page.mosfetCalculator.defaultTa || 40}" style="padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-top: 4px;"></label>
            <label style="display: flex; flex-direction: column; font-size: 13px; font-weight: 600;">θ_JA (°C/W) <input id="mc-th" type="number" value="\${page.mosfetCalculator.defaultThetaJa || 40}" style="padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-top: 4px;"></label>
          </div>
          <button type="button" onclick="mcCalc()" style="background: #2563eb; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Calculate</button>
          <p id="mc-out" style="margin-top: 12px; font-weight: bold; color: #1e293b;"></p>
        </div>
        <script>
        function mcCalc(){
          var i=+document.getElementById('mc-i').value,
              r=+document.getElementById('mc-r').value/1000,
              ta=+document.getElementById('mc-ta').value,
              th=+document.getElementById('mc-th').value;
          var p=i*i*r, tj=ta+p*th, s='Safe';
          if(tj>175) s='Exceeds 175°C max, part will fail';
          else if(tj>125) s='Warning';
          document.getElementById('mc-out').textContent =
            'P_cond = '+p.toFixed(2)+' W, T_J = '+tj.toFixed(1)+'°C ('+s+')';
        }
        </script>
        <div style="margin-top: 16px; font-family: monospace; font-size: 14px; background: #fff; padding: 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
          <p><strong>Formulas:</strong></p>
          <p>Conduction loss: P_cond = (I_RMS)^2 × R_DS(on)</p>
          <p>Junction temperature: T_J = T_A + (P_cond × θ_JA)</p>
        </div>
        \${page.mosfetCalculator.workedExample ? \`
          <div style="margin-top: 16px;">
            <p><strong>\${typeof page.mosfetCalculator.workedExample === 'string'
              ? (page.mosfetCalculator.workedExample.startsWith('Worked Example') ? page.mosfetCalculator.workedExample : \`Worked Example: \${page.mosfetCalculator.workedExample}\`)
              : \`Worked Example (\${page.mosfetCalculator.workedExample.part || ''}): \${page.mosfetCalculator.workedExample.note || ''}\`}</strong></p>
          </div>
        \` : ''}
        <p style="margin-top: 16px; font-size: 12px; color: #64748b; font-style: italic;">\${page.mosfetCalculator.disclaimer || ''}</p>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    \` : '';`;

if (prerenderContent.includes(oldCalcBlock)) {
  prerenderContent = prerenderContent.replace(oldCalcBlock, newCalcBlock);
  console.log('✅ Replaced mosfetCalculatorHtml in prerender.mjs');
}

// Add whatWeSupplyHtml to prerender.mjs if missing
if (!prerenderContent.includes('const whatWeSupplyHtml')) {
  const insertMarker = 'const landscapeHtml =';
  const whatWeSupplyDef = `    const whatWeSupplyHtml = page.whatWeSupply ? \`
      <section style="margin-top: 32px;">
        <h2>\${page.whatWeSupply.h2}</h2>
        \${page.whatWeSupply.groups ? page.whatWeSupply.groups.map(grp => \`
          <div style="margin-top: 20px;">
            <h3>\${grp.title}</h3>
            <ul style="margin-top: 8px; line-height: 1.8;">
              \${(grp.items || []).map(it => \`<li>\${it}</li>\`).join('')}
            </ul>
          </div>
        \`).join('') : ''}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    \` : '';\n\n`;
  prerenderContent = prerenderContent.replace(insertMarker, whatWeSupplyDef + insertMarker);
  
  // also add \${whatWeSupplyHtml} to fullHtml
  prerenderContent = prerenderContent.replace('\${mosfetDistributorHtml}', '\${whatWeSupplyHtml}\n        \${mosfetDistributorHtml}');
  console.log('✅ Added whatWeSupplyHtml into prerender.mjs');
}

fs.writeFileSync(prerenderPath, prerenderContent, 'utf8');
console.log('✅ Updated prerender.mjs');
