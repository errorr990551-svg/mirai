import React from 'react';
import { Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#030712] pt-24 pb-8 text-slate-400 relative overflow-hidden">
      {/* Huge background text */}
      <div className="absolute -bottom-10 left-0 w-full text-center select-none pointer-events-none opacity-[0.02] font-black text-[20vw] leading-none text-white">
        MIRAI
      </div>
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mirai-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mirai-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Company Info - Spans 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center flex-shrink-0 cursor-pointer">
              <div className="bg-mirai-primary/20 p-2 rounded-lg mr-3">
                <Zap className="h-6 w-6 text-mirai-primary" fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-wide text-white">
                Mirai <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">Technologies</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              India's trusted electronic components distributor since 1999. ISO 9001:2015 certified. Supplying ICs, MOSFETs, IGBTs, MCUs & 2000+ component types from 40+ global brands.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-slate-300">ISO 9001:2015</span>
              <span className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-slate-300">DUNS Registered</span>
            </div>
          </div>

          {/* Links - Spans 8 cols */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-[-4px] left-0 w-8 h-0.5 bg-mirai-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Products
                <span className="absolute bottom-[-4px] left-0 w-8 h-0.5 bg-mirai-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">ICs / Microchips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MOSFETs & IGBTs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Power Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Capacitors</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Contact
                <span className="absolute bottom-[-4px] left-0 w-8 h-0.5 bg-mirai-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><span className="block text-slate-600 text-xs mb-1">Sales</span> <a href="tel:+919321398188" className="hover:text-white transition-colors text-slate-300">+91 93213 98188</a></li>
                <li><span className="block text-slate-600 text-xs mb-1">Email</span> <a href="mailto:sales@miraitechnologies.net" className="hover:text-white transition-colors text-slate-300">sales@miraitechnologies.net</a></li>
                <li><span className="block text-slate-600 text-xs mb-1">Location</span> <span className="text-slate-300">Mumbai, India</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-slate-600">
          <p>&copy; 2026 Mirai Technologies. All rights reserved.</p>
          <p className="text-right">
            Designed and Promoted By <a href="https://errorr.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Errorr.in</a> - Best Digital Marketing Company in India.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
