interface FeaturedCardProps {
    title: string;
    description: string;
    url: string;
    coverImage: string;
    variant?: "lg" | "sm";
}

export default function FeaturedCard({ title, description, url, coverImage, variant }: FeaturedCardProps) {
    const isLarge = variant === "lg";

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="relative group block w-full ">

            <div
                className="font-open-sans w-full h-[350px] cursor-pointer bg-white rounded-xl shadow-xs border border-gray-200 p-6 text-left relative overflow-hidden hover:border-gray-300 hover:shadow-md transition-shadow"
            >
                <div className="relative flex flex-col justify-between h-full w-full bg-white dark:bg-black">
                    <div>
                        <p className="text-base text-gray-800 font-medium">{title}</p>
                        <p className="text-sm text-gray-500 mt-2">{description}</p>
                    </div>
                    <img
                        src={coverImage}
                        alt={title}
                        // onError={(e) => {
                        //     (e.currentTarget as HTMLImageElement).src = "/fallback.png";
                        // }}
                        className={`object-contain mt-4 transition-transform duration-300 ease-in-out ${isLarge ? "scale-125" : "scale-90"
                            } max-h-40`}
                    />
                </div>
            </div>
        </a>
    );
}
