import React from "react";
import { FileText, ImageIcon, Cloud, ShieldAlert } from "lucide-react";
import { Handle, Position } from "reactflow";

type DataNodeProps = {
    data: {
        label: string;
        // still accept an icons array for compatibility, but we only use the first item
        icons?: { id: string; label?: string; src?: string }[];
        compact?: boolean;
    };
};

function DataNodeInner({ data }: DataNodeProps) {
    const { icons = [], compact = false, label } = data;

    // map ids to lucide components (adjust names if you imported aliases)
    const IconMap: Record<string, any> = {
        file: FileText,
        img: ImageIcon,
        cloud: Cloud,
        cyber: ShieldAlert,
    };

    const primary = icons[0] ?? { id: "file", label: "file" };
    const IconComponent = IconMap[primary.id] ?? FileText;

    // Choose a deterministic width so handles + edges stay stable.
    // Use px values so CSS width is exact and label won't reflow the node size.
    const cardWidth = compact ? 72 : 120; // px
    const cardHeight = 64; // px

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                width: cardWidth, // ensure wrapper equals card width so label width matches
                boxSizing: "border-box",
            }}
        >
            {/* Card (contains only the primary icon) */}
            <div
                className="flex items-center justify-center p-3 bg-white/50 text-slate-900 border border-privue-800"
                style={{
                    borderTopLeftRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    width: cardWidth,
                    height: cardHeight,
                    boxSizing: "border-box",
                    position: "relative", // for precise handle placement
                    overflow: "visible",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-md flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm"
                        title={primary.label ?? primary.id}
                        aria-label={primary.label ?? primary.id}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
                        left: -6,
                        width: 10,
                        height: 10,
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
                        right: -6,
                        width: 10,
                        height: 10,
                        borderRadius: 99,
                        background: "#ffffff",
                        border: "3px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 1px 4px rgba(2,6,23,0.35)",
                    }}
                />
            </div>

            {/* Label BELOW the card, width locked to the card's width so it won't expand the node */}
            <div
                className="text-sm text-privue-900 font-medium truncate"
                style={{
                    width: cardWidth,
                    maxWidth: cardWidth,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={label}
            >
                {label}
            </div>
        </div>
    );
}

const DataNode = React.memo(DataNodeInner);

export { DataNode };
