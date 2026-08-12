import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const domain = 'https://miraitechnologies.net';

// Load active pages
const cityPages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/cityPages.json'), 'utf-8'));

// Static core routes
const staticRoutes = [
  '/',
  '/about',
  '/certificate',
  '/products',
  '/products/integrated-circuit',
  '/products/mosfet-transistor',
  '/products/igbts',
  '/products/microcontrollers',
  '/products/diodes-rectifiers',
  '/products/transistors',
  '/products/optocouplers',
  '/products/passive-components',
  '/applications',
  '/applications/solar-inverter-components',
  '/applications/welding-machine-components',
  '/applications/smps-repair-parts',
  '/applications/ev-charger-components',
  '/applications/motor-drive-components',
  '/applications/ups-inverter-components',
  '/market-area',
  '/contact',
  '/blog'
];

// Combine static routes and city routes
const allUrls = [
  ...staticRoutes,
  ...cityPages.map(c => c.slug)
];

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

allUrls.forEach(urlPath => {
  const cleanPath = urlPath.startsWith('/') ? urlPath : '/' + urlPath;
  const priority = cleanPath === '/' ? '1.0' : (cleanPath.startsWith('/products/') || cleanPath.startsWith('/applications/') ? '0.8' : '0.7');
  xml += `  <url>\n`;
  xml += `    <loc>${domain}${cleanPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');
console.log(`Successfully generated sitemap.xml with ${allUrls.length} active URLs at ${outputPath}`);
