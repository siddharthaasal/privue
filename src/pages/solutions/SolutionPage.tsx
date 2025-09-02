import Layout from "@/components/Layout"
import { useEffect, useState } from "react";
// import { ChevronLeft, HatGlasses, ChartSpline, Cog } from 'lucide-react';
import ModuleListing2 from "@/components/modules/ModuleListing2";
// import ArticleReferenceCard from "@/components/solutions/ArticleReferenceCard";
import ProblemCard from "@/components/solutions/ProblemCard";
import CapabilitiesCard from "@/components/solutions/CapabilitiesCard";
// import ChallengeCard from "@/components/solutions/ChallengeCard";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

import { BlogCard } from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { solutions } from "@/data/solutions/solutions";
import ChallengeCard from "@/components/solutions/ChallengeCard";

interface BlogCardProps {
    href: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
}

interface BlogCardProps {
    href: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
}

const blogs: BlogCardProps[] = [
    {
        href: "/article",
        title: "Computer Vision Technology",
        description:
            "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
        date: "Jul 24, 2025",
        readTime: "4 min",
        image:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
        href: "/article",
        title: "Computer Vision Technology",
        description:
            "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
        date: "Jul 24, 2025",
        readTime: "4 min",
        image:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
        href: "/article",
        title: "Computer Vision Technology",
        description:
            "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
        date: "Jul 24, 2025",
        readTime: "4 min",
        image:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
]



const solutionPoints: string[] = [
    "Evaluate distributors’ ability to pay: Privue checks if a distributor or dealer can pay you.",
    "Support finance teams: Provides guidance on how much credit to extend to each distributor.",
    "Regular monitoring: Reviews each distributor every six months.",
    "Early warning system: Alerts you if a distributor shows signs of struggle, so credit terms can be adjusted to prevent losses.",
    "Comprehensive evaluation: Assesses each distributor across 300 + data points from public and private repositories.",
    "Integrated risk engine: Combines external data with documents provided by the distributor.",
];

// const integrationPoints: string[] = [
//     "Connects to identity providers such as Entra ID, Okta, and more",
//     "Integrates with HR systems for employee lifecycle management",
//     "Links with development tools and secret managers",
// ];


export default function SolutionPage() {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const soln = solutions[0];

    useEffect(() => {
        if (!carouselApi) return;
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
        };
        updateSelection();
        carouselApi.on("select", updateSelection);
        return () => {
            carouselApi.off("select", updateSelection);
        };
    }, [carouselApi]);
    return (
        <Layout>
            <main className="relative mx-auto pt-12">
                <div>
                    <div className="relative flex flex-col gap-10 overflow-hidden border-x border-gray-200 px-6 sm:px-12 lg:px-20">
                        {/* Heading */}
                        <div className="py-20 mx-auto flex max-w-2xl flex-col gap-4 text-center">
                            <h1 className=" text-5xl 2xl:text-5xl font-semibold text-gray-800">
                                {soln.heading}
                            </h1>
                            <p className="text-base text-center 2xl:text-lg max-w-[750px] font-medium text-gray-600">
                                {soln.subHeading}
                            </p>
                        </div>

                        {/* Hero image */}
                        <div className="relative z-10 mx-auto w-full max-w-3xl pointer-events-none">
                            <img
                                src="/solutions/demo-image.png"
                                alt="Zero Trust Security Protection for Identities"
                                className="w-full"
                            />
                        </div>

                        {/* Grid background */}
                        {/* <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 lg:top-0 lg:bottom-auto">
                            <GridPattern
                                width={40}
                                height={40}
                                x={-1}
                                y={-1}
                                className="w-[600px] md:w-[900px] lg:w-[1124px] text-gray-800"
                            />
                        </div> */}
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
                </div>

                <div className="relative pt-16">
                    {/* Heading */}
                    <h3 className="text-center text-4xl font-semibold py-10 leading-tight tracking-tight">The <span className="text-privue-800">Problem</span></h3>

                    {/* Grid */}
                    <div className="border-t border-gray-200 mt-12 flex gap-1">
                        {soln.problems.map((p, idx) => (
                            <div key={idx} className="flex-1">
                                <ProblemCard
                                    icon={p.icon}
                                    heading={p.problemHeading}
                                    description={p.problemDesc}
                                />
                            </div>
                        ))}
                    </div>

                </div>
                {/* solution line */}
                <div className="border-t border-gray-200 p-24">
                    <div className="max-w-5xl mx-auto text-center px-6">
                        <h4 className="text-xl  tracking-normal font-semibold text-privue-800">
                            Solution
                        </h4>
                        <h2
                            className="mt-6 text-md md:text-md lg:text-xl font-normal text-gray-800"
                            style={{ textAlign: "justify", textAlignLast: "center" }}
                        >
                            {soln.mainSolnDesc}
                        </h2>

                    </div>
                </div>
                <div className="border-t border-gray-200 p-12">
                    <div className="max-w-5xl mx-auto text-center px-6">
                        <h3 className="text-center text-4xl font-semibold">Our <span className="text-privue-800">Solution</span></h3>

                        <h2
                            className="py-12 text-md md:text-md lg:text-2xl font-normal text-gray-900"
                            style={{ textAlign: "justify", textAlignLast: "center" }}
                        >
                            Privue is a simple tool that helps you check if a distributor or dealer can pay you. It tells your finance team how much credit to give each distributor.
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <ChallengeCard
                        heading="Credit evaluation"
                        description="Check if a distributor/dealer can pay and guide how much credit to extend."
                    />
                    <ChallengeCard
                        heading="Ongoing monitoring"
                        description="Reviews every six months and sends early warnings to prevent losses."
                    />
                    <ChallengeCard
                        heading="Comprehensive insights"
                        description="Assesses 300+ data points from public/private sources plus distributor documents for accurate creditworthiness."
                    />
                </div>
                <div className="border-t border-gray-200 p-12">
                    <div className="max-w-5xl mx-auto text-center px-6">
                        <h3 className="text-center text-4xl font-semibold">Our <span className="text-privue-800">Solution</span></h3>

                        <div className="text-left flex-1 pr-6 md:pr-12 border-b md:border-b-0 border-gray-200 py-20">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 px-2 text-gray-700">
                                {solutionPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-lg">→</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* capabilities section */}
                <div className="border-t-[1px] border-gray-200">
                    <div className="pt-20">
                        {/* <h2 className="text-center text-4xl font-semibold mb-6">How Privue Solves It</h2> */}
                        <h3 className="text-center text-4xl font-semibold">Core <span className="text-privue-800">Capabilities</span></h3>
                        {/* <h3 className="text-center text-3xl font-semibold">Core <span className="text-privue-800">Capabilities</span></h3> */}
                    </div>


                    {/* <div className="flex px-12 py-20">
                        <CapabilitiesCard
                            icon="/solutions/lock.svg"
                            heading="Customer Relationship Mapping"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/token.svg"
                            heading="Storage Attribution"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/context-driven.svg"
                            heading="Access Attribution"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/streamlined.svg"
                            heading="Lifecycle Tracking"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                    </div> */}

                    <div className=" border-gray-200 flex gap-1 px-12 py-20">
                        {soln.coreCapabilities.map((c, idx) => (
                            <div key={idx} className="flex-1">
                                <CapabilitiesCard
                                    icon={c.icon}
                                    // heading={c.desc}
                                    subheading={c.desc}
                                />
                            </div>
                        ))}
                    </div>
                </div>




                {/* modules */}
                <div className="border-t-[1px] border-gray-200">
                    <h3 className="text-center text-4xl font-semibold pt-20">Our <span className="text-privue-800">Modules</span></h3>
                    <div className="py-8 flex">
                        <ModuleListing2 items={soln.modules} defaultIndex={0} />;
                    </div>
                </div>

                {/* case studies */}
                <div className="py-24">
                    <h2 className="text-center text-4xl font-semibold  mb-8">Related <span className="text-privue-800">Articles</span></h2>
                    <div className="p-4">
                        <div className="container">
                            {/* Header with arrows aligned right */}
                            <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end">
                                <div className="mt-4 flex w-full items-center justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => carouselApi?.scrollPrev()}
                                        disabled={!canScrollPrev}
                                        className="disabled:pointer-events-auto"
                                    >
                                        <ArrowLeft className="size-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => carouselApi?.scrollNext()}
                                        disabled={!canScrollNext}
                                        className="disabled:pointer-events-auto"
                                    >
                                        <ArrowRight className="size-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Carousel starting from left */}
                        <div className="w-full max-w-full">
                            <Carousel
                                setApi={setCarouselApi}
                                opts={{
                                    breakpoints: {
                                        "(max-width: 768px)": {
                                            dragFree: true,
                                        },
                                    },
                                }}
                                className="relative w-full max-w-full"
                            >
                                <CarouselContent className="hide-scrollbar w-full max-w-full">
                                    {/* {items.map((item) => ( */}
                                    {blogs.map((item) => (
                                        // <CarouselItem key={item.id} className="ml-2 md:max-w-[452px]">
                                        <CarouselItem className="ml-2 md:max-w-[452px]">
                                            <BlogCard
                                                href={item.href}
                                                title={item.title}
                                                description={item.description}
                                                date={item.date}
                                                readTime={item.readTime}
                                                image={item.image}
                                                articleType="Case Study"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>




                {/* <div>
                    <h2 className="text-center text-4xl font-semibold my-12">Related <span className="text-privue-800">Articles</span></h2>
                    <div className="p-12">
                        <div className="flex px-6 gap-10">
                            <div>
                                <ArticleReferenceCard
                                    href="/article"
                                    title="Private credit growth adds liquidity but heightens risk in CRE market"
                                    date="July 25, 2025"
                                    readTime="4 minutes"
                                    image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                                    tag="Case Study"
                                />

                                <div className="border-b border-[0.5] border-foreground-lighter opacity-30 my-4"></div>
                            </div>
                            <div>
                                <ArticleReferenceCard
                                    href="/article"
                                    title="Private credit growth adds liquidity but heightens risk in CRE market"
                                    date="July 25, 2025"
                                    readTime="4 minutes"
                                    image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                                    tag="Case Study"
                                />

                                <div className="border-b border-[0.5] border-foreground-lighter opacity-30 my-4"></div>
                            </div>
                        </div>
                        <div className="flex px-6 gap-10">
                            <div>
                                <ArticleReferenceCard
                                    href="/article"
                                    title="Private credit growth adds liquidity but heightens risk in CRE market"
                                    date="July 25, 2025"
                                    readTime="4 minutes"
                                    image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                                    tag="Case Study"
                                />

                            </div>
                            <div>
                                <ArticleReferenceCard
                                    href="/article"
                                    title="Private credit growth adds liquidity but heightens risk in CRE market"
                                    date="July 25, 2025"
                                    readTime="4 minutes"
                                    image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                                    tag="Case Study"
                                />

                            </div>

                        </div>

                    </div >
                </div > */}



            </main>
        </Layout>
    )
}