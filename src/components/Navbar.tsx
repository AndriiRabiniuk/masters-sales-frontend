import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation('common');

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#", label: t('navbar.home') },
    { href: "#", label: t('navbar.lessons') },
    { href: "/articles", label: t('navbar.articles') },
    { href: "http://3.135.221.43:3000/", label: t('navbar.rmk6') },
    { href: "/articles", label: t('navbar.resources') },
    { href: "/signup", label: t('navbar.signup') || 'Sign Up' }
  ];

  return (
    <motion.header 
      className={`sticky top-0 text-white w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="mr-4 cursor-pointer">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                <Image 
                  src="/logo.jpg"
                  alt="Masters Logo"
                  width={48}
                  height={48}
                  className="object-cover hover:scale-110 transition-transform"
                />
              </div>
            </Link>
            <span className="text-white font-bold text-xl tracking-wider">MASTER SALES TRAINING</span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.div 
                key={link.href}
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SimpleNavLink href={link.href} label={link.label} />
              </motion.div>
            ))}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-white text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to French' : 'Switch to English'}
              >
                {language === 'en' ? 'FR' : 'EN'}
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white focus:outline-none hover:text-gray-300 transition-colors cursor-pointer"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 bg-black/70 backdrop-blur-md rounded-lg p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: i * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <SimpleNavLink href={link.href} label={link.label} />
                  </motion.div>
                ))}
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-white text-white hover:bg-white hover:text-black transition-colors mt-2 cursor-pointer"
                    onClick={toggleLanguage}
                  >
                    {language === 'en' ? 'FR' : 'EN'}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const SimpleNavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link 
      href={href} 
      className="text-white hover:text-gray-300 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full cursor-pointer"
    >
      {label}
    </Link>
  );
};

export default Navbar; 