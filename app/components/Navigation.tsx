'use client';

import { useState } from 'react';
import { FaLanguage } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato'
    }
  }
};

interface NavigationProps {
  currentSection: string;
}

export default function Navigation({ currentSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const t = translations[language];
  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto px-6 py-4">
        <div className="backdrop-blur-md bg-[#1C1C1C]/90 rounded-2xl 
                     border border-gray-700/30 shadow-[0_0_30px_rgba(0,0,0,0.3)]
                     transition-all duration-300 hover:bg-[#1C1C1C]/95
                     hover:border-gray-600/50 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Name */}
              <div className="flex-shrink-0 w-[200px]">
                <a href="#" className="text-white font-bold text-xl 
                                   [text-shadow:_0_0_15px_rgba(255,255,255,0.3)]
                                   hover:opacity-80 transition-opacity duration-200">
                  AA
                </a>
              </div>

              {/* Navigation Links - Centered */}
              <div className={`flex-1 flex items-center justify-center
                            ${isMobileMenuOpen ? 'flex-col absolute top-full left-0 right-0 bg-[#1C1C1C]/95 backdrop-blur-md p-4 rounded-b-2xl border-t border-gray-700/30' : ''}`}>
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300
                                ${currentSection === item.id ? 'text-white' : 'text-gray-400'}
                                hover:text-white group`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full
                                   transform origin-left transition-transform duration-300
                                   ${currentSection === item.id 
                                     ? 'bg-white scale-x-100' 
                                     : 'bg-gray-400 scale-x-0'}
                                   group-hover:scale-x-100`}>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Section - Language Toggle and Mobile Menu */}
              <div className="flex-shrink-0 w-[200px] flex items-center justify-end gap-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                  className="flex items-center gap-2 px-4 py-2
                           bg-[#2A2A2A]/90 backdrop-blur-md
                           text-gray-200 rounded-lg border border-gray-700/50 
                           shadow-[0_0_15px_rgba(0,0,0,0.3)]
                           hover:bg-[#333333]/95 hover:border-gray-600
                           hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                           transition-all duration-300 ease-out
                           group"
                >
                  <FaLanguage className="w-5 h-5 text-gray-300 group-hover:text-white 
                                     transition-colors duration-300" />
                  <span className="font-medium hidden md:inline">
                    {language === 'en' ? 'EN' : 'PT'}
                  </span>
                </button>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg 
                           transition-colors duration-300"
                  aria-label="Toggle navigation menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 