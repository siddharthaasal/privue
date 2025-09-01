// src/data/solutions.ts

export type Problem = {
    problemHeading: string;
    problemDesc: string;
    icon: string;
};

export type Module = {
    moduleName: string;
    moduleDesc: string;
    moduleImg: string;
};

export type Capability = {
    desc: string;
    icon: string; // you can store a URL, icon name, or even import React components
};

export type Solution = {
    id: number;
    img: string;
    heading: string;
    subHeading: string;
    mainSolnDesc: string;
    problems: Problem[];
    modules: Module[];
    coreCapabilities: Capability[];
};

export const solutions: Solution[] = [
    {
        id: 1,
        img: "/images/solutions/risk-analytics.jpg",
        heading: "Distributor Performance Management",
        subHeading: "Reduce leakages. Improve collections. Safeguard growth.",
        mainSolnDesc:
            "Privue is a simple tool that helps you check if a distributor or dealer can pay you. It tells your finance team how much credit to give each distributor. It checks on each distributor every six months. If a distributor starts to struggle, PRIVUE sends an early warning so you can change the credit terms and avoid loss. Privue evaluates each distributor across 300+ data points sourced from public and private repositories. Our credit risk engine integrates these insights with documents provided by the distributor, delivering a comprehensive and accurate assessment of their creditworthiness",
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
                moduleName: "Credit Risk Engine",
                moduleDesc:
                    "Problems surface only when payments are missed",
                moduleImg: "/images/modules/credit-risk-engine.png",
            },
            {
                moduleName: "Fraud Detection Suite",
                moduleDesc:
                    "Uses machine learning to detect and prevent fraudulent transactions across channels.",
                moduleImg: "/images/modules/fraud-detection.png",
            },
        ],
        coreCapabilities: [
            { desc: "Implement systematic, datadriven distributor onboarding", icon: "/solutions/lock.svg" },
            { desc: "Regularly monitor behavioural and external data feeds", icon: "/solutions/token.svg" },
            { desc: "Dynamically recalibrate credit limits using predictive risk scores", icon: "/solutions/context-driven.svg" },
            { desc: "Integrate risk alerts into ERP or CRM workflows", icon: "/solutions/streamlined.svg" },
            { desc: "Maintain audit trails for governance and compliance", icon: "/solutions/context-driven.svg" },
        ],
    },
];
