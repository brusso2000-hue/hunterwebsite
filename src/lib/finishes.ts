/**
 * Micro-Metallizer finish data for the plating compatibility chart.
 * Every entry is taken from the product descriptions in products.json /
 * the Micro-Metallizer catalog — keep them in sync. `null` = not specified.
 */
export interface Finish {
  metal: string;
  symbol: string;
  /** Standard pen id and (optional) heavy-duty pen id. */
  standard: string;
  heavy?: string;
  substrate: string | null;
  underlayer: string | null;
  use: string;
}

const COPPER_FLASH = 'Copper flash first on non-copper substrates';
const ANY_BUT_AL_CR = 'Any metal except aluminum or chromium';

export const FINISHES: Finish[] = [
  { metal: 'Gold 24K', symbol: 'Au', standard: 'PL-1003', heavy: 'PL-1016', substrate: 'Gold, nickel or silver', underlayer: 'Nickel', use: 'Connector pins, edge connectors, switch contacts' },
  { metal: 'Gold 18K', symbol: 'Au', standard: 'PL-1004', heavy: 'PL-1017', substrate: null, underlayer: null, use: 'Durable gold on high-contact industrial components' },
  { metal: 'Gold 14K', symbol: 'Au', standard: 'PL-1005', substrate: 'Gold, silver or nickel', underlayer: 'Nickel', use: 'Gold-alloy touch-up over gold, silver or nickel' },
  { metal: 'Rhodium', symbol: 'Rh', standard: 'PL-1011', substrate: 'Nickel', underlayer: 'Copper flash + nickel on non-copper substrates', use: 'Hard, wear-resistant, highly reflective surfaces' },
  { metal: 'Palladium', symbol: 'Pd', standard: 'PL-1015', substrate: null, underlayer: null, use: 'Tarnish-proof contacts; palladium-nickel connector plating' },
  { metal: 'Silver', symbol: 'Ag', standard: 'PL-1008', heavy: 'PL-1018', substrate: ANY_BUT_AL_CR, underlayer: null, use: 'Electrical contacts and high-conductivity surfaces' },
  { metal: 'Nickel', symbol: 'Ni', standard: 'PL-1006', heavy: 'PL-1020', substrate: 'Copper', underlayer: COPPER_FLASH, use: 'Diffusion barrier / underlayer for gold, rhodium, palladium' },
  { metal: 'Black Nickel', symbol: 'Ni', standard: 'PL-1007', substrate: 'Copper', underlayer: COPPER_FLASH, use: 'Non-reflective black finish on components and hardware' },
  { metal: 'Copper', symbol: 'Cu', standard: 'PL-1010', heavy: 'PL-1019', substrate: ANY_BUT_AL_CR, underlayer: null, use: 'Strike layer; buildup on busbars and contact rails' },
  { metal: 'Tin', symbol: 'Sn', standard: 'PL-1012', substrate: ANY_BUT_AL_CR, underlayer: null, use: 'Restores solderability on PCB pads and component leads' },
  { metal: 'Zinc', symbol: 'Zn', standard: 'PL-1013', substrate: ANY_BUT_AL_CR, underlayer: null, use: 'Sacrificial corrosion protection on steel and galvanized parts' },
  { metal: 'Chrome Color', symbol: '—', standard: 'PL-1009', substrate: 'Copper', underlayer: COPPER_FLASH, use: 'Chrome-color finish on trim, hardware and fittings' },
];

export const PREP = [
  { id: 'PL-1002', name: 'Absorbent / Degreaser', substrate: 'All metals except stainless steel' },
  { id: 'PL-1014', name: 'Stainless Steel Degreaser', substrate: 'Stainless steel only' },
];
