// Тексты страниц виджета «Финансовый учёт» из ветки widget/finance (коммит 8c80c93, .flow/artifacts/T-022-pages).
// Убраны строки с адресом самой страницы и пометки для вёрстки; en-раздел внизу, заголовки понижены на уровень.

export const SUPPORT = `# Поддержка и инструкция — «Финансовый учёт» для amoCRM

Поддержка: hello@koagency.me, Telegram @koagency_bot. Отвечаем в рабочие дни с 10:00 до 19:00 МСК, обычно в течение 4 часов. В письме укажите адрес аккаунта (xxx.amocrm.ru), номер сделки и что произошло.

## Что умеет виджет
- Поступления и расходы по каждой сделке: план, сколько получено, остаток, прибыль и маржа — во вкладке карточки.
- Автоматические транзакции на этапах воронки (шаг автоворонки).
- Запись оплат счетов amoCRM: оплаченный счёт сам становится поступлением.
- Отчёты по сделкам, статьям и ответственным, долги контрагентов, выгрузка в Excel.
- ДДС компании: расходы и поступления вне сделок (реклама, аренда, зарплата), группы статей, счета, отчёт по месяцам.
- Права по группам пользователей amoCRM.

## Установка
1. amoМаркет → найдите «Финансовый учёт» → «Установить». Устанавливает администратор аккаунта.
2. Подтвердите доступ к аккаунту. После установки откроется окно «Финансовый учёт подключён».
3. Если в аккаунте включены «Счета/покупки», запись оплат счетов включится сама — с момента установки. Ранее оплаченные счета не вносятся.

## Первые шаги
1. **Настройки** — в окне виджета вкладка «Настройки» (открывается из карточки виджета в amoМаркете или из вкладки сделки → «Отчёты и долги»):
   - источник плана сделки: бюджет, сумма выставленных счетов или своё поле;
   - статьи доходов и расходов — стартовый набор можно переименовать и дополнить;
   - права по группам: кто видит расходы и прибыль, кто вносит и правит операции, кто видит отчёты и ДДС.
2. **Вкладка в сделке** — откройте сделку, меню «⋯» над полями → «Финансовый учёт». Кнопки «+ Поступление» и «− Расход».
3. **ДДС компании** — окно виджета → «ДДС»: операции без сделки, переводы между счетами, отчёт по месяцам.

## Автотранзакции на этапах
Сделки → «Настроить» (автоворонка) → нужный этап → «+» → «Финансовый учёт». Выберите тип (поступление или расход), сумму (фиксированная, процент от плана сделки или из числового поля сделки), статью → «Сохранить» вверху страницы воронки. Шаг срабатывает, когда сделка попадает на этап; повтор в течение 10 минут не создаёт дубль. Если шаг не сохранён, в виджете появится плашка «шаг не сохранён» со ссылкой на воронку.

## Частые вопросы
**Не вижу вкладку в сделке.** Она в меню «⋯» над полями сделки. Если её нет — проверьте, что у вашей группы есть право на финансы (Настройки → Права).
**Оплаченный счёт не появился.** Проверьте, что запись оплат включена (Настройки → «Записывать поступление, когда счёт amo оплачен») и счёт оплачен после её включения. Статусы «Оплачен в аванс» и «Частично оплачен» вносятся, только если отмечены в настройках. Обновление — до нескольких минут.
**Окно пишет «Сервер не ответил».** Обновите страницу amoCRM. Если повторяется — напишите нам с адресом аккаунта и временем ошибки.
**Как удалить транзакцию.** В строке транзакции → «Удалить». 10 секунд можно нажать «Отменить». Удалённые транзакции остаются в истории изменений.
**Валюта.** Берётся из настроек аккаунта amoCRM, в виджете не меняется.
**Как выгрузить данные.** Окно → «Отчёты» → «Выгрузить в Excel».

## Отключение и удаление данных
Отключить виджет можно в amoМаркете → «Установленные» → «Отключить». Данные на сервере хранятся 30 дней на случай повторной установки, затем удаляются автоматически. Удалить раньше — письмо на hello@koagency.me, подробно — в [политике конфиденциальности](https://koagency.me/widgets/finance/privacy).

## Стоимость
1 490 ₽ в месяц за аккаунт, без ограничения числа пользователей. Пакеты: 6 месяцев — 8 940 ₽, 12 месяцев — 14 900 ₽. Пробный период — 7 дней с момента установки, без привязки карты. По окончании операции не вносятся, пока подписка не оплачена; данные сохраняются.

---

## Support and guide — “Finance by KO” for amoCRM

Support: hello@koagency.me, Telegram @koagency_bot. Business days 10:00–19:00 Moscow time, usually within 4 hours. Please include your account address (xxx.amocrm.com), the lead number and what happened.

### What it does
- Income and expenses per lead: plan, received, remaining, profit and margin — in a lead card tab.
- Automatic transactions on pipeline stages (Digital Pipeline step).
- amoCRM invoice payments recorded automatically as income.
- Reports by lead, category and responsible user, counterparty debts, Excel export.
- Company cash flow: income and expenses outside leads (ads, rent, payroll), category groups, money accounts, monthly report.
- Permissions by amoCRM user group.

### Installation
1. amoMarket → “Finance by KO” → Install. Must be done by an account administrator.
2. Grant access to the account. A “connected” page confirms the installation.
3. If Invoices are enabled in the account, invoice payment recording turns on automatically from the moment of installation. Invoices paid earlier are not imported.

### Getting started
1. **Settings** — the widget window, Settings tab (open it from the widget card in amoMarket or from the lead tab → Reports and debts): lead plan source; income and expense categories; group permissions (who sees expenses and profit, who adds and edits records, who sees reports and cash flow).
2. **Lead tab** — open a lead, the “⋯” menu above the fields → Finance by KO. Use “+ Income” and “− Expense”.
3. **Company cash flow** — the widget window → Cash flow: records without a lead, transfers between accounts, monthly report.

### Pipeline automation
Leads → Automate (Digital Pipeline) → stage → “+” → Finance by KO. Choose the type, the amount (fixed, % of the lead plan or from a numeric lead field) and the category → Save at the top of the pipeline page. The step runs when a lead enters the stage; a repeat within 10 minutes does not create a duplicate. If the step was not saved, the widget shows a “step not saved” notice with a link to the pipeline.

### FAQ
**I can't see the lead tab.** It is in the “⋯” menu above the lead fields. If it isn't there, check your group's permissions (Settings → Permissions).
**A paid invoice didn't show up.** Check that invoice payment recording is on and the invoice was paid after it was enabled. “Paid in advance” and “Partially paid” are recorded only if selected in settings. Updates can take a few minutes.
**The window says the server didn't respond.** Reload amoCRM. If it persists, email us with the account address and the time.
**Deleting a transaction.** Use Delete on the row; Undo is available for 10 seconds. Deleted records stay in the change history.
**Currency.** Taken from the amoCRM account settings.
**Exporting data.** Window → Reports → Export to Excel.

### Pricing
1,490 RUB per account per month, any number of users. Packages: 6 months — 8,940 RUB, 12 months — 14,900 RUB. Free trial — 7 days from installation, no card required. After it ends, new records can't be added until the subscription is paid; existing data is kept.

### Uninstalling and data deletion
Uninstall in amoMarket → Installed → Disable. Data is kept on the server for 30 days in case you reinstall, then deleted automatically. To delete it earlier, email hello@koagency.me — see the [privacy policy](https://koagency.me/widgets/finance/privacy).
`;

