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
  const originalLogos = [
    { src: img1, invert: false },
    { src: img3, invert: false }, // Removed img2 (duplicate onsemi)
    { src: img4, invert: false },
    { src: img5, invert: false },
    { src: img6, invert: false },
    { src: img7, invert: false },
    { src: img8, invert: false },
    { src: img10, invert: false },
    { src: img11, invert: false },
    { src: img12, invert: false },
    { src: img13, invert: false }
  ];

  const newLogos = [
    { src: "/WhatsApp Image 2026-06-11 at 11.33.28 AM (2).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.28 AM (3).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.28 AM.jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.29 AM (1).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.29 AM (2).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM (2).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM (3).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM.jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM (1).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM (2).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM (3).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM.jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.32 AM (1).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.32 AM (2).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.32 AM (3).jpeg", invert: true },
    { src: "/WhatsApp Image 2026-06-11 at 11.33.32 AM.jpeg", invert: true }
  ];

  // Combine original and new logos, appending non-duplicate items at the end to make exactly 30 cells
  const gridLogos = [...originalLogos, ...newLogos, originalLogos[1], originalLogos[2], originalLogos[3]];

  return (
    <section className="py-20 bg-slate-50 relative border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Our Clients</h2>
          <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full mb-4"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by leading manufacturers and global electronic component brands.
          </p>
        </div>

        {/* Brand Grid Container */}
        <div className="max-w-6xl mx-auto bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px]">
          {gridLogos.map((logo, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
              className="bg-white p-6 flex items-center justify-center h-24 sm:h-28 hover:bg-slate-50/50 hover:shadow-inner transition-all duration-300 group cursor-pointer"
            >
              <img 
                src={logo.src} 
                alt={`Partner Brand Logo ${idx + 1}`} 
                className={`max-h-full max-w-full object-contain transition-all duration-300 ease-in-out transform group-hover:scale-105 ${logo.invert ? 'invert' : ''}`}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
