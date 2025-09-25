// AnimatedChatNode.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { CheckCheck } from "lucide-react";

type Timings = {
    showOutgoing?: number;
    moveUpAfter?: number;
    showReplyAfter?: number;
    loopPause?: number;
};

export function AnimatedChatNodeInner({
    data,
}: {
    data?: {
        outgoing?: string;
        incoming?: string;
        timestamp?: string;
        status?: "sending" | "sent" | "delivered" | "read";
        timings?: Timings;
        maxWidth?: number;
        avatarSrc?: string;
        name?: string;
    };
}) {
    const outgoing = data?.outgoing ?? "Hey, is it possible to expense office rent through my startup?";
    const incoming = data?.incoming ?? "Yes — you can expense rent as a business expense if it meets local rules.";
    const timestamp = data?.timestamp ?? new Date().toISOString();
    const timings: Required<Timings> = {
        showOutgoing: data?.timings?.showOutgoing ?? 160,
        moveUpAfter: data?.timings?.moveUpAfter ?? 700,
        showReplyAfter: data?.timings?.showReplyAfter ?? 1600,
        loopPause: data?.timings?.loopPause ?? 1000,
    };
    const MAX_W = data?.maxWidth ?? 480;
    // const avatarSrc = data?.avatarSrc ?? "";
    // const name = data?.name ?? "Andy from Finta";

    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // phases: 0 hidden, 1 outgoing visible, 2 typing, 3 reply visible, 4 pause
    const [phase, setPhase] = useState<number>(reduceMotion ? 3 : 0);
    // const [containerHeight, setContainerHeight] = useState<number | "auto">("auto");

    const contRef = useRef<HTMLDivElement | null>(null);
    const outRef = useRef<HTMLDivElement | null>(null);
    const incRef = useRef<HTMLDivElement | null>(null);
    const loopRef = useRef<number | null>(null);

    // measured incoming height (used to compute outgoing anchor)
    const [incomingHeight, setIncomingHeight] = useState<number>(0);

    // Layout constants
    const TYPING_BOTTOM = 48; // where typing indicator is anchored from bottom
    const TYPING_HEIGHT = 36; // approximate height of typing indicator
    const OUTGOING_GAP_WHILE_TYPING = 12; // gap between outgoing and typing indicator
    const INCOMING_BOTTOM = 50; // incoming bubble anchor from bottom
    const GAP_BETWEEN_BUBBLES = 14; // desired gap when outgoing sits above incoming
    const outgoingDefaultBottom = 68; // default resting bottom when no typing/incoming

    useEffect(() => {
        if (reduceMotion) {
            setPhase(3);
            return;
        }

        if (loopRef.current) {
            clearTimeout(loopRef.current);
            loopRef.current = null;
        }

        const runSequence = () => {
            setPhase(0);
            const t1 = window.setTimeout(() => setPhase(1), timings.showOutgoing);
            const t2 = window.setTimeout(() => setPhase(2), timings.moveUpAfter);
            const t3 = window.setTimeout(() => setPhase(3), timings.showReplyAfter);
            const t4 = window.setTimeout(() => {
                setPhase(4);
                loopRef.current = window.setTimeout(runSequence, timings.loopPause);
            }, timings.showReplyAfter + 500);

            loopRef.current = t4;
            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
            };
        };

        const cleanup = runSequence();
        return () => {
            if (loopRef.current) {
                clearTimeout(loopRef.current);
                loopRef.current = null;
            }
            if (cleanup) cleanup();
        };
    }, [reduceMotion, timings.showOutgoing, timings.moveUpAfter, timings.showReplyAfter, timings.loopPause]);

    // measure incoming height when incoming is visible or content changes
    useLayoutEffect(() => {
        const incEl = incRef.current;
        if (!incEl) {
            setIncomingHeight(0);
            return;
        }
        // measure after layout
        requestAnimationFrame(() => {
            const h = incEl.scrollHeight || incEl.getBoundingClientRect().height || 0;
            setIncomingHeight(h);
        });
    }, [incoming, phase]);

    // Keep container height big enough to show both messages (no clipping)
    useLayoutEffect(() => {
        const cont = contRef.current;
        const out = outRef.current;
        // const inc = incRef.current;
        if (!cont || !out) return;

        // const basePadding = 28;
        // const outH = out.scrollHeight;
        // const incH = inc ? inc.scrollHeight : 0;
        // const desired = Math.max(150, outH + incH + basePadding + 56);
        // setContainerHeight(desired);
    }, [phase, outgoing, incoming]);

    const showOutgoing = phase >= 1;
    const showTyping = phase === 2;
    const showIncoming = phase >= 3;

    // compute outgoing bottom anchor:
    // - when incoming visible: place above incoming using measured incomingHeight
    // - else when typing: place above typing indicator
    // - else default resting bottom
    const outgoingBottomWhenTyping = TYPING_BOTTOM + TYPING_HEIGHT + OUTGOING_GAP_WHILE_TYPING;
    const outgoingBottomWhenIncoming = INCOMING_BOTTOM + incomingHeight + GAP_BETWEEN_BUBBLES;
    const outgoingBottom =
        showIncoming && incomingHeight > 0
            ? outgoingBottomWhenIncoming
            : showTyping
                ? outgoingBottomWhenTyping
                : outgoingDefaultBottom;

    const containerStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: MAX_W,
        minWidth: 340,
        // height: containerHeight === "auto" ? "auto" : containerHeight,
        height: 300,
        padding: 14,
        // borderRadius: 16,
        background: "#fff",
        // border: "1px solid rgba(15,23,36,0.06)",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    };

    const bubbleBase: React.CSSProperties = {
        padding: "12px 14px",
        borderRadius: 14,
        maxWidth: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        transitionProperty: "transform, opacity, box-shadow, bottom",
        transitionTimingFunction: "cubic-bezier(.22,.9,.34,1)",
        transitionDuration: reduceMotion ? "0ms" : "320ms",
        position: "absolute",
        left: 16,
        right: 16,
        boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
    };

    const outgoingStyle: React.CSSProperties = {
        ...bubbleBase,
        right: 16,
        left: 64,
        background: "linear-gradient(180deg,#fbfcff 0%, #eef6ff 100%)",
        borderTopRightRadius: 8,
        bottom: outgoingBottom,
        zIndex: 70, // ensure outgoing sits on top
        opacity: showOutgoing ? 1 : 0,
        transform: showOutgoing ? "translateY(0)" : "translateY(10px)",
    };

    const incomingStyle: React.CSSProperties = {
        ...bubbleBase,
        left: 16,
        right: 64,
        bottom: INCOMING_BOTTOM,
        background: "#ffffff",
        border: "1px solid rgba(15,23,36,0.04)",
        zIndex: 50,
        opacity: showIncoming ? 1 : 0,
        transform: showIncoming ? "translateY(0)" : "translateY(8px)",
    };

    const TypingIndicator: React.FC = () => {
        if (reduceMotion) {
            return (
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 10px",
                        borderRadius: 6,
                        background: "#f1f5f9",
                        border: "1px solid rgba(15,23,36,0.03)",
                    }}
                >
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(15,23,36,0.35)", margin: "0 4px" }} />
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(15,23,36,0.35)", margin: "0 4px" }} />
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(15,23,36,0.35)", margin: "0 4px" }} />
                </div>
            );
        }

        return (
            <>
                <style>{`
          @keyframes acn-dot {
            0% { transform: translateY(0); opacity: 0.35; }
            50% { transform: translateY(-5px); opacity: 1; }
            100% { transform: translateY(0); opacity: 0.35; }
          }
        `}</style>
                <div
                    aria-hidden
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: 12,
                        background: "#f8fafc",
                        border: "1px solid rgba(15,23,36,0.03)",
                    }}
                >
                    <span style={{ width: 5, height: 5, borderRadius: 999, margin: "0 5px", background: "rgba(15,23,36,0.35)", display: "inline-block", animation: "acn-dot 900ms ease-in-out 0ms infinite" }} />
                    <span style={{ width: 5, height: 5, borderRadius: 999, margin: "0 5px", background: "rgba(15,23,36,0.35)", display: "inline-block", animation: "acn-dot 900ms ease-in-out 160ms infinite" }} />
                    <span style={{ width: 5, height: 5, borderRadius: 999, margin: "0 5px", background: "rgba(15,23,36,0.35)", display: "inline-block", animation: "acn-dot 900ms ease-in-out 320ms infinite" }} />
                </div>
            </>
        );
    };

    const formattedTime = (() => {
        try {
            const d = new Date(timestamp);
            return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } catch {
            return timestamp;
        }
    })();

    return (
        <div ref={contRef} style={containerStyle} role="group" aria-label="Chat preview node" className="border-2 border-privue-700 rounded-lg bg-white/75 ">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--privue-900,#0f1724)" }}>Conversational Workspace</div>
                </div>
            </div>

            {/* Outgoing bubble */}
            <article ref={outRef} aria-label="Outgoing message" style={outgoingStyle}>
                <p style={{ margin: 0, fontSize: 12, color: "var(--privue-900,#0f1724)", lineHeight: 1.42 }}>{outgoing}</p>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, marginTop: 0 }}>
                    <time dateTime={timestamp} style={{ fontSize: 10, color: "var(--privue-600,#64748b)" }}>{formattedTime}</time>
                    <CheckCheck size={14} style={{ color: "rgba(99,102,241,0.9)" }} />
                </div>
            </article>

            {/* Typing indicator positioned at bottom */}
            <div
                style={{
                    position: "absolute",
                    bottom: TYPING_BOTTOM,
                    left: 16,
                    zIndex: 48,
                    transition: "opacity 160ms ease, visibility 160ms",
                    opacity: showTyping ? 1 : 0,
                    visibility: showTyping ? "visible" : "hidden",
                }}
                aria-hidden={!showTyping}
            >
                <TypingIndicator />
            </div>

            {/* Incoming reply */}
            <article ref={incRef} aria-label="Incoming message" style={incomingStyle}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    {/* <div style={{ width: 36, height: 36, borderRadius: 999, overflow: "hidden", flex: "0 0 36px", boxShadow: "inset 0 1px 0 rgba(0,0,0,0.04)" }}>
                        {avatarSrc ? (
                            <img src={avatarSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <div style={{ width: "100%", height: "100%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#6b7280" }}>
                                P
                            </div>
                        )}
                    </div> */}

                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 12, color: "var(--privue-900,#0f1724)" }}>{incoming}</p>
                        <div style={{ marginTop: 0, display: "flex", gap: 2, alignItems: "right" }}>
                            <time dateTime={timestamp} style={{ fontSize: 10, color: "var(--privue-600,#64748b)" }}>{formattedTime}</time>
                            {/* <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{name}</div> */}
                        </div>
                    </div>
                </div>
            </article>

            {/* helper caption (bottom) */}
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 12, pointerEvents: "none", fontSize: 12, color: "var(--privue-600,#64748b)" }}>
                Get quick, accurate, and personalized answers from Privue's workbench.
            </div>

            <Handle type="target" position={Position.Left} id="chat-left" style={{ left: -8, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "18%" }} />
            <Handle type="source" position={Position.Right} id="chat-right" style={{ right: -8, width: 8, height: 8, borderRadius: 999, background: "var(--privue-700,#475569)", border: "none", top: "45%" }} />
        </div>
    );
}

const AnimatedChatNode = React.memo(AnimatedChatNodeInner);
export { AnimatedChatNode };