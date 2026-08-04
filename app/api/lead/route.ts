import { NextResponse } from 'next/server';

/**
 * Приём лида с сайта → отправка в amoCRM через тот же endpoint,
 * который использует нативный виджет `forms.amocrm.ru/queue/add_answer`.
 *
 * Форма в amoCRM: id=1717818, hash=1b51e584023ce7a2b1a6bfa546abf7d3.
 * ФИО / телефон / email / примечание маппятся в стандартные поля формы.
 *
 * Дополнительно: отдельным webhook'ом дублируем в SUPPORT_EMAIL_WEBHOOK
 * (если задан), чтобы не терять лиды при недоступности amoCRM.
 */

const AMOCRM_FORM_ID = process.env.AMOCRM_FORM_ID || '1717818';
const AMOCRM_FORM_HASH =
  process.env.AMOCRM_FORM_HASH || '1b51e584023ce7a2b1a6bfa546abf7d3';
const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || 'koagency';

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  note?: string;
  page?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Валидация
  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const email = (body.email || '').trim();

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { error: 'name + phone or email are required' },
      { status: 400 },
    );
  }

  const note = [
    body.note ? `Задача: ${body.note}` : null,
    body.page ? `Страница: ${body.page}` : null,
    body.utm?.source ? `UTM source: ${body.utm.source}` : null,
    body.utm?.medium ? `UTM medium: ${body.utm.medium}` : null,
    body.utm?.campaign ? `UTM campaign: ${body.utm.campaign}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  // 1. Основной путь — amoCRM incoming form endpoint
  const amoErrors: string[] = [];
  try {
    const fd = new FormData();
    fd.append('form_id', AMOCRM_FORM_ID);
    fd.append('form_hash', AMOCRM_FORM_HASH);
    fd.append('meta[form_id]', AMOCRM_FORM_ID);
    fd.append('meta[form_hash]', AMOCRM_FORM_HASH);
    fd.append('meta[form_name]', 'Сайт koagency.me');
    fd.append('meta[form_page]', body.page || '/');
    fd.append('meta[ip]', req.headers.get('x-forwarded-for')?.split(',')[0] || '');
    fd.append('meta[referer]', req.headers.get('referer') || '');
    fd.append('meta[user_agent]', req.headers.get('user-agent') || '');

    fd.append('answers[NAME]', name);
    if (phone) fd.append('answers[PHONE]', phone);
    if (email) fd.append('answers[EMAIL]', email);
    if (note) fd.append('answers[NOTE]', note);

    if (body.utm?.source) fd.append('utm_source', body.utm.source);
    if (body.utm?.medium) fd.append('utm_medium', body.utm.medium);
    if (body.utm?.campaign) fd.append('utm_campaign', body.utm.campaign);

    const amoRes = await fetch(
      `https://forms.amocrm.ru/queue/add_answer?FORM_ID=${AMOCRM_FORM_ID}`,
      {
        method: 'POST',
        body: fd,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Referer: `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/`,
          Origin: `https://${AMOCRM_SUBDOMAIN}.amocrm.ru`,
        },
      },
    );

    if (!amoRes.ok) {
      amoErrors.push(`amoCRM ${amoRes.status}`);
    }
  } catch (e) {
    amoErrors.push(e instanceof Error ? e.message : 'amoCRM network error');
  }

  // 2. Резервный webhook (если задан)
  if (process.env.LEAD_BACKUP_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_BACKUP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, note, page: body.page, utm: body.utm }),
      });
    } catch {
      /* silent — backup лишь диагностика */
    }
  }

  // Если amoCRM не отдал 2xx и нет backup — сообщаем клиенту об ошибке
  if (amoErrors.length && !process.env.LEAD_BACKUP_WEBHOOK_URL) {
    return NextResponse.json(
      { error: 'Не удалось передать лид. Напишите на service@koagency.me.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
