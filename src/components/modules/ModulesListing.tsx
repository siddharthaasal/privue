import { useState } from 'react';
import {
    FileText,
    ShieldCheck,
    BarChart2,
    Activity,
    Globe,
    Biohazard,
    Sun
} from 'lucide-react';

const modules = [
    {
        id: 'fs-extract',
        label: 'Financial Statement Extract',
        icon: <FileText size={20} />,
        description: 'Extract and structure financial data like balance sheets and income statements from PDFs and raw formats.',
    },
    {
        id: 'insurance-policy-extract',
        label: 'Insurance Policy Extract',
        icon: <ShieldCheck size={20} />,
        description: 'Parse insurance policy documents to extract coverage, premiums, and clauses efficiently.',
    },
    {
        id: 'credit-models',
        label: 'Credit Models',
        icon: <BarChart2 size={20} />,
        description: 'Run proprietary credit scoring and modeling logic tailored for institutional evaluation.',
    },
    {
        id: 'cyber-risk',
        label: 'Cyber Risk',
        icon: <Activity size={20} />,
        description: 'Evaluate organizations based on cybersecurity signals, breaches, and risk posture.',
    },
    {
        id: 'esg',
        label: 'ESG',
        icon: <Globe size={20} />,
        description: 'Assess environmental, social, and governance data for regulatory and strategic use.',
    },
    {
        id: 'carbon-est',
        label: 'Carbon Emissions Estimation',
        icon: <Biohazard size={20} />,
        description: 'Estimate Carbon Emissions',
    },
    {
        id: 'climate-risk',
        label: 'Climate Risk Assessment',
        icon: <Sun size={20} />,
        description: 'Evaluate Climate Risk',
    },

];

export default function ModulesListing() {
    const [activeModule, setActiveModule] = useState(modules[0]);

    return (
        <div className="mx-auto max-w-screen-2xl py-12 px-6 md:px-12 lg:px-20">

            <div className="grid md:grid-cols-4 gap-4">
                {/* Left: Module List */}
                <div className="space-y-3">
                    {modules.map((mod) => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod)}
                            className={`w-full cursor-pointer flex items-center gap-3 p-4 rounded-lg border transition
                ${activeModule.id === mod.id
                                    ? 'border-privue-900 bg-privue-100/75 text-[#171717]'
                                    : 'border-gray-200 hover:bg-gray-100 text-[#505050]'
                                }`}
                        >
                            <span className="text-privue-900">{mod.icon}</span>
                            <span className="text-left text-[14px] font-normal">
                                {mod.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right: Module Description */}
                <div className="md:col-span-3 p-6 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-privue-900">
                        {activeModule.icon}
                        <h3 className="text-xl font-semibold text-gray-900">{activeModule.label}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{activeModule.description}</p>
                </div>
            </div>
        </div>
    );
}
