import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, FileText, Send, Clock, PackageCheck, MapPin, ArrowRight } from 'lucide-react';

const HomeQualityAndDelivery = () => {
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

  return (
    <div className="bg-white">
      {/* SECTION 9: QUALITY & CERTIFICATIONS */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-2">Compliance &amp; Quality</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">
              Quality You Can Show Your Auditor
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Counterfeit parts cost far more than the price you saved. That's why every order passes through a quality-first process:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                ISO 9001:2015
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Certified quality management system for consistent and verified sourcing operations.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                ANSI/ESD S20.20
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Compliant, electrostatic-safe handling facility protecting sensitive semiconductors.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                RoHS / REACH
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Environmental and safety compliance verification for export and domestic audits.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Certificate of Conformance
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                CoC provided on genuine parts, sourced directly from manufacturers or authorized franchise lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HOW IT WORKS */}
      <section className="py-20 bg-slate-50/60 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Procurement Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              From BOM to Delivery in Three Simple Steps
            </h2>
            <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-mirai-primary flex items-center justify-center mb-6">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                1. Send Your RFQ
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Share your BOM, part number list or requirement by email, WhatsApp or the quote form.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                2. Get Your Quote Within 24 Hours
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our engineering and sales team replies with competitive pricing, availability and traceability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                3. Receive Genuine Parts with a GST Invoice
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We dispatch across India, and you get full documentation for ITC and compliance.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
              className="bg-mirai-primary text-white font-bold px-9 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            >
              Submit Your BOM
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: DELIVERY ACROSS INDIA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Nationwide Footprint</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Electronic Component Distributor Near You, Delivering Pan-India
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We ship from Mumbai to manufacturing hubs across the country. Pick your city to see local supply details:
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70">
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
    </div>
  );
};

export default HomeQualityAndDelivery;
