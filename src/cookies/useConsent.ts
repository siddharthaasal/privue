// src/cookies/useConsent.ts
import { useEffect, useState } from 'react';
import { type ConsentState, defaultConsent, loadConsent, saveConsent } from './consentManager';
import { loadGA } from './loaders/loadGA';
import { loadClarity } from './loaders/loadClarity';

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => {
    const saved = loadConsent();
    return saved ?? defaultConsent;
  });

  useEffect(() => {
    if (consent.analytics) {
      loadGA(import.meta.env.VITE_GA_ID);
      loadClarity(import.meta.env.VITE_CLARITY_ID);
    }
  }, []); // run once

  const updateConsent = (next: ConsentState) => {
    const wasEnabled = consent.analytics;
    saveConsent(next);
    setConsent(next);

    if (next.analytics) {
      loadGA(import.meta.env.VITE_GA_ID);
      loadClarity(import.meta.env.VITE_CLARITY_ID);
    } else if (wasEnabled) {
      // User revoked consent!
      // 1. Delete cookies
      const cookies = document.cookie.split(';');

      cookies.forEach((c) => {
        const cookieName = c.split('=')[0].trim();
        if (!cookieName) return;

        const domains = [
          '', // No domain attribute (defaults to current host)
          window.location.hostname,
          '.' + window.location.hostname,
        ];

        // Add parent domains
        const parts = window.location.hostname.split('.');
        // Only iterate parents if we have parts (e.g. not just "localhost")
        // But even for localhost, the above covers it.
        if (parts.length > 1) {
          let currentDomain = '';
          for (let i = parts.length - 1; i >= 0; i--) {
            currentDomain = (i === 0 ? '' : '.') + parts.slice(i).join('.');
            if (!domains.includes(currentDomain)) domains.push(currentDomain);
            if (!domains.includes('.' + currentDomain)) domains.push('.' + currentDomain);
          }
        }

        const paths = ['/', window.location.pathname];

        domains.forEach((d) => {
          paths.forEach((p) => {
            const domainStr = d ? `; domain=${d}` : '';
            const pathStr = p ? `; path=${p}` : '';
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${pathStr}${domainStr}`;
          });
        });
      });
      // 2. Reload to stop scripts
      return true;
    }
  };

  return { consent, updateConsent };
}
