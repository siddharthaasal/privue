import privueLogo from '/privue-logo.png';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

interface MenuItem {
    title: string;
    links: { text: string; url: string }[];
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

export default function FooterMobile({
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
    // Merge duplicate Modules sections
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

        const dedupedModules = modulesLinks.filter(
            (link, idx, arr) =>
                idx === arr.findIndex((l) => l.text === link.text && l.url === link.url)
        );

        const result: MenuItem[] = [];
        if (dedupedModules.length > 0) {
            result.push({ title: 'Modules', links: dedupedModules });
        }
        result.push(...otherSections);
        return result;
    })();

    // Utility: group 2 sections per row
    const sectionPairs: MenuItem[][] = [];
    for (let i = 0; i < mergedMenuItems.length; i += 2) {
        sectionPairs.push(mergedMenuItems.slice(i, i + 2));
    }

    return (
        <footer className="bg-background text-muted-foreground border-t border-gray-200 py-10 px-6 text-sm flex flex-col gap-10">
            {/* Logo + Address */}
            <div className="flex flex-col items-start gap-3">
                <a href={logo.url} className="inline-flex items-center gap-3">
                    <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10 w-auto" />
                    <span className="text-foreground text-lg font-medium">{logo.title}</span>
                </a>

                <div className="text-foreground-lighter text-sm space-y-1">
                    {address.map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-5">
                    <a
                        href="https://www.linkedin.com/company/privue/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Privue LinkedIn"
                    >
                        <FaLinkedin className="text-lg text-[#707070] hover:text-[#525252]" />
                    </a>
                    <a href="mailto:query@privue.ai" aria-label="Send us an email">
                        <Mail size={20} className="text-[#707070] hover:text-[#525252]" />
                    </a>
                </div>
            </div>

            {/* Menu Items: 2 per row */}
            <div className="flex flex-col gap-8">
                {sectionPairs.map((pair, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-8">
                        {pair.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-foreground mb-3 text-sm font-medium">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                className="text-foreground-lighter hover:text-foreground text-sm font-normal transition-colors block"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 pt-6 text-xs font-medium">
                <p className="text-foreground-lighter mb-4">{copyright}</p>

                <ul className="flex flex-wrap gap-4">
                    {bottomLinks.map((link, idx) => (
                        <li key={idx}>
                            {link.url?.startsWith('mailto:') ? (
                                <a href={link.url} className="text-sm">
                                    {link.text}
                                </a>
                            ) : link.url ? (
                                <a href={link.url} className="text-sm">
                                    {link.text}
                                </a>
                            ) : (
                                <a href="mailto:query@privue.ai" className="text-sm">
                                    {link.text}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
