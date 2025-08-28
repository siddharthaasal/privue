import TableOfContents from "@/components/articles/TableOfContents";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link as LinkIcon } from "lucide-react";

export default function RightPaneSticky({
    solution,
    share,
    contentRef,
}: {
    solution?: { name?: string | null; link?: string | null };
    share: { url: string; title: string };
    contentRef: React.RefObject<HTMLElement>;
}) {
    const encodedUrl = encodeURIComponent(share.url);
    const encodedTitle = encodeURIComponent(share.title);

    return (
        // This wrapper sticks relative to the viewport (top offset matches your header)
        <div className="sticky top-20">
            {/* If content gets taller than viewport, it will scroll INSIDE while staying stuck */}
            <div className="space-y-8 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <TableOfContents contentRef={contentRef} />

                <div>
                    <a
                        href={`/${solution?.link}`}
                        className="inline-flex text-[15px] items-center gap-1 text-privue-700 hover:text-privue-900"
                    >
                        <LinkIcon size={14} />
                        Solution
                    </a>
                </div>

                <div className="hidden lg:block">
                    <div className="font-open-sans flex items-center gap-2 mb-4 text-[15px] p-0 text-[#171717] tracking-wide">
                        Share this Article
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <a
                            aria-label="Share on LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground-lighter hover:text-foreground"
                            href={`https://www.linkedin.com/shareArticle?url=${encodedUrl}&text=${encodedTitle}`}
                        >
                            <FaLinkedin className="text-[#707070] text-lg hover:text-[#525252]" />
                        </a>
                        <a
                            aria-label="Share on X"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground-lighter hover:text-foreground"
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                        >
                            <FaXTwitter className="text-[#707070] text-lg hover:text-[#525252]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
