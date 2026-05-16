import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection = () => {
  const brands = [
    "Infineon", "Texas Instruments", "STMicroelectronics", "Microchip", "Analog Devices", "onsemi", "Toshiba",
    "Nexperia", "Yageo", "Weidy", "Samsung", "Power Integrations", "LiteOn", "TDK", "XLSemi", "Renesas",
    "Rohm", "Silicon Labs", "Everlight", "Zoetic Power", "XLSmart", "HaloChip", "Silan", "Winsemi", "Vishay",
    "Walsin", "NXP", "OCX"
  ];

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-primary font-semibold text-sm tracking-widest uppercase mb-4">Our Brand Partners</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            40+ Authorized Global <br />
            <span className="text-mirai-primary">Manufacturers</span>
          </h2>
        </div>

        {/* Brand Marquee - New Way with Dual Rows */}
        <div className="relative overflow-hidden py-10 max-w-7xl mx-auto">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 blur-[100px] -z-10" />
          
          {/* Fade gradients at edges */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />
          
          {/* Row 1: Moving Left */}
          <motion.div 
            className="flex gap-4 w-max mb-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 40, 
              repeat: Infinity 
            }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div 
                key={idx}
                className="bg-white shadow-sm border border-slate-100 hover:border-mirai-primary hover:shadow-lg text-slate-600 hover:text-mirai-primary px-8 py-4 rounded-2xl font-medium text-sm transition-all cursor-pointer flex items-center justify-center min-w-[150px]"
              >
                {brand}
              </div>
            ))}
          </motion.div>

          {/* Row 2: Moving Right */}
          <motion.div 
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              ease: "linear", 
              duration: 35, 
              repeat: Infinity 
            }}
          >
            {[...brands, ...brands].reverse().map((brand, idx) => (
              <div 
                key={idx}
                className="bg-white shadow-sm border border-slate-100 hover:border-mirai-primary hover:shadow-lg text-slate-600 hover:text-mirai-primary px-8 py-4 rounded-2xl font-medium text-sm transition-all cursor-pointer flex items-center justify-center min-w-[150px]"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
