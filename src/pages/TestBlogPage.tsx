// PipelineShowcase.tsx
import React, { useEffect, useCallback } from "react";
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    Handle,
    type Node,
    type Edge,
    Position,
} from "reactflow";
import { motion } from "framer-motion";
import "reactflow/dist/style.css";
import "./pipeline-showcase.css"; // small CSS for edges + batch overlay

type DataNodeData = { label?: string; animate?: boolean };
type BatchNodeData = { highlight?: boolean };
type AnalysisData = { animate?: boolean };

const DataSourceNode: React.FC<{ id: string; data: DataNodeData }> = ({ data }) => {
    // animate via framer if data.animate === true
    return (
        <div className="pointer-events-none flex items-center">
            <motion.div
                className="w-20 h-20 rounded-full border-2 border-slate-900 bg-white shadow-md flex items-center justify-center"
                animate={data?.animate ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.85, repeat: data?.animate ? Infinity : 0 }}
            >
                <div className="text-sm font-semibold text-slate-900 text-center whitespace-pre-line">
                    {data?.label ?? "Data\nSource"}
                </div>
            </motion.div>
            <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
        </div>
    );
};

const BatchNode: React.FC<{ data: BatchNodeData }> = ({ data }) => {
    return (
        <div
            className={`w-36 h-24 rounded-md bg-white border shadow-sm flex items-center justify-center transform-gpu
        ${data?.highlight ? "scale-[1.03] shadow-[0_12px_30px_rgba(6,182,212,0.12)] border-[rgba(6,182,212,0.18)]" : ""}`}
        >
            <div className="font-semibold text-sm text-slate-700">Batch</div>
            <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
            <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
        </div>
    );
};

const AnalysisNode: React.FC<{ data: AnalysisData }> = ({ data }) => (
    <div className={`w-40 h-28 rounded-xl bg-white border shadow-md flex items-center justify-center ${data?.animate ? "scale-[1.03] shadow-[0_18px_40px_rgba(6,182,212,0.14)]" : ""}`}>
        <div className="font-bold text-sm text-slate-900">Analysis</div>
        <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
);

const nodeTypes = {
    dataSource: DataSourceNode,
    batch: BatchNode,
    analysis: AnalysisNode,
};

const initialNodes: Node[] = [
    { id: "ds1", type: "dataSource", data: { label: "Data\nSource", animate: true }, position: { x: 10, y: 20 }, style: { width: 110, height: 80 } },
    { id: "ds2", type: "dataSource", data: { label: "Data\nSource", animate: false }, position: { x: 10, y: 120 }, style: { width: 110, height: 80 } },
    { id: "ds3", type: "dataSource", data: { label: "Data\nSource", animate: false }, position: { x: 10, y: 220 }, style: { width: 110, height: 80 } },
    { id: "ds4", type: "dataSource", data: { label: "Data\nSource", animate: false }, position: { x: 10, y: 320 }, style: { width: 110, height: 80 } },

    { id: "batch1", type: "batch", data: { highlight: false }, position: { x: 220, y: 40 }, style: { width: 140, height: 90 } },
    { id: "batch2", type: "batch", data: { highlight: false }, position: { x: 380, y: 40 }, style: { width: 140, height: 90 } },
    { id: "batch3", type: "batch", data: { highlight: false }, position: { x: 540, y: 40 }, style: { width: 140, height: 90 } },

    { id: "analysis", type: "analysis", data: { animate: false }, position: { x: 820, y: 140 }, style: { width: 160, height: 110 } },
];

const initialEdges: Edge[] = [
    { id: "e-ds1-b1", source: "ds1", target: "batch1", className: "edge-base" },
    { id: "e-ds2-b1", source: "ds2", target: "batch1", className: "edge-base" },
    { id: "e-ds3-b1", source: "ds3", target: "batch1", className: "edge-base" },
    { id: "e-ds4-b1", source: "ds4", target: "batch1", className: "edge-base" },

    { id: "e-b1-b2", source: "batch1", target: "batch2", className: "edge-base" },
    { id: "e-b2-b3", source: "batch2", target: "batch3", className: "edge-base" },

    { id: "e-b3-analysis", source: "batch3", target: "analysis", className: "edge-base" },

    // a "query" curved edge from analysis back to batch1; React Flow will route it
    { id: "e-query", source: "analysis", target: "batch1", className: "edge-query" },
];

