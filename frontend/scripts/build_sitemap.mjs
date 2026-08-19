import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categories, products } from '../src/data/products.js';
import { blogPosts } from '../src/data/blog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BASE_URL = 'https://miraitechnologies.net';
const TODAY = new Date().toISOString().split('T')[0];
const cityPages = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'cityPages.json'), 'utf8'));


// 1. Generate sitemap.xml content
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Helper to add URL to xml
function addUrl(loc, priority = '0.5', changefreq = 'weekly') {
  let cleanLoc = loc.trim();
  if (!cleanLoc.startsWith('/')) {
    cleanLoc = '/' + cleanLoc;
  }
  if (cleanLoc.length > 1 && cleanLoc.endsWith('/')) {
    cleanLoc = cleanLoc.slice(0, -1);
  }
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${cleanLoc}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
}

import { applicationsData } from '../src/data/applicationsData.js';

// Add static & pillar pages
addUrl('/', '1.0', 'daily');
addUrl('/about', '0.8', 'monthly');
addUrl('/certificate', '0.8', 'monthly');
addUrl('/contact', '0.8', 'monthly');
addUrl('/products', '0.8', 'daily');
addUrl('/blog', '0.8', 'daily');
addUrl('/applications', '0.8', 'weekly');
addUrl('/authorized-distributor-brands', '0.9', 'weekly');
addUrl('/mosfet-distributor', '0.9', 'weekly');
addUrl('/transistor-distributor', '0.8', 'weekly');
addUrl('/microcontroller-distributor', '0.8', 'weekly');
addUrl('/voltage-regulator-distributor', '0.8', 'weekly');
addUrl('/diode-rectifier-distributor', '0.8', 'weekly');
addUrl('/optocoupler-distributor', '0.8', 'weekly');
addUrl('/igbt-distributor', '0.9', 'weekly');
addUrl('/ic-distributor', '0.9', 'weekly');

// Add application guides
applicationsData.forEach(app => {
  addUrl(`/applications/${app.slug}`, '0.8', 'weekly');
});

// Add category pages
categories.filter(category => products.some(p => p.category === category.slug)).forEach(category => {
  addUrl(`/products/${category.slug}`, '0.7', 'weekly');
});

// Add product pages
products.forEach(product => {
  addUrl(`/product/${product.fullSlug}`, '0.6', 'weekly');
});

// Add blog posts
blogPosts.forEach(post => {
  addUrl(`/blog/${post.slug}`, '0.6', 'weekly');
});

// Add market area
addUrl('/market-area', '0.7', 'weekly');

// Add city pages
cityPages.forEach(page => {
  addUrl(page.slug, '0.6', 'weekly');
});

xml += `</urlset>\n`;

// Write to public/sitemap.xml
fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`✅ Generated public/sitemap.xml with ${categories.length} categories, ${products.length} products, ${blogPosts.length} blog posts, and ${cityPages.length} city pages.`);

// 2. Generate robots.txt content
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

// Write to public/robots.txt
fs.writeFileSync(path.join(ROOT, 'public', 'robots.txt'), robotsTxt, 'utf8');
console.log(`✅ Generated public/robots.txt`);
