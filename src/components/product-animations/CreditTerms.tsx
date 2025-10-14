// CreditTerms.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { DatabaseZap } from 'lucide-react';

type Stage = 'idle' | 'frame1' | 'frame2' | 'frame3' | 'done';

export default function CreditTerms({
  startImmediately = true,
  bgImage = '/module-animations/data-acq-bg.png',

  // timing controls
  revealIntervalMs = 900,
  stagePauseMs = 3000,
  loopDelayMs = 3000,
  rowStaggerDelay = 0.06,
  autoLoop = true,
  startStage = 'frame1', // ✅ default is "frame1"
}: {
  startImmediately?: boolean;
  bgImage?: string;

  revealIntervalMs?: number;
  stagePauseMs?: number;
  loopDelayMs?: number;
  rowStaggerDelay?: number;
  autoLoop?: boolean;
  startStage?: Stage; // ✅ type annotation is Stage
}) {
  // ✅ now we can use startStage safely
  const [stage, setStage] = useState<Stage>(startImmediately ? startStage : 'idle');

  const [rowsShown, setRowsShown] = useState(0);
  const rowsRef = useRef<number | null>(null);
  const restartRef = useRef<number | null>(null);

  // split parameter data into two smaller tables
  const tableFrame1 = [
    { k: 'Profit Before Tax', v: '₹ 1,24,000' },
    { k: 'Turnover (Annual)', v: '₹ 12,40,000' },
    { k: 'Total Financial Liabilities (Debt)', v: '₹ 4,50,000' },
  ];

  const tableFrame2 = [
    { k: 'Total Income (ITR)', v: '₹ 13,00,000' },
    { k: 'Estimated GST Turnover', v: '₹ 11,50,000' },
    { k: 'Outstanding Banking Debt', v: '₹ 3,20,000' },
    { k: 'Credit Score (bureau)', v: '740' },
    { k: 'Total Loans Active', v: '2' },
    { k: 'Region - State / City', v: 'Maharashtra — Pune' },
  ];

  // conclusions (frame3)
  const conclusions = [
    { k: 'PreApproval Payment Terms', v: '60 days with 20% advance payment' },
    { k: 'PreApproval Credit Limit', v: '₹ 3,00,000' },
    { k: 'Credit Limit with ₹100,000 Bank Guarantee', v: '₹ 5,00,000' },
  ];

  // reveal rows one-by-one for whichever frame is active
  useEffect(() => {
    if (stage === 'frame1' || stage === 'frame2' || stage === 'frame3') {
      setRowsShown(0);
      if (rowsRef.current) {
        clearInterval(rowsRef.current);
        rowsRef.current = null;
      }

      const totalRows =
        stage === 'frame1'
          ? tableFrame1.length
          : stage === 'frame2'
            ? tableFrame2.length
            : conclusions.length;

      rowsRef.current = window.setInterval(() => {
        setRowsShown((r) => {
          const nxt = r + 1;
          if (nxt >= totalRows) {
            if (rowsRef.current) {
              clearInterval(rowsRef.current);
              rowsRef.current = null;
            }
            // advance to next stage after a short pause (configurable)
            const nextStage: Record<Stage, Stage> = {
              idle: 'frame1',
              frame1: 'frame2',
              frame2: 'frame3',
              frame3: 'done',
              done: 'frame1',
            };
            setTimeout(() => setStage(nextStage[stage]), stagePauseMs);
          }
          return nxt;
        });
      }, revealIntervalMs) as unknown as number;
    }

    return () => {
      if (rowsRef.current) {
        clearInterval(rowsRef.current);
        rowsRef.current = null;
      }
    };
    // intentionally depend on stage + timing props not used directly to avoid retrigger; okay to rely on stage only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // loop / restart behavior
  useEffect(() => {
    if (stage === 'done') {
      if (autoLoop) {
        restartRef.current = window.setTimeout(() => {
          setRowsShown(0);
          setStage('frame1');
        }, loopDelayMs) as unknown as number;
      }
    }
    return () => {
      if (restartRef.current) {
        clearTimeout(restartRef.current);
        restartRef.current = null;
      }
    };
  }, [stage, autoLoop, loopDelayMs]);

  return (
    <div className="relative h-full w-full">
      {/* background image */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="background" className="h-full w-full object-contain" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      {/* bottom-right overlay */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {(stage === 'frame1' || stage === 'frame2' || stage === 'frame3' || stage === 'done') && (
            <motion.div
              key="credit-terms-overlay"
              initial={{ opacity: 0, y: 20, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.995 }}
              transition={{ duration: 0.45 }}
              className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md shadow-xs md:shadow-xl md:backdrop-blur-3xl"
              style={{ fontSize: 12 }}
            >
              {/* header */}
              {/* <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <DatabaseZap size={12} />
                  <div className="text-xs font-medium text-slate-800"> Underwriting Summary</div>
                </div>

                <div className="text-[10px] text-slate-500">
                  {stage === 'frame1'
                    ? 'Operational metrics'
                    : stage === 'frame2'
                      ? 'Credit profile'
                      : stage === 'frame3'
                        ? 'Concluded terms'
                        : 'Completed'}
                </div>
              </div> */}

              <div className="">
                <AnimatePresence mode="wait">
                  {stage === 'frame1' && (
                    <motion.div
                      key="ct-frame-1"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28 }}
                      className=" w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-2 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
                    >
                      <div className="mb-1 text-[10px] font-semibold text-slate-700">
                        Financial Metrics
                      </div>

                      <div className="overflow-hidden rounded-md border bg-white text-[9px]">
                        <div className="grid grid-cols-2 gap-0">
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Field
                          </div>
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Value
                          </div>

                          {tableFrame1.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 4 }}
                              animate={
                                rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 3 }
                              }
                              transition={{ duration: 0.25, delay: i * rowStaggerDelay }}
                              className="col-span-2 grid grid-cols-2 items-center border-b px-1.5 py-0.5"
                            >
                              <div className="font-normal text-slate-600">{r.k}</div>
                              <div className="text-slate-800">{rowsShown > i ? r.v : '—'}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {stage === 'frame2' && (
                    <motion.div
                      key="ct-frame-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28 }}
                      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
                    >
                      <div className="mb-1 text-[10px] font-semibold text-slate-700">
                        Financial Metrics
                      </div>

                      <div className="overflow-hidden rounded-md border bg-white text-[9px]">
                        <div className="grid grid-cols-2 gap-0">
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Field
                          </div>
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Value
                          </div>

                          {tableFrame2.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 4 }}
                              animate={
                                rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 2 }
                              }
                              transition={{ duration: 0.25, delay: i * rowStaggerDelay }}
                              className="col-span-2 grid grid-cols-2 items-center border-b px-1.5 py-0.5"
                            >
                              <div className="font-normal text-slate-600">{r.k}</div>
                              <div className="text-slate-800">{rowsShown > i ? r.v : '—'}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {stage === 'frame3' && (
                    <motion.div
                      key="ct-frame-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28 }}
                      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
                    >
                      <div className="mb-1 text-[10px] font-semibold text-slate-700">
                        Underwriting Conclusions
                      </div>

                      <div className="overflow-hidden rounded-md border bg-white text-[9px]">
                        <div className="grid grid-cols-2 gap-0">
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Term
                          </div>
                          <div className="border-b px-1.5 py-0.5 font-medium text-slate-600">
                            Value
                          </div>

                          {conclusions.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 4 }}
                              animate={
                                rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.08, y: 2 }
                              }
                              transition={{ duration: 0.25, delay: i * rowStaggerDelay }}
                              className="col-span-2 grid grid-cols-2 items-center border-b px-1.5 py-0.5"
                            >
                              <div className="font-normal text-slate-600">{r.k}</div>
                              <div className="text-slate-800">{rowsShown > i ? r.v : '—'}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {stage === 'done' && (
                    <motion.div
                      key="ct-done"
                      className="max-w-auto"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
                      >
                        {/* optional check icon — replace with your imported icon if different */}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0"
                          aria-hidden
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#16a34a"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="flex flex-col">
                          <div className="text-[11px] leading-tight font-semibold text-emerald-700">
                            Credit Terms Set
                          </div>
                          <div className="-mt-0.5 text-[9px] text-slate-500">
                            Underwriting complete
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
