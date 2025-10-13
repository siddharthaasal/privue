import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

/* ------------------------
  Types
-------------------------*/
// type Stage = "idle" | "dropping" | "uploading" | "processing" | "done";
// type Step = "frame1" | "frame2" | "frame3" | "frame4";

// type Status = "done" | "active" | "pending";

/* ------------------------
  Shared styles & small helpers
-------------------------*/
const privue = {
  600: '#5c7cfa',
  700: '#4c6ef5',
};

const boxVariants: Variants = {
  idle: { opacity: 1, scale: 1 },
  dropActive: { scale: 1.005, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- FRAME 1: Upload (reduced bar thickness, privue colors) ---------- */
export function Frame1Upload({ stage, uploadPct }: { stage: Stage; uploadPct: number }) {
  const uploadGradient = `linear-gradient(90deg, ${privue[600]}, ${privue[700]})`;
  return (
    <>
      <motion.div
        key="upload-frame"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"

      >
        <div className=" space-y-2">
          <div className="w-full rounded-md border border-slate-200/50 bg-white/98 p-3">
            <div className="mb-2 text-left">
              <div className="text-[11px] font-medium text-slate-900">Upload file</div>
              <div className="mt-0.5 text-[10px] text-slate-500">
                Drag or drop your insurance policy here or click to upload
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative flex w-full max-w-[320px] items-center justify-center">
                <motion.div
                  variants={boxVariants}
                  animate={stage === 'dropping' ? 'dropActive' : 'idle'}
                  className="flex h-28 w-44 items-center justify-center rounded-md border border-dashed border-slate-200"
                  style={{ background: 'rgba(255,255,255,0.95)' }}
                >
                  <div className="flex h-20 w-36 items-center justify-center rounded-sm bg-white shadow-[0_6px_12px_rgba(2,6,23,0.03)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 3v10"
                        stroke="#9ca3af"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 7l4-4 4 4"
                        stroke="#9ca3af"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="4"
                        y="13"
                        width="16"
                        height="6"
                        rx="1"
                        stroke="#e6e9ed"
                        strokeWidth="1.0"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={
                    stage === 'dropping' || stage === 'uploading'
                      ? { opacity: 1 }
                      : stage === 'done'
                        ? { opacity: 0.95 }
                        : { opacity: 0 }
                  }
                  transition={{ duration: 0.36 }}
                  className="absolute z-20 flex h-20 w-44 items-center gap-2 rounded-md border bg-white px-2"
                  style={{ left: '4.6rem' }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm border bg-slate-50">
                    <svg width="14" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                        stroke="#374151"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                      <path d="M13 2v6h6" stroke="#374151" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium text-slate-900">
                      insurance_policy.pdf
                    </div>
                    <div className="text-[10px] text-slate-500">1.2 MB</div>
                  </div>

                  <div className="text-[10.5px] text-slate-500">
                    {stage === 'uploading' ? `${uploadPct}%` : ''}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-3">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: stage === 'uploading' || stage === 'done' ? 1 : 0,
                  height: stage === 'uploading' || stage === 'done' ? 'auto' : 0,
                }}
                transition={{ duration: 0.18 }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-[10px] text-slate-700">
                    {stage === 'uploading' ? 'Uploading' : stage === 'done' ? 'Completed' : ''}
                  </div>
                  <div className="text-[10px] font-medium text-slate-700">
                    {stage === 'uploading' ? `${uploadPct}%` : stage === 'done' ? '100%' : ''}
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: 999,
                      background: uploadGradient,
                      boxShadow: '0 4px 10px rgba(92,124,250,0.06)',
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        stage === 'uploading' ? `${uploadPct}%` : stage === 'done' ? '100%' : 0,
                    }}
                    transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {stage === 'done' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.12 }}
                  className="mt-2 flex items-center gap-2"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#059669"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11.5px] font-medium text-slate-900">
                      Processing complete
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Analysis finished — results are ready.
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ---------- FRAME 2: Minimal processing stages (show all 4 being checked one-by-one) ---------- */
export function Frame2ProcessingMinimal({
  statuses,
  labels,
}: {
  statuses: Status[];
  labels: string[];
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  };

  return (
    <motion.div
      key="processing-frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"

    >
      <div className="">
        <div className="mb-2 text-[11px] font-medium text-slate-800">Processing pipeline</div>

        <div className="flex flex-col gap-2">
          {labels.map((label, idx) => {
            const s = statuses[idx] ?? 'pending';

            return (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                key={label}
                className="flex items-center justify-between gap-3 px-2 py-2"
              >
                <div className="truncate text-[10px]" style={{ color: '#0f1724' }}>
                  {label}
                </div>

                <div className="flex min-w-[56px] items-center justify-end">
                  {s === 'done' ? (
                    <div className="inline-flex items-center gap-2 text-[10px]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke={privue[700]}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-slate-500">Done</span>
                    </div>
                  ) : s === 'active' ? (
                    <div className="flex items-center gap-2 text-[10px]">
                      <svg
                        className="animate-spin"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(76,110,245,0.18)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="40"
                          strokeDashoffset="0"
                        />
                        <path
                          d="M22 12a10 10 0 00-4-7.9"
                          stroke={privue[600]}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-slate-500">Running</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px]">
                      <div
                        className="h-2 w-2 rounded-full bg-slate-200"
                        style={{ boxShadow: 'inset 0 0 0 4px rgba(15,23,42,0.02)' }}
                      />
                      <span className="text-slate-400">Pending</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* container / row variants (staggered row-wise fill) */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rows = [
  { key: 'policy-period', label: 'Policy Period', value: '23 August 2023 - 22 August 2024' },
  { key: 'proposal-date', label: 'Proposal Date', value: '23 August 2023' },

  {
    key: 'super-structure',
    label: 'Super Structure Building Plinth and Foundation',
    value: '₹ 61,07,48,892',
  },
  { key: 'furniture', label: 'Furniture, Fitting and Fixtures', value: '₹ 4,27,626' },
  { key: 'plant', label: 'Plant and Machinery', value: '₹ 10,36,02,561' },
  { key: 'electrical', label: 'Electrical Installations', value: '₹ 15,15,977' },

  { key: 'gross-prem', label: 'Gross Premium (Excl. GST)', value: '₹ 7,98,939' },
  { key: 'gst-amt', label: 'GST Amount', value: '₹ 1,43,809' },
  { key: 'total-prem', label: 'Total Premium', value: '₹ 9,42,748', highlight: true },
];

export function PolicyOverviewCompact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.28 }}
      className="max-h-[320px] md:max-h-[320px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-label="Policy overview"
    >
      <div className="mb-1 flex items-center justify-between px-1">
        <div className="text-[11px] font-medium text-slate-900">Policy Overview</div>
        <button className="text-[10px] text-slate-500">▾</button>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="divide-y divide-slate-100"
      >
        {rows.map((r) => {
          const isSectionHeader =
            r.value === '' && (r.label.endsWith('Breakdown') || r.label.endsWith('Information'));
          return (
            <motion.div
              key={r.key}
              variants={rowVariants}
              className={`grid grid-cols-[1fr_120px] items-center gap-2 px-2 py-1 ${isSectionHeader ? 'bg-transparent' : ''
                }`}
            >
              <div
                className={`text-[10px] ${isSectionHeader ? 'font-medium text-slate-700' : 'text-[10px] text-slate-800'}`}
              >
                {r.label}
              </div>

              <div className="text-right">
                {r.value ? (
                  <div
                    className={`text-[10px] ${r.highlight ? 'font-medium' : 'font-normal'} ${r.highlight ? '' : 'text-slate-800'
                      }`}
                    style={r.highlight ? { color: '#4c6ef5' } : {}}
                  >
                    {r.value}
                  </div>
                ) : (
                  <div className="text-[9.5px] text-slate-400">—</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

const paragraphText =
  'Standard Fire and Special Perils Policy (except dwellings with individual owners). Policies having Sum Insured up to INR 10 cr per location - 5% of claim amount subject to a minimum of Rs 10,000/-. Policies having Sum Insured above INR 10 cr per location up to INR 100 cr per location - 5% of claim amount subject to a minimum of INR 25,000. Policies having Sum Insured above INR 100 cr and up to INR 1500 cr per location - 5% of claim amount subject to a minimum of INR 5,00,000. Policies having Sum Insured above INR 1500 cr and up to INR 2500 cr per location - 5% of claim amount subject to a minimum of INR 25,00,000. This excess supersedes the General Exclusion 1 of policy wordings shall apply per event per insured.';

/* animation variants */
const containerVariants2: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

const lineVariants2: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    // clipPath hides the entire text from left -> right; we animate to reveal
    clipPath: 'inset(0 100% 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function DeductiblesCompactStaggered() {
  // split paragraph into sentences / chunks for per-line reveal
  // regex tries to keep sentence punctuation; tweak if you want different breaks
  const lines = paragraphText.split(/(?<=\.)\s+/);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-label="Deductibles"
    >
      <div className="mb-1 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button className="text-[11px] text-slate-700">▾</button>
          <div className="text-[11px] font-semibold text-slate-900">Deductibles</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700">
            Standard Excess
          </span>

          <button
            aria-label="More info"
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-50"
            title="Information"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 11v2"
                stroke="#6b7280"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7h.01"
                stroke="#6b7280"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" stroke="#e6e9ed" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>

      {/* stagger container */}
      <motion.div
        variants={containerVariants2}
        initial="hidden"
        animate="show"
        className="px-1 text-[9.5px] leading-snug text-slate-700"
      >
        {lines.map((ln, i) => (
          // outer wrapper keeps overflow hidden so clipPath reveal works cleanly
          <motion.div
            key={i}
            variants={lineVariants2}
            className="mb-1 overflow-hidden last:mb-0"
            style={{ WebkitFontSmoothing: 'antialiased' }}
          >
            {/* the text element that actually gets clipped and animated */}
            <p className="m-0 text-[9.5px]">{ln}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const items = [
  {
    key: 'communicable',
    title: 'Communicable Disease Exclusion Clause',
    desc: 'Exclusion relating to communicable disease (per policy wording).',
  },
  {
    key: 'terrorism',
    title: 'Terrorism damage exclusion warranty',
    desc: 'Terrorism damage exclusion warranty (applicable for all policies).',
  },
  {
    key: 'sanction',
    title: 'Sanction Limitation and exclusion clause',
    desc: 'Sanction limitation and exclusion clause (per policy wording).',
  },
];

/* tiny staggered reveal */
const containerVariants3: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

function InfoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="#e6e9ed" strokeWidth="1.2" />
      <path
        d="M12 11v4"
        stroke="#6b7280"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8h.01"
        stroke="#6b7280"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExclusionsCompact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32 }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
      aria-label="Exclusions"
    >
      <div className="mb-1 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button className="text-[11px] text-slate-700">▾</button>
          <div className="text-[11px] font-semibold text-slate-900">Exclusions</div>
        </div>
      </div>

      <motion.ul
        initial="hidden"
        animate="show"
        variants={containerVariants3}
        className="m-0 flex list-none flex-col gap-2 p-0"
      >
        {items.map((it) => (
          <motion.li
            key={it.key}
            variants={itemVariants}
            className="flex items-start gap-3 rounded-sm border border-slate-50 bg-white px-3 py-2"
          >
            <div className="mt-0.5">
              <InfoIcon size={14} />
            </div>

            <div className="min-w-0">
              <div className="truncate text-[10px] leading-tight font-medium text-slate-800">
                {it.title}
              </div>

              {/* render description only when it's meaningfully different from title (avoids duplicates) */}
              {/* {it.desc && it.desc.trim() && it.desc.trim() !== it.title.trim() ? (
                                <div className="text-[9.5px] text-slate-500 leading-snug mt-0.5 truncate">{it.desc}</div>
                            ) : null} */}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

type Stage = 'idle' | 'dropping' | 'uploading' | 'processing' | 'done';
type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5';
type Status = 'pending' | 'active' | 'done';

export default function InsurancePolicy() {
  const [stage, setStage] = useState<Stage>('idle');
  const [uploadPct, setUploadPct] = useState(0);

  // carousel that controls which frame is visible (looping)
  const [carouselStep, setCarouselStep] = useState<Step>('frame1');

  // statuses for 4-step pipeline (start all pending)
  const [statuses, setStatuses] = useState<Status[]>(['pending', 'pending', 'pending', 'pending']);
  const labels = [
    'Analyzing engineering structure',
    'Extracting technical specifications',
    'Processing engineering data',
    'Generating analysis output',
  ];

  const timers = useRef<number[]>([]);

  const clearAllTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  // --- start / simulate the upload-processing pipeline ---
  const startCycle = () => {
    clearAllTimers();
    setStage('idle');
    setUploadPct(0);

    // small delays to mimic dropping -> uploading
    const t0 = window.setTimeout(() => {
      setStage('dropping');
    }, 500);

    const t1 = window.setTimeout(() => {
      setStage('uploading');
    }, 1200);

    timers.current.push(t0 as unknown as number, t1 as unknown as number);
  };

  // when the carousel becomes frame1, (re)start the pipeline
  useEffect(() => {
    if (carouselStep === 'frame1') startCycle();
    // do not clearAllTimers here — timers are cleared inside startCycle and other effects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselStep]);

  // upload progress simulation (unchanged logic, but DO NOT change carouselStep here)
  useEffect(() => {
    if (stage !== 'uploading') return;
    setUploadPct(3);
    let v = 3;
    const id = window.setInterval(() => {
      v += Math.random() * 6 + 3;
      if (v >= 100) {
        setUploadPct(100);
        clearInterval(id);

        const t = window.setTimeout(() => {
          setStage('processing');
          // NOTE: do not set carouselStep here — carousel controls frames
        }, 360);
        timers.current.push(t as unknown as number);
      } else {
        setUploadPct(Math.round(v));
      }
    }, 160);

    timers.current.push(id as unknown as number);
    return () => clearInterval(id);
  }, [stage]);

  // processing simulation: sequentially reveal statuses; setStage -> done at end
  useEffect(() => {
    if (stage !== 'processing') return;

    clearAllTimers();
    setStatuses(['pending', 'pending', 'pending', 'pending']);

    const stepDur = 650;
    const gap = 250;

    labels.forEach((_, idx) => {
      const start = idx * (stepDur + gap);

      const tActive = window.setTimeout(() => {
        setStatuses((prev) => {
          const copy = [...prev];
          copy[idx] = 'active';
          return copy;
        });
      }, start);

      const tDone = window.setTimeout(() => {
        setStatuses((prev) => {
          const copy = [...prev];
          copy[idx] = 'done';
          return copy;
        });
      }, start + stepDur);

      timers.current.push(tActive as unknown as number, tDone as unknown as number);

      if (idx === labels.length - 1) {
        const tFinish = window.setTimeout(
          () => {
            setStage('done');
            // DON'T set carouselStep here. Let the carousel move to the next frame.
          },
          start + stepDur + 450,
        );
        timers.current.push(tFinish as unknown as number);
      }
    });

    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const stepsArr: Step[] = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5'];

  const durations: Record<Step, number> = {
    frame1: 4500,
    frame2: 3000, // short timer here is OK because we handle frame2 separately below
    frame3: 4000,
    frame4: 3000,
    frame5: 4500,
  };

  // Advance helper
  const advanceToNext = (current: Step) => {
    const idx = stepsArr.indexOf(current);
    const next = stepsArr[(idx + 1) % stepsArr.length];
    setCarouselStep(next);
  };

  /*
      1) Default carousel effect for frames other than frame2.
         It uses a timeout of durations[carouselStep] and advances normally.
    */
  useEffect(() => {
    if (carouselStep === 'frame2') return; // handled in separate effect

    const id = window.setTimeout(() => {
      advanceToNext(carouselStep);
    }, durations[carouselStep]);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselStep]);

  /*
      2) Special handling for frame2: wait for pipeline to finish.
         - If stage === "done", advance after a small buffer (600ms).
         - Otherwise set a fallback max timer (e.g. 30s) so UI won't hang forever.
    */
  useEffect(() => {
    if (carouselStep !== 'frame2') return;

    const nextStepTimeoutAfterDone = 600; // small buffer so "done" state is visible
    const fallbackMs = 30_000; // fallback to avoid deadlock

    // If processing already finished by the time we land on frame2, advance shortly.
    if (stage === 'done') {
      const id = window.setTimeout(() => advanceToNext('frame2'), nextStepTimeoutAfterDone);
      return () => clearTimeout(id);
    }

    // Not done yet — set a fallback timeout to advance anyway if something goes wrong.
    const fallbackId = window.setTimeout(() => advanceToNext('frame2'), fallbackMs);

    // Also listen for stage changes (via dependency array): when stage becomes "done", the effect re-runs
    // and the branch above will schedule the short buffer advance and clear fallback.
    return () => clearTimeout(fallbackId);
  }, [carouselStep, stage]);
  const bgUrl = '/module-animations/financial-risk-bg.png';

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      <div className="absolute inset-0">
        <img
          src={bgUrl}
          alt="background"
          className="h-full w-full object-contain backdrop-opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      <div className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
        {carouselStep === 'frame1' && <Frame1Upload key="f1" stage={stage} uploadPct={uploadPct} />}
        {carouselStep === 'frame2' && (
          <Frame2ProcessingMinimal key="f2" statuses={statuses} labels={labels} />
        )}
        {carouselStep === 'frame3' && <PolicyOverviewCompact key="f3" />}
        {carouselStep === 'frame4' && <DeductiblesCompactStaggered key="f4" />}
        {carouselStep === 'frame5' && <ExclusionsCompact key="f5" />}
      </div>
    </div>
  );
}
