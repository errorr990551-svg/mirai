import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categories, products } from '../src/data/products.js';
import { blogPosts } from '../src/data/blog.js';
import { applicationsData } from '../src/data/applicationsData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');
const CITY_PAGES_PATH = path.join(ROOT, 'src', 'data', 'cityPages.json');

// Check if build folder exists
if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`❌ Build template not found at ${TEMPLATE_PATH}. Ensure "vite build" runs before prerendering.`);
  process.exit(1);
}

const rawTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const baseTemplate = rawTemplate
  .replace(/<div\s+id="root">[\s\S]*?(?=\s*<script\b|<\/body>)/i, '<div id="root"></div>')
  .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
  .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/gi, '')
  .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>\s*/gi, '');
const cityPages = JSON.parse(fs.readFileSync(CITY_PAGES_PATH, 'utf8'));

// Helper to convert basic Markdown to simple HTML
function mdToHtml(md) {
  if (!md) return '';
  let html = md.replace(/\r\n/g, '\n');

  // Headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');

  // Bullet lists
  let inList = false;
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const listMatch = line.match(/^[-*]\s+(.*?)$/);
    if (listMatch) {
      let prefix = '';
      if (!inList) {
        inList = true;
        prefix = '<ul>\n';
      }
      return prefix + `  <li>${listMatch[1]}</li>`;
    } else {
      let suffix = '';
      if (inList) {
        inList = false;
        suffix = '</ul>\n';
      }
      return suffix + line;
    }
  });
  if (inList) {
    processedLines.push('</ul>');
  }
  html = processedLines.join('\n');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<li') || p.startsWith('</ul') || p.startsWith('|')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).filter(Boolean).join('\n');

  return html;
}

// Global schemas
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://miraitechnologies.net/#organization",
  "name": "Mirai Technologies",
  "url": "https://miraitechnologies.net/",
  "logo": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
  "foundingDate": "1999",
  "description": "Authorized electronic components distributor in Mumbai since 1999. Genuine ICs, MOSFETs, microcontrollers, capacitors, resistors and connectors with CoC, GST invoice and pan-India delivery.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "401, Aditya Residency, Chunabhatti Lane, Lamington Road",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400007",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-93213-98188",
      "contactType": "sales",
      "email": "sales@miraitechnologies.net",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "mr"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-98201-22744",
      "contactType": "sales"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-91368-10360",
      "contactType": "sales"
    }
  ],
  "sameAs": ["https://www.indiamart.com/mirai-technologies/"]
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://miraitechnologies.net/#localbusiness",
  "name": "Mirai Technologies",
  "url": "https://miraitechnologies.net/",
  "logo": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
  "image": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
  "telephone": "+91-93213-98188",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "401, Aditya Residency, Chunabhatti Lane, Lamington Road",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400007",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "19:00"
    }
  ]
};

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are your components genuine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We source directly from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you supply small quantities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer flexible MOQs, so prototype buyers and production teams are both welcome."
      }
    },
    {
      "@type": "Question",
      "name": "Will I get a GST invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every B2B order comes with a complete GST invoice for Input Tax Credit."
      }
    },
    {
      "@type": "Question",
      "name": "Which brands do you carry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices, and MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help if my part is obsolete or out of stock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our team supports expert cross-referencing to find a suitable alternative."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver outside Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We deliver across India to all major industrial cities."
      }
    },
    {
      "@type": "Question",
      "name": "How fast will I get a quote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Within 24 hours of receiving your BOM or part list."
      }
    }
  ]
};

const ABOUT_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Since when has Mirai Technologies been in business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We were established in Mumbai in 1999 and have over 25 years of experience in electronic component distribution."
      }
    },
    {
      "@type": "Question",
      "name": "Is Mirai Technologies an authorized distributor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We are an authorized distributor and stockist of active and passive components, and we source directly from manufacturers or authorized franchise lines."
      }
    },
    {
      "@type": "Question",
      "name": "What certifications do you hold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO 9001:2015 quality management, an ANSI/ESD S20.20 compliant handling facility, and RoHS/REACH compliance verification."
      }
    },
    {
      "@type": "Question",
      "name": "Who are your customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OEMs, EMS companies, R&D labs and defence units across automotive, industrial, consumer electronics and telecom."
      }
    },
    {
      "@type": "Question",
      "name": "Where are you located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our office and shipping address is in Lamington Road, Mumbai. See the details below."
      }
    }
  ]
};

function truncateToWordBoundary(text, maxLen) {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace).trim();
  }
  return truncated.trim();
}

