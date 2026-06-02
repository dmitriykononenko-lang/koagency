export const translations = {
  ru: {
    header: {
      services: "Услуги",
      benefits: "Преимущества",
      pricing: "Цены",
      cases: "Кейсы",
      contact: "Связаться"
    },
    footer: {
      description: "Профессиональное внедрение CRM систем, настройка AI-квалификаторов и техническая поддержка для вашего бизнеса",
      navigation: "Навигация",
      services: "Услуги",
      calculator: "Калькулятор стоимости",
      benefits: "Преимущества",
      cases: "Кейсы",
      contact: "Контакты",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      rights: "Все права защищены."
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Оставьте заявку, и мы свяжемся с вами в течение 30 минут",
      form: {
        name: "Имя",
        email: "Email",
        phone: "Телефон",
        message: "Сообщение",
        submit: "Отправить заявку",
        agreement: "Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных",
        placeholders: {
          name: "Иван Иванов",
          email: "ivan@company.com",
          phone: "+7 (999) 123-45-67",
          message: "Расскажите о вашей задаче..."
        }
      },
      otherMethods: "Другие способы связи",
      workingHours: {
        title: "Режим работы",
        weekdays: "Понедельник - Пятница: 9:00 - 18:00",
        weekend: "Суббота - Воскресенье: Выходной",
        support: "Техподдержка: 24/7"
      },
      responseTime: "Среднее время ответа:",
      minutes: "15 минут"
    },
    training: {
      title: "Обучение в Telegram Mini App",
      subtitle: "Современный подход к обучению вашей команды",
      description: "Мы создали собственное Mini App в Telegram, чтобы ваши сотрудники могли проходить обучение в удобном формате. Никаких скучных лекций и сложных платформ — всё обучение прямо в мессенджере.",
      features: {
        convenience: {
          title: "Всегда под рукой",
          description: "Доступ к материалам 24/7 прямо со смартфона"
        },
        interactive: {
          title: "Интерактивный формат",
          description: "Тесты, квизы и видеоуроки для лучшего усвоения"
        },
        progress: {
          title: "Контроль прогресса",
          description: "Отслеживайте успехи сотрудников в реальном времени"
        }
      },
      cta: "Попробовать демо"
    }
  },
  en: {
    header: {
      services: "Services",
      benefits: "Benefits",
      pricing: "Pricing",
      cases: "Cases",
      contact: "Contact Us"
    },
    footer: {
      description: "Professional CRM implementation, AI-qualifier setup, and technical support for your business",
      navigation: "Navigation",
      services: "Services",
      calculator: "Cost Calculator",
      benefits: "Benefits",
      cases: "Cases",
      contact: "Contacts",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      rights: "All rights reserved."
    },
    contact: {
      title: "Contact Us",
      subtitle: "Leave a request, and we will contact you within 30 minutes",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        submit: "Submit Request",
        agreement: "By clicking the button, you agree to the personal data processing policy",
        placeholders: {
          name: "John Doe",
          email: "john@company.com",
          phone: "+44 7835 212468",
          message: "Tell us about your task..."
        }
      },
      otherMethods: "Other contact methods",
      workingHours: {
        title: "Working Hours",
        weekdays: "Monday - Friday: 9:00 - 18:00",
        weekend: "Saturday - Sunday: Closed",
        support: "Tech Support: 24/7"
      },
      responseTime: "Average response time:",
      minutes: "15 minutes"
    },
    training: {
      title: "Training in Telegram Mini App",
      subtitle: "A modern approach to training your team",
      description: "We have created our own Mini App in Telegram so that your employees can undergo training in a convenient format. No boring lectures or complex platforms — all training directly in the messenger.",
      features: {
        convenience: {
          title: "Always at hand",
          description: "24/7 access to materials directly from your smartphone"
        },
        interactive: {
          title: "Interactive format",
          description: "Tests, quizzes, and video lessons for better retention"
        },
        progress: {
          title: "Progress control",
          description: "Track employee progress in real-time"
        }
      },
      cta: "Try Demo"
    }
  }
};

export type Language = 'ru' | 'en';
export type TranslationKey = keyof typeof translations.ru;
