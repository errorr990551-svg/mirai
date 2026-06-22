import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 md:p-16 text-center border border-slate-200 border-t-4 border-t-mirai-primary shadow-xl relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-mirai-primary/10 rounded-full blur-[80px] -z-10" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Ready to Source Your Components?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Send your BOM or part number and receive a competitive quote within 24 hours &mdash; with full traceability and COC.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
              className="bg-mirai-primary text-white font-bold px-8 py-4 rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              Request a Quote
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-products-dropdown'));
              }}
              className="bg-transparent border border-slate-300 text-slate-900 font-semibold px-8 py-4 rounded-lg hover:bg-slate-50 transition-all hover:border-slate-400"
            >
              Browse Products
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
