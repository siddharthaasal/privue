// src/data/solutions.ts
import DealerOnboarding from '@/components/product-animations/DealerOnboarding';
import DataAcquisition from '@/components/product-animations/DataAcquisition';
import NotificationOverlayWithLeftFade from '@/components/product-animations/ContinuousMonitoringDemo';
import RiskAssessment from '@/components/product-animations/RiskAssessment';
import CreditTerms from '@/components/product-animations/CreditTerms';
import LargeDealerOnboarding from '@/components/product-animations/LargeDealerOnboarding';
import LargeDataAcquisition from '@/components/product-animations/LargeDataAcquisition';
import Integrations from '@/components/product-animations/Integrations';
import FinancialStability from '@/components/product-animations/FinancialStability';
import CreditAssessment from '@/components/product-animations/CreditAssessment';
import ComplianceRisk from '@/components/product-animations/ComplianceRisk';

import {
  SquareLibrary,
  CopySlash,
  FileDigit,
  BetweenHorizonalEnd,
  Airplay,
  MonitorSpeaker,
  AlignLeft,
  GitPullRequestArrow,
  GitPullRequestCreateArrow,
  BookCopy,
  Factory,
  CloudRain,
  BanknoteArrowUp,
  Landmark,
  Building2,
  Building,
  Warehouse,
  Users,
  FolderSymlink,
  BookUp2,
  FolderGit2,
  BookOpenCheck,
  Files,
  FileChartPie,
  FileText,
  FileSearch,
  BookAlert,
  Layers,
  Scale,
  Newspaper,
  FileCheck2,
  BanknoteArrowDown,
  ChartNetwork,
  IdCardLanyard,
  ReceiptText,
  FileX2,
  FileInput,
  Workflow,
  MessageSquareText,
  GitGraph,
  FileClock,
  GitPullRequestClosed,
  FilePlay,
  FileCode2,
  ShieldAlert,
  CloudRainWind,
  MonitorDot,
} from 'lucide-react';

import DistributorPerformanceWorkflow from '@/components/solutions/header-workflows/DistributorPerformanceWorkflow';
import SustainabilityWorkflow from '@/components/solutions/header-workflows/SustainabilityWorkflow';
import InsuranceUnderwritingWorkflow from '@/components/solutions/header-workflows/IsuranceUnderwritingWorkflow';
import LargeCustomerWorkflow from '@/components/solutions/header-workflows/LargeCustomerWorkflow';
import ThirdPartyWorkflow from '@/components/solutions/header-workflows/ThirdPartyWorkflow';
import EntityDueDiligenceWorkflow from '@/components/solutions/header-workflows/EntityDueDiligenceWorkflow';
import AdverseNews from '@/components/product-animations/AdverseNews';
import CyberRisk from '@/components/product-animations/CyberRisk';
import ClimateRisk from '@/components/product-animations/ClimateRisk';
import EngineeringReportParsing from '@/components/product-animations/EngineeringReportParsing';
import EsgScoring from '@/components/product-animations/EsgScoring';
import CarbonEstimation from '@/components/product-animations/CarbonEstimation';
import News from '@/components/product-animations/News';
import InsurancePolicy from '@/components/product-animations/InsurancePolicy';
import FinancialDocumentParsing from '@/components/product-animations/FinancialDocumentParsing';
import CourtCase from '@/components/product-animations/CourtCase';

export type Problem = {
  problemHeading: string;
  problemDesc: string;
  icon: React.ComponentType<any> | string;
};

export type Module = {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
  renderAnimation?: React.ComponentType<any>;
};

export type Capability = {
  heading?: string;
  desc: string;
  icon: React.ComponentType<any> | string;
};

export type UseCase = {
  heading: string;
  desc: string;
  icon: React.ComponentType<any> | string;
};

export type SolutionPoints = {
  solutionHeading: string;
  solutionDescription: string;
  icon: React.ComponentType<any> | string;
};

