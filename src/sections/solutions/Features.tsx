import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import * as React from "react";
import { solutions } from "@/data/solutions/solutions";

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto px-6">
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    {/* Map the solutions array to cards */}
                    {solutions.map((s) => {
                        const title = s.heading ?? s.slug;
                        const description =
                            s.subHeading ||
                            s.mainSolnDesc ||
                            (s.featurePoints && s.featurePoints.length ? s.featurePoints.slice(0, 3).join(" · ") : "");

                        return (
                            <Card key={s.id} className="group shadow-zinc-950/5">
                                <CardHeader className="pb-0">
                                    {/* reuse the same CardDecorator */}
                                    <CardDecorator>
                                        {/* optional: use a simple icon placeholder for solution cards */}
                                        <Sparkles className="size-6" aria-hidden />
                                    </CardDecorator>

                                    <h3 className="mt-6 font-medium text-left">{title}</h3>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm text-left line-clamp-3">{description}</p>

                                    {/* optional small CTA — comment out if you don't want links */}
                                    <div className="mt-4 text-left">
                                        <a href={`/solutions/${s.slug}`} className="text-sm underline opacity-80">
                                            Learn more
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-65%" />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
            {children}
        </div>
    </div>
);
