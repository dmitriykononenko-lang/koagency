'use client';

import { useEffect } from 'react';
import { isFigmaWorker } from '../lib/utils/env';

export const AmoCRMWidget = () => {
  useEffect(() => {
    // STRICT SAFETY CHECKS
    if (isFigmaWorker()) return;
    
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Run in a timeout to not block initial render
    const timer = setTimeout(() => {
      try {
        const w = window as any;
        const d = document;

        // Verify DOM capabilities
        if (!d.body || !d.head || typeof d.createElement !== 'function') return;

        // Configure AmoCRM widget safely
        try {
          if (!w.amo_social_button) {
             w.amo_social_button = {
              id: "438343",
              hash: "954a5dea20bbe5f172241fe669313b357d1db7bb6211e292cc954d46035b4d92",
              locale: "ru",
              inline: false,
              setMeta: function(this: any, p: any) {
                try {
                  this.params = (this.params || []).concat([p]);
                } catch (e) {}
              }
            };
          }
        } catch (e) {}

        // Setup queue function safely
        try {
          if (!w.amoSocialButton) {
            w.amoSocialButton = function(...args: any[]) {
              try {
                (w.amoSocialButton.q = w.amoSocialButton.q || []).push(args);
              } catch (e) {}
            };
          }
        } catch (e) {}

        // Inject script if not already present
        try {
          const scriptId = 'amo_social_button_script';
          if (!d.getElementById(scriptId)) {
            const s = d.createElement('script');
            s.async = true;
            s.id = scriptId;
            s.src = 'https://gso.amocrm.ru/js/button.js';
            
            // Append to head is standard
            d.head.appendChild(s);
          }
        } catch (e) {}
      } catch (error) {
        // Global safety catch - do absolutely nothing
      }
    }, 2000); // Increased delay to ensure app is fully stable

    return () => clearTimeout(timer);
  }, []);

  return null;
};
