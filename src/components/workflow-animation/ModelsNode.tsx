import React, { useEffect, useState } from "react";
import { FileText, Database as DbIconDummy, Cloud, ShieldAlert } from "lucide-react"; // dummy icons
import { Handle, Position } from "reactflow";


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
export { ModelsNode };