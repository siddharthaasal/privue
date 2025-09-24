'use client'

import React from 'react'

type IndustrySolutionCardProps = {
    icon: React.ComponentType<any>
    title: string
    description: string
    href: string
    isCompact?: boolean
}

/**
 * IndustrySolutionCard
 * - If isCompact === true: renders a tight, horizontal "list-like" card suitable for the RHS list.
 * - Otherwise: renders the full card (your original style).
 */
export default function IndustrySolutionCard({
    icon: Icon,
    title,
    description,
    href,
    isCompact = false,
}: IndustrySolutionCardProps) {
    if (isCompact) {
        return (
            <a
                href={href}
                className="group block rounded-lg border border-gray-100 bg-[#FBFBFB] hover:shadow-md transition-shadow duration-200"
            >
                <div className="flex items-center gap-4 p-3 md:p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-privue-50 group-hover:bg-privue-100 transition-colors">
                        <Icon className="w-5 h-5 text-privue-700" aria-hidden />
                    </div>

                    <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{title}</div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</div>
                    </div>

                    <div className="ml-auto hidden md:flex items-center text-muted-foreground">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </a>
        )
    }

    // full (original) card layout
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
                <div className="w-10 h-10 rounded-full bg-privue-100 flex items-center justify-center mb-4 group-hover:bg-privue-200 transition-colors duration-300">
                    <div className="text-privue-700 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-privue-700" aria-hidden />
                    </div>
                </div>
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
