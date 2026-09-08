'use client';

import { useEffect, useState } from 'react';

const DEFAULT_CLIENT_ID = '5c60921a-601b-4dd7-8e57-e14de53cda10';

export default function SetupOAuthPage() {
  const [secret, setSecret] = useState('');
  const [clientId, setClientId] = useState(DEFAULT_CLIENT_ID);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const s = localStorage.getItem('__amoSecret') || '';
    const c = localStorage.getItem('__amoClientId') || DEFAULT_CLIENT_ID;
    if (s) setSaved(`${s.slice(0, 6)}…${s.slice(-4)} (${s.length} chars)`);
    setSecret(s);
    setClientId(c);
  }, []);

  const save = () => {
    localStorage.setItem('__amoSecret', secret.trim());
    localStorage.setItem('__amoClientId', clientId.trim());
    setSaved(`${secret.slice(0, 6)}…${secret.slice(-4)} (${secret.length} chars)`);
  };

  const startOAuth = () => {
    save();
    const url = `https://www.amocrm.ru/oauth?client_id=${encodeURIComponent(
      clientId.trim(),
    )}&state=setup&mode=post_message`;
    window.location.href = url;
  };

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: '0 20px', fontFamily: '-apple-system, sans-serif', color: '#101010', lineHeight: 1.5 }}>
      <h1 style={{ color: '#E60000' }}>amoCRM OAuth setup</h1>
      <p>Одноразовая утилита для получения <code>refresh_token</code> приватной интеграции amoCRM.</p>

      <label style={{ display: 'block', marginTop: 20, fontWeight: 600 }}>Client ID</label>
      <input
        type="text"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontFamily: 'monospace', fontSize: 13 }}
      />

      <label style={{ display: 'block', marginTop: 16, fontWeight: 600 }}>Client Secret (64 символа)</label>
      <input
        type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Вставьте новый секрет из amoМаркета → Ключи и доступы"
        style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontFamily: 'monospace', fontSize: 13 }}
      />

      {saved && (
        <p style={{ color: '#008000', marginTop: 8, fontSize: 13 }}>
          ✓ Сохранено в localStorage: <code>{saved}</code>
        </p>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <button
          onClick={save}
          style={{ padding: '10px 20px', border: '1px solid #101010', borderRadius: 6, background: 'white', cursor: 'pointer' }}
        >
          Сохранить
        </button>
        <button
          onClick={startOAuth}
          disabled={!secret.trim()}
          style={{ padding: '10px 20px', border: 'none', borderRadius: 6, background: '#E60000', color: 'white', cursor: 'pointer', opacity: secret.trim() ? 1 : 0.5 }}
        >
          Сохранить + запустить OAuth →
        </button>
      </div>

      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <h3>Как это работает</h3>
      <ol style={{ fontSize: 14, color: '#666' }}>
        <li>Вставьте client_secret из amoМаркета (интеграция «ko:agency site v2 (private)» → Ключи и доступы → Сгенерировать ключ).</li>
        <li>Нажмите «Сохранить + запустить OAuth».</li>
        <li>amoCRM перекинет на страницу авторизации → выберите ko:agency → «РАЗРЕШИТЬ».</li>
        <li>amoCRM редиректит на <code>/api/amocrm/callback?code=...</code> — эта страница сама прочитает secret из localStorage и обменяет код.</li>
        <li>Появится <code>refresh_token</code> — скопируем в Vercel env как AMOCRM_REFRESH_TOKEN.</li>
      </ol>
    </main>
  );
}
