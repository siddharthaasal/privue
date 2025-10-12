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
      className={`
        group block w-full -ml-2.5 md:-ml-0 md:rounded-md md:border border-gray-100 md:bg-white  py-1 md:py-3 md:p-3 transition-all duration-300 
        hover:-translate-y-1 hover:shadow-sm
        sm:p-4
      `}
    >
      <div className="flex items-center sm:items-start gap-0 sm:gap-4">
        {hasIcon && (
          <div
            className={`
              md:bg-privue-100 group-hover:bg-privue-200 flex items-center justify-center rounded-full 
              transition-colors duration-300
              h-9 w-9 sm:h-11 sm:w-11
            `}
          >
            <div
              className={`
                text-privue-700 md:text-privue-700 transition-transform duration-300 group-hover:scale-110
              `}
            >
              {renderIconNode(icon!, 'w-4 h-4 sm:w-6 sm:h-6')}
            </div>
          </div>
        )}

        <div className="flex-1">
          <h3
            className={`
              text-sm md:font-medium md:text-foreground 
              group-hover:text-privue-800 transition-colors duration-300
              sm:text-base
            `}
          >
            {title}
          </h3>

          {/* Hidden on mobile, visible on tablet+ */}
          <p
            className={`
              hidden sm:block text-muted-foreground text-sm 
              group-hover:text-foreground/80 transition-colors duration-300
            `}
          >
            {description}
          </p>
        </div>

        <div
          className={`
    flex text-muted-foreground group-hover:text-privue-700
    my-auto ml-auto items-center transition-colors
  `}
        >
          <svg
            className="w-4 h-4 md:w-[18px] md:h-[18px]"
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
