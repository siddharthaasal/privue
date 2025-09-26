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
        url: "https://privue-sage.vercel.app/",
    },
    address = ["alt.f, JMD Empire Square,", "Mehrauli-Gurgaon Road,", "Gurugram, Haryana 122001"],
    menuItems = [
        {
            title: "Modules",
            links: [
                { text: "Financial Statement", url: "#" },
                { text: "Credit Models", url: "#" },
                { text: "Cyber Risk", url: "#" },
                { text: "Carbon Estimation", url: "#" },
                { text: "ESG", url: "#" },
                { text: "Climate Risk", url: "#" },
                { text: "Financial Statement", url: "#" },
                { text: "Credit Models", url: "#" },
                { text: "Cyber Risk", url: "#" },
                { text: "Carbon Estimation", url: "#" },
                { text: "ESG", url: "#" },
                { text: "Climate Risk", url: "#" },
            ],
        },
        {
            title: "Solutions",
            links: [
                { text: "Distributor Management", url: "/solutions/distributor-performance-management" },
                { text: "Sustainability Assessment", url: "/solutions/sustainability-assessment" },
                { text: "Insurance Underwriting", url: "/solutions/commercial-insurance-underwriting" },
                { text: "Large Customer Risk Assessment", url: "/solutions/large-customer-risk-assessment" },
                { text: "Entity Due Diligence", url: "/solutions/entity-due-diligence" },
                { text: "Third Party Risk Management", url: "/solutions/third-party-risk-management" },

            ],
        },

        {
            title: "Company",
            links: [
                { text: "Data Security", url: "/data-security" },
                { text: "Cookie Policy", url: "/cookie-policy" },
                { text: "California Notice", url: "/california-notice" },
                { text: "Terms of Use", url: "/terms" },
                { text: "Privacy Policy", url: "/privacy-policy" },
                { text: "Contact", url: "/contact" },
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
            className="fixed bottom-0 left-0 right-0 z-0 border-t border-gray-200 w-full mx-auto max-w-[1150px] py-8 text-sm  bg-background text-muted-foreground">
            <footer className="flex flex-col gap-16 lg:flex-row lg:justify-between">
                {/* Left Section */}
                <div className="flex-1 max-w-md">
                    <a href={logo.url} className="flex items-center mb-2">
                        <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
                        <span className="text-lg font-medium text-foreground">{logo.title}</span>
                    </a>
                    {/* <p className="mb-3 text-base text-foreground">{tagline}</p> */}
                    <div className="pl-1">
                        {address.map((line, idx) => (
                            <p key={idx} className="text-sm text-foreground-lighter">{line}</p>
                        ))}

                        <div className="mt-3 flex gap-2 items-center">
                            <a href="https://www.linkedin.com/company/privue/posts/?feedView=all"><FaLinkedin className="text-[#707070] text-lg hover:text-[#525252]" /></a>
                            <a
                                href="mailto:query@privue.ai"
                                aria-label="Send us an email"
                            >
                                <Mail size={20} className="text-[#707070] hover:text-[#525252]" />
                            </a>                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                    {menuItems.map((section, idx) => (
                        <div key={idx} className="max-w-[200px]">
                            <h4 className="mb-2 text-foreground font-medium text-sm">{section.title}</h4>
                            <ul className="space-y-2">
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
                            <a
                                href="mailto:query@privue.ai"
                                aria-label="Send us an email"
                            >
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};