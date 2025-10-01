import TableOfContents from '@/components/articles/TableOfContents';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link as LinkIcon } from 'lucide-react';

type RightPaneProps = {
  articleType?: string | null;
  tags?: string[];
  solution?: { name?: string | null; link?: string | null };
  share: { url: string; title: string };
  contentRef: React.RefObject<HTMLElement>;
};

export default function RightPane({
  articleType,
  tags = [],
  solution,
  share,
  contentRef,
}: RightPaneProps) {
  const encodedUrl = encodeURIComponent(share.url);
  const encodedTitle = encodeURIComponent(share.title);
  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          {/* articleType */}
          <div className="bg-opacity-10 bg-surface-200 text-privue-700 border-privue-500 border-strong inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px]">
            {articleType}
          </div>

          {/* tags */}
          {!!tags.length && (
            <div className="flex flex-wrap gap-2 select-none">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-opacity-10 bg-surface-200 border-strong inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] text-[#505050]"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky top-20 space-y-8">
          {/* toc */}
          <div>
            <TableOfContents contentRef={contentRef} />
          </div>

          <div>
            <a
              href={`/${solution?.link}`}
              className="text-privue-700 hover:text-privue-900 inline-flex items-center gap-1 text-[15px]"
            >
              <LinkIcon size={14} />
              Solution
            </a>
          </div>

          {/* share */}
          <div className="hidden lg:block">
            <div className="font-open-sans mb-4 flex items-center gap-2 p-0 text-[15px] tracking-wide text-[#171717]">
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
                <FaLinkedin className="text-lg text-[#707070] hover:text-[#525252]" />
              </a>
              <a
                aria-label="Share on X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-lighter hover:text-foreground"
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              >
                <FaXTwitter className="text-lg text-[#707070] hover:text-[#525252]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
