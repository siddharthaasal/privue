// components/FlowNodesExample.tsx
import React, { useCallback, useMemo, useState, useEffect } from "react";
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
    type EdgeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { FileText, ImageIcon, Database, Cloud, Cpu } from "lucide-react";

/* ==================================================
   Icon node (compact)
   Light theme: transparent interiors, dark text
   ================================================== */
type IconNodeData = {
    label: string;
    iconId?: "file" | "img" | "db" | "cloud" | "ai";
};

function IconNodeInner({ data }: { data: IconNodeData }) {
    const { label, iconId = "file" } = data;

    return (
        <div
            className="flex flex-col items-center select-none"
            style={{
                width: 100,
                padding: 4,
                background: "transparent",
            }}
        >
            {/* small rounded rect */}
            <div
                style={{
                    width: 75,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    border: "2px solid var(--privue-300,#e6eef8)",
                    borderTopLeftRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                }}
            >
                {iconId === "file" && <FileText size={24} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "img" && <ImageIcon size={20} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "db" && <Database size={20} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "cloud" && <Cloud size={20} className="text-[var(--privue-900,#0f1724)]" />}
                {iconId === "ai" && <Cpu size={20} className="text-[var(--privue-900,#0f1724)]" />}
            </div>

            {/* label below box */}
            <div style={{ marginTop: 8, textAlign: "center" }}>
                <div style={{ color: "var(--privue-900,#0f1724)", fontSize: 14, fontWeight: 600 }}>{label}</div>
            </div>

            {/* handles */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                style={{
                    left: -10,
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "3px solid var(--privue-300,#e6eef8)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.04)",
                    top: "45%",
                }}
            />
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
                    border: "3px solid var(--privue-300,#e6eef8)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.04)",
                    top: "45%",
                }}
            />
        </div>
    );
}
const IconNode = React.memo(IconNodeInner);

/* ==================================================
   Models node (light themed), animated carousel:
   - displays 3 items at a time
   - cycles through the provided models array (any length)
   - smooth vertical sliding animation
   ================================================== */
type ModelsNodeData = {
    label: string;
    models: { id: string; title: string; icon?: "db" | "file" | "cloud" }[];
    visible?: number; // how many visible at once (default 3)
    intervalMs?: number; // rotation interval in ms (default 2000)
};

