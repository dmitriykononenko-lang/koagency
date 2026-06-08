'use client';

import { Button } from './ui/button';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from '@/lib/router-shim';
import { useTheme } from './theme-provider';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  const goHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-mono text-xs">ko</span>
            </div>
            <span className="text-lg font-mono tracking-tight text-foreground">ko:agency</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.services')}
            </Link>
            <Link to="/calculator" className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              Калькулятор
            </Link>
            <button onClick={() => handleScroll('cases')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.cases')}
            </button>
            <button onClick={() => handleScroll('pricing')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.pricing')}
            </button>
            <Link to="/enterprise" className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              Enterprise
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              О нас
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-primary"
            >
               {mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? (
                 <Sun className="h-5 w-5" />
               ) : (
                 <Moon className="h-5 w-5" />
               )}
               <span className="sr-only">Toggle theme</span>
            </Button>

            <a
              href="tel:+447835212468"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#E60000] hover:bg-[#cc0000] text-white px-4 py-2 text-sm font-medium shadow-[0_4px_12px_-2px_rgba(230,0,0,0.35)] hover:shadow-[0_6px_18px_-2px_rgba(230,0,0,0.5)] transition-all"
              aria-label="Позвонить и заказать звонок"
            >
              <Phone className="w-4 h-4" />
              Заказать звонок
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSwitcher />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-primary"
            >
               {mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? (
                 <Sun className="h-5 w-5" />
               ) : (
                 <Moon className="h-5 w-5" />
               )}
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <nav className="px-4 py-4 space-y-3">
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.services')}
            </Link>
            <Link
              to="/calculator"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              Калькулятор
            </Link>
            <Link
              to="/excel-amocrm"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              Excel → amoCRM
            </Link>
            <button
              onClick={() => handleScroll('cases')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.cases')}
            </button>
            <button
              onClick={() => handleScroll('pricing')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.pricing')}
            </button>
            <Link
              to="/enterprise"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              Enterprise
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              О нас
            </Link>
            <a
              href="tel:+447835212468"
              className="inline-flex items-center justify-center gap-1.5 w-full rounded-md bg-[#E60000] hover:bg-[#cc0000] text-white px-4 py-2.5 text-sm font-medium shadow-[0_4px_12px_-2px_rgba(230,0,0,0.35)] transition-all"
            >
              <Phone className="w-4 h-4" />
              Заказать звонок
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}