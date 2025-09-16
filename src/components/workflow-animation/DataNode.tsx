import React from "react";
import { FileText, ImageIcon, Cloud, ShieldAlert } from "lucide-react"; // dummy icons
import { Handle, Position } from "reactflow";

type DataNodeProps = {
    data: {
        label: string;
        icons?: { id: string; label?: string; src?: string }[];
        compact?: boolean;
    };
};

function DataNodeInner({ data }: DataNodeProps) {
    const { icons = [], compact } = data;

    // map ids to lucide components (adjust names if you imported aliases)
    const IconMap: Record<string, any> = {
        file: FileText,
        img: ImageIcon,
        // db: Database,
        cloud: Cloud,
        cyber: ShieldAlert,
    };

    const primary = icons[0] ?? { id: "file", label: "file" };
    const IconComponent = IconMap[primary.id] ?? FileText;

    const cardMinWidth = compact ? 20 : 30;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>


            {/* Card (contains only the primary icon) */}
            <div
                className="flex items-center justify-center p-3 bg-white/50 text-slate-900 border border-privue-800"
                style={{
                    borderTopLeftRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    minWidth: cardMinWidth,
                    minHeight: 64,
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <div
                        className="w-10 h-10 rounded-md flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm"
                        title={primary.label ?? primary.id}
                        aria-label={primary.label ?? primary.id}
                    >
                        <IconComponent size={18} className="text-slate-700" />
                    </div>
                </div>

                {/* connection handles: left target and right source */}
                <Handle
                    type="target"
                    position={Position.Left}
                    id="left"
                    style={{
                        left: -5,
                        width: 8,
                        height: 8,
                        borderRadius: 99,
                        background: "#ffffff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="right"
                    style={{
                        right: -5,
                        width: 8,
                        height: 8,
                        borderRadius: 99,
                        background: "#ffffff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                />
            </div>
            {/* Label outside the border (above the card) */}
            {/* <div className="text-sm text-privue-900 font-medium truncate" style={{ marginLeft: 6 }}>
                {label}
            </div> */}
        </div>
    );
}

const DataNode = React.memo(DataNodeInner);

export { DataNode };