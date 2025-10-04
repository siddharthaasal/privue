import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
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

      <main
        className="
    bg-background relative z-1 mx-auto 
    mt-[3rem] 
    mb-[20rem] sm:mb-[30rem]     /* smaller gap on mobile */
    w-full max-w-full sm:max-w-[1200px]  /* full width on mobile, 1200px cap on sm+ */
    border-0 sm:border-l sm:border-r sm:border-gray-200  /* remove side borders on mobile */
  "
      >
        {children}
      </main>

      <Toaster />
      <Footer />
    </div>
  );
}
