'use client';

import { ThemeProvider } from './theme-provider';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Layout } from './Layout';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="koagency-ui-theme">
      <LanguageProvider initialLanguage="ru">
        <Layout>{children}</Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}
