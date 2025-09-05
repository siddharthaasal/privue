import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { Solution } from "@/data/solutions/solutions";
import { solutions } from "@/data/solutions/solutions.ts";


export default function Features2() {
    return (
        <section>
            <div className="py-16">
                <div className="mx-auto px-6">
                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {solutions.map((s) => (
                            <SolutionCard key={s.id} solution={s} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolutionCard({ solution }: { solution: Solution }) {
    const {
        slug,
        heading,
        subHeading,
        featurePoints,
        mainSolnDesc,
    } = solution;


    const description =
        subHeading ||
        mainSolnDesc ||
        (featurePoints && featurePoints.length ? featurePoints.join(" · ") : "");

    return (
        <Card className="p-6">
            <div className="relative flex flex-col h-full">
                <div className="space-y-2 py-2 flex-1">
                    <h3 className="text-base font-medium">{heading}</h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                        {description}
                    </p>
                </div>

                <div className="flex gap-3 border-t border-dashed pt-4 mt-4 ">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-2 shadow-none flex"
                    >
                        <a href={`/solutions/${slug}`} className="flex">
                            <p className="flex items-center gap-1 text-xs">
                                Learn More
                                <ChevronRight className="ml-0 !size-3.5 opacity-50" />
                            </p>
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
