import { Cpu, Zap } from 'lucide-react'
// import AboutImageFlow from '@/components/about/AboutImageFlow'
// import { OrbitNode } from '@/components/workflow-animation/OrbitNode'
// import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
// import { File, Settings, Search } from "lucide-react";
import TwoOrbit from '@/components/about/TwoOrbit';
// ChevronRight
// import { Button } from '@/components/ui/button'

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
                            Privue helps financial institutions and corporates make smarter decisions by combining advanced AI with curated data intelligence. It integrate multiple data sources, applying machine learning and predictive modeling to deliver accurate, real-time insights via API or custom applications.
                        </p>
                        <p className="text-base">
                            From credit and vendor risk to compliance and climate, we empower organizations to assess counterparties, mitigate risks, and act with confidence.
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Cpu className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">AI-Driven</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Secure infrastructure enabling adoption with confidence.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">Actionable Insights</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Turning complex data into clear intelligence</p>
                            </div>
                        </div>

                        {/* <Button
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
                        </Button> */}
                    </div>

                    {/* Right: Image - allow shrinking and set image to h-full w-auto */}
                    {/* <div className="md:w-1/2 flex min-h-0">
                        <div className="border-border/50 relative w-full h-full rounded-xl border border-dotted p-4 flex overflow-hidden">
                            <img
                                // src="/demo-about-section-img.webp"
                                src="/demo-about.png"
                                className="h-full w-full  rounded-[12px] shadow dark:hidden"
                                alt="Privue analytics dashboard (light)"
                            />
                        </div>
                    </div> */}
                    <div className="md:w-1/2 flex min-h-0">
                        <div className=" relative w-full">
                            <div className='ml-25'>
                                <TwoOrbit
                                    centerLogo="/privue-logo.png"
                                    innerIcons={[
                                        <IconImg key="m1" src="/icons/workflow/excel.png" alt="predict" />,
                                        <IconImg key="m2" src="/icons/workflow/postgre.png" alt="graph" />,
                                        <IconImg key="m2" src="/icons/workflow/pdf-2.png" alt="graph" />,
                                    ]}
                                    outerIcons={[
                                        <IconImg key="m1" src="/icons/workflow/gpt.png" alt="predict" />,
                                        // <IconImg key="m2" src="/icons/climate-risk.png" alt="graph" />,
                                        <IconImg key="m2" src="/icons/workflow/gemini.png" alt="graph" />,
                                        <IconImg key="m2" src="/icons/workflow/claude.png" alt="graph" />,
                                    ]}
                                    innerConfig={{ radius: 80, iconSize: 40, duration: 10 }}
                                    outerConfig={{ radius: 150, iconSize: 50, duration: 26, reverse: true }}
                                    containerPadding={28}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function IconImg({ src, alt = "" }: { src: string; alt?: string }) {
    return <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />;
}
