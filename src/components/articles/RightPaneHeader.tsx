export default function RightPaneHeader({
    articleType,
    tags = [],
}: { articleType?: string | null; tags?: string[] }) {
    return (
        <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-privue-700 border border-privue-500 border-strong px-2.5 py-0.5 text-[11px]">
                {articleType}
            </div>

            {!!tags.length && (
                <div className="flex flex-wrap gap-2 select-none">
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-[#505050] border border-strong px-2.5 py-0.5 text-[11px]"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
