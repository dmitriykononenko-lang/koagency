'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';

export function WidgetPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-black/5 bg-[#f5f5f5] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pb-4">
          <Link
            to="/widgets/task-templates"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#E60000] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            К странице виджета
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
            Юридический документ
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Политика конфиденциальности виджета «Шаблоны задач»
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
                href="mailto:koagency.me@gmail.com"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me@gmail.com
              </a>
            </p>
            <p>
              <strong className="text-[#101010]">Дата редакции:</strong> 16.06.2026
            </p>
          </div>
        </header>

        <div className="space-y-10 text-[#101010]">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Общие положения</h2>
            <p className="leading-relaxed text-[#333333]">
              Настоящая политика описывает, какие данные обрабатывает виджет «Шаблоны
              задач» (далее — Виджет) при использовании в аккаунте amoCRM.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Какие данные обрабатываются</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Виджет работает внутри интерфейса amoCRM и обращается только к API того же
              аккаунта amoCRM (same-origin). Виджет обрабатывает:
            </p>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  настройки шаблонов задач (название, текст/комментарий, тип задачи,
                  срок, ответственный), которые задаёт пользователь;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  идентификаторы открытой карточки (сделки/контакта/компании) и
                  пользователя — только для постановки задачи через штатный API amoCRM;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  справочные данные аккаунта (типы задач, список сотрудников) — для
                  отображения в интерфейсе виджета.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Где хранятся данные</h2>
            <p className="leading-relaxed text-[#333333]">
              Шаблоны хранятся <strong className="text-[#101010]">внутри вашего аккаунта amoCRM</strong> — в
              служебном списке «Шаблоны задач (данные виджета)». Виджет{' '}
              <strong className="text-[#101010]">не передаёт данные на сторонние серверы</strong>
              {' '}и не использует внешних сервисов: собственного бэкенда у Виджета нет.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Передача третьим лицам</h2>
            <p className="leading-relaxed text-[#333333]">
              Виджет не передаёт персональные и иные данные третьим лицам. Все операции
              выполняются в рамках вашего аккаунта amoCRM средствами его официального API.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Cookie и аналитика</h2>
            <p className="leading-relaxed text-[#333333]">
              Виджет не устанавливает собственные cookie и не использует системы аналитики.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Права пользователя</h2>
            <p className="leading-relaxed text-[#333333]">
              Вы в любой момент можете изменить или удалить шаблоны через «Редактор
              шаблонов», а также удалить Виджет (интеграцию) из аккаунта. При удалении
              служебного списка «Шаблоны задач (данные виджета)» сохранённые шаблоны
              удаляются.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Контакты</h2>
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
                href="mailto:koagency.me@gmail.com"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-black/5 pt-8 text-center">
          <Link
            to="/widgets/task-templates/offer"
            className="text-sm text-[#E60000] hover:underline underline-offset-4"
          >
            Публичная оферта →
          </Link>
        </div>
      </article>
    </div>
  );
}
