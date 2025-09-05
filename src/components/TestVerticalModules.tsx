'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type IncomingItem = {
    id?: string
    title: string
    description: string
    imgSrc: string
    alt?: string
    link?: string
}

type Props = {
    items: IncomingItem[]
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

export default function TestVerticalModules({ items }: Props) {
    if (!items || items.length === 0) return null

    // Ensure every item has an ID
    const processed = useMemo(() => {
        return items.map((it, idx) => ({
            id: it.id ?? makeId(idx),
            title: it.title,
            description: it.description,
            imgSrc: it.imgSrc,
            alt: it.alt ?? it.title,
            link: it.link, // not used now
        }))
    }, [items])

    const [activeId, setActiveId] = useState<string>(processed[0].id)
    const active = useMemo(
        () => processed.find((p) => p.id === activeId) ?? processed[0],
        [processed, activeId]
    )

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>

            <div className="mx-auto space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
                {/* Heading */}
                <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Our{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Modules
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Experience how AI transforms your workflow to build a scalable and efficient business.
                    </p>
                </div>

                <div className="grid gap-12 sm:px-12 md:grid-cols-3 lg:gap-20 lg:px-8">
                    {/* Left: Accordion */}
                    <Accordion
                        type="single"
                        value={activeId}
                        onValueChange={(value) => value && setActiveId(value)}
                        className="w-full"
                    >
                        {processed.map((it) => (
                            <AccordionItem key={it.id} value={it.id}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2 text-base">{it.title}</div>
                                </AccordionTrigger>
                                <AccordionContent>{it.description}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Right: Image only */}
                    <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2 col-span-2">
                        <div className="absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>

                        {/* Use w-full so the image fits the column width; minHeight keeps the healthy size and maxHeight prevents oversize */}
                        <div
                            className="bg-background relative w-full rounded-2xl overflow-hidden"
                            style={{ minHeight: 420, maxHeight: 520 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={active.imgSrc}
                                        alt={active.alt}
                                        className="w-full h-full object-cover object-left-top"
                                        style={{ display: 'block' }}
                                        width={1207}
                                        height={929}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
