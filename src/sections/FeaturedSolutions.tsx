// components/feature/FeaturedSolutions.tsx
import { useState, useMemo } from "react";
import { solutions } from "@/data/solutions/solutions.ts";
import OverlayCard, { type Item } from "@/components/feature/OverlayCard";
// import Features from "./solutions/Features";
import Features2 from "./solutions/Features2";
import FeaturesFlip from "./solutions/FeaturesFlip";
import FeaturesInfo from "./solutions/FeaturesInfo";

export default function FeaturedSolutions() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // derive the items the card expects
    const items: Item[] = useMemo(() => {
        return solutions.map((s) => ({
            id: s.id,
            img: s.coverImg || s.img,
            heading: s.heading,
            sub: s.subHeading,
            // prefer your featurePoints; else fall back to solnPoints headings; else empty
            details:
                s.featurePoints?.length
                    ? s.featurePoints
                    : s.solnPoints?.map((p) => p.solutionHeading) ?? [],
            link: `/solutions/${s.slug}`, // <-- route to the solution
        }));
    }, []);

    return (
        <section className="font-open-sans relative mx-auto my-24">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Our{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Solutions
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Scalable solutions to optimize decisions, reduce risk, and drive growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <a href={item.link}>
                            <OverlayCard
                                key={item.id}
                                item={item}
                                isHovered={hoveredId === item.id}
                                onHoverStart={() => setHoveredId(item.id)}
                                onHoverEnd={() => setHoveredId(null)}
                            />
                        </a>

                    ))}
                </div>

                {/* <Features /> */}
                <Features2 />
                <FeaturesFlip />
                <FeaturesInfo />
            </div>
        </section>
    );
}
