import { solutions } from "@/data/solutions/solutions";

export default function FeaturesInfo() {
    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto max-w-6xl space-y-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {solutions.map((s) => {
                            const title = s.heading ?? s.slug;
                            const description = s.subHeading || s.mainSolnDesc || "";
                            const items = s.featurePoints?.slice(0, 3) ?? [];

                            return (
                                <div
                                    key={s.id}
                                    className="border-border space-y-4 rounded-lg border p-8 transition-shadow hover:shadow-sm"
                                >
                                    <h3 className="text-lg font-medium leading-tight">{title}</h3>

                                    <p className="text-muted-foreground text-sm tracking-tight">
                                        {description}
                                    </p>

                                    <div className="space-y-2">
                                        {items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <a href={`/solutions/${s.slug}`} className="text-sm underline opacity-80">
                                            Learn more
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
