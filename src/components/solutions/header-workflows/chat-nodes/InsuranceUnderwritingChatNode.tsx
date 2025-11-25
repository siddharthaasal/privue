// InsuranceUnderwritingChatNode.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCheck } from 'lucide-react';

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
  kind: 'list';
  question: string;
  answerItems: { text: string }[];
};

type ChartQna = {
  kind: 'chart';
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
  kind: 'list',
  question: 'When was the facility commissioned?',
  answerItems: [
    { text: 'Unit 1: 02 June 1994' },
    { text: 'Unit 2: 22 October 1995' },
    { text: 'Unit 3: In 2019' },
    { text: 'Unit 4: In 2019' },
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
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
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
        className="inline-flex items-center rounded-xl border bg-slate-50 px-3 py-1.5"
        style={{ borderColor: 'rgba(15,23,36,0.05)' }}
      >
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 0ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 160ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 320ms infinite',
          }}
        />
      </div>
    </>
  );

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

        el.getBoundingClientRect();
        el.style.transition = 'stroke-dashoffset 1s ease-out';
        el.style.strokeDashoffset = '0';
      } catch (err) {
        // If browser reports element as non-rendered, skip animation silently (but log in dev).
        if (process.env.NODE_ENV !== 'production') {
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

  const qna = QNAS[currentIdx];

  return (
    <div
      role="group"
      aria-label="Chat preview node"
      className="border-privue-700 relative box-border h-[435px] w-full max-w-[500px] min-w-[350px] overflow-hidden rounded-lg border-2 bg-white/75 p-3 font-sans"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-privue-900 text-[13px] font-medium">
          Insurance Underwriting Workspace
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
          {/* Question bubble */}
          {(phase === 2 || phase === 3 || phase === 4) && (
            <article className="self-end rounded-[14px] border bg-white p-2 shadow-sm">
              <p className="m-0 text-right text-[12px] leading-[1.42] text-[#0f1724]">
                {qna.question}
              </p>

              {/* If Q1 (facility commissioned) → show PDF attachment */}
              {currentIdx === 0 && (
                <div className="mt-1 flex items-center justify-end gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md border bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                    <span role="img" aria-label="pdf">
                      📄
                    </span>
                    Facility_Commissioning.pdf
                  </span>
                </div>
              )}

              <div className="mt-1 flex items-center justify-end gap-1.5">
                <time className="text-[10px] text-[#64748b]">{formattedTime}</time>
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
            <article className="self-start rounded-[14px] border bg-white p-3">
              {qna.kind === 'list' && (
                <ul className="m-0 flex list-none flex-col gap-1 p-0 text-left">
                  {qna.answerItems.map((it, idx) => (
                    <li key={idx} className="text-[12px] text-slate-800">
                      {it.text}
                    </li>
                  ))}
                </ul>
              )}
              {qna.kind === 'chart' && <ChartForSalesAndGM data={qna.data} />}

              <div className="mt-2 flex justify-end">
                <time className="text-[10px] text-[#64748b]">{formattedTime}</time>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="absolute right-4 bottom-3 left-4 text-[12px] text-[#64748b]">
        Quick underwriting insights at a glance.
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
          background: '#475569',
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
          background: '#475569',
          border: 'none',
          top: '45%',
        }}
      />
    </div>
  );
}

const InsuranceUnderwritingChatNode = React.memo(InsuranceUnderwritingChatNodeInner);
export { InsuranceUnderwritingChatNode };
export default InsuranceUnderwritingChatNode;
