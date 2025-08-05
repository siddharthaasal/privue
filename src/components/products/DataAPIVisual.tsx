import darkDots from "/products/dark-dots.svg";
import lightDots from "/products/white-dots.svg";
import { VectorSquare } from 'lucide-react';
import { Badge } from "../ui/badge";

export default function DataAPIVisual() {
    return (
        <a
            href="#"
            className="relative select-none block p-6 rounded-xl shadow-xs overflow-hidden border-[#2e2e2e] border-[0.5px] hover:shadow-md hover:border-[#494949] transition-shadow bg-background group aspect-[330/390]"
        >
            {/* tags */}
            <div className="absolute  w-full text-center left-0 right-0 bottom-[9%] z-10 grid grid-cols-2 gap-14 gap-x-0 text-sm text-foreground-lighter">
                <span className="translate-x-4">
                    <Badge
                        className="bg-background-lighter text-foreground border-[#2e2e2e] border-1 py-1 text-xs font-normal hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default"
                    >
                        Logs
                    </Badge>
                </span>
                <span className="translate-x-2">
                    <Badge
                        className="bg-background-lighter text-foreground border-[#2e2e2e] border-1 py-1 text-xs font-normal hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default"
                    >
                        Profiles
                    </Badge>
                </span>
                <span className="-translate-x-4">
                    <Badge
                        className="bg-background-lighter text-foreground border-[#2e2e2e] border-1 py-1 text-xs font-normal hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default"
                    >
                        Traces
                    </Badge>
                </span>
                <span className="-translate-x-5">
                    <Badge
                        className="bg-background-lighter text-foreground border-[#2e2e2e] border-1 py-1 text-xs font-normal hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default"
                    >
                        Metrics
                    </Badge>
                </span>
            </div>
            {/* Animated dots background */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 flex will-change-transform scale-150 opacity-10 group-hover:opacity-20 transition-opacity group-hover:animate-marquee-reverse">
                    {/* Light Mode */}
                    <div className="flex dark:hidden">
                        <img
                            src={darkDots}
                            alt=""
                            width={330}
                            height={430}
                            className="object-contain"
                            draggable={false}
                        />
                        <img
                            src={darkDots}
                            alt=""
                            width={330}
                            height={430}
                            className="object-contain"
                            draggable={false}
                        />
                    </div>

                    {/* Dark Mode */}
                    <div className="hidden dark:flex">
                        <img
                            src={lightDots}
                            alt=""
                            width={330}
                            height={430}
                            className="object-contain"
                            draggable={false}
                        />
                        <img
                            src={lightDots}
                            alt=""
                            width={330}
                            height={430}
                            className="object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>





            {/* Content */}
            <div className="flex flex-row items-center gap-2 mb-2 relative z-10">
                <VectorSquare size="14" className="text-black dark:text-white" />
                <h3 className="text-base font-normal text-foreground ">
                    Real-time telemetry
                </h3>
            </div>

            <p className="text-sm text-foreground-lighter mb-4 relative z-10">
                <span className="font-normal text-foreground">Capture 100%</span> of logs, metrics, traces, and profiles as they happen, eliminating any blind spots.
            </p>

            {/* Tags */}

        </a >
    )
}
