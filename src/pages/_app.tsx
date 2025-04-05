import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";

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

function App({ Component, pageProps }: AppProps) {
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
