import { ProblemCard, ProblemCardMobile } from '@/components/solutions/ProblemCard';
import type { Problem } from '@/data/solutions/solutions';

interface ProblemSectionProps {
  problems: Problem[];
}

export default function ProblemSection({ problems }: ProblemSectionProps) {
  const n = problems.length;

  // Default to 3 columns at md; if a multiple of 4, use 4 columns
  const gridColsClass = n % 4 === 0 ? 'md:grid-cols-4' : 'md:grid-cols-3';

  return (
    <section className="relative pt-0">
      <h3 className="pt-8 pb-0 text-center text-2xl leading-snug font-semibold tracking-tight sm:pt-10 sm:pb-6 sm:text-3xl md:text-4xl md:leading-tight">
        The <span className="text-privue-800">Problem</span>
      </h3>

      <div className="mt-6 md:mt-12 md:border-t">
        <div
          className={`grid grid-cols-1 divide-x-1 divide-y-1 divide-gray-200 ${gridColsClass} gap-0`}
        >
          {problems.map((p, idx) => (
            <div
              key={idx}
              className={`flex-1 border-b border-gray-200 ${
                idx === problems.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Mobile view */}
              <div className="block md:hidden">
                <ProblemCardMobile
                  icon={p.icon}
                  heading={p.problemHeading}
                  description={p.problemDesc}
                />
              </div>

              {/* Tablet and up */}
              <div className="hidden md:block">
                <ProblemCard icon={p.icon} heading={p.problemHeading} description={p.problemDesc} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
