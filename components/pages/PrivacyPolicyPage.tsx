'use client';

import { Link } from '@/lib/router-shim';
import { ArrowLeft } from 'lucide-react';
import { LegalRequisites } from '@/components/LegalRequisites';
import { LEGAL_ENTITY } from '@/lib/contacts';

const REVISION_DATE = '28.09.2026';

export function PrivacyPolicyPage() {
  const { legalName, inn, ogrnip, address } = LEGAL_ENTITY;

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
            Юридический документ · сайт koagency.me и www.koagency.me
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl">
            Политика обработки персональных данных
          </h1>
          <div className="space-y-1 text-sm text-[#666666]">
            <p>
              <strong className="text-[#101010]">Оператор:</strong> {legalName}, ИНН {inn}, ОГРНИП {ogrnip}.
            </p>
            <p>
              <strong className="text-[#101010]">Адрес для обращений:</strong> {address}.
            </p>
            <p>
              <strong className="text-[#101010]">Email по вопросам ПД:</strong>{' '}
              <a href="mailto:service@koagency.me" className="text-[#E60000] hover:underline underline-offset-4">
                service@koagency.me
              </a>
            </p>
            <p><strong className="text-[#101010]">Дата редакции:</strong> {REVISION_DATE}</p>
          </div>
        </header>

        <div className="space-y-10 text-[#101010]">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Оператор и область действия</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Настоящая политика определяет порядок обработки персональных данных посетителей koagency.me
              и www.koagency.me, заявителей, клиентов и представителей клиентов при обращении в ko:agency.
              ko:agency — обозначение деятельности Оператора.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Политика охватывает формы сайта, переписку по заявкам и сопровождение услуг. Обработка данных
              в CRM клиента при выполнении его поручения определяется также договором с клиентом. Для
              виджетов могут действовать дополнительные уведомления с описанием конкретных функций.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Цели, данные и основания</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Обработка обращения:</strong> имя, предоставленные телефон и email, содержание вопроса,
              сведения о компании и должности, если они указаны заявителем. Цель — ответить, уточнить задачу
              и подготовить предложение. Основание — отдельное согласие; при обращении для заключения
              договора по инициативе субъекта — соответствующее законное основание.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Заключение и исполнение договора:</strong> ФИО, контактные и необходимые договорные
              данные, история согласований и оказанных услуг. Основания — исполнение договора с субъектом и
              обязанности по закону. Для представителей организаций применяются основания, соответствующие
              их роли и цели обработки.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Подтверждение выбора пользователя и защита сайта:</strong> время и источник обращения,
              версия текста согласия, выбранные настройки, необходимые технические журналы. Сведения не
              служат основанием для рекламного профилирования.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Аналитика:</strong> сведения о посещениях, устройстве, браузере, переходах и действиях
              на страницах, технические идентификаторы. Необязательная аналитика включается только после
              отдельного выбора пользователя. Технологии и сроки описаны в{' '}
              <Link to="/legal/cookies" className="text-[#E60000] hover:underline underline-offset-4">
                cookie-политике
              </Link>
              .
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              <strong>Рекламные сообщения по email:</strong> имя и email — только при отдельных согласиях
              на обработку данных для этой цели и на получение рекламы. Отказ от рекламы не ограничивает
              получение ответа на заявку.
            </p>
            <p className="leading-relaxed text-[#333333]">
              <strong>Общение в WhatsApp:</strong> предоставленный номер, имя, содержание переписки и
              необходимые сведения о доставке. Использование канала осуществляется по выбору пользователя.
              Разрешение на сервисные сообщения не является разрешением на рекламу.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Принципы и способы</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Оператор обрабатывает только данные, необходимые для определённых целей, поддерживает их
              точность и ограничивает доступ. Обработка может быть автоматизированной и неавтоматизированной
              и включать сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение,
              использование, предоставление уполномоченным получателям, блокирование, удаление и уничтожение.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Оператор не запрашивает через формы паспортные данные, сведения о здоровье, биометрию, пароли,
              коды подтверждения и полные реквизиты банковских карт. Просим не включать эти сведения в
              свободный текст.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Сервисы и получатели</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Доступ предоставляется уполномоченным лицам в пределах задач. Подрядчики по хостингу, почте и
              CRM могут обрабатывать данные на основании договоров и, когда требуется, поручений на
              обработку.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Заявки поступают в amoCRM. Для сайта используется хостинг Beget в Российской Федерации; на
              сайте используется Яндекс.Метрика. Подробности и границы подтверждённых сведений приведены в
              приложении{' '}
              <Link to="/legal/processors" className="text-[#E60000] hover:underline underline-offset-4">
                «Сервисы обработки данных»
              </Link>
              . Размещение сайта в РФ само по себе не подтверждает расположение всех баз CRM, почты и
              интеграций.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Данные могут передаваться государственным органам при наличии законного требования. Публичное
              распространение данных не входит в цели этой политики.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Хранение и прекращение обработки</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Данные заявки, не приведшей к договору, хранятся до завершения рассмотрения и последующего
              согласованного общения, но не более <strong>90 календарных дней</strong> после последнего
              содержательного контакта, если отсутствует другое законное основание.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Данные по заключённому договору хранятся в период его исполнения, а затем в пределах
              обязательных сроков. По завершении обязательного хранения данные удаляются, если отсутствует
              самостоятельное законное основание.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Данные для рекламной подписки используются до отзыва согласия, но не более{' '}
              <strong>одного года</strong> с момента предоставления; продолжение требует нового согласия.
              Доказательства предоставления и отзыва хранятся отдельно.
            </p>
            <p className="leading-relaxed text-[#333333]">
              При достижении цели или отзыве согласия данные уничтожаются в сроки, установленные законом.
              Сведения, подлежащие обязательному хранению, изолируются от необязательной обработки.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Место обработки и передача за рубеж</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              При сборе данных граждан РФ через интернет Оператор выполняет требования о локализации.
              Использование иностранного сервиса, включая мессенджер, не отменяет эти требования.
            </p>
            <p className="leading-relaxed text-[#333333]">
              До трансграничной передачи Оператор определяет получателей и страны, выполняет установленные
              законом процедуры и раскрывает соответствующую информацию субъекту. Согласие на сообщения в
              WhatsApp само по себе не заменяет эти процедуры.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Права и обращения</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Пользователь вправе запросить информацию об обработке своих данных, потребовать уточнения,
              блокирования или уничтожения в установленных законом случаях, отозвать согласие, отказаться от
              рекламы и обратиться в Роскомнадзор или суд.
            </p>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Запрос направляется на{' '}
              <a href="mailto:service@koagency.me" className="text-[#E60000] hover:underline underline-offset-4">
                service@koagency.me
              </a>{' '}
              с темой «Персональные данные». Для поиска записи достаточно указать использованный контакт и
              суть запроса. Порядок описан на странице{' '}
              <Link to="/legal/data-deletion" className="text-[#E60000] hover:underline underline-offset-4">
                «Удаление данных»
              </Link>
              .
            </p>
            <p className="leading-relaxed text-[#333333]">
              Запросы рассматриваются в сроки и порядке, установленных Федеральным законом № 152-ФЗ.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Защита и обновления</h2>
            <p className="mb-3 leading-relaxed text-[#333333]">
              Оператор применяет правовые, организационные и технические меры, соответствующие характеру
              данных и рискам: разграничение доступа, учёт действий, управление доступом подрядчиков, защиту
              передачи и процедуры реагирования на инциденты. Абсолютная безопасность не гарантируется.
            </p>
            <p className="leading-relaxed text-[#333333]">
              Новая редакция размещается на этой странице с датой вступления в силу. Изменение политики не
              расширяет ранее предоставленное согласие автоматически.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">9. Реквизиты оператора</h2>
            <LegalRequisites />
          </section>
        </div>

        <div className="mt-16 border-t border-black/5 pt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm">
          <Link to="/legal/consent" className="text-[#E60000] hover:underline underline-offset-4">
            Согласие на обработку заявки →
          </Link>
          <Link to="/legal/cookies" className="text-[#E60000] hover:underline underline-offset-4">
            Cookie-политика →
          </Link>
          <Link to="/legal/data-deletion" className="text-[#E60000] hover:underline underline-offset-4">
            Удаление данных →
          </Link>
        </div>
      </article>
    </div>
  );
}
