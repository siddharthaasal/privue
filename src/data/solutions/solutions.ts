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
        coverImg: "https://plus.unsplash.com/premium_photo-1682148458133-cf5a01a50cce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzdHJpYnV0b3J8ZW58MHx8MHx8fDA%3D",
        heading: "Distributor Performance Management",
        subHeading: "Reduce leakages. Improve collections. Safeguard growth.",
        featurePoints: [
            "Dealer Onboarding",
            "Data Acquisition",
            "Risk Assessment",
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
        coverImg: "https://images.unsplash.com/photo-1569227997603-33b9f12af927?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        heading: "Sustainability Assessment",
        subHeading: "Climate Risk. Emissions Estimation. ESG Score.",
        featurePoints: [
            "Assess Climate Risk",
            "Carbon Emissions Estimation",
            "ESG Score",
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
    {
        id: 3,
        slug: "commercial-insurance-underwriting",
        img: "/solutions/demo-image.png",
        coverImg: "https://images.unsplash.com/photo-1647348815424-8e8206ea7c83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        heading: "Commercial Insurance Underwriting",
        subHeading: "Sharper insights. Smarter underwriting. Stronger outcomes.",
        featurePoints: [
            "Intelligent Data Extraction",
            "Trusted Data Acquisition",
            "API Ready Integration",
        ],
        mainSolnDesc:
            "At Privue, we design agentic workflows that integrate into an insurer’s underwriting desk, automating manual tasks and delivering insights so underwriters can focus on risk selection and decision quality, driving faster turnaround, improved risk assessment, and portfolio consistency.",
        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Data Blind Spots",
                problemDesc:
                    "Over-reliance on insured-provided information and limited third-party data"
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fragmented Access",
                problemDesc:
                    "Challenges in managing or integrating multiple data subscriptions "
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Manual Overload",
                problemDesc:
                    "Heavy manual effort to convert insured documents into system-ready inputs "
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Outdated Risk View",
                problemDesc:
                    "Limited visibility into insureds during the policy term, especially before a claim"
            },
        ],
        solnPoints: [
            {
                solutionHeading: "Trusted Data Acquisition",
                solutionDescription: "Verified and validated data from third-party partners"
            },
            {
                solutionHeading: "Intelligent Data Extraction",
                solutionDescription: "Seamless capture of information from internal and insured files"
            },
            {
                solutionHeading: "Smart Analysis & Summaries",
                solutionDescription: "Convert raw data into actionable underwriting insights"
            },
            {
                solutionHeading: "API-Ready Integration",
                solutionDescription: "Direct connectivity with underwriting systems for smooth workflows "
            },
            {
                solutionHeading: "Continuous Risk Monitoring",
                solutionDescription: "Track key parameters and deliver timely alerts"
            },
        ],
        coreCapabilities: [
            {
                heading: "MCA Insights",
                desc: "Extract filings and compliance records directly from MCA databases.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Financial Analysis",
                desc: "Digitise and analyse audited financials from PDFs and images.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Financial Summaries",
                desc: "Generate concise financial insights tailored for underwriting.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Policy Document Insights",
                desc: "Highlight coverage, exclusions, and special conditions at a glance.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Technical Survey Insights",
                desc: "Extract and summarise key findings from plant and facility surveys.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Comprehensive Data Coverage",
                desc: "Access 300+ critical data points from public and private sources.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Litigation Check",
                desc: "Aggregate cases from courts and tribunals, tagged by risk relevance.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "News Monitoring",
                desc: "Curate news from multiple publications, categorised by risk factors.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Policy Consistency Checks",
                desc: "Compare quoting and issuance documents to ensure alignment.",
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

        mainArticleSlug: "redefining-commercial-lines-underwriting"
    },
    {
        id: 4,
        slug: "large-customer-risk-assessment",
        img: "/solutions/demo-image.png",
        coverImg: "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        heading: "Large Customer Risk Assessment",
        subHeading: "Reduce defaults. Protect cash flow. Secure growth.",
        featurePoints: [
            "Assess Contract Risk Upfront",
            "Manage Large-Ticket Exposures",
            "Recalibrate Credit Terms Dynamically",
        ],
        mainSolnDesc:
            "PRIVUE enables companies to assess the financial reliability of large customers pre-contract, giving finance and sales teams clarity on safe exposure, payment terms, and when to decline.",

        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "High Exposure Risk",
                problemDesc:
                    "A single default can significantly impact revenue and cash flow."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Subjective Credit Decisions",
                problemDesc:
                    "Credit terms are often influenced by sales pressure or relationship bias, lacking objective risk assessment."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Inefficient Manual Processes",
                problemDesc:
                    "Reviews of financial statements and declarations are slow, error-prone, and resource-intensive."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fragmented Customer Data",
                problemDesc:
                    "Incomplete and scattered data makes it difficult to form a reliable view of financial health."
            },
        ],
        solnPoints: [
            {
                solutionHeading: "Assess Contract Risk Upfront",
                solutionDescription: "Avoid signing with customers who may not pay."
            },
            {
                solutionHeading: "Manage Large-Ticket Exposures",
                solutionDescription: "Make systematic, data-backed credit decisions."
            },
            {
                solutionHeading: "Mitigate Concentration Risk",
                solutionDescription: "Track and control portfolio-level exposure."
            },
            {
                solutionHeading: "Recalibrate Credit Terms Dynamically",
                solutionDescription: "Use predictive risk scores to adjust terms in real time."
            },
            {
                solutionHeading: "Integrate Risk into Daily Workflows",
                solutionDescription: "Embed proactive risk alerts within ERP or CRM systems."
            },
        ],
        coreCapabilities: [
            {
                heading: "Identity Verification",
                desc: "Validate customer businesses using GST, PAN, and MCA filings",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Financial Analysis",
                desc: "Digitise and analyse audited statements from images and PDFs",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "MCA Insights",
                desc: "Extract filings and compliance data from MCA records",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Transaction Data",
                desc: "Capture turnover and transaction history from GST",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Data Coverage",
                desc: "Leverage 300+ critical data points from public and private repositories",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Receivable Analysis",
                desc: "Assess invoicing and ageing patterns to spot delayed payment behaviour",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Credit Scoring",
                desc: "Generate a model-driven score for customer creditworthiness",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Exposure & Terms",
                desc: "Define safe contract exposure and payment terms",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Early Warning Signals",
                desc: "Detect deteriorating financial health to prevent defaults",
                icon: "/solutions/lock.svg"
            },
        ],
        modules: [
            {
                title: "Customer Onboarding",
                description:
                    "Add customers, upload documents, and verify identity",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Data Acquisition",
                description:
                    "Pull financial, GST, and compliance data seamlessly",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Risk Assessment",
                description:
                    "Generate a comprehensive risk score for each customer",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Contract & Credit Terms",
                description:
                    "Use the score to decide on exposure limits and payment terms",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Continuous Monitoring",
                description:
                    "PRIVUE re-scores customers periodically and raises alerts on emerging risks",
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
        mainArticleSlug: "redefining-commercial-lines-underwriting"
    },
    {
        id: 5,
        slug: "entity-due-diligence",
        img: "/solutions/demo-image.png",
        coverImg: "https://plus.unsplash.com/premium_photo-1681681061613-8540c8d67f0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHVlJTIwZGlsaWdlbmNlfGVufDB8fDB8fHww",
        heading: "Entity Due Diligence",
        subHeading: "A Unified Solution for Smarter Due Diligence",
        featurePoints: [
            "Unified Data Platform",
            "Automated Workflows",
            "Smart Summaries"
        ],
        mainSolnDesc:
            "Our Entity Due Diligence platform unifies data, technology, and intelligence to help professionals verify identities, analyze financials, track litigations, and monitor news—enabling faster, more confident decisions.",


        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Fragmented Data Sources",
                problemDesc:
                    "Struggle of pulling company information from multiple databases and filings."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Time-Consuming Research ",
                problemDesc:
                    "Manual checks and reconciliations leading to long due diligence cycles."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Unstructured Informatioin",
                problemDesc:
                    "Difficulty in summarising lengthy filings, judgments, and news articles."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Cumbersome Reporting",
                problemDesc:
                    "Extracting and formatting data for reports and analysis is tedious."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "High Cost of Diligence",
                problemDesc:
                    "Excessive time and resources required for routine checks."
            },
            {
                icon: "/solutions/hide.svg",
                problemHeading: "Missed Red Flags",
                problemDesc:
                    "Critical news, litigations, or compliance lapses often overlooked in manual reviews."
            },

        ],
        solnPoints: [
            {
                solutionHeading: "Unified Data Platform",
                solutionDescription: "Aggregate 300+ data points from public and private repositories into one view."
            },
            {
                solutionHeading: "Automated Workflows",
                solutionDescription: "Digitise, process, and analyse data instantly to cut review time."
            },
            {
                solutionHeading: "Smart Summaries",
                solutionDescription: "Auto-extract key points and deliver concise, actionable insights."
            },
            {
                solutionHeading: "Custom Reports",
                solutionDescription: "Generate tailored, ready-to-share reports in just a few clicks."
            },
        ],
        coreCapabilities: [
            {
                heading: "Identity Verification",
                desc: "Verify businesses instantly with GST, PAN, and MCA records.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Financial Analysis",
                desc: "Digitise and analyse audited statements directly from images or PDFs.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "MCA Insights",
                desc: "Access filings and compliance data seamlessly from MCA records.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Transaction Data",
                desc: "Track turnover and transaction history through GST data.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Data Coverage",
                desc: "Tap into 300+ critical data points from public and private sources.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Company News",
                desc: "Scan 100+ publications for adverse news or event-based triggers, with concise summaries.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Legal Cases",
                desc: "Extract and categorise court and tribunal cases, with clear summaries for quick review.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Custom Reports",
                desc: "Generate tailored due diligence reports in just a few clicks.",
                icon: "/solutions/lock.svg"
            },
            {
                heading: "Conversational Queries",
                desc: "Ask questions in natural language and get instant insights on any company.",
                icon: "/solutions/lock.svg"
            },
        ],
        /*
         

  

   

   

 
	


 

  Verify client identity and compliance through MCA, GST, and PAN records. 

  Analyse financial statements and transaction history for assurance and advisory. 

  Automate due diligence for audits, tax reviews, and forensic investigations. 

 
	

 
 

 

  Conduct thorough legal due diligence on counterparties in transactions. 

  Track litigation and tribunal cases tagged to relevant practice areas. 

  Access compliance history and filings to support corporate restructuring or M&A. 

 
	

 

 

 

  Assess financial health and risk profile of companies during strategy or M&A advisory. 

  Benchmark compliance and governance standards across industries. 

  Generate custom reports to support client presentations and recommendations. 

 
	

 
 

  Verify vendor legitimacy and corporate standing. 

  Screen suppliers for adverse news, compliance issues, or ongoing litigations. 

  Monitor transaction and turnover data to assess vendor reliability and scale. 

 
        */
        modules: [
            {
                title: "Insolvency Professionals",
                description:
                    `Identify company assets and promoters.
Trace linked entities and assets connected to promoters.
Monitor news on transactions, asset sales, or restructuring events.
                    `,
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Accounting Firms ",
                description:
                    ".",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Law Firms",
                description:
                    ".",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Consulting Firms",
                description:
                    ".",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
            {
                title: "Procurement Teams",
                description:
                    ".",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
        ],
        mainArticleSlug: "redefining-commercial-lines-underwriting"
    },

];

/*
{
        id: 5,
        slug: "",
        img: "/solutions/demo-image.png",
        coverImg: "/solutions/demo-image.png",
        heading: "",
        subHeading: "",
        featurePoints: [
            "",
        ],
        mainSolnDesc:
            "",

        problems: [
            {
                icon: "/solutions/hide.svg",
                problemHeading: "",
                problemDesc:
                    ""
            },
            
        ],
        solnPoints: [
            {
                solutionHeading: "",
                solutionDescription: ""
            },
        ],
        coreCapabilities: [
            {
                heading: "",
                desc: "",
                icon: "/solutions/lock.svg"
            },
        ],
        modules: [
            {
                title: "",
                description:
                    "",
                imgSrc: "/demo-chart.webp",
                link: "#",
            },
        ],
        mainArticleSlug: "redefining-commercial-lines-underwriting"
    },
 */