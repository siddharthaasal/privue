// components/feature/FeaturedSolutions2.tsx

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function FeaturedSolutions() {
    const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
        null
    );
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setActive(false);
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>

            {/* Expanded Modal */}
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>

                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            {/* Image with overlayed text */}
                            <motion.div
                                layoutId={`image-${active.title}-${id}`}
                                className="relative w-full h-80"
                            >
                                <img
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-full object-cover object-top sm:rounded-t-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:rounded-t-3xl" />
                                <div className="absolute bottom-0 p-4">
                                    <motion.h3
                                        layoutId={`title-${active.title}-${id}`}
                                        className="font-semibold text-white text-lg"
                                    >
                                        {active.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${active.description}-${id}`}
                                        className="text-white/90 text-sm mt-1"
                                    >
                                        {active.description}
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* Expanded content */}
                            <div className="pt-4 relative px-4">
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-600 text-sm leading-relaxed h-40 md:h-fit pb-10 flex flex-col gap-3 overflow-auto dark:text-neutral-400"
                                >
                                    {typeof active.content === "function"
                                        ? active.content()
                                        : active.content}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            {/* Cards Grid */}
            <ul className="max-w-7xl px-4 mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={card.title}
                        onClick={() => setActive(card)}
                        className="p-0 flex flex-col rounded-xl cursor-pointer"
                    >
                        <motion.div
                            layoutId={`image-${card.title}-${id}`}
                            className="relative h-80 w-full"
                        >
                            <img
                                src={card.src}
                                alt={card.title}
                                className="h-full w-full rounded-lg object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-lg" />
                            <div className="absolute bottom-0 p-4">
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-semibold text-white text-base md:text-lg"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-white/90 text-sm mt-1"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => (
    <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-black"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </motion.svg>
);

// 🔑 Your items
const cards = [
    {
        title: "Automated Risk Analysis",
        description: "AI models that detect anomalies in real time",
        src: "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Identify outliers across millions of transactions</li>
                <li>Reduce fraud exposure with predictive scoring</li>
                <li>Stay compliant with evolving regulations</li>
            </ul>
        ),
    },
    {
        title: "Supply Chain Forecasting",
        description: "Data-driven demand and inventory predictions",
        src: "https://images.unsplash.com/photo-1634638022845-1ab614a94128?w=900&auto=format&fit=crop&q=60",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Anticipate disruptions with scenario modeling</li>
                <li>Optimize working capital with accurate forecasts</li>
                <li>Enhance supplier reliability and transparency</li>
            </ul>
        ),
    },
    {
        title: "Portfolio Optimization",
        description: "AI insights for smarter asset allocation",
        src: "https://images.unsplash.com/photo-1511883040705-6011fad9edfc?w=900&auto=format&fit=crop&q=60",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Balance risk and return with dynamic rebalancing</li>
                <li>Leverage alternative data for alpha generation</li>
                <li>Personalize strategies at scale</li>
            </ul>
        ),
    },
    {
        title: "Regulatory Intelligence",
        description: "Automated monitoring and compliance alerts",
        src: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=3132&auto=format&fit=crop",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Track regulatory changes across markets</li>
                <li>Flag risks before audits occur</li>
                <li>Streamline reporting and documentation</li>
            </ul>
        ),
    },
    {
        title: "Customer Insights",
        description: "AI-driven segmentation and personalization",
        src: "https://images.unsplash.com/photo-1726137569966-a7354383e2ae?q=80&w=987&auto=format&fit=crop",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Predict churn with behavioral models</li>
                <li>Tailor recommendations in real time</li>
                <li>Boost engagement with targeted offers</li>
            </ul>
        ),
    },
    {
        title: "Cash Flow Intelligence",
        description: "Visibility into liquidity and forecasting",
        src: "https://images.unsplash.com/photo-1754887966362-952236591654?w=900&auto=format&fit=crop",
        ctaText: "Explore",
        ctaLink: "#",
        content: () => (
            <ul className="list-disc pl-5 space-y-2">
                <li>Project inflows and outflows with confidence</li>
                <li>Spot shortfalls before they happen</li>
                <li>Optimize treasury operations with AI</li>
            </ul>
        ),
    },
];
