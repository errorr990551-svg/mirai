import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, Cpu, Clock } from 'lucide-react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const boxes = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Zero-Defect Framework",
      desc: "Strict internal quality controls coupled with full lot traceability, ensuring every shipment aligns flawlessly with global industry benchmarks."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Rapid Global Logistics",
      desc: "Strategically headquartered in Mumbai's commercial hub to ensure seamless supply chain management and swift shipping to international markets."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Tailored Value Engineering",
      desc: "We go beyond supply—assisting your team with cross-referencing, functional alternates, and strategic component substitution to optimize your bill of materials (BOM)."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Dedicated Account Desk",
      desc: "Enjoy personalized, round-the-clock technical and commercial support from engineering experts who understand the nuances of mission-critical electronics."
    }
  ];

  return (
    <section 
      className="relative pt-24 pb-0 lg:pt-28 lg:pb-0 bg-cover bg-[position:10%_center] bg-no-repeat"
      style={{ backgroundImage: "url('/banner.jpeg')" }}
    >
      {/* Dark background overlays */}
      <div className="absolute inset-0 bg-slate-950/45 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-8 text-left mb-8 lg:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 border border-blue-400/30 rounded-full px-5 py-2 mb-4 lg:mb-6 text-xs sm:text-sm font-semibold text-blue-400 tracking-widest bg-blue-400/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-md shadow-blue-400/30"></div>
              ISO 9001:2015 CERTIFIED &middot; EST. 1999
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight mb-4 lg:mb-6 leading-[1.15] text-white"
            >
              <span className="block">India's Trusted</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Electronic Components</span>
              <span className="block mt-2">Distributor</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 mb-6 lg:mb-8 max-w-lg leading-relaxed font-light"
            >
              Mirai Technologies supplies ICs, MOSFETs, IGBTs, Transistors, MCUs, Capacitors & 2000+ component types from 40+ global brands. Mumbai-based. Serving OEMs, EMS & industries worldwide since 1999.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
                className="bg-mirai-primary text-white font-bold px-8 py-3.5 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:bg-opacity-95 transition-all hover:-translate-y-1 animate-pulse"
              >
                Request a Quote
              </button>
              <Link 
                to="/products"
                className="bg-transparent border border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all group flex items-center justify-center"
              >
                View Products <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">&rarr;</span>
              </Link>
            </motion.div>
          </motion.div>
          
        </div>

        {/* 4 Overlapping Info Boxes */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-30 -mb-28 lg:-mb-36">
          {boxes.map((box, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="bg-white border border-slate-100 shadow-lg rounded-2xl p-6 relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Highlight bar on top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mirai-primary to-mirai-accent" />
              
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full border-2 border-mirai-primary/20 flex items-center justify-center text-mirai-primary mb-6 group-hover:scale-110 transition-transform duration-300 bg-mirai-primary/5">
                {box.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-mirai-primary transition-colors duration-300">
                {box.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {box.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
