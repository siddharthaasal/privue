import Layout from "@/components/Layout"
// import { ChevronLeft, HatGlasses, ChartSpline, Cog } from 'lucide-react';
import ModuleListing2 from "@/components/modules/ModuleListing2";
import ArticleReferenceCard from "@/components/solutions/ArticleReferenceCard";
import ProblemCard from "@/components/solutions/ProblemCard";
import CapabilitiesCard from "@/components/solutions/CapabilitiesCard";


export default function SolutionPage() {
    return (
        <Layout>
            <main className="relative mx-auto pt-12">
                <div>
                    <div className="text-center max-w-2/3 mx-auto">
                        <h1 className="text-4xl 2xl:text-5xl font-semibold text-gray-800">
                            Workforce Attribution
                        </h1>
                        <p className="text-[16px] 2xl:text-lg font-medium py-4 max-w-2/3 mx-auto text-gray-600">
                            Map every Non-Human Identity to its associated human users for complete accountability and governance.
                        </p>
                    </div>
                </div>

                <div className="border-t-[1px] border-gray-200 mt-12">
                    {/* Heading */}
                    <h3 className="text-center text-4xl font-semibold py-12">The <span className="text-privue-800">Problem</span></h3>

                    {/* Grid */}
                    <div className=" flex">
                        <ProblemCard
                            icon="/solutions/action.svg"
                            text="No visibility into who created, owns, or can access critical NHIs"
                        />
                        <ProblemCard
                            icon="/solutions/consumers.svg"
                            text="Impossible to assign accountability when security incidents occur"
                        />
                        <ProblemCard
                            icon="/solutions/hide.svg"
                            text="Former employees may still be tied to active NHIs"
                        />
                    </div>
                </div>
                {/* solution line */}
                <div className="border-t border-gray-200 py-20">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        <h4 className="text-xl  tracking-normal font-semibold text-privue-800">
                            Privue's Solution
                        </h4>
                        <h2 className="mt-4 text-2xl md:text-3xl font-medium leading-snug text-gray-900">
                            Provides complete workforce attribution showing
                            who created, stored, revealed, and accessed
                            every NHI in your environment.
                        </h2>
                    </div>
                </div>

                {/* capabilities section */}
                <div className="border-t-[1px] border-gray-200">
                    {/* <h2 className="text-center text-4xl font-semibold mb-4">How Privue Solves It</h2> */}
                    <h3 className="text-center text-4xl font-semibold py-12">Core <span className="text-privue-800">Capabilities</span></h3>

                    <div className="flex">
                        <CapabilitiesCard
                            icon="/solutions/hide.svg"
                            heading="Customer Relationship Mapping"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/action.svg"
                            heading="Storage Attribution"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/consumers.svg"
                            heading="Access Attribution"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                        <CapabilitiesCard
                            icon="/solutions/hide.svg"
                            heading="Lifecycle Tracking"
                            subheading="Tracks Creator, Owner, Modifier, User Relationships"
                        />
                    </div>
                </div>

                <div className="border-t-[1px] border-gray-200 py-10">
                    <h3 className="text-center text-4xl font-semibold mt-8">Our <span className="text-privue-800">Modules</span></h3>
                    <div className="py-8 flex">
                        <ModuleListing2 />
                    </div>
                </div>

                {/* case studies */}
                <div>
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
                </div>


            </main>
        </Layout>
    )
}