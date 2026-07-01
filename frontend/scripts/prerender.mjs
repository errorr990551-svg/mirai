import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categories, products } from '../src/data/products.js';
import { blogPosts } from '../src/data/blog.js';

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

const baseTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf8');
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
  "name": "Mirai Technologies",
  "url": "https://miraitechnologies.net",
  "logo": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
  "description": "Authorized distributor of ICs, MOSFETs, transistors, optocouplers & microcontrollers. Mumbai, India. Est. 1999.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400034",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+917942964662",
    "contactType": "sales",
    "areaServed": "IN"
  },
  "sameAs": ["https://www.indiamart.com/mirai-technologies/"]
};

// Main prerender helper
function prerenderPage(route, seoDetails, bodyHtml, schemas = []) {
  // Normalize route to directory path
  let cleanRoute = route.replace(/^\//, '').replace(/\/$/, '');
  let outputDir = DIST;
  let targetFile = path.join(DIST, 'index.html'); // Fallback for root homepage
  
  if (cleanRoute !== '') {
    outputDir = path.join(DIST, cleanRoute);
    fs.mkdirSync(outputDir, { recursive: true });
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
  
  // Replace Canonical Link
  const canonicalUrl = seoDetails.canonical || `https://miraitechnologies.net/${cleanRoute}`;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i)) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
  }

  // Inject Schemas in Head
  if (schemas && schemas.length > 0) {
    const schemaTags = schemas.map(schema => 
      `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`
    ).join('\n');
    html = html.replace(/<\/head>/i, `${schemaTags}\n</head>`);
  }
  
  // Inject Pre-rendered Body content inside <div id="root"></div>
  const fullBodyHtml = `
    <header style="padding: 20px; background-color: #030712; color: #fff;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold; font-size: 20px;">Mirai Technologies</span>
        <nav>
          <a href="/" style="color: #fff; margin-right: 15px; text-decoration: none;">Home</a>
          <a href="/about" style="color: #fff; margin-right: 15px; text-decoration: none;">About</a>
          <a href="/products" style="color: #fff; margin-right: 15px; text-decoration: none;">Products</a>
          <a href="/blog" style="color: #fff; margin-right: 15px; text-decoration: none;">Blog</a>
          <a href="/contact" style="color: #fff; text-decoration: none;">Contact</a>
        </nav>
      </div>
    </header>
    <main style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
      ${bodyHtml}
    </main>
    <footer style="padding: 40px 20px; background-color: #030712; color: #94a3b8; text-align: center; font-size: 14px;">
      <p>&copy; 2026 Mirai Technologies. All rights reserved. Mumbai, India.</p>
    </footer>
  `;
  
  html = html.replace(/<div\s+id="root">\s*<\/div>/i, `<div id="root">${fullBodyHtml}</div>`);
  
  fs.writeFileSync(targetFile, html, 'utf8');
}

console.log('🏁 Starting Static Site Prerendering for SEO...');