// Dynamic BreadcrumbList generator
function getBreadcrumbSchema(route, name) {
  const cleanRoute = route.replace(/^\//, '').replace(/\/$/, '');
  const segments = cleanRoute.split('/').filter(Boolean);
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://miraitechnologies.net"
    }
  ];
  
  let currentPath = '';
  segments.forEach((seg, index) => {
    currentPath += `/${seg}`;
    let segName = seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    if (index === segments.length - 1 && name) {
      segName = name;
    }
    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segName,
      "item": `https://miraitechnologies.net${currentPath}`
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

// Nearby cities helper
function getNearbyCities(currentCity, currentState) {
  let siblings = cityPages.filter(c => c.state === currentState && c.city !== currentCity);
  if (siblings.length < 6) {
    const others = cityPages.filter(c => c.state !== currentState && c.city !== currentCity);
    siblings = [...siblings, ...others].slice(0, 7);
  } else if (siblings.length > 8) {
    siblings = siblings.slice(0, 7);
  }
  return siblings;
}

// Main prerender helper
function prerenderPage(route, seoDetails, bodyHtml, schemas = []) {
  // Normalize route to clean path without leading or trailing slashes
  let cleanRoute = route.replace(/^\//, '').replace(/\/+$/, '');
  let targetFile = path.join(DIST, 'index.html'); // Fallback for root homepage
  let flatFile = null;

  if (cleanRoute !== '') {
    // 1. Flat file for Apache direct serving without trailing slash: dist/<cleanRoute>.html
    flatFile = path.join(DIST, `${cleanRoute}.html`);
    const flatDir = path.dirname(flatFile);
    if (!fs.existsSync(flatDir)) {
      fs.mkdirSync(flatDir, { recursive: true });
    }

    // 2. Nested directory file: dist/<cleanRoute>/index.html
    const outputDir = path.join(DIST, cleanRoute);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    targetFile = path.join(outputDir, 'index.html');
  }

  let html = baseTemplate;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${seoDetails.title}</title>`);

  // Replace Meta Description
  const descTag = `<meta name="description" content="${seoDetails.description.replace(/"/g, '&quot;')}" />`;
  if (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i)) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, descTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${descTag}\n</head>`);
  }

  // Remove keywords tag if it exists in template
  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, '');

  // Replace Canonical Link (standardizing non-www and non-trailing slash)
  const canonicalUrl = (seoDetails.canonical || `https://miraitechnologies.net/${cleanRoute}`).replace(/\/+$/, '');
  const canonicalTag = `<link rel="canonical" href="${cleanRoute === '' ? 'https://miraitechnologies.net/' : canonicalUrl}" />`;
  if (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i)) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
  }

  // Build final schemas array
  const finalSchemas = [...schemas];
  
  // Check if Organization/LocalBusiness is present
  const hasOrg = finalSchemas.some(s => 
    s["@type"] === "Organization" || 
    s["@type"] === "LocalBusiness" ||
    (s["@graph"] && s["@graph"].some(sub => sub["@type"] === "Organization" || sub["@type"] === "LocalBusiness"))
  );
  if (!hasOrg) {
    finalSchemas.push(ORG_SCHEMA);
  }

  // Check if BreadcrumbList is present
  const hasBreadcrumb = finalSchemas.some(s => 
    s["@type"] === "BreadcrumbList" || 
    (s["@graph"] && s["@graph"].some(sub => sub["@type"] === "BreadcrumbList"))
  );
  if (!hasBreadcrumb) {
    let pageName = seoDetails.title.split('|')[0].trim();
    finalSchemas.push(getBreadcrumbSchema(route, pageName));
  }

  // Inject Article schema for blog posts
  if (cleanRoute.startsWith('blog/')) {
    const hasArticle = finalSchemas.some(s => s["@type"] === "Article" || s["@type"] === "BlogPosting");
    if (!hasArticle) {
      const blogSlug = cleanRoute.split('/').pop();
      const post = blogPosts.find(p => p.slug === blogSlug);
      if (post) {
        finalSchemas.push({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.metaDescription || post.excerpt,
          "datePublished": post.publishDate,
          "author": {
            "@type": "Organization",
            "name": "Mirai Technologies"
          },
          "publisher": ORG_SCHEMA,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://miraitechnologies.net/blog/${post.slug}`
          }
        });
      }
    }
  }

  // Inject Schemas in Head (sanitize any trailing slash from schema URLs)
  if (finalSchemas && finalSchemas.length > 0) {
    const cleanFinalSchemas = JSON.parse(JSON.stringify(finalSchemas, (key, value) => {
      if (typeof value === 'string' && value.startsWith('https://miraitechnologies.net/') && value !== 'https://miraitechnologies.net/' && value.endsWith('/')) {
        return value.replace(/\/+$/, '');
      }
      return value;
    }));
    const schemaTags = cleanFinalSchemas.map(schema =>
      `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`
    ).join('\n');
    html = html.replace(/<\/head>/i, `${schemaTags}\n</head>`);
  }

  // Inject Pre-rendered Body content inside <div id="root"></div>
  const fullBodyHtml = `
    <div id="prerender-content">
      <header style="padding: 16px 24px; background-color: #030712; color: #fff; border-bottom: 1px solid #1e293b;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <a href="/" style="font-weight: 800; font-size: 20px; color: #38bdf8; text-decoration: none;">Mirai Technologies</a>
          <nav style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="/" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Home</a>
            <a href="/about" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">About</a>
            <a href="/products" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Products</a>
            <a href="/blog" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Blog</a>
            <a href="/market-area" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Market Area</a>
            <a href="/contact" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Contact</a>
          </nav>
        </div>
      </header>
      <main style="max-width: 1200px; margin: 40px auto; padding: 0 24px; color: #0f172a; line-height: 1.7;">
        ${bodyHtml}
      </main>
      <footer style="padding: 40px 24px; background-color: #030712; color: #94a3b8; text-align: center; font-size: 14px; border-top: 1px solid #1e293b;">
        <div style="max-width: 1200px; margin: 0 auto; margin-bottom: 24px;">
          <p style="font-weight: bold; color: #f8fafc; margin-bottom: 12px; font-size: 16px;">We Deliver Across India</p>
          <p style="line-height: 2;">
            <a href="/electronic-component-distributor-in-mumbai" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Mumbai</a> |
            <a href="/electronic-component-distributor-in-delhi" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Delhi</a> |
            <a href="/electronic-component-distributor-in-bengaluru" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Bengaluru</a> |
            <a href="/electronic-component-distributor-in-hyderabad" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Hyderabad</a> |
            <a href="/electronic-component-distributor-in-chennai" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Chennai</a> |
            <a href="/electronic-component-distributor-in-pune" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Pune</a> |
            <a href="/electronic-component-distributor-in-ahmedabad" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Ahmedabad</a> |
            <a href="/electronic-component-distributor-in-kolkata" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Kolkata</a> |
            <a href="/electronic-component-distributor-in-surat" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Surat</a> |
            <a href="/electronic-component-distributor-in-jaipur" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Jaipur</a> |
            <a href="/electronic-component-distributor-in-noida" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Noida</a> |
            <a href="/electronic-component-distributor-in-faridabad" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Faridabad</a> |
            <a href="/electronic-component-distributor-in-coimbatore" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Coimbatore</a> |
            <a href="/electronic-component-distributor-in-indore" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Indore</a> |
            <a href="/electronic-component-distributor-in-nagpur" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Nagpur</a> |
            <a href="/electronic-component-distributor-in-lucknow" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Lucknow</a> |
            <a href="/electronic-component-distributor-in-vadodara" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Vadodara</a> |
            <a href="/electronic-component-distributor-in-chandigarh" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Chandigarh</a> |
            <a href="/electronic-component-distributor-in-kochi" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Kochi</a> |
            <a href="/electronic-component-distributor-in-visakhapatnam" style="color: #94a3b8; text-decoration: none; margin: 0 5px;">Visakhapatnam</a> |
            <a href="/market-area" style="color: #38bdf8; font-weight: bold; text-decoration: none; margin-left: 10px;">View all cities &rarr;</a>
          </p>
        </div>
        <p>&copy; 2026 Mirai Technologies. All rights reserved. 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007.</p>
      </footer>
    </div>
  `;

  html = html.replace(/<div\s+id="root">[\s\S]*?(?=\s*<script\b|<\/body>)/i, `<div id="root">${fullBodyHtml}</div>`);

  fs.writeFileSync(targetFile, html, 'utf8');
  if (flatFile) {
    fs.writeFileSync(flatFile, html, 'utf8');
  }
}

console.log('🏁 Starting Static Site Prerendering for SEO...');

