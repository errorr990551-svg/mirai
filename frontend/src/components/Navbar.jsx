import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ProductsDropdown from './ProductsDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenProducts = () => {
      setProductsDropdownOpen(true);
    };
    window.addEventListener('open-products-dropdown', handleOpenProducts);
    return () => window.removeEventListener('open-products-dropdown', handleOpenProducts);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      path: '/about',
      submenu: [
        { name: 'About Us', path: '/about' },
        { name: 'Certificate', path: '/certificate' }
      ]
    },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const getLinkClass = (link) => {
    let isActive = false;
    if (link.submenu) {
      isActive = link.submenu.some(sub => location.pathname === sub.path);
    } else if (link.name === 'Products') {
      isActive = location.pathname.startsWith('/product');
    } else {
      isActive = location.pathname === link.path;
    }

    return isActive 
      ? 'text-mirai-primary font-bold' 
      : 'text-slate-600 hover:text-mirai-primary';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm ${isScrolled || mobileMenuOpen ? 'py-4' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div 
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                      <button
                        className={`transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 focus:outline-none ${getLinkClass(link)}`}
                      >
                        {link.name}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none"
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50 origin-top-left"
                          >
                            {/* Top Accent Highlight Bar (matching hint screenshot style) */}
                            <div className="h-1 w-full bg-mirai-primary" />
                            
                            <div className="py-1">
                              {link.submenu.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  onClick={() => setAboutDropdownOpen(false)}
                                  className={`block px-4 py-3 text-sm transition-colors ${
                                    location.pathname === sub.path
                                      ? 'text-mirai-primary bg-mirai-primary/5 font-semibold'
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-mirai-primary'
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.name === 'Products') {
                  return (
                    <div 
                      key={link.name}
                      className="group py-2"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <button
                        className={`transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 focus:outline-none ${getLinkClass(link)}`}
                      >
                        {link.name}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none"
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {productsDropdownOpen && (
                          <ProductsDropdown closeMenu={() => setProductsDropdownOpen(false)} />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${getLinkClass(link)}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rfq'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-mirai-primary text-white font-semibold px-6 py-2 rounded-md flex items-center shadow-md shadow-blue-500/30 hover:shadow-lg transition-shadow"
            >
              Request a Quote &rarr;
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
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
          className="md:hidden bg-white shadow-sm absolute top-full left-0 w-full border-t border-slate-350"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <div key={link.name} className="space-y-1">
                    <span className="block px-3 py-1 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                      {link.name}
                    </span>
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className={`w-full text-left block px-6 py-2 rounded-md text-base font-medium ${
                          location.pathname === sub.path ? 'text-mirai-primary bg-mirai-primary/10' : 'text-slate-600 hover:text-mirai-primary hover:bg-slate-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path ? 'text-mirai-primary bg-mirai-primary/10' : 'text-slate-600 hover:text-mirai-primary hover:bg-slate-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-rfq'));
              }}
              className="w-full text-left bg-mirai-primary text-white font-semibold px-3 py-2 rounded-md mt-4"
            >
              Request a Quote &rarr;
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
