'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';

export function LegalPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
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
            Юридический документ · применяется ко всем виджетам и разработкам KO:AGENCY
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Политика конфиденциальности виджетов и разработок KO:AGENCY
          </h1>
          <div className="space-y-1 text-sm text-[#666666]">
            <p>
              <strong className="text-[#101010]">Разработчик:</strong> ИП Кононенко Елена
              Витальевна (KO:AGENCY)
            </p>
            <p>
              <strong className="text-[#101010]">Контакты:</strong>{' '}
              <a
                href="https://t.me/koagency_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                Telegram
              </a>{' '}
              ·{' '}
              <a
                href="https://max.ru/id463300749910_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                Max
              </a>{' '}
              ·{' '}
              <a
                href="mailto:service@koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                service@koagency.me
              </a>
            </p>
            <p>
              <strong className="text-[#101010]">Дата редакции:</strong> 04.08.2026
            </p>
          </div>
        </header>

        <div className="space-y-10 text-[#101010]">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Общие положения</h2>
            <p className="leading-relaxed text-[#333333]">
              Настоящая политика описывает, какие данные обрабатывают виджеты и иные
              разработки KO:AGENCY (далее — Продукты) при использовании внутри аккаунта
              amoCRM/Kommo Пользователя. Политика распространяется на все Продукты,
              размещённые в amoМаркете и на сайте{' '}
              <a
                href="https://koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Общий принцип обработки</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Продукты работают внутри интерфейса amoCRM/Kommo и обращаются только к API
              того же аккаунта amoCRM/Kommo (same-origin). Мы придерживаемся принципа
              минимальной необходимой обработки: собираются только те данные, которые
              нужны Продукту для выполнения своей функции.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Точный перечень обрабатываемых данных зависит от конкретного Продукта и
              указан на его странице (раздел «Что виджет обрабатывает»).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Типичные категории данных</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              В зависимости от Продукта могут обрабатываться:
            </p>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  пользовательские настройки Продукта (шаблоны, конфигурации, правила),
                  которые задаёт Пользователь;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  идентификаторы объектов amoCRM/Kommo (сделок, контактов, компаний,
                  задач, пользователей) — исключительно для выполнения операций через
                  штатный API;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  справочные данные аккаунта (типы задач, статусы, стадии воронок, список
                  сотрудников) — для отображения в интерфейсе Продукта.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Где хранятся данные</h2>
            <p className="leading-relaxed text-[#333333]">
              Настройки Продуктов хранятся{' '}
              <strong className="text-[#101010]">внутри вашего аккаунта amoCRM/Kommo</strong>{' '}
              — в служебных списках, специально созданных Продуктом. Если у Продукта нет
              собственного бэкенда — данные{' '}
              <strong className="text-[#101010]">
                не передаются на сторонние серверы
              </strong>
              , и внешних сервисов Продукт не использует. Если для работы Продукта
              необходим бэкенд (например, AI-обработка), это явно указывается на странице
              Продукта.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Передача третьим лицам</h2>
            <p className="leading-relaxed text-[#333333]">
              Мы не передаём персональные и иные данные Пользователя третьим лицам. Все
              операции выполняются в рамках аккаунта amoCRM/Kommo средствами официального
              API соответствующей CRM.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Cookie и аналитика в Продуктах</h2>
            <p className="leading-relaxed text-[#333333]">
              Виджеты не устанавливают собственные cookie и не подключают системы
              аналитики (Google Analytics, Яндекс.Метрика и т. п.) в интерфейсе
              amoCRM/Kommo. Если Продукт когда-либо будет использовать аналитику, это
              будет отдельно указано на его странице.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Права пользователя</h2>
            <p className="leading-relaxed text-[#333333]">
              Вы в любой момент можете изменить или удалить настройки Продукта в его
              редакторе, а также удалить сам Продукт (интеграцию) из аккаунта. При
              удалении служебного списка, в котором хранятся настройки, они удаляются
              безвозвратно.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Изменения политики</h2>
            <p className="leading-relaxed text-[#333333]">
              Актуальная редакция политики всегда доступна по адресу{' '}
              <a
                href="https://koagency.me/legal/privacy"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me/legal/privacy
              </a>
              . О существенных изменениях мы уведомим на странице соответствующего
              Продукта.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Контакты</h2>
            <p className="leading-relaxed text-[#333333]">
              По вопросам обработки данных:{' '}
              <a
                href="https://t.me/koagency_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                Telegram
              </a>
              ,{' '}
              <a
                href="https://max.ru/id463300749910_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                Max
              </a>
              ,{' '}
              <a
                href="mailto:service@koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                service@koagency.me
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-black/5 pt-8 text-center">
          <Link
            to="/legal/offer"
            className="text-sm text-[#E60000] hover:underline underline-offset-4"
          >
            Публичная оферта →
          </Link>
        </div>
      </article>
    </div>
  );
}
