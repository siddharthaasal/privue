import React from "react";

interface ProblemCardProps {
    icon: React.ComponentType<any> | string;
    heading: string;
    description: string;
}

export default function ProblemCard({ icon, heading, description }: ProblemCardProps) {
    const isString = typeof icon === "string";
    const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

    return (
        <div className="flex flex-col items-start px-6 py-12 gap-12 text-left">
            {isString ? (
                <img src={icon as string} alt={`${heading} icon`} className="w-8 h-8 object-contain" />
            ) : IconComponent ? (
                // Pass className so typical icon components (lucide, heroicons, etc.) receive sizing
                <IconComponent className="w-8 h-8 text-privue-700" aria-hidden="true" />
            ) : null}

            <div>
                <p className="font-medium text-lg mb-1 tracking-normal">{heading}</p>
                <p className="font-normal text-[15px]">{description}</p>
            </div>
        </div>
    );
}
