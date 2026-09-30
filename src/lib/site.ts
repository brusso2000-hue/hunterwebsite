export const SITE = {
  name: 'Hunter Products Inc.',
  shortName: 'Hunter Products',
  origin: 'https://hunterproducts.com',
  founded: 1970,
  phone: '(908) 526-8440',
  phoneHref: 'tel:+19085268440',
  email: 'hunter@hunterproducts.com',
  street: '36 Madison Avenue',
  city: 'Flemington',
  region: 'NJ',
  postal: '08822',
  hours: 'Mon–Fri · 9:00–5:00 ET',
  defaultDescription:
    'Brush plating and selective plating systems, tungsten-carbide coating and micro-abrasive blasting. Micro-Metallizer, Carbitron 300, Micro-Jet 200 — built in New Jersey since 1970.',
};

/** Shipping and returns, as stated by Hunter Products (Sep 2026). */
export const POLICY = {
  handlingDaysMax: 2, // orders ship within 2 business days
  returnDays: 14,
};

export const RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'US',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: POLICY.returnDays,
  returnMethod: 'https://schema.org/ReturnByMail',
};

export const SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: POLICY.handlingDaysMax, unitCode: 'DAY' },
  },
};

export const GOOGLE_ADS_ID = 'AW-18182868076';
// Replace with the label from Google Ads → Conversions → Purchase → Tag setup.
export const GOOGLE_ADS_PURCHASE_LABEL = 'CONVERSION_LABEL_PLACEHOLDER';

export const SNIPCART_PUBLIC_KEY =
  'ZjIxNzU3ZjctNTRiMS00YWFiLWJhNDktMDc3NzNjYzQzY2RhNjM3OTQ2MTE5MTQ0MjI3OTM2';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdppgll';
