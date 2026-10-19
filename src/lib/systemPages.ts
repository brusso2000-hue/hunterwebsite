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
  /** Optional reference table shown under the blocks (e.g. the Carbitron application guide). */
  table?: { title: string; caption: string; head: string[]; rows: string[][]; note?: string };
}

// Copy is drawn from products.json and the Hunter catalogs — no invented specs.
export const SYSTEM_PAGES: SystemPage[] = [
  {
    slug: 'micro-metallizer',
    id: 'micro-metallizer',
    title: 'Micro-Metallizer Brush Plating System',
    metaTitle: 'Plating Pens from {penFrom} | Micro-Metallizer Brush Plating',
    metaDescription:
      'Fully self-contained plating solutions in a pen: gold, silver, nickel, tin, zinc, rhodium, palladium. From {penFrom}. No tank or bath. Ships same day, free returns.',
    headline: 'Selective brush plating in a pen.',
    intro: [
      'The Micro-Metallizer is a portable brush plating system: a variable DC power supply, connector cables and a family of self-contained plating pens. Each pen holds its own solution in an absorbent tip — touch it to the grounded part and metal deposits exactly where you work.',
      'There is no tank to fill, no bath to maintain and no plating waste to handle. Swap one pen for the next to run a full sequence — degrease, copper flash, nickel underlayer, final finish — on the same supply, at the bench or in the field.',
      'Every pen is stocked in Flemington, NJ and ships same day. Need gold, nickel or tin on a part this week? Order by 2 PM ET and the plating solution is on a truck that afternoon, not waiting in a plating shop queue.',
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
    metaTitle: 'Carbitron 300 | Diamond Dusting & Tungsten Carbide, {from}',
    metaDescription:
      'The original diamond-dusting system for surgical instrument repair and manufacturing. Restores grip on needle holder and forceps jaws. Also extends tool life.',
    headline: 'Diamond dusting for surgical instruments.',
    intro: [
      'The Carbitron 300 is the original diamond-dusting system. Surgical instrument repair companies and instrument makers use it to apply a fine layer of tungsten carbide to working surfaces such as needle holder and forceps jaws, giving them the textured, hard grip that fine needles and tissue need.',
      'Plain stainless steel jaws cannot be repaired once they wear, so the whole instrument gets replaced. A diamond-dusted surface adds a hard tungsten carbide grip where the instrument does its work. The deposit is fused to the instrument at 78 to 80 Rockwell C, applied with a tungsten-carbide electrode in a vibrating hand tool, a process generally known as electro-spark deposition.',
      'Deposit thickness is set on the power supply from 0.0002" to 0.001" in 0.0002" steps. A 1/8" x 2 1/2" electrode covers about 50 square inches at 0.0005" average thickness, and replacement electrodes are $12.50, so one unit at each repair bench runs for very little. The same system also extends the life of cutting tools, punches and dies 5x to 10x in machine shops.',
    ],
    photo: 'system-carbitron',
    blocks: [
      {
        title: 'In the box',
        items: [
          'Carbitron 300 power supply',
          'Vibrator hand piece with power cable',
          'Grounding cable',
          '1/8" tungsten-carbide electrode',
          '1/16" tungsten-carbide electrode',
        ],
      },
      {
        title: 'System features',
        items: [
          'Tungsten carbide layer, 78 to 80 Rockwell C',
          'Deposit from 0.0002" to 0.001" in 0.0002" steps',
          'About 50 sq in per 1/8" electrode at 0.0005"',
          'Replacement electrodes in 1/8", 1/16" and 1/32"',
          '110V/60Hz, 4A; also available for 230V/50Hz',
          '15 lb, 11" x 6" x 5"',
        ],
      },
      {
        title: 'Applications',
        items: [
          'Diamond dusting needle holder and forceps jaws',
          'Restoring grip on instruments during repair',
          'Surgical and dental instrument manufacturing',
          'Cutting tools: end mills, taps, reamers, lathe bits, saws',
          'Punches, dies, collets, chucks and grippers',
        ],
      },
      {
        title: 'Used by',
        items: [
          'Surgical instrument repair companies',
          'Surgical and dental instrument manufacturers',
          'Machine shops and tool rooms',
          'Tool and die and stamping shops',
        ],
      },
    ],
    table: {
      title: 'Tooling: where to deposit, and how much',
      caption: 'Recommended tungsten carbide deposit by tool type, from the Carbitron 300 brochure',
      head: ['Tool', 'Deposit', 'Where', 'Then'],
      rows: [
        ['Lathe bits, single-point tools', '0.0004" to 0.004"', 'Top side of the cutting edge', 'Re-sharpen by grinding the front'],
        ['End mills, counterbores', '0.0002" to 0.0006"', 'Cutting edges inside the flute, bottom and sides, full length', 'Re-sharpen'],
        ['Horizontal milling cutters, hobs', '0.0002" to 0.004"', 'Front face of each tooth along the cutting edge', 'Re-sharpen (grind the land on milling cutters)'],
        ['Shell mills', '0.0002" to 0.0006"', 'Front face of the cutting surface along the edge', 'Re-sharpen'],
        ['Reamers', '0.0002" to 0.0008"', 'Inside the flute along the cutting edge', 'Re-sharpen'],
        ['Countersinks', '0.0002" to 0.0006"', 'Cutting edge inside the flute, full length', 'Re-sharpen'],
        ['Taps', '0.0002" to 0.001"', 'Inside the flute along the cutting edge, 2 to 3 full threads', 'Re-sharpen dull taps first'],
        ['Thread chasers', '0.0002" to 0.001"', 'Top cutting edge', 'Re-sharpen dull chasers first'],
        ['Saws', '0.0002" to 0.001"', 'Front edge of each tooth (sides of the teeth on very fine saws)', 'Re-sharpen'],
        ['Punches and dies', '0.0002" to 0.001"', 'Sides, face or both, wherever it wears', 'Usually coat the sides and grind the face'],
        ['Molds, chucks, grippers, collets', '0.0002" to 0.004"', 'The entire wear or gripping surface', 'Finish with a light 0.0002" coat for smoothness'],
      ],
      note: 'In every application, a light stoning with a cubic boron nitride or diamond stone removes burrs and gives the sharpest edge and smoothest surface.',
    },
  },
  {
    slug: 'micro-jet-200',
    id: 'micro-jet',
    title: 'Micro-Jet 200 Micro-Abrasive Blasting System',
    metaTitle: 'Micro-Jet 200 Micro-Abrasive Blaster, {from} | Hunter Products',
    metaDescription:
      'Precision micro-abrasive blasting to clean, etch and prep small or delicate parts where standard blasting does damage. Built in NJ, ships same day.',
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
