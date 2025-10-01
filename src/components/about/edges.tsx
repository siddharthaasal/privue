import { type Edge } from 'reactflow';

export const initialEdges: Edge[] = [
  {
    id: 'e-unstructured-unified-dashed',
    source: 'unstructured',
    target: 'aiLayerNode',
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
    target: 'aiLayerNode',
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
    target: 'aiLayerNode',
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
    target: 'aiLayerNode',
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
    id: 'ai-layer-node',
    source: 'aiLayerNode',
    target: 'live-chat',
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: 'rgba(100,116,139,0.55)',
      strokeWidth: 2,
      strokeDasharray: '4 6',
      strokeLinecap: 'round',
    },
  },

  // {
  //     id: "e-models-response",
  //     source: "agent",
  //     target: "live-chat",
  //     animated: true,
  //     type: "straight",
  //     style: { stroke: "#4c6ef5", strokeWidth: 2, strokeLinecap: "round" },
  //     markerEnd: { type: MarkerType.ArrowClosed },
  // },
];
