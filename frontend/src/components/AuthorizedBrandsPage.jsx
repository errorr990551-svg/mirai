import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, ArrowRight, Award, Send, 
  HelpCircle, Cpu, FileText, Check, Layers, Building2
} from 'lucide-react';
import { updatePageSEO, injectFAQSchema } from '../utils/seo';

const AUTHORIZED_BRANDS = [
  {
    name: 'STMicroelectronics',
    category: 'Power MOSFETs, IGBTs, Microcontrollers & Diodes',
    description: 'STMicroelectronics is a global leader in power semiconductors and automotive-grade ICs. We stock genuine ST MOSFETs (STP/STW series), STM32/STM8 microcontrollers, and Schottky diodes with full factory batch codes.',
    targetCategoryLink: '/products/integrated-circuit'
  },
  {
    name: 'Infineon Technologies',
    category: 'Discrete IGBTs, Power MOSFETs & Automotive ICs',
    description: 'Infineon powers renewable energy, solar inverters, and EV traction drives worldwide. Mirai Technology distributes authentic Infineon IGBT modules, CoolMOS power MOSFETs, and driver ICs for Indian OEMs.',
    targetCategoryLink: '/igbt-distributor'
  },
  {
    name: 'ON Semiconductor (onsemi)',
    category: 'Power MOSFETs, Optocouplers & Logic ICs',
    description: 'ON Semi offers industry-standard power management devices, MOC series gate-driver optocouplers, and power switching MOSFETs. Guaranteed authentic stock with CoC and GST invoicing.',
    targetCategoryLink: '/mosfet-distributor'
  },
  {
    name: 'NXP Semiconductors',
    category: 'Microcontrollers, Digital Signal Processors & Logic',
    description: 'NXP manufactures high-reliability microcontrollers and connectivity ICs for industrial automation, automotive electronics, and smart metering solutions.',
    targetCategoryLink: '/microcontroller-distributor'
  },
  {
    name: 'Vishay Intertechnology',
    category: 'Power Diodes, MOSFETs, Optocouplers & Passive Components',
    description: 'Vishay provides discrete semiconductors, TVS protection diodes, infrared optocouplers, and high-reliability passive components for industrial and defense electronics.',
    targetCategoryLink: '/diode-rectifier-distributor'
  },
  {
    name: 'Rohm Semiconductor',
    category: 'SiC Power Devices, Transistors & Regulators',
    description: 'Rohm specializes in silicon carbide (SiC) MOSFETs, power transistors, and low-dropout (LDO) voltage regulator ICs for automotive and industrial power supplies.',
    targetCategoryLink: '/voltage-regulator-distributor'
  },
  {
    name: 'International Rectifier (IR)',
    category: 'Power MOSFETs & Gate Driver ICs',
    description: 'International Rectifier (now part of Infineon) engineered legendary power MOSFET series (IRF3205, IRFP460, IRFZ44N) widely used in solar inverters, SMPS, and motor control.',
    targetCategoryLink: '/mosfet-distributor'
  },
  {
    name: 'UTC (Unisonic Technologies)',
    category: 'Linear Voltage Regulators, BJTs & Analog ICs',
    description: 'UTC manufactures cost-effective, high-reliability operational amplifiers, voltage regulators (78xx/79xx series), and power transistors for volume manufacturing.',
    targetCategoryLink: '/products/integrated-circuit'
  },
  {
    name: 'Texas Instruments (TI)',
    category: 'Analog ICs, Op-Amps, Comparators & Power Management',
    description: 'Texas Instruments produces industry-standard analog microchips including LM358 op-amps, LM339 comparators, NE555 timers, and precision power management ICs.',
    targetCategoryLink: '/products/integrated-circuit'
  },
  {
    name: 'Microchip Technology',
    category: 'PIC & AVR Microcontrollers, EEPROMs & Interface ICs',
    description: 'Microchip leads 8-bit, 16-bit, and 32-bit embedded microcontroller markets with PIC and AVR families. Genuine stock for OEM development and production.',
    targetCategoryLink: '/microcontroller-distributor'
  }
];

