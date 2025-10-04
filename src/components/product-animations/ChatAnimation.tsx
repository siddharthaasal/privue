// AnimatedChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import { CheckCheck, XCircle, AlertTriangle, Circle } from 'lucide-react';
import TechnicalDiagram from '../workflow-animation/TechnicalDiagram';
type ChatAnimationProps = { className?: string };

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
  kind: 'chart';
  question: string;
  data: {
    year: string;
    sales: number;
    grossMargin: number;
  }[];
  note?: string;
};

type ImageQna = {
  kind: 'image';
  question: string;
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

// const VEMBU_QNA: ImageQna = {
//     kind: "image",
//     question: "What are the other business interests of Director Vembu?",
//     imageSrc: "/workflow/directorVembuImg.png",
//     imageCaption: "Other business interests of Director Vembu — source: filings",
// };

const Interests_QNA: ImageQna = {
  kind: 'image',
  question: 'What are the other business interests of Director Kumar?',
  imageCaption: 'Animated network view (interactive preview)',
};

const QNAS: Qna[] = [BASE_QNA, SALES_QNA, Interests_QNA];

/* --- helpers --- */
function mergeClassNames(...xs: Array<string | undefined>) {
  return xs.filter(Boolean).join(' ');
}

/* --- Component --- */
export function AnimatedChatInner({ className = '' }: ChatAnimationProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<number>(0);
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
    const size = 14;
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
    const salesValues = data.map((r) => r.sales);
    const maxSales = Math.max(...salesValues, 1);

    // dimensions
    const w = 250; // internal drawing width
    const h = 150; // internal drawing height
    const padding = { top: 6, right: 8, bottom: 18, left: 8 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barGap = 35;
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
      if (polylineRef.current) {
        const length = polylineRef.current.getTotalLength();
        polylineRef.current.style.strokeDasharray = String(length);
        polylineRef.current.style.strokeDashoffset = String(length);
        // trigger reflow then animate

        polylineRef.current.getBoundingClientRect();
        polylineRef.current.style.transition = 'stroke-dashoffset 1s ease-out';
        polylineRef.current.style.strokeDashoffset = '0';
      }
    }, [data]);

    return (
      <div className="w-full">
        <div className="rounded-md bg-[rgba(15,23,36,0.02)] px-1 py-1">
          <svg
            width="100%"
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-hidden="true"
          >
            <line
              x1={padding.left}
              x2={w - padding.right}
              y1={h - padding.bottom}
              y2={h - padding.bottom}
              stroke="rgba(15,23,36,0.1)"
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
                  fill="#4c6ef5"
                  opacity={0.85}
                  style={{
                    transformOrigin: `${x + barWidth / 2}px ${h - padding.bottom}px`,
                    transformBox: 'fill-box',
                    transform: 'scaleY(0)',
                    animation: `growBar 600ms ease-out ${i * 150}ms forwards`,
                  }}
                />
              );
            })}

            <polyline
              ref={polylineRef}
              points={points.join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth={1.5}
            />

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

            {data.map((r, i) => {
              const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
              return (
                <text
                  key={`lbl-${i}`}
                  x={x}
                  y={h - 4}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#64748b"
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
      aria-label="Chat preview"
      className={mergeClassNames(
        'box-border w-full max-w-[700px] overflow-hidden rounded-lg border-2 bg-white/75 font-sans',
        className,
      )}
      style={{
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <style>{`
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

        @keyframes dagger-reveal {
          0% { transform: translateX(0%) skewX(-20deg); width: 100%; }
          100% { transform: translateX(120%) skewX(-20deg); width: 100%; }
        }

        .acn-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          width: 100%;
          max-height: 220px;
        }

        .acn-image-wrap img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
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

        .acn-dagger-animate {
          animation-name: dagger-reveal;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(.22,.9,.32,1);
        }
      `}</style>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="text-privue-900 text-[13px] font-medium">Conversational Workspace</div>
        </div>
      </div>

      {/* NOTE: this container is flexible height — parent must provide height (e.g. h-full) */}
      <div
        className="pointer-events-none relative top-0 right-0 bottom-0 left-0 flex flex-col justify-end overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 4%, rgba(0,0,0,1) 12%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 4%, rgba(0,0,0,1) 12%)',
          // Allow content to grow within parent height - no fixed height enforced here
          minHeight: 0,
        }}
      >
        <div className="pointer-events-auto relative flex w-full flex-col gap-3 px-3 py-2">
          {/* User typing */}
          {phase === 1 && (
            <div className="self-end">
              <TypingIndicator />
            </div>
          )}

          {/* Question bubble */}
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
                    const delayMs = aidx * 120;
                    return (
                      <li
                        key={aidx}
                        className="acn-list-item-animate flex items-center gap-2"
                        style={{ animationDelay: `${delayMs}ms` }}
                      >
                        <div className="mt-[0px]">{renderSeverityIcon(it.severity)}</div>
                        <div className="flex-1">
                          <p className="m-0 text-[12px] leading-[1.35] text-[#0f1724]">{it.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {qna.kind === 'image' && (
                <div className="flex flex-col items-start">
                  <div className="mx-auto px-2">
                    <TechnicalDiagram />
                  </div>
                </div>
              )}

              {qna.kind === 'chart' && (
                <div className="flex flex-col gap-3">
                  {/* <div className="flex flex-col gap-1 text-[9px] text-slate-600">
                                        {qna.data.map((row, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="font-normal text-slate-700">{row.year.replace("FY ", "")}</span>
                                                <span>S: {row.sales.toLocaleString()}</span>
                                                <span>GM: {row.grossMargin.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div> */}

                  <ChartForSalesAndGM data={qna.data} />

                  {qna.note && (
                    <div className="mt-2 text-[11px] text-slate-500 italic">{qna.note}</div>
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

      <div className="flex items-center justify-between p-3">
        <div className="absolute bottom-4 items-center gap-2">
          <div className="text-[11px] text-[#64748b]">
            Get quick, accurate, and personalized answers from Privue's workbench.
          </div>
        </div>
      </div>
      {/* <div className="absolute left-18 bottom-3 pointer-events-none text-[12px] text-[#64748b] text-left">
                Get quick, accurate, and personalized answers from Privue's workbench.
            </div> */}
    </div>
  );
}

const ChatAnimation = React.memo(AnimatedChatInner);
export default ChatAnimation;
