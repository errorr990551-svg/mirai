import cityPages from './cityPages.json';

// Active city slugs dictionary for ultra-fast lookup
const activeCitySlugs = new Set(cityPages.map(page => page.slug.toLowerCase()));

// Explicit redirects for legacy variations/aliases & PHP legacy URLs
export const redirectsMap = {
  "/contact.php": "/contact",
  "/index.php": "/",
  "/electronic-component-distributor-in-bangalore": "/electronic-component-distributor-in-bengaluru",
  "/electronic-components-supplier-bengaluru": "/electronic-component-distributor-in-bengaluru",
  "/electronic-components-supplier-pune": "/electronic-component-distributor-in-pune",
  "/electronic-components-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/electronic-components-supplier-delhi-ncr": "/electronic-component-distributor-in-delhi-ncr",
  "/electronic-component-distributor-in-noida": "/electronic-component-distributor-in-delhi-ncr",
  "/electronic-component-distributor-in-gurgaon": "/electronic-component-distributor-in-delhi-ncr",
  "/electronic-component-distributor-in-faridabad": "/electronic-component-distributor-in-delhi-ncr",
  "/electronic-component-distributor-in-ghaziabad": "/electronic-component-distributor-in-delhi-ncr",
  "/products/integrated-circuits": "/products/integrated-circuit"
};

// Default fallback redirect for unknown city pages
export const defaultCityFallback = "/market-area";

export function getRedirectTarget(pathname) {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, "");
  
  // 1. If explicit redirect mapping exists (and differs from current path), redirect to mapped target
  if (redirectsMap[cleanPath] && redirectsMap[cleanPath] !== cleanPath) {
    return redirectsMap[cleanPath];
  }

  // 2. Dynamic redirect for /electronic-components-supplier-{city} -> /electronic-component-distributor-in-{city}
  if (cleanPath.startsWith("/electronic-components-supplier-")) {
    const city = cleanPath.replace("/electronic-components-supplier-", "");
    const targetDistributorPath = `/electronic-component-distributor-in-${city}`;
    if (activeCitySlugs.has(targetDistributorPath)) {
      return targetDistributorPath;
    }
  }

  // 3. Dynamic redirect for product category slug drift: /product/integrated-circuits/{part} -> /product/integrated-circuit/{part}
  if (cleanPath.startsWith("/product/integrated-circuits/")) {
    return cleanPath.replace("/product/integrated-circuits/", "/product/integrated-circuit/");
  }

  // 4. If path is an active registered city page, DO NOT REDIRECT!
  if (activeCitySlugs.has(cleanPath)) {
    return null;
  }
  
  // 5. Fallback for un-matched old distributor paths
  if (cleanPath.startsWith("/electronic-component-distributor-in-")) {
    return defaultCityFallback;
  }

  return null;
}

