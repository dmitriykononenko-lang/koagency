// Тексты страниц виджета «Чаты Авто.ру» из ветки widget/autoru (.flow/artifacts/pages).
// Источник правок — те файлы; заголовок en-раздела понижен до h2 (один h1 на странице).

export const SUPPORT = `---
page: /widgets/autoru/support
lang: ru (en — в конце файла)
title: Поддержка виджета «Чаты Авто.ру»
description: Как подключить чаты Авто.ру к amoCRM, что для этого нужно, частые вопросы и контакты поддержки KO:AGENCY.
status: черновик, не опубликовано; адрес страницы черновой
---

# Поддержка виджета «Чаты Авто.ру»

## Что нужно для подключения

- **Профиль дилера на Авто.ру.** Чаты передаются только из дилерского кабинета (cabinet.auto.ru). У частных продавцов такой настройки нет.
- **Аккаунт amoCRM** и права администратора, чтобы установить виджет.
- **5 минут** и доступ к кабинету Авто.ру с правом менять настройки чатов.

## Как подключить

1. Установите виджет «Чаты Авто.ру» из amoМаркета.
2. В настройках виджета укажите телефон для связи, выберите воронку, этап и, если нужно, ответственного. Нажмите «Сохранить».
3. В настройках появятся **Webhook URL** и **ChatId**. Скопируйте их кнопками «Скопировать».
4. Откройте кабинет Авто.ру: **Настройки → Чаты → Подключить чаты → Добавить свой**. Вставьте Webhook URL и ChatId и сохраните.
5. Попросите кого-нибудь написать в чат любого вашего объявления. В настройках виджета статус сменится на «Подключено», а в amoCRM появится сделка.

## Как это работает

- Клиент впервые пишет по объявлению — виджет создаёт контакт (никнейм с Авто.ру) и сделку в выбранной воронке и этапе с источником «Авто.ру», ссылкой на объявление и текстом сообщения.
- Тот же клиент пишет снова — сообщение добавляется в его открытую сделку. Даже если он пишет по другому объявлению, второй контакт не появится.
- В карточке сделки панель «Авто.ру» показывает объявление и всю переписку. Ответ из поля внизу уходит клиенту в чат Авто.ру и сохраняется в истории.

## Ограничения

- **Телефона клиента нет.** Авто.ру передаёт только никнейм и ссылку на объявление. Телефон спросите в переписке.
- **Ответы из кабинета Авто.ру в amoCRM не попадают.** Отвечайте из карточки сделки — тогда вся переписка будет в одном месте.
- **Первым написать нельзя.** Ответить можно только клиенту, который уже написал в чат.
- **Звонки и заявки** (обратный звонок, трейд-ин, кредит) виджет не передаёт — только чаты.
- Переписка в панели хранится 90 дней; в сделке она остаётся примечаниями.

## Частые вопросы

### Статус «Ждём первое сообщение» не меняется
Проверьте в кабинете Авто.ру, что в настройках чатов сохранён именно Webhook URL из виджета, без пробелов в начале и конце. Сообщение должно прийти от другого пользователя Авто.ру, не от вашего дилерского аккаунта.

### Статус «Ответы не доставляются»
Авто.ру не принял ответ. Чаще всего ChatId в кабинете Авто.ру не совпадает с ChatId в настройках виджета. Скопируйте ChatId из виджета ещё раз и сохраните его в кабинете Авто.ру.

### Статус «Сообщений нет 7 дней»
Если клиенты писали, а сделок нет, проверьте, что чаты в кабинете Авто.ру всё ещё подключены с Webhook URL из виджета. Если клиентов просто не было, ничего делать не нужно.

### Ответ в карточке «Не отправлено»
Нажмите «Повторить» — текст сохранён, клиент не получит его дважды. Если ошибка повторяется, проверьте статус в настройках виджета или напишите нам.

### Сделки создаются не в той воронке или не тому сотруднику
Воронку, этап и ответственного задают в настройках виджета. «Не назначать» оставляет распределение правилам воронки (Digital Pipeline).

### Почему у контакта странное имя
Это никнейм клиента на Авто.ру. Если никнейма нет, контакт называется «Клиент Авто.ру» и четыре символа ID. Переименуйте контакт, когда узнаете имя: связка с чатом сохранится.

### Где хранятся данные
На сервере KO:AGENCY в Москве (Selectel). Подробно — в [политике конфиденциальности](/widgets/autoru/privacy).

### Что будет, если отключить виджет
Новые сообщения перестанут приходить. Сделки и примечания останутся в amoCRM. Данные на сервере KO удалятся через 30 дней; если включить виджет раньше, переписка вернётся.

## Как связаться

- Email: **hello@koagency.me**
- Telegram: [@koagency_bot](https://t.me/koagency_bot)
- Max: [чат поддержки](https://max.ru/id463300749910_bot)
- Телефон: +7 991 222-38-80

Чтобы мы ответили с первого раза, укажите адрес аккаунта amoCRM (например, \`company.amocrm.ru\`), что делали и что произошло, и приложите скриншот. Пароли и ChatId не присылайте — для проверки они не нужны.

Отвечаем в рабочие дни с 10:00 до 19:00 по Москве, первый ответ — в течение одного рабочего дня.

---

## Auto.ru chats — support (en)

**Requirements:** an Auto.ru **dealer** profile (cabinet.auto.ru; private sellers can’t connect chats), an amoCRM account with administrator rights.

**How to connect**
1. Install “Auto.ru chats” from amoMarket.
2. In the widget settings, enter a contact phone, choose the pipeline, stage and (optionally) the responsible user, then click “Save”.
3. Copy the **Webhook URL** and **ChatId** that appear in the settings.
4. In the Auto.ru dashboard, open **Settings → Chats → Connect chats → Add your own**, paste both values and save.
5. Ask someone to write to the chat of any of your listings. The status changes to “Connected” and a lead appears in amoCRM.

**How it works:** the first message creates a contact (Auto.ru nickname) and a lead with the “Auto.ru” source, the listing link and the message. Further messages from the same customer — even about another listing — go to their open lead. Reply from the Auto.ru panel on the lead page; replies stay in the history.

**Limitations:** Auto.ru doesn’t share the customer’s phone; replies sent from the Auto.ru dashboard don’t reach amoCRM; you can’t write first; calls and request forms aren’t supported; the panel keeps 90 days of history (notes stay in the lead).

**FAQ:** “Waiting for the first message” — check the Webhook URL in the Auto.ru dashboard and send a test message from another Auto.ru user. “Replies aren’t delivered” — the ChatId in Auto.ru doesn’t match the widget; copy it again. “Not sent” on a reply — click “Retry”, the customer won’t get it twice.

**Contacts:** hello@koagency.me · Telegram [@koagency_bot](https://t.me/koagency_bot) · Max [support chat](https://max.ru/id463300749910_bot) · +7 991 222-38-80. Business days, 10:00–19:00 Moscow time (UTC+3). Never send passwords or the ChatId.
`;

