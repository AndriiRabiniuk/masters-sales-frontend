import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Navbar />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default appWithTranslation(App);
