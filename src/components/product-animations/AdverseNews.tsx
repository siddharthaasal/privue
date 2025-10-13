// ComplianceRisk_with_embedded_bg.tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { motion as m } from 'framer-motion';

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

function AnimatedNumber({
  value,
  duration = 100,
  format = (v: number) => String(Math.round(v)),
}: {
  value: number;
  duration?: number;
  format?: (v: number) => string;
}) {
  const n = useAnimatedNumber(value, duration);
  return <>{format(n)}</>;
}

// StatCard (adjusted to be full-width-friendly)
function StatCard({
  title,
  big,
  subtitle,
  percent,
  accent = '#111827',
}: {
  title: string;
  big: React.ReactNode;
  subtitle?: React.ReactNode;
  percent?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24 }}
      className="flex w-full items-center gap-2.5 rounded-lg bg-white/95 p-3 shadow-sm"
      aria-live="polite"
    >
      <div className="min-w-0 flex-1">
        {/* Title */}
        <div className="text-[11px] leading-tight font-medium text-slate-700">{title}</div>

        {/* Big Number */}
        <div className="mt-1 truncate text-[18px] leading-tight font-semibold text-slate-900">
          {big}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div className="text-muted-foreground mt-0.5 text-[10px] leading-snug">{subtitle}</div>
        )}
      </div>

      {/* Ring (optional) */}
      {typeof percent === 'number' && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
          <CircularRing percent={percent} size={28} stroke={2} color={accent} />
        </div>
      )}
    </motion.div>
  );
}

// Frame 1: compact layout with max width 500px
function Frame1StatsOverview({ autoAnimate = true }: { autoAnimate?: boolean }) {
  const targets = {
    articles: 5,
    negative: 4,
    negativePct: 80,
    highRisk: 2,
    mediaPct: 85,
    mediaDelta: 15,
  };

  const aArticles = useAnimatedNumber(autoAnimate ? targets.articles : 0, 700);
  const aNegative = useAnimatedNumber(autoAnimate ? targets.negative : 0, 700);
  const aHighRisk = useAnimatedNumber(autoAnimate ? targets.highRisk : 0, 700);
  const aMediaPct = useAnimatedNumber(autoAnimate ? targets.mediaPct : 0, 900);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.998 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.995 }}
      transition={{ duration: 0.28 }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm" aria-live="polite"
    >
      <div className="flex gap-1.5">
        {/* Card 1: Total Articles */}
        <StatCard
          title="Total Articles"
          big={<AnimatedNumber value={aArticles} format={(v) => String(Math.round(v))} />}
          subtitle="Last 30 days"
          accent="#111827"
        />

        {/* Card 2: Negative Sentiment */}
        <StatCard
          title="Negative Sentiment"
          big={<AnimatedNumber value={aNegative} format={(v) => String(Math.round(v))} />}
          subtitle={`${targets.negativePct}% of total`}
          percent={targets.negativePct}
          accent="#ef4444"
        />
      </div>

      {/* Card 3: High Risk */}
      <div className="flex gap-1.5">
        <StatCard
          title="High Risk"
          big={<AnimatedNumber value={aHighRisk} format={(v) => String(Math.round(v))} />}
          subtitle="Immediate attention"
          accent="#f97316"
        />

        {/* Card 4: Media Coverage */}
        <StatCard
          title="Media Coverage"
          big={<AnimatedNumber value={aMediaPct} format={(v) => `${Math.round(Number(v))}%`} />}
          subtitle={
            <span className="text-[10px] leading-tight text-red-600">
              <span className="inline-block align-middle">↑ {targets.mediaDelta}%</span>{' '}
              <span className="text-muted-foreground">vs last month</span>
            </span>
          }
          percent={targets.mediaPct}
          accent="#dc2626"
        />
      </div>
    </motion.div>
  );
}

/* -------------------------
  Frame 2: Minimal Recent News
  (based on provided screenshot, simplified)
--------------------------*/

