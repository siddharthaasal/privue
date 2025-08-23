import ExpandingCard from "@/components/feature/FeatureExpandableCard";
import Layout from "@/components/Layout";
/**
 * ExpandingCards
 * Row‑scoped layout: each row is 12 cols → default 4 | 4 | 4.
 * On hover inside a row: hovered → 6, its siblings → 3 (other rows unchanged).
 * The last card of a row expands to the LEFT so it doesn't overflow.
 *
 * Details panel opens only for the hovered card (via group/card),
 * while the row shrinking is controlled by group/row.
 */
export default function TestPage() {
    const items = [
        { id: 1, img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 1", sub: "Short subheading here", details: ["Point one about this card", "Another quick detail", "Yet another concise point"] },
        { id: 2, img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 2", sub: "Another subheading", details: ["Useful stat or highlight", "Secondary insight", "Callout worth noting"] },
        { id: 3, img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 3", sub: "Overlay text sample", details: ["Short bullet A", "Short bullet B", "Short bullet C"] },
        { id: 4, img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 4", sub: "Row 2 — item 1", details: ["Info A", "Info B", "Info C"] },
        { id: 5, img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 5", sub: "Row 2 — item 2", details: ["Detail 1", "Detail 2", "Detail 3"] },
        { id: 6, img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", heading: "Dummy Heading 6", sub: "Row 2 — item 3", details: ["Note 1", "Note 2", "Note 3"] }
    ];

    // chunk into rows of 3 so hover effects never affect other rows
    const chunk = (arr: any, size: any) => arr.reduce((acc: any, _: any, i: any) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size));
        return acc;
    }, []);

    const rows = chunk(items, 3);

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-4 py-10">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight">Expanding Cards (row‑scoped hover)</h1>
                <div className="flex flex-col gap-4">
                    {rows.map((row: any, rIdx: any) => (
                        <div key={rIdx} className="group/row grid grid-cols-1 gap-4 md:grid-cols-12">
                            {row.map((item: any, cIdx: any) => (
                                <ExpandingCard key={item.id} item={item} isLastInRow={cIdx === 2} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    )
}

