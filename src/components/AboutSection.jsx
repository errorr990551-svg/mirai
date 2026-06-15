import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Side: Image with overlapping badge */}
          <div className="lg:col-span-6 mb-12 lg:mb-0 relative pr-4 lg:pr-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
            >
              <img 
                src="/about.webp" 
                alt="Mirai Sourcing Facility" 
                className="w-full h-[450px] object-cover object-[12%_center] hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            
            {/* Overlapping Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-2 bg-mirai-primary text-white p-6 rounded-2xl shadow-xl max-w-[200px] border border-white/20"
            >
              <div className="text-4xl font-extrabold mb-1">25+</div>
              <div className="text-sm font-semibold opacity-90 leading-snug">Years of Sourcing Excellence</div>
            </motion.div>
          </div>
          
          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <p className="text-mirai-primary font-bold text-sm tracking-widest uppercase mb-4">
              WHY MIRAI TECH LEADS
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight font-heading">
              Empowering the Indian Electronics Industry
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              While many are simple traders, Mirai Technologies operates as a tech-driven supply partner. We combine deep global sourcing expertise with strict quality assurance to deliver authentic components that power advanced automotive, defense, and industrial electronics.
            </p>
            
            {/* Value Points */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-mirai-primary/10 border border-mirai-primary/20 flex items-center justify-center text-mirai-primary flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Complete Component Traceability</h4>
                  <p className="text-slate-500 text-sm">Every shipment is delivered with original Manufacturer COCs, lab test reports, and full batch traceability.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-mirai-primary/10 border border-mirai-primary/20 flex items-center justify-center text-mirai-primary flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Broad Semiconductor Access</h4>
                  <p className="text-slate-500 text-sm">Specialized sourcing for ICs, MOSFETs, IGBTs, MCUs, and passives from 40+ premier global manufacturers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-mirai-primary/10 border border-mirai-primary/20 flex items-center justify-center text-mirai-primary flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Precision Supply Chain</h4>
                  <p className="text-slate-500 text-sm">Flexible logistics, buffer stocking, and rapid quoting to support high-mix, low-volume EMS and OEM production.</p>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 bg-mirai-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all hover:shadow-lg hover:-translate-y-0.5 group shadow-md shadow-blue-500/20"
            >
              About Company <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
