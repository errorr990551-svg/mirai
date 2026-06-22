import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Layers, Activity, Thermometer, ArrowRight, Settings, MessageSquare } from 'lucide-react';
import { categories, products } from '../data/products';

const categoryIcons = {
  'integrated-circuit':    Cpu,
  'mosfet-transistor':     Zap,
  'transistor':            Radio,
  'microcontroller':       Activity,
  'ic-chip':               Layers,
  'electronic-components': Settings,
  'voltage-regulator':     Thermometer,
};

const ProductsDropdown = ({ closeMenu }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];
  const Icon = categoryIcons[activeCat?.id] || Cpu;
  const count = products.filter(p => p.category === activeCat?.id).length;

  const getPartLink = (partName) => {
    const matched = products.find(p => 
      p.name.toLowerCase().includes(partName.toLowerCase()) || 
      p.partNumber.toLowerCase().includes(partName.toLowerCase())
    );
    if (matched) {
      return `/product/${matched.fullSlug}`;
    }
    return `/products?q=${encodeURIComponent(partName)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 8, x: '-50%' }}
      transition={{ duration: 0.15 }}
      className="absolute left-1/2 top-full mt-3 w-[740px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 flex"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-mirai-primary to-mirai-accent" />

      {/* LEFT: Category list */}
      <div className="w-[240px] shrink-0 bg-slate-50 border-r border-slate-100 py-5 px-3 flex flex-col">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">
          Categories
        </p>

        {categories.map(cat => {
          const CatIcon = categoryIcons[cat.id] || Cpu;
          const isActive = cat.id === activeCategory;
          const catCount = products.filter(p => p.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              to={`/products/${cat.slug}`}
              onClick={closeMenu}
              onMouseEnter={() => setActiveCategory(cat.id)}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                isActive
                  ? 'bg-mirai-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CatIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-[13px] font-semibold leading-tight">{cat.name}</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {catCount}
              </span>
            </Link>
          );
        })}

        <div className="mt-auto pt-4 border-t border-slate-200 px-1">
          <Link
            to="/products"
            onClick={closeMenu}
            className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-mirai-primary transition-colors px-2 py-2 rounded-lg hover:bg-slate-100"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* RIGHT: Category details */}
      <div className="flex-1 p-6 flex flex-col gap-5 bg-white">
        {/* Header */}
        <div>
          <Link
            to={`/products/${activeCat?.slug}`}
            onClick={closeMenu}
            className="flex items-center gap-2 mb-1 group/header cursor-pointer text-slate-800 hover:text-mirai-primary transition-colors"
          >
            <div className="w-8 h-8 bg-mirai-primary/10 rounded-lg flex items-center justify-center group-hover/header:bg-mirai-primary/25 transition-colors">
              <Icon className="w-4 h-4 text-mirai-primary" />
            </div>
            <h4 className="text-base font-bold">{activeCat?.name}</h4>
            <span className="ml-1 text-xs text-slate-400 font-medium">{count} parts</span>
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed pl-10">
            {activeCat?.description?.slice(0, 130)}…{' '}
            <Link
              to={`/products/${activeCat?.slug}`}
              onClick={closeMenu}
              className="text-mirai-primary hover:text-mirai-accent font-semibold inline-flex items-center gap-0.5 hover:underline"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>

        {/* Featured parts */}
        {activeCat?.featuredProducts?.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Featured Parts
            </p>
            <div className="flex flex-col gap-1.5 mt-1">
              {activeCat.featuredProducts.slice(0, 5).map(part => (
                <Link
                  key={part}
                  to={getPartLink(part)}
                  onClick={closeMenu}
                  className="bg-slate-50 hover:bg-mirai-primary text-slate-700 hover:text-white text-[13px] font-bold px-3.5 py-2.5 rounded-xl font-mono transition-all cursor-pointer flex items-center justify-between group border border-slate-100/80 hover:border-mirai-primary shadow-sm hover:shadow-md"
                >
                  <span>{part}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-150" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
          <Link
            to={`/products/${activeCat?.slug}`}
            onClick={closeMenu}
            className="flex items-center gap-2 bg-mirai-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-mirai-accent transition-all"
          >
            Browse All {activeCat?.name}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => {
              closeMenu();
              window.dispatchEvent(new CustomEvent('open-rfq'));
            }}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Get Bulk Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsDropdown;
