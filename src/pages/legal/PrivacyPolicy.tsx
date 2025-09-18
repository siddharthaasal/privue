import Layout from "@/components/Layout";
import mdxComponents from '@/lib/mdxComponents';
// import Content from '@data/legal/privacy.mdx';
import Content from '../../data/legal/privacy-policy.mdx'
import { useRef } from 'react';

export default function PrivacyPolicy() {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <Layout>
            <div className="w-4/5 sm:py-18 relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20">
                <div ref={contentRef}>
                    <article className="prose prose-docs max-w-none">
                        <Content components={mdxComponents} />
                    </article>
                </div>
            </div>

        </Layout>
    );
}
