 'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiPrisma, SiDocker } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    title: 'Featured Projects',
    subtitle: 'A selection of my most recent work',
    projects: [
      {
        title: 'Portfolio Website',
        description: 'Modern and interactive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.',
        image: '/projects/portfolio.png',
        github: 'https://github.com/yourusername/portfolio',
        live: 'https://yourportfolio.com',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        category: 'Web Development'
      },
      {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and admin dashboard.',
        image: '/projects/ecommerce.png',
        github: 'https://github.com/yourusername/ecommerce',
        live: 'https://yourecommerce.com',
        technologies: ['Node.js', 'React', 'MongoDB', 'Docker', 'Redis', 'AWS'],
        category: 'Full Stack'
      },
      {
        title: 'AI Data Analytics',
        description: 'Machine learning platform for predictive analytics, featuring interactive visualizations and automated reporting.',
        image: '/projects/ai-analytics.png',
        github: 'https://github.com/yourusername/ai-analytics',
        live: 'https://youranalytics.com',
        technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'React', 'D3.js'],
        category: 'AI & Data'
      }
    ]
  },
  pt: {
    title: 'Projetos em Destaque',
    subtitle: 'Uma seleção dos meus trabalhos mais recentes',
    projects: [
      {
        title: 'Website Portfólio',
        description: 'Website moderno e interativo construído com Next.js e Tailwind CSS, apresentando animações suaves e design responsivo.',
        image: '/projects/portfolio.png',
        github: 'https://github.com/yourusername/portfolio',
        live: 'https://yourportfolio.com',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        category: 'Desenvolvimento Web'
      },
      {
        title: 'Plataforma E-commerce',
        description: 'Solução full-stack de e-commerce com recursos avançados como inventário em tempo real, processamento de pagamentos e painel administrativo.',
        image: '/projects/ecommerce.png',
        github: 'https://github.com/yourusername/ecommerce',
        live: 'https://yourecommerce.com',
        technologies: ['Node.js', 'React', 'MongoDB', 'Docker', 'Redis', 'AWS'],
        category: 'Full Stack'
      },
      {
        title: 'Analytics com IA',
        description: 'Plataforma de machine learning para análise preditiva, com visualizações interativas e relatórios automatizados.',
        image: '/projects/ai-analytics.png',
        github: 'https://github.com/yourusername/ai-analytics',
        live: 'https://youranalytics.com',
        technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'React', 'D3.js'],
        category: 'IA & Dados'
      }
    ]
  }
};

const techIcons: { [key: string]: React.ElementType } = {
  'React': FaReact,
  'Next.js': SiNextdotjs,
  'Node.js': FaNodeJs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Python': FaPython,
  'Prisma': SiPrisma,
  'Docker': SiDocker
};

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const section = sectionRef.current;
    const projects = projectsRef.current;
    if (!section || !projects) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".projects-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });

      // Project cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Card entrance animation
        gsap.from(card, {
          x: index % 2 === 0 ? -100 : 100,
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        });

        // Hover animation setup
        const timeline = gsap.timeline({ paused: true });
        const content = card.querySelector('.project-content');
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelector('.project-links');
        const tech = card.querySelector('.project-tech');

        if (content && overlay && links && tech) {
          timeline
            .to(overlay, {
              opacity: 1,
              duration: 0.3
            })
            .to(content, {
              y: -20,
              duration: 0.4,
              ease: "power2.out"
            }, "-=0.2")
            .to(links, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out"
            }, "-=0.3")
            .to(tech, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out"
            }, "-=0.3");

          card.addEventListener('mouseenter', () => timeline.play());
          card.addEventListener('mouseleave', () => timeline.reverse());
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#1C1C1C] overflow-hidden py-24 md:py-32"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 grid-pattern translate-y-parallax"
        style={{ "--parallax-y": useTransform(scrollYProgress, [0, 1], ["0px", "300px"]) }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="projects-header text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 title-glow text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 subtitle-glow">
            {t.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.projects.map((project, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Project Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center project-image"
                data-image={project.image}
              />

              {/* Overlay */}
              <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 opacity-0" />

              {/* Content */}
              <div className="project-content absolute inset-0 p-6 flex flex-col justify-end transform translate-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3">{project.description}</p>
                </div>

                {/* Links */}
                <div className="project-links flex gap-4 mt-6 opacity-0 transform translate-y-8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A]/80 rounded-lg
                             hover:bg-[#333333]/80 transition-all duration-300"
                  >
                    <FaGithub className="text-gray-300" />
                    <span className="text-gray-300 text-sm">GitHub</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg
                             hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <FaExternalLinkAlt className="text-blue-400" />
                    <span className="text-blue-400 text-sm">Live Demo</span>
                  </a>
                </div>

                {/* Technologies */}
                <div className="project-tech flex flex-wrap gap-3 mt-4 opacity-0 transform translate-y-8">
                  {project.technologies.map((tech, techIndex) => {
                    const Icon = techIcons[tech] || null;
                    return (
                      <div
                        key={techIndex}
                        className="px-3 py-1 bg-[#2A2A2A]/50 rounded-full
                                 border border-gray-700/30 text-xs text-gray-300
                                 flex items-center gap-2"
                      >
                        {Icon && <Icon className="w-3 h-3" />}
                        {tech}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}