import cityPages from './cityPages.json';

// Active city slugs dictionary for ultra-fast lookup
const activeCitySlugs = new Set(cityPages.map(page => page.slug.toLowerCase()));

// Explicit redirects for legacy variations/aliases & PHP legacy URLs
export const redirectsMap = {
  "/contact.php": "/contact",
  "/index.php": "/",
  "/rfq": "/contact",
  "/bom-upload": "/contact",
  "/quote": "/contact",
  "/request-a-quote": "/contact",
  "/power-mosfet-distributor": "/mosfet-distributor",
  "/electronic-component-distributor-in-bangalore": "/electronic-component-distributor-in-bengaluru",
  "/electronic-components-supplier-bengaluru": "/electronic-component-distributor-in-bengaluru",
  "/electronic-component-distributor-in-hubli-dharwad": "/electronic-component-distributor-in-hubballi-dharwad",
  "/electronic-component-distributor-in-hubli": "/electronic-component-distributor-in-hubballi-dharwad",
  "/electronic-component-distributor-in-mysore": "/electronic-component-distributor-in-mysuru",
  "/electronic-component-distributor-in-belgaum": "/electronic-component-distributor-in-belagavi",
  "/electronic-component-distributor-in-mangalore": "/electronic-component-distributor-in-mangaluru",
  "/electronic-component-distributor-in-tumkur": "/electronic-component-distributor-in-tumakuru",
  "/electronic-component-distributor-in-davangere": "/electronic-component-distributor-in-davanagere",
  "/electronic-component-distributor-in-bellary": "/electronic-component-distributor-in-ballari",
  "/electronic-component-distributor-in-shimoga": "/electronic-component-distributor-in-shivamogga",
  "/electronic-component-distributor-in-gulbarga": "/electronic-component-distributor-in-kalaburagi",
  "/electronic-components-supplier-pune": "/electronic-component-distributor-in-pune",
  "/electronic-components-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/electronic-components-supplier-chennai": "/electronic-component-distributor-in-chennai",
  "/electronic-components-supplier-coimbatore": "/electronic-component-distributor-in-coimbatore",
  "/electronic-components-supplier-ahmedabad": "/electronic-component-distributor-in-ahmedabad",
  "/electronic-components-supplier-hyderabad": "/electronic-component-distributor-in-hyderabad",
  "/electronic-components-supplier-delhi-ncr": "/electronic-component-distributor-in-delhi",
  "/electronic-component-distributor-in-delhi-ncr": "/electronic-component-distributor-in-delhi",
  "/electronic-component-distributor-in-gurgaon": "/electronic-component-distributor-in-delhi",
  "/electronic-component-distributor-in-ghaziabad": "/electronic-component-distributor-in-delhi",
  "/products/integrated-circuits": "/products/integrated-circuit",
  "/power-mosfets-supplier-chennai": "/electronic-component-distributor-in-chennai",
  "/integrated-circuits-supplier-chennai": "/electronic-component-distributor-in-chennai",
  "/power-mosfets-supplier-coimbatore": "/electronic-component-distributor-in-coimbatore",
  "/power-mosfets-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/igbts-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/integrated-circuits-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/microcontrollers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/transistors-optocouplers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/voltage-regulators-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/diodes-rectifiers-supplier-mumbai": "/electronic-component-distributor-in-mumbai",
  "/power-mosfets-supplier-pune": "/electronic-component-distributor-in-pune",
  "/igbts-supplier-pune": "/electronic-component-distributor-in-pune",
  "/power-mosfets-supplier-ahmedabad": "/electronic-component-distributor-in-ahmedabad",
  "/igbts-supplier-ahmedabad": "/electronic-component-distributor-in-ahmedabad",
  "/power-mosfets-supplier-delhi-ncr": "/electronic-component-distributor-in-delhi",
  "/diodes-rectifiers-supplier-delhi-ncr": "/electronic-component-distributor-in-delhi",
  "/integrated-circuits-supplier-bengaluru": "/electronic-component-distributor-in-bengaluru",
  "/microcontrollers-supplier-bengaluru": "/electronic-component-distributor-in-bengaluru",
  "/integrated-circuits-supplier-hyderabad": "/electronic-component-distributor-in-hyderabad",
  "/electronic-component-distributor-in-aurangabad": "/electronic-component-distributor-in-chhatrapati-sambhajinagar",
  "/aurangabad": "/electronic-component-distributor-in-chhatrapati-sambhajinagar",
  "/electronic-component-distributor-in-mahabubnagar": "/electronic-component-distributor-in-mahbubnagar",
  "/electronic-component-distributor-in-patancheru": "/electronic-component-distributor-in-sangareddy-patancheru",
  "/electronic-component-distributor-in-sangareddy": "/electronic-component-distributor-in-sangareddy-patancheru",
  "/electronic-component-distributor-in-godavarikhani": "/electronic-component-distributor-in-ramagundam-godavarikhani",
  "/electronic-component-distributor-in-ramagundam": "/electronic-component-distributor-in-ramagundam-godavarikhani",
  "/electronic-component-distributor-in-hanamkonda": "/electronic-component-distributor-in-warangal",
};

// Default fallback redirect for unknown city pages
export const defaultCityFallback = "/market-area";

export function getRedirectTarget(pathname) {
  if (!pathname) return null;
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, "");
  if (cleanPath === "") return null;
  
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

