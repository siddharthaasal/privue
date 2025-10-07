import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// import {
//     Announcement,
//     AnnouncementTag,
//     AnnouncementTitle,
// } from '@/components/ui/shadcn-io/announcement';

import Marquee from 'react-fast-marquee';
import FlowNodesExample from '@/pages/Workflow';

export default function HeroSection() {
  const logos = [
    '/integration-logos/ikanoon.png',
    '/integration-logos/SAP-Logo.png',
    '/integration-logos/logo-dnb.svg',
    '/integration-logos/myGate_cr.png',
    '/integration-logos/salesforce.png',
    '/integration-logos/myPaisa.svg',
    '/integration-logos/zoho.png',
  ];

  return (
    <section className="flex flex-col items-center justify-center text-center">
      {/* content -> (anouncement, heading+subtext, cta) */}
      <div className="relative my-24 flex h-full max-w-[1280px] flex-col items-center justify-center gap-4 px-4 py-0 text-center sm:px-6 lg:px-36 xl:px-24 2xl:px-6">
        {/* Banner */}
        {/* <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center justify-center"
                >
                    <a href="#">
                        <Announcement>
                            <AnnouncementTag className="">New to Privue?</AnnouncementTag>
                            <AnnouncementTitle className="text-foreground-lighter">
                                Start building clarity with your data →
                            </AnnouncementTitle>
                        </Announcement>
                    </a>
                </motion.div> */}

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=""
        >
          <div className="text-center">
            {/* <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-foreground leading-tight"> */}
            <h1 className="inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl leading-tight font-semibold tracking-tighter text-transparent sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300">
              Empowering business
              <br />
              <span className="from-privue-900 to-privue-900 via-privue-700 bg-gradient-to-b bg-clip-text text-transparent">
                through Intelligent Data
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        // className="text-lg text-foreground font-medium max-w-2xl"
        >
          <p className="mt-4 max-w-lg text-lg text-gray-700 dark:text-gray-400">
            Discover data-backed signals for smarter decisions. Mitigate risk and unlock high-value
            relationships.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#industries-section">
            <Button
              variant="default"
              size="default"
              className="cursor-pointer text-sm text-[#FFF]"
            >
              <p>Browse Solutions</p>
            </Button>
          </a>
          <a href="/articles">
            <Button variant="outline" size="default" className="cursor-pointer">
              <p>Case Studies</p>
            </Button>
          </a>
        </motion.div>

        <section className="pt-20">
          {/* Layout container */}
          <div className="mx-auto max-w-6xl px-4">
            {/* Clip the moving track so it doesn't overflow your layout */}
            <div className="relative overflow-hidden rounded-xl">
              <Marquee
                className="w-full"
                speed={50}
                pauseOnHover
                gradient
                gradientWidth={48}
                autoFill // duplicate logos to avoid empty gaps
              >
                {logos.map((src, i) => (
                  <div
                    key={i}
                    /* mobile: smaller gap & narrower items; sm+: keep original spacing */
                    className="mx-6 flex h-14 w-[120px] min-w-[64px] items-center justify-center sm:mx-10 sm:w-40"
                  >
                    {/* ensure image never overflows its container on small screens */}
                    <img
                      src={src}
                      alt="integration logo"
                      className="h-10 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* Master Workflow Animation */}
        <div
          className="animate-slide-up-fade relative mx-auto mt-20 ml-3 h-fit w-full max-w-7xl sm:ml-auto sm:w-full sm:px-2"
          style={{ animationDuration: '1400ms' }}
        >
          <div className="rounded-2xl bg-slate-50/40 p-2 ring-1 ring-slate-200/50 ring-inset dark:bg-gray-900/70 dark:ring-white/10">
            <div className="rounded-xl bg-white ring-1 ring-slate-900/5 dark:bg-slate-950 dark:ring-white/15">
              <div className="h-[30rem] w-full rounded-xl p-4 shadow-2xl dark:shadow-indigo-600/10">
                <FlowNodesExample />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
