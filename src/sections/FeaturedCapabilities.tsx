import { motion } from 'framer-motion'

export default function FeaturedCapabilities() {

    const coreCapabilities = [
        {
            "icon": "/solutions/lock.svg",
            "heading": "AI-Powered Intelligence",
            "desc": "Transform raw data into strategic insights that drive smarter business decisions.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Predictive Risk Management",
            "desc": "Anticipate and mitigate financial, operational, and compliance risks before they impact your business.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Intelligent Data Integration",
            "desc": "Unify disparate data sources into a single, enriched view of your business landscape.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Strategic Decision Intelligence",
            "desc": "Empower leadership with AI-backed recommendations for critical business choices.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Industry-Focused AI Solutions",
            "desc": "Purpose-built applications for BFSI, enterprise, consulting, and legal sectors.",
        },
        {
            "icon": "/solutions/lock.svg",
            "heading": "Enterprise-Grade AI",
            "desc": "Platform Scalable, secure, and cloud-native infrastructure designed for mission-critical operations.",
        },
    ]

    return (
        <section className="font-open-sans relative mx-auto ">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mx-auto text-center py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Core{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Capabilities
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Harness AI to streamline decisions, manage risk, and unlock growth opportunities.
                    </p>
                </div>


                <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {coreCapabilities.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                        >
                            <CapabilitiesCardLP2 icon={c.icon} heading={c.heading} desc={c.desc} />
                        </motion.div>
                    ))}
                </div>


                {/* <div className="mx-auto text-center mt-24 py-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
                        Core{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                            Capabilities
                        </span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg mt-2 mb-4">
                        Scalable solutions to optimize decisions, reduce risk, and drive growth.
                    </p>
                </div>

                <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                    {coreCapabilities.map((c, i) => {
                        return (
                            <CapabilitiesCardLP
                                key={i}
                                heading={c.heading}
                                desc={c.desc}
                                icon={c.icon}
                            />
                        )
                    })}

                </div> */}
            </div>
        </section>
    );
}

interface CapabilitiesCardProps {
    icon: string; // path to the icon
    heading?: string;
    desc: string;
}

// function CapabilitiesCardLP({ icon, heading, desc }: CapabilitiesCardProps) {
//     return (
//         <div
//             className="flex flex-col items-start gap-6 p-6 text-left rounded-2xl border border-gray-100 
//                  bg-white/80 backdrop-blur-sm shadow-sm 
//                  hover:shadow-lg hover:-translate-y-1 
//                  transition-all duration-300"
//         >
//             {/* Icon */}
//             <div className="p-3">
//                 <img src={icon} alt="" className="w-7 h-7" />
//             </div>

//             {/* Text */}
//             <div>
//                 {heading && <p className="font-semibold text-lg text-gray-900">{heading}</p>}
//                 <p className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</p>
//             </div>
//         </div>
//     )
// }


function CapabilitiesCardLP2({ icon, heading, desc }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-6 px-4 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-9 h-9" />

            {/* Text */}
            <div className="">
                {heading && <p className="font-medium text-base tracking-normal">{heading}</p>}
                {<p className="font-normal text-base tracking-normal">{desc}</p>}
            </div>
        </div>
    );
}
