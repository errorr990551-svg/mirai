export function updateMeta(title, description) {
  document.title = title;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mirai Technologies",
    "url": "https://mirai-technologies.com",
    "logo": "https://mirai-technologies.com/images/mirai-technologies-logo.webp",
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
  updateSchemaScripts([schema]);
}

export function injectProductSchema(product, categorySlug) {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.partNumber} ${product.name}`,
    "image": [
      product.heroImage?.filename 
        ? `https://mirai-technologies.com/images/${product.heroImage.filename}`
        : "https://mirai-technologies.com/images/default.webp"
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
      "url": `https://mirai-technologies.com/product/${product.fullSlug}`,
      "priceCurrency": "INR",
      "price": product.price || 0,
      "priceValidUntil": "2027-03-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Mirai Technologies",
        "url": "https://mirai-technologies.com"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "11"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (product.faqs || []).map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
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
        "item": "https://mirai-technologies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.categoryLabel || categorySlug,
        "item": `https://mirai-technologies.com/products/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.partNumber,
        "item": `https://mirai-technologies.com/product/${product.fullSlug}`
      }
    ]
  };

  updateSchemaScripts([productSchema, faqSchema, breadcrumbSchema]);
}

export function injectCategorySchema(category, categoryProducts) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category.name,
    "description": category.description,
    "itemListElement": categoryProducts.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://mirai-technologies.com/product/${p.fullSlug}`
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
        "item": "https://mirai-technologies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `https://mirai-technologies.com/products/${category.slug}`
      }
    ]
  };

  updateSchemaScripts([itemListSchema, breadcrumbSchema]);
}
