import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoLikeFlowDummy() {
    const [stage, setStage] = useState<
        "form" | "table_unverified" | "upload" | "table_verified"
    >("form");
    const [progress, setProgress] = useState(0);
    const progressRef = useRef<number | null>(null);

    useEffect(() => {
        runLoop();
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, []);

    function runLoop() {
        let t = 0;
        setStage("form");
        setProgress(0);

        setTimeout(() => {
            setStage("table_unverified");
        }, (t += 3500));

        setTimeout(() => {
            setStage("upload");
            startUploadSimulation();
        }, (t += 3000));
    }

    function startUploadSimulation() {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);
        progressRef.current = window.setInterval(() => {
            setProgress((p) => {
                const nxt = Math.min(100, p + 30); // smaller step = slower growth
                if (nxt >= 100) {
                    if (progressRef.current) {
                        clearInterval(progressRef.current);
                        progressRef.current = null;
                    }
                    setTimeout(() => {
                        setStage("table_verified");
                        setTimeout(() => runLoop(), 4000);
                    }, 900);
                    return 100;
                }
                return nxt;
            });
        }, 500) as unknown as number; // slower tick
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <AnimatePresence mode="wait">
                {stage === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full bg-white rounded-xl p-4 shadow-lg flex flex-col"
                    >
                        <DummyForm />
                        <div className="mt-3 text-xs text-slate-500">
                            Status: Adding a new dealer…
                        </div>
                    </motion.div>
                )}

                {stage === "table_unverified" && (
                    <motion.div
                        key="table_unverified"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full bg-white rounded-xl p-3 shadow-lg flex flex-col"
                    >
                        <DealersTable verified={false} />
                        <div className="mt-2 text-xs text-slate-500">
                            Status: Dealer added but not verified
                        </div>
                    </motion.div>
                )}

                {stage === "upload" && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full bg-white rounded-xl p-6 shadow-lg flex flex-col gap-6 items-center justify-center"
                    >
                        <div className="flex flex-col gap-3 w-full">
                            {["dummy-file.pdf", "invoice-doc.pdf", "license-scan.png"].map(
                                (file, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 p-2 border rounded-md bg-slate-50 shadow-sm"
                                    >
                                        <div className="w-10 h-12 bg-slate-200 flex items-center justify-center rounded text-slate-600 font-bold">
                                            {file.split(".").pop()?.toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-slate-700">
                                                {file}
                                            </div>
                                            <div className="text-xs text-slate-500">1.2 MB</div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                                style={{
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg,#748ffc,#4c6ef5)",
                                }}
                                className="h-full transition-all"
                            />
                        </div>
                        <div className="text-xs text-slate-500">Status: Verifying…</div>
                    </motion.div>
                )}

                {stage === "table_verified" && (
                    <motion.div
                        key="table_verified"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full bg-white rounded-xl p-3 shadow-lg flex flex-col"
                    >
                        <DealersTable verified={true} />
                        <div className="mt-2 text-xs text-emerald-600 font-medium">
                            Status: Dealer verified ✓
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DummyForm() {
    const [dealerName, setDealerName] = useState("");
    const [gstin, setGstin] = useState("");
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequences = [
            { text: "Acme Traders", setter: setDealerName },
            { text: "27AAEPM1234C1ZQ", setter: setGstin },
            { text: "+91 98765 43210", setter: setMobile },
        ];

        let current = 0;

        function typeNext() {
            if (current >= sequences.length) {
                setStep(sequences.length); // finished all fields
                return;
            }
            const { text, setter } = sequences[current];
            let i = 0;
            const interval = setInterval(() => {
                setter(() => text.slice(0, i + 1));
                i++;
                if (i === text.length) {
                    clearInterval(interval);
                    current++;
                    setTimeout(typeNext, 100); // small pause before next field
                }
            }, 60); // typing speed
        }

        typeNext();
    }, []);

    return (
        <form className="flex flex-col gap-3">
            <label className="text-xs text-slate-600">Dealer Name</label>
            <input
                value={dealerName}
                readOnly
                className="rounded-md p-2 border border-slate-200 font-sans tracking-wide"
            />

            <label className="text-xs text-slate-600">GSTIN</label>
            <input
                value={gstin}
                readOnly
                className="rounded-md p-2 border border-slate-200 font-sans tracking-wide"
            />

            <label className="text-xs text-slate-600">Mobile no</label>
            <input
                value={mobile}
                readOnly
                className="rounded-md p-2 border border-slate-200 font-sans tracking-wide"
            />

            <div className="pt-2 flex items-center justify-end">
                <motion.button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white shadow-md bg-[var(--color-privue-600)]"
                    animate={{
                        opacity: step >= 3 ? [1, 0.8, 1] : 0.3,
                        scale: step >= 3 ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ repeat: step >= 3 ? Infinity : 0, duration: 1.2 }}
                >
                    Submit
                </motion.button>
            </div>
        </form>
    );
}

const dealerRows = [
    { name: "Acme Traders", gst: "27AAEPM1234C1ZQ", mobile: "+91 98765 43210" },
    { name: "Blue Wheels", gst: "27BBSRT9876D2YZ", mobile: "+91 91234 56789" },
    { name: "Green Lines", gst: "27GGLNM5555F1AB", mobile: "+91 99876 54321" },
    { name: "Metro Supplies", gst: "27MTRPL9999F2CD", mobile: "+91 98111 22334" },
    { name: "Quick Parts", gst: "27QKPTR1111Z9PQ", mobile: "+91 90000 12345" },
    { name: "Nova Distributors", gst: "27NVDST2222Y8ZX", mobile: "+91 91234 00001" },
];

function DealersTable({ verified }: { verified: boolean }) {
    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="text-sm font-semibold">Dealers</div>

            <div className="rounded-md overflow-hidden border w-full h-full">
                <motion.table
                    className="w-full text-sm bg-white h-full"
                    initial="hidden"
                    animate="show"
                    variants={{
                        show: {
                            transition: {
                                staggerChildren: 0.08, // smoother, no timers
                            },
                        },
                    }}
                >
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="text-left px-3 py-2">Name</th>
                            <th className="text-left px-3 py-2">GSTIN</th>
                            <th className="text-left px-3 py-2">Mobile</th>
                            <th className="text-left px-3 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dealerRows.map((r, i) => (
                            <motion.tr
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 12 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                            >
                                <td className="px-3 py-2">{r.name}</td>
                                <td className="px-3 py-2">{r.gst}</td>
                                <td className="px-3 py-2">{r.mobile}</td>
                                <td className="px-3 py-2">
                                    {i === 0 && !verified ? (
                                        <span className="text-amber-600 font-medium">Unverified</span>
                                    ) : (
                                        <span className="text-emerald-600 font-medium">Verified</span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </div>
        </div>
    );
}
