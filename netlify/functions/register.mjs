// Pen registration → database.
//
// The form at /register/ posts here. Each registration becomes one row in the `registrations`
// table of the hunter-retention database. The retention job reads new rows, matches each one to
// the customer's order and the lot recorded on it, and sends the certificate email (or holds it
// for a person when no lot is on record). See the hunterretention repo, src/hunter_retention/registration.py.
//
// The browser also posts the same form to Formspree, so a registration still reaches the inbox
// if this function or the database is down.
//
// Netlify environment variable:
//   REGISTRATIONS_DATABASE_URL  Postgres connection string for a role that can ONLY insert into
//                               `registrations`. Never put the retention job's own DATABASE_URL here:
//                               this function is reachable from the public internet.

import { neon } from '@neondatabase/serverless';

export const config = { path: '/api/register' };

const EMAIL = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const MAX_BODY = 8000; // bytes; the whole form is a few hundred

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

export async function readFields(req) {
  const type = req.headers.get('content-type') || '';
  if (type.includes('application/json')) return (await req.json()) || {};
  const form = await req.formData();
  return Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'));
}

export function validate(raw) {
  // Honeypot: a real person never fills this hidden field. Pretend it worked.
  if (clean(raw._gotcha, 200)) return { bot: true };
  const row = {
    email: clean(raw.email, 255).toLowerCase(),
    first_name: clean(raw.first_name, 128),
    last_name: clean(raw.last_name, 128),
    company: clean(raw.company, 255),
    application: clean(raw.application, 2000),
  };
  const missing = ['email', 'first_name', 'last_name', 'company'].filter((k) => !row[k]);
  if (missing.length) return { error: `Missing: ${missing.join(', ')}` };
  if (!EMAIL.test(row.email)) return { error: 'That email address does not look right.' };
  return { row };
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'POST only' });
  if (Number(req.headers.get('content-length') || 0) > MAX_BODY) return json(413, { ok: false, error: 'Too large' });

  let raw;
  try {
    raw = await readFields(req);
  } catch {
    return json(400, { ok: false, error: 'Could not read the form' });
  }
  const v = validate(raw);
  if (v.bot) return json(200, { ok: true });
  if (v.error) return json(400, { ok: false, error: v.error });

  const url = process.env.REGISTRATIONS_DATABASE_URL;
  if (!url) {
    console.error('register: REGISTRATIONS_DATABASE_URL not set');
    return json(503, { ok: false, error: 'Not configured' });
  }
  try {
    const sql = neon(url);
    const r = v.row;
    const rows = await sql`
      insert into registrations (email, first_name, last_name, company, application, source, status)
      values (${r.email}, ${r.first_name}, ${r.last_name}, ${r.company}, ${r.application || null}, 'web', 'new')
      returning id`;
    return json(200, { ok: true, id: rows[0]?.id ?? null });
  } catch (err) {
    // Log the reason for us; never send database details to the browser.
    console.error('register: insert failed', err?.message || err);
    return json(500, { ok: false, error: 'Could not save' });
  }
};
