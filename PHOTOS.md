# Adding photos

Every image on the site is a named **slot**. To fill a slot, save a photo into the
right folder using the slot name as the file name, then rebuild or redeploy.
No code changes needed.

- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- Use landscape shots for site photos and square shots for products.
- Keep files under about 500 KB. Export at the size below, JPEG quality around 80.
- Until a slot has a photo, it shows a technical line drawing.
- In `npm run dev`, empty slots show a small dashed label with the
  file path to use. That label never appears on the live site.

## Site photos: `public/img/photos/`

| File | What to shoot | Min size |
| --- | --- | --- |
| `public/img/photos/home-hero.jpg` | Close-up of a pen plating a real part — hands, pen tip and the fresh deposit in focus. Landscape. | 2000×1250 |
| `public/img/photos/system-micro-metallizer.jpg` | The full kit on a clean bench: power supply, leads, a row of pens. | 1600×1000 |
| `public/img/photos/system-carbitron.jpg` | Carbitron 300 unit with handpiece and an instrument being treated. | 1600×1000 |
| `public/img/photos/system-micro-jet.jpg` | Micro-Jet 200 unit, nozzle aimed at a small part. | 1600×1000 |
| `public/img/photos/process-clean.jpg` | Absorbent/degreaser pen being wiped across the work area. | 1200×900 |
| `public/img/photos/process-plate.jpg` | Pen actively plating — visible wet deposit. | 1200×900 |
| `public/img/photos/process-finish.jpg` | The finished part: crisp edge between plated and unplated areas. | 1200×900 |
| `public/img/photos/app-aerospace-defense.jpg` | Multi-pin aerospace connector being plated. | 1200×800 |
| `public/img/photos/app-medical-dental.jpg` | Scissors or scalpel edge under the Carbitron handpiece. | 1200×800 |
| `public/img/photos/app-jewelry-restoration.jpg` | Ring or clasp being plated with the pen. | 1200×800 |
| `public/img/photos/app-electronics-pcb.jpg` | PCB edge connector or pads being plated. | 1200×800 |
| `public/img/photos/app-manufacturing.jpg` | Production part / fastener being touched up. | 1200×800 |
| `public/img/photos/app-industrial-mro.jpg` | Portable kit in use on equipment in the field. | 1200×800 |

## Product photos: `public/img/products/`

File name = the product's URL slug. A photo here replaces the small 275px catalog
photo currently used for that product. Suggested: product on a plain white or light
gray background, 1200×1200 or larger.

| File | Product |
| --- | --- |
| `public/img/products/deluxe-plating-kit.jpg` | Deluxe Kit (PL-1000K) |
| `public/img/products/deluxe-plating-kit-heavy-duty.jpg` | Deluxe Kit (Heavy Duty) (PL-1000HD) |
| `public/img/products/contact-repair-kit.jpg` | Contact Repair Kit (PL-1000C) |
| `public/img/products/contact-repair-kit-heavy-duty.jpg` | Contact Repair Kit (Heavy Duty) (PL-1000CHD) |
| `public/img/products/absorbent-degreaser-plating-pen.jpg` | Absorbent / Degreaser Pen (PL-1002) |
| `public/img/products/gold-24k-plating-pen.jpg` | Gold 24K Plating Pen (PL-1003) |
| `public/img/products/gold-18k-plating-pen.jpg` | Gold 18K Plating Pen (PL-1004) |
| `public/img/products/gold-14k-plating-pen.jpg` | Gold 14K Plating Pen (PL-1005) |
| `public/img/products/nickel-plating-pen.jpg` | Nickel Plating Pen (PL-1006) |
| `public/img/products/black-nickel-plating-pen.jpg` | Black Nickel Plating Pen (PL-1007) |
| `public/img/products/silver-plating-pen.jpg` | Silver Plating Pen (PL-1008) |
| `public/img/products/chrome-color-plating-pen.jpg` | Chrome Color Plating Pen (PL-1009) |
| `public/img/products/copper-plating-pen.jpg` | Copper Plating Pen (PL-1010) |
| `public/img/products/rhodium-plating-pen.jpg` | Rhodium Plating Pen (PL-1011) |
| `public/img/products/tin-plating-pen.jpg` | Tin Plating Pen (PL-1012) |
| `public/img/products/zinc-plating-pen.jpg` | Zinc Plating Pen (PL-1013) |
| `public/img/products/palladium-plating-pen.jpg` | Palladium Plating Pen (PL-1015) |
| `public/img/products/gold-24k-heavy-duty-plating-pen.jpg` | Gold 24K Heavy Duty Pen (PL-1016) |
| `public/img/products/gold-18k-heavy-duty-plating-pen.jpg` | Gold 18K Heavy Duty Pen (PL-1017) |
| `public/img/products/silver-heavy-duty-plating-pen.jpg` | Silver Heavy Duty Pen (PL-1018) |
| `public/img/products/copper-heavy-duty-plating-pen.jpg` | Copper Heavy Duty Pen (PL-1019) |
| `public/img/products/nickel-heavy-duty-plating-pen.jpg` | Nickel Heavy Duty Pen (PL-1020) |
| `public/img/products/stainless-steel-degreaser-pen.jpg` | Stainless Steel Degreaser Pen (PL-1014) |
| `public/img/products/micro-metallizer-connector-cables.jpg` | Connector Cables (PL-1001) |
| `public/img/products/tungsten-carbide-electrode-1-8.jpg` | Tungsten-Carbide Electrode 1/8" (TS3038) |
| `public/img/products/tungsten-carbide-electrode-1-16.jpg` | Tungsten-Carbide Electrode 1/16" (TS3039) |
| `public/img/products/tungsten-carbide-electrode-1-32.jpg` | Tungsten-Carbide Electrode 1/32" (TS3040) |
| `public/img/products/micro-metallizer-power-supply.jpg` | Power Supply (PL-1000) |
| `public/img/products/carbitron-300-system.jpg` | Carbitron 300 System (TS3037) |
| `public/img/products/micro-jet-200-system.jpg` | Micro-Jet 200 System (AB2000) |

## Logo

`public/img/brand/hunter-logo.png` (color) and `hunter-logo-white.png` (footer).
If you get a vector (`.svg`) version from your designer, put it in the same folder
and update the two paths in `src/components/Logo.astro`.
