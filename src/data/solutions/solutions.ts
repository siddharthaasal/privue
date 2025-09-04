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
    heading?: string;
    desc: string;
    icon: string;
};

export type UseCase = {
    heading: string;
    desc: string;
    icon: string;
};

export type SolutionPoints = {
    solutionHeading: string;
    solutionDescription: string;
}

export type Solution = {
    id: number;
    slug: string;
    img: string;
    coverImg: string;
    heading: string;
    subHeading: string;
    featurePoints: string[];
    mainSolnDesc: string;
    solnPoints: SolutionPoints[];
    problems: Problem[];
    modules: Module[];
    coreCapabilities?: Capability[];
    useCases?: UseCase[];
    mainArticleSlug: string;
};

export const solutions: Solution[] = [
    {
        id: 1,
        slug: "distributor-performance-management",
        img: "/solutions/demo-image.png",
        coverImg: "/solutions/demo-image.png",
        heading: "Distributor Performance Management",
        subHeading: "Reduce leakages. Improve collections. Safeguard growth.",
        featurePoints: [
            "hi",
            "hi",
            "hi",
        ],
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
    {
        id: 2,
        slug: "sustainability-assessment",
        img: "/solutions/demo-image.png",
        coverImg: "/solutions/demo-image.png",
        heading: "Sustainability Assessment",
        subHeading: "Climate Risk. Emissions Estimation. ESG Score.",
        featurePoints: [
            "Climate Risk",
            "Climate Risk",
            "Climate Risk",
        ],
        mainSolnDesc:
            "Privue empowers companies to assess vendors, partners, and borrowers through intelligent, data-backed sustainability evaluations with the same rigor as financial risk assessments.",
        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Over-Reliance on Self-Reported Information",
                problemDesc:
                    "Assessments today are heavily dependent on inputs provided by vendors or borrowers, which may be incomplete, inconsistent, or biased.",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fragmented ESG Signals",
                problemDesc:
                    "Critical information lies scattered across regulatory filings, disclosures, websites, and news reports—difficult to aggregate and interpret at scale.",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Lack of Standardised Assessment Framework",
                problemDesc:
                    "Without a consistent methodology, sustainability evaluations vary across counterparties and geographies, reducing comparability.",
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Blind Spots in Scope 3 Emissions",
                problemDesc:
                    "Companies often underestimate emissions embedded in their supply chains or financed portfolios, leaving material risks unaccounted for.",
            },
        ],
        solnPoints: [
            {
                solutionHeading: "Climate Risk Assessment",
                solutionDescription: "Our models, built on CMIP6 projections and IMD data, quantify physical climate risks at the company or asset level. This allows you to assess whether your vendor, partner, or borrower is exposed to material risks that could disrupt supply chains, business continuity, or repayment capacity."
            },
            {
                solutionHeading: "Carbon Emission Estimation",
                solutionDescription: "We estimate Scope 1, 2, and proxy Scope 3 emissions for companies, even where disclosures are absent. By combining industry, turnover, workforce, and state-level energy mix data, we provide credible emission footprints that help you evaluate high-emission counterparties and meet your own reporting obligations."
            },
            {
                solutionHeading: "ESG Scoring",
                solutionDescription: "Our bots scan regulatory filings, disclosures, company websites, and media reports to generate an objective ESG score for counterparties. This ensures ongoing monitoring of social and governance practices, regulatory compliance, and reputational risks across your vendor or borrower network."
            },
        ],
        useCases: [
            {
                heading: "Banks & Lenders",
                desc: "Evaluate loan portfolios with our ESG Scoring to obtain indicative sustainability scores for counterparties.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Financial Institutions",
                desc: "Use our Carbon Emissions Estimator to measure financed emissions across portfolios, even when disclosures are missing.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Sustainability Investors",
                desc: "Build and triage target portfolios by combining estimated ESG scores with modeled carbon emissions data.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Corporates",
                desc: "Assess vendors’ sustainability practices using indicative ESG scores and estimated carbon emissions for better supply chain visibility.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Collateral Risk Assessment",
                desc: " Banks can quantify climate exposure of properties offered as collateral to strengthen lending decisions.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Supply Chain & Facility Risk",
                desc: "Corporates can evaluate climate risks to their own operations and their suppliers’ facilities, identifying vulnerabilities to floods, heat stress, or drought.",
                icon: "/solutions/lock.svg"
            },
        ],
        modules: [
            {
                title: "Climate Risk Assessment",
                description:
                    "Pinpoint climate vulnerabilities across India using geo-tagged data powered by our API. Integrate insights directly into your workflows or access them on our platform to evaluate heat, flood, and drought risks at asset or company level.",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Carbon Emission Estimation",
                description:
                    "Get reliable Scope 1, 2, and proxy Scope 3 emission estimates—even for companies with no disclosures. Our models combine industry, turnover, workforce, and state-level energy mix data to generate defensible carbon footprints, enabling stronger vendor and borrower evaluations.",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "ESG Scoring",
                description:
                    "Leverage AI Agents that scan regulatory filings, company websites, court and tribunal cases, and news sources to surface ESG signals. We translate these into an objective ESG score—providing a robust baseline for deeper sustainability due diligence.",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
        ],

        mainArticleSlug: "optimising-distributor-credit-risk-management"
    },
];

