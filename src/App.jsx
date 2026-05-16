import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PartnersSection from './components/PartnersSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-mirai-dark font-sans text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PartnersSection />
      <StatsSection />
      <IndustriesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
