import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, CheckCircle2, ShieldCheck, FileCheck, Award, Users, 
  Clock, Globe, MapPin, Zap
} from 'lucide-react';

const AboutUs = () => {
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
            
            {/* Right Hero Banner Visual (Adapted from Home) */}
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
                className="relative w-[85%] h-[85%] bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col justify-between hover:border-mirai-primary/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mirai-primary to-mirai-accent opacity-20 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500 to-violet-500 opacity-20 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="bg-mirai-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-mirai-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">Our Legacy</h3>
                  <p className="text-slate-500 text-sm mt-2 font-medium">Serving the industry since 1999</p>
                </div>
                
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="text-3xl font-black text-mirai-primary">25+</div>
                    <div className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Years Exp</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="text-3xl font-black text-mirai-primary">900+</div>
                    <div className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Clients</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="text-3xl font-black text-mirai-primary">40+</div>
                    <div className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Brands</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="text-3xl font-black text-mirai-primary">100%</div>
                    <div className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">Verified</div>
                  </div>
                </div>
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
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.div variants={itemVariants} className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">Our Journey</motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              25+ Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Excellence</span>
            </motion.h2>
          </motion.div>
          
          <div className="relative">
            {/* Animated Vertical Line (Desktop center, Mobile left) */}
            <motion.div 
              className="absolute left-[27px] sm:left-1/2 top-4 bottom-4 w-1 sm:w-1.5 bg-slate-100 sm:-translate-x-1/2 origin-top rounded-full"
            />
            <motion.div 
              className="absolute left-[27px] sm:left-1/2 top-4 bottom-4 w-1 sm:w-1.5 bg-gradient-to-b from-mirai-primary to-mirai-accent sm:-translate-x-1/2 origin-top rounded-full z-0"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />

            <div className="space-y-12 sm:space-y-24 relative z-10">
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
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                    className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between group"
                  >
                    {/* Content Left (Desktop) */}
                    <div className={`hidden sm:block sm:w-[45%] ${isEven ? 'text-right pr-12' : 'opacity-0 pointer-events-none'}`}>
                      {isEven && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:border-mirai-primary/30 hover:shadow-xl transition-all duration-300">
                          <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent mb-3">{item.year}</h4>
                          <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-[15px] sm:left-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full sm:-translate-x-1/2 border-[4px] border-slate-100 shadow-md z-10 flex items-center justify-center top-6 sm:top-auto group-hover:border-mirai-primary/30 transition-colors duration-300">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.5 + idx * 0.2, duration: 0.4, type: "spring" }}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-mirai-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      />
                    </div>

                    {/* Content Right (Desktop) & Mobile Content */}
                    <div className={`pl-16 sm:pl-0 sm:w-[45%] ${!isEven ? 'sm:text-left sm:pl-12' : 'sm:opacity-0 sm:pointer-events-none'}`}>
                      <div className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:border-mirai-primary/30 hover:shadow-xl transition-all duration-300 ${isEven ? 'sm:hidden' : ''}`}>
                        <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent mb-3">{item.year}</h4>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                  </motion.div>
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

      {/* 5. CERTIFICATIONS & QUALITY */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
            >
              Certified. Verified. <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Trusted.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-xl text-slate-600"
            >
              Every certification Mirai Technologies holds reflects our commitment to quality, traceability, and supplier integrity at every step of the supply chain.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left: Certifications Cards */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              {[
                { badge: "ACTIVE CERTIFICATION", title: "ISO 9001:2015 Certified", desc: "Our Quality Management System covers procurement, supplier verification, documentation and customer service processes end-to-end — ensuring consistent quality on every order.", color: "text-blue-600", bg: "bg-blue-50", icon: <Award className="w-4 h-4" /> },
                { badge: "VERIFIED SELLER", title: "IndiaMart Trust Seal Verified", desc: "Verified seller on India's largest B2B platform with Trust Seal — confirming business legitimacy, active trading history, and buyer protection assurance for all clients.", color: "text-amber-600", bg: "bg-amber-50", icon: <ShieldCheck className="w-4 h-4" /> },
                { badge: "SECTOR APPROVED", title: "Automotive & Defence Approved", desc: "Recognized supplier to automotive OEMs and defence contractors — meeting strict sector-specific quality, traceability, and documentation requirements.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-4 h-4" /> },
                { badge: "ON EVERY ORDER", title: "COC & Test Reports on Request", desc: "Certificate of Conformance, test reports & supplier verification documents available for every shipment — at no additional charge to our customers.", color: "text-purple-600", bg: "bg-purple-50", icon: <FileCheck className="w-4 h-4" /> }
              ].map((cert, i) => (
                <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-mirai-primary/30 transition-all duration-300 cursor-default">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4 ${cert.bg} ${cert.color}`}>
                    {cert.icon} {cert.badge}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cert.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Quality Commitments & Process */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={containerVariants}
              className="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Quality Commitments</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { title: "Genuine Parts Only", desc: "Sourced from authorized manufacturers & franchised distributors only", icon: <CheckCircle2 className="text-emerald-500 w-5 h-5" /> },
                  { title: "Full Traceability", desc: "Every component traceable to the original manufacturer with lot codes", icon: <ShieldCheck className="text-blue-500 w-5 h-5" /> },
                  { title: "Anti-Counterfeit", desc: "Strict supplier vetting & visual inspection to eliminate counterfeit components", icon: <Award className="text-purple-500 w-5 h-5" /> },
                  { title: "24-hr RFQ Response", desc: "Guaranteed quote within 24 hours with full pricing & availability", icon: <Clock className="text-amber-500 w-5 h-5" /> },
                  { title: "Global Supplier Network", desc: "40+ authorized partners across USA, Europe, China, Taiwan & Japan", icon: <Globe className="text-indigo-500 w-5 h-5" /> },
                  { title: "Customer References", desc: "Client references & testimonials available on request for all sectors", icon: <Users className="text-rose-500 w-5 h-5" /> }
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }} className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:shadow-md hover:bg-white transition-all cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-8">Quality Assurance Process</h3>
              <div className="space-y-6">
                {[
                  { step: "1", title: "Supplier Verification", desc: "All suppliers audited against ISO & manufacturer authorization criteria before onboarding" },
                  { step: "2", title: "Order Confirmation", desc: "Part numbers, date codes & quantities cross-checked against BOM before procurement" },
                  { step: "3", title: "Visual Inspection", desc: "Each shipment inspected for packaging integrity, labeling accuracy & counterfeit markers" },
                  { step: "4", title: "Documentation", desc: "COC, test reports & packing lists issued with every delivery on request at no extra charge" },
                  { step: "5", title: "After-Sales Support", desc: "Dedicated team handles returns, replacements & quality disputes within 48 hours" }
                ].map((process, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ x: 10 }} className="flex gap-4 group cursor-default transition-transform">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mirai-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
                      {process.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{process.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{process.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
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
