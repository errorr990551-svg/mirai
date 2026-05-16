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
      icon: <Wrench className="w-8 h-8 text-gray-400" />,
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
    <section className="py-24 bg-mirai-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-mirai-cyan font-semibold text-sm tracking-widest uppercase mb-4">Why Mirai Technologies</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Your Single-Source Partner <br />
            for <span className="text-mirai-cyan">Any Electronic Component</span>
          </h2>
          <p className="text-gray-400 text-lg">
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
              className="bg-mirai-card rounded-2xl p-8 border border-white/5 card-hover relative overflow-hidden group"
            >
              {/* Highlight bar on top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mirai-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
