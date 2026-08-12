import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';
import { applicationsData } from '../data/applicationsData';

const ApplicationsListPage = () => {
  useEffect(() => {
    updatePageSEO(
      'B2B Engineering Application Guides & BOM Specifications | Mirai Tech',
      'Technical application guides for solar inverters, welding machines, SMPS repair, EV chargers, motor drives & UPS systems. Component BOM specifications and direct RFQ sourcing.',
      'https://miraitechnologies.net/applications',
      'index, follow',
      'B2B Application Guides',
      'Component BOM specifications & engineering guides.',
      'solar inverter components, welding igbt, smps repair parts, ev charger power components, motor drive components, ups components',
      'Mirai Technologies',
      'Mirai Technologies'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-28 pb-20 overflow-hidden">
      
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-mirai-primary/20 border border-mirai-primary/40 px-3.5 py-1 rounded-full text-xs font-bold text-mirai-primary uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Component Application Guides
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white">
            B2B Component Solutions &amp; Application BOMs
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            In-depth circuit topology walkthroughs, failure mode analyses, and recommended component BOMs written for design and procurement engineers.
          </p>
        </div>
      </section>

      {/* Grid of Applications */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationsData.map((app) => (
              <div 
                key={app.slug} 
                className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-xl hover:border-mirai-primary/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-mirai-primary/10 rounded-2xl w-fit text-mirai-primary group-hover:bg-mirai-primary group-hover:text-white transition-colors">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-heading font-black text-slate-900 group-hover:text-mirai-primary transition-colors">
                    {app.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {app.metaDescription}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Author: {app.author}</span>
                  <Link 
                    to={`/applications/${app.slug}`} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ApplicationsListPage;
