import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import cityPages from '../data/cityPages.json';
import { updatePageSEO } from '../utils/seo';

const MarketArea = () => {
  useEffect(() => {
    updatePageSEO(
      'Market Area | India Cities We Serve | Mirai Technologies',
      'Mirai Technologies authorized semiconductor distributor serves clients across all states and major cities in India. View our cities directory for genuine electronic components delivery.',
      'https://miraitechnologies.net/market-area',
      'index, follow',
      'Market Area | India Cities We Serve | Mirai Technologies',
      'Mirai Technologies authorized semiconductor distributor serves clients across all states and major cities in India.'
    );
  }, []);

  // Group cities by State
  const citiesByState = {};
  cityPages.forEach(page => {
    const state = page.state || 'Other';
    if (!citiesByState[state]) {
      citiesByState[state] = [];
    }
    citiesByState[state].push(page);
  });

  // Sort states alphabetically
  const sortedStates = Object.keys(citiesByState).sort();

  // Sort cities in each state alphabetically
  sortedStates.forEach(state => {
    citiesByState[state].sort((a, b) => a.city.localeCompare(b.city));
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-xs font-semibold tracking-wider text-slate-500 uppercase">
          <Link to="/" className="hover:text-mirai-primary transition-colors">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700">Market Area</span>
        </nav>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            India Cities : We Serve
          </h1>
          <div className="w-24 h-1.5 bg-mirai-primary mt-3 rounded-full" />
        </div>

        {/* States & Cities Listing */}
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedStates.map(state => (
            <motion.div 
              key={state} 
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm"
              variants={itemVariants}
            >
              {/* State Header */}
              <div className="border-b border-slate-100 pb-3 mb-6 flex items-center gap-3">
                <div className="p-1.5 bg-mirai-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-mirai-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-800 tracking-wider uppercase">
                  {state}
                </h2>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {citiesByState[state].map(page => (
                  <Link 
                    key={page.slug} 
                    to={page.slug}
                    className="group flex items-center justify-between bg-slate-50/50 hover:bg-white p-4 rounded-xl border border-slate-100 hover:border-mirai-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-mirai-primary transition-colors">
                      {page.city}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-mirai-primary group-hover:translate-x-0.5 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default MarketArea;
