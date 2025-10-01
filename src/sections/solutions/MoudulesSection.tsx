import ModuleListing2 from '@/components/modules/ModuleListing2';
// import ModulesListing from "@/components/modules/ModulesListing";
import type { Module } from '@/data/solutions/solutions';

interface ModulesSectionProps {
  modules: Module[];
}
export default function ModulesSection({ modules }: ModulesSectionProps) {
  return (
    <div className="border-t-[1px] border-gray-200">
      <h3 className="pt-20 text-center text-4xl font-semibold">
        Our <span className="text-privue-800">Modules</span>
      </h3>
      <p className="mt-2 mb-4 text-center text-base text-[#525252] md:text-lg dark:text-gray-400">
        Experience how AI transforms your workflow to build a scalable and efficient business.
      </p>
      <div className="flex py-8">
        <ModuleListing2 items={modules} defaultIndex={0} />
      </div>
      {/* <ModulesListing /> */}
    </div>
  );
}
