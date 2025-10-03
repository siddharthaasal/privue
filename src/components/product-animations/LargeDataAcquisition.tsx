
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DatabaseZap } from 'lucide-react';

/**
 * DataAcquisition.tsx
 * - background image with a bottom-right overlay
 * - Frame 1: two progress bars on top + spinning loader discs at bottom
 * - Frame 2: a single table filling row-wise (no separate graph frame)
 * - slightly larger overlay than before, crisp small fonts, theme colors
 */

type Stage = 'idle' | 'docs' | 'table_fill' | 'done';

export default function LargeDataAcquisition({
  startImmediately = true,
  bgImage = '/module-animations/data-acq-bg.png',
  // bgImage = "/module-animations/data-acq-2.png",
}: {
  startImmediately?: boolean;
  bgImage?: string;
}) {
  const [stage, setStage] = useState<Stage>(startImmediately ? 'docs' : 'idle');
  const [progress, setProgress] = useState(0); // frame 1 overall
  const [docProgress, setDocProgress] = useState(0); // secondary bar

  // table-fill frame state (now frame 2)
  const [tableRowsShown, setTableRowsShown] = useState(0);

  const pRef = useRef<number | null>(null);
  const tableRef = useRef<number | null>(null);
  const restartRef = useRef<number | null>(null);

  // run docs progress
  useEffect(() => {
    if (!startImmediately) return;

    if (stage === 'docs') {
      setProgress(6);
      setDocProgress(4);
      if (pRef.current) clearInterval(pRef.current);

      pRef.current = window.setInterval(() => {
        setProgress((p) => {
          const nxt = Math.min(100, p + 25);
          // docProgress lags a bit behind
          setDocProgress((d) => Math.min(100, d + 20));
          if (nxt >= 100) {
            if (pRef.current) {
              clearInterval(pRef.current);
              pRef.current = null;
            }
            // small delay so user sees full bars
            setTimeout(() => setStage('table_fill'), 1000);
          }
          return nxt;
        });
      }, 1000) as unknown as number;
    }

    return () => {
      if (pRef.current) {
        clearInterval(pRef.current);
        pRef.current = null;
      }
    };
  }, [stage, startImmediately]);

  // table_fill: reveal rows one-by-one (row-wise animation)
  useEffect(() => {
    if (stage === 'table_fill') {
      setTableRowsShown(0);
      if (tableRef.current) clearInterval(tableRef.current);

      tableRef.current = window.setInterval(() => {
        setTableRowsShown((r) => {
          const nxt = r + 1;
          if (nxt >= 5) {
            if (tableRef.current) {
              clearInterval(tableRef.current);
              tableRef.current = null;
            }
            // short pause then done
            setTimeout(() => setStage('done'), 1500);
          }
          return nxt;
        });
      }, 750) as unknown as number;
    }

    return () => {
      if (tableRef.current) {
        clearInterval(tableRef.current);
        tableRef.current = null;
      }
    };
  }, [stage]);

  // when done -> restart whole animation after brief pause
  useEffect(() => {
    if (stage === 'done') {
      // pause a bit then restart the whole flow
      restartRef.current = window.setTimeout(() => {
        // reset state
        setProgress(0);
        setDocProgress(0);
        setTableRowsShown(0);
        setStage('docs');
      }, 2000) as unknown as number;
    }

    return () => {
      if (restartRef.current) {
        clearTimeout(restartRef.current);
        restartRef.current = null;
      }
    };
  }, [stage]);

  // helper for discs: decide status based on thresholds
  const discStatus = (index: number) => {
    const thresholds = [28, 66, 98];
    const t = thresholds[index] ?? 100;
    if (progress >= t) return 'done';
    if (progress >= t - 14) return 'working';
    return 'idle';
  };

  const tableRows = [
    { k: 'CIN', v: 'U12345DL2011PTC000002' },
    { k: 'GSTIN', v: '27AAEPM1234C1ZQ' },
    // Large customer "in sync" dummy values:
    { k: 'Revenue (₹)', v: '28,45,35,000' }, // ~28.45 crore net revenue
    { k: 'ROE %', v: '23.7%' }, // similar ratio to SME case
    { k: 'GST Turnover (₹)', v: '36,84,53,000' }, // ~36.84 crore gross turnover
  ];

  return (
    <div className="relative h-full w-full">
      {/* background image */}
      <div className="absolute inset-0">
        {/* <img src={bgImage} alt="background" className="w-full h-full object-contain scale-y-125" /> */}
        <img src={bgImage} alt="background" className="h-full w-full object-cover" />
        {/* <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(248,250,252,0) 70%, rgba(100,116,139,0.35))',
          }}
        /> */}
        {/* subtle overlay to keep contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      {/* bottom-right overlay */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {(stage === 'docs' || stage === 'table_fill' || stage === 'done') && (
            <motion.div
              key="data-acq-overlay"
              initial={{ opacity: 0, y: 20, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.995 }}
              transition={{ duration: 0.45 }}
              className="pointer-events-auto absolute right-2 bottom-2 w-auto max-w-[94vw] rounded-lg border bg-white/95 p-3 shadow-2xl backdrop-blur-sm"
              style={{ fontSize: 12 }}
            >
              {/* header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <DatabaseZap size={12} />
                  <div className="text-xs font-medium text-slate-800">Data acquisition</div>
                </div>

                <div className="text-[10px] text-slate-500">
                  {stage === 'docs'
                    ? 'Scanning documents'
                    : stage === 'table_fill'
                      ? 'Populating table'
                      : 'Ready'}
                </div>
              </div>

              <div className="mt-3">
                <AnimatePresence mode="wait">
                  {stage === 'docs' && (
                    <motion.div
                      key="frame-docs"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28 }}
                      className="min-w-[310px] p-2"
                    >
                      {/* Top: two progress bars (crisper) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-medium text-slate-700">Overall Progress</div>
                          <div className="text-[10px] text-slate-500">
                            {Math.min(100, Math.round(progress))}/100
                          </div>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            style={{
                              width: `${progress}%`,
                              background: 'linear-gradient(90deg,#5c7cfa,#5c7cfa)',
                            }}
                            className="h-full transition-all duration-200"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-medium text-slate-700">Documents</div>
                          <div className="text-[10px] text-slate-500">
                            {Math.min(100, Math.round(docProgress))}%
                          </div>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            style={{
                              width: `${docProgress}%`,
                              background: 'linear-gradient(90deg,#5c7cfa,#5c7cfa)',
                            }}
                            className="h-full transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* bottom: compact spinning loader discs */}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        {[
                          { label: 'Registry', idx: 0 },
                          { label: 'Data Acquisition', idx: 1 },
                          { label: 'Financials', idx: 2 },
                        ].map((f) => {
                          const st = discStatus(f.idx);
                          return (
                            <div key={f.idx} className="flex flex-1 flex-col items-center text-center">
                              <div
                                className="flex h-8 w-8 items-center justify-center rounded-full border"
                                style={{
                                  borderColor:
                                    st === 'done' ? 'rgba(34,197,94,0.12)' : 'rgba(148,163,184,0.08)',
                                  background: st === 'done' ? 'rgba(34,197,94,0.06)' : undefined,
                                }}
                              >
                                {st === 'done' ? (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <div
                                    className="h-4 w-4 animate-spin rounded-full"
                                    style={{
                                      borderTop: '2px solid rgba(76,110,245,1)',
                                      borderRight: '2px solid transparent',
                                      borderBottom: '2px solid rgba(120,123,255,0.6)',
                                      borderLeft: '2px solid transparent',
                                    }}
                                  />
                                )}
                              </div>

                              <div className="mt-1 text-[8px] text-slate-600">{f.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>

                  )}

                  {stage === 'table_fill' && (
                    <motion.div
                      key="frame-table"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28 }}
                      className="min-w-[380px]"
                    >
                      {/* title */}
                      <div className="mb-1 text-[10px] font-medium text-slate-700">
                        Imported data preview
                      </div>

                      <div className="overflow-hidden rounded-md border bg-white text-[9px]">
                        <div className="grid grid-cols-3 gap-0">
                          <div className="border-b px-1.5 py-0.5 font-medium text-[10px]">Field</div>
                          <div className="border-b px-1.5 py-0.5 font-medium text-[10px]">Value</div>
                          <div className="border-b px-1.5 py-0.5 font-medium text-[10px]">Status</div>

                          {tableRows.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={tableRowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.06, y: 4 }}
                              transition={{ duration: 0.24, delay: i * 0.045 }}
                              className="col-span-3 grid grid-cols-[minmax(92px,140px)_1fr_minmax(60px,84px)] items-center gap-x-1 border-b px-1.5 py-0.5"
                            >
                              <div className="font-normal text-slate-700 text-[9px] truncate">{r.k}</div>
                              <div className="text-slate-800 text-[9px] truncate">{tableRowsShown > i ? r.v : '—'}</div>
                              <div className={`${tableRowsShown > i ? 'text-emerald-600' : 'text-slate-400'} text-[8px] font-medium text-right`}>
                                {tableRowsShown > i ? 'Imported' : '—'}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                  )}

                  {stage === 'done' && (
                    <motion.div
                      key="frame-done"
                      className="max-w-auto"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                        <svg
                          className="h-3 w-3 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        All data acquired
                      </div>
                    </motion.div>

                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
