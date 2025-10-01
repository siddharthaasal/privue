// CreditAssessment.tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* -------------------------
  tiny animated number hook (used by frame1)
--------------------------*/
function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const from = value;
    const diff = target - from;
    let raf = 0;
    function step(ts: number) {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start!) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setValue(Number((from + diff * eased).toFixed(2)));
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

/* -------------------------
  circular ring (small, thin)
--------------------------*/
import { motion as m } from 'framer-motion';
function CircularRing({
  percent = 0,
  size = 40,
  stroke = 3,
  color = '#10b981',
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, percent)) / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <defs>
        <linearGradient id="cg2" x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} cx={0} cy={0} fill="none" stroke="#eef2f7" strokeWidth={stroke} />
        <m.circle
          r={radius}
          cx={0}
          cy={0}
          fill="none"
          stroke="url(#cg2)"
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ rotate: -90, transformOrigin: 'center' }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </g>
    </svg>
  );
}

/* -------------------------
  Frame 1 - MinimalCreditOverview
  (keeps same as your minimal merged card)
--------------------------*/
function StatTile({
  title,
  value,
  sub,
  percent,
  color,
}: {
  title: string;
  value: string | number;
  sub?: string;
  percent?: number;
  color?: string;
}) {
  const display = typeof value === 'number' ? Math.round(value) : value;
  return (
    <div className="flex min-w-[105px] flex-1 items-center justify-between gap-2 rounded-md bg-white/0 p-2">
      <div className="flex flex-col">
        <div className="text-[11px] font-medium text-slate-800">{title}</div>
        <div className="mt-1 text-[15px] leading-none font-medium text-slate-900">{display}</div>
        {sub && <div className="text-muted-foreground mt-0.5 text-[10px]">{sub}</div>}
      </div>

      <div className="flex items-center">
        <div className="h-[40px] w-[40px]">
          <CircularRing percent={percent ?? 0} size={40} stroke={3} color={color ?? '#10b981'} />
        </div>
      </div>
    </div>
  );
}

function BarRow({ label, score, color }: { label: string; score: number; color?: string }) {
  const animated = useAnimatedNumber(score, 700);
  const pct = Math.min(100, Math.max(4, (animated / 850) * 100));
  return (
    <div className="flex w-full items-center gap-3">
      <div className="w-20 text-[11px] font-medium text-slate-800">{label}</div>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f3f4f6]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color ?? '#111827' }}
        />
      </div>

      <div className="w-12 text-right text-[11px] font-medium text-slate-800">
        {Math.round(animated)}
      </div>
    </div>
  );
}

