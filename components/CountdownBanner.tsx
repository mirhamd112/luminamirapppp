
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownBanner: React.FC = () => {
  // 55 hours in seconds
  const START_DURATION = 55 * 60 * 60;
  
  const [timeLeft, setTimeLeft] = useState(START_DURATION);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Persist the target time so it doesn't reset on refresh (simulating server-side fixed time)
    // The requirement is to count down 55 hours as if based on GMT+5 server time.
    // Using UTC timestamps ensures this works correctly across all client timezones.
    const STORAGE_KEY = 'filmfind_countdown_target_v1';
    let targetTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

    // If no time is stored, set the target to 55 hours from NOW.
    if (!targetTime) {
         targetTime = Date.now() + (START_DURATION * 1000);
         localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
      setTimeLeft(diff);
    };

    updateTimer(); // Immediate update on mount
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const time = formatTime(timeLeft);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col items-center justify-center my-10"
    >
      <div className="flex items-center gap-3 mb-6">
         <span className="w-2 h-2 bg-[#4fb7b3] rounded-full animate-pulse" />
         <span className="text-[#4fb7b3] font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
            System Online In
         </span>
         <span className="w-2 h-2 bg-[#4fb7b3] rounded-full animate-pulse" />
      </div>

      <div className="flex items-baseline gap-4 md:gap-12 font-heading text-4xl md:text-7xl font-bold text-white tabular-nums tracking-tighter leading-none">
        <div className="flex flex-col items-center">
           {/* Display hours (can be > 24) */}
           <span className="drop-shadow-[0_0_15px_rgba(79,183,179,0.5)]">{time.h.toString().padStart(2, '0')}</span>
           <span className="text-[10px] md:text-xs font-mono text-white/40 tracking-[0.2em] mt-4">HOURS</span>
        </div>
        <span className="text-white/20 -translate-y-4">:</span>
        <div className="flex flex-col items-center">
           <span className="drop-shadow-[0_0_15px_rgba(79,183,179,0.5)]">{time.m.toString().padStart(2, '0')}</span>
           <span className="text-[10px] md:text-xs font-mono text-white/40 tracking-[0.2em] mt-4">MINS</span>
        </div>
        <span className="text-white/20 -translate-y-4">:</span>
        <div className="flex flex-col items-center text-[#4fb7b3]">
           <span className="drop-shadow-[0_0_20px_rgba(79,183,179,0.8)]">{time.s.toString().padStart(2, '0')}</span>
           <span className="text-[10px] md:text-xs font-mono text-[#4fb7b3]/60 tracking-[0.2em] mt-4">SECS</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownBanner;
