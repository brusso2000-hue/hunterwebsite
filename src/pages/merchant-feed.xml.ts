// Google Merchant Center product feed (RSS 2.0 + g: namespace).
// Merchant Center fetches this URL on a schedule, so prices, links and
// availability always match the live store. Built from the same
// products.json the store and Snipcart use.
//
// Products without a photo are left out: Google rejects listings with no
// image. Drop a photo into public/img/products/<slug>.jpg (or add an
// `image` to products.json) and the product joins the feed on next deploy.
import { products, systemOf, systemInfo, typeOf, TYPE_LABEL, productUrl } from '../lib/catalog';
import { productPhoto } from '../lib/photos';
import { SITE } from '../lib/site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Google product taxonomy: Hardware > Tools (ID 1167). Close fit for
// bench plating and coating equipment.
const GOOGLE_CATEGORY = '1167';

export function GET() {
  const items = products
    .map((p) => ({ p, pic: productPhoto(p) }))
    .filter(({ pic }) => !!pic.src)
    .map(({ p, pic }) => {
      const link = `${SITE.origin}${productUrl(p)}`;
      const image = `${SITE.origin}${encodeURI(pic.src as string)}`;
      const sys = systemInfo(systemOf(p));
      const description = (p.longDescription || p.description).replace(/\s+/g, ' ').trim();
      const d = p.dimensions;
      return `    <item>
      <g:id>${esc(p.sku)}</g:id>
      <title>${esc(`${SITE.shortName} ${p.h1 || p.name}`)}</title>
      <description>${esc(description)}</description>
      <link>${esc(link)}</link>
      <g:image_link>${esc(image)}</g:image_link>
      <g:price>${p.price.toFixed(2)} USD</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>${esc(SITE.shortName)}</g:brand>
      <g:mpn>${esc(p.sku)}</g:mpn>
      <g:google_product_category>${GOOGLE_CATEGORY}</g:google_product_category>
      <g:product_type>${esc(`${sys.name} > ${TYPE_LABEL[typeOf(p)]}`)}</g:product_type>
      <g:shipping_weight>${d.weight} g</g:shipping_weight>
      <g:shipping_length>${d.length} cm</g:shipping_length>
      <g:shipping_width>${d.width} cm</g:shipping_width>
      <g:shipping_height>${d.height} cm</g:shipping_height>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.origin}/</link>
    <description>${esc(SITE.defaultDescription)}</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
