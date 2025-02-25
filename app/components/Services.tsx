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
  FaChartLine,
  FaGithub 
} from 'react-icons/fa';

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
  const cardsRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mainBranchRef = useRef<HTMLDivElement>(null);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    branchesRef.current[index] = el;
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;
    const mainBranch = mainBranchRef.current;
    if (!container || !cards || !mainBranch) return;

    // Main horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'center center',
        end: () => `+=${cards.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Animate main branch based on scroll progress
          const progress = self.progress;
          gsap.to(mainBranch, {
            '--progress': progress * 100,
            duration: 0.1,
          });
        }
      }
    });

    // Animate cards container
    tl.to(cards, {
      x: () => -(cards.scrollWidth - window.innerWidth),
      ease: 'none',
    });

    // Branch animations
    branchesRef.current.forEach((branch, index) => {
      if (!branch) return;

      const branchLine = branch.querySelector('.branch-line');
      const branchDot = branch.querySelector('.branch-dot');
      const branchContent = branch.querySelector('.branch-content');
      const connectingLine = branch.querySelector('.connecting-line');
      const branchPulse = branch.querySelector('.branch-pulse');
      const isEven = index % 2 === 0;

      if (branchLine && branchDot && branchContent && connectingLine && branchPulse) {
        ScrollTrigger.create({
          trigger: branch,
          containerAnimation: tl,
          start: 'left center',
          end: 'right center',
          onEnter: () => {
            // Animate branch line with loading effect
            gsap.fromTo(branchLine, 
              { 
                scaleY: 0,
                transformOrigin: isEven ? 'bottom' : 'top'
              },
              {
                scaleY: 1,
                duration: 0.6,
                ease: 'power2.inOut'
              }
            );

            // Animate branch dot with pulse effect
            gsap.fromTo(branchDot,
              { 
                scale: 0
              },
              {
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.7)'
              }
            );

            // Animate pulse effect
            gsap.fromTo(branchPulse,
              {
                scale: 0.5,
                opacity: 0.8
              },
              {
                scale: 2,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                ease: 'power2.out'
              }
            );

            // Animate connecting line with gradient flow
            gsap.fromTo(connectingLine,
              { 
                '--line-progress': '0%'
              },
              {
                '--line-progress': '100%',
                duration: 0.8,
                ease: 'power2.inOut'
              }
            );

            // Animate card content
            gsap.fromTo(branchContent,
              { 
                y: isEven ? -20 : 20,
                scale: 0.95
              },
              {
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: 0.3,
                ease: 'power2.out'
              }
            );
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative bg-[#1C1C1C] overflow-hidden py-24 md:py-32"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        className="absolute inset-0 grid-pattern"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>

      {/* Main Container */}
      <div 
        ref={containerRef} 
        className="relative min-h-[calc(100vh+32rem)] md:h-[calc(100vh+32rem)]"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-48 md:mb-64 px-4 relative pt-24 md:pt-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 title-glow text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 subtitle-glow max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Branch Line */}
        <div 
          ref={mainBranchRef}
          className="absolute left-0 right-0 h-1 top-[60%] transform -translate-y-1/2
                     bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30"
          style={{
            '--progress': '0',
            maskImage: 'linear-gradient(to right, black var(--progress, 0%), transparent var(--progress, 0%))',
            WebkitMaskImage: 'linear-gradient(to right, black var(--progress, 0%), transparent var(--progress, 0%))'
          } as React.CSSProperties}
        />

        {/* Cards Container */}
        <div 
          ref={cardsRef}
          className="flex space-x-32 px-8 md:px-16 pb-96 pt-32 md:pt-48"
        >
          {t.services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={setRef(index)}
                className={`relative flex-shrink-0 w-[300px] md:w-[400px] ${isEven ? '-translate-y-32 md:-translate-y-40' : 'translate-y-32 md:translate-y-40'}`}
              >
                {/* Connecting Line to Main Branch */}
                <div 
                  className={`absolute connecting-line h-1 
                              ${isEven ? 'top-[calc(100%+48px)] md:top-[calc(100%+96px)] left-8' : 'bottom-[calc(100%+48px)] md:bottom-[calc(100%+96px)] left-8'}
                              w-32`}
                  style={{
                    background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                    '--line-progress': '0%',
                    maskImage: 'linear-gradient(to right, black var(--line-progress), transparent var(--line-progress))',
                    WebkitMaskImage: 'linear-gradient(to right, black var(--line-progress), transparent var(--line-progress))'
                  } as React.CSSProperties}
                />

                {/* Vertical Branch Line */}
                <div 
                  className={`absolute branch-line w-1 bg-gradient-to-b from-blue-500 to-purple-500
                              ${isEven ? 'top-full left-8' : 'bottom-full left-8'}
                              h-12 md:h-24`}
                />

                {/* Branch Dot with Pulse Effect */}
                <div 
                  className={`absolute ${isEven ? 'top-[calc(100%+48px)] md:top-[calc(100%+96px)]' : 'bottom-[calc(100%+48px)] md:bottom-[calc(100%+96px)]'} left-6`}
                >
                  <div className="relative">
                    <div 
                      className="branch-pulse absolute inset-0 w-6 h-6 rounded-full bg-blue-500/30"
                    />
                    <div 
                      className="branch-dot w-6 h-6 bg-blue-500 rounded-full
                                flex items-center justify-center border-2 border-white/20
                                shadow-[0_0_20px_rgba(59,130,246,0.5)] relative z-10"
                    >
                      <FaGithub className="w-3 h-3 text-white/70" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div 
                  className="branch-content bg-[#2A2A2A]/40 backdrop-blur-lg rounded-2xl
                             border border-gray-700/50 p-6 md:p-8 h-full
                             hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                             transition-all duration-500 group"
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="p-2 md:p-3 bg-blue-500/10 rounded-xl mr-3 md:mr-4">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 md:px-4 py-1.5 md:py-2 bg-[#1C1C1C]/50 text-gray-300 text-xs md:text-sm
                                 rounded-full border border-gray-700/30
                                 hover:bg-blue-500/10 hover:border-blue-500/50
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
  );
} 