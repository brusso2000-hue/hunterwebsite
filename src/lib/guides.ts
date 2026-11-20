/**
 * Problem-focused guide pages (/guides/<slug>/).
 *
 * Each guide targets one search a buyer actually runs ("gold plate connector pins",
 * "pcb gold finger repair") and ends at the kit that solves it.
 *
 * Every number here comes from the Micro-Metallizer catalog
 * (public/pdfs/Hunter_Micro-Metallizer_Catalog.pdf), the Carbitron 300 brochure
 * (public/pdfs/Carbitron_300_Brochure.pdf) or src/data/products.json. The diamond-dusting
 * guide also draws on HPN, "Proper care, inspection crucial for needle holder performance"
 * (hpnonline.com) for jaw types and ring markings.
 * Do not add specs that are not in one of those two sources.
 */

export interface GuideStep {
  title: string;
  text: string;
}

export interface GuideTable {
  caption: string;
  head: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  steps?: GuideStep[];
  table?: GuideTable;
  note?: string;
}

export interface Guide {
  slug: string;
  /** Root-level URL for pillar pages (e.g. '/brush-plating/'). Omit for normal /guides/<slug>/ pages. */
  path?: string;
  /** Short label for cards and nav. */
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  lede: string;
  /** Two-to-three sentence direct answer shown at the top. Written to be quotable as a search snippet. */
  answer: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Product slugs shown in the "What you need" panel, first one is the headline pick. */
  products: string[];
  /** Other guide slugs to link at the bottom. */
  related: string[];
  updated: string;
}

// ── Shared catalog data ──────────────────────────────────────────────

const VOLTAGE_TABLE: GuideTable = {
  caption: 'Operating voltage by pen (DC), from the Micro-Metallizer catalog',
  head: ['Pen', 'Catalog no.', 'Voltage (DC)', 'Plates over'],
  rows: [
    ['Absorbent / Degreaser', 'PL-1002', '10 to 12V', 'Cleans all metals except stainless steel'],
    ['Stainless Steel Degreaser', 'PL-1014', '10 to 12V', 'Cleans and activates stainless steel'],
    ['Gold 24K / 18K / 14K', 'PL-1003 / 1004 / 1005', '6 to 8V', 'Gold, nickel, silver'],
    ['Gold 24K / 18K Heavy', 'PL-1016 / 1017', '6 to 8V', 'Gold, nickel, silver'],
    ['Nickel', 'PL-1006', '5 to 6V', 'Copper (copper flash other metals first)'],
    ['Nickel Heavy', 'PL-1020', '5 to 6V', 'Copper (copper flash other metals first)'],
    ['Black Nickel', 'PL-1007', '8 to 10V', 'Copper (copper flash other metals first)'],
    ['Silver', 'PL-1008', '5 to 6V', 'Any metal except aluminum or chromium'],
    ['Silver Heavy', 'PL-1018', '5 to 6V', 'Any metal except aluminum or chromium'],
    ['Copper', 'PL-1010', '6 to 8V', 'Any metal except aluminum or chromium'],
    ['Copper Heavy', 'PL-1019', '6 to 8V', 'Any metal except aluminum or chromium'],
    ['Tin', 'PL-1012', '6 to 8V', 'Any metal except aluminum or chromium'],
    ['Zinc', 'PL-1013', '6 to 8V', 'Any metal except aluminum or chromium'],
    ['Chrome Color', 'PL-1009', '6 to 8V', 'Copper (copper flash other metals first)'],
    ['Rhodium', 'PL-1011', '8 to 10V', 'Nickel (copper, then nickel, on other metals)'],
    ['Palladium', 'PL-1015', '6 to 8V', 'Nickel (copper, then nickel, on other metals)'],
  ],
};

const RATE_TABLE: GuideTable = {
  caption: 'Typical deposit on a 1 in × 1 in copper surface, from the Micro-Metallizer catalog',
  head: ['Pen type', '2 minutes', '3 minutes'],
  rows: [
    ['Gold', '0.5 µm', '0.8 µm'],
    ['Palladium', '0.5 µm', '0.8 µm'],
    ['Silver', '0.5 µm', '0.8 µm'],
    ['Rhodium', '0.7 µm', '1.0 µm'],
    ['Nickel', '0.4 µm', '0.6 µm'],
    ['Black Nickel', '0.5 µm', '0.6 µm'],
    ['Copper, Zinc, Tin, Chrome Color', '0.3 µm', '0.5 µm'],
    ['Gold Heavy', '0.8 µm', '1.2 µm'],
    ['Silver Heavy', '0.8 µm', '1.2 µm'],
    ['Copper Heavy', '0.6 µm', '1.0 µm'],
    ['Nickel Heavy', '0.8 µm', '1.2 µm'],
  ],
};

const HOOKUP =
  'Connect the part to the negative (−) lead of the power supply and the pen to the positive (+) lead. Hold the pen so the whole tip touches the surface, and move it lightly back and forth in a slow stroke.';

const PREP_STEP: GuideStep = {
  title: 'Remove oxide and discoloration',
  text: 'If the surface is discolored or oxidized, polish it with a fine metal polish until the oxide is gone, then wipe it clean with a lint-free cloth.',
};

const DEGREASE_STEP: GuideStep = {
  title: 'Degrease at 10 to 12V',
  text: `Set the supply to 10 to 12V and use the Absorbent / Degreaser pen (PL-1002). ${HOOKUP} Small bubbles form as oil and grease come off. Wipe the area clean with a cloth when done. Stainless steel takes the Stainless Steel Degreaser pen (PL-1014) instead.`,
};

