import Layout from "@/components/Layout";
import InfoCard from "@/components/articles/InfoCard";
import { useState } from "react";
import { articles } from "@/data/articles";

const filters = ["Case Study", "Blog", "Client Story"];

export default function ArticleListing() {

    const [selectedFilter, setSelectedFilter] = useState("Case Study");

    const filteredArticles = articles.filter(
        (article) => article.articleType === selectedFilter
    );

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
                            className={`font-open-sans rounded-full bg-gray-100/40 px-6 py-2 text-sm cursor-pointer font-medium transition border 
              ${selectedFilter === filter
                                    ? "border-privue-500 border-[1px] text-privue-700 bg-privue-100/10 shadow-sm"
                                    : "border-[#DFDFDF] text-[#707070] hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>


                {/* Articles Grid */}
                <div className="h-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pt-6 pb-32 px-24 grid grid-cols-2 gap-6">
                    {filteredArticles.map((article, index) => (
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
                    ))}
                </div>
            </>
        </Layout>
    )
}
