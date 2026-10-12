/**
 * Problem-focused guide pages (/guides/<slug>/).
 *
 * Each guide targets one search a buyer actually runs ("gold plate connector pins",
 * "pcb gold finger repair") and ends at the kit that solves it.
 *
 * Every number here comes from the Micro-Metallizer catalog
 * (public/pdfs/Hunter_Micro-Metallizer_Catalog.pdf) or src/data/products.json.
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
  text: `Set the supply to 10 to 12V and use the Absorbent / Degreaser pen (PL-1002). ${HOOKUP} Small bubbles form as oil and grease come off. Rinse with water when done. Stainless steel takes the Stainless Steel Degreaser pen (PL-1014) instead.`,
};

// ── Guides ──────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [
  {
    slug: 'gold-plating-connector-pins',
    label: 'Gold plating connector pins',
    h1: 'How to gold plate connector pins without a tank',
    metaTitle: 'How to Gold Plate Connector Pins Without a Tank | Hunter Products',
    metaDescription:
      'Selective gold plating for worn or corroded connector pins and contacts: degrease, nickel underlayer, 24K gold. Voltages, plating times and the kit to use.',
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
            text: 'On non-copper pins, plate a thin copper layer with the Copper pen (PL-1010) at 6 to 8V so the nickel has a compatible base. Rinse. Skip this on copper pins.',
          },
          {
            title: 'Nickel underlayer at 5 to 6V',
            text: 'Plate nickel with the Nickel pen (PL-1006) over any exposed copper. A standard nickel pen lays down about 0.4 µm in 2 minutes on a 1 in² area. Rinse.',
          },
          {
            title: 'Plate 24K gold at 6 to 8V',
            text: 'Switch to the Gold 24K pen (PL-1003), set 6 to 8V, and stroke the pin until you have an even gold finish. About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area.',
          },
          {
            title: 'Rinse and wipe',
            text: 'Rinse the part in water and wipe it with a soft cloth.',
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
    related: ['pcb-gold-finger-repair', 'brush-plating-thickness-chart', 'brush-plating-substrate-guide'],
    updated: '2026-09-30',
  },

  {
    slug: 'pcb-gold-finger-repair',
    label: 'PCB gold finger repair',
    h1: 'PCB gold finger repair: re-plating worn edge connectors',
    metaTitle: 'PCB Gold Finger Repair | Re-Plate Worn Edge Connectors | Hunter Products',
    metaDescription:
      'Re-plate worn PCB gold fingers and edge connectors one finger at a time with a brush plating pen. Nickel and 24K gold sequence, voltages, plating times and kit.',
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
            text: 'Plate with the Nickel pen (PL-1006), working one finger at a time. About 0.4 µm in 2 minutes on a 1 in² area. Rinse.',
          },
          {
            title: '24K gold at 6 to 8V',
            text: 'Plate each finger with the Gold 24K pen (PL-1003). About 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area. Standard pens reach 1.5 to 1.8 µm maximum.',
          },
          {
            title: 'Rinse and wipe',
            text: 'Rinse and wipe the fingers with a soft cloth before reseating the board.',
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
    related: ['gold-plating-connector-pins', 'restore-pcb-pad-solderability', 'brush-plating-thickness-chart'],
    updated: '2026-09-30',
  },

  {
    slug: 'restore-pcb-pad-solderability',
    label: 'Restoring PCB pad solderability',
    h1: 'How to restore solderability on oxidized PCB pads',
    metaTitle: 'Restore Solderability on Oxidized PCB Pads with Tin Plating | Hunter Products',
    metaDescription:
      'Oxidized PCB pads and component leads that will not take solder can be re-tinned in place with a tin plating pen. Voltages, steps and parts list.',
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
            title: 'Rinse and wipe',
            text: 'Rinse with water and wipe with a soft cloth. The pad is ready to solder.',
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
    related: ['pcb-gold-finger-repair', 'brush-plating-substrate-guide', 'brush-plating-vs-tank-plating'],
    updated: '2026-09-30',
  },

  {
    slug: 'brush-plating-vs-tank-plating',
    label: 'Brush plating vs tank plating',
    h1: 'Brush plating vs tank plating: when each one wins',
    metaTitle: 'Brush Plating vs Tank Plating: Differences and When to Use Each | Hunter Products',
    metaDescription:
      'Brush (selective) plating vs tank plating compared: area plated, disassembly, thickness, waste and cost. When a plating pen beats a plating line, and when it does not.',
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
    metaTitle: 'Brush Plating Thickness, Plating Rate and Voltage Chart | Hunter Products',
    metaDescription:
      'How thick is brush plating? Plating rates for gold, silver, nickel, rhodium, palladium, copper, tin and zinc pens, maximum thickness, coverage and operating voltages.',
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
    related: ['brush-plating-substrate-guide', 'brush-plating-vs-tank-plating', 'plating-pen-kit-comparison'],
    updated: '2026-09-30',
  },

  {
    slug: 'brush-plating-substrate-guide',
    label: 'Substrate and underlayer guide',
    h1: 'What can you brush plate onto? Substrate and underlayer guide',
    metaTitle: 'Brush Plating Substrates: Steel, Stainless, Brass, Copper, Aluminum | Hunter Products',
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
    related: ['brush-plating-thickness-chart', 'gold-plating-connector-pins', 'brush-plating-vs-tank-plating'],
    updated: '2026-09-30',
  },

  {
    slug: 'plating-pen-kit-comparison',
    label: 'Plating pen kit comparison',
    h1: 'Plating pen kits compared: which one to buy',
    metaTitle: 'Plating Pen Kit Comparison: Contact Repair vs Deluxe vs Heavy Duty',
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
    related: ['gold-plating-connector-pins', 'pcb-gold-finger-repair', 'brush-plating-thickness-chart'],
    updated: '2026-10-02',
  },
  {
    slug: 'gold-plating-pen-guide',
    label: 'Using a gold plating pen',
    h1: 'How to use a gold plating pen: 24K, 18K and 14K',
    metaTitle: 'How to Use a Gold Plating Pen: Steps, Voltage, Thickness',
    metaDescription:
      'Gold plating pen how-to: which karat to use, which base metals need nickel first, 6 to 8V settings, plating times and thickness, from the maker of the pen.',
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
            text: 'On brass or steel, flash copper first with the Copper pen (PL-1010) at 6 to 8V. Then plate nickel with the Nickel pen (PL-1006) at 5 to 6V over any copper. Rinse between pens. Skip this step on gold, nickel or silver surfaces.',
          },
          {
            title: 'Plate gold at 6 to 8V',
            text: `Set the supply to 6 to 8V and switch to the gold pen. ${HOOKUP} Keep stroking until the finish is even. A standard pen lays down about 0.5 µm in 2 minutes and 0.8 µm in 3 minutes on a 1 in² area.`,
          },
          {
            title: 'Rinse and wipe',
            text: 'Rinse the part in water and wipe it with a soft cloth.',
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
    related: ['gold-plating-connector-pins', 'brush-plating-substrate-guide', 'brush-plating-cost'],
    updated: '2026-10-12',
  },

  {
    slug: 'zinc-plating-pen-touch-up',
    label: 'Zinc touch-up on steel',
    h1: 'Zinc plating pen: touch up galvanized steel and fasteners',
    metaTitle: 'Zinc Plating Pen Guide: Touch Up Galvanized Steel',
    metaDescription:
      'Repair scratched galvanizing and re-zinc bare steel fasteners with a zinc plating pen: prep, 6 to 8V settings, plating times and what one $65 pen covers.',
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
            title: 'Rinse and wipe',
            text: 'Rinse the part in water and wipe it dry with a soft cloth.',
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
    related: ['brush-plating-substrate-guide', 'brush-plating-thickness-chart', 'brush-plating-cost'],
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
    related: ['brush-plating-vs-tank-plating', 'plating-pen-kit-comparison', 'brush-plating-thickness-chart'],
    updated: '2026-10-12',
  },

  {
    slug: 'silver-plating-pen-guide',
    label: 'Silver plating contacts',
    h1: 'How to silver plate contacts and bus bars with a plating pen',
    metaTitle: 'Silver Plating Pen Guide: Contacts, Bus Bars, Steps',
    metaDescription:
      'Silver plating pen how-to for contacts, bus bars and switchgear: no underlayer on most metals, 5 to 6V settings, plating times and heavy-duty options.',
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
            title: 'Rinse and wipe',
            text: 'Rinse the part in water and wipe it with a soft cloth.',
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
    related: ['brush-plating-substrate-guide', 'brush-plating-thickness-chart', 'brush-plating-cost'],
    updated: '2026-10-12',
  },

];

export function guideBySlug(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export const guideUrl = (slug: string) => `/guides/${slug}/`;
