'use client';

import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from '@/lib/router-shim';
import { useLanguage } from '../lib/i18n/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#101010] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Бренд + краткое описание */}
        <div className="mb-10 max-w-md">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-[#E60000] rounded-lg flex items-center justify-center">
              <span className="text-white font-mono text-xs">ko</span>
            </div>
            <span className="text-lg font-mono">ko:agency</span>
          </div>
          <p className="text-sm text-white/70">
            {t('footer.description')}
          </p>
        </div>

        {/* Карта сайта: 4 колонки */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Услуги — главные посадочные для SEO */}
          <div>
            <h4 className="text-white mb-4 font-mono uppercase text-xs tracking-wider">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/amocrm-implementation" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Внедрение amoCRM
                </Link>
              </li>
              <li>
                <Link to="/services/kommo-implementation" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Внедрение Kommo
                </Link>
              </li>
              <li>
                <Link to="/services/ai-qualifiers" className="text-white/70 hover:text-[#E60000] transition-colors">
                  AI-квалификация лидов
                </Link>
              </li>
              <li>
                <Link to="/services/crm-support" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Поддержка CRM
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Сопровождение amoCRM
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/services" className="text-white hover:text-[#E60000] transition-colors font-medium">
                  Все услуги →
                </Link>
              </li>
            </ul>
          </div>

          {/* Инструменты — калькуляторы и lead magnets */}
          <div>
            <h4 className="text-white mb-4 font-mono uppercase text-xs tracking-wider">Инструменты</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/calculator" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Калькулятор внедрения
                </Link>
              </li>
              <li>
                <Link to="/calculator-amocrm" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Калькулятор amoCRM
                </Link>
              </li>
              <li>
                <Link to="/excel-amocrm" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Excel → amoCRM
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Enterprise-внедрение
                </Link>
              </li>
              <li>
                <Link to="/widgets/task-templates" className="text-white/70 hover:text-[#E60000] transition-colors">
                  Виджет «Шаблоны задач»
                </Link>
              </li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-white mb-4 font-mono uppercase text-xs tracking-wider">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-white/70 hover:text-[#E60000] transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/cases" className="text-white/70 hover:text-[#E60000] transition-colors text-left">
                  Кейсы
                </Link>
              </li>
              <li>
                <button onClick={() => handleScroll('pricing')} className="text-white/70 hover:text-[#E60000] transition-colors text-left">
                  Цены
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('contact')} className="text-white/70 hover:text-[#E60000] transition-colors text-left">
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          {/* Связь */}
          <div>
            <h4 className="text-white mb-4 font-mono uppercase text-xs tracking-wider">Связаться</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:hello@koagency.ru" className="flex items-center gap-2 text-white/70 hover:text-[#E60000] transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@koagency.ru
                </a>
              </li>
              <li>
                <a href="tel:+447835212468" className="flex items-center gap-2 text-white/70 hover:text-[#E60000] transition-colors">
                  <Phone className="w-4 h-4" />
                  +44 7835 212468
                </a>
              </li>
              <li>
                <a href="tel:+79912223880" className="flex items-center gap-2 text-white/70 hover:text-[#E60000] transition-colors">
                  <Phone className="w-4 h-4" />
                  +7 991 222-38-80
                </a>
              </li>
              <li>
                <a href="https://t.me/ko_agency" className="flex items-center gap-2 text-white/70 hover:text-[#E60000] transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {currentYear} ko:agency. {t('footer.rights')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 text-sm text-center sm:text-left">
            <Link to="/privacy" className="hover:text-[#E60000] transition-colors">
              {t('footer.privacy')}
            </Link>
            <button className="hover:text-[#E60000] transition-colors">
              {t('footer.terms')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}