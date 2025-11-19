
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AdContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRenderAd, setShouldRenderAd] = useState(false);

  useEffect(() => {
    // This interval checks if the container has actual width before telling the ad to load.
    // This prevents "No slot size for availableWidth=0" errors.
    const checkWidthInterval = setInterval(() => {
      if (containerRef.current && containerRef.current.offsetWidth > 0) {
        setShouldRenderAd(true);
        clearInterval(checkWidthInterval);
      }
    }, 100);

    return () => clearInterval(checkWidthInterval);
  }, []);

  useEffect(() => {
    if (shouldRenderAd) {
      try {
        const w = window as any;
        w.adsbygoogle = w.adsbygoogle || [];
        
        const adElement = containerRef.current?.querySelector('.adsbygoogle');
        if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
             w.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, [shouldRenderAd]);

  return (
    <div className="w-full px-4 md:px-8 py-20 flex justify-center relative z-20 pointer-events-auto my-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-5xl"
      >
        {/* Floating Animation Wrapper */}
        <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
        >
            {/* Liquid Gradient Background Blob */}
            <motion.div 
                className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-[#a8fbd3]/40 via-[#4fb7b3]/40 to-[#637ab9]/40 rounded-[2.5rem] blur-2xl opacity-60"
                animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    scale: [1, 1.02, 1]
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Main Glass Container */}
            <div 
                ref={containerRef}
                className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
            >
                {/* Glossy Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />
                
                {/* Moving Shine Line */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[150px] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: '-100%' }}
                    animate={{ left: '200%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                />

                {/* Header Label */}
                <div className="relative flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/20">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] animate-[pulse_2s_infinite]" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
                            Sponsored
                        </span>
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-white/30">
                        ADVERTISEMENT
                    </div>
                </div>

                {/* Ad Slot Container */}
                <div className="p-6 min-h-[280px] w-full flex justify-center items-center relative z-10 bg-gradient-to-b from-transparent to-black/10">
                    {shouldRenderAd && (
                        <ins className="adsbygoogle"
                            style={{ display: 'block', width: '100%' }}
                            data-ad-client="ca-pub-8800733866689221"
                            data-ad-slot="6918675871"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                    )}
                    
                    {/* Loading State Placeholder */}
                    {!shouldRenderAd && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />
                                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce delay-100" />
                                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce delay-200" />
                            </div>
                            <span className="text-xs text-white/30 font-mono uppercase tracking-widest">Loading Content</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdContainer;
