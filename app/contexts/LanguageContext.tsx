'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage on client-side
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Update localStorage when language changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  };

  // Only render children after initialization to prevent hydration mismatch
  if (!isInitialized) {
    return null; // Return null or a loading indicator during initialization
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 