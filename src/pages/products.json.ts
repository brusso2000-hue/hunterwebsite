// Snipcart JSON crawler endpoint. Every add-to-cart button points its
// data-item-url here; Snipcart fetches this file at checkout to validate
// prices. Must stay at /products.json and keep id / price / url per item.
import { products } from '../lib/catalog';

export function GET() {
  return new Response(JSON.stringify(products, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
