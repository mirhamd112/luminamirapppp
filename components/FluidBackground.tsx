
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { memo } from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f1021] pointer-events-none">
      
      {/* Base Gradient - Static */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,24,39,1),rgba(15,16,33,1))]"></div>
      
      {/* Optimized Blobs - CSS Animation only, Removed heavy blend modes, standard blur */}
      {/* Blob 1 */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#a8fbd3] rounded-full filter blur-3xl opacity-[0.05] animate-blob will-change-transform" 
      />
      
      {/* Blob 2 */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-[#4fb7b3] rounded-full filter blur-3xl opacity-[0.05] animate-blob animation-delay-2000 will-change-transform" 
      />
      
      {/* Blob 3 */}
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] bg-[#637ab9] rounded-full filter blur-3xl opacity-[0.05] animate-blob animation-delay-4000 will-change-transform" 
      />

      {/* Lightweight Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Static Grain Overlay - Removed blend mode for performance */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-[#0f1021]/80" />
    </div>
  );
};

export default memo(FluidBackground);
