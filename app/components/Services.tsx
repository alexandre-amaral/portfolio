'use client';

import { useRef, useLayoutEffect, useState, useCallback, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCodeBranch,
  FaHashtag,
  FaCode, 
  FaCloud, 
  FaDatabase, 
  FaMobileAlt, 
  FaRobot, 
  FaChartLine
} from 'react-icons/fa';
import { GoGitCommit } from "react-icons/go";
import { formatDistanceToNow } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { useEffect } from 'react';
import { IconType } from 'react-icons';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define types for better type safety
interface ServiceItem {
  title: string;
  description: string;
  icon: IconType;
  technologies: string[];
}

interface TranslationType {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

// Helper functions moved to a separate section for better organization
const helpers = {
  // Generate random date within the last 30 days for commit simulation
  getRandomRecentDate: () => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    return new Date(now.setDate(now.getDate() - daysAgo));
  },

  // Generate random commit hash
  generateCommitHash: () => {
    return Math.random().toString(16).substring(2, 10);
  },

  // Function to transform service description into bullet points
  createBulletPoints: (description: string) => {
    return description.split('\n').filter(point => point.trim().length > 0);
  }
};

// Translation data
const translations: Record<string, TranslationType> = {
  en: {
    title: 'Services',
    subtitle: 'Innovative Solutions for Modern Challenges',
    services: [
      {
        title: 'Web Development',
        description: '- Frontend Development with React and Next.js\n- Responsive Web Design\n- Modern UI/UX Implementation\n- Performance Optimization',
        icon: FaCode,
        technologies: ['JavaScript', 'ReactJS', 'NextJS', 'TailwindCSS', 'HTML5', 'CSS3']
      },
      {
        title: 'Backend Solutions',
        description: '- RESTful API Development\n- Microservices Architecture\n- Authentication & Authorization\n- Server-side Performance Optimization',
        icon: FaCloud,
        technologies: ['Python', 'NodeJS', 'Laravel', 'Spring', 'PHP', 'C#']
      },
      {
        title: 'Database Engineering',
        description: '- Database Design & Modeling\n- Query Optimization\n- Data Migration\n- Database Administration',
        icon: FaDatabase,
        technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'ETL Processes']
      },
      {
        title: 'Cloud Services',
        description: '- Cloud Infrastructure Setup\n- Containerization & Orchestration\n- CI/CD Pipeline Implementation\n- Cloud Security Management',
        icon: FaMobileAlt,
        technologies: ['Azure', 'AWS', 'Docker', 'Git', 'Linux', 'CI/CD']
      },
      {
        title: 'AI & Machine Learning',
        description: '- Machine Learning Model Development\n- Natural Language Processing\n- Data Analysis & Visualization\n- Predictive Analytics',
        icon: FaRobot,
        technologies: ['Python', 'NLP', 'Data Mining', 'Web Scraping', 'Automated Analysis']
      },
      {
        title: 'Process Automation',
        description: '- Business Process Automation\n- Task Scheduling & Monitoring\n- Integration Development\n- Workflow Optimization',
        icon: FaChartLine,
        technologies: ['Workflow Automation', 'Scripting', 'Data Processing', 'ETL', 'System Integration']
      }
    ]
  },
  pt: {
    title: 'Serviços',
    subtitle: 'Soluções Inovadoras para Desafios Modernos',
    services: [
      {
        title: 'Desenvolvimento Web',
        description: '- Desenvolvimento Frontend com React e Next.js\n- Design Web Responsivo\n- Implementação de UI/UX Moderna\n- Otimização de Performance',
        icon: FaCode,
        technologies: ['JavaScript', 'ReactJS', 'NextJS', 'TailwindCSS', 'HTML5', 'CSS3']
      },
      {
        title: 'Soluções Backend',
        description: '- Desenvolvimento de APIs RESTful\n- Arquitetura de Microsserviços\n- Autenticação & Autorização\n- Otimização de Performance Backend',
        icon: FaCloud,
        technologies: ['Python', 'NodeJS', 'Laravel', 'Spring', 'PHP', 'C#']
      },
      {
        title: 'Engenharia de Banco de Dados',
        description: '- Design e Modelagem de Banco de Dados\n- Otimização de Consultas\n- Migração de Dados\n- Administração de Banco de Dados',
        icon: FaDatabase,
        technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Processos ETL']
      },
      {
        title: 'Serviços em Nuvem',
        description: '- Configuração de Infraestrutura Cloud\n- Containerização & Orquestração\n- Implementação de Pipeline CI/CD\n- Gerenciamento de Segurança Cloud',
        icon: FaMobileAlt,
        technologies: ['Azure', 'AWS', 'Docker', 'Git', 'Linux', 'CI/CD']
      },
      {
        title: 'IA & Aprendizado de Máquina',
        description: '- Desenvolvimento de Modelos de Machine Learning\n- Processamento de Linguagem Natural\n- Análise e Visualização de Dados\n- Analytics Preditivo',
        icon: FaRobot,
        technologies: ['Python', 'NLP', 'Mineração de Dados', 'Web Scraping', 'Análise Automatizada']
      },
      {
        title: 'Automação de Processos',
        description: '- Automação de Processos de Negócio\n- Agendamento e Monitoramento de Tarefas\n- Desenvolvimento de Integrações\n- Otimização de Fluxos de Trabalho',
        icon: FaChartLine,
        technologies: ['Automação de Fluxos', 'Scripting', 'Processamento de Dados', 'ETL', 'Integração de Sistemas']
      }
    ]
  }
};

