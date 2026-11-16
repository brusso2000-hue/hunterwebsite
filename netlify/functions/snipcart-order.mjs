// Snipcart "order.completed" webhook → GA4 purchase (server side).
//
// Why: the browser only hears Snipcart's 'cart.confirmed' event when the buyer comes
// back to our page after paying. PayPal and 3-D Secure buyers often don't, so most
// orders never reached Google Analytics or Google Ads. Snipcart calls this webhook for
// every completed order, so every order is counted.
//
// The purchase is sent to GA4 with the visitor's GA4 client and session IDs (stamped on
// the cart by Base.astro), so GA4 credits it to the visit that brought the buyer in,
// including Google Ads clicks. Google Ads imports the GA4 "purchase" key event as its
// purchase conversion. GA4 drops a second purchase with the same transaction_id, so the
// browser-side purchase and this one don't double count.
//
// Netlify environment variables:
//   SNIPCART_SECRET_KEY  Snipcart dashboard → Account → API keys → Secret (Live)
//   GA4_API_SECRET       GA4 → Admin → Data streams → hunterproducts.com →
//                        Measurement Protocol API secrets
// Snipcart dashboard → Account → Webhooks → URL:
//   https://hunterproducts.com/api/snipcart-order

const GA4_ID = 'G-XSQ3VPEEF1';

export const config = { path: '/api/snipcart-order' };

export default async (req) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });

  const secret = process.env.SNIPCART_SECRET_KEY;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!secret || !apiSecret) {
    console.error('snipcart-order: SNIPCART_SECRET_KEY or GA4_API_SECRET not set');
    return new Response('Not configured', { status: 500 });
  }

  // Only accept calls Snipcart can vouch for.
  const token = req.headers.get('x-snipcart-requesttoken');
  if (!token) return new Response('Missing token', { status: 401 });
  const check = await fetch(
    `https://app.snipcart.com/api/requestvalidation/${encodeURIComponent(token)}`,
    {
      headers: {
        Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64'),
        Accept: 'application/json',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    }
  ).catch(() => null);
  if (!check || !check.ok) return new Response('Invalid token', { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  // Ignore everything except live completed orders. Answer 200 so Snipcart doesn't retry.
  if (body.eventName !== 'order.completed') return new Response('Ignored', { status: 200 });
  if (String(body.mode || '').toLowerCase() === 'test') return new Response('Test order ignored', { status: 200 });

  const o = body.content || {};
  const meta = readMetadata(o.metadata);
  const orderId = o.invoiceNumber || o.token;
  const value = num(o.finalGrandTotal ?? o.grandTotal ?? o.total);
  const items = Array.isArray(o.items) ? o.items : [];

  // Without a stamped client ID, still record the sale (it shows as direct/unattributed).
  const clientId = meta.ga_client_id || `snipcart.${String(o.token || orderId || Date.now()).replace(/[^\w]/g, '')}`;
  const sessionId = Number(meta.ga_session_id) || undefined;

  const params = {
    transaction_id: orderId,
    value,
    currency: String(o.currency || 'USD').toUpperCase(),
    shipping: num(o.shippingFees ?? o.shippingInformation?.fees),
    tax: num(o.taxesTotal ?? o.totalTaxes),
    items: items.map((it) => ({
      item_id: it.id,
      item_name: it.name,
      price: num(it.price),
      quantity: Number(it.quantity) || 1,
    })),
    engagement_time_msec: 1,
  };
  if (sessionId) params.session_id = sessionId;

  const payload = { client_id: clientId, events: [{ name: 'purchase', params }] };
  const placed = Date.parse(o.completionDate || o.creationDate || body.createdOn || '');
  // GA4 accepts back-dated events up to 72 hours old.
  if (placed && Date.now() - placed < 71 * 3600e3) payload.timestamp_micros = placed * 1000;

  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_ID}&api_secret=${encodeURIComponent(apiSecret)}`,
    { method: 'POST', body: JSON.stringify(payload), signal: AbortSignal.timeout(5000) }
  ).catch((e) => ({ ok: false, status: String(e) }));

  console.log(
    `snipcart-order: ${orderId} $${value} client=${meta.ga_client_id ? 'stamped' : 'fallback'} session=${sessionId ? 'yes' : 'no'} ga4=${res.status}`
  );
  return new Response('OK', { status: 200 });
};

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

// Snipcart sends metadata as an object; older orders may carry it as a JSON string.
function readMetadata(m) {
  if (!m) return {};
  if (typeof m === 'string') {
    try { return JSON.parse(m) || {}; } catch { return {}; }
  }
  return typeof m === 'object' ? m : {};
}
