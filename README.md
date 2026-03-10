# Shopify Editions — Winter '26 Website Archive

> **Saved from:** [https://www.shopify.com/editions/winter2026](https://www.shopify.com/editions/winter2026)
> **Theme:** *"The Renaissance Edition"* — 150+ Shopify product updates

This folder is a **locally downloaded copy** of Shopify's **Winter 2026 Editions** marketing website — an immersive, scroll-driven single-page experience showcasing Shopify's latest product releases across AI, retail, B2B, checkout, and more.

---

## 📂 What's Inside

```
www.shopify.com/
├── www.shopify.com/editions/winter2026.html   ← Main page (open this to view the site)
├── cdn.shopify.com/oxygen-v2/.../assets/      ← JavaScript & CSS bundles
├── cdn.shopify.com/s/files/                   ← Images and SVG icons
├── cdn.shopify.com/b/                          ← Custom font files (WOFF2)
├── _DataURI/                                   ← Inline data URI references
├── unpkg.com/detect-gpu@5.0.34/               ← GPU tier detection library
└── www.googletagmanager.com/                  ← Analytics script (Google Tag Manager)
```

---

## ▶️ How to View / Execute

### Option 1 — Open Directly in Browser (Simplest, Recommended)

1. Navigate to `www.shopify.com\editions\`
2. Double-click **`winter2026.html`**
3. It will open in your default browser

> **Note:** With internet access, images, videos, animations, and fonts load from Shopify's live CDN. Without internet, only the core HTML structure will display (no images/videos).

---

### Option 2 — Use a Local HTTP Server (Better for Offline/Dev)

Using Python (built into most systems):

```bash
# Navigate to the root archive folder
cd "c:\Users\rutur\Downloads\www.shopify.com"

# Python 3
python -m http.server 8080

# Then open in browser:
# http://localhost:8080/www.shopify.com/editions/winter2026.html
```

Using Node.js (`npx serve`):

```bash
cd "c:\Users\rutur\Downloads\www.shopify.com"
npx serve .
# Open: http://localhost:3000/www.shopify.com/editions/winter2026.html
```

Using VS Code **Live Server** extension:
1. Open the folder in VS Code
2. Right-click `winter2026.html` → **"Open with Live Server"**

---

### Option 3 — Browse the Live Original

Visit the real page online:

👉 **[https://www.shopify.com/editions/winter2026](https://www.shopify.com/editions/winter2026)**

This gives you the full interactive experience including Rive animations, video playback, and search.

---

## ⚠️ Known Limitations (Local Archive)

| Feature | Status |
|---|---|
| Core HTML layout | ✅ Works locally |
| CSS styling (Tailwind) | ✅ Works (loads from CDN with internet) |
| Images & Videos | ⚠️ Requires internet (CDN-hosted) |
| Rive animations | ⚠️ Requires internet + compatible browser |
| Search functionality | ❌ Requires Shopify backend API |
| Cookie consent popup | ❌ Requires Shopify DUX session |
| Smooth scroll (Lenis) | ⚠️ Depends on JS loading correctly |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Remix (React)** | Server-side rendered framework |
| **Shopify Oxygen v2** | Shopify's edge hosting platform |
| **TailwindCSS** | Utility-first CSS framework |
| **Rive** | Interactive animations |
| **PP Neue Montreal** | Custom brand typeface |
| **detect-gpu** | GPU tier detection for performance |
| **Lenis** | Smooth scroll library |
| **Google Tag Manager** | Analytics & tracking |

---

## 📑 Page Sections

The page covers 12 product categories navigable from the left sidebar:

1. **Sidekick** — AI-powered commerce assistant
2. **Agentic** — Autonomous AI workflows
3. **Online** — Storefront & theme updates
4. **Retail** — POS & in-store features
5. **Marketing** — Campaigns & ads
6. **Checkout** — Payment & conversion improvements
7. **Operations** — Admin & workflow tools
8. **Shop App** — Mobile shopping app
9. **B2B** — Wholesale & enterprise features
10. **Finance** — Shopify Balance, lending, payouts
11. **Shipping** — Fulfillment & logistics
12. **Developer** — APIs, CLI, Storefront updates

---

## 📜 Legal

This is a personal offline copy of publicly accessible content. All content, trademarks, and assets belong to **Shopify Inc.**

- [Terms of Service](https://www.shopify.com/legal/terms)
- [Privacy Policy](https://www.shopify.com/legal/privacy)
- © Shopify Inc.
