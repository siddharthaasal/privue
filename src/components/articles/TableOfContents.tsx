// TableOfContents.tsx (replace your current file)
import { useEffect, useState } from "react";

interface Heading { id: string; text: string; level: number; }

function slugify(s: string) {
    return s.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function TableOfContents({
    contentRef,
}: { contentRef: React.RefObject<HTMLElement>; }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Extract headings whenever content changes (initial + after MDX render)
    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;

        const extract = () => {
            const nodes = root.querySelectorAll<HTMLElement>("h2, h3");
            const list: Heading[] = [];
            nodes.forEach((el) => {
                const text = el.textContent?.trim() ?? "";
                if (!text) return;
                if (!el.id) el.id = slugify(text);
                list.push({ id: el.id, text, level: el.tagName === "H2" ? 1 : 2 });
            });
            setHeadings(list);
        };

        // initial + observe future changes (MDX mount, images load, etc.)
        extract();
        const mo = new MutationObserver(() => extract());
        mo.observe(root, { childList: true, subtree: true });
        return () => mo.disconnect();
    }, [contentRef]);

    // Scrollspy (observe only headings inside root)
    useEffect(() => {
        const root = contentRef.current;
        if (!root || headings.length === 0) return;

        const targets = headings
            .map(h => root.querySelector<HTMLElement>(`#${CSS.escape(h.id)}`))
            .filter(Boolean) as HTMLElement[];

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
        );

        targets.forEach(el => io.observe(el));
        return () => targets.forEach(el => io.unobserve(el));
    }, [contentRef, headings]);

    return (
        <aside className="w-64 sticky top-20 h-auto overflow-y-auto">
            <div>
                <div className="font-open-sans flex items-center gap-2 mb-4 text-[16px] p-0 text-[#171717] tracking-wide">
                    On this page
                </div>
                <ul className="font-open-sans text-sm space-y-1 list-outside">
                    {headings.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`block text-[13px] px-0 py-1 transition-colors ${activeId === item.id
                                    ? "font-normal text-privue-800"
                                    : "text-gray-700"
                                    }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
