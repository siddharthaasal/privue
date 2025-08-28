// ArticleHeader.tsx
import { CalendarDays, Timer } from "lucide-react";
import ArticleBreadcrumbs from "./ArticleBreadcrumbs";

type ArticleHeaderProps = {
    title: string;
    readTime: string;
    date: string;
};



export default function ArticleHeader({
    title,
    readTime,
    date,
}: ArticleHeaderProps) {
    return (
        <div className="w-full font-open-sans">
            {/* Breadcrumbs */}
            <ArticleBreadcrumbs title={title} />


            <h1 className="text-[34px] text-[#171717] font-[400]">{title}</h1>

            {/* Front matter */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#525252] text-[14px]">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1 tracking-tight">
                        <CalendarDays size={14} color="#525252" />
                        <p>{date}</p>
                    </div>
                    <div className="flex items-center gap-1 tracking-tight">
                        <Timer size={14} color="#525252" />
                        <p>{readTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
