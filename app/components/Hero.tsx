'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useTransform, useScroll } from 'framer-motion';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Full Stack Developer',
      description: 'Building modern and scalable web applications'
    },
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    terminal: [
      'Initializing system...',
      'Loading dependencies...',
      'Starting development server...',
      'Ready for coding!'
    ],
    cta: {
      contact: 'Get in Touch'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      title: 'Desenvolvedor Full Stack',
      description: 'Construindo aplicações web modernas e escaláveis'
    },
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    terminal: [
      'Inicializando sistema...',
      'Carregando dependências...',
      'Iniciando servidor de desenvolvimento...',
      'Pronto para programar!'
    ],
    cta: {
      contact: 'Entre em Contato'
    }
  }
};

export default function Hero() {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const t = translations[language];
  const skillsTrackRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const topRightTagRef = useRef<HTMLDivElement>(null);
  const topLeftTagRef = useRef<HTMLDivElement>(null);
  const bottomLeftTagRef = useRef<HTMLDivElement>(null);
  const bottomRightTagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Infinite scrolling animation for skills
    const skillsTrack = skillsTrackRef.current;
    if (skillsTrack) {
      const animation = gsap.to(skillsTrack, {
        x: `-50%`,
        duration: 30,
        repeat: -1,
        ease: "none",
        repeatDelay: 0
      });

      return () => {
        animation.kill();
      };
    }
  }, []);

  // Update the terminal animation useEffect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentMessage = 0;
    let isAnimating = true;

    const typeMessage = () => {
      if (!terminalRef.current || !isAnimating) return;

      const messages = translations[language].terminal;
      const isExecuting = messages[currentMessage].startsWith('⚡');
      const isOutput = messages[currentMessage].startsWith('✨');
      
      const duration = isExecuting ? 0.5 : (isOutput ? 0.8 : 1.5);
      const delay = isExecuting ? 0.5 : (isOutput ? 0.8 : 1);

      const animation = gsap.to(terminalRef.current, {
        duration: duration,
        text: messages[currentMessage],
        ease: isOutput ? "power2.out" : "none",
        onComplete: () => {
          timeoutId = setTimeout(() => {
            if (isAnimating) {
              currentMessage = (currentMessage + 1) % messages.length;
              typeMessage();
            }
          }, delay * 1000);
        }
      });

      if (isExecuting) {
        gsap.to(terminalRef.current, {
          color: "#FFA500",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      } else if (isOutput) {
        gsap.from(terminalRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.3
        });
        gsap.to(terminalRef.current, {
          color: "#4ADE80",
          duration: 0.3
        });
      } else {
        gsap.to(terminalRef.current, {
          color: "#E5E7EB",
          duration: 0.3
        });
      }

      return () => {
        animation.kill();
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    };
    
    // Add delay before starting terminal animation
    setTimeout(() => {
      typeMessage();
    }, 1000);

    return () => {
      isAnimating = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (terminalRef.current) {
        gsap.killTweensOf(terminalRef.current);
      }
    };
  }, [language]);

  // Grid mouse interaction in its own useEffect
  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update grid perspective based on mouse position
        const rotateX = (y - rect.height / 2) / 50;
        const rotateY = (x - rect.width / 2) / 50;
        
        grid.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const handleMouseLeave = () => {
        grid.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      };

      grid.addEventListener('mousemove', handleMouseMove);
      grid.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        grid.removeEventListener('mousemove', handleMouseMove);
        grid.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Enhanced command tags mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Top right tag movement
      if (topRightTagRef.current) {
        const distanceFromTopRight = Math.sqrt(
          Math.pow(innerWidth - clientX, 2) + Math.pow(clientY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2));
        const movement = 20 * (1 - distanceFromTopRight / maxDistance);
        
        topRightTagRef.current.style.transform = `translate(${-movement}px, ${movement}px) rotate(-3deg)`;
      }

      // Top left tag movement
      if (topLeftTagRef.current) {
        const distanceFromTopLeft = Math.sqrt(
          Math.pow(clientX, 2) + Math.pow(clientY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2));
        const movement = 20 * (1 - distanceFromTopLeft / maxDistance);
        
        topLeftTagRef.current.style.transform = `translate(${movement}px, ${movement}px) rotate(3deg)`;
      }

      // Bottom left tag movement
      if (bottomLeftTagRef.current) {
        const distanceFromBottomLeft = Math.sqrt(
          Math.pow(clientX, 2) + Math.pow(innerHeight - clientY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2));
        const movement = 20 * (1 - distanceFromBottomLeft / maxDistance);
        
        bottomLeftTagRef.current.style.transform = `translate(${movement}px, ${-movement}px) rotate(3deg)`;
      }

      // Bottom right tag movement
      if (bottomRightTagRef.current) {
        const distanceFromBottomRight = Math.sqrt(
          Math.pow(innerWidth - clientX, 2) + Math.pow(innerHeight - clientY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2));
        const movement = 20 * (1 - distanceFromBottomRight / maxDistance);
        
        bottomRightTagRef.current.style.transform = `translate(${-movement}px, ${-movement}px) rotate(-3deg)`;
      }
    };

    // Enhanced hover animations using GSAP
    const tags = [topRightTagRef, topLeftTagRef, bottomLeftTagRef, bottomRightTagRef];
    tags.forEach(tagRef => {
      if (tagRef.current) {
        tagRef.current.addEventListener('mouseenter', () => {
          gsap.to(tagRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            borderColor: "rgba(156,163,175,0.5)"
          });
        });

        tagRef.current.addEventListener('mouseleave', () => {
          gsap.to(tagRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            borderColor: "rgba(75,85,99,0.5)"
          });
        });
      }
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tags.forEach(tagRef => {
        if (tagRef.current) {
          tagRef.current.removeEventListener('mouseenter', () => {});
          tagRef.current.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1C1C1C] overflow-hidden pt-24">
      {/* Command Tags */}
      <div
        ref={topRightTagRef}
        className="absolute top-24 right-8 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer"
      >
        <span className="text-green-400">$</span> npm run build
      </div>

      <div
        ref={topLeftTagRef}
        className="absolute top-24 left-8 z-50 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer"
      >
        <span className="text-yellow-400">$</span> yarn install
      </div>

      <div
        ref={bottomLeftTagRef}
        className="absolute bottom-8 left-8 z-50 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer"
      >
        <span className="text-blue-400">{`>`}</span> git push origin main
      </div>

      <div
        ref={bottomRightTagRef}
        className="absolute bottom-8 right-8 z-50 font-mono text-sm bg-[#2A2A2A]/90 
                 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                 transition-all duration-200 ease-out cursor-pointer"
      >
        <span className="text-purple-400">$</span> docker-compose up
      </div>

      {/* Background Pattern with Parallax */}
      <motion.div 
        ref={gridRef}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        className="absolute inset-0 grid-pattern"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div ref={textRef} className="space-y-8 backdrop-blur-sm bg-[#1C1C1C]/30 p-8 rounded-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white title-glow">
              Alexandre Amaral
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-300 subtitle-glow">
              {t.hero.title}
            </h2>
            <p className="text-gray-300 text-lg">
              {t.hero.description}
            </p>

            {/* Contact Button */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex items-center gap-2 px-6 py-3 bg-[#2A2A2A]/80 
                         text-gray-200 rounded-lg border border-gray-700/50 
                         shadow-[0_0_15px_rgba(0,0,0,0.3)]
                         hover:bg-[#333333]/80 hover:border-gray-600
                         hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]
                         transition-all duration-300 ease-out"
              >
                <span>{t.cta.contact}</span>
                <svg 
                  className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-[#2A2A2A]/90 backdrop-blur-sm rounded-lg p-6 
                        shadow-[0_0_30px_rgba(0,0,0,0.4)]
                        border border-gray-700/50
                        min-h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
            </div>
            <div className="font-mono text-lg flex-1">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400"> ~/code</span>
              <div ref={terminalRef} className="text-gray-200 mt-4 leading-relaxed min-h-[200px]"></div>
            </div>
          </div>
        </div>

        {/* Skills Ticker */}
        <div className="mt-20 overflow-hidden relative">
          <div className="absolute left-0 top-0 w-[100px] h-full bg-gradient-to-r from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-[100px] h-full bg-gradient-to-l from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
          <div 
            ref={skillsTrackRef}
            className="flex gap-8 whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            {[...t.skills, ...t.skills].map((skill, index) => (
              <span
                key={index}
                className="text-gray-200 bg-[#2A2A2A]/80 px-6 py-3 rounded-full
                         shadow-[0_0_15px_rgba(0,0,0,0.3)]
                         border border-gray-600/50 backdrop-blur-sm
                         hover:border-gray-500 hover:bg-[#2A2A2A]/95
                         hover:scale-105
                         transition-all duration-300 ease-out
                         text-base cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}