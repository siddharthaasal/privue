"use client";

import React, { useEffect, useRef, useState } from "react";
import privueLogo from "/privue-logo.png";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions/solutions.ts";

import { AiOutlineApi } from "react-icons/ai";
import { IoMdGitNetwork } from "react-icons/io";

type LinkType = {
    name: string;
    href?: string;
    variant?: "link" | "outline" | "default" | "ghost";
    items?: { name: string; href: string; description?: string; icon?: React.ReactNode }[];
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const solutionMenuItems = solutions.map((s) => {
        const IconComp = s.icon as React.ComponentType<any> | undefined;

        const icon = IconComp ? (
            <IconComp className="w-5 h-5 text-gray-700" aria-hidden />
        ) : null;

        return {
            name: s.heading,
            href: `/solutions/${s.slug}`,
            description: s.subHeading ?? s.mainSolnDesc ?? undefined,
            icon
        };
    });

    const products = [
        {
            name: "API",
            href: "#",
            description: "lorem ipsum",
            icon: AiOutlineApi
        },
        {
            name: "Workbench",
            href: "#",
            description: "lorem ipsum",
            icon: IoMdGitNetwork
        },
    ]

    const industries = [
        {
            id: "ind-1",
            name: "Corporation",
            href: "#",
            icon: AiOutlineApi
        },
        {
            id: "ind-2",
            name: "Insurance",
            href: "#",
            icon: AiOutlineApi
        },
        {
            id: "ind-3",
            name: "Banking",
            href: "#",
            icon: AiOutlineApi
        },
        {
            id: "ind-4",
            name: "Asset Management",
            href: "#",
            icon: AiOutlineApi
        },
        {
            id: "ind-5",
            name: "Consulting",
            href: "#",
            icon: AiOutlineApi
        },
        {
            id: "ind-6",
            name: "Government",
            href: "#",
            icon: AiOutlineApi
        },
    ]
    const productMenuItems = products.map((s) => {
        // s.icon is a React.ComponentType<any> (a component reference).
        const IconComp = s.icon as React.ComponentType<any> | undefined;

        const icon = IconComp ? (
            <IconComp className="w-5 h-5 text-gray-700" aria-hidden />
        ) : null;

        return {
            name: s.name,
            href: s.href,
            description: s.description,
            icon
        };
    });
    const industryMenuItems = industries.map((s, idx) => {
        const IconComp = s.icon as React.ComponentType<any> | undefined;

        const icon = IconComp ? (
            <IconComp className="w-5 h-5 text-gray-700" aria-hidden />
        ) : null;

        return {
            id: s.id ?? `ind-${idx + 1}`,
            name: s.name,
            href: `#industry-${s.id}`,
            icon
        };
    });

    const desktopLinks: LinkType[] = [
        {
            name: "Solutions",
            items: solutionMenuItems,
        },
        {
            name: "Product",
            items: productMenuItems,
        },
        {
            name: "Industries",
            items: industryMenuItems,
        },
        { name: "Articles", href: "/articles", variant: "link" },
    ];

    const mobileLinks: LinkType[] = [
        { name: "Modules", href: "/modules", variant: "link" },
        { name: "Solutions", href: "/solutions", variant: "link" },
        { name: "API", href: "/api", variant: "link" },
        { name: "Integrations", href: "/integrations", variant: "link" },
        { name: "Demo", href: "/demo", variant: "outline" },
        { name: "Book a Demo", href: "/book-a-call", variant: "default" }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
    }, [isMenuOpen]);

    // click-away close dropdowns
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!navRef.current) return;
            if (!navRef.current.contains(e.target as Node)) {
                setOpenIndex(null);
            }
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    // small hover delay helpers to prevent flicker
    const openMenu = (index: number) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpenIndex(index);
    };
    const closeMenu = (delay = 150) => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setOpenIndex(null), delay);
    };

    // change this if your landing page is not at '/'
    const BASE_PATH = '/';

    const handleIndustryClick = (industryId: string) => {
        const targetHash = `#industry-${industryId}`;

        // If already on base path (landing page) -> smooth scroll + dispatch event
        if (window.location.pathname === BASE_PATH) {
            try {
                // update URL without jumping
                history.pushState(null, '', targetHash);
            } catch {
                location.hash = targetHash.replace('#', '');
            }

            const sec = document.getElementById('industries-section');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // notify IndustryModules on the same page
            window.dispatchEvent(new CustomEvent('openIndustry', { detail: { id: industryId } }));

            // close menus (your local state)
            setOpenIndex(null);
            return;
        }

        // Otherwise: navigate to landing page and include the hash.
        // This lets IndustryModules read location.hash on mount and open the right accordion.
        // Use origin + base path to make this absolute and robust.
        const origin = window.location.origin;
        const normalizedBase = BASE_PATH.startsWith('/') ? BASE_PATH : `/${BASE_PATH}`;
        // ensure no double slash at end
        const baseNoTrailing = normalizedBase.endsWith('/') && normalizedBase !== '/' ? normalizedBase.slice(0, -1) : normalizedBase;

        // set href to landing page + hash. Using replace() avoids creating extra history entries
        // if you prefer user to go back, use window.location.href = ...
        window.location.href = `${origin}${baseNoTrailing}${targetHash}`;
    };



    return (
        <header className="font-open-sans fixed top-0 inset-x-0 z-50 ">
            <div className="relative w-100% py-1">
                {/* Blur layer / border on scroll */}
                <div
                    className={`absolute inset-0 pointer-events-none border border-l-0 border-r-0 border-b-[0.5] ${isScrolled ? "backdrop-blur-md bg-background transition-all duration-300 shadow-md" : "backdrop-blur-sm bg-background"
                        }`}
                />

                {/* Actual navbar content */}
                <nav
                    ref={navRef}
                    className="relative mx-auto flex items-center justify-between py-0 px-4 max-w-[1200px]"
                    aria-label="Global"
                >
                    {/* Logo (left) */}
                    <div className="flex flex-1">
                        <a href="/" className="flex items-center">
                            <img src={privueLogo} alt="Privue Logo" className="h-12 w-auto" loading="eager" />
                            <span className="text-[20px] -mt-1 font-semibold text-foreground ml-0">privue</span>
                        </a>
                    </div>

                    {/* Mobile toggle (keeps same spot) */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-privue-700 hover:bg-privue-100 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* mobile menu */}
                    {isMenuOpen && (
                        <div className="absolute flex flex-col space-y-3 top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg border-t border-privue-200 py-4 px-6 z-40">
                            {mobileLinks.map((link, idx) => (
                                <Button asChild key={idx} variant={link.variant || "link"} className="font-semibold text-md">
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Desktop links (centered nav) */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-2 justify-center items-center flex-1">
                        <ul className="flex items-center gap-1">
                            {desktopLinks.map((link, idx) => {
                                const hasChildren = Array.isArray(link.items) && link.items.length > 0;
                                return (
                                    <li
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => hasChildren && openMenu(idx)}
                                        onMouseLeave={() => hasChildren && closeMenu()}
                                    >
                                        {hasChildren ? (
                                            <button
                                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                                aria-expanded={openIndex === idx}
                                                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium bg-transparent hover:bg-muted hover:text-accent-foreground transition-colors"
                                            >
                                                {link.name}
                                                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <Button asChild variant={link.variant || "link"} className="font-medium text-sm text-foreground hover:text-privue-600">
                                                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                            </Button>
                                        )}

                                        {/* Dropdown panel */}
                                        {hasChildren && openIndex === idx && (
                                            <div
                                                onMouseEnter={() => openMenu(idx)}
                                                onMouseLeave={() => closeMenu()}
                                                className="absolute left-0 mt-2 w-max min-w-max bg-popover text-popover-foreground rounded-md shadow-lg border border-foreground/5 z-50"
                                            >
                                                <div className="p-2">
                                                    {link.items!.map((sub) => {
                                                        const isIndustryLink = link.name === 'Industries' && (sub as any).id;
                                                        // default href fallback (keeps behavior for non-industry lists)
                                                        const defaultHref = sub.href ?? '#';

                                                        return isIndustryLink ? (
                                                            <button
                                                                key={(sub as any).id}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleIndustryClick((sub as any).id);
                                                                }}
                                                                className="w-full text-left flex items-start gap-3 p-3 rounded-md hover:bg-muted no-underline bg-transparent border-0"
                                                                // a11y
                                                                aria-label={`Open ${sub.name} industry`}
                                                            >
                                                                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-foreground">
                                                                    {sub.icon}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-sm font-semibold">{sub.name}</div>
                                                                    {sub.description && <p className="text-sm text-muted-foreground leading-snug truncate">{sub.description}</p>}
                                                                </div>
                                                            </button>
                                                        ) : (
                                                            // existing default anchor (unchanged for other menus)
                                                            <a key={sub.name} href={defaultHref} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted no-underline">
                                                                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-foreground">
                                                                    {sub.icon}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-sm font-semibold">{sub.name}</div>
                                                                    {sub.description && <p className="text-sm text-muted-foreground leading-snug truncate">{sub.description}</p>}
                                                                </div>
                                                            </a>
                                                        );
                                                    })}

                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* CTA Buttons (right) */}
                    <div className="hidden lg:flex gap-2 flex-1 justify-end">
                        {/* <a href="/login">
                            <Button variant="outline" size="sm" className="cursor-pointer dark:text-[#FAFAFA] text-[#121212]">
                                <p>Demo</p>
                            </Button>
                        </a> */}
                        <a href="/contact">
                            <Button variant="default" size="sm" className="cursor-pointer text-[#FAFAFA]">
                                <p>Book a Demo</p>
                            </Button>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
