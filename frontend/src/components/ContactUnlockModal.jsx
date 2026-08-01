import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useContact } from '../context/ContactContext';

const ContactUnlockModal = () => {
  const { isModalOpen, closeModal, unlockDetails } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    company: '',
    message: 'Requesting access to contact details'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mirai.errorr990551.workers.dev/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Details submitted successfully!');
        unlockDetails();
        
        // Auto-close modal after 2 seconds on success
        setTimeout(() => {
          closeModal();
          setSubmitStatus(null);
          setStatusMessage('');
          setFormData({
            name: '',
            phone: '',
            email: '',
            location: '',
            company: '',
            message: 'Requesting access to contact details'
          });
        }, 2000);
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

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5 sm:p-6 max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 pr-10">
                  Fill details to get email & phone number
                </h2>
                <p className="text-xs text-slate-500">
                  Please submit your details below to unlock our sales contact information immediately.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Phone No *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com" 
                      required 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name" 
                      disabled={isSubmitting}
                      className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, India" 
                    disabled={isSubmitting}
                    className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 text-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-gradient-to-r from-mirai-primary to-mirai-accent hover:from-mirai-primary/90 hover:to-mirai-accent/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit to View Details
                    </>
                  )}
                </button>

                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl text-center text-xs font-semibold ${
                      submitStatus === 'success' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactUnlockModal;
