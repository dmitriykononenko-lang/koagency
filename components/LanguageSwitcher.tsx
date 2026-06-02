import { Button } from './ui/button';
import { useLanguage } from '../lib/i18n/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-mono text-xs font-bold w-10 h-9"
    >
      {language.toUpperCase()}
    </Button>
  );
}
