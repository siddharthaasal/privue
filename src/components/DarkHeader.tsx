import { useState, useEffect } from 'react';
import privueLogo from '/privue-logo.png';
import { Button } from '@/components/ui/button';

type linkType = {
  name: string;
  href: string;
  variant: 'link' | 'outline' | 'default' | 'ghost';
};

export default function DarkHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopLinks: linkType[] = [
    { name: 'Modules', href: '/modules', variant: 'link' },
    { name: 'Solutions', href: '/solutions', variant: 'link' },
    { name: 'API', href: '/api', variant: 'link' },
    { name: 'Integrations', href: '/integrations', variant: 'link' },
  ];
  const mobileLinks: linkType[] = [
    { name: 'Modules', href: '/modules', variant: 'link' },
    { name: 'Solutions', href: '/solutions', variant: 'link' },
    { name: 'API', href: '/api', variant: 'link' },
    { name: 'Integrations', href: '/integrations', variant: 'link' },
    { name: 'Demo', href: '/demo', variant: 'outline' },
    { name: 'Book a Call', href: '/book-a-call', variant: 'default' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //  lock background scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  return (
    <header className="bg-background fixed inset-x-0 top-0 z-50 h-4">
      <div className="w-100% relative py-1">
        {/* Blur layer */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            isScrolled
              ? 'border-b border-white/30 bg-black/50 shadow-md backdrop-blur-md transition-all duration-300'
              : 'dark:bg-background-dark border border-b-[0.5] backdrop-blur-sm dark:border-b-white/30'
            // <div className={`absolute inset-0 pointer-events-none ${isScrolled ? "border-b backdrop-blur-xl transition-all duration-300  bg-white/20 border-white/30 shadow-md" : "backdrop-blur-sm  bg-white/10 "
          }`}
        />

        {/* Actual navbar content */}
        <nav
          className="relative mx-auto flex items-center justify-between px-4 py-0 sm:px-6 lg:px-36"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex flex-1">
            <a href="/" className="flex items-center">
              <img src={privueLogo} alt="Privue Logo" className="h-14 w-auto" loading="eager" />
              <span className="-mt-1 text-[24px] font-semibold text-gray-800 dark:text-white">
                privue
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-privue-700 hover:bg-privue-100 inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
            >
              <span className="sr-only">Toggle menu</span>
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
            <div className="border-privue-200 absolute top-full left-0 z-40 flex w-full flex-col space-y-3 border-t bg-white/90 px-6 py-4 shadow-lg backdrop-blur-xl">
              {mobileLinks.map((link, idx) => (
                <Button asChild key={idx} variant={link.variant} className="text-md font-semibold">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          )}

          {/* Desktop links */}
          <div className="hidden items-center justify-center lg:flex lg:items-center lg:gap-x-2">
            {desktopLinks.map((link, idx) => (
              <Button
                asChild
                key={idx}
                variant={link.variant}
                className="dark:text-foreground text-[14px] font-medium text-gray-800"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </Button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden flex-1 justify-end gap-2 lg:flex">
            <Button variant="outline" size="sm" className="dark:text-foreground text-[14px]">
              {' '}
              <a href="/login">Demo</a>
            </Button>
            <Button variant="default" size="sm" className="text-[14px]">
              {' '}
              <a href="/signup">Book a Call</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
