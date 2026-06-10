import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Globe, MapPin, Building2,
  Send
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = 'sales@miraitechnologies.net';
    const cc = 'vp390123@gmail.com,errorr990551@gmail.com';
    const subject = `Contact Form Inquiry from ${formData.name} - ${formData.company}`;
    const body = `Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}`;

    const mailtoUrl = `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 20 }
    }
  };



  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mirai-primary/20 to-mirai-accent/20 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-pink-500/10 to-mirai-primary/20 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHkiPSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div 
              initial="hidden" animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-sm font-bold tracking-widest text-mirai-primary uppercase mb-4 inline-block bg-mirai-primary/10 px-4 py-1.5 rounded-full">
                Contact Mirai Technologies
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                Get Your Quote in<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mirai-primary to-mirai-accent">24 Hours – Guaranteed</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                Submit your RFQ, BOM, or part list today. Our sourcing experts will respond with competitive pricing, full availability, and traceability within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Contact Information */}
            <motion.div 
              className="lg:col-span-5 space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Contact Info Card */}
              <motion.div variants={itemVariants} className="bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mirai-primary/20 rounded-full blur-[80px] -z-10" />
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Phone className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Phone / WhatsApp</div>
                      <div className="font-medium text-lg">+91 93213 98188</div>
                      <div className="font-medium text-lg">+91 98201 22744</div>
                      <div className="font-medium text-lg">+91 91368 10360</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Mail className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Email</div>
                      <a href="mailto:sales@miraitechnologies.net" className="font-medium text-lg hover:text-mirai-primary transition-colors block">sales@miraitechnologies.net</a>
                      <a href="mailto:nehas@miraitechnologies.net" className="font-medium text-lg hover:text-mirai-primary transition-colors block">nehas@miraitechnologies.net</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Globe className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Website</div>
                      <a href="https://www.miraitechnologies.net" target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-mirai-primary transition-colors">www.miraitechnologies.net</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      <Building2 className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">LinkedIn</div>
                      <a href="#" className="font-medium text-lg hover:text-mirai-primary transition-colors">mirai-technologies-global</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Addresses Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Addresses</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl shrink-0">
                      <MapPin className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">Shipping Address</div>
                      <p className="font-medium text-slate-800 leading-relaxed">
                        401, Aditya Residency, Chunabhatti Lane,<br/>
                        Lamington Road, Mumbai 400 007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl shrink-0">
                      <Building2 className="w-6 h-6 text-mirai-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">Billing Address</div>
                      <p className="font-medium text-slate-800 leading-relaxed">
                        1101 B, Kinjal Heights,<br/>
                        Tardeo, Mumbai 400 034
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>



            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              className="lg:col-span-7"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-8">Send Us a Message</h3>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Phone No</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Company Name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Message</label>
                    <textarea 
                      rows="4" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mirai-primary/50 focus:border-mirai-primary transition-all placeholder-slate-400 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-mirai-primary hover:bg-opacity-90 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-5 h-5 ml-1" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    By submitting, you agree our team will contact you regarding your inquiry. We never share your data.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Contact;
