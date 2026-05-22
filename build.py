#!/usr/bin/env python3
"""
Hunter Products site build.

Reads products.json (the single source of truth) and:
  1. Generates one static HTML page per product at /products/<slug>/index.html
     — these are the SEO-targetable pages Google can rank.
  2. Updates sitemap.xml with every product page + the top-level pages.
  3. Regenerates the inline `products` / `allProducts` arrays AND the hidden
     Snipcart crawler-button blocks inside index.html, store.html, and
     store-pen.html, replacing only content between BUILD marker comments.

Run from repo root:
    python3 build.py

Markers used in the source HTML files (one-time addition):
    <!-- BUILD:DATA-INDEX -->  ...generated...  <!-- /BUILD:DATA-INDEX -->
    <!-- BUILD:DATA-STORE -->  ...              <!-- /BUILD:DATA-STORE -->
    <!-- BUILD:DATA-STORE-PEN --> ...           <!-- /BUILD:DATA-STORE-PEN -->
    <!-- BUILD:SNIPCART --> ...                 <!-- /BUILD:SNIPCART -->
The script is a no-op on any file that does not contain the matching markers.
"""
import html
import json
import os
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PRODUCTS_JSON = ROOT / "products.json"
SITEMAP = ROOT / "sitemap.xml"
SITE_ORIGIN = "https://www.hunterproducts.com"

CATEGORY_LABEL = {
    "kits": "Plating Kit",
    "pen": "Micro-Metallizer",
    "carbitron": "Carbitron System",
    "microjet": "Micro-Jet System",
    "accessories": "Accessory",
}

# Map products.json category -> the `cat` value used by index.html's renderer.
INDEX_CAT = {
    "kits": "kits", "pen": "pen", "carbitron": "carbitron",
    "microjet": "microjet", "accessories": "accessories",
}

# Map products.json category -> the `category` value used by store.html's renderer.
STORE_CAT = INDEX_CAT  # store.html uses the same set


def store_pen_category(p):
    """store-pen.html uses standard | heavy-duty | preparation."""
    if p["id"] in ("PL-1002", "PL-1014"):
        return "preparation"
    if "Heavy Duty" in p["name"]:
        return "heavy-duty"
    return "standard"


def load_products():
    with PRODUCTS_JSON.open() as f:
        products = json.load(f)
    required = ["id", "name", "price", "slug", "category", "sku",
                "h1", "metaTitle", "metaDescription",
                "specs", "longDescription", "applications",
                "description", "dimensions"]
    seen_slugs, seen_ids = set(), set()
    for p in products:
        for k in required:
            if k not in p:
                raise SystemExit(f"products.json: '{p.get('id','?')}' missing field '{k}'")
        if p["slug"] in seen_slugs:
            raise SystemExit(f"products.json: duplicate slug '{p['slug']}'")
        if p["id"] in seen_ids:
            raise SystemExit(f"products.json: duplicate id '{p['id']}'")
        seen_slugs.add(p["slug"])
        seen_ids.add(p["id"])
    return products


def fmt_price(price):
    p = float(price)
    if p == int(p):
        return f"{int(p)}.00"
    return f"{p:.2f}"


def schema_org_product(p):
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p["name"],
        "sku": p["sku"],
        "mpn": p["sku"],
        "description": p["description"],
        "brand": {"@type": "Brand", "name": "Hunter Products Inc."},
        "manufacturer": {"@type": "Organization", "name": "Hunter Products Inc."},
        "category": CATEGORY_LABEL.get(p["category"], p["category"]),
        "image": [SITE_ORIGIN + p["image"]] if p.get("image") else [],
        "url": f"{SITE_ORIGIN}/products/{p['slug']}/",
        "offers": {
            "@type": "Offer",
            "url": f"{SITE_ORIGIN}/products/{p['slug']}/",
            "priceCurrency": "USD",
            "price": fmt_price(p["price"]),
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {"@type": "Organization", "name": "Hunter Products Inc."},
        },
    }


