import { Cpu, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutSection() {
    return (
        <section className="font-open-sans relative mx-auto px-8">
            <div className="space-y-8 px-6 md:space-y-12 py-12">
                <h2 className="relative z-10 max-w-3xl text-3xl font-medium leading-tight lg:text-4xl">
                    AI-powered data intelligence and risk management
                </h2>

                {/* parent flex: items-stretch so children match heights */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">

                    {/* Left: Text - allow it to be a flex column and not force min-height */}
                    <div className="relative z-10 space-y-4 md:w-1/2 min-h-0">
                        <p className="text-base">
                            Privue helps financial institutions and corporates make smarter decisions by combining advanced AI with curated data intelligence. Our platform integrates multiple data sources, applying machine learning and predictive modeling to deliver accurate, real-time insights.
                        </p>

                        <p className="text-base">
                            From credit and vendor risk to compliance and advisory, we empower organizations to assess counterparties, mitigate risks, and act with confidence.
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">Actionable Insights</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Turning complex data into clear intelligence.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Cpu className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">AI-Driven</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Proprietary models for smarter, faster decisions.</p>
                            </div>
                        </div>

                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="
        group
        rounded-lg
        border border-dotted border-border/50
        bg-background/40
        text-sm font-medium
        text-foreground
        hover:bg-accent/30 hover:text-foreground
        transition-all
        gap-1 pr-1.5
      "
                        >
                            <a href="#">
                                <span className="group-hover:underline">Learn More</span>
                                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </Button>
                    </div>

                    {/* Right: Image - allow shrinking and set image to h-full w-auto */}
                    <div className="md:w-1/2 flex min-h-0"> {/* min-h-0 is important here */}
                        <div className="border-border/50 relative w-full h-full rounded-xl border border-dotted p-0 overflow-hidden">
                            <img
                                src="/charts.png"
                                className="hidden h-full w-auto object-contain rounded-[12px] dark:block"
                                alt="Privue analytics dashboard (dark)"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="h-full w-auto object-contain rounded-[12px] shadow dark:hidden"
                                alt="Privue analytics dashboard (light)"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
