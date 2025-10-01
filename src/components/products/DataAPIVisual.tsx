import darkDots from '/products/dark-dots.svg';
// import lightDots from "/products/white-dots.svg";
import { VectorSquare } from 'lucide-react';
import { Badge } from '../ui/badge';
import hqDots from '/data-apis-lines-light.svg';

export default function DataAPIVisual() {
  return (
    <a
      href="/solution"
      className="bg-background-lighter group relative block h-[316px] w-[267.7px] overflow-hidden rounded-xl border border-[#2e2e2e] p-6 shadow-xs transition-shadow select-none hover:border-[#494949] hover:shadow-md"
    >
      {/* tags */}
      <div className="text-foreground-lighter absolute right-0 bottom-[4%] left-0 z-10 grid w-full grid-cols-2 gap-x-0 gap-y-20 text-center text-sm">
        <span className="translate-x-4">
          <Badge className="bg-background-lighter text-foreground hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default border-1 border-[#2e2e2e] py-1 text-xs font-normal">
            Logs
          </Badge>
        </span>
        <span className="translate-x-2">
          <Badge className="bg-background-lighter text-foreground hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default border-1 border-[#2e2e2e] py-1 text-xs font-normal">
            Profiles
          </Badge>
        </span>
        <span className="-translate-x-4">
          <Badge className="bg-background-lighter text-foreground hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default border-1 border-[#2e2e2e] py-1 text-xs font-normal">
            Traces
          </Badge>
        </span>
        <span className="-translate-x-5">
          <Badge className="bg-background-lighter text-foreground hover:border-privue-500 hover:bg-background hover:text-privue-700 cursor-default border-1 border-[#2e2e2e] py-1 text-xs font-normal">
            Metrics
          </Badge>
        </span>
      </div>
      {/* Animated dots background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="group-hover:animate-marquee-reverse absolute right-0 -bottom-22 left-0 flex scale-150 opacity-80 transition-opacity will-change-transform group-hover:opacity-100">
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
              src={hqDots}
              alt=""
              width={330}
              height={430}
              className="object-contain"
              draggable={false}
            />
            <img
              src={hqDots}
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
      <div className="relative z-10 mb-2 flex flex-row items-center gap-2">
        <VectorSquare size="14" className="text-black dark:text-white" />
        <h3 className="text-foreground text-base font-normal">Real-time telemetry</h3>
      </div>

      <p className="text-foreground-lighter relative z-10 mb-4 text-sm">
        <span className="text-foreground font-normal">Capture 100%</span> of logs, metrics, traces,
        and profiles as they happen, eliminating any blind spots.
      </p>

      {/* Tags */}
    </a>
  );
}
