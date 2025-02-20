'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Loader from './components/Loader';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Smooth scroll animation for navigation
      const sections = ['hero', 'about'];
      sections.forEach(section => {
        const target = document.getElementById(section);
        if (target) {
          ScrollTrigger.create({
            trigger: target,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setCurrentSection(section),
            onEnterBack: () => setCurrentSection(section),
            toggleActions: 'play none none reverse',
            markers: false
          });
        }
      });

      // Hero section parallax effect
      gsap.to('#hero', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: (_, target) => -target.offsetHeight * 0.3,
        opacity: 0.8,
        ease: 'none'
      });

      // About section reveal animation
      gsap.from('#about', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top center+=100',
          end: 'top center-=100',
          scrub: 1,
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });

      // Add gradient overlay animation
      gsap.to('.gradient-overlay', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        opacity: 1,
        duration: 1
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <div ref={mainRef} className="relative">
      <Navigation currentSection={currentSection} />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay fixed inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-0 pointer-events-none z-10" />

      <div className="relative z-20">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="relative">
          <AnimatePresence mode="wait">
            {showLoader ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-50"
              >
                <Loader onLoadingComplete={handleLoaderComplete} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  staggerChildren: 0.2
                }}
              >
                <AboutMe />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
