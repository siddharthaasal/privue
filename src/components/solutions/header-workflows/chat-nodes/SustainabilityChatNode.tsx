// SustainabilityChatNode.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCheck } from 'lucide-react';

/**
 * Phase mapping:
 * 0 = hidden
 * 1 = userTyping (right)
 * 2 = outgoing (question shown)
 * 3 = incomingTyping (left)
 * 4 = incomingShown (answer visible, question stays)
 * 5 = finished
 */

/* --- Timing constants --- */
const QUESTION_TYPING_MS = 1000;
const ANSWER_TYPING_MS = 1000;
const QUESTION_GAP = 3200;

/* --- Data for Q1: facility table (from the screenshot provided) --- */
const FACILITIES = [
  {
    location: 'Alpha Energy Corp',
    type: 'Industrial',
    riskScore: 'Moderate',
    primaryRisk: 'Flood, Heatwave',
    vulnerability: 5.8,
    lastAssessed: '15 Nov 2024',
  },
  {
    location: 'Beta Mining Ltd',
    type: 'Commercial',
    riskScore: 'High',
    primaryRisk: 'Coastal Flooding',
    vulnerability: 6.9,
    lastAssessed: '10 Nov 2024',
  },
  {
    location: 'Gamma Power Co',
    type: 'Logistics',
    riskScore: 'Moderate',
    primaryRisk: 'Cyclone, Storm Surge',
    vulnerability: 6.2,
    lastAssessed: '08 Nov 2024',
  },
  {
    location: 'Delta Resources',
    type: 'Administrative',
    riskScore: 'Moderate',
    primaryRisk: 'Extreme Heat, Air Quality',
    vulnerability: 5.1,
    lastAssessed: '12 Nov 2024',
  },
] as const;

/* --- Data for Q2: supplier emissions (from the screenshot) --- */
const SUPPLIER_EMISSIONS = [
  { name: 'Alpha Energy Corp', value: 4.1 },
  { name: 'Beta Mining Ltd', value: 3.7 },
  { name: 'Gamma Power Co', value: 3.7 },
  { name: 'Delta Resources', value: 2.9 },
  { name: 'Epsilon Fuels', value: 2.8 },
] as const;