// Memoized Service Card Component for better performance
const ServiceCard = memo(({ 
  service, 
  index, 
  language 
}: { 
  service: ServiceItem, 
  index: number, 
  language: 'en' | 'pt' 
}) => {
  const isEven = index % 2 === 0;
  const commitDate = helpers.getRandomRecentDate();
  const commitHash = helpers.generateCommitHash();
  const timeAgo = formatDistanceToNow(commitDate, { 
    addSuffix: true,
    locale: language === 'pt' ? ptBR : enUS
  });
  const bulletPoints = helpers.createBulletPoints(service.description);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 0, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay: Math.min(index * 0.1, 0.5), // Cap max delay for better UX
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{
        scale: 1.02,
        rotateY: isEven ? -1 : 1,
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`service-card relative bg-[#0d1117] backdrop-blur-lg rounded-xl
                border border-gray-700/50 
                hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                transition-all duration-300 group
                transform perspective-1000 mb-10 sm:mb-12 md:mb-16 
                ${isEven ? 'md:ml-auto md:mr-[10%]' : 'md:ml-[10%] md:mr-auto'} 
                mx-auto w-[90%] sm:w-[80%] md:w-[75%] max-w-xl`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Connection to branch line - horizontal line for desktop */}
      <div className={`absolute top-1/2 ${isEven ? 'right-full' : 'left-full'} transform -translate-y-1/2 h-[3px] w-[8%] sm:w-[10%] hidden md:block`}
          style={{
            background: isEven 
              ? 'linear-gradient(to left, #238636, transparent)' 
              : 'linear-gradient(to right, #238636, transparent)',
            boxShadow: '0 0 8px rgba(35,134,54,0.4)'
          }}
          aria-hidden="true"
      ></div>
      
      {/* Mobile connection to branch line - improved */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[2px] sm:w-[3px] h-4 sm:h-4 bg-[#238636] md:hidden"
           style={{ boxShadow: '0 0 8px rgba(35,134,54,0.4)' }}
           aria-hidden="true"
      ></div>
      
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl
                   opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
           aria-hidden="true"
      />
      
      {/* Commit Header - improved for mobile */}
      <div className="relative border-b border-gray-700/50 bg-[#161b22] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center rounded-t-xl">
        <GoGitCommit className="text-green-500 mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium group-hover:text-blue-100 transition-colors duration-300 truncate">
            {service.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <span className="text-gray-500 flex items-center">
              <FaHashtag className="text-xs mr-1 flex-shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[60px] sm:max-w-none">{commitHash}</span>
            </span>
            <span className="truncate">{timeAgo}</span>
          </div>
        </div>
      </div>
      
      {/* Commit Description - improved for mobile */}
      <div className="relative z-10 p-3 sm:p-4 md:p-5">
        <div className="bg-[#1f2937]/20 border border-gray-700/30 rounded-md p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-5">
          <ul className="space-y-2 list-none" aria-label={`Features of ${service.title}`}>
            {bulletPoints.map((point, i) => (
              <li key={i} className="text-gray-300 leading-relaxed text-xs sm:text-sm pl-2 border-l-2 border-blue-500/50 list-none">
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Technologies - improved for mobile */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {service.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#1d2230] text-gray-300 text-[10px] sm:text-xs
                       rounded-full border border-gray-700/30
                       hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-200
                       hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                       transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// Set display name for improved debugging
ServiceCard.displayName = 'ServiceCard';

// Background Decorations Component
const BackgroundDecorations = memo(({ isMobile }: { isMobile: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Decorative circles - reduced quantity for better mobile performance */}
    {[...Array(isMobile ? 6 : 12)].map((_, i) => (
      <motion.div
        key={`circle-${i}`}
        className="absolute rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(35,134,54,0.3) 0%, rgba(35,134,54,0) 70%)`,
          width: `${Math.random() * 200 + 50}px`,
          height: `${Math.random() * 200 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, Math.random() * 30 - 15],
          y: [0, Math.random() * 30 - 15],
          scale: [1, Math.random() * 0.3 + 0.9],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: Math.random() * 5 + 5,
        }}
        aria-hidden="true"
      />
    ))}
    
    {/* Code-like elements - reduced quantity for better performance */}
    {[...Array(isMobile ? 3 : 7)].map((_, i) => (
      <motion.div
        key={`code-element-${i}`}
        className="absolute h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, rgba(35,134,54,0) 0%, rgba(35,134,54,0.5) 50%, rgba(35,134,54,0) 100%)',
          width: `${Math.random() * 150 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.1, 0.3],
          width: [`${Math.random() * 100 + 50}px`, `${Math.random() * 200 + 100}px`]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: Math.random() * 3 + 2,
        }}
        aria-hidden="true"
      />
    ))}
  </div>
));

BackgroundDecorations.displayName = 'BackgroundDecorations';

// Main component using React's automatic memoization
export default function Services() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const sectionRef = useRef<HTMLDivElement>(null);
  const branchLineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // State for window dimensions with memoized handler
  const [isMobile, setIsMobile] = useState(false);
  
  // Memoized resize handler to prevent recreation on each render
  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // Effect for window resize listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial value
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Separate GSAP animations into its own effect
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    
    // Clear any existing ScrollTriggers to prevent memory leaks
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const cards = document.querySelectorAll('.service-card');
    const branchLine = branchLineRef.current;

    if (cards.length > 0 && branchLine) {
      // Animate branch line
      gsap.fromTo(branchLine,
        { height: 0 },
        {
          height: "100%",
          duration: 1.5, // Faster animation for better UX
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // Only animate visible cards for better performance
      cards.forEach((card, index) => {
        if (index < 10) { // Limit animations to first 10 cards for performance
          gsap.fromTo(card,
            { 
              opacity: 0,
              y: 30, // Reduced value for more subtle animation
              rotateX: -10, // Less extreme rotation
              scale: 0.97 // Closer to final size
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.8, // Faster animation
              ease: "power2.out", // Smoother easing
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "top center",
                toggleActions: "play none none reverse",
              },
              delay: Math.min(index * 0.08, 0.4) // Cap maximum delay
            }
          );
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [language]); // Only re-run when language changes

  // Calculate parallax effect values with reduced intensity for mobile
  const parallaxIntensity = isMobile ? 0.3 : 0.7; // Reduced intensity for smoother feel
  const branchParallax = useTransform(scrollYProgress, [0, 1], [0, 80 * parallaxIntensity]);
  const cardsParallax = useTransform(scrollYProgress, [0, 1], [0, 120 * parallaxIntensity]);

  return (
    <div 
      ref={sectionRef}
      className="relative bg-[#1C1C1C] overflow-hidden pt-16 md:pt-24 pb-16 md:pb-24"
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200 * parallaxIntensity]) }}
        className="absolute inset-0 grid-pattern"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>

      {/* Floating Background Elements */}
      <BackgroundDecorations isMobile={isMobile} />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-14">
          <motion.h2 
            id="services-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold title-glow text-white mb-3 md:mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg mb-4 md:mb-6 px-2"
          >
            {t.subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="px-4 py-1.5 bg-[#238636] rounded-full text-white text-sm flex items-center gap-2
                         shadow-[0_0_20px_rgba(35,134,54,0.3)] hover:shadow-[0_0_30px_rgba(35,134,54,0.5)]
                         transition-all duration-300 cursor-default">
              <FaCodeBranch className="text-sm" aria-hidden="true" />
              <span>main</span>
            </div>
          </motion.div>
        </div>

        {/* Branch Line - Enhanced and more responsive */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 top-[250px] bottom-0 w-[2px] sm:w-[3px] bg-gradient-to-b from-[#238636] via-[#238636] to-[#238636]/30"
          ref={branchLineRef}
          style={{ 
            y: branchParallax,
            boxShadow: '0 0 15px rgba(35,134,54,0.5)'
          }}
          aria-hidden="true"
        ></motion.div>

        {/* Services Grid in Zig-Zag Pattern - Enhanced with virtual rendering for performance */}
        <motion.div 
          ref={cardsRef}
          style={{ y: cardsParallax }}
          className="relative mx-auto max-w-4xl"
          aria-label="List of services"
        >
          {/* Only render services that would be visible for better performance */}
          {t.services.map((service, index) => (
            <ServiceCard 
              key={`service-${index}`} 
              service={service} 
              index={index} 
              language={language as 'en' | 'pt'} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}