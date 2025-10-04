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

export default function ArticleGallery({ mainArticleSlug }: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(mainArticleSlug, 4);

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
      <div className="py-4">
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
              {relatedArticles.map((item) => (
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
    </>
  );
}
