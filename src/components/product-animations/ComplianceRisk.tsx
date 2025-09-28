// CreditAssessment.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------------
  tiny animated number hook (used by frame1)
--------------------------*/
function useAnimatedNumber(target: number, duration = 700) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start: number | null = null;
        const from = value;
        const diff = target - from;
        let raf = 0;
        function step(ts: number) {
            if (!start) start = ts;
            const t = Math.min(1, (ts - start!) / duration);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            setValue(Number((from + diff * eased).toFixed(2)));
            if (t < 1) raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);
    return value;
}

/* -------------------------
  circular ring (small, thin)
--------------------------*/
import { motion as m } from "framer-motion";
function CircularRing({
    percent = 0,
    size = 40,
    stroke = 3,
    color = "#10b981",
}: {
    percent: number;
    size?: number;
    stroke?: number;
    color?: string;
}) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - Math.max(0, Math.min(100, percent)) / 100);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
            <defs>
                <linearGradient id="cg2" x1="0" x2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.5" />
                </linearGradient>
            </defs>

            <g transform={`translate(${size / 2}, ${size / 2})`}>
                <circle r={radius} cx={0} cy={0} fill="none" stroke="#eef2f7" strokeWidth={stroke} />
                <m.circle
                    r={radius}
                    cx={0}
                    cy={0}
                    fill="none"
                    stroke="url(#cg2)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    style={{ rotate: -90, transformOrigin: "center" }}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </g>
        </svg>
    );
}

