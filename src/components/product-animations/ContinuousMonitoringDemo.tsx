'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedList } from '../ui/animated-list'
import clsx from 'clsx'
import { AlertCircle, AlertTriangle, Info as InfoIcon } from 'lucide-react'

type NotificationItem = {
  id: string
  title: string
  body?: string
  target: { left: string; top: string }
  landOnLeft?: boolean
  start?: { left: string; top: string }
  variant?: 'info' | 'warning' | 'danger'
}

const demoNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: '1 severe compliance violations detected requiring immediate attention. \nPotential regulatory impact and high-risk exposure.',
    // body: 'Immediate attention required',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '15%' },
    variant: 'danger',
    landOnLeft: true,
  },
  {
    id: 'n2',
    title: '1 moderate risk factors identified. Review vendor documentation and update risk assessments',
    // body: '2 items to review',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '25%' },
    variant: 'warning',
    landOnLeft: true,
  },
  {
    id: 'n3',
    title: '2 new updates to review including policy changes and vendor performance metrics.',
    // body: 'Review vendor docs',
    start: { left: '50%', top: '15%' },
    target: { left: '15%', top: '35%' },
    variant: 'info',
    landOnLeft: true,
  },
]

export default function NotificationOverlayWithLeftFade({
  // bgUrl = '/t.png',
  bgUrl = '/module-animations/cont-monitoring-dashboard-light.png',
  items = demoNotifications,
  // revealDelay = 900, // unused for sequencing here but kept for compatibility
  holdBeforeMove = 1100, // how long top-center pops stays before moving
}: {
  bgUrl?: string
  items?: NotificationItem[]
  revealDelay?: number
  holdBeforeMove?: number
}) {
  const [index, setIndex] = useState(0) // index of next notification to process
  const [revealedId, setRevealedId] = useState<string | null>(null) // current pop at top-center (single)
  const [movingId, setMovingId] = useState<string | null>(null) // currently animating
  const [landedIds, setLandedIds] = useState<string[]>([]) // static landed cards (non-left)
  const [blendedIds, setBlendedIds] = useState<string[]>([]) // currently blending (left) — kept for backward compatibility
  const reduce = useReducedMotion()
  const [leftFade, setLeftFade] = useState(false)
  const blendTimeoutRef = useRef<number | null>(null)
  const [isBlending, setIsBlending] = useState(false)

  // scale targets for movement (make shrink more pronounced)
  const targetScaleLeft = 0.35
  const targetScaleOther = 0.35

  // start the process: reveal the first item after a tiny delay
  useEffect(() => {
    if (!items || items.length === 0) return
    const t = window.setTimeout(() => {
      setRevealedId(items[0].id)
    }, 120)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  // When revealedId is set, we hold for `holdBeforeMove` then start moving
  useEffect(() => {
    if (!revealedId) return
    if (reduce) {
      // skip hold/move for reduced-motion: directly mark landed/blended and proceed
      const it = items.find((x) => x.id === revealedId)
      if (!it) return
      if (it.landOnLeft) {
        // simulate blend then proceed
        setBlendedIds((p) => [...p, revealedId])
        const tid = window.setTimeout(() => {
          setBlendedIds((p) => p.filter((id) => id !== revealedId))
          setRevealedId(null)
          setIndex((i) => Math.min(i + 1, items.length))
          if (index + 1 < items.length) {
            setTimeout(() => setRevealedId(items[index + 1].id), 120)
          } else {
            // restart loop
            setTimeout(() => {
              setIndex(0)
              setLandedIds([])
              setRevealedId(items[0].id)
            }, 400)
          }
        }, 700)
        return () => clearTimeout(tid)
      } else {
        setLandedIds((p) => [...p, revealedId])
        setRevealedId(null)
        setIndex((i) => Math.min(i + 1, items.length))
        if (index + 1 < items.length) {
          const tid = window.setTimeout(() => setRevealedId(items[index + 1].id), 220)
          return () => clearTimeout(tid)
        } else {
          // restart loop
          const tid = window.setTimeout(() => {
            setIndex(0)
            setLandedIds([])
            setRevealedId(items[0].id)
          }, 400)
          return () => clearTimeout(tid)
        }
      }
    }

    const holdTimer = window.setTimeout(() => {
      // start moving
      setMovingId(revealedId)
      // remove pop element
      setRevealedId(null)
    }, holdBeforeMove)

    return () => clearTimeout(holdTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealedId, holdBeforeMove, reduce, index, items])

  // helper when moving animation completes
  const onMoveComplete = (id: string) => {
    const it = items.find((x) => x.id === id)
    if (!it) return

    if (it.landOnLeft) {
      // Start blending on the same moving element (do NOT clear movingId)
      setIsBlending(true)
      setLeftFade(true)

      // After blend duration, remove the moving element and advance to next
      const blendDur = 1000
      if (blendTimeoutRef.current) window.clearTimeout(blendTimeoutRef.current)
      blendTimeoutRef.current = window.setTimeout(() => {
        setIsBlending(false)
        setMovingId(null)
        setLeftFade(false)

        setIndex((i) => {
          const next = i + 1
          if (next < items.length) {
            setTimeout(() => setRevealedId(items[next].id), 220)
          } else {
            // loop: restart sequence
            setTimeout(() => {
              setIndex(0)
              setLandedIds([])
              setRevealedId(items[0].id)
            }, 600)
          }
          return next
        })
      }, blendDur)
    } else {
      // normal landed card
      setMovingId(null)
      setLandedIds((p) => [...p, id])

      // proceed to next (or loop)
      setIndex((i) => {
        const next = i + 1
        if (next < items.length) {
          setTimeout(() => setRevealedId(items[next].id), 300)
        } else {
          // loop: restart sequence
          setTimeout(() => {
            setIndex(0)
            setLandedIds([])
            setRevealedId(items[0].id)
          }, 600)
        }
        return next
      })
    }
  }

  // cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (blendTimeoutRef.current) window.clearTimeout(blendTimeoutRef.current)
    }
  }, [])

  // card class: top-center pop is inline, moving/landed use fixed widths you had earlier
  const cardClassInline = (variant?: NotificationItem['variant']) =>
    clsx(
      'pointer-events-auto select-none rounded-lg p-2 shadow-lg ring-1 ring-black/20 inline-block',
      variant === 'danger' && 'bg-[#f5f5f5] text-red-700',
      variant === 'warning' && 'bg-[#f5f5f5] text-yellow-700',
      variant === 'info' && 'bg-[#f5f5f5] text-green-700',
    )

  const cardClassFixed = (variant?: NotificationItem['variant']) =>
    clsx(
      'pointer-events-auto select-none rounded-lg p-2 shadow-lg ring-1 ring-black/20',
      variant === 'danger' && 'bg-[#f5f5f5] text-gray-700',
      variant === 'warning' && 'bg-[#f5f5f5] text-yellow-700',
      variant === 'info' && 'bg-[#f5f5f5] text-green-700',
    )

  // movement transition: use tween (duration) for consistent slower timing, spring can be jittery with large shrink
  const movementDuration = 1.25 // seconds — slower
  const movementTransition = { type: 'tween' as const, duration: movementDuration, ease: [0.22, 0.9, 0.3, 1] as any }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Background — no blur */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-no-repeat bg-cover border border-gray-100 rounded-2xl"
        style={{
          backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')`,
          transform: 'scale(1.02)',
          // filter: 'brightness(0.32) saturate(0.9)',
        }}
      />

      {/* <div className="absolute inset-0 bg-black/36" /> */}

      {/* left fade overlay (no blur) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: leftFade ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        className="absolute inset-y-0 left-0 w-[34%] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01) 20%, transparent 60%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* content layer */}
      <div className="relative z-20 h-full p-6" />

      {/* notification overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* TOP-CENTER pop (only one at a time) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-auto pointer-events-none">
          <AnimatedList className="items-start" delay={600}>
            {revealedId ? (
              <div key={revealedId} className="relative w-auto flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="pointer-events-auto"
                  style={{ transformOrigin: 'center top' }}
                >
                  {(() => {
                    const it = items.find((x) => x.id === revealedId)!
                    return (
                      <div className={cardClassInline(it.variant) + ' w-[min(86vw,320px)] px-4'}>
                        <div className="flex items-start gap-1">
                          {/* icon */}
                          <div className="flex-shrink-0 mt-1">
                            {it.variant === 'danger' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                            {it.variant === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                            {it.variant === 'info' && <InfoIcon className="w-4 h-4 text-green-400" />}
                          </div>

                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-gray-600">{it.title}</div>
                            {it.body && <div className="text-xs mt-1 text-white/80">{it.body}</div>}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </div>
            ) : null}
          </AnimatedList>
        </div>

        {/* MOVING card (only one moves at a time in this logic) */}
        {movingId ? (
          (() => {
            const it = items.find((x) => x.id === movingId)!
            const targetScale = it.landOnLeft ? targetScaleLeft : targetScaleOther
            return (
              <motion.div
                key={`moving-${it.id}`}
                initial={
                  reduce
                    ? { opacity: 1, scale: targetScale, left: it.target.left, top: it.target.top, position: 'absolute' }
                    : { opacity: 1, scale: targetScale, left: '50%', top: '6%', position: 'absolute' }
                }
                animate={
                  reduce
                    ? {}
                    : isBlending && movingId === it.id
                      ? { opacity: 0, scale: 0.68, left: it.target.left, top: it.target.top, position: 'absolute' }
                      : { opacity: 1, scale: targetScale, left: it.target.left, top: it.target.top, position: 'absolute' }
                }
                transition={isBlending && movingId === it.id ? { duration: 1.1, ease: 'easeOut' } : movementTransition}
                onAnimationComplete={() => {
                  // call onMoveComplete only when this is the movement completion.
                  // when blending is active we DON'T re-trigger onMoveComplete (the timeout handles finalizing).
                  if (!isBlending) onMoveComplete(it.id)
                }}
                className="absolute -translate-x-1/2"
                style={{ willChange: 'left, top, transform, opacity', zIndex: 40 }}
              >
                <div className={cardClassFixed(it.variant) + ' w-[320px] md:w-[360px]'}>
                  <div className="flex items-start gap-1">
                    <div className="flex-shrink-0 mt-1">
                      {it.variant === 'danger' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      {it.variant === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                      {it.variant === 'info' && <InfoIcon className="w-4 h-4 text-green-400" />}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-600">{it.title}</div>
                      {it.body && <div className="text-xs mt-1 text-white/80">{it.body}</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })()
        ) : null}

        {/* BLEND (left): larger duration and stronger shrink so it truly disappears into the image */}
        {blendedIds.map((id) => {
          const it = items.find((x) => x.id === id)!
          return (
            <motion.div
              key={`blend-${id}`}
              initial={{ opacity: 1, scale: 0.88, position: 'absolute', left: it.target.left, top: it.target.top }}
              animate={{ opacity: 0, scale: 0.68, position: 'absolute', left: it.target.left, top: it.target.top }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute -translate-x-1/2"
              style={{ willChange: 'opacity, transform', zIndex: 35 }}
            >
              <div
                className={cardClassFixed(it.variant) + ' w-[320px] md:w-[360px]'}
                style={{
                  backgroundBlendMode: 'multiply',
                  opacity: 0.94,
                  filter: 'saturate(0.9)',
                }}
              >
                <div className="flex items-start gap-1">
                  <div className="flex-shrink-0 mt-1">
                    {it.variant === 'danger' && <AlertCircle className="w-4 h-4 text-red-400" />}
                    {it.variant === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                    {it.variant === 'info' && <InfoIcon className="w-4 h-4 text-green-400" />}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-700">{it.title}</div>
                    {it.body && <div className="text-xs mt-1 text-white/80">{it.body}</div>}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* LANDED (non-left) — gentle pop */}
        {landedIds.map((id) => {
          const it = items.find((x) => x.id === id)!
          return (
            <motion.div
              key={`landed-${id}`}
              initial={{ opacity: 0, scale: 0.94, position: 'absolute', left: it.target.left, top: it.target.top }}
              animate={{ opacity: 1, scale: 1, position: 'absolute', left: it.target.left, top: it.target.top }}
              transition={{ duration: 0.45, type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute -translate-x-1/2 max-w-[320px] md:max-w-[360px] w-[min(86vw,320px)] whitespace-pre-wrap break-words"
              style={{ willChange: 'transform, opacity', zIndex: 30 }}
            >
              <div className={cardClassFixed(it.variant) + 'max-w-[320px] md:max-w-[360px] w-[min(86vw,320px)] whitespace-pre-wrap break-words'}>
                <div className="flex items-start gap-1">
                  <div className="flex-shrink-0 mt-1">
                    {it.variant === 'danger' && <AlertTriangle className="w-6 h-6 text-red-400" />}
                    {it.variant === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                    {it.variant === 'info' && <InfoIcon className="w-4 h-4 text-green-400" />}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-normal text-gray-700">{it.title}</div>
                    {/* {it.body && <div className="text-xs mt-1 text-white/80">{it.body}</div>} */}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
