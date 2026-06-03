'use client';

import Script from 'next/script';

/**
 * Плавающий чат-виджет amoCRM (id 438343).
 * Использует next/script с стратегией afterInteractive — не блокирует первый paint.
 * Брендовая стилизация лаунчера — см. components/AmoChat.css (импортируется в globals.css).
 */
export function AmoChat() {
  return (
    <Script
      id="amo-social-button"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(a,m,o,c,r,M){a[M]={id:"438343",hash:"954a5dea20bbe5f172241fe669313b357d1db7bb6211e292cc954d46035b4d92",locale:"ru",inline:false,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=M+'_script';s.src='https://gso.amocrm.ru/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'amoSocialButton',0,0,'amo_social_button'));`,
      }}
    />
  );
}
