
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalMeetingPopup() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "theme": "light", "cssVarsPerTheme": { "light": { "cal-brand": "#364fc7" }, "dark": { "cal-brand": "#364fc7" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])
    return <button data-cal-namespace="15min"
        data-cal-link="siddharth-aasal-test/15min"
        data-cal-config='{"layout":"month_view","theme":"light"}'
        className="text-privue-700 hover:text-privue-900 hover:underline cursor-pointer"
    >Schedule a meeting with our founders</button>;
};
