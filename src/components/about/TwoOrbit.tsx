import React, { useCallback, useEffect, useRef } from "react";

type IconNode = React.ReactNode;

type OrbitConfig = {
    radius?: number; // px
    iconSize?: number; // px
    duration?: number; // seconds per full rotation
    reverse?: boolean;
    speed?: number; // multiplier
};

type TwoOrbitProps = {
    centerLogo?: string; // url for center logo
    innerIcons?: IconNode[]; // icons for the inner ring
    outerIcons?: IconNode[]; // icons for the outer ring
    innerConfig?: OrbitConfig;
    outerConfig?: OrbitConfig;
    containerPadding?: number; // px padding around outermost orbit
    className?: string;
    ariaLabel?: string;
};

export default function TwoOrbit({
    centerLogo,
    innerIcons = [],
    outerIcons = [],
    innerConfig = {},
    outerConfig = {},
    containerPadding = 24,
    className = "",
    ariaLabel = "Orbit visualization",
}: TwoOrbitProps) {
    // sensible defaults
    const DEFAULT_RADIUS = 56;
    const DEFAULT_ICON_SIZE = 34;
    const DEFAULT_DURATION = 18;

    const inner = {
        radius: innerConfig.radius ?? Math.round(DEFAULT_RADIUS * 0.9),
        iconSize: innerConfig.iconSize ?? DEFAULT_ICON_SIZE - 6,
        duration: innerConfig.duration ?? Math.round(DEFAULT_DURATION * 0.7),
        reverse: innerConfig.reverse ?? false,
        speed: innerConfig.speed ?? 1,
    };

    const outer = {
        radius: outerConfig.radius ?? Math.round(DEFAULT_RADIUS * 1.8),
        iconSize: outerConfig.iconSize ?? DEFAULT_ICON_SIZE,
        duration: outerConfig.duration ?? DEFAULT_DURATION,
        reverse: outerConfig.reverse ?? true,
        speed: outerConfig.speed ?? 1,
    };

    // container size must fit outer orbit + icon + padding
    const outerRadius = Math.max(inner.radius, outer.radius);
    const maxIconSize = Math.max(inner.iconSize, outer.iconSize);
    const size = outerRadius * 2 + maxIconSize + containerPadding;
    const center = size / 2;

    // refs
    const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
    const outerRefs = useRef<Array<HTMLDivElement | null>>([]);
    innerRefs.current = [];
    outerRefs.current = [];

    const addInnerRef = useCallback((el: HTMLDivElement | null) => {
        if (el) innerRefs.current.push(el);
    }, []);
    const addOuterRef = useCallback((el: HTMLDivElement | null) => {
        if (el) outerRefs.current.push(el);
    }, []);

    useEffect(() => {
        let rafId: number | null = null;
        const start = performance.now();

        function step(now: number) {
            const elapsed = now - start;

            // helper to position icons for given refs and config
            function position(refs: Array<HTMLDivElement | null>, count: number, cfg: typeof inner) {
                if (count === 0) return;
                const baseOffsets = new Array(count).fill(0).map((_, i) => (360 / count) * i);
                const degPerMs =
                    (360 / (cfg.duration * 1000)) * (cfg.speed ?? 1) * (cfg.reverse ? -1 : 1);
                const baseRotation = elapsed * degPerMs;

                for (let i = 0; i < count; i++) {
                    const el = refs[i];
                    if (!el) continue;
                    const angle = baseOffsets[i] + baseRotation;
                    const transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${cfg.radius}px) rotate(${-angle}deg)`;
                    // apply inline styles (fast, avoids re-render)
                    el.style.position = "absolute";
                    el.style.left = `${center}px`;
                    el.style.top = `${center}px`;
                    el.style.width = `${cfg.iconSize}px`;
                    el.style.height = `${cfg.iconSize}px`;
                    el.style.display = "flex";
                    el.style.alignItems = "center";
                    el.style.justifyContent = "center";
                    el.style.transform = transform;
                    el.style.pointerEvents = "auto"; // allow clicks on icons
                }
            }

            position(innerRefs.current, innerIcons.length, inner);
            position(outerRefs.current, outerIcons.length, outer);

            rafId = requestAnimationFrame(step);
        }

        rafId = requestAnimationFrame(step);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [inner, outer, center, innerIcons.length, outerIcons.length]);

    // Tailwind + minimal inline styles where required:
    const wrapperInline = {
        width: `${size}px`,
        height: `${size}px`,
    } as React.CSSProperties;

    const centerBoxSize = Math.min(140, Math.max(72, maxIconSize + 56));
    const centerBoxInline = {
        width: `${centerBoxSize}px`,
        height: `${centerBoxSize}px`,
        left: `calc(50% - ${centerBoxSize / 2}px)`,
        top: `calc(50% - ${centerBoxSize / 2}px)`,
    } as React.CSSProperties;

    const orbitSvgInline = {
        width: `${size}px`,
        height: `${size}px`,
    } as React.CSSProperties;

    const iconWrapper = (node: React.ReactNode, refSetter: (el: HTMLDivElement | null) => void, key: string | number) => (
        <div ref={refSetter} key={key} aria-hidden>
            {node}
        </div>
    );

    return (
        <div
            className={`relative flex items-center justify-center rounded-full overflow-visible ${className}`}
            style={wrapperInline}
            role="img"
            aria-label={ariaLabel}
        >
            {/* defs + visible orbit paths with glow */}
            <svg
                viewBox={`0 0 ${size} ${size}`}
                aria-hidden
                className="absolute left-0 top-0 pointer-events-none z-10"
                style={orbitSvgInline}
            >
                <defs>
                    <filter id="orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* inner — stronger, dashed */}
                <circle
                    cx={center}
                    cy={center}
                    r={inner.radius}
                    fill="none"
                    stroke="#bdbdbd" /* blue-400 @ 28% */
                    strokeWidth={1.5}
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    filter="url(#orbit-glow)"
                />

                {/* outer — softer */}
                <circle
                    cx={center}
                    cy={center}
                    r={outer.radius}
                    fill="none"
                    stroke="#bdbdbd" /* blue-400 @ 14% */
                    strokeWidth={1.5}
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                    filter="url(#orbit-glow)"
                />
            </svg>

            {/* center logo (transparent background; no bg color) */}
            <div
                className="absolute flex items-center justify-center rounded-full z-30"
                style={centerBoxInline}
            >
                {centerLogo ? (
                    <img
                        src={centerLogo}
                        alt="center logo"
                        style={{
                            width: centerBoxSize - 20,
                            height: centerBoxSize - 20,
                            objectFit: "contain",
                            borderRadius: 10,
                        }}
                    />
                ) : null}
            </div>

            {/* icons containers (we only render nodes; positioning handled in RAF) */}
            <div className="absolute inset-0 pointer-events-none z-20">
                {/* inner orbit */}
                {innerIcons.map((node, i) => iconWrapper(node, addInnerRef, `inner-${i}`))}
                {/* outer orbit */}
                {outerIcons.map((node, i) => iconWrapper(node, addOuterRef, `outer-${i}`))}
            </div>
        </div>
    );
}
