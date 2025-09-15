// components/FlowNodesExample.tsx
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import ReactFlow, {
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    type Node,
    type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { FileText, ImageIcon, Database, Cloud, Cpu } from "lucide-react";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import privueLogo from "/privue-logo.png";

/* ======================
   IconNode (left tiles + big DB)
   - handles simplified (small dot)
   ====================== */
type IconNodeData = {
    label: string;
    iconId?: "file" | "img" | "db" | "cloud" | "ai";
    showTarget?: boolean;
    showSource?: boolean;
    big?: boolean;
};
function IconNodeInner({ data }: { data: IconNodeData }) {
    const { label, iconId = "file", showTarget = true, showSource = true, big = false } = data;

    // shared small-dot handle style
    const dotHandle = { width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none" };

    if (big) {
        return (
            <div style={{ width: 220, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Database size={64} className="text-[var(--privue-900,#0f1724)]" />
                </div>
                <div style={{ marginTop: 12, textAlign: "center", fontWeight: 800, color: "var(--privue-900,#0f1724)", fontSize: 15 }}>
                    {label}
                </div>

                {showTarget && <Handle type="target" position={Position.Left} id="left" style={{ ...dotHandle, left: -6, top: "46%" }} />}
                {showSource && <Handle type="source" position={Position.Right} id="right" style={{ ...dotHandle, right: -6, top: "46%" }} />}
            </div>
        );
    }

    return (
        <div style={{ width: 100, padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
                style={{
                    width: 84,
                    height: 84,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: "1px solid rgba(15,23,36,0.06)",
                    boxShadow: "0 6px 14px rgba(16,24,40,0.03)",
                }}
            >
                {iconId === "file" && <FileText size={28} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "img" && <ImageIcon size={26} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "db" && <Database size={26} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "cloud" && <Cloud size={26} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "ai" && <Cpu size={26} className="text-[var(--privue-900,#0f1724)]" />}
            </div>

            <div style={{ marginTop: 8, textAlign: "center", color: "var(--privue-900,#0f1724)", fontSize: 13, fontWeight: 600 }}>{label}</div>

            {showTarget && <Handle type="target" position={Position.Left} id="left" style={{ left: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />}
            {showSource && <Handle type="source" position={Position.Right} id="right" style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />}
        </div>
    );
}
const IconNode = React.memo(IconNodeInner);

/* ======================
   MiniIconNode (OCR / LLM) - transparent + small dot handles
   ====================== */
type MiniIconNodeData = { label?: string; iconId?: "ocr" | "llm" | "doc" };
function MiniIconNodeInner({ data }: { data: MiniIconNodeData }) {
    const { label, iconId } = data;
    const IconEl = iconId === "ocr" ? FileText : iconId === "llm" ? Cpu : ImageIcon;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 140 }}>
            <div style={{ width: 56, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", boxShadow: "none" }}>
                <IconEl size={18} className="text-[var(--privue-700,#475569)]" />
            </div>
            {label && <div style={{ marginTop: 6, fontSize: 12, color: "var(--privue-700,#475569)", textAlign: "center" }}>{label}</div>}
            <Handle type="target" position={Position.Left} id="mini-left" style={{ left: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
            <Handle type="source" position={Position.Right} id="mini-right" style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
        </div>
    );
}
const MiniIconNode = React.memo(MiniIconNodeInner);

/* ======================
   Models node (carousel) - supports multiple animations
   - handles made minimal; width configurable
   ====================== */
type ModelsNodeData = {
    label: string;
    models: { id: string; title: string; icon?: "db" | "file" | "cloud" }[];
    visible?: number;
    intervalMs?: number;
    width?: number;
    animation?: "vertical" | "horizontal" | "fade";
};
function ModelsNodeInner({ data }: { data: ModelsNodeData }) {
    const visible = data.visible ?? 3;
    const intervalMs = data.intervalMs ?? 2200;
    const models = data.models ?? [];
    const width = data.width ?? 260;
    const animation = data.animation ?? "vertical";

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (models.length <= (animation === "vertical" ? visible : 1)) return undefined;
        const id = window.setInterval(() => {
            if (!paused) setIndex((i) => (i + 1) % models.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [models.length, visible, intervalMs, paused, animation]);

    const dotHandle = { left: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" };

    if (animation === "vertical") {
        const extended = [...models, ...models];
        const itemHeight = 44;
        const containerHeight = visible * itemHeight;
        const safeIndex = index % models.length;
        const translateY = -safeIndex * itemHeight;

        return (
            <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ width: width, padding: 10, background: "transparent", border: "1px solid rgba(15,23,36,0.04)", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--privue-900,#0f1724)" }}>{data.label}</div>
                </div>

                <div style={{ height: containerHeight, overflow: "hidden", position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, transform: `translateY(${translateY}px)`, transition: "transform 480ms cubic-bezier(.22,.9,.34,1)" }}>
                        {extended.map((m, idx) => (
                            <div key={`${m.id}-${idx}`} style={{ height: itemHeight - 4, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: 8, background: "var(--privue-50,#fbfdff)", border: "1px solid var(--privue-100,#f1f5f9)" }}>
                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--privue-100,#f1f5f9)", border: "1px solid var(--privue-200,#e6eef8)" }}>
                                        {m.icon === "db" && <Database size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "file" && <FileText size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "cloud" && <Cloud size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--privue-800,#334155)" }}>{m.title}</div>
                                </div>

                                <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)", padding: "4px 6px", borderRadius: 6, background: "transparent", border: "1px solid var(--privue-100,#f1f5f9)" }}>
                                    v1.0
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Handle type="target" position={Position.Left} id={`models-left-${data.label}`} style={dotHandle as any} />
                <Handle type="source" position={Position.Right} id={`models-right-${data.label}`} style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
            </div>
        );
    }

    if (animation === "horizontal") {
        const itemWidth = Math.max(160, Math.floor((width - 24) / 2));
        // const total = models.length;
        const translateX = -index * (itemWidth + 12);
        const extended = [...models, ...models];

        return (
            <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ width: width, padding: 10, background: "transparent", border: "1px solid rgba(15,23,36,0.04)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{data.label}</div>
                </div>

                <div style={{ width: "100%", overflow: "hidden" }}>
                    <div style={{ display: "flex", gap: 12, transform: `translateX(${translateX}px)`, transition: "transform 560ms cubic-bezier(.22,.9,.34,1)", width: (extended.length * (itemWidth + 12)) }}>
                        {extended.map((m, idx) => (
                            <div
                                key={`${m.id}-h-${idx}`}
                                style={{
                                    width: itemWidth,
                                    minWidth: itemWidth,
                                    height: 72,
                                    borderRadius: 10,
                                    padding: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    background: "var(--privue-50,#fbfdff)",
                                    border: "1px solid var(--privue-100,#f1f5f9)",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--privue-100,#f1f5f9)", border: "1px solid var(--privue-200,#e6eef8)" }}>
                                        {m.icon === "db" && <Database size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "file" && <FileText size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "cloud" && <Cloud size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{m.title}</div>
                                        <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)" }}>runtime</div>
                                    </div>
                                </div>

                                <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)", padding: "6px 8px", borderRadius: 8, border: "1px solid var(--privue-100,#f1f5f9)" }}>
                                    v1.0
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Handle type="target" position={Position.Left} id={`models-left-${data.label}`} style={dotHandle as any} />
                <Handle type="source" position={Position.Right} id={`models-right-${data.label}`} style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
            </div>
        );
    }

    // fade (single-item crossfade)
    // const current = models[index % models.length] ?? null;
    return (
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ width: width, padding: 10, background: "transparent", border: "1px solid rgba(15,23,36,0.04)", borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{data.label}</div>
            </div>

            <div style={{ height: 84, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {models.map((m, idx) => {
                    const visibleNow = idx === index % models.length;
                    return (
                        <div key={`fade-${m.id}-${idx}`} style={{ position: "absolute", opacity: visibleNow ? 1 : 0, transition: "opacity 420ms ease", width: "100%", display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "92%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderRadius: 10, background: "var(--privue-50,#fbfdff)", border: "1px solid var(--privue-100,#f1f5f9)" }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--privue-100,#f1f5f9)", border: "1px solid var(--privue-200,#e6eef8)" }}>
                                        {m.icon === "db" && <Database size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "file" && <FileText size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                        {m.icon === "cloud" && <Cloud size={18} className="text-[var(--privue-900,#0f1724)]" />}
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{m.title}</div>
                                </div>

                                <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)", padding: "6px 8px", borderRadius: 8, border: "1px solid var(--privue-100,#f1f5f9)" }}>
                                    v1.0
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Handle type="target" position={Position.Left} id={`models-left-${data.label}`} style={dotHandle as any} />
            <Handle type="source" position={Position.Right} id={`models-right-${data.label}`} style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
        </div>
    );
}
const ModelsNode = React.memo(ModelsNodeInner);

/* ======================
   NEW: OrbitNode (LLM runtimes) — uses OrbitingCircles
   ====================== */


type OrbitNodeData = {
    label?: string;
    centerLogo?: string;
    icons?: React.ReactNode[];
    radius?: number; // px
    iconSize?: number; // px
    duration?: number; // seconds for full revolution
    reverse?: boolean;
    speed?: number; // multiplier
};

function OrbitNodeInner({ data }: { data: OrbitNodeData }) {
    const {
        label = "LLM Runtimes",
        centerLogo,
        icons = [],
        radius = 80,
        iconSize = 34,
        duration = 20,
        reverse = false,
        speed = 1,
    } = data;

    const wrapperStyle: React.CSSProperties = {
        width: 340,
        height: 200,
        padding: 12,
        boxSizing: "border-box",
        borderRadius: 12,
        background: "transparent",
        border: "1px solid rgba(15,23,36,0.04)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible", // allow icons outside the center area
    };

    const centerBox: React.CSSProperties = {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "auto",
        zIndex: 2, // keep logo on top of orbiting items if needed
    };

    const logoStyle: React.CSSProperties = { width: 64, height: 64, objectFit: "contain" };

    // handles refs for each icon wrapper element so we can set inline styles without re-renders
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
    iconRefs.current = [];

    const addRef = useCallback((el: HTMLDivElement | null) => {
        if (el) iconRefs.current.push(el);
    }, []);

    useEffect(() => {
        if (!icons || icons.length === 0) return;

        let rafId: number | null = null;
        const start = performance.now();
        const count = icons.length;
        const baseOffsets = new Array(count).fill(0).map((_, i) => (360 / count) * i);

        // degrees per ms for one revolution: 360 / (duration * 1000) scaled by speed
        const degPerMs = (360 / (duration * 1000)) * (speed ?? 1) * (reverse ? -1 : 1);

        function step(now: number) {
            const elapsed = now - start;
            const baseRotation = elapsed * degPerMs; // degrees progressed since start

            for (let i = 0; i < count; i++) {
                const el = iconRefs.current[i];
                if (!el) continue;
                const angle = baseOffsets[i] + baseRotation;
                // transform trick: translate(-50%,-50%) so element center is at center, rotate(angle) then translateX(radius), then reverse rotate so icon remains upright
                const transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`;
                // also set size via inline styles and ensure it's absolutely centered
                el.style.position = "absolute";
                el.style.left = "50%";
                el.style.top = "50%";
                el.style.width = `${iconSize}px`;
                el.style.height = `${iconSize}px`;
                el.style.display = "flex";
                el.style.alignItems = "center";
                el.style.justifyContent = "center";
                el.style.transform = transform;
                el.style.pointerEvents = "auto";
                el.style.zIndex = "1";
            }

            rafId = requestAnimationFrame(step);
        }

        rafId = requestAnimationFrame(step);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            // clear transform/styles optionally
        };
    }, [icons, radius, iconSize, duration, speed, reverse]);

    // small circular handle style (inline)
    const dotHandle: React.CSSProperties = {
        left: -6,
        width: 8,
        height: 8,
        borderRadius: 999,
        background: "var(--privue-700,#475569)",
        border: "none",
        top: "45%",
    };

    return (
        <div style={wrapperStyle}>
            <div style={centerBox}>
                {centerLogo && <img src={centerLogo} alt="logo" style={logoStyle} />}
                {/* <div style={{ fontSize: 13, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{label}</div> */}
            </div>

            {/* orbit children — we create wrappers we can mutate via refs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {icons.map((Ic, i) => (
                    <div key={i} ref={addRef as any}>
                        {/* the actual icon component stays as child; wrapper receives inline positioning */}
                        {Ic}
                    </div>
                ))}
            </div>

            <Handle type="target" position={Position.Left} id="left" style={dotHandle} />
            <Handle type="source" position={Position.Right} id="right" style={{ ...dotHandle, left: undefined, right: -6 } as React.CSSProperties} />
        </div>
    );
}

const OrbitNode = React.memo(OrbitNodeInner);

/* ======================
   small helper icons set for orbit (use your SVGs)
   Replace these with your actual OpenAI/LLaMA/Gemini/Claude svgs.
   ====================== */
const OrbitIcons = {
    openai: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" className="fill-current">
            {/* simplified OpenAI-ish placeholder; replace with your asset */}
            <circle cx="12" cy="12" r="10" />
        </svg>
    ),
    llama: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" className="fill-current">
            <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
    ),
    gemini: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" className="fill-current">
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
    claude: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" className="fill-current">
            <polygon points="12,2 22,22 2,22" />
        </svg>
    ),
};
/* register nodes */
const nodeTypes = { iconNode: IconNode, miniIconNode: MiniIconNode, modelsNode: ModelsNode, orbitNode: OrbitNode };
const edgeTypes = {}; // built-in edge types

export default function FlowNodesExample() {
    const fullModels = useMemo(
        () => [
            { id: "m1", title: "Credit Risk", icon: "db" },
            { id: "m2", title: "Climate Risk", icon: "cloud" },
            { id: "m3", title: "Compliance Risk", icon: "file" },
            { id: "m4", title: "Liquidity Risk", icon: "db" },
            { id: "m5", title: "Operational Risk", icon: "file" },
            { id: "m6", title: "Market Risk", icon: "db" },
            { id: "m7", title: "Fraud Detection", icon: "file" },
            { id: "m8", title: "Counterparty Risk", icon: "cloud" },
            { id: "m9", title: "Climate Scenario", icon: "cloud" },
        ],
        []
    );

    const llmModels = useMemo(
        () => [
            { id: "llm1", title: "OpenAI (GPT)", icon: "openai" },
            { id: "llm2", title: "LLaMA", icon: "llama" },
            { id: "llm3", title: "Claude", icon: "claude" },
            { id: "llm4", title: "Gemini", icon: "gemini" },
        ],
        []
    );

    /* ------------------------
       Edges: thin, rounded, no arrow markers; small dash for dashed edges
       ------------------------ */
    const initialEdges: Edge[] = useMemo(
        () => [
            { id: "e-unstr-ocr", source: "unstructured", target: "ocr", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.75)", strokeWidth: 1.2, strokeLinecap: "round" } },
            { id: "e-ocr-llm", source: "ocr", target: "llmparse", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.75)", strokeWidth: 1.2, strokeLinecap: "round" } },
            { id: "e-llm-unified", source: "llmparse", target: "unified", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.2, strokeLinecap: "round" }, label: "semantic enrichment" },

            { id: "e-structured-unified", source: "structured", target: "unified", animated: true, type: "smoothstep", style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 1.2, strokeDasharray: "4 6", strokeLinecap: "round" } },
            { id: "e-privue-unified", source: "privue", target: "unified", animated: true, type: "smoothstep", style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 1.2, strokeDasharray: "4 6", strokeLinecap: "round" } },
            { id: "e-third-unified", source: "thirdparty", target: "unified", animated: true, type: "smoothstep", style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 1.2, strokeDasharray: "4 6", strokeLinecap: "round" } },

            // unified -> llmmodels -> models (thin solid lines)
            { id: "e-unified-llmmodels", source: "unified", target: "llmmodels", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.2, strokeLinecap: "round" } },
            // { id: "e-llmmodels-models", source: "llmmodels", target: "models", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.2, strokeLinecap: "round" } },

            // unified -> models (direct)
            { id: "e-unified-models", source: "unified", target: "models", animated: true, type: "smoothstep", style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.2, strokeLinecap: "round" } },
        ],
        []
    );

    /* ------------------------
       Nodes: adjusted positions and spacing
       ------------------------ */
    const initialNodes: Node[] = useMemo(
        () => [
            { id: "unstructured", type: "iconNode", position: { x: 28, y: 24 }, data: { label: "Unstructured Data", iconId: "img", showTarget: true, showSource: true } },
            { id: "structured", type: "iconNode", position: { x: 28, y: 136 }, data: { label: "Structured Data", iconId: "file", showTarget: true, showSource: true } },
            { id: "privue", type: "iconNode", position: { x: 28, y: 248 }, data: { label: "Privue Data", iconId: "db", showTarget: true, showSource: true } },
            { id: "thirdparty", type: "iconNode", position: { x: 28, y: 360 }, data: { label: "Third Party", iconId: "cloud", showTarget: true, showSource: true } },

            // OCR & LLM inline (no visual bg)
            { id: "ocr", type: "miniIconNode", position: { x: 220, y: 24 }, data: { label: "OCR Parsing", iconId: "ocr" } },
            { id: "llmparse", type: "miniIconNode", position: { x: 360, y: 24 }, data: { label: "LLM Parsing", iconId: "llm" } },

            // Unified Data Platform moved slightly right & centered
            { id: "unified", type: "iconNode", position: { x: 560, y: 160 }, data: { label: "Unified Data Platform", iconId: "db", big: true, showTarget: true, showSource: true } },

            // NEW: Orbit node using OrbitingCircles - note icon components passed as React nodes
            {
                id: "llmmodels",
                type: "orbitNode",
                position: { x: 820, y: 88 },
                data: {
                    label: "LLM Runtimes",
                    centerLogo: privueLogo,
                    icons: [
                        <OrbitIcons.openai key="oai" />,
                        <OrbitIcons.llama key="llama" />,
                        <OrbitIcons.gemini key="gemini" />,
                        <OrbitIcons.claude key="claude" />,
                    ],
                    radius: 80,
                    iconSize: 34,
                    duration: 24,
                    reverse: false,
                    speed: 1.2,
                },
            },
            // Models: keep vertical animation (visual registry), pushed further right
            { id: "models", type: "modelsNode", position: { x: 820, y: 280 }, data: { label: "Models", models: fullModels, visible: 3, intervalMs: 2000, width: 360, animation: "vertical" } },
        ],
        [fullModels]
    );

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: any) => {
            const newEdge: Edge = {
                ...connection,
                animated: true,
                type: "smoothstep",
                style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.2, strokeLinecap: "round" },
            };
            addEdge(newEdge, edges);
        },
        [edges]
    );

    return (
        <div className="w-full h-[760px] bg-white rounded-lg p-6 relative overflow-hidden">
            {/* much lighter grid — comment out if you want blank */}
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(2,6,23,0.02) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                nodesDraggable={false}
                panOnScroll={false}
                zoomOnScroll={false}
            >
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
