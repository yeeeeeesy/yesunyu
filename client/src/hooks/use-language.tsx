import { useState, useEffect, createContext, useContext } from 'react';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-language') as Language;
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };
  const t = (keyPath: string, options?: { returnObjects?: boolean }): any => {
    const keys = keyPath.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      value = value?.[key];
    }
    if (value === undefined) return keyPath;
    if (options?.returnObjects) return value; // 直接返回数组/对象
    return typeof value === 'string' ? value : JSON.stringify(value);
  };



  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
