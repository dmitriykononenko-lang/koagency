'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Сколько стоит внедрение CRM?',
    answer: 'Стоимость зависит от сложности проекта: базовое внедрение amoCRM от 80 000₽, комплексное решение с AI и интеграциями от 250 000₽. Первый аудит бесплатно — определим точную стоимость под ваши задачи.'
  },
  {
    question: 'Сколько времени занимает внедрение?',
    answer: 'Базовое внедрение — 1-2 недели. Комплексный проект с интеграциями и AI-квалификатором — 3-4 недели. После первого аудита составим точный график с конкретными датами.'
  },
  {
    question: 'Что если нам не подойдет CRM?',
    answer: 'Мы даем 30 дней на тестирование. Если решение не подойдет — вернем 100% стоимости внедрения. Но за 5 лет ни один клиент не воспользовался этой гарантией.'
  },
  {
    question: 'Нужно ли обучать сотрудников?',
    answer: 'Да, это обязательный этап. Проводим 2-3 дневное обучение для всей команды, передаем видео-инструкции и документацию. Также даем 3 месяца бесплатной поддержки для вопросов.'
  },
  {
    question: 'Работаете с малым бизнесом?',
    answer: 'Да, работаем с компаниями от 5 человек. Есть пакеты для стартапов и малого бизнеса. Минимальный чек — 80 000₽ за базовое внедрение amoCRM.'
  },
  {
    question: 'Что такое AI-квалификатор?',
    answer: 'Это нейросеть, которая автоматически анализирует входящие заявки и оценивает их качество. Она распределяет лиды по приоритету и отсекает нецелевые обращения. Экономит до 15 часов работы менеджеров в неделю.'
  },
  {
    question: 'Можно ли перенести данные из старой CRM?',
    answer: 'Да, миграция данных входит в стоимость внедрения. Переносим клиентов, сделки, историю коммуникаций. Обычно занимает 1-2 дня.'
  },
  {
    question: 'Как работает техподдержка?',
    answer: 'Первые 3 месяца — бесплатно, затем от 15 000₽/месяц. Отвечаем в течение 15 минут в рабочее время, критичные проблемы решаем 24/7. Поддержка по телефону, email, Telegram.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[#101010]">
            Частые вопросы
          </h2>
          <p className="text-lg text-[#666666]">
            Ответы на вопросы, которые задают чаще всего
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-black/10 rounded-xl overflow-hidden bg-white hover:border-[#E60000]/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#f5f5f5]/50 transition-colors"
              >
                <span className="font-semibold text-[#101010] pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#E60000] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-[#666666] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-[#f5f5f5] rounded-2xl">
          <p className="text-[#666666] mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#E60000] hover:bg-[#cc0000] text-white rounded-xl transition-colors font-medium"
          >
            Задать вопрос
          </button>
        </div>
      </div>
    </section>
  );
}
