interface InfoCardProps {
    title: string;
    summary: string;
    url: string;
    articleType?: string;
    tags: string[];
    solutionLink?: string;
    solutionName?: string;
    author: string;
    publishedDate: string;
}
import { Badge } from "../ui/badge";
import { User, CalendarDays, ExternalLink } from 'lucide-react';

export default function InfoCard({
    title,
    summary,
    url,
    tags,
    author,
    publishedDate,
}: InfoCardProps) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="relative group block w-full ">
            <div className="font-open-sans w-full p-4  gap-3 flex flex-col justify-center border border-gray-200 rounded-[11px] shadow-xs bg-white hover:border-gray-300 hover:shadow-md transition-shadow">

                {/* Hover Overlay Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ExternalLink size={18} className="text-privue-600 hover:text-privue-700" />
                </div>

                <div>
                    {/* Title */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                            <p className="text-[16px] text-privue-950 font-normal">{title}</p>
                        </div>
                    </div>

                    {/* Summary */}
                    <p className="text-[13px] text-[#707070] mb-4 line-clamp-2 select-none">{summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100/70 text-gray-600 text-[12px] font-medium">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between text-xs pt-2">
                        <div className="flex items-center gap-1">
                            <User size={12} color="#707070" />
                            <p><span className="font-normal text-[#525252]">{author}</span></p>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays size={12} color="#707070" />
                            <p><span className="font-normal text-[#525252]">{publishedDate}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
