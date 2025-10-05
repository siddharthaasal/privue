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
  address = ['alt.f, JMD Empire Square,', 'Mehrauli-Gurgaon Road,', 'Gurugram, Haryana 122001'],
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

  return (
    <section
      ref={footerRef}
      /* Fixed on lg+ (desktop), normal flow on smaller screens */
      className="bg-background text-muted-foreground lg:fixed lg:right-0 lg:bottom-0 lg:left-0 z-0 mx-auto w-full lg:mx-auto lg:max-w-[1150px] border-t border-gray-200 py-8 text-sm"
      aria-labelledby="site-footer"
    >
      <footer id="site-footer" className="px-4 lg:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Left Section */}
          <div className="flex-1 max-w-md">
            <a href={logo.url} className="mb-3 inline-flex items-center gap-3">
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
          {/* Responsive grid: 1 col on small, 2 on sm, 4 on md+ */}
          <div className="mt-6 w-full flex-[2] grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:mt-0">
            {menuItems.map((section, idx) => (
              <div key={idx} className="max-w-[220px]">
                <h4 className="text-foreground mb-2 text-sm font-medium">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="text-foreground-lighter hover:text-foreground text-sm font-normal transition-colors break-words"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
