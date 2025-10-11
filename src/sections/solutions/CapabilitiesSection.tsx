import CapabilitiesCard from '@/components/solutions/CapabilitiesCard';
import type { Capability } from '@/data/solutions/solutions';

interface CapabilitiesSectionProps {
  capabilities?: Capability[]; // ← optional
}

export default function CapabilitiesSection({
  capabilities = [], // ← default to []
}: CapabilitiesSectionProps) {
  if (!capabilities.length) return null;
  return (
    <div>
      <div className="pt-10">
        <h3 className="text-2xl text-center font-semibold leading-snug tracking-tight  sm:text-3xl md:text-4xl md:leading-tight">
          Core <span className="text-privue-800">Capabilities</span>
        </h3>
      </div>

      <div
        className={`grid grid-cols-2 gap-y-8 md:gap-12 border-b border-gray-200 px-4 py-8 md:px-12 md:py-20 ${capabilities.length % 3 == 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} `}
      >
        {capabilities.map((c, idx) => (
          <div
            key={idx}
            className={`${
              // Make the last item span full width if odd count
              capabilities.length % 2 !== 0 && idx === capabilities.length - 1
                ? 'col-span-2 sm:col-span-1'
                : 'col-span-1'
              }`}
          >
            <CapabilitiesCard
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
