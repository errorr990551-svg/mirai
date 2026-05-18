import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PartnersSection from './components/PartnersSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PopupForm from './components/PopupForm';


function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PartnersSection />
      <StatsSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
        <PopupForm />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
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
