import React from 'react';
import { Handle, Position } from 'reactflow';
import { FileText } from 'lucide-react'; // fallback icon

type IconProp = React.ReactNode | React.ComponentType<any> | string;

type ToolNodeData = {
  title?: string;
  subtitle?: string;
  icon?: IconProp;
  iconSize?: number;
};

function slugify(str = '') {
  return str
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .toLowerCase();
}

function ToolNodeInner({ data }: { data?: ToolNodeData }) {
  const title = (data && data.title) || 'Tool';
  const subtitle = (data && data.subtitle) || '';
  const icon = data?.icon;
  const iconSize = data?.iconSize ?? 28;

  const renderIcon = (ic?: IconProp) => {
    if (!ic) {
      return <FileText width={iconSize} height={iconSize} aria-hidden />;
    }
    if (React.isValidElement(ic)) return ic;
    if (typeof ic === 'string') {
      return (
        <img
          src={ic}
          alt={title}
          style={{
            width: 50,
            height: 50,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      );
    }
    const IconComponent = ic as React.ComponentType<any>;
    return <IconComponent size={iconSize} color={'#374151'} />;
  };

  return (
    <div
      style={{
        width: 120,
        // allow height to grow when title/subtitle wrap -> don't fix height
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        position: 'relative', // required so Handle styles are relative to this node
        padding: 8,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <div
        className="border-privue-700 bg-privue-100/20 border-2"
        style={{
          width: 76,
          height: 76,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(76,110,245,0.06)',
          boxSizing: 'border-box',
          padding: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--privue-700,#475569)',
            lineHeight: 0,
          }}
        >
          {renderIcon(icon)}
        </div>
      </div>

      <div
        className="text-privue-900 text-sm font-semibold"
        style={{
          width: 'auto',
          textAlign: 'center',
          whiteSpace: 'normal', // ✅ allow wrapping
          overflowWrap: 'break-word',
          wordBreak: 'break-word', // ensures long words break if needed
        }}
        title={title}
      >
        {title}
      </div>

      {subtitle ? (
        <div
          style={{
            fontSize: 11,
            color: 'var(--privue-600,#64748b)',
            textAlign: 'center',
            maxWidth: '100%',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {subtitle}
        </div>
      ) : null}

      {/* Center handle horizontally using left:50% + translateX(-50%).
                Use a small negative top so handle sits visually on the outside/top of the circle.
                Note: don't rely on 'position: static' — the Handle will be absolutely positioned relative to parent. */}
      <Handle
        type="target"
        position={Position.Top}
        id={`tool-top-${slugify(title)}`}
        style={{
          // center horizontally regardless of width/height changes
          left: '50%',
          transform: 'translateX(-50%)',
          // move slightly above the node; adjust to taste (-6, -8, -12)
          top: 1,
          width: 10,
          height: 10,
          borderRadius: 999,
          background: '#fff',
          border: '2px solid rgba(2,6,23,0.08)',
          zIndex: 10,
        }}
      />
    </div>
  );
}

const ToolNode = React.memo(ToolNodeInner);
export { ToolNode };
