import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plug, Car, Sun, Factory, Plane, Radio, Zap, BatteryCharging, Bot, Activity, Signal } from 'lucide-react';

const IndustriesSection = () => {
  const industries = [
    { icon: <Smartphone className="w-8 h-8 text-pink-400" />, name: "Consumer Electronics" },
    { icon: <Plug className="w-8 h-8 text-slate-500" />, name: "EMS / PCB Assembly" },
    { icon: <Car className="w-8 h-8 text-red-400" />, name: "EV & Automotive" },
    { icon: <Sun className="w-8 h-8 text-yellow-400" />, name: "Solar & Renewable" },
    { icon: <Factory className="w-8 h-8 text-orange-400" />, name: "Industrial Automation" },
    { icon: <Plane className="w-8 h-8 text-blue-400" />, name: "Defence & Aerospace" },
    { icon: <Radio className="w-8 h-8 text-purple-400" />, name: "IoT & Embedded" },
    { icon: <Zap className="w-8 h-8 text-mirai-primary" />, name: "Power Electronics" },
    { icon: <BatteryCharging className="w-8 h-8 text-green-400" />, name: "UPS & Stabilizers" },
    { icon: <Bot className="w-8 h-8 text-indigo-400" />, name: "Drones & Robotics" },
    { icon: <Activity className="w-8 h-8 text-rose-400" />, name: "Medical Equipment" },
    { icon: <Signal className="w-8 h-8 text-blue-500" />, name: "Telecommunications" }
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
              className="group p-8 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-4 transition-all duration-500 cursor-pointer bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-indigo-50"
            >
              <motion.div
                animate={{ y: [0, idx % 2 === 0 ? -4 : 4, 0] }}
                transition={{ 
                  duration: 4 + idx, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
                className="flex flex-col items-center justify-center relative z-10"
              >
                {/* Huge background icon for depth */}
                <div className="absolute -bottom-6 -right-6 text-slate-100/50 group-hover:text-indigo-100/50 group-hover:scale-125 transition-all duration-500 select-none pointer-events-none -z-10">
                  {React.cloneElement(ind.icon, { size: 100, strokeWidth: 1 })}
                </div>

                {/* Animated background shape on hover */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-mirai-primary/5 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-10" />
                
                <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {ind.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-700 group-hover:text-mirai-primary transition-colors">
                  {ind.name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
