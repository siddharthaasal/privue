// components/feature/FeaturedSolutions.tsx
import { useState } from "react";
import ExpandingCard, { type Item } from "@/components/feature/FeatureExpandableCard";

export default function FeaturedSolutions() {
    const items: Item[] = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
            heading: "Automated Risk Analysis",
            sub: "AI models that detect anomalies in real time",
            details: [
                "Identify outliers across millions of transactions",
                "Reduce fraud exposure with predictive scoring",
                "Stay compliant with evolving regulations",
            ],
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1634638022845-1ab614a94128?w=900&auto=format&fit=crop&q=60",
            heading: "Supply Chain Forecasting",
            sub: "Data-driven demand and inventory predictions",
            details: [
                "Anticipate disruptions with scenario modeling",
                "Optimize working capital with accurate forecasts",
                "Enhance supplier reliability and transparency",
            ],
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1511883040705-6011fad9edfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D",
            heading: "Portfolio Optimization",
            sub: "AI insights for smarter asset allocation",
            details: [
                "Balance risk and return with dynamic rebalancing",
                "Leverage alternative data for alpha generation",
                "Personalize strategies at scale",
            ],
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            heading: "Regulatory Intelligence",
            sub: "Automated monitoring and compliance alerts",
            details: [
                "Track regulatory changes across markets",
                "Flag risks before audits occur",
                "Streamline reporting and documentation",
            ],
        },
        {
            id: 5,
            img: "https://images.unsplash.com/photo-1726137569966-a7354383e2ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            heading: "Customer Insights",
            sub: "AI-driven segmentation and personalization",
            details: [
                "Predict churn with behavioral models",
                "Tailor recommendations in real time",
                "Boost engagement with targeted offers",
            ],
        },
        {
            id: 6,
            img: "https://images.unsplash.com/photo-1754887966362-952236591654?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzZ8fHxlbnwwfHx8fHw%3D",
            heading: "Cash Flow Intelligence",
            sub: "Visibility into liquidity and forecasting",
            details: [
                "Project inflows and outflows with confidence",
                "Spot shortfalls before they happen",
                "Optimize treasury operations with AI",
            ],
        },
    ];

    // chunk into rows of 3 so hover effects never affect other rows
    const chunk = <T,>(arr: T[], size: number) =>
        arr.reduce<T[][]>((acc, _, i) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size));
            return acc;
        }, []);

    const rows = chunk(items, 3);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="font-open-sans relative mx-auto my-24">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="font-open-sans mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Our{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Solutions
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Scalable solutions to optimize decisions, reduce risk, and drive
                        growth.
                    </p>
                </div>

                <div className="flex flex-col m-0 p-0 gap-4">
                    {rows.map((row, rIdx) => {
                        const isAnyHoveredInRow = row.some(i => i.id === hoveredIndex);

                        return (
                            <div
                                key={rIdx}
                                className="group/row grid grid-cols-1 m-0 p-0 gap-4 md:grid-cols-12"
                            >
                                {row.map((item, cIdx) => (
                                    <ExpandingCard
                                        key={item.id}
                                        item={item}
                                        isLastInRow={cIdx === 2}
                                        isHovered={hoveredIndex === item.id}
                                        isAnyHovered={isAnyHoveredInRow} // ← row-scoped
                                        onHoverStart={() => setHoveredIndex(item.id)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
