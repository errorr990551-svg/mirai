import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Shield, FileCheck } from 'lucide-react';

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

  const badges = [
    {
      icon: <Award className="w-6 h-6 text-orange-400" />,
      title: "ISO 9001:2015 Certified",
      desc: "International Quality Management Standard"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "IndiaMart Trust Seal Verified",
      desc: "India's largest B2B platform — verified seller"
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: "Automotive & Defence Approved",
      desc: "Approved supplier to automotive OEMs & defence"
    },
    {
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      title: "DUNS Registered",
      desc: "Verified by Dun & Bradstreet globally"
    }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-mirai-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlPSIwLjA1Ii8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left mb-16 lg:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 border border-mirai-cyan/40 rounded-full px-5 py-2 mb-8 text-xs sm:text-sm font-semibold text-mirai-cyan tracking-widest bg-mirai-cyan/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-mirai-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]"></div>
              ISO 9001:2015 CERTIFIED &middot; EST. 1999
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05]"
            >
              <span className="block text-white">India's</span>
              <span className="block text-white">Trusted</span>
              <span className="block text-mirai-cyan">Electronic</span>
              <span className="block text-mirai-cyan">Components</span>
              <span className="block text-[#facc15] mt-3">Distributor</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Mirai Technologies supplies ICs, MOSFETs, IGBTs, Transistors, MCUs, Capacitors & 2000+ component types from 40+ global brands. Mumbai-based. Serving OEMs, EMS & industries worldwide since 1999.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-mirai-cyan text-mirai-darker font-bold px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all hover:-translate-y-1">
                Submit RFQ &mdash; 24hr Quote
              </button>
              <button className="bg-transparent border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/5 transition-all hover:border-white/40 group">
                View Products <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Badges */}
          <motion.div 
            className="lg:col-span-5 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {badges.map((badge, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-mirai-card/80 backdrop-blur-sm border border-white/5 p-5 rounded-xl flex items-center gap-5 hover:border-white/10 transition-colors"
              >
                <div className="bg-white/5 p-3 rounded-lg flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{badge.title}</h3>
                  <p className="text-gray-400 text-sm leading-snug">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
