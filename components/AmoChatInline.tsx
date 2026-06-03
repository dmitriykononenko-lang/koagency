'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

/**
 * Встраиваемый (inline) чат-виджет amoCRM. Рендерится в указанном контейнере,
 * без плавающего лаунчера. Используется в секциях контактов / на лендингах.
 */
export function AmoChatInline({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Резервируем место для виджета в DOM, чтобы при динамическом маунте amoCRM JS
    // нашёл точку привязки. Виджет инжектит свои стили в этот div.
    if (ref.current) ref.current.id = 'amo_social_button';
  }, []);

  return (
    <>
      <div ref={ref} className={`amo-inline-container relative ${className}`} />
      <Script
        id="amo-social-button-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(a,m,o,c,r,M){a[M]={id:"438343",hash:"954a5dea20bbe5f172241fe669313b357d1db7bb6211e292cc954d46035b4d92",locale:"ru",inline:true,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=M+'_script_inline';s.src='https://gso.amocrm.ru/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'amoSocialButton',0,0,'amo_social_button'));`,
        }}
      />
    </>
  );
}
