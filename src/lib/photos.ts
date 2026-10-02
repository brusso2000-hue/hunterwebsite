/**
 * Photo slots.
 *
 * To add or replace a photo, drop an image into the folder below using the
 * slot name as the file name — any of .webp / .jpg / .jpeg / .png / .avif.
 * No code changes needed; the next build picks it up.
 *
 *   Site photos     public/img/photos/<slot>.jpg      e.g. home-hero.jpg
 *   Product photos  public/img/products/<slug>.jpg    e.g. gold-24k-plating-pen.jpg
 *
 * Until a file exists, the slot renders a technical line drawing instead.
 * See PHOTOS.md at the repo root for the full list with suggested shots.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Product, SystemId } from './catalog';
import { systemOf } from './catalog';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

function findFile(dir: string, name: string): string | null {
  for (const ext of EXTS) {
    const rel = `/img/${dir}/${name}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  }
  return null;
}

export interface PhotoSlot {
  alt: string;
  /** What the photo should show — used in PHOTOS.md and the dev placeholder. */
  brief: string;
  /** Recommended minimum pixel size. */
  size: string;
  /** Drawing shown until a photo is supplied. */
  fallback: SystemId;
}

export const PHOTO_SLOTS = {
  'home-hero': {
    alt: 'Technician brush plating a connector with a Micro-Metallizer pen',
    brief: 'Close-up of a pen plating a real part — hands, pen tip and the fresh deposit in focus. Landscape.',
    size: '2000×1250',
    fallback: 'micro-metallizer',
  },
  'system-micro-metallizer': {
    alt: 'Micro-Metallizer power supply, cables and plating pens',
    brief: 'The full kit on a clean bench: power supply, leads, a row of pens.',
    size: '1600×1000',
    fallback: 'micro-metallizer',
  },
  'system-carbitron': {
    alt: 'Carbitron 300 tungsten-carbide coating system',
    brief: 'Carbitron 300 unit with handpiece and an instrument being treated.',
    size: '1600×1000',
    fallback: 'carbitron',
  },
  'system-micro-jet': {
    alt: 'Micro-Jet 200 micro-abrasive blasting system',
    brief: 'Micro-Jet 200 unit, nozzle aimed at a small part.',
    size: '1600×1000',
    fallback: 'micro-jet',
  },
  'process-clean': {
    alt: 'Degreasing the surface before plating',
    brief: 'Absorbent/degreaser pen being wiped across the work area.',
    size: '1200×900',
    fallback: 'micro-metallizer',
  },
  'process-plate': {
    alt: 'Brush plating the prepared surface',
    brief: 'Pen actively plating — visible wet deposit.',
    size: '1200×900',
    fallback: 'micro-metallizer',
  },
  'process-finish': {
    alt: 'Finished selectively plated part',
    brief: 'The finished part: crisp edge between plated and unplated areas.',
    size: '1200×900',
    fallback: 'micro-metallizer',
  },
  'app-aerospace-defense': { alt: 'Aerospace connector contact restoration', brief: 'Multi-pin aerospace connector being plated.', size: '1200×800', fallback: 'micro-metallizer' },
  'app-medical-dental': { alt: 'Tungsten-carbide treatment of surgical instruments', brief: 'Scissors or scalpel edge under the Carbitron handpiece.', size: '1200×800', fallback: 'carbitron' },
  'app-electronics-pcb': { alt: 'Gold plating PCB edge-connector fingers', brief: 'PCB edge connector or pads being plated.', size: '1200×800', fallback: 'micro-metallizer' },
  'app-manufacturing': { alt: 'Zinc touch-up on a steel component', brief: 'Production part / fastener being touched up.', size: '1200×800', fallback: 'micro-metallizer' },
  'app-industrial-mro': { alt: 'Field repair of switchgear contacts', brief: 'Portable kit in use on equipment in the field.', size: '1200×800', fallback: 'micro-metallizer' },
} satisfies Record<string, PhotoSlot>;

export type PhotoSlotName = keyof typeof PHOTO_SLOTS;

export interface ResolvedPhoto extends PhotoSlot {
  slot: string;
  /** Path of the supplied photo, or null → render the drawing. */
  src: string | null;
  /** Where to drop the file to fill this slot. */
  dropPath: string;
  /** Legacy low-res photo: render small, never stretched. */
  lowRes?: boolean;
}

export function photo(slot: PhotoSlotName): ResolvedPhoto {
  const def = PHOTO_SLOTS[slot];
  return { ...def, slot, src: findFile('photos', slot), dropPath: `public/img/photos/${slot}.jpg` };
}

/**
 * Product photo: public/img/products/<slug>.* if supplied, otherwise the
 * original small catalog photo from products.json, otherwise a drawing.
 */
export function productPhoto(p: Product): ResolvedPhoto {
  const supplied = findFile('products', p.slug);
  return {
    slot: p.slug,
    alt: p.name,
    brief: `Studio shot of the ${p.name} on a plain background.`,
    size: '1200×1200',
    fallback: systemOf(p),
    src: supplied ?? p.image ?? null,
    lowRes: !supplied && !!p.image,
    dropPath: `public/img/products/${p.slug}.jpg`,
  };
}
