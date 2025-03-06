import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { SiProtonmail } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

type ContactButtonProps = {
  icon: React.ElementType;
  text: string;
  href: string;
  className?: string;
};

const ContactButton = ({ icon: Icon, text, href, className = "" }: ContactButtonProps) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-3 px-6 py-4 bg-[#2A2A2A]/80 
              text-gray-200 rounded-lg border border-gray-700/50 
              shadow-[0_0_15px_rgba(0,0,0,0.3)]
              hover:bg-[#333333]/80 hover:border-gray-600/50
              hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]
              transition-all duration-300 w-full justify-center ${className}`}
  >
    <Icon className="text-gray-400 text-xl flex-shrink-0" />
    <span className="text-gray-300 text-sm md:text-base">{text}</span>
  </motion.a>
);

const GetInTouch = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="contact" className="min-h-[50vh] flex flex-col items-center justify-center py-20 bg-[#1C1C1C] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-transparent to-[#1C1C1C] opacity-90"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 title-glow">
          {t.contact.title}
        </h2>
        <p className="text-lg text-gray-400 mb-8 text-center subtitle-glow">
          {t.contact.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-5xl">
          <ContactButton
            icon={FaMapMarkerAlt}
            text={t.contact.location}
            href="#"
            className="cursor-default hover:scale-100 hover:transform-none lg:min-w-[300px]"
          />
          <ContactButton
            icon={SiProtonmail}
            text={t.contact.email}
            href={`mailto:${t.contact.email}`}
            className="lg:min-w-[300px]"
          />
          <ContactButton
            icon={FaGithub}
            text={t.contact.github}
            href="https://github.com/alexandre-amaral"
            className="lg:min-w-[300px]"
          />
          <ContactButton
            icon={FaLinkedin}
            text={t.contact.linkedin}
            href="https://www.linkedin.com/in/alexandre-amaral-570976225/"
            className="lg:min-w-[300px]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const translations = {
  en: {
    contact: {
      title: 'Get in Touch',
      subtitle: "Let's create something amazing together",
      location: 'Minas Gerais, Brazil',
      email: 'alexandre.samaral@protonmail.com',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    }
  },
  pt: {
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Vamos criar algo incrível juntos',
      location: 'Minas Gerais, Brasil',
      email: 'alexandre.samaral@protonmail.com',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    }
  }
};

export default GetInTouch; 