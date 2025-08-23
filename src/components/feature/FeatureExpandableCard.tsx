import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type Item = {
    id: number;
    img: string;
    heading: string;
    sub: string;
    details: string[];
};

export type ExpandingCardProps = {
    item: Item;
    isLastInRow: boolean;
};

export default function ExpandingCard({ item, isLastInRow }: ExpandingCardProps) {
    const [hovered, setHovered] = useState(false);
    const reduce = useReducedMotion();

    return (
        <article
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={[
                // chrome
                "relative h-64 md:h-80 overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm hover:shadow-md",
                // row sizing (instant; minimal motion)
                "md:col-span-4 md:[transition:all_.001s_linear]",
                "group/card md:group-hover/row:col-span-3 md:hover:col-span-6",
                isLastInRow ? "md:hover:col-start-7" : "",
            ].join(" ")}
        >
            <a href="/solution" className="absolute inset-0 block">
                <div className="absolute inset-0 flex h-full w-full">
                    {/* LEFT: image & overlay (width via CSS only) */}
                    <div
                        className={[
                            "relative flex-shrink-0 w-full",
                            "md:w-full group-hover/card:w-1/2 transition-normal duration-300 ease-out",
                        ].join(" ")}
                    >
                        <img
                            src={item.img}
                            alt=""
                            className={[
                                "h-full w-full object-cover",
                                "grayscale md:group-hover/row:grayscale",
                                hovered ? "!grayscale-0" : "",
                                "transition-[filter] duration-180",
                            ].join(" ")}
                        />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <h3 className="text-base font-medium text-white md:text-lg">
                                    {item.heading}
                                </h3>
                                <p className="text-sm text-white/90">{item.sub}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: details (fade only; width via CSS) */}
                    <div className="hidden md:flex w-0 group-hover/card:w-1/2 transition-[width] duration-300 ease-out">
                        <motion.section
                            initial={false}
                            animate={{ opacity: (reduce ? 1 : undefined) }}
                            // Delay the overall panel a touch so width change finishes first
                            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 0.08, 0.18, 1], delay: 0.08 }}
                            className="w-full h-full bg-white/70 backdrop-blur-sm"
                            // Use variants + stagger for children
                            variants={{
                                show: {
                                    transition: reduce
                                        ? { duration: 0 }
                                        : { staggerChildren: 0.04, delayChildren: 0.14 }
                                }
                            }}
                            // Toggle variants with hover state using CSS :has poly via class
                            // We'll just drive it with opacity; children will still stagger in
                            onUpdate={() => { }}
                        >
                            <motion.div
                                initial={reduce ? undefined : { opacity: 0 }}
                                animate={reduce ? { opacity: 1 } : { opacity: 1 }}
                                className="flex h-full flex-col justify-between p-6 text-neutral-900"
                            >
                                <motion.div
                                    initial={reduce ? undefined : { opacity: 0, y: 2 }}
                                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    transition={reduce ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
                                    className="text-xs font-semibold uppercase tracking-wide text-neutral-700"
                                >
                                    Highlights
                                </motion.div>

                                <ul className="mt-3 space-y-2 list-none">
                                    {item.details.map((d, i) => (
                                        <motion.li
                                            key={i}
                                            initial={reduce ? undefined : { opacity: 0, y: 2 }}
                                            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                            transition={reduce ? { duration: 0 } : { duration: 0.26, ease: "easeOut" }}
                                            className="relative pl-6 text-sm leading-relaxed"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="absolute left-0 top-[0.55rem] h-4 w-4 text-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            {d}
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.div
                                    initial={reduce ? undefined : { opacity: 0, y: 1 }}
                                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    transition={reduce ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
                                    className="mt-5"
                                >
                                    <span className="text-xs font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-800">
                                        Learn more
                                    </span>
                                </motion.div>
                            </motion.div>
                        </motion.section>
                    </div>
                </div>
            </a>
        </article>
    );
}
