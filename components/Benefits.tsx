import { Card } from './ui/card';
import { CheckCircle, TrendingUp, Clock, Shield, Users, Target } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Увеличение продаж',
    description: 'Рост конверсии до 40% благодаря автоматизации и AI-квалификации лидов'
  },
  {
    icon: Clock,
    title: 'Экономия времени',
    description: 'Сокращение времени на обработку заявок до 70% с помощью автоматизации'
  },
  {
    icon: Shield,
    title: 'Надежность',
    description: 'Круглосуточная техническая поддержка и мониторинг работы системы'
  },
  {
    icon: Users,
    title: 'Экспертность',
    description: 'Более 5 лет опыта внедрения CRM систем и обучение вашей команды'
  },
  {
    icon: Target,
    title: 'Индивидуальный подход',
    description: 'Настройка системы под специфику вашего бизнеса и отрасли'
  },
  {
    icon: CheckCircle,
    title: 'Гарантия результата',
    description: 'Работаем до достижения KPI и предоставляем гарантию на все работы'
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-[#101010]">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-[#666666]">
            Мы помогаем компаниям достигать результатов через современные технологии
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-white border-black/10 shadow-sm hover:shadow-lg hover:border-[#E60000]/30 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#f5f5f5] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E60000]/10 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#E60000]" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-[#101010] font-semibold">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#666666]">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 bg-[#E60000] rounded-3xl shadow-xl w-full sm:w-auto">
            <div className="text-center sm:text-left">
              <h3 className="text-white mb-2 font-semibold">
                Готовы начать?
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Получите бесплатную консультацию по внедрению CRM
              </p>
            </div>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-8 py-3 bg-white text-[#E60000] rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap w-full sm:w-auto font-medium"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}