export default function PipelineShowcase(): any {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const setNodePatch = useCallback((id: string, patch: any) => {
        setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n)));
    }, [setNodes]);

    const setEdgeClass = useCallback((id: string, cls: string) => {
        setEdges((eds) => eds.map((e) => (e.id === id ? { ...e, className: cls } : e)));
    }, [setEdges]);

    useEffect(() => {
        // timeline sequence; tweak timings as desired
        const timeline = [
            { at: 200, action: () => ["ds1", "ds2", "ds3", "ds4"].forEach(id => setNodePatch(id, { animate: true })) },
            { at: 900, action: () => ["ds1", "ds2", "ds3", "ds4"].forEach(id => setNodePatch(id, { animate: false })) },

            { at: 950, action: () => setEdgeClass("e-ds1-b1", "edge-base edge-animate") },
            { at: 1000, action: () => setEdgeClass("e-ds2-b1", "edge-base edge-animate") },
            { at: 1050, action: () => setEdgeClass("e-ds3-b1", "edge-base edge-animate") },
            { at: 1100, action: () => setEdgeClass("e-ds4-b1", "edge-base edge-animate") },
            { at: 1700, action: () => ["e-ds1-b1", "e-ds2-b1", "e-ds3-b1", "e-ds4-b1"].forEach(id => setEdgeClass(id, "edge-base")) },

            { at: 1800, action: () => setNodePatch("batch1", { highlight: true }) },
            { at: 2500, action: () => setNodePatch("batch1", { highlight: false }) },
            { at: 2600, action: () => setEdgeClass("e-b1-b2", "edge-base edge-animate") },
            { at: 3400, action: () => setEdgeClass("e-b1-b2", "edge-base") },
            { at: 3500, action: () => setNodePatch("batch2", { highlight: true }) },
            { at: 4300, action: () => setNodePatch("batch2", { highlight: false }) },

            { at: 4400, action: () => setEdgeClass("e-b2-b3", "edge-base edge-animate") },
            { at: 5200, action: () => setEdgeClass("e-b2-b3", "edge-base") },
            { at: 5300, action: () => setNodePatch("batch3", { highlight: true }) },
            { at: 6000, action: () => setNodePatch("batch3", { highlight: false }) },

            { at: 6100, action: () => setEdgeClass("e-b3-analysis", "edge-base edge-animate") },
            { at: 7000, action: () => { setEdgeClass("e-b3-analysis", "edge-base"); setNodePatch("analysis", { animate: true }); } },
            { at: 7800, action: () => setNodePatch("analysis", { animate: false }) },

            { at: 8000, action: () => setEdgeClass("e-query", "edge-query edge-animate") },
            { at: 9200, action: () => setEdgeClass("e-query", "edge-query") },
        ];

        const timers = timeline.map((t) => window.setTimeout(t.action, t.at));
        const loop = window.setInterval(() => timeline.forEach((t) => window.setTimeout(t.action, t.at)), 10000);
        return () => { timers.forEach(clearTimeout); clearInterval(loop); };
    }, [setNodePatch, setEdgeClass]);

    return (
        <div className="relative w-full h-[520px] bg-gradient-to-b from-white to-slate-50">
            {/* Overlay dashed box label (positioned to sit behind batch nodes) */}
            <div className="absolute left-[200px] top-[10px] w-[560px] h-[220px] border-2 border-dashed border-slate-300 rounded pointer-events-none flex items-start justify-center">
                <div className="bg-white px-3 py-0.5 -translate-y-4 rounded text-sm font-semibold border border-slate-100">Batch Processing</div>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes as any}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnScroll={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                attributionPosition="bottom-left"
                minZoom={0.5}
                maxZoom={1.2}
            >
                <Background gap={24} color="#f1f5f9" />
            </ReactFlow>
        </div>
    );
}