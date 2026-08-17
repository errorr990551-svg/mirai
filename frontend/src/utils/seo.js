export function updatePageSEO(title, description, canonical, robots, ogTitle, ogDescription, keywords, author, publisher) {
  document.title = title || 'Mirai Technologies';

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description || '';

  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    document.head.appendChild(metaRobots);
  }
  metaRobots.content = robots || 'index, follow';

  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.rel = 'canonical';
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.href = canonical || (`https://miraitechnologies.net` + window.location.pathname);

  let metaOgTitle = document.querySelector('meta[property="og:title"]');
  if (!metaOgTitle) {
    metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    document.head.appendChild(metaOgTitle);
  }
  metaOgTitle.content = ogTitle || title || '';

  let metaOgDesc = document.querySelector('meta[property="og:description"]');
  if (!metaOgDesc) {
    metaOgDesc = document.createElement('meta');
    metaOgDesc.setAttribute('property', 'og:description');
    document.head.appendChild(metaOgDesc);
  }
  metaOgDesc.content = ogDescription || description || '';

  // Remove keywords tag if it exists
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.remove();
  }

  // Author
  let metaAuthor = document.querySelector('meta[name="author"]');
  if (!metaAuthor) {
    metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    document.head.appendChild(metaAuthor);
  }
  metaAuthor.content = author || 'Mirai Technologies';

  // Publisher
  let metaPublisher = document.querySelector('meta[name="publisher"]');
  if (!metaPublisher) {
    metaPublisher = document.createElement('meta');
    metaPublisher.name = 'publisher';
    document.head.appendChild(metaPublisher);
  }
  metaPublisher.content = publisher || 'Mirai Technologies';
}

export function updateMeta(title, description, keywords, author, publisher) {
  updatePageSEO(
    title,
    description,
    null,
    'index, follow',
    title,
    description,
    keywords,
    author,
    publisher
  );
}


export function updateSchemaScripts(schemas) {
  // Clear any existing dynamic schema script tags
  const existing = document.querySelectorAll('script[data-dynamic-schema]');
  existing.forEach(el => el.remove());

  // Inject new schema script tags
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic-schema', 'true');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function injectOrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://miraitechnologies.net/#organization",
    "name": "Mirai Technologies",
    "url": "https://miraitechnologies.net/",
    "logo": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
    "description": "Independent B2B stockist and distributor of ICs, MOSFETs, IGBTs, transistors, optocouplers & microcontrollers in Mumbai, India. Est. 1999.",
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
      "telephone": "+91-93213-98188",
      "contactType": "sales",
      "email": "sales@miraitechnologies.net",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "mr"]
    },
    "sameAs": [
      "https://www.indiamart.com/mirai-technologies/"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mirai Technologies - Mumbai Headquarters",
    "image": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
    "telephone": "+91-93213-98188",
    "email": "sales@miraitechnologies.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400034",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.9712,
      "longitude": 72.8152
    },
    "url": "https://miraitechnologies.net/",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "18:30"
      }
    ]
  };

  updateSchemaScripts([orgSchema, localBusinessSchema]);
}

export function injectProductSchema(product, categorySlug) {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.partNumber ? `${product.partNumber} ${product.name || ''}` : product.name,
    "image": [
      product.heroImage?.filename
        ? `https://miraitechnologies.net/images/${product.heroImage.filename}`
        : "https://miraitechnologies.net/images/default.webp"
    ],
    "description": product.shortDescription || product.description,
    "sku": product.partNumber,
    "mpn": product.partNumber,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Mirai Stock"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://miraitechnologies.net/product/${product.fullSlug || product.slug}`,
      "priceCurrency": "INR",
      "price": product.price || 0,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === 'Out of Stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mirai Technologies",
        "url": "https://miraitechnologies.net"
      }
    }
  };

  const schemas = [productSchema];

  if (product.faqs && product.faqs.length > 0) {
    schemas.push({
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
    });
  }

  schemas.push({
    "@context": "https://schema.org",
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
        "name": "Products",
        "item": "https://miraitechnologies.net/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.categoryLabel || categorySlug || "Catalog",
        "item": `https://miraitechnologies.net/products/${categorySlug || 'catalog'}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.partNumber || product.name
      }
    ]
  });

  updateSchemaScripts(schemas);
}

export function injectCategorySchema(category, categoryProducts = []) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category.name,
    "description": category.description,
    "itemListElement": categoryProducts.slice(0, 30).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://miraitechnologies.net/product/${p.fullSlug || p.slug}`
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
        "item": "https://miraitechnologies.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://miraitechnologies.net/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name
      }
    ]
  };

  updateSchemaScripts([itemListSchema, breadcrumbSchema]);
}

export function injectApplicationSchema(application) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": application.title,
    "description": application.metaDescription,
    "author": {
      "@type": "Person",
      "name": application.author || "Senior Applications Engineer",
      "jobTitle": "Field Applications Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Mirai Technologies"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mirai Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://miraitechnologies.net/images/mirai-technologies-logo.webp"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Applications",
        "item": "https://miraitechnologies.net/applications"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": application.title
      }
    ]
  };

  updateSchemaScripts([articleSchema, breadcrumbSchema]);
}

