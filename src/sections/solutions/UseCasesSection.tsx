import UseCasesCard from '@/components/solutions/UseCasesCard';
import type { UseCase } from '@/data/solutions/solutions';

interface UseCasesSectionProps {
  useCases?: UseCase[];
}

export default function UseCasesSection({ useCases = [] }: UseCasesSectionProps) {
  return (
    <div>
      <div className="pt-20">
        <h3 className="text-2xl text-center font-semibold leading-snug tracking-tight  sm:text-3xl md:text-4xl md:leading-tight">
          Use <span className="text-privue-800">Cases</span>
        </h3>
      </div>

      <div
        className={`grid gap-8 md:gap-12 border-b border-gray-200 px-4 py-8 md:px-12 md:py-20 ${useCases.length % 3 == 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} `}
      >
        {useCases.map((c, idx) => (
          <UseCasesCard key={idx} icon={c.icon} heading={c.heading || undefined} desc={c.desc} />
        ))}
      </div>
    </div>
  );
}
