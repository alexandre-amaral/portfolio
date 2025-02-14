'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LanguageToggle } from './LanguageToggle';
import { InteractiveBackground } from './InteractiveBackground';

const content = {
  en: {
    title: "Software Developer",
    subtitle: "is a collaborative",
    description: "Built to help ambitious engineering teams achieve more.",
    buttons: {
      projects: "View Projects",
      contact: "Contact Me"
    }
  },
  pt: {
    title: "Desenvolvedor de Software",
    subtitle: "é um colaborador",
    description: "Construído para ajudar times de engenharia ambiciosos a alcançarem mais.",
    buttons: {
      projects: "Ver Projetos",
      contact: "Contato"
    }
  }
};

export const Hero = () => {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  const text = content[language];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background text-foreground">
      <InteractiveBackground />
      <LanguageToggle onChange={setLanguage} />
      
      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-left"
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {text.title}
          </motion.h1>
          
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight text-primary/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {text.subtitle}
          </motion.h2>
        </div>
        
        <motion.p 
          className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {text.description}
        </motion.p>

        <motion.div
          className="mt-12 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {text.buttons.projects}
          </motion.button>
          <motion.button 
            className="px-6 py-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {text.buttons.contact}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}; 