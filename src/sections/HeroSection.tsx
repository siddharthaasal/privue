// grid background, announcement, heading, subtext, cta button
// import { useEffect } from "react";
// import { useState, useRef } from "react";
// import { cn } from "../lib/utils";
// import { GridPattern } from "@/components/magicui/grid-pattern";
// import { DotPattern } from "@/components/ui/shadcn-io/dot-pattern";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
    Announcement,
    AnnouncementTag,
    AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';

export default function HeroSection() {

    // const demos = [
    //     { label: "Systems", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" },
    //     { label: "AI", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" },
    //     { label: "Security", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" }
    // ];

    // const [activeDemo, setActiveDemo] = useState(demos[0]);

    // const [isPlaying, setIsPlaying] = useState(false);
    // const videoRef = useRef<HTMLVideoElement>(null);

    // const handlePlay = () => {
    //     setIsPlaying(true);
    //     setTimeout(() => {
    //         videoRef.current?.play();
    //     }, 100); // slight delay to ensure render
    // };

    return (
        <section className="flex flex-col items-center justify-center text-center">
            {/* grid backgorund */}
            {/* <GridPattern
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
                // squares={squares}
                className={cn(
                    "absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_left,white,transparent)]"
                )}
            /> */}




            {/* content -> (anouncement, heading+subtext, cta) */}
            <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-36 xl:px-24 2xl:px-6 py-0 max-w-[1280px] gap-4 h-full my-24 ">
                {/* Banner */}
                <motion.div
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
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className=""
                >
                    <div className="text-center">
                        {/* <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-foreground leading-tight"> */}
                        <h1 className="inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl font-semibold tracking-tighter leading-tight text-transparent sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300">
                            Empowering business
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-privue-900 to-privue-900 via-privue-700">through Intelligent Data</span>
                        </h1>
                    </div>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                // className="text-lg text-foreground font-medium max-w-2xl"
                >
                    <p className="mt-4 max-w-lg text-lg text-gray-700 dark:text-gray-400">
                        Discover data-backed signals for smarter decisions.
                        Mitigate risk and unlock high-value relationships.
                    </p>

                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
                >

                    <a href="/#">
                        <Button variant="default" size="default" className="cursor-pointer text-sm text-[#FAFAFA]">
                            <p>Get Started</p>
                        </Button>
                    </a>
                    <a href="/articles">
                        <Button variant="outline" size="default" className="cursor-pointer">
                            <p>Case Studies</p>
                        </Button>
                    </a>

                </motion.div>

                {/* Demo Video */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 w-full max-w-[1000px] px-4 "
                >
                    <div className="w-full max-w-[1000px] mx-auto px-4">
                        <div className="flex justify-center gap-8">
                            {demos.map(demo => (
                                <button
                                    key={demo.label}
                                    onClick={() => setActiveDemo(demo)}
                                    className={`pb-2 text-sm 2xl:text-base cursor-pointer transition-colors font-semibold ${activeDemo.label === demo.label
                                        ? "text-foreground underline underline-offset-2"
                                        : "text-foreground-lighter hover:text-foreground"
                                        }`}
                                >
                                    {demo.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative mt-4 h-full">
                            <div className="absolute -inset-4 rounded-sm bg-gradient-to-r from-privue-500/50 via-privue-700/40 to-privue-500/50 blur-2xl opacity-80" />

                            <div className="relative overflow-hidden rounded-xl bg-background border border-black/10 shadow-lg h-full">
                                <video
                                    ref={videoRef}
                                    key={activeDemo.video}
                                    controls
                                    poster={activeDemo.poster}
                                    className="w-full h-full object-cover"
                                >
                                    <source src={activeDemo.video} type="video/mp4" />
                                </video>

                                {!isPlaying && (
                                    <button
                                        onClick={handlePlay}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="white"
                                            viewBox="0 0 24 24"
                                            className="w-16 h-16"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>                        
                    </div>
                </motion.div> */}

                <div
                    className="relative mx-auto ml-3 mt-20 h-fit w-[40rem] max-w-6xl animate-slide-up-fade sm:ml-auto sm:w-full sm:px-2"
                    style={{ animationDuration: "1400ms" }}
                >
                    <div className="rounded-2xl bg-slate-50/40 p-2 ring-1 ring-inset ring-slate-200/50 dark:bg-gray-900/70 dark:ring-white/10">
                        <div className="rounded-xl bg-white ring-1 ring-slate-900/5 dark:bg-slate-950 dark:ring-white/15">
                            <img
                                src="/hero-light.webp"
                                alt="A preview of the Database web app"
                                width={2400}
                                height={1600}
                                className="rounded-xl shadow-2xl dark:shadow-indigo-600/10"
                            />
                        </div>
                    </div>

                </div>



            </div>

        </section >

    );
}