// CreditTerms.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatabaseZap } from "lucide-react";

type Stage = "idle" | "frame1" | "frame2" | "frame3" | "done";

export default function CreditTerms({
    startImmediately = true,
    bgImage = "/module-animations/cont-monitoring-dashboard-light.png",

    // timing controls
    revealIntervalMs = 900,
    stagePauseMs = 3000,
    loopDelayMs = 3000,
    rowStaggerDelay = 0.06,
    autoLoop = true,
    startStage = "frame1",   // ✅ default is "frame1"
}: {
    startImmediately?: boolean;
    bgImage?: string;

    revealIntervalMs?: number;
    stagePauseMs?: number;
    loopDelayMs?: number;
    rowStaggerDelay?: number;
    autoLoop?: boolean;
    startStage?: Stage;      // ✅ type annotation is Stage
}) {
    // ✅ now we can use startStage safely
    const [stage, setStage] = useState<Stage>(
        startImmediately ? startStage : "idle"
    );

    const [rowsShown, setRowsShown] = useState(0);
    const rowsRef = useRef<number | null>(null);
    const restartRef = useRef<number | null>(null);

    // split parameter data into two smaller tables
    const tableFrame1 = [
        { k: "Profit Before Tax", v: "₹ 1,24,000" },
        { k: "Turnover (Annual)", v: "₹ 12,40,000" },
        { k: "Total Financial Liabilities (Debt)", v: "₹ 4,50,000" },
    ];

    const tableFrame2 = [
        { k: "Total Income (ITR)", v: "₹ 13,00,000" },
        { k: "Estimated GST Turnover", v: "₹ 11,50,000" },
        { k: "Outstanding Banking Debt", v: "₹ 3,20,000" },
        { k: "Credit Score (bureau)", v: "740" },
        { k: "Total Loans Active", v: "2" },
        { k: "Region - State / City", v: "Maharashtra — Pune" },
    ];

    // conclusions (frame3)
    const conclusions = [
        { k: "PreApproval Payment Terms", v: "60 days with 20% advance payment" },
        { k: "PreApproval Credit Limit", v: "₹ 3,00,000" },
        { k: "Credit Limit with ₹100,000 Bank Guarantee", v: "₹ 5,00,000" },
    ];

    // reveal rows one-by-one for whichever frame is active
    useEffect(() => {
        if (stage === "frame1" || stage === "frame2" || stage === "frame3") {
            setRowsShown(0);
            if (rowsRef.current) {
                clearInterval(rowsRef.current);
                rowsRef.current = null;
            }

            const totalRows =
                stage === "frame1" ? tableFrame1.length : stage === "frame2" ? tableFrame2.length : conclusions.length;

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
                            idle: "frame1",
                            frame1: "frame2",
                            frame2: "frame3",
                            frame3: "done",
                            done: "frame1",
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
        if (stage === "done") {
            if (autoLoop) {
                restartRef.current = window.setTimeout(() => {
                    setRowsShown(0);
                    setStage("frame1");
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
        <div className="relative w-full h-full">
            {/* background image */}
            <div className="absolute inset-0">
                <img src={bgImage} alt="background" className="w-full h-full object-contain" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.72) 100%)" }} />
            </div>

            {/* bottom-right overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {(stage === "frame1" || stage === "frame2" || stage === "frame3" || stage === "done") && (
                        <motion.div
                            key="credit-terms-overlay"
                            initial={{ opacity: 0, y: 20, scale: 0.995 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.995 }}
                            transition={{ duration: 0.45 }}
                            className="absolute right-3 bottom-3 w-auto max-w-[94vw] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border p-3 pointer-events-auto"
                            style={{ fontSize: 12 }}
                        >
                            {/* header */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <DatabaseZap size={12} />
                                    <div className="text-sm font-medium text-slate-800"> Underwriting Summary</div>
                                </div>

                                <div className="text-xs text-slate-500">
                                    {stage === "frame1" ? "Operational metrics" : stage === "frame2" ? "Credit profile" : stage === "frame3" ? "Concluded terms" : "Completed"}
                                </div>
                            </div>

                            <div className="mt-3">
                                <AnimatePresence mode="wait">
                                    {stage === "frame1" && (
                                        <motion.div
                                            key="ct-frame-1"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.35 }}
                                            className="min-w-[340px]"
                                        >
                                            <div className="text-xs font-medium text-slate-700 mb-2">Financial Metrics</div>

                                            <div className="bg-white border rounded-md overflow-hidden text-xs">
                                                <div className="grid grid-cols-2 gap-0">
                                                    <div className="px-2 py-1 font-medium border-b">Field</div>
                                                    <div className="px-2 py-1 font-medium border-b">Value</div>

                                                    {tableFrame1.map((r, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 6 }}
                                                            transition={{ duration: 0.42, delay: i * rowStaggerDelay }}
                                                            className="col-span-2 grid grid-cols-2 items-center px-2 py-1 border-b gap-0"
                                                        >
                                                            <div className="text-slate-700 font-normal">{r.k}</div>
                                                            <div className="text-slate-800">{rowsShown > i ? r.v : "—"}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {stage === "frame2" && (
                                        <motion.div
                                            key="ct-frame-2"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.35 }}
                                            className="min-w-[380px]"
                                        >
                                            <div className="text-xs font-medium text-slate-700 mb-2">Financial Metrics</div>

                                            <div className="bg-white border rounded-md overflow-hidden text-xs">
                                                <div className="grid grid-cols-2 gap-0">
                                                    <div className="px-2 py-1 font-medium border-b">Field</div>
                                                    <div className="px-2 py-1 font-medium border-b">Value</div>

                                                    {tableFrame2.map((r, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 6 }}
                                                            transition={{ duration: 0.42, delay: i * rowStaggerDelay }}
                                                            className="col-span-2 grid grid-cols-2 items-center px-2 py-1 border-b gap-0"
                                                        >
                                                            <div className="text-slate-700 font-normal">{r.k}</div>
                                                            <div className="text-slate-800">{rowsShown > i ? r.v : "—"}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {stage === "frame3" && (
                                        <motion.div
                                            key="ct-frame-3"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.35 }}
                                            className="min-w-[340px]"
                                        >
                                            <div className="text-xs font-medium text-slate-700 mb-2">Underwriting Conclusions</div>

                                            <div className="bg-white border rounded-md overflow-hidden text-xs">
                                                <div className="grid grid-cols-2 gap-0">
                                                    <div className="px-2 py-1 font-medium border-b">Term</div>
                                                    <div className="px-2 py-1 font-medium border-b">Value</div>

                                                    {conclusions.map((r, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 6 }}
                                                            transition={{ duration: 0.42, delay: i * rowStaggerDelay }}
                                                            className="col-span-2 grid grid-cols-2 items-center px-2 py-1 border-b gap-0"
                                                        >
                                                            <div className="text-slate-700 font-normal">{r.k}</div>
                                                            <div className="text-slate-800">{rowsShown > i ? r.v : "—"}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {stage === "done" && (
                                        <motion.div
                                            key="ct-done"
                                            className="max-w-auto"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.28 }}
                                        >
                                            <div className="text-sm font-normal text-privue-600">Credit Terms Set — Underwriting Complete</div>
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
