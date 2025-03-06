'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCodeBranch,
  FaHashtag,
  FaCircle,
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Generate random date within the last 30 days for commit simulation
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  return new Date(now.setDate(now.getDate() - daysAgo));
};

// Generate random commit hash
const generateCommitHash = () => {
  return Math.random().toString(16).substring(2, 10);
};

// Function to transform service description into bullet points
const createBulletPoints = (description: string) => {
  // Split the description into 2-3 bullet points
  const sentences = description.split('.');
  return sentences
    .filter((sentence: string) => sentence.trim().length > 0)
    .map((sentence: string) => sentence.trim() + '.');
};

const translations = {
  en: {
    title: 'Services',
    subtitle: 'Innovative Solutions for Modern Challenges',
    services: [
      {
        title: 'Web Development',
        description: 'Crafting responsive and performant web applications using modern frameworks and best practices.',
        icon: FaCode,
        technologies: ['JavaScript', 'ReactJS', 'NextJS', 'TailwindCSS', 'HTML5', 'CSS3']
      },
      {
        title: 'Backend Solutions',
        description: 'Building robust and secure backend systems with efficient API design and database integration.',
        icon: FaCloud,
        technologies: ['Python', 'NodeJS', 'Laravel', 'Spring', 'PHP', 'C#']
      },
      {
        title: 'Database Engineering',
        description: 'Optimizing data storage, designing efficient schemas, and implementing advanced querying techniques.',
        icon: FaDatabase,
        technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'ETL Processes']
      },
      {
        title: 'Cloud Services',
        description: 'Designing scalable cloud architectures and implementing robust deployment strategies.',
        icon: FaMobileAlt,
        technologies: ['Azure', 'AWS', 'Docker', 'Git', 'Linux', 'CI/CD']
      },
      {
        title: 'AI & Machine Learning',
        description: 'Developing intelligent systems and implementing machine learning models for data analysis and automation.',
        icon: FaRobot,
        technologies: ['Python', 'NLP', 'Data Mining', 'Web Scraping', 'Automated Analysis']
      },
      {
        title: 'Process Automation',
        description: 'Analyzing and improving system performance, reducing manual work, and enhancing business processes.',
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
        description: 'Criando aplicações web responsivas e de alto desempenho usando frameworks modernos e melhores práticas.',
        icon: FaCode,
        technologies: ['JavaScript', 'ReactJS', 'NextJS', 'TailwindCSS', 'HTML5', 'CSS3']
      },
      {
        title: 'Soluções Backend',
        description: 'Construindo sistemas backend robustos e seguros com design eficiente de API e integração de banco de dados.',
        icon: FaCloud,
        technologies: ['Python', 'NodeJS', 'Laravel', 'Spring', 'PHP', 'C#']
      },
      {
        title: 'Engenharia de Banco de Dados',
        description: 'Otimizando armazenamento de dados, projetando esquemas eficientes e implementando técnicas avançadas de consulta.',
        icon: FaDatabase,
        technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Processos ETL']
      },
      {
        title: 'Serviços em Nuvem',
        description: 'Projetando arquiteturas em nuvem escaláveis e implementando estratégias robustas de implantação.',
        icon: FaMobileAlt,
        technologies: ['Azure', 'AWS', 'Docker', 'Git', 'Linux', 'CI/CD']
      },
      {
        title: 'IA & Aprendizado de Máquina',
        description: 'Desenvolvendo sistemas inteligentes e implementando modelos de aprendizado de máquina para análise de dados e automação.',
        icon: FaRobot,
        technologies: ['Python', 'NLP', 'Mineração de Dados', 'Web Scraping', 'Análise Automatizada']
      },
      {
        title: 'Automação de Processos',
        description: 'Analisando e melhorando o desempenho do sistema, reduzindo trabalho manual e aprimorando processos de negócios.',
        icon: FaChartLine,
        technologies: ['Automação de Fluxos', 'Scripting', 'Processamento de Dados', 'ETL', 'Integração de Sistemas']
      }
    ]
  }
};

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en; // Fallback to English if translation is missing
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    // Make sure GSAP and ScrollTrigger are available
    if (typeof window !== "undefined") {
      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      const section = sectionRef.current;
      const slider = sliderRef.current;
      
      if (!section || !slider) return;
      
      // Calculate the width of all cards plus gaps
      const totalWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Only create the horizontal scroll effect if there's enough content to scroll
      if (totalWidth > viewportWidth) {
        // Create the horizontal scroll animation
        const horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalWidth - viewportWidth + 100}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
        
        // Animate the slider from its starting position to the end
        horizontalScroll.to(slider, {
          x: -(totalWidth - viewportWidth + 100),
          ease: "none",
          duration: 1
        });
      }
    }
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [language]); // Re-run when language changes

  return (
    <div 
      ref={sectionRef}
      className="relative bg-[#1C1C1C] overflow-hidden pt-28 md:pt-24 pb-16 md:pb-24"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        className="absolute inset-0 grid-pattern"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>

      {/* Main Container */}
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold title-glow text-white mb-4">
            {t?.title || 'Services'}
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            {t?.subtitle || 'Innovative Solutions for Modern Challenges'}
          </p>
          <div className="flex items-center justify-center">
            <div className="px-3 py-1 bg-[#238636] rounded-full text-white text-sm flex items-center gap-1">
              <FaCodeBranch className="text-sm" />
              <span>main</span>
            </div>
          </div>
        </div>


        {/* Services Horizontal Scroll Container */}
        <div ref={containerRef} className="relative overflow-hidden">
          {/* Gradient Shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Container */}
          <div 
            ref={sliderRef}
            className="flex gap-6 md:gap-8 pb-4 will-change-transform pl-8"
          >
            {t?.services?.map((service, index) => {
              const commitDate = getRandomRecentDate();
              const commitHash = generateCommitHash();
              const timeAgo = formatDistanceToNow(commitDate, { 
                addSuffix: true,
                locale: language === 'pt' ? ptBR : enUS
              });
              const bulletPoints = createBulletPoints(service.description);
              
              return (
                <div
                  key={index}
                  className="relative bg-[#0d1117] backdrop-blur-lg rounded-md
                            border border-gray-700/50 
                            hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
                            transition-all duration-500 group
                            w-[320px] md:w-[380px] flex-shrink-0 overflow-hidden"
                >
                  {/* Glow effect behind card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-md
                               opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  {/* Commit Header */}
                  <div className="relative border-b border-gray-700/50 bg-[#161b22] px-4 py-3 flex items-center">
                    <GoGitCommit className="text-green-500 mr-3 text-lg" />
                    <div>
                      <h3 className="text-white text-base md:text-lg font-medium group-hover:text-blue-100 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-gray-500 flex items-center">
                          <FaHashtag className="text-xs mr-1" />
                          {commitHash}
                        </span>
                        <span>{timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Commit Description */}
                  <div className="relative z-10 p-4 md:p-5">
                    <div className="bg-[#1f2937]/20 border border-gray-700/30 rounded-md p-3 md:p-4 mb-4 md:mb-5">
                      <ul className="space-y-2">
                        {bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <FaCircle className="text-blue-500 mt-1.5 mr-2 text-[6px]" />
                            <span className="text-gray-300 leading-relaxed text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Commit Stats and Tags */}
                    <div className="space-y-3">
                      <div className="text-xs md:text-sm flex justify-between">
                        <div className="text-green-400">+{Math.floor(Math.random() * 50) + 10} additions</div>
                        <div className="text-red-400">-{Math.floor(Math.random() * 20)} deletions</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 bg-[#1d2230] text-gray-300 text-xs
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}