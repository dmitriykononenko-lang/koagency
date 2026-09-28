'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';
import { LegalRequisites } from '@/components/LegalRequisites';
import { LEGAL_ENTITY } from '@/lib/contacts';

const REVISION_DATE = '28.09.2026';

export function LegalCookiesPage() {
  const { legalName, inn, ogrnip } = LEGAL_ENTITY;

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
            Юридический документ · koagency.me
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Политика cookie и технических данных
          </h1>
          <div className="space-y-1 text-sm text-[#666666]">
            <p>
              <strong className="text-[#101010]">Оператор:</strong> {legalName}, ИНН {inn}, ОГРНИП {ogrnip}.
            </p>
            <p>
              <strong className="text-[#101010]">Вопросы и отзыв выбора:</strong>{' '}
              <a href="mailto:service@koagency.me" className="text-[#E60000] hover:underline underline-offset-4">
                service@koagency.me
              </a>
            </p>
            <p><strong className="text-[#101010]">Дата редакции:</strong> {REVISION_DATE}</p>
          </div>
        </header>

        <div className="space-y-10 text-[#101010]">
          <section>
            <h2 className="mb-3 text-xl font-semibold">Что это такое</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Сайт koagency.me может использовать cookie и аналогичные технологии для сохранения настроек и
              работы отдельных функций. Cookie — небольшие записи в браузере; localStorage — другой способ
              локального хранения.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Не все технические данные являются обезличенными: некоторые идентификаторы позволяют выделить
              посетителя.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Категории и выбор</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Необходимые технологии</strong> обеспечивают явно запрошенную функцию, безопасность
              или сохранение настроек конфиденциальности. Их использование ограничивается этой целью.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Необязательная аналитика</strong> применяется для оценки посещаемости и улучшения
              сайта. Она включается после отдельного{' '}
              <Link to="/legal/analytics-consent" className="text-[#E60000] hover:underline underline-offset-4">
                согласия на аналитику
              </Link>
              . Отказ не препятствует чтению сайта и отправке заявки через доступную основную форму.
            </p>
            <p className="leading-relaxed text-[#333333]">
              <strong>Внешний чат</strong> может передавать сведения поставщику сервиса при загрузке. При
              отсутствии иного подтверждённого основания его следует загружать после выбора пользователя.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Перечень технологий</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Для каждой используемой технологии Оператор публикует: название или идентификатор, поставщика,
              назначение, категорию, состав передаваемых данных, срок хранения, получателя и страну
              обработки. В перечень включаются технологии, работающие без cookie, если они передают данные
              посетителя.
            </p>
            <p className="leading-relaxed text-[#333333]">
              На сайте используется Яндекс.Метрика; также может использоваться встроенный чат amoCRM. Их
              точный состав данных, настройки и юридические лица поставщиков уточняются до утверждения этой
              редакции. До заполнения перечня необязательные модули должны быть отключены. Полный список
              обработчиков —{' '}
              <Link to="/legal/processors" className="text-[#E60000] hover:underline underline-offset-4">
                /legal/processors
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Управление</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Настройки можно изменить через постоянную ссылку «Настройки cookie». Доступны равнозначные
              действия «Отклонить необязательные», «Разрешить аналитику» и «Настроить». Отзыв выбора
              прекращает дальнейшую необязательную обработку; уже переданные данные обрабатываются по
              процедуре{' '}
              <Link to="/legal/data-deletion" className="text-[#E60000] hover:underline underline-offset-4">
                удаления данных
              </Link>
              .
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Cookie также можно удалить в настройках браузера. Это не заменяет запрос на удаление данных,
              уже сохранённых на стороне сервиса. Продолжение просмотра сайта не считается согласием на
              необязательную аналитику.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Дополнительный способ ограничить сбор статистики — расширение «Блокировщик Яндекс.Метрики»,
              описанное в{' '}
              <a
                href="https://yandex.ru/support/metrica/ru/general/opt-out"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                справке Яндекса
              </a>
              . Оно дополняет настройки сайта, но не заменяет обязанности Оператора по исполнению отзыва.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Реквизиты оператора</h2>
            <LegalRequisites />
          </section>
        </div>

        <div className="mt-16 border-t border-black/5 pt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm">
          <Link to="/privacy" className="text-[#E60000] hover:underline underline-offset-4">
            Политика обработки ПД →
          </Link>
          <Link to="/legal/analytics-consent" className="text-[#E60000] hover:underline underline-offset-4">
            Согласие на аналитику →
          </Link>
        </div>
      </article>
    </div>
  );
}