// 1. Homepage (overwrite dist/index.html to include indexable body & schema)
const homeBody = `
  <section>
    <h1>Electronic Components Distributor in India: Genuine ICs, MOSFETs & Passives Since 1999</h1>
    <p><strong>Authentic, factory-traceable semiconductors and passive components for OEMs, EMS companies, R&D labs and defence units. Supplied from Mumbai to the whole of India.</strong></p>
    <p>Mirai Technologies has helped Indian manufacturers keep their production lines running for over 25 years. Send us your BOM or part number list. Our team replies with pricing, availability and traceability within 24 hours.</p>
    <p style="margin-top: 20px;">
      <a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">Request a Quote</a>
      <a href="/products" style="display: inline-block; padding: 10px 20px; border: 1px solid #2563eb; color: #2563eb; text-decoration: none; border-radius: 6px; font-weight: bold;">Browse Products</a>
    </p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>A Mumbai Component Distributor Built on 25+ Years of Trust</h2>
    <p>We started in Mumbai in 1999 with one rule: if a part leaves our shelf, it must be genuine and traceable. Today we are an authorized distributor and stockist of active and passive electronic components. Automotive, industrial, consumer electronics and telecom manufacturers across India rely on us.</p>
    <p>The component market has plenty of shortages and grey-market counterfeits. We handle that by sourcing directly from manufacturers or authorized franchise lines, carrying buffer stock under rolling forecasts, and helping your engineers with cross-references when a part goes end-of-life or out of stock.</p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Why Procurement Teams Choose Mirai Technologies</h2>
    <div style="margin-top: 16px;">
      <h3>100% Genuine, Traceable Components</h3>
      <p>Every part comes directly from the manufacturer or an authorized franchise line, with a full Certificate of Conformance (CoC). No grey market and no relabelled stock.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>A Portfolio That Covers Your Whole BOM</h3>
      <p>Power MOSFETs, IGBTs, microcontrollers, optocouplers, ICs and thousands of passive components. You can buy most of your BOM from one supplier.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Low MOQ, Fair for Small and Large Buyers</h3>
      <p>Prototype run or production batch, we help you buy what you need. That keeps your inventory lean and your working capital free.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Complete GST Invoicing</h3>
      <p>Every B2B order comes with a proper GST invoice, so you can claim Input Tax Credit without any trouble.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Active Components: ICs, MOSFETs, Transistors & Microcontrollers</h2>
    <p>These are the parts that decide whether your board works. We stock them from brands your engineers already know.</p>
    <div style="margin-top: 16px;">
      <h3>Integrated Circuits (ICs)</h3>
      <p>Genuine ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>MOSFET Transistors</h3>
      <p>High-performance power MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay, for power supplies, motor drives and switching circuits.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>BJT Transistors</h3>
      <p>General-purpose and power transistors for motor control, switching and signal processing.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Microcontrollers (MCU)</h3>
      <p>High-performance MCUs for industrial automation, IoT and embedded designs.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Voltage Regulators</h3>
      <p>Buck converters, boost regulators and low-dropout (LDO) linear regulators for stable power rails.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Passive Components: 1,700+ SKUs of Resistors, Capacitors & Inductors</h2>
    <p>Passives are small, but a missing one can stop a whole production run. We keep over 1,700 passive component SKUs ready for industrial, automotive and consumer electronics manufacturing.</p>
    <div style="margin-top: 16px;">
      <h3>SMD Chip Resistors</h3>
      <p>1% precision thick-film resistors in 0402, 0603, 0805, 1206 and 1210 packages. Rated for -55°C to +155°C, suited to dense SMT assembly and automotive electronics.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Through-Hole Resistors</h3>
      <p>Carbon film and metal film axial resistors, 1/4W to 1W, in E24 values from 1 Ohm to 10M Ohm. Used for prototyping, power supplies, educational kits and PCB repair. Our full resistor catalog lists 1,300+ SKUs.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>SMD Ceramic Capacitors (MLCC)</h3>
      <p>384+ MLCC SKUs in 0402 to 1812 packages with C0G/NP0 and X7R dielectrics, rated 16V to 50V. Used for RF tuning, decoupling and filtering. See the full capacitor catalog.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Radial Electrolytic Capacitors</h3>
      <p>Reliable aluminium electrolytics for power supply filtering, bulk decoupling and audio coupling.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>SMD Tantalum Capacitors</h3>
      <p>EIA case sizes A, B, C and D for compact, high-reliability designs.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>SMD Power Inductors</h3>
      <p>390+ shielded ferrite-core inductors for low EMI in DC-DC converters and switching regulators. See the full inductor catalog.</p>
    </div>
    <p style="margin-top: 16px;"><a href="/products" style="color: #2563eb; font-weight: bold;">View all passive components &rarr;</a></p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Diodes, LEDs & Crystals for Protection, Rectification and Timing</h2>
    <div style="margin-top: 16px;">
      <h3>Zener Diodes</h3>
      <p>SOD-123 and SOT-23 surface-mount plus DO-35 and DO-41 axial packages, for voltage regulation and clamping.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Rectifier & Schottky Diodes</h3>
      <p>20V to 1000V and 0.5A to 10A, for AC-DC rectification, reverse polarity protection and freewheeling.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>TVS Diodes</h3>
      <p>SMA, SMB, SMC and axial packages that absorb ESD spikes and surges before they reach your sensitive circuits. Our diode catalog lists 485+ SKUs.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>LEDs & Optoelectronics</h3>
      <p>Single-colour, bi-colour and RGB LEDs in 3mm/5mm through-hole and 0603 to 1206 SMD.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Crystals & Crystal Oscillators</h3>
      <p>Stable quartz resonators and oscillators for MCU timing, RTC circuits and wireless communication.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Connectors, Switches & Relays for Reliable Interconnects</h2>
    <p>340+ connector SKUs and 185+ electromechanical parts, so your board connects to the rest of the product without trouble.</p>
    <div style="margin-top: 16px;">
      <h3>Pin Headers</h3>
      <p>2.54mm, 2.0mm and 1.27mm pitch, single or double row, straight or right-angle.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>JST & Wire-to-Board Connectors</h3>
      <p>JST-XH and JST-PH, pre-crimped assemblies, wafers, housings and terminals.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Terminal Blocks & Screw Terminals</h3>
      <p>2.54mm to 5.08mm pitch, for high-current inputs, relay outputs and automation wiring.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>FFC / FPC Connectors</h3>
      <p>ZIF and Non-ZIF, 0.5mm and 1.0mm pitch, for displays and camera modules.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>USB & DC Power Connectors</h3>
      <p>USB-C, USB-A, Micro-USB and DC barrel jacks. See all connectors.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Switches</h3>
      <p>Tactile (3x3mm to 12x12mm), slide, DIP, toggle, rocker and limit switches.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Relays</h3>
      <p>Electromechanical and reed relays, 3V/5V/12V/24V coils, up to 10A contacts. See all electromechanical components.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Components for the Industries That Build India</h2>
    <p>We supply OEMs, EMS companies, R&D labs and defence units, across:</p>
    <ul style="line-height: 1.8; margin-top: 12px;">
      <li><strong>Automotive electronics:</strong> wide-temperature SMD resistors, MOSFETs, TVS protection</li>
      <li><strong>Industrial automation:</strong> microcontrollers, relays, terminal blocks, optocouplers</li>
      <li><strong>Consumer electronics:</strong> USB connectors, LEDs, voltage regulators, MLCCs</li>
      <li><strong>Telecom:</strong> RF-grade capacitors, crystals and oscillators, ICs</li>
      <li><strong>Power electronics:</strong> MOSFETs, IGBTs, inductors, rectifiers</li>
    </ul>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Quality You Can Show Your Auditor</h2>
    <p>Counterfeit parts cost far more than the price you saved. That's why every order passes through a quality-first process:</p>
    <ul style="line-height: 1.8; margin-top: 12px;">
      <li>ISO 9001:2015 certified quality management</li>
      <li>ANSI/ESD S20.20 compliant, electrostatic-safe handling facility</li>
      <li>RoHS / REACH compliance verification</li>
      <li>Certificate of Conformance (CoC) on genuine parts, sourced from manufacturers or authorized franchise lines</li>
    </ul>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>From BOM to Delivery in Three Simple Steps</h2>
    <div style="margin-top: 16px;">
      <h3>1. Send Your RFQ</h3>
      <p>Share your BOM, part number list or requirement by email, WhatsApp or the quote form.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>2. Get Your Quote Within 24 Hours</h3>
      <p>Our engineering and sales team replies with competitive pricing, availability and traceability.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>3. Receive Genuine Parts with a GST Invoice</h3>
      <p>We dispatch across India, and you get full documentation for ITC and compliance.</p>
    </div>
    <p style="margin-top: 20px;"><a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Submit Your BOM</a></p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Electronic Component Distributor Near You, Delivering Pan-India</h2>
    <p>We ship from Mumbai to manufacturing hubs across the country. Pick your city to see local supply details:</p>
    <p style="line-height: 2; margin-top: 12px;">
      <a href="/electronic-component-distributor-in-mumbai">Mumbai</a> |
      <a href="/electronic-component-distributor-in-delhi">Delhi</a> |
      <a href="/electronic-component-distributor-in-bengaluru">Bengaluru</a> |
      <a href="/electronic-component-distributor-in-hyderabad">Hyderabad</a> |
      <a href="/electronic-component-distributor-in-chennai">Chennai</a> |
      <a href="/electronic-component-distributor-in-pune">Pune</a> |
      <a href="/electronic-component-distributor-in-ahmedabad">Ahmedabad</a> |
      <a href="/electronic-component-distributor-in-kolkata">Kolkata</a> |
      <a href="/electronic-component-distributor-in-surat">Surat</a> |
      <a href="/electronic-component-distributor-in-jaipur">Jaipur</a> |
      <a href="/electronic-component-distributor-in-noida">Noida</a> |
      <a href="/electronic-component-distributor-in-faridabad">Faridabad</a> |
      <a href="/electronic-component-distributor-in-coimbatore">Coimbatore</a> |
      <a href="/electronic-component-distributor-in-indore">Indore</a> |
      <a href="/electronic-component-distributor-in-nagpur">Nagpur</a> |
      <a href="/electronic-component-distributor-in-lucknow">Lucknow</a> |
      <a href="/electronic-component-distributor-in-vadodara">Vadodara</a> |
      <a href="/electronic-component-distributor-in-chandigarh">Chandigarh</a> |
      <a href="/electronic-component-distributor-in-kochi">Kochi</a> |
      <a href="/electronic-component-distributor-in-visakhapatnam">Visakhapatnam</a> |
      <a href="/market-area" style="font-weight: bold; color: #2563eb;">View all cities &rarr;</a>
    </p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Frequently Asked Questions</h2>
    <div style="margin-top: 16px;">
      <h3>Are your components genuine?</h3>
      <p>Yes. We source directly from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Do you supply small quantities?</h3>
      <p>Yes. We offer flexible MOQs, so prototype buyers and production teams are both welcome.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Will I get a GST invoice?</h3>
      <p>Yes. Every B2B order comes with a complete GST invoice for Input Tax Credit.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Which brands do you carry?</h3>
      <p>ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices, and MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Can you help if my part is obsolete or out of stock?</h3>
      <p>Yes. Our team supports expert cross-referencing to find a suitable alternative.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Do you deliver outside Mumbai?</h3>
      <p>Yes. We deliver across India to all major industrial cities.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>How fast will I get a quote?</h3>
      <p>Within 24 hours of receiving your BOM or part list.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Talk to Our Sourcing Team in Mumbai</h2>
    <p>Planning a production run? Send your RFQ, BOM or part number list and we'll respond within 24 hours.</p>
    <p><strong>Phone / WhatsApp:</strong> +91 93213 98188 | +91 98201 22744 | +91 91368 10360</p>
    <p><strong>Email:</strong> sales@miraitechnologies.net</p>
    <p><strong>Office / Shipping Address:</strong> 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007</p>
    <p><strong>Registered Address:</strong> B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034</p>
    <p style="margin-top: 20px;"><a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Get a Quote</a></p>
  </section>
`;

