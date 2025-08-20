// import { useState } from "react";

interface ExpandableCardProps {
    title: string;
    description: string;
    image: string;
    details: string[];
    isRightMost?: boolean;
    expanded: boolean;
    onExpand: () => void;
    isSiblingExpanded: boolean;
}

export default function FeatureExpandableCard({
    title,
    description,
    image,
    details,
    isRightMost = false,
    expanded,
    onExpand,
    isSiblingExpanded,
}: ExpandableCardProps) {
    return (
        <div
            onClick={onExpand}
            className={`
                transition-all duration-300 rounded-2xl p-6 shadow-md cursor-pointer
                bg-gradient-to-br from-indigo-50 to-purple-50
                flex overflow-hidden
                ${expanded ? "col-span-3 md:col-span-2" : ""}
                ${isSiblingExpanded ? "scale-95 opacity-80" : ""}
                h-full
            `}
        >
            <div className={`
                flex w-full
                ${expanded ? (isRightMost ? "flex-row-reverse" : "flex-row") : "flex-col"}
            `}>
                {/* Content section */}
                <div className={`${expanded ? "flex-1" : "w-full"}`}>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <img src={image} alt={title} className="h-28 mx-auto" />
                    <button className="mt-4 px-4 py-2 bg-white rounded-full shadow text-sm font-medium flex items-center gap-2 mx-auto">
                        Learn more ↗
                    </button>
                </div>

                {/* Expanded details */}
                {expanded && (
                    <div className="flex-1 flex flex-col justify-center gap-4 pl-6 border-l border-gray-200">
                        {details.map((point, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm text-gray-700"
                            >
                                <span className="text-indigo-600">✓</span>
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
