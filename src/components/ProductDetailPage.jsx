import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Cpu, Zap, BadgeCheck, FileText, 
  Download, ArrowLeft, ArrowRight, ShieldCheck, Award, HeartHandshake
} from 'lucide-react';
import { getProductById, products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  
  const product = getProductById(id);

  // Auto-scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Component Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-xs">The electronic component with ID "{id}" could not be found in our catalog.</p>
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

  // Get 4 related products in the same category, excluding active product
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If we don't have enough, fill with other products
  if (relatedProducts.length < 4) {
    const others = products.filter(p => p.id !== product.id && !relatedProducts.some(rp => rp.id === p.id));
    relatedProducts.push(...others.slice(0, 4 - relatedProducts.length));
  }

  const triggerRFQ = () => {
    console.log("Triggering RFQ for:", product.name);
    window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: product.name } }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-mirai-primary mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Catalog
        </button>

        {/* MAIN PRODUCT DETAIL CARD */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm mb-10">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Empty Images & Thumbnails as requested */}
            <div className="md:col-span-5 space-y-4">
              
              {/* Main empty/placeholder image card */}
              <div className="aspect-square bg-slate-50 border border-dashed border-slate-200/80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-mirai-primary/5 to-mirai-accent/5 opacity-40" />
                <Cpu className="w-16 h-16 text-slate-300 group-hover:scale-105 transition-transform duration-300" />
                <span className="text-xs uppercase tracking-widest text-slate-400 font-black mt-3">
                  Product Image Placeholder
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Image Not Available</span>
              </div>

            </div>

            {/* RIGHT COLUMN: Info panel */}
            <div className="md:col-span-7 flex flex-col">
              
              {/* Category */}
              <div className="mb-2">
                <span className="bg-slate-800 text-white text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded uppercase mr-2.5">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {product.brand} • Package: {product.package}
                </span>
              </div>

              {/* Product title */}
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Checkmarks / Feature pointers (matching IOTAFLOW style yellow pointers) */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2 text-slate-600">
                  <ChevronRight className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" strokeWidth={3} />
                  <p className="text-sm font-medium">
                    Genuine semiconductor part sourced directly from authorized franchise distributors.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <ChevronRight className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" strokeWidth={3} />
                  <p className="text-sm font-medium font-sans">
                    Package type: <strong className="text-slate-800">{product.package}</strong>. Optimized for high temperature and industrial operations.
                  </p>
                </div>
              </div>

              {/* Certificate badge icons (RoHS, ISO9001, etc.) */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  RoHS Compliant
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  CE Certified
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold">
                  <HeartHandshake className="w-3.5 h-3.5 text-indigo-600" />
                  100% Traceable
                </div>
              </div>

              {/* Price & RFQ Action */}
              <div className="mt-auto pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/50">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reference Price</span>
                  <span className="text-2xl font-heading font-black text-mirai-primary block mt-0.5">INR {product.price}</span>
                </div>

                <button
                  onClick={triggerRFQ}
                  className="bg-gradient-to-r from-mirai-primary to-mirai-accent text-white text-sm font-bold tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all uppercase flex items-center justify-center gap-2"
                >
                  Get RFQ
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* TABS SECTION: Description, Features, Technical data, Downloads */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm mb-12 overflow-hidden">
          
          {/* Tab headers */}
          <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/50 px-4 pt-2">
            {[
              { id: 'description', label: 'Description' },
              { id: 'features', label: 'Features' },
              { id: 'technical', label: 'Technical Data' },
              { id: 'downloads', label: 'Downloads' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider transition-all relative border-b-2 ${
                    isActive
                      ? 'border-mirai-primary text-mirai-primary font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="p-6 sm:p-8 min-h-[220px]">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 mb-2">Product Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {product.description}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  Mirai Technologies operates in close partnership with international semiconductor vendors to secure genuine materials, providing full product change notifications (PCN) and long-term production availability guarantees. Our inventory is preserved in climate-controlled storage to maintain maximum contact integrity.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-black text-slate-800 mb-4">Key Characteristics</h3>
                <ul className="grid sm:grid-cols-2 gap-3 list-none">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <BadgeCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-black text-slate-800 mb-4">Technical Specifications</h3>
                <table className="w-full text-left border-collapse border border-slate-100 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Parameter</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Value / Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Manufacturer</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">{product.brand}</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-700">Package Outline</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">{product.package}</td>
                    </tr>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-2.5 text-xs font-bold text-slate-700">{key}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 mb-2">Documentation & Datasheets</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Download technical sheets, application notes, and CAD files for this part.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="#download"
                    onClick={(e) => { e.preventDefault(); alert("Mock Download: Technical datasheet file requested."); }}
                    className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl hover:border-mirai-primary/30 hover:bg-slate-50 transition-all group w-full sm:w-72"
                  >
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-100/50 transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-700 block">Technical Datasheet</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">PDF • 1.24 MB</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-mirai-primary transition-all" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RELATED PRODUCTS GRID */}
        <div>
          <h2 className="text-center font-heading font-extrabold text-2xl text-slate-900 tracking-tight uppercase mb-8">
            You May Also Be Interested In
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <div 
                key={rp.id}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-mirai-primary/20 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <Link to={`/product/${rp.id}`} className="block relative">
                  <div className="aspect-[4/3] bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-slate-100/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-mirai-primary/5 to-mirai-accent/5 opacity-40" />
                    <Cpu className="w-8 h-8 text-slate-300 group-hover:text-mirai-primary/40 transition-all duration-300" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mt-2">
                      Product Image
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="bg-slate-800 text-white text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded uppercase mr-2">
                      {rp.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      {rp.brand}
                    </span>
                  </div>

                  <Link 
                    to={`/product/${rp.id}`}
                    className="text-slate-800 font-heading font-extrabold text-sm hover:text-mirai-primary transition-colors leading-snug line-clamp-2 mb-3"
                  >
                    {rp.name}
                  </Link>

                  <div className="text-mirai-primary font-heading font-black text-base mb-4 mt-auto">
                    INR {rp.price}
                  </div>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: rp.name } }))}
                    className="w-full bg-white hover:bg-slate-900 border border-slate-800 text-slate-800 hover:text-white text-[10px] font-bold py-2 rounded-xl transition-all tracking-wider uppercase mt-auto"
                  >
                    Get RFQ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
