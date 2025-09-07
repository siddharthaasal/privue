type FeatureCardProps = {
    icon: React.ComponentType<any>
    title: string
    description: string
    href: string
}

function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
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
                    <Icon className="w-6 h-6 text-privue-700" aria-hidden />
                </div>
            </div>
            <h3 className="text-lg font-medium mb-2 group-hover:text-privue-800 transition-colors duration-300 tracking-tight">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                {description}
            </p>
        </a>
    )
}

import { solutions } from "@/data/solutions/solutions.ts"
export default function FinalFeaturesGrid() {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => {
                return (
                    <FeatureCard
                        key={i}
                        title={s.heading}
                        description={s.subHeading}
                        icon={s.icon}
                        href={`/solutions/${s.slug}`}
                    />
                )
            })}

        </div>
    )
}
