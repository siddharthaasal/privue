import ModuleListing2 from "@/components/modules/ModuleListing2"
// import ModulesListing from "@/components/modules/ModulesListing";
import type { Module } from "@/data/solutions/solutions"

interface ModulesSectionProps {
    modules: Module[];
}
export default function ModulesSection({ modules }: ModulesSectionProps) {
    return (
        <div className="border-t-[1px] border-gray-200">
            <h3 className="text-center text-4xl font-semibold pt-20">Our <span className="text-privue-800">Modules</span></h3>
            <div className="py-8 flex">
                <ModuleListing2 items={modules} defaultIndex={0} />
            </div>
            {/* <ModulesListing /> */}
        </div>
    )
}