def breadcrumb_schema(p):
    items = [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE_ORIGIN}/"},
        {"@type": "ListItem", "position": 2, "name": "Store", "item": f"{SITE_ORIGIN}/store/"},
        {"@type": "ListItem", "position": 3, "name": p["name"], "item": f"{SITE_ORIGIN}/products/{p['slug']}/"},
    ]
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}


def related_products(p, all_products, limit=4):
    same = [x for x in all_products if x["category"] == p["category"] and x["id"] != p["id"]]
    return same[:limit]


def category_landing_url(category):
    """The store filter that surfaces this category."""
    return {
        "pen": "/store-pen/",
        "kits": "/store/#products",
        "carbitron": "/#products",
        "microjet": "/#products",
        "accessories": "/store/#products",
    }.get(category, "/store/")


def render_product_page(p, all_products):
    nav = render_nav()
    foot = render_footer()
    img_block = (
        f'<img src="{html.escape(p["image"])}" alt="{html.escape(p["name"])}" loading="eager">'
        if p.get("image") else
        '<div class="placeholder"><svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>'
    )

    specs_rows = "\n".join(
        f"          <tr><th>{html.escape(k)}</th><td>{html.escape(v)}</td></tr>"
        for k, v in p["specs"]
    )

    paragraphs = "\n".join(
        f"        <p>{html.escape(para)}</p>"
        for para in p["longDescription"].split("\n\n")
    )

    apps = "\n".join(
        f'          <a href="/applications-electroplating/#{slugify(a)}">{html.escape(a)}</a>'
        for a in p["applications"]
    )

    related = related_products(p, all_products)
    if related:
        related_cards = "\n".join(
            f'''        <a class="related-card" href="/products/{r["slug"]}/">
          <div class="related-card-cat">{html.escape(CATEGORY_LABEL.get(r["category"], r["category"]))}</div>
          <div class="related-card-name">{html.escape(r["name"])}</div>
          <div class="related-card-price">${fmt_price(r["price"])}</div>
        </a>'''
            for r in related
        )
        related_section = f'''
      <section class="product-body-section" aria-label="Related products">
        <h2>Related <span class="accent">products</span></h2>
        <div class="related-grid">
{related_cards}
        </div>
      </section>'''
    else:
        related_section = ""

    snipcart_btn = (
        f'<button class="btn btn-primary snipcart-add-item"'
        f' data-item-id="{html.escape(p["id"])}"'
        f' data-item-name="{html.escape(p["name"])}"'
        f' data-item-price="{fmt_price(p["price"])}"'
        f' data-item-url="https://hunterproducts.com/products.json"'
        f' data-item-taxable="false"'
        f' data-item-description="{html.escape(p["description"][:90])}"'
        f' data-item-weight="{p["dimensions"]["weight"]}"'
        f' data-item-width="{p["dimensions"]["width"]}"'
        f' data-item-height="{p["dimensions"]["height"]}"'
        f' data-item-length="{p["dimensions"]["length"]}"'
        f'>Add to Cart</button>'
    )

    canonical = f"{SITE_ORIGIN}/products/{p['slug']}/"
    schema_blob = json.dumps(schema_org_product(p), indent=2)
    crumb_blob = json.dumps(breadcrumb_schema(p), indent=2)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18182868076"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'AW-18182868076');
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>{html.escape(p["metaTitle"])}</title>
<meta name="description" content="{html.escape(p["metaDescription"])}">
<meta name="robots" content="index, follow">
<meta name="author" content="Hunter Products Inc.">
<link rel="canonical" href="{canonical}">
<link rel="icon" type="image/png" sizes="192x192" href="/img/favicon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/img/logo-512.png">
<link rel="apple-touch-icon" href="/img/favicon-192.png">

