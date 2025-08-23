
/**
 * ExpandingCards
 * "4 | 4 | 4" per row by default (12-col grid).
 * On hover within a ROW: hovered -> 6, siblings in that row -> 3, other rows remain 4 | 4 | 4.
 * This prevents cross-row reshuffling (e.g., card 4 jumping up when card 5 is hovered).
 * The last card in each row expands to the LEFT (so it doesn't spill to a new line).
 */
export default function ExpandingCards() {
    const items = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 1",
            sub: "Short subheading here",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a arcu at neque aliquet pulvinar. Proin vitae eros at ipsum aliquam tempus.",
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 2",
            sub: "Another subheading",
            details:
                "Aliquam erat volutpat. Integer posuere, nisl sed tincidunt sagittis, sapien sem placerat magna, nec scelerisque velit velit a dui.",
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 3",
            sub: "Overlay text sample",
            details:
                "Ut sit amet mauris mattis, volutpat lorem non, sollicitudin risus. Suspendisse potenti. Cras vitae pretium velit.",
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 4",
            sub: "Row 2 — item 1",
            details:
                "Nam viverra, enim non pretium bibendum, nunc nibh iaculis ipsum, a cursus mauris eros id nisl.",
        },
        {
            id: 5,
            img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 5",
            sub: "Row 2 — item 2",
            details:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        },
        {
            id: 6,
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
            heading: "Dummy Heading 6",
            sub: "Row 2 — item 3",
            details:
                "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada.",
        },
    ];

    // chunk into rows of 3 so hover effects never affect other rows
    const chunk = (arr: any, size: any) => arr.reduce((acc: any, _: any, i: any) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size));
        return acc;
    }, []);

    const rows = chunk(items, 3);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-semibold tracking-tight">Expanding Cards (row‑scoped hover)</h1>

            <div className="flex flex-col gap-4">
                {rows.map((row: any, rIdx: any) => (
                    <div key={rIdx} className="group grid grid-cols-1 gap-4 md:grid-cols-12">
                        {row.map((item: any, cIdx: any) => (
                            <article
                                key={item.id}
                                className={[
                                    "relative overflow-hidden rounded-xl border border-black/10 bg-neutral-100",
                                    "h-64 md:h-80",
                                    // base layout: 4 | 4 | 4 per ROW
                                    "md:col-span-4",
                                    // when hovering *within this row*:
                                    //  - shrink everyone to 3
                                    //  - hovered grows to 6
                                    "md:[transition:all_.35s_ease] md:group-hover:col-span-3 md:hover:col-span-6",
                                    // if it's the LAST card in this row, expand to the LEFT so it won't overflow
                                    cIdx === 2 ? "md:hover:col-start-7" : "",
                                    // visuals
                                    "grayscale md:group-hover:grayscale hover:grayscale-0 shadow-sm hover:shadow-md",
                                ].join(" ")}
                            >
                                <img src={item.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <h3 className="text-base font-semibold text-white md:text-lg">{item.heading}</h3>
                                    <p className="text-sm text-white/80 md:text-[0.925rem]">{item.sub}</p>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 translate-y-6 opacity-0 md:group-hover:opacity-0 md:hover:opacity-100 md:hover:translate-y-0 p-4 pb-5 text-sm text-white [transition:all_.35s_ease]">
                                    <div className="mb-3 h-px w-12 bg-white/40" />
                                    <p className="max-w-prose leading-relaxed">{item.details}</p>
                                    <button className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-white">
                                        View details
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                            <path d="M13.5 4.5L21 12l-7.5 7.5m7.5-7.5H3" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ))}
            </div>

            <p className="mt-6 text-sm text-neutral-500">No cross-row jumps: rows are independent. Default 4 | 4 | 4 → hover 6 | 3 | 3 (row-scoped). Last item expands left.</p>
        </div>
    );
}
