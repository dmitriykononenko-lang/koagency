'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';
import { LegalRequisites } from '@/components/LegalRequisites';
import { LEGAL_ENTITY } from '@/lib/contacts';

const REVISION_DATE = '28.09.2026';

export function LegalConsentPage() {
  const { legalName, inn, ogrnip, address } = LEGAL_ENTITY;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-black/5 bg-[#f5f5f5] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pb-4">
          <Link
            to="/privacy"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#E60000] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            К политике обработки ПД
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
            Отдельное согласие · форма заявки на koagency.me
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Согласие на обработку данных заявки
          </h1>
          <div className="space-y-1 text-sm text-[#666666]">
            <p><strong className="text-[#101010]">Дата редакции:</strong> {REVISION_DATE}</p>
          </div>
        </header>

        <div className="space-y-8 text-[#101010]">
          <section>
            <p className="leading-relaxed text-[#333333]">
              Я свободно, своей волей и в своём интересе даю {legalName}, ИНН {inn}, ОГРНИП {ogrnip}, адрес:{' '}
              {address}, согласие на обработку предоставленных мной персональных данных для рассмотрения
              заявки, связи со мной, уточнения задачи и подготовки ответа или коммерческого предложения по
              моему обращению.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Какие данные и действия разрешены</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Согласие распространяется на имя, указанные мной телефон и email, содержание обращения, а
              также сведения о компании и должности, если я их предоставил(а). Допускаются сбор, запись,
              систематизация, накопление, хранение, уточнение, извлечение, использование, предоставление
              лицам, обрабатывающим данные по поручению Оператора и указанным в{' '}
              <Link to="/legal/processors" className="text-[#E60000] hover:underline underline-offset-4">
                приложении к политике
              </Link>
              , блокирование, удаление и уничтожение с применением средств автоматизации или без них.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Для приёма и хранения заявок используется amoCRM, для размещения сайта — Beget в РФ.
              Привлечение обработчиков допускается в пределах цели и на предусмотренном законом основании.
              Это согласие не является неопределённым разрешением на передачу данных любым третьим лицам
              или за рубеж.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Срок и отзыв</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Согласие действует до завершения рассмотрения заявки и согласованного общения, но не более{' '}
              <strong>90 календарных дней</strong> после последнего содержательного контакта, либо до более
              раннего отзыва. Отзыв можно направить на{' '}
              <a href="mailto:service@koagency.me" className="text-[#E60000] hover:underline underline-offset-4">
                service@koagency.me
              </a>{' '}
              с темой «Отзыв согласия» и контактными данными, указанными в заявке.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              После отзыва обработка прекращается и данные удаляются в установленном законом порядке, кроме
              случаев, когда имеется самостоятельное основание для их сохранения.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Это согласие не разрешает рекламные рассылки и не является согласием на публикацию моих
              данных.{' '}
              <Link to="/privacy" className="text-[#E60000] hover:underline underline-offset-4">
                Политика обработки данных
              </Link>{' '}
              доступна на сайте.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Действие, подтверждающее согласие</h2>
            <p className="leading-relaxed text-[#333333]">
              Согласие предоставляется отдельным активным выбором флажка «Даю согласие на обработку
              персональных данных для рассмотрения заявки» с доступной ссылкой на этот документ. Время,
              версия текста и факт выбора фиксируются системой.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Реквизиты оператора</h2>
            <LegalRequisites />
          </section>
        </div>
      </article>
    </div>
  );
}
