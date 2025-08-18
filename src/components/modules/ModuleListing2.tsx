import { useState } from "react";

const tabs = [
    { id: "visibility", label: "Visibility & Context" },
    { id: "lifecycle", label: "Lifecycle Management" },
    { id: "posture", label: "Posture & Risk Management" },
    { id: "detection", label: "Detection & Response" },
    { id: "zero-trust", label: "Zero Trust Protection" },
];

export default function ModuleListing2() {
    const [activeTab, setActiveTab] = useState("visibility");

    return (
        <section className="w-full border-t border-b border-gray-200">
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 text-center border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer py-8 px-2 text-base font-medium border-r-[0.5px] ${activeTab === tab.id
                            ? "border-b-1 border-b-black text-black"
                            : "border-b-[0.5px] border-gray-200 text-gray-500 hover:text-black"
                            }`}
                    >
                        {tab.label}
                    </button>

                ))}
            </div>


            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-12 py-24">
                {/* Left side */}
                <div className="flex flex-col justify-left">
                    <h2 className="text-lg font-medium mb-4">Get the Full Picture</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Automatically and continuously discover and correlate all NHIs across the
                        entire ecosystem with a contextualized inventory, including API keys,
                        tokens, secrets, service accounts, and certificates.
                    </p>
                    <a
                        href="#"
                        className="text-sm font-medium text-black hover:underline flex items-center gap-1"
                    >
                        LEARN MORE →
                    </a>
                </div>

                {/* Right side → Image container */}
                <div className="flex items-center justify-center border border-gray-200 rounded-xl bg-gray-50 p-8 col-span-2">
                    <img
                        // src="https://placehold.co/600x400"
                        src="/demo-chart.webp"
                        alt="Feature preview"
                        className="min-h-72 object-contain"
                    />
                </div>
            </div>

        </section>
    );
}
