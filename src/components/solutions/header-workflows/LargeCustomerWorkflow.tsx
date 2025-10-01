// FlowNodesExample.tsx
import React, { useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Controls,
  // addEdge,
  useNodesState,
  useEdgesState,
  // MarkerType,
  type ReactFlowInstance,
  MarkerType,
  type Edge,
  type Node,
  // FitViewParams,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AnimatedChatNode } from '@/components/workflow-animation/ChatNode';
import { BoxNode } from '@/components/workflow-animation/BoxNode';
import { DataNode } from '@/components/workflow-animation/DataNode';
import { DataNodeLR } from '@/components/workflow-animation/DataNodeLR';
import { SecDataNode } from '@/components/workflow-animation/SecDataNode';
import { ResponseNode } from '@/components/workflow-animation/ResponseNode';
import { ModelsNode } from '@/components/workflow-animation/ModelsNode';
import { DbNode } from '@/components/workflow-animation/DbNode';
import { OrbitNode } from '@/components/workflow-animation/OrbitNode';
import { AgentNode } from '@/components/workflow-animation/AgentNode';
import { ToolNode } from '@/components/workflow-animation/ToolNode';
import { ToolNodeLeft } from '@/components/workflow-animation/ToolNodeLeft';
import {
  ScanText,
  Bot,
  DatabaseZap,
  BanknoteArrowUp,
  Scale,
  Newspaper,
  FileChartPie,
  FolderGit2,
} from 'lucide-react';

const initialNodes: Node[] = [
  // {
  //     id: "group-1",
  //     type: "boxNode",
  //     data: { label: "Internal Company Data" },
  //     position: { x: 25, y: 20 },
  // },
  {
    id: 'unstructured',
    type: 'dataNode',
    position: { x: 80, y: 40 },
    data: {
      label: 'KYC Doc Submitted',
      // icon: FaRegFilePdf
      icon: '/icons/workflow/pdf.png',
    },
    // parentNode: "group-1",
    // extent: "parent",
  },
  {
    id: 'structured',
    type: 'dataNode',
    position: { x: 80, y: 180 },
    data: {
      label: 'Government Portals',
      // icon: PiMicrosoftExcelLogo
      // icon: "/icons/workflow/sheets.png"
      icon: FolderGit2,
    },
    // parentNode: "group-1",
    // extent: "parent",
  },
  {
    id: 'ocr',
    type: 'dataNodeLR',
    position: { x: 200, y: 40 },
    data: {
      label: 'OCR',
      icon: ScanText,
    },
  },

  {
    id: 'llm',
    type: 'dataNodeLR',
    position: { x: 320, y: 40 },
    data: {
      label: 'LLM Parsing',
      icon: Bot,
      // icon: "/icons/robot-2.png"
    },
  },

  {
    id: 'privue',
    type: 'dataNode',
    position: { x: 80, y: 320 },
    data: {
      label: 'Proprietary Data',
      // icon: BsDatabaseCheck
      // icon: "/icons/postgre.png"
      icon: '/icons/workflow/aws.png',
    },
  },
  {
    id: 'thirdparty',
    type: 'dataNode',
    position: { x: 80, y: 460 },
    data: {
      label: 'Third Party Data',
      icon: DatabaseZap,
      // icon: "/icons/database-2.png"
    },
  },

  // DbNode (static SVG) — REPLACES the previous "unified" data node
  {
    id: 'unified',
    type: 'dbNode',
    position: { x: 350, y: 180 },
    data: { label: 'Unified Data Platform' },
  },

  {
    id: 'ai-agent',
    type: 'secDataNode',
    position: { x: 428, y: 443 },
    data: {
      label: 'AI Agent',
      icon: Bot,
      // icon: "/icons/gpt.png"
    },
  },

  {
    id: 'agent',
    type: 'agentNode',
    position: { x: 700, y: 100 }, // tune Y so children sit below
    data: {
      title: 'Models & Engines',
    },
  },

  {
    id: 'tool-a',
    type: 'toolNodeLeft',
    position: { x: 550, y: 420 },
    data: {
      title: 'Credit Risk',
      icon: BanknoteArrowUp,
      // icon: "/icons/credit-risk-2.png"
    },
  },
  {
    id: 'tool-b',
    type: 'toolNode',
    position: { x: 700, y: 420 },
    data: {
      title: 'Financial Stability',
      icon: FileChartPie,
      // icon: "/icons/compliance-risk.png"
    },
  },
  {
    id: 'tool-c',
    type: 'toolNode',
    position: { x: 850, y: 420 },
    data: {
      title: 'Compliance and Legal',
      icon: Scale,
      // icon: "/icons/climate-risk.png"
    },
  },
  {
    id: 'tool-d',
    type: 'toolNode',
    position: { x: 1000, y: 420 },
    data: {
      title: 'Adverse News',
      icon: Newspaper,
      // icon: "/icons/financial-engine.png"
    },
  },
  {
    id: 'live-chat',
    type: 'chatNode',
    position: { x: 1150, y: 50 },
    data: {
      outgoing: 'Hey, is it possible to expense office rent through my startup?',
      incoming: 'Yes — you can expense rent as a business expense if it meets local rules.',
      timestamp: new Date().toISOString(), // or a specific ISO string like "2025-09-16T10:55:00.000Z"
      status: 'delivered',
      timings: {
        showOutgoing: 180, // show outgoing after 180ms
        moveUpAfter: 1000, // move outgoing up after 800ms
        showReplyAfter: 2500, // show reply after 1700ms
        loopPause: 1200, // wait 1200ms before restarting the loop
      },
      maxWidth: 620, // px
      name: "Privue's AI",
    },
  },
];
const initialEdges: Edge[] = [
  {
    id: 'e-unstructured-unified-dashed',
    source: 'unstructured',
    target: 'ocr',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-unstructured-ocr',
    source: 'ocr',
    target: 'llm',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-unstructured-llm',
    source: 'llm',
    target: 'unified',
    targetHandle: 'top-center',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-unstructured-unified-dashed',
    source: 'structured',
    target: 'unified',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-privue-unified-dashed',
    source: 'privue',
    target: 'unified',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-third-unified-dashed',
    source: 'thirdparty',
    target: 'unified',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },

  {
    id: 'e-unified-llm-blue',
    source: 'unified',
    target: 'all-llm',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'ai-agent-target',
    source: 'ai-agent',
    target: 'tool-a',
    targetHandle: 'tool-left',
    animated: true,
    type: 'straight',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'ai-agent-source',
    source: 'unified',
    target: 'ai-agent',
    targetHandle: 'tool-left',
    animated: true,
    type: 'straight',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'ai-agent-tool-a',
    source: 'ai-agent',
    target: 'tool-a',
    targetHandle: 'tool-left',
    animated: true,
    type: 'straight',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  {
    id: 'e-unified-models',
    source: 'unified',
    sourceHandle: 'top',
    target: 'agent',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-agent-tool-a',
    source: 'agent',
    sourceHandle: 'agent-bottom-center',
    target: 'tool-a',
    animated: true,
    type: 'default',
    style: { stroke: '#4c6ef5', strokeWidth: 1.8, strokeDasharray: '6 6', strokeLinecap: 'round' },
  },
  {
    id: 'e-agent-tool-b',
    source: 'agent',
    sourceHandle: 'agent-bottom-center',
    target: 'tool-b',
    animated: true,
    type: 'default',
    style: { stroke: '#4c6ef5', strokeWidth: 1.8, strokeDasharray: '6 6', strokeLinecap: 'round' },
  },
  {
    id: 'e-agent-tool-c',
    source: 'agent',
    sourceHandle: 'agent-bottom-center',
    target: 'tool-c',
    animated: true,
    type: 'default',
    style: { stroke: '#4c6ef5', strokeWidth: 1.8, strokeDasharray: '6 6', strokeLinecap: 'round' },
  },
  {
    id: 'e-agent-tool-d',
    source: 'agent',
    sourceHandle: 'agent-bottom-center',
    target: 'tool-d',
    animated: true,
    type: 'default',
    style: { stroke: '#4c6ef5', strokeWidth: 1.8, strokeDasharray: '6 6', strokeLinecap: 'round' },
  },
  {
    id: 'e-agent-llm-a',
    source: 'all-llm',
    sourceHandle: 'agent-top-center',
    targetHandle: 'tool-bottom',
    target: 'llm-a',
    animated: true,
    type: 'default',
    style: { stroke: '#4c6ef5', strokeWidth: 1.8, strokeDasharray: '6 6', strokeLinecap: 'round' },
  },
  {
    id: 'e-agent-llm-b',
    source: 'all-llm',
    sourceHandle: 'agent-top-center',
    targetHandle: 'tool-bottom',
    target: 'llm-b',
    animated: true,
    type: 'default',
    style: {
      stroke: 'rgba(148,163,184,0.55)',
      strokeWidth: 1.8,
      strokeDasharray: '6 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-agent-llm-c',
    source: 'all-llm',
    sourceHandle: 'agent-top-center',
    targetHandle: 'tool-bottom',
    target: 'llm-c',
    animated: true,
    type: 'default',
    style: {
      stroke: 'rgba(148,163,184,0.55)',
      strokeWidth: 1.8,
      strokeDasharray: '6 6',
      strokeLinecap: 'round',
    },
  },
  {
    id: 'e-agent-llm-d',
    source: 'all-llm',
    sourceHandle: 'agent-top-center',
    targetHandle: 'tool-bottom',
    target: 'llm-d',
    animated: true,
    type: 'default',
    style: {
      stroke: 'rgba(148,163,184,0.55)',
      strokeWidth: 1.8,
      strokeDasharray: '6 6',
      strokeLinecap: 'round',
    },
  },

  // optional faint connector
  {
    id: 'e-unified-llm-neutral',
    source: 'unified',
    target: 'llm-models',
    animated: false,
    type: 'smoothstep',
    style: { stroke: 'rgba(71,85,105,0.12)', strokeWidth: 2 },
  },
  {
    id: 'e-models-response',
    source: 'agent',
    target: 'live-chat',
    animated: true,
    type: 'straight',
    style: { stroke: '#4c6ef5', strokeWidth: 2, strokeLinecap: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-models-response',
    source: 'llm-models',
    target: 'response',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#16a34a', strokeWidth: 2, strokeLinecap: 'round' },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // {
  //     id: "e-models-response",
  //     source: "llm-models",
  //     target: "response",
  //     animated: true,
  //     type: "smoothstep",
  //     style: { stroke: "#16a34a", strokeWidth: 2, strokeLinecap: "round" },
  //     markerEnd: { type: MarkerType.ArrowClosed },
  // }
];

const nodeTypes = {
  boxNode: BoxNode,
  dataNode: DataNode,
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

export default function LargeCustomerWorkflow({ className, style, fitPadding = 0.06 }: Props) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rfRef = useRef<ReactFlowInstance | null>(null);

  // We don't want new connections while in Hero - keep onConnect a no-op or use addEdge + setEdges if you want to support it.
  const onConnect = useCallback(() => {
    // no-op in hero
    // if you re-enable, use the setter returned by useEdgesState to update edges.
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

    // if the container itself can scroll vertically, let it handle the wheel (don't forward)
    const canScroll = el.scrollHeight > el.clientHeight;
    if (canScroll) return;

    (e.nativeEvent as any).stopImmediatePropagation?.();
    window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onWheel={handleWheel}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 200,
        boxSizing: 'border-box',
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
        // style to fully fill the parent container
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        {/* Layered background: subtle grid + accent dots */}

        <Controls showInteractive={false} showZoom={false} showFitView={false} />
      </ReactFlow>
    </div>
  );
}
