import React, { useEffect, useRef, useState } from 'react';

interface UseCaseCardProps {
  icon?: React.ComponentType<any> | string;
  heading: string;
  desc: string;
}

export default function UseCaseCard({ icon, heading, desc }: UseCaseCardProps) {
  const isString = typeof icon === 'string' || icon === undefined;
  const defaultIcon = ''; // e.g. "/solutions/lock.svg" if you want a fallback
  const iconSrc = isString ? (icon as string) || defaultIcon : undefined;
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

  // track whether we're on a small viewport to enable mobile-only accordion UI
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if ('addEventListener' in mq) {
      mq.addEventListener('change', handler);
    } else {
      // fallback
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

  // accordion state + refs for animation
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    if (!isMobile) {
      // ensure accordion closed / fully visible state not interfering on md+
      setOpen(false);
      setMaxHeight('0px');
      return;
    }
    if (open && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [open, isMobile, desc]);

  // small helper id for aria
  const contentId = `usecase-desc-${heading.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className="
        flex flex-col items-start gap-6 px-2 text-left
        md:flex-col md:items-start md:gap-6
      "
    >
      {isMobile ? (
        <div className="w-full">
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls={contentId}
            className="w-full flex items-center gap-3 px-1 py-0 "
          >
            {isString ? (
              <img
                src={iconSrc}
                alt={`${heading} icon`}
                className="h-8 w-8 object-contain"
              />
            ) : IconComponent ? (
              <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-privue-700" aria-hidden="true" />
            ) : null}

            <span className="text-base font-medium text-gray-900 text-left flex-1">
              {heading}
            </span>

            {/* chevron */}
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <p className="text-[15px] font-normal text-gray-700">
                {desc}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          < div className="hidden w-full flex-col items-start gap-4 md:flex">
            {isString ? (
              iconSrc ? (
                <img
                  src={iconSrc}
                  alt={heading ? `${heading} icon` : 'capability icon'}
                  className="h-9 w-9 object-contain"
                />
              ) : null
            ) : IconComponent ? (
              <IconComponent className="h-7 w-7 text-privue-700" aria-hidden="true" />
            ) : null}

            <div>
              {heading && (
                <p className="text-base font-medium tracking-normal">{heading}</p>
              )}
              <p className="text-base font-normal tracking-normal text-gray-700">
                {desc}
              </p>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}