function ModelsNodeInner({ data }: { data: ModelsNodeData }) {
    const visible = data.visible ?? 3;
    const intervalMs = data.intervalMs ?? 2200;
    const models = data.models ?? [];

    const [startIndex, setStartIndex] = useState(0);

    // Advance the window over the models array.
    useEffect(() => {
        if (models.length <= visible) return undefined;
        const id = window.setInterval(() => {
            setStartIndex((s) => (s + 1) % models.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [models.length, visible, intervalMs]);

    // produce a continuous list long enough to slide smoothly (duplicate array)
    const extended = [...models, ...models];

    // compute translateY percent for the sliding window based on startIndex
    // each item has fixed height; we'll use px heights to simplify layout
    const itemHeight = 44; // px per row (including gap)
    const containerHeight = visible * itemHeight;

    // Compute offset (we want to show the slice starting at startIndex)
    // We limit the translate to index within 0..models.length-1
    const safeIndex = startIndex % models.length;
    const translateY = -safeIndex * itemHeight;

    return (
        <div
            style={{
                width: 260,
                padding: 10,
                background: "transparent",
                border: "1px solid var(--privue-200,#e6eaf0)",
                borderRadius: 10,
                boxShadow: "0 6px 18px rgba(16,24,40,0.03)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--privue-900,#0f1724)" }}>{data.label}</div>
                <div style={{ fontSize: 12, color: "var(--privue-600,#64748b)" }}>{models.length} total</div>
            </div>

            {/* visible window */}
            <div
                style={{
                    height: containerHeight,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div
                    // sliding list
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        transform: `translateY(${translateY}px)`,
                        transition: "transform 480ms cubic-bezier(.22,.9,.34,1)",
                        // duplicate list to allow continuous cycle without sudden jump
                        willChange: "transform",
                    }}
                >
                    {extended.map((m, idx) => (
                        <div
                            key={`${m.id}-${idx}`}
                            style={{
                                height: itemHeight - 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "6px 8px",
                                borderRadius: 8,
                                background: "var(--privue-50,#fbfdff)",
                                border: "1px solid var(--privue-100,#f1f5f9)",
                            }}
                        >
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
                                    {m.icon === "db" && <Database size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                    {m.icon === "file" && <FileText size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                    {m.icon === "cloud" && <Cloud size={14} className="text-[var(--privue-900,#0f1724)]" />}
                                </div>
                                <div style={{ fontSize: 13, color: "var(--privue-800,#334155)", minWidth: 0 }}>{m.title}</div>
                            </div>

                            {/* small badge showing live/idle — purely decorative */}
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "var(--privue-600,#64748b)",
                                    padding: "4px 6px",
                                    borderRadius: 6,
                                    background: "transparent",
                                    border: "1px solid var(--privue-100,#f1f5f9)",
                                }}
                            >
                                v1.0
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                id="models-left"
                style={{
                    left: -10,
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "3px solid var(--privue-200,#e6eef8)",
                    top: "45%",
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="models-right"
                style={{
                    right: -10,
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "3px solid var(--privue-200,#e6eef8)",
                    top: "45%",
                }}
            />
        </div>
    );
}
const ModelsNode = React.memo(ModelsNodeInner);

/* ---------------- Agent Edge (straight path + bubble midpoint) ---------------- */
const AgentEdge = (props: EdgeProps) => {
    const { id, sourceX, sourceY, targetX, targetY } = props as any;
    const d = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    return (
        <>
            <svg style={{ overflow: "visible", position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
                <path id={id} d={d} stroke="var(--privue-200,#e6eef8)" strokeWidth={2} strokeLinecap="round" fill="none" />
            </svg>

            <div
                style={{
                    position: "absolute",
                    left: midX - 12,
                    top: midY - 12,
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 6px rgba(16,24,40,0.06)",
                    pointerEvents: "auto",
                }}
                title="Processed by LLM agent"
            >
                <Cpu size={12} className="text-white" />
            </div>
        </>
    );
};

/* register node & edge types */
const nodeTypes = { iconNode: IconNode, modelsNode: ModelsNode };
const edgeTypes = { agentEdge: AgentEdge };

/* ---------------- main flow ---------------- */
export default function FlowNodesExample() {
    // Example: 9 models total (we pass the full list to the ModelsNode)
    const fullModels = [
        { id: "m1", title: "Credit Risk", icon: "db" },
        { id: "m2", title: "Climate Risk", icon: "cloud" },
        { id: "m3", title: "Compliance Risk", icon: "file" },
        { id: "m4", title: "Liquidity Risk", icon: "db" },
        { id: "m5", title: "Operational Risk", icon: "file" },
        { id: "m6", title: "Market Risk", icon: "db" },
        { id: "m7", title: "Fraud Detection", icon: "file" },
        { id: "m8", title: "Counterparty Risk", icon: "cloud" },
        { id: "m9", title: "Climate Scenario", icon: "cloud" },
    ];

    const initialNodes: Node[] = useMemo(
        () => [
            // Unstructured moved to top
            { id: "unstructured", type: "iconNode", position: { x: 40, y: 40 }, data: { label: "Unstructured Data", iconId: "img" } },

            // new processing chain for unstructured: OCR -> LLM -> Unified
            { id: "ocr", type: "miniNode", position: { x: 220, y: 40 }, data: { label: "OCR Parsing", subtitle: "extract text & metadata" } },
            { id: "llmparse", type: "miniNode", position: { x: 420, y: 40 }, data: { label: "LLM Parsing", subtitle: "semantic enrichment" } },

            // Unified as an icon node (kept same size)
            { id: "unified", type: "iconNode", position: { x: 640, y: 40 }, data: { label: "Unified Data Platform", iconId: "db" } },

            // other data sources (connect directly to unified)
            { id: "structured", type: "iconNode", position: { x: 40, y: 140 }, data: { label: "Structured Data", iconId: "file" } },
            { id: "privue", type: "iconNode", position: { x: 40, y: 240 }, data: { label: "Privue Data", iconId: "db" } },
            { id: "thirdparty", type: "iconNode", position: { x: 40, y: 340 }, data: { label: "Third Party", iconId: "cloud" } },

            // models bucket (animated)
            {
                id: "models",
                type: "modelsNode",
                position: { x: 880, y: 40 },
                data: {
                    label: "Models",
                    models: fullModels,
                    visible: 3,
                    intervalMs: 2000,
                },
            },
        ],
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const initialEdges: Edge[] = useMemo(
        () => [
            // unstructured -> ocr -> llmparse -> unified (agent bubble on llmparse->unified)
            { id: "e-unstr-ocr", source: "unstructured", target: "ocr", animated: true, style: { stroke: "var(--privue-900,#0f1724)", strokeWidth: 1 }, markerEnd: { type: MarkerType.Arrow } },
            { id: "e-ocr-llm", source: "ocr", target: "llmparse", animated: true, style: { stroke: "var(--privue-900,#0f1724)", strokeWidth: 1 }, markerEnd: { type: MarkerType.Arrow } },
            { id: "e-llm-unified", source: "llmparse", target: "unified", type: "agentEdge", animated: false },

            // other sources -> unified directly
            { id: "e-structured-unified", source: "structured", target: "unified", animated: true, style: { stroke: "var(--privue-900,#0f1724)", strokeWidth: 1 }, markerEnd: { type: MarkerType.Arrow } },
            { id: "e-privue-unified", source: "privue", target: "unified", animated: true, style: { stroke: "var(--privue-900,#0f1724)", strokeWidth: 1 }, markerEnd: { type: MarkerType.Arrow } },
            { id: "e-third-unified", source: "thirdparty", target: "unified", animated: true, style: { stroke: "var(--privue-900,#0f1724)", strokeWidth: 1 }, markerEnd: { type: MarkerType.Arrow } },

            // unified -> models
            { id: "e-unified-models", source: "unified", target: "models", animated: true, style: { stroke: "var(--privue-700,#475569)", strokeWidth: 2 }, markerEnd: { type: MarkerType.Arrow } },
        ],
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: any) => {
            const newEdge: Edge = {
                ...connection,
                animated: true,
                style: { stroke: "var(--privue-700,#475569)", strokeWidth: 1.6 },
                markerEnd: { type: MarkerType.Arrow },
            };
            addEdge(newEdge, edges);
        },
        [edges]
    );

    return (
        <div className="w-full h-[760px] bg-white rounded-lg p-6 relative overflow-hidden">
            {/* dotted light background */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(2,6,23,0.04) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />

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
                panOnScroll
                zoomOnScroll={false}
            >
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
