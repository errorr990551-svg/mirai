import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, CheckCircle2, ShieldCheck, FileCheck, Award, 
  Clock, MapPin, Zap, ChevronDown, ChevronUp, ArrowRight,
  Cpu, Layers, Sparkles, Check, Phone, Mail
} from 'lucide-react';
import { updateMeta, updateSchemaScripts } from '../utils/seo';
import { useContact } from '../context/ContactContext';

const AboutUs = () => {
  const { isUnlocked, openModal } = useContact();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    updateMeta(
      'About Mirai Technologies | Authorized Electronic Components Distributor in Mumbai Since 1999',
      'Mirai Technologies has supplied genuine, traceable active and passive electronic components from Mumbai since 1999. ISO 9001:2015 certified, ESD-safe handling, RoHS/REACH verified.',
      'about Mirai Technologies, electronic components distributor Mumbai, authorized semiconductor distributor India',
      'Mirai Technologies',
      'Mirai Technologies'
    );

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://miraitechnologies.net/#organization",
      "name": "Mirai Technologies",
      "url": "https://miraitechnologies.net/",
      "logo": "https://miraitechnologies.net/images/mirai-technologies-logo.webp",
      "foundingDate": "1999",
      "description": "Authorized electronic components distributor in Mumbai since 1999. Genuine ICs, MOSFETs, microcontrollers, capacitors, resistors and connectors with CoC, GST invoice and pan-India delivery.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "401, Aditya Residency, Chunabhatti Lane, Lamington Road",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400007",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-93213-98188",
          "contactType": "sales",
          "email": "sales@miraitechnologies.net",
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-98201-22744",
          "contactType": "customer service",
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-91368-10360",
          "contactType": "technical support",
          "areaServed": "IN"
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Since when has Mirai Technologies been in business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We were established in Mumbai in 1999 and have over 25 years of experience in electronic component distribution."
          }
        },
        {
          "@type": "Question",
          "name": "Is Mirai Technologies an authorized distributor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We are an authorized distributor and stockist of active and passive components, and we source directly from manufacturers or authorized franchise lines."
          }
        },
        {
          "@type": "Question",
          "name": "What certifications do you hold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ISO 9001:2015 quality management, an ANSI/ESD S20.20 compliant handling facility, and RoHS/REACH compliance verification."
          }
        },
        {
          "@type": "Question",
          "name": "Who are your customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OEMs, EMS companies, R&D labs and defence units across automotive, industrial, consumer electronics and telecom."
          }
        },
        {
          "@type": "Question",
          "name": "Where are you located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our office and shipping address is 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
          }
        }
      ]
    };

    updateSchemaScripts([orgSchema, faqSchema]);
  }, []);

  const cities = [
    { name: 'Mumbai', slug: '/electronic-component-distributor-in-mumbai' },
    { name: 'Delhi', slug: '/electronic-component-distributor-in-delhi' },
    { name: 'Bengaluru', slug: '/electronic-component-distributor-in-bengaluru' },
    { name: 'Hyderabad', slug: '/electronic-component-distributor-in-hyderabad' },
    { name: 'Chennai', slug: '/electronic-component-distributor-in-chennai' },
    { name: 'Pune', slug: '/electronic-component-distributor-in-pune' },
    { name: 'Ahmedabad', slug: '/electronic-component-distributor-in-ahmedabad' },
    { name: 'Kolkata', slug: '/electronic-component-distributor-in-kolkata' },
    { name: 'Surat', slug: '/electronic-component-distributor-in-surat' },
    { name: 'Jaipur', slug: '/electronic-component-distributor-in-jaipur' },
    { name: 'Noida', slug: '/electronic-component-distributor-in-noida' },
    { name: 'Faridabad', slug: '/electronic-component-distributor-in-faridabad' },
    { name: 'Coimbatore', slug: '/electronic-component-distributor-in-coimbatore' },
    { name: 'Indore', slug: '/electronic-component-distributor-in-indore' },
    { name: 'Nagpur', slug: '/electronic-component-distributor-in-nagpur' },
    { name: 'Lucknow', slug: '/electronic-component-distributor-in-lucknow' },
    { name: 'Vadodara', slug: '/electronic-component-distributor-in-vadodara' },
    { name: 'Chandigarh', slug: '/electronic-component-distributor-in-chandigarh' },
    { name: 'Kochi', slug: '/electronic-component-distributor-in-kochi' },
    { name: 'Visakhapatnam', slug: '/electronic-component-distributor-in-visakhapatnam' }
  ];

  const faqs = [
    {
      q: "Since when has Mirai Technologies been in business?",
      a: "We were established in Mumbai in 1999 and have over 25 years of experience in electronic component distribution."
    },
    {
      q: "Is Mirai Technologies an authorized distributor?",
      a: "Yes. We are an authorized distributor and stockist of active and passive components, and we source directly from manufacturers or authorized franchise lines."
    },
    {
      q: "What certifications do you hold?",
      a: "ISO 9001:2015 quality management, an ANSI/ESD S20.20 compliant handling facility, and RoHS/REACH compliance verification."
    },
    {
      q: "Who are your customers?",
      a: "OEMs, EMS companies, R&D labs and defence units across automotive, industrial, consumer electronics and telecom."
    },
    {
      q: "Where are you located?",
      a: "Our office and shipping address is in Lamington Road, Mumbai. See the details below."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* SECTION 1: HERO */}
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cover bg-[position:10%_center] bg-no-repeat text-white"
        style={{ backgroundImage: "url('/banner.webp')" }}
      >
        <div className="absolute inset-0 bg-slate-950/65 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-blue-400/30 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold text-blue-400 tracking-widest bg-blue-400/10 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-md shadow-blue-400/30" />
              ESTABLISHED 1999 &middot; MUMBAI, INDIA
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              About Mirai Technologies: Mumbai's Authorized Electronic Components Distributor Since 1999
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 font-semibold leading-relaxed">
              25+ years of supplying genuine, factory-traceable semiconductors and passive components to Indian manufacturers.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
                className="bg-mirai-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
              >
                Get a Quote
              </button>
              <Link 
                to="/products"
                className="bg-transparent border border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
              >
                View Products &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block">Company Background</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 leading-tight">
                From a Mumbai Shop to a Trusted Component Partner
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Mirai Technologies started in Mumbai in 1999. We were a small team with a simple promise: every component we sell is genuine and can be traced back to its source.
                </p>
                <p>
                  Over 25 years, that promise has grown into a full distribution business. We are now an authorized distributor and stockist of active and passive electronic components. Our customers include automotive, industrial, consumer electronics and telecom manufacturers across India, and we also supply buyers overseas.
                </p>
                <p>
                  We have seen shortages, price swings and counterfeit scares come and go. Our approach has stayed the same: source honestly, stock sensibly and be straightforward with every buyer.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
                <img 
                  src="/about.webp" 
                  alt="Mirai Technologies Mumbai office and component stock room facility" 
                  className="w-full h-[420px] object-cover object-[12%_center]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
                <div className="text-3xl font-black text-mirai-primary">Est. 1999</div>
                <div className="text-xs text-slate-400 mt-1">Lamington Road, Mumbai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MIRAI AT A GLANCE */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Track Record</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Mirai Technologies in Numbers
            </h2>
            <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">1999</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Year we started, in Mumbai</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">25+ years</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Serving Indian manufacturers</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">1,700+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Passive component SKUs (resistors, capacitors, inductors)</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">485+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Diode SKUs in stock</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">340+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Connector SKUs</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">185+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Electromechanical component SKUs</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">20+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Major Indian cities delivered to</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-mirai-primary mb-2 font-heading">24 hours</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Quote response time</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR SOURCING PHILOSOPHY */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Core Principles</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-6 leading-tight">
            Our Sourcing Philosophy: Supply Stability Comes First
          </h2>
          <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p>
              A production line is only as steady as its supply chain. When the market is hit by shortages and grey-market counterfeits, one fake part can scrap a whole batch.
            </p>
            <p>
              That is why we guarantee 100% genuine, traceable parts. We buy directly from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance (CoC).
            </p>
            <p>
              We also carry buffer stock under rolling forecasts. If you share your forecast, we can keep stock ready for you, so a shortage elsewhere does not become a shutdown for you. When a part goes end-of-life or out of stock, our team helps with expert cross-referencing to find a suitable alternative.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT WE SUPPLY */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Inventory Breadth</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              What We Stock
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Active Components
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices. MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay. Plus BJT transistors, microcontrollers and voltage regulators.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Passive Components
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                SMD and through-hole resistors, ceramic, electrolytic and tantalum capacitors, and power inductors.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Diodes, LEDs &amp; Crystals
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zener, Schottky and TVS diodes, LEDs and crystal oscillators.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Connectors &amp; Electromechanical
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pin headers, JST connectors, terminal blocks, FFC/FPC and USB/DC connectors, plus switches and relays.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-mirai-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            >
              View the full product range <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Client Base</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 leading-tight">
              Trusted by OEMs, EMS Companies, R&amp;D Labs and Defence Units
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We work with buyers of every size, from a lab ordering a few parts for a prototype to an EMS plant running a full production schedule. Low MOQ flexibility means smaller buyers aren't ignored, and bigger buyers can plan stock with us.
            </p>
            <p className="text-slate-700 font-bold text-base">
              Our customers work in:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <Check className="w-5 h-5 text-mirai-primary" />
                <span className="font-semibold text-slate-800 text-sm">Automotive electronics</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <Check className="w-5 h-5 text-mirai-primary" />
                <span className="font-semibold text-slate-800 text-sm">Industrial automation</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <Check className="w-5 h-5 text-mirai-primary" />
                <span className="font-semibold text-slate-800 text-sm">Consumer electronics</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <Check className="w-5 h-5 text-mirai-primary" />
                <span className="font-semibold text-slate-800 text-sm">Telecom</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <Check className="w-5 h-5 text-mirai-primary" />
                <span className="font-semibold text-slate-800 text-sm">Power electronics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: QUALITY CERTIFICATIONS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-2">Quality Standards</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">
              Quality, Certified and Documented
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                ISO 9001:2015 Certified
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our quality management system is certified, so our processes are consistent from order to dispatch.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                ANSI/ESD S20.20 Compliant Facility
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Static damages components silently. Our handling facility follows electrostatic-safe practice, so your parts reach you in working condition.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                RoHS / REACH Verification
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We verify components for RoHS and REACH compliance, which helps you with export and customer audits.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Certificate of Conformance
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Genuine parts come with a CoC, giving you the paper trail your quality team asks for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: HOW WE WORK WITH YOU */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Partnership Experience</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              What Working With Mirai Technologies Looks Like
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Fast, Clear Quotes
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Send a BOM or part list. Our engineering and sales team replies within 24 hours with pricing, availability and traceability.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Proper B2B Paperwork
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every order comes with a complete GST invoice, so you can claim Input Tax Credit smoothly.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Real People Who Know Components
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Talk to people who understand the parts. We help with cross-references, alternatives and stock planning.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Delivery Anywhere in India
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We ship from Mumbai to industrial hubs across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: DELIVERY NETWORK */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Pan-India Reach</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Based in Mumbai, Delivering Across India
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Our home is Mumbai's Lamington Road, the city's long-standing electronics market. From here we serve manufacturers in:
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base text-slate-700 font-medium">
              {cities.map((c, idx) => (
                <React.Fragment key={c.name}>
                  <Link 
                    to={c.slug} 
                    className="hover:text-mirai-primary hover:underline transition-colors font-semibold"
                  >
                    {c.name}
                  </Link>
                  {idx < cities.length - 1 && <span className="text-slate-300">|</span>}
                </React.Fragment>
              ))}
              <span className="text-slate-300">|</span>
              <Link 
                to="/market-area" 
                className="text-mirai-primary font-bold hover:underline inline-flex items-center gap-1 ml-1"
              >
                View all cities &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              About Mirai Technologies: Common Questions
            </h2>
            <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden px-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    className="w-full text-left py-2.5 flex justify-between items-center text-slate-800 hover:text-mirai-primary transition-colors focus:outline-none"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="font-heading font-bold text-slate-800 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    {isOpen 
                      ? <ChevronUp className="h-4.5 w-4.5 text-mirai-primary shrink-0" />
                      : <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0" />
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
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 pb-2 text-left">
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

      {/* SECTION 11: CONTACT CTA & ADDRESS */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-2">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">
              Let's Talk About Your Next Production Run
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Send your RFQ, BOM or part number list. We'll respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-3">Phone / WhatsApp</h3>
                {isUnlocked ? (
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><a href="tel:+919321398188" className="hover:text-blue-400">+91 93213 98188</a></p>
                    <p><a href="tel:+919820122744" className="hover:text-blue-400">+91 98201 22744</a></p>
                    <p><a href="tel:+919136810360" className="hover:text-blue-400">+91 91368 10360</a></p>
                  </div>
                ) : (
                  <div className="pt-2 pb-1">
                    <button 
                      onClick={openModal}
                      className="w-full text-center px-4 py-3 rounded-xl text-xs font-bold border border-mirai-primary/30 hover:border-mirai-primary bg-mirai-primary/10 hover:bg-mirai-primary/20 text-white transition-all duration-300 shadow-lg shadow-mirai-primary/5 hover:scale-[1.02] cursor-pointer"
                    >
                      Show Contact Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-3">Email Sourcing Desk</h3>
              <p className="text-sm text-slate-300">
                <a href="mailto:sales@miraitechnologies.net" className="text-blue-400 hover:underline">
                  sales@miraitechnologies.net
                </a>
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg text-white mb-3">Offices in Mumbai</h3>
              <div className="text-xs sm:text-sm text-slate-300 space-y-3">
                <div>
                  <span className="font-bold text-white block">Office / Shipping:</span>
                  401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007
                </div>
                <div>
                  <span className="font-bold text-white block">Registered Address:</span>
                  B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
              className="bg-mirai-primary hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Get a Quote
            </button>
            <Link 
              to="/products"
              className="bg-transparent border border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              View Products &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
