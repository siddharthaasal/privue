// npm install @calcom/embed-react

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
export default function CalMeetingInline() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'request-meeting' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: { light: { 'cal-brand': '#364fc7' }, dark: { 'cal-brand': '#364fc7' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);
  return (
    <Cal namespace="request-meeting"
      calLink="saurabh.verma/request-meeting"
      className="flex"
      style={{ width: '100%', overflow: 'clip' }}
      config={{ layout: 'month_view', theme: 'light' }}
    />
  );
}
