import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PopupForm = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const handleOpenRFQ = (e) => {
      console.log("PopupForm: Received open-rfq event", e.detail);
      setIsOpen(true);
      window.miraiPopupShown = true; // Mark as shown on manual trigger
      if (e.detail && e.detail.product) {
        setFormData(prev => ({
          ...prev,
          message: `Sourcing Inquiry for: ${e.detail.product}. `
        }));
      }
    };
    window.addEventListener('open-rfq', handleOpenRFQ);

    window.openMiraiRFQ = (productName) => {
      console.log("PopupForm: openMiraiRFQ called", productName);
      setIsOpen(true);
      window.miraiPopupShown = true;
      if (productName) {
        setFormData(prev => ({
          ...prev,
          message: `Sourcing Inquiry for: ${productName}. `
        }));
      }
    };

    return () => {
      window.removeEventListener('open-rfq', handleOpenRFQ);
      delete window.openMiraiRFQ;
    };
  }, []);

  useEffect(() => {
    // If the user is on the contact page, don't show the popup
    if (pathname === '/contact') {
      return;
    }

    // Check if popup has already been shown in this SPA session
    if (window.miraiPopupShown) {
      console.log("PopupForm: Already shown in this session, skipping navigation trigger.");
      return;
    }

    // Trigger popup on page load/reload
    const timer = setTimeout(() => {
      setIsOpen(true);
      window.miraiPopupShown = true; // Mark as shown
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
          company: '',
          message: ''
        });
        // Auto-close modal after 2.5 seconds on success
        setTimeout(() => {
          handleClose();
          setSubmitStatus(null);
          setStatusMessage('');
        }, 2500);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 block">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 block">Phone No</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 block">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 block">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 block">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, India" 
                    disabled={isSubmitting}
                    className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 block">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    rows="4"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 resize-none text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                  ></textarea>
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-xl text-sm font-semibold border ${
                    submitStatus === 'success' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {statusMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-mirai-primary hover:bg-opacity-90 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                </button>

                <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
                  By submitting, you agree our team will contact you regarding your inquiry. We never share your data.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
