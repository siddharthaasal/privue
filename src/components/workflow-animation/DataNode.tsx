import React, { useRef, useLayoutEffect, useState } from 'react';
import { FileText } from 'lucide-react'; // fallback only
import { Handle, Position } from 'reactflow';

type IconProp =
  | React.ReactNode // <MyIcon />
  | React.ComponentType<any> // MyIcon
  | string; // image URL

type DataNodeProps = {
  data: {
    label: string;
    icon?: IconProp;
  };
};

function DataNodeInner({ data }: DataNodeProps) {
  const { icon, label } = data;

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  // measure actual card width after render
  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 20);
    }
  }, [label, icon]);

  const renderIcon = (ic?: IconProp) => {
    if (!ic) return <FileText size={25} />;

    if (React.isValidElement(ic)) return ic;

    if (typeof ic === 'string') {
      return (
        <img
          src={ic}
          alt={""}
          aria-hidden={true}
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
    return <IconComponent size={30} color={'#374151'} />;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        boxSizing: 'border-box',
      }}
    >
      {/* Card (auto width, based on icon + padding) */}
      <div
        ref={cardRef}
        className="bg-privue-100/20 border-privue-700 flex items-center justify-center border-2 p-3 text-slate-900"
        style={{
          borderTopLeftRadius: 18,
          borderBottomLeftRadius: 18,
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          height: 64,
          position: 'relative',
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-md">
          {renderIcon(icon)}
        </div>

        {/* handles */}
        {/* <Handle
                    type="target"
                    position={Position.Left}
                    id="left"
                    style={{
                        left: -6,
                        width: 10,
                        height: 10,
                        borderRadius: 99,
                        background: "#fff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                /> */}
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{
            right: -6,
            width: 10,
            height: 10,
            borderRadius: 99,
            background: '#fff',
            border: '3px solid rgba(255,255,255,0.95)',
            boxShadow: '0 1px 4px rgba(2,6,23,0.35)',
          }}
        />
      </div>

      {/* Label (multi-line, wraps instead of ellipsis) */}
      <div
        className="text-privue-900 text-sm font-semibold"
        style={{
          width: cardWidth || 'auto',
          maxWidth: cardWidth || 'auto',
          textAlign: 'center',
          whiteSpace: 'normal', // ✅ allow wrapping
          wordBreak: 'keep-all', // ensures long words break if needed
        }}
        title={label}
      >
        {label}
      </div>
    </div>
  );
}

export const DataNode = React.memo(DataNodeInner);
