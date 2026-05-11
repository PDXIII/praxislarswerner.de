// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  site: 'https://praxislarswerner.de',
  integrations: [
    icon(),
    sitemap(),
  ],
  image: {
    domains: ['images.ctfassets.net'],
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    ssr: {
      noExternal: ['@contentful/rich-text-html-renderer'],
    },
  },
});