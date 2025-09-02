// import ModulesListing from "@/components/modules/ModulesListing"
import ModuleListing2 from "@/components/modules/ModuleListing2"

const modules = [
    {
        title: "Dealer Onboarding",
        description:
            "Add dealers, upload documents and verify identity",
        imgSrc: "/demo-chart.webp",
        link: "#",
    },
    {
        title: "Data Acquisition",
        description:
            "Obtain, data available publicly and from financials and GST",
        imgSrc: "/demo-chart.webp",
        link: "#",
    },
    {
        title: "Risk Assessment",
        description:
            "Determine risk score of the dealer using advance models",
        imgSrc: "/demo-chart.webp",
        link: "#",
    },
    {
        title: "Credit Terms",
        description:
            "Use the score to choose safe credit terms for every dealer",
        imgSrc: "/demo-chart.webp",
        link: "#",
    },
    {
        title: "Continuous Monitoring",
        description:
            "PRIVUE rescores dealers twice a year and sends an alert if anything looks risky",
        imgSrc: "/images/modules/credit-risk-engine.png",
        link: "#",
    },
    {
        title: "Go Live in 2 weeks",
        description:
            "The tool can be integrated into your ERP system for a seamless experience",
        imgSrc: "/demo-chart.webp",
        link: "#",
    },
];

export default function FeaturedModules() {
    return (
        <>
            <section className="font-open-sans relative mx-auto my-24">

                <div className="font-open-sans mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        {/* Our <span className="text-privue-900">Modules</span> */}
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">Modules</span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Designed to deliver value. Plug in what you need, when you need it.
                    </p>
                </div>
                {/* <ModulesListing /> */}
                <ModuleListing2 items={modules} defaultIndex={0} />
            </section>
        </>
    )
}