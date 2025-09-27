import React from "react";

interface SolutionCardProps {
    heading: string;
    description: string;
    icon?: React.ComponentType<any> | string;
}

export default function SolutionCard({ heading, description, icon }: SolutionCardProps) {
    const isString = typeof icon === "string" || icon === undefined;
    const defaultIconPath = "/solutions/lock.svg";
    const iconSrc = isString ? (icon as string) || defaultIconPath : undefined;
    const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

    return (
        <div className="flex flex-col items-start gap-12 px-6 py-12 mx-auto text-left">
            {isString ? (
                <img
                    src={iconSrc}
                    alt={`${heading} icon`}
                    className="w-10 h-10 object-contain"
                />
            ) : IconComponent ? (
                // many icon libs accept className for sizing (lucide/heroicons etc.)
                <IconComponent className="w-10 h-10 text-privue-700" aria-hidden="true" />
            ) : null}

            <div>
                <p className="font-medium text-lg mb-1 tracking-normal">{heading}</p>
                <p className="font-normal text-[15px]">{description}</p>
            </div>
        </div>
    );
}