<meta property="og:type" content="product">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{html.escape(p["metaTitle"])}">
<meta property="og:description" content="{html.escape(p["metaDescription"])}">
<meta property="og:image" content="{SITE_ORIGIN}{html.escape(p.get('image','/img/og-image.jpg'))}">
<meta property="og:site_name" content="Hunter Products Inc.">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(p["metaTitle"])}">
<meta name="twitter:description" content="{html.escape(p["metaDescription"])}">
<meta name="twitter:image" content="{SITE_ORIGIN}{html.escape(p.get('image','/img/og-image.jpg'))}">

<meta name="geo.region" content="US-NJ">
<meta name="geo.placename" content="Flemington, New Jersey">

<script type="application/ld+json">
{schema_blob}
</script>
<script type="application/ld+json">
{crumb_blob}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Oswald:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/product.css">
</head>
<body>

{nav}

<main class="page-wrap" role="main">
  <div class="container">

    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span class="sep">/</span>
      <a href="/store/">Store</a><span class="sep">/</span>
      <a href="{category_landing_url(p['category'])}">{html.escape(CATEGORY_LABEL.get(p['category'], p['category']))}</a><span class="sep">/</span>
      <span class="current">{html.escape(p["name"])}</span>
    </nav>

    <article class="product-hero" itemscope itemtype="https://schema.org/Product">
      <meta itemprop="sku" content="{html.escape(p['sku'])}">
      <meta itemprop="mpn" content="{html.escape(p['sku'])}">
      <meta itemprop="brand" content="Hunter Products Inc.">

      <div class="product-media" aria-hidden="{('false' if p.get('image') else 'true')}">
        {img_block}
      </div>

      <div>
        <div class="product-eyebrow">{html.escape(CATEGORY_LABEL.get(p['category'], p['category']))}</div>
        <h1 class="product-h1" itemprop="name">{html.escape(p['h1'])}</h1>
        <div class="product-sku">SKU: {html.escape(p['sku'])}</div>

        <div class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <span itemprop="price" content="{fmt_price(p['price'])}">${fmt_price(p['price'])}</span>
          <meta itemprop="priceCurrency" content="USD">
          <meta itemprop="availability" content="https://schema.org/InStock">
          <meta itemprop="url" content="{canonical}">
        </div>

        <div class="buy-row">
          {snipcart_btn}
          <a class="btn btn-outline" href="/#contact">Request a Quote</a>
        </div>

        <p class="short-desc" itemprop="description">{html.escape(p['description'])}</p>
      </div>
    </article>

    <hr class="section-divider">

    <section class="product-body-section" aria-label="Product overview">
      <h2>About this <span class="accent">product</span></h2>
{paragraphs}
    </section>

    <section class="product-body-section" aria-label="Specifications">
      <h2>Specifications</h2>
      <table class="specs-table">
        <tbody>
{specs_rows}
          <tr><th>Shipping Weight</th><td>{p['dimensions']['weight']} g</td></tr>
          <tr><th>Dimensions</th><td>{p['dimensions']['length']} × {p['dimensions']['width']} × {p['dimensions']['height']} cm (L × W × H)</td></tr>
        </tbody>
      </table>
    </section>

    <section class="product-body-section" aria-label="Industry applications">
      <h2>Industry <span class="accent">applications</span></h2>
      <p>This product is in active use across the following industries — click through to see how Hunter Products instruments are deployed in each:</p>
      <div class="app-list">
{apps}
      </div>
    </section>
{related_section}

    <section class="product-body-section" aria-label="Ordering">
      <h2>Order <span class="accent">direct</span> from Hunter Products</h2>
      <p>Hunter Products has manufactured precision electroplating instruments in Flemington, New Jersey since 1970. Every order ships direct from our facility — no resellers, no middlemen, no surprise markups.</p>
      <p>Bulk pricing and custom kit configurations are available on request. For international orders, technical questions, or to discuss a high-volume requirement, please <a href="/#contact">contact us directly</a> or call <a href="tel:+19085268440">(908) 526-8440</a>.</p>
      <div class="buy-row" style="margin-top:8px;">
        {snipcart_btn}
        <a class="btn btn-outline" href="/store/">Browse Full Catalog</a>
      </div>
    </section>

  </div>
</main>

{foot}

<!-- ── SNIPCART ───────────────────────────────────────── -->
<script>
  window.SnipcartSettings = {{
    publicApiKey: 'ZjIxNzU3ZjctNTRiMS00YWFiLWJhNDktMDc3NzNjYzQzY2RhNjM3OTQ2MTE5MTQ0MjI3OTM2',
    loadStrategy: 'on-user-interaction',
    modalStyle: 'side',
  }};
  (()=>{{var c,d;(d=(c=window.SnipcartSettings).version)!=null||(c.version="3.0");var s,S;(S=(s=window.SnipcartSettings).timeoutDuration)!=null||(s.timeoutDuration=2750);var l,p;(p=(l=window.SnipcartSettings).domain)!=null||(l.domain="cdn.snipcart.com");var w,u;(u=(w=window.SnipcartSettings).protocol)!=null||(w.protocol="https");var f=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{{numeric:!0,sensitivity:"base"}})===-1,m=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=o;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();function r(){{window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(m.forEach(t=>document.addEventListener(t,o)),setTimeout(o,window.SnipcartSettings.timeoutDuration)):o()}}var a=!1;function o(){{if(a)return;a=!0;let t=document.getElementsByTagName("head")[0],e=document.querySelector("#snipcart"),i=document.querySelector(`src[src^="${{window.SnipcartSettings.protocol}}://${{window.SnipcartSettings.domain}}"][src$="snipcart.js"]`),n=document.querySelector(`link[href^="${{window.SnipcartSettings.protocol}}://${{window.SnipcartSettings.domain}}"][href$="snipcart.css"]`);e||(e=document.createElement("div"),e.id="snipcart",e.setAttribute("hidden","true"),document.body.appendChild(e)),v(e),i||(i=document.createElement("script"),i.src=`${{window.SnipcartSettings.protocol}}://${{window.SnipcartSettings.domain}}/themes/v${{window.SnipcartSettings.version}}/default/snipcart.js`,i.async=!0,t.appendChild(i)),n||(n=document.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=`${{window.SnipcartSettings.protocol}}://${{window.SnipcartSettings.domain}}/themes/v${{window.SnipcartSettings.version}}/default/snipcart.css`,t.prepend(n)),m.forEach(g=>document.removeEventListener(g,o))}}function v(t){{!f||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}}}})();
</script>

<script>
  window.addEventListener('scroll',()=>{{
    document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);
  }},{{passive:true}});
</script>

</body>
</html>
"""


def render_nav():
    return """<nav id="navbar" aria-label="Main navigation">
  <div class="nav-top-bar">Direct from the Manufacturer <span>·</span> Since 1970 <span>·</span> Flemington, NJ</div>
  <div class="nav-main">
    <div class="container">
      <div class="nav-inner">
        <a href="/" class="nav-logo" aria-label="Hunter Products — Home">
          <div class="logo-emblem"></div>
          <div>
            <span class="logo-name">Hunter Products</span>
            <span class="logo-tagline">Precision Electroplating</span>
          </div>
        </a>
        <ul class="nav-links" role="list">
          <li><a href="/store/">Store</a></li>
          <li><a href="/store-pen/">Plating Pens</a></li>
          <li><a href="/applications-electroplating/">Applications</a></li>
          <li><a href="/resources/">Resources</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <div class="nav-actions">
          <button class="cart-btn snipcart-checkout" aria-label="Open cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span>Cart</span>
            <span class="cart-count snipcart-items-count">0</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>"""


def render_footer():
    yr = date.today().year
    return f"""<footer role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h4>Hunter Products Inc.</h4>
        <p>Industrial electroplating instruments engineered for precision and durability. Trusted by aerospace, medical, electronics, and manufacturing professionals since 1970.</p>
        <p style="margin-top:10px;"><a href="mailto:hunter@hunterproducts.com">hunter@hunterproducts.com</a></p>
      </div>
      <div class="footer-col">
        <h5>Products</h5>
        <ul>
          <li><a href="/store-pen/">Plating Pens</a></li>
          <li><a href="/store/">Full Store</a></li>
          <li><a href="/products/carbitron-300-system/">Carbitron 300</a></li>
          <li><a href="/products/micro-jet-200-system/">Micro-Jet 200</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Applications</h5>
        <ul>
          <li><a href="/applications-electroplating/#aerospace-defense">Aerospace &amp; Defense</a></li>
          <li><a href="/applications-electroplating/#medical-dental">Medical &amp; Dental</a></li>
          <li><a href="/applications-electroplating/#jewelry-restoration">Jewelry &amp; Restoration</a></li>
          <li><a href="/applications-electroplating/#electronics-pcb">Electronics &amp; PCB</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="/#about">Our History</a></li>
          <li><a href="/resources/">Resources &amp; Catalogs</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {yr} Hunter Products Inc. · 36 Madison Avenue, Flemington, NJ 08822</p>
      <p>Inventors of the Diamond Dusting Technique · Est. 1970</p>
    </div>
  </div>
