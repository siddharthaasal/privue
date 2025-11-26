// src/cookies/PreferencesPanel.tsx
import { type ConsentState } from './consentManager';

interface PreferencesPanelProps {
  consent: ConsentState;
  onChange: (newConsent: ConsentState) => void;
  onSave?: () => void;
}

export default function PreferencesPanel({ consent, onChange, onSave }: PreferencesPanelProps) {
  const handleSave = () => {
    if (onSave) onSave();
  };

  return (
    <div className="m-auto flex w-full justify-center px-4">
      <div className="w-full max-w-md space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Cookie Preferences
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            Choose which cookies you allow. You can update these anytime.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Analytics */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Analytics</p>
              <p className="mt-1 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
                Helps improve the website via Google Analytics & Microsoft Clarity.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => onChange({ ...consent, analytics: e.target.checked })}
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-gray-900 py-2 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
