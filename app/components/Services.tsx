'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCode, 
  FaCloud, 
  FaDatabase, 
  FaMobileAlt, 
  FaRobot, 
  FaChartLine
} from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    title: 'Services',
    subtitle: 'Innovative Solutions for Modern Challenges',
    services: [
      {
        title: 'Web Development',
        description: 'Crafting responsive and performant web applications using modern frameworks and best practices.',
        icon: FaCode,
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind']
      },
      {
        title: 'Cloud Solutions',
        description: 'Designing scalable cloud architectures and implementing robust deployment strategies.',
        icon: FaCloud,
        technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
      },
      {
        title: 'Database Engineering',
        description: 'Optimizing data storage, designing efficient schemas, and implementing advanced querying techniques.',
        icon: FaDatabase,
        technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
      },
      {
        title: 'Mobile Development',
        description: 'Creating cross-platform mobile applications with native-like performance and user experience.',
        icon: FaMobileAlt,
        technologies: ['React Native', 'Flutter', 'Expo', 'Swift']
      },
      {
        title: 'AI & Machine Learning',
        description: 'Developing intelligent systems and implementing machine learning models for predictive analytics.',
        icon: FaRobot,
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn']
      },
      {
        title: 'Performance Optimization',
        description: 'Analyzing and improving system performance, reducing latency, and enhancing user experience.',
        icon: FaChartLine,
        technologies: ['Profiling', 'Caching', 'Load Testing', 'Monitoring']
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
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind']
      },
      {
        title: 'Soluções em Nuvem',
        description: 'Projetando arquiteturas em nuvem escaláveis e implementando estratégias robustas de implantação.',
        icon: FaCloud,
        technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
      },
      {
        title: 'Engenharia de Banco de Dados',
        description: 'Otimizando armazenamento de dados, projetando esquemas eficientes e implementando técnicas avançadas de consulta.',
        icon: FaDatabase,
        technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
      },
      {
        title: 'Desenvolvimento Mobile',
        description: 'Criando aplicações móveis multiplataforma com desempenho e experiência de usuário nativos.',
        icon: FaMobileAlt,
        technologies: ['React Native', 'Flutter', 'Expo', 'Swift']
      },
      {
        title: 'IA & Aprendizado de Máquina',
        description: 'Desenvolvendo sistemas inteligentes e implementando modelos de aprendizado de máquina para análise preditiva.',
        icon: FaRobot,
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn']
      },
      {
        title: 'Otimização de Performance',
        description: 'Analisando e melhorando o desempenho do sistema, reduzindo latência e aprimorando a experiência do usuário.',
        icon: FaChartLine,
        technologies: ['Profiling', 'Caching', 'Load Testing', 'Monitoring']
      }
    ]
  }
};

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;

    const totalScroll = slider.offsetWidth - container.offsetWidth;

    gsap.to(slider, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "+=200%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 title-glow text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 subtitle-glow max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Services Horizontal Scroll */}
        <div ref={containerRef} className="relative overflow-hidden">
          {/* Gradient Shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Container */}
          <div 
            ref={sliderRef}
            className="flex gap-6 md:gap-8 pb-4"
          >
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="relative bg-[#2A2A2A]/40 backdrop-blur-lg rounded-2xl
                            border border-gray-700/50 p-6 md:p-8
                            hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
                            transition-all duration-500 group
                            w-[300px] md:w-[350px] flex-shrink-0"
                >
                  {/* Glow effect behind card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl
                               opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className="p-2 md:p-3 bg-blue-500/10 rounded-xl mr-3 md:mr-4
                                  group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                                  transition-all duration-500">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-500 group-hover:text-blue-400 
                                     group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]
                                     transition-all duration-500" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white
                                 group-hover:text-blue-100 transition-colors duration-500">{service.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base
                               group-hover:text-gray-300 transition-colors duration-500">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 md:px-4 py-1.5 md:py-2 bg-[#1C1C1C]/50 text-gray-300 text-xs md:text-sm
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}