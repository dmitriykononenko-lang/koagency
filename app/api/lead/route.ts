import { NextResponse } from 'next/server';

/**
 * Приём лида с сайта → создание сделки/контакта в amoCRM через API v4.
 *
 * Env:
 *   AMOCRM_SUBDOMAIN         — субдомен (по умолчанию: koagency)
 *   AMOCRM_CLIENT_ID         — client_id интеграции
 *   AMOCRM_CLIENT_SECRET     — client_secret интеграции
 *   AMOCRM_REFRESH_TOKEN     — refresh_token (обновляется раз в 3 месяца)
 *   AMOCRM_PIPELINE_ID       — ID воронки (опц.)
 *   AMOCRM_STATUS_ID         — ID статуса (опц.)
 *   LEAD_BACKUP_WEBHOOK_URL  — резервный webhook (опц., напр. Telegram-бот)
 */

const CLIENT_ID = process.env.AMOCRM_CLIENT_ID || '9e0577fc-3d0c-4363-9e84-0291c5a1ffdb';
const SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || 'koagency';
const REDIRECT_URI = 'https://koagency.me/api/amocrm/callback';

// Кэш access_token в памяти процесса (Vercel serverless — может пересоздаваться, но помогает при бёрсте)
let cachedAccessToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60_000) {
    return cachedAccessToken.value;
  }

  const secret = process.env.AMOCRM_CLIENT_SECRET;
  const refreshToken = process.env.AMOCRM_REFRESH_TOKEN;
  if (!secret) throw new Error('AMOCRM_CLIENT_SECRET not configured');
  if (!refreshToken) throw new Error('AMOCRM_REFRESH_TOKEN not configured');

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: secret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    redirect_uri: REDIRECT_URI,
  });

  const res = await fetch(`https://${SUBDOMAIN}.amocrm.ru/oauth2/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`refresh failed ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedAccessToken = {
    value: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return data.access_token;
}

async function amoApi(path: string, init: RequestInit = {}) {
  const token = await getAccessToken();
  return fetch(`https://${SUBDOMAIN}.amocrm.ru/api/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  note?: string;
  page?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const email = (body.email || '').trim();

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { error: 'Укажите имя и хотя бы один способ связи.' },
      { status: 400 },
    );
  }

  const noteText = [
    body.note ? `Задача: ${body.note}` : null,
    body.page ? `Страница: ${body.page}` : null,
    body.utm?.source ? `UTM source: ${body.utm.source}` : null,
    body.utm?.medium ? `UTM medium: ${body.utm.medium}` : null,
    body.utm?.campaign ? `UTM campaign: ${body.utm.campaign}` : null,
    `IP: ${req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'}`,
  ]
    .filter(Boolean)
    .join('\n');

  const customFields: Array<{
    field_code: 'PHONE' | 'EMAIL';
    values: Array<{ value: string; enum_code?: string }>;
  }> = [];
  if (phone) customFields.push({ field_code: 'PHONE', values: [{ value: phone, enum_code: 'MOB' }] });
  if (email) customFields.push({ field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] });

  const leadBody: Record<string, unknown> = {
    name: `Заявка с сайта: ${name}`,
    _embedded: {
      contacts: [{ first_name: name, custom_fields_values: customFields }],
    },
  };
  if (process.env.AMOCRM_PIPELINE_ID) leadBody.pipeline_id = Number(process.env.AMOCRM_PIPELINE_ID);
  if (process.env.AMOCRM_STATUS_ID) leadBody.status_id = Number(process.env.AMOCRM_STATUS_ID);

  const errors: string[] = [];
  let leadId: number | null = null;

  try {
    const res = await amoApi('/leads/complex', {
      method: 'POST',
      body: JSON.stringify([leadBody]),
    });

    if (!res.ok) {
      const text = await res.text();
      errors.push(`amoCRM ${res.status}: ${text.slice(0, 300)}`);
    } else {
      const data = (await res.json()) as Array<{ id: number }>;
      leadId = data[0]?.id ?? null;
    }
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'network error');
  }

  if (leadId && noteText) {
    try {
      await amoApi(`/leads/${leadId}/notes`, {
        method: 'POST',
        body: JSON.stringify([{ note_type: 'common', params: { text: noteText } }]),
      });
    } catch {
      /* silent */
    }
  }

  if (process.env.LEAD_BACKUP_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_BACKUP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, note: body.note, page: body.page, utm: body.utm, leadId }),
      });
    } catch {
      /* silent */
    }
  }

  if (errors.length && !leadId) {
    console.error('[lead] amoCRM failed:', errors);
    return NextResponse.json(
      { error: 'Не удалось передать лид. Напишите на service@koagency.me — мы получили копию.', detail: errors[0] },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
