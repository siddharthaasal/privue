import Layout from "@/components/Layout";
import { Cpu, Zap } from "lucide-react";
import TwoOrbit from "@/components/about/TwoOrbit";
import ChatAnimation from "@/components/product-animations/ChatAnimation";

export default function ProductPage() {
    return (
        <Layout>
            <div className="py-28 space-y-28">
                <SectionAPIs />
                <SectionWorkspace />
                <SectionPlatform />
            </div>
        </Layout>
    );
}

/* -------------------- Section 1 -------------------- */
function SectionAPIs() {
    return (
        <section
            id="apis"
            className="font-open-sans relative mx-auto px-8 flex items-center"
        >
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">APIs</span> — modular building blocks for risk &amp; data workflows
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Text Left */}
                    <div className="space-y-4 md:w-2/3">
                        <p className="text-base">
                            Our APIs let you pick the exact capabilities you need and plug them
                            into your existing systems. Ingest data from multiple public and
                            premium sources (including government registries), extract entities
                            from internal documents and files, and evaluate counterparties on
                            multiple risk attributes—all through clean, well-documented
                            endpoints.
                        </p>
                        <p className="text-base">
                            Integrate directly with your workflow tools such as Salesforce, SAP,
                            core banking, or case management. Use the modules independently or
                            stitch them together: data acquisition → document parsing → risk
                            scoring → decisioning. Deploy quickly, scale securely, and maintain
                            full control of your customer experience.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <Feature
                                icon={<Cpu className="h-4 w-4" />}
                                title="Plug-and-play modules"
                                desc="Choose only the endpoints you need—ingestion, extraction, risk, scoring—and add more as you grow."
                            />
                            <Feature
                                icon={<Zap className="h-4 w-4" />}
                                title="Fits your stack"
                                desc="Native integration with Salesforce, SAP, and custom apps via REST APIs and webhooks."
                            />
                        </div>
                    </div>

                    {/* Img Right */}
                    <div className="md:w-1/3 flex justify-center">
                        <TwoOrbit
                            centerLogo="/privue-logo.png"
                            innerIcons={[
                                <IconImg key="i1" src="/icons/workflow/excel.png" />,
                                <IconImg key="i2" src="/icons/workflow/postgre.png" />,
                                <IconImg key="i3" src="/icons/workflow/pdf-2.png" />,
                            ]}
                            outerIcons={[
                                <IconImg key="o1" src="/icons/workflow/gpt.png" />,
                                <IconImg key="o2" src="/icons/workflow/gemini.png" />,
                                <IconImg key="o3" src="/icons/workflow/claude.png" />,
                            ]}
                            innerConfig={{ radius: 80, iconSize: 40, duration: 10 }}
                            outerConfig={{ radius: 150, iconSize: 50, duration: 26, reverse: true }}
                            containerPadding={28}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------- Section 2 -------------------- */
function SectionWorkspace() {
    return (
        <section
            id="workspace"
            className="font-open-sans relative mx-auto px-8 flex items-center bg-muted/30"
        >
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">Conversation workspace</span> — ask, explore, and publish in one place
                </h2>

                {/* change items-center -> items-stretch so both columns match height */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Img Left */}
                    <div className="md:w-1/2 flex justify-center order-2 md:order-1 h-full">
                        {/* wrapper forces full height; ChatAnimation should fill this container */}
                        <div className="w-full h-full flex items-center">
                            <ChatAnimation />
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="space-y-4 md:w-1/2 order-1 md:order-2">
                        <p className="text-base">
                            Use a natural-language interface to query your data, model outputs,
                            and portfolio insights on demand. Ask a question, refine with
                            follow-ups, and compare scenarios without writing SQL or waiting on
                            a dashboard refresh.
                        </p>
                        <p className="text-base">
                            Right-click any response to drop narratives, tables, or charts
                            straight into a live report. Turn ad-hoc analysis into shareable
                            updates in seconds, keeping audit trails of prompts, filters, and
                            sources for governance.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <Feature
                                icon={<Cpu className="h-4 w-4" />}
                                title="Natural-language analysis"
                                desc="Query data and models conversationally; pivot, filter, and drill down with plain English."
                            />
                            <Feature
                                icon={<Zap className="h-4 w-4" />}
                                title="One-click publishing"
                                desc="Insert text, tables, or charts into live reports and presentations."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* -------------------- Section 3 -------------------- */
function SectionPlatform() {
    return (
        <section
            id="platform"
            className="font-open-sans relative mx-auto px-8 flex items-center"
        >
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">Platform —</span> manage data, dashboards, and reporting like Lego
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Text Left */}
                    <div className="space-y-4 md:w-1/2">
                        <p className="text-base">
                            The Platform is your control center when you do not have (or do not
                            want to maintain) internal systems. Centralize data onboarding,
                            quality checks, model configurations, user roles, and audit
                            logs—then monitor everything from an interactive dashboard.
                        </p>
                        <p className="text-base">
                            Arrange modular content blocks like Lego to assemble portals,
                            review screens, and reports. Set pre-fill rules so recurring
                            disclosures and future reports auto-generate with the latest data,
                            while exception workflows route items to the right teams.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <Feature
                                icon={<Cpu className="h-4 w-4" />}
                                title="All-in-one workspace"
                                desc="Govern data, users, models, and dashboards with built-in access controls and audit trails."
                            />
                            <Feature
                                icon={<Zap className="h-4 w-4" />}
                                title="Composable reporting"
                                desc="Drag-and-drop blocks with pre-fill rules that auto-create future reports."
                            />
                        </div>
                    </div>

                    {/* Img Right */}
                    <div className="md:w-1/2 flex justify-center">
                        <TwoOrbit
                            centerLogo="/privue-logo.png"
                            innerIcons={[
                                <IconImg key="i1" src="/icons/workflow/dashboard.png" />,
                                <IconImg key="i2" src="/icons/workflow/data.png" />,
                            ]}
                            outerIcons={[
                                <IconImg key="o1" src="/icons/workflow/audit.png" />,
                                <IconImg key="o2" src="/icons/workflow/lego.png" />,
                            ]}
                            innerConfig={{ radius: 75, iconSize: 38, duration: 11 }}
                            outerConfig={{ radius: 145, iconSize: 46, duration: 24, reverse: true }}
                            containerPadding={26}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------- Reusable Components -------------------- */
function Feature({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-sm font-medium">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{desc}</p>
        </div>
    );
}

function IconImg({ src, alt = "" }: { src: string; alt?: string }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 6,
            }}
        />
    );
}
