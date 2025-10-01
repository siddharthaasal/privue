import React from 'react';

interface SolutionCardProps {
  heading: string;
  description: string;
  icon?: React.ComponentType<any> | string;
}

export default function SolutionCard({ heading, description, icon }: SolutionCardProps) {
  const isString = typeof icon === 'string' || icon === undefined;
  const defaultIconPath = '/solutions/lock.svg';
  const iconSrc = isString ? (icon as string) || defaultIconPath : undefined;
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

  return (
    <div className="mx-auto flex flex-col items-start gap-12 px-6 py-12 text-left">
      {isString ? (
        <img src={iconSrc} alt={`${heading} icon`} className="h-10 w-10 object-contain" />
      ) : IconComponent ? (
        // many icon libs accept className for sizing (lucide/heroicons etc.)
        <IconComponent className="text-privue-700 h-10 w-10" aria-hidden="true" />
      ) : null}

      <div>
        <p className="mb-1 text-lg font-medium tracking-normal">{heading}</p>
        <p className="text-[15px] font-normal">{description}</p>
      </div>
    </div>
  );
}
