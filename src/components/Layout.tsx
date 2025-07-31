// holds header
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className="mt-32 h-screen">
                {children}
            </main>
            <Footer />
        </div>
    )
}