
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight, Twitter, Facebook } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const shareUrl = "https://filmfind.online";
  const shareText = `Check out ${artist.name} at LUMINA 2025! #LUMINA2025`;

  const handleShare = (e: React.MouseEvent, platform: 'twitter' | 'facebook') => {
    e.stopPropagation();
    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.6, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-[#637ab9]/20 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full backdrop-blur-md">
             {artist.day}
           </span>
           
           <div className="flex gap-3 items-center pointer-events-auto">
             {/* Share Buttons */}
             <motion.button
                variants={{
                  rest: { opacity: 0, x: 20, scale: 0.8 },
                  hover: { opacity: 1, x: 0, scale: 1 }
                }}
                transition={{ duration: 0.4, delay: 0.05 }}
                onClick={(e) => handleShare(e, 'twitter')}
                className="flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-[#1DA1F2] hover:text-white text-white border border-white/20 rounded-full backdrop-blur-md transition-colors"
                aria-label="Share on Twitter"
                title="Share on Twitter"
             >
                <Twitter className="w-4 h-4" />
             </motion.button>
             
             <motion.button
                variants={{
                  rest: { opacity: 0, x: 20, scale: 0.8 },
                  hover: { opacity: 1, x: 0, scale: 1 }
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                onClick={(e) => handleShare(e, 'facebook')}
                className="flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-[#4267B2] hover:text-white text-white border border-white/20 rounded-full backdrop-blur-md transition-colors"
                aria-label="Share on Facebook"
                title="Share on Facebook"
             >
                <Facebook className="w-4 h-4" />
             </motion.button>

             {/* View Details Arrow */}
             <motion.div
               variants={{
                 rest: { opacity: 0, x: 20, y: -20 },
                 hover: { opacity: 1, x: 0, y: 0 }
               }}
               className="bg-white text-black rounded-full p-2 will-change-transform ml-1"
             >
               <ArrowUpRight className="w-6 h-6" />
             </motion.div>
           </div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mix-blend-difference will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {artist.name}
            </motion.h3>
          </div>
          <motion.p 
            className="text-sm font-medium uppercase tracking-widest text-[#4fb7b3] mt-2 will-change-transform"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {artist.genre}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
