// components/feature/FeaturedSolutions.tsx
// import { useState, useMemo } from "react";
// import { solutions } from "@/data/solutions/solutions.ts";
// import OverlayCard, { type Item } from "@/components/feature/OverlayCard";
// import Features from "./solutions/Features";
// import Features2 from "./solutions/Features2";
// import FeaturesFlip from "./solutions/FeaturesFlip";
// import FeaturesInfo from "./solutions/FeaturesInfo";
import FinalFeaturesGrid from './solutions/FinalFeaturesGrid';

export default function FeaturedSolutions() {
  // const [hoveredId, setHoveredId] = useState<number | null>(null);

  // derive the items the card expects
  // const items: Item[] = useMemo(() => {
  //     return solutions.map((s) => ({
  //         id: s.id,
  //         img: s.coverImg || s.img,
  //         heading: s.heading,
  //         sub: s.subHeading,
  //         // prefer your featurePoints; else fall back to solnPoints headings; else empty
  //         details:
  //             s.featurePoints?.length
  //                 ? s.featurePoints
  //                 : s.solnPoints?.map((p) => p.solutionHeading) ?? [],
  //         link: `/solutions/${s.slug}`,
  //     }));
  // }, []);

  return (
    <section className="font-open-sans relative mx-auto">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto py-12 text-center">
          <h1 className="mb-4 text-3xl font-semibold text-[#171717] md:text-4xl">
            Our{' '}
            <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Solutions
            </span>
          </h1>
          <p className="mt-2 mb-4 text-base text-[#525252] md:text-lg dark:text-gray-400">
            Scalable solutions to optimize decisions, reduce risk, and drive growth.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </div> */}

        {/* <Features /> */}
        {/* <Features2 />
                <FeaturesFlip />
                <FeaturesInfo /> */}
        <FinalFeaturesGrid />
      </div>
    </section>
  );
}
