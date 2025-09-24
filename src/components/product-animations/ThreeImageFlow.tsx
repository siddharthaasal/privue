"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, FileText, File } from "lucide-react";

/**
 * Defensive slower demo:
 * - Background table visible immediately (Acme Traders NOT in initial list)
 * - Bottom-right overlay shows form
 * - Typing auto-submits, but there's a visible "Force submit now" button after typing finishes
 * - Lots of console logs to trace where flow could stall
 */

type Dealer = { id: string; name: string; gst: string; mobile: string; verified: boolean };

export default function VideoLikeFlowDummySlow() {
    const [stage, setStage] = useState<
        "idle" | "form" | "table_unverified" | "upload" | "table_verified"
    >("idle");
    const [progress, setProgress] = useState(0);
    const progressRef = useRef<number | null>(null);
    const UNVERIFIED_DISPLAY_MS = 2500;

    const [dealers, setDealers] = useState<Dealer[]>(
        () =>
            dealerRowsInitial.map((r, i) => ({
                id: `${i}-${r.name}`,
                name: r.name,
                gst: r.gst,
                mobile: r.mobile,
                verified: true,
            })) as Dealer[]
    );

    const [highlightId, setHighlightId] = useState<string | null>(null);

    useEffect(() => {
        console.log("[Flow] mounted, will show form after delay");
        const showFormTimer = window.setTimeout(() => {
            console.log("[Flow] -> showing form");
            setStage("form");
        }, 1800);

        return () => {
            clearTimeout(showFormTimer);
            if (progressRef.current) clearInterval(progressRef.current);
            console.log("[Flow] unmounted / cleaned up");
        };
    }, []);

    function restartFlow() {
        console.log("[Flow] restartFlow — resetting demo to initial state");

        // 1) Remove any added/new dealers (id starts with 'new-') so Acme Traders disappears
        setDealers((prev) => prev.filter((d) => !d.id.startsWith("new-")));

        // 2) Clear highlight and progress
        setHighlightId(null);
        setProgress(0);
        if (progressRef.current) {
            clearInterval(progressRef.current);
            progressRef.current = null;
        }

        // 3) Reset the typing controller so it will re-run when the form mounts again
        TypingController.reset();

        // 4) Reset visible stage to idle (so overlays hide), then show form after a slow delay
        setStage("idle");
        window.setTimeout(() => {
            setStage("form");
        }, 1400); // tweak delay to taste
    }

    function startUploadSimulation(newDealerId: string) {
        console.log("[Flow] startUploadSimulation", newDealerId);
        setProgress(0);
        if (progressRef.current) {
            console.log("[Flow] clearing existing upload interval");
            clearInterval(progressRef.current);
        }

        progressRef.current = window.setInterval(() => {
            setProgress((p) => {
                const nxt = Math.min(100, p + 25);
                console.log("[Flow] upload tick", nxt);
                if (nxt >= 100) {
                    if (progressRef.current) {
                        clearInterval(progressRef.current);
                        progressRef.current = null;
                    }
                    setTimeout(() => {
                        console.log("[Flow] upload complete -> marking verified", newDealerId);
                        setDealers((prev) => prev.map((d) => (d.id === newDealerId ? { ...d, verified: true } : d)));
                        setHighlightId(newDealerId);
                        setStage("table_verified");

                        // keep verified visible for a bit, then restart entire demo:
                        setTimeout(() => {
                            // allow highlight to be visible shortly before restart
                            setHighlightId(null);
                            setTimeout(() => {
                                restartFlow();
                            }, 800); // short pause so user sees un-highlighted verified state briefly
                        }, 2200); // time shown as verified before restart

                    }, 900);
                    return 100;
                }
                return nxt;
            });
        }, 700) as unknown as number;
    }

    function handleSubmitFromForm(values: { name: string; gst: string; mobile: string }) {
        console.log("[Flow] form submitted", values);
        const id = `new-${Date.now()}`;
        const newDealer: Dealer = {
            id,
            name: values.name || "New Dealer",
            gst: values.gst || "—",
            mobile: values.mobile || "—",
            verified: false,
        };

        setDealers((prev) => [newDealer, ...prev]);
        setStage("table_unverified");
        setHighlightId(id);

        setTimeout(() => {
            setHighlightId(null);
            setStage("upload");
            startUploadSimulation(id);
        }, UNVERIFIED_DISPLAY_MS);
    }

    // static file percents (keep per-file values as-is)
    const filePercents = [72, 45, 18];
    // target is the average (rounded)
    const targetProgress = Math.round(filePercents.reduce((a, b) => a + b, 0) / filePercents.length);

    // animated progress state (0 -> targetProgress)

    useEffect(() => {
        let raf = 0;
        const duration = 700; // ms for the animation
        const start = performance.now();

        function step(now: number) {
            const t = Math.min(1, (now - start) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(eased * targetProgress);
            setProgress(value);
            if (t < 1) raf = requestAnimationFrame(step);
        }

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [targetProgress]);


    return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
            {/* BACKGROUND TABLE */}
            <div className="absolute inset-0 p-0">
                <BackgroundDealersTable dealers={dealers} highlightId={highlightId} />
            </div>

            {/* subtle mask */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 backdrop-blur-xl" // 👈 stronger blur
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "100% 100%",
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)",
                        maskRepeat: "no-repeat",
                        maskSize: "100% 100%",
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,0.85) 100%)", // 👈 stronger white veil
                    }}
                />
            </div>




            {/* overlay */}
            <div className="relative z-10 w-full h-full">
                <AnimatePresence mode="wait">
                    {stage === "form" && (
                        <motion.div
                            key="form-overlay"
                            initial={{ opacity: 0, y: 8, scale: 0.995 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.995 }}
                            transition={{ duration: 0.6 }}
                            className="absolute -right-2 -bottom-2 w-[350px] max-w-full bg-white rounded-xl p-4 shadow-2xl"
                        >
                            <div className="text-sm font-medium mb-2">Add Dealer</div>
                            <DummyFormCompactSlow onSubmit={handleSubmitFromForm} />
                            <div className="mt-1 text-[10px] text-slate-500">Status: Preparing to add dealer…</div>
                        </motion.div>
                    )}

                    {stage === "table_unverified" && (
                        <motion.div
                            key="brief-unverified"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.55 }}
                            className="absolute -right-2 -bottom-2 w-[250px] max-w-full bg-white/95 rounded-xl p-3 shadow-lg"
                        >
                            <div className="text-[13px] font-semibold">New dealer added</div>
                            <div className="text-[12px] text-privue-800 mt-1">Waiting for documents</div>
                        </motion.div>
                    )}

                    {stage === "upload" && (
                        <motion.div
                            key="upload-overlay"
                            initial={{ opacity: 0, scale: 0.995 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.995 }}
                            transition={{ duration: 0.55 }}
                            className="absolute -right-2 -bottom-2 w-[350px] max-w-full bg-white rounded-xl p-4 shadow-2xl"
                        >
                            <div className="text-sm font-medium mb-2">Uploading documents</div>

                            <div className="flex flex-col gap-2 w-full mb-2">
                                <div className="flex items-center gap-3 p-2 border rounded-md bg-slate-50 shadow-sm">
                                    <div className="w-8 h-8 bg-slate-200 flex items-center justify-center rounded text-slate-600">
                                        <FileText className="h-4 w-4" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-[12px] font-medium truncate">balance-sheet.pdf</div>
                                        <div className="text-[10px] text-slate-500">1.2 MB</div>
                                    </div>

                                    {/* <div className="text-[11px] text-slate-500 ml-2">72%</div> */}
                                </div>

                                <div className="flex items-center gap-3 p-2 border rounded-md bg-slate-50 shadow-sm">
                                    <div className="w-8 h-8 bg-slate-200 flex items-center justify-center rounded text-slate-600">
                                        <FileSpreadsheet className="h-4 w-4" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-[12px] font-medium truncate">profit-and-loss-account.xlsx</div>
                                        <div className="text-[10px] text-slate-500">840 KB</div>
                                    </div>

                                    {/* <div className="text-[11px] text-slate-500 ml-2">45%</div> */}
                                </div>

                                <div className="flex items-center gap-3 p-2 border rounded-md bg-slate-50 shadow-sm">
                                    <div className="w-8 h-8 bg-slate-200 flex items-center justify-center rounded text-slate-600">
                                        <File className="h-4 w-4" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-[12px] font-medium truncate">income-sheet-detail.docx</div>
                                        <div className="text-[10px] text-slate-500">320 KB</div>
                                    </div>

                                    {/* <div className="text-[11px] text-slate-500 ml-2">18%</div> */}
                                </div>
                            </div>

                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                    style={{
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg,#748ffc,#4c6ef5)",
                                    }}
                                    className="h-full transition-all duration-200"
                                />
                            </div>

                            <div className="mt-2 text-[10px] text-slate-500">Status: Uploading... {progress}%</div>
                        </motion.div>


                    )}

                    {stage === "table_verified" && (
                        <motion.div
                            key="verified-overlay"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -right-2 -bottom-2 w-auto max-w-full bg-white/95 rounded-xl p-3 shadow-lg"
                        >
                            <div className="text-[12px] font-semibold text-emerald-600 text-right">Dealer verified</div>
                            {/* <div className="text-xs text-slate-500 mt-1">Table updated in the background.</div> */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* --------------------------
   Compact slow form + manual fallback
   -------------------------- */
/* --------------------------
   Module-level typing controller (singleton)
   - runs once, emits incremental updates to subscribers
   - survives React StrictMode remounts
   -------------------------- */

type TypingListener = {
    id: string;
    onUpdate: (fieldIndex: number, text: string) => void;
    onFinished: () => void;
};

const TypingController = (() => {
    let started = false;
    let finished = false;
    const listeners = new Map<string, TypingListener>();
    let timers: number[] = [];

    function notifyUpdate(fieldIndex: number, text: string) {
        for (const l of listeners.values()) l.onUpdate(fieldIndex, text);
    }
    function notifyFinished() {
        finished = true;
        for (const l of listeners.values()) l.onFinished();
    }

    async function start() {
        if (started) return;
        started = true;
        const sequences = ["Acme Traders", "27AAEPM1234C1ZQ", "+91 98765 43210"];

        function typeString(fieldIndex: number, text: string, charDelay = 95) {
            return new Promise<void>((resolve) => {
                let i = 0;
                function tick() {
                    i++;
                    notifyUpdate(fieldIndex, text.slice(0, i));
                    if (i < text.length) {
                        timers.push(window.setTimeout(tick, charDelay));
                    } else {
                        resolve();
                    }
                }
                timers.push(window.setTimeout(tick, charDelay));
            });
        }

        (async () => {
            for (let idx = 0; idx < sequences.length; idx++) {
                await typeString(idx, sequences[idx], 95);
                await new Promise((r) => timers.push(window.setTimeout(r, 220)));
            }
            await new Promise((r) => timers.push(window.setTimeout(r, 1200)));
            notifyFinished();
        })();
    }

    function subscribe(listener: TypingListener) {
        listeners.set(listener.id, listener);
        if (finished) listener.onFinished();
        start();
        return () => listeners.delete(listener.id);
    }

    function teardown() {
        timers.forEach((t) => clearTimeout(t));
        timers = [];
        listeners.clear();
        started = false;
        finished = false;
    }

    // reset is same as teardown but kept explicit for readability
    function reset() {
        teardown();
    }

    return {
        subscribe,
        teardown,
        reset,
        _debug: () => ({ started, finished, listenersCount: listeners.size }),
    };
})();


/* --------------------------
   Replace DummyFormCompactSlow with this subscriber-based version
   (visual typing driven by the controller; manual fallback button kept)
   -------------------------- */

function DummyFormCompactSlow({
    onSubmit,
}: {
    onSubmit: (values: { name: string; gst: string; mobile: string }) => void;
}) {
    const [dealerName, setDealerName] = useState("");
    const [gstin, setGstin] = useState("");
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState(0);

    // finishedTypingRef used to gate autosubmit (and manual fallback)
    const finishedTypingRef = useRef(false);

    // unique id per mount so we can unsubscribe safely
    const idRef = useRef(`typing-listener-${Math.random().toString(36).slice(2)}`);

    useEffect(() => {
        console.log("[Form] subscribing to TypingController", idRef.current);

        const unsubscribe = TypingController.subscribe({
            id: idRef.current,
            onUpdate: (fieldIndex, text) => {
                // update the appropriate field and step
                if (fieldIndex === 0) setDealerName(text);
                if (fieldIndex === 1) setGstin(text);
                if (fieldIndex === 2) setMobile(text);

                // compute step progress (0..3)
                // step = number of fields fully typed or currently typing (approx)
                const newStep =
                    (dealerName.length > 0 ? 1 : 0) +
                    (gstin.length > 0 ? 1 : 0) +
                    (mobile.length > 0 ? 1 : 0);
                setStep((s) => Math.max(s, newStep));
            },
            onFinished: () => {
                console.log("[Form] controller signalled finished typing");
                finishedTypingRef.current = true;
                setStep(3);
                // attempt autosubmit (safe: controller only finishes once)
                setTimeout(() => {
                    if (!finishedTypingRef.current) return;
                    console.log("[Form] controller attempting autosubmit");
                    onSubmit({
                        name: "Acme Traders",
                        gst: "27AAEPM1234C1ZQ",
                        mobile: "+91 98765 43210",
                    });
                }, 60);
            },
        });

        return () => {
            console.log("[Form] unsubscribing TypingController", idRef.current);
            unsubscribe();
            // NOTE: we intentionally do NOT teardown the controller here.
            // The controller is a page-level singleton so the typing continues even across StrictMode remounts.
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                finishedTypingRef.current = true;
                onSubmit({ name: dealerName, gst: gstin, mobile });
            }}
            className="flex flex-col gap-1"
        >
            <label className="text-[8px] text-slate-600">Dealer Name</label>
            <input value={dealerName} readOnly className="text-xs rounded-md p-1 border border-slate-200 font-sans tracking-wide w-full" />

            <label className="text-[8px] text-slate-600">GSTIN</label>
            <input value={gstin} readOnly className="text-xs rounded-md p-1 border border-slate-200 font-sans tracking-wide w-full" />

            <label className="text-[8px] text-slate-600">Mobile no</label>
            <input value={mobile} readOnly className="text-xs rounded-md p-1 border border-slate-200 font-sans tracking-wide w-full" />

            <div className="pt-1 flex items-center justify-end">
                {/* <div className="text-xs text-slate-400">Tip: wait for typing or force submit</div> */}

                <div className="flex items-center gap-1">
                    <motion.button
                        type="submit"
                        className="inline-flex items-center gap-1 px-1 py-1 text-xs rounded-sm font-normal text-white shadow-md bg-[var(--color-privue-600)]"
                        animate={{
                            opacity: step >= 3 ? [1, 0.85, 1] : 0.45,
                            scale: step >= 3 ? [1, 1.02, 1] : 1,
                        }}
                        transition={{ repeat: step >= 3 ? Infinity : 0, duration: 1.6 }}
                    >
                        Submit
                    </motion.button>

                    {/* {step >= 3 && (
                        <button
                            type="button"
                            onClick={() => {
                                console.log("[Form] Force submit clicked (controller fallback)");
                                finishedTypingRef.current = true;
                                onSubmit({ name: dealerName || "Acme Traders", gst: gstin || "27AAEPM1234C1ZQ", mobile: mobile || "+91 98765 43210" });
                            }}
                            className="px-3 py-2 text-sm rounded-md border border-slate-200 bg-white"
                        >
                            Force submit now
                        </button>
                    )} */}
                </div>
            </div>
        </form>
    );
}


/* --------------------------
   BackgroundDealersTable (explicit RGBA animation targets)
   -------------------------- */
// Insert this DealerRow component above BackgroundDealersTable (or inside same file scope)
function DealerRow({
    d,
    highlightId,
}: {
    d: Dealer;
    index: number;
    highlightId: string | null;
}) {
    const [flash, setFlash] = useState(false);
    const prevVerifiedRef = useRef<boolean>(d.verified);

    useEffect(() => {
        // detect transition false -> true
        if (prevVerifiedRef.current === false && d.verified === true) {
            setFlash(true);
            const t = window.setTimeout(() => setFlash(false), 1200); // flash duration
            return () => clearTimeout(t);
        }
        prevVerifiedRef.current = d.verified;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [d.verified]);

    const isHighlighted = highlightId === d.id;

    // choose row background: flash (green) > highlighted (violet) > default (white)
    const rowBg = flash
        ? "rgba(16,185,129,0.12)" // soft green flash
        : isHighlighted
            ? "rgba(120,115,255,0.06)" // your existing highlight
            : "rgba(255,255,255,0)"; // default (explicit rgba for animatable)

    return (
        <motion.tr
            layout
            initial={{ opacity: 0, y: 12, backgroundColor: "rgba(255,255,255,0)" }}
            animate={{
                opacity: 1,
                y: 0,
                backgroundColor: rowBg,
            }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            // avoid conflicting tailwind background classes here
            style={{ backgroundColor: undefined }}
        >
            <td className="px-3 py-3 text-[12px]">{d.name}</td>
            <td className="px-3 py-3 text-[12px]">{d.gst}</td>
            <td className="px-3 py-3 text-[12px]">{d.mobile}</td>

            <td className="px-3 py-3">
                <AnimatePresence mode="sync">
                    {d.verified ? (
                        <motion.span
                            key="verified"
                            initial={{ opacity: 0, y: 4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.35 }}
                            className="inline-flex items-center gap-2 text-emerald-600 font-medium text-[12px]"
                        >
                            <span aria-hidden>✓</span>
                            Verified
                        </motion.span>
                    ) : (
                        <motion.span
                            key="unverified"
                            initial={{ opacity: 0, y: 4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.35 }}
                            className="text-amber-600 font-medium text-[12px]"
                        >
                            Unverified
                        </motion.span>
                    )}
                </AnimatePresence>
            </td>
        </motion.tr>
    );
}

function BackgroundDealersTable({ dealers, highlightId }: { dealers: Dealer[]; highlightId: string | null }) {
    return (
        <div className="w-full h-full rounded-xl overflow-hidden border bg-white/60 backdrop-blur-sm">
            <div className="p-4">
                <div className="text-sm font-medium">Dealers</div>
            </div>

            <div className="h-[calc(100%-64px)] overflow-auto">
                <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-600 sticky top-0">
                        <tr>
                            <th className="text-left px-3 py-3 text-[11px]">Name</th>
                            <th className="text-left px-3 py-3 text-[11px]">GSTIN</th>
                            <th className="text-left px-3 py-3 text-[11px]">Mobile</th>
                            <th className="text-left px-3 py-3 text-[11px]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dealers.map((d, i) => (
                            <DealerRow key={d.id} d={d} index={i} highlightId={highlightId} />
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

/* initial seed WITHOUT Acme Traders */
const dealerRowsInitial = [
    { name: "Blue Wheels", gst: "27BBSRT9876D2YZ", mobile: "+91 91234 56789" },
    { name: "Green Lines", gst: "27GGLNM5555F1AB", mobile: "+91 99876 54321" },
    { name: "Metro Supplies", gst: "27MTRPL9999F2CD", mobile: "+91 98111 22334" },
    { name: "Quick Parts", gst: "27QKPTR1111Z9PQ", mobile: "+91 90000 12345" },
    { name: "Nova Distributors", gst: "27NVDST2222Y8ZX", mobile: "+91 91234 00001" },
    { name: "Prime Hardware", gst: "27PRMHW3333A1BB", mobile: "+91 92345 67890" },
    { name: "Alpha Traders", gst: "27ALPHT4444C2CC", mobile: "+91 93456 78901" },
    { name: "Omega Parts", gst: "27OMGPT5555D3DD", mobile: "+91 94567 89012" },
    { name: "Eastern Motors", gst: "27EASTM6666E4EE", mobile: "+91 95678 90123" },
    { name: "West Point", gst: "27WSTPT7777F5FF", mobile: "+91 96789 01234" },
    { name: "Sunrise Supplies", gst: "27SUNRS8888G6GG", mobile: "+91 97890 12345" },
    { name: "Lakeside Components", gst: "27LAKSC9999H7HH", mobile: "+91 98901 23456" },
    { name: "Horizon Export", gst: "27HRZNX0000J8JJ", mobile: "+91 99012 34567" },
    { name: "Crest Technologies", gst: "27CRSTT1111K9KK", mobile: "+91 90123 45678" },
    { name: "Pioneer Goods", gst: "27PIONR2222L0LL", mobile: "+91 81234 56780" },
];
