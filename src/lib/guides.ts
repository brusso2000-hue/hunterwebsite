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
    related: ['brush-plating-thickness-chart', 'brush-plating-substrate-guide', 'gold-plating-connector-pins'],
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
    related: ['brush-plating-substrate-guide', 'brush-plating-vs-tank-plating', 'gold-plating-connector-pins'],
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
];

export function guideBySlug(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export const guideUrl = (slug: string) => `/guides/${slug}/`;
