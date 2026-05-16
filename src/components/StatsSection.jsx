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
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-primary font-semibold text-sm tracking-widest uppercase mb-4">By the Numbers</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Why Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Trust Mirai</span> <br />
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
                className="bg-white border border-slate-100 border-t-4 border-t-mirai-primary rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[200px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden"
              >
                {/* Huge background number for depth */}
                <div className="absolute -bottom-4 -right-2 font-black text-8xl text-slate-50 select-none pointer-events-none group-hover:text-indigo-50/50 group-hover:scale-110 transition-all duration-500">
                  {stat.number.replace('+', '')}
                </div>

                <motion.div
                  animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                  transition={{ 
                    duration: 4 + idx, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                  className="flex flex-col items-center justify-center relative z-10"
                >
                  <h3 className="text-5xl font-black mb-4 group-hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">
                    {stat.number}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide group-hover:text-slate-900 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
