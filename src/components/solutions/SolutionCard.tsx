import React, { useEffect, useState } from 'react';

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

  // track whether we're on a small viewport to enable mobile-only truncation UI
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // initial set
    setIsMobile(mq.matches);
    // listen
    if ('addEventListener' in mq) {
      mq.addEventListener('change', handler);
    } else {
      // fallback for older browsers
      // @ts-ignore
      mq.addListener(handler);
    }
    return () => {
      if ('removeEventListener' in mq) {
        mq.removeEventListener('change', handler);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
      }
    };
  }, []);

  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = isMobile && description.length > 120;

  const truncatedText = shouldTruncate && !expanded
    ? description.slice(0, 110).trim() + '…'
    : description;

  return (
    <div
      // mobile-first compact spacing; md:... reverts to your original exact desktop layout
      className="
        w-full flex flex-col items-start gap-4 px-4 py-6 text-left
        md:mx-auto md:flex md:flex-col md:items-start md:gap-12 md:px-6 md:py-12 md:text-left
      "
    >
      <div className="flex gap-2 itmes-center">
        {isString ? (
          <img
            src={iconSrc}
            alt={`${heading} icon`}
            // smaller icon on mobile, original size on md+
            className="h-8 w-8 object-contain md:h-10 md:w-10"
          />
        ) : IconComponent ? (
          // many icon libs accept className for sizing (lucide/heroicons etc.)
          <IconComponent
            className="h-6 w-6 md:h-10 md:w-10 text-privue-700"
            aria-hidden="true"
          />
        ) : null}
        <div>
          <p className="mb-1 text-lg font-medium tracking-normal block md:hidden">{heading}</p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="mb-1 text-lg font-medium tracking-normal hidden md:block">{heading}</p>

        <p className="text-[15px] font-normal text-gray-700">
          {truncatedText}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center text-sm font-medium text-privue-700 hover:underline focus:outline-none"
          >
            {expanded ? 'Show less' : 'Read more'}
            <svg
              className={`ml-2 w-4 h-4 transform ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
