import type { SystemId } from './catalog';
import type { PhotoSlotName } from './photos';

export interface SystemPage {
  slug: string;
  id: SystemId;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string[];
  photo: PhotoSlotName;
  blocks: { title: string; items: string[] }[];
}

// Copy is drawn from products.json and the Hunter catalogs — no invented specs.
export const SYSTEM_PAGES: SystemPage[] = [
  {
    slug: 'micro-metallizer',
    id: 'micro-metallizer',
    title: 'Micro-Metallizer Brush Plating System',
    metaTitle: 'Micro-Metallizer Brush Plating System | Selective Plating Pens | Hunter Products',
    metaDescription:
      'Micro-Metallizer brush plating system: variable DC power supply and self-contained plating pens for gold, rhodium, silver, nickel, tin, zinc and more. No tanks. Built by Hunter Products, NJ.',
    headline: 'Selective brush plating in a pen.',
    intro: [
      'The Micro-Metallizer is a portable brush plating system: a variable DC power supply, connector cables and a family of self-contained plating pens. Each pen holds its own solution in an absorbent tip — touch it to the grounded part and metal deposits exactly where you work.',
      'There is no tank to fill, no bath to maintain and no plating waste to handle. Swap one pen for the next to run a full sequence — degrease, copper flash, nickel underlayer, final finish — on the same supply, at the bench or in the field.',
    ],
    photo: 'system-micro-metallizer',
    blocks: [
      {
        title: 'System features',
        items: [
          'Variable DC power supply — 110V/60Hz or 220V/50Hz',
          'Self-contained, disposable pen cartridges',
          'Standard and heavy-duty cartridges',
          'One supply drives every pen in the line',
          'No tank, bath or plating-waste handling',
          'Portable: bench, line-side or field',
        ],
      },
      {
        title: 'Applications',
        items: [
          'Contact and connector restoration',
          'PCB pad solderability (tin)',
          'Gold and rhodium on high-contact parts',
          'Zinc corrosion touch-up',
          'Silverware restoration',
          'Copper flash and nickel underlayers',
        ],
      },
      {
        title: 'Substrates',
        items: [
          'Copper and copper alloys',
          'Nickel, silver and gold',
          'Steel — with copper flash',
          'Stainless steel — with stainless degreaser',
          'Not for aluminum or chromium (copper, silver, tin, zinc)',
        ],
      },
    ],
  },
  {
    slug: 'carbitron-300',
    id: 'carbitron',
    title: 'Carbitron 300 Tungsten-Carbide Coating System',
    metaTitle: 'Carbitron 300 | Tungsten-Carbide Coating & Diamond Dusting System | Hunter Products',
    metaDescription:
      'Carbitron 300 — the original tungsten-carbide diamond-dusting platform. Edge-hardens surgical, dental and industrial cutting instruments. Invented and built by Hunter Products, NJ.',
    headline: 'Tungsten-carbide edge hardening.',
    intro: [
      'The Carbitron 300 is the original commercial diamond-dusting platform, invented by Hunter Products for the medical and dental industries. It deposits a hard tungsten-carbide layer onto cutting edges and wear surfaces, extending the working life of surgical instruments, dental tools and precision cutting equipment.',
      'The system ships complete with three tungsten-carbide electrodes — 1/8", 1/16" and 1/32" — covering general-purpose deposition through precision detail work. Electrodes are consumables and are sold individually for replacement.',
    ],
    photo: 'system-carbitron',
    blocks: [
      {
        title: 'System features',
        items: [
          'Tungsten-carbide (WC) deposition',
          'Three electrodes included: 1/8", 1/16", 1/32" × 2½"',
          'Replacement electrodes sold individually',
          '110V / 220V operation',
        ],
      },
      {
        title: 'Applications',
        items: [
          'Edge hardening on scalpels and scissors',
          'Curettes, explorers and dental instruments',
          'Re-coating instruments instead of replacing',
          'Precision tooling and cutting edges',
          'Dies and wear surfaces',
        ],
      },
      {
        title: 'Used by',
        items: [
          'Medical instrument manufacturers',
          'Dental laboratories',
          'Surgical-tool refurbishment shops',
          'Precision tooling operations',
        ],
      },
    ],
  },
  {
    slug: 'micro-jet-200',
    id: 'micro-jet',
    title: 'Micro-Jet 200 Micro-Abrasive Blasting System',
    metaTitle: 'Micro-Jet 200 | Precision Micro-Abrasive Blaster | Hunter Products',
    metaDescription:
      'Micro-Jet 200 — precision micro-abrasive blasting for cleaning, etching and surface prep on small or delicate components, where standard blasting causes damage.',
    headline: 'Micro-abrasive surface preparation.',
    intro: [
      'The Micro-Jet 200 is a precision micro-abrasive blasting platform for cleaning, etching and surface preparation on parts where conventional blasting equipment is too aggressive.',
      'Particle delivery is controlled finely enough to work on delicate features — fine wires, thin substrates, intricate detail — without the collateral damage standard blasting would cause. It is also the natural pre-plate prep step before brush plating.',
    ],
    photo: 'system-micro-jet',
    blocks: [
      {
        title: 'Process',
        items: ['Cleaning', 'Etching', 'Surface preparation', 'Matte-finish creation', 'Selective material removal'],
      },
      {
        title: 'Applications',
        items: [
          'PCB-level cleaning and rework',
          'Fine-feature prep on medical instruments',
          'Antique and instrument restoration',
          'Matte finishing on cutting surfaces',
        ],
      },
      {
        title: 'Suited to',
        items: ['Fine wires', 'Thin substrates', 'Intricate detail', 'Small or delicate components'],
      },
    ],
  },
];
