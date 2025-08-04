interface BlogCardProps {
    href: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
}


export function BlogCard({
    href,
    title,
    description,
    date,
    readTime,
    image,
}: BlogCardProps) {
    return (
        <div className="w-full h-full">
            <a
                href={href}
                className="group inline-block min-w-full h-full p-4 border border-transparent transition-all  hover:bg-gray-100 rounded-xl"
            >
                <div className="flex flex-col space-y-5">
                    {/* Thumbnail */}
                    <div className="relative mb-3 w-full aspect-[2/1] lg:aspect-[5/3] overflow-hidden rounded-lg border shadow-sm">
                        <img
                            src={image}
                            alt={title + ' thumbnail'}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover scale-100"
                        />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col space-x-1.5 text-sm text-gray-500">

                        <div className='flex flex-row items-center justify-between px-1 gap-1 space-x-1.5 text-xs'>
                            <div className="flex items-center gap-0.5">
                                {/* <CalendarDays size={12} color="#707070" /> */}
                                <p><span className="font-normal text-[#525252]">{date}</span></p>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {/* <Clock size={12} color="#707070" /> */}
                                <p className="font-normal text-[#525252]">{readTime} read</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Title */}
                        <h3 className="text-lg font-normal text-[#171717] max-w-sm mb-2">
                            {title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#525252] max-w-sm line-clamp-3">
                            {description}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}
