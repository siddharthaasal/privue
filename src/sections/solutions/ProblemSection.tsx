import ProblemCard from "@/components/solutions/ProblemCard";
import type { Problem } from "@/data/solutions/solutions";

interface ProblemSectionProps {
    problems: Problem[];
}

export default function ProblemSection({ problems }: ProblemSectionProps) {
    const n = problems.length;

    // Default to 3 columns at md; if a multiple of 4, use 4 columns
    const gridColsClass = n % 4 === 0 ? "md:grid-cols-4" : "md:grid-cols-3";

    return (
        <section className="relative pt-0">
            <h3 className="text-center text-4xl font-semibold pt-10 pb-6 leading-tight tracking-tight">
                The <span className="text-privue-800">Problem</span>
            </h3>

            {/* Grid with full borders like a table */}
            <div
                className={`mt-12 grid grid-cols-1 ${gridColsClass} border border-gray-200 divide-x divide-y divide-gray-200`}
            >
                {problems.map((p, idx) => (
                    <div key={idx} className="w-full">
                        <ProblemCard
                            icon={p.icon}
                            heading={p.problemHeading}
                            description={p.problemDesc}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
