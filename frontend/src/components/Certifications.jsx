import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, ShieldCheck, CheckCircle2, FileCheck, Clock, Globe, Users
} from 'lucide-react';
import { updateMeta } from '../utils/seo';

const Certifications = () => {
  useEffect(() => {
    updateMeta(
      'ISO Certifications & Quality Assurance | Mirai Technologies',
      'Mirai Technologies is an ISO 9001:2015 certified electronic components distributor in Mumbai. Read about our quality inspection standards, counterfeit detection, and industry certifications.',
      'iso 9001 2015 distributor, quality electronics components, semiconductor certifications, counterfeit components detection, electronic components testing',
      'Mirai Technologies',
      'Mirai Technologies'
    );
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <div className="bg-white min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 relative">
      {/* Background decoration matching home page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mirai-primary/20 to-mirai-accent/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-pink-500/10 to-mirai-primary/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHkiPSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-mirai-primary/40 rounded-full px-5 py-2 mb-8 text-xs sm:text-sm font-semibold text-mirai-primary tracking-widest bg-mirai-primary/5 uppercase"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-mirai-primary shadow-md shadow-blue-500/30"></div>
            Certifications & Quality
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight"
          >
            Certified. Verified. <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Trusted.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light"
          >
            Every certification Mirai Technologies holds reflects our commitment to quality, traceability, and supplier integrity at every step of the supply chain.
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Certifications Cards */}
          <motion.div 
            initial="hidden" animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            {[
              { badge: "ACTIVE CERTIFICATION", title: "ISO 9001:2015 Certified", desc: "Our Quality Management System covers procurement, supplier verification, documentation and customer service processes end-to-end — ensuring consistent quality on every order.", color: "text-blue-600", bg: "bg-blue-50", icon: <Award className="w-4 h-4" /> },
              { badge: "VERIFIED SELLER", title: "IndiaMart Trust Seal Verified", desc: "Verified seller on India's largest B2B platform with Trust Seal — confirming business legitimacy, active trading history, and buyer protection assurance for all clients.", color: "text-amber-600", bg: "bg-amber-50", icon: <ShieldCheck className="w-4 h-4" /> },
              { badge: "SECTOR APPROVED", title: "Automotive & Defence Approved", desc: "Recognized supplier to automotive OEMs and defence contractors — meeting strict sector-specific quality, traceability, and documentation requirements.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-4 h-4" /> },
              { badge: "ON EVERY ORDER", title: "COC & Test Reports on Request", desc: "Certificate of Conformance, test reports & supplier verification documents available for every shipment — at no additional charge to our customers.", color: "text-sky-600", bg: "bg-sky-50", icon: <FileCheck className="w-4 h-4" /> }
            ].map((cert, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:border-mirai-primary/30 transition-all duration-300 cursor-default">
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
            initial="hidden" animate="visible"
            variants={containerVariants}
            className="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Quality Commitments</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Genuine Parts Only", desc: "Sourced from authorized manufacturers & franchised distributors only", icon: <CheckCircle2 className="text-emerald-500 w-5 h-5" /> },
                { title: "Full Traceability", desc: "Every component traceable to the original manufacturer with lot codes", icon: <ShieldCheck className="text-blue-500 w-5 h-5" /> },
                { title: "Anti-Counterfeit", desc: "Strict supplier vetting & visual inspection to eliminate counterfeit components", icon: <Award className="text-sky-500 w-5 h-5" /> },
                { title: "24-hr RFQ Response", desc: "Guaranteed quote within 24 hours with full pricing & availability", icon: <Clock className="text-amber-500 w-5 h-5" /> },
                { title: "Global Supplier Network", desc: "40+ authorized partners across USA, Europe, China, Taiwan & Japan", icon: <Globe className="text-blue-500 w-5 h-5" /> },
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
    </div>
  );
};

export default Certifications;
