'use client';

import { motion } from 'framer-motion';
import GetInTouch from '../components/GetInTouch';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-[#1C1C1C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </div>

      {/* Command Tags */}
      <div
        className="absolute top-24 left-8 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer
                 hover:scale-105 hover:border-gray-600"
      >
        <span className="text-pink-400">$</span> mail -s &quot;Hello&quot; contact@me.com
      </div>

      <div
        className="absolute top-24 right-8 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer
                 hover:scale-105 hover:border-gray-600"
      >
        <span className="text-cyan-400">$</span> ssh connect@portfolio
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-32 relative z-10"
      >
        <GetInTouch />
      </motion.div>
    </section>
  );
} 