export const PRIVACY = `---
page: /widgets/autoru/privacy
lang: ru (en — в конце файла)
title: Политика конфиденциальности виджета «Чаты Авто.ру»
description: Какие данные обрабатывает виджет «Чаты Авто.ру» для amoCRM, где они хранятся, сколько и как их удалить.
status: черновик, не опубликовано; адрес страницы черновой
---

# Политика конфиденциальности виджета «Чаты Авто.ру»

Редакция от [дата публикации].

Эта политика описывает, как виджет «Чаты Авто.ру» для amoCRM (далее — виджет) работает с данными. Общая политика обработки персональных данных KO:AGENCY — на странице [koagency.me/legal/privacy](https://koagency.me/legal/privacy). Если они расходятся, для виджета действует этот документ.

## Коротко

- Виджет принимает сообщения из чатов Авто.ру на сервер KO:AGENCY, создаёт по ним сделки и контакты в вашем аккаунте amoCRM и отправляет ответы менеджеров обратно в чат Авто.ру.
- Сервер находится в России: Москва, дата-центр Selectel.
- Мы храним никнейм и ID клиента Авто.ру, тексты сообщений, ссылки на объявления и вложения. Телефона клиента Авто.ру не передаёт, и у нас его нет.
- Сырые входящие запросы храним 14 дней, переписку — 90 дней. Через 30 дней после отключения виджета удаляем все данные аккаунта с сервера.
- ChatId — ключ для отправки ответов — храним в зашифрованном виде.
- Телефон для связи, который администратор указывает при установке, через хаб KO:AGENCY попадает в CRM KO:AGENCY — чтобы связаться с вами по подписке и поддержке. Там он хранится [срок хранения телефона в CRM KO].
- Данные не продаём и не передаём третьим лицам, кроме Авто.ру (ответы клиентам) и amoCRM (ваш аккаунт).

## Кто разработчик

Индивидуальный предприниматель Кононенко Елена Витальевна (KO:AGENCY)
ИНН 463300749910, ОГРНИП 323460000034221
Адрес: Россия, Курская область, г. Железногорск, ул. Краснознамённая, д. 20
Email: hello@koagency.me
Телефон: +7 991 222-38-80

## Роли

Владелец аккаунта amoCRM (дилер) — оператор персональных данных своих клиентов. KO:AGENCY обрабатывает эти данные по его поручению и только для работы виджета: доставить сообщение в amoCRM, показать переписку в карточке сделки, отправить ответ в Авто.ру.

## Какие данные обрабатываем

| Данные | Откуда | Зачем | Где хранятся |
|---|---|---|---|
| Никнейм клиента Авто.ру и его ID в чате | вебхук Авто.ру | создать контакт и не плодить дубли, если клиент пишет снова или по другому объявлению | сервер KO; никнейм — также в контакте amoCRM |
| Тексты сообщений клиента и ответы менеджеров | вебхук Авто.ру; ответы — из панели виджета | показать переписку в карточке сделки, добавить примечание в сделку | сервер KO; копия — примечаниями в сделке amoCRM |
| Ссылки на вложения (фото, файлы) и их превью | вебхук Авто.ру | показать вложение в переписке | сервер KO хранит только ссылку; сами файлы остаются у Авто.ру |
| Ссылка на объявление, его заголовок и цена | вебхук Авто.ру | показать, по какому автомобилю пишет клиент | сервер KO; в сделке amoCRM |
| Имя пользователя amoCRM, который отправил ответ | интерфейс amoCRM | подписать ответ в переписке и показать клиенту имя отправителя в чате Авто.ру | сервер KO, Авто.ру |
| ChatId и адрес вебхука аккаунта | генерирует сервер KO при сохранении настроек | принимать сообщения и отправлять ответы | сервер KO, ChatId — зашифрован (AES-256-GCM) |
| Ключи доступа к API amoCRM (OAuth) | amoCRM при установке виджета | создавать сделки, контакты и примечания | сервер KO, зашифрованы |
| Настройки: воронка, этап, ответственный | вводит администратор | создавать сделки в нужном месте | сервер KO |
| ID и поддомен аккаунта amoCRM | amoCRM | отличать данные одного аккаунта от другого | сервер KO |
| Телефон для связи | вводит администратор при установке (обязательное поле) | связаться с вами по подписке и поддержке — см. «Телефон для связи» | сервер KO; через хаб KO:AGENCY — в CRM KO:AGENCY |
| IP-адрес и время запросов | технические журналы сервера | защита от злоупотреблений и разбор сбоев | сервер KO, 14 дней |

Виджет не получает телефон, email и настоящее имя клиента Авто.ру: Авто.ру их не передаёт. Мы не используем cookie, счётчики и рекламную аналитику.

## Где хранятся данные

Сервер \`autoru.koagency.me\` размещён в России, в Москве, в дата-центре Selectel. Соединения с amoCRM, Авто.ру и вашим браузером — только по HTTPS. Сделки, контакты и примечания хранятся в вашем аккаунте amoCRM по правилам amoCRM.

## Сколько храним

| Что | Срок |
|---|---|
| Сырые входящие запросы от Авто.ру (как пришли) | 14 дней |
| Переписка (сообщения и ответы) на сервере KO | 90 дней с даты сообщения |
| Технические журналы | 14 дней |
| Все данные аккаунта (настройки, ключи, связка клиентов с контактами, переписка) | удаляются через 30 дней после отключения виджета |
| Резервные копии | данные пропадают из них в течение 14 дней после удаления |
| Телефон для связи в CRM KO:AGENCY | [срок хранения телефона в CRM KO] |

Через 90 дней старые сообщения пропадают из панели виджета, но остаются в сделке amoCRM в виде примечаний — удалить их можете вы средствами amoCRM.

30 дней после отключения нужны, чтобы при повторном включении виджета переписка и связка клиентов с контактами вернулись без дублей.

## Телефон для связи

При установке виджет просит телефон для связи — без него виджет не включается. Он нужен, чтобы связаться с вами по подписке (оплата, продление) и поддержке: помочь с подключением и предупредить о важном — сбоях, изменениях API Авто.ру, обновлениях.

- **Что передаётся:** телефон, ID и поддомен аккаунта amoCRM, ID пользователя amoCRM, который сохранил настройки, и название виджета.
- **Куда:** на сервер виджета, оттуда через хаб KO:AGENCY — в CRM KO:AGENCY (amoCRM), где мы ведём клиентов. Хаб — служебный сервер KO:AGENCY, через который наши виджеты передают контакты в CRM.
- **Кто видит:** сотрудники KO Agency, которые ведут клиентов: телефон используется сотрудниками KO Agency для связи с вами по работе виджета. Третьим лицам телефон не передаём.
- **Сколько храним:** на сервере виджета — пока виджет установлен, через 30 дней после отключения запись удаляется. В CRM KO:AGENCY — [срок хранения телефона в CRM KO]. Удалить телефон раньше можно по запросу — см. «Как удалить данные».

Указывая телефон и сохраняя настройки, вы соглашаетесь на его обработку для этих целей.

## Кто видит данные

- Пользователи вашего аккаунта amoCRM — в пределах своих прав в amoCRM.
- Сотрудники KO:AGENCY — только чтобы решить вопрос поддержки или разобрать сбой, по вашему обращению. Телефон для связи в CRM KO:AGENCY используется сотрудниками KO Agency для связи с вами по работе виджета.
- Авто.ру получает ответы менеджеров и имя отправителя — так работает чат.

## Как удалить данные

- **Всё сразу:** отключите виджет — через 30 дней данные аккаунта удалятся автоматически. Чтобы удалить раньше, напишите на hello@koagency.me с указанием поддомена аккаунта amoCRM: удалим в течение 10 рабочих дней.
- **Переписку конкретного клиента:** напишите на hello@koagency.me, укажите ссылку на сделку — удалим её с сервера KO. Примечания в сделке удаляете вы в amoCRM.
- **Телефон для связи:** напишите на hello@koagency.me с поддоменом аккаунта — удалим его с сервера виджета и из CRM KO:AGENCY в течение 10 рабочих дней. Если виджет ещё установлен, укажите другой телефон в настройках: без телефона виджет не работает.
- Если ваш клиент просит удалить его данные, перешлите запрос нам — исполним в тот же срок.

## Ваши права

Вы можете узнать, какие данные вашего аккаунта у нас есть, попросить исправить или удалить их и отозвать согласие на обработку телефона для связи. Напишите на hello@koagency.me — ответим в течение 10 рабочих дней.

## Изменения политики

Мы обновляем политику, если меняется работа виджета с данными. Новая редакция действует с даты публикации на этой странице. Если виджет начнёт собирать данные сверх описанных, мы заранее сообщим об этом в описании обновления.

## Контакты

Email: hello@koagency.me
Телефон: +7 991 222-38-80
Telegram: [@koagency_bot](https://t.me/koagency_bot)
Max: [чат поддержки](https://max.ru/id463300749910_bot)

---

## Auto.ru chats widget — privacy policy (en)

Version of [publication date]. KO:AGENCY general policy: [koagency.me/legal/privacy](https://koagency.me/legal/privacy).

**Summary.** The widget receives Auto.ru chat messages on the KO:AGENCY server, creates leads and contacts in your amoCRM account and sends your managers’ replies back to the Auto.ru chat. The server is located in Moscow, Russia (Selectel data center).

**What we store:** the Auto.ru customer nickname and chat ID, message texts and replies, links to attachments and listings (title and price), the name of the amoCRM user who sent a reply, the account’s ChatId and webhook address (ChatId is encrypted with AES-256-GCM), amoCRM OAuth keys (encrypted), widget settings (pipeline, stage, responsible user), the account ID and subdomain, and the contact phone you enter during installation (also passed to the KO:AGENCY CRM, see below). Auto.ru does not share the customer’s phone, email or real name, so we don’t have them. No cookies or ad analytics.

**Retention:** raw incoming requests — 14 days; chat history on the KO server — 90 days; server logs — 14 days; all account data is deleted 30 days after the widget is disabled; backups are cleared within 14 days after deletion; the contact phone in the KO:AGENCY CRM — [phone retention period in KO CRM]. Notes created in amoCRM leads stay in your account until you delete them.

**Roles.** The amoCRM account owner (the dealer) is the controller of their customers’ data; KO:AGENCY processes it on their behalf only to run the widget. We don’t sell or share data with third parties except Auto.ru (replies to customers) and amoCRM (your account).

**Contact phone.** Required to enable the widget. It goes to the widget server and, through the KO:AGENCY hub (a KO:AGENCY service server our widgets use to pass contacts to the CRM), to the KO:AGENCY CRM (amoCRM), where it is used by KO Agency staff who look after clients to contact you about the widget: subscription (payment, renewal), connection help and important notices. Along with the phone we pass the amoCRM account ID and subdomain, the ID of the amoCRM user who saved the settings, and the widget name. On the widget server the phone is kept while the widget is installed and deleted 30 days after it is disabled; in the KO:AGENCY CRM it is kept [phone retention period in KO CRM]. To have it deleted earlier, email hello@koagency.me with your amoCRM subdomain.

**Deletion and requests:** disable the widget, or email hello@koagency.me with your amoCRM subdomain — we delete the data within 10 business days.

**Developer:** Sole proprietor Elena Kononenko (KO:AGENCY), INN 463300749910 · hello@koagency.me · +7 991 222-38-80.
`;
