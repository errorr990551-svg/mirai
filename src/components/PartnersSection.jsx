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
    <section className="py-24 bg-mirai-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-cyan font-semibold text-sm tracking-widest uppercase mb-4">Our Brand Partners</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            40+ Authorized Global <br />
            <span className="text-mirai-cyan">Manufacturers</span>
          </h2>
        </div>

        {/* Brand Cloud */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {brands.map((brand, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.02 }}
              className="bg-mirai-card/60 backdrop-blur-sm border border-white/5 hover:border-mirai-cyan/40 hover:bg-white/5 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
