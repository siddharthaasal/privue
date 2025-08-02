interface ArticleHeaderProps {
    title: string;
    author: string;
    date: string;
    articleType: string;
}

import { User, CalendarDays, Timer, Link } from 'lucide-react';

export default function ArticleHeader({ title, author, date, articleType }: ArticleHeaderProps) {
    return (
        <>
            <div className="w-full font-open-sans space-y-3">
                {/* articke type, title */}
                <div className=''>
                    <a href="/article" className="text-[15px] text-privue-900">{articleType}</a >
                </div >
                <div>
                    <h1 className="text-4xl text-[#171717] font-[400]">
                        {title}
                    </h1>
                </div>
                {/* artice front-matter */}
                <div className="mt-4 flex gap-0.5 space-x-6  text-[#525252] items-center text-[14px]">
                    <div className='flex space-x-6'>
                        <div className="flex items-center gap-0.5">
                            <User size={14} color="#525252" />
                            <p>{author}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <CalendarDays size={14} color="#525252" />
                            <p>{date}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <Timer size={14} color="#525252" />
                            <p>4 minute read</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-0.5 cursor-pointer">
                        <Link size={14} color="#5c7cfa" className='hover:text-[#4263eb]' />
                        <p className="text-privue-700 hover:text-privue-900">Solution</p>
                    </div>
                    {/* <div className="inline-flex items-center rounded-full bg-opacity-10 bg-surface-200 text-privue-700 border border-privue-700 border-strong px-2.5 py-0.5 text-[11px] gap-1">
                        Solution
                        <Link size={10} color="#5c7cfa" />
                    </div> */}
                </div>
            </div >
        </>
    )
}