const BRAND_FAQS = [
  {
    q: "What does 'authorized semiconductor distribution' mean in practice?",
    a: "It means the distributor has a formal agreement with the manufacturer or official regional distribution network to sell genuine components with full factory traceability, manufacturer warranty coverage, and access to current (not excess or end-of-life) stock. Most OEM procurement policies require authorized sourcing."
  },
  {
    q: "What's the difference between an authorized and an independent distributor?",
    a: "An authorized distributor has direct manufacturer agreements guaranteeing genuine parts, factory date codes, and Certificate of Conformance (CoC). An independent distributor sources through open-market resale channels without direct agreements — useful for obsolete parts, but requiring third-party testing (AS6081/IDEA-STD-1010) when authorized stock is unavailable."
  }
];

const AuthorizedBrandsPage = () => {
  // RFQ Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mirai.errorr990551.workers.dev/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: 'Authorized Brands Page RFQ',
          message: `[Authorized Brand RFQ] ${formData.message}`
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSubmitStatus('success');
        setStatusMessage(resData.message || 'Brand RFQ received! We will send line item quotes within 2 business hours.');
        setFormData({ name: '', phone: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(resData.message || 'Submission failed. Please call +91 93213 98188.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please call +91 93213 98188 or email sales@miraitechnologies.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    updatePageSEO(
      'Authorized Distributor Brands | STMicroelectronics, Infineon, TI & More — Mirai Technologies',
      'Mirai Technologies is an authorized distributor for STMicroelectronics, Infineon, NXP, ON Semiconductor, Vishay, Rohm, IR, UTC, Texas Instruments & Microchip in India.',
      'https://miraitechnologies.net/authorized-distributor-brands',
      'index, follow',
      'Authorized Distributor Brands | Mirai Technologies',
      'Mirai Technologies is an authorized distributor for STMicroelectronics, Infineon, NXP, ON Semiconductor, Vishay, Rohm, IR, UTC, TI & Microchip.',
      'authorized semiconductor distributor India, STMicroelectronics distributor India, Infineon distributor India, Texas Instruments IC distributor',
      'Mirai Technologies Engineering Desk',
      'Mirai Technologies'
    );
    injectFAQSchema(BRAND_FAQS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-hidden pt-28 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mirai-primary/20 via-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex mb-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-mirai-primary font-extrabold">Authorized Brands</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-mirai-primary/20 border border-mirai-primary/40 px-3 py-1 rounded-full text-xs font-bold text-mirai-primary uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Franchised &amp; Authorized Manufacturer Distribution Lines
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              Our Authorized Distributor Brands
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Mirai Technologies supplies 100% authentic active and passive electronic components from top global semiconductor manufacturers. All shipments carry factory date codes, Certificate of Conformance (CoC), and direct GST invoicing.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 10 Global Franchise Lines
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <ShieldCheck className="w-4 h-4" /> Zero Counterfeit Risk
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Building2 className="w-4 h-4" /> Mumbai &amp; Hong Kong Logistics Bases
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BRAND CARDS GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Brand Listings Column */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-200/80 space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-mirai-primary" /> What 'Authorized Distribution' Guarantees You
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  When you purchase brand components through Mirai Technologies, every part is sourced strictly through franchised factory channels. You receive full manufacturer warranty protection, official CoC documentation, original reel/tube packaging, and immunity from open-market counterfeit parts.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {AUTHORIZED_BRANDS.map((brand, idx) => (
                  <div key={idx} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-mirai-primary/50 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <h3 className="text-xl font-heading font-black text-slate-900">{brand.name}</h3>
                      <span className="text-xs font-bold text-mirai-primary bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        {brand.category}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {brand.description}
                    </p>
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" /> Authorized Sourcing &amp; GST Billing
                      </span>
                      <Link to={brand.targetCategoryLink} className="text-xs font-bold text-mirai-primary hover:underline flex items-center gap-1">
                        Explore Category Stock <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-6 pt-6">
                <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-mirai-primary" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {BRAND_FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                      <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right RFQ Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-xl sticky top-28 space-y-6 border border-slate-800">
                <div>
                  <h3 className="text-xl font-heading font-black text-white mb-2">Request Brand Stock RFQ</h3>
                  <p className="text-xs text-slate-400">
                    Send part numbers for ST, Infineon, ON Semi, Vishay, NXP, TI, or Microchip for same-day pricing.
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold space-y-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    <p>{statusMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
                        {statusMessage}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Mobile / Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Company / Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="procurement@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Brand &amp; Part Numbers</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="List part numbers and quantities required..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-mirai-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-mirai-primary/20"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Submit Brand RFQ'} <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Factory Date Codes &amp; Certificate of Conformance</p>
                  <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-blue-400" /> Direct GST Billing Pan-India</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AuthorizedBrandsPage;
