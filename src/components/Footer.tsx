import privueLogo from '/privue-logo.png';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

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
    alt: 'logo for privue',
    title: 'privue',
    url: 'https://privue.ai/',
  },
  address = ['Alt. F, JMD Empire Square,', 'Mehrauli-Gurgaon Road,', 'Gurugram, Haryana 122001'],
  menuItems = [
    {
      title: 'Modules',
      links: [
        { text: 'Registry Data ', url: '/solutions/entity-due-diligence#modules' },
        { text: 'Credit Assessment', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Financial Analysis', url: '/entity-due-diligence#modules' },
        { text: 'Compliance Checks', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Legal Due Diligence', url: '/solutions/third-party-risk-management#modules' },
      ],
    },
    {
      title: 'Modules',
      links: [
        { text: 'Adverse News', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Cyber Risk', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Climate Risk', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Carbon Estimation', url: '/solutions/third-party-risk-management#modules' },
        { text: 'Carbon Emissions', url: '/solutions/sustainability-assessment#modules' },
        { text: 'ESG Scoring', url: '/solutions/third-party-risk-management#modules' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Distributor Management', url: '/solutions/distributor-performance-management' },
        { text: 'Sustainability Assessment', url: '/solutions/sustainability-assessment' },
        { text: 'Insurance Underwriting', url: '/solutions/commercial-insurance-underwriting' },
        {
          text: 'Large Customer Risk Assessment',
          url: '/solutions/large-customer-risk-assessment',
        },
        { text: 'Entity Due Diligence', url: '/solutions/entity-due-diligence' },
        { text: 'Third Party Risk Management', url: '/solutions/third-party-risk-management' },
        // { text: 'Internal Audit', url: '/solutions/internal-audit' },
      ],
    },

    {
      title: 'Company',
      links: [
        { text: 'Data Security', url: '/data-security' },
        { text: 'Cookie Policy', url: '/cookie-policy' },
        { text: 'California Notice', url: '/california-notice' },
        { text: 'Terms of Use', url: '/terms' },
        { text: 'Privacy Policy', url: '/privacy-policy' },
        { text: 'Contact', url: '/contact' },
      ],
    },
  ],
  copyright = '© Nexvue Technologies Private Limited 2025 All rights reserved',
  bottomLinks = [{ text: 'query@privue.ai', url: '#' }],
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
        footerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Merge duplicate "Modules" sections into one
  const mergedMenuItems: MenuItem[] = (() => {
    const modulesLinks: MenuItem['links'] = [];
    const otherSections: MenuItem[] = [];

    (menuItems || []).forEach((sec) => {
      if (sec.title?.trim().toLowerCase() === 'modules') {
        modulesLinks.push(...sec.links);
      } else {
        otherSections.push(sec);
      }
    });

    // Optional: remove exact-duplicate links (by text+url)
    const dedupedModules = modulesLinks.filter(
      (link, idx, arr) => idx === arr.findIndex((l) => l.text === link.text && l.url === link.url),
    );

    const result: MenuItem[] = [];
    if (dedupedModules.length > 0) {
      result.push({ title: 'Modules', links: dedupedModules });
    }
    result.push(...otherSections);
    return result;
  })();

  return (
    <section
      ref={footerRef}
      /* Fixed on lg+ (desktop), normal flow on smaller screens */
      className="bg-background text-muted-foreground z-0 mx-auto w-full border-t border-gray-200 py-8 text-sm lg:fixed lg:right-0 lg:bottom-0 lg:left-0 lg:mx-auto lg:max-w-[1150px]"
      aria-labelledby="site-footer"
    >
      <footer id="site-footer" className="grid-cols-5 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Left Section */}
          <div className="col-span-2 min-w-max flex-col">
            <a href={logo.url} className="inline-flex items-center gap-3">
              <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10 w-auto" />
              <span className="text-foreground text-lg font-medium">{logo.title}</span>
            </a>

            <div className="mt-2 space-y-2">
              {/* Address (stacked on mobile) */}
              <div className="text-foreground-lighter text-sm">
                {address.map((line, idx) => (
                  <p key={idx} className="leading-snug">
                    {line}
                  </p>
                ))}
              </div>

              {/* Socials */}
              <div className="mt-3 flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/company/privue/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Privue on LinkedIn"
                >
                  <FaLinkedin className="text-lg text-[#707070] hover:text-[#525252]" />
                </a>
                <a href="mailto:query@privue.ai" aria-label="Send us an email">
                  <Mail size={20} className="text-[#707070] hover:text-[#525252]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          {/* Right Section — static columns (map only rows) */}
          <div className="col-span-4 mt-6 w-full lg:mt-0 lg:pl-10">
            {/*
    derive the specific columns once so we can render them statically.
    keeps logic separate from render so spacing control is straightforward
  */}
            {(() => {
              const modulesSection = mergedMenuItems.find(
                (s) => s.title?.trim().toLowerCase() === 'modules',
              );
              const otherSections = mergedMenuItems.filter(
                (s) => s.title?.trim().toLowerCase() !== 'modules',
              );

              // attempt to find Solutions and Company by title (fallback to first two other sections)
              const solutionsSection =
                otherSections.find((s) => s.title?.trim().toLowerCase() === 'solutions') ||
                otherSections[0];
              const companySection =
                otherSections.find((s) => s.title?.trim().toLowerCase() === 'company') ||
                otherSections[1] ||
                otherSections[0];

              // split modules into two roughly equal columns
              const splitIntoTwo = <T,>(arr: T[]) => {
                const mid = Math.ceil(arr.length / 2);
                return [arr.slice(0, mid), arr.slice(mid)];
              };

              const [modulesColA, modulesColB] = modulesSection
                ? splitIntoTwo(modulesSection.links)
                : [[], []];

              return (
                <div className="flex items-start justify-end gap-12">
                  {/* Modules column (left) */}
                  <div className="max-w-max min-w-0 flex-1">
                    <h4 className="text-foreground mb-3 text-sm font-medium">Modules</h4>

                    {/* inner wrapper keeps modules grouped; capped so it cannot blow out layout */}
                    <div className="max-w-max min-w-max">
                      <div className="grid grid-cols-2 gap-x-12">
                        <ul className="space-y-2">
                          {modulesColA.map((link, i) => (
                            <li key={i}>
                              <a
                                href={link.url}
                                className="text-foreground-lighter hover:text-foreground block truncate text-sm font-normal transition-colors"
                                title={link.text}
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>

                        <ul className="space-y-2">
                          {modulesColB.map((link, i) => (
                            <li key={i}>
                              <a
                                href={link.url}
                                className="text-foreground-lighter hover:text-foreground block truncate text-sm font-normal transition-colors"
                                title={link.text}
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Solutions column (center) */}
                  <div className="max-w-max min-w-0 flex-1">
                    <h4 className="text-foreground mb-3 text-sm font-medium">
                      {solutionsSection?.title || 'Solutions'}
                    </h4>

                    {/* use min-w-max so internal items keep spacing, but cap with max-w and truncate.
              If you want single-line guaranteed, keep whitespace-nowrap instead of truncate. */}
                    <div className="max-w-[18rem] min-w-max">
                      <ul className="space-y-2">
                        {solutionsSection?.links.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.url}
                              className="text-foreground-lighter hover:text-foreground block text-sm font-normal whitespace-nowrap transition-colors"
                              title={link.text}
                            >
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Company column (right) */}
                  <div className="max-w-max min-w-0 flex-1">
                    <h4 className="text-foreground mb-3 text-sm font-medium">
                      {companySection?.title || 'Company'}
                    </h4>

                    <div className="max-w-[16rem] min-w-max">
                      <ul className="space-y-2">
                        {companySection?.links.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.url}
                              className="text-foreground-lighter hover:text-foreground block truncate text-sm font-normal transition-colors"
                              title={link.text}
                            >
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6 text-xs font-medium">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-foreground-lighter">{copyright}</p>

            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, idx) => (
                <li key={idx}>
                  {link.url?.startsWith('mailto:') ? (
                    <a href={link.url} aria-label={link.text} className="text-sm">
                      {link.text}
                    </a>
                  ) : link.url ? (
                    <a href={link.url} className="text-sm">
                      {link.text}
                    </a>
                  ) : (
                    // fallback: mailto if no url provided
                    <a href="mailto:query@privue.ai" aria-label={link.text} className="text-sm">
                      {link.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
}
