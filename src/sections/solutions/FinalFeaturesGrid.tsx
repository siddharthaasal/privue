type FeatureCardProps = {
    icon: React.ReactNode
    title: string
    description: string
    href: string
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
    return (
        <a href={href}
            className={`
        group block p-6 rounded-xl border border-gray-100
        bg-white transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl hover:shadow-privue-200/60
      `}
        >
            <div className="w-12 h-12 rounded-full bg-privue-100 flex items-center justify-center mb-4 group-hover:bg-privue-200 transition-colors duration-300">
                <div className="text-privue-700 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
            <h3 className="text-lg font-medium mb-2 group-hover:text-privue-800 transition-colors duration-300">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                {description}
            </p>
        </a>
    )
}

export default function FinalFeaturesGrid() {
    const features = [
        {
            title: "Seamless Embedding",
            description: "Integrate our player into your website with a simple iframe code. No complicated setup required.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-code">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            ),
            href: "#"
        },
        {
            title: "High-Quality Streaming",
            description: "Deliver crystal-clear video content with adaptive bitrate streaming for all network conditions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-monitor-play">
                    <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
                    <path d="M12 17v4" />
                    <path d="M8 21h8" />
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                </svg>
            ),
            href: "#",
        },
        {
            title: "Lightning Fast",
            description: "Optimized loading times and playback performance to keep your users engaged.",
            delay: "delay-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-zap">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
            ),
            href: "#"
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
                <FeatureCard
                    key={i}
                    title={f.title}
                    description={f.description}
                    icon={f.icon}
                    href={f.href}
                />
            ))}
        </div>
    )
}
