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

/* ---------- FRAME 1: Upload (reduced bar thickness, privue colors) ---------- */
export function Frame1Upload({ stage, uploadPct }: { stage: Stage; uploadPct: number }) {
    const uploadGradient = `linear-gradient(90deg, ${privue[600]}, ${privue[700]})`;

    const files = [
        { id: 'f1', name: 'Corporate Credit Proposal.pdf', size: '1.04 MB' },
    ];

    return (
        <>
            <motion.div
                key="upload-frame"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="max-h-[280px] w-[350px] origin-bottom-right scale-[0.60] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-h-[380px] md:max-w-[440px] md:scale-100 md:p-3"
            >
                <div className="space-y-2">
                    <div className="w-full rounded-md border border-slate-200/50 bg-white/98 p-3">
                        <div className="mb-2 text-left">
                            <div className="text-[11px] font-medium text-slate-900">Upload files</div>
                            <div className="mt-0.5 text-[10px] text-slate-500">
                                Drag or drop your credit memo here or click to upload
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative flex w-full max-w-[320px] items-center justify-center">
                                {/* Minimal three file cards: stack vertically on small screens, row on sm+ */}
                                <div className="flex w-full flex-col items-stretch justify-center gap-2">
                                    {files.map((f, i) => (
                                        <motion.div
                                            key={f.id}
                                            initial={{ opacity: 0, y: 6, scale: 0.995 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: i * 0.05, duration: 0.22 }}
                                            className="flex w-full items-center gap-2 rounded-md border bg-white p-2"
                                            style={{ borderColor: 'rgba(15,23,36,0.06)' }}
                                        >
                                            {/* compact icon */}
                                            <div
                                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border bg-slate-50 text-slate-600"
                                                style={{ borderColor: 'rgba(15,23,36,0.04)' }}
                                            >
                                                <svg width="14" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                    <path
                                                        d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                                                        stroke="#374151"
                                                        strokeWidth="1"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M13 2v6h6"
                                                        stroke="#374151"
                                                        strokeWidth="1"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="flex min-w-0 items-center justify-between">
                                                <div>
                                                    <div className="truncate text-[11px] font-medium text-slate-900">
                                                        {f.name}
                                                    </div>
                                                    <div className="text-[9px] text-slate-500">{f.size}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
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
            className="max-h-[280px] origin-bottom-right scale-[0.75] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-h-[280px] md:max-w-[440px] md:scale-100 md:p-3"
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

/* ---------- FRAME 3: Credit Memo Information ---------- */
export function Frame3MemoInfo({
    customerName = "XYZ Company Ltd.",
    memoId = "MEMO-12345",
    fileName = "Corporate Credit Proposal.pdf",
    fileSize = "364.7 KB",
    onOpenPdf,
}: {
    customerName?: string;
    memoId?: string;
    fileName?: string;
    fileSize?: string;
    onOpenPdf?: () => void;
}) {
    return (
        <motion.div
            key="memo-info-frame"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="w-[300px] origin-bottom-right scale-[0.8] rounded-lg border bg-white 
                 p-3 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:w-[300px] md:scale-100"
        >
            {/* TITLE */}
            <h3 className="mb-2 text-[11px] font-medium text-slate-800">
                Credit Memo Information
            </h3>

            {/* CUSTOMER NAME */}
            <div className="mb-3">
                <div className="text-[9px] text-slate-500">Customer Name</div>
                <div className="text-[11px] text-slate-800">{customerName}</div>
            </div>

            {/* MEMO ID */}
            <div className="mb-3">
                <div className="text-[9px] text-slate-500">Memo ID</div>

                <div
                    className="mt-1 inline-block rounded-md bg-privue-100/80 px-2 py-[1.5px] 
                     text-[10px] text-privue-700"
                >
                    {memoId}
                </div>
            </div>

            {/* FILE TILE */}
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between rounded-lg border bg-white px-3 py-2.5"
            >
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-slate-100 p-1.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 3h6l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <div className="max-w-[160px] truncate text-[11px] text-slate-800">
                            {fileName}
                        </div>
                        <div className="text-[9px] text-slate-500">
                            Credit Memo ({fileSize})
                        </div>
                    </div>
                </div>

                <button
                    onClick={onOpenPdf}
                    className="text-[10px] text-privue-700 hover:underline whitespace-nowrap"
                >
                    View PDF
                </button>
            </motion.div>
        </motion.div>
    );
}

/* ---------- FRAME 4: Regulations to Check + Verify button ---------- */
export function Frame4Regulations({
    regs = ["Credit_Policy.pdf", "Liquidity_Policy.pdf", "Credit_Risk_Management.pdf"],
    onVerify,
    verifying,
}: {
    regs?: string[];
    verifying?: boolean;
    onVerify?: () => void;
}) {
    return (
        <motion.div
            key="reg-check-frame"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="w-[300px] origin-bottom-right scale-[0.75] rounded-xl bg-white p-4 
                 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:w-[330px] md:scale-100"
        >
            {/* TITLE */}
            <div className="mb-3 text-[10px] font-medium text-slate-700">
                Regulations, Guidelines and Policy
            </div>

            {/* FILE LIST */}
            <div className="flex flex-col gap-2 mb-3">
                {regs.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        className="flex items-center justify-between rounded-lg border px-3 py-2.5 bg-white"
                    >
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-slate-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 3h6l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                                />
                            </svg>

                            <div className="flex flex-col">
                                <div className="text-[11px] font-medium text-slate-900">
                                    {r}
                                </div>
                                <div className="text-[9px] text-slate-500">
                                    Preloaded
                                </div>
                            </div>
                        </div>

                        {/* RED X BUTTON */}
                        <button className="p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* VERIFY BUTTON */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onVerify}
                disabled={verifying}
                className="w-full rounded-md py-1.5 text-[10px] font-medium 
                   text-white shadow-sm bg-privue-600"
            >
                {verifying ? 'Verifying…' : 'Run verification'}
            </motion.button>
        </motion.div>
    );
}

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
        },
    },
};

const rowVariants = {
    hidden: { opacity: 0, y: 6 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as any },
    },
};

/* ---------- FRAME 5: Final Verification Results Table ---------- */
export function Frame5Results({
    rows,
}: {
    rows: { page: string | number; category: string; issueType: string; status: string }[];
}) {
    return (
        <motion.div
            key="results-frame"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.26 }}
            variants={containerVariants}
            className="max-h-[280px] w-[350px] md:w-[500px] origin-bottom-right scale-[0.75] overflow-y-auto 
                 rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] 
                 md:max-h-[280px] md:max-w-[540px] md:scale-100 md:p-3"
        >
            <div className="mb-1 text-[10px] font-medium text-slate-700">
                Verification results
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-md border bg-white text-[9px] text-black">
                {/* HEADER */}
                <div className="grid grid-cols-4 md:grid-cols-4
 border-b bg-slate-50">
                    <div className="px-1.5 py-1 font-medium text-[10px]">Page</div>
                    <div className="px-1.5 py-1 font-medium text-[10px]">Category</div>
                    <div className="px-1.5 py-1 font-medium text-[10px]">Issue Type</div>
                    <div className="px-1.5 py-1 font-medium text-[10px] text-right">Status</div>
                </div>

                {/* ROWS */}
                {rows.map((r, i) => (
                    <motion.li
                        key={i}
                        variants={rowVariants}
                        className="grid grid-cols-4 md:grid-cols-4 items-center border-b px-1.5 py-1"
                    >
                        <div className="truncate">{r.page}</div>
                        <div className="truncate">{r.category}</div>
                        <div className="truncate hidden sm:block">{r.issueType}</div>
                        <div
                            className={`truncate text-right font-medium ${r.status === "High"
                                ? "text-red-600"
                                : r.status === "Moderate"
                                    ? "text-amber-600"
                                    : "text-emerald-600"
                                }`}
                        >
                            {r.status}
                        </div>
                    </motion.li>
                ))}

            </div>
        </motion.div>
    );
}

