import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plug, Car, Sun, Factory, Plane, Radio, Zap, BatteryCharging, Bot, Activity, Signal } from 'lucide-react';

const IndustriesSection = () => {
  const industries = [
    { icon: <Smartphone className="w-8 h-8 text-pink-400" />, name: "Consumer Electronics" },
    { icon: <Plug className="w-8 h-8 text-gray-400" />, name: "EMS / PCB Assembly" },
    { icon: <Car className="w-8 h-8 text-red-400" />, name: "EV & Automotive" },
    { icon: <Sun className="w-8 h-8 text-yellow-400" />, name: "Solar & Renewable" },
    { icon: <Factory className="w-8 h-8 text-orange-400" />, name: "Industrial Automation" },
    { icon: <Plane className="w-8 h-8 text-blue-400" />, name: "Defence & Aerospace" },
    { icon: <Radio className="w-8 h-8 text-purple-400" />, name: "IoT & Embedded" },
    { icon: <Zap className="w-8 h-8 text-mirai-cyan" />, name: "Power Electronics" },
    { icon: <BatteryCharging className="w-8 h-8 text-green-400" />, name: "UPS & Stabilizers" },
    { icon: <Bot className="w-8 h-8 text-indigo-400" />, name: "Drones & Robotics" },
    { icon: <Activity className="w-8 h-8 text-rose-400" />, name: "Medical Equipment" },
    { icon: <Signal className="w-8 h-8 text-blue-500" />, name: "Telecommunications" }
  ];

  return (
    <section className="py-24 bg-mirai-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-mirai-cyan font-semibold text-sm tracking-widest uppercase mb-4">Industries We Serve</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Powering <span className="text-mirai-cyan">Every Sector</span> of <br />
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
              className="group p-8 rounded-xl border flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 cursor-pointer bg-mirai-card border-white/5 hover:border-mirai-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.15)] hover:-translate-y-1 hover:bg-white/5 relative"
            >
              <div className="mb-2">
                {ind.icon}
              </div>
              <h3 className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">
                {ind.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
