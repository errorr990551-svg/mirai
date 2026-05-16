import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { number: "25+", label: "Years in Business" },
    { number: "40+", label: "Authorized Brand Partners" },
    { number: "900+", label: "Valued Customers" },
    { number: "18+", label: "Expert Team Members" }
  ];

  return (
    <section className="py-24 bg-mirai-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-cyan font-semibold text-sm tracking-widest uppercase mb-4">By the Numbers</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Why Clients <span className="text-mirai-cyan">Trust Mirai</span> <br />
            Technologies
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-mirai-card/80 border border-white/5 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[200px] shadow-lg shadow-black/20 hover:border-mirai-cyan/30 hover:bg-white/5 transition-all group"
            >
              <h3 className="text-5xl font-black text-mirai-cyan mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
