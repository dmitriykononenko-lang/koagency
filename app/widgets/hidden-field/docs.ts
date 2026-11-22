// Тексты страниц виджета «Скрытие полей by KO» из ветки widget/hidden-field (коммит 7f8a972, .flow/artifacts/pages).
// Убран адрес самой страницы, ссылки koagency.me/widgets/hidden-fields/* заменены на адреса сайта; en-раздел внизу, заголовки понижены.

export const SUPPORT = `# Поддержка: «Скрытие полей by KO»

## Как связаться

Пишите на **hello@koagency.me**. Поддержку виджета ведёт KO Agency, разработчик виджета. Вопросы по самому виджету не нужно отправлять в поддержку amoCRM.

## Когда ответим

В рабочие дни с 10:00 до 19:00 по Москве. Отвечаем в течение одного рабочего дня. Письма, пришедшие в выходные, разбираем в понедельник.

## Что прислать

Чтобы мы разобрались с первого письма, укажите:

1. Адрес аккаунта amoCRM, например \`company.amocrm.ru\`.
2. Что произошло и что вы ожидали увидеть.
3. Ссылку на карточку, где это видно, и название поля.
4. Какого сотрудника это касается и какой режим для него задан в матрице.
5. Браузер и его версию.
6. Снимок экрана: карточка у сотрудника и строка матрицы с этим полем.

Пароль от amoCRM не присылайте: он нам не нужен.

## Оплата и лицензионный ключ

Счёт запрашивайте кнопкой «Запросить счёт» во вкладке «Подписка» в настройках виджета или письмом на hello@koagency.me: адрес аккаунта, число пользователей и срок — 1, 6 или 10 месяцев. Цена и условия — в [инструкции](/widgets/hidden-field/instruction#подписка-и-оплата).

Если ключ не принимается, пришлите адрес аккаунта, ключ из письма и снимок вкладки «Подписка». Частые причины: ключ скопирован не целиком или выпущен для другого аккаунта.

## Перед тем как писать

- Проверьте, что после изменения правил нажата кнопка «Сохранить», а сотрудник обновил страницу.
- Проверьте, что сотрудник не администратор: администраторов виджет не ограничивает.
- Проверьте вкладку «Подписка»: если пробный период или оплаченный срок закончился, правила не применяются.
- Если поле видно в мобильном приложении, через API, в экспорте или ленте событий, это ожидаемо. Виджет скрывает данные только в веб-интерфейсе amoCRM и не заменяет права доступа. Подробнее — в [инструкции](/widgets/hidden-field/instruction#ограничения).

## Полезные ссылки

- [Инструкция](/widgets/hidden-field/instruction)
- [Политика конфиденциальности](/widgets/hidden-field/privacy)

---

## Support: Hidden Fields by KO

### How to reach us

Email **hello@koagency.me**. Support is provided by KO Agency, the widget developer. Please don't send questions about the widget to amoCRM support.

### When we reply

Business days, 10:00–19:00 Moscow time (UTC+3). We reply within one business day. Emails received on weekends are handled on Monday.

### What to include

To solve the issue from the first email, please include:

1. Your amoCRM account address, for example \`company.amocrm.com\`.
2. What happened and what you expected to see.
3. A link to the card where it happens and the field name.
4. Which user is affected and which mode is set for them in the matrix.
5. Your browser and its version.
6. Screenshots: the card as the user sees it, and the matrix row for that field.

Don't send your amoCRM password: we don't need it.

### Payment and license key

Request an invoice with the Request invoice button on the Subscription tab in the widget settings, or by email to hello@koagency.me: your account address, number of users and term — 1, 6 or 10 months. Price and terms are in the [guide](/widgets/hidden-field/instruction#subscription-and-payment).

If the key isn't accepted, send us your account address, the key from the email and a screenshot of the Subscription tab. Common causes: the key wasn't copied in full, or it was issued for another account.

### Before you write

- Make sure you clicked Save after changing the rules, and the user reloaded the page.
- Make sure the user isn't an admin: the widget never restricts admins.
- Check the Subscription tab: if the trial or the paid term has ended, the rules are not applied.
- If a field is visible in the mobile app, via the API, in exports or in the event feed, that's expected. The widget hides data only in the amoCRM web interface and does not replace access rights. See the [guide](/widgets/hidden-field/instruction#limitations).

### Useful links

- [Guide](/widgets/hidden-field/instruction)
- [Privacy policy](/widgets/hidden-field/privacy)
`;

