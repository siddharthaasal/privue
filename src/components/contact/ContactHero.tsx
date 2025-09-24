// import { Announcement } from "../ui/shadcn-io/announcement";
// import CalMeetingPopup from "./CalMeetingPopup";


export default function ContactHero({
    title = "Contact",
    subtitle = "Talk to us about:",
    bullets = [
        "Private Company Intelligence",
        "Financial Data Analysis",
        "Credit & other Risk Models",
        "Climate & Sustainability Scoring",
        "Sanctions & Compliance Checks"
    ],
}) {
    return (
        <section className="text-left">
            <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-gray-900 md:text-5xl">
                {title}
                {" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-privue-950 to-privue-900 via-privue-800 font-semibold">
                    Us
                </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600">{subtitle}</p>

            <ul className="mt-4 space-y-2">
                {bullets.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1 text-privue-900">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </span>
                        <span className="text-base text-gray-700">{item}</span>
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
