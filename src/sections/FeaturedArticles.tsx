import ArticleGallery from '@/components/ArticleGallery';
// import TestArticleGallery from "@/components/TestArticleGallery";

export default function FeaturedArticles() {
  return (
    <section className="font-open-sans relative px-4 sm:px-6">
      <div className="mx-auto pt-8 px-4 text-center md:pt-12">
        <h1 className="mb-3 text-2xl font-semibold text-[#171717] md:text-4xl leading-tight">
          Featured{' '}
          <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
            Articles
          </span>
        </h1>
        <p className="mt-2 mb-4 mx-auto text-sm text-[#525252] md:text-lg dark:text-gray-400 leading-relaxed">
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
