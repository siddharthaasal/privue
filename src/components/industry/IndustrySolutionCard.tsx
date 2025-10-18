'use client';

import React from 'react';

type IndustrySolutionCardProps = {
  icon?: string | React.ComponentType<any> | React.ReactNode;
  title: string;
  description: string;
  href: string;
};

export default function IndustrySolutionCard({
  icon,
  title,
  description,
  href,
}: IndustrySolutionCardProps) {
  // helper to normalize/render icon
  const renderIconNode = (
    iconVal: string | React.ComponentType<any> | React.ReactNode,
    sizeClass = 'w-5 h-5',
  ) => {
    if (!iconVal) return null;

    if (typeof iconVal === 'string') {
      return (
        <img
          src={iconVal}
          alt=""
          aria-hidden
          loading="lazy"
          className={`${sizeClass} object-contain`}
        />
      );
    }

    if (React.isValidElement(iconVal)) {
      const elem = iconVal as React.ReactElement<any, any>;
      return React.cloneElement(elem, {
        className: `${sizeClass} ${elem.props?.className ?? ''}`.trim(),
        'aria-hidden': true,
      });
    }

    if (typeof iconVal === 'function') {
      const IconComp = iconVal as React.ComponentType<any>;
      return <IconComp className={sizeClass} aria-hidden />;
    }

    return null;
  };

  const hasIcon = !!icon;

  return (
    <a
      href={href}
      className={`group -ml-2.5 block w-full border-gray-100 py-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm sm:p-4 md:-ml-0 md:rounded-md md:border md:bg-white md:p-3 md:py-3`}
    >
      <div className="flex items-center gap-0 sm:items-start sm:gap-4">
        {hasIcon && (
          <div
            className={`md:bg-privue-100 group-hover:bg-privue-200 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 sm:h-11 sm:w-11`}
          >
            <div
              className={`text-privue-700 md:text-privue-700 transition-transform duration-300 group-hover:scale-110`}
            >
              {renderIconNode(icon!, 'w-4 h-4 sm:w-6 sm:h-6')}
            </div>
          </div>
        )}

        <div className="flex-1">
          <h3
            className={`md:text-foreground group-hover:text-privue-800 text-sm transition-colors duration-300 sm:text-base md:font-medium`}
          >
            {title}
          </h3>

          {/* Hidden on mobile, visible on tablet+ */}
          <p
            className={`text-muted-foreground group-hover:text-foreground/80 hidden text-sm transition-colors duration-300 sm:block`}
          >
            {description}
          </p>
        </div>

        <div
          className={`text-muted-foreground group-hover:text-privue-700 my-auto ml-auto flex items-center transition-colors`}
        >
          <svg
            className="h-4 w-4 md:h-[18px] md:w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
