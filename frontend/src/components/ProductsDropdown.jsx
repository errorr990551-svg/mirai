import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Layers, Activity, Thermometer, ArrowRight, Settings, MessageSquare, Box, SlidersHorizontal, Disc } from 'lucide-react';
import { categories, products, getProductsByCategory } from '../data/products';

const categoryIcons = {
  'integrated-circuit':    Cpu,
  'mosfet-transistor':     Zap,
  'transistor':            Radio,
  'microcontroller':       Activity,
  'ic-chip':               Layers,
  'electronic-components': Settings,
  'voltage-regulator':     Thermometer,
  'smd-ceramic-capacitor': Box,
  'through-hole-resistor': SlidersHorizontal,
  'smd-resistor':          Settings,
  'resistor':              Settings,
  'capacitor':             Box,
  'passive-components':    Layers,
  'smd-power-inductor':    Disc,
  'inductor':              Disc,
  'electrolytic-capacitor':Box,
  'tantalum-capacitor':    Box,
  'zener-diode':           Zap,
  'rectifier-schottky-diode': Zap,
  'tvs-diode':             Zap,
  'diode':                 Zap,
  'led':                   Activity,
  'crystal-oscillator':    Radio,
};

const ProductsDropdown = ({ closeMenu }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];
  const Icon = categoryIcons[activeCat?.id] || Cpu;
  const count = getProductsByCategory(activeCat?.id).length;

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
      className="absolute left-1/2 top-full mt-3 w-[760px] h-[480px] max-h-[80vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 flex"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-mirai-primary to-mirai-accent z-10" />

      {/* LEFT: Category list */}
      <div className="w-[260px] shrink-0 bg-slate-50 border-r border-slate-100 p-3 flex flex-col h-full overflow-hidden">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 pt-2 pb-2 shrink-0">
          Categories
        </p>

        {/* Scrollable list of categories */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {categories.map(cat => {
            const CatIcon = categoryIcons[cat.id] || Cpu;
            const isActive = cat.id === activeCategory;
            const catCount = getProductsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/products/${cat.slug}`}
                onClick={closeMenu}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'bg-mirai-primary text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CatIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-[12px] leading-tight truncate">{cat.name}</span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {catCount}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 shrink-0 mt-1">
          <Link
            to="/products"
            onClick={closeMenu}
            className="flex items-center justify-between text-xs font-bold text-slate-600 hover:text-mirai-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* RIGHT: Category details */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-white h-full overflow-y-auto">
        {/* Header */}
        <div>
          <Link
            to={`/products/${activeCat?.slug}`}
            onClick={closeMenu}
            className="flex items-center gap-2 mb-2 group/header cursor-pointer text-slate-800 hover:text-mirai-primary transition-colors"
          >
            <div className="w-8 h-8 bg-mirai-primary/10 rounded-lg flex items-center justify-center group-hover/header:bg-mirai-primary/25 transition-colors">
              <Icon className="w-4 h-4 text-mirai-primary" />
            </div>
            <h4 className="text-base font-bold">{activeCat?.name}</h4>
            <span className="ml-1 text-xs text-slate-400 font-medium">{count} parts</span>
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed pl-10">
            {activeCat?.description?.slice(0, 140)}…{' '}
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
          <div className="my-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Featured Parts
            </p>
            <div className="flex flex-col gap-1.5">
              {activeCat.featuredProducts.slice(0, 4).map(part => (
                <Link
                  key={part}
                  to={getPartLink(part)}
                  onClick={closeMenu}
                  className="bg-slate-50 hover:bg-mirai-primary text-slate-700 hover:text-white text-[12px] font-bold px-3 py-2 rounded-xl font-mono transition-all cursor-pointer flex items-center justify-between group border border-slate-100/80 hover:border-mirai-primary shadow-sm hover:shadow-md"
                >
                  <span>{part}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-150" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-auto">
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
