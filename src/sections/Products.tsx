import DataAPIVisual from "@/components/products/DataAPIVisual";

export default function Products() {
    return (

        <section className="dark bg-background font-open-sans relative flex flex-col items-center min-h-screen max-w-8xl px-6 md:px-12 lg:px-20 pt-12 pb-24">

            <div className="font-open-sans mx-auto mb-8 text-center mt-12">
                <h1 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
                    Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-medium">Solutions</span>
                </h1>
                <p className="text-foreground-lighter text-base md:text-lg mt-2 mb-4">
                    {/* Top picks to elevate your workflow */}
                    Designed to deliver value. Plug in what you need, when you need it.
                </p>
            </div>
            {/* Products Grid */}
            <div className="mx-auto max-w-max">
                <div className="h-auto w-full mx-auto max-w-screen-2xl py-8 px-24 grid grid-cols-4 grid-rows-2 gap-4">
                    {/* Row 1 */}
                    <div className="col-span-1 row-span-1">
                        <DataAPIVisual />
                    </div>
                    <div className="col-span-1 row-span-1">
                        <DataAPIVisual />
                    </div>
                    <div className="col-span-1 row-span-1">
                        <DataAPIVisual />
                    </div>
                    <div className="col-span-1 row-span-1">
                        <DataAPIVisual />

                    </div>

                    {/* Row 2 */}
                    <div className="col-span-1">
                        <DataAPIVisual />

                    </div>
                    <div className="col-span-1">
                        <DataAPIVisual />

                    </div>
                    <div className="col-span-1">
                        <DataAPIVisual />

                    </div>
                    <div className="col-span-1">
                        <DataAPIVisual />
                    </div>
                </div>

            </div>
        </section>
    );
}
