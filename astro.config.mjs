import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
