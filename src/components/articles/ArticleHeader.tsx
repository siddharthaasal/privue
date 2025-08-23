// ArticleHeader.tsx
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, CalendarDays, Timer, Link as LinkIcon } from "lucide-react";

type ArticleHeaderProps = {
    title: string;
    author: string;
    date: string;
    articleType: string; // e.g. "Case Study" | "Blog" | "Client Story"
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/(^-|-$)/g, "");

function ArticleBreadcrumbs({
    articleType,
    title,
}: {
    articleType: string;
    title: string;
}) {
    const typeSlug = slugify(articleType);
    const truncatedTitle = title.length > 45 ? `${title.slice(0, 45)}…` : title;

    // canonical paths — tweak as your routes require
    const crumbs = [
        { label: "Home", href: "/" },
        { label: "Articles", href: "/articles" },
        { label: articleType, href: `/articles` },
        { label: title, href: `/articles/type/${typeSlug}/${slugify(title)}` },
    ];

    return (
        <div className="w-full py-2">
            {/* Desktop: full trail */}
            <div className="hidden md:block">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href={crumbs[0].href}>{crumbs[0].label}</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href={crumbs[1].href}>{crumbs[1].label}</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href={crumbs[2].href}>{crumbs[2].label}</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage aria-current="page">{truncatedTitle}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Mobile: collapse middle into an ellipsis menu */}
            <div className="md:hidden">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <a href={crumbs[0].href}>{crumbs[0].label}</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                    <BreadcrumbEllipsis className="size-4" />
                                    <span className="sr-only">Open breadcrumb menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem asChild>
                                        <a href={crumbs[1].href}>{crumbs[1].label}</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href={crumbs[2].href}>{crumbs[2].label}</a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage aria-current="page">{truncatedTitle}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}

export default function ArticleHeader({
    title,
    author,
    date,
    articleType,
}: ArticleHeaderProps) {
    return (
        <div className="w-full font-open-sans">
            {/* Breadcrumbs */}
            <ArticleBreadcrumbs articleType={articleType} title={title} />

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
