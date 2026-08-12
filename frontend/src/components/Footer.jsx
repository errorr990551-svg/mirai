import React from 'react';
import { Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContact } from '../context/ContactContext';

const Footer = () => {
  const { isUnlocked, openModal } = useContact();
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
              Independent B2B stockist and distributor of active and passive electronic components in Mumbai since 1999. ISO 9001:2015 certified. Supplying ICs, MOSFETs, IGBTs, MCUs &amp; 2000+ component types for OEMs and EMS manufacturers across India.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-slate-300">ISO 9001:2015</span>
              <span className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-slate-300">GSTIN Aware</span>
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
                <li><Link to="/products" className="hover:text-white transition-colors">Products Catalog</Link></li>
                <li><Link to="/applications" className="hover:text-white transition-colors">Applications &amp; BOMs</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Technical Articles</Link></li>
                <li><Link to="/market-area" className="hover:text-white transition-colors">Delivery Hubs</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Categories
                <span className="absolute bottom-[-4px] left-0 w-8 h-0.5 bg-mirai-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/products/integrated-circuit" className="hover:text-white transition-colors">Integrated Circuits</Link></li>
                <li><Link to="/products/mosfet-transistor" className="hover:text-white transition-colors">Power MOSFETs</Link></li>
                <li><Link to="/products/igbts" className="hover:text-white transition-colors">IGBTs &amp; Thyristors</Link></li>
                <li><Link to="/products/microcontrollers" className="hover:text-white transition-colors">Microcontrollers</Link></li>
                <li><Link to="/products/diodes-rectifiers" className="hover:text-white transition-colors">Diodes &amp; Rectifiers</Link></li>
              </ul>
            </div>
 
             {/* Contact */}
             <div>
               <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                 Contact &amp; HQ
                 <span className="absolute bottom-[-4px] left-0 w-8 h-0.5 bg-mirai-primary"></span>
               </h3>
               <ul className="space-y-4 text-sm">
                 {isUnlocked ? (
                   <>
                     <li><span className="block text-slate-600 text-xs mb-1">Sales Hotline</span> <a href="tel:+919321398188" className="hover:text-white transition-colors text-slate-300">+91 93213 98188</a></li>
                     <li><span className="block text-slate-600 text-xs mb-1">RFQ Email</span> <a href="mailto:sales@miraitechnologies.net" className="hover:text-white transition-colors text-slate-300">sales@miraitechnologies.net</a></li>
                   </>
                 ) : (
                   <li className="pt-1 pb-1">
                     <button 
                       onClick={openModal}
                       className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold border border-mirai-primary/30 hover:border-mirai-primary bg-mirai-primary/10 hover:bg-mirai-primary/20 text-white transition-all duration-300 shadow-lg shadow-mirai-primary/5 hover:scale-[1.02]"
                     >
                       Show Contact Details
                     </button>
                   </li>
                 )}
                 <li>
                   <span className="block text-slate-600 text-xs mb-1">Registered Address</span>
                   <span className="text-slate-300 block leading-relaxed text-xs">
                     B-1101, Kinjal Heights Wing B, Wadia Street,<br/>
                     Near Tardeo Bus Terminal, Mumbai, Maharashtra 400034
                   </span>
                 </li>
               </ul>
             </div>
           </div>

         </div>

          {/* We Deliver Across India (Primary City Hubs & Matrix) */}
          <div className="pt-8 border-t border-white/5 mb-8">
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Industrial Delivery Hubs &amp; Specialised Regional Supply</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
              <Link to="/electronic-components-supplier-mumbai" className="hover:text-white transition-colors">Mumbai HQ</Link>
              <Link to="/electronic-components-supplier-pune" className="hover:text-white transition-colors">Pune</Link>
              <Link to="/electronic-components-supplier-bengaluru" className="hover:text-white transition-colors">Bengaluru</Link>
              <Link to="/electronic-components-supplier-chennai" className="hover:text-white transition-colors">Chennai</Link>
              <Link to="/electronic-components-supplier-delhi-ncr" className="hover:text-white transition-colors">Delhi NCR</Link>
              <Link to="/electronic-components-supplier-ahmedabad" className="hover:text-white transition-colors">Ahmedabad</Link>
              <Link to="/electronic-components-supplier-hyderabad" className="hover:text-white transition-colors">Hyderabad</Link>
              <Link to="/electronic-components-supplier-coimbatore" className="hover:text-white transition-colors">Coimbatore</Link>
              <span className="text-slate-600">|</span>
              <Link to="/market-area" className="text-mirai-primary hover:text-white font-bold transition-colors">View all 25 industrial hubs &rarr;</Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-slate-600">
           <p>&copy; 2026 Mirai Technologies. All rights reserved. Registered Address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034.</p>
         </div>

      </div>
    </footer>
  );
};

export default Footer;
