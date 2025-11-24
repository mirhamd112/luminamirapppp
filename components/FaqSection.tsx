
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "What is Filmfind?",
    answer: "A one-stop destination to stream movies, TV shows, and music. Filmfind is the most comprehensive entertainment platform available today. We combine free ad-supported movies, shows, and live TV together with the ability to easily search—and add to your Watchlist—any title ever made, no matter which streaming service it lives on."
  },
  {
    question: "Is Filmfind really free?",
    answer: "Filmfind is a free streaming app for everyone, no credit cards or subscription costs or hidden fees. To keep our service free we monetize via optional premium tiers, but the core watching experience for our library is free."
  },
  {
    question: "Where is Filmfind available?",
    answer: "Filmfind is available in almost every country in the world. No other free streaming service delivers more content to and from more countries worldwide."
  },
  {
    question: "Where can I watch?",
    answer: "Watch instantly online from your personal computer or on any internet-connected device that offers a web browser. That includes smart TVs, smartphones, tablets, game consoles, and more!"
  },
  {
    question: "Do I need an account?",
    answer: "You do not need to create an account to use Filmfind, but you get more when you do. Benefits include your own universal Watchlist and the ability to pick up where you left off on any device."
  },
  {
    question: "How does the 'Concierge' work?",
    answer: "Just select your favorite streaming services (like Hulu, Netflix, Max, etc.) in our settings. We then curate recommendations and show you where to watch any title, acting as your personal TV concierge."
  }
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <MessageCircleQuestion className="w-8 h-8 text-[#4fb7b3]" />
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-white text-center">
          Question or two?
        </h2>
      </div>
      
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors group"
            >
              <span className="font-bold text-lg text-white group-hover:text-[#a8fbd3] transition-colors">{item.question}</span>
              <ChevronDown 
                className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/10">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
