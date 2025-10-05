import privueLogo from '/privue-logo.png';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
// import { IoIosMail } from "react-icons/io";
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
        // const translateY = remaining > 30 ? remaining / 2 : 0;
        footerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={footerRef}
      className="bg-background text-muted-foreground fixed right-0 bottom-0 left-0 z-0 mx-auto w-full max-w-[1150px] border-t border-gray-200 py-8 text-sm"
    >
      <footer className="flex flex-col gap-16 lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="max-w-md flex-1">
          <a href={logo.url} className="mb-2 flex items-center">
            <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
            <span className="text-foreground text-lg font-medium">{logo.title}</span>
          </a>
          {/* <p className="mb-3 text-base text-foreground">{tagline}</p> */}
          <div className="pl-1">
            {address.map((line, idx) => (
              <p key={idx} className="text-foreground-lighter text-sm">
                {line}
              </p>
            ))}

            <div className="mt-3 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/privue/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-lg text-[#707070] hover:text-[#525252]" />
              </a>
              <a href="mailto:query@privue.ai" aria-label="Send us an email">
                <Mail size={20} className="text-[#707070] hover:text-[#525252]" />
              </a>{' '}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid w-full flex-[2] grid-cols-2 gap-8 md:grid-cols-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="max-w-[200px]">
              <h4 className="text-foreground mb-2 text-sm font-medium">{section.title}</h4>
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
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs font-medium md:flex-row">
        <p>{copyright}</p>
        <ul className="flex gap-4">
          {bottomLinks.map((link, idx) => (
            <li key={idx}>
              <a href="mailto:query@privue.ai" aria-label="Send us an email">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
