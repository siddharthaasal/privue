import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  return text.toLowerCase().replace(/\s+/g, '-');
}

export default function ModuleListing({ items, defaultIndex = 0 }: ModuleListingProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeItem = items[activeIndex];

  return (
    <section className="w-full border-t border-b border-gray-200">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {items.map((item, index) => (
          <button
            key={slugify(item.title)}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 cursor-pointer border-r border-gray-200 px-4 py-6 text-base font-medium whitespace-nowrap ${
              activeIndex === index
                ? 'border-b-2 border-b-black text-black'
                : 'border-b-[0.5px] text-gray-500 hover:text-black'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-8 px-12 py-24 lg:grid-cols-3">
        {/* Left side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.title + '-text'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="justify-left flex flex-col"
          >
            <h2 className="mb-4 text-lg font-medium">{activeItem.title}</h2>
            <p className="mb-6 text-sm text-gray-600">{activeItem.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Right side → Image container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.title + '-image'}
            // initial={{ opacity: 0, scale: 1.0 }}
            // animate={{ opacity: 1, scale: 0.95 }}
            // exit={{ opacity: 0, scale: 0.90 }}
            // transition={{ duration: 0.25 }}
            className="col-span-2 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-8"
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
