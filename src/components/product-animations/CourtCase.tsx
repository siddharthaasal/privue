import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

const TYPED_QUERY = 'Delta Resources';

// SearchFrame.tsx
function SearchFrame() {
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<number | null>(null);

  useEffect(() => {
    // start typewriter after mount
    setTyping(true);
    const speed = 55; // ms per char (type speed)
    const startDelay = 420; // small delay before starting
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        for (let i = 0; i < TYPED_QUERY.length; i++) {
          timers.push(
            window.setTimeout(() => {
              setValue((v) => TYPED_QUERY.slice(0, v.length + 1));
            }, i * speed),
          );
        }

        // finish typing: stop caret, simulate submit after short pause
        timers.push(
          window.setTimeout(
            () => {
              setTyping(false);
              // simulate clicking submit
              setTimeout(() => {
                triggerSubmit();
              }, 330);
            },
            TYPED_QUERY.length * speed + 140,
          ),
        );
      }, startDelay),
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    // synthetic caret blink (if typing)
    if (!typing) return;
    let visible = true;
    caretRef.current = window.setInterval(() => {
      visible = !visible;
      if (inputRef.current) {
        // manually update placeholder-like caret using CSS variable or value append
        // but we simply rely on typed value + '|' suffix render in input
        // No-op here — caret rendering handled in JSX
      }
    }, 550);
    return () => {
      if (caretRef.current) clearInterval(caretRef.current);
    };
  }, [typing]);

  const triggerSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    setLoading(true);

    // simulate a quick press animation + fake network load
    setTimeout(() => {
      setLoading(false);
      // optionally show a short 'done' flash, then reset submit state
      setTimeout(() => setSubmitted(false), 700);
    }, 900);
  };

  return (
    <div className="w-[400px] max-w-[500px] rounded-md bg-gray-50 p-3">
      <div className="mb-3 text-[11px] font-medium text-slate-800">Court Case API</div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only text-[10px]">
            Search query
          </label>

          <div
            className="relative rounded-md border border-slate-200 shadow-sm focus-within:border-slate-300"
            style={{ background: 'white' }}
          >
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
              {/* search icon (simple svg) */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* input */}
            <input
              id="search"
              ref={inputRef}
              value={typing ? `${value}|` : value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent py-2 pr-4 pl-7 text-[9px] leading-snug outline-none"
              placeholder="Search"
              aria-label="Search query"
              readOnly={typing} // while auto-typing, keep readOnly to avoid interference
            />
          </div>
        </div>

        {/* animated submit button */}
        <motion.button
          onClick={() => {
            // allow manual click even if typing finished
            triggerSubmit();
          }}
          whileTap={{ scale: 0.96 }}
          animate={submitted ? { scale: [1, 0.98, 1] } : { scale: 1 }}
          transition={{ duration: 0.28 }}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1 text-[9px] font-medium text-white shadow-sm"
          aria-pressed={submitted}
        >
          {loading ? (
            // tiny spinner
            <svg className="mr-2 -ml-1 animate-spin" width="16" height="16" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.2"
                fill="none"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : null}
          <span className="select-none">{loading ? 'Searching...' : 'Search'}</span>
        </motion.button>
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
      className="max-w-[480px] min-w-[360px] rounded-md border border-slate-100 bg-white/96 p-2 shadow-sm"
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
        'M/S Flipkart Internet Private Limited vs The Deputy Commissioner Of Income Tax on 24 June, 2022',
      description:
        "The petitioner, M/s Flipkart Internet Private Limited, made payments to M/s. Walmart Inc., USA, as reimbursement for the salaries of employees seconded from Walmart Inc. to work for Flipkart. The petitioner applied for a 'Nil Tax Deduction at Source (TDS) Certificate' under Section 195(2) of the Income Tax Act, 1961, contending that these reimbursements were not income chargeable to tax in India for Walmart Inc. The Deputy Commissioner of Income Tax rejected this application, directing Flipkart to deduct tax at source, treating the payments as consideration for technical services.",
      court: 'Karnataka High Court',
      caseType: 'DIRECT TAXATION',
      filingDate: '2025-10-01T12:09:10.372Z',
      riskLevel: 'High',
      status: 'Active',
      relevanceScore: 0.85,
    },
    {
      caseNumber: 'W.P.(CRL) 162/2022',
      title: 'Flipkart Internet Private Limited vs State Of Nct Of Delhi & Anr on 25 January, 2022',
      description:
        "The petitioner, Flipkart Internet Private Limited, filed a criminal writ petition seeking the records of an FIR registered against it. The petitioner's primary argument is that it is an 'intermediary' under the Information Technology Act, 2000, and is thus protected by Section 79 of the Act from liability for offences committed by third-party sellers on its platform. The petitioner also contended that two FIRs had been lodged against it on the same allegations, which is legally impermissible.",
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
      className="max-w-[450px] min-w-[360px] rounded-md border bg-white/90 p-4"
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
                  className={`rounded-full px-1 py-[3px] text-[8px] font-normal tracking-wide ${c.riskLevel === 'High'
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

export default function CourtCase() {
  const bgUrl = '/module-animations/climate-risk-bg.png';

  type Step = 'frame1' | 'frame2' | 'frame3';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 3500,
    frame2: 3500,
    frame3: 4000,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame2';
        if (prev === 'frame2') return 'frame3';
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
          <motion.div key="frame1" className="absolute right-6 bottom-6">
            <SearchFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-6 bottom-6">
            <JsonCompactFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-6 bottom-6">
            <JsonCardsFrame />
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
