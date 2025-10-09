import React from 'react';

interface ProblemCardProps {
  icon: React.ComponentType<any> | string;
  heading: string;
  description: string;
}

function ProblemCard({ icon, heading, description }: ProblemCardProps) {
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

function ProblemCardMobile({
  icon,
  heading,
  description,
}: ProblemCardProps) {
  const isString = typeof icon === 'string';
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

  return (
    <div className="flex flex-col items-start gap-2 px-6 py-4 text-left">
      {/* Top row — icon + heading */}
      <div className="flex items-center gap-2">
        {isString ? (
          <img
            src={icon as string}
            alt={`${heading} icon`}
            className="h-4 w-4 object-contain"
          />
        ) : IconComponent ? (
          <IconComponent className="text-privue-700 h-5 w-5" aria-hidden="true" />
        ) : null}

        <p className="text-[15px] font-medium text-gray-800">{heading}</p>
      </div>

      {/* Description */}
      <p className="text-[13px] font-normal leading-snug">{description}</p>
    </div>
  );
}

export { ProblemCard, ProblemCardMobile }