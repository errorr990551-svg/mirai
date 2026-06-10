import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Calendar, Clock, ArrowLeft, 
  ChevronUp, ChevronDown, CheckCircle2, 
  Cpu, FileText, BookOpen
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../data/blog';
import { updateMeta } from '../utils/seo';

// Cleanup helper to strip prefix markers like "H2: " or "**" from TOC items and headings
const cleanHeadingText = (text) => {
  return text
    .replace(/^H[234]:\s*/i, '')
    .replace(/\*\*/g, '')
    .trim();
};

// Helper to extract headings from markdown content
const extractHeadings = (markdown) => {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const headings = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace('## ', '').trim();
      // Skip main SEO H1 inside markdown if any
      if (text.startsWith('H1:')) return;
      const cleanText = cleanHeadingText(text);
      const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ text: cleanText, id, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace('### ', '').trim();
      const cleanText = cleanHeadingText(text);
      const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ text: cleanText, id, level: 3 });
    }
  });
  return headings;
};

// Helper to extract FAQs dynamically from markdown body
const parseFaqsFromMarkdown = (body) => {
  if (!body) return [];
  
  const faqHeaderRegex = /##\s*(?:H2:\s*)?Frequently Asked Questions/i;
  const match = body.match(faqHeaderRegex);
  if (!match) return [];
  
  const faqStartIndex = match.index;
  const faqContent = body.slice(faqStartIndex + match[0].length);
  
  const nextHeaderRegex = /\n##\s/;
  const nextHeaderMatch = faqContent.slice(1).match(nextHeaderRegex);
  const faqSectionText = (nextHeaderMatch && nextHeaderMatch.index !== undefined)
    ? faqContent.slice(0, nextHeaderMatch.index + 1)
    : faqContent;
  
  const lines = faqSectionText.split('\n');
  const faqs = [];
  let currentFaq = null;
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    const isH3Question = trimmed.startsWith('### ');
    const isBoldNumberedQuestion = trimmed.startsWith('**') && trimmed.endsWith('**') && /\d+\.\s*/.test(trimmed);
    const isBoldNumberedQuestionAlt = trimmed.startsWith('**') && /\*\*/.test(trimmed) && /\d+\.\s*/.test(trimmed) && trimmed.split('**')[1] && trimmed.split('**')[1].includes('?');
    
    if (isH3Question || isBoldNumberedQuestion || isBoldNumberedQuestionAlt) {
      if (currentFaq && currentFaq.q && currentFaq.a) {
        faqs.push(currentFaq);
      }
      
      let qText = '';
      if (isH3Question) {
        qText = trimmed.replace('### ', '');
      } else if (isBoldNumberedQuestion) {
        qText = trimmed.replace(/\*\*/g, '').replace(/^\d+\.\s*/, '');
      } else {
        qText = trimmed.split('**')[1].replace(/^\d+\.\s*/, '').trim();
      }
      
      currentFaq = { q: cleanHeadingText(qText), a: '' };
    } else {
      if (currentFaq) {
        currentFaq.a += (currentFaq.a ? '\n' : '') + trimmed;
      }
    }
  });
  
  if (currentFaq && currentFaq.q && currentFaq.a) {
    faqs.push(currentFaq);
  }
  
  return faqs;
};

