interface ArticleReferenceCardProps {
  href: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
}

import { Button } from '../ui/button';

export default function ArticleReferenceCard({
  href,
  title,
  date,
  readTime,
  tag,
  image,
}: ArticleReferenceCardProps) {
  return (
    <div className="flex items-stretch gap-6">
      {/* Left image */}
      <div className="relative h-36 w-36 flex-shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title + ' thumbnail'}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right content */}
      <div className="flex flex-col py-1">
        <div>
          <div className="flex items-center gap-4">
            <p className="text-xs font-medium text-[#4a4a8a]">{date}</p>

            <p className="text-xs font-medium text-[#4a4a8a]">{readTime}</p>
          </div>
          <a href={href} className="mt-2 block">
            <h3 className="text-foreground hover:text-privue-800 text-lg leading-snug font-medium hover:underline">
              {title}
            </h3>
          </a>
        </div>

        <Button variant="outline" size="sm" className="mt-4 w-fit">
          {tag}
        </Button>
      </div>
    </div>
  );
}
