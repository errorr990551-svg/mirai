import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Layers, Activity, Settings, ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

const categoryIcons = {
  mosfet: Zap,
  'integrated-circuits': Cpu,
  transistors: Radio,
  diodes: Layers,
};

const ProductsDropdown = ({ closeMenu }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory) || categories[0];
  const IconComponent = categoryIcons[activeCategory] || Cpu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
      exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute left-1/2 top-full mt-2 w-[760px] bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden z-50 origin-top flex"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-mirai-primary to-mirai-accent" />

      {/* Left Column: Categories */}
      <div className="w-[260px] bg-slate-50/80 border-r border-slate-100 p-3 flex flex-col gap-1 pt-5">
        <span className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Product Categories
        </span>
        {categories.map((cat) => {
          const CatIcon = categoryIcons[cat.id] || Cpu;
          const isActive = cat.id === activeCategory;
          return (
            <div
              key={cat.id}
              onMouseEnter={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-3 py-3.5 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                isActive
                  ? 'bg-white text-mirai-primary shadow-sm font-semibold border-l-4 border-mirai-primary'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <CatIcon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-mirai-primary' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              <span className="text-sm tracking-wide">{cat.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute right-3 text-mirai-primary"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </div>
          );
        })}
        
        <div className="mt-auto p-2 pt-4 border-t border-slate-200/60">
          <Link
            to="/products"
            onClick={closeMenu}
            className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-mirai-primary transition-colors p-2 rounded-lg hover:bg-slate-100"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right Column: Subproducts/Subcategories */}
      <div className="flex-1 p-6 pt-5 bg-white min-h-[380px] flex flex-col">
        {/* Active Category Header */}
        <div className="mb-4">
          <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <IconComponent className="w-5 h-5 text-mirai-primary" />
            {activeCategoryData.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {activeCategoryData.description}
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {activeCategoryData.subcategories.map((sub) => (
            <Link
              key={sub.id}
              to={`/products?category=${activeCategoryData.id}&subcategory=${sub.id}`}
              onClick={closeMenu}
              className="flex items-center gap-3 p-3 border border-slate-100 hover:border-mirai-primary/20 hover:bg-mirai-primary/5 rounded-xl transition-all duration-200 group"
            >
              {/* Premium Icon Container */}
              <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-white border border-slate-100 group-hover:border-mirai-primary/10 flex items-center justify-center shrink-0 transition-colors">
                <Settings className="w-4 h-4 text-slate-400 group-hover:text-mirai-primary transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-700 group-hover:text-mirai-primary block transition-colors leading-tight">
                  {sub.name}
                </span>
                <span className="text-[10px] text-slate-400 block leading-none mt-0.5">
                  Explore Components
                </span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

        {/* Featured / Bottom Info */}
        <div className="mt-auto p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-mirai-primary uppercase tracking-wider block">
              Direct Sourcing
            </span>
            <span className="text-xs text-slate-600 block mt-0.5">
              Need bulk quotes or hard-to-find components?
            </span>
          </div>
          <button
            onClick={() => {
              closeMenu();
              window.dispatchEvent(new CustomEvent('open-rfq'));
            }}
            className="bg-white hover:bg-mirai-primary hover:text-white border border-slate-200 text-xs font-bold text-mirai-primary px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
          >
            Get RFQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsDropdown;
