import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { BlogCard } from "./articles/ArticleCard";

interface BlogCardProps {
  href: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
}

const blogs: BlogCardProps[] = [
  {
    href: "/article",
    title: "Computer Vision Technology",
    description:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    date: "Jul 24, 2025",
    readTime: "4 min",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    href: "/article",
    title: "Computer Vision Technology",
    description:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    date: "Jul 24, 2025",
    readTime: "4 min",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    href: "/article",
    title: "Computer Vision Technology",
    description:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    date: "Jul 24, 2025",
    readTime: "4 min",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    href: "/article",
    title: "Computer Vision Technology",
    description:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    date: "Jul 24, 2025",
    readTime: "4 min",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    href: "/article",
    title: "Computer Vision Technology",
    description:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    date: "Jul 24, 2025",
    readTime: "4 min",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
]
interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery = ({
  // heading = "Gallery",
  // demoUrl = "https://www.shadcnblocks.com",
  // items = [
  //   {
  //     id: "item-1",
  //     title: "Build Modern UIs",
  //     summary:
  //       "Create stunning user interfaces with our comprehensive design system.",
  //     url: "/article",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  //   },
  //   {
  //     id: "item-2",
  //     title: "Computer Vision Technology",
  //     summary:
  //       "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
  //     url: "/article",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  //   },
  //   {
  //     id: "item-3",
  //     title: "Machine Learning Automation",
  //     summary:
  //       "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
  //     url: "/article",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  //   },
  //   {
  //     id: "item-4",
  //     title: "Predictive Analytics",
  //     summary:
  //       "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
  //     url: "/article",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  //   },
  //   {
  //     id: "item-5",
  //     title: "Neural Network Architecture",
  //     summary:
  //       "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
  //     url: "/article",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  //   },
  // ],~
}: Gallery6Props) => {
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
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-0">
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
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full">
            {/* {items.map((item) => ( */}
            {blogs.map((item) => (
              // <CarouselItem key={item.id} className="ml-2 md:max-w-[452px]">
              <CarouselItem className="ml-2 md:max-w-[452px]">
                <BlogCard
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  readTime={item.readTime}
                  image={item.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery };
