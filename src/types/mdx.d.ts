declare module "*.mdx" {
    import { ComponentType } from "react";
    import { ArticleMetadata } from "./ArticleMetadata"

    export const metadata: ArticleMetadata
    const MDXComponent: ComponentType;
    export default MDXComponent;
}
