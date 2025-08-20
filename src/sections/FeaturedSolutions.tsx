import FeatureExpandableCard from "@/components/feature/FeatureExpandableCard";
import { useState } from "react";

const features = [
    {
        id: 1,
        title: "Data Suite",
        description:
            "Get access to verified emails, phone numbers, professional details and revenue intelligence of 250M+ profiles.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Verified contact details", "Revenue intelligence", "Global reach"],
    },
    {
        id: 2,
        title: "Personality Suite",
        description:
            "Gain visibility into buyer personality and tailor their engagement strategies.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Buyer insights", "Engagement strategies", "Predictive signals"],
    },
    {
        id: 3,
        title: "HR Suite",
        description:
            "Identify your ideal candidate by assessing their LinkedIn profiles or resumes.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Find the right candidate", "Conduct effective interviews", "Know personality traits"],
    },
    {
        id: 4,
        title: "Sales Suite",
        description:
            "Empower sales teams with data-backed insights to close deals faster.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Lead scoring", "Pipeline insights", "Win predictions"],
    },
    {
        id: 5,
        title: "Analytics Suite",
        description:
            "Visualize performance data and uncover actionable insights.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Dashboards", "Reports", "KPI tracking"],
    },
    {
        id: 6,
        title: "Marketing Suite",
        description:
            "Build personalized campaigns with precision targeting.",
        image: "/articlesFeatureImages/undraw_chat-with-ai_ir62.svg",
        details: ["Audience segmentation", "Campaign insights", "ROI analysis"],
    },
];

export default function FeaturesGrid() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="font-open-sans relative mx-auto my-24">

            <div className="font-open-sans mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">Solutions</span>
                </h1>
                <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                    Designed to deliver value. Plug in what you need, when you need it.
                </p>
            </div>

            <div className="mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((f, idx) => {
                    const isRightMost = (idx + 1) % 3 === 0;
                    return (
                        <FeatureExpandableCard
                            key={idx}
                            {...f}
                            isRightMost={isRightMost}
                            expanded={expandedId === f.id}
                            onExpand={() => setExpandedId(expandedId === f.id ? null : f.id)}
                            isSiblingExpanded={expandedId !== null && expandedId !== f.id}
                        />
                    );
                })}
            </div>
        </section>
    );
}
