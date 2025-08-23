import ExpandingCard from "@/components/feature/FeatureExpandableCard";
/**
 * ExpandingCards
 * Row‑scoped layout: each row is 12 cols → default 4 | 4 | 4.
 * On hover inside a row: hovered → 6, its siblings → 3 (other rows unchanged).
 * The last card of a row expands to the LEFT so it doesn't overflow.
 *
 * Details panel opens only for the hovered card (via group/card),
 * while the row shrinking is controlled by group/row.
 */
export default function FeaturedSolutions() {
    const items = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
            heading: "Automated Risk Analysis",
            sub: "AI models that detect anomalies in real time",
            details: [
                "Identify outliers across millions of transactions",
                "Reduce fraud exposure with predictive scoring",
                "Stay compliant with evolving regulations",
                "Stay compliant with evolving regulations",

            ]
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1634638022845-1ab614a94128?w=900&auto=format&fit=crop&q=60",
            heading: "Supply Chain Forecasting",
            sub: "Data-driven demand and inventory predictions",
            details: [
                "Anticipate disruptions with scenario modeling",
                "Optimize working capital with accurate forecasts",
                "Enhance supplier reliability and transparency"
            ]
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1653378972336-103e1ea62721?q=80&w=1600&auto=format&fit=crop",
            heading: "Portfolio Optimization",
            sub: "AI insights for smarter asset allocation",
            details: [
                "Balance risk and return with dynamic rebalancing",
                "Leverage alternative data for alpha generation",
                "Personalize strategies at scale"
            ]
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop",
            heading: "Regulatory Intelligence",
            sub: "Automated monitoring and compliance alerts",
            details: [
                "Track regulatory changes across markets",
                "Flag risks before audits occur",
                "Streamline reporting and documentation"
            ]
        },
        {
            id: 5,
            img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
            heading: "Customer Insights",
            sub: "AI-driven segmentation and personalization",
            details: [
                "Predict churn with behavioral models",
                "Tailor recommendations in real time",
                "Boost engagement with targeted offers"
            ]
        },
        {
            id: 6,
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
            heading: "Cash Flow Intelligence",
            sub: "Visibility into liquidity and forecasting",
            details: [
                "Project inflows and outflows with confidence",
                "Spot shortfalls before they happen",
                "Optimize treasury operations with AI"
            ]
        }
    ];


    // chunk into rows of 3 so hover effects never affect other rows
    const chunk = (arr: any, size: any) => arr.reduce((acc: any, _: any, i: any) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size));
        return acc;
    }, []);

    const rows = chunk(items, 3);

    return (
        <section className="font-open-sans relative mx-auto my-24">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="font-open-sans mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">Solutions</span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Scalable solutions to optimize decisions, reduce risk, and drive growth.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    {rows.map((row: any, rIdx: any) => (
                        <div key={rIdx} className="group/row grid grid-cols-1 gap-2 md:grid-cols-12">
                            {row.map((item: any, cIdx: any) => (
                                <ExpandingCard key={item.id} item={item} isLastInRow={cIdx === 2} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </section>


    )
}

