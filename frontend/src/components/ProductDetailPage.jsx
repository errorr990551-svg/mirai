import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Cpu, BadgeCheck, FileText,
  Download, ArrowLeft, ArrowRight, ShieldCheck, Award,
  HeartHandshake, ChevronDown, ChevronUp,
  Zap, Package, Hash, Layers, Activity
} from 'lucide-react';
import { products, getProductBySlug, getProductsByCategory, getCategoryById } from '../data/products';
import { updateMeta, injectProductSchema } from '../utils/seo';

// ── FAQ Accordion Item ────────────────────────────────────────────────────────
function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-3 py-4 px-1 hover:text-mirai-primary transition-colors"
      >
        <span className="text-sm font-bold text-slate-800 leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-mirai-primary shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-600 leading-relaxed pb-4 px-1">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Image Panel ───────────────────────────────────────────────────────────────
function ImagePanel({ product }) {
  const [activeImg, setActiveImg] = useState('hero');
  const [failedKeys, setFailedKeys] = useState([]);

  const handleImageError = (key) => {
    setFailedKeys(prev => {
      if (prev.includes(key)) return prev;
      return [...prev, key];
    });
  };

  const images = [
    { key: 'hero',       label: 'Product',    img: product.heroImage },
    { key: 'pinout',     label: 'Pinout',     img: product.pinoutImage },
    { key: 'appCircuit', label: 'App Circuit', img: product.appCircuitImage },
  ].filter(i => i.img?.filename && !failedKeys.includes(i.key));

  useEffect(() => {
    if (activeImg !== 'hero' && !images.some(i => i.key === activeImg)) {
      setActiveImg('hero');
    }
  }, [failedKeys, activeImg, images]);

  const current = images.find(i => i.key === activeImg) || images[0];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-mirai-primary/5 to-mirai-accent/5 opacity-40" />
        {current?.img?.filename ? (
          <img
            src={`/${current.img.filename}`}
            alt={current.img.filename}
            title={current.img.title || product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105 relative z-10"
            onError={() => handleImageError(current.key)}
          />
        ) : (
          <>
            <Cpu className="w-16 h-16 text-slate-300 group-hover:scale-105 transition-transform" />
            <span className="text-xs uppercase tracking-widest text-slate-400 font-black mt-3">Product Image</span>
          </>
        )}
        {/* Image type badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-600 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-sm">
            {current?.label}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map(img => (
            <button
              key={img.key}
              onClick={() => setActiveImg(img.key)}
              className={`flex-1 aspect-square rounded-xl border-2 overflow-hidden relative transition-all duration-200 flex flex-col items-center justify-center bg-white ${
                activeImg === img.key
                  ? 'border-mirai-primary bg-mirai-primary/5 shadow-sm'
                  : 'border-slate-200 hover:border-slate-400 hover:shadow-sm'
              }`}
            >
              <img
                src={`/${img.img.filename}`}
                alt={img.label}
                className="w-full h-full object-contain p-1.5 transition-transform duration-300 hover:scale-105"
                onError={() => handleImageError(img.key)}
              />
              <div className={`absolute bottom-0 inset-x-0 text-[8px] font-bold uppercase tracking-wider py-0.5 text-center transition-colors duration-200 ${
                activeImg === img.key
                  ? 'bg-mirai-primary text-white'
                  : 'bg-slate-900/60 backdrop-blur-[1px] text-white'
              }`}>
                {img.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');

  // The wildcard route gives us params['*'] = 'integrated-circuit/lm358ld08t'
  const slug = params['*'] || '';
  const productId = slug.split('/').pop();

  // Try slug first, fallback to id
  const product = getProductBySlug(slug) || getProductBySlug(productId);

  // Auto-scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Update SEO meta and schemas
  useEffect(() => {
    if (product) {
      updateMeta(
        product.metaTitle || `${product.partNumber} – Buy Online India | Mirai Technologies`,
        product.metaDescription || `Buy ${product.partNumber} from Mirai Technologies Mumbai. Authorized distributor. Fast pan-India delivery.`,
        product.lsiKeywords,
        'Mirai Technologies',
        'Mirai Technologies'
      );
      injectProductSchema(product, product.category);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <Cpu className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Component Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-xs">
          The electronic component "{productId}" could not be found in our catalog.
        </p>
        <Link
          to="/products"
          className="flex items-center gap-2 bg-mirai-primary hover:bg-mirai-accent text-white font-bold px-6 py-2.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .sort((a, b) => (({ High: 0, Medium: 1, Low: 2 })[a.priority] ?? 1) - (({ High: 0, Medium: 1, Low: 2 })[b.priority] ?? 1))
    .slice(0, 4);

  const categoryData = getCategoryById(product.category);

  const getAlternativeLink = (altName) => {
    const trimmed = altName.trim();
    const matchedProduct = products.find(p => 
      p.partNumber.toLowerCase() === trimmed.toLowerCase() ||
      p.partNumber.toLowerCase().includes(trimmed.toLowerCase()) ||
      trimmed.toLowerCase().includes(p.partNumber.toLowerCase())
    );
    if (matchedProduct) {
      return `/product/${matchedProduct.fullSlug}`;
    }
    return `/products?q=${encodeURIComponent(trimmed)}`;
  };

  const triggerRFQ = () => {
    window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: product.name } }));
  };

  const tabs = [
    { id: 'description',  label: 'Overview' },
    { id: 'technical',    label: 'Specifications' },
    { id: 'applications', label: 'Applications' },
    { id: 'faq',          label: `FAQ (${product.faqs?.length || 0})` },
    { id: 'downloads',    label: 'Datasheet' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
          <Link to="/" className="hover:text-mirai-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-mirai-primary transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          {categoryData && (
            <>
              <Link to={`/products/${product.category}`} className="hover:text-mirai-primary transition-colors">
                {categoryData.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-slate-600 font-medium">{product.partNumber}</span>
        </nav>

        {/* ── Back Button ──────────────────────────────────────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-mirai-primary mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* ── MAIN PRODUCT DETAIL CARD ───────────────────────────── */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
          <div className="grid md:grid-cols-12 gap-6 lg:gap-10">

            {/* LEFT: Images */}
            <div className="md:col-span-5">
              <ImagePanel product={product} />
            </div>

            {/* RIGHT: Info panel */}
            <div className="md:col-span-7 flex flex-col">

              {/* Category + Priority */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg uppercase">
                  {product.categoryLabel || product.category}
                </span>
                <span className="text-xs font-bold text-slate-400">{product.brand}</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 leading-tight mb-3">
                {product.partNumber} – {product.name.replace(product.partNumber, '').trim() || product.name}
              </h1>

              {/* Key spec pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.package && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    <Package className="w-3 h-3" />
                    {product.package}
                  </span>
                )}
                {product.pins && (
                  <span className="flex items-center gap-1 bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    <Hash className="w-3 h-3" />
                    {product.pins} Pins
                  </span>
                )}
                {product.supplyVoltage && product.supplyVoltage !== '—' && (
                  <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-100 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    <Zap className="w-3 h-3" />
                    {product.supplyVoltage}
                  </span>
                )}
                {product.currentOutput && product.currentOutput !== '—' && (
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    <Activity className="w-3 h-3" />
                    {product.currentOutput}
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="text-sm text-slate-500 leading-relaxed mb-5 font-sans line-clamp-3">
                {product.shortDescription}
              </p>

              {/* Stock + delivery badges — compact row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                  product.stockStatus === 'In Stock'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                  • {product.stockStatus}
                </span>
              </div>

              {/* Price + CTA block */}
              <div className="bg-transparent py-4 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
                    <span className="text-2xl font-heading font-black text-mirai-primary block">
                      {product.priceDisplay || 'On Request'}
                    </span>
                  </div>
                  <button
                    onClick={triggerRFQ}
                    className="bg-mirai-primary hover:bg-opacity-90 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Frequently Bought Together ─────────────────────────────────── */}
        {product.fbtLinks?.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider text-mirai-accent mb-4">
              Frequently Bought Together
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Main Product Card */}
                <div className="bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-white/60" />
                  <div>
                    <span className="text-xs font-bold font-mono block">{product.partNumber}</span>
                    <span className="text-[10px] text-white/60 block">{product.priceDisplay || 'Price on Request'}</span>
                  </div>
                </div>
                
                <span className="text-xl font-bold text-white/40">+</span>
                
                {/* FBT Products */}
                {product.fbtLinks.map((link, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-xl font-bold text-white/40">+</span>}
                    <Link
                      to={`/product/${link.toSlug}`}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 flex items-center gap-3 hover:-translate-y-0.5 transition-all"
                    >
                      <Cpu className="w-8 h-8 text-mirai-accent/80" />
                      <div>
                        <span className="text-xs font-bold font-mono text-mirai-accent block hover:underline">
                          {link.anchorText}
                        </span>
                        <span className="text-[10px] text-white/60 block">View Part</span>
                      </div>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
              
              <button
                onClick={() => {
                  const parts = [product.partNumber, ...product.fbtLinks.map(l => l.toPartNumber)].join(' + ');
                  window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: parts } }));
                }}
                className="w-full md:w-auto md:ml-auto bg-mirai-accent hover:bg-white text-slate-900 text-xs font-black tracking-wider px-6 py-3.5 rounded-xl transition-all uppercase whitespace-nowrap shadow-lg shadow-yellow-500/10"
              >
                Get Combo Quote
              </button>
            </div>
          </div>
        )}

        {/* ── TABS SECTION ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm mb-12 overflow-hidden">

          {/* Tab headers */}
          <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/50 px-4 pt-2 overflow-x-auto">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider transition-all relative border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-mirai-primary text-mirai-primary'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="p-6 sm:p-8 min-h-[240px]">

            {/* Overview */}
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 mb-2">Product Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {product.shortDescription}
                </p>
                {product.alternatives && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                        Alternative / Compatible Parts
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.alternatives
                          .split(',')
                          .map(alt => {
                            const trimmed = alt.trim();
                            const matchedProduct = products.find(p => 
                              p.partNumber.toLowerCase() === trimmed.toLowerCase() ||
                              p.partNumber.toLowerCase().includes(trimmed.toLowerCase()) ||
                              trimmed.toLowerCase().includes(p.partNumber.toLowerCase())
                            );
                            if (!matchedProduct) return null;
                            return (
                              <Link
                                key={trimmed}
                                to={`/product/${matchedProduct.fullSlug}`}
                                className="bg-white border border-slate-200 hover:border-mirai-primary hover:text-mirai-primary text-slate-700 text-[11px] font-bold px-2.5 py-1.5 rounded-lg font-mono transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                              >
                                {trimmed}
                              </Link>
                            );
                          })
                          .filter(Boolean)}
                      </div>
                    </div>
                    {product.alternativesLinks?.length > 0 && (
                      <div className="border-t border-slate-200/60 pt-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                          Direct Links to Alternatives
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.alternativesLinks.map((link, idx) => (
                            <Link
                              key={idx}
                              to={`/product/${link.toSlug}`}
                              className="bg-white border border-mirai-primary/20 text-mirai-primary hover:bg-mirai-primary/5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all font-mono flex items-center gap-1"
                            >
                              {link.anchorText}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* ── Why Choose Mirai Section (E-E-A-T) ────────────────────── */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 mt-6">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-mirai-primary" />
                    Why Buy from Mirai Technologies?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">Authorized Distributor Since 1999</span>
                        <span className="text-[10px] text-slate-500 block">Over 25 years of trusted semiconductor sourcing experience.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">100% Genuine Components</span>
                        <span className="text-[10px] text-slate-500 block">Directly sourced parts with full traceability and zero counterfeits.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">Same-Day Dispatch</span>
                        <span className="text-[10px] text-slate-500 block">Fast order processing with dispatch before 3 PM for all in-stock parts.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">Pan-India Express Delivery</span>
                        <span className="text-[10px] text-slate-500 block">Safe shipment to all states with reliable express courier partners.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">GST Compliant Invoicing</span>
                        <span className="text-[10px] text-slate-500 block">GSTIN: 27DEHPB4168C1ZR. Claim your input tax credit seamlessly.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-mirai-primary font-bold">✓</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">Export Capabilities & Support</span>
                        <span className="text-[10px] text-slate-500 block">Regularly exporting to Nepal, Bangladesh, Russia, Saudi Arabia, and UAE.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {product.relatedLinks?.length > 0 && (
                  <div className="bg-white border border-slate-200/60 rounded-xl p-4 mt-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      See Also & Technical Reference
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {product.relatedLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          to={`/product/${link.toSlug}`}
                          className="text-xs font-bold text-slate-600 hover:text-mirai-primary hover:underline flex items-center gap-1.5 font-sans"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          {link.anchorText}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-slate-500 leading-relaxed font-sans mt-6">
                  Mirai Technologies operates in close partnership with international semiconductor vendors to secure genuine materials.
                  Our inventory is preserved in climate-controlled storage to maintain maximum contact integrity. Same-day dispatch on in-stock orders.
                </p>
              </div>
            )}

            {/* Technical Specifications */}
            {activeTab === 'technical' && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-black text-slate-800 mb-4">Technical Specifications</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/2">Parameter</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Value / Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Part Number</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 font-mono">{product.partNumber}</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Manufacturer / Brand</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">{product.brand}</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Package</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">{product.package}</td>
                    </tr>
                    {product.pins && (
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Pin Count</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{product.pins}</td>
                      </tr>
                    )}
                    {product.supplyVoltage && product.supplyVoltage !== '—' && (
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Supply Voltage</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{product.supplyVoltage}</td>
                      </tr>
                    )}
                    {product.currentOutput && product.currentOutput !== '—' && (
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Current / Output</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{product.currentOutput}</td>
                      </tr>
                    )}
                    {Object.entries(product.specs || {}).map(([key, val]) => (
                      <tr key={key} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-2.5 text-xs font-bold text-slate-700">{key}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Applications */}
            {activeTab === 'applications' && (
              <div>
                <h3 className="text-lg font-black text-slate-800 mb-4">Typical Applications</h3>
                {product.applications ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.applications.split(',').map(app => (
                      <div key={app.trim()} className="flex items-start gap-2 text-sm text-slate-600">
                        <ChevronRight className="w-5 h-5 text-mirai-primary mt-0.5 shrink-0" strokeWidth={3} />
                        <span>{app.trim()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Application data not available.</p>
                )}

                {/* Pinout / App circuit image placeholders */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {product.pinoutImage?.filename && (
                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-slate-500 mb-3">Pinout Diagram</span>
                      <div className="w-full aspect-[4/3] bg-white border border-slate-200/80 rounded-xl flex items-center justify-center p-2 relative overflow-hidden group shadow-sm mb-3">
                        <img
                          src={`/${product.pinoutImage.filename}`}
                          alt={product.pinoutImage.filename}
                          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fallback-icon');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon hidden flex-col items-center justify-center text-slate-300">
                          <Layers className="w-12 h-12 mb-2" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Image Not Available</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{product.pinoutImage.filename}</span>
                    </div>
                  )}
                  {product.appCircuitImage?.filename && (
                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-slate-500 mb-3">Application Circuit</span>
                      <div className="w-full aspect-[4/3] bg-white border border-slate-200/80 rounded-xl flex items-center justify-center p-2 relative overflow-hidden group shadow-sm mb-3">
                        <img
                          src={`/${product.appCircuitImage.filename}`}
                          alt={product.appCircuitImage.filename}
                          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fallback-icon');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon hidden flex-col items-center justify-center text-slate-300">
                          <Activity className="w-12 h-12 mb-2" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Image Not Available</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{product.appCircuitImage.filename}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <div>
                <h3 className="text-lg font-black text-slate-800 mb-4">
                  Frequently Asked Questions – {product.partNumber}
                </h3>
                {product.faqs?.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {product.faqs.map((faq, idx) => (
                      <FaqItem key={idx} q={faq.q} a={faq.a} idx={idx} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No FAQ data available.</p>
                )}
              </div>
            )}

            {/* Downloads */}
            {activeTab === 'downloads' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 mb-2">Documentation & Datasheets</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Download technical datasheets and application notes for {product.partNumber}.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {product.datasheetUrl ? (
                    <a
                      href={product.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl hover:border-mirai-primary/30 hover:bg-slate-50 transition-all group w-full sm:w-80"
                    >
                      <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-100/50 transition-all">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-slate-700 block">Official Datasheet</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{product.brand} – PDF</span>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-mirai-primary transition-all" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50 w-full sm:w-80">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-300" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block">Datasheet not linked yet</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Contact us for the PDF</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ───────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-center font-heading font-extrabold text-2xl text-slate-900 tracking-tight uppercase mb-8">
              Related {categoryData?.name || 'Components'}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map(rp => (
                <div
                  key={rp.id}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-mirai-primary/20 transition-all duration-300"
                >
                  <Link to={`/product/${rp.fullSlug}`} className="block">
                    <div className="aspect-[4/3] bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-slate-100/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-mirai-primary/5 to-mirai-accent/5 opacity-40" />
                      {rp.heroImage?.filename ? (
                        <img
                          src={`/${rp.heroImage.filename}`}
                          alt={rp.heroImage.filename}
                          title={rp.heroImage.title || rp.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105 relative z-10"
                        />
                      ) : (
                        <Cpu className="w-8 h-8 text-slate-300 group-hover:text-mirai-primary/40 transition-all duration-300" />
                      )}

                      {/* Package badge — bottom left */}
                      {rp.package && (
                        <span className="absolute bottom-2 left-2 bg-slate-900/75 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono z-20">
                          {rp.package}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      {rp.brand?.split('/')[0]?.trim()}
                    </span>
                    <Link
                      to={`/product/${rp.fullSlug}`}
                      className="text-slate-800 font-heading font-extrabold text-sm hover:text-mirai-primary transition-colors leading-snug line-clamp-2 mb-3"
                    >
                      {rp.name}
                    </Link>
                    <div className="text-mirai-primary font-heading font-black text-base mb-3 mt-auto">
                      {rp.priceDisplay || 'POA'}
                    </div>
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: rp.name } }))}
                      className="w-full bg-white hover:bg-slate-900 border border-slate-800 text-slate-800 hover:text-white text-[10px] font-bold py-2 rounded-xl transition-all tracking-wider uppercase mt-auto"
                    >
                      Request a Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetailPage;
