// ComplianceRisk_with_embedded_bg.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

function RiskPill({ level }: { level: "Low" | "Moderate" | "High" }) {
    const cls =
        level === "High"
            ? "bg-rose-100 text-rose-700"
            : level === "Moderate"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700";
    return <span className={`px-2 py-0.5 rounded-lg text-[12px] font-normal ${cls}`}>{level}</span>;
}

function CategoryCard({
    title,
    level,
}: {
    title: string;
    level: "Low" | "Moderate" | "High";
}) {
    return (
        <motion.div
            className="rounded-lg border border-slate-200 bg-white/95 shadow-sm p-2 flex flex-col items-center gap-3"
            variants={cardVariants}
        >
            <div className="text-[11px] font-medium text-slate-900">{title}</div>
            <RiskPill level={level} />
        </motion.div>
    );
}

/* typed variants to keep TypeScript happy */
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, when: "beforeChildren" } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

function Frame1ClimateRisk() {
    const categories = [
        { title: "Flood", level: "Moderate" as const },
        { title: "Heatwave", level: "Moderate" as const },
        { title: "Coastal Inundation", level: "High" as const },
        { title: "Cyclone", level: "Moderate" as const },
        { title: "Drought", level: "Low" as const },
        { title: "Water Scarcity", level: "Low" as const },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="text-[14px] font-medium text-slate-900 mb-3">Climate Risk Assessment</div>

            <p className="text-[11px] text-slate-700 mb-4 leading-relaxed">
                The climate risk assessment shows a generally well-positioned organization with a strong climate resilience
                score (72/100). Most locations have manageable risk levels and effective adaptation plans, though coastal
                sites show higher exposure.
            </p>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-2"
            >
                {categories.map((c) => (
                    <CategoryCard key={c.title} title={c.title} level={c.level} />
                ))}
            </motion.div>
        </motion.div>
    );
}

/**
 * Frame2: Locations of Interest (row-wise stagger fill)
 * - compact container (max-w-[500px]) with horizontal scroll if needed
 * - rows animate in one-by-one (fade + slide)
 */


type LocationRow = {
    location: string;
    type: string;
    riskScore: "Low" | "Moderate" | "High";
    primaryRisk: string;
    vulnerability?: string;
    lastAssessed?: string;
};

const DATA: LocationRow[] = [
    { location: "Site Alpha", type: "Industrial", riskScore: "Moderate", primaryRisk: "Flood, Heatwave" },
    { location: "Site Beta", type: "Commercial", riskScore: "High", primaryRisk: "Coastal Flooding" },
    { location: "Site Gamma", type: "Logistics", riskScore: "Moderate", primaryRisk: "Cyclone, Storm Surge" },
    { location: "Site Delta", type: "Administrative", riskScore: "Moderate", primaryRisk: "Extreme Heat, Air Quality" },
];


const tbodyVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, when: "beforeChildren" } },
};

const rowVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

function riskTextClass(level: LocationRow["riskScore"]) {
    if (level === "High") return "text-rose-600 font-medium";
    if (level === "Moderate") return "text-amber-600 font-medium";
    return "text-emerald-600 font-medium";
}