// 1. Homepage (overwrite dist/index.html to include indexable body & schema)
const homeBody = `
  <h1>Buy Electronic Components Online India | Mirai Technologies</h1>
  <p>Mirai Technologies is India's most trusted partner for active and passive electronic components. Headquartered in Mumbai, we have supplied authentic, factory-traceable semiconductors to OEMs, EMS companies, R&D labs, and defence units since 1999.</p>
  
  <h2>Why Sourcing Professionals Trust Mirai Technologies</h2>
  <ul>
    <li><strong>100% Genuine Components:</strong> Sourced directly from manufacturers or authorized franchise lines with full Certificate of Conformance (CoC).</li>
    <li><strong>Broad Product Portfolio:</strong> Active stock of Power MOSFETs, IGBTs, Microcontrollers, Optocouplers, ICs, and passive components.</li>
    <li><strong>Low MOQ Flexibility:</strong> Helping small and large manufacturers optimize inventory and working capital.</li>
    <li><strong>B2B Compliance:</strong> Complete GST invoicing to claim Input Tax Credit seamlessly.</li>
  </ul>
  
  <h2>Main Sourcing Categories</h2>
  <ul>
    ${categories.map(c => `<li><a href="/products/${c.slug}">${c.name}</a> - ${c.description}</li>`).join('\n')}
  </ul>
`;
prerenderPage('/', {
  title: 'Buy Electronic Components Online India | Mirai Technologies',
  description: 'Mirai Technologies – authorized distributor and stockist of active and passive electronic components in Mumbai since 1999. Genuine ICs, MOSFETs, transistors, microcontrollers, and optocouplers with pan-India delivery and GST invoice.'
}, homeBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: / (Homepage)');

// 2. About page
const aboutBody = `
  <h1>About Mirai Technologies | Authorized Semiconductor Distributor</h1>
  <p>Established in 1999 in Mumbai, Mirai Technologies has built 25+ years of expertise as a leading distributor of electronic components. We serve automotive, industrial, consumer electronics, and telecom manufacturers across India and globally.</p>
  
  <h2>Our Sourcing Philosophy</h2>
  <p>We believe that supply chain stability is the foundation of manufacturing success. In an industry affected by shortages and grey-market counterfeiting, Mirai Technologies guarantees 100% genuine and traceable parts. We carry buffer stock under rolling forecasts and provide expert cross-referencing support.</p>
  
  <h2>Quality Certifications</h2>
  <ul>
    <li>ISO 9001:2015 Quality Management Certified</li>
    <li>ANSI/ESD S20.20 compliant electrostatic-safe handling facility</li>
    <li>Full RoHS/REACH compliance verification for components</li>
  </ul>
`;
prerenderPage('/about', {
  title: 'About Mirai Technologies | Authorized Semiconductor Distributor',
  description: 'Learn about Mirai Technologies, established in 1999. We are a leading authorized distributor and stockist of active and passive electronic components in Mumbai, India. We serve OEMs and EMS providers with factory traceable parts.'
}, aboutBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /about');

// 3. Contact page
const contactBody = `
  <h1>Contact Us | Get a Quote | Mirai Technologies Mumbai</h1>
  <p>Sourcing components for an upcoming production run? Submit your RFQ, BOM, or part number list today. Our engineering and sales team will respond with competitive pricing, availability, and traceability within 24 hours.</p>
  
  <h2>Contact Information</h2>
  <p><strong>Phone / WhatsApp:</strong> +91 93213 98188 / +91 98201 22744 / +91 91368 10360</p>
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

  prerenderPage(`/products/${category.slug}`, {
    title: category.metaTitle || `${category.name} - Mirai Technologies`,
    description: category.metaDescription || `Buy ${category.name} online from Mirai Technologies. Genuine components, low MOQs, and fast delivery in India.`
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
    <p><a href="${product.whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25d366; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Enquire via WhatsApp</a></p>
    
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
  
  const faqList = (page.faqs || [])
    .map(faq => `<div><h3>${faq.q}</h3><p>${faq.a}</p></div>`)
    .join('\n');

  const cityBody = `
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
    
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;" />
    <p style="font-size: 12px; color: #64748b; font-style: italic;">${page.footerGeoText}</p>
  `;

  prerenderPage(cleanSlug, {
    title: page.metaTitle,
    description: page.metaDescription,
    canonical: page.canonicalUrl
  }, cityBody, page.schema ? [page.schema] : []);
});
console.log(`✅ Prerendered: ${cityPages.length} city geo-landing pages`);

// 11. Market Area Page
const marketBody = `
  <h1>Electronics Manufacturing & Distribution Hubs in India</h1>
  <p>Mirai Technologies serves as a trusted semiconductor and active/passive component supplier to all major industrial clusters across India. Below are the key manufacturing markets where we offer local credit terms, technical cross-references, and fast shipping.</p>
  
  <h2>Major Hubs Served</h2>
  <ul>
    ${cityPages.map(page => `<li><a href="${page.slug}"><strong>Sourcing in ${page.city}</strong></a> - ${page.metaDescription}</li>`).join('\n')}
  </ul>
`;
prerenderPage('/market-area', {
  title: 'Electronics Manufacturing & Distribution Hubs India | Mirai',
  description: 'Explore the major electronics manufacturing clusters we serve across India including Mumbai, Pune, Noida, Bengaluru, Chennai, Hyderabad, and Ahmedabad.'
}, marketBody, [ORG_SCHEMA]);
console.log('✅ Prerendered: /market-area');

console.log('🎉 Prerendering complete! All static pages written to dist/');
