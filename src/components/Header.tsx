import { useState, useEffect } from "react";
import privueLogo from "/privue-logo.png";
import { Button } from "@/components/ui/button";

type linkType = {
    name: string;
    href: string;
    variant: "link" | "outline" | "default" | "ghost";
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const desktopLinks: linkType[] = [
        { name: "Modules", href: "/modules", variant: "link" },
        { name: "Solutions", href: "/solution", variant: "link" },
        { name: "API", href: "/api", variant: "link" },
        { name: "Integrations", href: "/integrations", variant: "link" }
    ];
    const mobileLinks: linkType[] = [
        { name: "Modules", href: "/modules", variant: "link" },
        { name: "Solutions", href: "/solutions", variant: "link" },
        { name: "API", href: "/api", variant: "link" },
        { name: "Integrations", href: "/integrations", variant: "link" },
        { name: "Demo", href: "/demo", variant: "outline" },
        { name: "Book a Call", href: "/book-a-call", variant: "default" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //  lock background scroll when the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    }, [isMenuOpen]);


    return (
        <header className="font-open-sans fixed top-0 inset-x-0 z-50 ">
            <div className="relative w-100% py-1">
                {/* Blur layer */}
                {/* <div className={`absolute inset-0 pointer-events-none ${isScrolled ? "border-b border-[#2e2e2e] backdrop-blur-md bg-[#3d3c3c] transition-all duration-300 shadow-md" : "backdrop-blur-sm border border-b-[0.5] border-[#2e2e2e] bg-[#3d3c3c] " */}
                <div className={`absolute inset-0 pointer-events-none border border-l-0 border-r-0 border-b-[0.5] ${isScrolled ? "backdrop-blur-md bg-background transition-all duration-300 shadow-md" : "backdrop-blur-sm bg-background "
                    }`} />

                {/* Actual navbar content */}
                <nav className="relative mx-auto flex items-center justify-between py-0 px-4 max-w-[1200px]"
                    aria-label="Global"
                >
                    {/* Logo */}
                    <div className="flex flex-1">
                        <a href="/" className="flex items-center">
                            <img
                                src={privueLogo}
                                alt="Privue Logo"
                                className="h-12 w-auto"
                                loading="eager"
                            />
                            <span className="text-[20px] -mt-1 font-semibold text-foreground">
                                privue
                            </span>
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-privue-700 hover:bg-privue-100 focus:outline-none"                    >
                            <span className="sr-only">Toggle menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* mobile menu */}
                    {isMenuOpen && (
                        <div className="absolute flex flex-col space-y-3 top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg border-t border-privue-200 py-4 px-6 z-40">
                            {mobileLinks.map((link, idx) => (
                                <Button asChild key={idx} variant={link.variant} className="font-semibold text-md">
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Desktop links */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-2 justify-center items-center">
                        {desktopLinks.map((link, idx) => (<Button asChild key={idx} variant={link.variant} className="font-medium text-sm text-foreground hover:text-privue-600">
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        </Button>)
                        )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex gap-2 flex-1 justify-end">
                        <a href="/login">
                            <Button variant="outline" size="sm" className="cursor-pointer dark:text-[#FAFAFA] text-[#121212]">
                                <p>Demo</p>
                            </Button>
                        </a>
                        <a href="/book">
                            <Button variant="default" size="sm" className="cursor-pointer text-[#FAFAFA]"> <p>Book a Call</p>
                            </Button>
                        </a>
                    </div>

                </nav>
            </div>
        </header>
    );
}
