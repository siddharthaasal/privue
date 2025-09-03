import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabContent = {
    title: string;
    description: string;
    imgSrc: string;
    link: string;
};

interface ModuleListingProps {
    items: TabContent[];
    defaultIndex?: number;
}

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

export default function ModuleListing({
    items,
    defaultIndex = 0,
}: ModuleListingProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const activeItem = items[activeIndex];

    return (
        <section className="w-full border-t border-b border-gray-200">
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-6 text-center border-b border-gray-200">
                {items.map((item, index) => (
                    <button
                        key={slugify(item.title)}
                        onClick={() => setActiveIndex(index)}
                        className={`cursor-pointer py-8 px-2 text-base font-medium border-r-[0.5px] ${activeIndex === index
                            ? "border-b-2 border-b-black text-black"
                            : "border-b-[0.5px] border-gray-200 text-gray-500 hover:text-black"
                            }`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-12 py-24">
                {/* Left side */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeItem.title + "-text"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-left"
                    >
                        <h2 className="text-lg font-medium mb-4">{activeItem.title}</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            {activeItem.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Right side → Image container */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeItem.title + "-image"}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center border border-gray-200 rounded-xl bg-gray-50 p-8 col-span-2"
                    >
                        <img
                            src={activeItem.imgSrc}
                            alt={activeItem.title}
                            className="min-h-72 object-contain"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
