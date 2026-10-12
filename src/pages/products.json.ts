// Snipcart JSON crawler endpoint. Every add-to-cart button points its
// data-item-url here; Snipcart fetches this file at checkout to validate
// prices. Must stay at /products.json and keep id / price / url per item.
import { products, metaFor } from '../lib/catalog';

export function GET() {
  return new Response(JSON.stringify(
      products.map((p) => {
        const m = metaFor(p);
        return { ...p, metaTitle: m.title, metaDescription: m.description };
      }),
      null,
      2,
    ), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