prerenderPage('/', {
  title: 'Electronic Components Distributor in Mumbai, India | Mirai Technologies',
  description: 'Authorized electronic components distributor in Mumbai since 1999. Genuine ICs, MOSFETs, microcontrollers, capacitors, resistors and connectors with CoC, GST invoice and pan-India delivery.'
}, homeBody, [ORG_SCHEMA, LOCAL_BUSINESS_SCHEMA, HOME_FAQ_SCHEMA]);
console.log('✅ Prerendered: / (Homepage)');

// 2. About page
const aboutBody = `
  <section>
    <h1>About Mirai Technologies: Mumbai's Authorized Electronic Components Distributor Since 1999</h1>
    <p><strong>25+ years of supplying genuine, factory-traceable semiconductors and passive components to Indian manufacturers.</strong></p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>From a Mumbai Shop to a Trusted Component Partner</h2>
    <p>Mirai Technologies started in Mumbai in 1999. We were a small team with a simple promise: every component we sell is genuine and can be traced back to its source.</p>
    <p>Over 25 years, that promise has grown into a full distribution business. We are now an authorized distributor and stockist of active and passive electronic components. Our customers include automotive, industrial, consumer electronics and telecom manufacturers across India, and we also supply buyers overseas.</p>
    <p>We have seen shortages, price swings and counterfeit scares come and go. Our approach has stayed the same: source honestly, stock sensibly and be straightforward with every buyer.</p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Mirai Technologies in Numbers</h2>
    <ul style="line-height: 1.8; margin-top: 12px;">
      <li><strong>1999:</strong> year we started, in Mumbai</li>
      <li><strong>25+ years:</strong> serving Indian manufacturers</li>
      <li><strong>1,700+:</strong> passive component SKUs (resistors, capacitors, inductors)</li>
      <li><strong>485+:</strong> diode SKUs</li>
      <li><strong>340+:</strong> connector SKUs</li>
      <li><strong>185+:</strong> electromechanical component SKUs</li>
      <li><strong>20+:</strong> major Indian cities delivered to</li>
      <li><strong>24 hours:</strong> quote response time</li>
    </ul>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Our Sourcing Philosophy: Supply Stability Comes First</h2>
    <p>A production line is only as steady as its supply chain. When the market is hit by shortages and grey-market counterfeits, one fake part can scrap a whole batch.</p>
    <p>That is why we guarantee 100% genuine, traceable parts. We buy directly from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance (CoC).</p>
    <p>We also carry buffer stock under rolling forecasts. If you share your forecast, we can keep stock ready for you, so a shortage elsewhere does not become a shutdown for you. When a part goes end-of-life or out of stock, our team helps with expert cross-referencing to find a suitable alternative.</p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>What We Stock</h2>
    <div style="margin-top: 16px;">
      <h3>Active Components</h3>
      <p>ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices. MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay. Plus BJT transistors, microcontrollers and voltage regulators.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Passive Components</h3>
      <p>SMD and through-hole resistors, ceramic, electrolytic and tantalum capacitors, and power inductors.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Diodes, LEDs & Crystals</h3>
      <p>Zener, Schottky and TVS diodes, LEDs and crystal oscillators.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Connectors & Electromechanical</h3>
      <p>Pin headers, JST connectors, terminal blocks, FFC/FPC and USB/DC connectors, plus switches and relays.</p>
    </div>
    <p style="margin-top: 16px;"><a href="/products" style="color: #2563eb; font-weight: bold;">View the full product range &rarr;</a></p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Trusted by OEMs, EMS Companies, R&D Labs and Defence Units</h2>
    <p>We work with buyers of every size, from a lab ordering a few parts for a prototype to an EMS plant running a full production schedule. Low MOQ flexibility means smaller buyers aren't ignored, and bigger buyers can plan stock with us.</p>
    <p>Our customers work in:</p>
    <ul style="line-height: 1.8; margin-top: 12px;">
      <li>Automotive electronics</li>
      <li>Industrial automation</li>
      <li>Consumer electronics</li>
      <li>Telecom</li>
      <li>Power electronics</li>
    </ul>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Quality, Certified and Documented</h2>
    <div style="margin-top: 16px;">
      <h3>ISO 9001:2015 Certified</h3>
      <p>Our quality management system is certified, so our processes are consistent from order to dispatch.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>ANSI/ESD S20.20 Compliant Facility</h3>
      <p>Static damages components silently. Our handling facility follows electrostatic-safe practice, so your parts reach you in working condition.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>RoHS / REACH Verification</h3>
      <p>We verify components for RoHS and REACH compliance, which helps you with export and customer audits.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Certificate of Conformance</h3>
      <p>Genuine parts come with a CoC, giving you the paper trail your quality team asks for.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>What Working With Mirai Technologies Looks Like</h2>
    <div style="margin-top: 16px;">
      <h3>Fast, Clear Quotes</h3>
      <p>Send a BOM or part list. Our engineering and sales team replies within 24 hours with pricing, availability and traceability.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Proper B2B Paperwork</h3>
      <p>Every order comes with a complete GST invoice, so you can claim Input Tax Credit smoothly.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Real People Who Know Components</h3>
      <p>Talk to people who understand the parts. We help with cross-references, alternatives and stock planning.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Delivery Anywhere in India</h3>
      <p>We ship from Mumbai to industrial hubs across the country.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Based in Mumbai, Delivering Across India</h2>
    <p>Our home is Mumbai's Lamington Road, the city's long-standing electronics market. From here we serve manufacturers in:</p>
    <p style="line-height: 2; margin-top: 12px;">
      <a href="/electronic-component-distributor-in-mumbai">Mumbai</a> |
      <a href="/electronic-component-distributor-in-delhi">Delhi</a> |
      <a href="/electronic-component-distributor-in-bengaluru">Bengaluru</a> |
      <a href="/electronic-component-distributor-in-hyderabad">Hyderabad</a> |
      <a href="/electronic-component-distributor-in-chennai">Chennai</a> |
      <a href="/electronic-component-distributor-in-pune">Pune</a> |
      <a href="/electronic-component-distributor-in-ahmedabad">Ahmedabad</a> |
      <a href="/electronic-component-distributor-in-kolkata">Kolkata</a> |
      <a href="/electronic-component-distributor-in-surat">Surat</a> |
      <a href="/electronic-component-distributor-in-jaipur">Jaipur</a> |
      <a href="/electronic-component-distributor-in-noida">Noida</a> |
      <a href="/electronic-component-distributor-in-faridabad">Faridabad</a> |
      <a href="/electronic-component-distributor-in-coimbatore">Coimbatore</a> |
      <a href="/electronic-component-distributor-in-indore">Indore</a> |
      <a href="/electronic-component-distributor-in-nagpur">Nagpur</a> |
      <a href="/electronic-component-distributor-in-lucknow">Lucknow</a> |
      <a href="/electronic-component-distributor-in-vadodara">Vadodara</a> |
      <a href="/electronic-component-distributor-in-chandigarh">Chandigarh</a> |
      <a href="/electronic-component-distributor-in-kochi">Kochi</a> |
      <a href="/electronic-component-distributor-in-visakhapatnam">Visakhapatnam</a> |
      <a href="/market-area" style="font-weight: bold; color: #2563eb;">View all cities &rarr;</a>
    </p>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>About Mirai Technologies: Common Questions</h2>
    <div style="margin-top: 16px;">
      <h3>Since when has Mirai Technologies been in business?</h3>
      <p>We were established in Mumbai in 1999 and have over 25 years of experience in electronic component distribution.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Is Mirai Technologies an authorized distributor?</h3>
      <p>Yes. We are an authorized distributor and stockist of active and passive components, and we source directly from manufacturers or authorized franchise lines.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>What certifications do you hold?</h3>
      <p>ISO 9001:2015 quality management, an ANSI/ESD S20.20 compliant handling facility, and RoHS/REACH compliance verification.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Who are your customers?</h3>
      <p>OEMs, EMS companies, R&D labs and defence units across automotive, industrial, consumer electronics and telecom.</p>
    </div>
    <div style="margin-top: 16px;">
      <h3>Where are you located?</h3>
      <p>Our office and shipping address is in Lamington Road, Mumbai. See the details below.</p>
    </div>
  </section>

  <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e2e8f0;" />

  <section>
    <h2>Let's Talk About Your Next Production Run</h2>
    <p>Send your RFQ, BOM or part number list. We'll respond within 24 hours.</p>
    <p><strong>Phone / WhatsApp:</strong> +91 93213 98188 | +91 98201 22744 | +91 91368 10360</p>
    <p><strong>Email:</strong> sales@miraitechnologies.net</p>
    <p><strong>Office / Shipping Address:</strong> 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007</p>
    <p><strong>Registered Address:</strong> B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034</p>
    <p style="margin-top: 20px;">
      <a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">Get a Quote</a>
      <a href="/products" style="display: inline-block; padding: 10px 20px; border: 1px solid #2563eb; color: #2563eb; text-decoration: none; border-radius: 6px; font-weight: bold;">View Products</a>
    </p>
  </section>
`;

