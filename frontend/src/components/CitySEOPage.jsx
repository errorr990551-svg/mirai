import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, CheckCircle2, ShieldCheck, Award, 
  MapPin, Zap, ChevronDown, ChevronUp, MessageSquare, Mail, Phone,
  Cpu, Activity, Radio, Shield, Car, Anchor, Info, ArrowRight
} from 'lucide-react';
import { updatePageSEO, updateSchemaScripts } from '../utils/seo';

const getIndustryIcon = (industryName) => {
  const name = industryName.toLowerCase();
  if (name.includes('automotive')) return <Car className="h-6 w-6 text-indigo-500" />;
  if (name.includes('defense') || name.includes('defence')) return <Shield className="h-6 w-6 text-red-500" />;
  if (name.includes('power')) return <Zap className="h-6 w-6 text-amber-500" />;
  if (name.includes('telecom') || name.includes('telecommunication')) return <Radio className="h-6 w-6 text-blue-500" />;
  if (name.includes('it')) return <Cpu className="h-6 w-6 text-emerald-500" />;
  if (name.includes('shipping')) return <Anchor className="h-6 w-6 text-cyan-500" />;
  if (name.includes('medical')) return <Activity className="h-6 w-6 text-rose-500" />;
  return <Building2 className="h-6 w-6 text-slate-500" />;
};

const renderParagraphs = (text, customClass = "mb-4 text-slate-600 leading-relaxed text-sm sm:text-base") => {
  if (!text) return null;
  return text.split('\n').filter(Boolean).map((para, idx) => (
    <p key={idx} className={customClass}>
      {para}
    </p>
  ));
};

const formatIntroText = (text) => {
  if (!text) return null;
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  
  if (sentences.length >= 6) {
    const introParagraph = sentences.slice(0, 3).join(' ');
    const points = sentences.slice(3, 6);
    const closingParagraph = sentences.slice(6).join(' ');
    
    return (
      <div className="space-y-5">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base text-left">
          {introParagraph}
        </p>
        
        <ul className="space-y-3.5 my-4">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-semibold text-left">
              <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        {closingParagraph && (
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base text-left border-t border-slate-100 pt-4 font-medium">
            {closingParagraph}
          </p>
        )}
      </div>
    );
  }
  
  return renderParagraphs(text, "text-slate-600 leading-relaxed text-sm sm:text-base");
};

const formatCommitmentText = (text) => {
  if (!text) return null;
  
  const advantagesIndex = text.indexOf('Our core advantages:');
  
  if (advantagesIndex !== -1) {
    const intro = text.substring(0, advantagesIndex).trim();
    const advantagesText = text.substring(advantagesIndex).trim();
    
    const contactTextMatch = advantagesText.match(/Contact us:.*$/i);
    let contactText = "";
    let cleanAdvantages = advantagesText;
    
    if (contactTextMatch) {
      contactText = contactTextMatch[0];
      cleanAdvantages = advantagesText.replace(contactText, '').trim();
    }
    
    const parts = cleanAdvantages.split(/\(\d\)/);
    const advTitle = parts[0].trim();
    const listItems = parts.slice(1).map(p => p.trim()).filter(Boolean);
    
    return (
      <div className="space-y-4">
        <p className="text-white/90 text-sm sm:text-base leading-relaxed text-left">{intro}</p>
        <p className="text-white font-extrabold text-sm sm:text-base text-left">{advTitle}</p>
        <ul className="space-y-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-white/95 font-medium leading-relaxed text-left">
              <CheckCircle2 className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {contactText && (
          <p className="text-white/80 text-xs sm:text-sm font-semibold pt-3 border-t border-white/10 mt-4 leading-relaxed text-left">
            {contactText}
          </p>
        )}
      </div>
    );
  }
  
  return renderParagraphs(text, "leading-relaxed text-sm sm:text-base");
};

const parseInternalLinks = (linksStr) => {
  if (!linksStr) return [];
  const parts = linksStr.split('|').map(s => s.trim()).filter(Boolean);
  const links = [];
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i] && parts[i+1]) {
      links.push({
        text: parts[i],
        url: parts[i+1]
      });
    }
  }
  return links;
};

