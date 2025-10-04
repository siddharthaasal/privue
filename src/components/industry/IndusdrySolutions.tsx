'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, AnimatePresence } from 'motion/react';
import IndustrySolutionCard from './IndustrySolutionCard';
import { Building, Factory, Warehouse, HousePlug, ShieldCheck, Building2 } from 'lucide-react';

// Types
type Industry = {
  id: string;
  name: string;
  description?: string;
};

type Solution = {
  heading: string;
  subHeading: string;
  icon?: string | React.ComponentType<any> | React.ReactNode;
  slug: string;
};

export default function IndustryModules() {
  const industries: Industry[] = [
    {
      id: 'ind-1',
      name: 'Corporations',
      description:
        'Transform supply chains from vulnerable to resilient. Monitor distributors in real-time, predict sustainability risks, and make decisions backed by AI-powered intelligence.',
    },
    {
      id: 'ind-2',
      name: 'Insurance',
      description:
        'Fortify compliance, slash credit exposure, and unlock smarter lending. Our AI-driven platform revolutionizes internal audits, sustainability assessments, and third-party risk management for the modern bank.',
    },
    {
      id: 'ind-3',
      name: 'Banking',
      description:
        'Build bulletproof portfolios that investors trust. Accelerate due diligence, master sustainability metrics, and neutralize third-party risks with precision analytics that see around corners.',
    },
    {
      id: 'ind-4',
      name: 'Asset Management',
      description:
        'Underwrite with unprecedented confidence. Price commercial risk accurately, validate sustainability claims instantly, and detect third-party threats before they materialize—all powered by advanced AI analytics.',
    },
    {
      id: 'ind-5',
      name: 'Consulting',
      description:
        "Deliver client insights at the speed of business. Cut due diligence time by half, automate audit workflows, and amplify your firm's value with AI-driven analytics that turn data into competitive advantage.",
    },
    {
      id: 'ind-6',
      name: 'Government',
      description:
        'Safeguard public trust through smarter procurement. Validate vendors instantly, exceed sustainability mandates, and ensure compliance with AI-powered risk intelligence designed for public sector excellence.',
    },
  ];

  const solutionsByIndustry: Record<string, Solution[]> = {
    'ind-1': [
      {
        heading: 'Large Customer Risk Assessment',
        subHeading: 'Reduce defaults. Protect cash flow. Secure growth.',
        icon: <Building />,
        slug: 'large-customer-risk-assessment',
      },
      {
        heading: 'Third Party Risk Assessment',
        subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
        icon: <Factory />,
        slug: 'third-party-risk-management',
      },
      {
        heading: 'Distributor Performance Management',
        subHeading: 'Reduce leakages. Improve collections. Safeguard growth.',
        icon: <Warehouse />,
        slug: 'distributor-performance-management',
      },
      {
        heading: 'Sustainability Assessment',
        subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
        icon: <HousePlug />,
        slug: 'sustainability-assessment',
      },
    ],
    'ind-2': [
      {
        heading: 'Insurance Underwriting and Pricing',
        subHeading: 'Sharper insights. Smarter underwriting. Stronger outcomes.',
        icon: <ShieldCheck />,
        slug: 'commercial-insurance-underwriting',
      },
      {
        heading: 'Third Party Risk Assessment',
        subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
        icon: <Factory />,
        slug: 'third-party-risk-management',
      },
      {
        heading: 'Sustainability Assessment',
        subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
        icon: <HousePlug />,
        slug: 'sustainability-assessment',
      },
    ],
    'ind-3': [
      {
        heading: 'Sustainability Assessment',
        subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
        icon: <HousePlug />,
        slug: 'sustainability-assessment',
      },
      {
        heading: 'Third Party Risk Assessment',
        subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
        icon: <Factory />,
        slug: 'third-party-risk-management',
      },
    ],
    'ind-4': [
      {
        heading: 'Entity Due Dilligence',
        subHeading: 'A Unified Solution for Smarter Due Diligence',
        icon: <Building2 />,
        slug: 'entity-due-diligence',
      },
      {
        heading: 'Sustainability Assessment',
        subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
        icon: <HousePlug />,
        slug: 'sustainability-assessment',
      },
      {
        heading: 'Third Party Risk Assessment',
        subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
        icon: <Factory />,
        slug: 'third-party-risk-management',
      },
    ],
    'ind-5': [
      {
        heading: 'Entity Due Dilligence',
        subHeading: 'A Unified Solution for Smarter Due Diligence',
        icon: <Building2 />,
        slug: 'entity-due-diligence',
      },
    ],
    'ind-6': [
      {
        heading: 'Third Party Risk Assessment',
        subHeading: 'Reduce disruptions. Safeguard reputation. Build resilient partnerships.',
        icon: <Factory />,
        slug: 'third-party-risk-management',
      },
      {
        heading: 'Sustainability Assessment',
        subHeading: 'Climate Risk. Emissions Estimation. ESG Score.',
        icon: <HousePlug />,
        slug: 'sustainability-assessment',
      },
    ],

    // fallback key
    // default: dummySolutions,
  };

  useEffect(() => {
    function handleOpenIndustry(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (!detail?.id) return;
      const id = detail.id as string;

      // if the id exists in industries, open it
      const found = industries.find((x) => x.id === id);
      if (found) {
        setActiveIndustryId(id);

        // also scroll the industry container into view if necessary
        const el = document.getElementById('industries-section');
        if (el) {
          // small timeout ensures accordion has rendered before scrolling if needed
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
        }
      }
    }

    // listen
    window.addEventListener('openIndustry' as any, handleOpenIndustry as EventListener);
    return () =>
      window.removeEventListener('openIndustry' as any, handleOpenIndustry as EventListener);
  }, [industries]);

  // on mount: if URL hash like #industry-ind-2, open it
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash && hash.startsWith('industry-')) {
      const idFromHash = hash.replace('industry-', '');
      const found = industries.find((x) => x.id === idFromHash);
      if (found) {
        setActiveIndustryId(idFromHash);
        // small timeout to allow layout
        setTimeout(() => {
          const el = document.getElementById('industries-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 40);
      }
    }
    // if you want to respond to hashchange (user pressing back/forward) we can:
    function onHashChange() {
      const newHash = location.hash?.replace('#', '');
      if (newHash && newHash.startsWith('industry-')) {
        const idFromHash = newHash.replace('industry-', '');
        const found = industries.find((x) => x.id === idFromHash);
        if (found) setActiveIndustryId(idFromHash);
      }
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [industries]);

  // Active industry id state. Default to first industry.
  const [activeIndustryId, setActiveIndustryId] = useState<string>(industries[0].id!);
  const currentSolutions = solutionsByIndustry[activeIndustryId] ?? solutionsByIndustry.default;

  // When activeIndustryId changes, we could do side effects (analytics, fetch, etc.)
  // For this demo we simply log (you can remove this).
  useEffect(() => {
    // Example side-effect: fetch industry-specific solutions here if needed.
    // console.log('Active industry changed to', activeIndustryId)
  }, [activeIndustryId]);

  // --- optional: keep a ref to the RHS scroll container so we can manage focus/scroll if desired ---
  const rhsScrollRef = useRef<HTMLDivElement | null>(null);

  // Render
  return (
    <section id="industries-section">
      {/* background / decorative element copied from your original component */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />

      <div className="mx-auto space-y-8 rounded-2xl border border-gray-200 p-4 md:space-y-16 lg:space-y-20">
        {/* Two-column layout: LHS (accordion), RHS (cards) */}
        <div className="grid gap-12 sm:px-12 md:grid-cols-3 lg:gap-20 lg:px-8">
          {/* -----------------------
              LEFT: Industries (Accordion)
              - type="single" with value controlled by activeIndustryId
              - changing the accordion updates the RHS via setActiveIndustryId
              ------------------------ */}
          <Accordion
            type="single"
            value={activeIndustryId}
            onValueChange={(value) => value && setActiveIndustryId(value)}
            className="w-full"
          >
            {industries.map((ind) => (
              <AccordionItem key={ind.id} value={ind.id}>
                <AccordionTrigger>
                  {/* Each trigger shows industry name */}
                  <div className="flex items-center gap-2 text-base">{ind.name}</div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* The description could be longer; keep it concise */}
                  <div className="text-muted-foreground text-sm">
                    {ind.description || 'Explore tailored solutions for this industry.'}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* -----------------------
              RIGHT: Solutions list for the selected industry
              - col-span-2 to occupy remaining grid columns
              - maps dummySolutions exactly using the snippet you provided
              ------------------------ */}
          <div className="bg-background relative col-span-2 flex overflow-hidden p-0">
            <div
              ref={rhsScrollRef}
              className="scrollbar-none relative grid h-[450px] w-full auto-rows-min content-start gap-2 overflow-y-auto rounded-2xl p-4"
            >
              {/* Animate the whole list as one panel keyed by activeIndustryId */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndustryId} // <--- switching industry replaces this panel
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    opacity: { duration: 0.16 },
                    y: { type: 'spring', stiffness: 300, damping: 28, duration: 0.24 },
                  }}
                  className="grid gap-2"
                  // Keep the same 1-card-per-row layout: each card will fill available width
                  style={{ gridTemplateColumns: '1fr' }}
                >
                  {currentSolutions.map((s) => (
                    <div key={s.slug} className="w-full">
                      {/* keep your original IndustrySolutionCard usage so cards remain full-width */}
                      <IndustrySolutionCard
                        title={s.heading}
                        description={s.subHeading}
                        icon={s.icon}
                        href={`/solutions/${s.slug}`}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
