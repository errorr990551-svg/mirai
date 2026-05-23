import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: "What is the minimum order quantity (MOQ)?",
      a: "Mirai Technologies works with clients of all sizes. MOQ varies by component and manufacturer. Contact us with your specific requirements and we'll find the best solution for your project, whether it's a single prototype quantity or a large production run."
    },
    {
      q: "Do you supply components pan-India?",
      a: "Yes, Mirai Technologies, based in Mumbai, supplies electronic components across India and internationally. We serve clients in Delhi, Bangalore, Pune, Chennai, Hyderabad, and all major manufacturing hubs across India."
    },
    {
      q: "Are all components genuine and authentic?",
      a: "Absolutely. We source exclusively from authorized manufacturers and franchised distributors. Every shipment undergoes anti-counterfeit visual inspection, packaging verification, and lot traceability checks. COC available on every order."
    },
    {
      q: "Can you source obsolete or discontinued components?",
      a: "Yes — this is one of our specialties. Our global supplier network allows us to locate end-of-life and hard-to-find components that standard distributors cannot supply. Contact us with your part number for sourcing assistance."
    },
    {
      q: "Which brands / manufacturers does Mirai supply?",
      a: "We are authorized partners for 40+ global brands including Infineon, Texas Instruments, STMicroelectronics, Microchip, Analog Devices, onsemi, Toshiba, Nexperia, Yageo, TDK, Rohm, Renesas, Samsung, and many more."
    },
    {
      q: "Do you offer after-sales support?",
      a: "Yes. Our dedicated team handles returns, replacements, and quality disputes within 48 hours. We stand behind every order we fulfill and are committed to resolving any issues quickly and professionally."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 inline-block relative pb-4">
            FAQs
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-mirai-primary rounded-full" />
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-mirai-primary shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                    isOpen ? 'text-mirai-primary' : 'text-slate-900'
                  }`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-mirai-primary' : 'text-slate-400'
                  }`} />
                </button>

                {/* Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100 mt-[-4px]">
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-4">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
