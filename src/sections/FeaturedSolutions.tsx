// pages/FeaturesGrid.tsx
import { useState } from "react";
// import RGL, { WidthProvider, type Layout } from "react-grid-layout";
import RGL, { WidthProvider, type Layout, Responsive, type ResponsiveProps } from "react-grid-layout";


import FeatureExpandableCard from "@/components/feature/FeatureExpandableCard";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const features = [
    {
        id: "1",
        title: "Data Suite",
        description:
            "Get access to verified emails, phone numbers, professional details and revenue intelligence of 250M+ profiles.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Verified contact details", "Revenue intelligence", "Global reach"],
    },
    {
        id: "2",
        title: "Personality Suite",
        description:
            "Gain visibility into buyer personality and tailor their engagement strategies.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Buyer insights", "Engagement strategies", "Predictive signals"],
    },
    {
        id: "3",
        title: "HR Suite",
        description:
            "Identify your ideal candidate by assessing their LinkedIn profiles or resumes.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Find the right candidate", "Conduct effective interviews", "Know personality traits"],
    },
    {
        id: "4",
        title: "Sales Suite",
        description:
            "Empower sales teams with data-backed insights to close deals faster.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Lead scoring", "Pipeline insights", "Win predictions"],
    },
    {
        id: "5",
        title: "Analytics Suite",
        description:
            "Visualize performance data and uncover actionable insights.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Dashboards", "Reports", "KPI tracking"],
    },
    {
        id: "6",
        title: "Marketing Suite",
        description:
            "Build personalized campaigns with precision targeting.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Audience segmentation", "Campaign insights", "ROI analysis"],
    },
];

export default function FeaturesGrid() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // const GridLayout = WidthProvider(RGL);
    const ResponsiveGridLayout = WidthProvider(Responsive);

    // build dynamic layout
    const layout: Layout[] = features.map((f, idx) => {
        const x = idx % 3;
        const y = Math.floor(idx / 3);
        const expanded = expandedId === f.id;
        return {
            i: f.id,
            x,
            y,
            w: expanded ? 2 : 1, // expand width if active
            h: 1,
        };
    });

    return (
        <section className="font-open-sans relative mx-auto my-24">
            <div className="mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                    Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                        Solutions
                    </span>
                </h1>
                <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                    Designed to deliver value. Plug in what you need, when you need it.
                </p>
            </div>

            <ResponsiveGridLayout
                className="layout mt-24"
                layouts={{ lg: layout }}
                cols={{ lg: 3, md: 3, sm: 1 }}
                rowHeight={250}
                margin={[24, 24]}
                isResizable={false}
                isDraggable={false}
            >
                {features.map((f) => (
                    <div key={f.id}>
                        <FeatureExpandableCard
                            {...f}
                            expanded={expandedId === f.id}
                            onExpand={() => setExpandedId(expandedId === f.id ? null : f.id)}
                            isSiblingExpanded={expandedId !== null && expandedId !== f.id}
                        />
                    </div>
                ))}
            </ResponsiveGridLayout>
        </section>
    );
}
