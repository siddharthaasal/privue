// src/cookies/consentManager.ts

export type ConsentState = {
  analytics: boolean;
};

const STORAGE_KEY = 'cookie_consent_privue';

export const defaultConsent: ConsentState = {
  analytics: false,
};

export function loadConsent(): ConsentState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
