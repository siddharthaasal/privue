import { Badge } from '../ui/badge';

interface BlogCardProps {
  href: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  articleType: string;
}

export function BlogCard({
  href,
  title,
  description,
  date,
  readTime,
  image,
  articleType = 'Case Study',
}: BlogCardProps) {
  return (
    <div className="h-full w-full">
      <a
        href={href}
        className="group inline-block h-full min-w-full rounded-xl border border-transparent p-3 transition-all hover:bg-gray-100 md:p-4"
      >
        <div className="flex flex-col space-y-5">
          {/* Thumbnail */}
          <div className="relative mb-3 aspect-[3/2] w-full overflow-hidden rounded-lg border shadow-sm md:aspect-[2/1] lg:aspect-[5/3]">
            <img
              src={image}
              alt={title + ' thumbnail'}
              // loading="lazy"
              className="absolute inset-0 h-full w-full scale-100 object-cover"
            />

            {articleType && (
              <Badge className="absolute top-2 right-2 rounded-lg bg-black/40 px-2 py-0.5 text-[11px] font-normal text-white shadow-sm backdrop-blur-xs md:px-2 md:py-1 md:text-xs">
                {articleType}
              </Badge>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-col space-x-1.5 text-sm text-gray-500">
            <div className="flex flex-row items-center justify-between gap-1 space-x-1.5 px-1 text-xs">
              <div className="flex items-center gap-0.5">
                <p>
                  <span className="font-normal text-[#525252]">{date}</span>
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <p className="font-normal text-[#525252]">{readTime} read</p>
              </div>
            </div>
          </div>

          <div>
            {/* Title */}
            <h3 className="mb-2 max-w-full text-base font-normal text-[#171717] md:max-w-sm md:text-lg">
              {title}
            </h3>

            {/* Description */}
            <p className="line-clamp-3 max-w-full text-sm text-[#525252] md:max-w-sm">
              {description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