/* Minimalized Frame 2: Locations of Interest (no overflow, colored text risk) */
export function Frame2LocationsOfInterestMinimal() {
    return (
        <motion.div
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-3 max-w-[500px] min-w-[400px] w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            aria-live="polite"
        >
            <div className="text-[12px] font-medium text-slate-900 mb-2">Locations of Interest</div>

            {/* Table: reduced columns so it fits inside 500px; text wraps instead of forcing horizontal scroll */}
            <div className="w-full">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-left text-[11px] font-normal text-gray-600">
                            <th className="py-2 pr-2">Location</th>
                            <th className="py-2 pr-2">Type</th>
                            <th className="py-2 pr-2">Risk</th>
                            <th className="py-2">Primary concern</th>
                        </tr>
                    </thead>

                    <motion.tbody variants={tbodyVariants} initial="hidden" animate="visible" className="align-top">
                        {DATA.map((r) => (
                            <motion.tr
                                key={r.location}
                                variants={rowVariants}
                                className="border-t border-slate-100 text-[11px] text-slate-700"
                            >
                                <td className="py-2 pr-2 font-normal leading-tight max-w-[160px] break-words">{r.location}</td>
                                <td className="py-2 pr-2 text-slate-600">{r.type}</td>
                                <td className="py-2 pr-2">
                                    <span className={riskTextClass(r.riskScore)}>{r.riskScore}</span>
                                </td>
                                <td className="py-2 text-slate-600 leading-tight break-words">{r.primaryRisk}</td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </motion.div>
    );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function valuesToPoints(values: number[], maxValue: number, cx: number, cy: number, radius: number) {
    const step = 360 / values.length;
    return values
        .map((v, i) => {
            const r = (v / maxValue) * radius;
            const p = polarToCartesian(cx, cy, r, i * step);
            return `${p.x},${p.y}`;
        })
        .join(" ");
}

function polygonD(pointsStr: string) {
    const pts = pointsStr.split(" ").map((s) => s.split(",").map(Number));
    if (!pts.length) return "";
    const parts = [`M ${pts[0][0]} ${pts[0][1]}`];
    for (let i = 1; i < pts.length; i++) parts.push(`L ${pts[i][0]} ${pts[i][1]}`);
    parts.push("Z");
    return parts.join(" ");
}

export function Frame3ClimateRadar({
    size = 240,
    maxValue = 4,
}: {
    size?: number;
    maxValue?: number;
}) {
    // labels and values (target = outer ring, current = teal)
    const labels = [
        "Physical Risk Assessment",
        "Transition Risk Management",
        "Climate Adaptation Planning",
        "Carbon Management",
        "Supply Chain Resilience",
        "Extreme Weather Preparedness",
        "Climate Risk Governance",
        "Climate Scenario Planning",
    ];

    // target = full outer ring
    const targetValues = new Array(labels.length).fill(4);

    // current state sample values (0..4)
    const currentValues = [2.6, 2.0, 2.2, 3.1, 2.8, 2.4, 2.0, 2.7];

    const width = size;
    const height = size;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 30; // leave space for labels

    const stepAngle = 360 / labels.length;
    const targetPts = valuesToPoints(targetValues, maxValue, cx, cy, radius);
    const currentPts = valuesToPoints(currentValues, maxValue, cx, cy, radius);
    const targetD = polygonD(targetPts);
    const currentD = polygonD(currentPts);

    // choose subset of labels to avoid overlap (aim ~6 labels)
    const maxLabelsToShow = 6;
    const labelStep = Math.max(1, Math.ceil(labels.length / maxLabelsToShow));
    const labelIndices = labels.map((_, i) => i).filter((i) => i % labelStep === 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="text-[14px] font-semibold text-slate-900 mb-3">Risk Assessment Profile</div>

            <div className="flex flex-col justify-center">
                <svg width="100%" height={size} viewBox={`0 0 ${width} ${height}`} role="img">
                    {/* concentric rings */}
                    {[1, 2, 3, 4].map((lvl) => (
                        <circle
                            key={lvl}
                            cx={cx}
                            cy={cy}
                            r={(lvl / maxValue) * radius}
                            fill="none"
                            stroke="#eef2f7"
                            strokeWidth={1}
                        />
                    ))}

                    {/* radial axes */}
                    {labels.map((_, i) => {
                        const { x, y } = polarToCartesian(cx, cy, radius, i * stepAngle);
                        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#f1f5f9" strokeWidth={1} />;
                    })}

                    {/* target polygon (static, orange) */}
                    <path
                        d={targetD}
                        fill="#f9731650"
                        stroke="#f97316"
                        strokeWidth={1.4}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* animated current polygon (teal) */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                    >
                        <path
                            d={currentD}
                            fill="#05966966"
                            stroke="#059669"
                            strokeWidth={1.2}
                            strokeLinejoin="round"
                        />

                        <motion.path
                            d={currentD}
                            fill="none"
                            stroke="#047857"
                            strokeWidth={1.4}
                            strokeLinejoin="round"
                            strokeDasharray="800"
                            strokeDashoffset={800}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.g>

                    {/* selective labels (radial rotation for readability) */}
                    {labelIndices.map((i) => {
                        const ang = i * stepAngle;
                        const pos = polarToCartesian(cx, cy, radius + 18, ang);
                        let rot = ang;
                        if (ang > 90 && ang < 270) rot = ang + 180; // flip upside-down labels
                        return (
                            <text
                                key={i}
                                transform={`translate(${pos.x}, ${pos.y}) rotate(${rot})`}
                                fontSize={9}
                                fill="#374151"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {labels[i]}
                            </text>
                        );
                    })}
                </svg>
                {/* legend rendered below the SVG so it never overlaps */}
                <div className="flex items-center gap-4 mt-3 justify-center">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: "#f97316" }} />
                        <span className="text-[10px] text-slate-800">Target State</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: "#059669" }} />
                        <span className="text-[10px] text-slate-800">Current State</span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

/**
 * Frame4RiskOverTime
 * - compact chart designed to sit inside max-w-[500px]
 * - each series animates in (path draw + points scale)
 */

type Series = {
    name: string;
    color: string;
    values: number[]; // mapped 0..1
};

export function Frame4RiskOverTime({
    width = 520,
    height = 260,
    years = [2025, 2027, 2029, 2031, 2033, 2035, 2037, 2039, 2041, 2043, 2045],
}: {
    width?: number;
    height?: number;
    years?: number[];
}) {
    // approximate normalized values (0..1) matching visual decline in the screenshot
    const series: Series[] = [
        { name: "Flood", color: "#2563eb", values: [0.63, 0.57, 0.52, 0.46, 0.40, 0.34, 0.27, 0.20, 0.14, 0.10, 0.06] },
        { name: "Drought", color: "#f59e0b", values: [0.45, 0.39, 0.34, 0.28, 0.22, 0.17, 0.13, 0.09, 0.06, 0.04, 0.03] },
        { name: "Heatwave", color: "#ef4444", values: [0.68, 0.62, 0.56, 0.49, 0.43, 0.36, 0.28, 0.21, 0.15, 0.11, 0.09] },
        { name: "Cyclone", color: "#7c3aed", values: [0.60, 0.54, 0.49, 0.44, 0.37, 0.31, 0.24, 0.17, 0.12, 0.08, 0.05] },
        { name: "Coastal Inundation", color: "#2dd4bf", values: [0.78, 0.72, 0.66, 0.59, 0.51, 0.43, 0.34, 0.26, 0.20, 0.15, 0.12] },
        { name: "Water Scarcity", color: "#f97316", values: [0.42, 0.36, 0.30, 0.25, 0.20, 0.15, 0.12, 0.09, 0.06, 0.05, 0.03] },
    ];

    // chart margins and plotting rect
    const margin = { top: 18, right: 12, bottom: 48, left: 36 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const xStep = plotW / Math.max(1, years.length - 1);

    // helpers to map data -> svg coordinates
    const xFor = (i: number) => margin.left + i * xStep;
    const yFor = (v: number) => margin.top + (1 - Math.max(0, Math.min(1, v))) * plotH;

    // build an SVG path string from values
    const buildPath = (vals: number[]) => {
        return vals
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(2)} ${yFor(v).toFixed(2)}`)
            .join(" ");
    };

    // small tick lines / y labels (0 .. 1)
    const yTicks = [0, 0.25, 0.5, 0.75, 1];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-3 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="text-[14px] font-semibold text-slate-900 mb-3">Risk Over Time</div>

            <div className="flex">
                <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Risk over time chart">
                    {/* y axis lines and labels */}
                    {yTicks.map((t, i) => {
                        const y = yFor(t);
                        return (
                            <g key={i}>
                                <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} stroke="#f1f5f9" strokeWidth={1} />
                                <text x={8} y={y + 4} fontSize={10} fill="#6b7280">{t.toFixed(2)}</text>
                            </g>
                        );
                    })}

                    {/* x axis baseline */}
                    <line x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} stroke="#e6e9ed" />

                    {/* x labels (years) - show all but small text */}
                    {years.map((yr, i) => (
                        <text key={yr} x={xFor(i)} y={height - margin.bottom + 18} fontSize={10} fill="#6b7280" textAnchor="middle">
                            {yr}
                        </text>
                    ))}

                    {/* series: draw filled points + animated path */}
                    {series.map((s, si) => {
                        const pathD = buildPath(s.values);
                        const delay = si * 0.14; // stagger series animation
                        return (
                            <g key={s.name}>
                                {/* small circles (animated pop) */}
                                {s.values.map((v, vi) => (
                                    <motion.circle
                                        key={vi}
                                        cx={xFor(vi)}
                                        cy={yFor(v)}
                                        r={2.5}
                                        fill="#fff"
                                        stroke={s.color}
                                        strokeWidth={1}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: delay + 0.6 + vi * 0.02, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                ))}

                                {/* animated stroked path drawing (no fill) */}
                                <motion.path
                                    d={pathD}
                                    fill="none"
                                    stroke={s.color}
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* legend below the chart (spaced out) */}
            <div className="flex flex-wrap gap-2 items-center justify-center mt-3">
                {series.map((s) => (
                    <div key={s.name} className="flex items-center gap-2 text-slate-800">
                        <span style={{ width: 6, height: 6, background: s.color, borderRadius: 999 }} />
                        <span className="text-[10px]">{s.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}


export default function ClimateRisk() {
    type Step = "frame1" | "frame2" | "frame3" | "frame4";
    const [step, setStep] = useState<Step>("frame1");

    const durations: Record<Step, number> = {
        frame1: 4200,
        frame2: 4200,
        frame3: 4200,
        frame4: 5200,
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
                        <Frame1ClimateRisk />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame2" && (
                    <motion.div key="frame2" className="absolute bottom-6 right-6">
                        <Frame2LocationsOfInterestMinimal />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame3" && (
                    <motion.div key="frame3" className="absolute bottom-6 right-6">
                        <Frame3ClimateRadar />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame4" && (
                    <motion.div key="frame4" className="absolute bottom-6 right-6">
                        <Frame4RiskOverTime />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
