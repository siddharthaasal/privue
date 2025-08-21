import { useState } from "react";
import FeatureCard from "@/components/feature/FeatureExpandableCard";

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

export default function FeatureGrid() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="font-open-sans mx-auto text-center py-12">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                    Featured <span className="text-privue-900">Solutions</span>
                </h1>
                <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2">
                    Insights, guides, and stories curated for you.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.id}
                        {...feature}
                        expanded={expanded}
                        setExpanded={setExpanded}
                    />
                ))}
            </div>
        </div>
    );
}
