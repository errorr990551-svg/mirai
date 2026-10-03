import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: "Are your components genuine?",
      a: "Yes. We source directly from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
    },
    {
      q: "Do you supply small quantities?",
      a: "Yes. We offer flexible MOQs, so prototype buyers and production teams are both welcome."
    },
    {
      q: "Will I get a GST invoice?",
      a: "Yes. Every B2B order comes with a complete GST invoice for Input Tax Credit."
    },
    {
      q: "Which brands do you carry?",
      a: "ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices, and MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay."
    },
    {
      q: "Can you help if my part is obsolete or out of stock?",
      a: "Yes. Our team supports expert cross-referencing to find a suitable alternative."
    },
    {
      q: "Do you deliver outside Mumbai?",
      a: "Yes. We deliver across India to all major industrial cities."
    },
    {
      q: "How fast will I get a quote?",
      a: "Within 24 hours of receiving your BOM or part list."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 inline-block relative pb-4">
            Frequently Asked Questions
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
