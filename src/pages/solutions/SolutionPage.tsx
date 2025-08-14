import Layout from "@/components/Layout"
import { ChevronLeft, HatGlasses, ChartSpline, Cog } from 'lucide-react';
import ModulesListing from "@/components/modules/ModulesListing";
import ArticleReferenceCard from "@/components/solutions/ArticleReferenceCard";

export default function SolutionPage() {
    return (
        <Layout>
            <main className="relative min-h-screen mx-auto px-4 sm:px-6 lg:px-42 xl:px-24 2xl:px-6 max-w-[1269px] mt-36">
                {/* top section */}
                <div>
                    <a href="/" className="flex items-center cursor-pointer text-sm text-[#707070] hover:text-[#171717] mb-4">
                        <ChevronLeft size={18} className="p-0" />
                        <p className="">Back to Solutions</p>
                    </a>
                </div>
                <div className="flex">
                    {/* left heading */}
                    <div className="w-1/3">
                        <h1 className="text-3xl 2xl:text-4xl font-medium text-privue-800">
                            Private Credit
                        </h1>
                    </div>
                    {/* right heading */}
                    <div className="w-2/3">
                        <p className="text-base 2xl:text-lg font-medium">
                            Private credit’s rapid growth is altering global capital markets at an unprecedented pace, leading to more competition and new partnerships between banks, insurers and asset management companies.
                            <br />
                            For more than 100 years, Moody’s has played a critically important role in the public credit ecosystem with ratings, data, and research that are the market standard in understanding credit risk. We have brought this expertise to private credit, helping market participants decode risks and unlock opportunities.
                        </p>
                    </div>
                </div>
                <div className="my-12 border-[0.5] border-b border-privue-300"></div>
                {/* capabilities section */}
                <div className="">
                    <p className="text-sm font-medium mb-4 text-foreground-lighter">PRIVATE CREDIT CAPABILITIES</p>
                    <p className="text-3xl">
                        Unlock opportunities with greater confidence and transparency
                    </p>
                    <p className="mt-4 font-medium text-base 2xl:text-lg">
                        With Moody’s delivering independent, in-depth and transparent opinions on credit risk, our private credit capabilities provide you with unparalleled insights and assessments for non-bank lending.
                    </p>

                    {/* capability icons */}
                    <div className="flex gap-8 my-12 justify-between px-8">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-privue-100 text-privue-800">
                                <HatGlasses className="w-8 h-8" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-center">Corporate Finance</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-privue-100 text-privue-800">
                                <ChartSpline className="w-8 h-8" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-center">Fund finance and BDCs</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-privue-100 text-privue-800">
                                <Cog className="w-8 h-8" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-center">Asset-based lending</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-privue-100 text-privue-800">
                                <HatGlasses className="w-8 h-8" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-center">Project and infrastructure finance</p>
                        </div>
                    </div>

                </div>

                <div className="my-12 border-[0.5] border-b border-privue-300"></div>

                <div className="px-8">
                    <ModulesListing />
                </div>

                <div className="my-12 border-[0.5] border-b border-privue-300"></div>

                {/* case studies */}
                <div className="pb-32">

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

                            {/* <div className="border-b border-[0.5] border-foreground-lighter opacity-30 my-4"></div> */}
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

                </div>

            </main>
        </Layout>
    )
}