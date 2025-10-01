// IntegrationsTour.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/**
 * IntegrationsTour (clean)
 * - background image
 * - bottom-right frames (AnimatePresence)
 * - static straight SVG connector (no packets)
 *
 * Usage: <IntegrationsTour />
 */



/**
 * SmallIntegrationsFrame (improved)
 * - compact content (ERP metrics + short product summary)
 * - animated straight connector (path draw + 2 packets)
 * - respects prefers-reduced-motion
 *
 * Use: <SmallIntegrationsFrame />
 */

export function SmallIntegrationsFrame() {
    const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;

    // <- CORRECT: useMemo returns the array directly
    const leftMetrics = [
        { label: "Orders", value: "1.2k" },
        { label: "On-time", value: "98%" },
    ];



    const pathVariant: Variants = {
        hidden: { pathLength: 0 },
        show: { pathLength: 1 },
    };

    return (
        <div
            className="w-[420px] p-2 bg-white/95 rounded-md shadow-lg border border-slate-100"
            style={{ fontSize: 10 }}
        >
            <div className="flex items-center justify-between mb-1">
                <div className="text-[11px] font-semibold">Integrations</div>
                <div className="text-[9px] text-slate-500">ERP · Cloud</div>
            </div>

            <div className="flex items-center gap-3 h-20">
                <div className="w-28 h-full bg-slate-50 rounded p-2 text-[9px] flex flex-col justify-between">
                    <div className="font-medium truncate">SAP Business One</div>

                    <div className="flex flex-col gap-0.5">
                        {leftMetrics.map((m: any) => (
                            <div key={m.label} className="flex items-center justify-between leading-none">
                                <div className="text-[8.5px] text-slate-500">{m.label}</div>
                                <div className="text-[9px] font-semibold">{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative h-full">
                    <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
                        <path d="M40 32 L560 32" stroke="rgba(15,23,42,0.06)" strokeWidth={10} fill="none" strokeLinecap="round" />

                        <motion.path
                            id="si-path"
                            d="M40 32 L560 32"
                            stroke="rgba(14,89,255,0.98)"
                            strokeWidth={2.4}
                            fill="none"
                            strokeLinecap="round"
                            variants={pathVariant}
                            initial="hidden"
                            animate="show"
                            transition={{ duration: 0.8 }}
                        />

                        {!prefersReducedMotion && (
                            <>
                                <circle cx="0" cy="0" r="5" fill="#0e59ff" opacity="0.98">
                                    <animateMotion dur="0.9s" repeatCount="indefinite" calcMode="paced">
                                        <mpath href="#si-path" />
                                    </animateMotion>
                                </circle>

                                <circle cx="0" cy="0" r="4" fill="#6aa2ff" opacity="0.95">
                                    <animateMotion dur="0.9s" begin="0.26s" repeatCount="indefinite" calcMode="paced">
                                        <mpath href="#si-path" />
                                    </animateMotion>
                                </circle>
                            </>
                        )}
                    </svg>
                </div>

                <div className="w-35 h-full bg-white rounded p-2 text-[9px] border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className="font-medium truncate">Privue — Case Acquisition</div>
                        <div className="text-[8.5px] text-slate-500 truncate">Court cases • Auto-summary</div>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-[9px]  text-emerald-700 ">
                            Synced
                        </span>
                        <span className="text-[9px]  text-slate-700" style={{ fontSize: 8.5 }}>
                            SAP Connector
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}




function IntegrationsDetailFrame() {
    return (
        <div className="w-[360px] p-3 bg-white/95 rounded-md shadow-lg border border-slate-100" style={{ fontSize: 10 }}>
            <div className="text-[11px] font-semibold mb-1">Connectors</div>
            <div className="text-[9px] text-slate-600 mb-2">Available: SAP, Salesforce, Custom API</div>

            <div className="flex gap-2 flex-wrap">
                <span className="text-[9px] px-2 py-[4px] rounded bg-slate-50 border">SAP</span>
                <span className="text-[9px] px-2 py-[4px] rounded bg-slate-50 border">Salesforce</span>
            </div>
        </div>
    );
}

function IntegrationsSyncFrame() {
    return (
        <div className="w-[320px] p-2 bg-white/95 rounded-md shadow-lg border border-slate-100" style={{ fontSize: 10 }}>
            <div className="text-[11px] font-semibold">Sync Status</div>
            <div className="mt-1 text-[9px] text-slate-600">Real-time • 2 active connectors</div>

            <div className="mt-2 flex items-center gap-2">
                <div className="text-[9px] px-2 py-[4px] rounded bg-emerald-50 border text-emerald-700">Healthy</div>
                <div className="text-[9px] px-2 py-[4px] rounded bg-slate-50 border text-slate-700">Last: 12s ago</div>
            </div>
        </div>
    );
}

export default function IntegrationsTour() {
    const bgUrl = "/module-animations/integrations-bg.png";
    const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;

    type Step = "one" | "two" | "three";
    const [step, setStep] = useState<Step>("one");

    // durations per frame (ms)
    const durations: Record<Step, number> = { one: 3600, two: 3000, three: 3000 };

    // cycle frames
    useEffect(() => {
        const t = setTimeout(() => {
            setStep((s) => (s === "one" ? "two" : s === "two" ? "three" : "one"));
        }, durations[step]);
        return () => clearTimeout(t);
    }, [step]);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg bg-white">
            {/* background */}
            <div className="absolute inset-0">
                <img src={bgUrl} alt="integrations background" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(245,247,255,0.6))" }} />
            </div>

            {/* decorative straight-line SVG near bottom-right (static) */}
            <div className="absolute right-6 bottom-40 w-[460px] h-14 pointer-events-none">
                <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M40 32 L560 32" stroke="rgba(14,89,255,0.98)" strokeWidth={2.6} fill="none" strokeLinecap="round" />
                </svg>
            </div>

            {/* bottom-right frames (AnimatePresence) */}
            <div className="absolute bottom-6 right-6 z-30">
                <AnimatePresence mode="wait">
                    {step === "one" && (
                        <motion.div key="one" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.36 }}>
                            <SmallIntegrationsFrame />
                        </motion.div>
                    )}

                    {step === "two" && (
                        <motion.div key="two" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.36 }}>
                            <IntegrationsDetailFrame />
                        </motion.div>
                    )}

                    {step === "three" && (
                        <motion.div key="three" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.36 }}>
                            <IntegrationsSyncFrame />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* reduced motion hint */}
            {prefersReducedMotion && (
                <div className="absolute bottom-6 left-6 text-[9px] text-slate-500">Reduced motion — animations minimized</div>
            )}
        </div>
    );
}

