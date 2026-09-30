import raw from '../data/products.json';

export type SystemId = 'micro-metallizer' | 'carbitron' | 'micro-jet';
export type ProductType = 'system' | 'kit' | 'pen' | 'heavy-duty' | 'prep' | 'equipment' | 'consumable';

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  url: string;
  taxable: boolean;
  description: string;
  longDescription: string;
  dimensions: { weight: number; width: number; height: number; length: number };
  slug: string;
  category: string;
  image?: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  specs: [string, string][];
  applications: string[];
}

export const products = raw as Product[];

// Snipcart validates cart prices against this URL (apex host, no redirect).
export const SNIPCART_CRAWL_URL = 'https://hunterproducts.com/products.json';

const PREP_IDS = new Set(['PL-1002', 'PL-1014']);
/** Carbitron replacement hardware (not consumables). */
const CARBITRON_EQUIPMENT_IDS = new Set(['TS3042', 'TS3045', 'TS3053']);

export function systemOf(p: Product): SystemId {
  if (p.category === 'carbitron' || p.id.startsWith('TS')) return 'carbitron';
  if (p.category === 'microjet') return 'micro-jet';
  return 'micro-metallizer';
}

export function typeOf(p: Product): ProductType {
  if (p.category === 'carbitron' || p.category === 'microjet') return 'system';
  if (p.category === 'kits') return 'kit';
  if (PREP_IDS.has(p.id)) return 'prep';
  if (p.category === 'pen') return p.name.includes('Heavy Duty') ? 'heavy-duty' : 'pen';
  if (CARBITRON_EQUIPMENT_IDS.has(p.id)) return 'equipment';
  if (p.id.startsWith('TS')) return 'consumable';
  return 'equipment';
}

export const TYPE_LABEL: Record<ProductType, string> = {
  system: 'Complete System',
  kit: 'Plating Kit',
  pen: 'Plating Pen',
  'heavy-duty': 'Heavy-Duty Pen',
  prep: 'Surface Prep',
  equipment: 'Equipment',
  consumable: 'Consumable',
};

/** Metal / finish a plating pen deposits, e.g. "Gold 24K". Null for non-pens. */
export function metalOf(p: Product): string | null {
  const t = typeOf(p);
  if (t !== 'pen' && t !== 'heavy-duty') return null;
  return p.name.replace(/\s*(Heavy Duty)?\s*(Plating)?\s*Pen$/i, '').trim();
}

export function fmtPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function bySlug(slug: string): Product {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product slug: ${slug}`);
  return p;
}

export function byId(id: string): Product {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product id: ${id}`);
  return p;
}

export function productUrl(p: Product): string {
  return `/products/${p.slug}/`;
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** data-item-* attributes for a Snipcart add-to-cart button. */
export function snipcartAttrs(p: Product): Record<string, string> {
  return {
    'data-item-id': p.id,
    'data-item-name': p.name,
    'data-item-price': p.price.toFixed(2),
    'data-item-url': SNIPCART_CRAWL_URL,
    'data-item-taxable': 'false',
    'data-item-description': p.description.slice(0, 90),
    'data-item-image': p.image ? `https://hunterproducts.com${encodeURI(p.image)}` : '',
    'data-item-weight': String(p.dimensions.weight),
    'data-item-width': String(p.dimensions.width),
    'data-item-height': String(p.dimensions.height),
    'data-item-length': String(p.dimensions.length),
  };
}

// ── Systems ─────────────────────────────────────────────

export interface SystemInfo {
  id: SystemId;
  name: string;
  /** Part number of the base unit, where one exists. */
  model?: string;
  process: string;
  href: string;
  summary: string;
  flagship: string; // product id
}

export const SYSTEMS: SystemInfo[] = [
  {
    id: 'micro-metallizer',
    name: 'Micro-Metallizer',
    process: 'Selective electroplating',
    href: '/systems/micro-metallizer/',
    summary:
      'Self-contained plating pens driven by a 12V DC supply. Deposit gold, silver, nickel, rhodium, tin and more exactly where the part needs it — no tanks, no bath, no waste handling.',
    flagship: 'PL-1000K',
  },
  {
    id: 'carbitron',
    name: 'Carbitron 300',
    model: 'TS3037',
    process: 'Tungsten-carbide coating',
    href: '/systems/carbitron-300/',
    summary:
      'The original diamond-dusting platform. Deposits a hard tungsten-carbide layer on cutting edges and wear surfaces to extend the service life of surgical, dental and industrial tools.',
    flagship: 'TS3037',
  },
  {
    id: 'micro-jet',
    name: 'Micro-Jet 200',
    model: 'AB2000',
    process: 'Micro-abrasive blasting',
    href: '/systems/micro-jet-200/',
    summary:
      'Controlled micro-abrasive delivery for cleaning, etching and surface prep on fine wires, thin substrates and intricate parts where conventional blasting causes damage.',
    flagship: 'mj',
  },
];

export function systemInfo(id: SystemId): SystemInfo {
  return SYSTEMS.find((s) => s.id === id)!;
}

export function productsForSystem(id: SystemId): Product[] {
  return products.filter((p) => systemOf(p) === id);
}
