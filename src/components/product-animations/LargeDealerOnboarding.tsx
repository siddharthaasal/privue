'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, FileText, File } from 'lucide-react';

/**
 * Defensive slower demo:
 * - Background table visible immediately (Acme Traders NOT in initial list)
 * - Bottom-right overlay shows form
 * - Typing auto-submits, but there's a visible "Force submit now" button after typing finishes
 * - Lots of console logs to trace where flow could stall
 */

type Dealer = {
  id: string;
  name: string;
  gst: string;
  cin: string; // new: CIN shown in form + table
  verified: boolean;
};

export default function LargeDealerOnboarding() {
  const [stage, setStage] = useState<
    'idle' | 'form' | 'table_unverified' | 'upload' | 'table_verified'
  >('idle');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const UNVERIFIED_DISPLAY_MS = 2500;

  const [dealers, setDealers] = useState<Dealer[]>(
    () =>
      dealerRowsInitial.map((r, i) => ({
        id: `${i}-${r.name}`,
        name: r.name,
        gst: r.gst,
        cin: r.cin ?? '—',
        verified: true,
      })) as Dealer[],
  );


  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    console.log('[Flow] mounted, will show form after delay');
    const showFormTimer = window.setTimeout(() => {
      console.log('[Flow] -> showing form');
      setStage('form');
    }, 1800);

    return () => {
      clearTimeout(showFormTimer);
      if (progressRef.current) clearInterval(progressRef.current);
      console.log('[Flow] unmounted / cleaned up');
    };
  }, []);

  function restartFlow() {
    console.log('[Flow] restartFlow — resetting demo to initial state');

    // 1) Remove any added/new dealers (id starts with 'new-') so Acme Traders disappears
    setDealers((prev) => prev.filter((d) => !d.id.startsWith('new-')));

    // 2) Clear highlight and progress
    setHighlightId(null);
    setProgress(0);
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }

    // 3) Reset the typing controller so it will re-run when the form mounts again
    TypingController.reset();

    // 4) Reset visible stage to idle (so overlays hide), then show form after a slow delay
    setStage('idle');
    window.setTimeout(() => {
      setStage('form');
    }, 1400); // tweak delay to taste
  }

  function startUploadSimulation(newDealerId: string) {
    console.log('[Flow] startUploadSimulation', newDealerId);
    setProgress(0);
    if (progressRef.current) {
      console.log('[Flow] clearing existing upload interval');
      clearInterval(progressRef.current);
    }

    progressRef.current = window.setInterval(() => {
      setProgress((p) => {
        const nxt = Math.min(100, p + 25);
        console.log('[Flow] upload tick', nxt);
        if (nxt >= 100) {
          if (progressRef.current) {
            clearInterval(progressRef.current);
            progressRef.current = null;
          }
          setTimeout(() => {
            console.log('[Flow] upload complete -> marking verified', newDealerId);
            setDealers((prev) =>
              prev.map((d) => (d.id === newDealerId ? { ...d, verified: true } : d)),
            );
            setHighlightId(newDealerId);
            setStage('table_verified');

            // keep verified visible for a bit, then restart entire demo:
            setTimeout(() => {
              // allow highlight to be visible shortly before restart
              setHighlightId(null);
              setTimeout(() => {
                restartFlow();
              }, 800); // short pause so user sees un-highlighted verified state briefly
            }, 2200); // time shown as verified before restart
          }, 900);
          return 100;
        }
        return nxt;
      });
    }, 700) as unknown as number;
  }

  const submittingRef = useRef(false);

  function handleSubmitFromForm(values: { name: string; gst: string; cin: string }) {
    if (submittingRef.current) {
      console.log('[Flow] submit ignored — already submitting');
      return;
    }
    submittingRef.current = true;
    console.log('[Flow] form submitted', values);
    const id = `new-${Date.now()}`;
    const newDealer: Dealer = {
      id,
      name: values.name || 'New Dealer',
      gst: values.gst || '—',
      cin: values.cin || '—',
      verified: false,
    };


    setDealers((prev) => [newDealer, ...prev]);
    setStage('table_unverified');
    setHighlightId(id);

    setTimeout(() => {
      setHighlightId(null);
      setStage('upload');
      startUploadSimulation(id);
      // clear guard after we've moved to upload stage so future restarts can run
      setTimeout(() => (submittingRef.current = false), 1000);
    }, UNVERIFIED_DISPLAY_MS);
  }


  // static file percents (keep per-file values as-is)
  const filePercents = [72, 45, 18];
  // target is the average (rounded)
  const targetProgress = Math.round(filePercents.reduce((a, b) => a + b, 0) / filePercents.length);

  // animated progress state (0 -> targetProgress)

  useEffect(() => {
    let raf = 0;
    const duration = 700; // ms for the animation
    const start = performance.now();

    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * targetProgress);
      setProgress(value);
      if (t < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [targetProgress]);

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      {/* BACKGROUND TABLE */}
      <div className="absolute inset-0 p-0">
        <BackgroundDealersTable dealers={dealers} highlightId={highlightId} />
      </div>

      {/* subtle mask */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 backdrop-blur-xl" // 👈 stronger blur
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)',
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,0.85) 100%)', // 👈 stronger white veil
          }}
        />
      </div>

      {/* overlay */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {stage === 'form' && (
            <motion.div
              key="form-overlay"
              initial={{ opacity: 0, y: 8, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.995 }}
              transition={{ duration: 0.6 }}
              className="absolute -right-2 -bottom-2 w-[350px] max-w-full rounded-md bg-white p-4 shadow-2xl"
            >
              <div className="mb-2 text-xs font-medium">Add Customer</div>
              <DummyFormCompactSlow onSubmit={handleSubmitFromForm} />
              <div className="mt-1 text-[10px] text-slate-500">
                Status: Preparing to add customer
              </div>
            </motion.div>
          )}

          {stage === 'table_unverified' && (
            <motion.div
              key="brief-unverified"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55 }}
              className="absolute -right-2 -bottom-2 w-[250px] max-w-full rounded-md bg-white/95 p-3 shadow-lg"
            >
              <div className="text-[13px] font-semibold">New customer added</div>
              <div className="text-privue-800 mt-1 text-[12px]">Waiting for documents</div>
            </motion.div>
          )}

          {stage === 'upload' && (
            <motion.div
              key="upload-overlay"
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.55 }}
              className="absolute -right-2 -bottom-2 w-[350px] max-w-full rounded-md bg-white p-4 shadow-2xl"
            >
              <div className="mb-2 text-xs font-medium">Uploading documents</div>

              <div className="mb-2 flex w-full flex-col gap-2">
                <div className="flex items-center gap-3 rounded-md border bg-slate-50 p-1.5 shadow-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-200 text-slate-600">
                    <FileText className="h-3 w-3" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-medium">balance-sheet.pdf</div>
                    <div className="text-[10px] text-slate-500">1.2 MB</div>
                  </div>

                  {/* <div className="text-[11px] text-slate-500 ml-2">72%</div> */}
                </div>

                <div className="flex items-center gap-3 rounded-md border bg-slate-50 p-1.5 shadow-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-200 text-slate-600">
                    <FileSpreadsheet className="h-3 w-3" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-medium">
                      profit-and-loss-account.xlsx
                    </div>
                    <div className="text-[10px] text-slate-500">840 KB</div>
                  </div>

                  {/* <div className="text-[11px] text-slate-500 ml-2">45%</div> */}
                </div>

                <div className="flex items-center gap-3 rounded-md border bg-slate-50 p-1.5 shadow-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-200 text-slate-600">
                    <File className="h-3 w-3" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-medium">income-tax-detail.docx</div>
                    <div className="text-[10px] text-slate-500">320 KB</div>
                  </div>

                  {/* <div className="text-[11px] text-slate-500 ml-2">18%</div> */}
                </div>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  style={{
                    width: `${progress}%`,
                    // background: 'linear-gradient(90deg,#748ffc,#4c6ef5)',
                    background: 'linear-gradient(90deg,#748ffc,#748ffc)',
                  }}
                  className="h-full transition-all duration-200"
                />
              </div>

              <div className="mt-2 text-[10px] text-slate-500">
                Status: Uploading... {progress}%
              </div>
            </motion.div>
          )}

          {stage === 'table_verified' && (
            <motion.div
              key="verified-overlay"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-2 -bottom-2 w-auto max-w-full rounded-md bg-white/95 p-3 shadow-lg"
            >
              <div className="text-right text-[12px] font-semibold text-emerald-600">
                Customer verified
              </div>
              {/* <div className="text-xs text-slate-500 mt-1">Table updated in the background.</div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------
   Compact slow form + manual fallback
   -------------------------- */
/* --------------------------
   Module-level typing controller (singleton)
   - runs once, emits incremental updates to subscribers
   - survives React StrictMode remounts
   -------------------------- */

type TypingListener = {
  id: string;
  onUpdate: (fieldIndex: number, text: string) => void;
  onFinished: () => void;
};

const TypingController = (() => {
  let started = false;
  let finished = false;
  const listeners = new Map<string, TypingListener>();
  let timers: number[] = [];

  function notifyUpdate(fieldIndex: number, text: string) {
    for (const l of listeners.values()) l.onUpdate(fieldIndex, text);
  }
  function notifyFinished() {
    finished = true;
    for (const l of listeners.values()) l.onFinished();
  }

  async function start() {
    if (started) return;
    started = true;
    const sequences = ['Acme Traders', '27AAEPM1234C1ZQ', 'U12345DL2011PTC000001'];

    function typeString(fieldIndex: number, text: string, charDelay = 95) {
      return new Promise<void>((resolve) => {
        let i = 0;
        function tick() {
          i++;
          notifyUpdate(fieldIndex, text.slice(0, i));
          if (i < text.length) {
            timers.push(window.setTimeout(tick, charDelay));
          } else {
            resolve();
          }
        }
        timers.push(window.setTimeout(tick, charDelay));
      });
    }

    (async () => {
      for (let idx = 0; idx < sequences.length; idx++) {
        await typeString(idx, sequences[idx], 95);
        await new Promise((r) => timers.push(window.setTimeout(r, 220)));
      }
      await new Promise((r) => timers.push(window.setTimeout(r, 1200)));
      notifyFinished();
    })();
  }

  function subscribe(listener: TypingListener) {
    listeners.set(listener.id, listener);
    // If the controller already finished, call onFinished asynchronously
    // so subscribers don't receive a synchronous immediate submission that
    // races with other lifecycle code.
    if (finished) {
      window.setTimeout(() => {
        // ensure listener still exists (wasn't unsubscribed)
        if (listeners.has(listener.id)) listener.onFinished();
      }, 0);
    }
    start();
    return () => listeners.delete(listener.id);
  }


  function teardown() {
    timers.forEach((t) => clearTimeout(t));
    timers = [];
    listeners.clear();
    started = false;
    finished = false;
  }

  // reset is same as teardown but kept explicit for readability
  function reset() {
    teardown();
  }

  return {
    subscribe,
    teardown,
    reset,
    _debug: () => ({ started, finished, listenersCount: listeners.size }),
  };
})();

/* --------------------------
   Replace DummyFormCompactSlow with this subscriber-based version
   (visual typing driven by the controller; manual fallback button kept)
   -------------------------- */

function DummyFormCompactSlow({
  onSubmit,
}: {
  onSubmit: (values: { name: string; gst: string; cin: string }) => void;
}) {
  const [dealerName, setDealerName] = useState('');
  const [gstin, setGstin] = useState('');
  const [cin, setCin] = useState('');
  const [step, setStep] = useState(0);

  // add refs to hold current values synchronously
  const dealerNameRef = useRef('');
  const gstinRef = useRef('');
  const cinRef = useRef('');
  const finishedTypingRef = useRef(false);
  const idRef = useRef(`typing-listener-${Math.random().toString(36).slice(2)}`);

  // keep refs in sync whenever state changes (also use them in onUpdate)
  useEffect(() => { dealerNameRef.current = dealerName; }, [dealerName]);
  useEffect(() => { gstinRef.current = gstin; }, [gstin]);
  useEffect(() => { cinRef.current = cin; }, [cin]);

  useEffect(() => {
    console.log('[Form] subscribing to TypingController', idRef.current);

    const unsubscribe = TypingController.subscribe({
      id: idRef.current,
      onUpdate: (fieldIndex, text) => {
        // update the appropriate field and step
        if (fieldIndex === 0) {
          setDealerName(text);
          dealerNameRef.current = text;
        }
        if (fieldIndex === 1) {
          setGstin(text);
          gstinRef.current = text;
        }
        if (fieldIndex === 2) {
          setCin(text);
          cinRef.current = text;
        }

        // compute step deterministically from current values (refs are in-sync)
        const nameFilled = dealerNameRef.current.length > 0 ? 1 : 0;
        const gstFilled = gstinRef.current.length > 0 ? 1 : 0;
        const cinFilled = cinRef.current.length > 0 ? 1 : 0;
        const newStep = nameFilled + gstFilled + cinFilled;
        setStep((s) => Math.max(s, newStep));
      },
      onFinished: () => {
        console.log('[Form] controller signalled finished typing');
        finishedTypingRef.current = true;
        setStep(3);
        // attempt autosubmit (safe: controller only finishes once)
        setTimeout(() => {
          if (!finishedTypingRef.current) return;
          console.log('[Form] controller attempting autosubmit');
          onSubmit({
            name: dealerNameRef.current || 'Acme Traders',
            gst: gstinRef.current || '27AAEPM1234C1ZQ',
            cin: cinRef.current || '+91 98765 43210',
          });
        }, 60);
      },
    });

    return () => {
      console.log('[Form] unsubscribing TypingController', idRef.current);
      unsubscribe();
      // NOTE: we intentionally do NOT teardown the controller here.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        finishedTypingRef.current = true;
        onSubmit({ name: dealerName, gst: gstin, cin });
      }}
      className="flex flex-col gap-1"
    >
      <label className="text-[8px] text-slate-600">Company Name</label>
      <input
        value={dealerName}
        readOnly
        className="w-full rounded-md border border-slate-200 p-1 font-sans text-xs tracking-wide"
      />

      <label className="text-[8px] text-slate-600">GSTIN</label>
      <input
        value={gstin}
        readOnly
        className="w-full rounded-md border border-slate-200 p-1 font-sans text-xs tracking-wide"
      />

      <label className="text-[8px] text-slate-600">CIN</label>
      <input
        value={cin}
        readOnly
        className="w-full rounded-md border border-slate-200 p-1 font-sans text-xs tracking-wide"
      />

      <div className="flex items-center justify-end pt-1">
        {/* <div className="text-xs text-slate-400">Tip: wait for typing or force submit</div> */}

        <div className="flex items-center gap-1">
          <motion.button
            type="submit"
            className="inline-flex items-center gap-1 rounded-sm bg-[var(--color-privue-600)] px-1 py-1 text-xs font-normal text-white shadow-md"
            animate={{
              opacity: step >= 3 ? [1, 0.85, 1] : 0.45,
              scale: step >= 3 ? [1, 1.02, 1] : 1,
            }}
            transition={{ repeat: step >= 3 ? Infinity : 0, duration: 1.6 }}
          >
            Submit
          </motion.button>

          {/* {step >= 3 && (
                        <button
                            type="button"
                            onClick={() => {
                                console.log("[Form] Force submit clicked (controller fallback)");
                                finishedTypingRef.current = true;
                                onSubmit({ name: dealerName || "Acme Traders", gst: gstin || "27AAEPM1234C1ZQ", mobile: mobile || "+91 98765 43210" });
                            }}
                            className="px-3 py-2 text-sm rounded-md border border-slate-200 bg-white"
                        >
                            Force submit now
                        </button>
                    )} */}
        </div>
      </div>
    </form>
  );
}

/* --------------------------
   BackgroundDealersTable (explicit RGBA animation targets)
   -------------------------- */
// Insert this DealerRow component above BackgroundDealersTable (or inside same file scope)
function DealerRow({ d, highlightId }: { d: Dealer; index: number; highlightId: string | null }) {
  const [flash, setFlash] = useState(false);
  const prevVerifiedRef = useRef<boolean>(d.verified);

  useEffect(() => {
    // detect transition false -> true
    if (prevVerifiedRef.current === false && d.verified === true) {
      setFlash(true);
      const t = window.setTimeout(() => setFlash(false), 1200); // flash duration
      return () => clearTimeout(t);
    }
    prevVerifiedRef.current = d.verified;

  }, [d.verified]);

  const isHighlighted = highlightId === d.id;

  // choose row background: flash (green) > highlighted (violet) > default (white)
  const rowBg = flash
    ? 'rgba(16,185,129,0.12)' // soft green flash
    : isHighlighted
      ? 'rgba(120,115,255,0.06)' // your existing highlight
      : 'rgba(255,255,255,0)'; // default (explicit rgba for animatable)

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 12, backgroundColor: 'rgba(255,255,255,0)' }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: rowBg,
      }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      // avoid conflicting tailwind background classes here
      style={{ backgroundColor: undefined }}
    >
      <td className="px-3 py-3 text-[12px]">{d.name}</td>
      <td className="px-3 py-3 text-[12px]">{d.gst}</td>
      <td className="px-3 py-3 text-[12px]">{d.cin}</td>

      <td className="px-3 py-3">
        <AnimatePresence mode="sync">
          {d.verified ? (
            <motion.span
              key="verified"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 text-[12px] font-medium text-emerald-600"
            >
              <span aria-hidden>✓</span>
              Verified
            </motion.span>
          ) : (
            <motion.span
              key="unverified"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="text-[12px] font-medium text-amber-600"
            >
              Unverified
            </motion.span>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}

function BackgroundDealersTable({
  dealers,
  highlightId,
}: {
  dealers: Dealer[];
  highlightId: string | null;
}) {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border bg-white/60 backdrop-blur-sm">
      <div className="p-4">
        <div className="text-sm font-medium">Customers</div>
      </div>

      <div className="h-[calc(100%-64px)] overflow-auto scrollbar-hide">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-3 text-left text-[11px]">Company Name</th>
              <th className="px-3 py-3 text-left text-[11px]">GSTIN</th>
              <th className="px-3 py-3 text-left text-[11px]">CIN</th>
              <th className="px-3 py-3 text-left text-[11px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((d, i) => (
              <DealerRow key={d.id} d={d} index={i} highlightId={highlightId} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* initial seed WITHOUT Acme Traders */
const dealerRowsInitial = [
  { name: 'Green Lines', gst: '07GGLNM5555F1AB', cin: 'U12345DL2011PTC000002' },
  { name: 'Metro Supplies', gst: '29MTRPL9999F2CD', cin: 'U12345KA2012PTC000003' },
  { name: 'Quick Parts', gst: '33QKPTR1111Z9PQ', cin: 'U12345TN2013PTC000004' },
  { name: 'Nova Distributors', gst: '06NVDST2222Y8ZX', cin: 'U12345HR2014PTC000005' },
  { name: 'Prime Hardware', gst: '24PRMHW3333A1BB', cin: 'U12345GJ2015PTC000006' },
  { name: 'Alpha Traders', gst: '09ALPHT4444C2CC', cin: 'U12345UP2016PTC000007' },
  { name: 'Omega Parts', gst: '19OMGPT5555D3DD', cin: 'U12345WB2017PTC000008' },
  { name: 'Eastern Motors', gst: '10EASTM6666E4EE', cin: 'U12345BR2018PTC000009' },
  { name: 'West Point', gst: '27WSTPT7777F5FF', cin: 'U12345MH2019PTC000010' },
  { name: 'Sunrise Supplies', gst: '18SUNRS8888G6GG', cin: 'U12345AS2020PTC000011' },
  { name: 'Lakeside Components', gst: '32LAKSC9999H7HH', cin: 'U12345KL2021PTC000012' },
  { name: 'Horizon Export', gst: '36HRZNX0000J8JJ', cin: 'U12345TG2022PTC000013' },
  { name: 'Crest Technologies', gst: '23CRSTT1111K9KK', cin: 'U12345MP2023PTC000014' },
  { name: 'Pioneer Goods', gst: '21PIONR2222L0LL', cin: 'U12345OD2024PTC000015' },
];

