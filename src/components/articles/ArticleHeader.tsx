// ArticleHeader.tsx
import { User, CalendarDays, Timer, Link as LinkIcon } from "lucide-react";
import ArticleBreadcrumbs from "./ArticleBreadcrumbs";

type ArticleHeaderProps = {
    title: string;
    author: string;
    date: string;
};



export default function ArticleHeader({
    title,
    author,
    date,
}: ArticleHeaderProps) {
    return (
        <div className="w-full font-open-sans">
            {/* Breadcrumbs */}
            <ArticleBreadcrumbs title={title} />

            {/* Type + Title */}
            {/* <div className="p-0 m-0 text-sm">
                <a href={`/articles/type/${slugify(articleType)}`} className="p-0 m-0 text-privue-900">
                    {articleType}
                </a>
            </div> */}
            <h1 className="text-[34px] text-[#171717] font-[400]">{title}</h1>

            {/* Front matter */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[#525252] text-[14px]">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <User size={14} color="#525252" />
                        <p>{author}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDays size={14} color="#525252" />
                        <p>{date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Timer size={14} color="#525252" />
                        <p>4 minute read</p>
                    </div>
                </div>

                <a
                    href="/solutions"
                    className="inline-flex items-center gap-1 text-privue-700 hover:text-privue-900"
                >
                    <LinkIcon size={14} />
                    Solution
                </a>
            </div>
        </div>
    );
}
