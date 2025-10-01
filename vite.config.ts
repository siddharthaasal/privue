import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import mdx from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatter from 'remark-frontmatter';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    mdx({
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      remarkPlugins: [remarkFrontmatter],
      include: /\.mdx?$/,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // force both to the top-level node_modules
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
    // prefer a single copy when multiple packages depend on react
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // help vite pre-bundle these explicitly
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // if (id.includes('react-dom')) return 'react-dom';
            // if (id.includes('react')) return 'react';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('react-icons')) return 'icons';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('reactflow')) return 'reactflow';
          }
        },
      },
    },
  },
});
