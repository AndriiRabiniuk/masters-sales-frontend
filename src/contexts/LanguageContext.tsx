import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // Initialize language from router locale
    if (router.locale) {
      setLanguage(router.locale);
    }
  }, [router.locale]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    
    // Change the language in the router
    router.push(router.pathname, router.asPath, { locale: newLanguage });
    
    // Update local state
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 