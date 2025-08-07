import privueLogo from "/privue-logo.png";
import { Mail } from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
// import { IoIosMail } from "react-icons/io";
import { useEffect, useRef } from "react";

interface MenuItem {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface FooterProps {
    logo?: {
        url: string;
        src: any;
        alt: string;
        title: string;
    };
    tagline?: string;
    address?: string[];
    menuItems?: MenuItem[];
    copyright?: string;
    bottomLinks?: {
        text: string;
        url?: string;
    }[];
}

export default function Footer({
    logo = {
        src: privueLogo,
        alt: "logo for privue",
        title: "privue",
        url: "https://www.privue.ai",
    },
    tagline = "Empowering Businesses via Intelligent Data",
    address = ["WeWork Blue One Square,", "Sector 18, Gurugram - 122016, Haryana"],
    menuItems = [
        {
            title: "Product",
            links: [
                { text: "Overview", url: "#" },
                { text: "Demo", url: "#" },
                { text: "API", url: "#" },
                { text: "Features", url: "#" },
                { text: "Integrations", url: "#" },
                { text: "Pricing", url: "#" },
            ],
        },
        {
            title: "Modules",
            links: [
                { text: "Financial Statement", url: "#" },
                { text: "Credit Models", url: "#" },
                { text: "Cyber Risk", url: "#" },
                { text: "Carbon Estimation", url: "#" },
                { text: "ESG", url: "#" },
                { text: "Climate Risk", url: "#" },
            ],
        },
        {
            title: "Company",
            links: [
                { text: "Case Studies", url: "#" },
                { text: "Client Stories", url: "#" },
                { text: "About", url: "#" },
                { text: "Policies", url: "/policies" },
                { text: "Contact", url: "#" },
            ],
        },
    ],
    copyright = "© Nexvue Technologies Private Limited 2025 All rights reserved",
    bottomLinks = [{ text: "query@privue.ai", url: "#" }],
}: FooterProps) {

    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const remaining = documentHeight - (scrollTop + viewportHeight);


            if (footerRef.current) {
                const translateY = remaining > 0 ? remaining / 2 : 0;
                // const translateY = remaining > 30 ? remaining / 2 : 0;
                footerRef.current.style.transform = `translateY(${translateY}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={footerRef}
            className="fixed bottom-0 left-0 right-0 z-0 border-t border-gray-200 w-full mx-auto px-4 sm:px-6 lg:px-36 py-8 text-sm font-open-sans bg-background text-muted-foreground max-w-[1536px]">
            <footer className="flex flex-col gap-16 lg:flex-row lg:justify-between">
                {/* Left Section */}
                <div className="flex-1 max-w-md">
                    <a href={logo.url} className="flex items-center mb-2">
                        <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
                        <span className="text-lg font-medium text-gray-900">{logo.title}</span>
                    </a>
                    <p className="mb-3 text-gray-800">{tagline}</p>
                    {address.map((line, idx) => (
                        <p key={idx} className="text-sm text-foreground-lighter">{line}</p>
                    ))}

                    <div className="mt-4 flex gap-2 items-center">
                        <a href="https://www.linkedin.com/company/privue/posts/?feedView=all"><FaLinkedin className="text-[#707070] text-lg hover:text-[#525252]" /></a>
                        <a href="https://www.linkedin.com/company/privue/posts/?feedView=all"><Mail size="20" className="text-[#707070] hover:text-[#525252]" /></a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-[2] grid grid-cols-2 md:grid-cols-[repeat(3,minmax(0,1fr))] gap-8 max-w-max">
                    {menuItems.map((section, idx) => (
                        <div key={idx} className="">
                            <h4 className="mb-2 text-gray-800 font-semibold text-sm">{section.title}</h4>
                            <ul className="space-y-2 max-w-max">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <a
                                            href={link.url}
                                            className="text-foreground-lighter hover:text-foreground text-sm font-normal transition-colors"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </footer>

            {/* Bottom Section */}
            <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
                <p>{copyright}</p>
                <ul className="flex gap-4 underline underline-offset-4">
                    {bottomLinks.map((link, idx) => (
                        <li key={idx}>
                            <a href={link.url}>{link.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
