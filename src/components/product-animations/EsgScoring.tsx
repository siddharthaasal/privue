import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

/* ---------- tiny count-up hook ---------- */
function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const diff = target - from;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const cur = Math.round(from + diff * p);
      setValue(cur);
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  return value;
}

/* ---------- types & variants ---------- */
type Row = { id: string; label: string; companyScore: number; industryAvg: number };
type TableData = { title: string; rows: Row[] };

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

const fillVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: (p = 0.7) => ({ scaleX: p, transition: { duration: 0.6, ease: [0.2, 0.9, 0.2, 1] } }),
};

/* ---------- compact table component ---------- */
function EsgTable({ title, rows }: TableData) {
  const maxScore = 100;

  return (
    <div
      className="max-h-[280px] max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-1">
        <h4 className="text-[12px] font-medium text-slate-900">{title}</h4>
      </div>

      <div className="grid grid-cols-[1fr_70px_70px] items-start gap-1 px-1">
        <div className="text-[8px] text-slate-500">Dimensions</div>
        <div className="text-right text-[8px] text-slate-500">Company</div>
        <div className="text-right text-[8px] text-slate-500">Industry</div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="mt-1 flex flex-col divide-y divide-slate-100"
      >
        {rows.map((r) => {
          const companyProgress = Math.max(0, Math.min(1, r.companyScore / maxScore));
          return (
            <motion.div
              key={r.id}
              variants={rowVariants}
              className="grid grid-cols-[1fr_70px_70px] items-center gap-1 px-1 py-1"
            >
              <div className="text-[10px] text-slate-800">{r.label}</div>

              <div className="relative text-right text-[10px] font-medium text-slate-800 tabular-nums">
                <ScoreCounter target={r.companyScore} />
                <motion.div
                  className="absolute inset-y-0 left-0 h-full rounded-r bg-slate-50"
                  style={{ transformOrigin: 'left center', zIndex: -1 }}
                  variants={fillVariants}
                  custom={companyProgress}
                  aria-hidden
                />
              </div>

              <div className="text-right text-[10px] text-slate-600 tabular-nums">
                {r.industryAvg}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ---------- score counter ---------- */
function ScoreCounter({ target }: { target: number }) {
  const v = useCountUp(target, 640);
  return <span>{v}</span>;
}

/* ---------- realistic dummy datasets for three tables ---------- */
const environmentData: TableData = {
  title: 'Environment Score',
  rows: [
    { id: 'bm', label: 'GHG Emissions & Carbon Footprint', companyScore: 68, industryAvg: 6 },
    { id: 'env', label: 'Energy Management', companyScore: 72, industryAvg: 7 },
    { id: 'lg', label: 'Water Management', companyScore: 65, industryAvg: 6 },
    { id: 'hc', label: 'Waste & Pollution Management', companyScore: 61, industryAvg: 5 },
    { id: 'sc', label: 'Biodiversity & Land Use', companyScore: 66, industryAvg: 6 },
    { id: 'sc', label: 'Product Lifecycle & Circular Economy', companyScore: 86, industryAvg: 6 },
  ],
};

const socialData: TableData = {
  title: 'Social Score',
  rows: [
    { id: 'bm', label: 'Labor Practices', companyScore: 70, industryAvg: 7 },
    { id: 'env', label: 'Diversity, Equity & Inclusion (DEI)', companyScore: 60, industryAvg: 6 },
    { id: 'lg', label: 'Employee Engagement & Training', companyScore: 68, industryAvg: 6 },
    { id: 'hc', label: 'Human Rights in Supply Chain', companyScore: 75, industryAvg: 8 },
    { id: 'sc', label: 'Customer Welfare & Product Safety', companyScore: 72, industryAvg: 7 },
    { id: 'sc', label: 'Community Engagement', companyScore: 82, industryAvg: 7 },
  ],
};

const governanceData: TableData = {
  title: 'Governance Score',
  rows: [
    { id: 'bm', label: 'Board Structure & Independence', companyScore: 64, industryAvg: 5 },
    { id: 'env', label: 'Executive Compensation & ESG Alignment', companyScore: 58, industryAvg: 5 },
    { id: 'lg', label: 'Shareholder Rights & Transparency', companyScore: 74, industryAvg: 7 },
    { id: 'hc', label: 'Ethics & Anti-Corruption', companyScore: 62, industryAvg: 5 },
    { id: 'sc', label: 'Risk Management & Internal Controls', companyScore: 66, industryAvg: 6 },
    { id: 'sc', label: 'Innovation & Business Model Resilience', companyScore: 86, industryAvg: 6 },
  ],
};

type Scores = {
  environment: number;
  social: number;
  governance: number;
  industryPercentile?: string | number;
};

const DEFAULT: Scores = {
  environment: 67,
  social: 72,
  governance: 65,
  industryPercentile: '46th',
};

/* ---------- Component ---------- */
function EsgOverviewRecharts({ scores = DEFAULT }: { scores?: Scores }) {
  const { environment, social, governance, industryPercentile } = scores;

  // Data for recharts pie
  const pieData = useMemo(
    () => [
      { name: 'Environment', value: environment },
      { name: 'Social', value: social },
      { name: 'Governance', value: governance },
    ],
    [environment, social, governance],
  );

  const COLORS = ['#0f172a', '#d6a04a', '#5b8ef3'];

  const avg = Math.round((environment + social + governance) / 3);
  const centerValue = useCountUp(avg, 700);

  return (
    <div className="max-h-[280px] max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="flex gap-2">
        {/* donut area */}
        <div className="relative flex h-[150px] w-[150px] flex-shrink-0 items-center justify-center">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              {/* thin background track */}
              <Pie
                data={[{ value: 1 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={56}
                startAngle={90}
                endAngle={-270}
                stroke="rgba(15,23,42,0.06)"
                strokeWidth={12}
                paddingAngle={0}
                isAnimationActive={false}
              />
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={56}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {pieData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* center */}
          <div
            className="pointer-events-none absolute flex flex-col items-center justify-center"
            style={{ width: 140, height: 140 }}
          >
            <div className="text-[12px] leading-none font-semibold text-slate-900 tabular-nums">
              {centerValue}
            </div>
            <div className="text-[8px] text-slate-500">ESG Score</div>
          </div>
        </div>

        {/* right summary */}
        <div className="flex flex-1 flex-col items-start justify-between pt-0">
          <div className="mb-1 flex items-center gap-1">
            <div className="text-[12px] text-slate-500">Industry Percentile:</div>
            <div className="text-[12px] text-slate-900 tabular-nums">{industryPercentile}</div>
          </div>

          <div className="space-y-1">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28 }}
                className="flex items-start gap-1.5"
              >
                <div className="text-[10px] text-slate-700">Environment</div>
                <div className="text-[10px] text-slate-900 tabular-nums">{environment}/100</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: 0.08 }}
                className="flex items-start gap-1.5"
              >
                <div className="text-[10px] text-slate-700">Social</div>
                <div className="text-[10px] text-slate-900 tabular-nums">{social}/100</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: 0.16 }}
                className="flex items-start gap-1.5"
              >
                <div className="text-[10px] text-slate-700">Governance</div>
                <div className="text-[10px] text-slate-900 tabular-nums">{governance}/100</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center gap-2 text-[8px] text-slate-500">
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-[#0f172a]" />
              <span>Environment</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-[#d6a04a]" />
              <span>Social</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-[#5b8ef3]" />
              <span>Governance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// EsgHistoricalFrame.tsx

/**
 * Minimal, crisp Historical ESG Performance chart using Recharts.
 * - max width 500px
 * - small fonts, thin visuals
 * - smooth (monotone) lines
 * - dashed vertical marker at 'Jul' with a red point
 */

// const spikierData = [
//   { month: 'Jan', env: 52, soc: 65, gov: 58 },
//   { month: 'Feb', env: 58, soc: 72, gov: 72 },
//   { month: 'Mar', env: 49, soc: 60, gov: 68 },
//   { month: 'Apr', env: 32, soc: 39, gov: 52 },
//   { month: 'May', env: 28, soc: 36, gov: 42 },
//   { month: 'Jun', env: 48, soc: 41, gov: 44 },
//   { month: 'Jul', env: 74, soc: 66, gov: 60 },
//   { month: 'Aug', env: 72, soc: 66, gov: 60 },
//   { month: 'Sep', env: 66, soc: 62, gov: 64 },
//   { month: 'Oct', env: 54, soc: 48, gov: 58 },
//   { month: 'Nov', env: 40, soc: 36, gov: 44 },
//   { month: 'Dec', env: 28, soc: 30, gov: 32 },
// ];
const spikierData = [
  { month: 2020, env: 42, soc: 50, gov: 47 },
  { month: 2021, env: 45, soc: 53, gov: 49 },
  { month: 2022, env: 48, soc: 55, gov: 52 },
  { month: 2023, env: 51, soc: 57, gov: 54 },
  { month: 2024, env: 54, soc: 60, gov: 57 },
];

const COLORS = {
  env: '#0f172a',
  soc: '#d6a04a',
  gov: '#5b8ef3',
};

function EsgHistoricalStaggered() {
  const baseDelay = 0;
  const stepDelay = 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="max-h-[280px] w-[350px] sm:max-w-[440px] origin-bottom-right scale-[0.75] sm:scale-[0.9] md:scale-100 p-4 overflow-y-auto rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-1 text-[11px] font-medium text-slate-900">Historical ESG Performance</div>

      <div style={{ width: '100%', height: 160 }} className="items-start">
        <ResponsiveContainer>
          <LineChart data={spikierData} margin={{ top: 4, right: 6, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="#f8fafc" vertical={false} strokeDasharray="2 6" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#64748b' }}
              padding={{ left: 6, right: 6 }}
            />

            <YAxis
              domain={[20, 80]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              ticks={[30, 45, 60, 75]}
            />

            <Tooltip
              wrapperStyle={{ fontSize: 10 }}
              contentStyle={{ padding: '6px 8px', borderRadius: 6, fontSize: 10 }}
            />

            {/* Staggered lines: animationBegin offsets (ms) */}
            <Line
              type="monotone"
              dataKey="gov"
              stroke={COLORS.gov}
              strokeWidth={1.6}
              dot={true}
              activeDot={{ r: 3.5 }}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={baseDelay + stepDelay * 0}
              strokeLinecap="round"
            />

            <Line
              type="monotone"
              dataKey="soc"
              stroke={COLORS.soc}
              strokeWidth={1.6}
              dot={true}
              activeDot={{ r: 3.5 }}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={baseDelay + stepDelay * 1}
              strokeLinecap="round"
            />

            <Line
              type="monotone"
              dataKey="env"
              stroke={COLORS.env}
              strokeWidth={1.6}
              dot={true}
              activeDot={{ r: 3.5 }}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={baseDelay + stepDelay * 2}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-600">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm" style={{ background: COLORS.env }} />
          <span>Environment</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm" style={{ background: COLORS.soc }} />
          <span>Social</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm" style={{ background: COLORS.gov }} />
          <span>Governance</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EsgScoring() {
  const bgUrl = '/module-animations/esg-scoring-bg-2.png';

  type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 4000,
    frame2: 3000,
    frame3: 3000,
    frame4: 5000,
    frame5: 4500,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame2';
        if (prev === 'frame2') return 'frame3';
        if (prev === 'frame3') return 'frame4';
        if (prev === 'frame4') return 'frame5';
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
          <motion.div key="frame1" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <EsgTable {...environmentData} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <EsgTable {...socialData} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <EsgTable {...governanceData} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame4' && (
          <motion.div key="frame4" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <EsgOverviewRecharts />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame5' && (
          <motion.div key="frame5" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <EsgHistoricalStaggered />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional tiny controls for testing — remove if you want purely automatic cycling */}
      {/* <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() =>
            setStep((s) => (s === 'frame1' ? 'frame3' : s === 'frame2' ? 'frame1' : 'frame2'))
          }
          className="rounded bg-white/80 px-2 py-1 text-xs shadow-sm"
          aria-label="Prev frame"
        >
          Prev
        </button>
        <button
          onClick={() =>
            setStep((s) => (s === 'frame1' ? 'frame2' : s === 'frame2' ? 'frame3' : 'frame1'))
          }
          className="rounded bg-white/80 px-2 py-1 text-xs shadow-sm"
          aria-label="Next frame"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
