import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to detect browser language
const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'en'; // Default to English on server-side
  
  // Get browser language
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Check if the browser language starts with 'fr'
  if (browserLang && browserLang.toLowerCase().startsWith('fr')) {
    return 'fr';
  }
  
  // Default to English
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [language, setLanguageState] = useState<string>('en');
  const [hasInitialized, setHasInitialized] = useState(false);

  // Function to change language with state update and router change
  const setLanguage = (newLanguage: string) => {
    // Change the language in the router
    router.push(router.pathname, router.asPath, { locale: newLanguage });
    
    // Update local state
    setLanguageState(newLanguage);
    
    // Store language preference in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  };

  useEffect(() => {
    // Initialize language based on priority:
    // 1. Saved preference in localStorage
    // 2. Browser language detection
    // 3. Router locale
    // 4. Default to 'en'
    if (!hasInitialized) {
      const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage') : null;
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
        // Use saved preference
        setLanguage(savedLanguage);
      } else {
        // Auto-detect language from browser
        const detectedLang = detectBrowserLanguage();
        setLanguage(detectedLang);
      }
      
      setHasInitialized(true);
    } else if (router.locale && router.locale !== language) {
      // If router locale changes externally, sync state
      setLanguageState(router.locale);
    }
  }, [router.locale, hasInitialized]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
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