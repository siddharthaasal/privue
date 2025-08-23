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
                "relative h-64 md:h-96 overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm hover:shadow-md",
                // sizing behavior per row
                "md:col-span-4 md:[transition:all_.35s_ease]",
                // row-level shrink, card-level grow
                "group/card md:group-hover/row:col-span-3 md:hover:col-span-6",
                // last in row grows left
                isLastInRow ? "md:hover:col-start-7" : "",
            ].join(" ")}
        >
            <a href="/solution">
                <div className="absolute inset-0 flex h-full w-full">
                    {/* LEFT IMAGE */}
                    <div className="relative flex-shrink-0 w-full md:w-full group-hover/card:w-1/2 transition-[width] duration-300 ease-out">
                        <img
                            src={item.img}
                            alt=""
                            className="
        h-full w-full object-cover
        grayscale                      /* default: gray */
        md:group-hover/row:grayscale-25   /* row in hover state: keep others gray */
        md:group-hover/card:!grayscale-0 /* THIS card hovered: un-gray (wins) */
      "
                        />
                        <div className="absolute inset-0">
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <h3 className="text-base font-semibold text-white md:text-lg">{item.heading}</h3>
                                <p className="text-sm  text-white/90">{item.sub}</p>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT DETAILS */}
                    <div className="hidden md:flex w-0 group-hover/card:w-1/2 transition-[width] duration-300 ease-out">
                        <section className="relative w-full h-full">
                            {/* background fade + subtle divider */}
                            <div className="absolute inset-0 " />

                            <div className="relative flex h-full flex-col justify-between p-6 text-neutral-900">
                                {/* Header */}

                                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
                                    Highlights
                                </div>


                                {/* Bullets */}
                                <ul className="mt-3 space-y-2 list-none">
                                    {item.details.map((d: string, i: number) => (
                                        <li
                                            key={i}
                                            className="relative pl-6 text-sm leading-relaxed"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="absolute left-0 top-1 h-4 w-4 text-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            {d}
                                        </li>
                                    ))}
                                </ul>



                                {/* CTAs */}
                                <div className="mt-5 flex items-center gap-3">
                                    {/* <button
                                        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800"
                                    >
                                        Learn more
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                            <path d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button> */}
                                    <a
                                        href="#"
                                        className="text-xs font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-800"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>



                </div>
            </a>
        </article>
    );
}