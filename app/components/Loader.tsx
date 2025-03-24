'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  en: {
    loading: 'Loading...',
    command: 'npm run build'
  },
  pt: {
    loading: 'Carregando...',
    command: 'npm run build'
  }
};

interface LoaderProps {
  onLoadingComplete: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 400); // Tempo intermediário para transição final
          return 100;
        }
        // Incremento moderado para carregamento
        return Math.min(prev + 2, 100);
      });
    }, 15); // Intervalo intermediário

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.4 }} // Transição moderada
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]"
    >
      <div className="w-64 relative">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.08 }} // Animação moderada
          />
        </div>
        <div className="mt-2 text-center text-gray-400 text-sm font-mono">
          {t.loading} {progress}%
        </div>
        <div className="absolute -top-8 left-0 right-0 text-center">
          <div className="inline-block px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300 font-mono">
            <span className="text-green-400">$</span> {t.command}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 