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
      <div className="p-6 sm:p-8 md:p-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center md:text-center">
          <h1 className="text-2xl text-center font-semibold leading-snug tracking-tight sm:pt-10 sm:pb-6 sm:text-3xl md:text-4xl md:leading-tight">
            Our <span className="text-privue-800">Solution</span>
          </h1>
          <h2
            className="pt-6 text-sm font-normal text-gray-900 sm:pt-8 sm:text-base md:pt-12 md:text-md lg:text-2xl text-center [text-align-last:center]"
          >
            {mainDesc}
          </h2>
        </div>
      </div>

      <div
        className={` mt-8 md:mt-12 grid grid-cols-1 divide-x-1 divide-y-1 divide-gray-200 ${gridColsClass} gap-0`}
      >
        {solnPoints.map((sol, idx) => (
          <div
            key={idx}
            className={`flex-1 border-b border-gray-200 ${idx === solnPoints.length - 1 ? 'border-b' : ''
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