const CitySEOPage = ({ page }) => {
  const [openFaq, setOpenFaq] = useState(0); // Open first FAQ by default
  const location = useLocation();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mirai-i53w.onrender.com/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          location: page.city + ', ' + page.state,
          message: `[RFQ from ${page.city} City Page] Part numbers / BOM: ${formData.message}`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Your RFQ has been sent successfully! We will get back to you within 2 hours.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please call +91 93213 98188 or email sales@miraitechnologies.net directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (page) {
      // Update SEO Meta Tags
      updatePageSEO(
        page.metaTitle,
        page.metaDescription,
        page.canonicalUrl,
        page.robotsMeta,
        page.ogTitle,
        page.ogDescription
      );
      
      // Update Dynamic Schema
      if (page.schema) {
        updateSchemaScripts([page.schema]);
      }
    }
    
    // Scroll to top on page render
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, location.pathname]);

  if (!page) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-400">Loading page data...</h2>
      </div>
    );
  }

  // Parse fields
  const internalLinksList = parseInternalLinks(page.internalLinks);
  const industriesList = page.targetIndustries ? page.targetIndustries.split(',').map(s => s.trim()) : [];

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-hidden">
      
      {/* 1. HERO SECTION (Dark Banner Theme matching Home Hero) */}
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cover bg-[position:10%_center] bg-no-repeat text-white"
        style={{ backgroundImage: "url('/banner.webp')" }}
      >
        {/* Dark background overlays */}
        <div className="absolute inset-0 bg-slate-950/45 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-[11px] font-bold tracking-widest text-slate-300 uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2.5 text-slate-500">/</span>
            <Link to="/market-area" className="hover:text-white transition-colors">Market Area</Link>
            <span className="mx-2.5 text-slate-500">/</span>
            <span className="text-white font-extrabold">{page.city}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            
            {/* Keywords / Location Badges */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="inline-flex items-center gap-1.5 bg-mirai-primary text-white border border-mirai-primary/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
                <MapPin className="w-3.5 h-3.5" /> Distributor in {page.city}
              </span>
              <span className="inline-flex items-center bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold text-slate-200">
                State: {page.state}
              </span>
            </div>

            {/* Dynamic H1 Tag */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              {page.h1}
            </h1>
            
            {/* Hero sentence */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {page.heroContent}
            </p>


          </div>
        </div>
      </section>

      {/* 2. SUMMARY / ABOUT THE REGION (Side-by-Side Cards Grid) */}
      <section className="py-16 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Overview text */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-heading font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-mirai-primary rounded-full" />
                  {page.h2s[0] || `Why Procurement Engineers in ${page.city} Trust Mirai Technologies`}
                </h2>
                 <div className="space-y-4">
                  {formatIntroText(page.introduction)}
                </div>
              </div>
            </div>

            {/* Right Card: Why Mirai Brand Block (Blue/Indigo Gradient) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-mirai-primary to-indigo-900 text-white p-8 sm:p-10 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-white/90" />
                  <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">
                    Our Commitment
                  </h3>
                </div>
                
                <div className="space-y-4 text-white/90 font-medium">
                  {formatCommitmentText(page.whyMirai)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES (Vite Premium Style) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
              {page.h2s[1] || `Semiconductor Products Available for Delivery to ${page.city}`}
            </h2>
            <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
            <p className="mt-4 text-slate-500 text-sm sm:text-base font-semibold">
              Authentic active and passive components sourced from manufacturer-authorised channels.
            </p>
          </div>

          {/* Grid of 4 categories with correct root-served images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* MOSFETs */}
            <div className="bg-white rounded-2xl border border-slate-200/60 hover:border-mirai-primary/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center p-4 border-b border-slate-100 relative group-hover:bg-slate-50 transition-colors">
                <img 
                  src="/irfp460-mirai-technologies.webp" 
                  alt={page.altProduct1 || "Power MOSFET Transistors"}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">Power MOSFETs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Vds 30V–1500V, Id 1A–200A. In stock: IRFP4668, IRFP460, and STP55NF06, supplied with full manufacturer data.
                  </p>
                </div>
                <Link to="/products/mosfet-transistor" className="mt-4 text-xs font-bold text-mirai-primary hover:text-indigo-800 flex items-center gap-1">
                  Browse MOSFETs <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* IGBTs */}
            <div className="bg-white rounded-2xl border border-slate-200/60 hover:border-mirai-primary/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center p-4 border-b border-slate-100 relative group-hover:bg-slate-50 transition-colors">
                <img 
                  src="/75n60-mirai-technologies.webp" 
                  alt={page.altProduct2 || "IGBT Transistors"}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">IGBTs & Thyristors</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Power switching components (600V–1700V) for motor controllers, UPS systems, welding drives, and inverters.
                  </p>
                </div>
                <Link to="/products" className="mt-4 text-xs font-bold text-mirai-primary hover:text-indigo-800 flex items-center gap-1">
                  Browse IGBTs <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* ICs */}
            <div className="bg-white rounded-2xl border border-slate-200/60 hover:border-mirai-primary/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center p-4 border-b border-slate-100 relative group-hover:bg-slate-50 transition-colors">
                <img 
                  src="/lm358ld08t-mirai-technologies.webp" 
                  alt={page.altProduct3 || "Integrated Circuits"}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">Integrated Circuits</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Operational amplifiers, logic gates, real-time clocks, microcontrollers, and gate drivers (LM358L, ULN2003).
                  </p>
                </div>
                <Link to="/products/integrated-circuit" className="mt-4 text-xs font-bold text-mirai-primary hover:text-indigo-800 flex items-center gap-1">
                  Browse ICs <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Diodes */}
            <div className="bg-white rounded-2xl border border-slate-200/60 hover:border-mirai-primary/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center p-4 border-b border-slate-100 relative group-hover:bg-slate-50 transition-colors">
                <img 
                  src="/mb6s-mirai-technologies.webp" 
                  alt={page.altProduct4 || "Diodes and bridge rectifiers"}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">Diodes & Passives</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Schottky diodes, bridge rectifiers (MB6S, MB10S series), Zeners, and NTC thermistors for B2B supply.
                  </p>
                </div>
                <Link to="/products" className="mt-4 text-xs font-bold text-mirai-primary hover:text-indigo-800 flex items-center gap-1">
                  Browse Passives <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>

          <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">Categories Info & Part Numbers:</span>
            {page.productCategories}
          </div>

        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE (Side-by-Side visual design) */}
      <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
                {page.h2s[2] || `Industries We Serve in ${page.city}`}
              </h2>
              <div className="w-16 h-1.5 bg-mirai-primary rounded-full" />
              <div>
                {renderParagraphs(page.industriesWeServe, "text-slate-600 leading-relaxed text-sm sm:text-base")}
              </div>
            </div>

            {/* Right Industries Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {industriesList.map((industry, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center text-center group hover:border-mirai-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="p-3 bg-slate-50 rounded-xl mb-4 group-hover:bg-mirai-primary/10 transition-colors border border-slate-100">
                    {getIndustryIcon(industry)}
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. QUALITY & TECHNICAL PROCUREMENT CONTROLS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Authorised block */}
            <div className="bg-white border border-slate-200/60 p-8 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden group hover:border-mirai-primary/40 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] select-none pointer-events-none">
                <ShieldCheck className="h-32 w-32 text-mirai-primary group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mb-6">
                {page.h2s[3] || "Why Sourcing from an Authorised Distributor Matters"}
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                {page.whyAuthorisedDistributor}
              </p>
              
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  100% factory-authorised supply with date codes & traceability
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  Full RoHS, REACH, and manufacturer conformance certificates
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  Original packaging with dry-pack vacuum seals & ESD shielding
                </li>
              </ul>
            </div>

            {/* Technical support block */}
            <div className="bg-white border border-slate-200/60 p-8 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden group hover:border-mirai-primary/40 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] select-none pointer-events-none">
                <Cpu className="h-32 w-32 text-mirai-primary group-hover:scale-105 transition-transform duration-500" />
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mb-6">
                Engineering & Procurement Support
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                {page.technicalSupport}
              </p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  Cross-referencing active components to find immediate options
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  Reviewing functional parameters & pin-to-pin footprint compatibility
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-mirai-primary shrink-0 mt-0.5" />
                  Optimising BOM structure to save costs on production volumes
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (Accordion matching product page aesthetic) */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.h2s[5] || `Frequently Asked Questions — Component Supply in ${page.city}`}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm divide-y divide-slate-100 overflow-hidden px-6">
              {page.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-4 first:pt-6 last:pb-6">
                    <button
                      className="w-full text-left py-2.5 flex justify-between items-center text-slate-800 hover:text-mirai-primary transition-colors focus:outline-none"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="font-heading font-bold text-slate-800 text-sm sm:text-base pr-4 leading-snug">
                        {faq.q}
                      </span>
                      {isOpen 
                        ? <ChevronUp className="h-4.5 w-4.5 text-mirai-primary shrink-0 transition-colors" />
                        : <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0 transition-colors" />
                      }
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-3 pb-2 text-left">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* 7. CONTACT / CTA SECTION (Light Premium Form theme) */}
      <section className="py-20 relative overflow-hidden bg-slate-950 text-white">
        
        {/* Dark Background mesh */}
        <div className="absolute inset-0 overflow-hidden -z-10 select-none pointer-events-none opacity-40">
          <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] bg-indigo-700/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[70%] h-[70%] bg-indigo-800/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* RFQ Text */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight leading-tight">
                {page.h2s[4] || `Get a Quote for Components Delivered to ${page.city}`}
              </h2>
              
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {page.ctaText}
              </div>

              {/* Call details */}
              <div className="pt-4 space-y-3.5">
                <a 
                  href="tel:+919321398188" 
                  className="inline-flex items-center gap-3 bg-white text-indigo-950 hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-md mr-3"
                >
                  <Phone className="h-4 w-4 text-indigo-900" /> Call Sales: +91 93213 98188
                </a>
                <a 
                  href="mailto:sales@miraitechnologies.net" 
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300"
                >
                  <Mail className="h-4 w-4 text-white/90" /> Email BOM
                </a>
              </div>
            </div>

            {/* RFQ Form exactly matching Contact.jsx design */}
            <div className="lg:col-span-7 bg-white text-slate-800 p-8 lg:p-10 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-heading font-bold text-indigo-950 mb-6">
                Submit BOM Request for {page.city}
              </h3>
              
              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase block">Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting}
                      placeholder="Your Name" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/40 focus:border-mirai-primary transition-all placeholder-slate-400" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase block">Company Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting}
                      placeholder="Company Name" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/40 focus:border-mirai-primary transition-all placeholder-slate-400" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase block">Email *</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting}
                      placeholder="you@company.com" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/40 focus:border-mirai-primary transition-all placeholder-slate-400" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase block">Phone / Mobile *</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting}
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/40 focus:border-mirai-primary transition-all placeholder-slate-400" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Component Part Numbers / BOM List *</label>
                  <textarea 
                    required 
                    rows={3} 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="Enter part numbers and quantities (e.g. IRFP460 - 50 pcs, LM358 - 100 pcs)"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mirai-primary/40 focus:border-mirai-primary transition-all placeholder-slate-400 resize-none" 
                  />
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-xl text-xs font-semibold border ${
                    submitStatus === 'success' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {statusMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-mirai-primary hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>

          </div>

          {/* Internal links for SEO flow */}
          {internalLinksList.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10 text-xs text-slate-400">
              <span className="font-bold block mb-3 uppercase tracking-wider text-slate-300">Quick Resource Links:</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {internalLinksList.map((link, idx) => (
                  <a key={idx} href={link.url} className="hover:text-white transition-colors underline flex items-center gap-1">
                    {link.text} <ArrowRight className="h-3 w-3 inline animate-pulse" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Geo location text block */}
          <div className="mt-8 text-xs text-slate-500 text-center leading-relaxed">
            {page.footerGeoText}
          </div>

        </div>
      </section>

    </div>
  );
};

export default CitySEOPage;
