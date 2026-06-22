import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plug, Car, Sun, Factory, Plane, Radio, Zap, BatteryCharging, Bot, Activity, Signal } from 'lucide-react';

const IndustriesSection = () => {
  const industries = [
    { icon: <Smartphone className="text-pink-500" />, name: "Consumer Electronics", image: "/consumer electronics.webp" },
    { icon: <Plug className="text-slate-500" />, name: "EMS / PCB Assembly", image: "/emspcb.webp" },
    { icon: <Car className="text-red-500" />, name: "EV & Automotive", image: "/automotive.webp" },
    { icon: <Sun className="text-amber-500" />, name: "Solar & Renewable", image: "/solar.webp" },
    { icon: <Factory className="text-orange-500" />, name: "Industrial Automation", image: "/industrialautomation.webp" },
    { icon: <Plane className="text-blue-500" />, name: "Defence & Aerospace", image: "/defense.webp" },
    { icon: <Radio className="text-purple-500" />, name: "IoT & Embedded", image: "/iot.webp" },
    { icon: <Zap className="text-indigo-600" />, name: "Power Electronics", image: "/power.webp" },
    { icon: <BatteryCharging className="text-emerald-500" />, name: "UPS & Stabilizers", image: "/ups.webp" },
    { icon: <Bot className="text-indigo-500" />, name: "Drones & Robotics", image: "/drone.webp" },
    { icon: <Activity className="text-rose-500" />, name: "Medical Equipment", image: "/medical.webp" },
    { icon: <Signal className="text-sky-500" />, name: "Telecommunications", image: "/telecommunication.webp" }
  ];

  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-primary font-semibold text-sm tracking-widest uppercase mb-4">Industries We Serve</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Powering <span className="text-mirai-primary">Every Sector</span> of <br />
            Electronics
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group flex flex-col h-full rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative h-36 sm:h-48 overflow-hidden bg-slate-100">
                <img 
                  src={ind.image} 
                  alt={ind.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Content - Icon on Side, Title on Bottom */}
              <div className="p-3 sm:p-4 flex items-center gap-2.5 bg-white border-t border-slate-100/50 flex-grow">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-slate-50 transition-all duration-300 group-hover:bg-slate-100">
                  {React.cloneElement(ind.icon, { 
                    className: `${ind.icon.props.className || ''} w-5 h-5 transition-transform group-hover:scale-110 duration-300` 
                  })}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-mirai-primary transition-colors duration-300 leading-snug">
                  {ind.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
