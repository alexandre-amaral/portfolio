'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaDatabase, FaCloud, FaMobile, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { SiProtonmail } from 'react-icons/si';
import gsap from 'gsap';

const skills = [
  {
    icon: FaCode,
    title: 'Full Stack Development',
    description: 'Building scalable solutions with modern frameworks and languages for both front-end and back-end development.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FaDatabase,
    title: 'Data Analysis',
    description: 'Analyzing and processing data to extract valuable insights, with expertise in workflow systems and process automation.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FaCloud,
    title: 'System Development',
    description: 'Creating robust and efficient systems focused on process automation and workflow optimization.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FaMobile,
    title: 'AI & Innovation',
    description: 'Contributing to AI projects and implementing innovative solutions for complex problems.',
    color: 'from-orange-500 to-yellow-500'
  }
];

const contactInfo = [
  { icon: FaPhone, text: '+55 31 98985-8037', href: 'tel:+5531989858037' },
  { icon: FaMapMarkerAlt, text: 'Minas Gerais, Brazil', href: null },
  { icon: SiProtonmail, text: 'alexandre.samaral@protonmail.com', href: 'mailto:alexandre.samaral@protonmail.com' },
  { icon: FaGithub, text: 'GitHub', href: 'https://github.com/yourusername' },
  { icon: FaLinkedin, text: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' }
];

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView && containerRef.current) {
      gsap.from(".skill-card", {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".contact-item", {
        duration: 0.5,
        x: -30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    }
  }, [isInView]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1C1C1C] relative overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1C1C]/50 to-[#1C1C1C]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href || '#'}
                className={`contact-item flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 ${!item.href ? 'cursor-default' : ''}`}
                whileHover={item.href ? { scale: 1.05 } : {}}
                whileTap={item.href ? { scale: 0.95 } : {}}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
            Full Stack Developer, freelancer, and Information Systems student with extensive experience in developing systems focused
            on process efficiency and automation. Skilled in creating robust and scalable solutions using a variety of languages and
            frameworks for both front-end and back-end. With experience in workflow system development for the Government of
            Minas Gerais, along with contributions to data analysis and AI projects, I aim to innovate continuously and bring analytical
            value and practicality to every project.
          </p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card group relative p-6 rounded-xl backdrop-blur-sm 
                         border border-gray-700/50 bg-gray-800/20
                         hover:bg-gray-800/30 transition-all duration-300
                         hover:border-gray-600/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} 
                              group-hover:scale-110 transition-transform duration-300
                              shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 
                               group-hover:text-transparent group-hover:bg-clip-text 
                               group-hover:bg-gradient-to-r group-hover:from-white 
                               group-hover:to-gray-400 transition-all duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
              
              {/* Enhanced Decorative Elements */}
              <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r 
                            from-transparent via-gray-600/50 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r 
                            from-transparent via-gray-600/50 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 