export const PRIVACY = `# Политика конфиденциальности виджета «Финансовый учёт» для amoCRM

Разработчик и оператор: KO:AGENCY (реквизиты — в конце страницы).
Связь: hello@koagency.me, Telegram @koagency_bot.
Дата редакции: 22.11.2026.

## 1. Общие положения
Политика описывает, какие данные обрабатывает виджет «Финансовый учёт» (далее — виджет) при установке в аккаунт amoCRM, где они хранятся и как их удалить. Устанавливая виджет, администратор аккаунта соглашается с политикой от имени аккаунта.

## 2. Как устроен виджет
Виджет состоит из интерфейса внутри amoCRM (вкладка в карточке сделки, окно отчётов, шаг автоворонки) и сервера KO:AGENCY по адресу finance.koagency.me. Финансовые операции хранятся на сервере, а не в amoCRM: amoCRM не умеет хранить их сам. Сервер обращается к amoCRM по API от имени аккаунта с правами, которые администратор выдал при установке.

## 3. Какие данные обрабатываются
**Данные аккаунта amoCRM:** ID и поддомен аккаунта, валюта, признак включённых «Счетов/покупок»; токены доступа к API amoCRM.
**Данные, которые вводят пользователи:** поступления и расходы по сделкам и операции компании (ДДС): сумма, дата, статья, счёт, статус «оплачено/план», комментарий, привязка к сделке и контрагенту; история изменений операций (кто и когда менял); статьи, группы статей, счета, настройки и права по группам пользователей.
**Данные, которые виджет читает из amoCRM:** название, бюджет, воронка, этап и ответственный сделки; значения полей плана и себестоимости, если они выбраны в настройках; имена и группы пользователей amoCRM (для прав и отчётов); названия контактов и компаний — при выборе контрагента; счета сделки и события их оплаты — если включена запись оплат счетов.
**Контактный телефон администратора:** номер, который администратор аккаунта указывает в обязательном поле «Контактный телефон» при установке виджета, а также email и ID этого администратора в amoCRM, ID, поддомен и домен аккаунта. Зачем: связаться по подписке (пробный период, оплата, продление) и сообщить о работе виджета (сбои, плановые работы, важные изменения). Телефон хранится на сервере виджета и передаётся в CRM KO:AGENCY — нашу рабочую CRM на amoCRM, где мы ведём клиентов: там создаются контакт с этим телефоном, компания (ID и адрес аккаунта) и сделка с названием продукта «Финансовый учёт». Для рекламных рассылок телефон не используется.
**Технические данные:** журнал действий (установка, вход в окно, смена настроек и прав, выгрузка в Excel, ошибки обращения к amoCRM) с ID пользователя amoCRM и временем; служебные записи о полученных вебхуках.

Виджет не запрашивает и не хранит пароли, платёжные данные, телефоны и email клиентов из вашей базы (кроме контактного телефона администратора, который он указывает сам). Контакты и компании хранятся только как ID; название подгружается из amoCRM при показе. Комментарий к операции — свободный текст: не вносите в него персональные данные без необходимости.

## 4. Что виджет записывает в amoCRM
Примечание в ленту сделки о каждой транзакции (сумма, статья, автор). Других изменений в данных amoCRM виджет не делает.

## 5. Где и как хранятся данные
На сервере KO:AGENCY в Российской Федерации (Москва, Selectel), в базе PostgreSQL. Трансграничной передачи данных нет. Доступ к серверу — только у разработчиков KO:AGENCY, по ключу. Токены amoCRM хранятся зашифрованными (AES-256). Соединение с сервером — только HTTPS. Резервная копия базы делается раз в сутки, шифруется и хранится 14 дней. Данные каждого аккаунта отделены: пользователь видит только свой аккаунт и только то, что разрешают его права.

## 6. Передача третьим лицам
Мы не продаём данные и не передаём их для рекламы. Передаём только обработчикам по нашему поручению:
- сервису оплаты подписки KO:AGENCY (наш сервер в РФ) — ID, поддомен и домен аккаунта, чтобы учитывать пробный период и оплату, и контактный телефон администратора с его email, чтобы передать их в CRM KO:AGENCY;
- ООО «амоЦРМ» — CRM KO:AGENCY работает на платформе amoCRM: контакт, компания и сделка с телефоном администратора хранятся в нашем аккаунте amoCRM, и ООО «амоЦРМ» обрабатывает эти данные как поставщик облачного сервиса, на своих серверах в РФ, на условиях своей политики конфиденциальности. Доступ к ним есть только у сотрудников KO:AGENCY.

Обмен с amoCRM вашего аккаунта идёт по её API в рамках прав, выданных при установке.

## 7. Cookie и аналитика
Виджет не ставит cookie и не использует сторонние системы аналитики. Ключ входа в окно живёт только в памяти открытой страницы. Черновики форм и отметки о скрытых подсказках хранятся в браузере (localStorage) на устройстве пользователя и на сервер не уходят.

## 8. Отключение и удаление данных
При отключении виджета в amoCRM сервер получает уведомление, прекращает обращения к amoCRM и отменяет неотправленные примечания. Операции и настройки хранятся ещё 30 дней — если за это время установить виджет снова, учёт продолжится с того же места.
Через 30 дней после отключения все данные аккаунта удаляются с сервера автоматически: операции, история изменений, статьи, счета, настройки, права, журнал действий и токены. Из резервных копий они исчезают ещё не позже чем через 14 дней.
Контактный телефон администратора на сервере виджета удаляется вместе с остальными данными аккаунта. В CRM KO:AGENCY контакт хранится, пока вы не отзовёте согласие или не попросите удалить номер, — для связи по подписке, оплатам и возвратам, в том числе после отключения виджета. Отозвать согласие или удалить номер — письмом на hello@koagency.me, удаляем в течение 10 рабочих дней; сменить номер можно в настройках виджета.
Удалить данные раньше срока может администратор аккаунта: письмо на hello@koagency.me с адресом аккаунта (xxx.amocrm.ru). Удаляем в течение 10 рабочих дней и подтверждаем ответом.
Перед удалением можно выгрузить операции и отчёты в Excel из окна виджета.

## 9. Права пользователя
Пользователь вправе узнать, какие данные о нём обрабатываются, потребовать исправления или удаления — по адресу hello@koagency.me. Отвечаем в течение 10 рабочих дней.

## 10. Изменения политики
Новая редакция публикуется на этой странице с датой. Существенные изменения сообщаем в описании новой версии виджета.

---

## Privacy Policy — “Finance by KO” widget for amoCRM

Developer and operator: KO:AGENCY (company details are at the end of the page).
Contact: hello@koagency.me, Telegram @koagency_bot.
Revision date: 22.11.2026.

### 1. Scope
This policy explains what data the “Finance by KO” widget processes once installed in an amoCRM account, where it is stored and how to delete it. By installing the widget, the account administrator accepts this policy on behalf of the account.

### 2. How the widget works
The widget has an interface inside amoCRM (a lead card tab, a reports window, a Digital Pipeline step) and a KO:AGENCY server at finance.koagency.me. Financial records are stored on the server, not in amoCRM. The server calls the amoCRM API on behalf of the account with the permissions granted at installation.

### 3. Data we process
**Account data:** amoCRM account ID and subdomain, currency, whether Invoices are enabled; amoCRM API access tokens.
**Data entered by users:** income and expenses on leads and company cash-flow records: amount, date, category, money account, paid/planned status, comment, link to a lead and counterparty; change history (who changed what and when); categories, groups, money accounts, settings and group permissions.
**Data read from amoCRM:** lead name, budget, pipeline, stage and responsible user; plan and cost fields if selected in settings; amoCRM user names and groups (for permissions and reports); contact and company names when picking a counterparty; lead invoices and their payment events if invoice payment recording is on.
**Administrator's contact phone:** the number the account administrator enters in the required “Contact phone” field when installing the widget, plus that administrator's email and user ID, and the account ID, subdomain and domain. Why: to reach you about the subscription (trial, payment, renewal) and to notify you about the widget's operation (outages, maintenance, important changes). The phone is stored on the widget server and passed to KO:AGENCY's CRM — our own CRM account on amoCRM where we manage our clients: a contact with this phone, a company (account ID and address) and a lead named after the product, “Finance by KO”, are created there. The phone is never used for marketing mailings.
**Technical data:** an activity log (installation, window sign-in, settings and permission changes, Excel export, amoCRM API errors) with the amoCRM user ID and time; service records of received webhooks.

The widget does not ask for or store passwords, payment card data, or the phones and emails of clients in your database (except the administrator's own contact phone, entered by the administrator). Contacts and companies are stored as IDs only; names are loaded from amoCRM when shown. Comments are free text — avoid putting personal data there unless needed.

### 4. What the widget writes to amoCRM
A note in the lead feed for each transaction (amount, category, author). Nothing else in amoCRM is changed.

### 5. Storage and security
On a KO:AGENCY server in the Russian Federation (Moscow, Selectel), in PostgreSQL. No cross-border data transfer. Server access is limited to KO:AGENCY developers with a key. amoCRM tokens are stored encrypted (AES-256). HTTPS only. The database is backed up daily; backups are encrypted and kept for 14 days. Each account's data is isolated; a user sees only their account and only what their permissions allow.

### 6. Third parties
We do not sell data or share it for advertising. We pass it only to processors acting on our behalf:
- KO:AGENCY's subscription billing service (our server in Russia) — the account ID, subdomain and domain to track the trial and payments, and the administrator's contact phone and email to pass them to KO:AGENCY's CRM;
- amoCRM LLC — KO:AGENCY's CRM runs on the amoCRM platform: the contact, company and lead with the administrator's phone are stored in our amoCRM account, and amoCRM LLC processes this data as the cloud service provider, on its servers in Russia, under its own privacy policy. Only KO:AGENCY staff have access to them.

Data exchange with your amoCRM account goes through its API within the permissions granted.

### 7. Cookies and analytics
The widget sets no cookies and uses no third-party analytics. The window sign-in key lives only in the open page's memory. Form drafts and dismissed hints are kept in the browser (localStorage) on the user's device and are not sent to the server.

### 8. Uninstalling and data deletion
When the widget is uninstalled in amoCRM, the server is notified, stops calling amoCRM and cancels unsent notes. Records and settings are kept for 30 more days — reinstall within that time and accounting continues where it left off.
30 days after uninstalling, all of the account's data is deleted from the server automatically: records, change history, categories, money accounts, settings, permissions, the activity log and tokens. Backups drop it within a further 14 days.
The administrator's contact phone is deleted from the widget server together with the rest of the account's data. In KO:AGENCY's CRM the contact is kept until you withdraw your consent or ask us to delete the number — for subscription, billing and refund questions, including after uninstalling. To withdraw consent or have the number deleted, email hello@koagency.me; we delete it within 10 business days; the number can be changed in the widget settings.
To delete data earlier, the account administrator emails hello@koagency.me with the account address (xxx.amocrm.com). We delete it within 10 business days and confirm by reply.
Before deletion you can export records and reports to Excel from the widget window.

### 9. User rights
Users may request what data about them is processed, its correction or deletion at hello@koagency.me. We reply within 10 business days.

### 10. Changes
A new revision is published on this page with its date. Material changes are announced in the widget's release notes.
`;
