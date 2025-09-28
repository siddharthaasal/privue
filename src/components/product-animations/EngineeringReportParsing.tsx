// ComplianceRisk_with_embedded_bg.tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/* ------------------------
  Types
-------------------------*/
type Stage = "idle" | "dropping" | "uploading" | "processing" | "done";
type Step = "frame1" | "frame2" | "frame3";

function ProcessingCompact({
    statuses,
    labels,
}: {
    statuses: Array<"done" | "active" | "pending">;
    labels: string[];
}) {
    return (
        <div className="w-full flex justify-center">
            <div
                className="w-full max-w-[500px] bg-white border rounded-md p-1"
                style={{
                    // Privue palette (move to global css if desired)
                    ["--priv-600" as any]: "#5c7cfa",
                    ["--priv-700" as any]: "#4c6ef5",
                    ["--muted" as any]: "#f3f4f6",
                    ["--muted-2" as any]: "#f8fafb",
                    ["--ink" as any]: "#0f172a",
                }}
                aria-hidden
            >
                <div className="flex flex-col divide-y" style={{ borderColor: "var(--muted)" }}>
                    {labels.map((label, idx) => {
                        const s = statuses[idx];

                        return (
                            <div key={label} className="flex items-center justify-between gap-3 px-3 py-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    {/* MARKER */}
                                    <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                                        {s === "done" ? (
                                            <div
                                                className="grid place-items-center w-6 h-6 rounded-full"
                                                style={{
                                                    background: "var(--priv-600)",
                                                    color: "#fff",
                                                    fontSize: 11,
                                                    lineHeight: 1,
                                                }}
                                                aria-hidden
                                            >
                                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden>
                                                    <path d="M1 4.2L4.2 7.5 11 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        ) : s === "active" ? (
                                            <motion.div
                                                className="grid place-items-center w-6 h-6 rounded-full"
                                                initial={{ scale: 0.98 }}
                                                animate={{ scale: [1, 1.06, 1] }}
                                                transition={{ duration: 0.9, repeat: Infinity }}
                                                style={{
                                                    border: "1px solid rgba(76,110,245,0.16)",
                                                    color: "var(--priv-700)",
                                                    fontSize: 11,
                                                }}
                                                aria-hidden
                                            >
                                                {idx + 1}
                                            </motion.div>
                                        ) : (
                                            <div
                                                className="grid place-items-center w-6 h-6 rounded-full"
                                                style={{
                                                    background: "var(--muted-2)",
                                                    color: "#94a3b8",
                                                    fontSize: 11,
                                                }}
                                                aria-hidden
                                            >
                                                {idx + 1}
                                            </div>
                                        )}
                                    </div>

                                    {/* TEXT + MICRO PROGRESS */}
                                    <div className="min-w-0">
                                        <div
                                            className=" font-medium"
                                            style={{ color: "var(--ink)", fontSize: 11, lineHeight: 1.05 }}
                                        >
                                            {label}
                                        </div>

                                        <div className="mt-1 flex items-center gap-3">
                                            {/* clean thin progress pill */}
                                            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[color:var(--muted)]">
                                                <div
                                                    style={{
                                                        height: "100%",
                                                        borderRadius: 999,
                                                        width: s === "done" ? "100%" : s === "active" ? "46%" : "6%",
                                                        background: s === "done"
                                                            ? "linear-gradient(90deg,var(--priv-600),var(--priv-700))"
                                                            : "rgba(100,116,139,0.08)",
                                                        transition: "width 420ms ease",
                                                    }}
                                                />
                                            </div>

                                            {/* RIGHT-SIDE STATUS / PILL */}
                                            <div className="flex items-center justify-end min-w-[68px]">
                                                {s === "active" ? (
                                                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                                        {/* small dotted spinner */}
                                                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                                                            <g fill="none" stroke="#e6eefc" strokeWidth="1.6">
                                                                <circle cx="12" cy="12" r="10" strokeDasharray="2 4" opacity="0.9" />
                                                            </g>
                                                            <path d="M22 12a10 10 0 00-4-7.9" stroke="var(--priv-600)" strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                        <span style={{ color: "#64748b", whiteSpace: "nowrap" }}>Running</span>
                                                    </div>
                                                ) : s === "done" ? (
                                                    <div
                                                        className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                                                        style={{
                                                            // background: "rgba(92,124,250,0.08)",
                                                            color: "var(--priv-700)",
                                                            border: "1px solid rgba(92,124,250,0.12)",
                                                        }}
                                                    >
                                                        Completed
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px]"
                                                        style={{
                                                            background: "rgba(15,23,42,0.02)",
                                                            color: "#94a3b8",
                                                            border: "1px solid rgba(15,23,42,0.03)",
                                                        }}
                                                    >
                                                        Pending
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}



/* timing constants (picked from your last snippet) */
const INITIAL_DELAY = 100; // first pause before incoming typing
const INCOMING_TYPING_MS = 90; // how long incoming typing shows before reply starts

const USER_QUESTION = "What is the age of the plant?";

const ANSWER_PARAGRAPHS = [
    "The Odisha Power Generation Corporation (OPGC) has four units with the following commissioning dates and ages as of 2024:",
    "• Unit 1: Commissioned on June 2, 1994 (29 years old)",
    "• Unit 2: Commissioned on October 22, 1995 (28 years old)",
    "• Unit 3: Commissioned in 2019 (approximately 5 years old)",
    "• Unit 4: Commissioned in 2019 (approximately 5 years old)",
];

// ---------- Frame 3: Chat with staggered reveal + Add to Notes button ----------
export function Frame3Chat({
    onAddToNotes,
    autoProceedDelay = 1400, // fallback if we need to force transition
}: {
    onAddToNotes: () => void;
    autoProceedDelay?: number;
}) {
    const [phase, setPhase] = useState<
        "hidden" | "userShown" | "incomingTyping" | "answerShown"
    >("hidden");

    const [buttonPressed, setButtonPressed] = useState(false);

    useEffect(() => {
        // lifecycle: show user, small incoming typing, then reveal answer
        const t0 = window.setTimeout(() => setPhase("userShown"), 0);
        const t1 = window.setTimeout(() => setPhase("incomingTyping"), INITIAL_DELAY);
        const t2 = window.setTimeout(() => setPhase("answerShown"), INITIAL_DELAY + INCOMING_TYPING_MS + 160);

        // auto-press Add to Notes *after* the staggered reveal finishes.
        // compute estimated reveal duration: staggerDelay * lines + revealDuration + small buffer
        const staggerDelay = 220; // per-line stagger
        const revealDuration = 360; // per-line animation time
        const estimatedRevealMs = staggerDelay * ANSWER_PARAGRAPHS.length + revealDuration + 300;

        const autoClickDelay = Math.max(estimatedRevealMs, autoProceedDelay) + INITIAL_DELAY + INCOMING_TYPING_MS;

        const tAuto = window.setTimeout(() => {
            // animate button press before handing control to parent
            setButtonPressed(true);
            const tPress = window.setTimeout(() => {
                setButtonPressed(false);
                onAddToNotes();
            }, 260);
            // keep track to clear if unmounted
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formattedTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const containerVariants: Variants = {
        visible: {
            transition: { staggerChildren: 0.22, delayChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.36, ease: "easeOut" }, // <--- use named easing
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-3 w-[500px]"
            aria-live="polite"
        >
            <div className="text-[13px] font-semibold text-slate-900 mb-3">Engineering Report Assistant</div>

            <div className="flex flex-col gap-3">
                {/* User bubble */}
                {(phase === "userShown" || phase === "incomingTyping" || phase === "answerShown") && (
                    <div className="self-end max-w-[86%]">
                        <div className="inline-block rounded-[12px] bg-privue-700 text-white px-3 py-2 text-[13px] shadow-[0_6px_18px_rgba(76,110,245,0.08)]">
                            {USER_QUESTION}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 text-right">{formattedTime}</div>
                    </div>
                )}

                {/* Incoming typing */}
                {phase === "incomingTyping" && (
                    <div className="self-start">
                        <div className="inline-flex items-center rounded-xl bg-slate-50 border px-2 py-1" style={{ borderColor: "rgba(15,23,36,0.03)" }}>
                            <div className="text-[11px] text-slate-500">Typing…</div>
                        </div>
                    </div>
                )}

                {/* Answer bubble */}
                {phase === "answerShown" && (
                    <div className="self-start max-w-full">
                        <div className="bg-white border rounded-[12px] p-3" style={{ borderColor: "rgba(15,23,36,0.04)" }}>
                            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col gap-2 text-[12px] text-[#0f1724]">
                                {ANSWER_PARAGRAPHS.map((line, i) => (
                                    <motion.div key={i} variants={itemVariants} className="leading-[1.4]">
                                        {line}
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Add to Notes button */}
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={() => {
                                        setButtonPressed(true);
                                        setTimeout(() => {
                                            setButtonPressed(false);
                                            onAddToNotes();
                                        }, 160);
                                    }}
                                    className={`px-3 py-1.5 rounded-md text-[12px] font-medium text-white transition ${buttonPressed ? "bg-privue-800 scale-[0.98]" : "bg-privue-700 hover:bg-privue-800"
                                        }`}
                                    style={{ transformOrigin: "center" }}
                                >
                                    Add to Notes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// ---------- Frame 4: Saved Note card (looks like your screenshot) ----------
export function Frame4Note({ title = "Note #1", onDone }: { title?: string; onDone?: () => void }) {
    // if you want a 'copied' icon or action, add here
    useEffect(() => {
        // optional auto-close or callback after showing note; uncomment if desired
        // const t = setTimeout(() => onDone?.(), 2500);
        // return () => clearTimeout(t);
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white border shadow-sm w-[500px] p-4"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-privue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-[13px] text-slate-800">{title}</span>
                </div>

                <div>
                    {/* copy icon (placeholder) */}
                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h9a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 5h.01" />
                    </svg>
                </div>
            </div>

            <div className="text-[13px] text-slate-700 leading-[1.5]">
                {ANSWER_PARAGRAPHS.map((line, i) => (
                    <div key={i} className="mb-1">
                        {line}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// ---------- Demo container: Frame3 -> auto Add to Notes -> Frame4 ----------
function ChatToNotesDemo() {
    const [step, setStep] = useState<"chat" | "note">("chat");

    return (
        <div className="flex flex-col items-center gap-6">
            <AnimatePresence mode="wait">
                {step === "chat" ? (
                    <Frame3Chat
                        key="f3"
                        onAddToNotes={() => {
                            // simulate immediate transition to frame 4 when notes are added
                            setStep("note");
                        }}
                    />
                ) : (
                    <Frame4Note key="f4" />
                )}
            </AnimatePresence>
        </div>
    );
}








/* ------------------------
  Top-level component: orchestrates upload -> processing frames
  - Frame 1: Uploading (shows upload card)
  - Frame 2: Processing (shows compact stepper only; uploaded file hidden)
  - When processing completes we set stage to "done" and you can transition to frame3 if desired
-------------------------*/
export default function EngineeringReportParsing() {
    const [stage, setStage] = useState<Stage>("idle");
    const [uploadPct, setUploadPct] = useState(0);
    const [step, setStep] = useState<Step>("frame1");

    // statuses for the 4-step pipeline
    const [statuses, setStatuses] = useState<Array<"done" | "active" | "pending">>([
        "done",
        "done",
        "pending",
        "pending",
    ]);

    const labels = [
        "Analyzing engineering structure",
        "Extracting technical specifications",
        "Processing engineering data",
        "Generating analysis output",
    ];

    const timers = useRef<number[]>([]);

    // orchestrate initial mount -> dropping -> uploading
    useEffect(() => {
        const t0 = window.setTimeout(() => {
            setStage("dropping");
            setStep("frame1"); // ensure we're on the uploading frame initially
        }, 600);

        const t1 = window.setTimeout(() => {
            setStage("uploading");
            setStep("frame1");
        }, 1600);

        timers.current.push(t0, t1);
        return () => {
            timers.current.forEach((id) => clearTimeout(id));
            timers.current = [];
        };
    }, []);

    // upload simulation (same behavior) — after upload completes move to processing/frame2
    useEffect(() => {
        if (stage !== "uploading") return;
        setUploadPct(4);
        let v = 4;
        const id = window.setInterval(() => {
            v += Math.random() * 10 + 6;
            if (v >= 100) {
                setUploadPct(100);
                clearInterval(id);
                // short pause then start processing (and move to frame2)
                const t = window.setTimeout(() => {
                    setStage("processing");
                    setStep("frame2"); // switch to frame2 (processing)
                }, 450);
                timers.current.push(t);
            } else {
                setUploadPct(Math.round(v));
            }
        }, 110);
        timers.current.push(id);
        return () => clearInterval(id);
    }, [stage]);

    // when processing starts, run stepwise animation (minimal), and hide the uploaded file card by being on frame2
    useEffect(() => {
        if (stage !== "processing") return;

        // clear previous timers
        timers.current.forEach((id) => clearTimeout(id));
        timers.current = [];

        // start state: first two done, others pending
        setStatuses(["done", "done", "pending", "pending"]);

        const stepDur = 1400; // how long each step stays 'active' before becoming done
        const gap = 260; // small gap between transitions

        const scheduleStep = (idx: number, startAfter: number) => {
            const tActive = window.setTimeout(() => {
                setStatuses((prev) => {
                    const copy = [...prev];
                    copy[idx] = "active";
                    return copy;
                });
            }, startAfter);
            timers.current.push(tActive);

            const tDone = window.setTimeout(() => {
                setStatuses((prev) => {
                    const copy = [...prev];
                    copy[idx] = "done";
                    return copy;
                });
                if (idx === 3) {
                    const tFinish = window.setTimeout(() => {
                        setStage("done");
                        // optionally move to frame3 — here we set to frame3 after short pause
                        setStep("frame3");
                    }, 350);
                    timers.current.push(tFinish);
                }
            }, startAfter + stepDur);
            timers.current.push(tDone);
        };

        // schedule processing steps
        scheduleStep(2, 220);
        scheduleStep(3, 220 + stepDur + gap);

        // cleanup on unmount / stage change
        return () => {
            timers.current.forEach((id) => clearTimeout(id));
            timers.current = [];
        };
    }, [stage]);

    /* small variants & styles from your original upload card */
    const boxVariants: Variants = {
        idle: { opacity: 1, scale: 1 },
        dropActive: { scale: 1.01, transition: { duration: 0.28 } },
    };

    const fileVariants: Variants = {
        off: { y: -60, opacity: 0, scale: 0.98, rotate: -6 },
        dropIn: { y: 0, opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
        finished: { y: -6, opacity: 0.95, scale: 0.98, transition: { duration: 0.36 } },
    };

    const checkVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
    };

    const uploadGradient = "linear-gradient(90deg,#3b82f6,#a78bfa)";

    /* ---------- SVG radar & threat frames unchanged (kept for context) ---------- */




    /* ---------- Render area  ---------- */
    // background / container (keeps your embedded bg)
    const bgUrl = "/module-animations/adverse-news-bg.png";

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img src={bgUrl} alt="background" className="w-full h-full object-contain backdrop-opacity-90" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)",
                    }}
                />
            </div>

            <div className="absolute bottom-6 right-6">
                {/* FRAME 1: Upload card (only when on frame1 or uploading) */}
                <AnimatePresence>
                    {step === "frame1" && (
                        <motion.div key="upload-frame" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.28 }}>
                            <div className="space-y-4 max-w-[500px] w-full">
                                {/* keep the upload card exactly as you had it */}
                                <div className="rounded-lg bg-white/95 p-6 w-full border border-slate-200/60 shadow-[0_8px_30px_rgba(2,6,23,0.04)]">
                                    {/* Heading */}
                                    <div className="text-center mb-4">
                                        <div className="text-[18px] font-semibold text-slate-900">Upload file</div>
                                        <div className="text-[13px] text-slate-500 mt-1">Drag or drop your files here or click to upload</div>
                                    </div>

                                    {/* center visual area (unchanged) */}
                                    <div className="flex justify-center">
                                        <div className="relative w-full max-w-[380px] flex items-center justify-center">
                                            {/* subtle tiled background */}
                                            <div className="absolute inset-0 pointer-events-none opacity-40">
                                                <svg width="100%" height="150" viewBox="0 0 380 150" preserveAspectRatio="none">
                                                    <defs>
                                                        <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
                                                            <rect width="26" height="26" fill="#ffffff" />
                                                            <rect x="1" y="1" width="24" height="24" fill="#fbfbfd" stroke="#f3f4f6" strokeWidth="0.5" />
                                                        </pattern>
                                                    </defs>
                                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                                </svg>
                                            </div>

                                            {/* dashed drop area */}
                                            <motion.div variants={boxVariants} animate={stage === "dropping" ? "dropActive" : "idle"} className="w-56 h-40 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                                                <div className="w-40 h-28 bg-white rounded-md shadow-[0_20px_40px_rgba(2,6,23,0.04)] flex items-center justify-center">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                        <path d="M12 3v10" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8 7l4-4 4 4" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                        <rect x="4" y="13" width="16" height="6" rx="1" stroke="#e6e9ed" strokeWidth="1.2" fill="#fff" />
                                                    </svg>
                                                </div>
                                            </motion.div>

                                            {/* file card that drops in */}
                                            <motion.div initial="off" animate={stage === "dropping" || stage === "uploading" ? "dropIn" : stage === "done" ? "finished" : "off"} variants={fileVariants} className="absolute z-20 w-48 h-28 rounded-lg bg-white border shadow-[0_14px_30px_rgba(2,6,23,0.06)] flex items-center gap-3 px-3" style={{ left: "6rem" }}>
                                                <div className="w-10 h-10 rounded-md bg-slate-50 border flex items-center justify-center">
                                                    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                        <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#374151" strokeWidth="1.2" strokeLinejoin="round" />
                                                        <path d="M13 2v6h6" stroke="#374151" strokeWidth="1.2" strokeLinejoin="round" />
                                                    </svg>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[13px] font-medium text-slate-900 truncate">engineering_report.pdf</div>
                                                    <div className="text-[11px] text-slate-500">1.2 MB</div>
                                                </div>

                                                <div className="text-[12px] text-slate-500">{stage === "uploading" ? `${uploadPct}%` : ""}</div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* progress area (unchanged) */}
                                    <div className="mt-6">
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: stage === "uploading" || stage === "done" ? 1 : 0, height: stage === "uploading" || stage === "done" ? "auto" : 0 }} transition={{ duration: 0.28 }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-[12px] text-slate-700">{stage === "uploading" ? "Uploading" : stage === "done" ? "Completed" : ""}</div>
                                                <div className="text-[12px] text-slate-700 font-medium">{stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : ""}</div>
                                            </div>

                                            <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
                                                <motion.div style={{ height: "100%", borderRadius: 999, background: uploadGradient, boxShadow: "0 6px 20px rgba(59,130,246,0.12)" }} initial={{ width: 0 }} animate={{ width: stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} />
                                            </div>
                                        </motion.div>

                                        {stage === "done" && (
                                            <motion.div initial="hidden" animate="visible" variants={checkVariants} className="mt-4 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                        <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-[13px] font-medium text-slate-900">Processing complete</div>
                                                    <div className="text-[12px] text-slate-500">Analysis finished — results are ready.</div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FRAME 2: Processing compact — only show when step === frame2 (uploaded file is hidden here) */}
                <AnimatePresence>
                    {step === "frame2" && (
                        <motion.div key="processing-frame" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.28 }}>
                            <ProcessingCompact statuses={statuses} labels={labels} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FRAME 3: After processing completes (optional) */}
                <AnimatePresence>
                    {step === "frame3" && (
                        <motion.div key="frame3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.28 }}>
                            <ChatToNotesDemo />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
