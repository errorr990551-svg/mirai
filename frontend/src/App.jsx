import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { updateMeta, injectOrganizationSchema } from './utils/seo';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import PartnersSection from './components/PartnersSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import CTASection from './components/CTASection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import PopupForm from './components/PopupForm';
import ScrollToTop from './components/ScrollToTop';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import MarketArea from './components/MarketArea';
import CitySEOPage from './components/CitySEOPage';
import cityPages from './data/cityPages.json';



function Home() {
  useEffect(() => {
    updateMeta(
      'Buy Electronic Components Online India | Mirai Technologies',
      'Mirai Technologies – authorized distributor and stockist of active and passive electronic components in Mumbai since 1999. Genuine ICs, MOSFETs, transistors, microcontrollers, and optocouplers with pan-India delivery and GST invoice.'
    );
    injectOrganizationSchema();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PartnersSection />
      <StatsSection />
      <IndustriesSection />
      <CTASection />
      <FAQSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
        <PopupForm />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/certificate" element={<Certifications />} />
          {/* Products catalog – optional :categorySlug for filtered views */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categorySlug" element={<ProductsPage />} />
          {/* Product detail – wildcard supports multi-segment slugs like /product/integrated-circuit/lm358ld08t */}
          <Route path="/product/*" element={<ProductDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/market-area" element={<MarketArea />} />
          {cityPages.map((page) => (
            <Route key={page.slug} path={page.slug} element={<CitySEOPage page={page} />} />
          ))}
          <Route path="*" element={
            <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center">
              <h2 className="text-3xl font-bold text-slate-400">Page under construction</h2>
            </div>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
