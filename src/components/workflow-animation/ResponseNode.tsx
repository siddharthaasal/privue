import { Handle, Position } from 'reactflow';
import React from 'react';

function ResponseNodeInner({
  data,
}: {
  data: {
    items: { id: string; Icon: React.ReactNode; title: string; subtitle?: string }[];
    title?: string;
  };
}) {
  const items = (data && data.items) || [];
  const title = data?.title;

  return (
    <div
      style={{
        width: 360,
        padding: 14,
        boxSizing: 'border-box',
        borderRadius: 12,
        background: '#ffffff',
        border: '1px solid rgba(15,23,36,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {title ? (
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--privue-900,#0f1724)' }}>
          {title}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', width: '100%' }}>
        {items.slice(0, 3).map((it) => (
          <div
            key={it.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              width: 100,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--privue-50,#fbfdff)',
                border: '1px solid var(--privue-100,#f1f5f9)',
                boxShadow: '0 6px 14px rgba(16,24,40,0.03)',
              }}
            >
              {/* Icon passed as React node; ensure it fits inside container */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--privue-700,#475569)',
                }}
              >
                {it.Icon}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--privue-900,#0f1724)' }}>
                {it.title}
              </div>
              {it.subtitle ? (
                <div style={{ fontSize: 11, color: 'var(--privue-600,#64748b)', marginTop: 4 }}>
                  {it.subtitle}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* connection handles */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <div />
        <div />
      </div>

      {/* left & right handles positioned relative to the whole node */}
      <Handle
        type="target"
        position={Position.Left}
        id="response-left"
        style={{
          left: -6,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '50%',
          pointerEvents: 'auto',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="response-right"
        style={{
          right: -6,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: 'var(--privue-700,#475569)',
          border: 'none',
          top: '50%',
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
}
const ResponseNode = React.memo(ResponseNodeInner);
export { ResponseNode };
