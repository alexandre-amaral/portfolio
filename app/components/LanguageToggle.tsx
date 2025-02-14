'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Language = 'en' | 'pt';

export const LanguageToggle = ({ onChange }: { onChange: (lang: Language) => void }) => {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    setCurrentLang(newLang);
    onChange(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-5 right-20 z-50 px-3 py-1 rounded-full bg-background border border-primary/20 hover:bg-primary/10 transition-colors text-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {currentLang.toUpperCase()}
    </motion.button>
  );
}; 