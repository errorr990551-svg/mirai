import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PopupForm = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log("PopupForm path check:", pathname);
    // If the user is on the contact page, don't show the popup
    if (pathname === '/contact') {
      console.log("PopupForm: Blocked (currently on /contact page)");
      return;
    }

    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('mirai_has_seen_popup');
    console.log("PopupForm hasSeenPopup status:", hasSeenPopup);
    
    if (!hasSeenPopup) {
      console.log("PopupForm: Initializing 3-second timer...");
      const timer = setTimeout(() => {
        console.log("PopupForm: Timer finished, showing popup.");
        setIsOpen(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      console.log("PopupForm: Blocked (user already dismissed or submitted the popup previously)");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('mirai_has_seen_popup', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    handleClose();
  };

  const inquiryOptions = [
    { value: "rfq", label: "Request for Quote (RFQ)" },
    { value: "bom", label: "BOM Sourcing" },
    { value: "hard-to-find", label: "Hard to Find / Obsolete Parts" },
    { value: "other", label: "Other Inquiry" }
  ];

  if (pathname === '/contact') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl z-10 my-4"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5 sm:p-6 max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-black text-slate-900 mb-1">
                  Submit Your RFQ
                </h2>
                <p className="text-sm text-slate-600">
                  Fill in your requirements and our team will respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">First Name *</label>
                    <input type="text" placeholder="Your first name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Last Name *</label>
                    <input type="text" placeholder="Your last name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Company Name *</label>
                  <input type="text" placeholder="Your company name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Business Email *</label>
                    <input type="email" placeholder="your@company.com" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Phone / WhatsApp *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Inquiry Type *</label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-slate-50 border ${isDropdownOpen ? 'border-mirai-primary ring-2 ring-mirai-primary/50' : 'border-slate-200'} text-left rounded-xl px-4 py-2 focus:outline-none transition-all flex items-center justify-between text-sm`}
                    >
                      <span className={inquiryType ? 'text-slate-900' : 'text-slate-400'}>
                        {inquiryType ? inquiryOptions.find(opt => opt.value === inquiryType)?.label : "Select inquiry type"}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-50 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden"
                        >
                          {inquiryOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setInquiryType(option.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors text-sm ${inquiryType === option.value ? 'bg-mirai-primary/5 text-mirai-primary font-semibold' : 'text-slate-700'}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Message</label>
                  <textarea 
                    placeholder="Any additional specifications, quality requirements, or questions..." 
                    rows="2"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 resize-none text-sm" 
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-mirai-primary to-mirai-accent text-white font-bold text-base px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  Submit RFQ – Get Quote in 24 Hours <span className="text-yellow-300">✦</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
