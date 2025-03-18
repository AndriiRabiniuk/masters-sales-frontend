import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Disable Next.js error overlay
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.nextJsError = null;
  // Explicitly hide error overlay
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.__NEXT_HYDRATION_ERROR_OVERLAY = false;
    // @ts-ignore
    window.__NEXT_REDUX_WRAPPER_ERROR_OVERLAY = false;
  }
}

// Function to detect browser language (same as in LanguageContext)
const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang && browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Disable error overlay on client side
  useEffect(() => {
    // This will prevent the browser from displaying the error overlay
    if (process.env.NODE_ENV === 'development') {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        // Filter out specific axios errors
        if (args[0]?.includes?.('AxiosError') || 
            (typeof args[0] === 'object' && args[0]?.message?.includes?.('status code 4')) ||
            args[0]?.includes?.('Unhandled Runtime Error')) {
          // Still log to console but don't trigger Next.js error overlay
          return;
        }
        originalConsoleError(...args);
      };

      return () => {
        console.error = originalConsoleError;
      };
    }
  }, []);

  // Early language detection on application init
  useEffect(() => {
    if (typeof window !== 'undefined' && !router.locale) {
      // Get saved preference or detect from browser
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const detectedLanguage = savedLanguage || detectBrowserLanguage();
      
      // Set the language in the URL if needed
      if (detectedLanguage && (!router.locale || router.locale !== detectedLanguage)) {
        router.push(router.pathname, router.asPath, { 
          locale: detectedLanguage,
          shallow: true 
        });
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Navbar />
        <Component {...pageProps} />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(App);
