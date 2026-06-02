'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = 'ru',
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  // SSR-safe: localStorage недоступен на сервере
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('language');
    if (saved === 'ru' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current?.[key] === undefined) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Translation key missing: ${path} for language ${language}`);
        }
        return path;
      }
      current = current[key];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
