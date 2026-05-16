import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-24 bg-mirai-dark relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-mirai-card rounded-3xl p-12 md:p-16 text-center border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-mirai-cyan/10 rounded-full blur-[80px] -z-10" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Source Your Components?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Send your BOM or part number and receive a competitive quote within 24 hours &mdash; with full traceability and COC.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-mirai-cyan text-mirai-darker font-bold px-8 py-4 rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all hover:-translate-y-1">
              Submit RFQ Now
            </button>
            <button className="bg-transparent border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/5 transition-all hover:border-white/40">
              Browse Products
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
