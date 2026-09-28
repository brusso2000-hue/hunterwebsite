import type { SystemId } from './catalog';

export interface Application {
  /** Anchor id — matches slugify() of the product.applications labels. */
  id: string;
  label: string;
  code: string;
  title: string;
  lede: string;
  body: string[];
  workflows: string[];
  systems: SystemId[];
  recommended: string[]; // product slugs
  /** 'core' = largest customer base (lead with it); 'growth' = market we're expanding into. */
  focus?: 'core' | 'growth';
}

export const APPLICATIONS: Application[] = [
  {
    id: 'electronics-pcb',
    label: 'Electronics & PCB',
    code: 'EP',
    focus: 'core',
    title: 'PCB rework, contact plating, and electronics restoration',
    lede: 'Restore solderability and contact performance pad-by-pad, without bridging neighbors.',
    body: [
      'Electronics manufacturers and rework technicians use Micro-Metallizer pens for selective plating on PCB contacts, edge connectors, switch contacts, and connector pins. Tin plating restores solderability to oxidized pads and leads. Gold plating is the standard for premium contact restoration. The pen-tip precision avoids bridging adjacent pads or contaminating sensitive board areas.',
      'The Micro-Jet 200 micro-abrasive blaster handles PCB-level cleaning and surface preparation where conventional blasting would damage fine traces or component bodies.',
    ],
    workflows: [
      'Tin plating on PCB pads and component leads to restore solderability',
      'Gold plating on connector pins, switch contacts, and edge connectors',
      'Nickel underlayer for production gold contact plating sequences',
      'Selective surface prep on delicate boards using the Micro-Jet 200',
      'Palladium-nickel plating for premium connector manufacturing',
    ],
    systems: ['micro-metallizer', 'micro-jet'],
    recommended: [
      'contact-repair-kit',
      'tin-plating-pen',
      'gold-24k-plating-pen',
      'nickel-plating-pen',
      'palladium-plating-pen',
      'micro-jet-200-system',
    ],
  },
  {
    id: 'aerospace-defense',
    label: 'Aerospace & Defense',
    code: 'AD',
    focus: 'growth',
    title: 'Aerospace & defense maintenance and component repair',
    lede: 'Restore connectors, contact rings and fasteners in place — without pulling the assembly for tank plating.',
    body: [
      'Aerospace MRO (maintenance, repair and overhaul) shops use Hunter Products electroplating pens to restore worn or corroded surfaces on aircraft components — connectors, fasteners, contact rings, edge connectors — without full disassembly of the assembly the part lives in. Selective spot plating of nickel and gold restores conductivity and corrosion resistance in place, dramatically reducing repair turnaround vs. tank-based methods.',
      'Defense electronics teams use the same workflow on radar contacts, communications connectors, and avionics modules where pulling a sub-assembly for tank plating is impractical or impossible.',
    ],
    workflows: [
      'Contact restoration on multi-pin connectors and edge connectors',
      'Corrosion repair on fasteners and structural fittings (zinc, nickel)',
      'Heavy gold buildup on production-volume electrical contacts',
      'Copper flash + nickel underlayer + gold sequences for premium contact restoration',
    ],
    systems: ['micro-metallizer'],
    recommended: [
      'contact-repair-kit',
      'contact-repair-kit-heavy-duty',
      'gold-24k-plating-pen',
      'gold-24k-heavy-duty-plating-pen',
      'nickel-plating-pen',
      'zinc-plating-pen',
    ],
  },
  {
    id: 'medical-dental',
    label: 'Medical & Dental',
    code: 'MD',
    title: 'Medical instrument hardening and surgical-tool restoration',
    lede: 'Tungsten-carbide edge hardening that lets instruments be re-coated instead of replaced.',
    body: [
      'The Carbitron 300 — the diamond-dusting tungsten-carbide coating platform Hunter Products invented — is the standard tool for hardening cutting edges on surgical scalpels, scissors, dental burrs, and precision medical instruments. The deposited tungsten carbide layer extends the operational life of cutting edges far beyond untreated steel and lets older instruments be re-coated rather than replaced.',
      'Stainless steel instruments require specialized surface preparation before any plating step. The Stainless Steel Degreaser Pen is the correct prep for stainless substrates — the standard Absorbent / Degreaser pen will not work.',
    ],
    workflows: [
      'Tungsten-carbide edge hardening on scalpels, scissors, curettes, and explorers',
      'Selective coating of micro-tooling edges using the precision 1/32" electrode',
      'Stainless steel surface prep before any precious-metal plating step',
      'Cleaning and surface preparation on delicate dental and surgical instruments with the Micro-Jet 200',
    ],
    systems: ['carbitron', 'micro-jet', 'micro-metallizer'],
    recommended: [
      'carbitron-300-system',
      'tungsten-carbide-electrode-1-8',
      'tungsten-carbide-electrode-1-16',
      'tungsten-carbide-electrode-1-32',
      'stainless-steel-degreaser-pen',
      'micro-jet-200-system',
    ],
  },
  {
    id: 'jewelry-restoration',
    label: 'Jewelry & Restoration',
    code: 'JR',
    title: 'Jewelry repair, finishing, and antique restoration',
    lede: 'Gold, rhodium, silver and palladium on settings, clasps and engraved detail — no immersion.',
    body: [
      'Jewelry repair shops, antique restorers, and small-batch jewelry makers use Micro-Metallizer pens to selectively plate gold (14K, 18K, 24K), silver, rhodium, and palladium onto rings, clasps, settings, and decorative pieces. The pen format lets the operator plate intricate detail — engraved features, prong settings, mixed-metal joints — without immersing the whole piece in a tank, which is impractical or impossible for most repair jobs.',
      'Rhodium is the standard final finish for white-gold jewelry, giving the bright-white reflective surface customers expect. Silver Heavy Duty is the workhorse for silverware restoration where large surface areas would deplete standard cartridges too quickly.',
    ],
    workflows: [
      '14K / 18K / 24K gold spot plating on rings, clasps, watch crowns',
      'Rhodium finishing on white-gold settings',
      'Silverware restoration on trays, tea sets, serving pieces',
      'Palladium as a tarnish-resistant alternative to rhodium for fine jewelry',
      'Antique restoration: copper flash + nickel + final finish on mixed-substrate pieces',
    ],
    systems: ['micro-metallizer'],
    recommended: [
      'deluxe-plating-kit',
      'gold-24k-plating-pen',
      'gold-18k-plating-pen',
      'gold-14k-plating-pen',
      'rhodium-plating-pen',
      'silver-heavy-duty-plating-pen',
      'palladium-plating-pen',
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    code: 'MF',
    title: 'Industrial manufacturing and tooling',
    lede: 'Corrosion protection, production buildup and tool-edge hardening on the line.',
    body: [
      'Manufacturing operations use Hunter Products instruments for corrosion protection, decorative finishing, and tooling-edge hardening. Zinc plating provides sacrificial corrosion protection on steel fasteners and structural components. Heavy-duty copper, nickel, and silver pens handle production-volume buildup work on industrial parts. The Carbitron 300 deposits tungsten-carbide layers on cutting tools, dies, and wear surfaces.',
    ],
    workflows: [
      'Zinc touch-up on galvanized parts and exposed steel',
      'Heavy copper / nickel buildup on industrial busbars and contact rails',
      'Tungsten-carbide edge coating on production tooling',
      'Decorative chrome-color finishing on trim, hardware, and decorative components',
      'Surface preparation and matte finishing with the Micro-Jet 200',
    ],
    systems: ['micro-metallizer', 'carbitron', 'micro-jet'],
    recommended: [
      'deluxe-plating-kit-heavy-duty',
      'copper-heavy-duty-plating-pen',
      'nickel-heavy-duty-plating-pen',
      'zinc-plating-pen',
      'chrome-color-plating-pen',
      'carbitron-300-system',
    ],
  },
  {
    id: 'industrial-mro',
    label: 'Industrial MRO',
    code: 'MR',
    title: 'General industrial MRO and field repair',
    lede: 'Bring the system to the part, not the part to the shop.',
    body: [
      'Maintenance teams across heavy industry use Hunter Products pens for on-site, in-place repair of plated surfaces — touch-up of corrosion on galvanized steel, restoration of plated machinery surfaces, contact repair on industrial control panels, and field plating wherever sending the part out is not an option.',
      'The portability of the Micro-Metallizer system — 12V DC operation, no tanks, no waste handling, no plating bath — is the key advantage. Bring the system to the part, not the part to the shop.',
    ],
    workflows: [
      'Field zinc touch-up on galvanized structural components',
      'In-place restoration of nickel or copper coatings on machinery',
      'Industrial control panel and switchgear contact restoration',
      'Custom kit configurations for specific maintenance applications',
    ],
    systems: ['micro-metallizer'],
    recommended: [
      'deluxe-plating-kit',
      'micro-metallizer-power-supply',
      'micro-metallizer-connector-cables',
      'copper-plating-pen',
      'nickel-plating-pen',
      'zinc-plating-pen',
    ],
  },
];