</footer>"""


def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


# ── Inline data block generators (one item per line, JSON-shape) ──────

def index_inline_array(products):
    lines = []
    for p in products:
        rec = {
            "id": p["id"],
            "name": p["name"],
            "cat": INDEX_CAT[p["category"]],
            "price": p["price"],
            "sku": p["sku"],
            "weight": p["dimensions"]["weight"],
            "width": p["dimensions"]["width"],
            "height": p["dimensions"]["height"],
            "length": p["dimensions"]["length"],
            "desc": p["description"],
            "specs": p["specs"],
            "slug": p["slug"],
        }
        if p.get("image"):
            rec["img"] = p["image"]
        lines.append("  " + json.dumps(rec, ensure_ascii=False))
    return "const products = [\n" + ",\n".join(lines) + "\n];"


def store_inline_array(products):
    lines = []
    for p in products:
        rec = {
            "id": p["id"],
            "name": p["name"],
            "price": p["price"],
            "description": p["description"],
            "dimensions": p["dimensions"],
            "category": STORE_CAT[p["category"]],
            "image": p.get("image"),
            "slug": p["slug"],
        }
        lines.append("  " + json.dumps(rec, ensure_ascii=False))
    return "const allProducts = [\n" + ",\n".join(lines) + "\n];"


def store_pen_inline_array(products):
    pens = [p for p in products if p["category"] == "pen" or p["id"] == "PL-1014"]
    lines = []
    for p in pens:
        rec = {
            "id": p["id"],
            "name": p["name"],
            "price": p["price"],
            "description": p["description"],
            "dimensions": p["dimensions"],
            "category": store_pen_category(p),
            "slug": p["slug"],
        }
        lines.append("  " + json.dumps(rec, ensure_ascii=False))
    return "const allProducts = [\n" + ",\n".join(lines) + "\n];"


def snipcart_buttons_block(products):
    """The hidden block at the bottom of each catalog page so Snipcart's
    crawler can validate every product's name/price by reading the page."""
    rows = []
    for p in products:
        d = p["dimensions"]
        rows.append(
            f'  <button class="snipcart-add-item"'
            f' data-item-id="{html.escape(p["id"])}"'
            f' data-item-name="{html.escape(p["name"])}"'
            f' data-item-price="{fmt_price(p["price"])}"'
            f' data-item-url="https://hunterproducts.com/products.json"'
            f' data-item-taxable="false"'
            f' data-item-weight="{d["weight"]}"'
            f' data-item-width="{d["width"]}"'
            f' data-item-height="{d["height"]}"'
            f' data-item-length="{d["length"]}"'
            f'></button>'
        )
    return '<div style="display:none" aria-hidden="true">\n' + "\n".join(rows) + "\n</div>"


# ── Marker replacement ────────────────────────────────────────────────

