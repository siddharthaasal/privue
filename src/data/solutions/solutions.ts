// src/data/solutions.ts


export type Problem = {
    problemHeading: string;
    problemDesc: string;
    icon: string;
};

export type Module = {
    title: string;
    description: string;
    imgSrc: string;
    link: string;
};

export type Capability = {
    desc: string;
    icon: string; // you can store a URL, icon name, or even import React components
};

export type SolutionPoints = {
    solutionHeading: string;
    solutionDescription: string;
}

export type Solution = {
    id: number;
    img: string;

    heading: string;
    subHeading: string;
    mainSolnDesc: string;
    solnPoints: SolutionPoints[];
    problems: Problem[];
    modules: Module[];
    coreCapabilities: Capability[];
    mainArticleSlug: string;
};

export const solutions: Solution[] = [
    {
        id: 1,
        img: "/solutions/demo-image.png",
        heading: "Distributor Performance Management",
        subHeading: "Reduce leakages. Improve collections. Safeguard growth.",
        mainSolnDesc:
            "Privue is a simple tool that helps you check if a distributor or dealer can pay you. credit to give each distributor.",
        solnPoints: [
            {
                solutionHeading: "Credit evaluation",
                solutionDescription: "Check if a distributor/dealer can pay and guide how much credit to extend."
            },
            {
                solutionHeading: "Ongoing monitoring",
                solutionDescription: "Reviews every six months and sends early warnings to prevent losses."
            },
            {
                solutionHeading: "Comprehensive insights",
                solutionDescription: "Assesses 300+ data points from public/private sources plus distributor documents for accurate creditworthiness."
            },
        ],
        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Insufficient information to evaluate distributors",
                problemDesc:
                    "Distributor limit and credit period decisions based on relationships and gut",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fixed Credit Limits",
                problemDesc:
                    "Cannot adapt to changing market conditions and distributor’s strength and reach",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Limited visibility into distributor financial health",
                problemDesc:
                    "Problems surface only when payments are missed",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fragmented data across sources",
                problemDesc:
                    "Manual work across excel, documents submitted by distributor creates errors and delays.",
            },
        ],
        modules: [
            {
                title: "Dealer Onboarding",
                description:
                    "Add dealers, upload documents and verify identity",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Data Acquisition",
                description:
                    "Obtain, data available publicly and from financials and GST",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Risk Assessment",
                description:
                    "Determine risk score of the dealer using advance models",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Credit Terms",
                description:
                    "Use the score to choose safe credit terms for every dealer",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Continuous Monitoring",
                description:
                    "PRIVUE rescores dealers twice a year and sends an alert if anything looks risky",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Go Live in 2 weeks",
                description:
                    "The tool can be integrated into your ERP system for a seamless experience",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
        ],
        coreCapabilities: [
            { desc: "Implement systematic, data driven distributor onboarding", icon: "/solutions/lock.svg" },
            { desc: "Regularly monitor behavioural and external data feeds", icon: "/solutions/token.svg" },
            { desc: "Dynamically recalibrate credit limits using predictive risk scores", icon: "/solutions/context-driven.svg" },
            { desc: "Integrate risk alerts into ERP or CRM workflows", icon: "/solutions/streamlined.svg" },
            // { desc: "Maintain audit trails for governance and compliance", icon: "/solutions/context-driven.svg" },
        ],
        mainArticleSlug: "optimising-distributor-credit-risk-management"
    },
];

