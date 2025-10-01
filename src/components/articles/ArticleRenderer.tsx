import TableOfContents from './TableOfContents';
import MetadataSidebar from './MetadataSidebar';

const components = {
  h1: (props: any) => <h1 className="text-privue-800 text-3xl font-semibold" {...props} />,
  h2: (props: any) => (
    <h2
      className="mt-[40px] mb-[15px] scroll-mt-24 text-2xl font-semibold text-gray-800"
      {...props}
    />
  ),
  h3: (props: any) => <h3 className="mb-3 text-xl font-medium text-gray-700" {...props} />,
  p: (props: any) => (
    <p className="mt-[15px] mb-[15px] text-[15px] leading-7 text-pretty text-gray-800" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mt-[10px] mb-[20px] list-inside list-disc space-y-1 text-gray-800" {...props} />
  ),
  li: (props: any) => <li className="mt-[4px] ml-[32px] marker:text-gray-800" {...props} />,
  code: (props: any) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-900" {...props} />
  ),
  pre: (props: any) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-white"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-gray-700 underline underline-offset-2 transition-colors hover:text-gray-900"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
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
    <div className="flex gap-10 px-6 py-0 md:px-4">
      {/* metadata left sidebar */}
      <MetadataSidebar {...metadata} />
      {/* Main content */}
      <main className="font-open-sans flex-1 p-[32px]" ref={contentRef}>
        {/* <h1 className="text-3xl font-bold mb-8">{title}</h1> */}
        <Content components={components} />
      </main>
      {/* Sidebar */}
      <TableOfContents contentRef={contentRef as React.RefObject<HTMLElement>} />
    </div>
  );
}
