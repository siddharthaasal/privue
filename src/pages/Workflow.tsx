// components/FlowNodesExample.tsx
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import ReactFlow, {
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    MarkerType,
    type Node,
    type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { FileText, ImageIcon, Database as DbIconDummy, Cloud, ShieldAlert } from "lucide-react"; // dummy icons
import { IconOpenAI, IconLlama, IconGemini, IconClaude } from "@/components/workflow-animation/IconsLlm";
import privueLogo from "/privue-logo.png";

/* ======================
   DataNode (your existing card-style nodes)
   ====================== */
type DataNodeProps = {
    data: {
        label: string;
        icons?: { id: string; label?: string; src?: string }[];
        compact?: boolean;
    };
};

function DataNodeInner({ data }: DataNodeProps) {
    const { icons = [], compact } = data;

    // map ids to lucide components (adjust names if you imported aliases)
    const IconMap: Record<string, any> = {
        file: FileText,
        img: ImageIcon,
        // db: Database,
        cloud: Cloud,
        cyber: ShieldAlert,
    };

    const primary = icons[0] ?? { id: "file", label: "file" };
    const IconComponent = IconMap[primary.id] ?? FileText;

    const cardMinWidth = compact ? 20 : 30;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>


            {/* Card (contains only the primary icon) */}
            <div
                className="flex items-center justify-center p-3 bg-white/50 text-slate-900 border border-privue-800"
                style={{
                    borderTopLeftRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    minWidth: cardMinWidth,
                    minHeight: 64,
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <div
                        className="w-10 h-10 rounded-md flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm"
                        title={primary.label ?? primary.id}
                        aria-label={primary.label ?? primary.id}
                    >
                        <IconComponent size={18} className="text-slate-700" />
                    </div>
                </div>

                {/* connection handles: left target and right source */}
                {/* <Handle
                    type="target"
                    position={Position.Left}
                    id="left"
                    style={{
                        left: -10,
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        background: "#ffffff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                /> */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="right"
                    style={{
                        right: -10,
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        background: "#ffffff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                />
            </div>
            {/* Label outside the border (above the card) */}
            {/* <div className="text-sm text-privue-900 font-medium truncate" style={{ marginLeft: 6 }}>
                {label}
            </div> */}
        </div>
    );
}

const DataNode = React.memo(DataNodeInner);

/* ======================
   Models node (carousel) - unchanged except small fix for animation trigger
   ====================== */
type ModelsNodeData = {
    label: string;
    models: { id: string; title: string; icon?: "db" | "file" | "cloud" | "cyber" }[];
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

    // animate when there's at least 2 items
    useEffect(() => {
        if (models.length <= 1) return undefined;
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
            <div
                className="border border-privue-900 rounded-lg"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                style={{ width, padding: 10, background: "transparent" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                    }}
                >
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--privue-900,#0f1724)",
                        }}
                    >
                        {data.label}
                    </div>
                </div>

                <div style={{ height: containerHeight, overflow: "hidden", position: "relative" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            transform: `translateY(${translateY}px)`,
                            transition: "transform 480ms cubic-bezier(.22,.9,.34,1)",
                        }}
                    >
                        {extended.map((m, idx) => (
                            <div
                                key={`${m.id}-${idx}`}
                                style={{
                                    height: itemHeight - 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start", // no right-side box now
                                    padding: "6px 8px",
                                    gap: 10,
                                }}
                            >
                                <div
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 6,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "var(--privue-100,#f1f5f9)",
                                        border: "1px solid var(--privue-200,#e6eef8)",
                                    }}
                                >
                                    {m.icon === "db" && (
                                        <DbIconDummy size={14} className="text-[var(--privue-900,#0f1724)]" />
                                    )}
                                    {m.icon === "file" && (
                                        <FileText size={14} className="text-[var(--privue-900,#0f1724)]" />
                                    )}
                                    {m.icon === "cloud" && (
                                        <Cloud size={14} className="text-[var(--privue-900,#0f1724)]" />
                                    )}
                                    {m.icon === "cyber" && (
                                        <ShieldAlert size={14} className="text-[var(--privue-900,#0f1724)]" />
                                    )}
                                </div>
                                <div style={{ fontSize: 13, color: "var(--privue-800,#334155)" }}>{m.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Handle
                    type="target"
                    position={Position.Left}
                    id={`models-left-${data.label}`}
                    style={dotHandle as any}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`models-right-${data.label}`}
                    style={{
                        right: -6,
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: "var(--privue-700,#475569)",
                        border: "none",
                        top: "45%",
                    }}
                />
            </div>
        );

        // return (
        //     <div
        //         className="border border-privue-900 rounded-lg"
        //         onMouseEnter={() => setPaused(true)}
        //         onMouseLeave={() => setPaused(false)}
        //         style={{ width: width, padding: 10, background: "transparent", }}>
        //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        //             <div style={{ fontSize: 14, fontWeight: 600, color: "var(--privue-900,#0f1724)" }}>{data.label}</div>
        //         </div>

        //         <div style={{ height: containerHeight, overflow: "hidden", position: "relative" }}>
        //             <div style={{ display: "flex", flexDirection: "column", gap: 8, transform: `translateY(${translateY}px)`, transition: "transform 480ms cubic-bezier(.22,.9,.34,1)" }}>
        //                 {extended.map((m, idx) => (
        //                     <div key={`${m.id}-${idx}`} style={{ height: itemHeight - 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", }}>
        //                         <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        //                             <div style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--privue-100,#f1f5f9)", border: "1px solid var(--privue-200,#e6eef8)" }}>
        //                                 {m.icon === "db" && <DbIconDummy size={14} className="text-[var(--privue-900,#0f1724)]" />}
        //                                 {m.icon === "file" && <FileText size={14} className="text-[var(--privue-900,#0f1724)]" />}
        //                                 {m.icon === "cloud" && <Cloud size={14} className="text-[var(--privue-900,#0f1724)]" />}
        //                                 {m.icon === "cyber" && <ShieldAlert size={14} className="text-[var(--privue-900,#0f1724)]" />}
        //                             </div>
        //                             <div style={{ fontSize: 13, color: "var(--privue-800,#334155)" }}>{m.title}</div>
        //                         </div>

        //                         <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)", padding: "4px 6px", borderRadius: 6, background: "transparent", border: "1px solid var(--privue-100,#f1f5f9)" }}>
        //                             v1.0
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>

        //         <Handle type="target" position={Position.Left} id={`models-left-${data.label}`} style={dotHandle as any} />
        //         <Handle type="source" position={Position.Right} id={`models-right-${data.label}`} style={{ right: -6, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
        //     </div>
        // );
    }

    if (animation === "horizontal") {
        const itemWidth = Math.max(160, Math.floor((width - 24) / 2));
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
                                        {m.icon === "db" && <DbIconDummy size={18} className="text-[var(--privue-900,#0f1724)]" />}
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
                                        {m.icon === "db" && <DbIconDummy size={18} className="text-[var(--privue-900,#0f1724)]" />}
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
   DbNode: static SVG (three stacked cylinders)
   - center dark navy, left/right lighter blue (matches your image)
   ====================== */
function DbNodeInner({ data }: { data?: any }) {
    const label = (data && data.label) || "UNIFIED DATA PLATFORM";

    return (
        <div
            style={{
                width: 240,
                // allow the node to be a bit taller to accommodate the label below
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                paddingTop: 6,
            }}
        >
            {/* SVG only — no text inside */}
            <svg
                width="220"
                height="120"
                viewBox="0 0 220 120"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Database"
            >
                <defs>
                    {/* soft drop shadow */}
                    <filter id="db-drop" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                        <feOffset in="blur" dx="0" dy="6" result="offset" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.25" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="offset" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* subtle glossy highlight */}
                    <linearGradient id="gloss" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                    </linearGradient>

                    {/* gradients for left/right/back/front */}
                    <linearGradient id="g-left" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#5b7df0" />
                        <stop offset="1" stopColor="#3b64db" />
                    </linearGradient>
                    <linearGradient id="g-right" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#6d8efc" />
                        <stop offset="1" stopColor="#4c6ef5" />
                    </linearGradient>
                    <linearGradient id="g-front" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#142145" />
                        <stop offset="1" stopColor="#0b1b46" />
                    </linearGradient>

                    {/* rim highlight */}
                    <linearGradient id="rim" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* left/back cylinder (slightly behind) */}
                <g transform="translate(18,6)">
                    <ellipse cx="36" cy="18" rx="36" ry="12" fill="url(#g-left)" opacity="0.95" />
                    <rect x="0" y="18" width="72" height="44" fill="url(#g-left)" />
                    <ellipse cx="36" cy="62" rx="36" ry="12" fill="url(#g-left)" />
                    {/* faint bands */}
                    <rect x="6" y="30" width="60" height="8" fill="#ffffff" opacity="0.08" />
                    <rect x="6" y="44" width="60" height="8" fill="#ffffff" opacity="0.06" />
                </g>

                {/* right/back cylinder (slightly behind) */}
                <g transform="translate(132,6)">
                    <ellipse cx="36" cy="18" rx="36" ry="12" fill="url(#g-right)" opacity="0.95" />
                    <rect x="0" y="18" width="72" height="44" fill="url(#g-right)" />
                    <ellipse cx="36" cy="62" rx="36" ry="12" fill="url(#g-right)" />
                    <rect x="6" y="30" width="60" height="8" fill="#ffffff" opacity="0.08" />
                    <rect x="6" y="44" width="60" height="8" fill="#ffffff" opacity="0.06" />
                </g>

                {/* center/front cylinder (main) */}
                <g transform="translate(56,10)" filter="url(#db-drop)">
                    {/* top rim */}
                    <ellipse cx="48" cy="12" rx="48" ry="14" fill="url(#g-front)" />
                    {/* body */}
                    <rect x="0" y="12" width="96" height="68" fill="url(#g-front)" />
                    {/* bottom rim */}
                    <ellipse cx="48" cy="80" rx="48" ry="14" fill="url(#g-front)" />
                    {/* glossy highlight */}
                    <ellipse cx="48" cy="10" rx="44" ry="10" fill="url(#gloss)" />
                    {/* subtle rim stroke */}
                    <ellipse cx="48" cy="12" rx="48" ry="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    {/* internal white bands for separation */}
                    <rect x="14" y="30" width="68" height="10" rx="4" fill="#ffffff" opacity="0.08" />
                    <rect x="14" y="50" width="68" height="10" rx="4" fill="#ffffff" opacity="0.06" />
                </g>

                {/* subtle circular ground shadow under entire stack */}
                <ellipse cx="110" cy="108" rx="54" ry="8" fill="rgba(6,10,20,0.06)" />
            </svg>

            {/* Label below the svg */}
            <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--privue-900,#0f1724)",
                        letterSpacing: 0.4,
                        background: "transparent",
                        padding: "4px 8px",
                        borderRadius: 6,
                    }}
                >
                    {label}
                </div>
            </div>

            {/* React Flow handles (unchanged positions) */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                style={{
                    left: 15,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                style={{
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            />
        </div>
    );
}

const DbNode = React.memo(DbNodeInner);

/* ======================
   OrbitNode (LLM runtimes)
   ====================== */
type OrbitNodeData = {
    label?: string;
    centerLogo?: string;
    icons?: React.ReactNode[];
    radius?: number;
    iconSize?: number;
    duration?: number;
    reverse?: boolean;
    speed?: number;
};

function OrbitNodeInner({ data }: { data: OrbitNodeData }) {
    const {
        // label = "",
        centerLogo,
        icons = [],
        radius = 72,
        iconSize = 34,
        duration = 20,
        reverse = false,
        speed = 1,
    } = data;

    // compute a circular container size so the orbit fits comfortably
    const padding = 24;
    const size = radius * 2 + iconSize + padding; // container width/height
    const center = size / 2;

    const wrapperStyle: React.CSSProperties = {
        width: size,
        height: size,
        padding: 12,
        boxSizing: "border-box",
        borderRadius: "50%", // make node circular
        background: "transparent", // very soft blue bg
        border: "1px solid #91a7ff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    };

    const centerBoxSize = Math.min(140, Math.max(72, iconSize + 56)); // clamps size between 72 and 140
    const centerBox: React.CSSProperties = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6,
        pointerEvents: "auto",
        zIndex: 3, // on top of orbit path and icons
        width: centerBoxSize,
        height: centerBoxSize,
        borderRadius: "50%",
        // background: "#fcfcfc",
        // boxShadow: "0 10px 30px rgba(11,27,70,0.10)",
    };

    const logoStyle: React.CSSProperties = {
        width: Math.min(centerBoxSize - 20, 112),
        height: Math.min(centerBoxSize - 20, 112),
        objectFit: "contain",
        borderRadius: 12,
    };

    // refs for each icon wrapper so we can set inline transform without re-rendering
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
        const degPerMs = (360 / (duration * 1000)) * (speed ?? 1) * (reverse ? -1 : 1);

        function step(now: number) {
            const elapsed = now - start;
            const baseRotation = elapsed * degPerMs;
            for (let i = 0; i < count; i++) {
                const el = iconRefs.current[i];
                if (!el) continue;
                const angle = baseOffsets[i] + baseRotation;
                // same transform trick, centered on circular container center
                const transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`;
                el.style.position = "absolute";
                el.style.left = `${center}px`;
                el.style.top = `${center}px`;
                el.style.width = `${iconSize}px`;
                el.style.height = `${iconSize}px`;
                el.style.display = "flex";
                el.style.alignItems = "center";
                el.style.justifyContent = "center";
                el.style.transform = transform;
                el.style.pointerEvents = "auto";
                el.style.zIndex = "2"; // above orbit path but below center badge
            }
            rafId = requestAnimationFrame(step);
        }

        rafId = requestAnimationFrame(step);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [icons, radius, iconSize, duration, speed, reverse, center]);

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
            {/* Orbit path SVG (visible circle) */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 1 }}
                aria-hidden
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    // stroke="#748ffc"
                    // stroke="#91a7ff"
                    stroke="#D3D3D3"
                    strokeWidth={1.5}
                    opacity={10}
                // strokeDasharray="6 8"
                />
            </svg>

            {/* center badge */}
            <div style={centerBox}>
                {centerLogo ? <img src={centerLogo} alt="logo" style={logoStyle} /> : null}
                {/* <div style={{ fontSize: 11, fontWeight: 700, color: "var(--privue-800,#334155)" }}>{label}</div> */}
            </div>

            {/* orbit children — wrappers mutated by refs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {icons.map((Ic, i) => (
                    <div key={i} ref={addRef as any} aria-hidden>
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
   ResponseNode (three-icon response card)
   data: {
     items: { id: string; Icon: React.ReactNode; title: string; subtitle?: string }[];
     title?: string; // optional title above icons
   }
   ====================== */
function ResponseNodeInner({ data }: { data: { items: { id: string; Icon: React.ReactNode; title: string; subtitle?: string }[]; title?: string } }) {
    const items = (data && data.items) || [];
    const title = data?.title;

    return (
        <div
            style={{
                width: 360,
                padding: 14,
                boxSizing: "border-box",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid rgba(15,23,36,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
            }}
        >
            {title ? <div style={{ fontSize: 14, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{title}</div> : null}

            <div style={{ display: "flex", gap: 18, justifyContent: "center", width: "100%" }}>
                {items.slice(0, 3).map((it) => (
                    <div key={it.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 100 }}>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--privue-50,#fbfdff)",
                                border: "1px solid var(--privue-100,#f1f5f9)",
                                boxShadow: "0 6px 14px rgba(16,24,40,0.03)",
                            }}
                        >
                            {/* Icon passed as React node; ensure it fits inside container */}
                            <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--privue-700,#475569)" }}>
                                {it.Icon}
                            </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>{it.title}</div>
                            {it.subtitle ? <div style={{ fontSize: 11, color: "var(--privue-600,#64748b)", marginTop: 4 }}>{it.subtitle}</div> : null}
                        </div>
                    </div>
                ))}
            </div>

            {/* connection handles */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
                <div />
                <div />
            </div>

            {/* left & right handles positioned relative to the whole node */}
            <Handle
                type="target"
                position={Position.Left}
                id="response-left"
                style={{
                    left: -6,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    top: "50%",
                    pointerEvents: "auto",
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="response-right"
                style={{
                    right: -6,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    top: "50%",
                    pointerEvents: "auto",
                }}
            />
        </div>
    );
}
const ResponseNode = React.memo(ResponseNodeInner);

/* ======================
   register node types
   ====================== */
const nodeTypes = { dataNode: DataNode, modelsNode: ModelsNode, orbitNode: OrbitNode, dbNode: DbNode, responseNode: ResponseNode };

/* ======================
   main Flow component
   ====================== */
export default function FlowNodesExample() {
    const fullModels = useMemo(
        () => [
            { id: "m1", title: "Credit Risk", icon: "db" },
            { id: "m2", title: "Climate Risk", icon: "cloud" },
            { id: "m3", title: "Compliance Risk", icon: "file" },
            { id: "m4", title: "Cyber Risk", icon: "cyber" },
            { id: "m5", title: "Financial Engine", icon: "file" },
            { id: "m6", title: "Macro Economic Engine", icon: "db" },
            { id: "m7", title: "Industry Engine", icon: "file" },
        ],
        []
    );

    const initialNodes: Node[] = [
        {
            id: "structured",
            type: "dataNode",
            position: { x: 80, y: 40 },
            data: {
                label: "Structured Data",
                icons: [
                    { id: "file", label: "CSV" },
                    { id: "img", label: "Charts" },
                    { id: "db", label: "DB" },
                    { id: "cloud", label: "API" },
                ],
            },
        },
        {
            id: "unstructured",
            type: "dataNode",
            position: { x: 80, y: 180 },
            data: {
                label: "Unstructured Data",
                icons: [
                    { id: "file", label: "Email" },
                    { id: "img", label: "Docs" },
                    { id: "db", label: "OCR" },
                    { id: "cloud", label: "Scrapes" },
                ],
            },
        },
        {
            id: "privue",
            type: "dataNode",
            position: { x: 80, y: 320 },
            data: {
                label: "Privue's Proprietary Data",
                icons: [
                    { id: "db", label: "Proprietary DB" },
                    { id: "file", label: "Signals" },
                    { id: "cloud", label: "Streams" },
                    { id: "img", label: "Enriched" },
                ],
            },
        },
        {
            id: "thirdparty",
            type: "dataNode",
            position: { x: 80, y: 460 },
            data: {
                label: "Third Party Data",
                icons: [
                    { id: "cloud", label: "Vendors" },
                    { id: "file", label: "Feeds" },
                    { id: "db", label: "Partners" },
                    { id: "img", label: "APIs" },
                ],
            },
        },

        // DbNode (static SVG) — REPLACES the previous "unified" data node
        {
            id: "unified",
            type: "dbNode",
            position: { x: 320, y: 220 },
            data: { label: "Unified Data Platform" },
        },

        // LLM Models (orbit)
        {
            id: "llm-models",
            type: "orbitNode",
            position: { x: 640, y: 70 },
            data: {
                label: "LLM Runtimes",
                centerLogo: privueLogo,
                icons: [
                    <div key="oai" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconOpenAI /></div>,
                    <div key="llama" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconLlama /></div>,
                    <div key="gemini" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconGemini /></div>,
                    <div key="claude" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconClaude /></div>,
                ],
                radius: 72,
                iconSize: 32,
                duration: 20,
                reverse: false,
                speed: 1.1,
            },
        },

        // Models bucket is to the right / below the LLMs
        {
            id: "models",
            type: "modelsNode",
            position: { x: 640, y: 370 },
            data: {
                label: "Models",
                models: fullModels,
                visible: 3,
                intervalMs: 2000,
                width: 320,
                animation: "vertical",
            },
        },
        // response node
        {
            id: "response",
            type: "responseNode",
            position: { x: 1100, y: 200 }, // tweak coordinates to place it visually where you like
            data: {
                title: "RESPONSE",
                items: [
                    { id: "resp1", Icon: (<DbIconDummy size={20} />), title: "Delivered via API", subtitle: "to Client System" },
                    { id: "resp2", Icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>), title: "Specific response", subtitle: "on the interface" },
                    { id: "resp3", Icon: (<FileText size={20} />), title: "Custom report", subtitle: "or pre-compiled" },
                ],
            },
        },

    ];

    // edges - sources -> dbNode(unified) -> llm-models -> models
    const initialEdges: Edge[] = [
        {
            id: "e-structured-unified-dashed",
            source: "structured",
            target: "unified",
            animated: true,
            type: "smoothstep",
            style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 2, strokeDasharray: "4 6", strokeLinecap: "round" },
        },
        {
            id: "e-unstructured-unified-dashed",
            source: "unstructured",
            target: "unified",
            animated: true,
            type: "smoothstep",
            style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 2, strokeDasharray: "4 6", strokeLinecap: "round" },
        },
        {
            id: "e-privue-unified-dashed",
            source: "privue",
            target: "unified",
            animated: true,
            type: "smoothstep",
            style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 2, strokeDasharray: "4 6", strokeLinecap: "round" },
        },
        {
            id: "e-third-unified-dashed",
            source: "thirdparty",
            target: "unified",
            animated: true,
            type: "smoothstep",
            style: { stroke: "rgba(100,116,139,0.55)", strokeWidth: 2, strokeDasharray: "4 6", strokeLinecap: "round" },
        },

        {
            id: "e-unified-llm-blue",
            source: "unified",
            target: "llm-models",
            animated: true,
            type: "smoothstep",
            style: { stroke: "#4c6ef5", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
            markerEnd: { type: MarkerType.ArrowClosed },
        },

        {
            id: "e-unified-models",
            source: "unified",
            target: "models",
            animated: true,
            type: "smoothstep",
            style: { stroke: "#4c6ef5", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
            markerEnd: { type: MarkerType.ArrowClosed },
        },

        // optional faint connector
        {
            id: "e-unified-llm-neutral",
            source: "unified",
            target: "llm-models",
            animated: false,
            type: "smoothstep",
            style: { stroke: "rgba(71,85,105,0.12)", strokeWidth: 2 },
        },
        {
            id: "e-models-response",
            source: "models",
            target: "response",
            animated: true,
            type: "smoothstep",
            style: { stroke: "#16a34a", strokeWidth: 2, strokeLinecap: "round" },
            markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
            id: "e-models-response",
            source: "llm-models",
            target: "response",
            animated: true,
            type: "smoothstep",
            style: { stroke: "#16a34a", strokeWidth: 2, strokeLinecap: "round" },
            markerEnd: { type: MarkerType.ArrowClosed },
        }
    ];

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: any) => {
            const newEdge: Edge = {
                ...connection,
                animated: true,
                type: "smoothstep",
                style: { stroke: "rgba(71,85,105,0.85)", strokeWidth: 1.4, strokeLinecap: "round" },
                markerEnd: { type: MarkerType.Arrow },
            };
            addEdge(newEdge, edges);
        },
        [edges]
    );

    return (
        <div className="w-full h-[760px] bg-slate-100 rounded-lg p-6 relative">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(2,6,23,0.06) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                panOnScroll
                zoomOnScroll={false}
            >
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
