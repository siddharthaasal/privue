import { articles } from '@/data/articles/index.ts';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { BlogCard } from '@/components/articles/ArticleCard';
import { useState, useEffect } from 'react';

function getRelatedArticles(mainSlug: string, count = 4) {
  const main = articles.find((a) => a.slug === mainSlug);
  if (!main) return [];
  // pick random others (excluding main)
  const others = articles.filter((a) => a.slug !== mainSlug).slice(0, count - 1);

  return [main, ...others];
}

interface RelatedArticlesProps {
  mainArticleSlug: string;
}

export default function TestArticleGallery({ mainArticleSlug }: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(mainArticleSlug, 4);
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
      console.log('Rel articles', relatedArticles);
    };
  }, [carouselApi]);

  return (
    <>
      <div className="py-8">
        <div className="p-4">
          <div className="container">
            {/* Header with arrows aligned right */}
            <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end">
              <div className="mt-4 flex w-full items-center justify-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="disabled:pointer-events-auto"
                >
                  <ArrowLeft className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className="disabled:pointer-events-auto"
                >
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel starting from left */}
          <div className="w-full max-w-full">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                breakpoints: {
                  '(max-width: 768px)': {
                    dragFree: true,
                  },
                },
              }}
              className="relative w-full max-w-full"
            >
              <CarouselContent className="hide-scrollbar w-full max-w-full">
                {/* {items.map((item) => ( */}
                {dummyArticles.map((item) => (
                  // <CarouselItem key={item.id} className="ml-2 md:max-w-[452px]">
                  <CarouselItem className="ml-2 md:max-w-[452px]">
                    <BlogCard
                      href={item.url}
                      title={item.title}
                      description={item.summary}
                      date={item.date}
                      readTime={item.readTime}
                      image={item.coverImage}
                      articleType={item.articleType ? item.articleType : 'Article'}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
