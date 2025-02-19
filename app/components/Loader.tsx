'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500); // Give time for final animation
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]"
    >
      <div className="w-64 relative">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="mt-2 text-center text-gray-400 text-sm font-mono">
          Loading... {progress}%
        </div>
        <div className="absolute -top-8 left-0 right-0 text-center">
          <div className="inline-block px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300 font-mono">
            <span className="text-green-400">$</span> npm run build
          </div>
        </div>
      </div>
    </motion.div>
  );
} 