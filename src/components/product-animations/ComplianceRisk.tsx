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
  size = 32,
  stroke = 2,
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
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </g>
    </svg>
  );
}

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
    <div className="flex min-w-[95px] flex-1 items-center justify-between gap-1.5 rounded bg-white/0 p-2">
      <div className="flex flex-col">
        <div className="text-[9px] font-medium text-slate-700">{title}</div>
        <div className="mt-0.5 text-[13px] leading-none font-semibold text-slate-900">
          {display}
        </div>
        {sub && <div className="text-muted-foreground mt-0.5 text-[8px]">{sub}</div>}
      </div>
      <div className="flex items-center">
        <CircularRing percent={percent ?? 0} size={32} stroke={2} color={color ?? '#10b981'} />
      </div>
    </div>
  );
}

function BarRow({ label, score, color }: { label: string; score: number; color?: string }) {
  const animated = useAnimatedNumber(score, 700);
  const pct = Math.min(100, Math.max(0, animated));

  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-20 text-[9px] font-medium text-slate-700">{label}</div>

      <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#f3f4f6]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color ?? '#111827' }}
        />
      </div>

      <div className="w-10 text-right text-[9px] font-medium text-slate-700">
        {Math.round(animated)}
      </div>
    </div>
  );
}

function MinimalComplianceOverview({ autoAnimate = true }: { autoAnimate?: boolean }) {
  const targets = {
    overall: 92,
    audit: 95,
    violations: 0,
    training: 98,
    framework: [
      { label: 'Regulatory Compliance', score: 95, color: '#10b981' },
      { label: 'Risk Assessment', score: 88, color: '#111827' },
      { label: 'Policy Management', score: 92, color: '#111827' },
      { label: 'Documentation', score: 94, color: '#111827' },
    ],
  };

  const animOverall = useAnimatedNumber(autoAnimate ? targets.overall : 0, 700);
  const animAudit = useAnimatedNumber(autoAnimate ? targets.audit : 0, 700);
  const animViolations = useAnimatedNumber(autoAnimate ? targets.violations : 0, 700);
  const animTraining = useAnimatedNumber(autoAnimate ? targets.training : 0, 700);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-[450px] rounded-md bg-white/95 p-2.5 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-1 flex items-center justify-between">
        <div className="text-[10px] font-medium text-slate-700">Compliance Overview</div>
      </div>

      {/* Top stats */}
      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <StatTile
          title="Overall Compliance"
          value={`${Math.round(animOverall)}%`}
          sub="Excellent"
          percent={animOverall}
          color="#16a34a"
        />
        <StatTile
          title="Audit Score"
          value={`${Math.round(animAudit)}%`}
          sub="Clean Audits"
          percent={animAudit}
          color="#10b981"
        />
        <StatTile
          title="Violations"
          value={Math.round(animViolations)}
          sub="No Major Issues"
          percent={animViolations}
          color="#f59e0b"
        />
        <StatTile
          title="Training Compliance"
          value={`${Math.round(animTraining)}%`}
          sub="Staff Trained"
          percent={animTraining}
          color="#059669"
        />
      </div>

      {/* Framework bars */}
      <div>
        <div className="mb-1 text-[10px] font-medium text-slate-700">
          Compliance Framework Overview
        </div>
        <div className="flex flex-col gap-1.5">
          {targets.framework.map((f) => (
            <BarRow key={f.label} label={f.label} score={f.score} color={f.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ComplianceAnalysisCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.985 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="max-h-[220px] w-full max-w-[420px] overflow-y-auto rounded-md bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[9px] font-medium text-slate-700">View Compliance Analysis</div>

      <div className="space-y-1.5 text-[10px] leading-snug text-slate-700">
        <div>
          <span className="font-semibold text-slate-800">Regulatory Compliance:</span> Maintains
          high compliance with all applicable regulations. Regular updates to policies and
          procedures ensure alignment with changing requirements.
        </div>

        <div>
          <span className="font-semibold text-slate-800">Audit Performance:</span> Clean audit
          reports with minor recommendations. All previous audit findings have been addressed and
          closed.
        </div>

        <div>
          <span className="font-semibold text-slate-800">Risk Management:</span> Proactive risk
          assessment and mitigation strategies in place. Regular reviews and updates to risk
          management framework.
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------
  Recent Updates (bulleted)
--------------------------*/
function RecentUpdates() {
  const factors = [
    'Updated environmental compliance policies',
    'Enhanced data protection measures implemented',
    'New staff training modules on regulatory changes',
    'Quarterly compliance review completed',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.985 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="max-h-[200px] w-full max-w-[420px] overflow-y-auto rounded-md bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[9px] font-medium text-slate-700">Recent Updates</div>

      <ul className="list-disc space-y-1.5 pl-4 text-[10px] leading-snug text-slate-700">
        {factors.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------------------------
  Recommendations (bulleted)
--------------------------*/
function RecommendationsCard() {
  const recs = [
    'Enhance monitoring of emerging regulatory requirements',
    'Strengthen documentation processes for policy updates',
    'Increase frequency of internal compliance audits',
    'Develop additional training modules for specific departments',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.985 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="max-h-[200px] w-full max-w-[420px] overflow-y-auto rounded-md bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[9px] font-medium text-slate-700">Recommendations</div>

      <ul className="list-disc space-y-1.5 pl-4 text-[10px] leading-snug text-slate-700">
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
export default function ComplianceRisk() {
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

  const bgUrl = '/module-animations/compliance-risk-bg.png';

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
            <MinimalComplianceOverview />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-6 bottom-6">
            <ComplianceAnalysisCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-6 bottom-6">
            <RecentUpdates />
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
    </div>
  );
}
