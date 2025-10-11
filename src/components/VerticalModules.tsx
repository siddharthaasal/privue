'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type IncomingItem = {
  id?: string;
  title: string;
  description: string;
  imgSrc?: string;
  alt?: string;
  link?: string;
  renderAnimation?: React.ComponentType<any>;
};

type Props = {
  items: IncomingItem[];
};

function makeId(fallbackIndex: number) {
  if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
    try {
      return (crypto as any).randomUUID();
    } catch {
      // fall through
    }
  }
  return `gen-${Date.now().toString(36)}-${fallbackIndex}`;
}

export default function VerticalModules({ items }: Props) {
  const processed = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.map((it, idx) => ({
      id: it.id ?? makeId(idx),
      title: it.title,
      description: it.description,
      imgSrc: it.imgSrc,
      alt: it.alt ?? it.title,
      link: it.link,
      renderAnimation: it.renderAnimation,
    }));
  }, [items]);

  const [activeId, setActiveId] = useState<string>(processed[0]?.id ?? '');

  useEffect(() => {
    if (!activeId && processed.length > 0) {
      setActiveId(processed[0].id);
    } else if (processed.length === 0) {
      setActiveId('');
    } else {
      const exists = processed.some((p) => p.id === activeId);
      if (!exists && processed.length > 0) {
        setActiveId(processed[0].id);
      }
    }
  }, [processed, activeId]);

  const active = useMemo(
    () => processed.find((p) => p.id === activeId) ?? processed[0],
    [processed, activeId],
  );

  if (!processed || processed.length === 0) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="absolute inset-0 -z-10 bg-linear-to-b sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>

      <div className="mx-auto space-y-8 px-4 sm:px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)] max-w-7xl">
        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <h1 className="mb-4 text-2xl font-semibold text-[#171717] md:text-4xl">
            Our{' '}
            <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Modules
            </span>
          </h1>
          <p className="mt-2 mb-4 text-sm text-[#525252] md:text-lg dark:text-gray-400">
            Experience how AI transforms your workflow to build a scalable and efficient business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:px-6 md:grid-cols-3 lg:gap-20 lg:px-8">
          {/* Left: Accordion */}
          <Accordion
            type="single"
            value={activeId}
            onValueChange={(value) => value && setActiveId(value)}
            className="w-full"
          >
            {processed.map((it) => (
              <AccordionItem key={it.id} value={it.id}>
                <AccordionTrigger>
                  <h3 className="flex items-center gap-2 text-base md:text-base">{it.title}</h3>
                </AccordionTrigger>
                <AccordionContent><p className='text-[15px]'>{it.description}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right: Animation or Image */}
          <div className="relative col-span-2 flex overflow-hidden rounded-2xl bg-slate-50/40 p-2 ring-1 ring-slate-200/50 ring-inset">
            <div className="relative flex max-h-[700px] min-h-[260px] sm:min-h-[320px] md:max-h-[600px] md:min-h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50/40 ring-1 ring-slate-200/50 ring-inset">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  {active?.renderAnimation ? (
                    (() => {
                      const Anim = active.renderAnimation!;
                      return (
                        <div className="mx-auto h-full w-full">
                          <Anim />
                        </div>
                      );
                    })()
                  ) : active?.imgSrc ? (
                    <img
                      src={active.imgSrc}
                      alt={active.alt}
                      className="h-full w-full object-cover object-center md:object-left-top"
                      style={{ display: 'block' }}
                      width={1207}
                      height={929}
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
