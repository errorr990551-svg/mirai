import React from 'react';
import { motion } from 'framer-motion';

import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import img12 from '../assets/12.jpeg';
import img13 from '../assets/13.png';

const PartnersSection = () => {
  const clientLogos = [
    img1, img2, img3, img4, img5, img6, img7, img8, img10, img11, img12, img13
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Our Clients</h2>
          <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full"></div>
        </div>

        {/* Brand Marquee - Single Flow Row */}
        <div className="relative overflow-hidden py-4">
          {/* Fade gradients at edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <motion.div 
            className="flex gap-16 w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 25, 
              repeat: Infinity 
            }}
          >
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-center h-16 w-40 shrink-0"
              >
                <img 
                  src={logo} 
                  alt={`Client Logo ${idx + 1}`} 
                  className="max-h-full max-w-full object-contain opacity-95 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
