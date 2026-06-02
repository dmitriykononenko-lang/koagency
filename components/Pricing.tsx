import { GridBackground } from './ui/grid-background';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Стартовый',
    price: '80 000₽',
    description: 'Для малого бизнеса и стартапов',
    features: [
      'Настройка базовой воронки продаж',
      'Интеграция с 2 сервисами',
      'Миграция до 1000 контактов',
      'Обучение команды (до 5 человек)',
      '1 месяц техподдержки бесплатно',
      'Видео-инструкции'
    ],
    popular: false
  },
  {
    name: 'Бизнес',
    price: '180 000₽',
    description: 'Для растущих компаний',
    features: [
      'Настройка сложных воронок',
      'Интеграция с 5 сервисами',
      'AI-квалификатор лидов',
      'Миграция до 10 000 контактов',
      'Обучение команды (до 15 человек)',
      '3 месяца техподдержки бесплатно',
      'Автоматизация процессов',
      'Персональный менеджер'
    ],
    popular: true
  },
  {
    name: 'Энтерпрайз',
    price: 'От 350 000₽',
    description: 'Для крупного бизнеса',
    features: [
      'Полная кастомизация под процессы',
      'Неограниченные интеграции',
      'AI-квалификатор + предиктивная аналитика',
      'Миграция любых объемов данных',
      'Обучение всей команды',
      '6 месяцев техподдержки бесплатно',
      'Выделенная команда экспертов',
      'SLA с гарантиями',
      'Приоритетная поддержка 24/7'
    ],
    popular: false
  }
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300 overflow-hidden">
      {/* Grid Background with Red Highlights */}
      <GridBackground 
        className="opacity-30"
        highlightedSquares={[
          [3, 4], [3, 5], // Top left
          [30, 8], [31, 8], [32, 8], // Right cluster
          [10, 15], [10, 16] // Bottom cluster
        ]}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-foreground">
            Прозрачные цены
          </h2>
          <p className="text-lg text-muted-foreground">
            Выберите пакет под ваши задачи. Бесплатный аудит поможет определить оптимальное решение
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`p-8 bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                pkg.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wide rounded-full">
                    Популярный
                  </div>
                </div>
              )}

              {/* Package Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono text-primary font-semibold">
                    {pkg.price}
                  </span>
                  {!pkg.price.includes('От') && (
                    <span className="text-sm text-muted-foreground">единоразово</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                onClick={scrollToContact}
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-card border border-border text-foreground hover:bg-muted'
                }`}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                Получить консультацию
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            💡 <span className="font-medium text-foreground">Не определились?</span> Закажите бесплатный аудит — подберем оптимальное решение под ваш бюджет
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Рассрочка до 12 месяцев</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Гибкая система скидок</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Индивидуальные условия</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}