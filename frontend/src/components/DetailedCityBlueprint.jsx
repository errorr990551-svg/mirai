import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, CheckCircle2, ShieldCheck, Award, ArrowRight, 
  ChevronDown, ChevronUp, Cpu, Factory, Building2, Zap, Send, Clock, PackageCheck,
  Phone, Mail, FileText, Layers, Wrench, ShieldAlert
} from 'lucide-react';
import { categories } from '../data/products';
import MosfetCalculator from './MosfetCalculator';
import { useContact } from '../context/ContactContext';

const DetailedCityBlueprint = ({
  page,
  handleFormSubmit,
  formData = {},
  handleInputChange,
  isSubmitting = false,
  submitStatus = null,
  statusMessage = '',
  openFaq = 0,
  setOpenFaq = () => {}
}) => {
  const { isUnlocked, openModal } = useContact();
  if (!page) return null;

  const scrollToForm = () => {
    const el = document.getElementById('city-rfq-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cover bg-[position:10%_center] bg-no-repeat text-white"
        style={{ backgroundImage: "url('/banner.webp')" }}
      >
        <div className="absolute inset-0 bg-slate-950/65 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-8 text-[11px] font-bold tracking-widest text-slate-300 uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2.5 text-slate-500">/</span>
            <Link to="/market-area" className="hover:text-white transition-colors">Market Area</Link>
            <span className="mx-2.5 text-slate-500">/</span>
            <span className="text-white font-extrabold">{page.city}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="inline-flex items-center gap-1.5 bg-mirai-primary text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
                <MapPin className="w-3.5 h-3.5" /> Distributor in {page.city}
              </span>
              <span className="inline-flex items-center bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold text-slate-200">
                State: {page.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {page.heroSub}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={scrollToForm}
                className="bg-mirai-primary hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                {page.heroButtons?.[0]?.text || "Request Instant GST Quote"}
              </button>
              <Link 
                to="/products"
                className="bg-transparent border border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                {page.heroButtons?.[1]?.text || "Browse Products"} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES BAR (if available) */}
      {page.trustBadges && page.trustBadges.length > 0 && (
        <section className="bg-slate-900 border-b border-slate-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {page.trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 leading-tight">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHO WE ARE (if available, e.g. MH pages) */}
      {page.whoWeAre && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Company Background</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-6">
                {page.whoWeAre.h2}
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                {(page.whoWeAre.content || []).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. WHY BUYERS TRUST MIRAI */}
      {page.whyTrust && (
        <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="max-w-4xl space-y-6 text-left">
                <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block">Distributor Integrity</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight">
                  {page.whyTrust.h2}
                </h2>
                <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                  {(page.whyTrust.content || []).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. INDUSTRIAL LANDSCAPE */}
      {page.landscape && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Regional Ecosystem</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.landscape.h2}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(page.landscape.items || []).map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-mirai-primary flex items-center justify-center mb-4">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                    {item.h3}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE SUPPLY (Categorized Component Portfolio for MH pages) */}
      {page.whatWeSupply && (
        <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Complete BOM Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.whatWeSupply.h2}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Active Components */}
              {page.whatWeSupply.categories?.active && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-blue-50 text-mirai-primary rounded-xl">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-slate-900">
                        {page.whatWeSupply.categories.active.title}
                      </h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(page.whatWeSupply.categories.active.items || []).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-mirai-primary shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/products/integrated-circuit" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800 pt-4 border-t border-slate-100"
                  >
                    Browse Active ICs &amp; Semiconductors <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Passive Components */}
              {page.whatWeSupply.categories?.passives && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-slate-900">
                        {page.whatWeSupply.categories.passives.title}
                      </h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(page.whatWeSupply.categories.passives.items || []).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/products/smd-ceramic-capacitor" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800 pt-4 border-t border-slate-100"
                  >
                    Browse 1,700+ Passive SKUs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Diodes, LEDs & Timing */}
              {page.whatWeSupply.categories?.diodes && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-slate-900">
                        {page.whatWeSupply.categories.diodes.title}
                      </h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(page.whatWeSupply.categories.diodes.items || []).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/products" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800 pt-4 border-t border-slate-100"
                  >
                    Browse Diodes &amp; Protection Devices <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Connectors & Electromechanical */}
              {page.whatWeSupply.categories?.connectors && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                        <PackageCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-slate-900">
                        {page.whatWeSupply.categories.connectors.title}
                      </h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(page.whatWeSupply.categories.connectors.items || []).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/products/relay" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800 pt-4 border-t border-slate-100"
                  >
                    Browse Interconnects &amp; Relays <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WHAT LOCAL INDUSTRIES BUY (if available) */}
      {page.industriesBuy && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Industry Demand</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.industriesBuy.h2}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(page.industriesBuy.items || []).map((ind, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm text-left">
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                    {ind.title || ind.h3}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {ind.desc || ind.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOSFET DISTRIBUTOR SECTION (Detailed specs & selection guide) */}
      {page.mosfetDistributor && (
        <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Semiconductor Focus</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.mosfetDistributor.h2}
              </h2>
              {page.mosfetDistributor.intro && (
                <p className="text-slate-600 text-base leading-relaxed">
                  {page.mosfetDistributor.intro}
                </p>
              )}
            </div>

            {/* Applications Grid */}
            {page.mosfetDistributor.applications && page.mosfetDistributor.applications.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                {page.mosfetDistributor.applications.map((app, idx) => {
                  let title = '';
                  let desc = '';
                  if (typeof app === 'string') {
                    const colonIdx = app.indexOf(':');
                    if (colonIdx !== -1) {
                      title = app.slice(0, colonIdx).trim();
                      desc = app.slice(colonIdx + 1).trim();
                    } else {
                      title = app.trim();
                      desc = '';
                    }
                  } else if (app && typeof app === 'object') {
                    title = app.title || app.h3 || '';
                    desc = app.desc || app.content || '';
                  }

                  return (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-left flex items-start gap-3.5 hover:border-mirai-primary hover:shadow-md transition-all">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-mirai-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1.5">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Popular Parts Table */}
            {page.mosfetDistributor.popularParts && page.mosfetDistributor.popularParts.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-14 text-left">
                <div className="p-6 sm:p-8 border-b border-slate-100">
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    High-Demand Power MOSFETs (With Certificate of Conformance)
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Authentic stock available for prototype testing and production batches with GST billing.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-heading">
                        <th className="p-4 font-bold">Part Number</th>
                        <th className="p-4 font-bold">Manufacturer</th>
                        <th className="p-4 font-bold">Channel</th>
                        <th className="p-4 font-bold">Ratings (V_DS / R_DS(on))</th>
                        <th className="p-4 font-bold">Package</th>
                        <th className="p-4 font-bold">Typical Applications</th>
                        <th className="p-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {page.mosfetDistributor.popularParts.map((part, pIdx) => (
                        <tr key={pIdx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-slate-900 font-mono text-xs">{part.partNumber}</td>
                          <td className="p-4 text-slate-600 text-xs">{part.manufacturer}</td>
                          <td className="p-4 text-xs font-semibold text-slate-700">{part.polarity}</td>
                          <td className="p-4 text-xs font-mono text-slate-700 bg-slate-50/50">
                            {part.vDs} | {part.rDsOn} {part.iD ? `| ${part.iD}` : ''}
                          </td>
                          <td className="p-4 text-xs text-slate-600">{part.package}</td>
                          <td className="p-4 text-xs text-slate-600">{part.application}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={scrollToForm}
                              className="inline-flex items-center gap-1 text-xs font-bold text-mirai-primary hover:text-blue-800 cursor-pointer"
                            >
                              Quote &rarr;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* How to Pick Guide */}
            {page.mosfetDistributor.howToPick && (
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-left">
                <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Design Guidance</span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mb-6">
                  {page.mosfetDistributor.howToPick.title || "How to Pick a MOSFET for Your Application"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(page.mosfetDistributor.howToPick.tips || []).map((tip, tIdx) => (
                    <div key={tIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-mirai-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {tIdx + 1}
                      </div>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* MOSFET THERMAL AND POWER LOSS CALCULATOR (Interactive Tool) */}
      {page.mosfetCalculator && (
        <MosfetCalculator 
          calculatorData={page.mosfetCalculator} 
          scrollToForm={scrollToForm} 
        />
      )}

      {/* 4, 5, 6. PRODUCT SECTIONS (For TN and detailed product cities) */}
      {page.productSections && page.productSections.map((sec, sIdx) => (
        <section key={sIdx} className={`py-20 ${sIdx % 2 === 0 ? 'bg-slate-50/60 border-t border-b border-slate-100' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Component Focus</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {sec.h2}
              </h2>
              {sec.intro && (
                <p className="text-slate-600 text-base leading-relaxed">{sec.intro}</p>
              )}
            </div>

            {sec.items && sec.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {sec.items.map((item, iIdx) => (
                  <div key={iIdx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-left flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                        {item.h3}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sec.outro && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-sm font-medium flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-mirai-primary shrink-0" />
                <span>{sec.outro}</span>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* 7. SPECIFICATION SNAPSHOT TABLE (For TN cities) */}
      {page.specSnapshot && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Engineering Quick-Ref</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.specSnapshot.h2 || "Specification Snapshot"}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary rounded-full" />
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs sm:text-sm uppercase tracking-wider font-heading">
                    {(page.specSnapshot.headers || []).map((h, idx) => (
                      <th key={idx} className="p-4 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {(page.specSnapshot.rows || []).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{row.col1}</td>
                      <td className="p-4 text-slate-600">{row.col2}</td>
                      <td className="p-4 font-mono text-xs text-slate-700 bg-slate-50/50">{row.col3}</td>
                      <td className="p-4">
                        <Link 
                          to={row.browseLink || '/products'} 
                          className="inline-flex items-center gap-1 text-xs font-bold text-mirai-primary hover:text-blue-800"
                        >
                          Browse {row.browseText || 'Parts'} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 8. QUALITY AND COMPLIANCE */}
      {page.qualityCompliance && (
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-2">Audit-Ready Paperwork</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4">
                {page.qualityCompliance.h2}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(page.qualityCompliance.points || page.qualityCompliance.items || []).map((pt, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{pt}</p>
                </div>
              ))}
            </div>

            {page.qualityCompliance.registeredAddressNote && (
              <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl text-left text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {page.qualityCompliance.registeredAddressNote}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. SOURCING GUIDE */}
      {page.sourcingGuide && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Procurement Best Practices</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                {page.sourcingGuide.h2}
              </h2>
              <div className="w-16 h-1 bg-mirai-primary rounded-full" />
            </div>

            <div className="space-y-4 max-w-4xl">
              {(page.sourcingGuide.tips || []).map((tip, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
                  <div className="w-7 h-7 rounded-full bg-mirai-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. HOW TO ORDER & SERVICE AREAS */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* How to Order */}
            {page.howToOrder && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
                <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Order Steps</span>
                <h2 className="text-2xl font-heading font-black text-slate-900 mb-6">
                  {page.howToOrder.h2}
                </h2>
                <div className="space-y-4">
                  {(page.howToOrder.steps || []).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-mirai-primary shrink-0 mt-0.5" />
                      <p className="text-slate-700 text-sm font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Areas */}
            {page.serviceAreas && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
                <div>
                  <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Local Delivery Nodes</span>
                  <h2 className="text-2xl font-heading font-black text-slate-900 mb-4">
                    {page.serviceAreas.h2}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {Array.isArray(page.serviceAreas.areas) ? page.serviceAreas.areas.join(' • ') : (page.serviceAreas.areas || '')}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 font-semibold">
                  Express courier &amp; air dispatch directly from Mumbai to your factory gate or testing lab.
                </div>
              </div>
            )}

          </div>

          {/* Contact Details (if available) */}
          {page.contactInfo && (
            <div className="mb-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
              <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Direct Contact Lines</span>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">
                Sourcing &amp; Procurement Desk
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div className="p-4 bg-slate-50 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
                      <Phone className="w-4 h-4 text-mirai-primary" /> Phone / WhatsApp
                    </div>
                    {isUnlocked ? (
                      <p className="font-mono text-xs text-slate-700">{page.contactInfo.phones?.join(' | ') || "+91 93213 98188"}</p>
                    ) : (
                      <button 
                        onClick={openModal}
                        className="w-full text-center px-3 py-2 rounded-xl text-xs font-bold border border-mirai-primary/30 hover:border-mirai-primary bg-mirai-primary/10 hover:bg-mirai-primary/20 text-mirai-primary transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        Show Contact Details
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                    <Building2 className="w-4 h-4 text-mirai-primary" /> Office &amp; Shipping
                  </div>
                  <p className="text-xs text-slate-700">{page.contactInfo.office || "401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007"}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                    <FileText className="w-4 h-4 text-mirai-primary" /> Registered Address
                  </div>
                  <p className="text-xs text-slate-700">{page.contactInfo.registered || "B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034"}</p>
                </div>
              </div>
            </div>
          )}

          {/* City FAQs */}
          {page.faqs && page.faqs.length > 0 && (
            <div className="max-w-4xl mx-auto mb-20 text-left">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-4">
                  {page.city} FAQs
                </h2>
                <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden px-6">
                {page.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        className="w-full text-left py-2 flex justify-between items-center text-slate-800 hover:text-mirai-primary transition-colors focus:outline-none cursor-pointer"
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
                      {isOpen && (
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 pb-2">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Embedded RFQ Form */}
          <div id="city-rfq-form" className="max-w-4xl mx-auto bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4 text-center">
              Request a Component Quote for {page.city}
            </h3>
            <p className="text-slate-300 text-sm text-center mb-8">
              Share your part numbers, BOM, or target quantities. Our engineering sales desk replies within 24 hours.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  required
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData?.name || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mirai-primary placeholder-slate-400"
                />
                <input 
                  required
                  type="text"
                  name="company"
                  placeholder="Company Name *"
                  value={formData?.company || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mirai-primary placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  required
                  type="email"
                  name="email"
                  placeholder="Official Email Address *"
                  value={formData?.email || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mirai-primary placeholder-slate-400"
                />
                <input 
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone / WhatsApp Number *"
                  value={formData?.phone || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mirai-primary placeholder-slate-400"
                />
              </div>

              <textarea 
                required
                rows={3}
                name="message"
                placeholder="Component part numbers, package, and quantities (e.g., IRFZ44N - 100 pcs, LM358 - 200 pcs, 0805 10k resistors - 5000 pcs) *"
                value={formData?.message || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mirai-primary placeholder-slate-400 resize-none"
              />

              {submitStatus && (
                <div className={`p-4 rounded-xl text-xs font-semibold ${
                  submitStatus === 'success' 
                    ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-700' 
                    : 'bg-rose-900/60 text-rose-200 border border-rose-700'
                }`}>
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-mirai-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>

          {/* Internal Links & Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-xs text-slate-500 text-left">
            <span className="font-bold block mb-2 text-slate-800 uppercase tracking-wider">Related Regional Hubs:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              {(page.internalLinks || []).map((link, idx) => (
                <Link key={idx} to={link.url} className="text-mirai-primary hover:underline font-semibold flex items-center gap-1">
                  {link.text} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>

            <span className="font-bold block mb-2 text-slate-800 uppercase tracking-wider">Browse Product Lines:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              {(categories || []).slice(0, 10).map((cat) => (
                <Link key={cat.slug} to={`/products/${cat.slug}`} className="hover:text-mirai-primary hover:underline">
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="text-center pt-4 border-t border-slate-100 text-slate-400">
              <Link to="/market-area" className="text-mirai-primary font-bold hover:underline">
                View All Manufacturing Hubs Across India &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default DetailedCityBlueprint;
