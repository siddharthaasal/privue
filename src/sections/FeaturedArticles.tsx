// import ArticleGrid from "@/components/articles/FeaturedGrid";
import { Gallery } from "@/components/Gallery";

export default function FeaturedArticles() {
    return (
        <section className="font-open-sans relative pb-48 px-4 sm:px-6 lg:px-42 xl:px-24 2xl:px-6">

            <div className="font-open-sans mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-medium text-[#171717] mb-4">
                    Featured <span className="text-privue-900">Articles</span>
                </h1>
                <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2">
                    Insights, guides, and stories curated for you.
                </p>
            </div>
            <Gallery />
        </section>
    );
}
