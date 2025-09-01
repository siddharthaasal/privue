import { AnimatePresence, motion } from "framer-motion";

export type Item = {
    id: number;
    img: string;
    heading: string;
    sub: string;
    details: string[];
};

interface ExpandingCardProps {
    item: Item;
    isLastInRow: boolean;
    isActive: boolean;
    isAnyActive: boolean;
    onClick: () => void;
}

export default function ExpandingCard({
    item,
    isLastInRow,
    isActive,
    isAnyActive,
    onClick,
}: ExpandingCardProps) {
    return (
        <motion.article
            layoutId={`card-${item.id}`} // 🔑 shared layout container
            onClick={onClick}
            className={[
                "group/card relative h-64 md:h-80 overflow-hidden rounded-lg cursor-pointer",
                "border border-black/10 bg-white shadow-sm",
                isActive
                    ? "md:col-span-6"
                    : isAnyActive
                        ? "md:col-span-3"
                        : "md:col-span-4",
                isActive && isLastInRow ? "md:col-start-7" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            transition={{ layout: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
        >
            <motion.div layout className="absolute inset-0 flex h-full w-full">
                {/* LEFT (Image + Overlay) */}
                <motion.div
                    layoutId={`image-${item.id}`}
                    className="relative w-full overflow-hidden"
                >
                    <img
                        src={item.img}
                        alt={item.heading}
                        className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <motion.div
                            layoutId={`overlay-${item.id}`}
                            className="absolute inset-x-0 bottom-0 p-4"
                        >
                            <motion.div layoutId={`title-${item.id}`}>
                                <h3 className="font-medium text-white text-base md:text-lg">
                                    {item.heading}
                                </h3>
                            </motion.div>
                            <motion.div layoutId={`sub-${item.id}`}>
                                <p className="text-white/90 text-sm">{item.sub}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* RIGHT (Details) */}
                <AnimatePresence mode="sync">
                    {isActive && (
                        <motion.div
                            key="details"
                            layoutId={`details-${item.id}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="hidden md:flex w-full bg-white/80 backdrop-blur-sm"
                        >
                            <div className="flex h-full flex-col justify-between p-6 text-neutral-900">
                                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
                                    Highlights
                                </div>
                                <ul className="mt-3 space-y-2 list-none">
                                    {item.details.map((d, i) => (
                                        <motion.li
                                            key={i}
                                            layoutId={`detail-${item.id}-${i}`}
                                            initial={{ opacity: 0, y: 2 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 2 }}
                                            transition={{ duration: 0.2, delay: 0.05 * i }}
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
                                <div className="mt-5">
                                    <span className="text-xs font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-800">
                                        Learn more
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.article>
    );
}
