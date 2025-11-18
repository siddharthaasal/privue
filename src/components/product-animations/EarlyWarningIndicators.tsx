import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

export function Frame1CustomerSelection() {
    const customers = [
        { name: "ABC Industries Ltd.", id: "CUST-10293", facilities: ["FAC-11", "FAC-12"] },
        { name: "Delta Manufacturing Co.", id: "CUST-84751", facilities: ["FAC-21"] },
    ];

    // Simulated animation state machine
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);

    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [selectedFacility, setSelectedFacility] = useState("");

    // Auto-play animation sequence
    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 700), // open customer dropdown
            setTimeout(() => {
                setSelectedCustomer(customers[1]); // auto select customer
                setStep(2);
            }, 1900),
            setTimeout(() => setStep(3), 2500), // open facility dropdown
            setTimeout(() => {
                setSelectedFacility(customers[1].facilities[0]);
                setStep(4);
            }, 3300),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            key="customer-sel-frame"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[300px] rounded-lg border bg-white p-3 shadow-sm"
        >
            <h3 className="mb-2 text-[11px] font-medium text-slate-800">Customer Selection</h3>

            {/* CUSTOMER DROPDOWN */}
            <div className="mb-3">
                <div className="text-[9px] text-slate-500">Customer Name</div>

                <motion.div
                    className="relative mt-1 w-full rounded-md border px-2 py-1.5 bg-white text-[11px]"
                    animate={{ borderColor: step === 1 ? "#6366f1" : "#e5e7eb" }}
                >
                    {selectedCustomer?.name || "Select customer"}

                    {/* Dropdown menu */}
                    <AnimatePresence>
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="absolute left-0 top-[100%] mt-1 w-full rounded-md border bg-white shadow-md z-10"
                            >
                                {customers.map((c, i) => (
                                    <motion.div
                                        key={i}
                                        className={`px-2 py-1.5 text-[11px] cursor-pointer ${i === 1 ? "bg-privue-100 text-privue-700" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        {c.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* CUSTOMER ID */}
            <div className="mb-3">
                <div className="text-[9px] text-slate-500">Customer ID</div>

                <div
                    className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-[1.5px] 
          text-[10px] text-slate-700"
                >
                    {selectedCustomer?.id || "---"}
                </div>
            </div>

            {/* FACILITY SELECTOR */}
            <div className="mb-1">
                <div className="text-[9px] text-slate-500">Facility ID</div>

                <motion.div
                    className="relative mt-1 w-full rounded-md border px-2 py-1.5 bg-white text-[11px]"
                    animate={{ borderColor: step === 3 ? "#6366f1" : "#e5e7eb" }}
                >
                    {selectedFacility || "Select facility"}

                    {/* Facility dropdown */}
                    <AnimatePresence>
                        {step === 3 && selectedCustomer && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="absolute left-0 top-[100%] mt-1 w-full rounded-md border bg-white shadow-md z-10"
                            >
                                {selectedCustomer.facilities.map((f: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        className={`px-2 py-1.5 text-[11px] cursor-pointer ${i === 0 ? "bg-privue-100 text-privue-700" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        {f}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ---------- FRAME 1: Upload (reduced bar thickness, privue colors) ---------- */
export function Frame2Upload({ stage, uploadPct }: { stage: Stage; uploadPct: number }) {
    const uploadGradient = `linear-gradient(90deg, ${privue[600]}, ${privue[700]})`;

    const files = [
        { id: 'f1', name: 'Quarterly_Financials.pdf', size: '1.04 MB' },
        { id: 'f2', name: 'RM_Call_Report.pdf', size: '1.56 MB' },
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

                            {/* {stage === 'done' && (
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
                            )} */}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}



/* ---------- FRAME 3: Credit Memo Information ---------- */
export function Frame3API({
    regs = ["ZAWYA API", "News API", "Geo Political API"],
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
                APIs
            </div>

            {/* API LIST */}
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
                                    d="M6 15a4 4 0 010-8 5 5 0 019.7.5A4.5 4.5 0 1118 15H6z"
                                />
                            </svg>

                            <div className="flex flex-col">
                                <div className="text-[11px] font-medium text-slate-900">
                                    {r}
                                </div>
                                <div className="text-[9px] text-slate-500">
                                    Fetched
                                </div>
                            </div>
                        </div>

                        <button className="p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
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
                {"APIs Configured"}
            </motion.button>
        </motion.div>
    );
}

/* ---------- FRAME 4: Regulations to Check + Verify button ---------- */
export function Frame4Regulations({
    regs = ["Industry_Reports.pdf", "Macroeconomic_Overview.pdf", "Financial_Covenants.pdf"],
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
    rows: {
        category: string;
        indicator: string;
        level: string;
        tag: string;
    }[];
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
                <div className="grid grid-cols-3 md:grid-cols-3
 border-b bg-slate-50">
                    <div className="px-1.5 py-1 font-medium text-[10px]">Category</div>
                    <div className="px-1.5 py-1 font-medium text-[10px]">Indicator</div>
                    {/* <div className="px-1.5 py-1 font-medium text-[10px]">Tag</div> */}
                    <div className="px-1.5 py-1 font-medium text-[10px] text-right">Level</div>
                </div>

                {/* ROWS */}
                {rows.map((r, i) => (
                    <motion.li
                        key={i}
                        variants={rowVariants}
                        className="grid grid-cols-3 md:grid-cols-3 items-center border-b px-1.5 py-1"
                    >
                        <div className="truncate">{r.category}</div>
                        <div className="truncate">{r.indicator}</div>
                        {/* <div className="truncate hidden sm:block">{r.tag}</div> */}
                        <div
                            className={`truncate text-right font-medium ${r.level === "Emerging Concern"
                                ? "text-red-600"
                                : r.tag === "Needs Attention"
                                    ? "text-amber-600"
                                    : "text-emerald-600"
                                }`}
                        >
                            {r.level}
                        </div>
                    </motion.li>
                ))}

            </div>
        </motion.div>
    );
}


const indicatorsDummyData = [
    {
        category: "Financial Risk",
        indicator: "Inventory Days on Hand (Al Illustrate Industrial)",
        level: "Emerging Concern",
        tag: "Annual/Historical Financials",
    },
    {
        category: "Financial Risk",
        indicator: "Financial Leverage Covenant",
        level: "Emerging Concern",
        tag: "RM Call Report / Credit Memo",
    },
    {
        category: "Industry & Macro Risk",
        indicator: "Local Market Sales/Pricing",
        level: "Needs Attention",
        tag: "Industry Reports / Macroeconomic",
    },
    {
        category: "Industry & Macro Risk",
        indicator: "Reliance on Imports for Raw Material & Forex Risk",
        level: "Needs Attention",
        tag: "Macroeconomic",
    },
    {
        category: "Covenant Compliance",
        indicator: "Partner Account Subordination",
        level: "Emerging Concern",
        tag: "RM Call Report / Credit Memo / Quarterly Financials",
    },
    {
        category: "Industry & Macro Risk",
        indicator: "Al-Illustrate Distribution Sales Growth Deceleration",
        level: "Emerging Concern",
        tag: "Industry Reports / Quarterly Financials",
    },
    {
        category: "Structural/Operational Risk",
        indicator: "High Group Credit Concentration (Total Exposure)",
        level: "Emerging Concern",
        tag: "RM Call Report / Credit Memo",
    },
];




type Stage = 'idle' | 'dropping' | 'uploading' | 'processing' | 'done';
type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5';
type Status = 'pending' | 'active' | 'done';

export default function EarlyWarningIndicatorsDemo() {
    const [stage, setStage] = useState<Stage>('idle');
    const [uploadPct, setUploadPct] = useState(0);

    // carousel that controls which frame is visible (looping)
    const [carouselStep, setCarouselStep] = useState<Step>('frame1');

    // statuses for 4-step pipeline (start all pending)
    const [
        _statuses, setStatuses] = useState<Status[]>(['pending', 'pending', 'pending', 'pending']);
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
        frame2: 4000,
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
        const id = window.setTimeout(() => {
            advanceToNext(carouselStep);
        }, durations[carouselStep]);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carouselStep]);

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
                {carouselStep === 'frame1' && <Frame1CustomerSelection key="f1" />}
                {carouselStep === 'frame2' && (
                    <Frame2Upload
                        key="f2"
                        stage={stage}
                        uploadPct={uploadPct}
                    />
                )}
                {carouselStep === 'frame3' && <Frame3API key="f3" />}
                {carouselStep === 'frame4' && <Frame4Regulations key="f4" />}
                {carouselStep === 'frame5' && <Frame5Results rows={indicatorsDummyData} key="f5" />}
            </div>
        </div>
    );
}
