'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';

export function WidgetOfferPage() {
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
            Публичная оферта на использование виджета «Шаблоны задач»
          </h1>
          <div className="space-y-1 text-sm text-[#666666]">
            <p>
              <strong className="text-[#101010]">Исполнитель:</strong> ИП Кононенко Елена
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
            <h2 className="mb-3 text-xl font-semibold">1. Предмет</h2>
            <p className="leading-relaxed text-[#333333]">
              Исполнитель предоставляет Пользователю право использования виджета «Шаблоны
              задач» для amoCRM (далее — Виджет) на условиях подписки. Использование
              Виджета означает полное и безоговорочное принятие настоящей оферты.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Стоимость и оплата</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Стоимость подписки (за аккаунт, пакеты предоплаты):
            </p>
            <ul className="mb-3 space-y-2 text-[#333333]">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  <strong className="text-[#101010]">3 месяца — 1490 ₽</strong>;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  <strong className="text-[#101010]">6 месяцев — 2490 ₽</strong> (+1 месяц в подарок);
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  <strong className="text-[#101010]">12 месяцев — 3990 ₽</strong> (+2 месяца в подарок).
                </span>
              </li>
            </ul>
            <p className="leading-relaxed text-[#333333]">
              Актуальные цена и период всегда указаны на странице Виджета в amoМаркете и
              имеют приоритет. Оплата и продление производятся через биллинг amoМаркета;
              Исполнитель не обрабатывает платёжные данные Пользователя.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Пробный период</h2>
            <p className="leading-relaxed text-[#333333]">
              Пробный период — <strong className="text-[#101010]">14 дней</strong> бесплатно.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Условия использования</h2>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  Виджет работает внутри аккаунта amoCRM Пользователя и не передаёт данные
                  третьим лицам (см.{' '}
                  <Link
                    to="/widgets/task-templates/privacy"
                    className="text-[#E60000] hover:underline underline-offset-4"
                  >
                    Политику конфиденциальности
                  </Link>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  Пользователь обязуется не нарушать работу amoCRM и не использовать
                  Виджет противоправно.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Поддержка</h2>
            <p className="leading-relaxed text-[#333333]">
              Поддержка оказывается через{' '}
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
              </a>{' '}
              и{' '}
              <a
                href="mailto:koagency.me@gmail.com"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me@gmail.com
              </a>{' '}
              в рабочие дни.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Ответственность</h2>
            <p className="leading-relaxed text-[#333333]">
              Виджет предоставляется «как есть». Исполнитель не несёт ответственности за
              косвенные убытки. Максимальная ответственность ограничена суммой подписки за
              текущий оплаченный период.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Возврат</h2>
            <p className="leading-relaxed text-[#333333]">
              Условия возврата — в соответствии с правилами amoМаркета и применимым
              законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Реквизиты</h2>
            <p className="leading-relaxed text-[#333333]">
              ИП Кононенко Елена Витальевна. Контакт для обращений:{' '}
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
            to="/widgets/task-templates/privacy"
            className="text-sm text-[#E60000] hover:underline underline-offset-4"
          >
            Политика конфиденциальности →
          </Link>
        </div>
      </article>
    </div>
  );
}
