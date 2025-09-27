import React from "react";

interface UseCasesCardProps {
    icon?: React.ComponentType<any> | string;
    heading?: string;
    desc: string;
}

export default function UseCasesCard({ icon, heading, desc }: UseCasesCardProps) {
    const isString = typeof icon === "string" || icon === undefined;
    const defaultIcon = ""; // set to "/icons/default.svg" if you want a fallback
    const iconSrc = isString ? ((icon as string) || defaultIcon) : undefined;
    const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

    return (
        <div className="flex flex-col items-start gap-6 px-4 text-left">
            {/* Icon */}
            {isString ? (
                iconSrc ? (
                    <img
                        src={iconSrc}
                        alt={heading ? `${heading} icon` : "usecase icon"}
                        className="w-11 h-11 object-contain"
                    />
                ) : null
            ) : IconComponent ? (
                <IconComponent className="w-7 h-7 text-privue-700" aria-hidden="true" />
            ) : null}

            {/* Text */}
            <div>
                {heading && <p className="font-medium text-base tracking-normal">{heading}</p>}
                <p className="font-normal text-base tracking-normal">{desc}</p>
            </div>
        </div>
    );
}
