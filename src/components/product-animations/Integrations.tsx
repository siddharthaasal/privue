// FlowNodesExample.tsx
import React, { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    Background,
    BackgroundVariant,
    type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { AnimatedChatNode } from "@/components/workflow-animation/ChatNode";
import { BoxNode } from "@/components/workflow-animation/BoxNode";
import { DataNode } from "@/components/workflow-animation/DataNode";
import { DataNodeLR } from "@/components/workflow-animation/DataNodeLR";
import { SecDataNode } from "@/components/workflow-animation/SecDataNode";
import { ResponseNode } from "@/components/workflow-animation/ResponseNode";
import { ModelsNode } from "@/components/workflow-animation/ModelsNode";
import { DbNode } from "@/components/workflow-animation/DbNode";
import { OrbitNode } from "@/components/workflow-animation/OrbitNode";
import { AgentNode } from "@/components/workflow-animation/AgentNode";
import { ToolNode } from "@/components/workflow-animation/ToolNode";
import { ToolNodeLeft } from "@/components/workflow-animation/ToolNodeLeft";
import { DataNodeRec } from "../workflow-animation/DataNodeRec";

// keep nodeTypes mapping as you had it
const nodeTypes = {
    boxNode: BoxNode,
    dataNode: DataNode,
    dataNodeRec: DataNodeRec,
    dataNodeLR: DataNodeLR,
    secDataNode: SecDataNode,
    modelsNode: ModelsNode,
    orbitNode: OrbitNode,
    dbNode: DbNode,
    responseNode: ResponseNode,
    agentNode: AgentNode,
    toolNode: ToolNode,
    toolNodeLeft: ToolNodeLeft,
    chatNode: AnimatedChatNode,
};

type Props = {
    className?: string;
    style?: React.CSSProperties;
    fitPadding?: number; // padding used for fitView (0..1)
};

export default function FlowNodesExample({ className, style, fitPadding = 0.06 }: Props) {
    // custom initial nodes: 3 DataNodes (SAP, Salesforce, ERP) connected to a single Privue node (boxNode)
    const initialNodes = [
        {
            id: "data-sap",
            type: "dataNode",
            position: { x: 40, y: 40 },
            data: { label: "SAP", icon: "/integration-logos/SAP-Logo.png" },
            selectable: false,
            draggable: false,
        },
        {
            id: "data-salesforce",
            type: "dataNode",
            position: { x: 40, y: 160 },
            data: { label: "Salesforce", icon: "/integration-logos/salesforce.png" },
            selectable: false,
            draggable: false,
        },
        {
            id: "data-erp",
            type: "dataNode",
            position: { x: 40, y: 280 },
            data: { label: "ERP", icon: "/integration-logos/erp-2.png" },
            selectable: false,
            draggable: false,
        },
        {
            id: "privue",
            type: "dataNodeRec",
            position: { x: 340, y: 160 },
            data: { label: "Privue", icon: "/privue-logo.png" },
            selectable: false,
            draggable: false,
        },
    ];

    const initialEdges = [
        {
            id: "e-sap-privue",
            source: "data-sap",
            target: "privue",
            animated: true,
            style: { strokeWidth: 1.3 },
            markerEnd: { type: "arrow" as any },
        },
        {
            id: "e-salesforce-privue",
            source: "data-salesforce",
            target: "privue",
            animated: true,
            style: { strokeWidth: 1.3 },
            markerEnd: { type: "arrow" as any },
        },
        {
            id: "e-erp-privue",
            source: "data-erp",
            target: "privue",
            animated: true,
            style: { strokeWidth: 1.3 },
            markerEnd: { type: "arrow" as any },
        },
    ];

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rfRef = useRef<ReactFlowInstance | null>(null);

    // We don't want new connections while in Hero - keep onConnect a no-op
    const onConnect = useCallback(() => {
        /* no-op */
    }, []);

    // Fit view when the flow instance is ready and whenever the container resizes
    useEffect(() => {
        if (!containerRef.current) return;
        const ro = new ResizeObserver(() => {
            if (rfRef.current) {
                rfRef.current.fitView({ padding: fitPadding });
            }
        });
        ro.observe(containerRef.current);

        return () => ro.disconnect();
    }, [fitPadding]);

    // helper passed to ReactFlow onInit
    const handleInit = (instance: ReactFlowInstance) => {
        rfRef.current = instance;
        // call fitView once on init
        setTimeout(() => instance.fitView({ padding: fitPadding }), 0);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey) return;

        const el = containerRef.current;
        if (!el) return;

        const canScroll = el.scrollHeight > el.clientHeight;
        if (canScroll) return;

        (e.nativeEvent as any).stopImmediatePropagation?.();
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
        e.preventDefault();
    };

    return (
        <div
            ref={containerRef}
            className={className}
            onWheel={handleWheel}
            style={{
                width: "100%",
                height: "100%",
                minHeight: 200,
                boxSizing: "border-box",
                ...style,
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onInit={handleInit}
                fitView={false} // we call fitView manually to control padding
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                style={{ width: "100%", height: "100%", background: "transparent" }}
            >
                {/* <Background
                    id="grid-lines"
                    variant={BackgroundVariant.Lines}
                    gap={18}
                    color="rgba(15,23,36,0.04)"
                    lineWidth={1}
                /> */}
                <Background
                    id="dots"
                    variant={BackgroundVariant.Dots}
                    gap={[60, 60]}
                    size={1}
                    color="rgba(71,85,105,0.02)"
                />

                <Controls showInteractive={false} showZoom={false} showFitView={false} />
            </ReactFlow>
        </div>
    );
}