function NewsCard({
  title,
  source,
  date,
  summary,
  tags,
  sentiment,
  risk,
}: {
  title: string;
  source: string;
  date: string;
  summary: string;
  tags: string[];
  sentiment: 'positive' | 'negative';
  risk: 'low' | 'medium' | 'high';
}) {
  const sentimentColor =
    sentiment === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600';

  const riskColor =
    risk === 'low'
      ? 'bg-green-50 text-green-600'
      : risk === 'medium'
        ? 'bg-yellow-50 text-yellow-600'
        : 'bg-red-50 text-red-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-1.5 rounded border border-slate-200 bg-white p-2.5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-1.5">
        <div className="text-[11px] leading-snug font-medium text-slate-900">{title}</div>
        <div className="flex shrink-0 gap-1 text-[9px]">
          <span className={`rounded-full px-1.5 py-0.5 ${sentimentColor}`}>{sentiment}</span>
          <span className={`rounded-full px-1.5 py-0.5 ${riskColor}`}>{risk} risk</span>
        </div>
      </div>

      {/* Source + Date */}
      <div className="flex flex-wrap items-center gap-1 text-[9px] text-slate-500">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5">
          {source}
        </span>
        <span>{date}</span>
      </div>

      {/* Summary */}
      <div className="text-[10px] leading-snug text-slate-700">{summary}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 text-[9px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Frame2NewsOverview() {
  const news = [
    // {
    //   title: "Company Faces Labor Dispute Over Working Conditions",
    //   sentiment: "negative" as const,
    //   risk: "high" as const,
    //   source: "Business Herald",
    //   date: "Jan 15, 2024",
    //   summary:
    //     "Workers union raises concerns about workplace safety and overtime compensation policies affecting 200+ employees.",
    //   tags: ["Labor Relations", "Workplace Safety"],
    // },
    {
      title: 'Environmental Compliance Issues Under Investigation',
      sentiment: 'negative' as const,
      risk: 'medium' as const,
      source: 'Industry Times',
      date: 'Jan 12, 2024',
      summary:
        'Regulatory authorities investigating potential violations of environmental standards at manufacturing facility.',
      tags: ['Environmental', 'Regulatory'],
    },
    // {
    //   title: "Company Announces New Sustainability Initiative",
    //   sentiment: "positive" as const,
    //   risk: "low" as const,
    //   source: "Green Business Today",
    //   date: "Jan 10, 2024",
    //   summary:
    //     "Launch of comprehensive carbon reduction program targeting 30% emissions decrease by 2025.",
    //   tags: ["Sustainability", "ESG"],
    // },
    {
      title: 'Financial Irregularities Prompt Internal Audit',
      sentiment: 'negative' as const,
      risk: 'high' as const,
      source: 'Financial Express',
      date: 'Jan 8, 2024',
      summary:
        'Board initiates comprehensive internal audit following discrepancies in quarterly financial reporting.',
      tags: ['Financial', 'Governance'],
    },
    // {
    //   title: "Tax Assessment Dispute Escalates to Tribunal",
    //   sentiment: "negative" as const,
    //   risk: "medium" as const,
    //   source: "Tax & Legal News",
    //   date: "Jan 5, 2024",
    //   summary:
    //     "Company challenges INR 2.5 crore tax demand in appellate tribunal, citing procedural violations.",
    //   tags: ["Tax", "Legal"],
    // },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.995 }}
      transition={{ duration: 0.25 }}
      className="max-h-[280px] md:max-h-[340px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm" aria-live="polite"
    >
      <div className="mb-0.5 text-[9px] font-medium text-slate-600">Recent News</div>
      {news.map((n, i) => (
        <NewsCard key={i} {...n} />
      ))}
    </motion.div>
  );
}

/* -------------------------
  Frame 3: Potential Impact Assessment (minimal)
--------------------------*/

function AlertIcon({ className = 'w-4 h-4 flex-shrink-0' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.5L22 19H2L12 2.5z" fill="none" stroke="#ef4444" strokeWidth="1.4" />
      <circle cx="12" cy="16" r="0.9" fill="#ef4444" />
      <rect x="11.3" y="8.5" width="1.4" height="5.2" rx="0.7" fill="#ef4444" />
    </svg>
  );
}

function Frame3ImpactOverview() {
  const items = [
    'Regulatory scrutiny and potential penalties',
    'Reputational damage affecting customer trust',
    'Operational disruptions from labor disputes',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.25 }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm" aria-live="polite"
    >
      {/* Section Title */}
      <div className="mb-2 text-[10px] font-medium text-slate-600">Potential Impact Assessment</div>

      {/* Subheading */}
      <div className="mb-1.5 text-[11px] font-semibold text-slate-800">Immediate Risks</div>

      {/* List */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="m-0 flex list-none flex-col gap-1.5 p-0"
      >
        {items.map((t, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, y: 5 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-start gap-2 text-[10px] text-slate-700"
          >
            <div className="mt-0.5 shrink-0">
              <AlertIcon className="h-3 w-3 text-red-500" />
            </div>
            <div className="leading-snug">{t}</div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* -------------------------
  Frame 4: Mitigation Strategies (minimal)
--------------------------*/

function InfoIcon({ className = 'w-4 h-4 flex-shrink-0' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.6" />
      <circle cx="12" cy="8" r="1.2" fill="#3b82f6" />
      <rect x="11.2" y="11" width="1.6" height="6" rx="0.8" fill="#3b82f6" />
    </svg>
  );
}

function Frame4MitigationOverview() {
  const strategies = [
    'Proactive stakeholder engagement and communication',
    'Enhanced compliance monitoring and reporting',
    'Crisis communication and reputation management',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.25 }}
      className="max-h-[280px] md:max-h-[280px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm" aria-live="polite"
    >
      {/* Title */}
      <div className="mb-2 text-[11px] font-semibold text-slate-800">Mitigation Strategies</div>

      {/* List */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="m-0 flex list-none flex-col gap-1.5 p-0"
      >
        {strategies.map((s, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, y: 5 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-start gap-2 text-[10px] text-slate-700"
          >
            <div className="mt-0.5 shrink-0">
              <InfoIcon className="h-3 w-3 text-blue-500" />
            </div>
            <div className="leading-snug">{s}</div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function AdverseNews() {
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

  // data URL embedded directly so the component doesn't rely on external path
  const bgUrl = '/module-animations/adverse-news-bg.png';
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      <div className="absolute inset-0">
        {/* background now uses embedded data URL */}
        <img
          src={bgUrl}
          alt="background"
          className="h-full w-full object-cover backdrop-opacity-90"
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
          <motion.div key="frame1" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame1StatsOverview />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame2NewsOverview />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame3ImpactOverview />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame4' && (
          <motion.div key="frame4" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame4MitigationOverview />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
