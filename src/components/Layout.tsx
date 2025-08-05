// holds header
import React from "react";
// import { cn } from "../lib/utils";
// import { GridPattern } from "@/components/magicui/grid-pattern";
import Header from "./Header";
import Footer from "./Footer";
// import DarkHeader from "./DarkHeader";

export default function Layout({
    children,
    headerVariant = 'light',
}: {
    children: React.ReactNode;
    headerVariant?: 'light' | 'dark';
}) {
    return (
        <div className="relative">
            <div className={headerVariant === 'dark' ? 'dark' : ''}>
                <Header />
            </div>

            <main className="relative mt-36 mb-96 bg-background z-1">{children}</main>
            <Footer />
        </div>
    );
}
