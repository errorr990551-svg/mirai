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
  const gridLogos = [
    { src: img1, invert: false }, // onsemi
    { src: img3, invert: false, scale: 1.35 }, // Samsung
    { src: img4, invert: false }, // Weidy
    { src: img5, invert: false }, // Yageo
    { src: img6, invert: false }, // Nexperia
    { src: img7, invert: false }, // Toshiba
    { src: img8, invert: false }, // NXP
    { src: img10, invert: false, scale: 1.25 }, // Analog Devices
    { src: img13, invert: false }, // Infineon
    { src: "/WhatsApp Image 2026-06-11 at 11.33.28 AM (3).jpeg", invert: true }, // On-Bright
    { src: "/WhatsApp Image 2026-06-11 at 11.33.29 AM (1).jpeg", invert: true }, // BPS
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM (1).jpeg", invert: true }, // Silergy
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM (2).jpeg", invert: true }, // Lite-On
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM (3).jpeg", invert: true }, // Everlight
    { src: "/WhatsApp Image 2026-06-11 at 11.33.30 AM.jpeg", invert: true }, // Silan
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM (3).jpeg", invert: true }, // Zoetic Power
    { src: "/WhatsApp Image 2026-06-11 at 11.33.31 AM.jpeg", invert: true }, // XL Smart
    { src: "/WhatsApp Image 2026-06-11 at 11.33.32 AM (3).jpeg", invert: true }, // Renesas
    { src: "/Walsin.jpg.jpeg", invert: false, scale: 1.3 }, // Walsin
    { src: "/bourns.png", invert: false, scale: 1.25 }, // Bourns
    { src: "/hornby.png", invert: false, scale: 1.25 }, // Hornby
    { src: "/iksemicon.jpeg", invert: false, scale: 1.15 }, // KSemicon
    { src: "/microchip1.png", invert: false }, // Microchip
    { src: "/royalohm.jpeg", invert: false, scale: 1.15 }, // Royalohm
    { src: "/stmicro.png", invert: false, scale: 1.3 }, // STMicroelectronics
    { src: "/taejin.png", invert: false, scale: 1.6, clipPath: "inset(6.5% 18%)" }, // Taejin
    { src: "/texas instruments.jpeg", invert: false }, // Texas Instruments
    { src: "/utc.jpeg", invert: false } // UTC
  ];

  return (
    <section className="py-20 bg-slate-50 relative border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Our Channel Partners</h2>
          <div className="w-16 h-1 bg-mirai-primary mx-auto rounded-full mb-4"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by leading manufacturers and global electronic component brands.
          </p>
        </div>

        {/* Brand Grid Container */}
        <div className="max-w-6xl mx-auto bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px]">
          {gridLogos.map((logo, idx) => {
            const spacersBefore = [];
            if (idx === 24) {
              spacersBefore.push(
                <div key="spacer-lg-before" className="hidden lg:block bg-white h-24 sm:h-28" />
              );
            }
            if (idx === 27) {
              spacersBefore.push(
                <div key="spacer-sm-before" className="hidden sm:block md:hidden bg-white h-24 sm:h-28" />
              );
            }

            const renderLogo = (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
                className="bg-white p-3 sm:p-4 flex items-center justify-center h-24 sm:h-28 hover:bg-slate-50/50 hover:shadow-inner transition-all duration-300 group cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <img 
                    src={logo.src} 
                    alt={`Partner Brand Logo ${idx + 1}`} 
                    style={{
                      transform: logo.scale ? `scale(${logo.scale})` : undefined,
                      clipPath: logo.clipPath || undefined
                    }}
                    className={`max-h-full max-w-full object-contain ${logo.invert ? 'invert' : ''}`}
                  />
                </div>
              </motion.div>
            );

            const spacersAfter = [];
            if (idx === 27) {
              spacersAfter.push(
                <div key="spacer-sm-after" className="hidden sm:block md:hidden bg-white h-24 sm:h-28" />
              );
              spacersAfter.push(
                <div key="spacer-lg-after" className="hidden lg:block bg-white h-24 sm:h-28" />
              );
            }

            return (
              <React.Fragment key={`group-${idx}`}>
                {spacersBefore}
                {renderLogo}
                {spacersAfter}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