/* -------------------------
  Frame 1 - MinimalCreditOverview
  (keeps same as your minimal merged card)
--------------------------*/
function StatTile({
    title,
    value,
    sub,
    percent,
    color,
}: {
    title: string;
    value: string | number;
    sub?: string;
    percent?: number;
    color?: string;
}) {
    const display = typeof value === "number" ? Math.round(value) : value;
    return (
        <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-white/0 flex-1 min-w-[105px]">
            <div className="flex flex-col">
                <div className="text-[11px] font-medium text-slate-800">{title}</div>
                <div className="text-[15px] font-medium mt-1 text-slate-900 leading-none">{display}</div>
                {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
            </div>

            <div className="flex items-center">
                <div className="w-[40px] h-[40px]">
                    <CircularRing percent={percent ?? 0} size={40} stroke={3} color={color ?? "#10b981"} />
                </div>
            </div>
        </div>
    );
}

function BarRow({ label, score, color }: { label: string; score: number; color?: string }) {
    const animated = useAnimatedNumber(score, 700);
    const pct = Math.min(100, Math.max(0, animated)); // directly 0–100

    return (
        <div className="flex items-center gap-3 w-full">
            <div className="w-20 text-[11px] font-medium text-slate-800">{label}</div>

            <div className="flex-1 bg-[#f3f4f6] h-1.5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: color ?? "#111827" }}
                />
            </div>

            <div className="w-12 text-right text-[11px] font-medium text-slate-800">
                {Math.round(animated)}
            </div>
        </div>
    );
}


function MinimalComplianceOverview({ autoAnimate = true }: { autoAnimate?: boolean }) {
    const targets = {
        overall: 92,
        audit: 95,
        violations: 0,
        training: 98,
        framework: [
            { label: "Regulatory Compliance", score: 95, color: "#10b981" },
            { label: "Risk Assessment", score: 88, color: "#111827" },
            { label: "Policy Management", score: 92, color: "#111827" },
            { label: "Documentation", score: 94, color: "#111827" },
        ],
    };

    const animOverall = useAnimatedNumber(autoAnimate ? targets.overall : 0, 800);
    const animAudit = useAnimatedNumber(autoAnimate ? targets.audit : 0, 800);
    const animViolations = useAnimatedNumber(autoAnimate ? targets.violations : 0, 800);
    const animTraining = useAnimatedNumber(autoAnimate ? targets.training : 0, 800);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.32 }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-3 max-w-[500px] w-full"
            aria-live="polite"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-medium text-slate-800">Compliance Overview</div>
            </div>

            {/* top stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <StatTile
                    title="Overall Compliance"
                    value={`${Math.round(animOverall)}%`}
                    sub="Excellent"
                    percent={animOverall}
                    color="#16a34a"
                />
                <StatTile
                    title="Audit Score"
                    value={`${Math.round(animAudit)}%`}
                    sub="Clean Audits"
                    percent={animAudit}
                    color="#10b981"
                />
                <StatTile
                    title="Violations"
                    value={Math.round(animViolations)}
                    sub="No Major Issues"
                    percent={animViolations}
                    color="#f59e0b"
                />
                <StatTile
                    title="Training Compliance"
                    value={`${Math.round(animTraining)}%`}
                    sub="Staff Trained"
                    percent={animTraining}
                    color="#059669"
                />
            </div>

            {/* framework bars */}
            <div>
                <div className="text-[11px] font-medium text-slate-800 mb-2">Compliance Framework Overview</div>
                <div className="flex flex-col gap-2">
                    {targets.framework.map((f) => (
                        <BarRow key={f.label} label={f.label} score={f.score} color={f.color} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


/* -------------------------
  Frame 2: View Credit Analysis (from your screenshot text)
  Keep styling like Analysis card — clean paragraphs
--------------------------*/
function ComplianceAnalysisCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 w-[440px] max-h-[260px] overflow-y-auto"
            aria-live="polite"
        >
            <div className="text-[10px] font-medium mb-3">View Compliance Analysis</div>

            <div className="text-[12px]">
                <div className="mb-2">
                    <span className="font-semibold">Regulatory Compliance:</span>{" "}
                    <span className="text-muted-foreground">
                        Maintains high compliance with all applicable regulations. Regular updates to policies and procedures ensure alignment with changing requirements.
                    </span>
                </div>

                <div className="mb-2">
                    <span className="font-semibold">Audit Performance:</span>{" "}
                    <span className="text-muted-foreground">
                        Clean audit reports with minor recommendations. All previous audit findings have been addressed and closed.
                    </span>
                </div>

                <div className="mb-2">
                    <span className="font-semibold">Risk Management:</span>{" "}
                    <span className="text-muted-foreground">
                        Proactive risk assessment and mitigation strategies in place. Regular reviews and updates to risk management framework.                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* -------------------------
  Frame 3: Risk Factors (bulleted)
--------------------------*/
function RecentUpdates() {
    const factors = [
        "Updated environmental compliance policies",
        "Enhanced data protection measures implemented",
        "New staff training modules on regulatory changes",
        "Quarterly compliance review completed",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 w-[440px] max-h-[220px] overflow-y-auto"
            aria-live="polite"
        >
            <div className="text-[10px] font-medium mb-3">Recent Updates</div>

            <ul className="list-disc pl-4 text-[13px] text-muted-foreground space-y-2">
                {factors.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>
        </motion.div>
    );
}

/* -------------------------
  Frame 4: Recommendations (bulleted)
--------------------------*/
function RecommendationsCard() {
    const recs = [
        "Enhance monitoring of emerging regulatory requirements",
        "Strengthen documentation processes for policy updates",
        "Increase frequency of internal compliance audits",
        "Develop additional training modules for specific departments"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg bg-white/95 backdrop-blur-sm shadow-sm p-4 w-[440px] max-h-[220px] overflow-y-auto"
            aria-live="polite"
        >
            <div className="text-[10px] font-medium mb-3">Recommendations</div>

            <ul className="list-disc pl-4 text-[13px] text-muted-foreground space-y-2">
                {recs.map((r, i) => (
                    <li key={i}>{r}</li>
                ))}
            </ul>
        </motion.div>
    );
}

/* -------------------------
  Main component — only frames 1..4
--------------------------*/
export default function ComplianceRisk() {
    type Step = "frame1" | "frame2" | "frame3" | "frame4";
    const [step, setStep] = useState<Step>("frame1");

    const durations: Record<Step, number> = {
        frame1: 4200,
        frame2: 4200,
        frame3: 4200,
        frame4: 4200,
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

    const bgUrl = "/module-animations/compliance-risk-bg.png";

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-0">
                {/* keep background similar to RiskAssessmentTour */}
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
                        <MinimalComplianceOverview />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame2" && (
                    <motion.div key="frame2" className="absolute bottom-6 right-6">
                        <ComplianceAnalysisCard />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame3" && (
                    <motion.div key="frame3" className="absolute bottom-6 right-6">
                        <RecentUpdates />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step === "frame4" && (
                    <motion.div key="frame4" className="absolute bottom-6 right-6">
                        <RecommendationsCard />
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}
