import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type ArticleBreadcrumbsProps = {
    title: string;
};


export default function ArticleBreadcrumbs({ title }: ArticleBreadcrumbsProps) {
    const truncatedTitle = title.length > 50 ? `${title.slice(0, 50)}…` : title;

    return (
        <nav aria-label="Breadcrumb" className="w-full py-2">
            {/* Desktop: Articles → Type → Title */}
            <div className="hidden md:block">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage aria-current="page">
                                {truncatedTitle}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Mobile: Articles → Title (shorter) */}
            <div className="md:hidden">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage aria-current="page">
                                {truncatedTitle}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </nav>
    );
}