/* --- Component --- */
export function SustainabilityChatNodeInner(): any {
  const [currentIdx, setCurrentIdx] = useState(0); // 0 => Q1, 1 => Q2
  const [phase, setPhase] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    runLifecycle();
    return () => {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
  }, [currentIdx]);

  const runLifecycle = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];

    setPhase(1);
    const t1 = window.setTimeout(() => {
      setPhase(2);
      const t2 = window.setTimeout(() => {
        setPhase(3);
        const t3 = window.setTimeout(() => {
          setPhase(4);
          const t4 = window.setTimeout(() => {
            setPhase(5);
            setCurrentIdx((prev) => (prev + 1) % 2);
          }, QUESTION_GAP);
          timeouts.current.push(t4);
        }, ANSWER_TYPING_MS);
        timeouts.current.push(t3);
      }, QUESTION_TYPING_MS);
      timeouts.current.push(t2);
    }, 600);
    timeouts.current.push(t1);
  };

  const formattedTime = (() => {
    try {
      const d = new Date();
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  })();

  const TypingIndicator: React.FC = () => (
    <>
      <style>{`
        @keyframes acn-dot {
          0% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-5px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.35; }
        }
      `}</style>
      <div
        aria-hidden
        className="inline-flex items-center rounded-xl border bg-slate-50 px-3 py-1.5"
        style={{ borderColor: 'rgba(15,23,36,0.05)' }}
      >
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 0ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 160ms infinite',
          }}
        />
        <span
          className="mx-[5px] inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: 'rgba(15,23,36,0.35)',
            animation: 'acn-dot 900ms ease-in-out 320ms infinite',
          }}
        />
      </div>
    </>
  );

  /* --- Table (stagger-fill style) --- */
  function StaggerFillTable({ data }: { data: typeof FACILITIES }) {
    // compute max vulnerability for bar scaling (vulnerability is out of 10)
    return (
      <div className="w-full">
        <div className="rounded-md border" style={{ borderColor: 'rgba(15,23,36,0.06)' }}>
          <div
            className="grid grid-cols-4 gap-1 border-b px-2 py-1 text-[11px] font-medium text-slate-500"
            style={{ borderColor: 'rgba(15,23,36,0.04)' }}
          >
            <div>Location</div>

            <div>Primary Risk</div>
            <div>Risk Score</div>
            <div>Vulnerability</div>
            {/* <div>Last Assessed</div> */}
          </div>

          <div className="flex flex-col">
            {data.map((row, idx) => {
              // stagger animation delay
              const delay = idx * 90;

              return (
                <div
                  key={row.location}
                  className="grid grid-cols-4 items-center gap-0.5 bg-white px-1 py-1 text-[9px]"
                  style={{
                    animation: `rowFade 360ms cubic-bezier(.2,.9,.2,1) ${delay}ms both`,
                    borderBottom: '1px solid rgba(15,23,36,0.03)',
                  }}
                >
                  <div className="text-slate-800">{row.location}</div>
                  <div className="text-slate-600">{row.primaryRisk}</div>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: 999,
                        fontSize: 9,

                        color:
                          row.riskScore === 'High'
                            ? '#ef4444'
                            : row.riskScore === 'Moderate'
                              ? '#b45309'
                              : '#065f46',
                        border: '1px solid rgba(15,23,36,0.03)',
                      }}
                    >
                      {row.riskScore}
                    </span>
                  </div>

                  <div className="pr-2">
                    <div className="mb-1 text-[11px] text-slate-600">
                      {row.vulnerability.toFixed(1)}/10
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes barGrow {
            to { transform: scaleX(1); }
          }
          @keyframes rowFade {
            from { opacity: 0; transform: translateY(6px) scale(0.995); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    );
  }

  /* --- Minimal horizontal emissions chart (SVG) --- */
  function MinimalEmissionsChart({ data }: { data: typeof SUPPLIER_EMISSIONS }) {
    const maxVal = Math.max(...data.map((d) => d.value), 1);
    const w = 320;
    const rowH = 22;
    const gap = 16;
    const h = data.length * (rowH + gap);

    return (
      <div className="w-full">
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMinYMin meet">
          {data.map((d, i) => {
            const barW = (d.value / maxVal) * (w - 120); // scaled width
            const y = i * (rowH + gap);
            const color = i === 0 ? '#ef4444' : '#94a3b8'; // highlight top entity

            return (
              <g key={d.name} transform={`translate(0,${y})`}>
                {/* label */}
                <text x={4} y={rowH - 6} fontSize={11} fill="#0f1724" fontWeight={500}>
                  {d.name}
                </text>

                {/* animated bar */}
                <rect x={110} y={rowH / 4} height={rowH / 2} rx={3} fill={color} width={0}>
                  <animate
                    attributeName="width"
                    from="0"
                    to={String(barW)}
                    begin={`${i * 0.15}s`}
                    dur="0.6s"
                    fill="freeze"
                  />
                </rect>

                {/* value (right aligned) */}
                <text x={w - 6} y={rowH - 6} fontSize={11} fill="#475569" textAnchor="end">
                  {d.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  /* --- Which QnA --- */
  const qIndex = currentIdx % 2;

  return (
    <div
      role="group"
      aria-label="Sustainability chat preview node"
      className="border-privue-700 relative box-border h-[480px] w-full max-w-[520px] min-w-[380px] overflow-hidden rounded-lg border-2 bg-white/95 p-4 font-sans"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[13px] font-medium text-slate-900">Sustainability Workspace</div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-[18%] right-0 bottom-16 left-0 flex flex-col justify-end overflow-hidden">
        <div className="pointer-events-auto relative flex w-full flex-col gap-3 px-3">
          {/* user typing */}
          {phase === 1 && (
            <div className="self-end">
              <TypingIndicator />
            </div>
          )}

          {/* question bubble (plain white) */}
          {(phase === 2 || phase === 3 || phase === 4) && (
            <article
              className="self-end rounded-[14px] border bg-white p-2 shadow-sm"
              style={{ borderColor: 'rgba(15,23,36,0.04)' }}
            >
              <div className="flex items-end gap-2 pr-2 pl-3">
                <p className="m-0 flex-1 text-right text-[13px] leading-[1.42] text-[#0f1724]">
                  {qIndex === 0
                    ? 'What are the potential climate risks for the facility?'
                    : 'Can you estimate the carbon emission of these suppliers?'}
                </p>
              </div>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                <time dateTime={new Date().toISOString()} className="text-[10px] text-[#64748b]">
                  {formattedTime}
                </time>
                <CheckCheck size={14} style={{ color: 'rgba(99,102,241,0.9)' }} />
              </div>
            </article>
          )}

          {/* incoming typing */}
          {phase === 3 && (
            <div className="self-start">
              <TypingIndicator />
            </div>
          )}

          {/* answer bubble */}
          {phase === 4 && (
            <article
              className="self-start rounded-[14px] border bg-white p-3"
              style={{ borderColor: 'rgba(15,23,36,0.04)' }}
            >
              {qIndex === 0 && (
                <div className="flex flex-col gap-3">
                  {/* <div className="text-[12px] text-slate-600">Here are facility vulnerabilities — sorted and visualized.</div> */}
                  <StaggerFillTable data={FACILITIES} />
                </div>
              )}

              {qIndex === 1 && (
                <div className="flex flex-col gap-3">
                  <div className="text-[12px] text-slate-600">
                    Estimated relative emissions (MtCO₂e share approximation).
                  </div>
                  <div className="rounded-md bg-[rgba(15,23,36,0.02)] p-2">
                    <MinimalEmissionsChart data={SUPPLIER_EMISSIONS} />
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    Values are illustrative and shown as a relative comparison.
                  </div>
                </div>
              )}

              <div className="mt-2 flex justify-end gap-1.5">
                <time dateTime={new Date().toISOString()} className="text-[10px] text-[#64748b]">
                  {formattedTime}
                </time>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-3 left-4 text-left text-[12px] text-[#64748b]">
        Visualize climate & supplier insights quickly.
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="chat-left"
        style={{
          left: -8,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '16.5%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="chat-right"
        style={{
          right: -8,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '45%',
        }}
      />
    </div>
  );
}

const SustainabilityChatNode = React.memo(SustainabilityChatNodeInner);
export { SustainabilityChatNode };
export default SustainabilityChatNode;
