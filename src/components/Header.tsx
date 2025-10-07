'use client';

import React, { useEffect, useRef, useState } from 'react';
import privueLogo from '/privue-logo.png';
import { Button } from '@/components/ui/button';
import { solutions } from '@/data/solutions/solutions.ts';
import { AppWindow, FolderGit2, LayoutPanelLeft } from 'lucide-react';

export type MenuItem = {
  name: string;
  href?: string;
  description?: string;
  icon?: string | React.ComponentType<any>;
  id?: string;
};

type LinkType = {
  name: string;
  href?: string;
  variant?: 'link' | 'outline' | 'default' | 'ghost';
  items?: MenuItem[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // desktop dropdowns
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null); // mobile collapsible sections
  const navRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const renderIcon = (
    icon?: string | React.ComponentType<any>,
    className = 'w-9 h-9'
  ): any | null => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <img
          src={icon}
          alt=""
          className={`${className} object-contain`}
          loading="lazy"
          aria-hidden="true"
        />
      );
    }
    const IconComp = icon as React.ComponentType<any>;
    return <IconComp size={20} aria-hidden="true" color={'#374151'} />;
  };

  const products: MenuItem[] = [
    {
      name: 'API',
      href: '/products#api',
      description: 'lorem ipsum',
      icon: FolderGit2,
    },
    {
      name: 'Workspace',
      href: '/products#workspace',
      description: 'lorem ipsum',
      icon: LayoutPanelLeft,
    },
    {
      name: 'Application',
      href: '/products#application',
      description: 'lorem ipsum',
      icon: AppWindow,
    },
  ];

  const productMenuItems: MenuItem[] = products.map((s) => ({
    name: s.name,
    href: s.href,
    icon: s.icon,
  }));

  const solutionMenuItems: MenuItem[] = solutions.map((s) => ({
    name: s.heading,
    href: `/solutions/${s.slug}`,
  }));

  const industries = [
    { id: 'ind-1', name: 'Corporate', href: '#' },
    { id: 'ind-2', name: 'Insurance', href: '#' },
    { id: 'ind-3', name: 'Banking', href: '#' },
    { id: 'ind-4', name: 'Asset Management', href: '#' },
    { id: 'ind-5', name: 'Consultancy', href: '#' },
    { id: 'ind-6', name: 'Government', href: '#' },
  ];

  const industryMenuItems: MenuItem[] = industries.map((s, idx) => ({
    id: (s as any).id ?? `ind-${idx + 1}`,
    name: s.name,
    href: `#industry-${(s as any).id ?? idx + 1}`,
  }));

  const desktopLinks: LinkType[] = [
    { name: 'Solutions', items: solutionMenuItems },
    { name: 'Product', items: productMenuItems },
    { name: 'Industries', items: industryMenuItems },
    { name: 'Articles', href: '/articles', variant: 'link' },
  ];

  // --- Effects (scroll, body overflow, click-away) ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    if (!isMenuOpen) {
      // reset mobile collapses when closing menu
      setMobileOpenIndex(null);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

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

    if (window.location.pathname === BASE_PATH) {
      try {
        history.pushState(null, '', targetHash);
      } catch {
        location.hash = targetHash.replace('#', '');
      }

      const sec = document.getElementById('industries-section');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.dispatchEvent(new CustomEvent('openIndustry', { detail: { id: industryId } }));

      setOpenIndex(null);
      setIsMenuOpen(false);
      return;
    }

    const origin = window.location.origin;
    const normalizedBase = BASE_PATH.startsWith('/') ? BASE_PATH : `/${BASE_PATH}`;
    const baseNoTrailing =
      normalizedBase.endsWith('/') && normalizedBase !== '/'
        ? normalizedBase.slice(0, -1)
        : normalizedBase;

    window.location.href = `${origin}${baseNoTrailing}${targetHash}`;
  };

  // Mobile collapsible toggle
  const toggleMobileSection = (i: number) => {
    setMobileOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <header className="font-open-sans fixed inset-x-0 top-0 z-50">
      <div className="w-full relative py-1">
        {/* Blur layer / border on scroll */}
        <div
          className={`pointer-events-none absolute inset-0 border border-r-0 border-b-[0.5] border-l-0 ${isScrolled
            ? 'bg-background shadow-md backdrop-blur-md transition-all duration-300'
            : 'bg-background backdrop-blur-sm'
            }`}
        />

        {/* Actual navbar content */}
        <nav
          ref={navRef}
          className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-0"
          aria-label="Global"
        >
          {/* Logo (left) */}
          <div className="flex flex-1 min-w-0 items-center">
            <a href="/" className="flex items-center">
              <img src={privueLogo} alt="Privue Logo" className="h-12 w-auto" loading="eager" />
              <span className="text-foreground -mt-1 ml-0 text-[20px] font-semibold truncate">privue</span>
            </a>
          </div>

          {/* Mobile toggle (keeps same spot) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-privue-700 hover:bg-privue-100 inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
            <div className="border-privue-200 absolute top-full left-0 z-40 flex w-full flex-col space-y-3 border-t bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl">
              {/* Map desktop links to mobile layout */}
              {desktopLinks.map((link, idx) => {
                const hasChildren = Array.isArray(link.items) && link.items!.length > 0;
                return (
                  <div key={link.name} className="w-full">
                    {hasChildren ? (
                      <>
                        <button
                          className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-sm font-semibold"
                          onClick={() => toggleMobileSection(idx)}
                          aria-expanded={mobileOpenIndex === idx}
                        >
                          <span>{link.name}</span>
                          <svg
                            className={`h-4 w-4 transform transition-transform ${mobileOpenIndex === idx ? 'rotate-180' : ''
                              }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {mobileOpenIndex === idx && (
                          <div className="mt-1 space-y-1 border-l-0 pl-4">
                            {link.items!.map((sub) => {
                              const isIndustryLink = link.name === 'Industries' && (sub as any).id;
                              const defaultHref = sub.href ?? '#';
                              return isIndustryLink ? (
                                <button
                                  key={(sub as any).id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    handleIndustryClick((sub as any).id);
                                  }}
                                  className="block w-full text-left rounded-sm px-2 py-2 text-sm font-normal"
                                >
                                  {sub.name}
                                </button>
                              ) : (
                                <a
                                  key={sub.name}
                                  href={defaultHref}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block rounded-sm px-2 py-2 text-sm no-underline"
                                >
                                  {sub.name}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-md px-2 py-3 text-sm font-medium no-underline"
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                );
              })}

              {/* Keep CTA visible on mobile at bottom */}
              <div className="mt-2 flex w-full gap-2">
                <a href="/contact" className="w-full">
                  <Button variant="default" size="sm" className="w-full cursor-pointer text-[#FAFAFA]">
                    Book a Demo
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* Desktop links (centered nav) */}
          <div className="hidden flex-1 items-center justify-center lg:flex lg:items-center lg:gap-x-2">
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
                        className="hover:bg-muted hover:text-accent-foreground inline-flex items-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors"
                      >
                        {link.name}
                        <svg
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : (
                      <Button
                        asChild
                        variant={link.variant || 'link'}
                        className="text-foreground hover:text-privue-600 text-sm font-medium"
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </a>
                      </Button>
                    )}

                    {/* Dropdown panel */}
                    {hasChildren && openIndex === idx && (
                      <div
                        onMouseEnter={() => openMenu(idx)}
                        onMouseLeave={() => closeMenu()}
                        className="bg-popover text-popover-foreground border-foreground/5 absolute left-0 z-50 mt-2 w-max min-w-max rounded-sm border shadow-lg"
                      >
                        <div className="p-1">
                          {link.items!.map((sub) => {
                            const isIndustryLink = link.name === 'Industries' && (sub as any).id;
                            const defaultHref = sub.href ?? '#';

                            const hasIcon = !!sub.icon;

                            const itemContent = (
                              <>
                                {hasIcon ? (
                                  <div className="text-foreground flex h-7 w-7 flex-shrink-0 items-center justify-center">
                                    {renderIcon(sub.icon, 'w-6 h-6')}
                                  </div>
                                ) : null}

                                <div className="min-w-0">
                                  <div className="text-sm font-normal">{sub.name}</div>
                                  {sub.description && (
                                    <p className="text-muted-foreground truncate text-sm leading-snug">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                              </>
                            );

                            return isIndustryLink ? (
                              <button
                                key={(sub as any).id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleIndustryClick((sub as any).id);
                                }}
                                className="hover:bg-muted flex w-full items-start gap-3 rounded-sm border-0 bg-transparent px-3 py-2.5 text-left no-underline"
                                aria-label={`Open ${sub.name} industry`}
                              >
                                {itemContent}
                              </button>
                            ) : (
                              <a
                                key={sub.name}
                                href={defaultHref}
                                className="hover:bg-muted flex items-center gap-3 rounded-sm px-3 py-2.5 no-underline"
                              >
                                {itemContent}
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
          <div className="hidden flex-1 justify-end gap-2 lg:flex">
            <a href="/contact">
              <Button variant="default" size="sm" className="cursor-pointer text-[#FFF]">
                <p>Book a Demo</p>
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
