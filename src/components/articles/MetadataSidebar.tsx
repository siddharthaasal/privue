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
        <div className='border-r'>
            <aside className="hidden md:block w-64  sticky top-25 h-[calc(100vh-1rem)] overflow-y-auto bg-white ">
                <div className=' sticky '>
                    <div className="font-open-sans text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mb-4">
                        Overview
                    </div>

                    <div className="font-open-sans text-[13px] space-y-3  text-gray-800 dark:text-gray-200">
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
                                <span className="font-medium text-gray-500 dark:text-gray-400">Privue's Solution:</span>
                                <div>
                                    {metadata.solutionLink ? (
                                        <a
                                            href={metadata.solutionLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 underline"
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
                            <div className="flex flex-wrap gap-2 mt-1">
                                {metadata.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-100 px-2 py-1 rounded-md text-xs"
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