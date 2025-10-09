// AnimatedChatNode.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCheck, XCircle, AlertTriangle, Circle } from 'lucide-react';

/**
 * Phase mapping:
 * 0 = hidden
 * 1 = userTyping (right)
 * 2 = outgoing (question shown)
 * 3 = incomingTyping (left)
 * 4 = incomingShown (answer visible, question stays)
 * 5 = finished
 */

type Severity = 'critical' | 'warning' | 'neutral';

/* --- QnA types --- */
type AnswerItem = { text: string; severity: Severity };

type ListQna = {
  kind: 'list';
  question: string;
  answerItems: AnswerItem[];
};

type ChartQna = {
  kind: 'chart' | 'chart2';
  question: string;
  data: {
    year: string;
    sales: number;
    grossMargin: number;
  }[];
  note?: string; // e.g. "Sales on a bar graph and gross profit as a line graph"
};

type ImageQna = {
  kind: 'image';
  question: string;
  imageSrc?: string;
  imageCaption?: string;
};

type Qna = ListQna | ChartQna | ImageQna;

/* --- Timing constants --- */
const QUESTION_TYPING_MS = 1000;
const ANSWER_TYPING_MS = 1000;
const QUESTION_GAP = 3000;

/* --- example QNAs --- */
const BASE_QNA: ListQna = {
  kind: 'list',
  question: 'Why is the Risk Score so high?',
  answerItems: [
    { text: 'High exposure to credit compared to earnings', severity: 'critical' },
    { text: 'Balance sheet is highly leveraged', severity: 'critical' },
    { text: '5 months delinquent in last 36 months', severity: 'critical' },
    { text: 'No GST filings done in the last year', severity: 'warning' },
    { text: 'Age group above 60', severity: 'warning' },
  ],
};

const SALES_QNA: ChartQna = {
  kind: 'chart',
  question: 'What is the sales and gross margin in the last 3 years?',
  data: [
    { year: 'FY 2021-22', sales: 119697880, grossMargin: 18568060 },
    { year: 'FY 2022-23', sales: 97710280, grossMargin: 15662720 },
    { year: 'FY 2023-24', sales: 67569687, grossMargin: 10721827 },
  ],
};

/* replaced image QnA with dealer performance QnA */
/* Dealer performance QnA */
const DealerPerformance_QNA: ChartQna = {
  kind: 'chart2',
  question: 'How has the dealer performed in the last 3 years?',
  data: [
    // approximate "Payments Received (Last 12 Months)" trend
    { year: 'M1', sales: 10, grossMargin: 10 },
    { year: 'M2', sales: 9, grossMargin: 9 },
    { year: 'M3', sales: 8, grossMargin: 8 },
    { year: 'M4', sales: 8, grossMargin: 8 },
    { year: 'M5', sales: 7, grossMargin: 7 },
    { year: 'M6', sales: 6, grossMargin: 6 },
    { year: 'M7', sales: 9, grossMargin: 9 },
    { year: 'M8', sales: 11, grossMargin: 11 },
    { year: 'M9', sales: 8, grossMargin: 8 },
    { year: 'M10', sales: 12, grossMargin: 12 },
    { year: 'M11', sales: 11, grossMargin: 11 },
    { year: 'M12', sales: 7, grossMargin: 7 },
  ],
  note: 'Avg Days Past Due: 47 | Avg DSO: 77',
};

const QNAS: Qna[] = [BASE_QNA, SALES_QNA, DealerPerformance_QNA];

function MinimalLineChart({ data }: { data: { year: string; sales: number }[] }) {
  const w = 220;
  const h = 80;
  const padding = 10;

  const maxY = Math.max(...data.map((d) => d.sales), 1);
  const xStep = (w - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * xStep;
    const y = h - padding - (d.sales / maxY) * (h - 2 * padding);
    return `${x},${y}`;
  });

  return (
    <svg width={w} height={h}>
      <polyline points={points.join(' ')} fill="none" stroke="#4f46e5" strokeWidth={2} />
      {points.map((pt, i) => {
        const [x, y] = pt.split(',').map(Number);
        return <circle key={i} cx={x} cy={y} r={3} fill="#5c7cfa" />;
      })}
    </svg>
  );
}

