'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaLightbulb, FaCogs } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Translation = {
  title: string;
  subtitle: string;
  description: string;
  skills: {
    title: string;
    categories: {
      [key: string]: string[];
    };
  };
  experience: {
    title: string;
    items: Array<{
      year: string;
      position: string;
      company: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    contactButton: string;
    getInTouchButton: string;
    features: Array<{
      title: string;
      description: string;
      icon: React.ElementType;
    }>;
  };
};

type Translations = {
  en: Translation;
  pt: Translation;
};

const translations: Translations = {
  en: {
    title: 'About Me',
    subtitle: 'Back-End Developer & Data Analyst',
    description: 'Software Developer, freelancer, and Information Systems student with extensive experience in developing systems focused on process efficiency and automation. Skilled in creating robust and scalable solutions using a variety of languages and frameworks for both front-end and back-end. With experience in development for private companies and the Government of Minas Gerais, along with contributions to data analysis and artificial intelligence projects, I continually seek to innovate and bring practicality to each project.',
    skills: {
      title: 'Skills & Technologies',
      categories: {
        'Programming Languages': ['JavaScript', 'Python', 'Java', 'PHP', 'SQL', 'C#'],
        'Frontend': ['HTML5', 'CSS3', 'ReactJS', 'NextJS', 'TailwindCSS', 'Bootstrap5'],
        'Frameworks': ['NodeJS', 'Laravel', 'Spring'],
        'Database': ['MySQL', 'PostgreSQL', 'MongoDB'],
        'Tools': ['Azure', 'AWS', 'Docker', 'Git', 'Linux']
      }
    },
    experience: {
      title: 'Experience',
      items: [
        {
          year: '2024',
          position: 'Back-End Developer',
          company: 'Via Capital',
          description: 'Development and maintenance of APIs using Python/FastAPI, database management with MS SQL Server, implementation of automation routines, and development of UI in React/NextJS.'
        },
        {
          year: '2023-2024',
          position: 'Full Stack Developer',
          company: 'SEGOV - Government of MG',
          description: 'Development and management of a document workflow system using Laravel and MySQL, optimizing workflows and reducing processing time. Implementation of ETL processes for data collection and analysis.'
        },
        {
          year: '2023-2024',
          position: 'Junior Researcher / AI Developer',
          company: 'PUC Minas / SOLIRIS',
          description: 'Development of an automated resume analysis tool using NLP and Machine Learning, optimizing HR screening processes. Implementation of Web Scraping algorithms and data processing.'
        },
        {
          year: '2022-2023',
          position: 'Full Stack Developer',
          company: 'Project with UFMG Professors',
          description: 'Development of a toxicological calculator, implementing data extraction and mining algorithms to support pharmacology research. Creation of APIs in Flask and FastAPI.'
        },
        {
          year: '2021-now',
          position: 'Freelancer',
          company: 'Independent Projects',
          description: 'Development, deployment and maintenance of web applications for clients, focusing on responsiveness, SEO and performance.'
        },
        {
          year: '2021-2022',
          position: 'Web Developer',
          company: 'Paiva Piovesan',
          description: 'Development of a financial platform in .NET, C#, HTML and CSS, enhancing the user interface and experience. Collaboration on usability improvements.'
        },
        {
          year: '2020-2021',
          position: 'IT Intern',
          company: 'Prefeitura de Belo Horizonte',
          description: "Maintenance and updates of the City Hall's e-learning platform, focusing on improvements and bug fixes. Data transformation to generate strategic information."
        }
      ]
    },
    cta: {
      title: 'Transforming Business with Cutting-Edge Solutions',
      subtitle: 'Bringing innovation and efficiency to your digital transformation journey',
      contactButton: 'Contact Me',
      getInTouchButton: 'Get in Touch',
      features: [
        {
          title: 'Innovation',
          description: 'Leveraging cutting-edge technologies to create innovative solutions',
          icon: FaLightbulb
        },
        {
          title: 'Scalability',
          description: 'Building robust and scalable systems that grow with your business',
          icon: FaRocket
        },
        {
          title: 'Efficiency',
          description: 'Optimizing processes through intelligent automation',
          icon: FaCogs
        }
      ]
    }
  },
  pt: {
    title: 'Sobre Mim',
    subtitle: 'Desenvolvedor Back-End & Analista de Dados',
    description: 'Desenvolvedor de Software, freelancer e estudante de Sistemas de Informação, com ampla experiência em desenvolvimento de sistemas focados em eficiência e automação de processos. Atuo na criação de soluções robustas e escaláveis, utilizando uma variedade de linguagens e frameworks para front-end e back-end. Com experiência em desenvolvimento para empresas privadas e o Governo do Estado de Minas Gerais, além de colaboração em projetos de análise de dados e inteligência artificial, busco inovar constantemente e trazer valor praticidade para cada projeto.',
    skills: {
      title: 'Habilidades & Tecnologias',
      categories: {
        'Linguagens de Programação': ['JavaScript', 'Python', 'Java', 'PHP', 'SQL', 'C#'],
        'Frontend': ['HTML5', 'CSS3', 'ReactJS', 'NextJS', 'TailwindCSS', 'Bootstrap5'],
        'Frameworks': ['NodeJS', 'Laravel', 'Spring'],
        'Banco de Dados': ['MySQL', 'PostgreSQL', 'MongoDB'],
        'Ferramentas': ['Azure', 'AWS', 'Docker', 'Git', 'Linux']
      }
    },
    experience: {
      title: 'Experiência',
      items: [
        {
          year: '2024',
          position: 'Desenvolvedor Back-End',
          company: 'Via Capital',
          description: 'Desenvolvimento e manutenção de APIs em Python/FastAPI, gerenciamento de Banco de Dados MS SQL Server, implementação de automação de rotinas e desenvolvimento de UI em React/NextJS.'
        },
        {
          year: '2023-2024',
          position: 'Desenvolvedor Full Stack',
          company: 'SEGOV - Governo de MG',
          description: 'Desenvolvimento e gestão de um sistema de tramitação de documentos em Laravel e MySQL, otimizando fluxos de trabalho e reduzindo o tempo de processamento. Implementação de processos ETL para coleta e análise de dados.'
        },
        {
          year: '2023-2024',
          position: 'Pesquisador Júnior / Desenvolvedor IA',
          company: 'PUC Minas / SOLIRIS',
          description: 'Desenvolvimento de ferramenta de análise automatizada de currículos usando NLP e Machine Learning, otimizando processos de triagem em RH. Implementação de algoritmos de Web Scraping e tratamento de dados.'
        },
        {
          year: '2022-2023',
          position: 'Desenvolvedor Full Stack Python, IA e Machine Learning',
          company: 'Projeto com Professores da UFMG',
          description: 'Desenvolvimento de uma calculadora para cálculos toxicológicos, implementando algoritmos de extração e mineração de dados para apoiar a pesquisa em farmacologia. Criação de APIs em Flask e FastAPI.'
        },
        {
          year: '2021-now',
          position: 'Freelancer',
          company: 'Projetos Independentes',
          description: 'Desenvolvimento, deploy e manutenção de aplicações web para clientes, com foco em responsividade, SEO e impulsionamento.'
        },
        {
          year: '2021-2022',
          position: 'Desenvolvedor Web',
          company: 'Paiva Piovesan',
          description: 'Desenvolvimento de plataforma financeira em .NET, C#, HTML e CSS, aprimorando a interface e experiência do usuário. Colaboração em melhorias de usabilidade.'
        },
        {
          year: '2020-2021',
          position: 'Estagiário de TI',
          company: 'Prefeitura de Belo Horizonte',
          description: "Manutenção e atualização da plataforma de EAD da Prefeitura, com foco em melhorias e correções de erros. Transformação de dados para geração de informações estratégicas."
        }
      ]
    },
    cta: {
      title: 'Transformando Negócios com Soluções de Ponta',
      subtitle: 'Trazendo inovação e eficiência para sua jornada de transformação digital',
      contactButton: 'Fale Comigo',
      getInTouchButton: 'Entre em Contato',
      features: [
        {
          title: 'Inovação',
          description: 'Utilizando tecnologias de ponta para criar soluções inovadoras',
          icon: FaLightbulb
        },
        {
          title: 'Escalabilidade',
          description: 'Construindo sistemas robustos e escaláveis que crescem com seu negócio',
          icon: FaRocket
        },
        {
          title: 'Eficiência',
          description: 'Otimizando processos através de automação inteligente',
          icon: FaCogs
        }
      ]
    }
  }
};