prerenderPage('/about', {
  title: 'About Mirai Technologies | Authorized Electronic Components Distributor in Mumbai Since 1999',
  description: 'Mirai Technologies has supplied genuine, traceable active and passive electronic components from Mumbai since 1999. ISO 9001:2015 certified, ESD-safe handling, RoHS/REACH verified.'
}, aboutBody, [ORG_SCHEMA, ABOUT_FAQ_SCHEMA]);
console.log('✅ Prerendered: /about');

// 3. Contact page
const contactBody = `
  <h1>Contact Us | Get a Quote | Mirai Technologies Mumbai</h1>
  <p>Sourcing components for an upcoming production run? Submit your RFQ, BOM, or part number list today. Our engineering and sales team will respond with competitive pricing, availability, and traceability within 24 hours.</p>
  
  <h2>Contact Information</h2>
  <p><strong>Phone:</strong> +91 93213 98188 / +91 98201 22744 / +91 91368 10360</p>
  <p><strong>Email Address:</strong> sales@miraitechnologies.net / nehas@miraitechnologies.net</p>
  
  <h2>Corporate & Shipping Addresses</h2>
  <p><strong>Office / Shipping:</strong> 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007</p>
  <p><strong>Registered Address:</strong> B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034</p>
`;
prerenderPage('/contact', {
  title: 'Contact Us | Get a Quote | Mirai Technologies Mumbai',
  description: 'Get in touch with Mirai Technologies, authorized semiconductor distributor in Mumbai. Call +91 93213 98188 or request a quote online for genuine electronic components with pan-India shipping.'
}, contactBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /contact');

// 4. Certifications page
const certBody = `
  <h1>Quality Certifications & Compliance | Mirai Technologies</h1>
  <p>At Mirai Technologies, quality assurance is at the heart of our operations. We maintain strict compliance standards to ensure every component is factory original.</p>
  <h2>ISO 9001:2015 Certified</h2>
  <p>Our quality management system is fully certified to ISO 9001:2015, ensuring consistent and transparent business processes.</p>
  <h2>ANSI/ESD S20.20 Compliant</h2>
  <p>We handle and pack all semiconductor chips in full compliance with ANSI/ESD S20.20 standards to prevent static damage during storage and transit.</p>
`;
prerenderPage('/certificate', {
  title: 'Quality Certifications & Compliance | Mirai Technologies',
  description: 'View ISO 9001:2015 registration, ANSI/ESD S20.20 compliance, and RoHS/REACH statements for Mirai Technologies. We ensure 100% genuine and traceable components.'
}, certBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /certificate');

// 4b. Authorized Distributor Brands Page
const brandsBody = `
  <h1>Our Authorized Distributor Brands</h1>
  <p>Mirai Technologies is an authorized stockist and B2B distributor supplying 100% genuine components from top global semiconductor manufacturers.</p>
  <h2>Franchised Manufacturer Lines</h2>
  <ul>
    <li><strong>STMicroelectronics:</strong> Power MOSFETs, IGBTs, STM32 Microcontrollers & Diodes</li>
    <li><strong>Infineon Technologies:</strong> Discrete IGBTs, SiC MOSFETs, Automotive ICs & Gate Drivers</li>
    <li><strong>ON Semiconductor (onsemi):</strong> Power MOSFETs, MOC Optocouplers, Logic ICs</li>
    <li><strong>NXP Semiconductors:</strong> Industrial Microcontrollers, Automotive Processors & Logic</li>
    <li><strong>Vishay Intertechnology:</strong> Diodes, Rectifiers, TVS Protection, Optocouplers</li>
    <li><strong>Rohm Semiconductor:</strong> SiC MOSFETs, Power Transistors, LDO Regulators</li>
    <li><strong>International Rectifier (IR):</strong> Legend IRF Power MOSFETs & Gate Driver ICs</li>
    <li><strong>UTC (Unisonic Technologies):</strong> Op-Amps, Linear Voltage Regulators, BJTs</li>
    <li><strong>Texas Instruments (TI):</strong> LM358 Op-Amps, LM339 Comparators, NE555 Timers</li>
    <li><strong>Microchip Technology:</strong> PIC & AVR Microcontrollers, EEPROMs</li>
  </ul>
`;
prerenderPage('/authorized-distributor-brands', {
  title: 'Authorized Distributor Brands | STMicroelectronics, Infineon, TI & More — Mirai Technologies',
  description: 'Mirai Technologies is an authorized distributor for STMicroelectronics, Infineon, NXP, ON Semiconductor, Vishay, Rohm, IR, UTC, Texas Instruments & Microchip.'
}, brandsBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /authorized-distributor-brands');

// 4c. Category Distributor Pillar Pages
const distributorPages = [
  { slug: 'mosfet-distributor', title: 'Power MOSFET Distributor in India | Authorized Stockist — Mirai Technologies', desc: 'Authorized Power MOSFET distributor for OEMs & EMS companies across India. Genuine stock from Infineon, ON Semi, STMicroelectronics, Vishay & IR.' },
  { slug: 'transistor-distributor', title: 'Transistor Distributor in India | BJT & Power Transistors — Mirai Technologies', desc: 'Bulk transistor distributor for OEM and EMS buyers in India. Genuine BJT & power transistors, GST invoice, low MOQ.' },
  { slug: 'microcontroller-distributor', title: 'Microcontroller Distributor in India | Authorized MCU Supplier — Mirai Technologies', desc: 'Authorized microcontroller distributor for OEM & EMS design teams. Genuine MCUs, low MOQ, same-day quotation, GST invoicing.' },
  { slug: 'voltage-regulator-distributor', title: 'Voltage Regulator IC Distributor in India — Mirai Technologies', desc: 'Authorized voltage regulator distributor for OEMs. Genuine linear & switching regulator ICs, low MOQ, GST invoice, pan-India delivery.' },
  { slug: 'diode-rectifier-distributor', title: 'Diode & Rectifier Distributor in India | Genuine Stock — Mirai Technologies', desc: 'Authorized diode & rectifier distributor for OEM and EMS buyers. Genuine parts, GST invoice, low MOQ, pan-India delivery.' },
  { slug: 'optocoupler-distributor', title: 'Optocoupler Distributor in India | Authorized Stockist — Mirai Technologies', desc: 'Authorized optocoupler distributor for OEM & EMS design teams. Genuine parts, low MOQ, GST invoice, same-day quotation.' },
  { slug: 'igbt-distributor', title: 'IGBT Distributor India | Modules & Discrete IGBTs — Mirai Technologies', desc: 'Authorized IGBT distributor for EV, solar inverter & industrial motor drive applications. Genuine stock, low MOQ, GST invoice.' },
  { slug: 'ic-distributor', title: 'IC Distributor India | Integrated Circuits — Op-Amps, Comparators, RTCs — Mirai Technologies', desc: 'Authorized IC distributor stocking 279+ integrated circuits — op-amps, voltage comparators, real-time clocks, waveform generators & more.' }
];

distributorPages.forEach(p => {
  prerenderPage(`/${p.slug}`, { title: p.title, description: p.desc }, `<h1>${p.title}</h1><p>${p.desc}</p>`, [ORG_SCHEMA]);
});
console.log(`✅ Prerendered: ${distributorPages.length} category distributor pillar pages`);

// 4d. Applications List & Detail Pages
const applicationsBody = `
  <h1>Component Application Guides & BOM Specifications</h1>
  <p>In-depth circuit topology walkthroughs, failure mode analyses, and recommended component BOMs written for design and procurement engineers.</p>
  <ul>
    ${applicationsData.map(app => `<li><a href="/applications/${app.slug}"><strong>${app.title}</strong></a> - ${app.metaDescription}</li>`).join('\n')}
  </ul>
`;
prerenderPage('/applications', {
  title: 'B2B Engineering Application Guides & BOM Specifications | Mirai Tech',
  description: 'Technical application guides for solar inverters, welding machines, SMPS repair, EV chargers, motor drives & UPS systems. Component BOM specifications and direct RFQ sourcing.'
}, applicationsBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /applications');

applicationsData.forEach(app => {
  const appSectionsHtml = (app.sections || []).map(s => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('\n');
  const appBomHtml = (app.bom || []).map(b => `<li><strong>${b.partNumber}</strong> (${b.category}): ${b.specs} - ${b.application}</li>`).join('\n');
  const appBody = `
    <h1>${app.title}</h1>
    <p>${app.heroContent || app.metaDescription}</p>
    ${appSectionsHtml}
    <h2>Recommended Component BOM</h2>
    <ul>
      ${appBomHtml}
    </ul>
  `;
  prerenderPage(`/applications/${app.slug}`, {
    title: app.metaTitle || app.title,
    description: app.metaDescription
  }, appBody, [ORG_SCHEMA]);
});
console.log(`✅ Prerendered: ${applicationsData.length} application guide pages`);


// 5. Products Catalog Page
const productsBody = `
  <h1>Electronic Components Catalog</h1>
  <p>Browse our catalog of 83+ genuine electronic components. Click on a category or an individual part to view key specifications, datasheets, pricing, and availability.</p>
  
  <h2>Product Categories</h2>
  <ul>
    ${categories.map(c => `<li><a href="/products/${c.slug}"><strong>${c.name}</strong></a> - ${c.description}</li>`).join('\n')}
  </ul>
  
  <h2>All Components</h2>
  <ul>
    ${products.map(p => `<li><a href="/product/${p.fullSlug}">${p.partNumber}</a> - ${p.name} (${p.brand})</li>`).join('\n')}
  </ul>
`;
prerenderPage('/products', {
  title: 'Electronic Components Catalog – Mirai Technologies Mumbai',
  description: 'Shop 83+ genuine electronic components – ICs, MOSFETs, transistors, microcontrollers, optocouplers. Authorized distributor since 1999. Pan-India delivery. GST invoice.'
}, productsBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /products');

// 6. Category Pages
categories.forEach(category => {
  const catProducts = products.filter(p => p.category === category.slug);
  if (catProducts.length === 0) return;
  const catBody = `
    <h1>${category.h1}</h1>
    <p>${category.description}</p>
    
    <h2>Products in ${category.name}</h2>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; text-align: left; border-color: #e2e8f0;">
      <thead>
        <tr style="background-color: #f8fafc;">
          <th>Part Number</th>
          <th>Name / Description</th>
          <th>Manufacturer</th>
          <th>Package</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        ${catProducts.map(p => `
          <tr>
            <td><a href="/product/${p.fullSlug}"><strong>${p.partNumber}</strong></a></td>
            <td>${p.shortDescription}</td>
            <td>${p.brand}</td>
            <td>${p.package}</td>
            <td>${p.stockStatus}</td>
          </tr>
        `).join('\n')}
      </tbody>
    </table>
  `;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category.name,
    "description": category.description,
    "itemListElement": catProducts.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://miraitechnologies.net/product/${p.fullSlug}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://miraitechnologies.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `https://miraitechnologies.net/products/${category.slug}`
      }
    ]
  };

  let catTitle = category.metaTitle || `${category.name} — Buy Online India | Mirai Technologies`;
  if (catTitle.length > 60) {
    catTitle = truncateToWordBoundary(catTitle, 60);
  }
  
  let catDesc = category.metaDescription || `Buy ${category.name} online from Mirai Technologies. Genuine components, low MOQs, and fast delivery in India. GST invoice available.`;
  if (catDesc.length > 160) {
    catDesc = truncateToWordBoundary(catDesc, 157) + '...';
  } else if (catDesc.length < 140) {
    const suffix = ' Pan-India delivery.';
    if (catDesc.length + suffix.length <= 160) {
      catDesc = catDesc + suffix;
    }
  }

  prerenderPage(`/products/${category.slug}`, {
    title: catTitle,
    description: catDesc
  }, catBody, [itemListSchema, breadcrumbSchema]);
});
console.log(`✅ Prerendered: ${categories.length} category listing pages`);

// 7. Product Detail Pages
products.forEach(product => {
  const specList = Object.entries(product.specs || {})
    .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
    .join('\n');

  const faqList = (product.faqs || [])
    .map(faq => `<div><h3>${faq.q}</h3><p>${faq.a}</p></div>`)
    .join('\n');

  const prodBody = `
    <h1>${product.h1}</h1>
    <p><strong>Category:</strong> <a href="/products/${product.category}">${product.categoryLabel}</a> | <strong>Manufacturer:</strong> ${product.brand} | <strong>Package:</strong> ${product.package}</p>
    
    <h2>Short Description</h2>
    <p>${product.shortDescription}</p>
    
    <h2>Key Specifications</h2>
    <ul>
      ${specList}
    </ul>
    
    <h2>Pricing & Sourcing Status</h2>
    <p><strong>Landed Pricing:</strong> ${product.priceDisplay || 'Request pricing for large orders'}</p>
    <p><strong>Minimum Order Quantity (MOQ):</strong> ${product.moq} pcs</p>
    <p><strong>Stock Position:</strong> ${product.stockStatus}</p>
    <p><strong>GST Compliance:</strong> ${product.gstRate}</p>
    
    ${product.datasheetUrl ? `<h2>Datasheet Link</h2><p><a href="${product.datasheetUrl}" target="_blank">Download official ${product.partNumber} Datasheet (PDF)</a></p>` : ''}
    
    ${faqList ? `<h2>Frequently Asked Questions</h2>${faqList}` : ''}
  `;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.partNumber} ${product.name}`,
    "image": [
      product.heroImage?.filename
        ? `https://miraitechnologies.net/images/${product.heroImage.filename}`
        : "https://miraitechnologies.net/images/default.webp"
    ],
    "description": product.shortDescription,
    "sku": product.partNumber,
    "mpn": product.partNumber,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://miraitechnologies.net/product/${product.fullSlug}`,
      "priceCurrency": "INR",
      "price": product.price || 0,
      "priceValidUntil": "2027-03-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Mirai Technologies",
        "url": "https://miraitechnologies.net"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "11"
    }
  };

  const faqSchema = (product.faqs || []).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://miraitechnologies.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.categoryLabel,
        "item": `https://miraitechnologies.net/products/${product.category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.partNumber,
        "item": `https://miraitechnologies.net/product/${product.fullSlug}`
      }
    ]
  };

  const schemas = [productSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);

  prerenderPage(`/product/${product.fullSlug}`, {
    title: product.metaTitle || `${product.partNumber} - Mirai Technologies`,
    description: product.metaDescription || `Get specs and quote for ${product.partNumber} ${product.name} from Mirai Technologies Mumbai.`
  }, prodBody, schemas);
});
console.log(`✅ Prerendered: ${products.length} product detail pages`);

