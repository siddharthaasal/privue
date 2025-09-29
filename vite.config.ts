import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mdx from '@mdx-js/rollup';
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkFrontmatter from "remark-frontmatter";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  visualizer({                 // ✅ adds visual analysis
    filename: 'stats.html',
    open: true,                // auto opens after build
    gzipSize: true,
    brotliSize: true
  }),
  mdx({
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    remarkPlugins: [remarkFrontmatter],
    include: /\.mdx?$/,
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react')) return 'react';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('react-icons')) return 'icons';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('reactflow')) return 'reactflow';
          }
        },
      },
    },
  },
})
