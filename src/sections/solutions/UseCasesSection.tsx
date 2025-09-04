import UseCasesCard from "@/components/solutions/UseCasesCard";
import type { UseCase } from "@/data/solutions/solutions";

interface UseCasesSectionProps {
    useCases?: UseCase[];
}

export default function UseCasesSection({
    useCases = [],
}: UseCasesSectionProps) {
    return (
        <div>
            <div className="pt-20">
                <h3 className="text-center text-4xl font-semibold">
                    Use <span className="text-privue-800">Cases</span>
                </h3>
            </div>

            <div className="border-gray-200 flex gap-1 px-12 py-20">
                {useCases.map((c, idx) => (
                    <div key={idx} className="flex-1">
                        <UseCasesCard
                            icon={c.icon}
                            heading={c.heading || undefined}
                            desc={c.desc}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
