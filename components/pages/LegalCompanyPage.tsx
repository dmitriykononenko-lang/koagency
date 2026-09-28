'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';
import { LegalRequisites } from '@/components/LegalRequisites';
import { LEGAL_ENTITY, PRIMARY_EMAIL, SUPPORT_EMAIL } from '@/lib/contacts';

const REVISION_DATE = '28.09.2026';

export function LegalCompanyPage() {
  const { legalName, inn, ogrnip, registrationDate, address, phone, phoneAlt } = LEGAL_ENTITY;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-black/5 bg-[#f5f5f5] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#E60000] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
            Юридическая информация · koagency.me
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Юридическая информация и контакты
          </h1>
          <p className="text-sm text-[#666666]">
            <strong className="text-[#101010]">Дата редакции:</strong> {REVISION_DATE}
          </p>
        </header>

        <div className="space-y-10 text-[#101010]">
          <section>
            <h2 className="mb-3 text-xl font-semibold">Владелец сайта</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              ko:agency — обозначение деятельности индивидуального предпринимателя Кононенко Елены Витальевны.
            </p>
            <ul className="space-y-1.5 text-[#333333]">
              <li><strong>Полное наименование:</strong> {legalName}</li>
              <li><strong>ИНН:</strong> {inn}</li>
              <li><strong>ОГРНИП:</strong> {ogrnip}</li>
              <li><strong>Дата государственной регистрации:</strong> {registrationDate}</li>
              <li><strong>Страна регистрации:</strong> Российская Федерация</li>
              <li><strong>Адрес для обращений:</strong> {address}</li>
              <li>
                <strong>Сайт:</strong>{' '}
                <a href="https://www.koagency.me/" className="text-[#E60000] hover:underline underline-offset-4">
                  https://www.koagency.me/
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Контакты</h2>
            <ul className="space-y-1.5 text-[#333333]">
              <li>
                <strong>Общие вопросы и проекты:</strong>{' '}
                <a href={`mailto:${PRIMARY_EMAIL}`} className="text-[#E60000] hover:underline underline-offset-4">
                  {PRIMARY_EMAIL}
                </a>
              </li>
              <li>
                <strong>Поддержка и вопросы персональных данных:</strong>{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#E60000] hover:underline underline-offset-4">
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <strong>Телефон:</strong>{' '}
                <a href={`tel:${phone.replace(/\s|-/g, '')}`} className="text-[#E60000] hover:underline underline-offset-4">
                  {phone}
                </a>
              </li>
              {phoneAlt && (
                <li>
                  <strong>Дополнительный телефон:</strong>{' '}
                  <a href={`tel:${phoneAlt.replace(/\s|-/g, '')}`} className="text-[#E60000] hover:underline underline-offset-4">
                    {phoneAlt}
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-3 text-sm text-[#666666]">
              Телефонный код не меняет страну регистрации предпринимателя.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Услуги</h2>
            <p className="leading-relaxed text-[#333333]">
              Внедрение и сопровождение CRM-систем, консультации по автоматизации бизнес-процессов,
              настройка интеграций и разработка программных продуктов. Условия конкретных услуг определяются
              договором или соответствующей офертой.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Полные реквизиты</h2>
            <LegalRequisites />
          </section>
        </div>

        <div className="mt-16 border-t border-black/5 pt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm">
          <Link to="/privacy" className="text-[#E60000] hover:underline underline-offset-4">
            Политика обработки ПД →
          </Link>
          <Link to="/legal/consent" className="text-[#E60000] hover:underline underline-offset-4">
            Согласие на заявку →
          </Link>
          <Link to="/legal/cookies" className="text-[#E60000] hover:underline underline-offset-4">
            Cookie →
          </Link>
        </div>
      </article>
    </div>
  );
}
