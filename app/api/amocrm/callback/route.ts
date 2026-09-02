import { NextResponse } from 'next/server';

/**
 * Одноразовый OAuth callback endpoint для интеграции amoCRM.
 * Принимает ?code=... от amoCRM, обменивает на access + refresh, показывает refresh_token
 * для копирования в Vercel env (AMOCRM_REFRESH_TOKEN).
 *
 * После настройки этот endpoint можно удалить — доступ должен быть закрыт после первого использования.
 */

const DEFAULT_CLIENT_ID = process.env.AMOCRM_CLIENT_ID || '5c60921a-601b-4dd7-8e57-e14de53cda10';
const REDIRECT_URI = 'https://koagency.me/api/amocrm/callback';
const SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || 'koagency';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  // Override client_id/secret via query params (one-time setup use only)
  const clientId = url.searchParams.get('client_id_override') || DEFAULT_CLIENT_ID;
  const clientSecret = url.searchParams.get('client_secret_override') || process.env.AMOCRM_CLIENT_SECRET;

  if (!code) {
    return htmlResponse(
      `<h1>OAuth callback</h1><p>Нет параметра <code>?code=...</code>. Начните авторизацию с
      <a href="https://www.amocrm.ru/oauth?client_id=${clientId}&state=setup&mode=post_message">этой ссылки</a>.</p>`,
    );
  }

  if (!clientSecret) {
    return htmlResponse(
      `<h1>Не настроен AMOCRM_CLIENT_SECRET</h1><p>Добавьте переменную окружения (или передайте <code>?client_secret_override=</code>) и передеплойте.</p>`,
      500,
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  });

  const res = await fetch(`https://${SUBDOMAIN}.amocrm.ru/oauth2/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
    hint?: string;
    title?: string;
    detail?: string;
  };

  if (!res.ok || !data.refresh_token) {
    return htmlResponse(
      `<h1>Ошибка обмена кода</h1>
      <p>HTTP ${res.status}</p>
      <pre style="white-space:pre-wrap">${escapeHtml(JSON.stringify(data, null, 2))}</pre>`,
      res.status || 500,
    );
  }

  return htmlResponse(`
    <h1>Готово ✓</h1>
    <p>Скопируйте <b>refresh_token</b> и вставьте его в Vercel Environment Variables как
    <code>AMOCRM_REFRESH_TOKEN</code>, затем сделайте Redeploy.</p>
    <h3>refresh_token (живёт 3 месяца, автопродление при каждом использовании)</h3>
    <textarea readonly onclick="this.select()" style="width:100%;height:150px;font-family:monospace">${escapeHtml(data.refresh_token)}</textarea>
    <h3>access_token (для проверки, живёт ${data.expires_in ? Math.round(data.expires_in / 3600) : '?'} ч)</h3>
    <textarea readonly onclick="this.select()" style="width:100%;height:150px;font-family:monospace">${escapeHtml(data.access_token || '')}</textarea>
    <p><b>Важно:</b> удалите этот endpoint после копирования.</p>
  `);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlResponse(body: string, status = 200) {
  return new NextResponse(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>amoCRM callback</title>
    <style>body{font-family:-apple-system,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.5;color:#101010}
    h1{color:#E60000}code{background:#f5f5f5;padding:2px 6px;border-radius:4px}
    textarea{margin:8px 0;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:12px}</style></head>
    <body>${body}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
