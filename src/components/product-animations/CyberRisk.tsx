// ComplianceRisk_with_embedded_bg.tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

function Pill({ text, color }: { text: string; color: 'red' | 'green' | 'gray' }) {
  const colors =
    color === 'red'
      ? 'bg-red-50 text-red-600'
      : color === 'green'
        ? 'bg-green-50 text-green-600'
        : 'bg-gray-50 text-slate-600';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${colors}`}>{text}</span>
  );
}

function StatRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: string | number;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-[10px] leading-tight">
      <div className="text-slate-600">{label}</div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-900">{value}</span>
        {badge}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  pill,
  rows,
}: {
  title: string;
  pill: React.ReactNode;
  rows: { label: string; value: string | number; badge?: React.ReactNode }[];
}) {
  return (
    <div className="flex-1 rounded-md border border-slate-200 bg-white/95">
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
        <div className="text-[11px] font-semibold text-slate-800">{title}</div>
        {pill}
      </div>
      <div className="px-3 py-1.5">
        {rows.map((r, i) => (
          <StatRow key={i} {...r} />
        ))}
      </div>
    </div>
  );
}

function Frame1AttackSurface() {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      transition={{ duration: 0.25 }}
      className="gap-3 max-h-[280px] md:max-h-[340px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-1 text-[11px] font-medium text-slate-700">Attack Surface Analysis</div>

      <motion.div variants={container} initial="hidden" animate="visible" className="flex gap-2.5">
        {/* Infrastructure */}
        <motion.div variants={item} className="flex-1">
          <SectionCard
            title="Infrastructure"
            pill={<Pill text="17" color="red" />}
            rows={[
              { label: 'Active IPs', value: 23 },
              { label: 'Open Ports', value: 17 },
              { label: 'Known Services', value: 10 },
              { label: 'Hosting Services', value: '17' },
            ]}
          />
        </motion.div>

        {/* Certificates */}
        <motion.div variants={item} className="flex-1">
          <SectionCard
            title="Certificates"
            pill={<Pill text="Valid" color="green" />}
            rows={[
              { label: 'Active Certificates', value: 14 },
              { label: 'Expiring Soon', value: 0 },
              { label: 'Expired', value: 0 },
              { label: 'SHA-1 (Insecure)', value: 0 },
            ]}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Frame2: Security Maturity Radar (compact, animated fill)
 * - max-w-[500px]
 * - targetValues and currentValues range 0..4 (matching your screenshot ticks)
 */

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function valuesToPolygonPath(
  values: number[],
  maxValue: number,
  cx: number,
  cy: number,
  radius: number,
) {
  const step = 360 / values.length;
  const points = values.map((v, i) => {
    const r = (v / maxValue) * radius;
    const { x, y } = polarToCartesian(cx, cy, r, i * step);
    return `${x},${y}`;
  });
  return points.join(' ');
}

export function Frame2SecurityMaturity({
  size = 240,
  maxValue = 4,
}: {
  size?: number;
  maxValue?: number;
}) {
  const labels = [
    'Network Security Controls',
    'Data Protection & Privacy',
    'Secure Communications',
    'Regulatory Compliance',
    'Encryption Standards',
    'Security Awareness Training',
    'Disaster Recovery & BCP',
    'Incident Response Readiness',
    'Security Governance',
    'Security Operations',
    'Security Architecture',
    'Physical Security Controls',
    'Threat Risk Assessment',
    'Third-Party Security',
    'Secure Development Lifecycle',
  ];

  const targetValues = new Array(labels.length).fill(4);
  const currentValues = [2.0, 3.0, 1.0, 1.4, 3.0, 2.0, 0.9, 1.2, 1.8, 1.3, 1.6, 1.9, 1.1, 1.5, 3.2];

  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 22;

  const steps = labels.length;
  const stepAngle = 360 / steps;

  const targetPoints = valuesToPolygonPath(targetValues, maxValue, cx, cy, radius);
  const currentPoints = valuesToPolygonPath(currentValues, maxValue, cx, cy, radius);

  const polygonDFromPoints = (pointsStr: string) => {
    const pts = pointsStr.split(' ').map((p) => p.split(',').map(Number));
    if (!pts.length) return '';
    return (
      'M ' +
      pts[0][0] +
      ' ' +
      pts[0][1] +
      pts
        .slice(1)
        .map((p) => ' L ' + p[0] + ' ' + p[1])
        .join('') +
      ' Z'
    );
  };

  const targetD = polygonDFromPoints(targetPoints);
  const currentD = polygonDFromPoints(currentPoints);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-h-[280px] md:max-h-[340px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-2 text-[11px] font-semibold text-slate-800">
        Security Maturity Assessment
      </div>

      <div className="flex justify-center">
        <svg
          width="100%"
          height={size}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Security maturity radar chart"
        >
          {/* concentric rings */}
          {[1, 2, 3, 4].map((level) => (
            <circle
              key={level}
              cx={cx}
              cy={cy}
              r={(level / maxValue) * radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={0.8}
            />
          ))}

          {/* radial axes */}
          {labels.map((_, i) => {
            const { x, y } = polarToCartesian(cx, cy, radius, i * stepAngle);
            return (
              <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#f1f5f9" strokeWidth={0.8} />
            );
          })}

          {/* Target polygon */}
          <path
            d={targetD}
            fill="#f9731625"
            stroke="#f97316"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {/* Current polygon */}
          <motion.g
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <path
              d={currentD}
              fill="#05966933"
              stroke="#059669"
              strokeWidth={1.2}
              strokeLinejoin="round"
              opacity={0.95}
            />
            <motion.path
              d={currentD}
              fill="none"
              stroke="#047857"
              strokeWidth={1.2}
              strokeDasharray="1000"
              strokeDashoffset={1000}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.g>

          {/* legend */}
          <g transform={`translate(${10}, ${height - 8})`}>
            <rect x={0} y={-8} width={9} height={6} fill="#f97316" rx={1.5} />
            <text x={13} y={-3} fontSize={9} fill="#374151">
              Target
            </text>
            <rect x={70} y={-8} width={9} height={6} fill="#059669" rx={1.5} />
            <text x={84} y={-3} fontSize={9} fill="#374151">
              Current
            </text>
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

function Frame3ThreatVector() {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, when: 'beforeChildren' } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const paragraphs: React.ReactNode[] = [
    <>
      <span className="text-[10px] text-slate-700">
        A closer analysis of <strong>threat vectors</strong> shows{' '}
        <strong className="underline">critical and high-risk exposures</strong> across categories
        like <u>malware</u>, <u>email security</u>, <u>identity</u>, <u>cloud</u>,{' '}
        <u>applications</u>, and <u>brand risk</u>.
      </span>
    </>,
    <>
      <span className="text-[10px] text-slate-700">
        <strong>Notably, brand risk exposure is the highest (4 critical threats identified)</strong>
        , raising concern for intellectual property theft or brand impersonation.
      </span>
    </>,
    <>
      <span className="text-[10px] text-slate-700">
        Additionally, <u>email and identity risks remain significant</u>, potentially leading to
        phishing attacks or credential theft — common vectors for orgs with manual processes or
        legacy systems.
      </span>
    </>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-h-[280px] md:max-h-[340px] w-[350px] md:max-w-[440px] origin-bottom-right scale-[0.65] sm:scale-[0.9] md:scale-100 p-4 overflow-y-hidden rounded-lg bg-white/95 md:p-3 shadow-sm backdrop-blur-sm"
      aria-live="polite"
    >
      <div className="mb-1.5 text-[10px] font-medium text-slate-800">Threat Vector Analysis</div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-1.5"
      >
        {paragraphs.map((p, i) => (
          <motion.div key={i} variants={item}>
            {p}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function CyberRisk() {
  type Step = 'frame1' | 'frame2' | 'frame3';
  const [step, setStep] = useState<Step>('frame1');

  const durations: Record<Step, number> = {
    frame1: 4200,
    frame2: 4200,
    frame3: 4200,
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

  // data URL embedded directly so the component doesn't rely on external path
  const bgUrl = '/module-animations/adverse-news-bg.png';
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      <div className="absolute inset-0">
        {/* background now uses embedded data URL */}
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
          <motion.div key="frame1" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame1AttackSurface />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame2SecurityMaturity />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-0.5 bottom-0.5 md:right-6 md:bottom-6 rounded-md  shadow-xs md:shadow-xl md:backdrop-blur-3xl">
            <Frame3ThreatVector />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
