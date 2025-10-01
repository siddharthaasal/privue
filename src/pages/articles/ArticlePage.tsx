/*
Header
Content | RightPane (Tags, TOC, Solution)
*/

import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from "react-router-dom";

import { articles, loaders } from "@/lib/articles";
// import { formatDate, siteUrl } from "@/lib/helpers";
import { formatDate } from "@/lib/helpers";
import mdxComponents from '@/lib/mdxComponents';

import Layout from "@/components/Layout";
import ArticleHeader from "@/components/articles/ArticleHeader";
// import RightPane from "@/components/articles/RightPane";
import RightPaneHeader from '@/components/articles/RightPaneHeader';
import RightPaneSticky from '@/components/articles/RightPaneSticky';

export default function ArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const meta = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

    const [MDX, setMDX] = useState<React.ComponentType<any> | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            const mod = await loaders[slug](); // created by your generator
            setMDX(() => mod.default);
        })();
    }, [slug]);

    if (!meta) {
        return (
            <Layout>
                <main className="relative min-h-screen">
                    <div className="container font-semibold text-4xl mx-auto p-8">Article not found.</div>
                </main>
            </Layout>
        );
    }

    // const shareUrl = `${siteUrl()}${meta.url}`;

    return (
        <Layout>
            <main className="relative min-h-screen">
                <div className="container mx-auto py-4 md:py-8 xl:py-10 px-4 sm:px-6 lg:px-42 xl:px-24 2xl:px-24">
                    <div className="grid grid-cols-12 gap-4">

                        <div className="col-span-12 xl:col-span-12">

                            <div className="mt-0 pt-0 mb-8 max-w-5xl space-y-4">
                                <ArticleHeader
                                    title={meta.title}
                                    readTime={meta.readTime}
                                    date={formatDate(meta.date)}
                                />
                            </div>

                            <div className="grid grid-cols-12 lg:gap-14  xl:gap-10 mb-12">
                                <div className="col-span-12 lg:col-span-8 xl:col-span-8 font-open-sans">
                                    <div ref={contentRef}>
                                        <article className="prose prose-docs max-w-none">
                                            {MDX ? <MDX components={mdxComponents} /> : <div>Loading…</div>}
                                        </article>
                                    </div>
                                </div>


                                {/* Right column (visible from lg+) */}
                                <aside className="hidden lg:block col-span-12 lg:col-span-3 xl:col-span-3 xl:col-start-10 space-y-8">
                                    {/* Non-sticky header */}
                                    <RightPaneHeader articleType={meta.articleType} tags={meta.tags} />

                                    {/* Sticky group: TOC + Solution + Share */}
                                    <RightPaneSticky
                                        solution={{ name: meta.solutionName, link: meta.solutionLink }}
                                        // share={{ url: shareUrl, title: meta.title }}
                                        contentRef={contentRef as React.RefObject<HTMLElement>}
                                    />
                                </aside>


                            </div>
                        </div>
                    </div >
                </div >

            </main >
        </Layout >
    );
}
