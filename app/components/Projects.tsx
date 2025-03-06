'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { FaGithub, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiPrisma, SiDocker, SiOpenai } from 'react-icons/si';
import { motion } from 'framer-motion';

const translations = {
  en: {
    title: 'Featured Projects',
    subtitle: 'A selection of my most recent work',
    projects: [
      {
        title: 'PDE Calculator',
        description: 'AI-powered tool for researchers and pharmaceutical professionals that automates Permitted Daily Exposure (PDE) calculations. Features include AI-powered data extraction using OpenAI API, accurate PDE calculations with detailed breakdowns, and full regulatory compliance with ICH guidelines.',
        github: 'https://github.com/yourusername/pde-calculator',
        technologies: ['Python', 'OpenAI API', 'React', 'TypeScript', 'MongoDB', 'Docker'],
        category: 'AI & Healthcare'
      },
      {
        title: 'CV Analyzer Prototype',
        description: 'Advanced CV analysis system that automates resume screening and job matching using NLP and machine learning. Features automated data extraction, multiple similarity analysis methods (TF-IDF, LDA, BERT), and comprehensive candidate ranking system.',
        github: 'https://github.com/yourusername/cv-analyzer-prototype',
        technologies: ['Python', 'MongoDB', 'scikit-learn', 'BERT', 'FastAPI', 'Docker'],
        category: 'AI & ML'
      }
    ]
  },
  pt: {
    title: 'Projetos em Destaque',
    subtitle: 'Uma seleção dos meus trabalhos mais recentes',
    projects: [
      {
        title: 'Calculadora PDE',
        description: 'Ferramenta baseada em IA para pesquisadores e profissionais farmacêuticos que automatiza cálculos de Exposição Diária Permitida (PDE). Inclui extração de dados com IA usando API OpenAI, cálculos precisos de PDE com análises detalhadas e conformidade regulatória com diretrizes ICH.',
        github: 'https://github.com/yourusername/pde-calculator',
        technologies: ['Python', 'OpenAI API', 'React', 'TypeScript', 'MongoDB', 'Docker'],
        category: 'IA & Saúde'
      },
      {
        title: 'Protótipo Analisador de CV',
        description: 'Sistema avançado de análise de currículos que automatiza a triagem de currículos e correspondência de empregos usando PNL e aprendizado de máquina. Possui extração automática de dados, múltiplos métodos de análise de similaridade (TF-IDF, LDA, BERT) e sistema abrangente de classificação de candidatos.',
        github: 'https://github.com/yourusername/cv-analyzer-prototype',
        technologies: ['Python', 'MongoDB', 'scikit-learn', 'BERT', 'FastAPI', 'Docker'],
        category: 'IA & ML'
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
  'Docker': SiDocker,
  'OpenAI API': SiOpenai
};

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      rotateX: -10,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.75,
        duration: 0.7
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  return (
    <div className="relative bg-[#1C1C1C] overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="flex justify-center perspective-1000"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[900px]">
            {t.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group h-full transform-gpu"
              >
                <div className="bg-[#2A2A2A]/40 backdrop-blur-sm rounded-xl p-6
                             border border-gray-800/50 h-full
                             flex flex-col
                             hover:border-blue-500/30 hover:bg-[#2A2A2A]/60
                             hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
                             transition-all duration-500 ease-out
                             relative before:absolute before:inset-0 
                             before:bg-gradient-to-b before:from-transparent 
                             before:via-transparent before:to-[#1C1C1C]/10
                             before:rounded-xl before:opacity-0
                             hover:before:opacity-100 before:transition-opacity
                             before:duration-500">
                  {/* Category Badge */}
                  <motion.div
                    variants={contentVariants}
                    className="inline-block px-3 py-1 mb-4 text-xs font-medium
                             bg-blue-500/5 text-blue-300/80 rounded-full
                             border border-blue-500/10
                             group-hover:bg-blue-500/10
                             group-hover:border-blue-500/20
                             transition-all duration-500"
                  >
                    {project.category}
                  </motion.div>

                  <motion.h3 
                    variants={contentVariants}
                    className="text-xl md:text-2xl font-bold text-white/90 mb-3
                             group-hover:text-white transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    variants={contentVariants}
                    className="text-gray-400 text-sm md:text-base mb-6 flex-grow
                             group-hover:text-gray-300 transition-colors duration-300"
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div 
                    variants={contentVariants}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    {project.technologies.map((tech, techIndex) => {
                      const Icon = techIcons[tech] || null;
                      return (
                        <motion.div
                          key={techIndex}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 bg-[#1C1C1C]/30 rounded-full
                                   text-xs text-gray-400 border border-gray-700/30
                                   flex items-center gap-1.5
                                   hover:text-gray-200 hover:border-gray-600/50
                                   transition-all duration-300"
                        >
                          {Icon && <Icon className="w-3 h-3" />}
                          <span className="truncate">{tech}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* GitHub Link */}
                  <motion.a
                    variants={contentVariants}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-2 px-4 py-2
                             text-gray-400 text-sm
                             hover:text-white group/link
                             transition-colors duration-300"
                  >
                    <FaGithub className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-3" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}