export type Solution = {
  id: number;
  icon: React.ComponentType<any> | string;
  slug: string;
  img?: string;
  workflow?: React.ComponentType<any> | React.ReactNode;
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

// import { AlignVerticalJustifyCenter, Recycle, Landmark, BookAlert, Workflow, TriangleAlert } from 'lucide-react';

export const solutions: Solution[] = [
  {
    id: 1,
    slug: 'distributor-performance-management',
    // icon: AlignVerticalJustifyCenter,
    icon: '/icons/solutions/distributor-performance-management.png',
    // img: "/solutions/demo-image.png",
    workflow: DistributorPerformanceWorkflow,
    coverImg:
      'https://plus.unsplash.com/premium_photo-1682148458133-cf5a01a50cce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzdHJpYnV0b3J8ZW58MHx8MHx8fDA%3D',
    heading: 'Distributor Performance Management',
    subHeading: 'Reduce leakages. Improve collections. Safeguard growth.',
    featurePoints: ['Dealer Onboarding', 'Data Acquisition', 'Risk Assessment'],
    mainSolnDesc:
      'Privue is a simple tool that helps you check if a distributor or dealer can pay you. credit to give each distributor.',
    solnPoints: [
      {
        solutionHeading: 'Credit evaluation',
        solutionDescription:
          'Check if a distributor/dealer can pay and guide how much credit to extend.',
        icon: Airplay,
      },
      {
        solutionHeading: 'Ongoing monitoring',
        solutionDescription: 'Reviews every six months and sends early warnings to prevent losses.',
        icon: MonitorSpeaker,
      },
      {
        solutionHeading: 'Comprehensive insights',
        solutionDescription:
          'Assesses 300+ data points from public/private sources plus distributor documents for accurate creditworthiness.',
        icon: AlignLeft,
      },
    ],
    problems: [
      {
        icon: SquareLibrary,
        problemHeading: 'Insufficient information to evaluate distributors',
        problemDesc: 'Distributor limit and credit period decisions based on relationships and gut',
      },
      {
        icon: CopySlash,
        problemHeading: 'Fixed Credit Limits',
        problemDesc:
          'Cannot adapt to changing market conditions and distributor’s strength and reach',
      },
      {
        icon: FileDigit,
        problemHeading: 'Limited visibility into distributor financial health',
        problemDesc: 'Problems surface only when payments are missed',
      },
      {
        icon: BetweenHorizonalEnd,
        problemHeading: 'Fragmented data across sources',
        problemDesc:
          'Manual work across excel, documents submitted by distributor creates errors and delays.',
      },
    ],
    modules: [
      {
        title: 'Dealer Onboarding',
        description: 'Add dealers, upload documents and verify identity',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: DealerOnboarding,
      },
      {
        title: 'Data Acquisition',
        description: 'Obtain, data available publicly and from financials and GST',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: DataAcquisition,
      },
      {
        title: 'Risk Assessment',
        description: 'Determine risk score of the dealer using advance models',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: RiskAssessment,
      },
      {
        title: 'Credit Terms',
        description: 'Use the score to choose safe credit terms for every dealer',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CreditTerms,
      },
      {
        title: 'Continuous Monitoring',
        description:
          'Privue rescores dealers twice a year and sends an alert if anything looks risky',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: NotificationOverlayWithLeftFade,
      },
      {
        title: 'Integrations',
        description: 'The tool can be integrated into your ERP system for a seamless experience',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: Integrations,
      },
    ],
    coreCapabilities: [
      {
        desc: 'Implement systematic, data driven distributor onboarding',
        icon: GitPullRequestArrow,
      },
      { desc: 'Regularly monitor behavioural and external data feeds', icon: MonitorSpeaker },
      {
        desc: 'Dynamically recalibrate credit limits using predictive risk scores',
        icon: GitPullRequestCreateArrow,
      },
      { desc: 'Integrate risk alerts into ERP or CRM workflows', icon: Airplay },
      // { desc: "Maintain audit trails for governance and compliance", icon: "/solutions/context-driven.svg" },
    ],
    mainArticleSlug: 'optimising-distributor-credit-risk-management',
  },
  {
    id: 2,
    slug: 'sustainability-assessment',
    icon: '/icons/solutions/sustainability-assessment.png',
    // icon: Recycle,
    // img: "/solutions/demo-image.png",
    workflow: SustainabilityWorkflow,
    coverImg:
      'https://images.unsplash.com/photo-1569227997603-33b9f12af927?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heading: 'Sustainability Assessment',
    subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
    featurePoints: ['Assess Climate Risk', 'Carbon Emissions Estimation', 'ESG Score'],
    mainSolnDesc:
      'Privue empowers companies to assess vendors, partners, and borrowers through intelligent, data-backed sustainability evaluations with the same rigor as financial risk assessments.',
    problems: [
      {
        icon: SquareLibrary,
        problemHeading: 'Over-Reliance on Self-Reported Information',
        problemDesc:
          'Assessments today are heavily dependent on inputs provided by vendors or borrowers, which may be incomplete, inconsistent, or biased.',
      },
      {
        icon: MonitorSpeaker,
        problemHeading: 'Fragmented ESG Signals',
        problemDesc:
          'Critical information lies scattered across regulatory filings, disclosures, websites, and news reports—difficult to aggregate and interpret at scale.',
      },
      {
        icon: BookCopy,
        problemHeading: 'Lack of Standardised Assessment Framework',
        problemDesc:
          'Without a consistent methodology, sustainability evaluations vary across counterparties and geographies, reducing comparability.',
      },
      {
        icon: Factory,
        problemHeading: 'Blind Spots in Scope 3 Emissions',
        problemDesc:
          'Companies often underestimate emissions embedded in their supply chains or financed portfolios, leaving material risks unaccounted for.',
      },
    ],
    solnPoints: [
      {
        solutionHeading: 'Climate Risk Assessment',
        solutionDescription:
          'Our models, built on CMIP6 projections and IMD data, quantify physical climate risks at the company or asset level. This allows you to assess whether your vendor, partner, or borrower is exposed to material risks that could disrupt supply chains, business continuity, or repayment capacity.',
        icon: CloudRain,
      },
      {
        solutionHeading: 'Carbon Emission Estimation',
        solutionDescription:
          'We estimate Scope 1, 2, and proxy Scope 3 emissions for companies, even where disclosures are absent. By combining industry, turnover, workforce, and state-level energy mix data, we provide credible emission footprints that help you evaluate high-emission counterparties and meet your own reporting obligations.',
        icon: Factory,
      },
      {
        solutionHeading: 'ESG Scoring',
        solutionDescription:
          'Our bots scan regulatory filings, disclosures, company websites, and media reports to generate an objective ESG score for counterparties. This ensures ongoing monitoring of social and governance practices, regulatory compliance, and reputational risks across your vendor or borrower network.',
        icon: MonitorSpeaker,
      },
    ],
    useCases: [
      {
        heading: 'Banks & Lenders',
        desc: 'Evaluate loan portfolios with our ESG Scoring to obtain indicative sustainability scores for counterparties.',
        icon: BanknoteArrowUp,
      },
      {
        heading: 'Financial Institutions',
        desc: 'Use our Carbon Emissions Estimator to measure financed emissions across portfolios, even when disclosures are missing.',
        icon: Factory,
      },
      {
        heading: 'Sustainability Investors',
        desc: 'Build and triage target portfolios by combining estimated ESG scores with modeled carbon emissions data.',
        icon: Landmark,
      },
      {
        heading: 'Corporates',
        desc: 'Assess vendors’ sustainability practices using indicative ESG scores and estimated carbon emissions for better supply chain visibility.',
        icon: Building2,
      },
      {
        heading: 'Collateral Risk Assessment',
        desc: ' Banks can quantify climate exposure of properties offered as collateral to strengthen lending decisions.',
        icon: Building,
      },
      {
        heading: 'Supply Chain & Facility Risk',
        desc: 'Corporates can evaluate climate risks to their own operations and their suppliers’ facilities, identifying vulnerabilities to floods, heat stress, or drought.',
        icon: Warehouse,
      },
    ],
    modules: [
      {
        title: 'Climate Risk Assessment',
        description:
          'Pinpoint climate vulnerabilities across India using geo-tagged data powered by our API. Integrate insights directly into your workflows or access them on our platform to evaluate heat, flood, and drought risks at asset or company level.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: ClimateRisk,
      },
      {
        title: 'Carbon Emission Estimation',
        description:
          'Get reliable Scope 1, 2, and proxy Scope 3 emission estimates—even for companies with no disclosures. Our models combine industry, turnover, workforce, and state-level energy mix data to generate defensible carbon footprints, enabling stronger vendor and borrower evaluations.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CarbonEstimation,
      },
      {
        title: 'ESG Scoring',
        description:
          'Leverage AI Agents that scan regulatory filings, company websites, court and tribunal cases, and news sources to surface ESG signals. We translate these into an objective ESG score—providing a robust baseline for deeper sustainability due diligence.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: EsgScoring,
      },
    ],

    mainArticleSlug: 'optimising-distributor-credit-risk-management',
  },
  {
    id: 3,
    slug: 'commercial-insurance-underwriting',
    icon: '/icons/solutions/insurance-underwriting.png',
    // icon: Landmark,
    // img: "/solutions/demo-image.png",
    workflow: InsuranceUnderwritingWorkflow,
    coverImg:
      'https://images.unsplash.com/photo-1647348815424-8e8206ea7c83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heading: 'Commercial Insurance Underwriting',
    subHeading: 'Sharper insights. Smarter underwriting. Stronger outcomes.',
    featurePoints: [
      'Intelligent Data Extraction',
      'Trusted Data Acquisition',
      'API Ready Integration',
    ],
    mainSolnDesc:
      'At Privue, we design agentic workflows that integrate into an insurer’s underwriting desk, automating manual tasks and delivering insights so underwriters can focus on risk selection and decision quality, driving faster turnaround, improved risk assessment, and portfolio consistency.',
    problems: [
      {
        icon: BookCopy,
        problemHeading: 'Data Blind Spots',
        problemDesc: 'Over-reliance on insured-provided information and limited third-party data',
      },
      {
        icon: BetweenHorizonalEnd,
        problemHeading: 'Fragmented Access',
        problemDesc: 'Challenges in managing or integrating multiple data subscriptions ',
      },
      {
        icon: Users,
        problemHeading: 'Manual Overload',
        problemDesc: 'Heavy manual effort to convert insured documents into system-ready inputs ',
      },
      {
        icon: MonitorSpeaker,
        problemHeading: 'Outdated Risk View',
        problemDesc:
          'Limited visibility into insureds during the policy term, especially before a claim',
      },
    ],
    solnPoints: [
      {
        solutionHeading: 'Trusted Data Acquisition',
        solutionDescription: 'Verified and validated data from third-party partners',
        icon: FolderSymlink,
      },
      {
        solutionHeading: 'Intelligent Data Extraction',
        solutionDescription: 'Seamless capture of information from internal and insured files',
        icon: BookUp2,
      },
      {
        solutionHeading: 'Smart Analysis & Summaries',
        solutionDescription: 'Convert raw data into actionable underwriting insights',
        icon: MonitorSpeaker,
      },
      {
        solutionHeading: 'Verification and Audit​',
        solutionDescription:
          'Automated checks across documents and systems for consistency, lineage validation, and audit traceability',
        icon: BookOpenCheck,
      },
      {
        solutionHeading: 'Continuous Risk Monitoring',
        solutionDescription: 'Track key parameters and deliver timely alerts',
        icon: MonitorSpeaker,
      },
      {
        solutionHeading: 'API-Ready Integration',
        solutionDescription: 'Direct connectivity with underwriting systems for smooth workflows',
        icon: FolderGit2,
      },
    ],
    coreCapabilities: [
      {
        heading: 'MCA Insights',
        desc: 'Extract filings and compliance records directly from MCA databases.',
        icon: Files,
      },
      {
        heading: 'Financial Analysis',
        desc: 'Digitise and analyse audited financials from PDFs and images.',
        icon: FileChartPie,
      },
      {
        heading: 'Financial Summaries',
        desc: 'Generate concise financial insights tailored for underwriting.',
        icon: FileText,
      },
      {
        heading: 'Policy Document Insights',
        desc: 'Highlight coverage, exclusions, and special conditions at a glance.',
        icon: FileSearch,
      },
      {
        heading: 'Technical Survey Insights',
        desc: 'Extract and summarise key findings from plant and facility surveys.',
        icon: BookAlert,
      },
      {
        heading: 'Comprehensive Data Coverage',
        desc: 'Access 300+ critical data points from public and private sources.',
        icon: Layers,
      },
      {
        heading: 'Litigation Check',
        desc: 'Aggregate cases from courts and tribunals, tagged by risk relevance.',
        icon: Scale,
      },
      {
        heading: 'News Monitoring',
        desc: 'Curate news from multiple publications, categorised by risk factors.',
        icon: Newspaper,
      },
      {
        heading: 'Policy Consistency Checks',
        desc: 'Compare quoting and issuance documents to ensure alignment.',
        icon: FileCheck2,
      },
    ],
    modules: [
      {
        title: 'MCA Documents Acquisition and Summarisation',
        description:
          'Delivers structured insights from MCA filings directly into your underwriting system.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: FinancialDocumentParsing,
      },
      {
        title: 'Financial Document Parsing',
        description:
          'Transforms financial statements from any format (images, pdf, excel, word) into a systematic, underwriter-ready view.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: FinancialDocumentParsing,
      },
      {
        title: 'Insurance Policy Document Parsing',
        description:
          'Extracts key details from past insurance policies and integrates them into your underwriting platform.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: InsurancePolicy,
      },
      {
        title: 'Engineering Report Parsing',
        description:
          'Summarises engineering reports into actionable insights for underwriting decisions.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: EngineeringReportParsing,
      },
      {
        title: 'Court Case Acquisition and Summarisation',
        description:
          'Acquires and summarises court and tribunal cases involving the company, highlighting case nature for underwriting.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CourtCase,
      },
      {
        title: 'News Acquisition and Summarisation',
        description:
          'Captures and summarises adverse News and industry developments from multiple publications for underwriting context.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: News,
      },
    ],

    mainArticleSlug: 'redefining-commercial-lines-underwriting',
  },
  {
    id: 4,
    slug: 'large-customer-risk-assessment',
    icon: '/icons/solutions/large-customer-risk-assessment.png',
    // icon: BookAlert,
    // img: "/solutions/demo-image.png",
    workflow: LargeCustomerWorkflow,
    coverImg:
      'https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heading: 'Large Customer Risk Assessment',
    subHeading: 'Reduce defaults. Protect cash flow. Secure growth.',
    featurePoints: [
      'Assess Contract Risk Upfront',
      'Manage Large-Ticket Exposures',
      'Recalibrate Credit Terms Dynamically',
    ],
    mainSolnDesc:
      'Privue enables companies to assess the financial reliability of large customers pre-contract, giving finance and sales teams clarity on safe exposure, payment terms, and when to decline.',

    problems: [
      {
        icon: BanknoteArrowDown,
        problemHeading: 'High Exposure Risk',
        problemDesc: 'A single default can significantly impact revenue and cash flow.',
      },
      {
        icon: MonitorSpeaker,
        problemHeading: 'Subjective Credit Decisions',
        problemDesc:
          'Credit terms are often influenced by sales pressure or relationship bias, lacking objective risk assessment.',
      },
      {
        icon: Users,
        problemHeading: 'Inefficient Manual Processes',
        problemDesc:
          'Reviews of financial statements and declarations are slow, error-prone, and resource-intensive.',
      },
      {
        icon: BetweenHorizonalEnd,
        problemHeading: 'Fragmented Customer Data',
        problemDesc:
          'Incomplete and scattered data makes it difficult to form a reliable view of financial health.',
      },
    ],
    solnPoints: [
      {
        solutionHeading: 'Assess Contract Risk Upfront',
        solutionDescription: 'Avoid signing with customers who may not pay.',
        icon: FileText,
      },
      {
        solutionHeading: 'Manage Large-Ticket Exposures',
        solutionDescription: 'Make systematic, data-backed credit decisions.',
        icon: FileDigit,
      },
      {
        solutionHeading: 'Mitigate Concentration Risk',
        solutionDescription: 'Track and control portfolio-level exposure.',
        icon: ChartNetwork,
      },
      {
        solutionHeading: 'Litigation Check​',
        solutionDescription:
          'Screen court cases and sanctions to flag past credit defaults and disputes.',
        icon: Scale,
      },
      {
        solutionHeading: 'Recalibrate Credit Terms Dynamically',
        solutionDescription: 'Use predictive risk scores to adjust terms in real time.',
        icon: GitPullRequestCreateArrow,
      },
      {
        solutionHeading: 'Integrate Risk into Daily Workflows',
        solutionDescription: 'Embed proactive risk alerts within ERP or CRM systems.',
        icon: FolderGit2,
      },
    ],
    coreCapabilities: [
      {
        heading: 'Identity Verification',
        desc: 'Validate customer businesses using GST, PAN, and MCA filings',
        icon: IdCardLanyard,
      },
      {
        heading: 'Financial Analysis',
        desc: 'Digitise and analyse audited statements from images and PDFs',
        icon: FileChartPie,
      },
      {
        heading: 'MCA Insights',
        desc: 'Extract filings and compliance data from MCA records',
        icon: Files,
      },
      {
        heading: 'Transaction Data',
        desc: 'Capture turnover and transaction history from GST',
        icon: ReceiptText,
      },
      {
        heading: 'Data Coverage',
        desc: 'Leverage 300+ critical data points from public and private repositories',
        icon: Layers,
      },
      {
        heading: 'Receivable Analysis',
        desc: 'Assess invoicing and ageing patterns to spot delayed payment behaviour',
        icon: Airplay,
      },
      {
        heading: 'Credit Scoring',
        desc: 'Generate a model-driven score for customer creditworthiness',
        icon: GitPullRequestCreateArrow,
      },
      {
        heading: 'Exposure & Terms',
        desc: 'Define safe contract exposure and payment terms',
        icon: FileText,
      },
      {
        heading: 'Early Warning Signals',
        desc: 'Detect deteriorating financial health to prevent defaults',
        icon: MonitorSpeaker,
      },
    ],
    modules: [
      {
        title: 'Customer Onboarding',
        description: 'Add customers, upload documents, and verify identity',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: LargeDealerOnboarding,
      },
      {
        title: 'Data Acquisition',
        description: 'Pull financial, GST, and compliance data seamlessly',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: LargeDataAcquisition,
      },
      {
        title: 'Risk Assessment',
        description: 'Generate a comprehensive risk score for each customer',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: RiskAssessment,
      },
      {
        title: 'Contract & Credit Terms',
        description: 'Use the score to decide on exposure limits and payment terms',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CreditTerms,
      },
      {
        title: 'Continuous Monitoring',
        description: 'Privue re-scores customers periodically and raises alerts on emerging risks',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: NotificationOverlayWithLeftFade,
      },
      {
        title: 'Integrations',
        description: 'The tool can be integrated into your ERP system for a seamless experience',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: Integrations,
      },
    ],
    mainArticleSlug: 'redefining-commercial-lines-underwriting',
  },
  {
    id: 5,
    slug: 'entity-due-diligence',
    icon: '/icons/solutions/entity-due-diligence.png',
    // icon: Workflow,
    // img: "/solutions/demo-image.png",
    workflow: EntityDueDiligenceWorkflow,
    coverImg:
      'https://plus.unsplash.com/premium_photo-1681681061613-8540c8d67f0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHVlJTIwZGlsaWdlbmNlfGVufDB8fDB8fHww',
    heading: 'Entity Due Diligence',
    subHeading: 'A Unified Solution for Smarter Due Diligence',
    featurePoints: ['Unified Data Platform', 'Automated Workflows', 'Smart Summaries'],
    mainSolnDesc:
      'Our Entity Due Diligence platform unifies data, technology, and intelligence to help professionals verify identities, analyze financials, track litigations, and monitor news—enabling faster, more confident decisions.',

    problems: [
      {
        icon: BetweenHorizonalEnd,
        problemHeading: 'Fragmented Data Sources',
        problemDesc: 'Struggle of pulling company information from multiple databases and filings.',
      },
      {
        icon: Users,
        problemHeading: 'Time-Consuming Research ',
        problemDesc: 'Manual checks and reconciliations leading to long due diligence cycles.',
      },
      {
        icon: Layers,
        problemHeading: 'Unstructured Information',
        problemDesc: 'Difficulty in summarising lengthy filings, judgments, and news articles.',
      },
      {
        icon: FileX2,
        problemHeading: 'Cumbersome Reporting',
        problemDesc: 'Extracting and formatting data for reports and analysis is tedious.',
      },
      {
        icon: FileDigit,
        problemHeading: 'High Cost of Diligence',
        problemDesc: 'Excessive time and resources required for routine checks.',
      },
      {
        icon: FileInput,
        problemHeading: 'Missed Red Flags',
        problemDesc:
          'Critical news, litigations, or compliance lapses often overlooked in manual reviews.',
      },
    ],
    solnPoints: [
      {
        solutionHeading: 'Unified Data Platform',
        solutionDescription:
          'Aggregate 300+ data points from public and private repositories into one view.',
        icon: Layers,
      },
      {
        solutionHeading: 'Automated Workflows',
        solutionDescription: 'Digitise, process, and analyse data instantly to cut review time.',
        icon: Workflow,
      },
      {
        solutionHeading: 'Smart Summaries',
        solutionDescription: 'Auto-extract key points and deliver concise, actionable insights.',
        icon: FileText,
      },
      {
        solutionHeading: 'Custom Reports',
        solutionDescription: 'Generate tailored, ready-to-share reports in just a few clicks.',
        icon: Airplay,
      },
    ],
    coreCapabilities: [
      {
        heading: 'Identity Verification',
        desc: 'Verify businesses instantly with GST, PAN, and MCA records.',
        icon: IdCardLanyard,
      },
      {
        heading: 'Financial Analysis',
        desc: 'Digitise and analyse audited statements directly from images or PDFs.',
        icon: FileChartPie,
      },
      {
        heading: 'MCA Insights',
        desc: 'Access filings and compliance data seamlessly from MCA records.',
        icon: Files,
      },
      {
        heading: 'Transaction Data',
        desc: 'Track turnover and transaction history through GST data.',
        icon: ReceiptText,
      },
      {
        heading: 'Data Coverage',
        desc: 'Tap into 300+ critical data points from public and private sources.',
        icon: Layers,
      },
      {
        heading: 'Company News',
        desc: 'Scan 100+ publications for adverse news or event-based triggers, with concise summaries.',
        icon: Newspaper,
      },
      {
        heading: 'Legal Cases',
        desc: 'Extract and categorise court and tribunal cases, with clear summaries for quick review.',
        icon: Scale,
      },
      {
        heading: 'Custom Reports',
        desc: 'Generate tailored due diligence reports in just a few clicks.',
        icon: FileText,
      },
      {
        heading: 'Conversational Queries',
        desc: 'Ask questions in natural language and get instant insights on any company.',
        icon: MessageSquareText,
      },
    ],

    modules: [
      {
        title: 'Registry Data',
        description:
          'MCA filings delivered in a structured, custom format—no need to sift through multiple documents.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: FinancialDocumentParsing,
      },
      {
        title: 'Financial Analysis',
        description:
          'Advanced, use-case-specific analysis highlights strengths, risks, and key insights.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: FinancialStability,
      },
      {
        title: 'Legal Cases',
        description:
          'Court cases mapped, tagged, and summarised for quick understanding of an entity’s legal history.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CourtCase,
      },
      {
        title: 'Compliance Checks',
        description:
          'Instantly identify compliance red flags, sanctions, and overall compliance health.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: ComplianceRisk,
      },
      {
        title: 'Adverse News',
        description:
          'Over 90,000 news sources scanned to flag negative events connected to the entity.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: AdverseNews,
      },
      {
        title: 'Conversational AI',
        description:
          'Interact with the data, ask questions, and generate notes to include directly in reports or memos.​​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: EngineeringReportParsing,
      },
    ],
    // modules: [
    //     {
    //         title: "Insolvency Professionals",
    //         description:
    //             "Locate company assets and promoters, trace linked entities and connected assets, and monitor news on transactions, asset sales, and restructuring events to support recovery and insolvency actions.",
    //         imgSrc: "/demo-module-image.png",
    //         link: "#",
    //     },
    //     {
    //         title: "Accounting Firms",
    //         description:
    //             "Verify client identity and regulatory compliance via MCA/GST/PAN records, analyse financial statements and transaction history, and automate due-diligence workflows for audits, tax reviews, and forensic investigations.",
    //         imgSrc: "/demo-module-image.png",
    //         link: "#",
    //     },
    //     {
    //         title: "Law Firms",
    //         description:
    //             "Conduct comprehensive legal due diligence on counterparties, track relevant litigation and tribunal cases, and access compliance histories and filings to support corporate restructuring, M&A, and transactional work.",
    //         imgSrc: "/demo-module-image.png",
    //         link: "#",
    //     },
    //     {
    //         title: "Consulting Firms",
    //         description:
    //             "Assess financial health and risk profiles for strategy and M&A advisory, benchmark governance and compliance across industries, and generate custom reports to support client presentations and recommendations.",
    //         imgSrc: "/demo-module-image.png",
    //         link: "#",
    //     },
    //     {
    //         title: "Procurement Teams",
    //         description:
    //             "Verify vendor legitimacy and corporate standing, screen suppliers for adverse news, compliance issues, or litigation, and monitor transaction and turnover data to evaluate vendor reliability and scale.",
    //         imgSrc: "/demo-module-image.png",
    //         link: "#",
    //     },
    // ],
    mainArticleSlug: 'redefining-commercial-lines-underwriting',
  },
  {
    id: 6,
    slug: 'third-party-risk-management',
    icon: '/icons/solutions/third-party-risk-management.png',
    // icon: TriangleAlert,
    // img: "/solutions/demo-image.png",
    workflow: ThirdPartyWorkflow,
    coverImg: '/solutions/demo-image.png',
    heading: 'Third Party Risk Management',
    subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
    featurePoints: [''],
    mainSolnDesc:
      'Privue enables organisations to comprehensively assess and continuously monitor third parties to mitigate risk. It provides early warnings, event-based triggers, and risk scores that help businesses protect their supply chain, reputation, and operations.',
    problems: [
      {
        icon: GitGraph,
        problemHeading: 'Blind Spots',
        problemDesc:
          'Vendors and partners are deeply integrated into critical operations, yet their risks are often overlooked.',
      },
      {
        icon: BetweenHorizonalEnd,
        problemHeading: 'Data Gaps',
        problemDesc:
          'Fragmented and incomplete information makes it difficult to build a 360° risk profile of third parties.',
      },
      {
        icon: FileClock,
        problemHeading: 'Static Reviews',
        problemDesc: 'Assessments are usually point-in-time and fail to capture emerging risks.',
      },
      {
        icon: Users,
        problemHeading: 'Manual Processes',
        problemDesc:
          'Reviews of financials, compliance records, and declarations are slow and inconsistent.',
      },
      {
        icon: GitPullRequestClosed,
        problemHeading: 'Event Exposure',
        problemDesc:
          'Organisations are often unprepared to respond when an adverse event impacts a vendor, leaving them exposed.',
      },
      {
        icon: FileX2,
        problemHeading: 'Scalability Limits',
        problemDesc: 'Programmes cannot keep pace with vendor volume, leaving assessments stale.',
      },
    ],
    solnPoints: [
      {
        solutionHeading: 'Submission Review',
        solutionDescription:
          'Analyse vendor submissions with automated workflows and an embedded chat assistant.',
        icon: Files,
      },
      {
        solutionHeading: '360° Risk Profiling',
        solutionDescription:
          'Develop a comprehensive view of each third party’s risk profile, covering a broad spectrum of risk categories.',
        icon: SquareLibrary,
      },
      {
        solutionHeading: 'Continuous Monitoring & Alerts',
        solutionDescription:
          'Dynamically re-score vendors with continuous monitoring and real-time alerts.',
        icon: MonitorSpeaker,
      },
      {
        solutionHeading: 'Proactive Risk Response',
        solutionDescription:
          'Enable proactive risk response when an event impacts a vendor or supplier.',
        icon: FilePlay,
      },
      {
        solutionHeading: 'Strengthened Vendor Governance',
        solutionDescription:
          'Strengthen vendor governance with objective, data-backed assessments.',
        icon: BookUp2,
      },
      {
        solutionHeading: 'Seamless Workflow Integration',
        solutionDescription:
          'Integrate risk alerts seamlessly into ERP, procurement, or compliance workflows.',
        icon: FolderGit2,
      },
    ],
    coreCapabilities: [
      {
        heading: 'Data Acquisition',
        desc: 'Pull financial, compliance, legal, and ESG data seamlessly.',
        icon: FolderSymlink,
      },
      {
        heading: 'Document Parsing',
        desc: 'Extract structured insights from documents and files submitted by the vendor or partner.',
        icon: FileCode2,
      },
      {
        heading: 'Spend Analysis',
        desc: 'Analyse spend patterns across vendors to identify concentration, inefficiencies, and potential risks.',
        icon: FileChartPie,
      },
      {
        heading: 'Financial Analysis',
        desc: 'Analyse financial statements to identify issues and assess financial stability.',
        icon: FileDigit,
      },
      {
        heading: 'Cyber Risk Assessment',
        desc: 'Conduct vulnerability assessments and penetration testing on vendor infrastructure.',
        icon: ShieldAlert,
      },
      {
        heading: 'Climate Risk Models',
        desc: 'Use IMD and CMIP6 data to evaluate exposure to climate-related risks.',
        icon: CloudRainWind,
      },
      {
        heading: 'Legal Case Insights',
        desc: 'Extract and categorise court and tribunal cases with clear, concise summaries.',
        icon: Scale,
      },
      {
        heading: 'Adverse Media Scanning',
        desc: 'Monitor 100+ publications for negative news and event-based triggers.',
        icon: Newspaper,
      },
      {
        heading: 'Sustainability Signals',
        desc: 'Capture indicators from public sources and documents on ESG posture.',
        icon: Layers,
      },
      {
        heading: 'Event Monitoring',
        desc: 'Detect adverse events in real time and provide actionable triggers.',
        icon: MonitorDot,
      },
      {
        heading: 'Continuous Monitoring',
        desc: 'Re-score vendors periodically and raise alerts on emerging risks.',
        icon: MonitorSpeaker,
      },
      {
        heading: 'Conversational Queries',
        desc: 'Ask questions in natural language and get instant insights on any company.',
        icon: MessageSquareText,
      },
    ],
    modules: [
      {
        title: 'Financial Stability Assessment',
        description: 'Analyse financial statements, liquidity, and solvency metrics.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: FinancialStability,
      },
      {
        title: 'Creditworthiness Assessment',
        description: 'Generate predictive credit scores to evaluate payment reliability.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CreditAssessment,
      },
      {
        title: 'Compliance Review',
        description: 'Check adherence to regulatory requirements and compliance track records.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: ComplianceRisk,
      },
      {
        title: 'Adverse News',
        description:
          'Over 90,000 news sources scanned to flag negative events connected to the entity.​',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: AdverseNews,
      },
      {
        title: 'Legal Due Diligence',
        description: 'Review corporate filings, litigations, and adverse media.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: AdverseNews,
      },
      {
        title: 'Cyber Risk Assessment',
        description: 'Identify vulnerabilities in digital infrastructure and data handling.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: CyberRisk,
      },
      {
        title: 'Climate Risk Assessment',
        description: 'Evaluate exposure to physical and transition climate risks.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: ClimateRisk,
      },
      {
        title: 'ESG Scoring',
        description: 'Benchmark sustainability performance against peers.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: EsgScoring,
      },
      {
        title: 'Event Response',
        description: 'Provide real-time triggers and alerts when events impact vendor stability.',
        imgSrc: '/demo-module-image.png',
        link: '#',
        renderAnimation: NotificationOverlayWithLeftFade,
      },
    ],
    mainArticleSlug: 'enhancing-supply-chain-resilience',
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
                imgSrc: "/demo-module-image.png",
                link: "#",
            },
        ],
        mainArticleSlug: "redefining-commercial-lines-underwriting"
    },
 */
