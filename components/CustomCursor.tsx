
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Initialize off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth physics - slightly looser for a "floaty" feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]') ||
                        target.tagName === 'INPUT' ||
                        target.tagName === 'IMG';
      setIsHovering(!!clickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <div className="relative flex items-center justify-center">
        
        {/* Center Dot */}
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
          }}
          className="relative z-10 w-2 h-2 bg-[#a8fbd3] rounded-full shadow-[0_0_10px_#a8fbd3]"
        />

        {/* Inner Spinning Ring */}
        <motion.div
          animate={{
            scale: isHovering ? 1.8 : 1.2,
            opacity: isHovering ? 0.8 : 0.3,
            rotate: 360
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.2 }
          }}
          className="absolute border border-dashed border-[#4fb7b3] rounded-full w-12 h-12"
        />

        {/* Outer Static Ring (New) */}
         <motion.div
          animate={{
            scale: isClicking ? 0.9 : 1,
            borderColor: isClicking ? '#a8fbd3' : '#4fb7b3',
          }}
          className="absolute border border-white/10 rounded-full w-16 h-16"
        />

        {/* Reticle Brackets - Expand significantly on hover */}
        <motion.div
          initial={{ width: 40, height: 40, opacity: 0 }}
          animate={{
            width: isHovering ? 80 : 0,
            height: isHovering ? 80 : 0,
            opacity: isHovering ? 1 : 0,
            rotate: isClicking ? 90 : 0
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="absolute"
        >
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#a8fbd3] shadow-[0_0_10px_#a8fbd3]" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#a8fbd3] shadow-[0_0_10px_#a8fbd3]" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#a8fbd3] shadow-[0_0_10px_#a8fbd3]" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#a8fbd3] shadow-[0_0_10px_#a8fbd3]" />
        </motion.div>

        {/* Data Readout */}
        <motion.div
          animate={{
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 50 : 30
          }}
          className="absolute left-0 top-0 text-[10px] font-mono text-[#a8fbd3] whitespace-nowrap flex flex-col gap-0.5 font-bold"
        >
          <span className="bg-black/50 px-1">TARGET_LOCKED</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
