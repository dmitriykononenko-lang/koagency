import { Card } from './ui/card';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    company: 'Интернет-магазин электроники',
    industry: 'E-commerce',
    challenge: 'Низкая конверсия заявок из-за большого потока нецелевых обращений',
    solution: 'Внедрили AI-квалификатор для автоматического отбора лидов и настроили воронку продаж в amoCRM',
    results: [
      'Увеличение конверсии на 45%',
      'Сокращение времени обработки заявок на 60%',
      'Рост продаж на 32% за 3 месяца'
    ],
    tags: ['amoCRM', 'AI-квалификатор', 'Автоматизация']
  },
  {
    company: 'Строительная компания',
    industry: 'Строительство',
    challenge: 'Отсутствие единой системы учета клиентов и сделок между отделами',
    solution: 'Внедрили Kommo с кастомной настройкой полей и воронок, интеграция с 1С и обучение команды',
    results: [
      'Централизация всех данных о клиентах',
      'Улучшение коммуникации между отделами',
      'Сокращение потерянных сделок на 55%'
    ],
    tags: ['Kommo', 'Интеграция 1С', 'Обучение']
  },
  {
    company: 'Образовательный центр',
    industry: 'Образование',
    challenge: 'Ручная обработка большого потока заявок на курсы',
    solution: 'Настроили автоматизацию в amoCRM с триггерами, email-рассылками и чат-ботом для квалификации',
    results: [
      'Автоматизация 80% рутинных задач',
      'Увеличение записей на курсы на 38%',
      'Повышение удовлетворенности клиентов'
    ],
    tags: ['amoCRM', 'Chatbot', 'Email-маркетинг']
  },
  {
    company: 'B2B Сервисная компания',
    industry: 'B2B Услуги',
    challenge: 'Долгий цикл сделки и сложности с контролем этапов',
    solution: 'Создали кастомную воронку с автоматическими напоминаниями, аналитикой и AI для прогнозирования сделок',
    results: [
      'Сокращение цикла сделки на 25%',
      'Прозрачный контроль всех этапов',
      'Прогнозирование закрытия сделок с точностью 87%'
    ],
    tags: ['Kommo', 'AI-аналитика', 'Автоматизация']
  }
];

export function Cases() {
  return (
    <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-[#101010]">
            Истории успеха
          </h2>
          <p className="text-lg text-[#666666]">
            Реальные результаты наших клиентов
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((caseItem, index) => (
            <Card 
              key={index}
              className="p-6 sm:p-8 bg-white border-black/10 shadow-sm hover:shadow-lg hover:border-[#E60000]/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="mb-1 text-[#101010] font-semibold">
                    {caseItem.company}
                  </h3>
                  <p className="text-sm text-[#666666]">{caseItem.industry}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#666666] group-hover:text-[#E60000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {caseItem.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#f5f5f5] text-[#101010] rounded-full text-xs font-mono uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <div className="text-xs text-[#999999] mb-1 font-mono uppercase tracking-wide">Задача</div>
                <p className="text-sm text-[#666666]">{caseItem.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <div className="text-xs text-[#999999] mb-1 font-mono uppercase tracking-wide">Решение</div>
                <p className="text-sm text-[#666666]">{caseItem.solution}</p>
              </div>

              {/* Results */}
              <div>
                <div className="text-xs text-[#999999] mb-2 font-mono uppercase tracking-wide">Результаты</div>
                <ul className="space-y-2">
                  {caseItem.results.map((result, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#666666]">
                      <div className="w-1.5 h-1.5 bg-[#E60000] rounded-full mr-2 mt-1.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-[#666666]">
            Хотите такие же результаты? 
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#E60000] hover:text-[#cc0000] ml-2 underline underline-offset-4 font-medium"
            >
              Свяжитесь с нами
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}