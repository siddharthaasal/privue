// components/feature/FeatureExpandableCard.tsx
import { motion, useReducedMotion } from 'framer-motion';

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
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ExpandingCard({
  item,
  isLastInRow,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: ExpandingCardProps) {
  const reduce = useReducedMotion();
  const hovered = isHovered; // alias for animation logic
  const WIDTH_MS = 300; // match CSS width transition

  return (
    <article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={[
        'group/card relative h-64 overflow-hidden rounded-lg md:h-80',
        'border border-black/10 bg-white shadow-sm transition-all',
        // choose ONE col-span
        isHovered ? 'md:col-span-6' : isAnyHovered ? 'md:col-span-3' : 'md:col-span-4',
        // shift last card left when expanded
        isHovered && isLastInRow ? 'md:col-start-7' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a href="/solution" className="absolute inset-0 block">
        <div className="absolute inset-0 flex h-full w-full">
          {/* LEFT */}
          <div
            className={[
              'relative min-w-0 overflow-hidden', // prevents text/img reflow
              'flex-shrink-0 flex-grow-0', // only basis changes
              // animate basis instead of width
              'transition-[width] duration-300 ease-in will-change-auto',
              // "transition-[flex-basis] duration-300 ease-out will-change-[flex-basis]",
              // full when not hovered, half when hovered
              // isHovered ? "basis-1/2 delay-500" : "basis-full delay-0",
              isHovered ? 'basis-1/2' : 'basis-full',
            ].join(' ')}
          >
            <img
              src={item.img}
              alt={item.heading}
              className="h-full w-full object-cover transition-none"
            />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-base font-medium text-white md:text-lg">{item.heading}</h3>
                <p className="text-sm text-white/90">{item.sub}</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden w-0 transition-[width] duration-100 ease-out will-change-[width] group-hover/card:w-1/2 md:flex">
            <motion.section
              initial={false}
              // keep it invisible until width has finished growing
              animate={reduce ? { opacity: 1 } : hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      ease: [0.42, 0, 0.58, 1],
                      duration: 0.5,
                      // enter slightly after width starts growing
                      delay: hovered ? WIDTH_MS / 3000 : 0,
                    }
              }
              className={[
                'h-full w-full bg-white/70 backdrop-blur-sm',
                // prevent accidental hover/focus while hidden
                !hovered && !reduce ? 'pointer-events-none' : '',
              ].join(' ')}
            >
              <motion.div
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full flex-col justify-between p-6 text-neutral-900"
              >
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.1, ease: 'easeOut' }}
                  className="text-xs font-semibold tracking-wide text-neutral-700 uppercase"
                >
                  Highlights
                </motion.div>

                <ul className="mt-3 list-none space-y-2">
                  {item.details.map((d, i) => (
                    <motion.li
                      key={i}
                      initial={reduce ? undefined : { opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.26, ease: 'easeOut' }}
                      className="relative pl-6 text-sm leading-relaxed"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute top-[0.55rem] left-0 h-4 w-4 text-green-600"
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.1, ease: 'easeOut' }}
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
