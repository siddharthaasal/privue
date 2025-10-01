import { Cpu, Zap } from 'lucide-react'

export default function AboutSection() {
    return (
        <section className="font-open-sans relative mx-auto px-8">
            <div className="space-y-8 px-6 md:space-y-12 py-12">
                <h2 className="relative z-10 max-w-3xl text-3xl font-medium leading-tight lg:text-4xl">
                    AI-powered data intelligence and risk management
                </h2>

                <div className="relative flex flex-col md:flex-row items-start gap-8">

                    {/* Left: Text */}
                    <div className="relative z-10 space-y-4 md:w-1/2">
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
                                <p className="text-muted-foreground text-sm">
                                    Secure infrastructure enabling adoption with confidence.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">Actionable Insights</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Turning complex data into clear intelligence
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="md:w-1/2 w-full relative mt-8 md:mt-6">
                        <div className="md:absolute md:-inset-y-12 md:inset-x-0">
                            <div
                                className="
    relative rounded-2xl overflow-hidden
    [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_100%)]
    [mask-repeat:no-repeat] [mask-size:100%_100%]
    [--webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_100%)]
    [--webkit-mask-repeat:no-repeat] [--webkit-mask-size:100%_100%]
  "
                            >
                                <img
                                    src="/workflow-illustration.png"
                                    alt="workflow illustration"
                                    className="w-full h-auto object-cover rounded-[12px] shadow"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
