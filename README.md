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
  Fill in `GOOGLE_ADS_LABELS` (purchase, lead, call) in `src/lib/site.ts`; each conversion fires only once its label is set.
- **Quote form** posts to Formspree (`FORMSPREE_ENDPOINT` in `src/lib/site.ts`).
- **Traffic source tracking** (`src/layouts/Base.astro`): on arrival the site saves where the visitor came
  from (referrer, UTM tags, ad click ID, landing page) in the browser for 180 days. Every quote form email
  and every Snipcart order (Metadata tab) carries `source`, `source_landing_page`, `first_visit` and, when
  different, `latest_source`. Each order also triggers an "Order HUN-xxxx came from: …" email through Formspree.
  Tag links you control (Apollo emails, ThomasNet, Tech Briefs ads) with `utm_source` / `utm_medium` /
  `utm_campaign` so they show up by name instead of as "Direct". Set `GA4_ID` in `src/lib/site.ts` to turn on
  Google Analytics.
