// import ModulesListing from "@/components/modules/ModulesListing"
import ModuleListing2 from "@/components/modules/ModuleListing2"

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
                <ModuleListing2 />
            </section>
        </>
    )
}