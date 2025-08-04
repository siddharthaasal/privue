// grid background, announcement, heading, subtext, cta button

import { cn } from "../lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
    Announcement,
    AnnouncementTag,
    AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';

export default function HeroSection() {
    return (
        <section className="-mt-32 relative flex min-h-screen items-center justify-center rounded-lg p-6 md:p-20 dark:bg-black">
            {/* grid backgorund */}
            <GridPattern
                width={180}
                height={180}
                x={-1}
                y={-1}
                squares={[
                    [0, 5],
                    [6, 0],
                    [7, 1],
                    [8, 2],
                ]}
                className={cn(
                    "absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom_left,white,transparent)]"
                )}
            />

            {/* content -> (anouncement, heading+subtext, cta) */}
            <div className="relative flex flex-col items-center justify-center text-center gap-4 h-full">
                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center justify-center gap-4 mb-2"
                >
                    <Announcement>
                        <AnnouncementTag>New to Privue?</AnnouncementTag>
                        <AnnouncementTitle className="text-gray-700">
                            Start building clarity with your data →
                        </AnnouncementTitle>
                    </Announcement>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center px-4 w-full sm:w-[768px] md:w-[1152px]"
                >
                    <div className="text-center">
                        {/* <h1 className="text-[72px] font-bold leading-24 tracking-tight font-open-sans text-privue-900"> */}
                        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight font-open-sans text-black dark:text-white">
                            <span className="block">Empowering businesses</span>
                            {/* <span className="block text-privue-900">through</span> */}
                            <span className="block text-privue-900">through Intelligent Data</span>
                        </h1>
                    </div>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    // className="text-[24px] text-privue-600 font-medium font-open-sans max-w-2xl"
                    className="text-lg text-neutral-700 font-medium font-open-sans max-w-2xl dark:text-white"
                >
                    Discover data-backed signals for smarter decisions.
                    Mitigate risk and unlock high-value relationships.
                    {/* Access unparalleled business data and insights to identify new opportunities, mitigate risks, and build trusted relationships that drive your success. */}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
                >
                    <Button size="default">
                        <a href="/signup" className="font-open-sans">Get Started</a>
                    </Button>
                    <Button variant="outline" size="default">
                        <a href="/articles" className="font-open-sans shadow-text-md">Case Studies</a>
                    </Button>
                </motion.div>
            </div>

        </section >
    );
}