const dummyResultData = [
    {
        page: 8,
        category: 'Conduct of Account',
        issueType: 'Policy Violation',
        status: 'High',
    },
    {
        page: 8,
        category: 'Conduct of Account',
        issueType: 'Internal Process Evasion',
        status: 'High',
    },
    {
        page: 8,
        category: 'Major Risk Issues',
        issueType: 'Credit Policy Violation',
        status: 'High',
    },
    {
        page: "6, 7",
        category: 'Security & Risk Conditions',
        issueType: 'Security/Documentation Conflict',
        status: 'High',
    },
    {
        page: 7,
        category: 'Financial Analysis',
        issueType: 'Capital Structure Risk',
        status: 'Moderate',
    },
    {
        page: 8,
        category: 'Waivers',
        issueType: 'Documentation/Reporting Risk',
        status: 'Moderate',
    },
];




type Stage = 'idle' | 'dropping' | 'uploading' | 'processing' | 'done';
type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5';
type Status = 'pending' | 'active' | 'done';

export default function CreditMemoReview() {
    const [stage, setStage] = useState<Stage>('idle');
    const [uploadPct, setUploadPct] = useState(0);

    // carousel that controls which frame is visible (looping)
    const [carouselStep, setCarouselStep] = useState<Step>('frame1');

    // statuses for 4-step pipeline (start all pending)
    const [statuses, setStatuses] = useState<Status[]>(['pending', 'pending', 'pending', 'pending']);
    const labels = ['Analyzing document', 'Extracting credit info', 'Preloading Regulations, Guidelines and Policy '];

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
        frame4: 4000,
        frame5: 5000,
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
    const bgUrl = '/module-animations/credit-memo-review-bg.png';

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
                {/* <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(237,242,255,0) 50%, rgba(219,228,255,0.4))',
          }}
        /> */}
            </div>

            <div className="absolute right-0.5 bottom-0.5 rounded-md shadow-xs md:right-6 md:bottom-6 md:shadow-xl md:backdrop-blur-3xl">
                {carouselStep === 'frame1' && <Frame1Upload key="f1" stage={stage} uploadPct={uploadPct} />}
                {carouselStep === 'frame2' && (
                    <Frame2ProcessingMinimal key="f2" statuses={statuses} labels={labels} />
                )}
                {carouselStep === 'frame3' && <Frame3MemoInfo key="f3" />}
                {carouselStep === 'frame4' && <Frame4Regulations key="f4" />}
                {carouselStep === 'frame5' && <Frame5Results rows={dummyResultData} key="f5" />}
            </div>
        </div>
    );
}
