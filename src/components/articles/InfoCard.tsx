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
import { Badge } from '../ui/badge';
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
    <a href={url} target="_blank" rel="noopener noreferrer" className="group relative block w-full">
      <div className="font-open-sans flex w-full flex-col justify-center gap-3 rounded-[11px] border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:border-gray-300 hover:shadow-md">
        {/* Hover Overlay Icon */}
        <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink size={18} className="text-privue-600 hover:text-privue-700" />
        </div>

        <div>
          {/* Title */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="text-privue-950 text-[16px] font-normal">{title}</p>
            </div>
          </div>

          {/* Summary */}
          <p className="mb-4 line-clamp-2 text-[13px] text-[#707070] select-none">{summary}</p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100/70 text-[12px] font-medium text-gray-600"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between pt-2 text-xs">
            <div className="flex items-center gap-1">
              <User size={12} color="#707070" />
              <p>
                <span className="font-normal text-[#525252]">{author}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={12} color="#707070" />
              <p>
                <span className="font-normal text-[#525252]">{publishedDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
