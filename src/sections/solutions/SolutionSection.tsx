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
      <div className="px-4 pt-10 sm:p-8 md:p-12">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 md:text-center">
          <h1 className="text-center text-2xl leading-snug font-semibold tracking-tight sm:pt-10 sm:pb-6 sm:text-3xl md:text-4xl md:leading-tight">
            Our <span className="text-privue-800">Solution</span>
          </h1>
          <h2 className="md:text-md p-0 py-4 text-center text-sm font-normal text-gray-900 [text-align-last:center] sm:pt-8 sm:text-base md:p-4 md:pt-12 lg:text-2xl">
            {mainDesc}
          </h2>
        </div>
      </div>

      <div
        className={`mt-2 grid grid-cols-1 divide-x-1 divide-y-1 divide-gray-200 md:mt-12 ${gridColsClass} gap-0`}
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
