'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaLightbulb, FaCogs } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GetInTouch from './GetInTouch';

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
    subtitle: 'Full Stack Developer & Information Systems Student',
    description: 'Full Stack Developer, freelancer, and Information Systems student with extensive experience in developing systems focused on process efficiency and automation. Skilled in creating robust and scalable solutions using a variety of languages and frameworks for both front-end and back-end. With experience in workflow system development for the Government of Minas Gerais, along with contributions to data analysis and AI projects, I aim to innovate continuously and bring analytical value and practicality to every project.',
    skills: {
      title: 'Skills & Technologies',
      categories: {
        'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        'Backend': ['Node.js', 'Python', 'Java', 'Express', 'Django'],
        'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
        'DevOps': ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'],
        'Tools': ['VS Code', 'Figma', 'Postman', 'Jira', 'Notion']
      }
    },
    experience: {
      title: 'Experience',
      items: [
        {
          year: '2023',
          position: 'Full Stack Developer',
          company: 'Government of Minas Gerais',
          description: 'Development of workflow systems and process automation solutions.'
        },
        {
          year: '2022',
          position: 'Freelance Developer',
          company: 'Self-employed',
          description: 'Creating custom web applications and providing technical solutions for clients.'
        },
        {
          year: '2021',
          position: 'Information Systems Student',
          company: 'UFMG',
          description: 'Studying computer science, software engineering, and information systems.'
        }
      ]
    },
    cta: {
      title: 'Transforming Business with Cutting-Edge Solutions',
      subtitle: 'Bringing innovation and efficiency to your digital transformation journey',
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
    subtitle: 'Desenvolvedor Full Stack & Estudante de Sistemas de Informação',
    description: 'Desenvolvedor Full Stack, freelancer e estudante de Sistemas de Informação com vasta experiência no desenvolvimento de sistemas focados em eficiência e automação de processos. Especializado em criar soluções robustas e escaláveis usando diversas linguagens e frameworks para front-end e back-end. Com experiência no desenvolvimento de sistemas de workflow para o Governo de Minas Gerais, além de contribuições em projetos de análise de dados e IA, busco inovar continuamente e trazer valor analítico e praticidade para cada projeto.',
    skills: {
      title: 'Habilidades & Tecnologias',
      categories: {
        'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        'Backend': ['Node.js', 'Python', 'Java', 'Express', 'Django'],
        'Banco de Dados': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
        'DevOps': ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'],
        'Ferramentas': ['VS Code', 'Figma', 'Postman', 'Jira', 'Notion']
      }
    },
    experience: {
      title: 'Experiência',
      items: [
        {
          year: '2023',
          position: 'Desenvolvedor Full Stack',
          company: 'Governo de Minas Gerais',
          description: 'Desenvolvimento de sistemas de workflow e soluções de automação de processos.'
        },
        {
          year: '2022',
          position: 'Desenvolvedor Freelance',
          company: 'Autônomo',
          description: 'Criação de aplicações web personalizadas e fornecimento de soluções técnicas para clientes.'
        },
        {
          year: '2021',
          position: 'Estudante de Sistemas de Informação',
          company: 'UFMG',
          description: 'Estudando ciência da computação, engenharia de software e sistemas de informação.'
        }
      ]
    },
    cta: {
      title: 'Transformando Negócios com Soluções de Ponta',
      subtitle: 'Trazendo inovação e eficiência para sua jornada de transformação digital',
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
  const t = translations[language];
  
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

    const ctx = gsap.context(() => {
      // About section animation
      gsap.from(about, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: about,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      });

      // Experience and Skills sections animation
      const sections = [experience, skills];
      sections.forEach((section, index) => {
        gsap.from(section, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        });
      });

      // Timeline items animation
      const timelineItems = experience.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => {
        gsap.from(item.querySelector('.timeline-content'), {
          x: -50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        });

        gsap.from(item.querySelector('.timeline-dot'), {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        });
      });

      // Skills categories animation
      const skillsItems = skills.querySelectorAll('.skills-category');
      skillsItems.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      id="about-section"
      className="min-h-screen bg-[#1C1C1C] relative overflow-hidden py-20"
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
              <h2 className="text-2xl sm:text-3xl font-medium text-white">
                {t.cta.title}
              </h2>
              <p className="text-gray-400">
                {t.cta.subtitle}
              </p>
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

          <GetInTouch />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#2A2A2A]/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 
                     hover:border-gray-600/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
                     transition-all duration-300"
          >
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 title-glow"
            >
              {t.title}
            </h2>
            <h3
              className="text-xl md:text-2xl text-gray-400 mb-8 subtitle-glow"
            >
              {t.subtitle}
            </h3>
            <p
              ref={descriptionRef}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {t.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Experience and Skills Section with Parallax */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.6, 1], [0, -60]) }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative"
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
          <div ref={experienceRef} className="bg-[#2A2A2A]/10 backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-16 text-center lg:text-left title-glow">
              {t.experience.title}
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-700 via-blue-500/50 to-gray-700"></div>
              
              {/* Timeline Items */}
              <div className="relative space-y-16">
                {t.experience.items.map((item, index) => (
                  <div
                    key={index}
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
                          <h4 className="text-xl font-semibold text-white">{item.position}</h4>
                          <span className="text-blue-400 font-bold">{item.year}</span>
                        </div>
                        <p className="text-gray-400 mb-2">{item.company}</p>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="bg-[#2A2A2A]/10 backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-16 text-center lg:text-left title-glow">
              {t.skills.title}
            </h3>
            <div className="space-y-12">
              {Object.entries(t.skills.categories).map(([category, skills]) => (
                <div
                  key={category}
                  className="skills-category relative pl-8"
                >
                  {/* Category Dot */}
                  <div className="absolute left-0 top-[1.6rem] w-4 h-4 bg-blue-500 rounded-full
                               shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20"></div>
                  
                  <div className="bg-[#2A2A2A]/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 
                               hover:border-gray-600/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
                               transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-white mb-6">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="group relative"
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 
                                      group-hover:opacity-100 blur transition duration-300"></div>
                          <span
                            className="relative flex items-center px-4 py-2 bg-[#2A2A2A] rounded-full text-sm text-gray-300
                                     group-hover:text-white group-hover:bg-[#2A2A2A]/80
                                     transition-all duration-300"
                          >
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutMe;