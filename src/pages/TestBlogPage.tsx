// FlowNodesExample.tsx (fixed)
import React, { useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AnimatedChatNode } from '@/components/workflow-animation/ChatNode';
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

import { initialEdges } from '@/components/workflow-animation/edges';
import { initialNodes } from '@/components/workflow-animation/nodes';

const nodeTypes = {
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

export default function FlowNodesExample({ className, style, fitPadding = 0.06 }: Props) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rfRef = useRef<ReactFlowInstance | null>(null);

  const onConnect = useCallback(() => {
    // no-op for hero/preview mode
  }, []);

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

  const handleInit = (instance: ReactFlowInstance) => {
    rfRef.current = instance;
    // call fitView after a tick — container must be visible for this to compute properly
    setTimeout(() => instance.fitView({ padding: fitPadding }), 0);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        // Use a visible default height. If parent provides height (preferred), set style={{ height: "100%" }} from parent.
        // If you want full viewport, use height: "100vh" here (or className="h-screen").
        height: style?.height ?? '58rem',
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
        fitView={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Background
          id="grid-lines"
          variant={BackgroundVariant.Lines}
          gap={18}
          color="rgba(15,23,36,0.04)"
          lineWidth={1}
        />
        <Background
          id="dots"
          variant={BackgroundVariant.Dots}
          gap={[60, 60]}
          size={1}
          color="rgba(71,85,105,0.02)"
        />

        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
