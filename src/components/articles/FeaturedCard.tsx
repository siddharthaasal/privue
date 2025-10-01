interface FeaturedCardProps {
  title: string;
  description: string;
  url: string;
  coverImage: string;
  variant?: 'lg' | 'sm';
}

export default function FeaturedCard({
  title,
  description,
  url,
  coverImage,
  variant,
}: FeaturedCardProps) {
  const isLarge = variant === 'lg';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group relative block w-full">
      <div className="font-open-sans bg-background relative h-[350px] w-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 p-6 text-left shadow-xs transition-shadow hover:border-gray-300 hover:shadow-md">
        <div className="relative flex h-full w-full flex-col justify-between">
          <div>
            <p className="text-base font-medium text-gray-800">{title}</p>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>
          <img
            src={coverImage}
            alt={title}
            // onError={(e) => {
            //     (e.currentTarget as HTMLImageElement).src = "/fallback.png";
            // }}
            className={`mt-4 object-contain transition-transform duration-300 ease-in-out ${
              isLarge ? 'scale-125' : 'scale-90'
            } max-h-40`}
          />
        </div>
      </div>
    </a>
  );
}
