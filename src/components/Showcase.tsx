import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MinimalHighlightCarousel.tsx
 * --------------------------------
 * Tiny, dependency-light React + TypeScript component that
 * - Cycles through images (autoplay optional)
 * - Crossfades slides with Framer Motion
 * - Shows an animated highlight box + pointer when `highlight` is present
 * - Minimal controls (prev/next + dots)
 *
 * Requirements:
 *  - framer-motion installed
 *  - Tailwind CSS optional (used for small layout classes)
 *
 * Usage:
 * <MinimalHighlightCarousel
 *   images={[{src: '/img/1.png', title: 'Step 1', highlight: {x:50,y:40,w:120,h:60}}, ...]}
 *   autoplay={true}
 *   interval={3500}
 * />
 */

type Highlight = { x: number; y: number; w: number; h: number } | null;

type Slide = {
    src: string;
    alt?: string;
    title?: string;
    highlight?: Highlight;
};

export default function MinimalHighlightCarousel({
    images = [],
    autoplay = true,
    interval = 3500,
}: {
    images: Slide[];
    autoplay?: boolean;
    interval?: number;
}) {
    const [index, setIndex] = useState(0);
    const count = images.length;

    useEffect(() => {
        if (!autoplay || count <= 1) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % count), interval);
        return () => clearInterval(t);
    }, [autoplay, count, interval]);

    const prev = () => setIndex((i) => (i - 1 + count) % count);
    const next = () => setIndex((i) => (i + 1) % count);

    const current = images[index] || { src: '', alt: '', title: '' };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative bg-gray-50 rounded-md overflow-hidden shadow-sm">
                <div className="aspect-[16/9] w-full relative">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current.src + index}
                            src={current.src}
                            alt={current.alt || current.title || `slide-${index + 1}`}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.55 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            draggable={false}
                        />
                    </AnimatePresence>

                    {current.highlight && (
                        <Highlight key={`hl-${index}`} hl={current.highlight} />
                    )}

                    {/* simple overlay title */}
                    {current.title && (
                        <div className="absolute left-4 bottom-4 bg-black/50 text-white text-sm px-3 py-1 rounded">{current.title}</div>
                    )}
                </div>

                {/* controls */}
                <div className="absolute inset-0 pointer-events-none">
                    <button
                        onClick={prev}
                        className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded shadow"
                        aria-label="Previous"
                        style={{ transform: 'translateY(-50%)' }}
                    >
                        ‹
                    </button>

                    <button
                        onClick={next}
                        className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded shadow"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>

                {/* dots */}
                <div className="p-3 flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-2 h-2 rounded-full ${i === index ? 'bg-slate-800' : 'bg-slate-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Highlight({ hl }: { hl: Highlight }) {
    if (!hl) return null;

    // This is intentionally naive: the hl coords are assumed to be in a 400x225 box (16:9).
    // For production, compute scale from real image natural size -> rendered size.
    const baseW = 400;
    const baseH = 225;

    const left = (hl.x / baseW) * 100;
    const top = (hl.y / baseH) * 100;
    const w = (hl.w / baseW) * 100;
    const h = (hl.h / baseH) * 100;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: [1, 1.02, 1] }}
                transition={{ duration: 0.8 }}
                className="absolute rounded-md border-2 border-white/90"
                style={{ left: `${left}%`, top: `${top}%`, width: `${w}%`, height: `${h}%` }}
            />

            <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="absolute"
                style={{ left: `${Math.min(left + w + 2, 96)}%`, top: `${top + h / 2}%` }}
            >
                <motion.div animate={{ x: [0, -6, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">➤</div>
                </motion.div>
            </motion.div>
        </>
    );
}
