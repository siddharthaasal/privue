// ComplianceRisk_with_embedded_bg.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

function Pill({ text, color }: { text: string; color: "red" | "green" | "gray" }) {
    const colors =
        color === "red"
            ? "bg-red-100 text-red-700"
            : color === "green"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-slate-600";
    return (
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${colors}`}>
            {text}
        </span>
    );
}

function StatRow({
    label,
    value,
    badge,
}: {
    label: string;
    value: string | number;
    badge?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between text-[11px] py-1">
            <div className="text-slate-700">{label}</div>
            <div className="flex items-center gap-2">
                <span className="font-normal text-slate-900">{value}</span>
                {badge}
            </div>
        </div>
    );
}

function SectionCard({
    title,
    pill,
    rows,
}: {
    title: string;
    pill: React.ReactNode;
    rows: { label: string; value: string | number; badge?: React.ReactNode }[];
}) {
    return (
        <div className="flex-1 rounded-lg border border-slate-200 bg-white/95 shadow-sm min-w-[200px]">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
                <div className="text-[13px] font-semibold text-slate-900">{title}</div>
                {pill}
            </div>
            <div className="px-3 py-2">
                {rows.map((r, i) => (
                    <StatRow key={i} {...r} />
                ))}
            </div>
        </div>
    );
}

function Frame1AttackSurface() {
    // typed variant objects
    const container: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, when: "beforeChildren" },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 12, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.996 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 max-w-[500px] w-full flex flex-col gap-3"
            aria-live="polite"
        >
            <div className="text-[14px] font-semibold text-slate-900 mb-1">
                Attack Surface Analysis
            </div>

            {/* parent that controls staggering */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex gap-2"
            >
                {/* Infrastructure */}
                <motion.div variants={item} className="flex-1">
                    <SectionCard
                        title="Infrastructure"
                        pill={<Pill text="17 services" color="red" />}
                        rows={[
                            { label: "Active IPs", value: 23 },
                            { label: "Open Ports", value: 17 },
                            { label: "Known Services", value: 10 },
                            { label: "Hosting Services", value: "17 detected" },
                        ]}
                    />
                </motion.div>

                {/* Certificates */}
                <motion.div variants={item} className="flex-1">
                    <SectionCard
                        title="Certificates"
                        pill={<Pill text="All Valid" color="green" />}
                        rows={[
                            { label: "Active Certificates", value: 14 },
                            { label: "Expiring Soon", value: 0 },
                            { label: "Expired", value: 0 },
                            { label: "SHA-1 (Insecure)", value: 0 },
                        ]}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}


/**
 * Frame2: Security Maturity Radar (compact, animated fill)
 * - max-w-[500px]
 * - targetValues and currentValues range 0..4 (matching your screenshot ticks)
 */

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: cx + radius * Math.cos(angleInRadians),
        y: cy + radius * Math.sin(angleInRadians),
    };
}

function valuesToPolygonPath(
    values: number[],
    maxValue: number,
    cx: number,
    cy: number,
    radius: number,
) {
    const step = 360 / values.length;
    const points = values.map((v, i) => {
        const r = (v / maxValue) * radius;
        const { x, y } = polarToCartesian(cx, cy, r, i * step);
        return `${x},${y}`;
    });
    return points.join(" ");
}


export function Frame2SecurityMaturity({
    size = 260,
    maxValue = 4,
}: {
    size?: number;
    maxValue?: number;
}) {
    const labels = [
        "Network Security Controls",
        "Data Protection & Privacy",
        "Secure Communications",
        "Regulatory Compliance",
        "Encryption Standards",
        "Security Awareness Training",
        "Disaster Recovery & BCP",
        "Incident Response Readiness",
        "Security Governance",
        "Security Operations",
        "Security Architecture",
        "Physical Security Controls",
        "Threat Risk Assessment",
        "Third-Party Security",
        "Secure Development Lifecycle",
    ];

    const targetValues = new Array(labels.length).fill(4);
    const currentValues = [
        2.0, 3.0, 1.0, 1.4, 3.0,
        2.0, 0.9, 1.2, 1.8, 1.3,
        1.6, 1.9, 1.1, 1.5, 3.2,
    ];

    const width = size;
    const height = size;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 28; // padding

    const steps = labels.length;
    const stepAngle = 360 / steps;

    const targetPoints = valuesToPolygonPath(targetValues, maxValue, cx, cy, radius);
    const currentPoints = valuesToPolygonPath(currentValues, maxValue, cx, cy, radius);

    function polygonDFromPoints(pointsStr: string) {
        const pts = pointsStr.split(" ").map((p) => p.split(",").map(Number));
        if (pts.length === 0) return "";
        const d = ["M " + pts[0][0] + " " + pts[0][1]];
        for (let i = 1; i < pts.length; i++) d.push("L " + pts[i][0] + " " + pts[i][1]);
        d.push("Z");
        return d.join(" ");
    }
    const targetD = polygonDFromPoints(targetPoints);
    const currentD = polygonDFromPoints(currentPoints);

    // label position slightly outside radius
    // const labelPos = (i: number, offset = 18) => {
    //     const { x, y } = polarToCartesian(cx, cy, radius + offset, i * stepAngle);
    //     return { x, y };
    // };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="text-[14px] font-semibold text-slate-900 mb-3">
                Security Maturity Assessment
            </div>

            <div className="flex justify-center">
                <svg width="100%" height={size} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Security maturity radar chart">
                    {/* concentric rings */}
                    {[1, 2, 3, 4].map((level) => (
                        <circle
                            key={level}
                            cx={cx}
                            cy={cy}
                            r={(level / maxValue) * radius}
                            fill="none"
                            stroke="#eef2f7"
                            strokeWidth={1}
                        />
                    ))}

                    {/* radial axes */}
                    {labels.map((_, i) => {
                        const { x, y } = polarToCartesian(cx, cy, radius, i * stepAngle);
                        return (
                            <line
                                key={i}
                                x1={cx}
                                y1={cy}
                                x2={x}
                                y2={y}
                                stroke="#f1f5f9"
                                strokeWidth={1}
                            />
                        );
                    })}

                    {/* Target polygon */}
                    <path
                        d={targetD}
                        fill="#f9731650"
                        stroke="#f97316"
                        strokeWidth={1.6}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* Current polygon (animated) */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                        className="mb-5"
                    >
                        <path
                            d={currentD}
                            fill="#05966966"
                            stroke="#059669"
                            strokeWidth={1.4}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            opacity={0.95}
                        />
                        <motion.path
                            d={currentD}
                            fill="none"
                            stroke="#047857"
                            strokeWidth={1.6}
                            strokeLinejoin="round"
                            strokeDasharray="1000"
                            strokeDashoffset={1000}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.g>

                    {/* radially rotated labels */}
                    {/* {labels.map((lab, i) => {
                        const ang = i * stepAngle; // degrees
                        const pos = labelPos(i, 18);

                        // rotate label along the spoke. If label would be upside-down (between 90..270), flip 180 so it's readable.
                        let rotateDeg = ang;
                        if (ang > 90 && ang < 270) rotateDeg = ang + 180;

                        return (
                            <text
                                key={i}
                                transform={`translate(${pos.x}, ${pos.y}) rotate(${rotateDeg})`}
                                fontSize={9}
                                fill="#374151"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {lab}
                            </text>
                        );
                    })} */}

                    {/* legend */}
                    <g transform={`translate(${12}, ${height - 10})`}>
                        <rect x={0} y={-10} width={10} height={6} fill="#f97316" rx={2} />
                        <text x={14} y={-4} fontSize={10} fill="#111827">Target State</text>

                        <rect x={120} y={-10} width={10} height={6} fill="#059669" rx={2} />
                        <text x={136} y={-4} fontSize={10} fill="#111827">Current State</text>
                    </g>
                </svg>
            </div>
        </motion.div>
    );
}


function Frame3ThreatVector() {
    // explicitly type the variants
    const container: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, when: "beforeChildren" } },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const paragraphs: React.ReactNode[] = [
        <>
            <span className="text-[11px]">
                A closer analysis of <strong>threat vectors</strong> shows{" "}
                <strong className="underline">critical and high-risk exposures</strong> across
                various categories, including <u>malware</u>, <u>email security</u>, <u>identity</u>,{" "}
                <u>cloud</u>, <u>applications</u>, and <u>brand risk</u>.
            </span>
        </>,
        <>
            <span className="text-[11px]">
                <strong>
                    Notably, brand risk exposure is the highest (4 critical threats identified)
                </strong>
                , which is particularly concerning given the potential for intellectual property theft or brand impersonation.
            </span>
        </>,
        <>
            <span className="text-[11px]">
                Additionally, <u>email and identity risks remain significant</u>, which could lead
                to phishing attacks or credential theft — common attack vectors for organizations
                with manual processes or legacy systems.
            </span>
        </>,
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="text-[14px] font-semibold text-slate-900 mb-3">Threat Vector Analysis</div>

            <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-3">
                {paragraphs.map((p, i) => (
                    <motion.div key={i} variants={item} className="text-slate-700">
                        {p}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}




export default function CyberRisk() {
    type Step = "frame1" | "frame2" | "frame3";
    const [step, setStep] = useState<Step>("frame1");

    const durations: Record<Step, number> = {
        frame1: 4200,
        frame2: 4200,
        frame3: 4200,
    };

    useEffect(() => {
        const t = setTimeout(() => {
            setStep((prev) => {
                if (prev === "frame1") return "frame2";
                if (prev === "frame2") return "frame3";
                return "frame1";
            });
        }, durations[step]);
        return () => clearTimeout(t);
    }, [step]);

    // data URL embedded directly so the component doesn't rely on external path
    const bgUrl = "/module-animations/adverse-news-bg.png";
    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-0">
                {/* background now uses embedded data URL */}
                <img src={bgUrl} alt="background" className="w-full h-full object-contain backdrop-opacity-90" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)",
                    }}
                />
            </div>

            <AnimatePresence>
                {step === "frame1" && (
                    <motion.div key="frame1" className="absolute bottom-6 right-6">
                        <Frame1AttackSurface />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame2" && (
                    <motion.div key="frame2" className="absolute bottom-6 right-6">
                        <Frame2SecurityMaturity />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame3" && (
                    <motion.div key="frame3" className="absolute bottom-6 right-6">
                        <Frame3ThreatVector />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
