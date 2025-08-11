// grid background, announcement, heading, subtext, cta button
// import { useEffect } from "react";
import { useState, useRef } from "react";
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

    // const [squares, setSquares] = useState<[number, number][]>([]);


    // useEffect(() => {
    //     const updateSquares = () => {
    //         const vw = window.innerWidth;
    //         const vh = window.innerHeight;

    //         const gridWidth = 180;
    //         const gridHeight = 180;

    //         const cols = Math.floor(vw / gridWidth);
    //         const rows = Math.floor(vh / gridHeight);

    //         const result: [number, number][] = [];

    //         for (let i = 0; i < cols; i++) {
    //             for (let j = 0; j < rows; j++) {
    //                 // Just pick some to highlight, or randomize
    //                 if (Math.random() < 0.06) result.push([i, j]);
    //                 // const n = perlin2(i * noiseScale, j * noiseScale);
    //                 // if (n > threshold) result.push([i, j]);
    //             }
    //         }

    //         setSquares(result);
    //     };

    //     updateSquares();
    //     window.addEventListener("resize", updateSquares);

    //     return () => window.removeEventListener("resize", updateSquares);
    // }, []);

    const demos = [
        { label: "Systems", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" },
        { label: "AI", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" },
        { label: "Security", video: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.IN.webm", poster: "https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/static/hero@2x.IN.jpg" }
    ];

    const [activeDemo, setActiveDemo] = useState(demos[0]);

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        setIsPlaying(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 100); // slight delay to ensure render
    };

    return (
        <section className="relative flex mx-auto items-center min-h-screen justify-center bg-background my-auto">
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
                // squares={squares}
                className={cn(
                    "absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_left,white,transparent)]"
                )}
            />


            {/* content -> (anouncement, heading+subtext, cta) */}
            <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-36 xl:px-24 2xl:px-6 py-0 max-w-[1280px] gap-4 h-full mt-32 mb-32 2xl:mt-44 2xl:mb-44">
                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center justify-center gap-4 mb-2"
                >
                    <a href="#">
                        <Announcement>
                            <AnnouncementTag>New to Privue?</AnnouncementTag>
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
                    className="flex justify-center px-4 w-full sm:w-[768px] md:w-[1152px]"
                >
                    <div className="text-center">
                        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-foreground leading-tight">
                            <span className="block">Empowering businesses</span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-privue-900 to-privue-900 via-privue-700">through Intelligent Data</span>
                        </h1>
                    </div>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg text-foreground font-medium max-w-2xl"
                >
                    Discover data-backed signals for smarter decisions.
                    Mitigate risk and unlock high-value relationships.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
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
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 w-full max-w-[1000px] px-4 "
                >
                    <div className="w-full max-w-[1000px] mx-auto px-4">
                        {/* Tabs */}
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

                        {/* Gradient + Video */}
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

                        {/* <div className="relative mt-4 h-auto">
                            <div className="absolute -inset-4 rounded-sm bg-gradient-to-r from-privue-500/40 via-privue-700/30 to-privue-500/40 blur-2xl opacity-80" />
                            <div className="relative overflow-hidden bg-background border border-black/10 shadow-lg h-full">
                                <video
                                    key={activeDemo.video}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    poster={activeDemo.poster}
                                    className="w-full aspect-video object-cover"
                                >
                                    <source src={activeDemo.video} type="video/mp4" />
                                </video>
                            </div>
                        </div> */}
                    </div>
                </motion.div>



            </div>

        </section >
    );
}
