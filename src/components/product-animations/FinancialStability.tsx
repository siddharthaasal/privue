import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const leftData = [
  { year: '2021', current: 0.7, quick: 0.05, de: 2.0, at: 1.0 },
  { year: '2022', current: 0.9, quick: 0.03, de: 5.0, at: 4.8 },
  { year: '2023', current: 0.6, quick: 0.01, de: 2.2, at: 2.8 },
];

const rightData = [
  { year: '2021', icr: 36 },
  { year: '2022', icr: 7.5 },
  { year: '2023', icr: 3.2 },
];

function FinancialMetricsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.36, ease: 'easeOut' }}
      className="h-[240px] w-[460px] rounded-lg bg-white/95 p-2 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-1 text-[10px] font-medium">Key Financial Metrics</div>

      <div className="flex h-[190px] gap-0">
        {/* left chart */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leftData} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="#e8e8e8" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 8, fill: '#71717a' }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#71717a' }} />
                <Tooltip contentStyle={{ fontSize: 9, padding: '4px 6px' }} />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#ef4444"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="quick"
                  stroke="#059669"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="de"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="at"
                  stroke="#f97316"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* compact legend — each item is its own flex item */}
          <div className="mt-0.5 flex w-full justify-center">
            <div className="flex gap-3 text-[8.5px]">
              <div className="flex items-center gap-1 leading-none whitespace-nowrap">
                <span className="inline-block h-2 w-2 rounded-sm bg-[#ef4444]" />
                <span>Current</span>
              </div>

              <div className="flex items-center gap-1 leading-none whitespace-nowrap">
                <span className="inline-block h-2 w-2 rounded-sm bg-[#059669]" />
                <span>Quick</span>
              </div>

              <div className="flex items-center gap-1 leading-none whitespace-nowrap">
                <span className="inline-block h-2 w-2 rounded-sm bg-[#f59e0b]" />
                <span>D/E</span>
              </div>

              <div className="flex items-center gap-1 leading-none whitespace-nowrap">
                <span className="inline-block h-2 w-2 rounded-sm bg-[#f97316]" />
                <span>A/T</span>
              </div>
            </div>
          </div>
        </div>

        {/* right chart */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rightData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <CartesianGrid stroke="#e8e8e8" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 8, fill: '#71717a' }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#71717a' }} />
                <Tooltip contentStyle={{ fontSize: 9, padding: '4px 6px' }} />
                <Line
                  type="monotone"
                  dataKey="icr"
                  stroke="#0f172a"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-0.5 flex w-full justify-center">
            <div className="flex gap-3 text-[8.5px]">
              <div className="flex items-center gap-1 leading-none whitespace-nowrap">
                <span className="inline-block h-2 w-2 rounded-sm bg-[#0f172a]" />
                <span>ICR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const chartData = [
  { year: '2021', revenue: 0.85, ebitda: 20, pat: 10 },
  { year: '2022', revenue: 2.8, ebitda: 50, pat: 25 },
  { year: '2023', revenue: 3.4, ebitda: 80, pat: 35 },
];

function FinancialChartCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-[240px] w-[420px] rounded-lg bg-white/95 p-2 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-1 text-[10px] font-medium">Financial Performance</div>
      <ResponsiveContainer width="100%" height="92%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ebitda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="year"
            stroke="#9ca3af"
            tick={{ fontSize: 9, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="#9ca3af"
            tick={{ fontSize: 9, fill: '#6b7280' }}
            tickFormatter={(v) => `₹${v}\u00A0Cr.`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            tick={{ fontSize: 9, fill: '#6b7280' }}
            tickFormatter={(v) => `₹${v}\u00A0Cr.`}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{ fontSize: '10px', padding: '4px 6px' }}
            itemStyle={{ fontSize: '9px' }}
            labelStyle={{ fontSize: '9px' }}
          />
          <Legend wrapperStyle={{ fontSize: '9px', marginTop: -4 }} iconSize={8} />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="#ef4444"
            fill="url(#rev)"
            name="Revenue"
            strokeWidth={1}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="ebitda"
            stroke="#0d9488"
            fill="url(#ebitda)"
            name="EBITDA"
            strokeWidth={1}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="pat"
            stroke="#1e3a8a"
            fill="url(#pat)"
            name="PAT"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

function DetailedAnalysisCard() {
  const points = [
    {
      title: 'Revenue Decline',
      text: "The company's total revenue dropped sharply from INR 689.02 crores in 2022 to INR 345.77 crores in 2023, a 50% decline. This reduction may indicate challenges in market demand, competitive pressures, or operational constraints.",
    },
    {
      title: 'Profitability Increase',
      text: 'Despite the revenue decline, Profit After Tax (PAT) increased from INR 11.06 crores to INR 15.88 crores, suggesting improved cost management and operational efficiencies.',
    },
    {
      title: 'EBITDA Margin Improvement',
      text: 'The EBITDA margin jumped from 2.93% to 9.64%, reflecting a more efficient cost structure or a shift towards higher-margin revenue streams.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[260px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-2 text-[10px] font-medium">Detailed Analysis</div>
      <div className="flex flex-col gap-2">
        {points.map((p, i) => (
          <div key={i} className="text-[9.5px] leading-snug">
            <span className="font-semibold">{p.title}: </span>
            <span className="text-muted-foreground">{p.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MetricsAnalysisCard() {
  const items = [
    {
      title: 'Current Ratio Decline (0.76 to 0.58)',
      text: 'A current ratio below 1 indicates that current liabilities exceed current assets, posing short-term liquidity concerns.',
    },
    {
      title: 'Quick Ratio at 0.03',
      text: 'A quick ratio this low suggests extreme liquidity risk — the company has very limited liquid assets (cash or receivables) to meet short-term obligations.',
    },
    {
      title: 'Interest Coverage Ratio Drop (6.20 to 3.14)',
      text: "The company's ability to cover interest payments has weakened, indicating debt servicing could become a concern if earnings decline further.",
    },
    {
      title: 'Total Debt',
      text: 'INR 81.54 crores, with no repayments in the last five years — suggests heavy reliance on debt financing.',
    },
    {
      title: 'Debt-to-Equity Ratio Improvement (5.06 to 2.81)',
      text: 'While leverage remains high, the reduction indicates improved solvency.',
    },
    {
      title: 'Asset Turnover Decline (5.19 to 2.29)',
      text: 'The company is generating less revenue per unit of assets, signaling inefficient asset utilization.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[300px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[10px] font-medium">View Metrics Analysis</div>

      <div className="flex flex-col gap-2 text-[9.5px]">
        {items.map((it, idx) => (
          <div key={idx} className="leading-snug">
            <span className="font-semibold">{it.title}: </span>
            <span className="text-muted-foreground">{it.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const rows = [
  {
    key: 'netRevenue',
    label: 'Net Revenue',
    values: { '2023': 345.8, '2022': 689.0 },
    growthPercent: '-49.82%',
  },
  {
    key: 'ebitda',
    label: 'Operating Profit (EBITDA)',
    values: { '2023': 33.3, '2022': 20.2 },
    growthPercent: '+65.08%',
  },
  {
    key: 'pat',
    label: 'Profit for the Period (PAT)',
    values: { '2023': 15.9, '2022': 11.1 },
    growthPercent: '+43.58%',
  },
  {
    key: 'assets',
    label: 'Total Assets',
    values: { '2023': 382.9, '2022': 319.8 },
    growthPercent: '+19.73%',
  },
  {
    key: 'liabilities',
    label: 'Total Liabilities',
    values: { '2023': 327.2, '2022': 280.0 },
    growthPercent: '+16.87%',
  },
  {
    key: 'equity',
    label: 'Total Equity',
    values: { '2023': 55.7, '2022': 39.8 },
    growthPercent: '+39.91%',
  },
];

// small helper to color the growth chip
function GrowthChip({ value }: { value: string }) {
  const isPos = value.trim().startsWith('+');
  const bg = isPos ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] ${bg} border ${isPos ? 'border-green-100' : 'border-red-100'}`}
      aria-hidden
    >
      {value}
    </span>
  );
}
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      // numeric easing array (cubic-bezier) — satisfies Framer Motion's typing
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function MetricsTableCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32 }}
      className="max-h-[340px] w-[480px] overflow-auto rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-2 text-[10px] font-medium">Detailed Financial Analysis</div>

      <div className="w-full overflow-hidden rounded-sm border border-transparent">
        <div className="text-muted-foreground grid grid-cols-[1fr_90px_90px_80px] items-center gap-2 border-b px-2 py-2 text-[9.5px]">
          <div className="text-[9.5px] font-semibold text-slate-800">Metric</div>
          <div className="text-right font-semibold">2023</div>
          <div className="text-right font-semibold">2022</div>
          <div className="text-right font-semibold">YoY</div>
        </div>

        <motion.div initial="hidden" animate="show" variants={containerVariants}>
          {rows.map((r) => (
            <motion.div
              key={r.key}
              variants={rowVariants}
              className="grid grid-cols-[1fr_90px_90px_80px] items-center gap-2 border-[0.5] border-gray-100 px-2 py-0 even:bg-white/0"
            >
              <div className="text-[9.5px] text-slate-800">{r.label}</div>
              <div className="text-right text-[9.5px] font-medium">
                {' '}
                {Number(r.values['2023']).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{' '}
              </div>
              <div className="text-right text-[9.5px]">
                {' '}
                {Number(r.values['2022']).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{' '}
              </div>
              <div className="text-right">
                <GrowthChip value={r.growthPercent} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function InsightsAnalysisCard() {
  const items = [
    {
      title: 'Revenue Growth Trends',
      text: 'Google Properties has shown consistent YoY growth, accelerating from 16% in 2015 to 24% in 2018. Network revenue growth improved from 3% to 14% over the period.',
    },
    {
      title: 'Geographic Performance Evolution',
      text: 'APAC demonstrated consistently strong growth (27% → 32% in 2016–2018). EMEA showed steady improvement from 15% to 24% in the same period.',
    },
    {
      title: 'Cost Structure Dynamics',
      text: 'TAC costs grew each year, peaking at +53% in 2017 and moderating to +39% in 2018 — indicating evolving partner relationships and margin pressure.',
    },
    {
      title: 'Profitability Patterns',
      text: 'Operating income growth decelerated (23% → 1% by 2018). Net income was volatile with a 35% decline in 2017 followed by exceptional +143% growth in 2018.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-h-[280px] w-[440px] overflow-y-auto rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[10px] font-medium">View Financial Analysis</div>

      <div className="flex flex-col gap-2 text-[9.5px]">
        {items.map((it, idx) => (
          <div key={idx} className="leading-snug">
            <span className="font-semibold">{it.title}: </span>
            <span className="text-muted-foreground">{it.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function RiskAssessmentTour() {
  const bgUrl = '/module-animations/financial-risk-bg.png';

  type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5' | 'frame6';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 4500,
    frame2: 2500,
    frame3: 4500,
    frame4: 2500,
    frame5: 4500,
    frame6: 2500,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame2';
        if (prev === 'frame2') return 'frame3';
        if (prev === 'frame3') return 'frame4';
        if (prev === 'frame4') return 'frame5';
        if (prev === 'frame5') return 'frame6';
        return 'frame1';
      });
    }, durations[step]);

    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      {/* background layer */}
      <div className="absolute inset-0">
        <img src={bgUrl} alt="background" className="h-full w-full object-contain" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(237,242,255,0) 50%, rgba(219,228,255,0.4))',
          }}
        />
      </div>

      {/* overlay frames */}
      <AnimatePresence>
        {step === 'frame1' && (
          <motion.div
            key="frame1"
            className="absolute right-6 bottom-6 rounded-md shadow-xl backdrop-blur-3xl"
          >
            <FinancialChartCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div
            key="frame2"
            className="absolute right-6 bottom-6 rounded-md shadow-lg backdrop-blur-3xl"
          >
            <DetailedAnalysisCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div
            key="frame3"
            className="absolute right-6 bottom-6 rounded-md shadow-lg backdrop-blur-3xl"
          >
            <FinancialMetricsCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame4' && (
          <motion.div
            key="frame4"
            className="absolute right-6 bottom-6 rounded-md shadow-lg backdrop-blur-3xl"
          >
            <MetricsAnalysisCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame5' && (
          <motion.div
            key="frame5"
            className="absolute right-6 bottom-6 rounded-md shadow-lg backdrop-blur-3xl"
          >
            <MetricsTableCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame6' && (
          <motion.div
            key="frame6"
            className="absolute right-6 bottom-6 rounded-md shadow-lg backdrop-blur-3xl"
          >
            <InsightsAnalysisCard />
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
