// IntegrationFlow.tsx
"use client";
import {
    ReactFlow,
    Background,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { BaseEdge, getSmoothStepPath, type EdgeProps } from "reactflow";
const initialNodes = [
    {
        id: "sap",
        position: { x: 50, y: 40 },
        data: { label: "SAP" },
        type: "default",
    },
    {
        id: "salesforce",
        position: { x: 50, y: 140 },
        data: { label: "Salesforce" },
        type: "default",
    },
    {
        id: "dealererp",
        position: { x: 50, y: 240 },
        data: { label: "DealerERP" },
        type: "default",
    },
    {
        id: "our",
        position: { x: 350, y: 140 },
        data: { label: "Our System" },
        type: "default",
    },
];
const initialEdges = [
    { id: "sap-our", type: "animatedDot", source: "sap", target: "our" },
    {
        id: "salesforce-our",
        type: "animatedDot",
        source: "salesforce",
        target: "our",
    },
    {
        id: "dealererp-our",
        type: "animatedDot",
        source: "dealererp",
        target: "our",
    },
];
const edgeTypes = { animatedDot: AnimatedDotEdge };
function InnerFlow() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    return (
        <div className="w-full h-[400px] border rounded-lg bg-white">
            {" "}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edgeTypes={edgeTypes}
                fitView
            >
                {" "}
                <Background gap={14} size={1} color="#e5e7eb" />{" "}
            </ReactFlow>{" "}
        </div>
    );
}
export default function IntegrationFlowWrapper() {
    return (
        <ReactFlowProvider>
            {" "}
            <InnerFlow />{" "}
        </ReactFlowProvider>
    );
}
function AnimatedDotEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
}: EdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    return (
        <g>
            {" "}
            {/* main line */}{" "}
            <BaseEdge
                id={id}
                path={edgePath}
                style={{ stroke: "#34D399", strokeWidth: 2 }}
            />{" "}
            {/* moving dot */}{" "}
            <circle r="5" fill="#34D399">
                {" "}
                <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />{" "}
            </circle>{" "}
        </g>
    );
}