// 8. Blog Index Page
const blogIndexBody = `
  <h1>Semiconductor Sourcing & Quality Blog</h1>
  <p>Stay updated with procurement strategies, supply chain analysis, and technical guides from our sourcing desk.</p>
  
  <h2>Recent Articles</h2>
  <div style="display: grid; gap: 20px; grid-template-columns: 1fr; margin-top: 30px;">
    ${blogPosts.map(post => `
      <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
        <h3><a href="/blog/${post.slug}" style="text-decoration: none; color: #2563eb;">${post.title}</a></h3>
        <p style="color: #64748b; font-size: 14px;">Published: ${post.publishDate} | Read Time: ${post.readTime} min</p>
        <p>${post.excerpt}</p>
      </div>
    `).join('\n')}
  </div>
`;
prerenderPage('/blog', {
  title: 'Semiconductor Sourcing & Quality Blog | Mirai Technologies',
  description: 'Read expert guides on electronic component sourcing, semiconductor lead times, counterfeit mitigation, and importing in India from the Mirai Technologies team.'
}, blogIndexBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /blog');

// 9. Blog Post Pages
blogPosts.forEach(post => {
  const postBody = `
    <h1>${post.title}</h1>
    <p style="color: #64748b;">Published: ${post.publishDate} | Category: ${post.category} | Read Time: ${post.readTime} min</p>
    <div style="margin-top: 30px; line-height: 1.8;">
      ${mdToHtml(post.body)}
    </div>
  `;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://miraitechnologies.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://miraitechnologies.net/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://miraitechnologies.net/blog/${post.slug}`
      }
    ]
  };

  const faqSchema = (post.faqs || []).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const schemas = [breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);

  prerenderPage(`/blog/${post.slug}`, {
    title: post.seoTitle || `${post.title} | Mirai Technologies`,
    description: post.metaDescription || post.excerpt
  }, postBody, schemas);
});
console.log(`✅ Prerendered: ${blogPosts.length} blog posts`);

