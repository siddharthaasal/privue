import ArticleGallery from '@/components/ArticleGallery';
// import TestArticleGallery from "@/components/TestArticleGallery";

export default function FeaturedArticles() {
  return (
    <section className="font-open-sans relative px-4 sm:px-6">
      <div className="mx-auto px-4 pt-8 text-center md:pt-12">
        <h1 className="mb-3 text-2xl leading-tight font-semibold text-[#171717] md:text-4xl">
          Featured{' '}
          <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
            Articles
          </span>
        </h1>
        <p className="mx-auto mt-2 mb-4 text-sm leading-relaxed text-[#525252] md:text-lg dark:text-gray-400">
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
