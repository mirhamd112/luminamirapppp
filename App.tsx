

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Users, Star, Database, ShieldCheck, Film, Tv, Radio, Heart } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import CountdownBanner from './components/CountdownBanner';
import JoinWaitlist from './components/JoinWaitlist';
import FaqSection from './components/FaqSection';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const featureRef = useRef(null);
  const { scrollYProgress: featureScroll } = useScroll({
    target: featureRef,
    offset: ["start end", "end start"]
  });
  
  // Removed 3D rotation for better performance
  const parallaxY = useTransform(featureScroll, [0, 1], [50, -50]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden font-sans bg-[#0f1021]">
      <CustomCursor />
      <FluidBackground />
      
      {/* Floating Navigation */}
      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
        <nav className="w-full max-w-5xl flex items-center justify-between px-6 py-3 bg-[#0f1021]/80 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all hover:border-white/20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <img src="https://6924480f06fc1305af77f4b7--miroudbdbdnrnn.netlify.app/logo.png" alt="Filmfind Logo" className="h-8 md:h-10 w-auto object-contain" />
             <span className="hidden md:block font-heading text-lg font-bold tracking-tighter text-white">FILMFIND</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase items-center">
            {['Discover', 'Features', 'Community', 'FAQ'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative hover:text-[#a8fbd3] transition-colors text-white/70 cursor-pointer bg-transparent border-none py-2"
                data-hover="true"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#a8fbd3] transition-all duration-300 hover:w-full"></span>
              </button>
            ))}
             <a 
               href="https://instagram.com/filmfind.online" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-[#a8fbd3] transition-colors text-white/70 cursor-pointer"
               data-hover="true"
             >
                Instagram
             </a>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#0f1021]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Discover', 'Features', 'Community', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none tracking-tighter"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="discover" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-[#a8fbd3] tracking-[0.2em] uppercase mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-[0_0_20px_rgba(168,251,211,0.1)]"
          >
            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
            <span>Verified Secure • Family Friendly</span>
          </motion.div>

          {/* Main Title with Stagger */}
          <div className="relative mb-8 md:mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-4xl md:text-8xl font-black tracking-tighter text-center leading-[1.1]"
            >
              Meet your <br/>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GradientText text="TV CONCIERGE" className="text-5xl md:text-9xl drop-shadow-[0_0_30px_rgba(79,183,179,0.3)]" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-gray-300 leading-relaxed mb-12 md:mb-16"
          >
            Need something to watch? We’re on it. Filmfind combines free movies & TV with the best streaming services, so there’s always more to discover.
          </motion.p>
          
          <CountdownBanner />
          <JoinWaitlist />

        </motion.div>

        {/* Stats Grid with Hover Effects */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 w-full max-w-5xl mt-12 border-t border-white/10 pt-8 px-4">
            {[
              { label: 'Movies & Shows', val: '180k+' },
              { label: 'Services', val: '7+' },
              { label: 'Ads', val: '0' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                className="text-center group cursor-default"
              >
                <div className="text-2xl md:text-5xl font-bold font-heading text-white mb-2 transition-colors group-hover:text-[#a8fbd3]">{stat.val}</div>
                <div className="text-[10px] md:text-xs text-[#637ab9] uppercase tracking-widest font-mono">{stat.label}</div>
              </motion.div>
            ))}
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section id="features" ref={featureRef} className="relative z-10 py-20 md:py-32 bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="order-2 md:order-1"
             >
                <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                   <Database className="w-6 h-6 text-[#a8fbd3]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">One list to rule them all.</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  With a free Filmfind account you can keep a single, unified Watchlist for any movie or TV show you hear about, on any service—even theater releases! You can finally stop hopping between watchlists.
                </p>
             </motion.div>
             
             <motion.div 
               style={{ y: parallaxY }}
               className="order-1 md:order-2 relative h-[400px] md:h-[500px] bg-[#0f1021] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl group flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(168,251,211,0.15)] hover:border-[#a8fbd3]/30"
             >
                {/* Image is key focus here, used object-contain to show the UI element clearly */}
                <img 
                  src="https://www.plex.tv/wp-content/uploads/2023/05/pms-devices-image.png" 
                  alt="Watchlist Interface" 
                  className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-700 drop-shadow-[0_0_30px_rgba(168,251,211,0.2)]" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1021] via-transparent to-transparent opacity-20" />
             </motion.div>
          </div>

          {/* Quote Block */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="w-full bg-[#a8fbd3] text-black p-8 md:p-16 rounded-[2.5rem] text-center mb-32 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
             <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
             
             <div className="relative z-10 max-w-4xl mx-auto">
               <Star className="w-12 h-12 mx-auto mb-8 text-black" />
               <p className="text-2xl md:text-5xl font-heading font-bold mb-8 leading-tight tracking-tight">
                 "It essentially makes the app the center of your streaming universe."
               </p>
               <div className="flex items-center justify-center gap-4">
                 <span className="h-px w-12 bg-black/20"></span>
                 <div className="font-mono uppercase tracking-widest text-sm font-bold">- The New York Times</div>
                 <span className="h-px w-12 bg-black/20"></span>
               </div>
             </div>
          </motion.div>

          {/* Feature 2 - Discover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
             <motion.div 
               style={{ y: useTransform(featureScroll, [0, 1], [-30, 30]) }}
               className="relative h-[400px] md:h-[500px] bg-[#1f2048] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(99,122,185,0.25)] hover:border-[#637ab9]/30"
             >
                <img 
                    src="https://www.plex.tv/wp-content/uploads/2025/02/home-sonic-apple-tv-02-21.png" 
                    alt="Movies Discovery UI" 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    loading="lazy"
                />
                {/* Subtle overlay for text contrast if needed, but keeping image clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                   <div className="flex gap-4 justify-center md:justify-start">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                        <Film className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                        <Tv className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                        <Radio className="w-6 h-6 text-white" />
                      </div>
                   </div>
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                   <Search className="w-6 h-6 text-[#637ab9]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">It’s a great day to Discover.</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Select from the best streaming services to discover more, search faster, and get curated recommendations—all without ever leaving Filmfind.
                </p>
                <div className="space-y-4 mb-8">
                  {['Movies & Shows', 'Live TV', 'Universal Search'].map((item, idx) => (
                    <motion.div 
                      key={item} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default"
                    >
                       <span className="w-2 h-2 bg-[#4fb7b3] rounded-full shadow-[0_0_10px_#4fb7b3]" /> 
                       <span className="font-bold tracking-wide">{item}</span>
                    </motion.div>
                  ))}
                </div>
             </motion.div>
          </div>

        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section id="community" className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent to-[#05060e]">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-8 border border-white/10">
             <Users className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-3xl md:text-6xl font-heading font-bold mb-6">Find your friends.</h2>
           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
             What if you could find what to watch next based on ratings and activity from people you know in real life?
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: 'Search', desc: 'Find friends by name, location, or interest.' },
                { title: 'Build', desc: 'Create a unified watchlist across services.' },
                { title: 'Profile', desc: 'View watch stats and share your personality.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0f1021] p-8 rounded-2xl border border-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,183,179,0.2)] hover:bg-[#16172e] hover:border-[#4fb7b3]/50"
                >
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#a8fbd3] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 py-20">
        <FaqSection />
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 bg-[#05060e]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
               <img src="https://6924480f06fc1305af77f4b7--miroudbdbdnrnn.netlify.app/logo.png" alt="Filmfind" className="h-6 w-auto opacity-80" loading="lazy" />
               <div className="font-heading text-xl font-bold tracking-tighter text-white">FILMFIND</div>
             </div>
             <p className="text-xs font-mono text-gray-500">
               © 2025 Filmfind.online. All rights reserved.<br/>
               We do not host explicit 18+ content.
             </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://tirikchilik.uz/mirhamid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3] text-[#0f1021] rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(79,183,179,0.4)]"
            >
               <Heart className="w-3 h-3 fill-current" />
               <span>Donate</span>
            </a>

            <a href="https://instagram.com/filmfind.online" className="text-gray-400 hover:text-[#E1306C] transition-colors transform hover:scale-110" aria-label="Instagram">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
