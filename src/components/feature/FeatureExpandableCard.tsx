// FeatureCard.tsx (no framer-motion)

interface FeatureCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    details: string[];
    expanded: number | null;
    setExpanded: (id: number | null) => void;
}

export default function FeatureCard({
    id,
    title,
    description,
    image,
    details,
    expanded,
    setExpanded,
}: FeatureCardProps) {
    const isExpanded = expanded === id;

    const toggle = () => setExpanded(isExpanded ? null : id);
    const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    };

    return (
        <div
            onClick={toggle}
            onKeyDown={onKey}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            className={`relative cursor-pointer rounded-2xl p-6 shadow-md bg-white border
        ${isExpanded ? "sm:col-span-2 lg:col-span-2 row-span-2" : ""}`}
        >
            <div>
                <img src={image} alt={title} className="h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>

            {isExpanded && (
                <div className="mt-6 space-y-3">
                    {details.map((point, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-700">
                            ✅ <span>{point}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



/*
import { motion, AnimatePresence } from "framer-motion";

interface FeatureCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    details: string[];
    expanded: number | null;
    setExpanded: (id: number | null) => void;
}

export default function FeatureCard({
    id,
    title,
    description,
    image,
    details,
    expanded,
    setExpanded,
}: FeatureCardProps) {
    const isExpanded = expanded === id;

    return (
        <motion.div
            layout
            onClick={() => setExpanded(isExpanded ? null : id)}  // 👈 toggle on click
            className={`relative cursor-pointer rounded-2xl p-6 shadow-md bg-white border transition-all duration-300 ${isExpanded ? "sm:col-span-2 lg:col-span-2 row-span-2" : ""
                }`}
        >
            <motion.div layout>
                <img src={image} alt={title} className="h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 2 }}       // smaller slide
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }} // quicker & smoother
                        className="mt-6 space-y-3"
                    >
                        {details.map((point, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-700">
                                ✅ <span>{point}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}
*/