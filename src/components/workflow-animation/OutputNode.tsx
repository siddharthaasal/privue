import React from 'react';
import { Handle, Position } from 'reactflow';

function AgentNodeInner({ data }: { data?: { title?: string; icon?: React.ReactNode } }) {
  const title = data?.title ?? 'AI Agent';
  // const IconNode = data?.icon ?? (
  //     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
  //         <rect x="4" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
  //         <circle cx="9" cy="11" r="1.2" fill="currentColor" />
  //         <circle cx="15" cy="11" r="1.2" fill="currentColor" />
  //         <rect x="10.5" y="16" width="3" height="2" rx="0.6" fill="currentColor" />
  //     </svg>
  // );

  return (
    <div
      className="border-privue-700 bg-privue-100/20 flex rounded-lg border-2"
      style={{
        // width:,
        padding: '16px 20px',
        // borderRadius: 12,
        // background: "#fff",
        alignItems: 'center',
        gap: 2,
        boxSizing: 'border-box',
        boxShadow: '0 6px 18px rgba(2,6,23,0.06)',
      }}
    >
      {/* <div
                className=""
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // background: "var(--privue-50,#fbfdff)",
                    border: "1px solid var(--privue-100,#f1f5f9)",
                }}
            >
                <div
                    className="text-privue-700"
                    style={{ width: 28, height: 28, }}>{IconNode}
                </div>
            </div> */}

      {/* <div style={{ fontSize: 15, fontWeight: 700, color: "var(--privue-900,#0f1724)", textAlign: "center" }}>{title}</div> */}
      <div className="text-privue-900 text-base font-semibold">{title}</div>
      {/* connection handles */}

      <Handle
        type="target"
        position={Position.Left}
        id="agent-left"
        style={{
          left: -8,
          top: '50%',
          width: 10,
          height: 10,
          borderRadius: 999,
          background: '#fff',
          border: '2px solid rgba(2,6,23,0.12)',
          zIndex: 20,
        }}
      />

      {/* <Handle
                type="source"
                position={Position.Right}
                id="agent-right"
                style={{
                    right: -8,
                    top: '50%',
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: '#fff',
                    border: '2px solid rgba(2,6,23,0.12)',
                    zIndex: 20,
                }}
            /> */}
    </div>
  );
}

const OutputNode = React.memo(AgentNodeInner);
export { OutputNode };
