import { Award, Shield, Trophy, Zap } from 'lucide-react';

const partners = [
  {
    name: 'amoCRM',
    status: 'Официальный партнер',
    icon: Shield,
    color: 'text-[#E60000]'
  },
  {
    name: 'Kommo',
    status: 'Сертифицированный',
    icon: Award,
    color: 'text-[#E60000]'
  },
  {
    name: 'AI Solutions',
    status: 'Эксперт по внедрению',
    icon: Zap,
    color: 'text-[#E60000]'
  },
  {
    name: 'Top Agency 2024',
    status: 'CRM Rating',
    icon: Trophy,
    color: 'text-[#E60000]'
  }
];

const guarantees = [
  {
    title: 'Гарантия результата',
    description: '30 дней на тестирование или возврат 100%'
  },
  {
    title: 'Фиксированная цена',
    description: 'Без скрытых платежей и доплат'
  },
  {
    title: 'Поддержка 24/7',
    description: 'Отвечаем в течение 15 минут'
  },
  {
    title: 'NDA',
    description: 'Полная конфиденциальность данных'
  }
];

export function Partners() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        {/* Partners */}
        <div className="mb-16">
          <h3 className="text-center mb-8 text-[#666666] font-mono uppercase text-sm tracking-wider">
            Партнеры и сертификаты
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-black/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E60000]/30 hover:shadow-md transition-all"
                >
                  <Icon className={`w-10 h-10 ${partner.color} mb-3`} />
                  <div className="font-semibold text-[#101010] mb-1">{partner.name}</div>
                  <div className="text-xs text-[#666666]">{partner.status}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guarantees */}
        <div>
          <h3 className="text-center mb-8 text-[#666666] font-mono uppercase text-sm tracking-wider">
            Наши гарантии
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div 
                key={index}
                className="bg-white border border-black/10 rounded-xl p-6 text-center"
              >
                <div className="w-2 h-2 bg-[#E60000] rounded-full mx-auto mb-3" />
                <div className="font-semibold text-[#101010] mb-2">{guarantee.title}</div>
                <div className="text-sm text-[#666666]">{guarantee.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
