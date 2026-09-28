# hunterproducts.com

Astro static site for Hunter Products Inc., deployed on Netlify.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| To change… | Edit |
| --- | --- |
| Products, prices, specs | `src/data/products.json`: one entry per product. Product pages, the store, the sitemap and Snipcart all read from it. |
| Plating compatibility chart | `src/lib/finishes.ts` |
| System pages (Micro-Metallizer, Carbitron, Micro-Jet) | `src/lib/systemPages.ts` |
| Industry applications | `src/lib/applications.ts` |
| Phone, email, address, tracking IDs | `src/lib/site.ts` |
| Photos | Drop files into `public/img/photos/` or `public/img/products/`. See [PHOTOS.md](PHOTOS.md). |
| Redirects | `netlify.toml` |

## Things that must not break

- **`/products.json`** is Snipcart's price-validation crawler (built from `src/data/products.json`).
  Keep each product's `id`, `price` and `url` fields.
- **Google Ads**: the tag and the purchase-conversion bridge are in `src/layouts/Base.astro`.
  Set `GOOGLE_ADS_PURCHASE_LABEL` in `src/lib/site.ts` once the Purchase conversion action exists.
- **Quote form** posts to Formspree (`FORMSPREE_ENDPOINT` in `src/lib/site.ts`).