// Helper to filter FAQ block and final raw CTA section out of markdown body so it doesn't render twice
const getCleanBody = (body) => {
  if (!body) return '';
  const faqHeaderRegex = /\n##\s*(?:H2:\s*)?Frequently Asked Questions/i;
  const match = body.match(faqHeaderRegex);
  let cleaned = body;
  
  if (match) {
    const faqStartIndex = match.index;
    const beforeFaq = body.slice(0, faqStartIndex);
    const faqContent = body.slice(faqStartIndex);
    
    const nextHeaderRegex = /\n##\s/;
    const nextHeaderMatch = faqContent.slice(1).match(nextHeaderRegex);
    
    if (nextHeaderMatch && nextHeaderMatch.index !== undefined) {
      const nextHeaderIndex = nextHeaderMatch.index + 1;
      const afterFaq = faqContent.slice(nextHeaderIndex);
      cleaned = beforeFaq + '\n' + afterFaq;
    } else {
      cleaned = beforeFaq;
    }
  }
  
  // Strip the final markdown CTA section (e.g. ### Submit Your RFQ) located after the Conclusion
  const ctaHeaderRegex = /\n###\s*(?:[^\n]*)(?:RFQ|BOM|Quote|CTA)(?:[^\n]*)/i;
  const conclusionMatch = cleaned.match(/\n##\s*(?:H2:\s*)?Conclusion/i);
  
  if (conclusionMatch && conclusionMatch.index !== undefined) {
    const conclusionIndex = conclusionMatch.index;
    const conclusionText = cleaned.slice(conclusionIndex);
    const ctaMatch = conclusionText.match(ctaHeaderRegex);
    if (ctaMatch && ctaMatch.index !== undefined) {
      cleaned = cleaned.slice(0, conclusionIndex + ctaMatch.index);
    }
  } else {
    // Fallback: search in the last 1500 characters
    const thresholdIndex = Math.max(0, cleaned.length - 1500);
    const endText = cleaned.slice(thresholdIndex);
    const ctaMatch = endText.match(ctaHeaderRegex);
    if (ctaMatch && ctaMatch.index !== undefined) {
      cleaned = cleaned.slice(0, thresholdIndex + ctaMatch.index);
    }
  }
  
  return cleaned;
};

// Helper to parse bold markdown and link syntaxes in paragraphs
const parseInlineContent = (text) => {
  if (!text) return '';
  const elements = [];
  const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
  
  let match;
  let lastIndex = 0;
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    
    if (matchIndex > lastIndex) {
      elements.push(text.slice(lastIndex, matchIndex));
    }
    
    if (match[1].startsWith('**')) {
      elements.push(<strong key={key++} className="font-bold text-slate-800">{match[2]}</strong>);
    } else if (match[1].startsWith('[')) {
      const linkText = match[3];
      const url = match[4];
      const isInternal = url.startsWith('/') || url.includes('miraitechnologies.net');
      const cleanUrl = url.replace('https://miraitechnologies.net', '');
      
      if (isInternal && cleanUrl.startsWith('/')) {
        elements.push(
          <Link key={key++} to={cleanUrl} className="text-mirai-primary hover:text-mirai-accent font-semibold hover:underline">
            {linkText}
          </Link>
        );
      } else {
        elements.push(
          <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="text-mirai-primary hover:text-mirai-accent font-semibold hover:underline">
            {linkText}
          </a>
        );
      }
    }
    
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }
  
  return elements.length > 0 ? elements : text;
};

