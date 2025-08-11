import ModulesListing from "@/components/modules/ModulesListing"

export default function FeaturedModules() {
    return (
        <>
            <section className="font-open-sans relative min-h-screen mx-auto py-0  px-4 sm:px-6 lg:px-42 xl:px-24 2xl:px-6 max-w-[1269px]">

                <div className="font-open-sans mx-auto mb-12 text-center mt-24">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#171717] mb-4">
                        {/* Our <span className="text-privue-900">Modules</span> */}
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-medium">Modules</span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Designed to deliver value. Plug in what you need, when you need it.
                    </p>
                </div>
                <ModulesListing />
            </section>
        </>
    )
}