import Layout from "@/components/Layout";
import TableOfContents from "@/components/articles/TableOfContents";
import { ChevronLeft, Link } from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ArticleHeader from "@/components/articles/ArticleHeader";

import mdxComponents from '@/lib/mdxComponents';
// import Content, { metadata } from '@/data/articles/cs1.mdx';
import Content from '@/data/articles/supabaseBlog.mdx';
// import { generateReadingTime } from "@/lib/helpers";
import { useRef } from 'react';

export default function ArticlePage() {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <Layout>
            <main className="relative min-h-screen">
                <div className="container mx-auto px-4 py-4 md:py-8 xl:py-10 sm:px-16 xl:px-20">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Left Sidebar (Back link) - visible only on xl+ */}
                        <div className="hidden xl:block xl:col-span-2">
                            <a href="/articles" className="flex items-center cursor-pointer text-sm text-[#707070] hover:text-[#171717]">
                                <ChevronLeft size={18} className="p-0" />
                                <p className="ml-2">Back</p>
                            </a>
                        </div>

                        {/* Main Content Area */}
                        <div className="col-span-12 xl:col-span-10">
                            {/* Header */}
                            <div className="mb-8 max-w-5xl space-y-4">
                                <ArticleHeader
                                    title="Storage: 10x Larger Uploads, 3x Cheaper Cached Egress, and 2x Egress Quota"
                                    date="Aug 05, 2024"
                                    author="Saurabh Verma"
                                    articleType="Case Study"
                                />
                            </div>

                            {/* Content + TOC */}
                            <div className="grid grid-cols-12 lg:gap-16  xl:gap-8 mb-12">
                                {/* Main Article */}
                                <div className="ccol-span-12 lg:col-span-7 xl:col-span-7 font-open-sans prose prose-docs">
                                    <div ref={contentRef}>
                                        <article className="prose prose-docs">
                                            <Content components={mdxComponents} />
                                        </article>
                                    </div>
                                </div>

                                {/* TOC Sidebar */}
                                <div className="hidden relative col-span-12 space-y-8 lg:block lg:col-span-5 xl:col-span-3 xl:col-start-9">
                                    {/* tags */}
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-privue-700 border border-privue-700 border-strong px-2.5 py-0.5 text-[11px] gap-1">
                                            Solution
                                            <Link size={10} color="#5c7cfa" />
                                        </div>

                                        <div className="flex flex-wrap gap-2 select-none">

                                            <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-[#505050] border border-strong px-2.5 py-0.5 text-[11px]">launch-week</div>
                                            <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-[#505050] border border-strong px-2.5 py-0.5 text-[11px]">tag</div>
                                            <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-[#505050] border border-strong px-2.5 py-0.5 text-[11px]">another tag</div>

                                        </div>
                                    </div>

                                    {/* share */}
                                    <div className="hidden lg:block">
                                        <div className=" font-open-sans flex items-center gap-2 mb-4 text-[15px] p-0 text-[#171717] tracking-wide">
                                            Share this Article
                                        </div>
                                        <div className="mt-4 flex items-center gap-2">
                                            {/* Share on LinkedIn */}
                                            <a
                                                aria-label="Share on LinkedIn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-foreground-lighter hover:text-foreground"
                                                href="https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fsupabase.com%2Fblog%2Fstorage-500gb-uploads-cheaper-egress-pricing&text=Storage%3A%2010x%20Larger%20Uploads%2C%203x%20Cheaper%20Cached%20Egress%2C%20and%202x%20Egress%20Quota"
                                            >
                                                <FaLinkedin className="text-[#707070] text-lg hover:text-[#525252]" />
                                            </a>

                                            {/* Share on X */}
                                            <a
                                                aria-label="Share on X"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-foreground-lighter hover:text-foreground"
                                                href="https://twitter.com/intent/tweet?url=https://supabase.com/blog/storage-500gb-uploads-cheaper-egress-pricing"
                                            >
                                                <FaXTwitter className="text-[#707070] text-lg hover:text-[#525252]" />
                                            </a>


                                        </div>
                                    </div>
                                    {/* toc */}
                                    <div className="sticky top-20">
                                        <TableOfContents
                                            contentRef={contentRef as React.RefObject<HTMLElement>}
                                            borderPlacement="l"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </Layout>
    );
}
