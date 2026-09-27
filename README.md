# Morrow Café — Cafe Website

Next.js (App Router) + Tailwind CSS + GSAP (ScrollTrigger) + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where to edit


- **`components/Hero.jsx`** — the load-in animation (GSAP timeline: image reveal → heading lines → CTA).
- **`components/Signature.jsx`** — the menu grid, staggers in on scroll (GSAP ScrollTrigger).
- **`components/Story.jsx`** — split image/text section with a subtle parallax on the image.
- **`components/Space.jsx`** — full-bleed "about the space" section.
- **`components/Footer.jsx`** — visit info + links.


## Notes

- Everything respects `prefers-reduced-motion`.
- Nav turns solid cream once you scroll past the hero.
- Mobile menu is a full-screen overlay (Framer Motion `AnimatePresence`).

## Claim offer popup (Morrow Café)

`components/ClaimOfferModal.jsx` shows the popup on every page load (~1s in): offer screen → name/phone form → success (claim code + copy) or error state. It's not persisted anywhere, so a refresh always brings it back. If you'd rather it only show once per visitor, that's a one-line change — gate `visible` with a `localStorage` flag set in `dismissForGood()`.

All shop details — name, address, phone, WhatsApp, hours, the popup's image/logo, the offer copy and amount, and a starter coffee menu — live in **`lib/shopData.js`**. Change the café name, address, offer amount, or image there and it updates everywhere it's used (headline, skip-confirm, form, success screen, claim code prefix). Nothing shop-specific is hardcoded in the component itself.

**No real backend is called.** `lib/mockApi.js` simulates `POST /api/claim` entirely on the client — a short artificial delay, then it resolves with the exact success/error JSON shape from the spec. It also fails about 1 in 8 times on purpose, so the error UI is a real, exercised path rather than dead code, not because anything is actually unreliable. This was the simplest way to demonstrate the full request → loading → success/error → UI loop without standing up an endpoint that has nothing to talk to. Swap `claimOffer()` in `lib/mockApi.js` for a real `fetch("/api/claim")` whenever a backend exists — the calling code in `ClaimOfferModal.jsx` doesn't need to change.

Phone validation accepts Indian mobile numbers only (`^[6-9]\d{9}$`); name requires at least 2 letters. Both are enforced client-side before the mock call ever fires.

