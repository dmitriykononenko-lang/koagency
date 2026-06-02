'use client';

import { Button } from './ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
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
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleScroll('services')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.services')}
            </button>
            <button onClick={() => handleScroll('benefits')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.benefits')}
            </button>
            <button onClick={() => handleScroll('pricing')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.pricing')}
            </button>
            <Link to="/enterprise" className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              Enterprise
            </Link>
            <button onClick={() => handleScroll('cases')} className="text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wide">
              {t('header.cases')}
            </button>
            
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

            <Button onClick={() => handleScroll('contact')} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('header.contact')}
            </Button>
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
            <button 
              onClick={() => handleScroll('services')} 
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.services')}
            </button>
            <button 
              onClick={() => handleScroll('benefits')} 
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.benefits')}
            </button>
            <button 
              onClick={() => handleScroll('pricing')} 
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.pricing')}
            </button>
            <Link to="/enterprise" className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase">
              Enterprise
            </Link>
            <button 
              onClick={() => handleScroll('cases')} 
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-mono text-sm uppercase"
            >
              {t('header.cases')}
            </button>
            <Button onClick={() => handleScroll('contact')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
              {t('header.contact')}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}