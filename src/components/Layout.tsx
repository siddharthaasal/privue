// holds header
import React from "react";
// import { cn } from "../lib/utils";
// import { GridPattern } from "@/components/magicui/grid-pattern";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
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
                className={cn(
                    "fixed inset-0 -z-10 opacity-60 pointer-events-none",
                    "[mask-image:linear-gradient(to_bottom_left,white,transparent)]"
                )}
            /> */}
            <div className="">
                <Header />
                <main className="mt-32">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}