import { useState } from 'react';
import { FileText, ShieldCheck, BarChart2, Activity, Globe, Biohazard, Sun } from 'lucide-react';

const modules = [
  {
    id: 'fs-extract',
    label: 'Financial Statement Extract',
    icon: <FileText size={20} />,
    description:
      'Extract and structure financial data like balance sheets and income statements from PDFs and raw formats.',
  },
  {
    id: 'insurance-policy-extract',
    label: 'Insurance Policy Extract',
    icon: <ShieldCheck size={20} />,
    description:
      'Parse insurance policy documents to extract coverage, premiums, and clauses efficiently.',
  },
  {
    id: 'credit-models',
    label: 'Credit Models',
    icon: <BarChart2 size={20} />,
    description:
      'Run proprietary credit scoring and modeling logic tailored for institutional evaluation.',
  },
  {
    id: 'cyber-risk',
    label: 'Cyber Risk',
    icon: <Activity size={20} />,
    description:
      'Evaluate organizations based on cybersecurity signals, breaches, and risk posture.',
  },
  {
    id: 'esg',
    label: 'ESG',
    icon: <Globe size={20} />,
    description:
      'Assess environmental, social, and governance data for regulatory and strategic use.',
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

export default function VerticalModulesListing() {
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <div className="mx-auto px-2 py-12">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Left: Module List */}
        <div className="space-y-3">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                activeModule.id === mod.id
                  ? 'border-privue-900 bg-privue-100/75 text-[#171717]'
                  : 'border-gray-200 text-[#505050] hover:bg-gray-100'
              }`}
            >
              <span className="text-privue-900">{mod.icon}</span>
              <span className="text-left text-[14px] font-normal">{mod.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Module Description */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:col-span-3">
          <div className="text-privue-900 mb-4 flex items-center gap-3">
            {activeModule.icon}
            <h3 className="text-xl font-semibold text-gray-900">{activeModule.label}</h3>
          </div>
          <p className="leading-relaxed text-gray-700">{activeModule.description}</p>
        </div>
      </div>
    </div>
  );
}
