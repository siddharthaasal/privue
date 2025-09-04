import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// If you're using shadcn/ui Button, uncomment the import below and swap <Link> wrapper accordingly
// import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="relative min-h-screen bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" />
            </div>

            <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                        <span className="inline-flex h-2 w-2 rounded-full bg-red-500/90" />
                        <span>Page not found</span>
                    </div>

                    {/* 404 headline */}
                    <h1 className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent md:text-8xl lg:text-9xl">
                        404
                    </h1>

                    <p className="mt-6 text-balance text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
                        Something’s missing.
                    </p>
                    <p className="mt-3 max-w-xl text-pretty text-base text-gray-600 dark:text-gray-400">
                        Sorry, we couldn’t find that page. You’ll find lots to explore on the homepage.
                    </p>

                    {/* Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.45 }}
                        className="mt-10 w-full max-w-md"
                        aria-hidden
                    >
                        <svg
                            viewBox="0 0 400 200"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-auto w-full drop-shadow-sm"
                        >
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>
                            <g fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                                <path d="M10 150 C 80 120, 140 180, 200 150 S 320 120, 390 150" stroke="url(#grad)" />
                                <circle cx="70" cy="70" r="26" className="opacity-70" />
                                <circle cx="330" cy="90" r="18" className="opacity-40" />
                                <rect x="140" y="55" width="120" height="60" rx="12" className="opacity-60" />
                                <path d="M160 85 h80" className="opacity-60" />
                            </g>
                        </svg>
                    </motion.div>

                    {/* Actions */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98] dark:shadow-primary/10"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Homepage
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-900/50"
                        >
                            Contact support
                        </Link>
                    </div>
                </motion.div>

                {/* Footer hint */}
                <p className="mt-12 text-xs text-gray-500 dark:text-gray-500">
                    Error code: <span className="font-mono">404_NOT_FOUND</span>
                </p>
            </div>
        </section>
    );
}
