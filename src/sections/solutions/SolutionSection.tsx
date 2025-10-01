import SolutionCard from '@/components/solutions/SolutionCard';
import type { SolutionPoints } from '@/data/solutions/solutions';

interface SolutionSectionProps {
  mainDesc: string;
  solnPoints: SolutionPoints[];
}

export default function SolutionSection({ mainDesc, solnPoints }: SolutionSectionProps) {
  const n = solnPoints.length;
  // Default to 3 columns at md; if a multiple of 4, use 4 columns
  const gridColsClass = n % 4 === 0 ? 'md:grid-cols-4' : 'md:grid-cols-3';

  return (
    <>
      <div className="p-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-center text-4xl font-semibold">
            Our <span className="text-privue-800">Solution</span>
          </h3>

          <h2
            className="text-md md:text-md pt-12 font-normal text-gray-900 lg:text-2xl"
            style={{ textAlign: 'justify', textAlignLast: 'center' }}
          >
            {mainDesc}
          </h2>
        </div>
      </div>
      <div
        className={`mt-12 grid grid-cols-1 divide-x-1 divide-y-1 divide-gray-200 ${gridColsClass} gap-0`}
      >
        {solnPoints.map((sol, idx) => (
          <div
            key={idx}
            className={`flex-1 border-b border-gray-200 ${
              idx === solnPoints.length - 1 ? 'border-b' : ''
            }`}
          >
            <SolutionCard
              heading={sol.solutionHeading}
              description={sol.solutionDescription}
              icon={sol.icon}
            />
          </div>
        ))}
      </div>
    </>
  );
}