export const INSTRUCTION = `# Инструкция: «Скрытие полей by KO»

версия виджета 1.2.1

Виджет прячет поля карточек сделки, контакта и компании от выбранных сотрудников и отделов. Правила задаются в одной матрице «поле × сотрудник» и хранятся в настройках виджета в вашем аккаунте amoCRM. Первые 14 дней бесплатно, далее 99 ₽ в месяц за пользователя — подробнее в разделе [«Подписка и оплата»](#подписка-и-оплата).

> **Ограничения.** Виджет скрывает данные только в веб-интерфейсе amoCRM и не заменяет права доступа. Данные остаются доступны через API, мобильное приложение, экспорт, ленту событий и сторонние виджеты (например, телефонию). При открытии карточки значение может мелькнуть на долю секунды, пока виджет не сработал. [Подробнее](#ограничения)

## Установка

Устанавливать и настраивать виджет может только администратор аккаунта.

1. Откройте amoМаркет и найдите «Скрытие полей by KO».
2. Нажмите «Установить».
3. Укажите номер в поле «Телефон для связи», например \`+7 999 123-45-67\`. Поле обязательное: без него amoCRM не активирует виджет.
4. Отметьте согласие с политикой конфиденциальности и сохраните.
5. Откройте настройки виджета: в карточке виджета в amoМаркете или в разделе «Настройки» → «Интеграции».

**Зачем телефон.** По этому номеру мы свяжемся с вами по подписке и оплате и предупредим о важных изменениях виджета. При сохранении виджет отправляет KO Agency телефон, имя администратора, идентификатор и поддомен аккаунта и версию виджета. Правила, поля и данные карточек остаются в amoCRM. Изменить номер можно в настройках виджета в любой момент. Подробнее — в [политике конфиденциальности](/widgets/hidden-field/privacy#какие-данные-передаются-ko-agency).

Сразу после установки виджет ничего не скрывает: все ячейки матрицы в режиме «Открыто». Пробный период 14 дней начинается, когда вы впервые сохраните правила.

## Матрица настроек

- **Строки** — поля. Они сгруппированы по сущностям: «Сделка», «Контакт», «Компания». В каждой группе сначала системные поля (бюджет, ответственный, теги, телефон, e-mail), затем дополнительные.
- **Столбцы** — сотрудники, сгруппированные по отделам amoCRM. Администраторов в матрице нет: их виджет не ограничивает.
- **Ячейка** — режим поля для сотрудника. Нажатие по ячейке переключает режимы по кругу: «Открыто» → «Скрыть» → «Звёздочки» → «Только чтение» → «Открыто».
- **Массово.** Режим можно применить ко всей строке (поле у всех сотрудников), ко всему столбцу (все поля у сотрудника) или к отделу целиком.
- **Поиск** по названию поля сужает список строк.

Изменения не применяются, пока вы не нажмёте «Сохранить». Если закрыть страницу с несохранёнными изменениями, виджет предупредит.

## Режимы

| Режим | Что видит сотрудник |
|---|---|
| Открыто | Поле как обычно. Режим по умолчанию. |
| Скрыть | Поля нет совсем, вместе с названием. |
| Звёздочки | Название поля и звёздочки вместо значения. Видно, заполнено ли поле. У телефона работает звонок по клику. |
| Только чтение | Значение видно, изменить его нельзя. Рядом с полем — значок замка. |

## Воронки

Для полей сделки над матрицей есть переключатель воронки.

- **Все воронки** — правило действует в сделках любой воронки.
- **Конкретная воронка** — правило действует только в сделках этой воронки.

Если для поля есть правило и на все воронки, и на конкретную, в сделках этой воронки действует правило конкретной воронки. Для контактов и компаний воронки не выбираются.

## Отделы

Правило можно задать для отдела целиком. Оно действует для всех сотрудников отдела, включая тех, кого добавят в отдел позже.

Если у сотрудника есть своё правило для поля, оно важнее правила его отдела. Так можно закрыть поле всему отделу и открыть его руководителю.

Порядок, если правил несколько:
1. Правило сотрудника важнее правила отдела.
2. Правило конкретной воронки важнее правила для всех воронок.

## Как снять ограничения

- **Одно поле у одного сотрудника** — поставьте в ячейке «Открыто» и сохраните.
- **Все поля у сотрудника** — примените «Открыто» к его столбцу и сохраните.
- **Поле у всех** — примените «Открыто» к строке поля и сохраните.
- **Сразу у всех** — отключите виджет в amoМаркете. Ограничения пропадут у всех сотрудников. Вместе с виджетом amoCRM удаляет его настройки, поэтому после повторной установки правила придётся задать заново.

Изменения действуют у сотрудника после обновления страницы.

## Подписка и оплата

### Цена

99 ₽ в месяц за пользователя amoCRM, минимум 5 пользователей (от 495 ₽ в месяц). При оплате 6 месяцев — 1 месяц в подарок, 10 месяцев — 3 месяца в подарок. Первые 14 дней с первого сохранения правил — бесплатно. Для клиентов, которые оплачивают лицензии amoCRM через KO Agency, виджет бесплатный на срок лицензии.

Считаем по числу активных пользователей аккаунта amoCRM. Если пользователей меньше 5, счёт выставляем за 5.

| Пользователей | 1 месяц | 6 месяцев + 1 в подарок | 10 месяцев + 3 в подарок |
|---|---|---|---|
| до 5 | 495 ₽ | 2 970 ₽ за 7 месяцев | 4 950 ₽ за 13 месяцев |
| 10 | 990 ₽ | 5 940 ₽ за 7 месяцев | 9 900 ₽ за 13 месяцев |
| 20 | 1 980 ₽ | 11 880 ₽ за 7 месяцев | 19 800 ₽ за 13 месяцев |

С подарочными месяцами пользователь обходится примерно в 85 ₽ в месяц при оплате на 6 месяцев и в 76 ₽ — на 10 месяцев. Точную сумму для вашего аккаунта показывает калькулятор во вкладке «Подписка».

### Пробный период

14 дней с момента, когда вы впервые сохранили правила. Всё работает без ограничений. За 7 дней до конца пробного периода на экране настроек появится жёлтое предупреждение. Его видит только администратор, сотрудникам виджет ничего не показывает.

### Как оплатить

1. В настройках виджета откройте вкладку «Подписка».
2. Выберите срок в калькуляторе: 1, 6 или 10 месяцев.
3. Нажмите «Запросить счёт». В вашей почтовой программе откроется письмо на hello@koagency.me. В нём уже указаны ID и поддомен аккаунта, число активных пользователей, число пользователей в счёте, срок и доступ в месяцах, сумма. Допишите реквизиты плательщика (название, ИНН), если счёт нужен на юрлицо, и отправьте письмо.
4. Мы пришлём счёт. После оплаты пришлём лицензионный ключ.

Если почтовая программа не открылась, напишите на hello@koagency.me сами: адрес аккаунта amoCRM, число пользователей и срок.

### Лицензионный ключ

1. Скопируйте ключ из письма целиком.
2. Вставьте его в поле «Лицензионный ключ» во вкладке «Подписка».
3. Нажмите «Применить ключ». Виджет проверит ключ и сам сохранит настройки. Появится сообщение «Ключ принят: оплачено до …», статус станет «Оплачено».

Ключ проверяется в браузере, без сервера KO. Ключ привязан к вашему аккаунту amoCRM и в другом аккаунте не работает. Сохраните письмо с ключом: если вы отключите и снова установите виджет, ключ нужно будет вставить заново.

Добавили пользователей — запросите счёт на доплату за новых пользователей до конца оплаченного срока. Пришлём новый ключ. Виджет продолжит работать, пока вы оформляете доплату.

### Продление

За 7 дней до конца оплаченного срока администратор увидит жёлтое предупреждение. Запросите счёт тем же способом. Новый ключ продлевает доступ с даты окончания текущего, поэтому оплатить можно заранее — дни не пропадут.

### Если подписка закончилась

Если пробный период или оплаченный срок закончился, а нового ключа нет:

- правила перестают действовать — сотрудники видят все поля;
- администратор видит на экране настроек красную плашку «Подписка закончилась — правила не применяются» и кнопку «Запросить счёт»;
- сохранённые правила не удаляются. После ввода ключа они снова заработают у сотрудников, когда те обновят страницу.

### Бесплатно для клиентов KO Agency

Если вы оплачиваете лицензии amoCRM через KO Agency, виджет для вас бесплатный на срок лицензии. Напишите на hello@koagency.me с адресом аккаунта — пришлём ключ до даты окончания лицензии amoCRM. Когда продлите лицензию через нас, пришлём новый ключ.

## Ограничения

Виджет скрывает данные только в веб-интерфейсе amoCRM и не заменяет права доступа. Данные остаются доступны через API, мобильное приложение, экспорт, ленту событий и сторонние виджеты (например, телефонию). При открытии карточки значение может мелькнуть на долю секунды, пока виджет не сработал.

Что это значит на практике:

- **API.** Интеграции и сервисы, подключённые по API, получают все поля без изменений.
- **Мобильное приложение amoCRM.** Виджет в нём не работает, сотрудник видит все поля.
- **Экспорт.** Если у сотрудника есть право на экспорт, в файле будут все поля. Отключите это право в настройках прав amoCRM.
- **Лента событий.** Изменения значений полей видны в ленте карточки.
- **Сторонние виджеты.** Телефония, мессенджеры и другие виджеты могут показывать номер или другие данные в своих окнах.
- **Кратковременный показ.** Пока страница загружается, значение может появиться на долю секунды.
- **Списки и канбан.** В версии 1.2.1 виджет работает только в карточках. В списках и на канбане поля видны.

Чтобы сотрудник не видел данные совсем, настройте права доступа в amoCRM: «Настройки» → «Пользователи» → права. Виджет дополняет права, когда нужно закрыть отдельные поля, а не сделки целиком.

## Вопросы и ответы

**Может ли сотрудник сам снять ограничения?**
Открыть и изменить настройки виджета может только администратор. Но скрытие работает в браузере сотрудника. Человек, который разбирается в инструментах разработчика браузера, может увидеть данные. Для строгого разграничения используйте права доступа amoCRM.

**Почему администратор видит все поля?**
Виджет не ограничивает администраторов, чтобы никто не потерял доступ к настройке и данным. Проверить, как карточку видит сотрудник, можно под его учётной записью.

**Я создал новое поле. Нужно ли что-то делать?**
Новое поле появится в матрице в режиме «Открыто». Задайте режим и сохраните.

**В отдел пришёл новый сотрудник. Какие у него правила?**
Правила его отдела. Своё правило можно задать в его столбце.

**Сотрудник перешёл в другой отдел.**
С обновлением страницы у него действуют правила нового отдела. Его личные правила сохраняются.

**Поле в режиме «Звёздочки», но на долю секунды видно значение.**
Так работает веб-интерфейс: сначала amoCRM показывает карточку, затем виджет закрывает значение. Если значение видно дольше секунды или не закрывается, напишите в поддержку.

**При сохранении появилась ошибка о размере настроек.**
Настройки виджета в amoCRM ограничены по объёму. Уберите лишние правила, например замените правила по отдельным сотрудникам одним правилом на отдел.

**Работает ли виджет в Kommo?**
Версия 1.2.1 — только для amoCRM.

**Куда уходят данные аккаунта?**
Правила, ключ, поля и данные карточек остаются в amoCRM: они хранятся в настройках виджета в вашем аккаунте. KO Agency получает только контакт для связи — телефон, имя администратора, идентификатор и поддомен аккаунта, версию виджета — и письмо, которое вы сами отправляете кнопкой «Запросить счёт». Подробнее — в [политике конфиденциальности](/widgets/hidden-field/privacy).

**Будет ли виджет работать, если сервер KO недоступен?**
Да. Сервер KO нужен только чтобы получить телефон для связи. Правила применяются и ключ проверяется в браузере без него.

**Обращается ли виджет к серверу KO, чтобы проверить ключ?**
Нет. Ключ подписан KO Agency, виджет проверяет подпись в браузере.

## Поддержка

hello@koagency.me. Что прислать в письме — на странице [поддержки](/widgets/hidden-field/support).

---

## Guide: Hidden Fields by KO

widget version 1.2.1

The widget hides lead, contact and company card fields from selected users and departments. Rules are set in one field × user matrix and stored in the widget settings inside your amoCRM account. The first 14 days are free, then RUB 99 per user per month — see [Subscription and payment](#subscription-and-payment).

> **Limitations.** The widget hides data only in the amoCRM web interface and does not replace access rights. Data remains available via the API, the mobile app, exports, the event feed and third-party widgets (such as telephony). When a card opens, a value may flash for a split second before the widget applies. [Learn more](#limitations)

### Installation

Only an account admin can install and set up the widget.

1. Open amoMarket and find Hidden Fields by KO.
2. Click Install.
3. Enter a number in the Contact phone field, for example \`+7 999 123-45-67\`. The field is required: amoCRM won't activate the widget without it.
4. Accept the privacy policy and save.
5. Open the widget settings: from the widget card in amoMarket or under Settings → Integrations.

**Why the phone.** We use this number to contact you about the subscription and payment and to warn you about important widget changes. When you save, the widget sends KO Agency the phone, the admin's name, the account ID and subdomain, and the widget version. Rules, fields and card data stay in amoCRM. You can change the number in the widget settings at any time. See the [privacy policy](/widgets/hidden-field/privacy#what-data-is-sent-to-ko-agency).

Right after installation the widget hides nothing: every matrix cell is set to Open. The 14-day trial starts when you first save the rules.

### Settings matrix

- **Rows** are fields, grouped by entity: Lead, Contact, Company. Each group lists system fields first (sale value, responsible user, tags, phone, email), then custom fields.
- **Columns** are users, grouped by amoCRM departments. Admins are not listed: the widget never restricts them.
- **A cell** is the field mode for a user. Clicking a cell cycles through the modes: Open → Hide → Mask → Read-only → Open.
- **Bulk actions.** Apply a mode to a whole row (one field for all users), a whole column (all fields for one user) or a whole department.
- **Search** by field name filters the rows.

Changes take effect only after you click Save. If you leave the page with unsaved changes, the widget warns you.

### Modes

| Mode | What the user sees |
|---|---|
| Open | The field as usual. Default mode. |
| Hide | No field at all, including its name. |
| Mask | The field name and asterisks instead of the value. The user can tell whether the field is filled. Click-to-call on phone numbers still works. |
| Read-only | The value is visible but can't be changed. A lock icon appears next to the field. |

### Pipelines

For lead fields, a pipeline switch sits above the matrix.

- **All pipelines** — the rule applies to leads in any pipeline.
- **A specific pipeline** — the rule applies only to leads in that pipeline.

If a field has both an all-pipelines rule and a specific-pipeline rule, leads in that pipeline follow the specific one. Contacts and companies have no pipeline choice.

### Departments

A rule can apply to a whole department. It covers every user in the department, including users added later.

A user's own rule for a field overrides the department rule. This way you can hide a field from a department and keep it open for its head.

If several rules apply:
1. A user rule overrides a department rule.
2. A specific-pipeline rule overrides an all-pipelines rule.

### Removing restrictions

- **One field for one user** — set the cell to Open and save.
- **All fields for a user** — apply Open to their column and save.
- **One field for everyone** — apply Open to the field row and save.
- **Everything at once** — disable the widget in amoMarket. Restrictions disappear for all users. amoCRM deletes the widget settings together with the widget, so after reinstalling you will need to set the rules again.

Changes reach a user after they reload the page.

### Subscription and payment

#### Price

RUB 99 per amoCRM user per month, minimum 5 users (from RUB 495 per month). Pay for 6 months and get 1 month free; pay for 10 months and get 3 months free. The first 14 days after you first save the rules are free. For clients who pay for their amoCRM licenses through KO Agency, the widget is free for the license term.

The price is based on the number of active users in your amoCRM account. If you have fewer than 5 users, the invoice is for 5.

| Users | 1 month | 6 months + 1 free | 10 months + 3 free |
|---|---|---|---|
| up to 5 | RUB 495 | RUB 2,970 for 7 months | RUB 4,950 for 13 months |
| 10 | RUB 990 | RUB 5,940 for 7 months | RUB 9,900 for 13 months |
| 20 | RUB 1,980 | RUB 11,880 for 7 months | RUB 19,800 for 13 months |

With the free months, one user costs about RUB 85 per month on a 6-month plan and RUB 76 on a 10-month plan. The calculator on the Subscription tab shows the exact amount for your account.

#### Trial

14 days from the moment you first save the rules, with no restrictions. 7 days before the trial ends, a yellow warning appears on the settings screen. Only admins see it; users see nothing from the widget.

#### How to pay

1. Open the Subscription tab in the widget settings.
2. Choose a term in the calculator: 1, 6 or 10 months.
3. Click Request invoice. An email to hello@koagency.me opens in your mail app, with your account ID and subdomain, the number of active users, the number of users on the invoice, the term and access period in months, and the total already filled in. Add the payer details (company name, tax ID) if you need an invoice for a legal entity, and send it.
4. We send you an invoice. After payment we send you a license key.

If your mail app doesn't open, email hello@koagency.me yourself with your amoCRM account address, number of users and term.

#### License key

1. Copy the whole key from the email.
2. Paste it into the License key field on the Subscription tab.
3. Click Apply key. The widget checks the key and saves the settings itself. You see the message "Key accepted: paid through …", and the status changes to Paid.

The key is checked in the browser, without a KO server. It is tied to your amoCRM account and doesn't work in another account. Keep the email with the key: if you disable and reinstall the widget, you will need to paste the key again.

Added users? Request an invoice for the extra users until the end of the paid term, and we'll send a new key. The widget keeps working while you arrange the extra payment.

#### Renewal

7 days before the paid term ends, admins see a yellow warning. Request an invoice the same way. A new key extends access from the end date of the current one, so you can pay in advance without losing days.

#### When the subscription ends

If the trial or the paid term has ended and there is no new key:

- the rules stop working — users see all fields;
- admins see a red banner on the settings screen, "Subscription ended — rules are not applied", and a Request invoice button;
- saved rules are not deleted. After you enter a key, they start working again for users once they reload the page.

#### Free for KO Agency clients

If you pay for your amoCRM licenses through KO Agency, the widget is free for the license term. Email hello@koagency.me with your account address, and we'll send a key valid until your amoCRM license ends. When you renew the license through us, we'll send a new key.

### Limitations

The widget hides data only in the amoCRM web interface and does not replace access rights. Data remains available via the API, the mobile app, exports, the event feed and third-party widgets (such as telephony). When a card opens, a value may flash for a split second before the widget applies.

In practice:

- **API.** Integrations and services connected via the API receive all fields unchanged.
- **amoCRM mobile app.** The widget doesn't run there; users see all fields.
- **Exports.** If a user has export rights, the file contains all fields. Turn off this right in amoCRM access rights.
- **Event feed.** Field value changes are visible in the card feed.
- **Third-party widgets.** Telephony, messengers and other widgets may show the phone number or other data in their own windows.
- **Brief flash.** While the page loads, a value may appear for a split second.
- **Lists and pipeline board.** Version 1.2.1 works only in cards. Fields remain visible in lists and on the board.

To keep a user from seeing data at all, set up amoCRM access rights: Settings → Users → rights. The widget complements access rights when you need to hide specific fields rather than whole leads.

### FAQ

**Can a user lift the restrictions themselves?**
Only an admin can open and change the widget settings. But hiding happens in the user's browser. Someone familiar with browser developer tools can still see the data. For strict separation, use amoCRM access rights.

**Why does the admin see all fields?**
The widget never restricts admins, so nobody loses access to the settings and data. To check how a user sees a card, log in with their account.

**I created a new field. Do I need to do anything?**
The new field appears in the matrix set to Open. Choose a mode and save.

**A new user joined a department. Which rules apply?**
The department's rules. You can set personal rules in their column.

**A user moved to another department.**
After a page reload, the new department's rules apply. Their personal rules stay.

**A field is set to Mask, but the value flashes for a split second.**
That's how the web interface works: amoCRM renders the card first, then the widget masks the value. If the value stays visible for more than a second or isn't masked at all, contact support.

**Saving fails with a settings size error.**
amoCRM limits the size of widget settings. Remove extra rules, for example replace per-user rules with one department rule.

**Does the widget work in Kommo?**
Version 1.2.1 is for amoCRM only.

**Where does account data go?**
Rules, the key, fields and card data stay in amoCRM: they are stored in the widget settings inside your account. KO Agency receives only the contact — the phone, the admin's name, the account ID and subdomain, the widget version — and the email you send yourself with the Request invoice button. See the [privacy policy](/widgets/hidden-field/privacy).

**Does the widget work if the KO server is down?**
Yes. The KO server is only needed to receive the contact phone. Rules apply and the key is checked in the browser without it.

**Does the widget contact a KO server to check the key?**
No. The key is signed by KO Agency, and the widget checks the signature in the browser.

### Support

hello@koagency.me. What to include in your email — see the [support page](/widgets/hidden-field/support).
`;

