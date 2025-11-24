
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      {/* Main Gradient Text - Static Gradient for Performance */}
      <span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent"
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </span>
      
      {/* Base layer for solid white fallback */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 opacity-50"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      {/* Blur Glow Effect */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-[#a8fbd3] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-2xl opacity-40"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
