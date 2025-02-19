'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Loader from './components/Loader';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowAbout(true);
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#1C1C1C] text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <motion.div
        style={{
          opacity: 1 - Math.min(1, scrollPosition / 500),
          transform: `translateY(${scrollPosition * 0.3}px)`,
        }}
      >
        {/* Content that should fade */}
      </motion.div>

      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader onLoadingComplete={handleLoaderComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AboutMe />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #1C1C1C 95%)',
          opacity: Math.min(1, scrollPosition / 500)
        }}
      />
    </motion.div>
  );
}
