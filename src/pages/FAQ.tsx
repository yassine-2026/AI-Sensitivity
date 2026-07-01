import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "How does AI Sensitivity work?",
    answer: "Our advanced algorithm analyzes your device's exact hardware specifications—including RAM, processor, screen resolution, and refresh rate—to calculate the mathematically perfect sensitivity ratios for Free Fire, customized to your play style."
  },
  {
    question: "Will I get banned for using this?",
    answer: "Absolutely not. AI Sensitivity is a safe, external tool that purely calculates recommended in-game settings. It does not modify game files, inject code, or interact with the Free Fire client in any way."
  },
  {
    question: "Do I need an active internet connection?",
    answer: "Once our local AI model is fully implemented (coming in the next stage), the generation will happen completely on-device, meaning you can generate new settings even while offline."
  },
  {
    question: "What devices are supported?",
    answer: "We support a vast array of devices including Android phones, iPhones, iPads, and Android tablets. As long as you know your hardware specifications, our tool can generate an accurate profile."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>FAQ | AI Sensitivity</title>
        <meta name="description" content="Frequently asked questions about AI Sensitivity for Free Fire." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">Everything you need to know about our sensitivity generator.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
