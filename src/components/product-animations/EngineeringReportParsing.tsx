import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

/* ------------------------
  Types
-------------------------*/
type Stage = "idle" | "dropping" | "uploading" | "processing" | "done";
type Step = "frame1" | "frame2" | "frame3" | "frame4";

type Status = "done" | "active" | "pending";

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

            <motion.div key="upload-frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
                <div className="space-y-4 max-w-[500px] w-full">
                    <div className="rounded-lg bg-white/95 p-5 w-full border border-slate-200/60 shadow-sm">
                        <div className="text-center mb-3">
                            <div className="text-[17px] font-semibold text-slate-900">Upload file</div>
                            <div className="text-[12.5px] text-slate-500 mt-1">Drag or drop your files here or click to upload</div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-full max-w-[360px] flex items-center justify-center">
                                <motion.div variants={boxVariants} animate={stage === "dropping" ? "dropActive" : "idle"} className="w-52 h-36 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                                    <div className="w-40 h-24 bg-white rounded-md shadow-[0_10px_20px_rgba(2,6,23,0.04)] flex items-center justify-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M12 3v10" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 7l4-4 4 4" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="4" y="13" width="16" height="6" rx="1" stroke="#e6e9ed" strokeWidth="1.2" fill="#fff" />
                                        </svg>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={stage === "dropping" || stage === "uploading" ? { opacity: 1 } : stage === "done" ? { opacity: 0.95 } : { opacity: 0 }} transition={{ duration: 0.48 }} className="absolute z-20 w-48 h-26 rounded-lg bg-white border shadow-[0_10px_30px_rgba(2,6,23,0.06)] flex items-center gap-3 px-3" style={{ left: "5.6rem" }}>
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

                        <div className="mt-5">
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: stage === "uploading" || stage === "done" ? 1 : 0, height: stage === "uploading" || stage === "done" ? "auto" : 0 }} transition={{ duration: 0.24 }}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[12px] text-slate-700">{stage === "uploading" ? "Uploading" : stage === "done" ? "Completed" : ""}</div>
                                    <div className="text-[12px] text-slate-700 font-medium">{stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : ""}</div>
                                </div>

                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">{/* reduced thickness */}
                                    <motion.div style={{ height: "100%", borderRadius: 999, background: uploadGradient, boxShadow: "0 6px 16px rgba(92,124,250,0.08)" }} initial={{ width: 0 }} animate={{ width: stage === "uploading" ? `${uploadPct}%` : stage === "done" ? "100%" : 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }} />
                                </div>
                            </motion.div>

                            {stage === "done" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="mt-3 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
                <div className="text-[13px] font-medium text-slate-800 mb-2">Processing pipeline</div>

                <div className="flex flex-col gap-2">
                    {labels.map((label, idx) => {
                        const s = statuses[idx] ?? "pending";

                        return (
                            <motion.div layout initial="hidden" animate="visible" variants={itemVariants} key={label} className="flex items-center justify-between gap-3 py-2 px-2">
                                <div className="text-[13px] truncate" style={{ color: "#0f1724" }}>{label}</div>

                                <div className="min-w-[56px] flex items-center justify-end">
                                    {s === "done" ? (
                                        <div className="inline-flex items-center gap-2 text-[12px]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <path d="M20 6L9 17l-5-5" stroke={privue[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-slate-500">Done</span>
                                        </div>
                                    ) : s === "active" ? (
                                        <div className="flex items-center gap-2 text-[12px]">
                                            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                                                <circle cx="12" cy="12" r="10" stroke="rgba(76,110,245,0.18)" strokeWidth="2" fill="none" strokeDasharray="40" strokeDashoffset="0" />
                                                <path d="M22 12a10 10 0 00-4-7.9" stroke={privue[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-slate-500">Running</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-[12px]">
                                            <div className="w-3 h-3 rounded-full bg-slate-200" style={{ boxShadow: "inset 0 0 0 4px rgba(15,23,42,0.02)" }} />
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
export function Frame3Chat({ onAddToNotes, autoProceedDelay = 3200 }: { onAddToNotes: () => void; autoProceedDelay?: number }) {
    const [phase, setPhase] = useState<"hidden" | "userShown" | "incomingTyping" | "answerShown">("hidden");
    const [buttonPressed, setButtonPressed] = useState(false);

    useEffect(() => {
        const t0 = window.setTimeout(() => setPhase("userShown"), 0);
        const t1 = window.setTimeout(() => setPhase("incomingTyping"), 120);
        const t2 = window.setTimeout(() => setPhase("answerShown"), 120 + 120 + 180);

        const staggerDelay = 220;
        const revealDuration = 360;
        const ANSWER_PARAGRAPHS = [
            "The Odisha Power Generation Corporation (OPGC) has four units with the following commissioning dates and ages as of 2024:",
            "• Unit 1: Commissioned on June 2, 1994 (29 years old)",
            "• Unit 2: Commissioned on October 22, 1995 (28 years old)",
            "• Unit 3: Commissioned in 2019 (approximately 5 years old)",
            "• Unit 4: Commissioned in 2019 (approximately 5 years old)",
        ];

        const estimatedRevealMs = staggerDelay * ANSWER_PARAGRAPHS.length + revealDuration + 300;
        const autoClickDelay = Math.max(estimatedRevealMs, autoProceedDelay) + 120;

        const tAuto = window.setTimeout(() => {
            setButtonPressed(true);
            const tPress = window.setTimeout(() => {
                setButtonPressed(false);
                onAddToNotes();
            }, 260);
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

    const formattedTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const containerVariants: Variants = { visible: { transition: { staggerChildren: 0.22, delayChildren: 0.08 } } };
    const itemVariants: Variants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } } };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }} className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-3 w-[500px]" aria-live="polite">
            <div className="text-[13px] font-semibold text-slate-900 mb-3">Engineering Report Assistant</div>

            <div className="flex flex-col gap-3">
                {(phase === "userShown" || phase === "incomingTyping" || phase === "answerShown") && (
                    <div className="self-end max-w-[86%]">
                        <div className="inline-block rounded-[12px] bg-privue-700 text-white px-3 py-2 text-[13px] shadow-[0_6px_18px_rgba(76,110,245,0.08)]">What is the age of the plant?</div>
                        <div className="text-[10px] text-slate-500 mt-1 text-right">{formattedTime}</div>
                    </div>
                )}

                {phase === "incomingTyping" && (
                    <div className="self-start">
                        <div className="inline-flex items-center rounded-xl bg-slate-50 border px-2 py-1" style={{ borderColor: "rgba(15,23,36,0.03)" }}>
                            <div className="text-[11px] text-slate-500">Typing…</div>
                        </div>
                    </div>
                )}

                {phase === "answerShown" && (
                    <div className="self-start max-w-full">
                        <div className="bg-white border rounded-[12px] p-3" style={{ borderColor: "rgba(15,23,36,0.04)" }}>
                            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col gap-2 text-[12px] text-[#0f1724]">
                                <motion.div variants={itemVariants} className="leading-[1.4]">The Odisha Power Generation Corporation (OPGC) has four units with the following commissioning dates and ages as of 2024:</motion.div>
                                <motion.div variants={itemVariants} className="leading-[1.4]">• Unit 1: Commissioned on June 2, 1994 (29 years old)</motion.div>
                                <motion.div variants={itemVariants} className="leading-[1.4]">• Unit 2: Commissioned on October 22, 1995 (28 years old)</motion.div>
                                <motion.div variants={itemVariants} className="leading-[1.4]">• Unit 3: Commissioned in 2019 (approximately 5 years old)</motion.div>
                                <motion.div variants={itemVariants} className="leading-[1.4]">• Unit 4: Commissioned in 2019 (approximately 5 years old)</motion.div>
                            </motion.div>

                            <div className="mt-3 flex justify-end">
                                <button onClick={() => { setButtonPressed(true); setTimeout(() => { setButtonPressed(false); onAddToNotes(); }, 160); }} className={`px-3 py-1.5 rounded-md text-[12px] font-medium text-white transition ${buttonPressed ? "bg-privue-800 scale-[0.98]" : "bg-privue-700 hover:bg-privue-800"}`} style={{ transformOrigin: "center" }}>
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

/* ---------- FRAME 4: Saved Notes (minimal cards; new added on TOP with distinct bg) ---------- */
export function Frame4SavedNotes({ onComplete }: { onComplete?: () => void }) {
    const [notes, setNotes] = useState<Array<{ id: string; title: string; body: string; isNew?: boolean }>>([
        { id: "n1", title: "Plant ages summary", body: "Unit1: 1994 (29y). Unit2: 1995 (28y). Unit3&4: 2019 (~5y)." },
        { id: "n2", title: "Key specs extracted", body: "Rated capacity, commissioning dates, and boiler type captured." },
    ]);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // show existing notes first, then show a tiny 'Saving...' loader, then pop the new note on top
        const timersForCleanup: number[] = [];

        const tShowSaving = window.setTimeout(() => {
            setSaving(true);
            const tAdd = window.setTimeout(() => {
                const newNote = { id: `n${Date.now()}`, title: "Analysis snippet", body: "Added: analysis summary & suggested follow-ups.", isNew: true };
                setNotes((prev) => [newNote, ...prev.map((p) => ({ ...p, isNew: false }))]);
                setSaving(false);

                const tClear = window.setTimeout(() => setNotes((prev) => prev.map((p) => ({ ...p, isNew: false }))), 2200);
                timersForCleanup.push(tClear as unknown as number);

                // call onComplete after a short delay so top-level can advance / loop
                const tComplete = window.setTimeout(() => onComplete && onComplete(), 1200);
                timersForCleanup.push(tComplete as unknown as number);
            }, 900);
            timersForCleanup.push(tAdd as unknown as number);
        }, 600);

        timersForCleanup.push(tShowSaving as unknown as number);

        return () => timersForCleanup.forEach((id) => clearTimeout(id));
    }, [onComplete]);

    // const itemVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.32, ease: "easeOut" } }, exit: { opacity: 0, transition: { duration: 0.22 } } };

    return (
        <motion.div key="frame4" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.001 }} className="rounded-lg bg-white border shadow-sm w-[460px] p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke={privue[700]} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-[13px] text-slate-800">Saved Notes</span>
                </div>
            </div>

            <div className="flex flex-col gap-2" role="list">
                {notes.map((note) => (
                    <div key={note.id} className="rounded-md border p-3" style={{ background: note.isNew ? `linear-gradient(180deg, ${privue[600]}20, ${privue[700]}12)` : "#fff" }}>
                        <div className="text-[13px] font-medium text-slate-800">{note.title}</div>
                        <div className="text-[12px] text-slate-600 mt-1 truncate">{note.body}</div>
                    </div>
                ))}

                {saving && (
                    <div className="mt-2 flex items-center gap-2 text-[13px] text-slate-500">
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                            <circle cx="12" cy="12" r="10" stroke="rgba(76,110,245,0.18)" strokeWidth="2" fill="none" strokeDasharray="40" strokeDashoffset="0" />
                            <path d="M22 12a10 10 0 00-4-7.9" stroke={privue[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    const [stage, setStage] = useState<Stage>("idle");
    const [uploadPct, setUploadPct] = useState(0);
    const [step, setStep] = useState<Step>("frame1");

    // statuses for 4-step pipeline (start all pending)
    const [statuses, setStatuses] = useState<Array<Status>>(["pending", "pending", "pending", "pending"]);
    const labels = [
        "Analyzing engineering structure",
        "Extracting technical specifications",
        "Processing engineering data",
        "Generating analysis output",
    ];

    const timers = useRef<number[]>([]);

    const clearAllTimers = () => {
        timers.current.forEach((id) => clearTimeout(id));
        timers.current = [];
    };

    const startCycle = () => {
        clearAllTimers();
        setStage("idle");
        setUploadPct(0);
        setStep("frame1");

        const t0 = window.setTimeout(() => {
            setStage("dropping");
            setStep("frame1");
        }, 500);

        const t1 = window.setTimeout(() => {
            setStage("uploading");
            setStep("frame1");
        }, 1200);

        timers.current.push(t0 as unknown as number, t1 as unknown as number);
    };

    useEffect(() => {
        startCycle();
        return () => clearAllTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    setStep("frame2");
                }, 360);
                timers.current.push(t as unknown as number);
            } else setUploadPct(Math.round(v));
        }, 160);

        timers.current.push(id as unknown as number);
        return () => clearInterval(id);
    }, [stage]);

    // processing: reveal each of the 4 steps sequentially with spinner -> done
    useEffect(() => {
        if (stage !== "processing") return;

        clearAllTimers();

        setStatuses(["pending", "pending", "pending", "pending"]);

        const stepDur = 1200;
        const gap = 220;

        labels.forEach((_, idx) => {
            const start = idx * (stepDur + gap);
            const tActive = window.setTimeout(() => setStatuses((prev) => { const copy = [...prev]; copy[idx] = "active"; return copy; }), start);
            const tDone = window.setTimeout(() => setStatuses((prev) => { const copy = [...prev]; copy[idx] = "done"; return copy; }), start + stepDur);
            timers.current.push(tActive as unknown as number, tDone as unknown as number);

            // when all done -> move to chat frame
            if (idx === labels.length - 1) {
                const tFinish = window.setTimeout(() => { setStage("done"); setStep("frame3"); }, start + stepDur + 380);
                timers.current.push(tFinish as unknown as number);
            }
        });

        return () => clearAllTimers();
    }, [stage]);

    // handler when chat triggers add-to-notes (go to saved notes)
    const handleAddToNotes = () => {
        // immediate swap to frame4
        setStep("frame4");
    };

    // when saved notes completes its internal flow, loop back to start
    const handleSavedComplete = () => {
        // give a small pause before restarting cycle so UX doesn't flash too fast
        const t = window.setTimeout(() => {
            startCycle();
        }, 600);
        timers.current.push(t as unknown as number);
    };
    const bgUrl = "/module-animations/climate-risk-bg.png";


    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img src={bgUrl} alt="background" className="w-full h-full object-contain backdrop-opacity-95" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)",
                    }}
                />
            </div>

            <div className="absolute bottom-6 right-6">
                {/* immediate swap: simple conditional rendering without AnimatePresence */}
                {step === "frame1" && <Frame1Upload key="f1" stage={stage} uploadPct={uploadPct} />}

                {step === "frame2" && <Frame2ProcessingMinimal key="f2" statuses={statuses} labels={labels} />}

                {step === "frame3" && <Frame3Chat key="f3" onAddToNotes={handleAddToNotes} />}

                {step === "frame4" && <Frame4SavedNotes key="f4" onComplete={handleSavedComplete} />}
            </div>
        </div>
    );
}
