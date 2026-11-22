---
page: /widgets/task-templates/support
lang: ru (en — в конце файла)
title: Поддержка виджета «Шаблоны задач»
description: Как связаться с поддержкой виджета «Шаблоны задач» для amoCRM, сроки ответа и ответы на частые вопросы.
status: черновик, не опубликовано
---

# Поддержка виджета «Шаблоны задач»

## Как связаться

- Email: **hello@koagency.me**
- Telegram: [@koagency_bot](https://t.me/koagency_bot)
- Max: [чат поддержки](https://max.ru/id463300749910_bot)
- Телефон: +7 991 222-38-80

Чтобы мы ответили с первого раза, укажите в сообщении:
- адрес аккаунта amoCRM, например `company.amocrm.ru`;
- что делали и что произошло;
- скриншот окна с ошибкой, если она была.

Пароли и ключи доступа не присылайте: для проверки они не нужны.

## Сроки ответа

Отвечаем в рабочие дни с 10:00 до 19:00 по Москве. Первый ответ — в течение одного рабочего дня, обычно быстрее.
<!-- сроки ждут подтверждения Дмитрия, см. README -->

## Частые вопросы

### Кнопки виджета нет в карточке
Блок «Шаблоны задач» появляется в правой колонке карточки сделки, контакта или компании. Проверьте, что виджет установлен и включён в разделе «amoМаркет», и обновите страницу.

### Пишет «Шаблоны не настроены»
В аккаунте ещё нет шаблонов. Нажмите «Редактор шаблонов» в карточке или откройте настройки виджета и создайте первый шаблон.

### Пишет «Не удалось сохранить шаблоны»
Шаблоны хранятся в служебном списке аккаунта «Шаблоны задач (данные виджета)». Сохранить их не получится, если у пользователя нет прав на работу со списками в amoCRM. Что сделать:
- попросите администратора аккаунта создать первые шаблоны — в карточке или в настройках виджета;
- или выдайте пользователю права на списки в разделе «Настройки → Пользователи».

### Пишет «Не удалось создать задачу»
amoCRM не дал создать задачу с правами текущего пользователя. Частые причины: у пользователя нет прав ставить задачи другим сотрудникам или работать с этой карточкой, выбранный в шаблоне сотрудник отключён. Проверьте права пользователя и ответственного в шаблоне.

### Задача поставилась не тому сотруднику
Ответственный задаётся в шаблоне: текущий пользователь, ответственный за карточку или конкретный сотрудник. Если сотрудник из шаблона отключён в amoCRM, его нет в списке — выберите другого и сохраните шаблон.

### Срок не совпадает с ожидаемым
Срок считается от момента, когда вы ставите задачу, по времени вашего компьютера:
- «завтра» — ровно через 24 часа;
- «через 2 дня», «через неделю» — через 48 часов и 7 суток;
- «до конца дня» — сегодня в 23:59.

Если нужен конкретный день и час, включите в шаблоне «Выбор даты вручную»: дату и время укажете при постановке задачи.

### Где хранятся шаблоны, видит ли их разработчик
В вашем аккаунте amoCRM: в служебном списке «Шаблоны задач (данные виджета)» и резервно в настройках виджета. У виджета нет своего сервера, данные никуда не уходят. Подробнее — в [политике конфиденциальности](/widgets/task-templates/privacy).

### Можно ли удалить служебный список
Да, но вместе с ним пропадут шаблоны. Если виджет продолжит работать, он создаст новый пустой список при следующем сохранении шаблонов.

### Что будет с шаблонами, если отключить виджет
Они останутся в аккаунте. Включите виджет снова — шаблоны вернутся. Чтобы удалить их полностью, удалите служебный список в разделе «Списки».

### Сколько стоит
Тарифы — на [странице виджета](/widgets/task-templates#pricing) и в карточке виджета в amoМаркете. Есть бесплатный пробный период.

---

# Task Templates support (en)

**Contacts:** hello@koagency.me · Telegram [@koagency_bot](https://t.me/koagency_bot) · Max [support chat](https://max.ru/id463300749910_bot) · +7 991 222-38-80

Please include your amoCRM account address, what you did and what happened, and a screenshot of the error. Never send passwords or API keys.

**Response time:** business days, 10:00–19:00 Moscow time (UTC+3). First reply within one business day.

**FAQ**

- **No widget block on the record page.** Make sure the widget is installed and enabled in amoMarket, then reload the page. The block appears in the right column of lead, contact and company pages.
- **"Failed to save templates".** Templates are stored in the account service list «Шаблоны задач (данные виджета)». The user needs permission to work with lists. Ask an administrator to create the first templates, or grant list permissions in Settings → Users.
- **"Failed to create the task".** amoCRM rejected the task under the current user's permissions, or the user selected in the template is inactive.
- **Due time looks wrong.** It is counted from the moment you create the task, in your computer's time zone. "Tomorrow" means in 24 hours, "by the end of the day" means 23:59 today. For an exact date, turn on "Pick the date manually" in the template.
- **Where are templates stored?** In your amoCRM account only. The widget has no server. See the [privacy policy](/en/widgets/task-templates/privacy).
- **What happens if I disable the widget?** Templates stay in your account and come back when you enable it again. To remove them, delete the service list under Lists.
