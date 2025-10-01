import Layout from "@/components/Layout";
import { Cpu, Zap } from "lucide-react";
// import TwoOrbit from "@/components/about/TwoOrbit";
import ChatAnimation from "@/components/product-animations/ChatAnimation";
import useHashScroll from "@/hooks/useHashScroll";

export default function ProductPage() {
    useHashScroll({ offset: 80 });
    return (
        <Layout>
            <div className="py-28 space-y-28">
                <section id="api" className="scroll-m-20">
                    <SectionAPIs />
                </section>
                <section id="workbench" className="scroll-m-20">
                    <SectionWorkspace />
                </section>
                <section id="application" className="scroll-m-20">
                    <SectionPlatform />
                </section>
            </div>
        </Layout>
    );
}

/* -------------------- Section 1 -------------------- */
function SectionAPIs() {
    return (
        <section className="font-open-sans relative mx-auto px-8 flex items-center">
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">APIs— </span>modular building blocks for risk &amp; data workflows
                </h2>

                <div className="relative flex flex-col md:flex-row items-start gap-8">
                    {/* Left: Text */}
                    <div className="relative z-10 space-y-4 md:w-2/3">
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
                            stitch them together: Data Acquisition → Document Parsing → Risk Scoring → Decisioning. Deploy quickly, scale securely, and maintain
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

                    {/* Right: Image (AboutSection style) */}
                    <div className="md:w-1/2 w-full relative mt-8 md:mt-6">
                        <div className="md:absolute md:-inset-y-12 md:inset-x-0">
                            <div
                                className="
                  relative rounded-2xl overflow-hidden
                  [mask-image:linear-gradient(to_right,transparent,var(--color-privue-900)_10%,var(--color-privue-900)_100%,transparent)]
                  [mask-repeat:no-repeat] [mask-size:100%_100%]
                  [--webkit-mask-image:linear-gradient(to_right,transparent,var(--color-privue-900)_10%,var(--color-privue-900)_90%,transparent)]
                  [--webkit-mask-repeat:no-repeat] [--webkit-mask-size:100%_100%]
                "
                            >
                                <img
                                    src="/workflow-illustration.png"
                                    alt="workflow illustration"
                                    className="w-full h-auto object-cover rounded-[12px] shadow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* -------------------- Section 2 -------------------- */
function SectionWorkspace() {
    return (
        <section className="font-open-sans relative mx-auto px-8 bg-muted/30">
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">Workbench— </span>
                    conversation workspace to ask, explore, and publish in one place
                </h2>

                {/* note: md:items-stretch so columns equalize height on md+; mobile keeps centered layout */}
                <div className="flex flex-col md:flex-row md:items-stretch items-center gap-8">
                    {/* Img Left - this column will stretch to match the text column on md+ */}
                    <div className="md:w-1/2 flex justify-center order-2 md:order-1">
                        <div className="w-full h-full flex items-center">
                            <ChatAnimation className="w-full h-full" />
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
        <section className="font-open-sans relative mx-auto px-8">
            <div className="w-full space-y-8 px-6 md:space-y-12">
                <h2 className="max-w-3xl text-3xl font-medium leading-tight lg:text-3xl">
                    <span className="text-privue-900">Application— </span>platform to manage data, dashboards, and reporting
                </h2>

                {/* Use items-stretch so both columns match height */}
                <div className="flex flex-col md:flex-row  gap-8">
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

                    {/* Img Right -> ImageCarousel (fills left column height) */}
                    <div className="md:w-1/2 flex items-start">
                        {/* Make this wrapper fill the height of the left column */}
                        <div className="relative w-full h-full">
                            {/* Give the carousel a fixed min-height for very short content (optional).
                  Remove the inline style if you want purely auto height from left column. */}
                            <div className="relative w-full h-full">
                                <ImageCarousel
                                    images={[
                                        "/module-animations/ss1.png",
                                        "/module-animations/ss2.png",
                                        "/module-animations/ss3.png",
                                        "/module-animations/ss4.png",
                                    ]}
                                    interval={2500}
                                    imgClass="rounded-[12px] shadow"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
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

// function IconImg({ src, alt = "" }: { src: string; alt?: string }) {
//     return (
//         <img
//             src={src}
//             alt={alt}
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 borderRadius: 6,
//             }}
//         />
//     );
// }

import React, { useEffect, useState, useRef } from "react";

type ImageCarouselProps = {
    images: string[]; // array of image srcs
    interval?: number; // ms between slides
    className?: string; // applied to outer wrapper
    imgClass?: string; // applied to each <img>
    showDots?: boolean;
};

export function ImageCarousel({
    images,
    interval = 4000,
    className = "",
    imgClass = "rounded-[12px] shadow",
    showDots = true,
}: ImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        if (paused) return;

        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval);

        return () => clearInterval(id);
    }, [images.length, interval, paused]);

    if (!images || images.length === 0) return null;

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* stacked images (crossfade) */}
            {images.map((src, i) => (
                <img
                    key={src + i}
                    src={src}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-contain items-start transition-opacity duration-700 ease-in-out
            ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"} ${imgClass}`}
                    loading="lazy"
                    aria-hidden="true"
                    // prevent drag (optional)
                    draggable={false}
                />
            ))}

            {/* optional dot indicators */}
            {showDots && images.length > 1 && (
                <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 rounded-full transition-opacity ${i === index ? "opacity-100" : "opacity-60"
                                } bg-white`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
