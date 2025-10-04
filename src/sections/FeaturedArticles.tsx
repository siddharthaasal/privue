import ArticleGallery from '@/components/ArticleGallery';
// import TestArticleGallery from "@/components/TestArticleGallery";

export default function FeaturedArticles() {
  return (
    <section className="font-open-sans relative px-4 sm:px-6">
      <div className="font-open-sans mx-auto pt-12 text-center">
        <h1 className="mb-4 text-3xl font-semibold text-[#171717] md:text-4xl">
          Featured <span className="text-privue-900">Articles</span>
        </h1>
        <p className="mt-2 text-base text-[#525252] md:text-lg dark:text-gray-400">
          Insights, guides, and stories curated for you.
        </p>
      </div>
      <ArticleGallery mainArticleSlug="strengthening-insolvency-investigations" />
      {/* <div>
                <TestArticleGallery mainArticleSlug="strengthening-insolvency-investigations" />
            </div> */}
    </section>
  );
}
