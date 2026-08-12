import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, ArrowRight, CheckCircle2, ShieldCheck, FileText, UserCheck, 
  HelpCircle, Send, Zap, ChevronRight, BookOpen, Layers
} from 'lucide-react';
import { updatePageSEO, injectApplicationSchema } from '../utils/seo';
import { applicationsData } from '../data/applicationsData';

const ApplicationPage = () => {
  const { slug } = useParams();
  const application = applicationsData.find(app => app.slug === slug);

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
          location: 'Application Page RFQ',
          message: `[BOM RFQ from ${application?.title}] ${formData.message}`
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Your application RFQ has been received! We will contact you within 2 hours.');
        setFormData({ name: '', phone: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please call +91 93213 98188 or email sales@miraitechnologies.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (application) {
      updatePageSEO(
        application.metaTitle,
        application.metaDescription,
        `https://miraitechnologies.net/applications/${application.slug}`,
        'index, follow',
        application.title,
        application.metaDescription,
        `${application.primaryKeyword}, ${application.secondaryKeywords}`,
        application.author,
        'Mirai Technologies'
      );
      injectApplicationSchema(application);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [application, slug]);

  if (!application) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-400 mb-4">Application Guide Not Found</h2>
        <Link to="/applications" className="text-mirai-primary font-bold hover:underline">
          &larr; Return to Applications Catalog
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
          
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-slate-600">/</span>
            <Link to="/applications" className="hover:text-white transition-colors">Applications</Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-mirai-primary font-extrabold">{application.slug}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-mirai-primary/20 border border-mirai-primary/40 px-3 py-1 rounded-full text-xs font-bold text-mirai-primary uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> B2B Engineering Application Guide
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              {application.title}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {application.heroContent}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-400 font-medium">
              <UserCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Technical Author: <strong className="text-slate-200">{application.author}</strong> (Mirai Technologies Engineering Desk)</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TECHNICAL WALKTHROUGH & CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {application.sections.map((sec, idx) => (
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

              {/* 3. RECOMMENDED PARTS & BOM TABLE */}
              <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-md space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-mirai-primary uppercase tracking-widest block">Bill of Materials (BOM)</span>
                    <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">Featured Components for this Application</h2>
                  </div>
                  <Cpu className="h-8 w-8 text-mirai-primary" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-700 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-extrabold uppercase text-xs">
                        <th className="py-3.5 px-4">Part Number</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Specifications</th>
                        <th className="py-3.5 px-4">Application Role</th>
                        <th className="py-3.5 px-4 text-right">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {application.bom.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-mirai-primary">
                            <Link to={`/products/${item.slug}`} className="hover:underline flex items-center gap-1.5">
                              {item.partNumber} <ArrowRight className="h-3 w-3" />
                            </Link>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600">{item.category}</td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">{item.specs}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-semibold">{item.applicationRole || item.application}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              In Stock
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-500 italic pt-2">
                  * All listed parts are available in stock at our Mumbai warehouse with original batch codes and GST invoices.
                </p>
              </div>

            </div>

            {/* Right RFQ Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-xl sticky top-28 space-y-6 border border-slate-800">
                <div>
                  <h3 className="text-xl font-heading font-black text-white mb-2">Request Application BOM Quote</h3>
                  <p className="text-xs text-slate-400">
                    Get wholesale pricing and lead time quotes for component BOMs. Response time within 2 hours.
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
                        placeholder="John Doe"
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
                        placeholder="procurement@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">BOM / Quantities Required</label>
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
                      {isSubmitting ? 'Sending Request...' : 'Submit Application RFQ'} <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Direct GST Billing &amp; Batch Traceability</p>
                  <p className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-400" /> 24-48 Hour Dispatch Across India</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ApplicationPage;
