import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

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
    600: "#5c7cfa",
    700: "#4c6ef5",
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
                <div className="space-y-2 max-w-[420px] w-full">
                    <div className="rounded-md bg-white/98 p-3 w-full border border-slate-200/50">
                        <div className="text-left mb-2">
                            <div className="text-[11px] font-medium text-slate-900">Upload file</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Drag or drop your financial documents here or click to upload</div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-full max-w-[320px] flex items-center justify-center">
                                <motion.div
                                    variants={boxVariants}
                                    animate={stage === "dropping" ? "dropActive" : "idle"}
                                    className="w-44 h-28 rounded-md border border-dashed border-slate-200 flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.95)" }}
                                >
                                    <div className="w-36 h-20 bg-white rounded-sm shadow-[0_6px_12px_rgba(2,6,23,0.03)] flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M12 3v10" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 7l4-4 4 4" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="4" y="13" width="16" height="6" rx="1" stroke="#e6e9ed" strokeWidth="1.0" fill="#fff" />
                                        </svg>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={
                                        stage === "dropping" || stage === "uploading"
                                            ? { opacity: 1 }
                                            : stage === "done"
                                                ? { opacity: 0.95 }
                                                : { opacity: 0 }
                                    }
                                    transition={{ duration: 0.36 }}
                                    className="absolute z-20 w-44 h-20 rounded-md bg-white border flex items-center gap-2 px-2"
                                    style={{ left: "4.6rem" }}
                                >
                                    <div className="w-8 h-8 rounded-sm bg-slate-50 border flex items-center justify-center">
                                        <svg width="14" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#374151" strokeWidth="1" strokeLinejoin="round" />
                                            <path d="M13 2v6h6" stroke="#374151" strokeWidth="1" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-[11.5px] font-medium text-slate-900 truncate">balance-sheet.pdf</div>
                                        <div className="text-[10px] text-slate-500">1.04 MB</div>
                                    </div>

                                    <div className="text-[10.5px] text-slate-500">
                                        {stage === "uploading" ? `${uploadPct}%` : ""}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: stage === "uploading" || stage === "done" ? 1 : 0,
                                    height: stage === "uploading" || stage === "done" ? "auto" : 0
                                }}
                                transition={{ duration: 0.18 }}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-[10px] text-slate-700">
                                        {stage === "uploading" ? "Uploading" : stage === "done" ? "Completed" : ""}
                                    </div>
                                    <div className="text-[10px] text-slate-700 font-medium">
                                        {stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : ""}
                                    </div>
                                </div>

                                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                    <motion.div
                                        style={{
                                            height: "100%",
                                            borderRadius: 999,
                                            background: uploadGradient,
                                            boxShadow: "0 4px 10px rgba(92,124,250,0.06)"
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : 0 }}
                                        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                                    />
                                </div>
                            </motion.div>

                            {stage === "done" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.12 }} className="mt-2 flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] font-medium text-slate-900">Processing complete</div>
                                        <div className="text-[10px] text-slate-500">Analysis finished — results are ready.</div>
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
export function Frame2ProcessingMinimal({ statuses, labels }: { statuses: Status[]; labels: string[] }) {
    const itemVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
    };

    return (
        <motion.div key="processing-frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <div className="w-full max-w-[420px] bg-white border rounded-lg shadow-sm p-3">
                <div className="text-[11px] font-medium text-slate-800 mb-2">Processing pipeline</div>

                <div className="flex flex-col gap-2">
                    {labels.map((label, idx) => {
                        const s = statuses[idx] ?? "pending";

                        return (
                            <motion.div layout initial="hidden" animate="visible" variants={itemVariants} key={label} className="flex items-center justify-between gap-3 py-2 px-2">
                                <div className="text-[10px] truncate" style={{ color: "#0f1724" }}>{label}</div>

                                <div className="min-w-[56px] flex items-center justify-end">
                                    {s === "done" ? (
                                        <div className="inline-flex items-center gap-2 text-[10px]">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <path d="M20 6L9 17l-5-5" stroke={privue[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-slate-500">Done</span>
                                        </div>
                                    ) : s === "active" ? (
                                        <div className="flex items-center gap-2 text-[10px]">
                                            <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                                                <circle cx="12" cy="12" r="10" stroke="rgba(76,110,245,0.18)" strokeWidth="2" fill="none" strokeDasharray="40" strokeDashoffset="0" />
                                                <path d="M22 12a10 10 0 00-4-7.9" stroke={privue[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-slate-500">Running</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-[10px]">
                                            <div className="w-2 h-2 rounded-full bg-slate-200" style={{ boxShadow: "inset 0 0 0 4px rgba(15,23,42,0.02)" }} />
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

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.02,
            delayChildren: 0.06,
        },
    },
};

const lineVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    },
};

// example payload (replace with your defaultPayload)
const defaultPayload = [
    {
        financial_year: "2020-2021",
        is_current: false,
        equity_and_liabilities: {
            shareholders_funds: {
                share_capital: 33240269.38,
                reserves_and_surplus: 0,
            },
            non_current_liabilities: {
                long_term_borrowings: 34206313.11,
            },
        },
        assets: {
            non_current_assets: {
                fixed_assets: {
                    tangible_assets: 27696540.29,
                },
            },
        },
    },
];

type JsonCompactFrameProps = {
    payload?: unknown;
    maxLines?: number; // how many lines to display before showing '…'
};

export function JsonCompactFrame({ payload = defaultPayload, maxLines = 12 }: JsonCompactFrameProps) {
    // stringify with small indentation and split into lines
    const txt = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
    const lines = useMemo(() => txt.split("\n"), [txt]);

    // prepare displayed lines with fallback '…' if truncated
    const displayedLines = useMemo(() => {
        if (lines.length <= maxLines) return lines;
        // keep first (maxLines - 1) lines and add an ellipsis as the last visible line
        const keep = Math.max(1, maxLines - 1);
        return [...lines.slice(0, keep), "  …"];
    }, [lines, maxLines]);

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="min-w-[360px] max-w-[480px] bg-white/96 rounded-md border border-slate-100 p-2 shadow-sm"
            aria-label="JSON compact frame"
        >
            <div className="flex items-center justify-between mb-1 px-1">
                <div className="text-[9px] font-semibold text-slate-900">Balance Sheet</div>
                <div className="text-[9px] text-slate-500">Raw Text</div>
            </div>

            {/* content area — fixed max height, clip overflow visually */}
            <div
                className="relative bg-slate-50/40 rounded-sm overflow-hidden"
                style={{ maxHeight: 160, border: "1px solid rgba(15,23,42,0.03)" }}
            >
                <div className="px-2 py-2">
                    <motion.pre
                        initial="hidden"
                        animate="show"
                        variants={containerVariants}
                        className="m-0 font-mono text-slate-700"
                        style={{
                            // compact 9px text
                            fontSize: 9,
                            lineHeight: 1.15,
                            margin: 0,
                            // allow wrapping so long lines don't overflow
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                        }}
                    >
                        {displayedLines.map((ln, i) => (
                            <motion.div
                                key={i}
                                variants={lineVariants}
                                className="overflow-hidden"
                                aria-hidden
                                style={{ margin: 0, padding: 0, display: "block" }}
                            >
                                <code
                                    style={{
                                        display: "block",
                                        fontSize: 9,
                                        color: "rgba(30,41,59,0.85)",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {ln}
                                </code>
                            </motion.div>
                        ))}
                    </motion.pre>
                </div>

                {/* visual "Read more" overlay (aligned right, small inset, font-size 9) */}
                <div
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 h-9 flex items-end justify-end pointer-events-none pr-2"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 80%)",
                    }}
                >
                    <div className="mb-2 text-[9px] text-slate-500 bg-white/40 px-2 py-0.5 rounded">
                        Read more
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

type Row = { key: string; label: string; value?: string; isGroup?: boolean };

const containerVariants2: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const rowVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

function Chevron({ open, pressed }: { open?: boolean; pressed?: boolean }) {
    return (
        <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            initial={false}
            animate={{
                rotate: open ? 90 : 0,
                y: pressed ? 1 : 0,
                scale: pressed ? 0.96 : 1,
            }}
            style={{ originX: "50%", originY: "50%" }}
        >
            <path d="M9 6l6 6-6 6" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.svg>
    );
}

const INITIAL_ROWS: Row[] = [
    { key: "equity", label: "Equity And Liabilities", value: "₹ 9,01,05,683" },
    { key: "assets", label: "Assets", value: "₹ 9,01,05,683" },
];

const EXPANDED_ROWS: Row[] = [
    { key: "title", label: "Equity And Liabilities", value: "₹ 9,01,05,683", isGroup: true },

    { key: "shareholders", label: "Shareholders Funds", value: "₹ 3,32,40,269" },
    { key: "share-app", label: "Share Application Money Pending Allotment", value: "₹ 0" },

    { key: "noncurrent", label: "Non Current Liabilities", value: "₹ 3,42,06,313" },
    { key: "current", label: "Current Liabilities", value: "₹ 2,26,59,101" },
];

export function BalanceSheetFrameMinimal() {
    const [showExpanded, setShowExpanded] = useState(false);
    const [staggerDone, setStaggerDone] = useState(false);
    const [clicked, setClicked] = useState(false);

    // rows depend on expanded state
    const rows = useMemo(() => (showExpanded ? EXPANDED_ROWS : INITIAL_ROWS), [showExpanded]);

    // timings
    const clickPauseMs = 1000; // pause after the simulated click before expanding
    const clickDelayMs = 80; // small delay before showing the pressed visual (optional)

    useEffect(() => {
        if (!staggerDone) return;
        // sequence: small delay -> pressed visual -> pause 1s -> expand -> clear pressed
        const tDelay = window.setTimeout(() => setClicked(true), clickDelayMs);
        const tExpand = window.setTimeout(() => {
            setShowExpanded(true);
            setClicked(false);
        }, clickDelayMs + clickPauseMs);

        return () => {
            clearTimeout(tDelay);
            clearTimeout(tExpand);
        };
    }, [staggerDone]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.996 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28 }}
            className="rounded-md bg-white/96 border border-slate-100 p-2 w-[400px] max-w-[500px]"
            aria-live="polite"
            aria-label="Balance Sheet"
        >
            <div className="text-[9px] font-semibold text-slate-900 mb-2 px-1">Balance Sheet</div>

            {/* key ensures the list re-runs its stagger animation when swapping between compact/expanded */}
            <motion.ul
                key={showExpanded ? "expanded" : "compact"}
                initial="hidden"
                animate="show"
                variants={containerVariants2}
                onAnimationComplete={() => {
                    // only set staggerDone when compact view completes; avoid retriggering after expanding
                    if (!showExpanded) setStaggerDone(true);
                }}
                className="flex flex-col"
            >
                {rows.map((r, idx) => {
                    const isFirst = idx === 0 && !showExpanded; // the interactive chevron in initial state is on first row
                    const isGroupHeader = !!r.isGroup;

                    return (
                        <motion.li
                            key={r.key}
                            variants={rowVariants}
                            className={`flex items-center px-2 py-1 text-[9px] ${isGroupHeader ? "font-medium text-slate-800" : "text-slate-800"}`}
                        >
                            <div className="flex items-center gap-2 min-w-0 w-full">
                                {/* chevron: visible for first compact row or for group header when expanded */}
                                <div className={`w-4 h-4 flex items-center justify-center ${isFirst || isGroupHeader ? "" : "opacity-0"}`}>
                                    <Chevron open={showExpanded} pressed={clicked && isFirst} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className={`truncate ${isGroupHeader ? "font-medium" : ""}`}>{r.label}</div>
                                </div>

                                <div className="w-[120px] text-right font-medium">{r.value ?? ""}</div>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
        </motion.div>
    );
}



type Stage = "idle" | "dropping" | "uploading" | "processing" | "done";
type Step = "frame1" | "frame2" | "frame3" | "frame4" | "frame5";
type Status = "pending" | "active" | "done";

export default function FinancialDocumentParsing() {
    const [stage, setStage] = useState<Stage>("idle");
    const [uploadPct, setUploadPct] = useState(0);

    // carousel that controls which frame is visible (looping)
    const [carouselStep, setCarouselStep] = useState<Step>("frame1");

    // statuses for 4-step pipeline (start all pending)
    const [statuses, setStatuses] = useState<Status[]>(["pending", "pending", "pending", "pending"]);
    const labels = [
        "Analyzing structure",
        "Extracting text",
        "Processing financial data",
        "Generating output",
    ];

    const timers = useRef<number[]>([]);

    const clearAllTimers = () => {
        timers.current.forEach((id) => clearTimeout(id));
        timers.current = [];
    };

    // --- start / simulate the upload-processing pipeline ---
    const startCycle = () => {
        clearAllTimers();
        setStage("idle");
        setUploadPct(0);

        // small delays to mimic dropping -> uploading
        const t0 = window.setTimeout(() => {
            setStage("dropping");
        }, 500);

        const t1 = window.setTimeout(() => {
            setStage("uploading");
        }, 1200);

        timers.current.push(t0 as unknown as number, t1 as unknown as number);
    };

    // when the carousel becomes frame1, (re)start the pipeline
    useEffect(() => {
        if (carouselStep === "frame1") startCycle();
        // do not clearAllTimers here — timers are cleared inside startCycle and other effects
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carouselStep]);

    // upload progress simulation (unchanged logic, but DO NOT change carouselStep here)
    useEffect(() => {
        if (stage !== "uploading") return;
        setUploadPct(3);
        let v = 3;
        const id = window.setInterval(() => {
            v += Math.random() * 6 + 3;
            if (v >= 100) {
                setUploadPct(100);
                clearInterval(id);

                const t = window.setTimeout(() => {
                    setStage("processing");
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
        if (stage !== "processing") return;

        clearAllTimers();
        setStatuses(["pending", "pending", "pending", "pending"]);

        const stepDur = 650;
        const gap = 250;

        labels.forEach((_, idx) => {
            const start = idx * (stepDur + gap);

            const tActive = window.setTimeout(() => {
                setStatuses((prev) => {
                    const copy = [...prev];
                    copy[idx] = "active";
                    return copy;
                });
            }, start);

            const tDone = window.setTimeout(() => {
                setStatuses((prev) => {
                    const copy = [...prev];
                    copy[idx] = "done";
                    return copy;
                });
            }, start + stepDur);

            timers.current.push(tActive as unknown as number, tDone as unknown as number);

            if (idx === labels.length - 1) {
                const tFinish = window.setTimeout(() => {
                    setStage("done");
                    // DON'T set carouselStep here. Let the carousel move to the next frame.
                }, start + stepDur + 450);
                timers.current.push(tFinish as unknown as number);
            }
        });

        return () => clearAllTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    const stepsArr: Step[] = ["frame1", "frame2", "frame3", "frame4", "frame5"];

    const durations: Record<Step, number> = {
        frame1: 4500,
        frame2: 3000, // short timer here is OK because we handle frame2 separately below
        frame3: 4000,
        frame4: 5000,
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
        if (carouselStep === "frame2") return; // handled in separate effect

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
        if (carouselStep !== "frame2") return;

        const nextStepTimeoutAfterDone = 600; // small buffer so "done" state is visible
        const fallbackMs = 30_000; // fallback to avoid deadlock

        // If processing already finished by the time we land on frame2, advance shortly.
        if (stage === "done") {
            const id = window.setTimeout(() => advanceToNext("frame2"), nextStepTimeoutAfterDone);
            return () => clearTimeout(id);
        }

        // Not done yet — set a fallback timeout to advance anyway if something goes wrong.
        const fallbackId = window.setTimeout(() => advanceToNext("frame2"), fallbackMs);

        // Also listen for stage changes (via dependency array): when stage becomes "done", the effect re-runs
        // and the branch above will schedule the short buffer advance and clear fallback.
        return () => clearTimeout(fallbackId);
    }, [carouselStep, stage]);
    const bgUrl = "/module-animations/financial-risk-bg.png";

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img src={bgUrl} alt="background" className="w-full h-full object-contain backdrop-opacity-95" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(237,242,255,0) 50%, rgba(219,228,255,0.4))",
                    }}
                />
            </div>

            <div className="absolute bottom-6 right-6">
                {carouselStep === "frame1" && <Frame1Upload key="f1" stage={stage} uploadPct={uploadPct} />}
                {carouselStep === "frame2" && <Frame2ProcessingMinimal key="f2" statuses={statuses} labels={labels} />}
                {carouselStep === "frame3" && <JsonCompactFrame key="f3" />}
                {carouselStep === "frame4" && <BalanceSheetFrameMinimal key="f4" />}
                {carouselStep === "frame5" && <JsonCompactFrame key="f5" />}
            </div>
        </div>
    );
}
