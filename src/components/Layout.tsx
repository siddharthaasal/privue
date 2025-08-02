// holds header
import React from "react";
// import { cn } from "../lib/utils";
// import { GridPattern } from "@/components/magicui/grid-pattern";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="">
                <Header />
                <main className="mt-20">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}