// import React from "react";
import { CardStack } from '@/components/ui/card-stack';

/**
 * Animated Carousel Mockup — simplified to render the CardStack
 * This file now wraps your existing CardStack component so you can
 * pass the same `images` array (ImageItem[]) and have them rendered
 * as stacked cards with image + status.
 *
 * Usage:
 * <HighlightCarousel images={[{src: '/img/a.png', title: 'Form', caption: 'Step 1'}, ...]} />
 */

type Highlight = { x: number; y: number; w: number; h: number } | null;

type ImageItem = {
  src: string;
  title?: string;
  caption?: string;
  highlight?: Highlight;
  status?: string; // optional per-image status override
};

export default function HighlightCarousel({
  images = [],
  offset = 12,
  scaleFactor = 0.06,
}: {
  images: ImageItem[];
  offset?: number;
  scaleFactor?: number;
}) {
  // map incoming images to the CardStack `items` shape
  const items = images.map((img, i) => ({
    id: i,
    name: img.title ?? `Slide ${i + 1}`,
    designation: img.caption ?? '',
    content: null,
    image: img.src,
    status: img.status ?? (i === 0 ? 'Draft' : i === 1 ? 'Uploading' : 'Verified'),
  }));

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      hi
      <CardStack items={items} offset={offset} scaleFactor={scaleFactor} />
    </div>
  );
}
