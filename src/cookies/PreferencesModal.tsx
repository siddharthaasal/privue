// src/cookies/PreferencesModal.tsx
import { toast } from 'sonner';
import PreferencesPanel from './PreferencesPanel';
import { useConsent } from './useConsent';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

export default function PreferencesModal({
  open,
  setOpen,
  onSave,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSave: () => void;
}) {
  const navigate = useNavigate();
  const { consent, updateConsent } = useConsent();
  const [localConsent, setLocalConsent] = useState(consent);

  useEffect(() => {
    if (open) {
      setLocalConsent(consent);
    }
  }, [open, consent]);

  const handleSave = () => {
    const requiresReload = updateConsent(localConsent);

    toast.success('Preferences Updated', {
      icon: <CircleCheck className="h-5 w-5 text-green-500" />,
    });

    setOpen(false);
    onSave();

    if (requiresReload) {
      // Full reload necessary — GA/Clarity must be fully unloaded
      window.location.href = '/';
    } else {
      // No reload needed — just normal navigation
      navigate('/');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <PreferencesPanel consent={localConsent} onChange={setLocalConsent} onSave={handleSave} />
      </div>
    </div>
  );
}
