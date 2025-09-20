'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    Cell,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const creditData = [
    { name: 'Very Low', value: 10, color: '#9AD34D' },
    { name: 'Low', value: 25, color: '#EFB23C' },
    { name: 'Medium', value: 40, color: '#F08A3A' },
    { name: 'High', value: 60, color: '#F06B6B' },
    { name: 'Unknown', value: 5, color: '#9AA0A6' },
]


import { Info } from 'lucide-react'

type Props = {
    name?: string
    scoreBucket?: string
    monthsDelinquent?: string | number
    maxDelinquency?: string | number
    ageOldest?: string
}

function CreditInfoCard({
    name = 'Abhijit Paul',
    scoreBucket = 'Poor',
    monthsDelinquent = 36,
    maxDelinquency = 900,
    ageOldest = '7 months',
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="rounded-lg"
            aria-hidden={false}
        >
            <Card className="w-72 shadow-lg ring-0 focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-slate-200">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-sm font-medium">Reported Credit Information</CardTitle>

                        {/* tiny info icon — title gives accessible tooltip on hover/focus */}
                        <span
                            className="text-xs text-muted-foreground flex items-center gap-1"
                            title="Summary of the user's reported credit attributes (last 36 months)"
                            aria-label="Credit information details"
                        >
                            <Info className="h-4 w-4" />
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 text-sm">
                    {/* grid layout so labels & values align neatly */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase">Name</span>
                            <span className="font-medium text-sm truncate" title={name}>
                                {name}
                            </span>
                        </div>

                        <div className="flex flex-col items-start">
                            <span className="text-xs text-muted-foreground uppercase">Credit Score</span>
                            <Badge variant="destructive" className="text-[11px] px-2 py-0.5">
                                {scoreBucket}
                            </Badge>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase">Months Delinquent</span>
                            <span className="font-medium text-sm">{monthsDelinquent}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase">Max Delinquency</span>
                            <span className="font-medium text-sm">{maxDelinquency}</span>
                        </div>

                        <div className="col-span-2 mt-1 border-t pt-2 border-gray-100" />

                        <div className="flex flex-col col-span-2">
                            <span className="text-xs text-muted-foreground uppercase">Age of Oldest Account</span>
                            <span className="font-medium text-sm">{ageOldest}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}


export default function RiskAssessmentTourWithChart() {
    const bgUrl = '/module-animations/risk-ass-2.png'
    const [step, setStep] = useState<'frame1' | 'frame2'>('frame2')
    // const [step, setStep] = useState<'frame1' | 'frame2'>('frame1')

    // advance automatically after a short delay; when frame2 renders, frame1 will exit
    useEffect(() => {
        const t = setTimeout(() => setStep('frame2'), 1200)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            {/* Background image */}
            <div
                aria-hidden
                className="absolute inset-0.5 bg-center bg-no-repeat bg-cover border border-gray-200 rounded-2xl"
                style={{
                    backgroundImage: `url('${bgUrl.replace(/'/g, "\'")}')`,
                    transform: 'scale(1.02)',
                }}
            />

            {/* Floating card bottom-right (frame 1) */}
            <AnimatePresence>
                {step === 'frame1' && (
                    <motion.div
                        key="card-frame"
                        initial={{ opacity: 0, y: 28, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="absolute bottom-4 right-4"
                    >
                        <CreditInfoCard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Second frame: probability chart (replaces first) */}
            <AnimatePresence>
                {step === 'frame2' && (
                    <motion.div
                        key="chart-frame"
                        initial={{ opacity: 0, y: 16, scale: 0.995 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute left-1/2 transform -translate-x-1/2 top-6 w-[480px] max-w-[90%]"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">Probability of Default — <span className="font-semibold">5%</span></h3>
                                <div className="text-xs text-muted-foreground">ℹ️</div>
                            </div>

                            {/* increased height, decreased width, narrower bars */}
                            <div className="h-44">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={creditData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }} barSize={18}>
                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <Tooltip formatter={(val: number) => `${val}%`} />

                                        {/* single bar with animation; Recharts animates bar heights */}
                                        <Bar dataKey="value" animationDuration={900} animationEasing="ease" animationBegin={200}>
                                            {creditData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Labels below */}
                            {/* <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground px-2">
                                {creditData.map((d) => (
                                    <div key={d.name} className="text-center w-full first:text-left last:text-right">
                                        {d.name}
                                    </div>
                                ))}
                            </div> */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
