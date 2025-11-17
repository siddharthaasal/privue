import React, { useEffect, useRef, useState } from 'react';
// need to add shorthands for mobile
interface ProblemCardProps {
  icon: React.ComponentType<any> | string;
  heading: string;
  description: string;
  shortHeading?: string;
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

function ProblemCardMobile({ icon, heading, description, shortHeading }: ProblemCardProps) {
  const isString = typeof icon === 'string' || icon === undefined;
  const defaultIconPath = '/solutions/lock.svg';
  const iconSrc = isString ? (icon as string) || defaultIconPath : undefined;
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    if (open && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [open, description]);

  const contentId = `problem-desc-${heading.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex w-full flex-col items-start gap-4 px-4 py-4 text-left md:mx-auto md:flex md:flex-col md:items-start md:gap-12 md:px-6 md:py-12 md:text-left">
      {' '}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center gap-3 px-1 py-0"
        >
          {isString ? (
            <img src={iconSrc} alt={`${heading} icon`} className="h-8 w-8 object-contain" />
          ) : IconComponent ? (
            <IconComponent className="text-privue-700 h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
          ) : null}

          <span className="flex-1 text-left text-base font-medium text-gray-900">
            {shortHeading || heading}
          </span>

          {/* chevron */}
          <svg
            className={`h-4 w-4 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* animated collapsible content */}
        <div
          id={contentId}
          ref={contentRef}
          style={{
            maxHeight,
            transition: 'max-height 220ms ease',
            overflow: 'hidden',
          }}
          className=""
        >
          <div className="pt-1">
            <p className="text-[15px] font-normal text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProblemCard, ProblemCardMobile };
