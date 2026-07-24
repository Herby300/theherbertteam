import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.theherbertteam.com',
  integrations: [
    tailwind(),
    // Keep the noindex confirmation page out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/thank-you') }),
    mdx(),
  ],
  output: 'static',
});
