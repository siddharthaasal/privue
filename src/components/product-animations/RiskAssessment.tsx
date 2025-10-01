'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, ChevronDown, AlertCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function CreditInfoCard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      className="rounded-lg"
    >
      <Card className="w-72 shadow-lg ring-0">
        <CardHeader className="">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-[11px] font-medium">Reported Credit Information</CardTitle>
            <span
              className="text-muted-foreground flex items-center gap-1 text-[10px]"
              title="Summary of the user's reported credit attributes (last 36 months)"
              aria-label="Credit information details"
            >
              <Info className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-3 text-[11px]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3 space-x-3"
          >
            <motion.div className="col-span-2" variants={item}>
              <div className="text-muted-foreground text-[10px] uppercase">Name</div>
              <motion.div
                variants={item}
                className="mt-1 inline-flex h-7 w-full items-center justify-between rounded-md border border-slate-200 px-2 text-[11px]"
              >
                <span className="truncate blur-xs filter select-none" title="Ashish Goomer">
                  Ashish Goomer
                </span>

                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </motion.div>
            </motion.div>

            <motion.div className="flex flex-col items-start space-y-1.5" variants={item}>
              <span className="text-muted-foreground text-[10px] uppercase">
                Credit Score Bucket
              </span>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.2 }}
                className="-ml-0.5 flex items-center gap-2"
              >
                <Badge
                  variant="secondary"
                  className="border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] text-red-700"
                >
                  Poor
                </Badge>
              </motion.div>
            </motion.div>

            <motion.div className="flex flex-col" variants={item}>
              <span className="text-muted-foreground text-[10px] uppercase">
                Months Delinquent (36 months)
              </span>
              <span className="text-[11px] font-medium">36</span>
            </motion.div>

            <motion.div className="flex flex-col" variants={item}>
              <span className="text-muted-foreground text-[10px] uppercase">
                Max Delinquency (6 months)
              </span>
              <span className="text-[11px] font-medium">900</span>
            </motion.div>

            {/* <motion.div className="col-span-2 mt-1 border-t pt-1.5 border-gray-100" variants={item} /> */}

            <motion.div className="col-span-2 flex flex-col" variants={item}>
              <span className="text-muted-foreground text-[10px] uppercase">
                Age of Oldest Account
              </span>
              <span className="text-[11px] font-medium">2 months</span>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProbabilityOfDefaultCard({
  level = 'Low',
  percent = '5%',
}: {
  level?: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Unknown';
  percent?: string;
}) {
  const levels = [
    { key: 'Very Low', color: '#9AD34D' },
    { key: 'Low', color: '#EFB23C' },
    { key: 'Medium', color: '#F08A3A' },
    { key: 'High', color: '#F06B6B' },
    { key: 'Unknown', color: '#9AA0A6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25 }}
      className="rounded-lg"
    >
      <Card className="w-[300px] shadow-sm ring-0">
        <CardHeader className="pt-2 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-[11px] font-medium">Probability of Default</CardTitle>
            <Info className="text-muted-foreground h-3.5 w-3.5" />
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-3">
          <div className="mb-3 text-[12px] font-medium">
            {percent} — {level}
          </div>

          <div className="flex items-center gap-2">
            {levels.map((l) => {
              const isActive = l.key === level;
              return (
                <div key={l.key} className="flex flex-1 flex-col items-center">
                  <div
                    className="h-2 w-full rounded"
                    style={{
                      background: isActive ? l.color : `${l.color}20`,
                    }}
                  />
                  <div
                    className={`mt-1 text-[10px] ${
                      isActive ? 'font-medium text-slate-800' : 'text-muted-foreground'
                    }`}
                  >
                    {l.key}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FinancialSnapshotCard() {
  // extracted from the screenshot:
  const data = [
    { label: 'Return on Equity', value: '22%' },
    { label: 'Gross Profit Margin', value: '25%' },
    { label: 'Net Profit Margin', value: '3%' },
    { label: 'Working Capital Turnover Ratio', value: '18.78' },
    { label: 'Estimated GST filed for PAN', value: '₹ 8,75,49,958' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className="rounded-lg"
    >
      <Card className="w-72 shadow-lg ring-0">
        <CardHeader className="">
          <div className="flex items-center justify-start gap-1">
            <CardTitle className="text-[11px] font-medium">Financial Performance</CardTitle>
            <span
              className="text-muted-foreground flex items-start gap-1 text-[10px]"
              title="Snapshot extracted from uploaded image"
              aria-label="Financial snapshot details"
            >
              <Info className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-3 text-[11px]">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-y-2">
            {data.map((d, i) => (
              <motion.div key={i} variants={item} className="flex items-center justify-between">
                <div className="text-muted-foreground text-[10px]">{d.label}</div>
                <div className="ml-3 text-[11px] font-medium">{d.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** ContributoryFactorsCard — reveals items one-by-one like your table */
function ContributoryFactorsCard() {
  const leftItems = [
    'High exposure to credit compared to earnings.',
    'Balance sheet is highly leveraged',
    '5 months delinquent in last 36 Months',
    '2 delayed contributions in last 6 months',
  ];

  const [itemsShown, setItemsShown] = useState(0);

  useEffect(() => {
    // reveal one item every 140ms (tweak to taste)
    if (itemsShown >= leftItems.length) return;
    const t = setTimeout(() => setItemsShown((s) => s + 1), 140);
    return () => clearTimeout(t);
  }, [itemsShown, leftItems.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32 }}
      className="rounded-lg"
      aria-live="polite"
    >
      <Card className="w-[350px] max-w-[92%] shadow-lg ring-0">
        <CardHeader className="pt-1 pb-1">
          <div className="flex items-center justify-start gap-1">
            <CardTitle className="text-[11px] font-medium">Contributory Factors</CardTitle>
            <span
              className="text-muted-foreground flex items-center gap-1 text-[10px]"
              title="Contributory factors"
              aria-label="Contributory factors"
            >
              <AlertCircle className="h-4 w-4" />
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-3 text-[13px]">
          <div className="flex flex-col gap-1.5">
            {leftItems.map((text, i) => (
              <motion.div
                key={i}
                // animate to visible only when itemsShown > i
                initial={{ opacity: 0, x: -8 }}
                animate={itemsShown > i ? { opacity: 1, x: 0 } : { opacity: 0.08, x: -4 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
                className="flex items-start gap-3"
              >
                <div className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-red-50">
                  <XCircle className="h-3 w-3 text-red-500" />
                </div>
                <div className="text-muted-foreground text-[11px] leading-snug">{text}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** RiskSignalsCard — same pattern, right column */
function RiskSignalsCard() {
  const rightItems = [
    'No GST filings done in the last year',
    'Multiple address in different data fetch',
    'Multiple GST with different names',
    'Age group above 60',
  ];

  const [itemsShown, setItemsShown] = useState(0);

  useEffect(() => {
    if (itemsShown >= rightItems.length) return;
    const t = setTimeout(() => setItemsShown((s) => s + 1), 140);
    return () => clearTimeout(t);
  }, [itemsShown, rightItems.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32 }}
      className="rounded-lg"
      aria-live="polite"
    >
      <Card className="w-[350px] max-w-[92%] shadow-lg ring-0">
        <CardHeader className="pt-1 pb-1">
          <div className="flex items-center justify-start gap-1">
            <CardTitle className="text-[11px] font-medium">Risk Signals</CardTitle>
            <span
              className="text-muted-foreground flex items-center gap-1 text-[10px]"
              title="Risk signals"
              aria-label="Risk signals"
            >
              <AlertCircle className="h-4 w-4" />
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-3 text-[13px]">
          <div className="flex flex-col gap-1.5">
            {rightItems.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={itemsShown > i ? { opacity: 1, x: 0 } : { opacity: 0.08, x: 4 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
                className="flex items-start gap-3"
              >
                <div className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-amber-50">
                  <XCircle className="h-3 w-3 text-amber-600" />
                </div>
                <div className="text-muted-foreground text-[11px] leading-snug">{text}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function RiskAssessmentTourWithChart() {
  const bgUrl = '/module-animations/risk-ass-2.png'; // unchanged background

  type Step = 'frame1' | 'frame2' | 'frame3' | 'frame4' | 'frame5';
  const [step, setStep] = useState<Step>('frame1');

  const durations: Record<Step, number> = {
    frame1: 4000, // credit
    frame2: 4000, // financial snapshot
    frame3: 4000, // prob of def
    frame4: 4000, // contributory (keep slightly longer for sequential item animation)
    frame5: 4000, // risk signals (same)
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
      {/* background (unchanged) */}
      <div
        aria-hidden
        className="absolute inset-0.5 rounded-2xl border border-gray-200 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')`,
          transform: 'scale(1.02)',
        }}
      />

      <AnimatePresence>
        {step === 'frame1' && (
          <motion.div key="card-frame" className="absolute right-4 bottom-4">
            <CreditInfoCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="financial-frame" className="absolute right-4 bottom-4">
            <FinancialSnapshotCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="contrib-frame" className="absolute right-4 bottom-4">
            <ProbabilityOfDefaultCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame4' && (
          <motion.div key="risk-frame" className="absolute right-4 bottom-4">
            <ContributoryFactorsCard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame5' && (
          <motion.div key="risk-frame" className="absolute right-4 bottom-4">
            <RiskSignalsCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
