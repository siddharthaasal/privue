import { motion, useReducedMotion } from 'framer-motion';

export type Item = {
  id: number;
  img: string;
  heading: string;
  sub: string;
  details: string[];
  link?: string; // ✅ optional link
};

interface ExpandingCardProps {
  item: Item;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function OverlayCard({
  item,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: ExpandingCardProps) {
  const reduce = useReducedMotion();

  return (
    <article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="relative h-64 overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm md:h-80"
    >
      {/* Base card with image + text */}
      <div className="relative h-full w-full">
        <img src={item.img} alt={item.heading} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-base font-medium text-white md:text-lg">{item.heading}</h3>
          <p className="text-sm text-white/90">{item.sub}</p>
        </div>
      </div>

      {/* Overlay content sliding up */}
      <motion.div
        initial={false}
        animate={
          reduce
            ? { y: 0, opacity: 1 }
            : isHovered
              ? { y: 0, opacity: 1 }
              : { y: '100%', opacity: 0 }
        }
        transition={reduce ? { duration: 0 } : { ease: [0.42, 0, 0.58, 1], duration: 0.4 }}
        className="absolute inset-0 flex flex-col justify-between p-6 text-neutral-100"
      >
        {/* Dark translucent overlay behind content */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Foreground content */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            {/* npm ru-sm text-neutral-300">{item.sub}</p> */}

            <div className="mt-4 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
              Highlights
            </div>
            <ul className="mt-3 list-none space-y-2">
              {item.details.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-neutral-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="text-privue-700 mt-1 h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {item.link && (
            <a
              href={item.link}
              className="text-privue-700 hover:text-privue-500 decoration-privue-700 mt-4 inline-block text-sm font-medium underline underline-offset-4"
            >
              Learn more →
            </a>
          )}
        </div>
      </motion.div>
    </article>
  );
}
