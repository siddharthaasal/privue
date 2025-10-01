export default function RightPaneHeader({
  articleType,
  tags = [],
}: {
  articleType?: string | null;
  tags?: string[];
}) {
  return (
    <div className="space-y-4">
      <div className="bg-opacity-10 bg-surface-200 text-privue-700 border-privue-500 border-strong inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px]">
        {articleType}
      </div>

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
  );
}
