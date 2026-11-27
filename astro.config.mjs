import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hunterproducts.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // /products.json is a Snipcart crawler endpoint, not a page.
      // /register/ is a noindex page reached from the QR code on the pen insert card.
      filter: (page) => !/\.(json|xml)\/?$/.test(page) && !/\/register\/$/.test(page),
    }),
  ],
});
