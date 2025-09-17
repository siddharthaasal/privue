import React from "react";
import { Handle, Position } from "reactflow";

function DbNodeInner({ data }: { data?: any }) {
    const label = (data && data.label) || "UNIFIED DATA PLATFORM";

    return (
        <div
            style={{
                width: 240,
                // allow the node to be a bit taller to accommodate the label below
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                paddingTop: 6,
            }}
        >
            {/* SVG only — no text inside */}
            <svg
                width="220"
                height="120"
                viewBox="0 0 220 120"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Database"
            >
                <defs>
                    {/* soft drop shadow */}
                    <filter id="db-drop" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                        <feOffset in="blur" dx="0" dy="6" result="offset" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.25" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="offset" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* subtle glossy highlight */}
                    <linearGradient id="gloss" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                    </linearGradient>

                    {/* gradients for left/right/back/front */}
                    <linearGradient id="g-left" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#5b7df0" />
                        <stop offset="1" stopColor="#3b64db" />
                    </linearGradient>
                    <linearGradient id="g-right" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#6d8efc" />
                        <stop offset="1" stopColor="#4c6ef5" />
                    </linearGradient>
                    <linearGradient id="g-front" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#142145" />
                        <stop offset="1" stopColor="#0b1b46" />
                    </linearGradient>

                    {/* rim highlight */}
                    <linearGradient id="rim" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* left/back cylinder (slightly behind) */}
                <g transform="translate(18,6)">
                    <ellipse cx="36" cy="18" rx="36" ry="12" fill="url(#g-left)" opacity="0.95" />
                    <rect x="0" y="18" width="72" height="44" fill="url(#g-left)" />
                    <ellipse cx="36" cy="62" rx="36" ry="12" fill="url(#g-left)" />
                    {/* faint bands */}
                    <rect x="6" y="30" width="60" height="8" fill="#ffffff" opacity="0.08" />
                    <rect x="6" y="44" width="60" height="8" fill="#ffffff" opacity="0.06" />
                </g>

                {/* right/back cylinder (slightly behind) */}
                <g transform="translate(132,6)">
                    <ellipse cx="36" cy="18" rx="36" ry="12" fill="url(#g-right)" opacity="0.95" />
                    <rect x="0" y="18" width="72" height="44" fill="url(#g-right)" />
                    <ellipse cx="36" cy="62" rx="36" ry="12" fill="url(#g-right)" />
                    <rect x="6" y="30" width="60" height="8" fill="#ffffff" opacity="0.08" />
                    <rect x="6" y="44" width="60" height="8" fill="#ffffff" opacity="0.06" />
                </g>

                {/* center/front cylinder (main) */}
                <g transform="translate(56,10)" filter="url(#db-drop)">
                    {/* top rim */}
                    <ellipse cx="48" cy="12" rx="48" ry="14" fill="url(#g-front)" />
                    {/* body */}
                    <rect x="0" y="12" width="96" height="68" fill="url(#g-front)" />
                    {/* bottom rim */}
                    <ellipse cx="48" cy="80" rx="48" ry="14" fill="url(#g-front)" />
                    {/* glossy highlight */}
                    <ellipse cx="48" cy="10" rx="44" ry="10" fill="url(#gloss)" />
                    {/* subtle rim stroke */}
                    <ellipse cx="48" cy="12" rx="48" ry="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    {/* internal white bands for separation */}
                    <rect x="14" y="30" width="68" height="10" rx="4" fill="#ffffff" opacity="0.08" />
                    <rect x="14" y="50" width="68" height="10" rx="4" fill="#ffffff" opacity="0.06" />
                </g>

                {/* subtle circular ground shadow under entire stack */}
                <ellipse cx="110" cy="108" rx="54" ry="8" fill="rgba(6,10,20,0.06)" />
            </svg>

            {/* Label below the svg */}
            <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--privue-900,#0f1724)",
                        letterSpacing: 0.4,
                        background: "transparent",
                        padding: "4px 8px",
                        borderRadius: 6,
                    }}
                >
                    {label}
                </div>
            </div>

            {/* React Flow handles (unchanged positions) */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                style={{
                    left: 23,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="right"
                style={{
                    bottom: 30,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    left: "45%",
                    transform: "translateY(-50%)",
                }}
            />
            <Handle
                type="source"
                position={Position.Top}
                id="top"
                style={{
                    top: 45,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    left: "70%",
                    transform: "translateY(-50%)",
                }}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="top-center"
                style={{
                    top: 45,
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--privue-700,#475569)",
                    border: "none",
                    left: "30%",
                    transform: "translateY(-50%)",
                }}
            />
        </div>
    );
}

const DbNode = React.memo(DbNodeInner);
export { DbNode }