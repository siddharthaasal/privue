import React, { useCallback, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";


type OrbitNodeData = {
    label?: string;
    centerLogo?: string;
    icons?: React.ReactNode[];
    radius?: number;
    iconSize?: number;
    duration?: number;
    reverse?: boolean;
    speed?: number;
};

function OrbitNodeInner({ data }: { data: OrbitNodeData }) {
    const {
        // label = "",
        centerLogo,
        icons = [],
        radius = 72,
        iconSize = 34,
        duration = 20,
        reverse = false,
        speed = 1,
    } = data;

    // compute a circular container size so the orbit fits comfortably
    const padding = 24;
    const size = radius * 2 + iconSize + padding; // container width/height
    const center = size / 2;

    const wrapperStyle: React.CSSProperties = {
        width: size,
        height: size,
        padding: 12,
        boxSizing: "border-box",
        borderRadius: "50%", // make node circular
        background: "transparent", // very soft blue bg
        border: "1px solid #91a7ff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    };

    const centerBoxSize = Math.min(140, Math.max(72, iconSize + 56)); // clamps size between 72 and 140
    const centerBox: React.CSSProperties = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6,
        pointerEvents: "auto",
        zIndex: 3, // on top of orbit path and icons
        width: centerBoxSize,
        height: centerBoxSize,
        borderRadius: "50%",
        // background: "#fcfcfc",
        // boxShadow: "0 10px 30px rgba(11,27,70,0.10)",
    };

    const logoStyle: React.CSSProperties = {
        width: Math.min(centerBoxSize - 20, 112),
        height: Math.min(centerBoxSize - 20, 112),
        objectFit: "contain",
        borderRadius: 12,
    };

    // refs for each icon wrapper so we can set inline transform without re-rendering
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
    iconRefs.current = [];
    const addRef = useCallback((el: HTMLDivElement | null) => {
        if (el) iconRefs.current.push(el);
    }, []);

    useEffect(() => {
        if (!icons || icons.length === 0) return;
        let rafId: number | null = null;
        const start = performance.now();
        const count = icons.length;
        const baseOffsets = new Array(count).fill(0).map((_, i) => (360 / count) * i);
        const degPerMs = (360 / (duration * 1000)) * (speed ?? 1) * (reverse ? -1 : 1);

        function step(now: number) {
            const elapsed = now - start;
            const baseRotation = elapsed * degPerMs;
            for (let i = 0; i < count; i++) {
                const el = iconRefs.current[i];
                if (!el) continue;
                const angle = baseOffsets[i] + baseRotation;
                // same transform trick, centered on circular container center
                const transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`;
                el.style.position = "absolute";
                el.style.left = `${center}px`;
                el.style.top = `${center}px`;
                el.style.width = `${iconSize}px`;
                el.style.height = `${iconSize}px`;
                el.style.display = "flex";
                el.style.alignItems = "center";
                el.style.justifyContent = "center";
                el.style.transform = transform;
                el.style.pointerEvents = "auto";
                el.style.zIndex = "2"; // above orbit path but below center badge
            }
            rafId = requestAnimationFrame(step);
        }

        rafId = requestAnimationFrame(step);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [icons, radius, iconSize, duration, speed, reverse, center]);

    const dotHandle: React.CSSProperties = {
        left: -6,
        width: 8,
        height: 8,
        borderRadius: 999,
        background: "var(--privue-700,#475569)",
        border: "none",
        top: "45%",
    };

    return (
        <div style={wrapperStyle}>
            {/* Orbit path SVG (visible circle) */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 1 }}
                aria-hidden
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    // stroke="#748ffc"
                    // stroke="#91a7ff"
                    stroke="#D3D3D3"
                    strokeWidth={1.5}
                    opacity={10}
                // strokeDasharray="6 8"
                />
            </svg>

            {/* center badge */}
            <div style={centerBox}>
                {centerLogo ? <img src={centerLogo} alt="logo" style={logoStyle} /> : null}
                {/* <div style={{ fontSize: 11, fontWeight: 700, color: "var(--privue-800,#334155)" }}>{label}</div> */}
            </div>

            {/* orbit children — wrappers mutated by refs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {icons.map((Ic, i) => (
                    <div key={i} ref={addRef as any} aria-hidden>
                        {Ic}
                    </div>
                ))}
            </div>

            <Handle type="target" position={Position.Left} id="left" style={dotHandle} />
            <Handle type="source" position={Position.Right} id="right" style={{ ...dotHandle, left: undefined, right: -6 } as React.CSSProperties} />
        </div>
    );
}

const OrbitNode = React.memo(OrbitNodeInner);
export { OrbitNode }