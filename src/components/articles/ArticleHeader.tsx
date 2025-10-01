// ArticleHeader.tsx
import { CalendarDays, Timer } from 'lucide-react';
import ArticleBreadcrumbs from './ArticleBreadcrumbs';

type ArticleHeaderProps = {
  title: string;
  readTime: string;
  date: string;
};

export default function ArticleHeader({ title, readTime, date }: ArticleHeaderProps) {
  return (
    <div className="font-open-sans w-full">
      {/* Breadcrumbs */}
      <ArticleBreadcrumbs title={title} />

      <h1 className="text-[34px] font-[400] text-[#171717]">{title}</h1>

      {/* Front matter */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#525252]">
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
