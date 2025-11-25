import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { CheckCheck, XCircle, AlertTriangle, Circle } from 'lucide-react';
import TechnicalDiagram from '../workflow-animation/TechnicalDiagram';
type ChatAnimationProps = { className?: string };

/**
 * Smaller variant of AnimatedChat — constrained to max-width: 450px and max-height: 380px
 * Keeps the same lifecycle/behaviour but uses scaled-down chart and spacing.
 */

type Severity = 'critical' | 'warning' | 'neutral';

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

const QUESTION_TYPING_MS = 1000;
const ANSWER_TYPING_MS = 1000;
const QUESTION_GAP = 3000;

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

const Interests_QNA: ImageQna = {
  kind: 'image',
  question: 'What are the other business interests of Director Kumar?',
  imageCaption: 'Animated network view (interactive preview)',
};

const QNAS: Qna[] = [BASE_QNA, SALES_QNA, Interests_QNA];

function mergeClassNames(...xs: Array<string | undefined>) {
  return xs.filter(Boolean).join(' ');
}

export function AnimatedChatSmall({ className = '' }: ChatAnimationProps) {
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
    const size = 12;
    if (severity === 'critical')
      return <XCircle size={size} style={{ color: '#ef4444', minWidth: size }} />;
    if (severity === 'warning')
      return <AlertTriangle size={size} style={{ color: '#f59e0b', minWidth: size }} />;
    return <Circle size={size} style={{ color: '#94a3b8', minWidth: size }} />;
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
      axis: 'rgba(31,41,55,0.12)',
      text: '#6b7280',
      dotStroke: '#ffffff',
    };

    const salesValues = data.map((r) => r.sales);
    const maxSales = Math.max(...salesValues, 1);

    const w = 120;
    const h = 120;
    const padding = { top: 6, right: 8, bottom: 18, left: 8 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barGap = 12;
    const n = data.length || 1;
    const barWidth = Math.max(6, (chartW - barGap * (n - 1)) / n);

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
      try {
        const pts = (el as any).points;
        const hasPoints = pts ? pts.length > 0 : (el.getAttribute('points') || '').trim() !== '';
        if (!hasPoints) return;
        const length = el.getTotalLength();
        el.style.strokeDasharray = String(length);
        el.style.strokeDashoffset = String(length);
        // force layout reflow

        el.getBoundingClientRect();
        el.style.transition = 'stroke-dashoffset 800ms ease-out';
        el.style.strokeDashoffset = '0';
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Polyline animation skipped — element not ready or no points:', err);
        }
      }
    }, [data]);

    return (
      <div className="w-full">
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
                  rx={2}
                  fill={COLORS.bar}
                  style={{
                    transformOrigin: `${x + barWidth / 2}px ${h - padding.bottom}px`,
                    transformBox: 'fill-box',
                    transform: 'scaleY(0)',
                    animation: `growBarSmall 520ms ease-out ${i * 120}ms forwards`,
                  }}
                />
              );
            })}

            {points.length > 0 && (
              <polyline
                ref={polylineRef}
                points={points.join(' ')}
                fill="none"
                stroke={COLORS.line}
                strokeWidth={1.2}
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
                  r={2.25}
                  fill={COLORS.dotFill}
                  stroke={COLORS.dotStroke}
                  strokeWidth={0.7}
                  style={{
                    opacity: 0,
                    animation: `fadeInSmall 360ms ease-out ${520 + i * 140}ms forwards`,
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
                  fontSize={9}
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

        <style>{`@keyframes growBarSmall{from{transform:scaleY(0)}to{transform:scaleY(1)}}@keyframes fadeInSmall{from{opacity:0}to{opacity:1}}`}</style>
      </div>
    );
  }

  const TypingIndicator: React.FC = () => (
    <>
      <style>{`@keyframes acn-dot-small{0%{transform:translateY(0);opacity:0.35}50%{transform:translateY(-4px);opacity:1}100%{transform:translateY(0);opacity:0.35}}`}</style>
      <div
        aria-hidden
        className="inline-flex items-center rounded-xl border bg-slate-50 px-2 py-1"
        style={{ borderColor: 'rgba(15,23,36,0.03)' }}
      >
        <span
          className="mx-[4px] inline-block h-[4px] w-[4px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot-small 900ms ease-in-out 0ms infinite',
          }}
        />
        <span
          className="mx-[4px] inline-block h-[4px] w-[4px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot-small 900ms ease-in-out 120ms infinite',
          }}
        />
        <span
          className="mx-[4px] inline-block h-[4px] w-[4px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot-small 900ms ease-in-out 240ms infinite',
          }}
        />
      </div>
    </>
  );

  const qna = QNAS[currentIdx];

  return (
    <div
      role="group"
      aria-label="Chat preview (small)"
      className={mergeClassNames(
        'box-border max-h-[300px] w-full min-w-[200px] origin-bottom-right scale-[0.65] space-y-2 overflow-hidden rounded-lg border-2 bg-white p-2 font-sans sm:scale-[0.9] md:max-h-[400px] md:min-h-[175px] md:min-w-[300px] md:scale-100 md:p-1',
        className,
      )}
      style={{
        maxWidth: 450,
        maxHeight: 400,
        width: '100%',
        height: '100%',
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <style>{`
        .acn-list-item-animate{opacity:0;animation-name:stagger-in;animation-duration:360ms;animation-fill-mode:forwards;animation-timing-function:cubic-bezier(.2,.9,.2,1)}
        @keyframes stagger-in{0%{opacity:0;transform:translateY(6px) scale(.995)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .acn-image-wrap{position:relative;overflow:hidden;border-radius:10px;width:100%;max-height:140px}
        .acn-image-wrap img{display:block;width:100%;height:100%;object-fit:contain}
      `}</style>

      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="text-privue-900 text-[11px]">Conversational Workspace</div>
        </div>
      </div>

      <div
        className="pointer-events-none relative flex flex-col justify-end overflow-hidden"
        style={{
          padding: 8,
          minHeight: 0,
          boxSizing: 'border-box',
        }}
      >
        <div className="pointer-events-auto relative flex w-full flex-col gap-2">
          {phase === 1 && (
            <div className="self-end">
              <TypingIndicator />
            </div>
          )}

          {(phase === 2 || phase === 3 || phase === 4) && (
            <article
              className="self-end rounded-[12px] border px-2 py-1"
              style={{ borderColor: 'rgba(15,23,36,0.03)' }}
            >
              <div className="flex items-end gap-2 pr-1 pl-1">
                <p className="m-0 flex-1 text-left text-[11px] leading-[1.3]">{qna.question}</p>
              </div>
              <div className="mt-1 flex items-center justify-end gap-1">
                <time dateTime={new Date().toISOString()} className="text-[8px] text-[#64748b]">
                  {formattedTime}
                </time>
                <CheckCheck size={13} style={{ color: 'rgba(99,102,241,0.9)' }} />
              </div>
            </article>
          )}

          {phase === 3 && (
            <div className="self-start">
              <TypingIndicator />
            </div>
          )}

          {phase === 4 && (
            <article
              className="self-start rounded-[12px] border p-2"
              style={{ borderColor: 'rgba(15,23,36,0.04)' }}
            >
              {qna.kind === 'list' && (
                <ul className="m-0 flex list-none flex-col gap-1 p-0 text-left">
                  {qna.answerItems.map((it, aidx) => {
                    const delayMs = aidx * 100;
                    return (
                      <li
                        key={aidx}
                        className="acn-list-item-animate flex items-center gap-2"
                        style={{ animationDelay: `${delayMs}ms` }}
                      >
                        <div className="mt-[0px]">{renderSeverityIcon(it.severity)}</div>
                        <div className="flex-1">
                          <p className="m-0 text-[11px]">{it.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {qna.kind === 'image' && (
                <div className="flex flex-col items-start">
                  <div className="mx-auto w-full px-1">
                    <TechnicalDiagram />
                  </div>
                </div>
              )}

              {qna.kind === 'chart' && (
                <div className="flex flex-col gap-2">
                  <ChartForSalesAndGM data={qna.data} />
                  {qna.note && (
                    <div className="mt-1 text-[10px] text-slate-500 italic">{qna.note}</div>
                  )}
                </div>
              )}

              <div className="mt-1 flex justify-end gap-1">
                <time dateTime={new Date().toISOString()} className="text-[8px] text-[#64748b]">
                  {formattedTime}
                </time>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <div className="absolute bottom-3 items-center gap-2">
          <div className="text-[8px] text-[#64748b]">
            Get quick, accurate, and personalized answers from Privue's workbench.
          </div>
        </div>
      </div>
    </div>
  );
}

// JsonNewsFrame.tsx
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.06,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
};

type JsonCompactFrameProps = {
  payload?: unknown;
  maxLines?: number; // how many lines to display before showing '…'
};

export function JsonCompactFrame({
  payload = defaultPayload,
  maxLines = 12,
}: JsonCompactFrameProps) {
  // stringify with small indentation and split into lines
  const txt = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
  const lines = useMemo(() => txt.split('\n'), [txt]);

  // prepare displayed lines with fallback '…' if truncated
  const displayedLines = useMemo(() => {
    if (lines.length <= maxLines) return lines;
    // keep first (maxLines - 1) lines and add an ellipsis as the last visible line
    const keep = Math.max(1, maxLines - 1);
    return [...lines.slice(0, keep), '  …'];
  }, [lines, maxLines]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-h-[280px] w-[350px] origin-bottom-right scale-[0.65] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-h-[280px] md:max-w-[440px] md:scale-100 md:p-3"
      aria-label="JSON compact frame"
    >
      <div className="mb-1 flex items-center justify-between px-1">
        <div className="text-[9px] font-semibold text-slate-900">Raw Information</div>
        <div className="text-[9px] text-slate-500">Raw Text</div>
      </div>

      {/* content area — fixed max height, clip overflow visually */}
      <div
        className="relative overflow-hidden rounded-sm bg-slate-50/40"
        style={{ maxHeight: 160, border: '1px solid rgba(15,23,42,0.03)' }}
      >
        <div className="px-2 py-2">
          <motion.pre
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="m-0 font-mono text-slate-700"
            style={{
              // compact 9px text
              fontSize: 9,
              lineHeight: 1.15,
              margin: 0,
              // allow wrapping so long lines don't overflow
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {displayedLines.map((ln, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className="overflow-hidden"
                aria-hidden
                style={{ margin: 0, padding: 0, display: 'block' }}
              >
                <code
                  style={{
                    display: 'block',
                    fontSize: 9,
                    color: 'rgba(30,41,59,0.85)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {ln}
                </code>
              </motion.div>
            ))}
          </motion.pre>
        </div>

        {/* visual "Read more" overlay (aligned right, small inset, font-size 9) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 left-0 flex h-9 items-end justify-end pr-2"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 80%)',
          }}
        >
          <div className="mb-2 rounded bg-white/40 px-2 py-0.5 text-[9px] text-slate-500">
            Read more
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type Case = {
  caseNumber: string;
  title: string;
  description: string;
  court?: string;
  caseType?: string;
  filingDate?: string;
  riskLevel?: string;
  status?: string;
  relevanceScore?: number;
};

type Payload = {
  company?: string;
  totalResults?: number;
  cases: Case[];
  summary?: Record<string, any>;
};

const defaultPayload: Payload = {
  company: 'Delta Resources',
  totalResults: 8,
  cases: [
    {
      caseNumber: 'WP/3619/2021',
      title:
        'M/S Delta Resources Internet Private Limited vs The Deputy Commissioner Of Income Tax on 24 June, 2022',
      description:
        "The petitioner, M/s Delta Resources Internet Private Limited, made payments to M/s. Walmart Inc., USA, as reimbursement for the salaries of employees seconded from Walmart Inc. to work for Delta Resources. The petitioner applied for a 'Nil Tax Deduction at Source (TDS) Certificate' under Section 195(2) of the Income Tax Act, 1961, contending that these reimbursements were not income chargeable to tax in India for Walmart Inc. The Deputy Commissioner of Income Tax rejected this application, directing Delta Resources to deduct tax at source, treating the payments as consideration for technical services.",
      court: 'Karnataka High Court',
      caseType: 'DIRECT TAXATION',
      filingDate: '2025-10-01T12:09:10.372Z',
      riskLevel: 'High',
      status: 'Active',
      relevanceScore: 0.85,
    },
    {
      caseNumber: 'W.P.(CRL) 162/2022',
      title:
        'Delta Resources Internet Private Limited vs State Of Nct Of Delhi & Anr on 25 January, 2022',
      description:
        "The petitioner, Delta Resources Internet Private Limited, filed a criminal writ petition seeking the records of an FIR registered against it. The petitioner's primary argument is that it is an 'intermediary' under the Information Technology Act, 2000, and is thus protected by Section 79 of the Act from liability for offences committed by third-party sellers on its platform. The petitioner also contended that two FIRs had been lodged against it on the same allegations, which is legally impermissible.",
      court: 'Delhi High Court - Orders',
      caseType: 'CRIMINAL LAW',
      filingDate: '2025-10-01T12:09:10.372Z',
      riskLevel: 'High',
      status: 'Active',
      relevanceScore: 0.85,
    },
  ],
};

// const containerVariants2: Variants = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
// };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

export function JsonCardsFrame({ payload = defaultPayload }: { payload?: Payload }) {
  const cases = useMemo(() => payload?.cases ?? [], [payload]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-h-[280px] w-[350px] origin-bottom-right scale-[0.65] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-h-[320px] md:max-w-[440px] md:scale-100 md:p-3"
      aria-label="Cases cards frame"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-900">
          {payload?.company ?? 'Company'}
        </div>
        <div className="text-[9px] text-slate-500">
          {payload?.totalResults ?? cases.length} Summary
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {cases.map((c, i) => (
          <motion.article
            key={c.caseNumber + i}
            variants={cardVariants}
            className="rounded-md border border-slate-100 bg-white p-2 shadow-sm"
            style={{ fontSize: 11 }}
          >
            {/* header row: caseNumber + risk badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className="truncate text-[10px] font-medium"
                    title={c.title}
                    style={{ lineHeight: 1.05 }}
                  >
                    {c.title}
                  </div>
                </div>
                <div className="mt-[4px] truncate text-[9px] text-slate-500" title={c.caseNumber}>
                  {c.caseNumber} · {c.court}
                </div>
              </div>

              {/* risk pill — very small */}
              <div className="ml-2 shrink-0">
                <div
                  className={`rounded-full px-1 py-[3px] text-[8px] font-normal tracking-wide ${
                    c.riskLevel === 'High'
                      ? 'border border-red-100 bg-red-50 text-red-700'
                      : c.riskLevel === 'Medium'
                        ? 'border border-amber-100 bg-amber-50 text-amber-700'
                        : 'border border-slate-100 bg-slate-50 text-slate-700'
                  }`}
                  style={{ minWidth: 44, textAlign: 'center' }}
                >
                  {c.riskLevel ?? 'Unknown'}
                </div>
              </div>
            </div>

            {/* description (clamped to 3 lines, very small spacing) */}
            <p
              className="mt-2 text-[9px] text-slate-700"
              style={{
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.15,
                maxHeight: '3.45em',
              }}
              title={c.description}
            >
              {c.description}
            </p>

            {/* tags row: tiny pills */}
            <div className="mt-2 flex flex-wrap gap-1">
              {/* case type */}
              {c.caseType ? (
                <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[8px] text-slate-700">
                  {c.caseType}
                </span>
              ) : null}

              {/* status */}
              {c.status ? (
                <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[8px] text-slate-700">
                  {c.status}
                </span>
              ) : null}

              {/* court */}
              {c.court ? (
                <span
                  className="truncate rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[8px] text-slate-700"
                  style={{ maxWidth: 160 }}
                  title={c.court}
                >
                  {c.court}
                </span>
              ) : null}

              {/* filing date */}
              {c.filingDate ? (
                <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[8px] text-slate-700">
                  {new Date(c.filingDate).toLocaleDateString()}
                </span>
              ) : null}

              {/* relevance (optional) */}
              {typeof c.relevanceScore === 'number' ? (
                <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[8px] text-slate-700">
                  {Math.round(c.relevanceScore * 100)}%
                </span>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

export default function ConversationalAI() {
  const bgUrl = '/module-animations/climate-risk-bg.png';

  type Step = 'frame1';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 12000,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame1';
        return 'frame1';
      });
    }, durations[step]);

    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      {/* background layer */}
      <div className="absolute inset-0">
        <img
          src={bgUrl}
          alt="background"
          className="h-full w-full object-contain backdrop-opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      {/* overlay frames */}
      <AnimatePresence>
        {step === 'frame1' && (
          <motion.div
            key="frame1"
            className="absolute right-0.5 bottom-0.5 rounded-md shadow-xs md:right-6 md:bottom-6 md:shadow-xl md:backdrop-blur-3xl"
          >
            <AnimatedChatSmall />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional tiny controls for testing — remove if you want purely automatic cycling */}
      {/* <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame3" : s === "frame2" ? "frame1" : "frame2"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Prev frame"
                >
                    Prev
                </button>
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame2" : s === "frame2" ? "frame3" : "frame1"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Next frame"
                >
                    Next
                </button>
            </div> */}
    </div>
  );
}
