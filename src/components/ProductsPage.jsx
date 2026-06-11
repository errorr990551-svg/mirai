import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, X, ChevronDown, ChevronUp,
  Cpu, Zap, Radio, Activity, Layers, Settings, Thermometer,
  Search
} from 'lucide-react';
import { products, categories, getCategoryById } from '../data/products';
import { updateMeta, injectCategorySchema } from '../utils/seo';

const categoryIcons = {
  'integrated-circuit':    Cpu,
  'mosfet-transistor':     Zap,
  'transistor':            Radio,
  'microcontroller':       Activity,
  'ic-chip':               Layers,
  'electronic-components': Settings,
  'voltage-regulator':     Thermometer,
};

const SORT_OPTIONS = [
  { value: 'priority', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
];

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

function sortProducts(arr, sortBy) {
  const copy = [...arr];
  switch (sortBy) {
    case 'priority':
      return copy.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1));
    case 'price-asc':
      return copy.sort((a, b) => (a.price ?? 9999) - (b.price ?? 9999));
    case 'price-desc':
      return copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

// ── Filter Panel ─────────────────────────────────────────────────────────────
function FilterPanel({ filtered, allProducts, activeFilters, setActiveFilters }) {
  const [open, setOpen] = useState({ brand: true, package: false, stock: false });

  const uniqueBrands   = useMemo(() => [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort(), [allProducts]);
  const uniquePackages = useMemo(() => [...new Set(allProducts.map(p => p.package).filter(Boolean))].sort(), [allProducts]);

  function toggle(group, value) {
    setActiveFilters(prev => {
      const current = prev[group] || [];
      return {
        ...prev,
        [group]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      };
    });
  }

  function clearAll() {
    setActiveFilters({ brand: [], package: [], stock: [] });
  }

  const hasFilters = Object.values(activeFilters).some(v => v.length > 0);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm sticky top-28">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-[10px] text-mirai-primary font-bold flex items-center gap-1 hover:underline">
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Brand */}
      <FilterGroup
        label="Brand / Manufacturer"
        open={open.brand}
        toggle={() => setOpen(s => ({ ...s, brand: !s.brand }))}
        options={uniqueBrands}
        active={activeFilters.brand || []}
        onToggle={v => toggle('brand', v)}
        allProds={allProducts}
        filteredProds={filtered}
        field="brand"
      />

      {/* Package */}
      <FilterGroup
        label="Package Type"
        open={open.package}
        toggle={() => setOpen(s => ({ ...s, package: !s.package }))}
        options={uniquePackages}
        active={activeFilters.package || []}
        onToggle={v => toggle('package', v)}
        allProds={allProducts}
        filteredProds={filtered}
        field="package"
      />

      {/* Stock Status */}
      <div className="border-t border-slate-100 pt-3 mt-3">
        <button
          onClick={() => setOpen(s => ({ ...s, stock: !s.stock }))}
          className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider"
        >
          Stock Status
          {open.stock ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {open.stock && (
          <div className="mt-2 space-y-1.5">
            {['In Stock', 'Limited Stock', 'On Order'].map(v => (
              <label key={v} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(activeFilters.stock || []).includes(v)}
                  onChange={() => toggle('stock', v)}
                  className="accent-mirai-primary w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-600 group-hover:text-slate-900">{v}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, open, toggle, options, active, onToggle, allProds, filteredProds, field }) {
  const counts = useMemo(() => {
    const c = {};
    filteredProds.forEach(p => {
      const val = p[field];
      if (val) c[val] = (c[val] || 0) + 1;
    });
    return c;
  }, [filteredProds, field]);

  const displayed = options.slice(0, open ? 999 : 5);

  return (
    <div className="border-t border-slate-100 pt-3 mt-3">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider"
      >
        {label}
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {displayed.map(v => (
          <label key={v} className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={active.includes(v)}
                onChange={() => onToggle(v)}
                className="accent-mirai-primary w-3.5 h-3.5"
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 leading-tight">{v}</span>
            </div>
            {counts[v] !== undefined && (
              <span className="text-[9px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded-full">{counts[v]}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, idx }) {
  const triggerRFQ = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: product.name } }));
  };

  const isInStock = product.stockStatus === 'In Stock';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.4) }}
      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col group hover:shadow-md hover:border-mirai-primary/30 transition-all duration-200"
    >
      {/* Image / Icon area — square */}
      <Link to={`/product/${product.fullSlug}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
          {/* Hover tint */}
          <div className="absolute inset-0 bg-mirai-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Cpu className="w-10 h-10 text-slate-200 group-hover:text-mirai-primary/30 transition-colors duration-200" />

          {/* Package badge — bottom left */}
          {product.package && (
            <span className="absolute bottom-2 left-2 bg-slate-900/75 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
              {product.package}
            </span>
          )}

          {/* Popular badge — top right */}
          {product.priority === 'High' && (
            <span className="absolute top-2 right-2 bg-amber-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-wide">
              ★ Popular
            </span>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="p-3 flex flex-col flex-1">
        {/* Brand */}
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
          {product.brand?.split('/')[0]?.trim()}
        </p>

        {/* Product name */}
        <Link
          to={`/product/${product.fullSlug}`}
          className="text-[13px] font-bold text-slate-800 hover:text-mirai-primary leading-snug line-clamp-2 mb-3 transition-colors"
        >
          {product.name}
        </Link>

        {/* Price + stock row */}
        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-mirai-primary font-heading font-black text-base leading-none">
            {product.priceDisplay
              ? <>{product.priceDisplay}<span className="text-[9px] text-slate-400 font-normal ml-0.5">/pc</span></>
              : <span className="text-[11px] text-slate-400 font-semibold">On Request</span>
            }
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
            isInStock
              ? 'bg-green-50 text-green-600 border-green-200'
              : 'bg-yellow-50 text-yellow-600 border-yellow-200'
          }`}>
            {isInStock ? '● In Stock' : '◌ Limited'}
          </span>
        </div>

        {/* Buttons */}
        <div>
          <button
            onClick={triggerRFQ}
            className="w-full bg-slate-900 hover:bg-mirai-primary text-white text-[10px] font-bold py-2 rounded-lg transition-colors text-center"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const ProductsPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [sortBy, setSortBy]         = useState('priority');
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeFilters, setActiveFilters] = useState({ brand: [], package: [], stock: [] });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categoryData = categorySlug ? getCategoryById(categorySlug) : null;
  const CategoryIcon = categoryIcons[categorySlug] || Cpu;

  // Products for this category — MUST be declared before useEffect that uses it
  const poolProducts = useMemo(() => {
    if (categorySlug) {
      return products.filter(p => p.category === categorySlug);
    }
    return products;
  }, [categorySlug]);

  // Auto-scroll to top when category changes or query changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveFilters({ brand: [], package: [], stock: [] });
    setSearchQuery(queryParam);
    setSortBy('priority');
  }, [categorySlug, queryParam]);

  // Update page meta + schema
  useEffect(() => {
    if (categoryData) {
      updateMeta(
        categoryData.metaTitle || `${categoryData.name} – Mirai Technologies`,
        categoryData.metaDescription || ''
      );
      injectCategorySchema(categoryData, poolProducts);
    } else {
      updateMeta(
        'Electronic Components Catalog – Mirai Technologies Mumbai',
        'Shop 83+ genuine electronic components – ICs, MOSFETs, transistors, microcontrollers, optocouplers. Authorized distributor since 1999. Pan-India delivery. GST invoice.'
      );
    }
  }, [categoryData, poolProducts]);

  // Apply search + filters
  const filteredProducts = useMemo(() => {
    let result = poolProducts;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.applications?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
      );
    }

    // Brand filter
    if (activeFilters.brand?.length > 0) {
      result = result.filter(p => activeFilters.brand.includes(p.brand));
    }

    // Package filter
    if (activeFilters.package?.length > 0) {
      result = result.filter(p => activeFilters.package.includes(p.package));
    }

    // Stock filter
    if (activeFilters.stock?.length > 0) {
      result = result.filter(p => activeFilters.stock.includes(p.stockStatus));
    }

    return sortProducts(result, sortBy);
  }, [poolProducts, searchQuery, activeFilters, sortBy]);

  const hasFilters = Object.values(activeFilters).some(v => v.length > 0) || searchQuery.trim();

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="mb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Link to="/" className="hover:text-mirai-primary transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/products" className="hover:text-mirai-primary transition-colors">Products</Link>
            {categoryData && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-semibold">{categoryData.name}</span>
              </>
            )}
          </nav>

          {categoryData ? (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mirai-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header row: icon + title + count */}
              <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-mirai-primary/20 border border-mirai-primary/30 flex items-center justify-center shrink-0">
                    <CategoryIcon className="w-6 h-6 text-mirai-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-mirai-primary uppercase tracking-widest mb-0.5">
                      Product Category
                    </p>
                    <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
                      {categoryData.name}
                    </h1>
                  </div>
                </div>
                <span className="shrink-0 bg-mirai-primary/20 text-white text-sm font-black px-3 py-1.5 rounded-xl border border-mirai-primary/30">
                  {filteredProducts.length} parts
                </span>
              </div>

              {/* Description (Complete, not truncated) */}
              {categoryData.description && (
                <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-4xl border-l-2 border-mirai-primary/40 pl-4 relative z-10">
                  {categoryData.description}
                </p>
              )}

              {/* Quick Links */}
              {categoryData.navigationLinks?.length > 0 && (
                <div className="relative z-10 mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                    ⚡ Quick Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryData.navigationLinks.slice(0, 6).map((link, i) => (
                      <Link
                        key={i}
                        to={`/product/${link.toSlug}`}
                        className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-mirai-primary hover:text-white hover:border-mirai-primary px-3 py-1.5 rounded-full transition-all duration-200"
                      >
                        {link.anchorText}
                      </Link>
                    ))}
                  </div>
                </div>
              )}


            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mirai-primary/10 rounded-full blur-3xl pointer-events-none" />
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white relative z-10">
                Electronic Components Catalog
              </h1>
              <p className="text-sm text-slate-300 mt-2 relative z-10">
                83+ genuine electronic components — ICs, MOSFETs, transistors, microcontrollers and more.
              </p>
            </div>
          )}
        </div>

        {/* ── Category Grid (if showing all products) ──────────────────────── */}
        {!categorySlug && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
            {categories.filter(cat => products.filter(p => p.category === cat.id).length > 0).map(cat => {
              const Icon = categoryIcons[cat.id] || Cpu;
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  to={`/products/${cat.slug}`}
                  className="group bg-white border border-slate-200/80 rounded-2xl p-4 text-center hover:border-mirai-primary/30 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-mirai-primary/10 border border-slate-100 group-hover:border-mirai-primary/20 flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-mirai-primary transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-mirai-primary transition-colors text-center leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-400">{count} parts</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Search + Sort bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by part number, name, application..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-mirai-primary/40 focus:ring-2 focus:ring-mirai-primary/10 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl bg-white px-4 py-2.5 hover:border-mirai-primary/30 transition-all cursor-pointer min-w-[145px] justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/10"
              >
                <span>{SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-40 overflow-hidden"
                  >
                    {SORT_OPTIONS.map(opt => {
                      const isSelected = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                            isSelected
                              ? 'bg-mirai-primary text-white font-bold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl bg-white px-3 py-2.5 hover:border-mirai-primary/30 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* ── Active filter pills ──────────────────────────────────────────── */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {searchQuery && (
              <span className="bg-mirai-primary/10 text-mirai-primary text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-2.5 h-2.5" /></button>
              </span>
            )}
            {Object.entries(activeFilters).flatMap(([group, vals]) =>
              vals.map(v => (
                <span key={`${group}-${v}`} className="bg-mirai-primary/10 text-mirai-primary text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  {v}
                  <button onClick={() => setActiveFilters(prev => ({ ...prev, [group]: prev[group].filter(x => x !== v) }))}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))
            )}
          </div>
        )}

        {/* ── Layout: Sidebar + Grid ───────────────────────────────────────── */}
        <div className="flex gap-6">

          {/* Sidebar Filters (desktop) */}
          <aside className="hidden lg:block w-60 shrink-0">
            <FilterPanel
              filtered={filteredProducts}
              allProducts={poolProducts}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-0 z-50 lg:hidden"
              >
                <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
                <div className="relative w-72 h-full bg-white shadow-2xl p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>
                  <FilterPanel
                    filtered={filteredProducts}
                    allProducts={poolProducts}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center shadow-sm">
                <Cpu className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-black text-slate-800 mb-1">No products found</h3>
                <p className="text-sm text-slate-500 mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setActiveFilters({ brand: [], package: [], stock: [] }); setSearchQuery(''); }}
                  className="inline-block bg-mirai-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-mirai-accent transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} idx={idx} />
                ))}
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductsPage;
