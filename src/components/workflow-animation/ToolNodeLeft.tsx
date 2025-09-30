import React from "react";
import { Handle, Position } from "reactflow";
import { FileText } from "lucide-react"; // fallback icon

type IconProp =
    | React.ReactNode // <MyIcon />
    | React.ComponentType<any> // MyIcon (component)
    | string; // image URL

type ToolNodeData = {
    title?: string;
    subtitle?: string;
    icon?: IconProp;
    iconSize?: number; // optional override (px)
};

function ToolNodeLeftInner({ data }: { data?: ToolNodeData }) {
    const title = (data && data.title) || "Tool";
    const subtitle = (data && data.subtitle) || "";
    const icon = data?.icon;
    const iconSize = data?.iconSize ?? 28; // default icon size

    const renderIcon = (ic?: IconProp) => {
        if (!ic) {
            return <FileText width={iconSize} height={iconSize} aria-hidden />;
        }

        // already JSX element
        if (React.isValidElement(ic)) return ic;

        // image url
        if (typeof ic === "string") {
            return (
                <img
                    src={ic}
                    alt={title}
                    style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        display: "block",
                    }}
                />
            );
        }

        // component (function/class)
        const IconComponent = ic as React.ComponentType<any>;
        // pass props commonly supported by svg icon libs
        return <IconComponent size={30} color={"#374151"} />;
    };

    return (
        <div
            style={{
                width: 120,
                height: 120,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                position: "relative",
            }}
        >
            <div
                className="border-2 border-privue-700 bg-privue-100/20"
                style={{
                    width: 76,
                    height: 76,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(76,110,245,0.06)",
                    boxSizing: "border-box",
                    padding: 8,
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--privue-700,#475569)",
                        // ensure svg fills the available box
                        lineHeight: 0,
                    }}
                >
                    {renderIcon(icon)}
                </div>
            </div>

            <div
                className="text-sm text-privue-900 font-semibold"
            // style={{
            //     fontSize: 12,
            //     fontWeight: 700,
            //     color: "var(--privue-900,#0f1724)",
            //     textAlign: "center",
            // }}
            >
                {title}
            </div>
            {subtitle ? (
                <div
                    style={{
                        fontSize: 11,
                        color: "var(--privue-600,#64748b)",
                        textAlign: "center",
                    }}
                >
                    {subtitle}
                </div>
            ) : null}

            <Handle
                type="target"
                position={Position.Top}
                id={`tool-top-${title}`}
                style={{
                    top: 3,
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#fff",
                    border: "2px solid rgba(2,6,23,0.08)",
                }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="tool-left"
                style={{
                    left: 15,
                    width: 10,
                    height: 10,
                    top: "45%",
                    borderRadius: 999,
                    background: "#fff",
                    border: "2px solid rgba(2,6,23,0.08)",
                }}
            />
        </div>
    );
}

const ToolNodeLeft = React.memo(ToolNodeLeftInner);
export { ToolNodeLeft };
