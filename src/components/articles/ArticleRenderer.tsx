import TableOfContents from './TableOfContents';
import MetadataSidebar from './MetadataSidebar';

const components = {
    h1: (props: any) => (
        <h1
            className="text-3xl font-semibold  text-privue-800" {...props}
        />
    ),
    h2: (props: any) => (
        <h2
            className="text-2xl font-semibold scroll-mt-24 mt-[40px] mb-[15px] text-gray-800" {...props}
        />
    ),
    h3: (props: any) => (
        <h3
            className="text-xl font-medium mb-3 text-gray-700" {...props}
        />
    ),
    p: (props: any) => (
        <p
            className="text-[15px] text-pretty leading-7 mt-[15px] mb-[15px] text-gray-800" {...props}
        />
    ),
    ul: (props: any) => (
        <ul
            className="list-disc list-inside space-y-1 mt-[10px] mb-[20px] text-gray-800" {...props}
        />
    ),
    li: (props: any) => (
        <li className="ml-[32px] mt-[4px] marker:text-gray-800" {...props} />
    ),
    code: (props: any) => (
        <code
            className="bg-gray-100 text-gray-900 px-1 py-0.5 rounded text-sm" {...props}
        />
    ),
    pre: (props: any) => (
        <pre
            className="bg-gray-900 text-white text-sm font-mono p-4 rounded-lg mb-6 overflow-x-auto" {...props}
        />
    ),
    a: (props: any) => (
        <a
            className="text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    strong: (props: any) => (
        <strong
            className="font-semibold"
            {...props}
        />
    ),
};



interface ArticleRendererProps {
    metadata: {
        title: string;
        slug: string;
        summary: string;
        author: string;
        industry: string;
        date: string;
        tags: string[];
        articleType: string;
        solutionName?: string;
        solutionLink?: string;
        coverImage?: string;
    };
    Content: React.ComponentType<{ components: any }>;
    // Content: string;
}

import { useRef } from 'react';

export default function ArticleRenderer({ metadata, Content }: ArticleRendererProps) {
    console.log(metadata);

    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex px-6 md:px-4 py-0 gap-10">
            {/* metadata left sidebar */}
            <MetadataSidebar {...metadata} />
            {/* Main content */}
            <main className="flex-1 font-open-sans p-[32px]" ref={contentRef}>
                {/* <h1 className="text-3xl font-bold mb-8">{title}</h1> */}
                <Content components={components} />
            </main>
            {/* Sidebar */}
            <TableOfContents contentRef={contentRef as React.RefObject<HTMLElement>} />
        </div>
    );
}