// ── FAQ Accordion Item ────────────────────────────────────────────────────────
function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-3 py-4 px-1 hover:text-mirai-primary transition-colors"
      >
        <span className="text-sm font-bold text-slate-800 leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-mirai-primary shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="text-sm text-slate-600 leading-relaxed pb-4 px-1 whitespace-pre-line">
              {parseInlineContent(a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Simple Custom Markdown Parser Component ───────────────────────────────────
const MarkdownRenderer = ({ markdown }) => {
  if (!markdown) return null;

  const blocks = markdown.split(/\n\n+/);

  let inList = false;
  let inOrderedList = false;
  let listItems = [];

  const flushLists = (elements, key) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="space-y-3 mb-6 text-sm text-slate-600 leading-relaxed pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      inList = false;
      listItems = [];
    }
    if (inOrderedList && listItems.length > 0) {
      elements.push(
        <ol key={`ol-${key}`} className="space-y-3 mb-6 text-sm text-slate-600 leading-relaxed pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-50 text-mirai-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
      inOrderedList = false;
      listItems = [];
    }
  };

  const parsedElements = [];

  blocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    const firstLine = lines[0] || '';

    // 1. Check if heading
    if (firstLine.startsWith('# ')) {
      flushLists(parsedElements, index);
      return;
    }

    if (firstLine.startsWith('## ')) {
      flushLists(parsedElements, index);
      const text = firstLine.replace('## ', '');
      const cleanText = cleanHeadingText(text);
      const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      parsedElements.push(
        <h2 id={id} key={index} className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-8 mb-4 scroll-mt-24">
          {cleanText}
        </h2>
      );
      return;
    }

    if (firstLine.startsWith('### ')) {
      flushLists(parsedElements, index);
      const text = firstLine.replace('### ', '');
      const cleanText = cleanHeadingText(text);
      const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      parsedElements.push(
        <h3 id={id} key={index} className="text-base sm:text-lg font-heading font-bold text-slate-900 mt-6 mb-3 scroll-mt-24">
          {cleanText}
        </h3>
      );
      return;
    }

    // 2. Check if table
    if (firstLine.startsWith('|')) {
      flushLists(parsedElements, index);
      
      const tableRows = lines.filter(line => !line.includes('| :---') && !line.includes('| ---'));
      
      if (tableRows.length > 0) {
        const renderRow = (row, isHeader = false) => {
          const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          return cells.map((cell, cIdx) => {
            return isHeader ? (
              <th key={cIdx} className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                {parseInlineContent(cell)}
              </th>
            ) : (
              <td key={cIdx} className="px-4 py-3 text-xs text-slate-600 border-b border-slate-100">
                {parseInlineContent(cell)}
              </td>
            );
          });
        };

        const headerLine = tableRows[0];
        const bodyLines = tableRows.slice(1);

        parsedElements.push(
          <div key={index} className="overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">{renderRow(headerLine, true)}</tr>
              </thead>
              <tbody>
                {bodyLines.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                    {renderRow(row)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return;
    }

    // 3. Check if list block
    const isBulletListLine = firstLine.startsWith('* ') || firstLine.startsWith('- ');
    const isOrderedListLine = /^\d+\.\s*/.test(firstLine);

    if (isBulletListLine) {
      if (inOrderedList) flushLists(parsedElements, index);
      inList = true;
      lines.forEach(line => {
        const text = line.replace(/^[\*\-]\s+/, '').trim();
        listItems.push(parseInlineContent(text));
      });
      return;
    }

    if (isOrderedListLine) {
      if (inList) flushLists(parsedElements, index);
      inOrderedList = true;
      lines.forEach(line => {
        const text = line.replace(/^\d+\.\s+/, '').trim();
        listItems.push(parseInlineContent(text));
      });
      return;
    }

    // 4. Default Paragraph
    flushLists(parsedElements, index);
    
    const fullText = block.trim();
    parsedElements.push(
      <p key={index} className="text-sm text-slate-600 leading-relaxed mb-5 font-sans">
        {parseInlineContent(fullText)}
      </p>
    );
  });

  flushLists(parsedElements, 'final');

  return <div className="prose prose-slate max-w-none">{parsedElements}</div>;
};

// ── Main Component ────────────────────────────────────────────────────────────
const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = getPostBySlug(slug);
  
  // Extract and clean layout elements
  const headings = post ? extractHeadings(post.body) : [];
  const parsedFaqs = post ? parseFaqsFromMarkdown(post.body) : [];
  const cleanBody = post ? getCleanBody(post.body) : '';
  const displayFaqs = parsedFaqs.length > 0 ? parsedFaqs : (post ? post.faqs : []);

  // Auto-scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Update SEO meta and schemas
  useEffect(() => {
    if (post) {
      updateMeta(
        post.seoTitle || `${post.title} | Mirai Technologies Blog`,
        post.metaDescription || post.excerpt
      );
    }
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-xs">
          The requested sourcing guide could not be located in our database.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-2 bg-mirai-primary hover:bg-mirai-accent text-white font-bold px-6 py-2.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);

  const triggerRFQ = () => {
    window.dispatchEvent(new CustomEvent('open-rfq'));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-5">
          <Link to="/" className="hover:text-mirai-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-mirai-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* ── Back Button ── */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-mirai-primary transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </button>
        </div>

        {/* ── MAIN ARTICLE CONTAINER ── */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm mb-10">
          
          {/* Category + Read Time */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="bg-indigo-50 text-mirai-primary text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg uppercase">
              {post.category}
            </span>
            <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
              • <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 text-center leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Date metadata */}
          <div className="flex items-center justify-center gap-3 pb-8 border-b border-slate-100 mb-8">
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-mirai-primary font-bold text-sm flex items-center justify-center border border-indigo-100">
              MS
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight">{post.author}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Published on {post.publishDate}</span>
            </div>
          </div>

          {/* Collapsible Jump to Section (In-Article Table of Contents) */}
          {headings.length > 0 && (
            <div className="mb-8 max-w-3xl mx-auto bg-slate-50 border border-slate-200/60 rounded-2xl p-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-black uppercase tracking-wider text-slate-500 select-none">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-mirai-primary" />
                    Jump to Section
                  </span>
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </span>
                </summary>
                <nav className="grid sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200/40">
                  {headings.map((h, index) => (
                    <a
                      key={index}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`text-xs font-medium text-slate-600 hover:text-mirai-primary hover:underline block truncate ${
                        h.level === 3 ? 'pl-3 text-slate-500' : ''
                      }`}
                    >
                      {cleanHeadingText(h.text)}
                    </a>
                  ))}
                </nav>
              </details>
            </div>
          )}

          {/* Main Content Area */}
          <div className="prose prose-slate max-w-3xl mx-auto text-slate-600 font-sans text-left">
            <MarkdownRenderer markdown={cleanBody} />
          </div>

          {/* FAQs Section */}
          {displayFaqs?.length > 0 && (
            <div className="border-t border-slate-100 mt-10 pt-8 max-w-3xl mx-auto">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-950 mb-4 text-center">
                Key FAQs & Sourcing Answers
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-2xl p-4 bg-slate-50/50">
                {displayFaqs.map((faq, idx) => (
                  <FaqItem key={idx} q={faq.q} a={faq.a} idx={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Sourcing Callout/CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-8 mt-12 text-center relative overflow-hidden max-w-3xl mx-auto border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_35%)]" />
            <Cpu className="w-8 h-8 text-mirai-accent mx-auto mb-3" />
            <h4 className="text-base font-heading font-black tracking-tight mb-2">
              Consolidated BOM Sourcing Service
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Upload your full parts bill. Receive a comprehensive quotation with genuine parts, full traceability, and compliant GST invoices within 24 hours.
            </p>
            <button
              onClick={triggerRFQ}
              className="bg-mirai-primary hover:bg-opacity-90 text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              Request a Quote
            </button>
          </div>

        </div>

        {/* ── RELATED POSTS SECTION ── */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-slate-200/60 pt-12">
            <h3 className="text-center font-heading font-extrabold text-xl text-slate-900 tracking-tight uppercase mb-8">
              Related Sourcing Guides
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <div key={rp.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-mirai-primary/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {rp.category.split(' & ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {rp.readTime} min
                    </span>
                  </div>
                  <Link
                    to={`/blog/${rp.slug}`}
                    className="text-sm font-heading font-bold text-slate-800 group-hover:text-mirai-primary transition-colors line-clamp-2 leading-snug hover:underline mb-4 flex-1"
                  >
                    {rp.title}
                  </Link>
                  <Link
                    to={`/blog/${rp.slug}`}
                    className="text-xs font-bold text-mirai-primary flex items-center gap-1 hover:text-mirai-accent mt-auto"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>
    </div>
  );
};

export default BlogPostPage;
