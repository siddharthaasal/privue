import React from 'react';
import { Handle, Position } from 'reactflow';

function AiLayerNodeInner({ data }: { data?: any }) {
  const label = (data && data.label) || 'AI-Powered Intelligence Engine';

  return (
    <div className="relative box-border flex h-[200px] w-[260px] items-center justify-center">
      {/* SVG module */}
      <svg
        width="240"
        height="160"
        viewBox="0 0 240 160"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="AI Engine"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offset" />
            <feMerge>
              <feMergeNode in="offset" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* gradient background */}
          <linearGradient id="ai-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f2b5c" />
            <stop offset="100%" stopColor="#162c4a" />
          </linearGradient>

          <linearGradient id="ai-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#40c9ff" />
            <stop offset="100%" stopColor="#4285ec" />
          </linearGradient>
        </defs>

        {/* Main rounded rectangle */}
        <rect
          x="10"
          y="10"
          width="220"
          height="140"
          rx="16"
          fill="url(#ai-bg)"
          stroke="url(#ai-stroke)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Internal icons / nodes */}
        {/* Predictive Models (hexagon) */}
        <polygon
          points="70,50 85,40 100,50 100,70 85,80 70,70"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="85" y="65" fontSize="8" textAnchor="middle" fill="#93c5fd">
          Models
        </text>

        {/* Risk Scoring (diamond) */}
        <polygon
          points="150,45 170,60 150,75 130,60"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        />
        <text x="150" y="62" fontSize="8" textAnchor="middle" fill="#86efac">
          Risk
        </text>

        {/* Entity Mapping (circle) */}
        <circle cx="95" cy="110" r="15" stroke="#facc15" strokeWidth="2" fill="none" />
        <text x="95" y="114" fontSize="8" textAnchor="middle" fill="#fde68a">
          Map
        </text>

        {/* Compliance Parsing (doc rectangle) */}
        <rect
          x="140"
          y="95"
          width="24"
          height="28"
          rx="4"
          stroke="#f472b6"
          strokeWidth="2"
          fill="none"
        />
        <text x="152" y="112" fontSize="7" textAnchor="middle" fill="#f9a8d4">
          Parse
        </text>

        {/* connecting lines */}
        <line x1="100" y1="55" x2="130" y2="60" stroke="#60a5fa" strokeWidth="1.5" />
        <line x1="95" y1="95" x2="95" y2="80" stroke="#eab308" strokeWidth="1.5" />
        <line x1="150" y1="75" x2="150" y2="95" stroke="#22c55e" strokeWidth="1.5" />
      </svg>

      {/* Label below */}
      <div className="pointer-events-none absolute right-0 bottom-2 left-0 flex justify-center">
        <div className="rounded-md bg-gradient-to-r from-indigo-600/70 to-blue-700/70 px-2 py-1 text-[15px] font-semibold tracking-wide text-slate-100 backdrop-blur-sm">
          {label}
        </div>
      </div>

      {/* React Flow handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="top-1/2 !h-2 !w-2 -translate-y-1/2 rounded-full border-0 !bg-slate-600"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="top-1/2 !h-2 !w-2 -translate-y-1/2 rounded-full border-0 !bg-slate-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="left-1/2 !h-2 !w-2 -translate-x-1/2 rounded-full border-0 !bg-slate-600"
      />
    </div>
  );
}

const AiLayerNode = React.memo(AiLayerNodeInner);
export { AiLayerNode };
