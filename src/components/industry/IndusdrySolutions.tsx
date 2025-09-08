'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button' // adjust path if different
import { Separator } from '@/components/ui/separator' // adjust path if different
import { ArrowRight } from 'lucide-react'
import type { ComponentType } from 'react'

/* -------------------------
   Types & helpers
   ------------------------- */
type Industry = {
    id?: string
    name: string
    description?: string
}

type Solution = {
    heading: string
    subHeading: string
    icon: ComponentType<any>
    slug: string
}

function makeId(fallbackIndex: number) {
    if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
        try {
            return (crypto as any).randomUUID()
        } catch {
            // fall through
        }
    }
    return `gen-${Date.now().toString(36)}-${fallbackIndex}`
}

/* -------------------------
   Component
   ------------------------- */
export default function IndustrySolutionsList() {
    // ---------- Dummy industries ----------
    const dummyIndustries: Industry[] = [
        { id: 'ind-retail', name: 'Retail', description: 'Retail industry solutions' },
        { id: 'ind-health', name: 'Healthcare', description: 'Healthcare industry solutions' },
        { id: 'ind-finance', name: 'Finance', description: 'Finance industry solutions' },
        { id: 'ind-manuf', name: 'Manufacturing', description: 'Manufacturing industry solutions' },
    ]

    // ---------- Placeholder icons (replace with your real icons) ----------
    const CircleIcon: ComponentType<any> = (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
            <circle cx="12" cy="12" r="8" />
        </svg>
    )
    const SquareIcon: ComponentType<any> = (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
            <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
    )
    const TriangleIcon: ComponentType<any> = (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
            <path d="M12 6l6 12H6z" />
        </svg>
    )

    // ---------- Dummy solutions per industry ----------
    const solutionsByIndustry: Record<string, Solution[]> = {
        'ind-retail': [
            { heading: 'Personalized Recommendations', subHeading: 'Increase conversion with tailored offers', icon: CircleIcon, slug: 'personalized-recs' },
            { heading: 'Dynamic Pricing', subHeading: 'Optimize margins in real-time', icon: SquareIcon, slug: 'dynamic-pricing' },
            { heading: 'Inventory Optimization', subHeading: 'Reduce carrying costs & stockouts', icon: TriangleIcon, slug: 'inventory-optimization' },
            { heading: 'Inventory Optimization 2', subHeading: 'Reduce carrying costs & stockouts', icon: TriangleIcon, slug: 'inventory-optimization' },
        ],
        'ind-health': [
            { heading: 'Clinical Decision Support', subHeading: 'Assist clinicians with recommendations', icon: TriangleIcon, slug: 'clinical-support' },
            { heading: 'Patient Triage Bot', subHeading: 'Fast triage & routing for patient intake', icon: CircleIcon, slug: 'patient-triage' },
            { heading: 'Remote Monitoring', subHeading: 'Continuous vitals & alerts', icon: SquareIcon, slug: 'remote-monitoring' },
        ],
        'ind-finance': [
            { heading: 'Fraud Detection', subHeading: 'Real-time anomaly detection', icon: SquareIcon, slug: 'fraud-detection' },
            { heading: 'Credit Scoring', subHeading: 'Smarter risk models with explainability', icon: CircleIcon, slug: 'credit-scoring' },
            { heading: 'Portfolio Insights', subHeading: 'Actionable ML-driven portfolio suggestions', icon: TriangleIcon, slug: 'portfolio-insights' },
        ],
        'ind-manuf': [
            { heading: 'Predictive Maintenance', subHeading: 'Reduce downtime with early failure alerts', icon: TriangleIcon, slug: 'predictive-maintenance' },
            { heading: 'Quality Inspection', subHeading: 'Automate defect detection on the line', icon: SquareIcon, slug: 'quality-inspection' },
            { heading: 'Supply Chain Visibility', subHeading: 'End-to-end visibility & demand alignment', icon: CircleIcon, slug: 'supplychain-visibility' },
        ],
    }

    // ---------- Normalize industries ----------
    const industries = useMemo(
        () =>
            dummyIndustries.map((ind, idx) => ({
                id: ind.id ?? makeId(idx),
                name: ind.name,
                description: ind.description ?? '',
            })),
        []
    )

    // Active industry (first open by default)
    const [activeIndustryId, setActiveIndustryId] = useState<string>(industries[0].id)

    // RHS scroll ref to reset scroll when industry changes
    const rhsScrollRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (rhsScrollRef.current) rhsScrollRef.current.scrollTop = 0
    }, [activeIndustryId])

    // Active solutions for the selected industry
    const activeSolutions = solutionsByIndustry[activeIndustryId] ?? []

    /* -------------------------
       Render
       ------------------------- */
    return (
        <section className="py-6">
            <div className="mx-auto max-w-6xl px-6">
                {/* NOTE: no primary heading rendered above the panel (per request) */}

                {/* Cohesive container (transparent background) */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-zinc-700 bg-transparent overflow-visible">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* LEFT column: the accordion of industries */}
                        <div className="border-b md:border-b-0 md:border-r p-4 md:pl-6 md:py-6 bg-transparent">
                            <Accordion
                                type="single"
                                value={activeIndustryId}
                                onValueChange={(value) => value && setActiveIndustryId(value)}
                                className="w-full"
                            >
                                {industries.map((ind) => {
                                    const isActive = ind.id === activeIndustryId
                                    return (
                                        <AccordionItem key={ind.id} value={ind.id}>
                                            <AccordionTrigger>
                                                <div className={`flex items-center justify-between w-full ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    <div className={`text-sm md:text-base font-medium ${isActive ? 'text-foreground' : ''}`}>{ind.name}</div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <div className="text-sm text-muted-foreground">{ind.description || 'Solutions tailored to this industry.'}</div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </div>

                        {/* RIGHT column: list-style solutions (inspired by List2) */}
                        <div className="col-span-2 p-4 md:p-6 bg-transparent">
                            {/* minimal label of active industry */}
                            {/* <div className="mb-3">
                                <div className="text-sm font-semibold">{industries.find((i) => i.id === activeIndustryId)?.name ?? ''}</div>
                            </div> */}

                            {/* The list area is scrollable and constrained to avoid page jump */}
                            <div ref={rhsScrollRef} className="flex flex-col" style={{ maxHeight: 420, minHeight: 300 }}>
                                {/* <Separator /> */}

                                <AnimatePresence initial={false}>
                                    {activeSolutions.map((s) => {
                                        const Icon = s.icon
                                        return (
                                            <motion.div
                                                key={s.slug}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.12 }}
                                            >
                                                <div className="grid items-center justify-between gap-4 px-2 py-4 md:grid-cols-4">
                                                    {/* large description column on the left on md+, stacked on mobile */}
                                                    <div className='order-1 md:order-none md:col-span-3 flex gap-2'>
                                                        <div>
                                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                                                                <Icon />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-medium text-foreground">{s.subHeading}</p>
                                                            <p className="text-sm font-normal text-foreground-lighter md:order-none md:col-span-3">{s.subHeading}</p>
                                                        </div>

                                                    </div>
                                                    {/* icon + title */}
                                                    {/* <div className="order-2 flex items-center gap-3 md:order-none">
                                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                                                            <Icon />
                                                        </span>
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="font-semibold">{s.heading}</h3>
                                                            <p className="text-sm text-muted-foreground">Solution</p>
                                                        </div>
                                                    </div> */}

                                                    {/* CTA button */}
                                                    <div className="order-3 ml-auto md:order-none">
                                                        <Button variant="outline" asChild>
                                                            <a href={`/solutions/${s.slug}`} className="flex items-center gap-2">
                                                                <span>View solution</span>
                                                                <ArrowRight className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>

                                                <Separator />
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
