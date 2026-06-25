import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, BookOpen, ArrowRight, Cpu } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { updateMeta } from '../utils/seo';

// Category style mapping for consistent premium tags & accent borders
const categoryStyles = {
  'Sourcing & Supply Chain': {
    bg: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100',
    shadow: 'hover:shadow-blue-500/5',
    accent: 'from-blue-500 to-blue-600'
  },
  'Semiconductors': {
    bg: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100',
    shadow: 'hover:shadow-amber-500/5',
    accent: 'from-amber-500 to-amber-600'
  },
  'Quality & Procurement': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100',
    shadow: 'hover:shadow-emerald-500/5',
    accent: 'from-emerald-500 to-emerald-600'
  },
  'Applications & Verticals': {
    bg: 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100',
    shadow: 'hover:shadow-sky-500/5',
    accent: 'from-sky-500 to-sky-600'
  },
  'default': {
    bg: 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100',
    shadow: 'hover:shadow-slate-500/5',
    accent: 'from-slate-400 to-slate-500'
  }
};

const getCategoryStyle = (cat) => {
  return categoryStyles[cat] || categoryStyles['default'];
};

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    updateMeta(
      'Sourcing Guides & Industry Insights | Mirai Technologies Blog',
      'Read professional semiconductor sourcing articles, electronic procurement guides, EV components analysis, and supply chain best practices from Mirai Technologies Mumbai.',
      'semiconductor blog, electronic components sourcing, procurement guides, manufacturing supply chain, EV component analysis, Mirai Technologies blog'
    );
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Sourcing & Supply Chain', 'Semiconductors', 'Quality & Procurement', 'Applications & Verticals'];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.secondaryKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24 font-sans">
      
      {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
      <section className="py-12 mb-10 relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-blue-50 border border-blue-100 text-mirai-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
              Knowledge Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Mirai Sourcing Guides & Insights
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Expert articles, supply chain forecasts, and technical guides curated for hardware designers and procurement leads in India.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white p-4 border border-slate-200/60 rounded-2xl shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:pb-0 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-mirai-primary text-white border-mirai-primary shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 bg-slate-50 border-slate-200/50 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mirai-primary/15 focus:border-mirai-primary transition-all font-medium"
            />
          </div>
        </div>

        {/* ── ARTICLES GRID ─────────────────────────────────────────────── */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => {
              const catStyle = getCategoryStyle(post.category);
              return (
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  className={`bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col overflow-hidden group hover:border-slate-300 hover:shadow-md ${catStyle.shadow} transition-all duration-200`}
                >
                  {/* Category Accent Top Border */}
                  <div className={`h-1.5 bg-gradient-to-r ${catStyle.accent}`} />

                  <div className="p-5 flex-1 flex flex-col">
                    
                    {/* Category + Read Time */}
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-3">
                      <span className={`px-2 py-0.5 rounded border font-semibold ${catStyle.bg}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-mirai-primary transition-colors leading-snug line-clamp-2 mb-2">
                      <Link to={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Footer Meta */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                        <Calendar className="w-3 h-3" />
                        <span>{post.publishDate}</span>
                      </div>
                      
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-xs font-bold text-mirai-primary hover:text-mirai-accent flex items-center gap-1 group/btn"
                      >
                        Read Article
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <h3 className="text-base font-black text-slate-800 mb-1">No Articles Found</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              We couldn't find any articles matching your search query. Try typing a different keyword or category.
            </p>
          </div>
        )}

        {/* ── BOTTOM CONVERSION BLOCK ───────────────────────────────────── */}
        <section className="mt-16 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)] pointer-events-none" />
          
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-6 h-6 text-mirai-accent" />
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight mb-2">
            Looking for a Semiconductor Supply Partner?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            Get genuine active and passive parts directly from authorized sources with full traceability. Upload your BOM and let our Mumbai team quote it within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <button
              onClick={() => {
                if (window.openMiraiRFQ) {
                  window.openMiraiRFQ();
                } else {
                  window.dispatchEvent(new CustomEvent('open-rfq'));
                }
              }}
              className="bg-mirai-primary hover:bg-opacity-90 text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
            >
              Request a Quote
            </button>
            <Link
              to="/products"
              className="bg-transparent border-2 border-white/80 hover:border-white text-white text-xs font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center uppercase tracking-wider shadow-sm hover:shadow"
            >
              Browse Products
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BlogPage;
