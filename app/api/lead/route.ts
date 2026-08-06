import { NextResponse } from 'next/server';

/**
 * Приём лида с сайта → создание сделки/контакта в amoCRM через официальный API v4.
 * Используем долгосрочный JWT-токен интеграции "ko:agency site — lead form"
 * (клиент 9e0577fc-3d0c-4363-9e84-0291c5a1ffdb).
 *
 * Env:
 *   AMOCRM_SUBDOMAIN     — субдомен amoCRM (по умолчанию: koagency)
 *   AMOCRM_LONG_TOKEN    — долгосрочный JWT токен из "Ключи и доступы"
 *   AMOCRM_PIPELINE_ID   — ID воронки для новых сделок (опционально, по умолчанию — первая)
 *   AMOCRM_STATUS_ID     — ID статуса стадии (опционально, по умолчанию — первая)
 *   LEAD_BACKUP_WEBHOOK_URL — резервный webhook (опционально)
 */

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

async function amoApi(path: string, init: RequestInit = {}) {
  const token = process.env.AMOCRM_LONG_TOKEN;
  if (!token) throw new Error('AMOCRM_LONG_TOKEN not configured');

  const url = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4${path}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

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

  const customFields: Array<{ field_code: 'PHONE' | 'EMAIL'; values: Array<{ value: string; enum_code?: string }> }> = [];
  if (phone) {
    customFields.push({
      field_code: 'PHONE',
      values: [{ value: phone, enum_code: 'MOB' }],
    });
  }
  if (email) {
    customFields.push({
      field_code: 'EMAIL',
      values: [{ value: email, enum_code: 'WORK' }],
    });
  }

  // Одним запросом создаём сделку + контакт + компанию (leads/complex API)
  const leadBody: Record<string, unknown> = {
    name: `Заявка с сайта: ${name}`,
    _embedded: {
      contacts: [
        {
          first_name: name,
          custom_fields_values: customFields,
        },
      ],
    },
  };

  if (process.env.AMOCRM_PIPELINE_ID) {
    leadBody.pipeline_id = Number(process.env.AMOCRM_PIPELINE_ID);
  }
  if (process.env.AMOCRM_STATUS_ID) {
    leadBody.status_id = Number(process.env.AMOCRM_STATUS_ID);
  }

  const errors: string[] = [];
  let leadId: number | null = null;

  try {
    const res = await amoApi('/leads/complex', {
      method: 'POST',
      body: JSON.stringify([leadBody]),
    });

    if (!res.ok) {
      const text = await res.text();
      errors.push(`amoCRM ${res.status}: ${text.slice(0, 200)}`);
    } else {
      const data = (await res.json()) as Array<{ id: number }>;
      leadId = data[0]?.id ?? null;
    }
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'network error');
  }

  // Добавляем примечание к сделке
  if (leadId && noteText) {
    try {
      await amoApi(`/leads/${leadId}/notes`, {
        method: 'POST',
        body: JSON.stringify([
          {
            note_type: 'common',
            params: { text: noteText },
          },
        ]),
      });
    } catch {
      /* silent — примечание не критично */
    }
  }

  // Резервный webhook (например, для дублирования в Telegram-бот)
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
      {
        error: 'Не удалось передать лид в amoCRM. Напишите на service@koagency.me — мы получили копию.',
        detail: errors[0],
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
