// Types
type Item = {
    id: number;
    img: string;
    heading: string;
    sub: string;
    details: string[];
};


type ExpandingCardProps = {
    item: Item;
    isLastInRow: boolean;
};

export default function ExpandingCard({ item, isLastInRow }: ExpandingCardProps) {
    return (
        <article
            className={[
                // card chrome
                "relative h-64 md:h-80 overflow-hidden rounded-xl border border-black/10 bg-neutral-100 shadow-sm hover:shadow-md",
                // sizing behavior per row
                "md:col-span-4 md:[transition:all_.35s_ease]",
                // row-level shrink, card-level grow
                "group/card md:group-hover/row:col-span-3 md:hover:col-span-6",
                // last in row grows left
                isLastInRow ? "md:hover:col-start-7" : "",
            ].join(" ")}
        >
            <div className="absolute inset-0 flex h-full w-full">
                {/* LEFT IMAGE */}
                <div className="relative flex-shrink-0 w-full md:w-full group-hover/card:w-1/2 transition-[width] duration-300 ease-out">
                    <img
                        src={item.img}
                        alt=""
                        className="h-full w-full object-cover grayscale md:group-hover/row:grayscale md:hover:grayscale-0"
                    />
                    <div className="absolute inset-0">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <h3 className="text-base font-semibold text-white md:text-lg">{item.heading}</h3>
                            <p className="text-sm text-white/80 md:text-[0.925rem]">{item.sub}</p>
                        </div>
                    </div>
                </div>
                {/* RIGHT DETAILS */}
                <div className="hidden md:flex flex-col justify-end gap-2 w-0 group-hover/card:w-1/2 transition-[width] duration-300 ease-out bg-neutral-900/55 backdrop-blur-sm p-4 text-white">
                    <div className="mb-2 h-px w-12 bg-white/40" />
                    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        {item.details.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
}