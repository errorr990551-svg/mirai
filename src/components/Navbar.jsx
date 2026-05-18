import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/60 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center flex-shrink-0 cursor-pointer"
          >
            <div className="bg-mirai-primary/20 p-2 rounded-lg mr-3">
              <Zap className="h-6 w-6 text-mirai-primary" fill="currentColor" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-wide text-mirai-primary">
              Mirai Tech
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === link.path ? 'text-mirai-primary font-bold' : 'text-slate-600 hover:text-mirai-primary'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-mirai-primary text-white font-semibold px-6 py-2 rounded-md flex items-center shadow-md shadow-blue-500/30 hover:shadow-lg transition-shadow"
            >
              Get RFQ &rarr;
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-sm absolute top-full left-0 w-full border-t border-slate-300"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'text-mirai-primary bg-mirai-primary/10' : 'text-slate-600 hover:text-mirai-primary hover:bg-slate-50'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full text-left bg-mirai-primary text-white font-semibold px-3 py-2 rounded-md mt-4">
              Get RFQ &rarr;
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