function MinimalCreditOverview({ autoAnimate = true }: { autoAnimate?: boolean }) {
  const targets = {
    score: 750,
    payment: 98,
    utilization: 65,
    defaultProb: 2.5,
    bureau: [
      { label: 'CIBIL', score: 750, color: '#10b981' },
      { label: 'Experian', score: 725, color: '#111827' },
      { label: 'Equifax', score: 738, color: '#111827' },
      { label: 'CRIF', score: 710, color: '#111827' },
    ],
  };

  const animScore = useAnimatedNumber(autoAnimate ? targets.score : 0, 800);
  const animPayment = useAnimatedNumber(autoAnimate ? targets.payment : 0, 800);
  const animUtil = useAnimatedNumber(autoAnimate ? targets.utilization : 0, 800);
  const animDefault = useAnimatedNumber(autoAnimate ? targets.defaultProb : 0, 800);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32 }}
      className="w-full max-w-[500px] rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11px] font-medium text-slate-800">Credit Overview</div>
        <div className="text-muted-foreground text-[10px]">Live • Compact</div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <StatTile
          title="Credit Score"
          value={Math.round(animScore)}
          sub="Excellent"
          percent={(animScore / 850) * 100}
          color="#16a34a"
        />
        <StatTile
          title="Payment Score"
          value={`${Math.round(animPayment)}%`}
          sub="On-time"
          percent={animPayment}
          color="#10b981"
        />
        <StatTile
          title="Utilization"
          value={`${Math.round(animUtil)}%`}
          sub="Moderate"
          percent={animUtil}
          color="#f59e0b"
        />
        <StatTile
          title="Default Risk"
          value={`${animDefault.toFixed(2)}%`}
          sub="Probability"
          percent={100 - Math.min(95, animDefault * 20)}
          color="#059669"
        />
      </div>

      <div>
        <div className="mb-2 text-[11px] font-medium text-slate-800">Bureau Scores</div>
        <div className="flex flex-col gap-2">
          {targets.bureau.map((b) => (
            <BarRow key={b.label} label={b.label} score={b.score} color={b.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------
  Frame 2: View Credit Analysis (from your screenshot text)
  Keep styling like Analysis card — clean paragraphs
--------------------------*/
function CreditAnalysisCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[260px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-3 text-[10px] font-medium">View Credit Analysis</div>

      <div className="text-[12px]">
        <div className="mb-2">
          <span className="font-semibold">Payment History:</span>{' '}
          <span className="text-muted-foreground">
            Excellent track record with 98% on-time payments over the past 24 months. Only 2 late
            payments, both less than 30 days overdue.
          </span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Credit Utilization:</span>{' '}
          <span className="text-muted-foreground">
            Currently at 65% of available credit limits. While this is higher than ideal, it
            reflects the company's growth phase and working capital needs.
          </span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Default Risk Assessment:</span>{' '}
          <span className="text-muted-foreground">
            Low probability of default (2.5%) based on strong cash flows, diversified revenue
            streams, and consistent profitability growth.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------
  Frame 3: Risk Factors (bulleted)
--------------------------*/
function RiskFactorsCard() {
  const factors = [
    'High credit utilization rate (65%)',
    'Working capital constraints indicated by low current ratio',
    'Significant revenue decline in recent year (-50% YoY)',
    'High reliance on debt financing',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[220px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-3 text-[10px] font-medium">Risk Factors</div>

      <ul className="text-muted-foreground list-disc space-y-2 pl-4 text-[13px]">
        {factors.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------------------------
  Frame 4: Recommendations (bulleted)
--------------------------*/
function RecommendationsCard() {
  const recs = [
    'Reduce credit utilization to below 50% through better working capital management',
    'Maintain strong payment history to preserve excellent credit scores',
    'Consider additional equity financing to reduce reliance on debt',
    'Implement revenue growth strategies to improve cash flows',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[220px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-3 text-[10px] font-medium">Recommendations</div>

      <ul className="text-muted-foreground list-disc space-y-2 pl-4 text-[13px]">
        {recs.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------------------------
  Main component — only frames 1..4
--------------------------*/
export default function CreditAssessment() {
  type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4';
  const [step, setStep] = useState<Step>('frame1');

  const durations: Record<Step, number> = {
    frame1: 4200,
    frame2: 4200,
    frame3: 4200,
    frame4: 4200,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame2';
        if (prev === 'frame2') return 'frame3';
        if (prev === 'frame3') return 'frame4';
        return 'frame1';
      });
    }, durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const bgUrl = '/module-animations/credit-assessment-bg.png';

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      <div className="absolute inset-0">
        {/* keep background similar to RiskAssessmentTour */}
        <img
          src={bgUrl}
          alt="background"
          className="h-full w-full object-contain backdrop-opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      <AnimatePresence>
        {step === 'frame1' && (
          <motion.div key="frame1" className="absolute right-6 bottom-6">
            <MinimalCreditOverview />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-6 bottom-6">
            <CreditAnalysisCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-6 bottom-6">
            <RiskFactorsCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame4' && (
          <motion.div key="frame4" className="absolute right-6 bottom-6">
            <RecommendationsCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* tiny dev controls */}
      {/* <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                    onClick={() =>
                        setStep((s) => {
                            if (s === "frame1") return "frame4";
                            if (s === "frame2") return "frame1";
                            if (s === "frame3") return "frame2";
                            return "frame3";
                        })
                    }
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        setStep((s) => {
                            if (s === "frame4") return "frame1";
                            if (s === "frame1") return "frame2";
                            if (s === "frame2") return "frame3";
                            return "frame4";
                        })
                    }
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                >
                    Next
                </button>
            </div> */}
    </div>
  );
}