def replace_between_markers(text, start_marker, end_marker, new_inner):
    pat = re.compile(
        r"(" + re.escape(start_marker) + r")(.*?)(" + re.escape(end_marker) + r")",
        re.DOTALL,
    )
    if not pat.search(text):
        return text, False
    new_text = pat.sub(lambda m: m.group(1) + "\n" + new_inner + "\n" + m.group(3), text)
    return new_text, True


def update_html_file(path, replacements):
    """replacements = list of (start_marker, end_marker, new_inner)"""
    if not path.exists():
        return
    text = path.read_text()
    orig = text
    applied = []
    for start, end, inner in replacements:
        text, ok = replace_between_markers(text, start, end, inner)
        applied.append((start, ok))
    if text != orig:
        path.write_text(text)
        print(f"  updated {path.name}: " + ", ".join(f"{s}={'ok' if k else 'no-marker'}" for s, k in applied))
    else:
        print(f"  {path.name}: no markers found (skipped)")


# ── Sitemap ───────────────────────────────────────────────────────────

def update_sitemap(products):
    today = date.today().isoformat()
    static_urls = [
        ("/", "1.0", "monthly"),
        ("/store/", "0.9", "monthly"),
        ("/store-pen/", "0.9", "monthly"),
        ("/applications-electroplating/", "0.8", "monthly"),
        ("/resources/", "0.6", "monthly"),
    ]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, prio, freq in static_urls:
        lines.extend([
            "  <url>",
            f"    <loc>{SITE_ORIGIN}{path}</loc>",
            f"    <lastmod>{today}</lastmod>",
            f"    <changefreq>{freq}</changefreq>",
            f"    <priority>{prio}</priority>",
            "  </url>",
        ])
    for p in products:
        lines.extend([
            "  <url>",
            f"    <loc>{SITE_ORIGIN}/products/{p['slug']}/</loc>",
            f"    <lastmod>{today}</lastmod>",
            "    <changefreq>monthly</changefreq>",
            "    <priority>0.7</priority>",
            "  </url>",
        ])
    lines.append("</urlset>")
    SITEMAP.write_text("\n".join(lines) + "\n")
    print(f"  wrote sitemap.xml ({len(products)} products + {len(static_urls)} static urls)")


# ── Main ──────────────────────────────────────────────────────────────

def main():
    products = load_products()
    print(f"Loaded {len(products)} products from products.json")

    # 1. Per-product pages.
    out_root = ROOT / "products"
    out_root.mkdir(exist_ok=True)
    for p in products:
        out_dir = out_root / p["slug"]
        out_dir.mkdir(exist_ok=True)
        (out_dir / "index.html").write_text(render_product_page(p, products))
    print(f"  wrote {len(products)} product pages under products/<slug>/index.html")

    # 2. Update inline arrays and Snipcart blocks (marker-guarded).
    snipcart = snipcart_buttons_block(products)
    update_html_file(
        ROOT / "index.html",
        [
            ("<!-- BUILD:DATA-INDEX -->", "<!-- /BUILD:DATA-INDEX -->", index_inline_array(products)),
            ("<!-- BUILD:SNIPCART -->", "<!-- /BUILD:SNIPCART -->", snipcart),
        ],
    )
    update_html_file(
        ROOT / "store.html",
        [
            ("<!-- BUILD:DATA-STORE -->", "<!-- /BUILD:DATA-STORE -->", store_inline_array(products)),
            ("<!-- BUILD:SNIPCART -->", "<!-- /BUILD:SNIPCART -->", snipcart),
        ],
    )
    update_html_file(
        ROOT / "store-pen.html",
        [
            ("<!-- BUILD:DATA-STORE-PEN -->", "<!-- /BUILD:DATA-STORE-PEN -->", store_pen_inline_array(products)),
            ("<!-- BUILD:SNIPCART -->", "<!-- /BUILD:SNIPCART -->", snipcart),
        ],
    )

    # 3. Sitemap.
    update_sitemap(products)

    print("Build complete.")


if __name__ == "__main__":
    main()
