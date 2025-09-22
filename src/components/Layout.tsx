import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner"


export default function Layout({ children }: { children: React.ReactNode }) {

    const [headerVariant, setHeaderVariant] = useState<"light" | "dark">("light");

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section[data-theme]");
            let activeTheme: "light" | "dark" = "light";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const triggerPoint = window.innerHeight * 0.1; // halfway down viewport

                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    const theme = (section as HTMLElement).getAttribute("data-theme") as "light" | "dark";
                    activeTheme = theme;
                }
            });

            setHeaderVariant(activeTheme);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Run on mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return (
        <div className="relative">
            <div className={headerVariant === "dark" ? "dark" : ""}>
                <Header />
            </div>

            <main className="relative mt-[3rem] mb-[22rem] bg-background max-w-[1200px] mx-auto z-1 border-l border-r border-gray-200">{children}</main>
            <Toaster />
            <Footer />
        </div>
    )
}