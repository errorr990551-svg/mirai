import React from 'react';
import { Phone, Mail, MapPin, Building, ArrowRight } from 'lucide-react';

const HomeContactSection = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-2">Mumbai Sourcing Desk</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">
            Talk to Our Sourcing Team in Mumbai
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Planning a production run? Send your RFQ, BOM or part number list and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Phones */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3">Phone / WhatsApp</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p><a href="tel:+919321398188" className="hover:text-blue-400 transition-colors">+91 93213 98188</a></p>
                <p><a href="tel:+919820122744" className="hover:text-blue-400 transition-colors">+91 98201 22744</a></p>
                <p><a href="tel:+919136810360" className="hover:text-blue-400 transition-colors">+91 91368 10360</a></p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Direct line to BOM sourcing engineers
            </div>
          </div>

          {/* Email & Quote CTA */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3">Email Sourcing Desk</h3>
              <p className="text-sm text-slate-300 mb-4">
                <a href="mailto:sales@miraitechnologies.net" className="text-blue-400 hover:underline font-semibold">
                  sales@miraitechnologies.net
                </a>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Send your Excel BOM, manufacturer part numbers, or target quantities for same-day quotation.
              </p>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
              className="w-full bg-mirai-primary hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Addresses */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3">Office &amp; Registered Addresses</h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div>
                  <span className="font-bold text-white block mb-1">Office / Shipping Address:</span>
                  <p className="text-slate-400">
                    401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007
                  </p>
                </div>
                <div>
                  <span className="font-bold text-white block mb-1">Registered Address:</span>
                  <p className="text-slate-400">
                    B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              Lamington Road Electronic Components Hub, Mumbai
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
