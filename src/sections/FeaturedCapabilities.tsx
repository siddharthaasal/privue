// import { motion } from 'framer-motion'

export default function FeaturedCapabilities() {

    const coreCapabilities = [
        {
            "icon": "/solutions/lock.svg",
            "heading": "AI-Powered Intelligence",
            "desc": "Transform raw data into strategic insights that drive smarter business decisions.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Predictive Risk Management",
            "desc": "Anticipate and mitigate financial, operational, and compliance risks before they impact your business.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Intelligent Data Integration",
            "desc": "Unify disparate data sources into a single, enriched view of your business landscape.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Strategic Decision Intelligence",
            "desc": "Empower leadership with AI-backed recommendations for critical business choices.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Industry-Focused AI Solutions",
            "desc": "Purpose-built applications for BFSI, enterprise, consulting, and legal sectors.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Enterprise-Grade AI",
            "desc": "Platform Scalable, secure, and cloud-native infrastructure designed for mission-critical operations.",
        },
    ]

    return (
        <section className="font-open-sans relative mx-auto ">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Core{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Capabilities
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Harness AI to streamline decisions, manage risk, and unlock growth opportunities.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreCapabilities.map((s, i) => {
                        return (
                            <FeatureCapabilityCard
                                key={i}
                                title={s.heading}
                                description={s.desc}
                                icon={s.icon}
                            />
                        )
                    })}

                </div>
            </div>
        </section>
    );
}

type FeatureCapabilityCardProps = {
    icon: string
    title: string
    description: string
}

function FeatureCapabilityCard({ icon, title, description }: FeatureCapabilityCardProps) {
    return (
        <div
            className={`
        group block p-6 rounded-xl border border-gray-100
        bg-white transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl hover:shadow-privue-200/60
      `}
        >
            {/* Icon wrapper */}
            <div className="w-15 h-15 rounded-full bg-privue-100 flex items-center justify-center mb-4 group-hover:bg-privue-200 transition-colors duration-300 overflow-hidden">
                <img
                    src={icon}
                    alt=""
                    className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Text */}
            <h3 className="text-lg font-medium mb-2 group-hover:text-privue-800 transition-colors duration-300 tracking-tight">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                {description}
            </p>
        </div>
    )
}

