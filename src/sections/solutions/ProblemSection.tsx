import ProblemCard from "@/components/solutions/ProblemCard";
import type { Problem } from "@/data/solutions/solutions";

interface ProblemSectionProps {
    problems: Problem[];
}

export default function ProblemSection({ problems }: ProblemSectionProps) {
    return (
        <>
            <div className="relative pt-0">
                <h3 className="text-center text-4xl font-semibold pt-10 pb-6 leading-tight tracking-tight">The <span className="text-privue-800">Problem</span></h3>
                <div className="border-y border-gray-200 divide-x-1 divide-gray-200 mt-12 flex gap-1">
                    {problems.map((p, idx) => (
                        <div key={idx} className="flex-1">
                            <ProblemCard
                                icon={p.icon}
                                heading={p.problemHeading}
                                description={p.problemDesc}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}