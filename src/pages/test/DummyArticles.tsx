import Layout from '@/components/Layout';
import { BlogCard } from '@/components/articles/ArticleCard';
// import { articles as generatedArticles } from "@/lib/articles";
import { formatDate } from '@/lib/helpers';

export default function DummyArticleListing() {
  const dummyArticles: any[] = [
    {
      slug: 'strengthening-insolvency-investigations',
      title: 'Strengthening Insolvency Investigations',
      date: '2025-06-04',
      author: 'Saurabh Verma',
      summary: 'Accelerating Asset Recovery Through Advanced Data Intelligence',
      tags: ['insolvency', 'asset recovery', 'risk intelligence', 'bankruptcy', 'compliance'],
      articleType: 'Case Study',
      solutionName: 'Insolvency Investigations',
      solutionLink: '#',
      coverImage: '/articles-test-images/court-hearing.png',
      readTime: '4 min',
      file: 'src/data/articles/strengthening-insolvency-investigations.mdx',
      url: '/articles/strengthening-insolvency-investigations',
    },
    {
      slug: 'redefining-commercial-lines-underwriting',
      title: 'Redefining Commercial Lines Underwriting',
      date: '2025-05-28',
      author: 'Saurabh Verma',
      summary: 'Unlocking Superior Risk Intelligence for Liability Insurance',
      tags: ['underwriting', 'insurance', 'risk intelligence', 'liability', 'analytics'],
      articleType: 'Case Study',
      solutionName: 'Commercial Lines Underwriting',
      solutionLink: '#',
      coverImage: 'articles-test-images/test-sketch-2.png',
      readTime: '3 min',
      file: 'src/data/articles/redefining-commercial-lines-underwriting.mdx',
      url: '/articles/redefining-commercial-lines-underwriting',
    },
    {
      slug: 'optimising-distributor-credit-risk-management',
      title: 'Optimising Distributor Credit Risk Management',
      date: '2025-05-20',
      author: 'Saurabh Verma',
      summary: 'Optimizing Financial Performance Through Data-Driven Credit Decisions',
      tags: ['credit risk', 'distributor', 'financial performance', 'analytics', 'B2B'],
      articleType: 'Case Study',
      solutionName: 'Distributor Credit Risk Management',
      solutionLink: '#',
      coverImage: '/articles-test-images/court-hearing.png',
      readTime: '2 min',
      file: 'src/data/articles/optimising-distributor-credit-risk-management.mdx',
      url: '/articles/optimising-distributor-credit-risk-management',
    },
    {
      slug: 'mitigating-risk-in-global-supplier-selection',
      title: 'Mitigating Risk in Global Supplier Selection',
      date: '2025-05-12',
      author: 'Saurabh Verma',
      summary: 'Building Resilient Supply Chains Through Advanced Compliance and Risk Analytics',
      tags: ['supplier risk', 'compliance', 'supply chain', 'analytics', 'global trade'],
      articleType: 'Case Study',
      solutionName: 'Supplier Risk Intelligence',
      solutionLink: '#',
      coverImage: 'articles-test-images/test-sketch-2.png',
      readTime: '3 min',
      file: 'src/data/articles/mitigating-risk in-global-supplier-selection.mdx',
      url: '/articles/mitigating-risk-in-global-supplier-selection',
    },
    {
      slug: 'transforming-credit-risk-assessment',
      title: 'Transforming Credit Risk Assessment Through Alternative Data',
      date: '2025-04-21',
      author: 'Saurabh Verma',
      summary: 'Unlocking New Dimensions of Credit Intelligence for Financial Institutions',
      tags: ['credit risk', 'alternative data', 'financial services', 'MSME', 'analytics'],
      articleType: 'Case Study',
      solutionName: 'Credit Risk Assessment',
      solutionLink: '#',
      coverImage: 'articles-test-images/test-sketch-2.png',
      readTime: '4 min',
      file: 'src/data/articles/transforming-credit-risk-assessment.mdx',
      url: '/articles/transforming-credit-risk-assessment',
    },
    {
      slug: 'enhancing-supply-chain-resilience',
      title: 'Enhancing Supply Chain Resilience',
      date: '2025-04-20',
      author: 'Saurabh Verma',
      summary: 'Intelligent Vendor Risk Monitoring for Operational Stability ',
      tags: ['supply chain', 'risk', 'analytics'],
      articleType: 'Case Study',
      solutionName: 'Third-Party Risk Intelligence',
      solutionLink: '#',
      coverImage: '/articles-test-images/court-hearing.png',
      readTime: '4 min',
      file: 'src/data/articles/enhancing-supply-chain-resilience.mdx',
      url: '/articles/enhancing-supply-chain-resilience',
    },
  ];

  const cards = dummyArticles.map((a) => ({
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
        <div className="grid grid-cols-1 gap-6 pb-32 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((article, idx) => (
            <BlogCard key={idx} {...article} />
          ))}
        </div>
        <br />
      </div>
    </Layout>
  );
}
