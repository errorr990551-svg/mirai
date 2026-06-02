import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu } from 'lucide-react';
import { products, categories } from '../data/products';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const activeSubcategory = searchParams.get('subcategory') || '';

  // Filter products based on active category and subcategory from url
  const filteredProducts = products.filter(product => {
    if (activeCategory && product.category !== activeCategory) {
      return false;
    }
    if (activeSubcategory && product.subcategory !== activeSubcategory) {
      return false;
    }
    return true;
  });

  const activeCategoryObj = categories.find(c => c.id === activeCategory);
  const activeSubcategoryObj = activeCategoryObj?.subcategories.find(s => s.id === activeSubcategory);
  const headingText = activeSubcategoryObj 
    ? activeSubcategoryObj.name 
    : activeCategoryObj 
      ? activeCategoryObj.name 
      : 'Electronic Components Catalog';

  const triggerRFQ = (productName) => {
    console.log("Triggering RFQ for:", productName);
    window.dispatchEvent(new CustomEvent('open-rfq', { detail: { product: productName } }));
  };

  // Auto-scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory, activeSubcategory]);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Selection Heading */}
        <div className="mb-8 border-b border-slate-200/60 pb-4">
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 uppercase">
            {headingText}
            <span className="text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200/40 px-2.5 py-1 rounded-lg normal-case font-sans">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
        </div>

        {/* Products Grid - Full Width, 4 columns on large screens */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-1">No products found</h3>
            <p className="text-sm text-slate-500 mb-6">There are no products matching this category.</p>
            <Link 
              to="/products"
              className="inline-block bg-mirai-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-mirai-accent transition-all"
            >
              Show All Catalog
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-lg hover:border-mirai-primary/20 transition-all duration-300"
              >
                {/* Empty product image placeholder */}
                <Link to={`/product/${product.id}`} className="block relative">
                  <div className="aspect-[4/3] bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-slate-100/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-mirai-primary/5 to-mirai-accent/5 opacity-40" />
                    <Cpu className="w-9 h-9 text-slate-300 group-hover:text-mirai-primary/40 group-hover:scale-110 transition-all duration-300" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mt-2.5">
                      Product Image
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center mb-2.5">
                    {/* Category tag pill */}
                    <span className="bg-slate-800 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded uppercase mr-2">
                      {product.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      {product.brand}
                    </span>
                  </div>

                  {/* Title */}
                  <Link 
                    to={`/product/${product.id}`}
                    className="text-slate-800 font-heading font-extrabold text-base hover:text-mirai-primary transition-colors leading-snug line-clamp-2 mb-3"
                  >
                    {product.name}
                  </Link>

                  {/* Price */}
                  <div className="text-mirai-primary font-heading font-black text-lg mb-5 mt-auto">
                    INR {product.price}
                  </div>

                  {/* Button */}
                  <div className="space-y-2 mt-auto">
                    <button
                      onClick={() => triggerRFQ(product.name)}
                      className="w-full bg-white hover:bg-slate-900 border border-slate-800 text-slate-800 hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all tracking-wider uppercase"
                    >
                      Get RFQ
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
