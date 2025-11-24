
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

const JoinWaitlist: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: 0.6, duration: 0.8 }}
       className="w-full max-w-xl mx-auto mt-12 px-4 relative z-20"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[#4fb7b3]/20 blur-[80px] rounded-full pointer-events-none opacity-50" />

      {/* Main Container */}
      <div className={`
        relative p-2 rounded-full transition-all duration-500
        ${isFocused ? 'bg-gradient-to-r from-[#a8fbd3]/40 via-[#4fb7b3]/40 to-[#a8fbd3]/40 shadow-[0_0_40px_rgba(168,251,211,0.3)]' : 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10'}
        backdrop-blur-xl
      `}>
        <form 
          action="https://docs.google.com/forms/d/e/1FAIpQLScJChSiLay5Oa2p8c5AVSye_oO7xZqQau7MNACteFGo3y8Tgg/formResponse"
          method="POST"
          target="_blank"
          className="relative flex flex-col sm:flex-row items-center gap-2 p-1 bg-[#0f1021]/90 rounded-full"
        >
           {/* Input Wrapper */}
           <div className="relative w-full group flex-1">
              <div className={`absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors duration-300 ${isFocused ? 'text-[#a8fbd3]' : 'text-gray-500'}`}>
                <Mail className="h-5 w-5" />
              </div>
              <input 
                type="email" 
                name="entry.280934693"
                placeholder="Enter your email for early access"
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-14 pr-4 py-4 bg-transparent border-none focus:outline-none text-white placeholder-gray-500 font-medium text-lg h-full rounded-full"
              />
           </div>
           
           {/* Button */}
           <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4fb7b3] to-[#a8fbd3] hover:from-[#a8fbd3] hover:to-[#ffffff] text-[#0f1021] font-bold font-heading rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,183,179,0.4)] hover:shadow-[0_0_40px_rgba(168,251,211,0.6)] hover:scale-105 whitespace-nowrap cursor-pointer relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center gap-2">JOIN WAITLIST <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
           </button>
        </form>
      </div>
      
      {/* Footer Text */}
      <div className="flex items-center justify-center gap-3 mt-6 text-xs md:text-sm text-[#a8fbd3]/80 font-mono tracking-widest uppercase opacity-80">
         <Sparkles className="w-3 h-3 animate-pulse" />
         <span>Limited Spots Available</span>
         <Sparkles className="w-3 h-3 animate-pulse" />
      </div>
    </motion.div>
  );
};

export default JoinWaitlist;