// ── Guides ──────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [

  // ── Pillar pages (root URLs) ────────────────────────────────────────
  // These target the head terms "brush plating" and "selective plating" and
  // link out to every narrower guide. Rendered at /brush-plating/ and /selective-plating/.
  {
    slug: 'brush-plating',
    path: '/brush-plating/',
    label: 'Brush plating',
    h1: 'Brush plating: how it works, what it plates, and the equipment you need',
    metaTitle: 'Brush Plating: Process, Equipment & Kits from $400',
    metaDescription:
      'What brush plating is, how it works, which metals it plates, how thick it goes and what it costs. Brush plating kits from $400 that ship same day.',
    eyebrow: 'Brush plating explained',
    lede: 'Brush plating is electroplating without the tank. The solution rides in an absorbent tip, and metal goes down only where the tip touches the part. Hunter Products has sold brush plating equipment from Flemington, NJ since 1970.',
    answer:
      'Brush plating (also called selective plating, pen plating or tankless plating) is a form of electroplating where the plating solution is held in an absorbent tip on the positive lead of a DC power supply, and the part is connected to the negative lead. Metal deposits only where the tip touches, so you can plate a connector, pad or worn spot in place with no tank, no masking and no bath to dispose of.',
    sections: [
      {
        heading: 'How brush plating works',
        paragraphs: [
          'Tank plating and brush plating use the same chemistry: a DC current drives metal ions out of solution and onto a conductive part. In a tank, the whole part sits in the bath. In brush plating, the solution is carried in a tip and only the area under the tip is plated.',
          HOOKUP,
        ],
        steps: [
          { title: 'Degrease', text: 'Clean the work area with the Absorbent / Degreaser pen at 10 to 12V (stainless steel gets the Stainless Steel Degreaser pen). Wipe clean.' },
          { title: 'Build the base layer if the finish needs one', text: 'Flash copper on steel, brass or zinc die-cast, then nickel if the final finish is gold, rhodium or palladium. Wipe clean between pens.' },
          { title: 'Plate the finish', text: 'Run the finish pen at its catalog voltage with light, even strokes. More passes build more thickness.' },
          { title: 'Wipe clean', text: 'Wipe the plated area with a clean cloth. The part is ready to use.' },
        ],
      },
      {
        heading: 'What you can brush plate',
        paragraphs: [
          'The Micro-Metallizer line covers 16 pens: gold (24K, 18K, 14K), silver, nickel, black nickel, copper, tin, zinc, rhodium, palladium, chrome color, heavy-duty versions of the most-used metals, and two prep pens. One power supply runs all of them.',
        ],
        table: VOLTAGE_TABLE,
      },
      {
        heading: 'How thick brush plating goes',
        paragraphs: [
          'Standard pens build 1.5 to 1.8 µm. Heavy-duty pens build 3 to 3.6 µm. Thickness depends on time under the tip, so you control it by the number of passes.',
        ],
        table: RATE_TABLE,
      },
      {
        heading: 'Brush plating equipment',
        paragraphs: [
          'A brush plating setup is three things: a variable DC power supply, connector cables, and the plating pens. Each pen is a sealed cartridge holding 10 ml of concentrated solution, enough for roughly 300 square inches. There is no bath chemistry to mix, maintain or dispose of.',
        ],
        table: {
          caption: 'Micro-Metallizer brush plating kits and parts',
          head: ['Item', 'Catalog no.', 'What it includes', 'Price'],
          rows: [
            ['Contact Repair Kit', 'PL-1000C', 'Power supply, cables, gold, nickel and prep pens for contact work', '$400'],
            ['Contact Repair Kit (Heavy Duty)', 'PL-1000CHD', 'Contact Repair Kit with heavy-duty pens', '$525'],
            ['Deluxe Kit', 'PL-1000K', 'Power supply, cables and 6 pens', '$540'],
            ['Deluxe Kit (Heavy Duty)', 'PL-1000HD', 'Power supply, cables and 6 heavy-duty pens', '$900'],
            ['Power Supply', 'PL-1000', 'Variable DC supply, 110V/60Hz or 220V/50Hz', '$220'],
            ['Individual pens', 'PL-1002 to PL-1020', 'One metal or prep step per pen', '$65 to $310'],
          ],
        },
        note: 'Every pen and kit ships same day from New Jersey on orders placed by 2 PM ET on business days.',
      },
      {
        heading: 'Where brush plating is used',
        list: [
          'Restoring gold on worn connector pins, edge connectors and PCB gold fingers',
          'Re-tinning oxidized PCB pads so they take solder again',
          'Zinc touch-up on scratched or rusted plated steel',
          'Silver on electrical contacts and bus bars',
          'Nickel and copper underlayers before a final finish',
          'Rhodium or palladium on high-wear contact surfaces',
          'Prototype and field work where a tank line is not practical',
        ],
      },
      {
        heading: 'Brush plating vs tank plating',
        paragraphs: [
          'Brush plating wins when you need a finish on part of a part, need it in place, or need it today. Tank plating wins when you need the whole part covered, deposits thicker than a few microns, or thousands of parts a day. Many shops use both: a plating line for production and a brush plating kit for repair, rework and touch-up.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is brush plating?',
        a: 'Brush plating is electroplating done with a solution-soaked tip instead of a tank. The part is connected to the negative lead of a DC supply, the tip to the positive lead, and metal deposits wherever the tip touches.',
      },
      {
        q: 'What else is brush plating called?',
        a: 'Selective plating, selective brush plating, brush electroplating, pen plating, spot plating and tankless plating all describe the same process.',
      },
      {
        q: 'How long does a brush plating pen last?',
        a: 'Each Micro-Metallizer pen holds 10 ml of solution and covers roughly 300 square inches.',
      },
      {
        q: 'What voltage is used for brush plating?',
        a: 'It depends on the metal. Degreasing runs at 10 to 12V, nickel and silver at 5 to 6V, gold, copper, tin and zinc at 6 to 8V, and rhodium and black nickel at 8 to 10V.',
      },
      {
        q: 'Can you brush plate nickel?',
        a: 'Yes. The Nickel pen (PL-1006) and Nickel Heavy Duty pen (PL-1020) plate over copper at 5 to 6V. Flash copper first on steel, brass and other metals.',
      },
      {
        q: 'Can you brush plate aluminum?',
        a: 'Not with the Micro-Metallizer system. Contact Hunter Products to discuss aluminum parts.',
      },
      {
        q: 'How much does brush plating equipment cost?',
        a: 'A complete Micro-Metallizer kit starts at $400 (Contact Repair Kit). The power supply alone is $220 and pens run $65 to $310.',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'deluxe-plating-kit-heavy-duty', 'micro-metallizer-power-supply'],
    related: ['brush-plating-vs-tank-plating', 'brush-plating-thickness-chart', 'plating-pen-voltage-chart', 'brush-plating-substrate-guide', 'brush-plating-cost', 'plating-pen-kit-comparison', 'gold-plating-pen-guide', 'silver-plating-pen-guide', 'nickel-plating-pen-guide', 'copper-plating-pen-guide', 'tin-plating-pen-guide', 'zinc-plating-pen-touch-up', 'palladium-plating-pen-guide', 'rhodium-plating-pen-guide', 'selective-plating'],
    updated: '2026-11-16',
  },

  {
    slug: 'selective-plating',
    path: '/selective-plating/',
    label: 'Selective plating',
    h1: 'Selective plating: plate only the area you need',
    metaTitle: 'Selective Plating Equipment: No Tank, No Masking',
    metaDescription:
      'Selective plating puts gold, nickel, tin or silver only where it is needed. Compare masking, production and brush methods. Plate in place, kits from $400.',
    eyebrow: 'Selective plating explained',
    lede: 'Selective plating means putting metal on one area of a part and nowhere else: a contact surface, a solder pad, a worn spot. There are several ways to do it, and the right one depends on volume and whether the part can leave the bench.',
    answer:
      'Selective plating deposits metal only on a defined area of a part instead of the whole surface. In production it is done by masking parts or plating strip in specialized lines. For repair, rework, prototypes and in-place work, selective brush plating does it with a pen-style tip and a DC power supply: no tank, no masking, and precious metal goes only where you put it.',
    sections: [
      {
        heading: 'Why plate selectively',
        list: [
          'Precious metal goes only on the functional surface, which cuts gold, silver and rhodium use',
          'Parts can be plated in place without disassembly',
          'No masking to apply and strip on one-off and low-volume jobs',
          'Repairs a worn or damaged area without re-plating the whole part',
          'Puts solderable tin on pads without touching the rest of the board',
        ],
      },
      {
        heading: 'Selective plating methods compared',
        table: {
          caption: 'Common ways to plate selectively',
          head: ['Method', 'How the area is controlled', 'Best for'],
          rows: [
            ['Masking + tank', 'Tape, lacquer or fixtures cover what should not plate; part goes in the bath', 'Production runs where the mask can be reused or automated'],
            ['Production selective lines', 'Strip or parts are plated to a set depth or zone on dedicated equipment', 'High-volume connectors and stamped contacts'],
            ['Selective brush plating', 'Only the area under the plating tip receives metal', 'Repair, rework, prototypes, field work, low volume'],
          ],
        },
      },
      {
        heading: 'Selective brush plating with the Micro-Metallizer',
        paragraphs: [
          'The Micro-Metallizer is a selective brush plating system: a variable DC power supply, connector cables and self-contained plating pens. The pen tip defines the plated area, so there is nothing to mask on most jobs. Swap pens to run a full sequence on the same supply.',
          HOOKUP,
        ],
        steps: [
          { title: 'Degrease the target area', text: 'Absorbent / Degreaser pen at 10 to 12V, or the Stainless Steel Degreaser pen on stainless. Wipe clean.' },
          { title: 'Underlayer', text: 'Copper flash on steel, brass or zinc die-cast; nickel at 5 to 6V before gold, rhodium or palladium. Wipe clean between pens.' },
          { title: 'Selective finish', text: 'Plate the finish only where it is needed, at the pen\'s catalog voltage. More passes build more thickness.' },
          { title: 'Wipe clean', text: 'Wipe the plated area with a clean cloth.' },
        ],
      },
      {
        heading: 'Selective gold, tin, nickel and silver',
        list: [
          'Selective gold plating: connector pins, edge connectors, PCB gold fingers and switch contacts (Gold 24K, 18K, 14K and heavy-duty pens)',
          'Selective tin plating: oxidized PCB pads and component leads that will not take solder (Tin pen, PL-1012)',
          'Selective nickel plating: diffusion barrier under gold and base for rhodium and palladium (Nickel and Nickel Heavy Duty pens)',
          'Selective silver plating: contacts and bus bar surfaces (Silver and Silver Heavy Duty pens)',
          'Selective zinc plating: corrosion touch-up on plated steel (Zinc pen, PL-1013)',
        ],
      },
      {
        heading: 'Thickness and coverage',
        paragraphs: [
          'Standard pens build 1.5 to 1.8 µm and heavy-duty pens build 3 to 3.6 µm. Each pen holds 10 ml of solution and covers roughly 300 square inches. For deposits much thicker than that, or for whole-part finishing at volume, a tank line is the better tool.',
        ],
        table: RATE_TABLE,
      },
    ],
    faq: [
      {
        q: 'What is selective plating?',
        a: 'Plating only a defined area of a part, such as a contact surface or solder pad, instead of the whole part.',
      },
      {
        q: 'Is selective plating the same as brush plating?',
        a: 'Brush plating is one form of selective plating. Selective plating can also be done by masking parts before tank plating or on dedicated production lines.',
      },
      {
        q: 'Do I need masking for selective brush plating?',
        a: 'Usually not. Metal deposits only where the pen tip touches.',
      },
      {
        q: 'What is selective gold plating used for?',
        a: 'Putting gold only on contact surfaces such as connector pins, edge connectors and PCB gold fingers, which saves gold and leaves the rest of the part as is.',
      },
      {
        q: 'What equipment do I need for selective plating?',
        a: 'For brush-style selective plating: a DC power supply, connector cables, a degreaser pen and the plating pens for your sequence. Micro-Metallizer kits with all of that start at $400.',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'tin-plating-pen', 'gold-24k-plating-pen'],
    related: ['brush-plating', 'gold-plating-connector-pins', 'pcb-gold-finger-repair', 'restore-pcb-pad-solderability', 'tin-plating-pen-guide', 'nickel-plating-pen-guide', 'brush-plating-vs-tank-plating', 'brush-plating-substrate-guide'],
    updated: '2026-11-16',
  },
  {
    slug: 'gold-plating-connector-pins',
    label: 'Gold plating connector pins',
    h1: 'How to gold plate connector pins without a tank',
    metaTitle: 'Gold Plate Connector Pins Without a Tank: 3 Pens, 2 Minutes',
    metaDescription:
      'Restore worn or corroded connector pins in place: degrease, nickel at 5 to 6V, 24K gold at 6 to 8V. About 0.5 µm in 2 minutes. Full kit $400, ships same day.',
    eyebrow: 'Contact restoration',
    lede: 'Worn or corroded connector pins can be re-plated in place with a brush plating pen. No tank, no masking the whole part, and usually no pulling the connector out of the assembly.',
    answer:
      'Degrease the pin with an absorbent pen at 10 to 12V DC, plate a nickel underlayer at 5 to 6V wherever base copper shows, then brush 24K gold at 6 to 8V. A standard gold pen deposits about 0.5 µm in 2 minutes on a 1 in² area. All three pens, the power supply and cables come in the $400 Contact Repair Kit.',
    sections: [
      {
        heading: 'When brush plating is the right fix',
        paragraphs: [
          'Tank plating means removing the part, masking everything you do not want plated, and sending it to a plating line. For a handful of worn pins on a connector that is still installed, that is days of turnaround for a few square millimeters of gold.',
          'Brush plating puts the solution in the tip of a pen. Metal deposits only where the tip touches, so you can restore one pin at a time at the bench or in the field. Electronics rework shops, aerospace MRO crews and avionics repair shops use this workflow on connector pins, edge connectors and switch contacts.',
        ],
      },
      {
        heading: 'Why nickel goes under the gold',
        paragraphs: [
          'The gold pens plate over gold, nickel or silver. They do not go directly onto copper. If wear has exposed the copper base metal, you need a nickel layer first. Nickel plates directly over copper and acts as the diffusion barrier that keeps copper from migrating into the gold.',
          'If the pin is brass or steel rather than copper, add one more step before the nickel: a copper flash with the Copper pen (PL-1010). If only the gold is worn thin and the nickel underneath is intact, you can clean and go straight to gold.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Copper flash, only on brass or steel',
            text: 'On non-copper pins, plate a thin copper layer with the Copper pen (PL-1010) at 6 to 8V so the nickel has a compatible base. Wipe clean with a cloth. Skip this on copper pins.',
          },
          {
            title: 'Nickel underlayer at 5 to 6V',
            text: 'Plate nickel with the Nickel pen (PL-1006) over any exposed copper. A standard nickel pen lays down about 0.4 µm in 2 minutes on a 1 in² area. Wipe clean with a cloth.',
          },
          {
            title: 'Plate 24K gold at 6 to 8V',
            text: 'Switch to the Gold 24K pen (PL-1003), set 6 to 8V, and stroke the pin until you have an even gold finish. About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'How much gold you can build',
        paragraphs: [
          'Standard pens reach a maximum of 1.5 to 1.8 µm. Heavy-duty pens carry more solution per cartridge and reach 3 to 3.6 µm, with the Gold Heavy pen depositing about 0.8 µm in 2 minutes. Each pen holds 10 ml of concentrated solution and covers roughly 300 square inches.',
        ],
        table: {
          caption: 'Gold and nickel deposit on a 1 in × 1 in copper surface',
          head: ['Pen', '2 minutes', '3 minutes', 'Maximum'],
          rows: [
            ['Gold 24K (PL-1003)', '0.5 µm', '0.8 µm', '1.5 to 1.8 µm'],
            ['Gold 24K Heavy (PL-1016)', '0.8 µm', '1.2 µm', '3 to 3.6 µm'],
            ['Nickel (PL-1006)', '0.4 µm', '0.6 µm', '1.5 to 1.8 µm'],
            ['Nickel Heavy (PL-1020)', '0.8 µm', '1.2 µm', '3 to 3.6 µm'],
          ],
        },
      },
      {
        heading: 'Standard or heavy-duty kit',
        paragraphs: [
          'The Contact Repair Kit (PL-1000C, $400) includes the power supply, connector cables, and the Absorbent, Nickel and Gold 24K pens. Bought separately those parts come to $520.',
          'For production-volume work such as switch-bank refurbishment or multi-pin connector repair, the Heavy Duty Contact Repair Kit (PL-1000CHD, $525) swaps in heavy-duty nickel and gold pens for thicker deposits and fewer cartridge changes.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I gold plate directly onto copper connector pins?',
        a: 'No. The gold pens plate over gold, nickel or silver. Plate a nickel underlayer over the copper first, then the gold.',
      },
      {
        q: 'Do I have to remove the connector to re-plate it?',
        a: 'Usually not. Brush plating only deposits where the pen tip touches, so pins can be restored in place without pulling the assembly for tank plating.',
      },
      {
        q: 'What voltage do I use to gold plate a pin?',
        a: 'Degrease at 10 to 12V DC, plate nickel at 5 to 6V, and plate gold at 6 to 8V. The part goes on the negative lead and the pen on the positive lead.',
      },
      {
        q: 'How thick is brush-plated gold?',
        a: 'A standard 24K gold pen deposits about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm. The heavy-duty gold pen reaches 3 to 3.6 µm.',
      },
      {
        q: 'Which gold should I use for electrical contacts?',
        a: '24K. Pure gold gives the best conductivity and corrosion resistance for connector pins, edge connectors and switch contacts.',
      },
    ],
    products: ['contact-repair-kit', 'contact-repair-kit-heavy-duty', 'gold-24k-plating-pen', 'nickel-plating-pen'],
    related: ['pcb-gold-finger-repair', 'nickel-plating-pen-guide', 'brush-plating-thickness-chart', 'brush-plating-substrate-guide'],
    updated: '2026-09-30',
  },

  {
    slug: 'pcb-gold-finger-repair',
    label: 'PCB gold finger repair',
    h1: 'PCB gold finger repair: re-plating worn edge connectors',
    metaTitle: 'PCB Gold Finger Repair: Re-Plate Edge Connectors, No Tank',
    metaDescription:
      'Re-plate worn gold fingers one at a time, right on the board: nickel over exposed copper, then 24K gold. Voltages, plating times and the $400 kit. Ships same day.',
    eyebrow: 'Electronics & PCB',
    lede: 'Edge-connector fingers wear through from repeated insertion. A plating pen restores them finger by finger, on the board, without bridging the neighbors.',
    answer:
      'Clean the worn fingers, degrease at 10 to 12V DC, plate nickel at 5 to 6V over any exposed copper, then plate 24K gold at 6 to 8V. Because metal only deposits where the pen tip touches, you can restore one finger at a time without a plating tank. The Contact Repair Kit ($400) has everything needed.',
    sections: [
      {
        heading: 'Signs the fingers need re-plating',
        list: [
          'Copper showing through the gold on the contact area',
          'Dull, discolored or corroded fingers',
          'Intermittent contact when the board is seated',
          'Visible wear tracks from repeated insertion',
        ],
      },
      {
        heading: 'Why a pen instead of a tank',
        paragraphs: [
          'Tank plating a populated board is not practical, and stripping components to plate the edge connector costs more than the repair is worth. With a plating pen, the solution stays in the tip. You plate the finger you are touching and nothing else, which is why rework technicians use it on boards that are otherwise good.',
          'Hunter pens are self-contained cartridges, so there is no bath to mix, maintain or dispose of.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Check what is exposed',
            text: 'If copper shows through, it needs nickel before gold. If the gold is only thin and the nickel underneath is intact, go straight to gold.',
          },
          {
            title: 'Nickel over exposed copper at 5 to 6V',
            text: 'Plate with the Nickel pen (PL-1006), working one finger at a time. About 0.4 µm in 2 minutes on a 1 in² area. Wipe clean with a cloth.',
          },
          {
            title: '24K gold at 6 to 8V',
            text: 'Plate each finger with the Gold 24K pen (PL-1003). About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area. Standard pens reach 1.5 to 1.8 µm maximum.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the fingers with a clean, soft cloth before reseating the board.',
          },
        ],
      },
      {
        heading: 'Cleaning badly contaminated fingers',
        paragraphs: [
          'For fingers with heavy corrosion or residue, the Micro-Jet 200 micro-abrasive blaster handles PCB-level cleaning and surface prep with controlled particle delivery, so it cleans the contact without damaging fine traces or nearby component bodies.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'The Contact Repair Kit (PL-1000C, $400) includes the power supply, connector cables and the Absorbent, Nickel and Gold 24K pens. Replacement Gold 24K pens are $145 and Nickel pens are $70. Each pen holds 10 ml of solution and covers roughly 300 square inches, which is a lot of gold fingers.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you repair PCB gold fingers without replacing the board?',
        a: 'Yes. Worn fingers can be re-plated on the board with a brush plating pen: degrease, nickel over any exposed copper, then 24K gold.',
      },
      {
        q: 'Will plating one finger bridge to the next?',
        a: 'Metal only deposits where the pen tip touches, so careful work plates one finger without plating its neighbors.',
      },
      {
        q: 'Do I need nickel under the gold on PCB fingers?',
        a: 'If copper is exposed, yes. The gold pens plate over gold, nickel or silver, not bare copper. If the original nickel is intact, plate gold directly after cleaning.',
      },
      {
        q: 'What kit do I need for gold finger repair?',
        a: 'The Contact Repair Kit (PL-1000C) has the power supply, cables, and Absorbent, Nickel and Gold 24K pens. The heavy-duty version (PL-1000CHD) is for higher-volume work.',
      },
    ],
    products: ['contact-repair-kit', 'gold-24k-plating-pen', 'nickel-plating-pen', 'micro-jet-200-system'],
    related: ['gold-plating-connector-pins', 'restore-pcb-pad-solderability', 'nickel-plating-pen-guide', 'plating-time-thickness-conversion'],
    updated: '2026-09-30',
  },

  {
    slug: 'restore-pcb-pad-solderability',
    label: 'Restoring PCB pad solderability',
    h1: 'How to restore solderability on oxidized PCB pads',
    metaTitle: 'PCB Pads Will Not Take Solder? Re-Tin Them in Place',
    metaDescription:
      'Restore solderability on oxidized PCB pads and leads: re-tin them in place with a $70 tin plating pen, no underlayer. Steps, voltages and parts list.',
    eyebrow: 'Electronics & PCB',
    lede: 'Old or oxidized tin on pads, leads, terminals and lugs stops wetting with solder. Selectively re-tinning with a plating pen restores normal soldering without reworking the whole board.',
    answer:
      'Clean the pad, degrease it with an absorbent pen at 10 to 12V DC, then plate tin at 6 to 8V with the part on the negative lead and the pen on the positive. Tin plates directly onto copper and most other metals (not aluminum or chromium), so no underlayer is needed.',
    sections: [
      {
        heading: 'Why pads stop taking solder',
        paragraphs: [
          'Tin surfaces oxidize with age and storage. Once the oxide builds up, solder beads up instead of wetting the pad. Re-plating a fresh tin layer on just the affected pads or leads brings back normal soldering behavior.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Plate tin at 6 to 8V',
            text: `Set the supply to 6 to 8V and use the Tin pen (PL-1012). ${HOOKUP} Expect about 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area.`,
          },
          {
            title: 'Wipe clean',
            text: 'Wipe with a clean, soft cloth. The pad is ready to solder.',
          },
        ],
      },
      {
        heading: 'Substrate check',
        paragraphs: [
          'Tin plates over any metallic surface except aluminum and chromium. Copper pads, brass terminals and steel leads all take tin directly.',
        ],
      },
      {
        heading: 'Parts list',
        list: [
          'Micro-Metallizer Power Supply (PL-1000), $220',
          'Connector Cables (PL-1001), $20',
          'Absorbent / Degreaser pen (PL-1002), $65',
          'Tin plating pen (PL-1012), $70',
        ],
        note: 'Total $375. If you also restore gold contacts, the Contact Repair Kit ($400) includes the supply, cables, absorbent, nickel and gold pens; add the Tin pen for $70.',
      },
    ],
    faq: [
      {
        q: 'How do you fix PCB pads that will not take solder?',
        a: 'Remove the oxide, degrease at 10 to 12V DC with an absorbent pen, then re-plate tin at 6 to 8V with a tin plating pen. This restores solderability on the pad without reworking the board.',
      },
      {
        q: 'Do I need a nickel or copper layer before tin?',
        a: 'No. Tin plates directly over copper and most other metals. The exceptions are aluminum and chromium.',
      },
      {
        q: 'How thick is brush-plated tin?',
        a: 'About 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area with a standard tin pen.',
      },
    ],
    products: ['tin-plating-pen', 'absorbent-degreaser-plating-pen', 'micro-metallizer-power-supply', 'contact-repair-kit'],
    related: ['tin-plating-pen-guide', 'pcb-gold-finger-repair', 'brush-plating-substrate-guide', 'brush-plating-vs-tank-plating'],
    updated: '2026-09-30',
  },

  {
    slug: 'brush-plating-vs-tank-plating',
    label: 'Brush plating vs tank plating',
    h1: 'Brush plating vs tank plating: when each one wins',
    metaTitle: 'Brush Plating vs Tank Plating: Cost, Thickness, When to Use',
    metaDescription:
      'Brush plating coats only where the pen touches: no tank, masking or bath waste. Compare area, thickness, turnaround and cost, and see when a tank line is still the better call.',
    eyebrow: 'Selective plating basics',
    lede: 'Brush plating and tank plating deposit metal the same way. The difference is where the solution lives, and that decides which one fits your job.',
    answer:
      'Brush plating holds the solution in a pen tip and plates only where it touches, so parts can be plated in place with no tank, masking or bath waste. Tank plating immerses the whole part, which suits thick buildup and high-volume whole-part finishing. For spot repair, touch-up and contact restoration, brush plating is faster and cheaper.',
    sections: [
      {
        heading: 'Side by side',
        table: {
          caption: 'Brush plating vs tank plating',
          head: ['', 'Tank plating', 'Brush plating'],
          rows: [
            ['Area plated', 'Entire immersed part', 'Only the work area'],
            ['Disassembly', 'Part removed and masked', 'Plate in place'],
            ['Where', 'Plating line', 'Bench or field'],
            ['Solution', 'Open bath to maintain', 'Sealed pen cartridge'],
            ['Waste', 'Bath disposal', 'No bath to dispose'],
            ['Thickness', 'Built to spec on the line', '1.5 to 1.8 µm standard pens, 3 to 3.6 µm heavy-duty'],
            ['Best for', 'Whole parts, production finishing, thick deposits', 'Spot repair, touch-up, contacts, prototypes'],
          ],
        },
      },
      {
        heading: 'Where brush plating wins',
        list: [
          'Restoring worn connector pins, edge connectors and switch contacts in place',
          'Re-tinning oxidized PCB pads and component leads',
          'Touch-up and corrosion repair on installed fasteners and fittings',
          'Prototype and development work where setting up a bath is not worth it',
          'Field repairs where the part cannot travel to a plating shop',
        ],
      },
      {
        heading: 'Where tank plating wins',
        paragraphs: [
          'If you need to plate the entire part, need deposits thicker than a few microns, or are finishing thousands of parts a day, a plating line is the right tool. Brush plating pens top out at 1.5 to 1.8 µm with standard pens and 3 to 3.6 µm with heavy-duty pens.',
        ],
      },
      {
        heading: 'What brush plating costs to start',
        paragraphs: [
          'A complete Micro-Metallizer kit with power supply, cables and pens starts at $400 for the Contact Repair Kit. Individual pens run $65 to $310 depending on the metal. Each pen holds 10 ml of concentrated solution and covers roughly 300 square inches. There is no bath chemistry to buy, maintain or dispose of.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between brush plating and electroplating?',
        a: 'Brush plating is a form of electroplating. Instead of immersing the part in a tank, the solution is held in an absorbent tip on the positive lead of a DC supply, and metal deposits only where the tip touches.',
      },
      {
        q: 'Is brush plating as good as tank plating?',
        a: 'For selective work like contact restoration, touch-up and re-tinning, yes. For thick deposits or plating whole parts in volume, tank plating is the better fit.',
      },
      {
        q: 'Is brush plating the same as selective plating?',
        a: 'Yes. Brush plating, selective plating, spot plating and pen plating all describe plating only a chosen area without a tank.',
      },
    ],
    products: ['deluxe-plating-kit', 'contact-repair-kit', 'deluxe-plating-kit-heavy-duty'],
    related: ['brush-plating-cost', 'brush-plating-thickness-chart', 'brush-plating-substrate-guide'],
    updated: '2026-09-30',
  },

  {
    slug: 'brush-plating-thickness-chart',
    label: 'Plating thickness and voltage chart',
    h1: 'Brush plating thickness, plating rates and voltage chart',
    metaTitle: 'Brush Plating Thickness & Voltage Chart (Gold, Nickel, Zinc)',
    metaDescription:
      'How thick does brush plating get? 1.5 to 1.8 µm standard, 3 to 3.6 µm heavy-duty. Plating rates and voltages for gold, silver, nickel, rhodium, palladium, copper, tin and zinc.',
    eyebrow: 'Technical reference',
    lede: 'Plating rates, maximum thickness, coverage and operating voltage for every Micro-Metallizer pen, in one place.',
    answer:
      'Standard Micro-Metallizer pens build up to 1.5 to 1.8 µm; heavy-duty pens reach 3 to 3.6 µm. On a 1 in² copper surface, a gold pen deposits about 0.5 µm in 2 minutes. Each pen holds 10 ml of solution and covers roughly 300 square inches. Operating voltage ranges from 5 to 12V DC depending on the pen.',
    sections: [
      {
        heading: 'Plating rate by metal',
        table: RATE_TABLE,
      },
      {
        heading: 'Maximum thickness and coverage',
        list: [
          'Standard pens: 1.5 to 1.8 µm maximum',
          'Heavy-duty pens: 3 to 3.6 µm maximum',
          'Each pen: 10 ml of concentrated solution, roughly 300 square inches of coverage',
        ],
      },
      {
        heading: 'Operating voltage by pen',
        table: VOLTAGE_TABLE,
        paragraphs: [
          'Power comes from the Micro-Metallizer variable DC supply (110V/60Hz or 220V/50Hz input) or your own variable DC supply up to 12V at 0.1A. The part connects to the negative lead and the pen to the positive lead.',
        ],
      },
    ],
    faq: [
      {
        q: 'How thick can brush plating get?',
        a: 'Standard Micro-Metallizer pens reach 1.5 to 1.8 µm. Heavy-duty pens reach 3 to 3.6 µm.',
      },
      {
        q: 'How fast does a gold plating pen plate?',
        a: 'About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² copper surface. The heavy-duty gold pen does about 0.8 µm in 2 minutes.',
      },
      {
        q: 'How much area does one plating pen cover?',
        a: 'Each pen holds 10 ml of concentrated plating solution and plates roughly 300 square inches.',
      },
      {
        q: 'What voltage does brush plating use?',
        a: 'Between 5 and 12V DC depending on the pen: 10 to 12V to degrease, 5 to 6V for nickel and silver, 6 to 8V for gold, copper, tin, zinc and palladium, 8 to 10V for rhodium and black nickel.',
      },
    ],
    products: ['deluxe-plating-kit', 'micro-metallizer-power-supply', 'gold-24k-heavy-duty-plating-pen'],
    related: ['plating-pen-voltage-chart', 'plating-time-thickness-conversion', 'brush-plating-substrate-guide', 'plating-pen-kit-comparison'],
    updated: '2026-09-30',
  },

  {
    slug: 'brush-plating-substrate-guide',
    label: 'Substrate and underlayer guide',
    h1: 'What can you brush plate onto? Substrate and underlayer guide',
    metaTitle: 'Brush Plating Substrates: Steel, Stainless, Brass, Copper',
    metaDescription:
      'Which metals take which brush plating finish, and when you need a copper flash or nickel underlayer. Steel, stainless steel, brass, copper, zinc die-cast and aluminum covered.',
    eyebrow: 'Technical reference',
    lede: 'Most plating failures come from putting a finish on a surface it will not bond to. This is the sequence each substrate needs before the final finish goes on.',
    answer:
      'Copper, silver, tin and zinc plate directly onto most metals except aluminum and chromium. Nickel, black nickel and chrome color need a copper base, so other metals get a copper flash first. Gold plates over gold, nickel or silver. Rhodium and palladium plate over nickel. Stainless steel needs its own degreaser, and aluminum is not supported.',
    sections: [
      {
        heading: 'Sequence by substrate',
        table: {
          caption: 'Prep and underlayers before the final finish',
          head: ['Substrate', 'Degrease with', 'Underlayer before nickel, chrome color', 'Underlayer before gold, rhodium, palladium'],
          rows: [
            ['Copper', 'Absorbent (PL-1002)', 'None', 'Nickel'],
            ['Brass', 'Absorbent (PL-1002)', 'Copper flash', 'Copper flash, then nickel'],
            ['Steel', 'Absorbent (PL-1002)', 'Copper flash', 'Copper flash, then nickel'],
            ['Zinc die-casting', 'Absorbent (PL-1002)', 'Copper flash', 'Copper flash, then nickel'],
            ['Stainless steel', 'Stainless Degreaser (PL-1014)', 'Copper flash', 'Copper flash, then nickel'],
            ['Nickel', 'Absorbent (PL-1002)', 'Copper flash (for chrome color)', 'None'],
            ['Gold or silver', 'Absorbent (PL-1002)', 'Copper flash', 'None for gold; copper flash, then nickel for rhodium or palladium'],
            ['Aluminum', 'Not supported', 'Not supported', 'Not supported'],
          ],
        },
        note: 'The catalog recommends a copper flash on zinc die-castings and steel before any other plating.',
      },
      {
        heading: 'Finishes that plate directly onto most metals',
        paragraphs: [
          'Copper, silver, tin and zinc plate over any metallic surface except aluminum and chromium. That makes the Copper pen the universal first layer: flash copper, and the part will accept nickel, chrome color and the rest of the sequence.',
        ],
      },
      {
        heading: 'Finishes that need a base layer',
        list: [
          'Nickel and black nickel: plate over copper; copper flash other metals first',
          'Chrome color: plates over copper; copper flash other metals first',
          'Gold 24K, 18K, 14K: plate over gold, nickel or silver',
          'Rhodium: plates over nickel; on other metals flash copper, then nickel',
          'Palladium: plates over nickel; on other metals flash copper, then nickel',
        ],
      },
      {
        heading: 'Stainless steel and aluminum',
        paragraphs: [
          'The standard Absorbent / Degreaser pen does not work on stainless steel. Use the Stainless Steel Degreaser pen (PL-1014), which cleans and activates the surface, then continue with the normal sequence.',
          'The Micro-Metallizer system is not applicable to aluminum surfaces. If you have an aluminum part, contact us before ordering.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you brush plate stainless steel?',
        a: 'Yes. Clean and activate it with the Stainless Steel Degreaser pen (PL-1014) instead of the standard absorbent pen, then follow the normal sequence.',
      },
      {
        q: 'Can you brush plate aluminum?',
        a: 'Not with the Micro-Metallizer system. Contact Hunter Products to discuss aluminum parts.',
      },
      {
        q: 'What is a copper flash?',
        a: 'A thin copper layer plated first so the next metal has a compatible base. Nickel, black nickel, chrome color and rhodium need it on non-copper parts.',
      },
      {
        q: 'Can you plate gold onto steel?',
        a: 'Yes, with underlayers: degrease, copper flash, nickel, then gold. Gold plates over gold, nickel or silver, not directly onto steel.',
      },
    ],
    products: ['deluxe-plating-kit', 'copper-plating-pen', 'nickel-plating-pen', 'stainless-steel-degreaser-pen'],
    related: ['copper-plating-pen-guide', 'nickel-plating-pen-guide', 'brush-plating-thickness-chart', 'gold-plating-connector-pins'],
    updated: '2026-09-30',
  },

  {
    slug: 'plating-pen-kit-comparison',
    label: 'Plating pen kit comparison',
    h1: 'Plating pen kits compared: which one to buy',
    metaTitle: 'Plating Pen Kits Compared: $400 to $900, Which to Buy',
    metaDescription:
      'Compare the four Micro-Metallizer electroplating pen kits side by side: pens included, price, savings vs buying separately, and which job each kit fits.',
    eyebrow: 'Buying guide',
    lede: 'Every kit includes the power supply and connector cables, so the only question is which pens you need. Here are all four kits side by side.',
    answer:
      'For electrical contacts and connectors, buy the Contact Repair Kit ($400): absorbent, nickel and 24K gold pens. For mixed work across copper, brass, silver and gold, buy the Deluxe Kit ($540) with six pens. The Heavy Duty versions ($525 and $900) use larger pens for thicker deposits and higher volume. Each kit costs $120 to $290 less than buying the same parts separately.',
    sections: [
      {
        heading: 'Side by side',
        table: {
          caption: 'Micro-Metallizer kits. Every kit includes the power supply and connector cables, 110V or 220V.',
          head: ['Kit', 'Price', 'Pens included', 'Bought separately', 'You save', 'Best for'],
          rows: [
            ['Contact Repair Kit (PL-1000C)', '$400', 'Absorbent, Nickel, Gold 24K', '$520', '$120', 'Connector pins, edge connectors, switch contacts'],
            ['Contact Repair Kit, Heavy Duty (PL-1000CHD)', '$525', 'Absorbent, Nickel HD, Gold 24K HD', '$660', '$135', 'Higher-volume contact restoration'],
            ['Deluxe Kit (PL-1000K)', '$540', 'Absorbent, Nickel, Gold 24K, Silver, Chrome Color, Copper', '$735', '$195', 'Mixed metals, general shop and lab use'],
            ['Deluxe Kit, Heavy Duty (PL-1000HD)', '$900', 'Absorbent, Nickel HD, Gold 24K HD, Silver HD, Copper HD, Rhodium', '$1,190', '$290', 'Production work, thicker deposits, rhodium'],
          ],
        },
        note: 'Separate prices are the power supply ($220), cables ($20) and each pen at its list price.',
      },
      {
        heading: 'Standard or heavy duty',
        paragraphs: [
          'Standard pens build up to 1.5 to 1.8 µm. Heavy-duty pens carry more solution per cartridge and build up to 3 to 3.6 µm, with faster deposit rates: about 0.8 µm of gold in 2 minutes on a 1 in² area, compared with 0.5 µm from a standard pen.',
          'Choose heavy duty if you plate the same kind of part every week, or if the surface sees wear. For occasional repairs, standard pens go further than most people expect: each pen holds 10 ml of solution and covers roughly 300 square inches.',
        ],
      },
      {
        heading: 'Which kit fits your job',
        list: [
          'Worn gold on connector pins, PCB fingers or switch contacts: Contact Repair Kit',
          'Gold over brass, copper or steel: Deluxe Kit, because it includes the copper pen for the flash layer',
          'Rhodium finishing: Deluxe Kit, Heavy Duty, the only kit with a rhodium pen',
          'Only re-tinning PCB pads: skip the kits and buy the power supply, cables, absorbent and tin pens ($375)',
        ],
      },
      {
        heading: 'Adding pens later',
        paragraphs: [
          'Every pen in the line runs on the same power supply, so you can start with any kit and add pens as jobs come up. Pens are disposable and non-refillable, which keeps the solution from getting contaminated.',
        ],
      },
    ],
    faq: [
      {
        q: 'Which plating pen kit should I buy?',
        a: 'For electrical contacts, the Contact Repair Kit ($400). For mixed metals, the Deluxe Kit ($540). Choose a Heavy Duty version for thicker deposits and higher volume.',
      },
      {
        q: 'Do the kits include the power supply?',
        a: 'Yes. Every kit includes the variable DC power supply and connector cables, in 110V or 220V.',
      },
      {
        q: 'Can I buy plating pens without a kit?',
        a: 'Yes. Every pen is sold individually. You need the power supply ($220) and connector cables ($20), or your own variable DC supply up to 12V at 0.1A.',
      },
      {
        q: 'Are plating pens refillable?',
        a: 'No. Pens are disposable and non-refillable so the solution stays protected from contamination. Each holds 10 ml and covers roughly 300 square inches.',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'contact-repair-kit-heavy-duty', 'deluxe-plating-kit-heavy-duty'],
    related: ['gold-plating-connector-pins', 'pcb-gold-finger-repair', 'plating-pen-voltage-chart', 'rhodium-plating-pen-guide'],
    updated: '2026-10-02',
  },
  {
    slug: 'gold-plating-pen-guide',
    label: 'Using a gold plating pen',
    h1: 'How to use a gold plating pen: 24K, 18K and 14K',
    metaTitle: 'Gold Plating Pen: How to Use It, 6 to 8V, 0.5 µm in 2 Min',
    metaDescription:
      'Step-by-step from the maker of the pen: when you need nickel first, voltage settings, plating times and thickness for 24K, 18K and 14K. Pens from $145, ships same day.',
    eyebrow: 'Gold plating',
    lede: 'A gold plating pen carries its own gold solution in the tip. Touch it to a grounded part and gold deposits only where you work, with no tank, no bath and nothing to mix.',
    answer:
      'Degrease the part at 10 to 12V DC, plate a nickel underlayer if the surface is not already gold, nickel or silver, then stroke the gold pen across it at 6 to 8V. A standard gold pen deposits about 0.5 µm in 2 minutes on a 1 in² copper surface and builds up to 1.5 to 1.8 µm. Gold pens start at $145.',
    sections: [
      {
        heading: 'Choosing 24K, 18K or 14K',
        paragraphs: [
          'All three karats plate the same way, at the same voltage, onto the same surfaces. The choice comes down to what the part does.',
        ],
        table: {
          caption: 'Micro-Metallizer gold pens',
          head: ['Pen', 'Catalog no.', 'Price', 'Use it for'],
          rows: [
            ['Gold 24K', 'PL-1003', '$145', 'Pure gold for the best conductivity and corrosion resistance: connector pins, edge connectors, switch contacts'],
            ['Gold 18K', 'PL-1004', '$145', 'A harder-wearing finish than 24K on high-contact industrial parts'],
            ['Gold 14K', 'PL-1005', '$145', 'Matching existing 14K-plated parts, where a harder finish than 24K is preferred'],
            ['Gold 24K Heavy', 'PL-1016', '$235', 'Thicker 24K deposits and longer runs between pens'],
            ['Gold 18K Heavy', 'PL-1017', '$235', 'Thicker 18K deposits on high-wear parts'],
          ],
        },
      },
      {
        heading: 'What gold will plate onto',
        paragraphs: [
          'Every gold pen plates over gold, nickel or silver. It does not bond directly to copper, brass or steel, so those surfaces get an underlayer first. Nickel is the standard layer under gold: it plates over copper and keeps the copper from migrating into the gold.',
        ],
        table: {
          caption: 'Plating sequence by base metal',
          head: ['Base metal', 'Sequence'],
          rows: [
            ['Gold, nickel or silver', 'Degrease, then gold'],
            ['Copper', 'Degrease, nickel, then gold'],
            ['Brass, steel or zinc die-cast', 'Degrease, copper flash, nickel, then gold'],
            ['Stainless steel', 'Stainless degreaser, copper flash, nickel, then gold'],
            ['Aluminum', 'Not supported by the Micro-Metallizer system'],
          ],
        },
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Build the underlayer if you need one',
            text: 'On brass or steel, flash copper first with the Copper pen (PL-1010) at 6 to 8V. Then plate nickel with the Nickel pen (PL-1006) at 5 to 6V over any copper. Wipe clean with a cloth between pens. Skip this step on gold, nickel or silver surfaces.',
          },
          {
            title: 'Plate gold at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the gold pen. ${HOOKUP} Keep stroking until the finish is even. A standard pen lays down about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area.`,
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'How thick and how fast',
        table: {
          caption: 'Gold deposit on a 1 in × 1 in copper surface, from the Micro-Metallizer catalog',
          head: ['Pen', '2 minutes', '3 minutes', 'Maximum'],
          rows: [
            ['Standard gold (24K, 18K, 14K)', '0.5 µm', '0.8 µm', '1.5 to 1.8 µm'],
            ['Heavy gold (24K, 18K)', '0.8 µm', '1.2 µm', '3 to 3.6 µm'],
          ],
        },
        paragraphs: [
          'Each pen holds 10 ml of concentrated solution and plates roughly 300 square inches, so one pen covers a lot of small contact work.',
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'A gold pen runs on the Micro-Metallizer power supply ($220) and connector cables ($20), or on your own variable DC supply up to 12V at 0.1A. You also need the Absorbent / Degreaser pen ($65) for prep.',
          'Bought separately, a 24K gold pen, degreaser, power supply and cables come to $450. The Contact Repair Kit is $400 and adds the nickel pen, so for most gold work the kit is the better buy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can a gold plating pen plate directly onto copper?',
        a: 'No. Gold pens plate over gold, nickel or silver. Plate nickel over the copper first, then the gold.',
      },
      {
        q: 'What voltage does a gold plating pen use?',
        a: '6 to 8V DC, with the part on the negative lead and the pen on the positive lead. Degreasing beforehand runs at 10 to 12V.',
      },
      {
        q: 'How long does it take to gold plate with a pen?',
        a: 'A standard gold pen deposits about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area. The heavy gold pen deposits about 0.8 µm in 2 minutes.',
      },
      {
        q: 'Should I use 24K or 18K gold?',
        a: 'Use 24K for electrical contacts, where pure gold gives the best conductivity and corrosion resistance. Use 18K where the part sees a lot of physical contact and a harder finish lasts longer.',
      },
      {
        q: 'Do I need a special power supply?',
        a: 'No. The Micro-Metallizer power supply is designed for the pens, but any variable DC supply up to 12V at 0.1A will run them.',
      },
    ],
    products: ['gold-24k-plating-pen', 'contact-repair-kit', 'gold-24k-heavy-duty-plating-pen', 'gold-18k-plating-pen'],
    related: ['gold-plating-connector-pins', 'nickel-plating-pen-guide', 'brush-plating-substrate-guide', 'brush-plating-cost'],
    updated: '2026-10-12',
  },

  {
    slug: 'zinc-plating-pen-touch-up',
    label: 'Zinc touch-up on steel',
    h1: 'Zinc plating pen: touch up galvanized steel and fasteners',
    metaTitle: 'Zinc Plating Pen: Touch Up Galvanized Steel in 2 Minutes',
    metaDescription:
      'Fix scratched galvanizing and re-zinc bare steel fasteners without a tank. Plates straight onto steel at 6 to 8V. One $65 pen covers about 300 sq in. Ships same day.',
    eyebrow: 'Corrosion protection',
    lede: 'When a galvanized finish gets scratched or a fastener loses its zinc, the bare steel starts to rust. A zinc plating pen puts real zinc back on that spot, in place, without dipping the part.',
    answer:
      'Polish off any rust, degrease at 10 to 12V DC, then stroke the zinc pen over the bare steel at 6 to 8V. Zinc plates directly onto steel and most other metals, except aluminum and chromium, at about 0.3 µm in 2 minutes on a 1 in² area. One $65 pen covers roughly 300 square inches.',
    sections: [
      {
        heading: 'Why zinc protects steel',
        paragraphs: [
          'Zinc is a sacrificial coating. Where zinc and steel sit together, the zinc corrodes first and the steel underneath is spared, which is why galvanizing works. Once a scratch or worn spot exposes the steel, that protection is gone at that spot.',
          'The zinc pen electroplates real zinc metal onto the exposed area, so the repair works the same way as the original coating: it is a metal layer bonded to the part, not a coat of paint sitting on top of it.',
        ],
      },
      {
        heading: 'Good jobs for a zinc pen',
        list: [
          'Scratched or worn galvanized finishes',
          'Exposed steel fasteners that have lost their zinc',
          'Zinc surfaces that have lost their protective layer over time',
          'Field repairs where dipping the whole part is not an option',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Remove rust and oxide',
            text: 'Polish the area with a fine metal polish until the rust and discoloration are gone and bright metal shows. Wipe it clean with a lint-free cloth. Zinc will not bond over rust.',
          },
          DEGREASE_STEP,
          {
            title: 'Plate zinc at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the Zinc pen (PL-1013). ${HOOKUP} Overlap slightly onto the surrounding zinc so the repair blends into the existing coating.`,
          },
          {
            title: 'Build up with more passes',
            text: 'The zinc pen deposits about 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area, up to a maximum of 1.5 to 1.8 µm. Keep working the spot to build thickness.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'What it will and will not do',
        paragraphs: [
          'The zinc pen builds up to 1.5 to 1.8 µm, which is far thinner than a galvanizing line puts down. It is a touch-up and spot-repair tool for damaged areas, not a way to galvanize whole parts. For new parts that need a full coating, send them to a galvanizer.',
          'Zinc plates over any metallic surface except aluminum and chromium. The Micro-Metallizer system does not work on aluminum.',
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Zinc pen ($65), the Absorbent / Degreaser pen ($65), the power supply ($220) and connector cables ($20): $370 in all. If you already own a Micro-Metallizer supply, or any variable DC supply up to 12V at 0.1A, the two pens are $130.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you zinc plate steel without a tank?',
        a: 'Yes. A zinc plating pen holds the solution in its tip and plates only where it touches, so you can re-zinc a scratch or a fastener in place at 6 to 8V DC.',
      },
      {
        q: 'Can I use a zinc pen on rusty steel?',
        a: 'Remove the rust first. Polish the area to bright metal and degrease it, then plate. Zinc will not bond over rust.',
      },
      {
        q: 'How thick is zinc from a plating pen?',
        a: 'About 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm. That suits touch-up and repair, not full galvanizing.',
      },
      {
        q: 'Can you zinc plate aluminum with a pen?',
        a: 'No. Zinc plates over any metal except aluminum and chromium, and the Micro-Metallizer system does not work on aluminum.',
      },
      {
        q: 'How much area does one zinc pen cover?',
        a: 'Each pen holds 10 ml of concentrated solution and plates roughly 300 square inches.',
      },
    ],
    products: ['zinc-plating-pen', 'absorbent-degreaser-plating-pen', 'micro-metallizer-power-supply', 'micro-metallizer-connector-cables'],
    related: ['copper-plating-pen-guide', 'brush-plating-substrate-guide', 'plating-time-thickness-conversion', 'brush-plating-cost'],
    updated: '2026-10-12',
  },

  {
    slug: 'brush-plating-cost',
    label: 'Cost of brush plating',
    h1: 'Brush plating cost: pen plating vs job shops, tank lines and replacement',
    metaTitle: 'Brush Plating Cost vs Tank Plating, Job Shops & Replacement',
    metaDescription:
      'What brush plating costs: $400 to start, about $0.22 to $1.03 of solution per square inch, and where job shops, tank lines and replacement cost more.',
    eyebrow: 'Buying guide',
    lede: 'For small areas, the plating itself is rarely the expensive part. The cost is in getting the part to the plating: removal, masking, shipping, minimums and waiting. Brush plating skips most of that.',
    answer:
      'A complete brush plating setup starts at $400, and solution costs roughly $0.22 to $1.03 per square inch depending on the metal, based on each pen covering about 300 square inches. Re-plating a square inch of worn contact with degreaser, nickel and 24K gold uses under $1 of solution. Job shops and tank lines win on large areas, thick deposits and high volume, not on spot repair.',
    sections: [
      {
        heading: 'What brush plating costs to start',
        table: {
          caption: 'Micro-Metallizer equipment and kits',
          head: ['Item', 'Price', 'What it covers'],
          rows: [
            ['Contact Repair Kit (PL-1000C)', '$400', 'Power supply, cables, degreaser, nickel and 24K gold pens'],
            ['Deluxe Kit (PL-1000K)', '$540', 'Power supply, cables and six pens for mixed-metal work'],
            ['Power supply (PL-1000)', '$220', 'Runs every pen; optional if you own a variable DC supply up to 12V at 0.1A'],
            ['Connector cables (PL-1001)', '$20', 'Connects the pen and part to the supply'],
            ['Individual pens', '$65 to $310', 'One metal per pen, 10 ml of concentrated solution each'],
          ],
        },
        paragraphs: [
          'There is no tank, rectifier, bath chemistry or ventilation to buy. The power supply is the only piece of equipment, and it is reused for every metal.',
        ],
      },
      {
        heading: 'Solution cost per square inch',
        paragraphs: [
          'Each standard pen holds 10 ml of concentrated solution and plates approximately 300 square inches, per the Micro-Metallizer catalog. Dividing the list price by that coverage gives a working cost per square inch.',
        ],
        table: {
          caption: 'Approximate solution cost per square inch, standard pens at current list prices',
          head: ['Pen', 'List price', 'Per square inch'],
          rows: [
            ['Absorbent / Degreaser', '$65', 'about $0.22'],
            ['Copper, zinc, chrome color', '$65', 'about $0.22'],
            ['Nickel, black nickel, tin', '$70', 'about $0.23'],
            ['Silver', '$85', 'about $0.28'],
            ['Palladium', '$140', 'about $0.47'],
            ['Gold 24K, 18K, 14K', '$145', 'about $0.48'],
            ['Rhodium', '$310', 'about $1.03'],
          ],
        },
        note: 'Actual coverage depends on how thick you build the deposit. Precious metal pen prices can change with metal markets.',
      },
      {
        heading: 'Worked example: one square inch of worn gold contact',
        paragraphs: [
          'Say the worn area across a connector adds up to one square inch of copper that needs nickel and 24K gold. Degreasing uses about $0.22 of solution, the nickel layer about $0.23 and the gold about $0.48: under $1 in total.',
          'Time is a few minutes per metal. On a 1 in² area, a standard nickel pen deposits about 0.4 µm in 2 minutes and a standard gold pen about 0.5 µm in 2 minutes. The part never leaves the bench, and in most cases it never leaves the assembly.',
        ],
      },
      {
        heading: 'Where the other methods spend money',
        paragraphs: [
          'Prices for outside plating and in-house lines vary too much by region, metal and volume to quote fairly. What does not vary is where the costs come from.',
        ],
        table: {
          caption: 'Cost drivers by method',
          head: ['Cost driver', 'Brush plating pen', 'Plating job shop', 'In-house tank line', 'Replace the part'],
          rows: [
            ['Equipment', 'Power supply only', 'None for you', 'Tanks, rectifiers, ventilation', 'None'],
            ['Chemistry', 'Sealed pens, bought as needed', 'Included in the job price', 'Baths to buy, analyze and replenish', 'None'],
            ['Minimums', 'None', 'Lot or minimum charges are common', 'None once set up', 'Full part price'],
            ['Masking', 'None, plates only where the tip touches', 'Labor to mask everything else', 'Labor to mask everything else', 'None'],
            ['Removal and reinstall', 'Usually plate in place', 'Required', 'Required', 'Required'],
            ['Shipping and turnaround', 'None', 'Both ways, plus queue time', 'None', 'Order lead time'],
            ['Waste', 'A used pen', 'Handled by the shop', 'Bath disposal and wastewater treatment', 'The old part'],
            ['Downtime', 'Minutes', 'Days or more while the part is away', 'Hours', 'Until the new part arrives'],
          ],
        },
      },
      {
        heading: 'When brush plating is not the cheaper option',
        list: [
          'Plating entire parts, or large surface areas, where pens would be used up quickly',
          'Deposits thicker than 1.5 to 1.8 µm (standard pens) or 3 to 3.6 µm (heavy-duty pens)',
          'High-volume production finishing, where a tank line spreads its fixed costs over thousands of parts',
          'Aluminum parts, which the Micro-Metallizer system does not plate',
          'Cheap parts that cost less to replace than the time to repair them',
        ],
      },
      {
        heading: 'How to compare for your own job',
        list: [
          'Add up the area that actually needs plating, in square inches',
          'Multiply by the per-square-inch cost of each pen in your sequence',
          'Compare that, plus a few minutes of bench time, against the outside quote including minimums, masking, shipping both ways and the time the part or equipment is out of service',
          'If the part would otherwise be replaced, compare against the replacement price and lead time',
        ],
      },
    ],
    faq: [
      {
        q: 'How much does brush plating cost?',
        a: 'A complete setup starts at $400 for the Contact Repair Kit. Solution runs about $0.22 to $1.03 per square inch depending on the metal, based on roughly 300 square inches per pen.',
      },
      {
        q: 'Is brush plating cheaper than sending parts to a plating shop?',
        a: 'For spot repair and small areas, usually yes, because you avoid minimum charges, masking, shipping and the time the part is away. For whole parts, thick deposits or high volume, a plating shop is usually cheaper.',
      },
      {
        q: 'How much gold does it cost to plate one square inch?',
        a: 'A standard gold pen ($145) covers about 300 square inches, so roughly $0.48 of solution per square inch. Thicker deposits use more.',
      },
      {
        q: 'Do I need to buy a power supply?',
        a: 'Not if you already own a variable DC supply up to 12V at 0.1A. Otherwise the Micro-Metallizer supply is $220 and is included in every kit.',
      },
      {
        q: 'Are there ongoing costs besides pens?',
        a: 'No bath chemistry, tank maintenance or waste treatment. Ongoing cost is replacement pens as they run out.',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'gold-24k-plating-pen'],
    related: ['brush-plating-vs-tank-plating', 'plating-pen-kit-comparison', 'plating-time-thickness-conversion', 'palladium-plating-pen-guide'],
    updated: '2026-10-12',
  },

  {
    slug: 'silver-plating-pen-guide',
    label: 'Silver plating contacts',
    h1: 'How to silver plate contacts and bus bars with a plating pen',
    metaTitle: 'Silver Plating Pen: Plate Contacts & Bus Bars at 5 to 6V',
    metaDescription:
      'Silver plate contacts and bus bars in place: straight onto copper, brass or steel at 5 to 6V, about 0.5 µm in 2 minutes. Pens from $85, ships same day.',
    eyebrow: 'Silver plating',
    lede: 'Silver is the finish of choice where conductivity matters. A silver plating pen restores it on contacts and bus bars at the bench or in place, without a tank.',
    answer:
      'Degrease at 10 to 12V DC, then stroke the silver pen over the surface at 5 to 6V. Silver plates directly onto most metals, including copper, brass and steel, with no underlayer; only aluminum and chromium are not supported. A standard pen deposits about 0.5 µm in 2 minutes on a 1 in² area, and the heavy-duty pen about 0.8 µm.',
    sections: [
      {
        heading: 'Where silver plating pens are used',
        list: [
          'Electrical contacts where high conductivity is required',
          'Large-area contact plating in industrial switchgear and bus bar applications',
          'Touch-up on silver-plated parts where a full tank dip is impractical',
          'Restoring silver on silverware and serving pieces',
        ],
      },
      {
        heading: 'No underlayer on most metals',
        paragraphs: [
          'Gold, nickel, rhodium and palladium each need the right base layer before they bond. Silver does not. It plates over any metallic surface except aluminum and chromium, so on copper, brass or steel you degrease and go straight to silver.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Plate silver at 5 to 6V',
            text: `Set the supply to 5 to 6V and switch to the Silver pen (PL-1008), or the Silver Heavy pen (PL-1018) for large areas. ${HOOKUP}`,
          },
          {
            title: 'Build to thickness',
            text: 'Keep stroking until the finish is even. A standard silver pen deposits about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'Standard or heavy-duty silver',
        table: {
          caption: 'Silver deposit on a 1 in × 1 in copper surface, from the Micro-Metallizer catalog',
          head: ['Pen', 'Price', '2 minutes', '3 minutes', 'Maximum'],
          rows: [
            ['Silver (PL-1008)', '$85', '0.5 µm', '0.8 µm', '1.5 to 1.8 µm'],
            ['Silver Heavy (PL-1018)', '$120', '0.8 µm', '1.2 µm', '3 to 3.6 µm'],
          ],
        },
        paragraphs: [
          'Choose the heavy-duty pen for bus bars, switchgear and other large surfaces. It carries more solution per cartridge, so you swap pens less often and build thicker silver.',
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Silver pen ($85), the Absorbent / Degreaser pen ($65), the power supply ($220) and connector cables ($20): $390 in all. The Deluxe Kit ($540) includes the silver pen plus degreaser, copper, nickel, chrome color and 24K gold pens, which covers most mixed-metal shop work.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you silver plate copper with a pen?',
        a: 'Yes, directly. Silver plates over any metallic surface except aluminum and chromium, so copper needs no underlayer.',
      },
      {
        q: 'Can you silver plate steel?',
        a: 'Yes. Degrease the steel and plate silver directly. No copper flash or nickel layer is needed for silver.',
      },
      {
        q: 'What voltage does a silver plating pen use?',
        a: '5 to 6V DC, with the part on the negative lead and the pen on the positive lead. Degreasing beforehand runs at 10 to 12V.',
      },
      {
        q: 'How thick is brush-plated silver?',
        a: 'A standard silver pen builds up to 1.5 to 1.8 µm and the heavy-duty pen up to 3 to 3.6 µm.',
      },
      {
        q: 'Can you silver plate aluminum?',
        a: 'Not with the Micro-Metallizer system. Silver does not plate onto aluminum or chromium.',
      },
    ],
    products: ['silver-plating-pen', 'silver-heavy-duty-plating-pen', 'deluxe-plating-kit', 'absorbent-degreaser-plating-pen'],
    related: ['plating-pen-voltage-chart', 'brush-plating-substrate-guide', 'brush-plating-thickness-chart', 'brush-plating-cost'],
    updated: '2026-10-12',
  },

  {
    slug: 'diamond-dusting-surgical-instruments',
    label: 'Diamond dusting surgical instruments',
    h1: 'Diamond dusting surgical instruments: what it is and how it is applied',
    metaTitle: 'Diamond Dusting Surgical Instruments: How It Is Applied',
    metaDescription:
      'What diamond dusting is, why needle holders and forceps get it, and the equipment used to apply it: a tungsten carbide electrode system like the Carbitron 300.',
    eyebrow: 'Surgical instruments',
    lede: 'Diamond-dusted needle holders and forceps grip fine needles and delicate tissue without slipping. The name is misleading: the grip surface is tungsten carbide, applied with an electrical applicator.',
    answer:
      'Diamond dusting is a fine layer of tungsten carbide applied to an instrument working surface, usually needle holder or forceps jaws, with an electrical applicator and a tungsten carbide electrode. It gives a hard, textured grip for fine suture needles and tissue. The Carbitron 300, the original diamond-dusting system, deposits it at 78 to 80 Rockwell C.',
    sections: [
      {
        heading: 'What diamond dusting is',
        paragraphs: [
          'Despite the name, there is no diamond involved. A tungsten carbide electrode is held against the instrument while short electrical discharges transfer carbide into and onto the surface. The result is a fused, textured layer of tungsten carbide, much harder than the stainless steel underneath.',
          'Instrument makers mark diamond-dusted needle holders with black handle rings, which helps sterile processing staff tell them apart from instruments with tungsten carbide inserts, usually marked with gold rings.',
        ],
      },
      {
        heading: 'Which instruments get it',
        list: [
          'Needle holders for very fine suture needles, where a smooth jaw would let the needle rotate or slip',
          'Forceps that need a secure grip on delicate tissue',
          'Other instrument working surfaces where a hard, textured grip helps',
        ],
      },
      {
        heading: 'Diamond dusting vs carbide inserts vs plain stainless',
        table: {
          caption: 'Common needle holder jaw types',
          head: ['Jaw type', 'How it is made', 'Typical marking'],
          rows: [
            ['Plain stainless steel', 'Serrated stainless jaws', 'None'],
            ['Tungsten carbide inserts', 'Separate carbide pieces fitted into the jaws', 'Gold handle rings'],
            ['Diamond dusted', 'Fine tungsten carbide layer deposited onto the jaws', 'Black handle rings'],
          ],
        },
        note: 'Plain stainless steel jaws cannot be repaired once they wear out, so the instrument is replaced.',
      },
      {
        heading: 'Equipment used to apply it',
        paragraphs: [
          'Diamond dusting is applied with an electro-spark deposition system: a power supply plus a vibrating hand tool holding a tungsten carbide electrode. Hunter Products invented the Carbitron 300 as the original diamond-dusting platform for the medical and dental industries, and it is used today by surgical instrument repair companies and instrument manufacturers.',
          'The Carbitron 300 deposits tungsten carbide at 78 to 80 Rockwell C, with thickness set from 0.0002" to 0.001" in 0.0002" steps. Electrodes come in 1/8", 1/16" and 1/32" sizes; the 1/32" electrode is the one for fine, precise work. The system is $495 and replacement electrodes are $12.50.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is diamond dusting made of diamond?',
        a: 'No. Diamond dusting is a fine layer of tungsten carbide applied with an electrical applicator and a carbide electrode.',
      },
      {
        q: 'How do you identify a diamond-dusted needle holder?',
        a: 'Diamond-dusted needle holders are commonly marked with black handle rings. Gold rings usually mark tungsten carbide inserts.',
      },
      {
        q: 'What equipment applies diamond dusting?',
        a: 'An electro-spark deposition system with a tungsten carbide electrode in a vibrating hand tool. The Carbitron 300 is the original diamond-dusting system.',
      },
      {
        q: 'How hard is a diamond-dusted surface?',
        a: 'The tungsten carbide deposited by the Carbitron 300 is 78 to 80 Rockwell C, much harder than the stainless steel of the instrument.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-32', 'tungsten-carbide-electrode-1-16'],
    related: ['carbide-grip-surfaces-collets-grippers', 'extend-cutting-tool-life-tungsten-carbide'],
    updated: '2026-10-12',
  },

  {
    slug: 'extend-cutting-tool-life-tungsten-carbide',
    label: 'Extending cutting tool life',
    h1: 'How to extend cutting tool life with tungsten carbide deposition',
    metaTitle: 'Cutting Tool Coating: Add Tungsten Carbide In House, $495',
    metaDescription:
      'Coat end mills, taps, reamers, lathe bits and saws with tungsten carbide in your own shop: where to apply it, how thick, and how to re-sharpen. 5x to 10x life.',
    eyebrow: 'Tooling',
    lede: 'A cutting edge wears where it works. Depositing tungsten carbide on just that edge, then re-sharpening, gives standard tooling a carbide working surface for a fraction of the cost of new tools.',
    answer:
      'With the Carbitron 300, a vibrating tungsten-carbide electrode deposits a fused 78 to 80 Rockwell C layer onto the cutting edge, typically 0.0002" to 0.001" thick depending on the tool. Deposit along the cutting edge, re-sharpen, then lightly stone the edge with a CBN or diamond stone. Hunter Products rates the result at 5x to 10x the life of standard tooling.',
    sections: [
      {
        heading: 'How the deposit works',
        paragraphs: [
          'The Carbitron 300 pairs an adjustable discharge power supply with a vibrating hand tool that holds a tungsten-carbide electrode. As the electrode repeatedly touches and lifts off the work, small arcs knock tungsten carbide off the electrode and deposit it into and onto the surface. The process is generally known as electro-spark deposition.',
          'The deposit forms a true metallic bond with the tool at 78 to 80 Rockwell C. Because it is fused to the surface rather than sitting on top of it, it does not behave like a paint or a thin film coating.',
        ],
      },
      {
        heading: 'Why shops do it',
        list: [
          'Extend tool life: rated at 5x to 10x over standard tooling',
          'Self-sharpening cutting edges',
          'Resize and salvage worn tools instead of replacing them',
          'A non-brittle tungsten carbide surface with better thermal-shock and impact resistance',
          'Less downtime, fewer tool changes and less regrinding',
        ],
      },
      {
        heading: 'Where to deposit and how much, by tool',
        table: {
          caption: 'Recommended deposit by cutting tool, from the Carbitron 300 brochure',
          head: ['Tool', 'Deposit', 'Where', 'Then'],
          rows: [
            ['Lathe bits, single-point tools', '0.0004" to 0.004"', 'Top side of the cutting edge', 'Re-sharpen by grinding the front'],
            ['End mills', '0.0002" to 0.0006"', 'Cutting edges inside the flute, at the bottom and sides, along the full length', 'Re-sharpen'],
            ['Counterbores', '0.0002" to 0.0006"', 'Same as end mills', 'Re-sharpen'],
            ['Horizontal milling cutters', '0.0002" to 0.004"', 'Front face of each tooth along the cutting edge', 'Re-sharpen by grinding the land'],
            ['Hobs', '0.0002" to 0.004"', 'Front face of each tooth along the cutting edge', 'Re-sharpen'],
            ['Shell mills', '0.0002" to 0.0006"', 'Front face of the cutting surface along the edge', 'Re-sharpen'],
            ['Reamers', '0.0002" to 0.0008"', 'Inside the flute along the cutting edge', 'Re-sharpen'],
            ['Countersinks', '0.0002" to 0.0006"', 'Along the cutting edge inside the flute, full length', 'Re-sharpen'],
            ['Taps', '0.0002" to 0.001"', 'Inside the flute along the cutting edge for 2 to 3 full threads', 'Re-sharpen dull taps before depositing'],
            ['Thread chasers', '0.0002" to 0.001"', 'Along the top cutting edge', 'Re-sharpen dull chasers before depositing'],
            ['Saws', '0.0002" to 0.001"', 'Front edge of each tooth; on very fine teeth, the sides instead', 'Re-sharpen'],
          ],
        },
        note: 'Deposit thickness is set on the power supply from 0.0002" to 0.001" in 0.0002" steps. For recommendations above 0.001", contact us for the build-up procedure.',
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Re-sharpen first if the tool is dull',
            text: 'Taps and thread chasers in particular should be sharp before depositing. Deposit onto a good edge, not a worn one.',
          },
          {
            title: 'Set the deposit thickness',
            text: 'Use the discharge intensity selector on the power supply to choose a thickness from 0.0002" to 0.001", based on the table above and how much build-up the tool can tolerate.',
          },
          {
            title: 'Deposit along the cutting edge',
            text: 'Connect the ground cable to the tool and work the vibrating electrode along the area shown for that tool type. On taps, take care not to nick the cutting edge.',
          },
          {
            title: 'Re-sharpen',
            text: 'Grind as listed for the tool, usually the front or the land, so the carbide sits right at the working edge.',
          },
          {
            title: 'Stone the edge',
            text: 'Lightly stone the deposit with a cubic boron nitride or diamond stone to remove burrs and get the sharpest edge.',
          },
        ],
      },
      {
        heading: 'What it costs to run',
        paragraphs: [
          'The Carbitron 300 is $495. Electrodes are $12.50 each in 1/8", 1/16" and 1/32" sizes, and a 1/8" x 2 1/2" electrode typically covers about 50 square inches at 0.0005" average thickness, so about $0.25 of electrode per square inch at that thickness. Cutting edges are small, so one electrode treats a lot of tools.',
          'The unit runs on 110V, 60Hz at 4 amps (230V/50Hz available) with a 50% duty cycle and a 10-minute maximum continuous on-time.',
        ],
      },
    ],
    faq: [
      {
        q: 'How much longer do tools last with tungsten carbide deposition?',
        a: 'Hunter Products rates Carbitron-treated tooling at 5x to 10x the life of standard tooling, depending on the tool and the work.',
      },
      {
        q: 'How hard is the tungsten carbide deposit?',
        a: '78 to 80 Rockwell C. It forms a fused metallic bond with the tool surface.',
      },
      {
        q: 'How thick is the deposit?',
        a: 'Set on the power supply from 0.0002" to 0.001" in 0.0002" steps. The right amount depends on the tool and how much build-up it can tolerate.',
      },
      {
        q: 'Do I need to re-sharpen after depositing?',
        a: 'Yes, for cutting tools. Deposit along the cutting edge, re-sharpen as listed for the tool type, then lightly stone with a CBN or diamond stone.',
      },
      {
        q: 'What is electro-spark deposition?',
        a: 'A process where short electrical arcs between a consumable electrode and the work transfer electrode material into the surface. The Carbitron 300 uses a tungsten-carbide electrode in a vibrating hand tool.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-8', 'tungsten-carbide-electrode-1-16', 'tungsten-carbide-electrode-1-32'],
    related: ['tungsten-carbide-end-mills-milling-cutters', 'tungsten-carbide-taps-reamers', 'punch-and-die-life-tungsten-carbide', 'carbide-grip-surfaces-collets-grippers'],
    updated: '2026-10-12',
  },

  {
    slug: 'punch-and-die-life-tungsten-carbide',
    label: 'Punch and die life',
    h1: 'Extend punch and die life with tungsten carbide',
    metaTitle: 'Tungsten Carbide for Punches & Dies: Apply It In House',
    metaDescription:
      'Add 78 to 80 Rockwell C tungsten carbide to the punches and dies you already own. Where to apply it, how thick, how to finish. Rated 5x to 10x life. $495.',
    eyebrow: 'Tooling',
    lede: 'Punches, dies and forming tools wear at a few predictable spots. Building tungsten carbide onto those spots, instead of replacing the tool, keeps them in tolerance far longer.',
    answer:
      'Deposit 0.0002" to 0.001" of tungsten carbide with the Carbitron 300 on the sides, face or both, wherever the punch or die is wearing. Most often the sides are coated and the face is ground. The fused deposit is 78 to 80 Rockwell C, and Hunter Products rates forming, stamping and forging tools at 5x to 10x their standard life.',
    sections: [
      {
        heading: 'Good jobs for tungsten carbide',
        list: [
          'Punches and dies in stamping and blanking',
          'Forming and forging tools and their contact surfaces',
          'Casting molds and other wear surfaces',
          'Repairing worn parts and resizing worn tools back into tolerance',
        ],
      },
      {
        heading: 'How much to deposit',
        table: {
          caption: 'Recommended deposit, from the Carbitron 300 brochure',
          head: ['Part', 'Deposit', 'Where'],
          rows: [
            ['Punches and dies', '0.0002" to 0.001"', 'Sides, face or both, wherever it wears. Most commonly the sides, with the face ground afterward.'],
            ['Casting molds and non-cutting wear surfaces', '0.0002" to 0.004"', 'The entire wear surface, depending on the thickness that can be tolerated'],
          ],
        },
        note: 'Deposit thickness is set on the power supply from 0.0002" to 0.001" in 0.0002" steps. For build-ups above 0.001", contact us for the procedure.',
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Find the wear',
            text: 'Check where the punch or die is losing size or edge: sides, face or both. That is where the carbide goes.',
          },
          {
            title: 'Set the thickness',
            text: 'Choose 0.0002" to 0.001" on the discharge intensity selector, based on how much build-up the clearance can tolerate.',
          },
          {
            title: 'Deposit on the wear area',
            text: 'Connect the ground cable to the part and work the vibrating electrode over the wear area. For the smoothest surface, move the electrode briskly side to side.',
          },
          {
            title: 'Finish coat and grind',
            text: 'After a heavier coat, apply a light 0.0002" finish coat. When the sides are coated, grind the face.',
          },
          {
            title: 'Stone',
            text: 'Lightly stone the deposit with a cubic boron nitride or diamond stone to remove burrs.',
          },
        ],
      },
      {
        heading: 'Why deposit instead of replace',
        paragraphs: [
          'A new punch or die means the tool cost plus the downtime to source and set it up. Depositing tungsten carbide on the wear area of the tool you already have takes it back toward size with a 78 to 80 Rockwell C working surface. The Carbitron 300 is $495, and replacement electrodes are $12.50.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can tungsten carbide be added to a worn punch or die?',
        a: 'Yes. The Carbitron 300 deposits 0.0002" to 0.001" of tungsten carbide onto the wear area, which can bring a worn tool back toward size.',
      },
      {
        q: 'Where on a punch should the carbide go?',
        a: 'Wherever it wears. Most commonly the sides are coated and the face is ground afterward.',
      },
      {
        q: 'How smooth is the deposit?',
        a: 'Moving the electrode briskly side to side and finishing with a light 0.0002" coat gives the smoothest surface. A light stone with CBN or diamond removes remaining burrs.',
      },
      {
        q: 'How long will a treated die last?',
        a: 'Hunter Products rates forming, stamping and forging tools at 5x to 10x their standard life with a tungsten carbide deposit.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-8', 'tungsten-carbide-electrode-1-16'],
    related: ['extend-cutting-tool-life-tungsten-carbide', 'tungsten-carbide-end-mills-milling-cutters', 'carbide-grip-surfaces-collets-grippers'],
    updated: '2026-10-12',
  },

  {
    slug: 'carbide-grip-surfaces-collets-grippers',
    label: 'Carbide grip surfaces',
    h1: 'Tungsten carbide grip surfaces for collets, chucks and grippers',
    metaTitle: 'Tungsten Carbide Grip Surfaces: Collets, Chucks, Grippers',
    metaDescription:
      'Add a tungsten carbide grip surface to collets, chucks, grippers and machine parts for more holding friction and less wear. Thickness, technique and cost.',
    eyebrow: 'Tooling',
    lede: 'Gripping surfaces wear smooth and start to slip. A tungsten carbide deposit gives them a hard, textured surface that grips better and wears slower.',
    answer:
      'Deposit 0.0002" to 0.004" of tungsten carbide over the whole gripping surface with the Carbitron 300. The fused 78 to 80 Rockwell C deposit increases friction and wear life on collets, chucks, grippers and machine parts. It is the same process as diamond dusting on surgical instruments.',
    sections: [
      {
        heading: 'What it does for a gripping surface',
        list: [
          'Increases friction, so parts slip less',
          'Increases wear life on the contact surface',
          'Improves surface texture',
          'A non-brittle tungsten carbide surface',
        ],
      },
      {
        heading: 'Where it is used',
        list: [
          'Collets and chucks',
          'Grippers',
          'General machine parts with gripping or wear surfaces',
          'Surgical and dental instruments, where the Carbitron is the original diamond-dusting system',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Set the thickness',
            text: 'Choose a deposit on the discharge intensity selector, from 0.0002" to 0.001" per setting. The brochure recommends 0.0002" to 0.004" total on gripping surfaces, depending on the thickness that can be tolerated.',
          },
          {
            title: 'Cover the whole gripping surface',
            text: 'Connect the ground cable to the part and work the vibrating electrode evenly over the entire gripping or wear surface.',
          },
          {
            title: 'Finish if you need it smoother',
            text: 'For a smoother surface, move the electrode briskly side to side and finish with a light 0.0002" coat. Lightly stone with a CBN or diamond stone to remove burrs.',
          },
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Carbitron 300 ($495) and tungsten-carbide electrodes ($12.50 each). A 1/8" x 2 1/2" electrode typically covers about 50 square inches at 0.0005" average thickness. Use the 1/16" or 1/32" electrode for small or detailed surfaces.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you add tungsten carbide to a collet or chuck?',
        a: 'Yes. Deposit 0.0002" to 0.004" over the gripping surface with the Carbitron 300 to increase grip and wear life.',
      },
      {
        q: 'Is it the same as diamond dusting?',
        a: 'It is the same process. The Carbitron 300 is the original diamond-dusting system used on surgical and dental instruments, applied here to industrial gripping surfaces.',
      },
      {
        q: 'How hard is the grip surface?',
        a: '78 to 80 Rockwell C, fused to the part.',
      },
      {
        q: 'Which electrode should I use?',
        a: 'The 1/8" electrode for general surfaces, the 1/16" for finer work and the 1/32" for precision detail.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-8', 'tungsten-carbide-electrode-1-32'],
    related: ['diamond-dusting-surgical-instruments', 'extend-cutting-tool-life-tungsten-carbide', 'punch-and-die-life-tungsten-carbide'],
    updated: '2026-10-12',
  },

  // ── Metal guides: nickel, copper, tin, palladium, rhodium ────────────

  {
    slug: 'nickel-plating-pen-guide',
    label: 'Using a nickel plating pen',
    h1: 'How to use a nickel plating pen: underlayers, voltage and thickness',
    metaTitle: 'Nickel Plating Pen: How to Use It, 5 to 6V, No Tank',
    metaDescription:
      'Brush plate nickel onto copper at 5 to 6V: about 0.4 µm in 2 minutes. When to copper flash first, standard vs heavy-duty vs black nickel. Pens from $70.',
    eyebrow: 'Nickel plating',
    lede: 'Nickel is the layer most plating jobs depend on. It goes under gold, rhodium and palladium so those finishes bond and last, and it works as a finish in its own right.',
    answer:
      'Degrease the part at 10 to 12V DC, then stroke the nickel pen over it at 5 to 6V. Nickel plates directly onto copper; steel, brass and other metals get a copper flash first. A standard nickel pen deposits about 0.4 µm in 2 minutes on a 1 in² area and builds to 1.5 to 1.8 µm. The pen is $70.',
    sections: [
      {
        heading: 'What a nickel pen is used for',
        list: [
          'The underlayer under gold on connector pins, edge connectors and PCB gold fingers',
          'The required base under rhodium and palladium',
          'Restoring worn nickel on machinery components and contact surfaces',
          'Corrosion-protection touch-up on industrial equipment',
        ],
      },
      {
        heading: 'What nickel will plate onto',
        paragraphs: [
          'The nickel pens plate over copper. Any other metal gets a copper flash with the Copper pen (PL-1010) first, and stainless steel is cleaned with its own degreaser.',
        ],
        table: {
          caption: 'Nickel plating sequence by base metal',
          head: ['Base metal', 'Sequence'],
          rows: [
            ['Copper', 'Degrease, then nickel'],
            ['Brass, steel or zinc die-cast', 'Degrease, copper flash, then nickel'],
            ['Stainless steel', 'Stainless degreaser, copper flash, then nickel'],
            ['Aluminum', 'Not supported by the Micro-Metallizer system'],
          ],
        },
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Copper flash, on anything that is not copper',
            text: 'Plate a thin copper layer with the Copper pen (PL-1010) at 6 to 8V. Wipe clean with a cloth. Skip this step on copper.',
          },
          {
            title: 'Plate nickel at 5 to 6V',
            text: `Set the supply to 5 to 6V and switch to the Nickel pen (PL-1006). ${HOOKUP}`,
          },
          {
            title: 'Build to thickness',
            text: 'A standard nickel pen deposits about 0.4 µm in 2 minutes and 0.6 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm. Keep working the area to build more.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth. If a finish goes on top, switch pens and plate it now.',
          },
        ],
      },
      {
        heading: 'Standard, heavy-duty or black nickel',
        table: {
          caption: 'Micro-Metallizer nickel pens. Deposit figures are on a 1 in × 1 in copper surface, from the catalog.',
          head: ['Pen', 'Catalog no.', 'Price', 'Voltage (DC)', '2 minutes', '3 minutes', 'Maximum'],
          rows: [
            ['Nickel', 'PL-1006', '$70', '5 to 6V', '0.4 µm', '0.6 µm', '1.5 to 1.8 µm'],
            ['Nickel Heavy', 'PL-1020', '$120', '5 to 6V', '0.8 µm', '1.2 µm', '3 to 3.6 µm'],
            ['Black Nickel', 'PL-1007', '$70', '8 to 10V', '0.5 µm', '0.6 µm', '1.5 to 1.8 µm'],
          ],
        },
        paragraphs: [
          'Use the heavy-duty pen for a thicker underlayer under production gold or rhodium work. Black nickel plates the same way as nickel, at a higher voltage, and leaves a dark, low-reflectivity finish.',
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Nickel pen ($70), the Absorbent / Degreaser pen ($65), the power supply ($220) and connector cables ($20) come to $375. Add the Copper pen ($65) if you plate anything other than copper.',
          'If the nickel is going under gold, the Contact Repair Kit ($400) is the better buy: it has the power supply, cables, degreaser and nickel pens, plus a 24K gold pen.',
        ],
      },
    ],
    faq: [
      {
        q: 'What voltage do you use for nickel plating with a pen?',
        a: '5 to 6V DC for the Nickel and Nickel Heavy pens, with the part on the negative lead and the pen on the positive lead. Black Nickel runs at 8 to 10V. Degreasing beforehand runs at 10 to 12V.',
      },
      {
        q: 'Can you nickel plate steel with a pen?',
        a: 'Yes, with a copper flash first. Degrease, plate a thin copper layer with the Copper pen, then plate nickel.',
      },
      {
        q: 'Do I need nickel under gold?',
        a: 'On copper, yes. Gold pens plate over gold, nickel or silver, not bare copper, so nickel goes down first.',
      },
      {
        q: 'How thick is brush-plated nickel?',
        a: 'A standard nickel pen builds up to 1.5 to 1.8 µm, at about 0.4 µm in 2 minutes on a 1 in² area. The heavy-duty pen builds up to 3 to 3.6 µm.',
      },
      {
        q: 'How much area does one nickel pen cover?',
        a: 'Each pen holds 10 ml of concentrated solution and plates roughly 300 square inches.',
      },
    ],
    products: ['nickel-plating-pen', 'contact-repair-kit', 'nickel-heavy-duty-plating-pen', 'copper-plating-pen'],
    related: ['copper-plating-pen-guide', 'gold-plating-pen-guide', 'plating-pen-voltage-chart', 'brush-plating-substrate-guide'],
    updated: '2026-11-20',
  },

  {
    slug: 'copper-plating-pen-guide',
    label: 'Copper flash with a plating pen',
    h1: 'Copper plating pen: how to copper flash steel, brass and stainless',
    metaTitle: 'Copper Plating Pen: Copper Flash Steel & Brass, 6 to 8V',
    metaDescription:
      'Use a copper plating pen to flash steel, brass, zinc die-cast and stainless before nickel, chrome color or gold. 6 to 8V, steps and thickness. Pens from $65.',
    eyebrow: 'Copper plating',
    lede: 'Copper is the first layer on most parts that are not copper already. Flash it on, and the part will take nickel, chrome color and everything that goes over nickel.',
    answer:
      'Degrease the part at 10 to 12V DC, then stroke the copper pen over it at 6 to 8V. Copper plates directly onto any metal except aluminum and chromium, at about 0.3 µm in 2 minutes on a 1 in² area. Use it as a flash layer under nickel, black nickel and chrome color, or on its own to restore a copper surface. The pen is $65.',
    sections: [
      {
        heading: 'What a copper flash is for',
        paragraphs: [
          'Nickel, black nickel and chrome color plate over copper, not over steel or brass. A copper flash is a thin copper layer that gives them a base they bond to. Gold, rhodium and palladium sit one step further up: copper flash, then nickel, then the finish.',
          'The Micro-Metallizer catalog recommends a copper flash on zinc die-castings and steel before any other plating.',
        ],
      },
      {
        heading: 'When you need copper first',
        table: {
          caption: 'Where the copper flash fits, by finish',
          head: ['Final finish', 'On copper', 'On steel, brass or zinc die-cast'],
          rows: [
            ['Nickel or black nickel', 'No flash needed', 'Copper flash, then nickel'],
            ['Chrome color', 'No flash needed', 'Copper flash, then chrome color'],
            ['Gold', 'Nickel, then gold', 'Copper flash, nickel, then gold'],
            ['Rhodium or palladium', 'Nickel, then the finish', 'Copper flash, nickel, then the finish'],
            ['Silver, tin or zinc', 'No flash needed', 'No flash needed; the catalog recommends one on steel and zinc die-cast'],
          ],
        },
        note: 'Stainless steel is cleaned with the Stainless Steel Degreaser pen (PL-1014) instead of the standard degreaser, then flashed the same way.',
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Plate copper at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the Copper pen (PL-1010). ${HOOKUP} For a flash layer, cover the whole area the next metal will go on.`,
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
          {
            title: 'Go straight to the next pen',
            text: 'Set the voltage for the next metal, for example 5 to 6V for nickel, and plate over the fresh copper.',
          },
        ],
      },
      {
        heading: 'Copper on its own',
        paragraphs: [
          'The same pen restores copper on bus bars, contact rails and other copper conductive surfaces. For large areas or thicker copper, the Copper Heavy pen carries more solution and plates twice as fast.',
        ],
        table: {
          caption: 'Copper deposit on a 1 in × 1 in copper surface, from the Micro-Metallizer catalog',
          head: ['Pen', 'Catalog no.', 'Price', '2 minutes', '3 minutes', 'Maximum'],
          rows: [
            ['Copper', 'PL-1010', '$65', '0.3 µm', '0.5 µm', '1.5 to 1.8 µm'],
            ['Copper Heavy', 'PL-1019', '$100', '0.6 µm', '1.0 µm', '3 to 3.6 µm'],
          ],
        },
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Copper pen ($65), the Absorbent / Degreaser pen ($65), the power supply ($220) and connector cables ($20) come to $370.',
          'A flash layer is rarely the whole job. The Deluxe Kit ($540) includes the copper pen along with the degreaser, nickel, chrome color, silver and 24K gold pens, the power supply and cables, which covers the full sequence on steel and brass.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is a copper flash?',
        a: 'A thin copper layer plated first so the next metal has a compatible base. Nickel, black nickel and chrome color need it on anything that is not copper.',
      },
      {
        q: 'What voltage does a copper plating pen use?',
        a: '6 to 8V DC, with the part on the negative lead and the pen on the positive lead. Degreasing beforehand runs at 10 to 12V.',
      },
      {
        q: 'Can you copper plate steel with a pen?',
        a: 'Yes. Copper plates directly onto steel and any other metal except aluminum and chromium.',
      },
      {
        q: 'Can you copper plate stainless steel?',
        a: 'Yes. Clean and activate it with the Stainless Steel Degreaser pen (PL-1014) first, then plate copper.',
      },
      {
        q: 'How thick is a copper flash?',
        a: 'A standard copper pen deposits about 0.3 µm in 2 minutes on a 1 in² area. A flash only needs to cover the surface evenly before the next metal goes on.',
      },
    ],
    products: ['copper-plating-pen', 'deluxe-plating-kit', 'copper-heavy-duty-plating-pen', 'absorbent-degreaser-plating-pen'],
    related: ['nickel-plating-pen-guide', 'brush-plating-substrate-guide', 'plating-pen-voltage-chart', 'plating-pen-kit-comparison'],
    updated: '2026-11-20',
  },

  {
    slug: 'tin-plating-pen-guide',
    label: 'Using a tin plating pen',
    h1: 'Tin plating pen: re-tin terminals, lugs, leads and pads',
    metaTitle: 'Tin Plating Pen: Re-Tin Terminals, Leads & Pads, 6 to 8V',
    metaDescription:
      'Tin plating pen how-to: plate tin straight onto copper, brass or steel at 6 to 8V with no underlayer. Steps, thickness and parts list. Tin pen $70.',
    eyebrow: 'Tin plating',
    lede: 'Tin keeps a surface solderable and slows corrosion on copper, brass and steel. A tin plating pen puts it back on a terminal, lug, lead or pad without a tank.',
    answer:
      'Degrease at 10 to 12V DC, then stroke the tin pen over the surface at 6 to 8V. Tin plates directly onto any metal except aluminum and chromium, so copper, brass and steel need no underlayer. Expect about 0.3 µm in 2 minutes on a 1 in² area, up to 1.5 to 1.8 µm. The pen is $70 and covers roughly 300 square inches.',
    sections: [
      {
        heading: 'Good jobs for a tin pen',
        list: [
          'Terminals and lugs with old or oxidized tin that no longer wets with solder',
          'Component leads that need fresh tin before soldering',
          'PCB pads that have oxidized in storage',
          'Corrosion protection on copper, brass and steel components',
        ],
      },
      {
        heading: 'No underlayer needed',
        paragraphs: [
          'Tin is one of the four Micro-Metallizer finishes that plate over any metallic surface except aluminum and chromium. On copper, brass or steel you degrease and plate tin directly.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Plate tin at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the Tin pen (PL-1012). ${HOOKUP}`,
          },
          {
            title: 'Build to thickness',
            text: 'The tin pen deposits about 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area, up to a maximum of 1.5 to 1.8 µm.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe with a clean, soft cloth. The surface is ready to solder or put back in service.',
          },
        ],
      },
      {
        heading: 'Parts list',
        list: [
          'Tin plating pen (PL-1012), $70',
          'Absorbent / Degreaser pen (PL-1002), $65',
          'Micro-Metallizer Power Supply (PL-1000), $220',
          'Connector Cables (PL-1001), $20',
        ],
        note: 'Total $375. If you already own a variable DC supply up to 12V at 0.1A, the two pens are $135.',
      },
    ],
    faq: [
      {
        q: 'Can you tin plate copper with a pen?',
        a: 'Yes, directly. Tin plates over any metallic surface except aluminum and chromium, so copper needs no underlayer.',
      },
      {
        q: 'What voltage does a tin plating pen use?',
        a: '6 to 8V DC, with the part on the negative lead and the pen on the positive lead. Degreasing beforehand runs at 10 to 12V.',
      },
      {
        q: 'How thick is tin from a plating pen?',
        a: 'About 0.3 µm in 2 minutes and 0.5 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
      },
      {
        q: 'Can I re-tin PCB pads with it?',
        a: 'Yes. Re-plating tin on oxidized pads restores normal soldering. See the guide to restoring PCB pad solderability for the board-level steps.',
      },
      {
        q: 'How much area does one tin pen cover?',
        a: 'Each pen holds 10 ml of concentrated solution and plates roughly 300 square inches.',
      },
    ],
    products: ['tin-plating-pen', 'absorbent-degreaser-plating-pen', 'micro-metallizer-power-supply', 'micro-metallizer-connector-cables'],
    related: ['restore-pcb-pad-solderability', 'brush-plating-substrate-guide', 'plating-pen-voltage-chart'],
    updated: '2026-11-20',
  },

  {
    slug: 'palladium-plating-pen-guide',
    label: 'Using a palladium plating pen',
    h1: 'Palladium plating pen: how to brush plate palladium over nickel',
    metaTitle: 'Palladium Plating Pen: Brush Plate Over Nickel, 6 to 8V',
    metaDescription:
      'Brush plate palladium in place with a pen: nickel underlayer, 6 to 8V, about 0.5 µm in 2 minutes. A white-metal finish at under half the price of rhodium.',
    eyebrow: 'Palladium plating',
    lede: 'Palladium is a tarnish-resistant white metal used on electrical contacts. A palladium plating pen puts it on one contact or one worn spot at the bench, with no tank and no minimum lot.',
    answer:
      'Palladium plates over nickel. Degrease at 10 to 12V DC, plate nickel at 5 to 6V (with a copper flash first on steel or brass), then stroke the palladium pen over the nickel at 6 to 8V. It deposits about 0.5 µm in 2 minutes on a 1 in² area, up to 1.5 to 1.8 µm. The pen is $140.',
    sections: [
      {
        heading: 'Where a palladium pen fits',
        list: [
          'Contact surfaces that need a tarnish-resistant white-metal finish',
          'Repair and touch-up of palladium-plated contacts without sending the part out',
          'Prototype and experimental work on contact surfaces',
          'Jobs that call for a white finish where the brightness of rhodium is not required',
        ],
        note: 'The pen is for selective work on small areas. Whole parts and production lots belong on a plating line.',
      },
      {
        heading: 'Palladium needs nickel under it',
        paragraphs: [
          'The Palladium pen plates over nickel. On a nickel surface you degrease and plate. On anything else, the nickel goes down first, and steel, brass and zinc die-cast get a copper flash before the nickel.',
        ],
        table: {
          caption: 'Palladium plating sequence by base metal',
          head: ['Base metal', 'Sequence'],
          rows: [
            ['Nickel', 'Degrease, then palladium'],
            ['Copper', 'Degrease, nickel, then palladium'],
            ['Brass, steel or zinc die-cast', 'Degrease, copper flash, nickel, then palladium'],
            ['Stainless steel', 'Stainless degreaser, copper flash, nickel, then palladium'],
            ['Aluminum', 'Not supported by the Micro-Metallizer system'],
          ],
        },
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Build the nickel base',
            text: 'On steel or brass, flash copper with the Copper pen (PL-1010) at 6 to 8V. Then plate nickel with the Nickel pen (PL-1006) at 5 to 6V. Wipe clean with a cloth between pens. Skip this step if the surface is already nickel.',
          },
          {
            title: 'Plate palladium at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the Palladium pen (PL-1015). ${HOOKUP}`,
          },
          {
            title: 'Build to thickness',
            text: 'The palladium pen deposits about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'Palladium or rhodium',
        table: {
          caption: 'The two white precious-metal pens. Deposit figures are on a 1 in × 1 in copper surface, from the catalog.',
          head: ['', 'Palladium (PL-1015)', 'Rhodium (PL-1011)'],
          rows: [
            ['Price', '$140', '$310'],
            ['Voltage (DC)', '6 to 8V', '8 to 10V'],
            ['Plates over', 'Nickel', 'Nickel'],
            ['Deposit in 2 minutes', '0.5 µm', '0.7 µm'],
            ['Solution cost per square inch', 'about $0.47', 'about $1.03'],
            ['Choose it for', 'A tarnish-resistant white finish at lower cost', 'The hardest, brightest finish in the line'],
          ],
        },
        note: 'Cost per square inch is the list price divided by the roughly 300 square inches each pen covers.',
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Palladium pen ($140), Nickel pen ($70), Absorbent / Degreaser pen ($65), power supply ($220) and connector cables ($20) come to $515. Add the Copper pen ($65) for steel or brass.',
          'The Contact Repair Kit ($400) already has the power supply, cables, degreaser and nickel pens, plus a 24K gold pen. Adding the Palladium pen to the kit comes to $540, which is $25 more than the parts bought separately and gives you gold as well.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you plate palladium with a pen?',
        a: 'Yes. The Palladium pen (PL-1015) brush plates palladium over nickel at 6 to 8V DC, with no tank.',
      },
      {
        q: 'Does palladium need an underlayer?',
        a: 'Yes. Palladium plates over nickel. On copper, plate nickel first. On steel, brass or zinc die-cast, flash copper, then nickel, then palladium.',
      },
      {
        q: 'How thick is brush-plated palladium?',
        a: 'About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
      },
      {
        q: 'What does palladium plating with a pen cost?',
        a: 'The pen is $140 and covers roughly 300 square inches, so about $0.47 of solution per square inch. Precious metal pen prices can change with metal markets.',
      },
      {
        q: 'Do you offer palladium plating as a service?',
        a: 'No. Hunter Products sells the equipment so you can plate in house. For whole parts or production lots, use a plating shop.',
      },
    ],
    products: ['palladium-plating-pen', 'contact-repair-kit', 'nickel-plating-pen', 'absorbent-degreaser-plating-pen'],
    related: ['rhodium-plating-pen-guide', 'nickel-plating-pen-guide', 'brush-plating-substrate-guide', 'brush-plating-cost'],
    updated: '2026-11-20',
  },

  {
    slug: 'rhodium-plating-pen-guide',
    label: 'Using a rhodium plating pen',
    h1: 'Rhodium plating pen: how to brush plate rhodium over nickel',
    metaTitle: 'Rhodium Plating Pen: How to Use It, 8 to 10V Over Nickel',
    metaDescription:
      'Brush plate rhodium with a pen: nickel underlayer, 8 to 10V, about 0.7 µm in 2 minutes. Sequence by base metal, thickness and what the setup costs.',
    eyebrow: 'Rhodium plating',
    lede: 'Rhodium is the hardest, brightest and most tarnish-resistant finish in the Micro-Metallizer line. The pen puts it only where you need it, which matters at the price of rhodium.',
    answer:
      'Rhodium plates over nickel. Degrease at 10 to 12V DC, plate nickel at 5 to 6V (with a copper flash first on steel or brass), then stroke the rhodium pen over the nickel at 8 to 10V. It deposits about 0.7 µm in 2 minutes on a 1 in² area, the fastest of the standard pens, up to 1.5 to 1.8 µm. The pen is $310.',
    sections: [
      {
        heading: 'Where a rhodium pen is used',
        list: [
          'Premium electrical contacts',
          'Optical components and instrument work that need a hard, highly reflective surface',
          'Wear surfaces where a small area needs the hardest finish available',
        ],
      },
      {
        heading: 'Rhodium needs nickel under it',
        table: {
          caption: 'Rhodium plating sequence by base metal',
          head: ['Base metal', 'Sequence'],
          rows: [
            ['Nickel', 'Degrease, then rhodium'],
            ['Copper', 'Degrease, nickel, then rhodium'],
            ['Brass, steel or zinc die-cast', 'Degrease, copper flash, nickel, then rhodium'],
            ['Gold or silver', 'Degrease, copper flash, nickel, then rhodium'],
            ['Stainless steel', 'Stainless degreaser, copper flash, nickel, then rhodium'],
            ['Aluminum', 'Not supported by the Micro-Metallizer system'],
          ],
        },
      },
      {
        heading: 'Step by step',
        steps: [
          PREP_STEP,
          DEGREASE_STEP,
          {
            title: 'Build the nickel base',
            text: 'On anything that is not copper or nickel, flash copper with the Copper pen (PL-1010) at 6 to 8V. Then plate nickel with the Nickel pen (PL-1006) at 5 to 6V. Wipe clean with a cloth between pens. Skip this step if the surface is already nickel.',
          },
          {
            title: 'Plate rhodium at 8 to 10V',
            text: `Set the supply to 8 to 10V and switch to the Rhodium pen (PL-1011). ${HOOKUP}`,
          },
          {
            title: 'Build to thickness',
            text: 'The rhodium pen deposits about 0.7 µm in 2 minutes and 1.0 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
          },
          {
            title: 'Wipe clean',
            text: 'Wipe the part with a clean, soft cloth.',
          },
        ],
      },
      {
        heading: 'Making an expensive pen go further',
        paragraphs: [
          'Each pen holds 10 ml of concentrated solution and covers roughly 300 square inches, which works out to about $1.03 of rhodium solution per square inch at the $310 list price. Because rhodium only deposits where the tip touches, none of it goes onto surfaces that do not need it.',
          'If the job needs a tarnish-resistant white finish but not the brightness of rhodium, the Palladium pen is $140 and plates over the same nickel base.',
        ],
      },
      {
        heading: 'What you need',
        paragraphs: [
          'The Rhodium pen ($310), Nickel pen ($70), Absorbent / Degreaser pen ($65), power supply ($220) and connector cables ($20) come to $685. Add the Copper pen ($65) for steel or brass.',
          'The Deluxe Kit, Heavy Duty ($900) is the one kit that includes a rhodium pen, along with heavy-duty nickel, copper, silver and 24K gold pens, the degreaser, power supply and cables. Bought separately those parts come to $1,190.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you rhodium plate with a pen?',
        a: 'Yes. The Rhodium pen (PL-1011) brush plates rhodium over nickel at 8 to 10V DC, with no tank.',
      },
      {
        q: 'Does rhodium need a nickel underlayer?',
        a: 'Yes. Rhodium plates over nickel. Surfaces that are not nickel get a copper flash, then nickel, then rhodium. Copper needs only the nickel.',
      },
      {
        q: 'What voltage does a rhodium plating pen use?',
        a: '8 to 10V DC, with the part on the negative lead and the pen on the positive lead.',
      },
      {
        q: 'How thick is brush-plated rhodium?',
        a: 'About 0.7 µm in 2 minutes and 1.0 µm in 3 minutes on a 1 in² area, up to 1.5 to 1.8 µm.',
      },
      {
        q: 'Why does the rhodium pen cost more than the others?',
        a: 'Rhodium is the most expensive of the plating metals in the line. Precious metal pen prices can change with metal markets.',
      },
    ],
    products: ['rhodium-plating-pen', 'deluxe-plating-kit-heavy-duty', 'nickel-plating-pen', 'contact-repair-kit'],
    related: ['palladium-plating-pen-guide', 'nickel-plating-pen-guide', 'brush-plating-substrate-guide', 'brush-plating-cost'],
    updated: '2026-11-20',
  },

  // ── Reference pages ─────────────────────────────────────────────────

  {
    slug: 'plating-pen-voltage-chart',
    label: 'Plating pen voltage chart',
    h1: 'Plating pen voltage chart: DC settings for every metal',
    metaTitle: 'Plating Pen Voltage Chart: Gold, Nickel, Silver, Zinc, Tin',
    metaDescription:
      'What voltage to use for brush plating: 5 to 6V nickel and silver, 6 to 8V gold, copper, tin and zinc, 8 to 10V rhodium, 10 to 12V to degrease. Full chart.',
    eyebrow: 'Technical reference',
    lede: 'Every Micro-Metallizer pen has its own operating voltage. This is the full list, plus the settings in order for the sequences people run most.',
    answer:
      'Pen plating runs between 5 and 12V DC. Degrease at 10 to 12V. Plate nickel and silver at 5 to 6V. Plate gold, copper, tin, zinc, palladium and chrome color at 6 to 8V. Plate rhodium and black nickel at 8 to 10V. The part goes on the negative lead and the pen on the positive lead.',
    sections: [
      {
        heading: 'Voltage by pen',
        table: VOLTAGE_TABLE,
        note: 'The operating voltage is also printed on each pen.',
      },
      {
        heading: 'Grouped by setting',
        table: {
          caption: 'Pens that share a voltage setting',
          head: ['Setting (DC)', 'Pens'],
          rows: [
            ['5 to 6V', 'Nickel, Nickel Heavy, Silver, Silver Heavy'],
            ['6 to 8V', 'Gold 24K, 18K and 14K, Gold Heavy, Copper, Copper Heavy, Tin, Zinc, Palladium, Chrome Color'],
            ['8 to 10V', 'Rhodium, Black Nickel'],
            ['10 to 12V', 'Absorbent / Degreaser, Stainless Steel Degreaser'],
          ],
        },
      },
      {
        heading: 'Settings for common sequences',
        paragraphs: ['Change the voltage each time you change pens, and wipe the part clean with a cloth between pens.'],
        table: {
          caption: 'Voltage at each step, in order',
          head: ['Job', 'Step 1', 'Step 2', 'Step 3', 'Step 4'],
          rows: [
            ['Gold on a copper contact', 'Degrease, 10 to 12V', 'Nickel, 5 to 6V', 'Gold, 6 to 8V', ''],
            ['Gold on steel or brass', 'Degrease, 10 to 12V', 'Copper, 6 to 8V', 'Nickel, 5 to 6V', 'Gold, 6 to 8V'],
            ['Rhodium on steel or brass', 'Degrease, 10 to 12V', 'Copper, 6 to 8V', 'Nickel, 5 to 6V', 'Rhodium, 8 to 10V'],
            ['Nickel on steel', 'Degrease, 10 to 12V', 'Copper, 6 to 8V', 'Nickel, 5 to 6V', ''],
            ['Tin on a copper pad', 'Degrease, 10 to 12V', 'Tin, 6 to 8V', '', ''],
            ['Zinc touch-up on steel', 'Degrease, 10 to 12V', 'Zinc, 6 to 8V', '', ''],
            ['Silver on a copper bus bar', 'Degrease, 10 to 12V', 'Silver, 5 to 6V', '', ''],
          ],
        },
      },
      {
        heading: 'Polarity and hookup',
        paragraphs: [HOOKUP],
      },
      {
        heading: 'Power supply requirements',
        paragraphs: [
          'The pens run on any variable DC supply up to 12V at 0.1A. The Micro-Metallizer power supply ($220) is a compact variable supply made for the pens, available for 110V/60Hz or 220V/50Hz input, and it is included in every kit.',
        ],
      },
    ],
    faq: [
      {
        q: 'What voltage is used for nickel plating with a pen?',
        a: '5 to 6V DC for the Nickel and Nickel Heavy pens. Black Nickel runs at 8 to 10V.',
      },
      {
        q: 'What voltage is used for gold plating with a pen?',
        a: '6 to 8V DC for all gold pens: 24K, 18K, 14K and the heavy-duty versions.',
      },
      {
        q: 'What voltage do I use to degrease before plating?',
        a: '10 to 12V DC with the Absorbent / Degreaser pen, or the Stainless Steel Degreaser pen on stainless.',
      },
      {
        q: 'Which lead goes on the part?',
        a: 'The negative lead goes on the part. The positive lead goes on the pen.',
      },
      {
        q: 'Can I use my own bench power supply?',
        a: 'Yes. Any variable DC supply up to 12V at 0.1A will run the pens.',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'micro-metallizer-power-supply', 'micro-metallizer-connector-cables'],
    related: ['brush-plating-thickness-chart', 'plating-time-thickness-conversion', 'brush-plating-substrate-guide', 'plating-pen-kit-comparison'],
    updated: '2026-11-20',
  },

  {
    slug: 'plating-time-thickness-conversion',
    label: 'Plating time and thickness conversion',
    h1: 'How long pen plating takes, with a microns to microinches table',
    metaTitle: 'Plating Time & Thickness Conversion: Microns to Microinches',
    metaDescription:
      'How long brush plating takes per metal, and a plating thickness conversion table from microns to microinches and inches for every figure in the catalog.',
    eyebrow: 'Technical reference',
    lede: 'Plating time decides thickness. These are the catalog rates for every pen, the time a typical sequence takes, and the same thicknesses converted to microinches for drawings that call them out that way.',
    answer:
      'On a 1 in² copper surface, a standard gold, silver or palladium pen deposits about 0.5 µm (20 microinches) in 2 minutes and 0.8 µm (31 microinches) in 3 minutes. Standard pens top out at 1.5 to 1.8 µm (59 to 71 microinches) and heavy-duty pens at 3 to 3.6 µm (118 to 142 microinches). One micron is 39.37 microinches.',
    sections: [
      {
        heading: 'Plating time by metal',
        table: RATE_TABLE,
        note: 'Rates are typical figures from the Micro-Metallizer catalog for a 1 in × 1 in copper surface.',
      },
      {
        heading: 'Microns to microinches',
        paragraphs: ['To convert, multiply microns by 39.37 to get microinches. The table covers every thickness in the catalog.'],
        table: {
          caption: 'Plating thickness conversion: 1 µm = 39.37 µin = 0.00003937 in',
          head: ['Microns (µm)', 'Microinches (µin)', 'Inches', 'Where it shows up'],
          rows: [
            ['0.3', '11.8', '0.000012', 'Copper, zinc, tin, chrome color in 2 minutes'],
            ['0.4', '15.7', '0.000016', 'Nickel in 2 minutes'],
            ['0.5', '19.7', '0.000020', 'Gold, silver, palladium in 2 minutes'],
            ['0.6', '23.6', '0.000024', 'Nickel in 3 minutes; Copper Heavy in 2 minutes'],
            ['0.7', '27.6', '0.000028', 'Rhodium in 2 minutes'],
            ['0.8', '31.5', '0.000031', 'Gold, silver, palladium in 3 minutes; Gold, Silver and Nickel Heavy in 2 minutes'],
            ['1.0', '39.4', '0.000039', 'Rhodium in 3 minutes; Copper Heavy in 3 minutes'],
            ['1.2', '47.2', '0.000047', 'Gold, Silver and Nickel Heavy in 3 minutes'],
            ['1.5', '59.1', '0.000059', 'Standard pen maximum, low end'],
            ['1.8', '70.9', '0.000071', 'Standard pen maximum, high end'],
            ['3.0', '118.1', '0.000118', 'Heavy-duty pen maximum, low end'],
            ['3.6', '141.7', '0.000142', 'Heavy-duty pen maximum, high end'],
          ],
        },
      },
      {
        heading: 'How long a full sequence takes',
        paragraphs: [
          'Most jobs are more than one pen. Using the catalog rates on a 1 in² area, the plating time for the common sequences adds up like this. Degreasing and wiping between pens are extra.',
        ],
        table: {
          caption: 'Plating time for common sequences at 2 minutes per metal, 1 in² area',
          head: ['Job', 'Layers', 'Plating time', 'Deposit'],
          rows: [
            ['Gold on a copper contact', 'Nickel, then gold', '4 minutes', '0.4 µm nickel, 0.5 µm gold'],
            ['Gold on steel or brass', 'Copper, nickel, then gold', '6 minutes', '0.3 µm copper, 0.4 µm nickel, 0.5 µm gold'],
            ['Rhodium on copper', 'Nickel, then rhodium', '4 minutes', '0.4 µm nickel, 0.7 µm rhodium'],
            ['Tin on a copper pad', 'Tin', '2 minutes', '0.3 µm tin'],
            ['Zinc touch-up on steel', 'Zinc', '2 minutes', '0.3 µm zinc'],
            ['Silver on a copper bus bar', 'Silver', '2 minutes', '0.5 µm silver'],
          ],
        },
      },
      {
        heading: 'When the drawing asks for more',
        paragraphs: [
          'Standard pens reach 1.5 to 1.8 µm and heavy-duty pens 3 to 3.6 µm. If a specification calls for a deposit thicker than that, the part needs a plating line. For anything at or under those limits, choose the heavy-duty pen when you want the thickness in fewer passes.',
        ],
      },
    ],
    faq: [
      {
        q: 'How many microinches is one micron?',
        a: '39.37 microinches. So 0.5 µm is about 20 microinches and 1.8 µm is about 71 microinches.',
      },
      {
        q: 'How long does it take to gold plate with a pen?',
        a: 'About 2 minutes for 0.5 µm and 3 minutes for 0.8 µm on a 1 in² area with a standard gold pen. The heavy-duty pen deposits 0.8 µm in 2 minutes.',
      },
      {
        q: 'Which pen plates fastest?',
        a: 'Among standard pens, rhodium at about 0.7 µm in 2 minutes. The Gold, Silver and Nickel Heavy pens deposit about 0.8 µm in 2 minutes.',
      },
      {
        q: 'What is the thickest deposit a plating pen can build?',
        a: 'Standard pens build 1.5 to 1.8 µm (59 to 71 microinches). Heavy-duty pens build 3 to 3.6 µm (118 to 142 microinches).',
      },
    ],
    products: ['contact-repair-kit', 'deluxe-plating-kit', 'gold-24k-heavy-duty-plating-pen', 'contact-repair-kit-heavy-duty'],
    related: ['brush-plating-thickness-chart', 'plating-pen-voltage-chart', 'brush-plating-cost', 'brush-plating-vs-tank-plating'],
    updated: '2026-11-20',
  },

  // ── Carbitron application guides ────────────────────────────────────

  {
    slug: 'tungsten-carbide-end-mills-milling-cutters',
    label: 'Carbide on end mills and milling cutters',
    h1: 'Tungsten carbide coating for end mills and milling cutters',
    metaTitle: 'Tungsten Carbide Coating for End Mills & Milling Cutters',
    metaDescription:
      'Add tungsten carbide to end mills, shell mills, hobs and milling cutters in your own shop: where to deposit, how thick, and how to re-sharpen. System $495.',
    eyebrow: 'Tooling',
    lede: 'Milling tools wear at the cutting edge long before the rest of the tool is used up. Depositing tungsten carbide on that edge in your own shop gives a standard cutter a much harder working surface.',
    answer:
      'With the Carbitron 300, deposit 0.0002" to 0.0006" of tungsten carbide along the cutting edges of an end mill, inside the flute at the bottom and sides, along the full length of the tool, then re-sharpen. Horizontal milling cutters and hobs take 0.0002" to 0.004" on the front face of each tooth. The fused layer is 78 to 80 Rockwell C.',
    sections: [
      {
        heading: 'What it does for a milling tool',
        list: [
          'A 78 to 80 Rockwell C tungsten carbide layer fused to the cutting edge',
          'Self-sharpening cutting edges',
          'A non-brittle surface with better thermal-shock and impact resistance',
          'Worn tools resized and salvaged instead of replaced',
          'Less downtime, fewer tool changes and less sharpening',
        ],
        note: 'Hunter Products rates Carbitron-treated tooling at 5x to 10x the life of standard tooling, depending on the tool and the work.',
      },
      {
        heading: 'Where to deposit and how much',
        table: {
          caption: 'Recommended deposit by milling tool, from the Carbitron 300 brochure',
          head: ['Tool', 'Deposit', 'Where', 'Then'],
          rows: [
            ['End mills', '0.0002" to 0.0006"', 'Cutting edges inside the flute, at the bottom and sides, along the entire length of the tool', 'Re-sharpen'],
            ['Counterbores', '0.0002" to 0.0006"', 'Same as end mills', 'Re-sharpen'],
            ['Shell mills', '0.0002" to 0.0006"', 'Front face of the cutting surface, along the cutting edge', 'Re-sharpen'],
            ['Horizontal milling cutters', '0.0002" to 0.004"', 'Front face of each tooth, along the cutting edge', 'Re-sharpen by grinding the land'],
            ['Hobs', '0.0002" to 0.004"', 'Front face of each tooth, along the cutting edge', 'Re-sharpen'],
          ],
        },
        note: 'Deposit thickness is set on the power supply from 0.0002" to 0.001" in 0.0002" steps. For recommendations above 0.001", contact us for the build-up procedure.',
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Set the deposit thickness',
            text: 'Choose a setting on the discharge intensity selector, from 0.0002" to 0.001", based on the table above and how much build-up the tool can tolerate.',
          },
          {
            title: 'Deposit along the cutting edge',
            text: 'Connect the ground cable to the tool and work the vibrating electrode along the area listed for that tool. On an end mill that is inside the flute, at the bottom and sides, for the full length of the tool.',
          },
          {
            title: 'Re-sharpen',
            text: 'Grind as listed for the tool so the carbide sits right at the working edge. Horizontal milling cutters are re-sharpened by grinding the land.',
          },
          {
            title: 'Stone the edge',
            text: 'Lightly stone the deposit with a cubic boron nitride or diamond stone to remove burrs and get the sharpest edge.',
          },
        ],
      },
      {
        heading: 'Which electrode',
        paragraphs: [
          'The Carbitron 300 ships with 1/8" and 1/16" tungsten-carbide electrodes. Use the 1/8" electrode for general work and the 1/16" for finer work. A 1/32" electrode is sold separately for precision detail.',
          'A 1/8" x 2 1/2" electrode typically covers about 50 square inches at 0.0005" average thickness. Cutting edges are small, so one $12.50 electrode treats a lot of cutters.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'The Carbitron 300 is $495 complete: discharge power supply, vibrator hand tool, power and ground cables, and two electrodes. Replacement electrodes are $12.50. The unit runs on 110V, 60Hz at 4 amps (230V/50Hz available) with a 50% duty cycle and a 10-minute maximum continuous on-time.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you add tungsten carbide to a high-speed steel end mill?',
        a: 'Yes. The Carbitron 300 deposits 0.0002" to 0.0006" of tungsten carbide along the cutting edges inside the flute. Re-sharpen after depositing.',
      },
      {
        q: 'How hard is the deposit?',
        a: '78 to 80 Rockwell C. It forms a fused metallic bond with the tool surface.',
      },
      {
        q: 'Do I have to re-sharpen after depositing?',
        a: 'Yes. Deposit along the cutting edge, re-sharpen as listed for the tool, then lightly stone with a CBN or diamond stone.',
      },
      {
        q: 'How much longer will the cutter last?',
        a: 'Hunter Products rates Carbitron-treated tooling at 5x to 10x the life of standard tooling, depending on the tool and the work.',
      },
      {
        q: 'Is this the same as a PVD coating?',
        a: 'No. The Carbitron 300 is a bench unit that deposits tungsten carbide from an electrode with small electrical arcs, a process generally known as electro-spark deposition. You apply it yourself, to the edges you choose.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-8', 'tungsten-carbide-electrode-1-16', 'tungsten-carbide-electrode-1-32'],
    related: ['extend-cutting-tool-life-tungsten-carbide', 'tungsten-carbide-taps-reamers', 'punch-and-die-life-tungsten-carbide'],
    updated: '2026-11-20',
  },

  {
    slug: 'tungsten-carbide-taps-reamers',
    label: 'Carbide on taps and reamers',
    h1: 'Tungsten carbide coating for taps, reamers and threading tools',
    metaTitle: 'Tungsten Carbide Coating for Taps, Reamers & Thread Chasers',
    metaDescription:
      'Deposit tungsten carbide on taps, thread chasers, reamers and countersinks in house: where it goes, how thick, and when to re-sharpen first. System $495.',
    eyebrow: 'Tooling',
    lede: 'On taps and reamers a short length of cutting edge does the work. Adding tungsten carbide to just that edge gives it a much harder surface without replacing the tool.',
    answer:
      'With the Carbitron 300, deposit 0.0002" to 0.001" of tungsten carbide inside the flute of a sharp tap, along the cutting edge for 2 to 3 full threads. Reamers take 0.0002" to 0.0008" inside the flute along the cutting edge, then a re-sharpen. Dull taps and thread chasers are re-sharpened before depositing. The fused layer is 78 to 80 Rockwell C.',
    sections: [
      {
        heading: 'Where to deposit and how much',
        table: {
          caption: 'Recommended deposit by tool, from the Carbitron 300 brochure',
          head: ['Tool', 'Deposit', 'Where', 'Sharpening'],
          rows: [
            ['Taps', '0.0002" to 0.001"', 'Inside the flute along the cutting edge, for 2 to 3 full threads', 'Re-sharpen dull taps before depositing'],
            ['Thread chasers', '0.0002" to 0.001"', 'Along the top cutting edge', 'Re-sharpen dull chasers before depositing'],
            ['Reamers', '0.0002" to 0.0008"', 'Inside the flute along the cutting edge', 'Re-sharpen after depositing'],
            ['Countersinks', '0.0002" to 0.0006"', 'Along the cutting edge inside the flute, for the entire length of the edge', 'Re-sharpen after depositing'],
          ],
        },
        note: 'Deposit thickness is set on the power supply from 0.0002" to 0.001" in 0.0002" steps.',
      },
      {
        heading: 'Taps and thread chasers: sharpen first',
        paragraphs: [
          'Threading tools are the exception to the usual order. On a sharp tap, the carbide goes straight onto the existing edge. If the tap or chaser is dull, re-sharpen it first and then deposit, so the carbide lands on a good edge.',
          'On a tap, take care not to nick the cutting edge with the electrode.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          {
            title: 'Check the edge',
            text: 'Re-sharpen a dull tap or thread chaser before you start. Reamers and countersinks are re-sharpened after depositing instead.',
          },
          {
            title: 'Set the deposit thickness',
            text: 'Choose a setting on the discharge intensity selector, from 0.0002" up to the limit for that tool in the table.',
          },
          {
            title: 'Deposit along the cutting edge',
            text: 'Connect the ground cable to the tool and work the vibrating electrode along the listed area: 2 to 3 full threads inside the flute on a tap, the full cutting edge on a reamer or countersink.',
          },
          {
            title: 'Re-sharpen reamers and countersinks',
            text: 'Grind so the carbide sits right at the cutting edge.',
          },
          {
            title: 'Stone',
            text: 'Lightly stone the deposit with a cubic boron nitride or diamond stone to remove burrs.',
          },
        ],
      },
      {
        heading: 'Which electrode',
        paragraphs: [
          'The Carbitron 300 ships with a 1/8" electrode for general work and a 1/16" electrode for fine work. The 1/32" electrode, sold separately, is the one for precision applications such as small flutes. Electrodes are $12.50 each.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'The Carbitron 300 is $495 complete: discharge power supply, vibrator hand tool, power and ground cables, and 1/8" and 1/16" electrodes. Hunter Products rates treated tooling at 5x to 10x the life of standard tooling, depending on the tool and the work.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you put tungsten carbide on a tap?',
        a: 'Yes. Deposit 0.0002" to 0.001" inside the flute along the cutting edge for 2 to 3 full threads, taking care not to nick the edge.',
      },
      {
        q: 'Should I sharpen a tap before or after depositing?',
        a: 'Before, if it is dull. Sharp taps and thread chasers take the deposit directly. Reamers and countersinks are re-sharpened after.',
      },
      {
        q: 'How much carbide goes on a reamer?',
        a: '0.0002" to 0.0008" inside the flute along the cutting edge, followed by a re-sharpen.',
      },
      {
        q: 'How hard is the deposit?',
        a: '78 to 80 Rockwell C, fused to the tool.',
      },
    ],
    products: ['carbitron-300-system', 'tungsten-carbide-electrode-1-16', 'tungsten-carbide-electrode-1-32', 'tungsten-carbide-electrode-1-8'],
    related: ['extend-cutting-tool-life-tungsten-carbide', 'tungsten-carbide-end-mills-milling-cutters', 'punch-and-die-life-tungsten-carbide'],
    updated: '2026-11-20',
  },

];

export function guideBySlug(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export const guideUrl = (slug: string) => GUIDES.find((g) => g.slug === slug)?.path ?? `/guides/${slug}/`;
