import { useCallback } from "react";
import ReactFlow, {
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
    type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { AnimatedChatNode } from "@/components/workflow-animation/ChatNode";
import { DataNode } from "@/components/workflow-animation/DataNode";
import { ResponseNode } from "@/components/workflow-animation/ResponseNode";
import { ModelsNode } from "@/components/workflow-animation/ModelsNode";
import { DbNode } from "@/components/workflow-animation/DbNode";
import { OrbitNode } from "@/components/workflow-animation/OrbitNode";
import { AgentNode } from "@/components/workflow-animation/AgentNode";
import { ToolNode } from "@/components/workflow-animation/ToolNode";

import { initialEdges } from "@/components/workflow-animation/edges";
import { initialNodes } from "@/components/workflow-animation/nodes";
const nodeTypes = { dataNode: DataNode, modelsNode: ModelsNode, orbitNode: OrbitNode, dbNode: DbNode, responseNode: ResponseNode, agentNode: AgentNode, toolNode: ToolNode, chatNode: AnimatedChatNode };


export default function FlowNodesExample() {

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
        <div className="w-full h-screen bg-slate-100 rounded-lg p-6 relative">
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
