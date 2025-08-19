import { useEffect, useState } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({
    contentRef,
}: {
    contentRef: React.RefObject<HTMLElement>;
}) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Extract headings
    useEffect(() => {
        if (!contentRef.current) return;
        console.log(contentRef.current.querySelectorAll('h2[id]'))
        const nodes = contentRef.current.querySelectorAll('h2[id]');
        const extracted: Heading[] = Array.from(nodes).map((node) => ({
            id: node.id,
            text: node.textContent || '',
            level: node.tagName === 'H2' ? 1 : 2,
        }));
        setHeadings(extracted);
    }, [contentRef]);

    // Scrollspy logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: '0px 0px -70% 0px',
                threshold: 0.1,
            }
        );

        const elements = document.querySelectorAll('h2[id]');
        elements.forEach((el) => observer.observe(el));
        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

    return (
        <aside className="hidden md:block w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-background dark:bg-zinc-900 dark:border-zinc-800">
            <div className=''>
                <div className=" font-open-sans flex items-center gap-2 mb-4 text-[16px] p-0 text-[#171717] tracking-wide">
                    {/* <TbListSearch size={16} /> */}
                    On this page
                </div>
                <div className="">
                    <ul className="font-open-sans text-sm space-y-1 list-outside">
                        {headings.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block text-[13px] px-0 py-1  transition-colors ${activeId === item.id
                                        ? 'font-normal text-privue-800 border-privue-600'
                                        : 'text-gray-700 border-transparent'
                                        }`}
                                // style={{ paddingLeft: `${item.level * 12}px` }}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </aside>
    );
}
