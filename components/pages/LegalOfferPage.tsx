'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';

export function LegalOfferPage() {
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
            Публичная оферта на использование виджетов и разработок KO:AGENCY
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
            <h2 className="mb-3 text-xl font-semibold">1. Предмет</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Исполнитель предоставляет Пользователю право использования виджетов и иных
              разработок для amoCRM/Kommo (далее — Продукты), размещённых, в частности, в
              amoМаркете и на сайте{' '}
              <a
                href="https://koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me
              </a>
              , на условиях подписки. Использование любого из Продуктов означает полное и
              безоговорочное принятие настоящей оферты.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Список актуальных Продуктов и их описание доступны на сайте
              Исполнителя и в amoМаркете.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Стоимость и оплата</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Стоимость подписки, доступные периоды и подарочные месяцы указываются на
              странице конкретного Продукта на сайте{' '}
              <a
                href="https://koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me
              </a>{' '}
              и на его карточке в amoМаркете. Приоритет имеют цена и условия, указанные в
              amoМаркете на момент оплаты.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Оплата и продление производятся через биллинг amoМаркета. Исполнитель не
              обрабатывает и не хранит платёжные данные Пользователя (номера карт, CVV и
              т. п.).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Пробный период</h2>
            <p className="leading-relaxed text-[#333333]">
              Для большинства Продуктов доступен пробный период. Его точная длительность
              указывается на странице конкретного Продукта. По умолчанию — 14 дней.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Условия использования</h2>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  Продукты работают внутри аккаунта amoCRM/Kommo Пользователя и обращаются
                  только к API того же аккаунта (same-origin). Данные не передаются
                  третьим лицам — см.{' '}
                  <Link
                    to="/legal/privacy"
                    className="text-[#E60000] hover:underline underline-offset-4"
                  >
                    Политику конфиденциальности
                  </Link>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  Пользователь обязуется не нарушать работу amoCRM/Kommo, не использовать
                  Продукты противоправно и не пытаться реверс-инжинирить их.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                <span>
                  Исполнитель вправе временно приостанавливать работу Продуктов для
                  технического обслуживания и обновлений.
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
              и e-mail{' '}
              <a
                href="mailto:service@koagency.me"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                service@koagency.me
              </a>{' '}
              в рабочие дни. Время реакции — до конца рабочего дня, обычно 15–60 минут.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Ответственность</h2>
            <p className="leading-relaxed text-[#333333]">
              Продукты предоставляются «как есть». Исполнитель не несёт ответственности
              за косвенные убытки, упущенную выгоду, простои, потерю данных вследствие
              действий Пользователя или сбоев amoCRM/Kommo. Максимальная ответственность
              Исполнителя по любому Продукту ограничена суммой подписки за текущий
              оплаченный период по этому Продукту.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Возврат</h2>
            <p className="leading-relaxed text-[#333333]">
              Условия возврата — в соответствии с правилами amoМаркета и применимым
              законодательством. Возвраты, инициированные Пользователем без причин,
              связанных с неработоспособностью Продукта, могут быть отклонены.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Изменение условий</h2>
            <p className="leading-relaxed text-[#333333]">
              Исполнитель вправе в одностороннем порядке изменять условия настоящей
              оферты. Актуальная редакция всегда доступна по адресу{' '}
              <a
                href="https://koagency.me/legal/offer"
                className="text-[#E60000] hover:underline underline-offset-4"
              >
                koagency.me/legal/offer
              </a>
              . Дальнейшее использование Продуктов после изменений означает согласие с
              новой редакцией.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Реквизиты</h2>
            <p className="leading-relaxed text-[#333333]">
              ИП Кононенко Елена Витальевна. Контакт для обращений:{' '}
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
            to="/legal/privacy"
            className="text-sm text-[#E60000] hover:underline underline-offset-4"
          >
            Политика конфиденциальности →
          </Link>
        </div>
      </article>
    </div>
  );
}
