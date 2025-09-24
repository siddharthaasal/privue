import IndustrySoltions from "@/components/industry/IndusdrySolutions";

export default function IndustrySection() {

    return (
        <section id="industries-section" className="font-open-sans relative mx-auto">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Who We{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Serve
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Whatever your needs, we have the solution, capabilities, and tools to help you achieve your goals.
                    </p>
                </div>

                <IndustrySoltions />
            </div>
        </section>
    );
}
