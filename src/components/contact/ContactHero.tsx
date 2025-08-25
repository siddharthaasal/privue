type Founder = {
    name: string;
    role: string;
    image: string;
}

const founders: Founder[] = [
    {
        name: "Saurabh Verma",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    },
    {
        name: "Snehil Vijay",
        role: "Co-Founder",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    }
]

export default function ContactHero() {
    return (
        <>
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-xl font-normal tracking-tight text-neutral-900 md:text-2xl">
                        Hit a roadblock? Let's talk.
                    </h1>

                    <p className="mt-4 max-w-xl text-neutral-600 md:text-base tracking-wide">
                        Tried Privue locally and have questions, feedback, or ran into something tricky?
                        We’re the founders, and we’d love to hear from you. Whether you’re evaluating for production,
                        want help with setup, or just want to chat about your use case.
                        Connect with us in a call or write to us at{" "}
                        <a
                            href="mailto:query@privue.ai"
                            className="text-privue-700 hover:text-privue-800 hover:underline"
                        >
                            query@privue.ai
                        </a>.
                    </p>

                    <div className="py-12 container flex flex-wrap gap-8">
                        {founders.map((founder) => (
                            <div key={founder.name} className="flex items-center space-x-2">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    width={34}
                                    height={34}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-normal text-sm text-foreground leading-tight">{founder.name}</p>
                                    <p className="text-xs text-foreground-lighter">{founder.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    )
}