
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";


const TYPED_QUERY = "Entity sustainability news";

// SearchFrame.tsx
function SearchFrame() {
    const [value, setValue] = useState("");
    const [typing, setTyping] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const caretRef = useRef<number | null>(null);

    useEffect(() => {
        // start typewriter after mount
        setTyping(true);
        const speed = 55; // ms per char (type speed)
        const startDelay = 420; // small delay before starting
        const timers: number[] = [];

        timers.push(window.setTimeout(() => {
            for (let i = 0; i < TYPED_QUERY.length; i++) {
                timers.push(
                    window.setTimeout(() => {
                        setValue((v) => TYPED_QUERY.slice(0, v.length + 1));
                    }, i * speed)
                );
            }

            // finish typing: stop caret, simulate submit after short pause
            timers.push(
                window.setTimeout(() => {
                    setTyping(false);
                    // simulate clicking submit
                    setTimeout(() => {
                        triggerSubmit();
                    }, 330);
                }, TYPED_QUERY.length * speed + 140)
            );
        }, startDelay));

        return () => timers.forEach((t) => clearTimeout(t));
    }, []);

    useEffect(() => {
        // synthetic caret blink (if typing)
        if (!typing) return;
        let visible = true;
        caretRef.current = window.setInterval(() => {
            visible = !visible;
            if (inputRef.current) {
                // manually update placeholder-like caret using CSS variable or value append
                // but we simply rely on typed value + '|' suffix render in input
                // No-op here — caret rendering handled in JSX
            }
        }, 550);
        return () => {
            if (caretRef.current) clearInterval(caretRef.current);
        };
    }, [typing]);

    const triggerSubmit = () => {
        if (submitted) return;
        setSubmitted(true);
        setLoading(true);

        // simulate a quick press animation + fake network load
        setTimeout(() => {
            setLoading(false);
            // optionally show a short 'done' flash, then reset submit state
            setTimeout(() => setSubmitted(false), 700);
        }, 900);
    };

    return (
        <div className="w-[400px] max-w-[500px] p-3 rounded-md bg-gray-50">
            <div className="text-[12px] font-semibold text-slate-800 mb-3">News API</div>

            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label htmlFor="search" className="sr-only">
                        Search query
                    </label>

                    <div
                        className="relative rounded-md border border-slate-200 focus-within:border-slate-300 shadow-sm"
                        style={{ background: "white" }}
                    >
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            {/* search icon (simple svg) */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* input */}
                        <input
                            id="search"
                            ref={inputRef}
                            value={typing ? `${value}|` : value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-[13px] leading-snug bg-transparent outline-none"
                            placeholder="Search"
                            aria-label="Search query"
                            readOnly={typing} // while auto-typing, keep readOnly to avoid interference
                        />
                    </div>
                </div>

                {/* animated submit button */}
                <motion.button
                    onClick={() => {
                        // allow manual click even if typing finished
                        triggerSubmit();
                    }}
                    whileTap={{ scale: 0.96 }}
                    animate={submitted ? { scale: [1, 0.98, 1] } : { scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white text-[13px] font-medium shadow-sm"
                    aria-pressed={submitted}
                >
                    {loading ? (
                        // tiny spinner
                        <svg className="animate-spin -ml-1 mr-2" width="16" height="16" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeOpacity="0.2" fill="none" />
                            <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                        </svg>
                    ) : null}
                    <span className="select-none">{loading ? "Searching..." : "Search"}</span>
                </motion.button>
            </div>
        </div>
    );
}

// JsonNewsFrame.tsx


/**
 * JsonNewsFrame
 * - shows a JSON-like payload as a compact, minimally-styled "raw" view
 * - min-w 400px, max-w 500px
 * - small monospace font, low line-height to make it intentionally dense
 * - staggered per-line reveal using framer-motion
 */

const rawPayload = [
    {
        classification: {
            main_category: "medtop:02000000",
            main_category_title: "Crime, Law, and Justice",
            // subcategory: "medtop:2000012",
            // subcategory_title: "Litigation",
            // confidence: "High",
            reasoning:
                "The news cluster primarily focuses on a legal proceeding where the Chhattisgarh High Court refused to quash an FIR. This directly relates to the judicial process and legal action taken by the petitioners, fitting perfectly under 'Crime, Law, and Justice' as the main category and 'Litigation' as the specific subcategory.",
        },
        extracted_details: {
            event: "Chhattisgarh High Court refuses to quash an FIR filed against employees of a logistics firm (ElasticRun) for delivering prohibited knives, which were subsequently used in a murder.",
            event_type: "Legal Ruling",
            location: "Raipur, Chhattisgarh, India",
            key_entities: [
                {
                    entity: "Chhattisgarh High Court",
                    role: "Authority",
                    action: "Refused to quash the FIR against ElasticRun employees.",
                    business_impact: [],
                },
            ],
        },
    },
];

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

function JsonNewsFrame({
    payload = rawPayload,
}: {
    payload?: unknown;
}) {
    // stringify with small indentation and then split into lines for per-line animation
    const txt = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
    const lines = useMemo(() => txt.split("\n"), [txt]);

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="min-w-[400px] max-w-[500px] bg-white rounded-md border border-transparent p-2 shadow-sm"
        >
            <div className="text-[11px] font-semibold text-slate-800 mb-2">Raw News Payload</div>

            <div
                className="bg-slate-50/60 rounded-sm overflow-auto"
                style={{ maxHeight: 320, border: "1px solid rgba(15,23,42,0.03)" }}
            >
                <div className="px-2 py-2">
                    <motion.pre
                        initial="hidden"
                        animate="show"
                        variants={containerVariants}
                        className="m-0 text-[10px] leading-[12px] font-mono text-slate-700 whitespace-pre"
                        style={{ lineHeight: 1.2 }}
                    >
                        {lines.map((ln, i) => (
                            <motion.div
                                key={i}
                                variants={lineVariants}
                                className="overflow-hidden"
                                aria-hidden
                                // keep tight spacing
                                style={{ margin: 0, padding: 0 }}
                            >
                                <code
                                    style={{
                                        display: "block",
                                        fontSize: 11,
                                        color: "rgba(30,41,59,0.85)",
                                        whiteSpace: "pre",
                                    }}
                                >
                                    {ln}
                                </code>
                            </motion.div>
                        ))}
                    </motion.pre>
                </div>
            </div>
        </motion.div>
    );
}


// UiPreviewFrame.tsx


/* ---------- Types ---------- */
// components/FlipkartRelationGraph.tsx
type Node = {
    id: string;
    label: string;
    x: number;
    y: number;
    color?: string;
    fill?: string;
};

type Edge = {
    from: string;
    to: string;
    label: string;
    color: string;
    dashed?: boolean;
};

const nodes: Node[] = [
    { id: "flipkart", label: "Flipkart", x: 250, y: 200, fill: "#f4f4f4", color: "#2563eb" },
    { id: "police", label: "Police Authorities", x: 60, y: 80 },
    { id: "court", label: "Chhattisgarh Court", x: 60, y: 160 },
    { id: "elastic", label: "ElasticRun", x: 60, y: 260 },
    { id: "motorola", label: "Motorola", x: 60, y: 340 },
    { id: "pinkvilla", label: "Pinkvilla India", x: 430, y: 200 },
];

const edges: Edge[] = [
    { from: "police", to: "flipkart", label: "", color: "#ef4444", dashed: true },
    { from: "court", to: "flipkart", label: "Legal Ruling", color: "#ef4444", dashed: true },
    { from: "elastic", to: "flipkart", label: "Litigation", color: "#ef4444" },
    { from: "motorola", to: "flipkart", label: "", color: "#22c55e" },
    { from: "flipkart", to: "pinkvilla", label: "Acquisition", color: "#22c55e" },
];


function FlipkartRelationGraph() {
    return (
        <div className="relative max-w-[500px] mx-auto bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <div className="text-[11px] font-semibold text-slate-800 p-3">UI Preview</div>

            <svg width="500" height="370">
                {/* Edges */}
                {edges.map((edge, i) => {
                    const from = nodes.find((n) => n.id === edge.from)!;
                    const to = nodes.find((n) => n.id === edge.to)!;

                    const midX = (from.x + to.x) / 2;
                    const midY = (from.y + to.y) / 2 - 10;

                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: 1, pathLength: 1 }}
                            transition={{ duration: 1.2, delay: i * 0.15 }}
                        >
                            <path
                                d={`M${from.x} ${from.y} Q${midX} ${midY - 40} ${to.x} ${to.y}`}
                                stroke={edge.color}
                                strokeWidth={2}
                                fill="none"
                                strokeDasharray={edge.dashed ? "6,4" : "0"}
                                opacity={0.9}
                            />
                            <text
                                x={midX + 5}
                                y={midY - 23}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#444"
                                fontFamily="Inter, sans-serif"
                            >
                                {edge.label}
                            </text>
                        </motion.g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.g
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {node.id === "flipkart" ? (
                            <circle cx={node.x} cy={node.y} r={26} fill={node.fill} stroke={node.color} strokeWidth={3} />
                        ) : (
                            <rect
                                x={node.x - 55}
                                y={node.y - 18}
                                width="110"
                                height="36"
                                rx="4"
                                fill="#f5f7ff"
                                stroke="#8884ff"
                                strokeWidth={0.6}
                            />
                        )}
                        <text
                            x={node.x}
                            y={node.y + 3}
                            textAnchor="middle"
                            fontSize="11"
                            fontFamily="Inter, sans-serif"
                            fill="#222"
                        >
                            {node.label}
                        </text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}

import { Card, CardContent } from "@/components/ui/card";



function FlipkartFrame() {
    const items = [
        {
            title: "Legal Liability Exposure",
            tag: "Critical",
            tagColor: "text-red-600",
            desc: "Flipkart faces potential legal scrutiny as platform facilitating prohibited knife orders that were used in murder case",
        },
        {
            title: "Platform Compliance Issues",
            tag: "High",
            tagColor: "text-orange-600",
            desc: "Flipkart may face regulatory action for inadequate screening of prohibited items despite police warnings",
        },
        {
            title: "Content Strategy Expansion",
            tag: "Positive",
            tagColor: "text-green-600",
            desc: "Flipkart acquired 75% stake in Pinkvilla India for $15M to strengthen content offerings and user engagement",
        },
        {
            title: "Competitive Advantage",
            tag: "Positive",
            tagColor: "text-green-600",
            desc: "Pinkvilla acquisition helps Flipkart compete with Amazon and Nykaa by targeting Gen Z/millennial demographics",
        },
    ];

    return (
        <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-[500px] max-h-[350px] mx-auto bg-gray-50 p-4 rounded-xl"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
        >
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                >
                    <Card className="rounded-xl shadow-sm border p-3">
                        <CardContent className="space-y-1 p-0">
                            <h2 className="text-sm font-medium text-gray-900">{item.title}</h2>
                            <span
                                className={`inline-block text-xs font-medium py-0.5 rounded-md ${item.tagColor}`}
                            >
                                {item.tag}
                            </span>
                            <p className="text-xs text-gray-700 leading-snug">{item.desc}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}





export default function News() {
    const bgUrl = "/module-animations/climate-risk-bg.png";

    type Step = "frame1" | "frame2" | "frame3" | "frame4";
    const [step, setStep] = useState<Step>("frame1");

    // durations (ms) per frame — tweak as needed
    const durations: Record<Step, number> = {
        frame1: 3500,
        frame2: 4000,
        frame3: 4000,
        frame4: 4000,
    };

    useEffect(() => {
        const t = setTimeout(() => {
            setStep((prev) => {
                if (prev === "frame1") return "frame2";
                if (prev === "frame2") return "frame3";
                if (prev === "frame3") return "frame4";
                return "frame1";
            });
        }, durations[step]);

        return () => clearTimeout(t);
    }, [step]);

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            {/* background layer */}
            <div className="absolute inset-0">
                <img src={bgUrl} alt="background" className="w-full h-full object-contain backdrop-opacity-95" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)",
                    }}
                />
            </div>

            {/* overlay frames */}
            <AnimatePresence>
                {step === "frame1" && (
                    <motion.div key="frame1" className="absolute bottom-6 right-6">
                        <SearchFrame />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame2" && (
                    <motion.div key="frame2" className="absolute bottom-6 right-6">
                        <JsonNewsFrame />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame3" && (
                    <motion.div key="frame3" className="absolute bottom-6 right-6">
                        <FlipkartRelationGraph />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame4" && (
                    <motion.div key="frame4" className="absolute bottom-6 right-6">
                        <FlipkartFrame />
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Optional tiny controls for testing — remove if you want purely automatic cycling */}
            {/* <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame3" : s === "frame2" ? "frame1" : "frame2"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Prev frame"
                >
                    Prev
                </button>
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame2" : s === "frame2" ? "frame3" : "frame1"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Next frame"
                >
                    Next
                </button>
            </div> */}
        </div>
    );
}

