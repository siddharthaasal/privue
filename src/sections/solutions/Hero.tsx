import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

interface HeroProps {
    heading: string
    subHeading: string
    image: string
}

export default function Hero({ heading, subHeading, image }: HeroProps) {
    return (
        <>
            <div className="relative flex flex-col gap-10 overflow-hidden border-x border-gray-200 px-6 sm:px-12 lg:px-20">
                {/* Heading */}
                <div className="py-20 mx-auto flex max-w-2xl flex-col gap-4 text-center">
                    <h1 className=" text-5xl 2xl:text-5xl font-semibold text-gray-800">
                        {heading}
                    </h1>
                    <p className="text-base text-center 2xl:text-lg max-w-[750px] font-medium text-gray-600">
                        {subHeading}
                    </p>
                </div>

                {/* Hero image */}
                <div className="relative z-10 mx-auto w-full max-w-3xl pointer-events-none">
                    <img
                        src={image}
                        alt={`${heading} image`}
                        className="w-full"
                    />
                </div>

                <GridPattern
                    width={75}
                    height={75}
                    x={-1}
                    y={-1}
                    className={cn(
                        "absolute inset-0 left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" +
                        "w-[100px] md:w-[200px] lg:w-[500px] lg:h-[500px] text-gray-800 z-0 " +
                        "rotate-150 [transform:skewX(30deg)] " +
                        "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
                    )}
                />

            </div>
        </>
    )
}