const AboutMe = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    const about = aboutRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const experience = experienceRef.current;
    const skills = skillsRef.current;
    const banner = bannerRef.current;

    if (!section || !about || !title || !description || !experience || !skills || !banner) return;

    // Limpar todos os ScrollTriggers existentes para evitar duplicatas
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Detectar dispositivo móvel para ajustar a duração das animações
    const isMobile = window.innerWidth < 768;
    const animDuration = isMobile ? 0.3 : 0.6; // Mais rápido em dispositivos móveis
    const scrubSpeed = isMobile ? 0.2 : 0.5;   // Mais rápido em dispositivos móveis

    const ctx = gsap.context(() => {
      // About section animation
      gsap.from(about, {
        y: isMobile ? 30 : 50, // Movimento reduzido em dispositivos móveis
        opacity: 0,
        duration: animDuration,
        scrollTrigger: {
          trigger: about,
          start: "top 90%", // Iniciar mais cedo para dispositivos móveis
          end: "top 60%",
          scrub: scrubSpeed,
          toggleActions: "play none none none" // Não reverter em dispositivos móveis
        }
      });

      // Experience section animation - mantemos apenas esta parte
      gsap.from(experience, {
        y: isMobile ? 20 : 0, // Pequeno movimento vertical para dispositivos móveis
        opacity: 0,
        duration: animDuration,
        scrollTrigger: {
          trigger: experience,
          start: "top 90%",
          end: "top 70%",
          scrub: scrubSpeed,
          toggleActions: "play none none none"
        }
      });

      // Para dispositivos móveis, aplicamos animações mais simples e rápidas
      // Timeline items animation
      const timelineItems = experience.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.from(item.querySelector('.timeline-content'), {
          x: isMobile ? -10 : -25,
          opacity: 0,
          duration: isMobile ? 0.2 : 0.4,
          delay: index * (isMobile ? 0.02 : 0.05),
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 70%",
            scrub: isMobile ? 0.1 : 0.3,
            toggleActions: "play none none none"
          }
        });

        gsap.from(item.querySelector('.timeline-dot'), {
          scale: 0,
          opacity: 0,
          duration: isMobile ? 0.2 : 0.3,
          delay: index * (isMobile ? 0.02 : 0.05),
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 70%",
            scrub: isMobile ? 0.1 : 0.3,
            toggleActions: "play none none none"
          }
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [language]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      id="about-section"
      className="min-h-screen bg-[#1C1C1C] relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        className="absolute inset-0 grid-pattern"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Banner Section */}
        <motion.div 
          ref={bannerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-32 group"
        >
          {/* Command Tags for Banner */}
          <div
            className="absolute -top-8 left-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-emerald-400">$</span> ./start.sh
          </div>

          <div
            className="absolute -top-8 right-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-orange-400">$</span> make deploy
          </div>

          {/* Animated glow outline */}
          <div className="absolute -inset-[1px] bg-white/20 rounded-xl blur-sm
                        animate-pulse"></div>
          
          <motion.div
            className="relative bg-[#2A2A2A]/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8
                     hover:bg-[#2A2A2A]/60 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t?.cta?.title || 'Transforming Business with Cutting-Edge Solutions'}
                </h2>
                <p className="text-gray-400">
                  {t?.cta?.subtitle || 'Bringing innovation and efficiency to your digital transformation journey'}
                </p>
              </div>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500/20 text-blue-300 rounded-lg
                        border border-blue-500/30 font-medium
                        hover:bg-blue-500/30 hover:border-blue-400/40 hover:text-blue-200
                        shadow-[0_0_15px_rgba(59,130,246,0.2)]
                        hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                        transition-all duration-300 whitespace-nowrap"
              >
                {t?.cta?.contactButton || 'Contact Me'}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Get In Touch Section with Parallax */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [0, -30]) }}
          className="relative"
        >
          {/* Command Tags for Contact Section */}
          <div
            className="absolute -top-8 left-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-pink-400">$</span> mail -s &quot;Hello&quot; contact@me.com
          </div>

          <div
            className="absolute -top-8 right-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-cyan-400">$</span> ssh connect@portfolio
          </div>
        </motion.div>

        {/* About Me Section with Parallax */}
        <motion.div 
          ref={aboutRef}
          style={{ y: useTransform(scrollYProgress, [0.4, 0.8], [0, -40]) }}
          className="mb-32 text-center max-w-4xl mx-auto relative"
        >
          {/* Command Tags for About Section */}
          <div
            className="absolute -top-8 right-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-green-400">$</span> npm run dev
          </div>

          <div
            className="absolute -bottom-8 left-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-green-400">$</span> npm run dev
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} // Reduzido de 20 para 10
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} // Aumentado para 0.5 para aparecer mais cedo
            transition={{ duration: 0.3, ease: 'easeOut' }} // Reduzido para 0.3 com ease mais rápido
            className="bg-[#2A2A2A]/30 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gray-700/50 
                     hover:border-gray-600/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
                     transition-all duration-300 relative overflow-hidden"
          >
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 title-glow"
            >
              {t?.title || 'About Me'}
            </h2>
            <h3
              className="text-xl md:text-2xl text-gray-400 mb-8 subtitle-glow"
            >
              {t?.subtitle || 'Back-End Developer & Data Analyst'}
            </h3>
            <p
              ref={descriptionRef}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              {t?.description || 'Full Stack Developer with extensive experience in developing systems focused on process efficiency and automation.'}
            </p>
            
            {/* Contact CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-blue-500/20 text-blue-300 rounded-full
                      border border-blue-500/30 font-medium
                      hover:bg-blue-500/30 hover:border-blue-400/40 hover:text-blue-200
                      shadow-[0_0_15px_rgba(59,130,246,0.2)]
                      hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                      transition-all duration-300"
            >
              {t?.cta?.getInTouchButton || 'Get in Touch'}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Experience and Skills Section with Parallax */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.6, 1], [0, -60]) }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative mb-32"
        >
          {/* Command Tags for Experience/Skills Section */}
          <div
            className="absolute -top-8 left-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-purple-400">$</span> python experience.py
          </div>

          <div
            className="absolute -top-8 right-4 z-40 font-mono text-sm bg-[#2A2A2A]/90 
                     text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm
                     transition-all duration-200 ease-out cursor-pointer
                     hover:scale-105 hover:border-gray-600"
          >
            <span className="text-yellow-400">$</span> yarn build
          </div>

          {/* Experience Timeline */}
          <div ref={experienceRef} className="bg-[#2A2A2A]/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 relative overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-16 text-center lg:text-left title-glow">
              {t?.experience?.title || 'Experience'}
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-700 via-blue-500/50 to-gray-700"></div>
              
              {/* Timeline Items */}
              <div className="relative space-y-12 md:space-y-16">
                {t?.experience?.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }} // Reduzido de -20 para -10
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5, margin: "-25px" }} // Ajustado para aparecer mais cedo
                    transition={{ duration: 0.2, delay: index * 0.02 }} // Reduzido para 0.2 e delay menor
                    className="timeline-item relative flex items-center pl-8"
                  >
                    {/* Timeline Dot */}
                    <div className="timeline-dot absolute left-0 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2
                                 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20"></div>
                    
                    {/* Content Card */}
                    <div className="timeline-content w-full">
                      <div className="bg-[#2A2A2A]/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50
                                  transform hover:scale-[1.02] hover:border-gray-600/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
                                  transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold text-white">{item?.position}</h4>
                          <span className="text-blue-400 font-bold">{item?.year}</span>
                        </div>
                        <p className="text-gray-400 mb-2">{item?.company}</p>
                        <p className="text-gray-500">{item?.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section - Apenas com Framer Motion */}
          <motion.div 
            ref={skillsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-[#2A2A2A]/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-green-500/10 to-transparent rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-yellow-500/10 to-transparent rounded-full"></div>
            
            <motion.h3 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-white mb-12 md:mb-16 text-center lg:text-left title-glow relative z-10"
            >
              {t?.skills?.title || 'Skills & Technologies'}
            </motion.h3>
            
            <div className="space-y-8">
              {Object.entries(t?.skills?.categories || {}).map(([category, skills], index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="skills-category space-y-4"
                >
                  <h4 className="text-lg font-semibold text-white border-l-4 border-blue-500 pl-3 py-1">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 + (skillIndex * 0.03) }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-[#1d2230]/80 text-gray-300 text-sm
                                 rounded-lg border border-gray-700/30
                                 hover:bg-[#1d2230]/95 hover:border-blue-500/50 hover:text-blue-300
                                 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                                 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutMe;