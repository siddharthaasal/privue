'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'motion/react'
import IndustrySolutionCard from './IndustrySolutionCard' // <- adjust path if needed
import { Zap } from 'lucide-react'
// Types
type Industry = {
    id?: string
    name: string
    description?: string
}

type Solution = {
    heading: string
    subHeading: string
    icon: React.ComponentType<any>
    slug: string
}

/**
 * Helper to generate fallback IDs when crypto.randomUUID is not available.
 */
function makeId(fallbackIndex: number) {
    if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
        try {
            return (crypto as any).randomUUID()
        } catch {
            // ignore and fall through to timestamp id
        }
    }
    return `gen-${Date.now().toString(36)}-${fallbackIndex}`
}

/**
 * IndustryModules
 *
 * Left: accordion of industries. First industry opened by default.
 * Right: list of IndustrySolutionCard components for the active industry.
 *
 * For now the same dummy `solutions` list is used for every industry (per your request).
 */
export default function IndustryModules() {
    // ---------------------
    // Dummy data (replace with real data later)
    // ---------------------
    const dummyIndustries: Industry[] = [
        { id: 'ind-1', name: 'Retail', description: 'Retail industry solutions' },
        { id: 'ind-2', name: 'Healthcare', description: 'Healthcare industry solutions' },
        { id: 'ind-3', name: 'Finance', description: 'Finance industry solutions' },
        { id: 'ind-4', name: 'Manufacturing', description: 'Manufacturing industry solutions' },
    ]

    // Same solutions used for every industry (per your instruction).
    const dummySolutions: Solution[] = [
        { heading: 'Personalized Recommendations', subHeading: 'Increase conversion with tailored offers', icon: Zap, slug: 'personalized-recs' },
        { heading: 'Automated Support', subHeading: '24/7 AI-driven customer support', icon: Zap, slug: 'automated-support' },
        { heading: 'Demand Forecasting', subHeading: 'Reduce stockouts with accurate forecasts', icon: Zap, slug: 'demand-forecasting' },
        { heading: 'Fraud Detection', subHeading: 'Real-time anomaly detection', icon: Zap, slug: 'fraud-detection' },
    ]

    // ---------------------
    // Normalize industries ensuring each has an id
    // ---------------------
    const industries = useMemo(
        () =>
            dummyIndustries.map((ind, idx) => ({
                id: ind.id ?? makeId(idx),
                name: ind.name,
                description: ind.description ?? '',
            })),
        []
    )

    // Active industry id state. Default to first industry.
    const [activeIndustryId, setActiveIndustryId] = useState<string>(industries[0].id)

    // When activeIndustryId changes, we could do side effects (analytics, fetch, etc.)
    // For this demo we simply log (you can remove this).
    useEffect(() => {
        // Example side-effect: fetch industry-specific solutions here if needed.
        // console.log('Active industry changed to', activeIndustryId)
    }, [activeIndustryId])

    // --- optional: keep a ref to the RHS scroll container so we can manage focus/scroll if desired ---
    const rhsScrollRef = useRef<HTMLDivElement | null>(null)

    // Render
    return (
        <section className="py-12">
            {/* background / decorative element copied from your original component */}
            <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />

            <div className="p-4 rounded-2xl border border-gray-200 mx-auto space-y-8 md:space-y-16 lg:space-y-20">


                {/* Two-column layout: LHS (accordion), RHS (cards) */}
                <div className="grid gap-12 sm:px-12 md:grid-cols-3 lg:gap-20 lg:px-8">
                    {/* -----------------------
              LEFT: Industries (Accordion)
              - type="single" with value controlled by activeIndustryId
              - changing the accordion updates the RHS via setActiveIndustryId
              ------------------------ */}
                    <Accordion
                        type="single"
                        value={activeIndustryId}
                        onValueChange={(value) => value && setActiveIndustryId(value)}
                        className="w-full"
                    >
                        {industries.map((ind) => (
                            <AccordionItem key={ind.id} value={ind.id}>
                                <AccordionTrigger>
                                    {/* Each trigger shows industry name */}
                                    <div className="flex items-center gap-2 text-base">{ind.name}</div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/* The description could be longer; keep it concise */}
                                    <div className="text-sm text-muted-foreground">{ind.description || 'Explore tailored solutions for this industry.'}</div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* -----------------------
              RIGHT: Solutions list for the selected industry
              - col-span-2 to occupy remaining grid columns
              - maps dummySolutions exactly using the snippet you provided
              ------------------------ */}
                    <div className="bg-background relative flex overflow-hidden p-0 col-span-2">
                        {/* decorative vertical separator like original */}
                        {/* <div className="absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)] pointer-events-none" /> */}

                        {/* scrollable container for cards */}
                        <div
                            ref={rhsScrollRef}
                            className="relative w-full rounded-2xl overflow-auto p-4 grid gap-2"
                            // Use a responsive grid: on narrow screens it's single column, on wider screens it flows into two columns
                            // style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', maxHeight: 520 }}
                            aria-live="polite"
                        >
                            {/* AnimatePresence + motion for subtle entrance animations */}
                            <AnimatePresence initial={false}>
                                {/* Map the solutions array into IndustrySolutionCard components.
                    This uses the exact mapping you asked for. */}
                                {dummySolutions.map((s, i) => {
                                    return (
                                        <motion.div
                                            key={s.slug}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <IndustrySolutionCard
                                                key={i}
                                                title={s.heading}
                                                description={s.subHeading}
                                                icon={s.icon}
                                                href={`/solutions/${s.slug}`}
                                            // NOTE: IndustrySolutionCard currently doesn't accept isActive; if you want active styling,
                                            // pass an `isActive` prop here and update the card component accordingly.
                                            />
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
