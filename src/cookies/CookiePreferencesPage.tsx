import PreferencesPanel from '../cookies/PreferencesPanel';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';
import { useConsent } from '../cookies/useConsent';
import { useState } from 'react';

export default function CookiePreferencesPage() {
  const navigate = useNavigate();
  const { consent, updateConsent } = useConsent();
  const [localConsent, setLocalConsent] = useState(consent);

  const handleSave = () => {
    const requiresReload = updateConsent(localConsent);

    toast.success('Preferences Updated', {
      icon: <CircleCheck className="h-5 w-5 text-green-500" />,
    });

    if (requiresReload) {
      window.location.href = '/'; // reload + redirect
      return;
    }

    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <PreferencesPanel consent={localConsent} onChange={setLocalConsent} onSave={handleSave} />
      </div>
    </div>
  );
}
