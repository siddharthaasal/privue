import Layout from '@/components/Layout';
import { BlogCard } from '@/components/articles/ArticleCard';
import { articles as generatedArticles } from '@/lib/articles';
import { formatDate } from '@/lib/helpers';

// const articles = [
//     {
//         href: "/article",
//         title: "Persistent Storage and 97% Faster Cold Starts for Edge Functions",
//         description:
//             "Bring lightning-fast search to your Supabase apps,  with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Case Study",
//         image:
//             "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Case Study",
//         image: "https://plus.unsplash.com/premium_photo-1742443218246-1ebbf01c4689?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Case Study",
//         image: "https://images.unsplash.com/photo-1735902912145-c86917f1f97f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

//     },
//     {
//         href: "/article",
//         title: "Persistent Storage and 97% Faster Cold Starts for Edge Functions",
//         description:
//             "Bring lightning-fast search to your Supabase apps,  with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Case Study",
//         image:
//             "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Blog",
//         image: "https://plus.unsplash.com/premium_photo-1742443218246-1ebbf01c4689?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Blog",
//         image: "https://images.unsplash.com/photo-1735902912145-c86917f1f97f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//         href: "/article",
//         title: "Persistent Storage and 97% Faster Cold Starts for Edge Functions",
//         description:
//             "Bring lightning-fast search to your Supabase apps,  with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Blog",
//         image:
//             "https://images.unsplash.com/photo-1661773040856-91e96c56668d?q=80&w=1035&auto=format&fit=crop",
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         readTime: "5 minute",
//         articleType: "Case Study",
//         image: "https://plus.unsplash.com/premium_photo-1742443218246-1ebbf01c4689?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//         href: "/article",
//         title: "Algolia Connector for Supabase",
//         description:
//             "Bring lightning-fast search to your Supabase apps, with no code required.",
//         date: "Jul 17, 2025",
//         articleType: "Case Study",
//         readTime: "5 minute",
//         image: "https://images.unsplash.com/photo-1735902912145-c86917f1f97f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
// ];

export default function ArticleListing() {
  const cards = generatedArticles.map((a) => ({
    href: a.url,
    title: a.title,
    description: a.summary,
    date: formatDate(a.date),
    readTime: a.readTime,
    articleType: a.articleType ?? 'Article',
    image: a.coverImage,
  }));

  return (
    <Layout>
      <div className="mx-auto px-4 sm:px-6 lg:px-42 xl:px-24 2xl:px-6">
        <div className="font-open-sans mx-auto mb-12 pt-24 text-center">
          <h1 className="mb-4 text-3xl font-medium text-[#171717] md:text-4xl">
            Explore <span className="text-privue-900">Articles</span>
          </h1>
          <p className="mt-2 mb-4 text-base text-[#525252] md:text-lg dark:text-gray-400">
            Guides, trends, and tools for decision-makers
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((article, idx) => (
            <BlogCard key={idx} {...article} />
          ))}
        </div>
        <br />
      </div>
    </Layout>
  );
}
