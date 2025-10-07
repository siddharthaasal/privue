import Layout from '@/components/Layout';
import { Cpu, Zap } from 'lucide-react';
// import TwoOrbit from "@/components/about/TwoOrbit";
import ChatAnimation from '@/components/product-animations/ChatAnimation';
import useHashScroll from '@/hooks/useHashScroll';
import React, { useEffect, useState, useRef } from 'react';

export default function ProductPage() {
  useHashScroll({ offset: 80 });
  return (
    <Layout>
      {/* lighter vertical spacing on mobile; original spacing restored at md+ */}
      <div className="space-y-12 py-14 md:space-y-28 md:py-28">
        <section id="api" className="scroll-m-20">
          <SectionAPIs />
        </section>
        <section id="workspace" className="scroll-m-20">
          <SectionWorkspace />
        </section>
        <section id="application" className="scroll-m-20">
          <SectionPlatform />
        </section>
      </div>
    </Layout>
  );
}

/* -------------------- Section 1 -------------------- */
function SectionAPIs() {
  return (
    <section className="font-open-sans relative mx-auto flex items-center px-6 md:px-8">
      <div className="w-full space-y-6 px-0 md:space-y-8 md:px-6">
        <h2 className="max-w-3xl text-2xl leading-tight font-medium lg:text-3xl">
          <span className="text-privue-900">APIs— </span>modular building blocks for risk &amp; data
          workflows
        </h2>

        <div className="relative flex flex-col items-start gap-6 md:flex-row md:gap-8">
          {/* Left: Text */}
          <div className="relative z-10 space-y-3 md:w-2/3">
            <p className="text-base">
              Our APIs let you pick the exact capabilities you need and plug them into your existing
              systems. Ingest data from multiple public and premium sources (including government
              registries), extract entities from internal documents and files, and evaluate
              counterparties on multiple risk attributes—all through clean, well-documented
              endpoints.
            </p>
            <p className="text-base">
              Integrate directly with your workflow tools such as Salesforce, SAP, core banking, or
              case management. Use the modules independently or stitch them together: Data
              Acquisition → Document Parsing → Risk Scoring → Decisioning. Deploy quickly, scale
              securely, and maintain full control of your customer experience.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Feature
                icon={<Cpu className="h-4 w-4" />}
                title="Plug-and-play modules"
                desc="Choose only the endpoints you need—ingestion, extraction, risk, scoring—and add more as you grow."
              />
              <Feature
                icon={<Zap className="h-4 w-4" />}
                title="Fits your stack"
                desc="Native integration with Salesforce, SAP, and custom apps via REST APIs and webhooks."
              />
            </div>
          </div>

          {/* Right: Image (AboutSection style) — HIDDEN ON MOBILE */}
          <div className="relative mt-6 w-full md:mt-6 md:w-1/2">
            <div className="md:absolute md:inset-x-0 md:-inset-y-12">
              <div className="relative overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,var(--color-privue-900)_10%,var(--color-privue-900)_100%,transparent)] [mask-size:100%_100%] [mask-repeat:no-repeat] [--webkit-mask-image:linear-gradient(to_right,transparent,var(--color-privue-900)_10%,var(--color-privue-900)_90%,transparent)] [--webkit-mask-repeat:no-repeat] [--webkit-mask-size:100%_100%]">
                {/* hidden on mobile; visible md+ */}
                <img
                  src="/workflow-img.png"
                  alt="workflow illustration"
                  className="hidden md:block mt-12 h-auto w-full scale-110 rounded-[12px] object-cover shadow"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Section 2 -------------------- */
function SectionWorkspace() {
  return (
    <section className="font-open-sans bg-muted/30 relative mx-auto px-6 md:px-8">
      <div className="w-full space-y-6 px-0 md:space-y-8 md:px-6">
        <h2 className="max-w-3xl text-2xl leading-tight font-medium lg:text-3xl">
          <span className="text-privue-900">Workspace— </span>
          conversation workspace to ask, explore, and publish in one place
        </h2>

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-8">
          {/* Img Left — hidden on mobile */}
          <div className="order-2 flex justify-center md:order-1 md:w-1/2">
            <div className="flex h-full w-full items-center">
              {/* force a stable aspect and equal height */}
              <div className="flex h-full w-full items-center justify-center bg-transparent">
                {/* ChatAnimation removed on mobile: hidden md:block */}
                <div className="aspect-[4/3] h-full max-h-[400px] w-full hidden md:block">
                  <ChatAnimation className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="order-1 flex flex-col justify-center space-y-3 md:order-2 md:w-1/2">
            <p className="text-base">
              Use a natural-language interface to query your data, model outputs, and portfolio insights on
              demand. Ask a question, refine with follow-ups, and compare scenarios without writing SQL or
              waiting on a dashboard refresh.
            </p>
            <p className="text-base">
              Right-click any response to drop narratives, tables, or charts straight into a live report.
              Turn ad-hoc analysis into shareable updates in seconds, keeping audit trails of prompts,
              filters, and sources for governance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Feature
                icon={<Cpu className="h-4 w-4" />}
                title="Natural-language analysis"
                desc="Query data and models conversationally; pivot, filter, and drill down with plain English."
              />
              <Feature
                icon={<Zap className="h-4 w-4" />}
                title="One-click publishing"
                desc="Insert text, tables, or charts into live reports and presentations."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Section 3 -------------------- */
function SectionPlatform() {
  return (
    <section className="font-open-sans relative mx-auto px-6 md:px-8">
      <div className="w-full space-y-6 px-0 md:space-y-8 md:px-6">
        <h2 className="max-w-3xl text-2xl leading-tight font-medium lg:text-3xl">
          <span className="text-privue-900">Application— </span>platform to manage data, dashboards,
          and reporting
        </h2>

        {/* Use items-stretch so both columns match height */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Text Left */}
          <div className="space-y-3 md:w-1/2">
            <p className="text-base">
              The Platform is your control center when you do not have (or do not want to maintain)
              internal systems. Centralize data onboarding, quality checks, model configurations,
              user roles, and audit logs—then monitor everything from an interactive dashboard.
            </p>
            <p className="text-base">
              Arrange modular content blocks like Lego to assemble portals, review screens, and
              reports. Set pre-fill rules so recurring disclosures and future reports auto-generate
              with the latest data, while exception workflows route items to the right teams.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Feature
                icon={<Cpu className="h-4 w-4" />}
                title="All-in-one workspace"
                desc="Govern data, users, models, and dashboards with built-in access controls and audit trails."
              />
              <Feature
                icon={<Zap className="h-4 w-4" />}
                title="Composable reporting"
                desc="Drag-and-drop blocks with pre-fill rules that auto-create future reports."
              />
            </div>
          </div>

          {/* Img Right -> ImageCarousel (fills left column height). HIDDEN ON MOBILE */}
          <div className="flex items-start md:w-1/2">
            <div className="relative h-full w-full">
              {/* only show carousel md+ */}
              <div className="relative h-full w-full hidden md:block">
                <ImageCarousel
                  images={[
                    '/module-animations/ss1.png',
                    '/module-animations/ss2.png',
                    '/module-animations/ss3.png',
                    '/module-animations/ss4.png',
                  ]}
                  interval={2500}
                  imgClass="rounded-[12px] shadow"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Reusable Components -------------------- */
function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}

/* -------------------- ImageCarousel component (unchanged behavior, desktop-only via usage) -------------------- */
type ImageCarouselProps = {
  images: string[]; // array of image srcs
  interval?: number; // ms between slides
  className?: string; // applied to outer wrapper
  imgClass?: string; // applied to each <img>
  showDots?: boolean;
};

export function ImageCarousel({
  images,
  interval = 4000,
  className = '',
  imgClass = 'rounded-[12px] shadow',
  showDots = true,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (paused) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => clearInterval(id);
  }, [images.length, interval, paused]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* stacked images (crossfade) */}
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full items-start object-contain transition-opacity duration-700 ease-in-out ${i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'} ${imgClass}`}
          loading="lazy"
          aria-hidden="true"
          draggable={false}
        />
      ))}

      {/* optional dot indicators */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-opacity ${i === index ? 'opacity-100' : 'opacity-60'
                } bg-white`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
