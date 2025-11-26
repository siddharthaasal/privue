// src/cookies/CookieBanner.tsx
import { useState } from 'react';
import { useConsent } from './useConsent';
import PreferencesModal from './PreferencesModal';

export default function CookieBanner() {
  const { consent, updateConsent } = useConsent();
  const [show, setShow] = useState(() => !localStorage.getItem('cookie_consent_privue'));
  const [modalOpen, setModalOpen] = useState(false);

  if (!show) return null;

  return (
    <>
      <section className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-all md:right-10 md:bottom-10 md:left-auto dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-base font-medium text-gray-800 dark:text-white">Cookie Notice</h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          We use cookies to ensure you get the best experience on our website.
          <a
            href="/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-500 hover:underline"
          >
            Our cookie policy
          </a>
          .
        </p>

        <div className="mt-4 flex flex-col justify-start gap-4 md:mt-3 md:flex-row md:items-center md:justify-between">
          {/* Manage Preferences */}
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs text-gray-800 underline hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
          >
            Manage preferences
          </button>

          {/* Buttons */}
          <div className="flex flex-col items-stretch justify-end gap-3 md:flex-row md:items-center">
            <button
              onClick={() => {
                updateConsent({ ...consent, analytics: false });
                setShow(false);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 md:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Reject all
            </button>

            <button
              onClick={() => {
                updateConsent({ ...consent, analytics: true });
                setShow(false);
              }}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-gray-700 md:w-auto dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Accept
            </button>
          </div>
        </div>
      </section>

      <PreferencesModal open={modalOpen} setOpen={setModalOpen} onSave={() => setShow(false)} />
    </>
  );
}
