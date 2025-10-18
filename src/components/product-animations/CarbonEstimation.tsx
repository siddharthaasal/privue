import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const rows = [
  { id: 'electricity', label: 'Electricity:', unit: 'kWh', typeTarget: '2400', typeDelay: 600 },
  { id: 'gas', label: 'Natural Gas:', unit: 'ccf', typeTarget: '320', typeDelay: 1200 },
  { id: 'oil', label: 'Heating Oil:', unit: 'Gallons' },
  { id: 'propane', label: 'Propane:', unit: 'Gallons' },
  { id: 'gasoline', label: 'Gasoline:', unit: 'Gallons' },
  { id: 'diesel', label: 'Diesel:', unit: 'Gallons', typeTarget: '100', typeDelay: 1600 },
];

function BusinessSiteFrame() {
  const [values, setValues] = useState<{ [k: string]: string }>({
    electricity: '0',
    gas: '0',
    oil: '0',
    propane: '0',
    gasoline: '0',
    diesel: '0',
  });

  // track typing state so we can show caret only while typing
  const [typing, setTyping] = useState<{ [k: string]: boolean }>({});

  useEffect(() => {
    const timers: number[] = [];

    const doType = (id: string, target: string, delay: number, speed = 80) => {
      timers.push(
        window.setTimeout(() => {
          setTyping((s) => ({ ...s, [id]: true }));
          // start typing characters one by one
          for (let i = 0; i < target.length; i++) {
            timers.push(
              window.setTimeout(() => {
                setValues((prev) => ({ ...prev, [id]: target.slice(0, i + 1) }));
              }, i * speed),
            );
          }
          // finish typing: clear caret slightly after final char
          timers.push(
            window.setTimeout(
              () => {
                setTyping((s) => ({ ...s, [id]: false }));
                // ensure final value is the full target
                setValues((prev) => ({ ...prev, [id]: target }));
              },
              target.length * speed + 120,
            ),
          );
        }, delay),
      );
    };

    // run typewriter for electricity and gas (others stay zero)
    const e = rows.find((r) => r.id === 'electricity');
    const g = rows.find((r) => r.id === 'gas');
    const d = rows.find((r) => r.id === 'diesel');
    if (e && e.typeTarget) doType(e.id, e.typeTarget, e.typeDelay, 40);
    if (g && g.typeTarget) doType(g.id, g.typeTarget, g.typeDelay, 60);
    if (d && d.typeTarget) doType(d.id, d.typeTarget, d.typeDelay, 80);

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="max-h-[280px] max-w-[440px] origin-bottom-right scale-[0.75] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:scale-100 md:p-3"
    >
      <div className="flex items-baseline justify-between">
        <div className="text-[11px] font-semibold tracking-tight text-slate-800">
          BUSINESS <span className="font-bold">SITE</span>
        </div>
        <div className="text-[9px] text-slate-500">energy usage</div>
      </div>

      <div className="mt-1 mb-2 text-[10px] text-slate-600">
        Enter your business site energy usage
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((r) => {
          // chosen displayed value: append caret '|' while typing for that row
          const isTyping = !!typing[r.id];
          const displayValue = isTyping ? `${values[r.id]}|` : values[r.id];

          return (
            <div key={r.id} className="grid grid-cols-[84px_1fr_76px] items-center gap-2">
              {/* label */}
              <div className="text-[10px] font-medium text-slate-700">{r.label.toUpperCase()}</div>

              {/* input + unit */}
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={displayValue}
                  readOnly
                  className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-800"
                  aria-label={`${r.label} value`}
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    caretColor: 'transparent', // hide native caret
                    lineHeight: '1.05',
                  }}
                />

                <select
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-[9px] text-slate-700"
                  aria-label={`${r.unit} unit select`}
                >
                  <option>{r.unit}</option>
                </select>
              </div>

              {/* frequency */}
              <select
                className="rounded border border-slate-200 bg-white px-2 py-1 text-[9px] text-slate-700"
                aria-label="frequency select"
              >
                <option>per Month</option>
              </select>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// EmissionsFrame.tsx

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
  },
};

const data = [
  {
    scope: 'Scope 2',
    rows: [
      { label: 'Electricity', fy19: '18 tCO2', fy20: '24 tCO2', vs: '35%' },
      { label: 'Water', fy19: '10 tCO2', fy20: '10 tCO2', vs: '0%' },
    ],
    total: { fy19: '28 tCO2', fy20: '34 tCO2', vs: '22%' },
  },
  {
    scope: 'Scope 3',
    rows: [
      { label: 'Materials', fy19: '302 tCO2', fy20: '509 tCO2', vs: '68%' },
      { label: 'Supply-Transport', fy19: '45 tCO2', fy20: '54 tCO2', vs: '20%' },
      { label: 'Commuting', fy19: '53 tCO2', fy20: '79 tCO2', vs: '50%' },
    ],
    total: { fy19: '400 tCO2', fy20: '642 tCO2', vs: '61%' },
  },
];

function EmissionsFrame() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-h-[280px] w-[350px] origin-bottom-right scale-[0.75] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-h-[280px] md:max-w-[440px] md:scale-100 md:p-3"
    >
      <div className="mb-1 text-[11px] font-semibold text-slate-900">
        Total emission per category
      </div>

      <div className="mb-1 grid grid-cols-[1fr_64px_64px_44px] border-b border-slate-100 pb-1 text-[10px] font-medium text-slate-600">
        <div />
        <div className="text-right">FY 19</div>
        <div className="text-right">FY 20</div>
        <div className="text-right">vs Y-1</div>
      </div>

      <div className="space-y-1">
        {data.map((section, si) => (
          <div key={si}>
            <motion.div
              variants={rowVariants}
              className="mb-1 text-[9px] font-medium text-slate-500"
            >
              {section.scope}
            </motion.div>

            <div className="space-y-[2px]">
              {section.rows.map((r, ri) => (
                <motion.div
                  key={ri}
                  variants={rowVariants}
                  className="grid grid-cols-[1fr_64px_64px_44px] items-center py-[4px] text-[10px]"
                >
                  <div className="truncate text-slate-700">{r.label}</div>
                  <div className="text-right text-slate-800">{r.fy19}</div>
                  <div className="text-right text-slate-800">{r.fy20}</div>
                  <div className="text-right text-slate-600">{r.vs}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={rowVariants}
              className="mt-1 grid grid-cols-[1fr_64px_64px_44px] items-center border-t border-slate-100 pt-1 text-[10px] font-semibold"
            >
              <div className="text-slate-800">Total</div>
              <div className="text-right text-slate-900">{section.total.fy19}</div>
              <div className="text-right text-slate-900">{section.total.fy20}</div>
              <div className="text-right text-slate-700">{section.total.vs}</div>
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div
        variants={rowVariants}
        className="mt-2 grid grid-cols-[1fr_64px_64px_44px] items-center border-t border-slate-200 pt-2 text-[11px] font-semibold"
      >
        <div className="text-slate-900">Total</div>
        <div className="text-right text-slate-900">428 tCO2</div>
        <div className="text-right text-slate-900">676 tCO2</div>
        <div className="text-right text-slate-800">58%</div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Waterfall chart implemented with Recharts (stacked bars).
 * - max-w-500 container
 * - very minimal fonts / spacing
 * - subtle animation (recharts)
 *
 * Data here is dummy but consistent with earlier frames:
 * FY19 baseline = 428 tCO2
 * adjustments = Electricity +24, Water +0, Materials +207, Supply +9, Commuting +8
 * FY20 total = 676 tCO2
 */

const RAW = [
  { key: 'FY19', type: 'total', value: 350 }, // baseline (not too tall)
  { key: 'Electricity', type: 'adj', value: 38 }, // moderate increase
  { key: 'Water', type: 'adj', value: 8 }, // small adjustment (exception)
  { key: 'Materials', type: 'adj', value: 145 }, // larger adjustment (exception)
  { key: 'Supply-Transport', type: 'adj', value: 52 }, // moderate
  { key: 'Commuting', type: 'adj', value: 27 }, // small–moderate
  { key: 'FY20', type: 'total', value: 620 }, // final total (~baseline + adjustments)
];

const COLORS = {
  baseline: 'rgba(16,185,129,0.14)', // light green block for totals (very subtle)
  totalText: '#064E3B', // darker text on totals
  positive: '#16a34a', // adjustment bar green
  axis: '#94a3b8',
  grid: '#f1f5f9',
};

function prepareWaterfall(data: typeof RAW) {
  // For waterfall using stacked bars:
  // each data point will have: offset (invisible), val (visible)
  // cumulative starts at 0 for the chart baseline; for FY19 total we render its full height.
  const out: Array<Record<string, any>> = [];
  let cumulative = 0;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.type === 'total' && i === 0) {
      // FY19 baseline: show as a block from 0..value
      cumulative = d.value;
      out.push({
        name: d.key,
        offset: 0,
        val: d.value,
        isTotal: true,
      });
      continue;
    }

    if (d.type === 'adj') {
      // adjustment: show bar starting from current cumulative
      // offset = cumulative, val = difference
      out.push({
        name: d.key,
        offset: cumulative,
        val: d.value,
        isTotal: false,
      });
      cumulative += d.value;
      continue;
    }

    if (d.type === 'total' && i === data.length - 1) {
      // final total: show full column from 0..value
      out.push({
        name: d.key,
        offset: 0,
        val: d.value,
        isTotal: true,
      });
    }
  }
  return out;
}

function EmissionsWaterfallFrame() {
  const data = useMemo(() => prepareWaterfall(RAW), []);

  // compute max for y-axis a little above final total
  const final = RAW[RAW.length - 1].value;
  const yMax = Math.ceil((final + final * 0.08) / 50) * 50; // round up to nearest 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="max-h-[280px] w-[300px] origin-bottom-right scale-[0.75] overflow-y-auto rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:scale-[0.9] md:max-w-[440px] md:scale-100 md:p-3"
      aria-label="Emissions waterfall frame"
    >
      <div className="mb-1 text-[11px] font-semibold text-slate-900">
        Total emission per waterfall
      </div>

      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 6 }}>
            <CartesianGrid stroke={COLORS.grid} vertical={false} strokeDasharray="2 6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: COLORS.axis }}
              interval={0}
              height={24}
            />
            <YAxis
              domain={[0, yMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: COLORS.axis }}
              ticks={[
                0,
                Math.round(yMax * 0.25),
                Math.round(yMax * 0.5),
                Math.round(yMax * 0.75),
                yMax,
              ]}
            />

            <Tooltip
              formatter={(v: any) => [`${v} tCO2`]}
              wrapperStyle={{ fontSize: 11 }}
              contentStyle={{ padding: '6px 8px', borderRadius: 6 }}
            />

            {/* invisible offset bar (used to position visible bars) */}
            <Bar dataKey="offset" stackId="a" fill="transparent" isAnimationActive={false} />

            {/* visible value bar */}
            <Bar
              dataKey="val"
              stackId="a"
              isAnimationActive={true}
              animationDuration={700}
              barSize={14}
              radius={[4, 4, 0, 0]}
              label={undefined}
            >
              {/* <LabelList content={renderLabel} /> */}

              {data.map((d, i) => {
                const color = d.isTotal ? COLORS.baseline : COLORS.positive;
                return <Cell key={`cell-${i}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* compact footer legend */}
      <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-600">
        <div className="flex items-center gap-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ background: COLORS.baseline }}
          />
          <span className="text-[10px]">FY totals</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ background: COLORS.positive }}
          />
          <span className="text-[10px]">Adjustments</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CarbonEstimation() {
  const bgUrl = '/module-animations/climate-risk-bg.png';

  type Step = 'frame1' | 'frame2' | 'frame3';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 3500,
    frame2: 4000,
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
          <motion.div
            key="frame1"
            className="absolute right-0.5 bottom-0.5 rounded-md shadow-xs md:right-6 md:bottom-6 md:shadow-xl md:backdrop-blur-3xl"
          >
            <BusinessSiteFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div
            key="frame2"
            className="absolute right-0.5 bottom-0.5 rounded-md shadow-xs md:right-6 md:bottom-6 md:shadow-xl md:backdrop-blur-3xl"
          >
            <EmissionsFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div
            key="frame3"
            className="absolute right-0.5 bottom-0.5 rounded-md shadow-xs md:right-6 md:bottom-6 md:shadow-xl md:backdrop-blur-3xl"
          >
            <EmissionsWaterfallFrame />
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
