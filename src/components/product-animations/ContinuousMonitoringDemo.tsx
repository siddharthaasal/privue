'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedList } from '../ui/animated-list';
import clsx from 'clsx';
import { AlertCircle, AlertTriangle, Info as InfoIcon } from 'lucide-react';

type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  target: { left: string; top: string };
  landOnLeft?: boolean;
  start?: { left: string; top: string };
  variant?: 'info' | 'warning' | 'danger';
};

const demoNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title:
      '1 severe compliance violations detected requiring immediate attention. \nPotential regulatory impact and high-risk exposure.',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '15%' },
    variant: 'danger',
    landOnLeft: true,
  },
  {
    id: 'n2',
    title:
      '1 moderate risk factors identified. Review vendor documentation and update risk assessments',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '25%' },
    variant: 'warning',
    landOnLeft: true,
  },
  {
    id: 'n3',
    title: '2 new updates to review including policy changes and vendor performance metrics.',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '35%' },
    variant: 'info',
    landOnLeft: true,
  },
];

export default function NotificationOverlayWithLeftFade({
  bgUrl = '/module-animations/cont-mon.png',
  items = demoNotifications,
  holdBeforeMove = 1100,
}: {
  bgUrl?: string;
  items?: NotificationItem[];
  revealDelay?: number;
  holdBeforeMove?: number;
}) {
  const [index, setIndex] = useState(0); // index of next notification to process
  const [revealedId, setRevealedId] = useState<string | null>(null); // current pop at top-center (single)
  const [movingId, setMovingId] = useState<string | null>(null); // currently animating
  const [landedIds, setLandedIds] = useState<string[]>([]); // static landed cards (non-left)
  const [landedLeftIds, setLandedLeftIds] = useState<string[]>([]); // static left-landed cards (stay there)
  const reduce = useReducedMotion();
  const [leftFade] = useState(false);

  // scale targets for movement (make shrink more pronounced)
  const targetScaleLeft = 0.35;
  const targetScaleOther = 0.35;

  // start the process: reveal the first item after a tiny delay
  useEffect(() => {
    if (!items || items.length === 0) return;
    const t = window.setTimeout(() => {
      setRevealedId(items[0].id);
    }, 120);
    return () => clearTimeout(t);
  }, [items]);

  // When revealedId is set, we hold for `holdBeforeMove` then start moving
  useEffect(() => {
    if (!revealedId) return;
    if (reduce) {
      // reduced-motion: directly mark landed / left-landed and proceed
      const it = items.find((x) => x.id === revealedId);
      if (!it) return;
      if (it.landOnLeft) {
        setLandedLeftIds((p) => [...p, revealedId]);
      } else {
        setLandedIds((p) => [...p, revealedId]);
      }
      setRevealedId(null);
      setIndex((i) => {
        const next = i + 1;
        if (next < items.length) {
          setTimeout(() => setRevealedId(items[next].id), 120);
        } else {
          // restart loop
          setTimeout(() => {
            setIndex(0);
            setLandedIds([]);
            setLandedLeftIds([]);
            setRevealedId(items[0].id);
          }, 400);
        }
        return next;
      });
      return;
    }

    const holdTimer = window.setTimeout(() => {
      // start moving
      setMovingId(revealedId);
      // remove pop element
      setRevealedId(null);
    }, holdBeforeMove);

    return () => clearTimeout(holdTimer);
  }, [revealedId, holdBeforeMove, reduce, index, items]);

  // helper when moving animation completes
  const onMoveComplete = (id: string) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;

    if (it.landOnLeft) {
      // add to left-landed list and keep it there
      setMovingId(null);
      setLandedLeftIds((p) => {
        // avoid duplicates
        if (p.includes(id)) return p;
        return [...p, id];
      });

      // small pause then reveal next
      setIndex((i) => {
        const next = i + 1;
        if (next < items.length) {
          setTimeout(() => setRevealedId(items[next].id), 220);
        } else {
          // loop: restart sequence
          setTimeout(() => {
            setIndex(0);
            setLandedIds([]);
            setLandedLeftIds([]);
            setRevealedId(items[0].id);
          }, 600);
        }
        return next;
      });
    } else {
      // normal landed card
      setMovingId(null);
      setLandedIds((p) => [...p, id]);

      // proceed to next (or loop)
      setIndex((i) => {
        const next = i + 1;
        if (next < items.length) {
          setTimeout(() => setRevealedId(items[next].id), 300);
        } else {
          // loop: restart sequence
          setTimeout(() => {
            setIndex(0);
            setLandedIds([]);
            setLandedLeftIds([]);
            setRevealedId(items[0].id);
          }, 600);
        }
        return next;
      });
    }
  };

  // card class: top-center pop is inline, moving/landed use fixed widths you had earlier
  const cardClassInline = (variant?: NotificationItem['variant']) =>
    clsx(
      'pointer-events-auto select-none rounded-lg p-2 shadow-lg ring-1 ring-black/20 inline-block',
      variant === 'danger' && 'bg-[#f5f5f5] text-red-700',
      variant === 'warning' && 'bg-[#f5f5f5] text-yellow-700',
      variant === 'info' && 'bg-[#f5f5f5] text-green-700',
    );

  const cardClassFixed = (variant?: NotificationItem['variant']) =>
    clsx(
      'pointer-events-auto select-none rounded-lg p-2 shadow-lg ring-1 ring-black/20',
      variant === 'danger' && 'bg-[#f5f5f5] text-gray-700',
      variant === 'warning' && 'bg-[#f5f5f5] text-yellow-700',
      variant === 'info' && 'bg-[#f5f5f5] text-green-700',
    );

  // movement transition: use tween (duration) for consistent slower timing, spring can be jittery with large shrink
  const movementDuration = 1.25; // seconds — slower
  const movementTransition = {
    type: 'tween' as const,
    duration: movementDuration,
    ease: [0.22, 0.9, 0.3, 1] as any,
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {/* Background — no blur */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl border border-gray-100 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')`,
          transform: 'scale(1.02)',
        }}
      />

      {/* left fade overlay (no blur) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: leftFade ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[34%]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01) 20%, transparent 60%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* content layer */}
      <div className="relative z-20 h-full p-6" />

      {/* notification overlay */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {/* TOP-CENTER pop (only one at a time) */}
        <div className="pointer-events-none absolute top-6 left-1/2 w-auto -translate-x-1/2">
          <AnimatedList className="items-start" delay={600}>
            {revealedId ? (
              <div key={revealedId} className="relative flex w-auto justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="pointer-events-auto"
                  style={{ transformOrigin: 'center top' }}
                >
                  {(() => {
                    const it = items.find((x) => x.id === revealedId)!;
                    return (
                      <div className={cardClassInline(it.variant) + ' w-[min(86vw,320px)] px-4'}>
                        <div className="flex items-start gap-1">
                          <div className="mt-1 flex-shrink-0">
                            {it.variant === 'danger' && (
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                            )}
                            {it.variant === 'warning' && (
                              <AlertCircle className="h-4 w-4 text-yellow-400" />
                            )}
                            {it.variant === 'info' && (
                              <InfoIcon className="h-4 w-4 text-green-400" />
                            )}
                          </div>

                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-gray-600">{it.title}</div>
                            {it.body && <div className="mt-1 text-xs text-white/80">{it.body}</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </div>
            ) : null}
          </AnimatedList>
        </div>

        {/* MOVING card (only one moves at a time in this logic) */}
        {movingId
          ? (() => {
            const it = items.find((x) => x.id === movingId)!;
            const targetScale = it.landOnLeft ? targetScaleLeft : targetScaleOther;
            return (
              <motion.div
                key={`moving-${it.id}`}
                initial={
                  reduce
                    ? {
                      opacity: 1,
                      scale: targetScale,
                      left: it.target.left,
                      top: it.target.top,
                      position: 'absolute',
                    }
                    : {
                      opacity: 1,
                      scale: 1,
                      left: '50%',
                      top: '6%',
                      position: 'absolute',
                    }
                }
                animate={
                  reduce
                    ? {}
                    : {
                      opacity: 1,
                      scale: targetScale,
                      left: it.target.left,
                      top: it.target.top,
                      position: 'absolute',
                    }
                }
                transition={movementTransition}
                onAnimationComplete={() => {
                  // finalize landing for moving card
                  onMoveComplete(it.id);
                }}
                className="absolute -translate-x-1/2"
                style={{ willChange: 'left, top, transform, opacity', zIndex: 40 }}
              >
                <div className={cardClassFixed(it.variant) + ' w-[320px] md:w-[360px]'}>
                  <div className="flex items-start gap-1">
                    <div className="mt-1 flex-shrink-0">
                      {it.variant === 'danger' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                      {it.variant === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                      {it.variant === 'info' && <InfoIcon className="h-4 w-4 text-green-400" />}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-600">{it.title}</div>
                      {it.body && <div className="mt-1 text-xs text-white/80">{it.body}</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()
          : null}

        {/* LANDED LEFT (stay permanently at shrunken scale) */}
        {landedLeftIds.map((id) => {
          const it = items.find((x) => x.id === id)!;
          // render at the target position (they will remain there) at the same reduced scale
          return (
            <motion.div
              key={`landed-left-${id}`}
              initial={{
                opacity: 0,
                scale: targetScaleLeft,           // start already shrunken
                left: it.target.left,             // keep same unit as target (e.g. "15%")
                top: it.target.top,
                position: 'absolute',
                x: 100,                           // offset via transform, avoids unit mix
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: targetScaleLeft,           // stay shrunken
                left: it.target.left,
                top: it.target.top,
                position: 'absolute',
                x: 100,                             // animate translate back to 0 so it "lands" at left/top
                y: 30,
              }}
              transition={{ duration: 0.36, type: 'tween' }}
              className="absolute w-[min(86vw,320px)] max-w-[320px] -translate-x-1/2 break-words whitespace-pre-wrap md:max-w-[360px]"
              style={{ willChange: 'transform, opacity', zIndex: 30, transformOrigin: 'left top' }}
            >
              <div
                className={
                  cardClassFixed(it.variant) +
                  ' w-[min(86vw,320px)] max-w-[320px] break-words whitespace-pre-wrap md:max-w-[360px]'
                }
                // keep inner content crisp
                style={{ transform: `scale(1)`, transformOrigin: 'left top' }}
              >
                <div className="flex items-start gap-1">
                  <div className="mt-1 flex-shrink-0">
                    {it.variant === 'danger' && <AlertTriangle className="h-6 w-6 text-red-400" />}
                    {it.variant === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                    {it.variant === 'info' && <InfoIcon className="h-4 w-4 text-green-400" />}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-normal text-gray-700">{it.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}


        {/* LANDED (non-left) — gentle pop */}
        {landedIds.map((id) => {
          const it = items.find((x) => x.id === id)!;
          return (
            <motion.div
              key={`landed-${id}`}
              initial={{
                opacity: 0,
                scale: 0.94,
                position: 'absolute',
                left: it.target.left,
                top: it.target.top,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                position: 'absolute',
                left: it.target.left,
                top: it.target.top,
              }}
              transition={{ duration: 0.45, type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute w-[min(86vw,320px)] max-w-[320px] -translate-x-1/2 break-words whitespace-pre-wrap md:max-w-[360px]"
              style={{ willChange: 'transform, opacity', zIndex: 30 }}
            >
              <div
                className={
                  cardClassFixed(it.variant) +
                  ' w-[min(86vw,320px)] max-w-[320px] break-words whitespace-pre-wrap md:max-w-[360px]'
                }
              >
                <div className="flex items-start gap-1">
                  <div className="mt-1 flex-shrink-0">
                    {it.variant === 'danger' && <AlertTriangle className="h-6 w-6 text-red-400" />}
                    {it.variant === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                    {it.variant === 'info' && <InfoIcon className="h-4 w-4 text-green-400" />}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-normal text-gray-700">{it.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
