// components/FlowNodesExample.tsx
import React, { useCallback } from "react";
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
import { FileText, ImageIcon, Database, Cloud } from "lucide-react"; // dummy icons

type DataNodeProps = {
    data: {
        label: string;
        icons?: { id: string; label?: string; src?: string }[];
        compact?: boolean;
    };
};

function DataNodeInner({ data }: DataNodeProps) {
    const { label, icons = [], compact } = data;

    return (
        <div
            className="flex flex-col items-start gap-4 p-3 bg-white/95 text-slate-900 border border-privue-800"
            style={{
                borderTopLeftRadius: 18,
                borderBottomLeftRadius: 18,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                minWidth: compact ? 200 : 260,
            }}
        >
            {/* left content: label */}
            <div className="flex-1 min-w-0">
                <div className="text-sm text-privue-900 font-semibold truncate">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">Data source</div>
            </div>

            {/* icons column */}
            <div className="flex items-center gap-2">
                {(icons.length ? icons : [{ id: "file" }, { id: "img" }, { id: "db" }, { id: "cloud" }]).map((it) => (
                    <div
                        key={it.id}
                        className="w-9 h-9 rounded-md flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm"
                        title={it.label ?? it.id}
                        aria-label={it.label ?? it.id}
                    >
                        {it.id === "file" && <FileText size={16} className="text-slate-700" />}
                        {it.id === "img" && <ImageIcon size={16} className="text-slate-700" />}
                        {it.id === "db" && <Database size={16} className="text-slate-700" />}
                        {it.id === "cloud" && <Cloud size={16} className="text-slate-700" />}
                    </div>
                ))}
            </div>

            {/* connection handles: left target and right source */}
            {/* styled to resemble the circular connectors in your image */}
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
                    border: "3px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
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
                    border: "3px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                }}
            />
        </div>
    );
}

const DataNode = React.memo(DataNodeInner);

// ---------- Models node (bucket style) ----------
type ModelsNodeProps = {
    data: {
        label: string;
        models: { id: string; title: string; icon?: "db" | "file" | "cloud" }[];
    };
};

function ModelsNodeInner({ data }: ModelsNodeProps) {
    const { label, models } = data;

    return (
        <div
            className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-4 w-64"
            style={{ fontFamily: "sans-serif" }}
        >
            <div className="font-semibold text-privue-800 text-base mb-3">{label}</div>

            <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                {models.map((m, i) => (
                    <div
                        key={m.id}
                        className={`flex items-center justify-between px-4 py-3 text-sm ${i < models.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-50 border border-slate-100 shadow-xs">
                                {m.icon === "db" && <Database size={16} className="text-slate-700" />}
                                {m.icon === "file" && <FileText size={16} className="text-slate-700" />}
                                {m.icon === "cloud" && <Cloud size={16} className="text-slate-700" />}
                            </div>
                            <div className="text-slate-700 truncate">{m.title}</div>
                        </div>

                        {/* optional chevron / more control placeholder */}
                        <div className="text-slate-300 text-xs">…</div>
                    </div>
                ))}
            </div>

            {/* handles */}
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
                    border: "3px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
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
                    border: "3px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                }}
            />
        </div>
    );
}

const ModelsNode = React.memo(ModelsNodeInner);

// register both node types
const nodeTypes = { dataNode: DataNode, modelsNode: ModelsNode };

// ---------- Main flow component ----------
export default function FlowNodesExample() {
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
        {
            id: "unified",
            type: "dataNode",
            position: { x: 880, y: 220 },
            data: {
                label: "Unified Data Platform",
                icons: [{ id: "db", label: "Store" }, { id: "cloud", label: "API" }, { id: "img", label: "UI" }, { id: "file", label: "Exports" }],
                compact: false,
            },
        },

        // LLM Models (kept from your earlier version)
        {
            id: "llm-models",
            type: "dataNode",
            position: { x: 560, y: 220 },
            data: {
                label: "LLM Models",
                icons: [
                    { id: "db", label: "Weights" },
                    { id: "file", label: "Configs" },
                    { id: "cloud", label: "Endpoints" },
                ],
                compact: true,
            },
        },

        // --- NEW Models bucket node (Models: Credit Risk, Climate Risk, Compliance Risk)
        {
            id: "models",
            type: "modelsNode",
            position: { x: 1360, y: 220 }, // placed to the right of "unified"
            data: {
                label: "Models",
                models: [
                    { id: "m1", title: "Credit Risk", icon: "db" },
                    { id: "m2", title: "Climate Risk", icon: "cloud" },
                    { id: "m3", title: "Compliance Risk", icon: "file" },
                ],
            },
        },
    ];

    // improved marker/edge styles: rounded caps + arrow marker that inherits color
    const initialEdges: Edge[] = [
        {
            id: "e-pdf-un",
            source: "pdf-ocr",
            target: "unstructured",
            animated: true,
            style: { stroke: "#94A3B8", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
            markerEnd: { type: MarkerType.Arrow }, // uses same color as stroke
        },

        { id: "e-structured-unified", source: "structured", target: "llm-models", animated: true, style: { stroke: "#4c6ef5", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }, markerEnd: { type: MarkerType.Arrow } },
        { id: "e-unstructured-unified", source: "unstructured", target: "llm-models", animated: true, style: { stroke: "#4c6ef5", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }, markerEnd: { type: MarkerType.Arrow } },
        { id: "e-privue-unified", source: "privue", target: "llm-models", animated: true, style: { stroke: "#4c6ef5", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }, markerEnd: { type: MarkerType.Arrow } },
        { id: "e-thirdparty-unified", source: "thirdparty", target: "llm-models", animated: true, style: { stroke: "#4c6ef5", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }, markerEnd: { type: MarkerType.Arrow } },

        // Unified -> LLM Models (green)
        {
            id: "e-unified-llm",
            source: "llm-models",
            target: "unified",
            animated: true,
            style: { stroke: "#10b981", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" },
            markerEnd: { type: MarkerType.Arrow },
        },

        // NEW: Unified -> Models (bucket)
        {
            id: "e-unified-models",
            source: "unified",
            target: "models",
            animated: true,
            style: { stroke: "#4c6ef5", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" },
            markerEnd: { type: MarkerType.Arrow },
        },
    ];

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        addEdge(connection, edges);
    }, [edges]);

    return (
        <div className="w-full h-[760px] bg-slate-50 rounded-lg p-6 relative">
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
