'use client';

import { useEffect, useRef } from 'react';

/**
 * Встраиваемая форма amoCRM (id 1717818) с брендовой стилизацией.
 *
 * Виджет `amoforms.js` ищет на странице config `amo_forms_params` и вставляет
 * форму в место, где встроен инлайн-скрипт. Для совместимости с React Strict Mode
 * монтируем скрипт вручную в ref-контейнер один раз и пушим конфиг на window.
 */
export function AmoForm({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current || !ref.current) return;
    mounted.current = true;

    // 1. Подготавливаем глобальные хуки amoCRM forms API
    const w = window as any;
    const ns = 'amo_forms_';
    w[ns + 'params'] = w[ns + 'params'] || {
      setMeta: function (p: unknown) {
        (this as any).params = ((this as any).params || []).concat([p]);
      },
    };
    w[ns + 'load'] = w[ns + 'load'] || function (f: unknown) {
      (w[ns + 'load'] as any).f = ((w[ns + 'load'] as any).f || []).concat([f]);
    };
    w[ns + 'load']({
      id: '1717818',
      hash: '1b51e584023ce7a2b1a6bfa546abf7d3',
      locale: 'ru',
    });
    w[ns + 'loaded'] = w[ns + 'loaded'] || function (f: unknown, k: unknown) {
      (w[ns + 'loaded'] as any).f = ((w[ns + 'loaded'] as any).f || []).concat([[f, k]]);
    };

    // 2. Внутри контейнера ставим тэг-якорь для виджета (amoCRM вставит форму рядом)
    const anchorScript = document.createElement('script');
    anchorScript.id = 'amoforms_script_1717818';
    anchorScript.async = true;
    anchorScript.charset = 'utf-8';
    anchorScript.src = `https://forms.amocrm.ru/forms/assets/js/amoforms.js?${Date.now()}`;
    ref.current.appendChild(anchorScript);
  }, []);

  return (
    <div
      ref={ref}
      className={`amo-form-container w-full ${className}`}
      aria-label="Форма обратной связи"
    />
  );
}
