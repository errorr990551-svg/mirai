import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Globe, ShieldCheck, Zap, Wrench, Briefcase } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Microscope className="w-8 h-8 text-pink-400" />,
      title: "25+ Years Industry Expertise",
      desc: "Established in 1999, Mirai Technologies brings unmatched depth in semiconductor trading, EMS solutions, and supply chain management for Indian and global markets."
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      title: "40+ Authorized Global Partners",
      desc: "Direct access to Infineon, Texas Instruments, Microchip, Toshiba, onsemi, STMicroelectronics, Analog Devices, Renesas, TDK, Rohm and 30+ more brands."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "100% Authentic Components",
      desc: "Strict supplier vetting, visual inspection, and anti-counterfeit testing on every order. COC, test reports, and full lot traceability included at no extra cost."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "24-Hour RFQ Turnaround",
      desc: "Send your BOM or part list and receive a competitive quote with full pricing, availability, and lead time within 24 hours — guaranteed."
    },
    {
      icon: <Wrench className="w-8 h-8 text-slate-500" />,
      title: "Hard-to-Find & Obsolete Parts",
      desc: "Specialty sourcing for discontinued, end-of-life, and obsolete components that standard distributors cannot supply. We find what others can't."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
      title: "End-to-End BOM Support",
      desc: "We handle complete BOM fulfillment for EMS, OEM, and Turnkey manufacturers — with cross-referencing, alternates, and documentation included."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-mirai-primary font-semibold text-sm tracking-widest uppercase mb-4">Why Mirai Technologies</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Your Single-Source Partner <br />
            for <span className="text-mirai-primary">Any Electronic Component</span>
          </h2>
          <p className="text-slate-500 text-lg">
            From standard parts to hard-to-find and obsolete components &mdash; we source them all with full documentation, competitive pricing, and on-time delivery.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white shadow-sm rounded-2xl p-8 border border-slate-200 border-t-4 border-t-mirai-primary relative overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50"
            >
              <motion.div
                animate={{ y: [0, idx % 2 === 0 ? -5 : 5, 0] }}
                transition={{ 
                  duration: 5 + idx, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
                className="h-full relative z-10"
              >
                {/* Highlight bar on top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mirai-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-mirai-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
