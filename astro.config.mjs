import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hunterproducts.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // /products.json is a Snipcart crawler endpoint, not a page.
      filter: (page) => !/\.(json|xml)\/?$/.test(page),
    }),
  ],
});
