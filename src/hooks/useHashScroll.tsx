// hooks/useHashScroll.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHashScroll(opts?: {
    attempts?: number;
    delay?: number;
    offset?: number; // px to subtract (header height)
}) {
    const { hash } = useLocation();
    const attempts = opts?.attempts ?? 5;
    const delay = opts?.delay ?? 100;
    const offset = opts?.offset ?? 0;

    useEffect(() => {
        if (!hash) return;
        const id = hash.replace("#", "");
        let tries = 0;

        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
                return;
            }
            if (tries < attempts) {
                tries++;
                setTimeout(tryScroll, delay);
            }
        };

        // small initial delay to allow mounting
        setTimeout(tryScroll, 50);
    }, [hash, attempts, delay, offset]);
}
