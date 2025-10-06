import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import mdx from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatter from 'remark-frontmatter';
import { visualizer } from 'rollup-plugin-visualizer';
import Sitemap from 'vite-plugin-sitemap'
import { fileURLToPath } from 'url';
import routes from './src/data/articles/list.ts';

const BASE_URL = 'https://privue.ai';
// Static routes
const staticRoutes = [
  '/',
  '/solutions',
  '/solutions/entity-due-diligence',
  '/solutions/third-party-risk-management',
  '/solutions/sustainability-assessment',
  '/solutions/distributor-performance-management',
  '/solutions/large-customer-risk-assessment',
  '/solutions/commercial-insurance-underwriting',
  '/data-security',
  '/cookie-policy',
  '/privacy-policy',
  '/terms',
  '/california-notice',
  '/contact',
  '/articles',
];
const articleRoutes = routes;

// Dynamic article URLs from data file
// const articleRoutes = articles.map((a) => a.url);

// const allRoutes = [...staticRoutes, ...articleRoutes];
const allRoutes = [...staticRoutes, ...articleRoutes];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      remarkPlugins: [remarkFrontmatter],
      include: /\.mdx?$/,
    }),

    Sitemap({
      hostname: BASE_URL,
      dynamicRoutes: allRoutes,
      changefreq: 'weekly',
      priority: 1.0,
      generateRobotsTxt: true,
    }),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/src': fileURLToPath(new URL('./src', import.meta.url)),
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
    // vite.config.js (manualChunks replacement)
    rollupOptions: {
      output: {
        // vite.config.ts (or .js) — replace your manualChunks with this
        manualChunks(id: string) {
          if (!id || !id.includes('node_modules')) return;

          // find the *last* occurrence so pnpm's ".pnpm/..." doesn't confuse us
          const nmPrefix = 'node_modules/';
          const last = id.lastIndexOf(nmPrefix);
          if (last === -1) return;

          const nmPath = id.slice(last + nmPrefix.length); // e.g. react-dom/index.js or @scope/pkg/...
          const segments = nmPath.split('/');
          if (segments.length === 0) return;

          // scoped packages: @scope/name
          const pkgName = segments[0].startsWith('@') && segments.length > 1
            ? `${segments[0]}/${segments[1]}`
            : segments[0];

          const safeName = pkgName.replace('@', '').replace('/', '-');

          // explicit named buckets for very large libs (optional)
          if (pkgName === 'react' || pkgName === 'react-dom') {
            return 'vendor-react'; // both react and react-dom -> vendor-react
          }
          if (pkgName.includes('recharts')) return 'vendor-recharts';
          if (pkgName.includes('framer-motion')) return 'vendor-framer-motion';
          if (pkgName.includes('reactflow')) return 'vendor-reactflow';
          if (pkgName.includes('zod')) return 'vendor-zod';

          // default: per-package vendor chunk
          return `vendor-${safeName}`;
        }

      },
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /\.tsx?$/,
    drop: ['console', 'debugger'],
  },
});