/* --- Component --- */
export function AnimatedChatNodeInner(): any {
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
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  })();

  const renderSeverityIcon = (severity: Severity) => {
    const size = 16;
    if (severity === 'critical')
      return <XCircle size={size} style={{ color: '#ef4444', minWidth: size }} />;
    if (severity === 'warning')
      return <AlertTriangle size={size} style={{ color: '#f59e0b', minWidth: size }} />;
    return <Circle size={14} style={{ color: '#94a3b8', minWidth: 14 }} />;
  };

  function ChartForSalesAndGM({
    data,
  }: {
    data: { year: string; sales: number; grossMargin: number }[];
  }) {
    const COLORS = {
      bar: '#9ca3af',
      line: '#1f2937',
      dotFill: '#1f2937',
      axis: 'rgba(31,41,55,0.15)',
      text: '#6b7280',
      dotStroke: '#ffffff',
    };

    const salesValues = data.map((r) => r.sales);
    const maxSales = Math.max(...salesValues, 1);

    const w = 150;
    const h = 150;
    const padding = { top: 6, right: 8, bottom: 18, left: 8 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barGap = 16;
    const n = data.length || 1;
    const barWidth = Math.max(8, (chartW - barGap * (n - 1)) / n);

    const yOf = (val: number) => padding.top + (1 - val / maxSales) * chartH;

    const points = data.map((r, i) => {
      const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
      const y = yOf(r.grossMargin);
      return `${x},${y}`;
    });

    const polylineRef = useRef<SVGPolylineElement | null>(null);

    useEffect(() => {
      const el = polylineRef.current;
      if (!el) return;

      // Defensive: only animate if the polyline has at least one rendered point
      // and guard with try/catch because getTotalLength can throw if element is not ready.
      try {
        // SVGPointList availability check (some browsers)
        const pts = (el as any).points;
        const hasPoints = pts ? pts.length > 0 : (el.getAttribute('points') || '').trim() !== '';

        if (!hasPoints) return;

        const length = el.getTotalLength();
        el.style.strokeDasharray = String(length);
        el.style.strokeDashoffset = String(length);
        // force layout reflow to ensure transition kicks in
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.getBoundingClientRect();
        el.style.transition = 'stroke-dashoffset 1s ease-out';
        el.style.strokeDashoffset = '0';
      } catch (err) {
        // If browser reports element as non-rendered, skip animation silently (but log in dev).
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('Polyline animation skipped — element not ready or no points:', err);
        }
      }
    }, [data]);

    return (
      <div className="w-3/4">
        <div className="rounded-md px-1 py-1">
          <svg width={w} height={h} role="img" aria-label="Sales and gross margin chart">
            <line
              x1={padding.left}
              x2={w - padding.right}
              y1={h - padding.bottom}
              y2={h - padding.bottom}
              stroke={COLORS.axis}
              strokeWidth={1}
            />

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
                  rx={3}
                  fill={COLORS.bar}
                  style={{
                    transformOrigin: `${x + barWidth / 2}px ${h - padding.bottom}px`,
                    transformBox: 'fill-box',
                    transform: 'scaleY(0)',
                    animation: `growBar 600ms ease-out ${i * 150}ms forwards`,
                  }}
                />
              );
            })}

            {/* only render polyline if we have points */}
            {points.length > 0 && (
              <polyline
                ref={polylineRef}
                points={points.join(' ')}
                fill="none"
                stroke={COLORS.line}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.98 }}
              />
            )}

            {data.map((r, i) => {
              const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
              const y = yOf(r.grossMargin);
              return (
                <circle
                  key={`pt-${i}`}
                  cx={x}
                  cy={y}
                  r={2.75}
                  fill={COLORS.dotFill}
                  stroke={COLORS.dotStroke}
                  strokeWidth={0.8}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 400ms ease-out ${600 + i * 200}ms forwards`,
                  }}
                />
              );
            })}

            {data.map((r, i) => {
              const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
              return (
                <text
                  key={`lbl-${i}`}
                  x={x}
                  y={h - 4}
                  textAnchor="middle"
                  fontSize={10}
                  fill={COLORS.text}
                  style={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                  }}
                >
                  {r.year.replace('FY ', '')}
                </text>
              );
            })}
          </svg>
        </div>

        <style>{`
          @keyframes growBar {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

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
        className="inline-flex items-center rounded-xl border bg-slate-50 px-3 py-1.5"
        style={{ borderColor: 'rgba(15,23,36,0.03)' }}
      >
        <span
          className="mx-[5px] inline-block h-[5px] w-[5px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 0ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[5px] w-[5px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 160ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[5px] w-[5px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 320ms infinite',
          }}
        />
      </div>
    </>
  );

  const qna = QNAS[currentIdx];

  return (
    <div
      role="group"
      aria-label="Chat preview node"
      className="border-privue-700 relative box-border h-[435px] w-full max-w-[500px] min-w-[350px] overflow-hidden rounded-lg border-2 bg-white/75 p-3 font-sans"
      style={{
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      {/* Animation CSS (stagger + dagger) */}
      <style>{`
        /* staggered list item */
        @keyframes stagger-in {
          0% { opacity: 0; transform: translateY(6px) scale(0.995); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .acn-list-item-animate {
          opacity: 0;
          animation-name: stagger-in;
          animation-duration: 420ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(.2,.9,.2,1);
        }

        /* dagger fill overlay for image reveal (kept for backward compatibility) */
        @keyframes dagger-reveal {
          0% { transform: translateX(0%) skewX(-20deg); width: 100%; }
          100% { transform: translateX(120%) skewX(-20deg); width: 100%; }
        }

        .acn-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .acn-image-wrap img {
          display: block;
          width: 100%;
          height: auto;
        }

        .acn-dagger-overlay {
          position: absolute;
          top: -25%;
          left: 0;
          height: 150%;
          width: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.9) 30%, rgba(255,255,255,0.98) 100%);
          transform-origin: left center;
        }

        /* when animate, slide the overlay to the right to reveal underlying image */
        .acn-dagger-animate {
          animation-name: dagger-reveal;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(.22,.9,.32,1);
        }
      `}</style>

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-privue-900 text-[13px] font-medium">Conversational Workspace</div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-[20%] right-0 bottom-16 left-0 flex flex-col justify-end overflow-hidden">
        <div className="pointer-events-auto relative flex w-full flex-col gap-3 px-3">
          {/* User typing */}
          {phase === 1 && (
            <div className="self-end">
              <TypingIndicator />
            </div>
          )}

          {/* Question bubble */}
          {(phase === 2 || phase === 3 || phase === 4) && (
            <article className="self-end rounded-[14px] border border-gray-50 px-1 py-2 shadow-[0_8px_20px_rgba(2,6,23,0.06)]">
              <div className="flex items-end gap-2 pr-2 pl-2">
                <p className="m-0 flex-1 text-right text-[12px] leading-[1.42] text-[#0f1724]">
                  {qna.question}
                </p>
              </div>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                <time dateTime={new Date().toISOString()} className="text-[10px] text-[#64748b]">
                  {formattedTime}
                </time>
                <CheckCheck size={14} style={{ color: 'rgba(99,102,241,0.9)' }} />
              </div>
            </article>
          )}

          {/* Incoming typing */}
          {phase === 3 && (
            <div className="self-start">
              <TypingIndicator />
            </div>
          )}

          {/* Answer bubble */}
          {phase === 4 && (
            <article
              className="self-start rounded-[14px] border bg-white p-3"
              style={{ borderColor: 'rgba(15,23,36,0.04)' }}
            >
              {qna.kind === 'list' && (
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-left">
                  {qna.answerItems.map((it, aidx) => {
                    // stagger delay each item slightly, measured before the item shows
                    const delayMs = aidx * 120; // 120ms per item
                    return (
                      <li
                        key={aidx}
                        className="acn-list-item-animate flex items-start gap-2"
                        style={{ animationDelay: `${delayMs}ms` }}
                      >
                        <div className="mt-[2px]">{renderSeverityIcon(it.severity)}</div>
                        <div className="flex-1">
                          <p className="m-0 text-[12px] leading-[1.35] text-[#0f1724]">{it.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {qna.kind === 'chart' && (
                <div className="flex flex-col gap-3">
                  {/* textual summary */}
                  {/* <div className="flex flex-col gap-1 text-[11px] text-slate-600">
                                        {qna.data.map((row, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="font-medium text-slate-700">{row.year.replace("FY ", "")}</span>
                                                <span>S: {row.sales.toLocaleString()}</span>
                                                <span>GM: {row.grossMargin.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div> */}
                  {/* chart */}
                  <ChartForSalesAndGM data={qna.data} />

                  {qna.note && (
                    <div className="mt-2 text-[11px] text-slate-500 italic">{qna.note}</div>
                  )}
                </div>
              )}

              {qna.kind === 'chart2' && (
                <div className="flex flex-col gap-2">
                  {/* minimal text summary */}
                  <div className="flex flex-col gap-1 text-[12px] text-slate-700">
                    <div className="acn-list-item-animate" style={{ animationDelay: '80ms' }}>
                      Avg Days Past Due (Weighted): <span className="font-medium">47 days</span>
                    </div>
                    <div className="acn-list-item-animate" style={{ animationDelay: '180ms' }}>
                      Avg Days Sales Outstanding: <span className="font-medium">77 days</span>
                    </div>
                  </div>

                  {/* chart with stagger animation */}
                  <div className="acn-list-item-animate" style={{ animationDelay: '320ms' }}>
                    <MinimalLineChart data={qna.data} />
                  </div>

                  {qna.note && (
                    <div
                      className="acn-list-item-animate mt-1 text-[11px] text-slate-500 italic"
                      style={{ animationDelay: '500ms' }}
                    >
                      {qna.note}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-1.5 flex justify-end gap-1.5">
                <time dateTime={new Date().toISOString()} className="text-[10px] text-[#64748b]">
                  {formattedTime}
                </time>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-3 left-4 text-left text-[12px] text-[#64748b]">
        Get quick, accurate, and personalized answers from Privue's workbench.
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="chat-left"
        style={{
          left: -8,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '18%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="chat-right"
        style={{
          right: -8,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '45%',
        }}
      />
    </div>
  );
}

const DistributorChatNode = React.memo(AnimatedChatNodeInner);
export { DistributorChatNode };
