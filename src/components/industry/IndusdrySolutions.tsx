'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'motion/react'
import IndustrySolutionCard from './IndustrySolutionCard' // <- adjust path if needed
import { Zap } from 'lucide-react'
import { AlignVerticalJustifyCenter, Recycle, Landmark, BookAlert, Workflow, TriangleAlert } from 'lucide-react';
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

    const dummyIndustries: Industry[] = [
        { id: 'ind-1', name: 'Corporations', description: 'Transform supply chains from vulnerable to resilient. Monitor distributors in real-time, predict sustainability risks, and make decisions backed by AI-powered intelligence.' },
        { id: 'ind-2', name: 'Insurance', description: 'Fortify compliance, slash credit exposure, and unlock smarter lending. Our AI-driven platform revolutionizes internal audits, sustainability assessments, and third-party risk management for the modern bank.' },
        { id: 'ind-3', name: 'Banking', description: 'Build bulletproof portfolios that investors trust. Accelerate due diligence, master sustainability metrics, and neutralize third-party risks with precision analytics that see around corners.' },
        { id: 'ind-4', name: 'Asset Management', description: 'Underwrite with unprecedented confidence. Price commercial risk accurately, validate sustainability claims instantly, and detect third-party threats before they materialize—all powered by advanced AI analytics.' },
        {
            id: 'ind-5', name: 'Consulting', description: "Deliver client insights at the speed of business. Cut due diligence time by half, automate audit workflows, and amplify your firm's value with AI-driven analytics that turn data into competitive advantage."
        },
        { id: 'ind-6', name: 'Government', description: 'Safeguard public trust through smarter procurement. Validate vendors instantly, exceed sustainability mandates, and ensure compliance with AI-powered risk intelligence designed for public sector excellence.' },
    ]

    // Same solutions used for every industry (per your instruction).
    const dummySolutions: Solution[] = [
        { heading: 'Personalized Recommendations', subHeading: 'Increase conversion with tailored offers', icon: Zap, slug: 'personalized-recs' },
        { heading: 'Automated Support', subHeading: '24/7 AI-driven customer support', icon: Zap, slug: 'automated-support' },
        { heading: 'Demand Forecasting', subHeading: 'Reduce stockouts with accurate forecasts', icon: Zap, slug: 'demand-forecasting' },
        { heading: 'Fraud Detection', subHeading: 'Real-time anomaly detection', icon: Zap, slug: 'fraud-detection' },
    ]

    const solutionsByIndustry: Record<string, Solution[]> = {
        'ind-1': [
            { heading: 'Large Customer Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: BookAlert, slug: 'large-customer-risk-assessment' },
            { heading: 'Third Party Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: TriangleAlert, slug: 'third-party-risk-management' },
            { heading: 'Distributor Performance Management', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: AlignVerticalJustifyCenter, slug: 'distributor-performance-management' },
            { heading: 'Sustainability Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Recycle, slug: 'sustainability-assessment' },
        ],
        'ind-2': [
            { heading: 'Insurance Underwriting and Pricing', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Landmark, slug: 'commercial-insurance-underwriting' },
            { heading: 'Third Party Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: TriangleAlert, slug: 'third-party-risk-management' },
            { heading: 'Sustainability Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Recycle, slug: 'sustainability-assessment' },
        ],
        'ind-3': [
            { heading: 'Sustainability Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Recycle, slug: 'sustainability-assessment' },
            { heading: 'Third Party Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: TriangleAlert, slug: 'third-party-risk-management' },
        ],
        'ind-4': [
            { heading: 'Entity Due Dilligence', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Workflow, slug: 'entity-due-diligence' },
            { heading: 'Sustainability Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Recycle, slug: 'sustainability-assessment' },
            { heading: 'Third Party Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: TriangleAlert, slug: 'third-party-risk-management' },
        ],
        'ind-5': [
            { heading: 'Entity Due Dilligence', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Workflow, slug: 'entity-due-diligence' },
        ],
        'ind-6': [
            { heading: 'Third Party Risk Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: TriangleAlert, slug: 'third-party-risk-management' },
            { heading: 'Sustainability Assessment', subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: Recycle, slug: 'sustainability-assessment' },
        ],

        // fallback key
        default: dummySolutions,
    }

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
    const currentSolutions = solutionsByIndustry[activeIndustryId] ?? solutionsByIndustry.default;

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
                        <div
                            ref={rhsScrollRef}
                            className="relative w-full rounded-2xl overflow-auto p-4 grid gap-2 content-start auto-rows-min"
                            aria-live="polite"
                        >
                            {/* Animate the whole list as one panel keyed by activeIndustryId */}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activeIndustryId}               // <--- switching industry replaces this panel
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ opacity: { duration: 0.16 }, y: { type: 'spring', stiffness: 300, damping: 28, duration: 0.24 } }}
                                    className="grid gap-2"
                                    // Keep the same 1-card-per-row layout: each card will fill available width
                                    style={{ gridTemplateColumns: '1fr' }}
                                >
                                    {currentSolutions.map((s, i) => (
                                        <div key={s.slug} className="w-full">
                                            {/* keep your original IndustrySolutionCard usage so cards remain full-width */}
                                            <IndustrySolutionCard
                                                title={s.heading}
                                                description={s.subHeading}
                                                icon={s.icon}
                                                href={`/solutions/${s.slug}`}
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
