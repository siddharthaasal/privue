import React from 'react';

interface CapabilitiesCardProps {
  icon?: React.ComponentType<any> | string;
  heading?: string;
  desc: string;
}

export default function CapabilitiesCard({ icon, heading, desc }: CapabilitiesCardProps) {
  const isString = typeof icon === 'string' || icon === undefined;
  const defaultIcon = ''; // e.g. "/solutions/lock.svg" if you want a fallback
  const iconSrc = isString ? (icon as string) || defaultIcon : undefined;
  const IconComponent = !isString ? (icon as React.ComponentType<any>) : null;

  return (
    <div className="flex flex-col items-start gap-6 px-2 text-left md:flex-col md:items-start md:gap-6">
      {/* MOBILE (icon + heading inline) */}
      <div className="w-full space-y-2 md:hidden">
        <div className="flex items-start gap-3">
          {isString ? (
            iconSrc ? (
              <img
                src={iconSrc}
                alt={heading ? `${heading} icon` : 'capability icon'}
                className="h-7 w-7 object-contain"
              />
            ) : null
          ) : IconComponent ? (
            <IconComponent className="text-privue-700 mt-1 h-5 w-5" aria-hidden="true" />
          ) : null}

          {heading && <p className="text-base font-medium tracking-normal">{heading}</p>}
        </div>
        {/* <div className="text-sm font-normal tracking-normal text-gray-700">
          {desc}
        </div> */}
      </div>

      {/* DESKTOP / LAPTOP (icon above, show description) */}
      <div className="hidden w-full flex-col items-start gap-4 md:flex">
        {isString ? (
          iconSrc ? (
            <img
              src={iconSrc}
              alt={heading ? `${heading} icon` : 'capability icon'}
              className="h-9 w-9 object-contain"
            />
          ) : null
        ) : IconComponent ? (
          <IconComponent className="text-privue-700 h-7 w-7" aria-hidden="true" />
        ) : null}

        <div>
          {heading && <p className="text-base font-medium tracking-normal">{heading}</p>}
          <p className="text-base font-normal tracking-normal text-gray-700">{desc}</p>
        </div>
      </div>
    </div>
  );
}
