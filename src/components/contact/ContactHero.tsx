// import { Announcement } from "../ui/shadcn-io/announcement";
// import CalMeetingPopup from "./CalMeetingPopup";

import { Minus } from 'lucide-react';

export default function ContactHero({
  title = 'Contact',
  subtitle = 'Talk to us about:',
  bullets = [
    'Private Company Intelligence',
    'Financial Data Analysis',
    'Credit & other Risk Models',
    'Climate & Sustainability Scoring',
    'Sanctions & Compliance Checks',
  ],
}) {
  return (
    <section className="text-left">
      {/* slightly smaller base heading for mobile, identical md: size preserved */}
      <h2 className="text-2xl leading-[1.05] font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
        {title}{' '}
        <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
          Us
        </span>
      </h2>

      <p className="mt-4 hidden text-base text-gray-600 sm:mt-6 sm:text-lg md:block">{subtitle}</p>
      <div className="mt-3 md:hidden">
        <p className="text-sm text-gray-700">
          Reach out to explore how we can support you with company insights, risk modeling,
          financial analytics, and sustainability scoring.
        </p>
      </div>
      {/* tighter spacing on mobile */}
      <ul className="mt-3 hidden space-y-1 sm:mt-4 sm:space-y-2 md:block">
        {bullets.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-privue-900 w-4">
              <Minus size={18} />
            </span>
            <span className="text-sm text-gray-700 sm:text-base">{item}</span>
          </li>
        ))}
      </ul>

      {/* Neat pill announcement placed right under bullets */}
      {/* <div className="mt-5">
                <Announcement className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-3 py-2 shadow-sm">
                    <CalMeetingPopup />
                </Announcement>
            </div> */}
    </section>
  );
}
