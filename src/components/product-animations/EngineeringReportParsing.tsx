import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { clsx } from 'clsx';

/* ------------------------
  Types
-------------------------*/
type Stage = 'idle' | 'dropping' | 'uploading' | 'processing' | 'done';
type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4';

type Status = 'done' | 'active' | 'pending';

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
      >
        <div className="w-full max-w-[420px] space-y-2">
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
                      engineering_report.pdf
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
    >
      <div className="w-full max-w-[420px] rounded-lg border bg-white p-3 shadow-sm">
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

/* ---------- FRAME 3: Conversation with Add to Notes simulation (extracted from earlier) ---------- */
export function Frame3Chat({
  onAddToNotes,
  autoProceedDelay = 3200,
}: {
  onAddToNotes: () => void;
  autoProceedDelay?: number;
}) {
  const [phase, setPhase] = useState<'hidden' | 'userShown' | 'incomingTyping' | 'answerShown'>(
    'hidden',
  );
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    const t0 = window.setTimeout(() => setPhase('userShown'), 0);
    const t1 = window.setTimeout(() => setPhase('incomingTyping'), 90);
    const t2 = window.setTimeout(() => setPhase('answerShown'), 90 + 100 + 140);

    const staggerDelay = 180;
    const revealDuration = 300;
    const ANSWER_PARAGRAPHS = [
      'The Odisha Power Generation Corporation (OPGC) has four units with the following commissioning dates and ages as of 2024:',
      '• Unit 1: Commissioned on June 2, 1994 (29 years old)',
      '• Unit 2: Commissioned on October 22, 1995 (28 years old)',
      '• Unit 3: Commissioned in 2019 (approximately 5 years old)',
      '• Unit 4: Commissioned in 2019 (approximately 5 years old)',
    ];

    const estimatedRevealMs = staggerDelay * ANSWER_PARAGRAPHS.length + revealDuration + 200;
    const autoClickDelay = Math.max(estimatedRevealMs, autoProceedDelay) + 80;

    const tAuto = window.setTimeout(() => {
      setButtonPressed(true);
      const tPress = window.setTimeout(() => {
        setButtonPressed(false);
        onAddToNotes();
      }, 200);
      (window as any).__privue_temp = tPress;
    }, autoClickDelay);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tAuto);
      if ((window as any).__privue_temp) {
        clearTimeout((window as any).__privue_temp);
        delete (window as any).__privue_temp;
      }
    };
  }, [onAddToNotes, autoProceedDelay]);

  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const containerVariants: Variants = {
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="w-[460px] rounded-md bg-white/95 p-2.5 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm"
      aria-live="polite"
      role="region"
      aria-label="Engineering report assistant"
    >
      <div className="mb-2 text-[12px] font-semibold text-slate-900">
        Engineering Report Assistant
      </div>

      <div className="flex flex-col gap-2">
        {(phase === 'userShown' || phase === 'incomingTyping' || phase === 'answerShown') && (
          <div className="max-w-[80%] self-end">
            <div className="bg-privue-700 inline-block rounded-[10px] px-2.5 py-1.5 text-[12px] text-white shadow-[0_6px_16px_rgba(76,110,245,0.06)]">
              What is the age of the plant?
            </div>
            <div className="mt-0.5 text-right text-[9px] text-slate-500">{formattedTime}</div>
          </div>
        )}

        {phase === 'incomingTyping' && (
          <div className="self-start">
            <div
              className="inline-flex items-center rounded-lg border bg-slate-50 px-2 py-1"
              style={{ borderColor: 'rgba(15,23,36,0.03)' }}
            >
              <div className="text-[10px] text-slate-500">Typing…</div>
            </div>
          </div>
        )}

        {phase === 'answerShown' && (
          <div className="max-w-full self-start">
            <div
              className="rounded-lg border bg-white p-2"
              style={{ borderColor: 'rgba(15,23,36,0.04)' }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-1.5 text-[11px] text-[#0f1724]"
              >
                <motion.div variants={itemVariants} className="leading-[1.35]">
                  The Odisha Power Generation Corporation (OPGC) has four units with the following
                  commissioning dates and ages as of 2024:
                </motion.div>
                <motion.div variants={itemVariants} className="leading-[1.35]">
                  • Unit 1: Commissioned on June 2, 1994 (29 years old)
                </motion.div>
                <motion.div variants={itemVariants} className="leading-[1.35]">
                  • Unit 2: Commissioned on October 22, 1995 (28 years old)
                </motion.div>
                <motion.div variants={itemVariants} className="leading-[1.35]">
                  • Unit 3: Commissioned in 2019 (approximately 5 years old)
                </motion.div>
                <motion.div variants={itemVariants} className="leading-[1.35]">
                  • Unit 4: Commissioned in 2019 (approximately 5 years old)
                </motion.div>
              </motion.div>

              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => {
                    setButtonPressed(true);
                    setTimeout(() => {
                      setButtonPressed(false);
                      onAddToNotes();
                    }, 160);
                  }}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium text-white transition-transform ${buttonPressed ? 'bg-privue-800 scale-[0.985]' : 'bg-privue-700 hover:bg-privue-800'}`}
                  style={{ transformOrigin: 'center' }}
                >
                  Add to notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- FRAME 4: Saved Notes (minimal cards; new added on TOP with distinct bg) ---------- */
export function Frame4SavedNotes({ onComplete }: { onComplete?: () => void }) {
  const [notes, setNotes] = useState<
    Array<{ id: string; title: string; body: string; isNew?: boolean }>
  >([
    {
      id: 'n1',
      title: 'Plant ages summary',
      body: 'Unit1: 1994 (29y). Unit2: 1995 (28y). Unit3&4: 2019 (~5y).',
    },
    {
      id: 'n2',
      title: 'Key specs extracted',
      body: 'Rated capacity, commissioning dates, and boiler type captured.',
    },
  ]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    const tShowSaving = window.setTimeout(() => {
      setSaving(true);

      const tAdd = window.setTimeout(() => {
        const newNote = {
          id: `n${Date.now()}`,
          title: 'Analysis snippet',
          body: 'Added: analysis summary & suggested follow-ups.',
          isNew: true,
        };
        setNotes((prev) => [newNote, ...prev.map((p) => ({ ...p, isNew: false }))]);
        setSaving(false);

        const tClear = window.setTimeout(
          () => setNotes((prev) => prev.map((p) => ({ ...p, isNew: false }))),
          1800,
        );
        timers.push(tClear as unknown as number);

        const tComplete = window.setTimeout(() => onComplete && onComplete(), 900);
        timers.push(tComplete as unknown as number);
      }, 700);
      timers.push(tAdd as unknown as number);
    }, 480);

    timers.push(tShowSaving as unknown as number);

    return () => timers.forEach((id) => clearTimeout(id));
  }, [onComplete]);

  return (
    <motion.div
      key="frame4"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="w-[440px] rounded-md bg-white p-2.5 shadow-sm ring-1 ring-slate-100"
      aria-label="Saved notes"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke={privue[700]} viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-[12px] font-medium text-slate-800">Saved Notes</span>
        </div>
      </div>

      <div className="flex flex-col gap-2" role="list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={clsx('rounded-md border px-3 py-2', note.isNew ? 'ring-2' : 'ring-0')}
            style={{
              background: note.isNew
                ? `linear-gradient(180deg, ${privue[600]}12, ${privue[700]}08)`
                : '#fff',
              borderColor: note.isNew ? `${privue[600]}40` : 'rgba(15,23,36,0.06)',
              boxShadow: note.isNew ? '0 6px 18px rgba(76,110,245,0.04)' : undefined,
            }}
          >
            <div className="truncate text-[12px] font-medium text-slate-800">{note.title}</div>
            <div className="mt-0.5 truncate text-[11px] text-slate-600">{note.body}</div>
          </div>
        ))}

        {saving && (
          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
            <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" aria-hidden>
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="rgba(76,110,245,0.14)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="40"
              />
              <path
                d="M21 12a9 9 0 00-3.6-6.8"
                stroke={privue[600]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Saving note…</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------
  Top-level orchestration: step1 upload -> step2 processing (all 4 sequential) -> step3 chat -> step4 saved notes
-------------------------*/
export default function EngineeringReportParsing() {
  const [stage, setStage] = useState<Stage>('idle');
  const [uploadPct, setUploadPct] = useState(0);
  const [step, setStep] = useState<Step>('frame1');

  // statuses for 4-step pipeline (start all pending)
  const [statuses, setStatuses] = useState<Array<Status>>([
    'pending',
    'pending',
    'pending',
    'pending',
  ]);
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

  const startCycle = () => {
    clearAllTimers();
    setStage('idle');
    setUploadPct(0);
    setStep('frame1');

    const t0 = window.setTimeout(() => {
      setStage('dropping');
      setStep('frame1');
    }, 500);

    const t1 = window.setTimeout(() => {
      setStage('uploading');
      setStep('frame1');
    }, 1200);

    timers.current.push(t0 as unknown as number, t1 as unknown as number);
  };

  useEffect(() => {
    startCycle();
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setStep('frame2');
        }, 360);
        timers.current.push(t as unknown as number);
      } else setUploadPct(Math.round(v));
    }, 160);

    timers.current.push(id as unknown as number);
    return () => clearInterval(id);
  }, [stage]);

  // processing: reveal each of the 4 steps sequentially with spinner -> done
  useEffect(() => {
    if (stage !== 'processing') return;

    clearAllTimers();

    setStatuses(['pending', 'pending', 'pending', 'pending']);

    const stepDur = 1200;
    const gap = 220;

    labels.forEach((_, idx) => {
      const start = idx * (stepDur + gap);
      const tActive = window.setTimeout(
        () =>
          setStatuses((prev) => {
            const copy = [...prev];
            copy[idx] = 'active';
            return copy;
          }),
        start,
      );
      const tDone = window.setTimeout(
        () =>
          setStatuses((prev) => {
            const copy = [...prev];
            copy[idx] = 'done';
            return copy;
          }),
        start + stepDur,
      );
      timers.current.push(tActive as unknown as number, tDone as unknown as number);

      // when all done -> move to chat frame
      if (idx === labels.length - 1) {
        const tFinish = window.setTimeout(
          () => {
            setStage('done');
            setStep('frame3');
          },
          start + stepDur + 380,
        );
        timers.current.push(tFinish as unknown as number);
      }
    });

    return () => clearAllTimers();
  }, [stage]);

  // handler when chat triggers add-to-notes (go to saved notes)
  const handleAddToNotes = () => {
    // immediate swap to frame4
    setStep('frame4');
  };

  // when saved notes completes its internal flow, loop back to start
  const handleSavedComplete = () => {
    // give a small pause before restarting cycle so UX doesn't flash too fast
    const t = window.setTimeout(() => {
      startCycle();
    }, 600);
    timers.current.push(t as unknown as number);
  };
  const bgUrl = '/module-animations/climate-risk-bg.png';

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

      <div className="absolute right-6 bottom-6">
        {/* immediate swap: simple conditional rendering without AnimatePresence */}
        {step === 'frame1' && <Frame1Upload key="f1" stage={stage} uploadPct={uploadPct} />}

        {step === 'frame2' && (
          <Frame2ProcessingMinimal key="f2" statuses={statuses} labels={labels} />
        )}

        {step === 'frame3' && <Frame3Chat key="f3" onAddToNotes={handleAddToNotes} />}

        {step === 'frame4' && <Frame4SavedNotes key="f4" onComplete={handleSavedComplete} />}
      </div>
    </div>
  );
}
