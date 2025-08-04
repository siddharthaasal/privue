import Layout from "@/components/Layout";
import { BlogCard } from "@/components/articles/ArticleCard";
import { useState } from "react";
// import { articles } from "@/data/articles";

const filters = ["Case Study", "Blog", "Client Story"];

export default function ArticleListing() {

    const [selectedFilter, setSelectedFilter] = useState("Case Study");

    // const filteredArticles = articles.filter(
    //     (article) => article.articleType === selectedFilter
    // );

    return (
        <Layout>
            <>
                <div className="font-open-sans mx-auto mb-12 text-center mt-24">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#171717] mb-4">
                        Explore <span className="text-privue-900">Articles</span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Guides, trends, and tools for decision-makers
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex justify-center gap-2 mb-4">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`font-open-sans rounded-3xl px-4 py-2 text-sm cursor-pointer font-normal transition border 
              ${selectedFilter === filter
                                    ? "border-privue-900 bg-privue-100/75 text-[#171717] shadow-sm"
                                    : "border-gray-200 hover:bg-gray-100 text-[#505050]"
                                // : "border-[#DFDFDF] text-[#707070] hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>


                {/* Articles Grid */}
                <div className="h-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pt-6 pb-32 px-24  gap-6">
                    {/* <div className="h-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pt-6 pb-32 px-24 grid grid-cols-2 gap-6"> */}
                    {/* {filteredArticles.map((article, index) => (
                        <InfoCard
                            key={index}
                            title={article.title}
                            summary={article.summary}
                            url={article.url}
                            articleType={article.articleType}
                            tags={article.tags}
                            solutionLink={article.solutionLink}
                            solutionName={article.solutionName}
                            author={article.author}
                            publishedDate={article.publishedDate}
                        />
                    ))} */}
                    <div className="flex w-full gap-4 m-6">
                        <BlogCard
                            href="/article"
                            title="Persistent Storage and 97% Faster Cold Starts for Edge Functions"
                            description="Bring lightning-fast search to your Supabase apps,  with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                        />
                        <BlogCard
                            href="/article"
                            title="Algolia Connector for Supabase"
                            description="Bring lightning-fast search to your Supabase apps, with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="/testBlogImage.png"
                        />
                        <BlogCard
                            href="/article"
                            title="Algolia Connector for Supabase"
                            description="Bring lightning-fast search to your Supabase apps, with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                        />

                    </div>
                    <div className="flex w-full gap-4 m-6">
                        <BlogCard
                            href="/article"
                            title="Persistent Storage and 97% Faster Cold Starts for Edge Functions"
                            description="Bring lightning-fast search to your Supabase apps, with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                        />
                        <BlogCard
                            href="/article"
                            title="Algolia Connector for Supabase"
                            description="Bring lightning-fast search to your Supabase apps, with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                        />
                        <BlogCard
                            href="/article"
                            title="Algolia Connector for Supabase"
                            description="Bring lightning-fast search to your Supabase apps, with no code required."
                            date="Jul 17, 2025"
                            readTime="5 minute"
                            image="https://raw.githubusercontent.com/supabase/supabase/refs/heads/master/apps/www/public/images/blog/dbos/og.png"
                        />

                    </div>

                </div>
            </>
        </Layout>
    )
}
