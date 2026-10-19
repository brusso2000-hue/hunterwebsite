// Snipcart JSON crawler endpoint. Every add-to-cart button points its
// data-item-url here; Snipcart fetches this file at checkout to validate
// prices. Must stay at /products.json and keep id / price / url per item.
import { products, metaFor } from '../lib/catalog';

export function GET() {
  return new Response(JSON.stringify(
      products.map((p) => {
        const m = metaFor(p);
        // Snipcart rejects an order ("invalid products") when a cart item carries a
        // custom field the crawled product doesn't declare. Mirror the Voltage field
        // from snipcartAttrs() exactly.
        const customFields = p.voltage?.length ? [{ name: 'Voltage', type: 'dropdown', options: p.voltage.join('|'), required: true, value: p.voltage[0] }] : undefined;
        return { ...p, metaTitle: m.title, metaDescription: m.description, ...(customFields && { customFields }) };
      }),
      null,
      2,
    ), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
