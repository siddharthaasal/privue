import CapabilitiesCard from "@/components/solutions/CapabilitiesCard";
import type { Capability } from "@/data/solutions/solutions";

interface CapabilitiesSectionProps {
    capabilities?: Capability[]; // ← optional
}

export default function CapabilitiesSection({
    capabilities = [],           // ← default to []
}: CapabilitiesSectionProps) {
    if (!capabilities.length) return null;
    return (
        <div>
            <div className="pt-20">
                <h3 className="text-center text-4xl font-semibold">
                    Core <span className="text-privue-800">Capabilities</span>
                </h3>
            </div>

            <div className="border-gray-200 flex gap-1 px-12 py-20">
                {capabilities.map((c, idx) => (
                    <div key={idx} className="flex-1">
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
