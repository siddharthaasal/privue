import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FormToVerifiedFlow
 *
 * Props:
 *  - formImage: string (URL / local path) — default uses the image you uploaded to the container
 *  - autoplay: boolean — if true the flow starts automatically after mount
 *  - onComplete?: () => void
 *
 * Usage:
 * <FormToVerifiedFlow autoplay={false} formImage="/mnt/data/a2974e9b-188f-4eb0-87b7-4582cebd5bbc.png" />
 *
 * To show inside your mockup:
 *  - Place <FormToVerifiedFlow /> inside PhoneFrame or LaptopFrame as the children.
 */
export default function FormToVerifiedFlow({
  formImage = '/mnt/data/a2974e9b-188f-4eb0-87b7-4582cebd5bbc.png',
  autoplay = false,
  onComplete,
}: {
  formImage?: string;
  autoplay?: boolean;
  onComplete?: () => void;
}) {
  type Step = 'form' | 'submitting' | 'added' | 'upload' | 'verifying' | 'done';
  const [step, setStep] = useState<Step>('form');
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => handleSubmit(), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  useEffect(() => {
    return () => {
      if (uploadTimer.current) window.clearInterval(uploadTimer.current);
    };
  }, []);

  function handleSubmit() {
    setStep('submitting');
    // short submitting step
    setTimeout(() => {
      setStep('added');
      // show "Dealer added" briefly, then start uploads
      setTimeout(() => {
        setStep('upload');
        startUploadSimulation();
      }, 850);
    }, 800);
  }

  function startUploadSimulation() {
    setUploadProgress(0);
    uploadTimer.current = window.setInterval(() => {
      setUploadProgress((p) => {
        // random-ish progress steps
        const next = p + Math.ceil(Math.random() * 12);
        if (next >= 100) {
          if (uploadTimer.current) {
            window.clearInterval(uploadTimer.current);
            uploadTimer.current = null;
          }
          setUploadProgress(100);
          // short delay before verifying
          setTimeout(() => setStep('verifying'), 300);
          return 100;
        }
        return next;
      });
    }, 280);
  }

  function restart() {
    if (uploadTimer.current) window.clearInterval(uploadTimer.current);
    uploadTimer.current = null;
    setUploadProgress(0);
    setStep('form');
  }

  useEffect(() => {
    if (step === 'done') {
      onComplete?.();
    }
  }, [step, onComplete]);

  // Simulate verification finishing
  useEffect(() => {
    if (step === 'verifying') {
      const t = window.setTimeout(() => setStep('done'), 900 + Math.random() * 700);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-md border bg-white shadow-sm">
        {/* base form image */}
        <div className="relative aspect-[4/3] w-full bg-slate-50">
          <img
            src={formImage}
            alt="form"
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
          />

          {/* overlay area (center-right) */}
          <div className="absolute top-4 right-4 w-64">
            <div aria-live="polite" className="sr-only">{`Current step: ${step}`}</div>

            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="flex flex-col gap-2 rounded-md bg-white/95 p-3 shadow">
                    <div className="text-sm font-medium">Review details</div>
                    <div className="text-xs text-slate-500">
                      Make sure GSTIN & mobile are correct
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => restart()}
                        className="flex-1 rounded border px-3 py-1 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'submitting' && (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SmallLoaderLabel title="Submitting..." subtitle="Sending form to server" />
                </motion.div>
              )}

              {step === 'added' && (
                <motion.div
                  key="added"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-md bg-white/95 p-3 shadow">
                    <div className="text-sm font-semibold text-green-700">Dealer added</div>
                    <div className="text-xs text-slate-500">Now upload verification docs</div>
                  </div>
                </motion.div>
              )}

              {step === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-md border bg-white/95 p-3 shadow">
                    <div className="text-sm font-medium">Uploading documents</div>
                    <div className="mb-2 text-xs text-slate-500">proof_of_dealer.pdf</div>

                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ ease: 'linear', duration: 0.28 }}
                        className="h-full rounded-full"
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-400">{uploadProgress}%</div>
                  </div>
                </motion.div>
              )}

              {step === 'verifying' && (
                <motion.div
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SmallLoaderLabel title="Verifying documents" subtitle="Almost done..." />
                </motion.div>
              )}

              {step === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3 rounded-md bg-white/95 p-3 shadow">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-800">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Verified</div>
                      <div className="text-xs text-slate-500">Dealer status updated</div>
                    </div>
                    <div className="ml-auto">
                      <button onClick={restart} className="text-xs text-slate-600 underline">
                        Run again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* bottom right status bar — accessible and persistent */}
        <div className="absolute bottom-4 left-4">
          <div className="rounded-md bg-white/90 px-3 py-1 text-sm shadow">
            <strong className="mr-2">Status:</strong>
            <span className="text-slate-700">
              {step === 'form' && 'Draft'}
              {step === 'submitting' && 'Submitting'}
              {step === 'added' && 'Added'}
              {step === 'upload' && 'Uploading'}
              {step === 'verifying' && 'Verifying'}
              {step === 'done' && 'Verified'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */

function SmallLoaderLabel({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-white/95 p-3 shadow">
      <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#e6e6e6" strokeWidth="3"></circle>
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        ></path>
      </svg>
      <div>
        <div className="text-sm font-medium">{title}</div>
        {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
      </div>
    </div>
  );
}
