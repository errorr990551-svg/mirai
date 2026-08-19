import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Cpu, Send, Layers, 
  HelpCircle, ChevronRight, Award, Truck, Check, FileText
} from 'lucide-react';
import { updatePageSEO, injectFAQSchema } from '../utils/seo';
import { categoryDistributorData } from '../data/categoryDistributorData';

const CategoryDistributorPage = ({ pageSlug }) => {
  const { slug } = useParams();
  const targetSlug = pageSlug || slug;
  const data = categoryDistributorData[targetSlug];

  // RFQ Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mirai.errorr990551.workers.dev/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: `Distributor Page RFQ - ${data?.h1}`,
          message: `[Distributor RFQ for ${data?.h1}] ${formData.message}`
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSubmitStatus('success');
        setStatusMessage(resData.message || 'RFQ received! Our engineering desk will send pricing within 2 business hours.');
        setFormData({ name: '', phone: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(resData.message || 'Submission failed. Please call +91 93213 98188.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please call +91 93213 98188 or email sales@miraitechnologies.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      updatePageSEO(
        data.metaTitle,
        data.metaDescription,
        `https://miraitechnologies.net/${data.slug}`,
        'index, follow',
        data.title,
        data.metaDescription,
        data.h1,
        data.author,
        'Mirai Technologies'
      );
      if (data.faqs) {
        injectFAQSchema(data.faqs);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data, targetSlug]);

  if (!data) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-400 mb-4">Distributor Category Page Not Found</h2>
        <Link to="/products" className="text-mirai-primary font-bold hover:underline">
          &larr; View Products Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-hidden pt-28 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mirai-primary/20 via-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex mb-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-slate-600">/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-mirai-primary font-extrabold">{data.h1}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-mirai-primary/20 border border-mirai-primary/40 px-3 py-1 rounded-full text-xs font-bold text-mirai-primary uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Authorized B2B Distributor Channel
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              {data.h1}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {data.intro}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 100% Genuine Factory Traceability
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <ShieldCheck className="w-4 h-4" /> Low MOQ &amp; GST Invoicing
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Truck className="w-4 h-4" /> Mumbai Stock — Pan-India Delivery
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Sections */}
              {data.sections.map((sec, idx) => (
                <div key={idx} className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 flex items-center gap-3">
                    <span className="w-2 h-7 bg-mirai-primary rounded-full" />
                    {sec.heading}
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                    {sec.content}
                  </p>
                </div>
              ))}

              {/* Package Specs Comparison Table */}
              {data.packageTable && (
                <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-mirai-primary uppercase tracking-widest block">Specifications Guide</span>
                      <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">Package Types &amp; Ratings Breakdown</h2>
                    </div>
                    <Layers className="h-8 w-8 text-mirai-primary" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-extrabold uppercase text-xs">
                          <th className="py-3.5 px-4">Package</th>
                          <th className="py-3.5 px-4">Mounting</th>
                          <th className="py-3.5 px-4">Power / Current Rating</th>
                          <th className="py-3.5 px-4">Typical Applications</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.packageTable.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-mirai-primary font-mono text-xs">{item.packageType}</td>
                            <td className="py-3.5 px-4 font-medium text-slate-600">{item.mounting}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-semibold">{item.powerRating}</td>
                            <td className="py-3.5 px-4 text-slate-700">{item.typicalUse}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Featured In-Stock Parts */}
              {data.featuredParts && (
                <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Mumbai Warehouse Stock</span>
                      <h2 className="text-xl font-heading font-black text-white">Popular In-Stock Part Numbers</h2>
                    </div>
                    <Cpu className="h-6 w-6 text-emerald-400" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.featuredParts.map((part, idx) => (
                      <div key={idx} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-mirai-primary text-base font-mono">{part.partNumber}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">In Stock</span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono">{part.specs}</p>
                        <p className="text-[11px] text-slate-400">Brand: <strong className="text-white">{part.brand}</strong></p>
                        <p className="text-[11px] text-slate-400">Role: {part.application}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <Link to={`/products/${data.categorySlug}`} className="inline-flex items-center gap-2 text-xs font-bold text-mirai-primary hover:underline">
                      Explore all in-stock parts in catalog &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQ Accordion Section */}
              {data.faqs && data.faqs.length > 0 && (
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-mirai-primary" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {data.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                        <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar Form */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-xl sticky top-28 space-y-6 border border-slate-800">
                <div>
                  <h3 className="text-xl font-heading font-black text-white mb-2">Request Bulk RFQ Quote</h3>
                  <p className="text-xs text-slate-400">
                    Get wholesale volume pricing, batch date codes, and delivery schedules within 2 business hours.
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold space-y-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    <p>{statusMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
                        {statusMessage}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="Procurement Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Mobile / Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Company / Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="sourcing@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">BOM / Part Numbers Required</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mirai-primary"
                        placeholder="Enter part numbers & target quantities..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-mirai-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-mirai-primary/20"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Submit Bulk RFQ'} <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Direct GST Billing &amp; Batch CoC</p>
                  <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-blue-400" /> 2 Business Hour Quote Turnaround</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default CategoryDistributorPage;
