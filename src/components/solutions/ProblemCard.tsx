import React from 'react';

interface ProblemCardProps {
  icon: React.ComponentType<any> | string;
  heading: string;
  description: string;
}

export default function ProblemCard({ icon, heading, description }: ProblemCardProps) {
  const isString = typeof icon === 'string';
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

  return (
    <div className="flex flex-col items-start gap-12 px-6 py-12 text-left">
      {isString ? (
        <img src={icon as string} alt={`${heading} icon`} className="h-8 w-8 object-contain" />
      ) : IconComponent ? (
        // Pass className so typical icon components (lucide, heroicons, etc.) receive sizing
        <IconComponent className="text-privue-700 h-8 w-8" aria-hidden="true" />
      ) : null}

      <div>
        <p className="mb-1 text-lg font-medium tracking-normal">{heading}</p>
        <p className="text-[15px] font-normal">{description}</p>
      </div>
    </div>
  );
}
