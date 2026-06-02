import { Card } from './ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Алексей Морозов',
    position: 'CEO, TechFlow',
    company: 'E-commerce',
    text: 'За 2 месяца после внедрения amoCRM конверсия выросла на 34%. Команда ko:agency не просто настроила систему, а полностью перестроила наши процессы продаж.',
    rating: 5,
    avatar: 'AM'
  },
  {
    name: 'Марина Соколова',
    position: 'Директор по продажам',
    company: 'B2B Услуги',
    text: 'AI-квалификатор сэкономил нам 15 часов в неделю на обработку нецелевых заявок. Менеджеры теперь работают только с горячими клиентами.',
    rating: 5,
    avatar: 'МС'
  },
  {
    name: 'Дмитрий Петров',
    position: 'Основатель',
    company: 'Digital-агентство',
    text: 'Раньше мы теряли до 40% лидов из-за хаоса в обработке. Kommo решил эту проблему. Плюс техподдержка 24/7 — это реально работает.',
    rating: 5,
    avatar: 'ДП'
  },
  {
    name: 'Елена Волкова',
    position: 'COO',
    company: 'Образовательная платформа',
    text: 'Проект выполнили точно в срок. Особенно впечатлила интеграция с нашей платформой — все работает как часы. Рекомендуем!',
    rating: 5,
    avatar: 'ЕВ'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-[#101010]">
            Что говорят клиенты
          </h2>
          <p className="text-lg text-[#666666]">
            Честные отзывы о работе с нашей командой
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 sm:p-8 bg-white border-black/10 shadow-sm hover:shadow-lg hover:border-[#E60000]/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-[#E60000] opacity-20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E60000] text-[#E60000]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#666666] mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-black/5">
                <div className="w-12 h-12 bg-[#E60000] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-mono text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#101010]">{testimonial.name}</div>
                  <div className="text-sm text-[#666666]">{testimonial.position}</div>
                  <div className="text-xs text-[#999999] font-mono uppercase mt-0.5">{testimonial.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Trust */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f5f5f5] rounded-xl">
            <Star className="w-5 h-5 fill-[#E60000] text-[#E60000]" />
            <div>
              <span className="font-semibold text-[#101010]">4.9/5</span>
              <span className="text-[#666666] ml-2">на основе 127 отзывов</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
