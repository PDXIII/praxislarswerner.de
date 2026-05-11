// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://praxislarswerner.de',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon(),
    sitemap(),
  ],
  image: {
    domains: ['images.ctfassets.net'],
  },
  vite: {
    ssr: {
      noExternal: ['@contentful/rich-text-html-renderer'],
    },
  },
});