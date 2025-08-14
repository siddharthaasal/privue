interface ArticleReferenceCardProps {
    href: string;
    title: string;
    date: string;
    readTime: string;
    tag: string;
    image: string;
}

import { Button } from "../ui/button";

export default function ArticleReferenceCard({
    href,
    title,
    date,
    readTime,
    tag,
    image
}: ArticleReferenceCardProps) {
    return (
        <div className="flex gap-6 items-stretch">
            {/* Left image */}
            <div className="relative w-36 h-36 overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={title + " thumbnail"}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right content */}
            <div className="flex flex-col py-1">
                <div>
                    <div className="flex gap-4 items-center">
                        <p className="text-xs font-medium  text-[#4a4a8a]">
                            {date}
                        </p>

                        <p className="text-xs font-medium text-[#4a4a8a]">{readTime}</p>
                    </div>
                    <a href={href} className="block mt-2">
                        <h3 className="text-lg font-medium leading-snug text-foreground hover:text-privue-800 hover:underline">
                            {title}
                        </h3>
                    </a>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-fit mt-4"
                >
                    {tag}
                </Button>
            </div>
        </div>
    );
}
