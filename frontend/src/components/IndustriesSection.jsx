import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plug, Car, Sun, Factory, Plane, Radio, Zap, BatteryCharging, Bot, Activity, Signal } from 'lucide-react';

const IndustriesSection = () => {
  const industriesList = [
    {
      title: "Automotive electronics",
      desc: "Wide-temperature SMD resistors, MOSFETs, TVS protection",
      image: "/automotive.webp",
      icon: <Car className="text-red-500" />
    },
    {
      title: "Industrial automation",
      desc: "Microcontrollers, relays, terminal blocks, optocouplers",
      image: "/industrialautomation.webp",
      icon: <Factory className="text-orange-500" />
    },
    {
      title: "Consumer electronics",
      desc: "USB connectors, LEDs, voltage regulators, MLCCs",
      image: "/consumer electronics.webp",
      icon: <Smartphone className="text-pink-500" />
    },
    {
      title: "Telecom",
      desc: "RF-grade capacitors, crystals and oscillators, ICs",
      image: "/telecommunication.webp",
      icon: <Signal className="text-sky-500" />
    },
    {
      title: "Power electronics",
      desc: "MOSFETs, IGBTs, inductors, rectifiers",
      image: "/power.webp",
      icon: <Zap className="text-amber-500" />
    }
  ];

  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <p className="text-mirai-primary font-bold text-xs uppercase tracking-widest mb-2">Target Sectors</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 mb-4">
            Components for the Industries That Build India
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            We supply OEMs, EMS companies, R&amp;D labs and defence units, across:
          </p>
        </div>

        {/* Grid of 5 key sectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {industriesList.map((ind, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col h-full rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img 
                  src={ind.image} 
                  alt={`${ind.title} components - Mirai Technologies`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/90 shadow backdrop-blur-sm">
                    {React.cloneElement(ind.icon, { className: 'w-4 h-4' })}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 bg-white flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2 leading-snug">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
