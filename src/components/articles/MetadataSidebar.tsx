interface MetadataProps {
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
}

export default function MetadataSidebar(metadata: MetadataProps) {
  return (
    <div className="border-r">
      <aside className="sticky top-25 hidden h-[calc(100vh-1rem)] w-64 overflow-y-auto bg-white md:block">
        <div className="sticky">
          <div className="font-open-sans mb-4 text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
            Overview
          </div>

          <div className="font-open-sans space-y-3 text-[13px] text-gray-800 dark:text-gray-200">
            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Title:</span>
              <div>{metadata.title}</div>
            </div>

            {/* <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">Summary:</span>
                    <div>{metadata.summary}</div>
                </div> */}

            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Author:</span>
              <div>{metadata.author}</div>
            </div>

            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Published:</span>
              <div>{metadata.date}</div>
            </div>

            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Article Type:</span>
              <div>{metadata.articleType}</div>
            </div>

            {metadata.solutionName && (
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  Privue's Solution:
                </span>
                <div>
                  {metadata.solutionLink ? (
                    <a
                      href={metadata.solutionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline dark:text-blue-400"
                    >
                      {metadata.solutionName}
                    </a>
                  ) : (
                    metadata.solutionName
                  )}
                </div>
              </div>
            )}

            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Tags:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-zinc-700 dark:text-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