// 10. City Pages
cityPages.forEach(page => {
  const cleanSlug = page.slug.replace(/^\//, '').replace(/\/$/, '');
  const nearby = getNearbyCities(page.city, page.state);

  let cityBody = '';

  if (page.hasDetailedBlueprint) {
    const whoWeAreHtml = page.whoWeAre ? `
      <section style="margin-top: 32px;">
        <h2>${page.whoWeAre.h2}</h2>
        ${(page.whoWeAre.content || []).map(p => `<p style="margin-top: 12px; line-height: 1.7; color: #475569;">${p}</p>`).join('')}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const trustBadgesHtml = (page.trustBadges || []).length > 0 ? `
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;">
        ${page.trustBadges.map(b => `<span style="background-color: #f1f5f9; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #1e293b;">✓ ${b}</span>`).join('')}
      </div>
    ` : '';

    const whatWeSupplyHtml = page.whatWeSupply ? `
      <section style="margin-top: 32px;">
        <h2>${page.whatWeSupply.h2}</h2>
        <div style="margin-top: 20px;">
          ${page.whatWeSupply.categories?.active ? `
            <div style="margin-top: 16px;">
              <h3>${page.whatWeSupply.categories.active.title}</h3>
              <ul style="margin-top: 8px; line-height: 1.8;">
                ${page.whatWeSupply.categories.active.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${page.whatWeSupply.categories?.passives ? `
            <div style="margin-top: 16px;">
              <h3>${page.whatWeSupply.categories.passives.title}</h3>
              <ul style="margin-top: 8px; line-height: 1.8;">
                ${page.whatWeSupply.categories.passives.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${page.whatWeSupply.categories?.diodes ? `
            <div style="margin-top: 16px;">
              <h3>${page.whatWeSupply.categories.diodes.title}</h3>
              <ul style="margin-top: 8px; line-height: 1.8;">
                ${page.whatWeSupply.categories.diodes.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${page.whatWeSupply.categories?.connectors ? `
            <div style="margin-top: 16px;">
              <h3>${page.whatWeSupply.categories.connectors.title}</h3>
              <ul style="margin-top: 8px; line-height: 1.8;">
                ${page.whatWeSupply.categories.connectors.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const industriesBuyHtml = page.industriesBuy ? `
      <section style="margin-top: 32px;">
        <h2>${page.industriesBuy.h2}</h2>
        ${(page.industriesBuy.items || []).map(ind => `
          <div style="margin-top: 16px;">
            <h3>${ind.title || ind.h3}</h3>
            <p style="margin-top: 6px; line-height: 1.7; color: #475569;">${ind.desc || ind.content}</p>
          </div>
        `).join('')}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const mosfetDistributorHtml = page.mosfetDistributor ? `
      <section style="margin-top: 32px;">
        <h2>${page.mosfetDistributor.h2}</h2>
        <p style="margin-top: 10px; color: #334155;">${page.mosfetDistributor.intro || ''}</p>
        
        ${(page.mosfetDistributor.applications || []).length > 0 ? `
          <div style="margin-top: 20px;">
            <h3>Common Applications:</h3>
            <ul>
              ${page.mosfetDistributor.applications.map(app => {
                if (typeof app === 'string') {
                  const colonIdx = app.indexOf(':');
                  if (colonIdx !== -1) {
                    return `<li><strong>${app.slice(0, colonIdx).trim()}:</strong> ${app.slice(colonIdx + 1).trim()}</li>`;
                  }
                  return `<li>${app.trim()}</li>`;
                }
                return `<li><strong>${app.title || app.h3}:</strong> ${app.desc || app.content}</li>`;
              }).join('')}
            </ul>
          </div>
        ` : ''}

        ${(page.mosfetDistributor.popularParts || []).length > 0 ? `
          <div style="margin-top: 24px;">
            <h3>High-Demand Power MOSFETs:</h3>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border-color: #cbd5e1; margin-top: 12px; text-align: left;">
              <thead>
                <tr style="background-color: #f1f5f9; color: #0f172a;">
                  <th>Part Number</th>
                  <th>Manufacturer</th>
                  <th>Type</th>
                  <th>Ratings</th>
                  <th>Package</th>
                  <th>Applications</th>
                </tr>
              </thead>
              <tbody>
                ${page.mosfetDistributor.popularParts.map(part => `
                  <tr>
                    <td><strong>${part.partNumber}</strong></td>
                    <td>${part.manufacturer}</td>
                    <td>${part.polarity}</td>
                    <td>${part.vDs} | ${part.rDsOn}</td>
                    <td>${part.package}</td>
                    <td>${part.application}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${page.mosfetDistributor.howToPick ? `
          <div style="margin-top: 24px;">
            <h3>${page.mosfetDistributor.howToPick.title || 'How to Pick a MOSFET'}</h3>
            <ol style="margin-top: 10px; line-height: 1.8;">
              ${(page.mosfetDistributor.howToPick.tips || []).map(tip => `<li>${tip}</li>`).join('')}
            </ol>
          </div>
        ` : ''}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const mosfetCalculatorHtml = page.mosfetCalculator ? `
      <section style="margin-top: 32px; background-color: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2>${page.mosfetCalculator.h2}</h2>
        <p style="margin-top: 8px; color: #475569;">${page.mosfetCalculator.purpose}</p>
        <div style="margin-top: 16px; font-family: monospace; font-size: 14px; background: #fff; padding: 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
          <p><strong>Formulas:</strong></p>
          <p>Conduction loss: P_cond = (I_RMS)^2 × R_DS(on)</p>
          <p>Junction temperature: T_J = T_A + (P_cond × θ_JA)</p>
        </div>
        ${page.mosfetCalculator.workedExample ? `
          <div style="margin-top: 16px;">
            <p><strong>Worked Example (${page.mosfetCalculator.workedExample.part}):</strong> ${page.mosfetCalculator.workedExample.note || ''}</p>
          </div>
        ` : ''}
        <p style="margin-top: 16px; font-size: 12px; color: #64748b; font-style: italic;">${page.mosfetCalculator.disclaimer || ''}</p>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const productSectionsHtml = (page.productSections || []).map(sec => `
      <section style="margin-top: 32px;">
        <h2>${sec.h2}</h2>
        ${sec.intro ? `<p style="margin-top: 10px; color: #334155;">${sec.intro}</p>` : ''}
        ${(sec.items || []).map(it => `
          <div style="margin-top: 16px;">
            <h3>${it.h3}</h3>
            <p style="margin-top: 6px; line-height: 1.7; color: #475569;">${it.content}</p>
          </div>
        `).join('')}
        ${sec.note || sec.outro ? `<p style="margin-top: 14px; font-style: italic; color: #64748b; font-size: 14px;">${sec.note || sec.outro}</p>` : ''}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    `).join('');

    const landscapeHtml = page.landscape ? `
      <section style="margin-top: 32px;">
        <h2>${page.landscape.h2}</h2>
        ${(page.landscape.items || []).map(it => `
          <div style="margin-top: 16px;">
            <h3>${it.h3}</h3>
            <p style="margin-top: 6px; line-height: 1.7; color: #475569;">${it.content}</p>
          </div>
        `).join('')}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const specSnapshotHtml = page.specSnapshot ? `
      <section style="margin-top: 32px;">
        <h2>${page.specSnapshot.h2 || 'Specification Snapshot'}</h2>
        <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; border-color: #cbd5e1; margin-top: 16px; text-align: left;">
          <thead>
            <tr style="background-color: #f1f5f9; color: #0f172a;">
              ${(page.specSnapshot.headers || []).map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${(page.specSnapshot.rows || []).map(r => `
              <tr>
                <td><strong>${r.col1 || r.app}</strong></td>
                <td>${r.col2 || r.parts}</td>
                <td><code>${r.col3 || r.spec}</code></td>
                <td><a href="${r.browseLink}" style="color: #2563eb; font-weight: 600;">${r.browseText} &rarr;</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const qualityComplianceHtml = page.qualityCompliance ? `
      <section style="margin-top: 32px;">
        <h2>${page.qualityCompliance.h2}</h2>
        <ul style="margin-top: 16px; line-height: 1.8;">
          ${(page.qualityCompliance.points || page.qualityCompliance.items || []).map(it => `<li>${it}</li>`).join('')}
        </ul>
        ${page.qualityCompliance.registeredAddressNote ? `<p style="margin-top: 16px; background-color: #f8fafc; padding: 12px; border-left: 4px solid #2563eb; font-size: 14px;">${page.qualityCompliance.registeredAddressNote}</p>` : ''}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const sourcingGuideHtml = page.sourcingGuide ? `
      <section style="margin-top: 32px;">
        <h2>${page.sourcingGuide.h2}</h2>
        <ol style="margin-top: 16px; line-height: 1.8;">
          ${(page.sourcingGuide.tips || []).map(tip => `<li>${tip}</li>`).join('')}
        </ol>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const howToOrderHtml = page.howToOrder ? `
      <section style="margin-top: 32px;">
        <h2>${page.howToOrder.h2}</h2>
        <ol style="margin-top: 16px; line-height: 1.8;">
          ${(page.howToOrder.steps || []).map(step => `<li>${step}</li>`).join('')}
        </ol>
      </section>
    ` : '';

    const serviceAreasHtml = page.serviceAreas ? `
      <section style="margin-top: 32px;">
        <h2>${page.serviceAreas.h2}</h2>
        <p style="margin-top: 12px; line-height: 1.8;">${Array.isArray(page.serviceAreas.areas) ? page.serviceAreas.areas.join(' &bull; ') : page.serviceAreas.areas}</p>
      </section>
    ` : '';

    const contactInfoHtml = page.contactInfo ? `
      <section style="margin-top: 32px; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
        <h2>Contact & Dispatch Details</h2>
        <p><strong>Phone / WhatsApp:</strong> ${page.contactInfo.phones?.join(' | ') || '+91 93213 98188'}</p>
        <p><strong>Office / Shipping:</strong> ${page.contactInfo.office || ''}</p>
        <p><strong>Registered Address:</strong> ${page.contactInfo.registered || ''}</p>
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const faqsHtml = (page.faqs || []).length > 0 ? `
      <section style="margin-top: 32px;">
        <h2>${page.city} FAQs</h2>
        ${(page.faqs || []).map(faq => `
          <div style="margin-top: 16px;">
            <h3>${faq.q}</h3>
            <p style="margin-top: 6px; line-height: 1.7; color: #475569;">${faq.a}</p>
          </div>
        `).join('')}
      </section>
      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
    ` : '';

    const internalLinksHtml = (page.internalLinks || []).length > 0 ? `
      <section style="margin-top: 32px; font-size: 14px;">
        <p><strong>Related Sourcing Hubs & Cities:</strong></p>
        <p style="line-height: 2;">
          ${page.internalLinks.map(link => `<a href="${link.url}" style="color: #2563eb; text-decoration: none; margin-right: 12px;">${link.text}</a>`).join(' | ')}
        </p>
      </section>
    ` : '';

    cityBody = `
      <section>
        <h1>${page.h1}</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #334155; margin-top: 12px;">${page.heroSub}</p>
        ${trustBadgesHtml}
        <p style="margin-top: 20px;">
          <a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">Get a Quote</a>
          <a href="/products" style="display: inline-block; padding: 10px 20px; border: 1px solid #2563eb; color: #2563eb; text-decoration: none; border-radius: 6px; font-weight: bold;">Browse Products</a>
        </p>
      </section>

      <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />

      ${whoWeAreHtml}

      ${page.whyTrust ? `
        <section>
          <h2>${page.whyTrust.h2}</h2>
          ${(page.whyTrust.content || []).map(p => `<p style="margin-top: 12px; line-height: 1.7; color: #475569;">${p}</p>`).join('')}
        </section>
        <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
      ` : ''}

      ${landscapeHtml}
      ${whatWeSupplyHtml}
      ${industriesBuyHtml}
      ${mosfetDistributorHtml}
      ${mosfetCalculatorHtml}
      ${productSectionsHtml}
      ${specSnapshotHtml}
      ${qualityComplianceHtml}
      ${sourcingGuideHtml}
      ${howToOrderHtml}
      ${serviceAreasHtml}
      ${contactInfoHtml}
      ${faqsHtml}
      ${internalLinksHtml}
    `;
  } else {
    // Standard city page layout for other cities
    const faqList = (page.faqs || [])
      .map(faq => `<div><h3>${faq.q}</h3><p>${faq.a}</p></div>`)
      .join('\n');

    cityBody = `
      <h1>${page.h1}</h1>
      <p>${page.introduction}</p>
      
      <h2>Why Sourcing Components in ${page.city} Matters</h2>
      <p>${page.whyMirai}</p>
      
      <h2>Supported Product Portfolio</h2>
      <p>${page.productCategories}</p>
      
      <h2>Authorized Distribution & Regulatory Benefits</h2>
      <p>${page.whyAuthorisedDistributor}</p>
      
      <h2>Procurement Support Desk</h2>
      <p>${page.technicalSupport}</p>
      
      ${faqList ? `<h2>Frequently Asked Questions - Sourcing in ${page.city}</h2>${faqList}` : ''}
      
      <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b;">
        <p><strong>Quick Resource Links:</strong></p>
        <p>
          <a href="/market-area">Market Area Hub</a> | 
          ${categories.map(cat => `<a href="/products/${cat.slug}">Buy ${cat.name}</a>`).join(' | ')}
        </p>
        <p><strong>Other Cities We Serve:</strong></p>
        <p>
          ${nearby.map(sibling => `<a href="/${sibling.slug.replace(/^\//, '').replace(/\/$/, '')}">Sourcing in ${sibling.city}</a>`).join(' | ')}
        </p>
      </div>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;" />
      <p style="font-size: 12px; color: #64748b; font-style: italic;">${page.footerGeoText}</p>
    `;
  }

  prerenderPage(cleanSlug, {
    title: page.metaTitle,
    description: page.metaDescription,
    canonical: page.canonicalUrl
  }, cityBody, page.schema ? [page.schema] : []);
});
console.log(`✅ Prerendered: ${cityPages.length} city geo-landing pages`);

// 11. Market Area Page
const citiesByState = {};
cityPages.forEach(page => {
  const state = page.state || 'Other';
  if (!citiesByState[state]) {
    citiesByState[state] = [];
  }
  citiesByState[state].push(page);
});
const sortedStates = Object.keys(citiesByState).sort();
sortedStates.forEach(state => {
  citiesByState[state].sort((a, b) => a.city.localeCompare(b.city));
});

const marketBody = `
  <h1>Electronics Manufacturing & Distribution Hubs in India</h1>
  <p>Mirai Technologies serves as a trusted semiconductor and active/passive component supplier to all major industrial clusters across India. Below are the key manufacturing markets where we offer local credit terms, technical cross-references, and fast shipping.</p>
  
  ${sortedStates.map(state => `
    <h2>${state}</h2>
    <ul>
      ${citiesByState[state].map(page => `
        <li>
          <a href="/${page.slug.replace(/^\//, '').replace(/\/$/, '')}"><strong>Sourcing in ${page.city}</strong></a> - ${page.metaDescription}
        </li>
      `).join('\n')}
    </ul>
  `).join('\n')}
`;
prerenderPage('/market-area', {
  title: 'Electronics Manufacturing & Distribution Hubs India | Mirai',
  description: 'Explore the major electronics manufacturing clusters we serve across India including Mumbai, Pune, Noida, Bengaluru, Chennai, Hyderabad, and Ahmedabad.'
}, marketBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /market-area');

console.log('🎉 Prerendering complete! All static pages written to dist/');
