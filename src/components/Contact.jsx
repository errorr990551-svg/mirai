import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, Globe, MapPin, Building2,
  Award, ShieldCheck, CheckCircle2, ChevronDown
} from 'lucide-react';

const Contact = () => {
  const [inquiryType, setInquiryType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inquiryOptions = [
    { value: "rfq", label: "Request for Quote (RFQ)" },
    { value: "bom", label: "BOM Sourcing" },
    { value: "hard-to-find", label: "Hard to Find / Obsolete Parts" },
    { value: "other", label: "Other Inquiry" }
  ];

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

  const faqs = [
    {
      q: "What is the minimum order quantity (MOQ)?",
      a: "Mirai Technologies works with clients of all sizes. MOQ varies by component and manufacturer. Contact us with your specific requirements and we'll find the best solution for your project, whether it's a single prototype quantity or a large production run."
    },
    {
      q: "Do you supply components pan-India?",
      a: "Yes, Mirai Technologies, based in Mumbai, supplies electronic components across India and internationally. We serve clients in Delhi, Bangalore, Pune, Chennai, Hyderabad, and all major manufacturing hubs across India."
    },
    {
      q: "Are all components genuine and authentic?",
      a: "Absolutely. We source exclusively from authorized manufacturers and franchised distributors. Every shipment undergoes anti-counterfeit visual inspection, packaging verification, and lot traceability checks. COC available on every order."
    },
    {
      q: "Can you source obsolete or discontinued components?",
      a: "Yes — this is one of our specialties. Our global supplier network allows us to locate end-of-life and hard-to-find components that standard distributors cannot supply. Contact us with your part number for sourcing assistance."
    },
    {
      q: "Which brands / manufacturers does Mirai supply?",
      a: "We are authorized partners for 40+ global brands including Infineon, Texas Instruments, STMicroelectronics, Microchip, Analog Devices, onsemi, Toshiba, Nexperia, Yageo, TDK, Rohm, Renesas, Samsung, and many more."
    },
    {
      q: "Do you offer after-sales support?",
      a: "Yes. Our dedicated team handles returns, replacements, and quality disputes within 48 hours. We stand behind every order we fulfill and are committed to resolving any issues quickly and professionally."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mirai-primary/20 to-mirai-accent/20 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-pink-500/10 to-mirai-primary/20 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHkiPSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div 
              initial="hidden" animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">
                Contact Mirai Technologies
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                Get Your Quote in<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">24 Hours – Guaranteed</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                Submit your RFQ, BOM, or part list today. Our sourcing experts will respond with competitive pricing, full availability, and traceability within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Contact Information */}
            <motion.div 
              className="lg:col-span-5 space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Contact Info Card */}
              <motion.div variants={itemVariants} className="bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mirai-primary/20 rounded-full blur-[80px] -z-10" />
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Phone className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Phone / WhatsApp</div>
                      <div className="font-medium text-lg">+91 93213 98188</div>
                      <div className="font-medium text-lg">+91 98201 22744</div>
                      <div className="font-medium text-lg">+91 91368 10360</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Mail className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Email</div>
                      <a href="mailto:sales@miraitechnologies.net" className="font-medium text-lg hover:text-mirai-primary transition-colors block">sales@miraitechnologies.net</a>
                      <a href="mailto:nehas@miraitechnologies.net" className="font-medium text-lg hover:text-mirai-primary transition-colors block">nehas@miraitechnologies.net</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Globe className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Website</div>
                      <a href="https://www.miraitechnologies.net" target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-mirai-primary transition-colors">www.miraitechnologies.net</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Building2 className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">LinkedIn</div>
                      <a href="#" className="font-medium text-lg hover:text-mirai-primary transition-colors">mirai-technologies-global</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Addresses Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Addresses</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl shrink-0">
                      <MapPin className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">Shipping Address</div>
                      <p className="font-medium text-slate-800 leading-relaxed">
                        401, Aditya Residency, Chunabhatti Lane,<br/>
                        Lamington Road, Mumbai 400 007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl shrink-0">
                      <Building2 className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">Billing Address</div>
                      <p className="font-medium text-slate-800 leading-relaxed">
                        1101 B, Kinjal Heights,<br/>
                        Tardeo, Mumbai 400 034
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Certifications Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Certifications</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    <Award className="w-4 h-4" /> ISO 9001:2015
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <ShieldCheck className="w-4 h-4" /> DUNS Registered
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                    <CheckCircle2 className="w-4 h-4" /> IndiaMart Trust Seal
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <ShieldCheck className="w-4 h-4" /> Auto & Defence Approved
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block">
                  <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    GSTIN: <span className="text-mirai-primary">27DEHPB4188C1ZR</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              className="lg:col-span-7"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100 h-full">
                <h3 className="text-3xl font-black text-slate-900 mb-2">Submit Your RFQ</h3>
                <p className="text-slate-600 mb-8">Fill in your requirements and our team will respond within 24 hours with pricing and availability.</p>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">First Name *</label>
                      <input type="text" placeholder="Your first name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Last Name *</label>
                      <input type="text" placeholder="Your last name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Company Name *</label>
                    <input type="text" placeholder="Your company name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Business Email *</label>
                      <input type="email" placeholder="your@company.com" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Phone / WhatsApp *</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Inquiry Type *</label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-slate-50 border ${isDropdownOpen ? 'border-mirai-primary ring-2 ring-mirai-primary/50' : 'border-slate-200'} text-left rounded-xl px-4 py-3 focus:outline-none transition-all flex items-center justify-between`}
                      >
                        <span className={inquiryType ? 'text-slate-900' : 'text-slate-400'}>
                          {inquiryType ? inquiryOptions.find(opt => opt.value === inquiryType)?.label : "Select inquiry type"}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden"
                          >
                            {inquiryOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setInquiryType(option.value);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${inquiryType === option.value ? 'bg-mirai-primary/5 text-mirai-primary font-semibold' : 'text-slate-700'}`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>



                  {/* As requested: renamed "Additional Notes" to "Message" and no Timeline field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Message</label>
                    <textarea 
                      rows="3" 
                      placeholder="Any additional specifications, quality requirements, or questions..." 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-mirai-primary to-mirai-accent text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    Submit RFQ – Get Quote in 24 Hours <span className="text-yellow-300">✦</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    By submitting, you agree our team will contact you regarding your inquiry. We never share your data.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">
              Frequently Asked Questions
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Common Questions About <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Mirai Technologies</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:border-mirai-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-slate-900 mb-4">{faq.q}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
