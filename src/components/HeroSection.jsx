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
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mirai-primary/20 to-mirai-accent/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-pink-500/10 to-mirai-primary/20 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHkiPSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
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
              className="inline-flex items-center gap-2 border border-mirai-primary/40 rounded-full px-5 py-2 mb-8 text-xs sm:text-sm font-semibold text-mirai-primary tracking-widest bg-mirai-primary/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-mirai-primary shadow-md shadow-blue-500/30"></div>
              ISO 9001:2015 CERTIFIED &middot; EST. 1999
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05]"
            >
              <span className="block text-slate-900">India's Trusted</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Electronic Components</span>
              <span className="block text-slate-900 mt-3">Distributor</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Mirai Technologies supplies ICs, MOSFETs, IGBTs, Transistors, MCUs, Capacitors & 2000+ component types from 40+ global brands. Mumbai-based. Serving OEMs, EMS & industries worldwide since 1999.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-mirai-primary text-white font-bold px-8 py-4 rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                Submit RFQ &mdash; 24hr Quote
              </button>
              <button className="bg-transparent border border-slate-300 text-slate-900 font-semibold px-8 py-4 rounded-lg hover:bg-slate-50 transition-all hover:border-slate-400 group">
                View Products <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Hero Banner Visual */}
          <motion.div 
            className="lg:col-span-5 relative h-[500px] hidden lg:flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Glowing Banner Card */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl shadow-2xl opacity-10 blur-[20px] animate-pulse" />
            
            <div className="relative w-[85%] h-[85%] bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col justify-between">
              {/* Inner decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mirai-primary to-mirai-accent opacity-20 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500 to-violet-500 opacity-20 blur-2xl" />
              
              {/* Content in the main card */}
              <div className="relative z-10">
                <span className="text-xs font-semibold text-mirai-primary uppercase tracking-widest">Premium Quality</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">Certified Electronic Components</h3>
                <p className="text-slate-500 text-sm mt-2">Sourcing the best for global industries.</p>
              </div>
              
              {/* Fake Chart or Grid Visual */}
              <div className="relative z-10 h-32 flex items-end gap-2">
                {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-gradient-to-t from-mirai-primary to-mirai-accent rounded-t-md"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Overlapping Badges */}
            {badges.map((badge, idx) => (
              <motion.div 
                key={idx}
                className="absolute bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/50 p-4 rounded-xl flex items-center gap-4 cursor-pointer max-w-[250px]"
                style={{
                  top: idx === 0 ? "5%" : idx === 1 ? "25%" : idx === 2 ? "55%" : "75%",
                  left: idx === 0 ? "-15%" : idx === 1 ? "65%" : idx === 2 ? "-10%" : "60%",
                  zIndex: 20 + idx
                }}
                animate={{ 
                  y: [0, idx % 2 === 0 ? -15 : 15, 0],
                  x: [0, idx % 2 === 0 ? 5 : -5, 0]
                }}
                transition={{ 
                  duration: 5 + idx, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
              >
                <div className="bg-slate-50 p-2 rounded-lg flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-xs leading-tight">{badge.title}</h4>
                  <p className="text-slate-500 text-[10px] leading-snug mt-1">{badge.desc}</p>
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
