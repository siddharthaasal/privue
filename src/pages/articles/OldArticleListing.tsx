import Layout from '@/components/Layout';
import InfoCard from '@/components/articles/InfoCard';
import { useState } from 'react';
import { articles } from '@/data/articles';

const filters = ['Case Study', 'Blog', 'Client Story'];

export default function OldArticleListing() {
  const [selectedFilter, setSelectedFilter] = useState('Case Study');

  const filteredArticles = articles.filter((article) => article.articleType === selectedFilter);

  return (
    <Layout>
      <>
        <div className="font-open-sans mx-auto mt-24 mb-12 text-center">
          <h1 className="mb-4 text-3xl font-medium text-[#171717] md:text-4xl">
            Explore <span className="text-privue-900">Articles</span>
          </h1>
          <p className="mt-2 mb-4 text-base text-[#525252] md:text-lg dark:text-gray-400">
            Guides, trends, and tools for decision-makers
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-4 flex justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-open-sans cursor-pointer rounded-full border bg-gray-100/40 px-6 py-2 text-sm font-medium transition ${
                selectedFilter === filter
                  ? 'border-privue-500 text-privue-700 bg-privue-100/10 border-[1px] shadow-sm'
                  : 'border-[#DFDFDF] text-[#707070] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mx-auto h-auto w-full max-w-screen-xl gap-6 px-24 pt-6 pb-32 2xl:max-w-screen-2xl">
          <div className="mx-auto grid h-auto w-full max-w-screen-xl grid-cols-2 gap-6 px-24 pt-6 pb-32 2xl:max-w-screen-2xl">
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
        </div>
      </>
    </Layout>
  );
}