export const PRIVACY = `# Политика конфиденциальности виджета «Скрытие полей by KO»

редакция от 22.11.2026 · версия виджета 1.2.1

Политика описывает, какие данные использует виджет «Скрытие полей by KO» для amoCRM и где они хранятся. Разработчик виджета — KO Agency (koagency.me).

## Коротко

- Данные карточек, значения полей и правила скрытия не покидают amoCRM. Лицензионный ключ проверяется в браузере.
- Правила скрытия, лицензионный ключ и дата начала пробного периода хранятся в настройках виджета в вашем аккаунте amoCRM.
- При установке администратор указывает телефон для связи. При сохранении настроек виджет отправляет KO Agency контакт для связи: телефон, имя и идентификатор администратора, идентификатор и поддомен аккаунта, версию виджета. Подробнее — в разделе [«Какие данные передаются KO Agency»](#какие-данные-передаются-ko-agency).
- Ещё нам приходит письмо, которое администратор сам отправляет кнопкой «Запросить счёт».

## Что читает виджет

Чтобы показать матрицу настроек, виджет в браузере администратора запрашивает у amoCRM:

- список полей сделок, контактов и компаний: идентификаторы, названия, типы;
- список пользователей: идентификаторы, имена, отдел, признак администратора;
- список отделов: идентификаторы и названия;
- список воронок: идентификаторы и названия.

Чтобы применить правила, виджет в браузере каждого сотрудника определяет:

- идентификатор текущего пользователя и признак администратора;
- какая карточка открыта: сделка, контакт или компания, и в какой воронке сделка.

Чтобы показать вкладку «Подписка» и проверить ключ, виджет в браузере администратора и сотрудников определяет:

- идентификатор и поддомен аккаунта amoCRM — чтобы сверить идентификатор с ключом и указать аккаунт в письме с запросом счёта;
- число активных пользователей — для калькулятора цены и письма с запросом счёта (только на экране администратора).

Чтобы отправить контакт для связи, виджет в браузере администратора запрашивает у amoCRM имя этого администратора.

Чтобы узнать воронку, виджет запрашивает у amoCRM данные открытой сделки. amoCRM возвращает сделку целиком, но виджет берёт из ответа только идентификатор воронки. Ответ остаётся в браузере и никуда не передаётся.

Значения полей в открытой карточке виджет обрабатывает только на странице в браузере: скрывает их, заменяет звёздочками или запрещает изменение. Значения полей никуда не копируются и не отправляются.

## Где хранятся данные

Правила хранятся в настройках виджета в вашем аккаунте amoCRM. В правилах только идентификаторы полей, пользователей, отделов и воронок и выбранный режим. Значений полей, имён и контактов клиентов в них нет.

В тех же настройках хранятся:

- **лицензионный ключ.** В нём идентификатор аккаунта amoCRM, дата, до которой оплачено, число пользователей, тип (оплата или бонус для клиентов KO Agency) и подпись KO Agency. Имён, телефонов, e-mail и других персональных данных в ключе нет;
- **дата начала пробного периода** — день, когда правила впервые сохранили;
- **телефон для связи**, который администратор указал при установке.

Изменять настройки виджета может только администратор аккаунта. Чтобы правила работали у сотрудника, amoCRM загружает настройки виджета в его браузер. Ключ проверяется там же, в браузере, по подписи: виджет не обращается за проверкой к серверу KO.

Метаданные (поля, пользователи, отделы, воронки) виджет не сохраняет: он запрашивает их у amoCRM при каждом открытии настроек.

## Какие данные передаются KO Agency

В настройках виджета есть обязательное поле «Телефон для связи». Без него amoCRM не активирует виджет.

**Что передаётся.** Когда администратор сохраняет настройки, виджет из его браузера отправляет на сервер KO Agency (\`dubli.koagency.ru\`):

- телефон из поля «Телефон для связи»;
- имя администратора, который сохранил настройки, и его идентификатор в amoCRM;
- идентификатор и поддомен аккаунта amoCRM;
- версию виджета.

Запрос подписывает amoCRM. Идентификаторы аккаунта и администратора сервер берёт из этой подписи, чтобы контакт нельзя было отправить от имени чужого аккаунта.

**Что не передаётся.** Правила скрытия, лицензионный ключ, данные карточек, значения полей, списки полей, пользователей, отделов и воронок. Они по-прежнему остаются только в amoCRM.

**Зачем.** Чтобы связаться с администратором по подписке и оплате и предупредить о важных изменениях виджета. Мы сохраняем телефон и имя как контакт в CRM KO Agency и связываем его с компанией по идентификатору аккаунта. Третьим лицам эти данные не передаём.

**Основание.** Согласие администратора. Он даёт его, когда отмечает согласие с этой политикой при установке и сохраняет настройки с телефоном.

**Когда отправляется.** При каждом сохранении настроек с новым номером. Если отправка не удалась, виджет тихо повторит её, когда администратор снова откроет настройки. Если сервер KO недоступен, виджет работает как обычно: правила применяются, сотрудники ничего не замечают.

**Сколько храним.** Запись о подключении на сервере KO храним, пока виджет установлен, и удаляем через 30 дней после отключения (об отключении сервер KO узнаёт от amoCRM). Контакт с телефоном в CRM KO Agency храним, пока вы не отзовёте согласие или не попросите удалить номер. По запросу на hello@koagency.me удаляем телефон за 10 рабочих дней.

Изменить телефон можно в настройках виджета: новый номер придёт нам при сохранении.

## Что виджет не делает

- Не передаёт на серверы KO Agency и третьим лицам данные карточек, значения полей, правила и ключ. На сервер KO уходит только контакт для связи из раздела [«Какие данные передаются KO Agency»](#какие-данные-передаются-ko-agency).
- Не подключает счётчики и сервисы аналитики.
- Не ставит собственных cookie.
- Не хранит данные клиентов в браузере. В памяти браузера администратора (localStorage) запоминаются только настройки вида экрана (какие группы полей свёрнуты и какой режим выбран последним) и отметка, что контакт для связи отправлен. Отметка — хэш номера, а не сам номер. Значений полей и персональных данных там нет.
- Не запрашивает пароль от amoCRM.

## Ограничения

Виджет скрывает данные только в веб-интерфейсе amoCRM и не заменяет права доступа. Данные остаются доступны через API, мобильное приложение, экспорт, ленту событий и сторонние виджеты (например, телефонию). При открытии карточки значение может мелькнуть на долю секунды, пока виджет не сработал.

Виджет не заменяет права доступа. Чтобы закрыть данные от сотрудника полностью, настройте права в amoCRM.

## Запрос счёта и лицензионный ключ

Кнопка «Запросить счёт» открывает письмо на hello@koagency.me в почтовой программе администратора. В письме заранее указаны: идентификатор аккаунта amoCRM и его поддомен, число активных пользователей, число пользователей в счёте, выбранный срок и срок доступа в месяцах, сумма, а также пустая строка для реквизитов плательщика (название, ИНН). Имён, телефонов, e-mail и других персональных данных виджет в письмо не подставляет. Письмо уходит, только если администратор сам нажмёт «Отправить», и только с теми данными, которые он оставит в письме.

Из письма мы используем адрес отправителя, данные аккаунта и реквизиты компании, чтобы выставить счёт и выпустить ключ. Мы храним счета, переписку по оплате и сведения о выданных ключах (идентификатор аккаунта, срок, число пользователей, тип). Это нужно для бухгалтерского учёта и чтобы повторно прислать ключ, если он потеряется.

## Удаление данных

При отключении виджета amoCRM удаляет его настройки вместе с правилами, ключом, датой начала пробного периода и телефоном. Копий правил у KO Agency нет.

Запись о подключении на сервере KO удаляется через 30 дней после отключения виджета. Телефон в CRM KO Agency при отключении не удаляется: мы храним его, пока вы не отзовёте согласие или не попросите удалить номер. Чтобы отозвать согласие или удалить номер, напишите на hello@koagency.me и укажите поддомен аккаунта. Удалим телефон за 10 рабочих дней и подтвердим ответом.

Переписку по оплате и сведения о выданных ключах удалим по запросу на hello@koagency.me, кроме счетов и документов, которые мы обязаны хранить по закону.

## Обращения в поддержку

Если вы пишете на hello@koagency.me, мы получаем только то, что вы сами прислали в письме, и используем это для ответа на ваш вопрос.

## Изменения политики

Если в новой версии виджета изменится состав данных или место хранения, мы обновим эту страницу до выпуска версии и изменим дату редакции.

## Контакты

KO Agency · hello@koagency.me · koagency.me

---

## Privacy policy: Hidden Fields by KO

effective 22 November 2026 · widget version 1.2.1

This policy explains what data the Hidden Fields by KO widget for amoCRM uses and where it is stored. The widget is developed by KO Agency (koagency.me).

### In short

- Card data, field values and hiding rules never leave amoCRM. The license key is checked in the browser.
- Hiding rules, the license key and the trial start date are stored in the widget settings inside your amoCRM account.
- When installing, an admin enters a contact phone. When the settings are saved, the widget sends KO Agency a contact: the phone, the admin's name and ID, the account ID and subdomain, and the widget version. See [What data is sent to KO Agency](#what-data-is-sent-to-ko-agency).
- We also receive the email that an admin sends themselves with the Request invoice button.

### What the widget reads

To show the settings matrix, the widget requests from amoCRM, in the admin's browser:

- the list of lead, contact and company fields: IDs, names, types;
- the list of users: IDs, names, department, admin flag;
- the list of departments: IDs and names;
- the list of pipelines: IDs and names.

To apply the rules, the widget determines, in each user's browser:

- the current user's ID and whether they are an admin;
- which card is open — lead, contact or company — and the lead's pipeline.

To show the Subscription tab and check the key, the widget determines, in the admin's and users' browsers:

- the amoCRM account ID and subdomain — to match the ID against the key and to name the account in the invoice request email;
- the number of active users — for the price calculator and the invoice request email (on the admin's screen only).

To send the contact, the widget requests the admin's name from amoCRM, in that admin's browser.

To find the pipeline, the widget requests the open lead from amoCRM. amoCRM returns the whole lead, but the widget takes only the pipeline ID from the response. The response stays in the browser and is not sent anywhere.

Field values in an open card are processed only on the page in the browser: the widget hides them, replaces them with asterisks or blocks editing. Field values are never copied or sent anywhere.

### Where data is stored

Rules are stored in the widget settings inside your amoCRM account. Rules contain only field, user, department and pipeline IDs and the selected mode. They contain no field values, client names or contact details.

The same settings also hold:

- **the license key.** It contains the amoCRM account ID, the paid-until date, the number of users, the type (paid, or a bonus for KO Agency clients) and KO Agency's signature. The key contains no names, phone numbers, emails or other personal data;
- **the trial start date** — the day the rules were first saved;
- **the contact phone** the admin entered at installation.

Only an account admin can change the widget settings. For the rules to work for a user, amoCRM loads the widget settings into that user's browser. The key is checked there too, in the browser, by its signature: the widget doesn't contact a KO server to check it.

The widget doesn't save metadata (fields, users, departments, pipelines): it requests it from amoCRM each time the settings are opened.

### What data is sent to KO Agency

The widget settings have a required Contact phone field. amoCRM doesn't activate the widget until it is filled in.

**What is sent.** When an admin saves the settings, the widget sends the following from their browser to the KO Agency server (\`dubli.koagency.ru\`):

- the phone from the Contact phone field;
- the name and amoCRM ID of the admin who saved the settings;
- the amoCRM account ID and subdomain;
- the widget version.

The request is signed by amoCRM. The server takes the account and admin IDs from that signature, so no one can send a contact on behalf of another account.

**What is not sent.** Hiding rules, the license key, card data, field values, and the lists of fields, users, departments and pipelines. They still stay in amoCRM only.

**Why.** To contact the admin about the subscription and payment and to warn about important widget changes. We save the phone and name as a contact in the KO Agency CRM and link it to the company by account ID. We don't share this data with third parties.

**Legal basis.** The admin's consent, given by accepting this policy at installation and saving the settings with the phone.

**When it is sent.** Each time the settings are saved with a new number. If sending fails, the widget quietly retries when an admin opens the settings again. If the KO server is unavailable, the widget works as usual: rules apply and users notice nothing.

**How long we keep it.** We keep the installation record on the KO server while the widget is installed and delete it 30 days after the widget is disabled (the KO server learns about disabling from amoCRM). We keep the contact with the phone in the KO Agency CRM until you withdraw your consent or ask us to delete the number. On request to hello@koagency.me we delete the phone within 10 business days.

You can change the phone in the widget settings: the new number reaches us when you save.

### What the widget doesn't do

- It doesn't send card data, field values, rules or the key to KO Agency servers or third parties. Only the contact described in [What data is sent to KO Agency](#what-data-is-sent-to-ko-agency) goes to the KO server.
- It doesn't use counters or analytics services.
- It doesn't set its own cookies.
- It doesn't store client data in the browser. The admin's browser storage (localStorage) keeps only screen view preferences (which field groups are collapsed and which mode was picked last) and a mark that the contact has been sent. The mark is a hash of the number, not the number itself. It holds no field values or personal data.
- It never asks for your amoCRM password.

### Limitations

The widget hides data only in the amoCRM web interface and does not replace access rights. Data remains available via the API, the mobile app, exports, the event feed and third-party widgets (such as telephony). When a card opens, a value may flash for a split second before the widget applies.

The widget doesn't replace access rights. To fully restrict a user's access to data, set up access rights in amoCRM.

### Invoice requests and the license key

The Request invoice button opens an email to hello@koagency.me in the admin's mail app. The email is prefilled with the amoCRM account ID and its subdomain, the number of active users, the number of users on the invoice, the chosen term and the access period in months, the total, and an empty line for the payer details (company name, tax ID). The widget does not add names, phone numbers, emails or other personal data to the email. It is sent only if the admin clicks Send, and only with the data they leave in it.

From that email we use the sender's address, the account details and the company details to issue an invoice and a license key. We keep invoices, payment correspondence and records of issued keys (account ID, term, number of users, type). We need them for accounting and to resend a key if it gets lost.

### Data deletion

When the widget is disabled, amoCRM deletes its settings together with the rules, the key, the trial start date and the phone. KO Agency keeps no copies of the rules.

The installation record on the KO server is deleted 30 days after the widget is disabled. The phone in the KO Agency CRM is not deleted when you disable the widget: we keep it until you withdraw your consent or ask us to delete the number. To withdraw consent or delete the number, write to hello@koagency.me and include your account subdomain. We delete the phone within 10 business days and confirm by reply.

We will delete payment correspondence and key records on request to hello@koagency.me, except invoices and documents we are required by law to keep.

### Support requests

If you write to hello@koagency.me, we receive only what you send in your email and use it to answer your question.

### Changes to this policy

If a new widget version changes what data is used or where it is stored, we will update this page before the release and change the effective date.

### Contact

KO Agency · hello@koagency.me · koagency.me
`;
