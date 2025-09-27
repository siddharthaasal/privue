// InsuranceUnderwritingChatNode.tsx
import React, { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { CheckCheck } from "lucide-react";

/**
 * Phase mapping:
 * 0 = hidden
 * 1 = userTyping (right)
 * 2 = outgoing (question shown)
 * 3 = incomingTyping (left)
 * 4 = incomingShown (answer visible, question stays)
 * 5 = finished
 */

/* --- QnA types --- */
type ListQna = {
    kind: "list";
    question: string;
    answerItems: { text: string }[];
};

type ChartQna = {
    kind: "chart";
    question: string;
    data: { year: string; sales: number; grossMargin: number }[];
};

type Qna = ListQna | ChartQna;

/* --- Timing constants --- */
const QUESTION_TYPING_MS = 1000;
const ANSWER_TYPING_MS = 1000;
const QUESTION_GAP = 3000;

/* --- QNAs --- */
const FACILITY_QNA: ListQna = {
    kind: "list",
    question: "When was the facility commissioned?",
    answerItems: [
        { text: "Unit 1: 02 June 1994" },
        { text: "Unit 2: 22 October 1995" },
        { text: "Unit 3: In 2019" },
        { text: "Unit 4: In 2019" },
    ],
};

const SALES_QNA: ChartQna = {
    kind: "chart",
    question: "What is the sales and gross margin in the last 3 years?",
    data: [
        { year: "FY 2021-22", sales: 119697880, grossMargin: 18568060 },
        { year: "FY 2022-23", sales: 97710280, grossMargin: 15662720 },
        { year: "FY 2023-24", sales: 67569687, grossMargin: 10721827 },
    ],
};

const QNAS: Qna[] = [FACILITY_QNA, SALES_QNA];

/* --- Component --- */
export function InsuranceUnderwritingChatNodeInner(): any {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [phase, setPhase] = useState(0);
    const timeouts = useRef<number[]>([]);

    useEffect(() => {
        runLifecycle();
        return () => {
            timeouts.current.forEach((t) => clearTimeout(t));
            timeouts.current = [];
        };
    }, [currentIdx]);

    const runLifecycle = () => {
        timeouts.current.forEach((t) => clearTimeout(t));
        timeouts.current = [];

        setPhase(1);
        const t1 = window.setTimeout(() => {
            setPhase(2);
            const t2 = window.setTimeout(() => {
                setPhase(3);
                const t3 = window.setTimeout(() => {
                    setPhase(4);

                    const t4 = window.setTimeout(() => {
                        setPhase(5);
                        setCurrentIdx((prev) => (prev + 1) % QNAS.length);
                    }, QUESTION_GAP);
                    timeouts.current.push(t4);
                }, ANSWER_TYPING_MS);
                timeouts.current.push(t3);
            }, QUESTION_TYPING_MS);
            timeouts.current.push(t2);
        }, 600);
        timeouts.current.push(t1);
    };

    const formattedTime = (() => {
        try {
            const d = new Date();
            return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } catch {
            return "";
        }
    })();

    const TypingIndicator: React.FC = () => (
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
                className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-50 border"
                style={{ borderColor: "rgba(15,23,36,0.05)" }}
            >
                <span className="inline-block w-[6px] h-[6px] rounded-full mx-[5px]" style={{ background: "rgba(15,23,36,0.35)", animation: "acn-dot 900ms ease-in-out 0ms infinite" }} />
                <span className="inline-block w-[6px] h-[6px] rounded-full mx-[5px]" style={{ background: "rgba(15,23,36,0.35)", animation: "acn-dot 900ms ease-in-out 160ms infinite" }} />
                <span className="inline-block w-[6px] h-[6px] rounded-full mx-[5px]" style={{ background: "rgba(15,23,36,0.35)", animation: "acn-dot 900ms ease-in-out 320ms infinite" }} />
            </div>
        </>
    );

    function ChartForSalesAndGM({ data }: { data: { year: string; sales: number; grossMargin: number }[] }) {
        const salesValues = data.map((r) => r.sales);
        const maxSales = Math.max(...salesValues, 1);

        // dimensions
        const w = 150;
        const h = 150; // increased height
        const padding = { top: 6, right: 8, bottom: 20, left: 8 };
        const chartW = w - padding.left - padding.right;
        const chartH = h - padding.top - padding.bottom;
        const barGap = 20;
        const n = data.length || 1;
        const barWidth = Math.max(6, (chartW - barGap * (n - 1)) / n); // narrower bars

        const yOf = (val: number) => padding.top + (1 - val / maxSales) * chartH;

        const points = data.map((r, i) => {
            const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
            const y = yOf(r.grossMargin);
            return `${x},${y}`;
        });

        const polylineRef = useRef<SVGPolylineElement | null>(null);

        useEffect(() => {
            if (polylineRef.current) {
                const length = polylineRef.current.getTotalLength();
                polylineRef.current.style.strokeDasharray = String(length);
                polylineRef.current.style.strokeDashoffset = String(length);
                polylineRef.current.getBoundingClientRect();
                polylineRef.current.style.transition = "stroke-dashoffset 1s ease-out";
                polylineRef.current.style.strokeDashoffset = "0";
            }
        }, []);

        return (
            <div className="w-3/4">
                <svg width={w} height={h}>
                    {/* baseline axis */}
                    <line
                        x1={padding.left}
                        x2={w - padding.right}
                        y1={h - padding.bottom}
                        y2={h - padding.bottom}
                        stroke="rgba(15,23,36,0.1)"
                        strokeWidth={1}
                    />

                    {/* bars (Sales) */}
                    {data.map((r, i) => {
                        const x = padding.left + i * (barWidth + barGap);
                        const barH = (r.sales / maxSales) * chartH;
                        const y = padding.top + (chartH - barH);
                        return (
                            <rect
                                key={`bar-${i}`}
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barH}
                                rx={2}
                                fill="#3b82f6"
                                opacity={0.85}
                                style={{
                                    transformOrigin: `${x + barWidth / 2}px ${h - padding.bottom}px`,
                                    transformBox: "fill-box",
                                    transform: "scaleY(0)",
                                    animation: `growBar 600ms ease-out ${i * 200}ms forwards`,
                                }}
                            />
                        );
                    })}

                    {/* gross margin line */}
                    <polyline ref={polylineRef} points={points.join(" ")} fill="none" stroke="#ef4444" strokeWidth={1.5} />

                    {/* gross margin circles */}
                    {data.map((r, i) => {
                        const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
                        const y = yOf(r.grossMargin);
                        return (
                            <circle
                                key={`pt-${i}`}
                                cx={x}
                                cy={y}
                                r={2.5}
                                fill="#ef4444"
                                stroke="#fff"
                                strokeWidth={0.8}
                                style={{
                                    opacity: 0,
                                    animation: `fadeIn 400ms ease-out ${600 + i * 200}ms forwards`,
                                }}
                            />
                        );
                    })}
                </svg>

                <style>{`
          @keyframes growBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
            </div>
        );
    }

    const qna = QNAS[currentIdx];

    return (
        <div
            role="group"
            aria-label="Chat preview node"
            className="w-full max-w-[500px] min-w-[350px] h-[435px] p-3 relative box-border border-privue-700 overflow-hidden font-sans border-2 rounded-lg bg-white/75"
        >
            <div className="flex justify-between items-center mb-2">
                <div className="text-[13px] font-medium text-privue-900">Insurance Underwriting Workspace</div>
            </div>

            <div className="absolute left-0 right-0 top-[20%] bottom-16 overflow-hidden pointer-events-none flex flex-col justify-end">
                <div className="relative w-full pointer-events-auto flex flex-col gap-3 px-3">
                    {/* User typing */}
                    {phase === 1 && <div className="self-end"><TypingIndicator /></div>}

                    {/* Question bubble */}
                    {/* Question bubble */}
                    {(phase === 2 || phase === 3 || phase === 4) && (
                        <article className="self-end rounded-[14px] bg-white shadow-sm p-2 border">
                            <p className="m-0 text-[12px] text-[#0f1724] leading-[1.42] text-right">{qna.question}</p>

                            {/* If Q1 (facility commissioned) → show PDF attachment */}
                            {currentIdx === 0 && (
                                <div className="mt-1 flex justify-end items-center gap-1.5">
                                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 border px-2 py-0.5 text-[11px] text-slate-600">
                                        <span role="img" aria-label="pdf">📄</span>
                                        Facility_Commissioning.pdf
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-end items-center gap-1.5 mt-1">
                                <time className="text-[10px] text-[#64748b]">{formattedTime}</time>
                                <CheckCheck size={14} style={{ color: "rgba(99,102,241,0.9)" }} />
                            </div>
                        </article>
                    )}


                    {/* Incoming typing */}
                    {phase === 3 && <div className="self-start"><TypingIndicator /></div>}

                    {/* Answer bubble */}
                    {phase === 4 && (
                        <article className="self-start bg-white border rounded-[14px] p-3">
                            {qna.kind === "list" && (
                                <ul className="m-0 p-0 list-none flex flex-col gap-1 text-left">
                                    {qna.answerItems.map((it, idx) => (
                                        <li key={idx} className="text-[12px] text-slate-800">{it.text}</li>
                                    ))}
                                </ul>
                            )}
                            {qna.kind === "chart" && <ChartForSalesAndGM data={qna.data} />}

                            <div className="mt-2 flex justify-end">
                                <time className="text-[10px] text-[#64748b]">{formattedTime}</time>
                            </div>
                        </article>
                    )}
                </div>
            </div>

            <div className="absolute left-4 right-4 bottom-3 text-[12px] text-[#64748b]">
                Quick underwriting insights at a glance.
            </div>

            <Handle type="target" position={Position.Left} id="chat-left"
                style={{ left: -8, width: 8, height: 8, borderRadius: 999, background: "#475569", border: "none", top: "18%" }} />
            <Handle type="source" position={Position.Right} id="chat-right"
                style={{ right: -8, width: 8, height: 8, borderRadius: 999, background: "#475569", border: "none", top: "45%" }} />
        </div>
    );
}

const InsuranceUnderwritingChatNode = React.memo(InsuranceUnderwritingChatNodeInner);
export { InsuranceUnderwritingChatNode };
export default InsuranceUnderwritingChatNode;
