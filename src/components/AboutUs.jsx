import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, CheckCircle2, ShieldCheck, FileCheck, Award, Users, 
  Clock, Globe, MapPin, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';
import warehouseFacility from '../assets/warehouse_facility.png';

const AboutUs = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 352; // Width of card (320px) + Gap (32px)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background decoration matching home page */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mirai-primary/20 to-mirai-accent/20 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-pink-500/10 to-mirai-primary/20 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHkiPSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <motion.div 
              className="lg:col-span-7 text-center lg:text-left mb-16 lg:mb-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 border border-mirai-primary/40 rounded-full px-5 py-2 mb-8 text-xs sm:text-sm font-semibold text-mirai-primary tracking-widest bg-mirai-primary/5 uppercase"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-mirai-primary shadow-md shadow-blue-500/30"></div>
                About Mirai Technologies
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
              >
                <span className="block text-slate-900">India's Most Trusted</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent mt-2">Electronic Components</span>
                <span className="block text-slate-900 mt-2">Partner</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Established in 1999 in Mumbai, Mirai Technologies has built 25+ years of expertise as a leading distributor of electronic components — serving OEMs, EMS companies, and industrial clients across India and globally.
              </motion.p>
            </motion.div>
            
            {/* Right Hero Banner Visual (Warehouse Image) */}
            <motion.div 
              className="lg:col-span-5 relative h-[500px] hidden lg:flex items-center justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl shadow-2xl opacity-10 blur-[30px] animate-pulse" />
              
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[85%] h-[85%] bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden group hover:border-mirai-primary/30 transition-colors"
              >
                {/* Image displaying warehouse_facility.png */}
                <img 
                  src={warehouseFacility} 
                  alt="Mirai Sourcing Warehouse Facility" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">Our Story</motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-10 leading-[1.2]">
                Built on Trust,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Powered by Expertise</span>
              </motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed text-left md:text-center">
                <p>
                  Mirai Technologies was founded in Mumbai with a simple mission: to be the most reliable electronic components partner for Indian manufacturers. Over 25 years, we have grown from a local supplier to a globally connected distributor with 40+ authorized brand partnerships and 900+ valued customers.
                </p>
                <p>
                  Our team of 18+ experienced professionals brings deep domain knowledge in semiconductors, ICs, passive components, and supply chain management. We understand your production timelines, quality requirements, and sourcing challenges — because we've solved them for hundreds of clients.
                </p>
                <p>
                  Today, Mirai Technologies operates from Mumbai and serves clients across India, with exports to 3+ countries. We are ISO 9001:2015 certified, DUNS registered, IndiaMart Trust Seal verified, and approved by automotive and defence sector clients.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 inline-flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-8 py-5 shadow-lg shadow-slate-200/50">
                <div className="bg-slate-100 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-mirai-primary" />
                </div>
                <div className="text-base font-semibold text-slate-800 text-left">
                  GSTIN: <span className="text-mirai-primary">27DEHPB4188C1ZR</span> <br className="sm:hidden" /><span className="hidden sm:inline text-slate-300 mx-2">|</span> Mumbai, Maharashtra
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR JOURNEY */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">Our Journey</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              25+ Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Excellence</span>
            </h2>
          </div>
          
          {/* Horizontal Timeline Container */}
          <div className="relative h-[380px] group">
            {/* Left Scroll Button (Desktop) */}
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 bg-white text-slate-800 p-3 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 hover:text-mirai-primary hover:border-mirai-primary/20 transition-all focus:outline-none opacity-0 group-hover:opacity-100 duration-300 md:block hidden active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Scroll Button (Desktop) */}
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 bg-white text-slate-800 p-3 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 hover:text-mirai-primary hover:border-mirai-primary/20 transition-all focus:outline-none opacity-0 group-hover:opacity-100 duration-300 md:block hidden active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mobile Scroll Buttons (Always visible on mobile) */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-sm text-slate-800 p-2.5 rounded-full shadow-md border border-slate-150 active:scale-95 transition-all md:hidden block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-sm text-slate-800 p-2.5 rounded-full shadow-md border border-slate-150 active:scale-95 transition-all md:hidden block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Horizontal Line background */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-mirai-primary/30 z-0 rounded-full -translate-y-1/2" />
            
            {/* Scrollable Row */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto flex gap-8 pb-4 pt-4 px-4 scrollbar-none relative z-10 h-full scroll-smooth"
            >
              {[
                { year: "1999", desc: "Mirai Technologies founded in Mumbai. Began as a semiconductor component trader for local OEM clients." },
                { year: "2005", desc: "Expanded product range to include passive components (resistors, capacitors, inductors). First partnerships with international brands." },
                { year: "2012", desc: "ISO 9001:2015 certification obtained. Grew authorized supplier network to 20+ global manufacturers." },
                { year: "2016", desc: "Achieved IndiaMart Trust Seal Verified status. Expanded to serve EV, Automotive, and Defence sectors." },
                { year: "2020", desc: "DUNS registered with Dun & Bradstreet. Expanded BOM support services for EMS and Turnkey manufacturers." },
                { year: "2024", desc: "900+ valued customers. 40+ authorized global partners. Serving 3+ countries. Expanding global footprint." },
                { year: "2026", desc: "Mirai Technologies continues to grow as India's most trusted electronic component sourcing partner." }
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={idx} 
                    className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 h-full flex flex-col relative"
                  >
                    {/* Connecting vertical line to the timeline */}
                    <div className={`absolute left-[33px] w-0.5 bg-mirai-primary/40 z-10 ${
                      isEven ? 'top-1/2 h-[30px]' : 'bottom-1/2 h-[30px]'
                    }`} />

                    {/* Timeline Dot on the line */}
                    <div className="absolute top-1/2 left-6 w-5 h-5 bg-white rounded-full border-4 border-mirai-primary shadow-md z-20 -translate-y-1/2" />
                    
                    {/* Card Content */}
                    <div className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-mirai-primary/20 transition-all duration-300 w-full h-[160px] flex flex-col justify-between ${
                      isEven ? 'mt-auto' : 'mb-auto'
                    }`}>
                      <div>
                        <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent mb-3">
                          {item.year}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Mission Card */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: -1, y: -10 }} className="bg-slate-900 rounded-3xl p-10 lg:p-14 shadow-2xl relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mirai-primary/20 rounded-full blur-[80px] -z-10 group-hover:bg-mirai-primary/30 transition-colors" />
              <div className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Our Mission
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                Right Component &middot;<br/>Right Time &middot;<br/>Right Price
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                To be the most reliable single-source partner for electronic components — delivering genuine parts, full documentation, and 24-hour turnaround to every client, every time. We eliminate supply disruptions so you can focus on building great products.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: 1, y: -10 }} className="bg-mirai-primary rounded-3xl p-10 lg:p-14 shadow-2xl shadow-blue-500/20 relative overflow-hidden group transition-all duration-300">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -z-10 group-hover:bg-white/20 transition-colors" />
              <div className="text-sm font-bold tracking-widest text-indigo-200 uppercase mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Our Vision
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                India's Most Trusted<br/>Component Partner
              </h3>
              <p className="text-indigo-100 text-lg leading-relaxed">
                To be recognized globally as the go-to electronic component distributor for Indian manufacturing — built on a foundation of reliability, traceability, and long-term partnerships. Single source, any component, any brand, anywhere.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* 6. CTA SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-mirai-primary/20 rounded-full blur-[100px] -z-10" />

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Partner with Mirai Technologies
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 900+ companies that trust Mirai for reliable, authentic electronic component sourcing.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-mirai-primary text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                Get In Touch
              </button>
              <button className="bg-transparent border border-slate-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-slate-800 transition-all hover:border-slate-500">
                Our Services &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
