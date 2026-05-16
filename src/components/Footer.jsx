import React from 'react';
import { Zap, Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mirai-darker pt-20 pb-8 border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center flex-shrink-0 cursor-pointer">
              <div className="bg-mirai-cyan/20 p-2 rounded-lg mr-3">
                <Zap className="h-6 w-6 text-mirai-cyan" fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-wide text-white">
                Mirai <span className="text-mirai-cyan">Technologies</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              India's trusted electronic components distributor since 1999. ISO 9001:2015 certified. Supplying ICs, MOSFETs, IGBTs, MCUs & 2000+ component types from 40+ global brands.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-mirai-card border border-white/10 px-3 py-1.5 rounded text-mirai-cyan">ISO 9001:2015</span>
              <span className="text-xs font-semibold bg-mirai-card border border-white/10 px-3 py-1.5 rounded text-mirai-cyan">DUNS Registered</span>
              <span className="text-xs font-semibold bg-mirai-card border border-white/10 px-3 py-1.5 rounded text-mirai-cyan">IndiaMart Verified</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-mirai-card border border-white/10 px-3 py-1.5 rounded">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono text-yellow-500">GSTIN: 27DEHPB416SC1ZR</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Submit RFQ</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">ICs / Microchips</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">MOSFETs & IGBTs</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Transistors & Diodes</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Capacitors</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">Resistors</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">MCUs & MPUs</a></li>
              <li><a href="#" className="hover:text-mirai-cyan transition-colors">LEDs & Displays</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li><span className="block text-gray-500 text-xs mb-1">Sales</span> <a href="tel:+919321398188" className="hover:text-white transition-colors">+91 93213 98188</a></li>
              <li><span className="block text-gray-500 text-xs mb-1">Support</span> <a href="tel:+919820122744" className="hover:text-white transition-colors">+91 98201 22744</a></li>
              <li><span className="block text-gray-500 text-xs mb-1">Email</span> <a href="mailto:sales@miraitechnologies.net" className="hover:text-white transition-colors">sales@miraitechnologies.net</a></li>
              <li><span className="block text-gray-500 text-xs mb-1">Website</span> <a href="#" className="hover:text-white transition-colors">www.miraitechnologies.net</a></li>
              <li><span className="block text-gray-500 text-xs mb-1">Location</span> Mumbai, Maharashtra, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p>&copy; 2026 Mirai Technologies. All rights reserved. | Established 1999 | Mumbai, India</p>
          <p className="text-right">Electronic Components Distributor | ISO 9001:2015 | GSTIN: 27DEHPB416SC1ZR</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
