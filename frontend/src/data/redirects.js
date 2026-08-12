import cityPages from './cityPages.json';

// Active city slugs dictionary for ultra-fast lookup
const activeCitySlugs = new Set(cityPages.map(page => page.slug.toLowerCase()));

// Explicit redirects for legacy variations/aliases
export const redirectsMap = {
  "/electronic-component-distributor-in-bangalore": "/electronic-components-supplier-bengaluru",
  "/electronic-component-distributor-in-noida": "/electronic-components-supplier-delhi-ncr",
  "/electronic-component-distributor-in-gurgaon": "/electronic-components-supplier-delhi-ncr",
  "/electronic-component-distributor-in-faridabad": "/electronic-components-supplier-delhi-ncr",
  "/electronic-component-distributor-in-ghaziabad": "/electronic-components-supplier-delhi-ncr"
};

// Default fallback redirect for unknown city pages
export const defaultCityFallback = "/market-area";

export function getRedirectTarget(pathname) {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, "");
  
  // 1. If explicit redirect mapping exists (and differs from current path), redirect to mapped target
  if (redirectsMap[cleanPath] && redirectsMap[cleanPath] !== cleanPath) {
    return redirectsMap[cleanPath];
  }
  
  // 2. If path is an active registered city page, DO NOT REDIRECT!
  if (activeCitySlugs.has(cleanPath)) {
    return null;
  }
  
  // 3. Fallback for un-matched old distributor paths
  if (cleanPath.startsWith("/electronic-component-distributor-in-")) {
    return defaultCityFallback;
  }

  return null;
}
