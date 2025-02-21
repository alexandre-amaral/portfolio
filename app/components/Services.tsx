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
        start: 'top top',
        end: () => `+=${cards.scrollWidth - window.innerWidth + 100}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Anima a linha principal baseado no progresso do scroll
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
      x: () => -(cards.scrollWidth - window.innerWidth + 100),
      ease: 'none',
    });

    // Branch animations
    branchesRef.current.forEach((branch, index) => {
      if (!branch) return;

      const branchLine = branch.querySelector('.branch-line');
      const branchDot = branch.querySelector('.branch-dot');
      const branchContent = branch.querySelector('.branch-content');
      const connectingLine = branch.querySelector('.connecting-line');
      const isEven = index % 2 === 0;

      if (branchLine && branchDot && branchContent && connectingLine) {
        gsap.set(branch, { 
          y: isEven ? -100 : 100,
          opacity: 0 
        });

        ScrollTrigger.create({
          trigger: branch,
          containerAnimation: tl,
          start: 'left center',
          end: 'right center',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            // Anima o card e seus elementos
            gsap.to(branch, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out'
            });

            // Anima a linha vertical
            gsap.fromTo(branchLine, 
              { 
                scaleY: 0,
                transformOrigin: isEven ? 'bottom' : 'top'
              },
              {
                scaleY: 1,
                duration: 0.4,
                ease: 'power2.inOut'
              }
            );

            // Anima o ponto da branch
            gsap.fromTo(branchDot,
              { 
                scale: 0,
                opacity: 0 
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(1.7)'
              }
            );

            // Anima a linha de conexão
            gsap.fromTo(connectingLine,
              { 
                scaleX: 0,
                transformOrigin: 'left'
              },
              {
                scaleX: 1,
                duration: 0.6,
                ease: 'power2.inOut',
                delay: 0.2
              }
            );

            // Anima o conteúdo do card
            gsap.fromTo(branchContent,
              { 
                opacity: 0,
                scale: 0.8,
                y: isEven ? -20 : 20
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
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
      className="relative bg-[#1C1C1C] overflow-hidden"
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
        className="min-h-screen relative"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center py-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 title-glow text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 subtitle-glow">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Branch Line */}
        <div 
          ref={mainBranchRef}
          className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2
                     bg-gradient-to-r from-blue-500/30 to-purple-500/30"
          style={{
            '--progress': '0',
            maskImage: 'linear-gradient(to right, black var(--progress, 0%), transparent var(--progress, 0%))',
            WebkitMaskImage: 'linear-gradient(to right, black var(--progress, 0%), transparent var(--progress, 0%))'
          } as React.CSSProperties}
        />

        {/* Cards Container */}
        <div 
          ref={cardsRef}
          className="flex pl-[20%] space-x-32 pb-20 pr-[20%]"
        >
          {t.services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={setRef(index)}
                className={`relative flex-shrink-0 w-[400px] ${isEven ? '-translate-y-32' : 'translate-y-32'}`}
              >
                {/* Connecting Line to Main Branch */}
                <div 
                  className={`absolute connecting-line h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50
                              ${isEven ? 'top-[calc(100%+64px)] left-8' : 'bottom-[calc(100%+64px)] left-8'}
                              w-32`}
                />

                {/* Vertical Branch Line */}
                <div 
                  className={`absolute branch-line w-1 bg-gradient-to-b from-blue-500/50 to-purple-500/50
                              ${isEven ? 'top-full left-8' : 'bottom-full left-8'}
                              h-16`}
                />

                {/* Branch Dot */}
                <div 
                  className={`absolute branch-dot w-6 h-6 bg-blue-500 rounded-full
                              ${isEven ? 'top-[calc(100%+64px)] left-6' : 'bottom-[calc(100%+64px)] left-6'}
                              flex items-center justify-center border-2 border-white/20
                              shadow-[0_0_20px_rgba(59,130,246,0.5)]`}
                >
                  <FaGithub className="w-3 h-3 text-white/70" />
                </div>

                {/* Card Content */}
                <div 
                  className="branch-content bg-[#2A2A2A]/40 backdrop-blur-lg rounded-2xl
                             border border-gray-700/50 p-8 h-full
                             hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                             transition-all duration-500 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl mr-4">
                      <Icon className="w-10 h-10 text-blue-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-[#1C1C1C]/50 text-gray-300 text-sm
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