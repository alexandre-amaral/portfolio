'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import Projects from './components/Projects';
import GetInTouch from './components/GetInTouch';
import Loader from './components/Loader';
import Navigation from './components/Navigation';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100]"
          >
            <Loader onLoadingComplete={handleLoaderComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Navigation currentSection={currentSection} />
            
            {/* Hero Section */}
            <motion.section 
              id="hero" 
              className="min-h-screen relative z-40"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              onViewportEnter={() => setCurrentSection('hero')}
            >
              <Hero />
            </motion.section>
            
            {/* Services Section */}
            <motion.section 
              id="services" 
              className="relative z-30"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              onViewportEnter={() => setCurrentSection('services')}
            >
              <Services />
            </motion.section>

            {/* About Section */}
            <motion.section 
              id="about" 
              className="relative z-20"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              onViewportEnter={() => setCurrentSection('about')}
            >
              <AboutMe />
            </motion.section>
            
            {/* Projects Section */}
            <motion.section 
              id="projects" 
              className="relative z-10"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              onViewportEnter={() => setCurrentSection('projects')}
            >
              <Projects />
            </motion.section>
            
            {/* Contact Section */}
            <motion.section 
              id="contact" 
              className="relative z-5"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              onViewportEnter={() => setCurrentSection('contact')}
            >
              <GetInTouch />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
