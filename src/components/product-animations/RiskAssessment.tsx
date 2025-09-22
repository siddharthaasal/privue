'use client'

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Cell,
    Tooltip,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * --- DATA ---
 */
const creditData = [
    { name: 'Very Low', value: 10, color: '#9AD34D' },
    { name: 'Low', value: 25, color: '#EFB23C' },
    { name: 'Medium', value: 40, color: '#F08A3A' },
    { name: 'High', value: 60, color: '#F06B6B' },
    { name: 'Unknown', value: 5, color: '#9AA0A6' },
]

/**
 * --- FRAME 1: Minimal credit info card (bottom-right) ---
 * Matches the provided screenshot: title, name dropdown, credit score bucket w/ info icon,
 * months delinquent (36 months), max delinquency (6 months), age of oldest account.
 */
function CreditInfoCard() {
    // Staggered reveal for content inside the card
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.12 },
        },
    }
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="rounded-lg"
        >
            <Card className="w-72 shadow-lg ring-0">
                <CardHeader className="pb-1 pt-2">
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-[11px] font-medium">Reported Credit Information</CardTitle>
                        <span
                            className="text-[10px] text-muted-foreground flex items-center gap-1"
                            title="Summary of the user's reported credit attributes (last 36 months)"
                            aria-label="Credit information details"
                        >
                            <Info className="h-3.5 w-3.5" />
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="px-3 pb-3 text-[11px]">
                    {/* Grid content with staggered children */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 gap-x-3 gap-y-1.5"
                    >
                        {/* Name */}
                        <motion.div className="col-span-2" variants={item}>
                            <div className="text-[10px] text-muted-foreground uppercase">Name</div>
                            <motion.div
                                variants={item}
                                className="mt-1 h-7 inline-flex items-center justify-between w-full rounded-md border border-slate-200 px-2 text-[11px]"
                            >
                                <span className="truncate" title="Ashish Goomer">Ashish Goomer</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                            </motion.div>
                        </motion.div>

                        {/* Credit Score Bucket */}
                        <motion.div className="flex flex-col items-start" variants={item}>
                            <span className="text-[10px] text-muted-foreground uppercase">Credit Score Bucket</span>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.2 }}
                                className="flex items-center gap-2 mt-0.5"
                            >
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200">
                                    Good
                                </Badge>
                            </motion.div>
                        </motion.div>

                        {/* Months Delinquent */}
                        <motion.div className="flex flex-col" variants={item}>
                            <span className="text-[10px] text-muted-foreground uppercase">Months Delinquent (36 months)</span>
                            <span className="font-medium text-[11px]">3</span>
                        </motion.div>

                        {/* Max Delinquency */}
                        <motion.div className="flex flex-col" variants={item}>
                            <span className="text-[10px] text-muted-foreground uppercase">Max Delinquency (6 months)</span>
                            <span className="font-medium text-[11px]">29</span>
                        </motion.div>

                        <motion.div className="col-span-2 mt-1 border-t pt-1.5 border-gray-100" variants={item} />

                        {/* Age of Oldest Account */}
                        <motion.div className="flex flex-col col-span-2" variants={item}>
                            <span className="text-[10px] text-muted-foreground uppercase">Age of Oldest Account</span>
                            <span className="font-medium text-[11px]">2 months</span>
                        </motion.div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

/**
 * --- FRAME 2: Probability chart (centered) ---
 */
function ProbabilityChartCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.995 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-4 right-4 w-[340px] max-w-[90%]"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-3 shadow-sm"
            >
                <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xs font-medium">
                        Probability of Default — <span className="font-semibold">5%</span>
                    </h3>
                    <div className="text-[10px] text-muted-foreground">ℹ️</div>
                </div>

                <div className="h-50" style={{ pointerEvents: 'none' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={creditData}
                            margin={{ top: 6, right: 6, left: 6, bottom: 2 }}
                            barSize={12}
                        >
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip formatter={(val: number) => `${val}%`} />
                            <Bar
                                dataKey="value"
                                isAnimationActive
                                animationDuration={900}
                                animationEasing="ease"
                                animationBegin={200}
                            >
                                {creditData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </motion.div>
    )
}


/**
 * --- MAIN: Two-frame loop with background image preserved ---
 * Loops: Frame 1 (card, bottom-right) → Frame 2 (chart) → Frame 1 ...
 */
export default function RiskAssessmentTourWithChart() {
    const bgUrl = '/module-animations/risk-ass-2.png' // keep existing background
    type Step = 'frame1' | 'frame2'
    const [step, setStep] = useState<Step>('frame1')

    // Loop: show frame1 for 2400ms, transition to frame2 for 2800ms, repeat
    useEffect(() => {
        const durations: Record<Step, number> = {
            frame1: 5000, // time to keep card visible
            frame2: 5000, // time to keep chart visible
        }

        const t = setTimeout(() => {
            setStep((prev) => (prev === 'frame1' ? 'frame2' : 'frame1'))
        }, durations[step])

        return () => clearTimeout(t)
    }, [step])

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            {/* Background image (unchanged) */}
            <div
                aria-hidden
                className="absolute inset-0.5 bg-center bg-no-repeat bg-cover border border-gray-200 rounded-2xl"
                style={{
                    backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')`,
                    transform: 'scale(1.02)',
                }}
            />

            {/* FRAME 1: minimal card at bottom-right */}
            <AnimatePresence>
                {step === 'frame1' && (
                    <motion.div key="card-frame" className="absolute bottom-4 right-4">
                        <CreditInfoCard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FRAME 2: chart replaces frame 1 */}
            <AnimatePresence>{step === 'frame2' && <ProbabilityChartCard key="chart-frame" />}</AnimatePresence>
        </div>
    )
}
