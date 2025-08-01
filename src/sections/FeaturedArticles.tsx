import ArticleGrid from "@/components/articles/FeaturedGrid";

export default function FeaturedArticles() {
    return (
        <section className="font-open-sans relative min-h-screen max-w-8xl px-6 py-0 md:px-12 lg:px-20">

            <div className="font-open-sans mx-auto mb-12 text-center mt-24">
                <h1 className="text-3xl md:text-4xl font-medium text-[#171717] mb-4">
                    Featured <span className="text-privue-900">Articles</span>
                </h1>
                <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                    Insights, guides, and stories curated for you.
                </p>
            </div>
            <ArticleGrid />
        </section>
    );
}
