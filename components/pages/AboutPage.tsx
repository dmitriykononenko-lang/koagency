'use client';

import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Link } from '@/lib/router-shim';
import { LEGAL_ENTITY } from '@/lib/contacts';

export function AboutPage() {
  return (
    <div className="pb-20 pt-10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#101010]">
              Мы — <span className="text-[#E60000]">ko:agency</span>
            </h1>
            <p className="text-xl text-[#666666] max-w-2xl leading-relaxed">
              Мы не просто внедряем CRM. Мы трансформируем хаос в системный бизнес-процесс. 
              Наша миссия — дать собственникам полный контроль над продажами.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats / Mission */}
      <section className="py-12 bg-[#F5F5F5]/50 border-y border-black/5">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#E60000] mb-2">5+</div>
              <div className="text-[#101010] font-medium">Лет на рынке</div>
            </div>
            <div className="p-6 border-l border-r border-black/5">
              <div className="text-4xl font-bold text-[#E60000] mb-2">200+</div>
              <div className="text-[#101010] font-medium">Реализованных проектов</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#E60000] mb-2">100%</div>
              <div className="text-[#101010] font-medium">Прозрачность процессов</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#101010]">Наши ценности</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-[#E60000]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Скорость</h3>
                    <p className="text-[#666666]">Мы понимаем, что время — деньги. Внедряем решения быстро, без потери качества.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#E60000]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Надежность</h3>
                    <p className="text-[#666666]">Мы строим системы, которые работают стабильно и масштабируются вместе с вашим бизнесом.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#E60000]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Экспертность</h3>
                    <p className="text-[#666666]">Наша команда сертифицирована ведущими вендорами CRM-систем.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#101010] to-[#2a2a2a] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                 <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E60000] opacity-30 blur-[80px]" />
              </div>
              <div className="text-white text-center p-8 relative z-10">
                <div className="text-6xl font-mono mb-4 opacity-20">ko:</div>
                <p className="text-lg">Архитекторы системных продаж</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Юридическое лицо / владелец бренда */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl border border-black/10 bg-[#f8f8f8] p-8 sm:p-10">
            <div className="mb-6 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Владелец бренда · юридическое лицо
            </div>
            <h2 className="mb-4 text-2xl font-bold text-[#101010] sm:text-3xl">
              ko:agency — ИП Кононенко Елена Витальевна
            </h2>
            <p className="mb-6 text-[#555555] leading-relaxed">
              «ko:agency» — обозначение деятельности индивидуального предпринимателя, зарегистрированного
              в Российской Федерации.
            </p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2 text-[#333333]">
              <div>
                <dt className="text-[#888888]">Полное наименование</dt>
                <dd className="font-medium">{LEGAL_ENTITY.legalName}</dd>
              </div>
              <div>
                <dt className="text-[#888888]">ИНН</dt>
                <dd className="font-mono">{LEGAL_ENTITY.inn}</dd>
              </div>
              <div>
                <dt className="text-[#888888]">ОГРНИП</dt>
                <dd className="font-mono">{LEGAL_ENTITY.ogrnip}</dd>
              </div>
              <div>
                <dt className="text-[#888888]">Дата регистрации</dt>
                <dd className="font-mono">{LEGAL_ENTITY.registrationDate}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#888888]">Адрес для обращений</dt>
                <dd>{LEGAL_ENTITY.address}</dd>
              </div>
              <div>
                <dt className="text-[#888888]">Телефон</dt>
                <dd className="font-mono">{LEGAL_ENTITY.phone}</dd>
              </div>
              <div>
                <dt className="text-[#888888]">Email</dt>
                <dd>
                  <a href="mailto:hello@koagency.me" className="text-[#E60000] hover:underline">
                    hello@koagency.me
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <Link
                to="/legal/company"
                className="inline-flex items-center gap-2 text-sm text-[#E60000] hover:underline underline-offset-4"
              >
                Полные реквизиты и юридическая информация
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

       {/* Call to Action */}
       <section className="py-20">
        <Container>
            <div className="bg-[#101010] rounded-3xl p-12 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E60000] opacity-10 blur-[100px]" />
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Готовы навести порядок в продажах?
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Оставьте заявку, и мы проведем аудит вашей текущей системы продаж бесплатно.
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="bg-[#E60000] hover:bg-[#cc0000] text-white text-lg px-8">
                            Обсудить проект <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
       </section>
    </div>
  );
}
