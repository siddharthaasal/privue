import UseCasesCard from '@/components/solutions/UseCasesCard';
import type { UseCase } from '@/data/solutions/solutions';

interface UseCasesSectionProps {
  useCases?: UseCase[];
}

export default function UseCasesSection({ useCases = [] }: UseCasesSectionProps) {
  return (
    <div>
      <div className="pt-10">
        <h3 className="text-2xl text-center font-semibold leading-snug tracking-tight  sm:text-3xl md:text-4xl md:leading-tight">
          Use <span className="text-privue-800">Cases</span>
        </h3>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-y-8 md:gap-12 border-b border-gray-200 px-4 py-8 md:px-12 md:py-20 ${useCases.length % 3 == 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} `}
      >
        {useCases.map((c, idx) => (
          <div
            key={idx}
            className={`${
              // Make the last item span full width if odd count
              useCases.length % 2 !== 0 && idx === useCases.length - 1
                ? 'col-span-2 sm:col-span-1'
                : ''
              }`}
          >
            <UseCasesCard
              icon={c.icon}
              heading={c.heading}
              desc={c.desc}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
