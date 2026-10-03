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
import ContactUnlockModal from './components/ContactUnlockModal';
import { ContactProvider } from './context/ContactContext';
import ScrollToTop from './components/ScrollToTop';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import MarketArea from './components/MarketArea';
import CitySEOPage from './components/CitySEOPage';
import cityPages from './data/cityPages.json';



import ApplicationsListPage from './components/ApplicationsListPage';
import ApplicationPage from './components/ApplicationPage';
import CategoryDistributorPage from './components/CategoryDistributorPage';
import AuthorizedBrandsPage from './components/AuthorizedBrandsPage';
import RedirectHandler from './components/RedirectHandler';

import HomeProductSections from './components/HomeProductSections';
import HomeQualityAndDelivery from './components/HomeQualityAndDelivery';
import HomeContactSection from './components/HomeContactSection';

function SitemapRedirect() {
  useEffect(() => {
    window.location.replace('/sitemap.xml');
  }, []);
  return null;
}

function Home() {
  useEffect(() => {
    updateMeta(
      'Electronic Components Distributor in Mumbai, India | Mirai Technologies',
      'Authorized electronic components distributor in Mumbai since 1999. Genuine ICs, MOSFETs, microcontrollers, capacitors, resistors and connectors with CoC, GST invoice and pan-India delivery.',
      'electronic components distributor India, semiconductor distributor Mumbai, buy electronic components India',
      'Mirai Technologies',
      'Mirai Technologies'
    );
    injectOrganizationSchema();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <HomeProductSections />
      <IndustriesSection />
      <HomeQualityAndDelivery />
      <FAQSection />
      <HomeContactSection />
    </>
  );
}

function App() {
  useEffect(() => {
    // Wake up Render backend on app mount
    const apiUrl = import.meta.env.VITE_API_URL || 'https://mirai.errorr990551.workers.dev/api';
    const healthUrl = apiUrl.endsWith('/api') 
      ? apiUrl.replace(/\/api$/, '/health') 
      : `${apiUrl}/health`;
    
    fetch(healthUrl)
      .then(res => console.log('Backend server keep-warm ping status:', res.status))
      .catch(err => console.warn('Backend server keep-warm ping failed:', err));
  }, []);

  return (
    <ContactProvider>
      <Router>
        <ScrollToTop />
        <RedirectHandler />
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
          <PopupForm />
          <ContactUnlockModal />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/certificate" element={<Certifications />} />
            
            {/* Dedicated Pillar & Distributor Routes */}
            <Route path="/authorized-distributor-brands" element={<AuthorizedBrandsPage />} />
            <Route path="/mosfet-distributor" element={<CategoryDistributorPage pageSlug="mosfet-distributor" />} />
            <Route path="/transistor-distributor" element={<CategoryDistributorPage pageSlug="transistor-distributor" />} />
            <Route path="/microcontroller-distributor" element={<CategoryDistributorPage pageSlug="microcontroller-distributor" />} />
            <Route path="/voltage-regulator-distributor" element={<CategoryDistributorPage pageSlug="voltage-regulator-distributor" />} />
            <Route path="/diode-rectifier-distributor" element={<CategoryDistributorPage pageSlug="diode-rectifier-distributor" />} />
            <Route path="/optocoupler-distributor" element={<CategoryDistributorPage pageSlug="optocoupler-distributor" />} />
            <Route path="/igbt-distributor" element={<CategoryDistributorPage pageSlug="igbt-distributor" />} />
            <Route path="/ic-distributor" element={<CategoryDistributorPage pageSlug="ic-distributor" />} />

            {/* Products catalog – optional :categorySlug for filtered views */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categorySlug" element={<ProductsPage />} />
            {/* Product detail – wildcard supports multi-segment slugs like /product/integrated-circuit/lm358ld08t */}
            <Route path="/product/*" element={<ProductDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rfq" element={<Contact />} />
            <Route path="/bom-upload" element={<Contact />} />
            <Route path="/quote" element={<Contact />} />
            <Route path="/applications" element={<ApplicationsListPage />} />
            <Route path="/applications/:slug" element={<ApplicationPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/market-area" element={<MarketArea />} />
            <Route path="/sitemap" element={<SitemapRedirect />} />
            <Route path="/sitemap.xml" element={<SitemapRedirect />} />
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
    </ContactProvider>
  );
}

export default App;
