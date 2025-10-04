// src/types/mdx.d.ts
declare module '*.mdx' {
  import { ComponentType } from 'react';

  // adjust ArticleMetadata import path to where your type lives
  import type { ArticleMetadata } from '@/lib/ArticleMetadata';

  export const metadata: ArticleMetadata;

  // MDX components prop can be any object mapping names to React components
  const MDXComponent: ComponentType<{ components?: Record<string, any> }>;

  export default MDXComponent;
}
