'use client'

import React from 'react'

type IndustrySolutionCardProps = {
    icon?: string | React.ComponentType<any> | React.ReactNode
    title: string
    description: string
    href: string
}

export default function IndustrySolutionCard({
    icon,
    title,
    description,
    href,
}: IndustrySolutionCardProps) {
    // helper to normalize/render icon (sizeClass like "w-5 h-5" or "w-6 h-6")
    const renderIconNode = (iconVal: string | React.ComponentType<any> | React.ReactNode, sizeClass = 'w-5 h-5') => {
        if (!iconVal) return null

        // string -> <img />
        if (typeof iconVal === 'string') {
            return (
                <img
                    src={iconVal}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className={`${sizeClass} object-contain`}
                />
            )
        }

        // already a JSX element instance
        if (React.isValidElement(iconVal)) {
            // assure TypeScript that this is a ReactElement with any props so cloneElement accepts className
            const elem = iconVal as React.ReactElement<any, any>
            return React.cloneElement(elem, {
                className: `${sizeClass} ${elem.props?.className ?? ''}`.trim(),
                'aria-hidden': true,
            })
        }

        // component constructor/function
        if (typeof iconVal === 'function') {
            const IconComp = iconVal as React.ComponentType<any>
            return <IconComp className={sizeClass} aria-hidden />
        }

        return null
    }
    const hasIcon = !!icon
    return (
        <a
            href={href}
            className={`
        group block p-4 rounded-xl border border-gray-100
        bg-white transition-all duration-300
        hover:-translate-y-2
         hover:shadow-xs hover:shadow-privue-200/60
      `}
        >
            <div className="flex items-start gap-4">
                {hasIcon ? (
                    <div className="w-11 h-11 rounded-full bg-privue-100 flex items-center justify-center mb-4 group-hover:bg-privue-200 transition-colors duration-300">
                        <div className="text-privue-700 group-hover:scale-110 transition-transform duration-300">
                            {renderIconNode(icon!, 'w-6 h-6')}
                        </div>
                    </div>
                ) : null}

                <div>
                    <h3 className="text-base font-medium mb-1 group-hover:text-privue-800 transition-colors duration-300 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                        {description}
                    </p>
                </div>

                <div className="ml-auto my-auto hidden md:flex items-center align-middle text-muted-foreground group-hover:text-privue-700 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </a>
    )
}
