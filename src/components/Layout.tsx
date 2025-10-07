import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FooterMobile from './FooterMobile';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [headerVariant, setHeaderVariant] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-theme]');
      let activeTheme: 'light' | 'dark' = 'light';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.1; // halfway down viewport

        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          const theme = (section as HTMLElement).getAttribute('data-theme') as 'light' | 'dark';
          activeTheme = theme;
        }
      });

      setHeaderVariant(activeTheme);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className={headerVariant === 'dark' ? 'dark' : ''}>
        <Header />
      </div>

      <main className="bg-background overflow-x-hidden
      /* smaller gap on mobile */ 
      /* full width on mobile, 1200px cap on sm+ */
       /* remove side borders on mobile */ 
       relative z-1 mx-auto mt-[3rem] mb-[20rem] w-full max-w-full border-0 sm:mb-[25rem] sm:max-w-[1200px] sm:border-r sm:border-l sm:border-gray-200">
        {children}
      </main>

      <Toaster />
      <>
        <div className="hidden lg:block">
          <Footer />
        </div>
        <div className="block lg:hidden">
          <FooterMobile />
        </div>
      </>
    </div>
  );
}
