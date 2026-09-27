Café claim-offer popup end to end: the multi-step modal (offer → form → success/error), form validation, the mock-then-real API integration, and finally the POST /api/claim route handler itself. Also used it for the base cafe site (Next.js + Tailwind + GSAP + Framer Motion) this popup sits inside.

One useful thing AI helped with

Wiring the full request lifecycle cleanly — loading state, success state with a copyable claim code, and an error state that's actually reachable (it fails deliberately ~1 in 8 times in the first mock pass) instead of a code path I'd never see. Also handled the responsive breakpoints (bottom-sheet on mobile, centered card on desktop) in one pass, which I would have iterated on longer myself.

One thing AI got wrong or that I changed

First pass had the popup gated behind localStorage so it only showed once per browser. I wanted it to show on every reload for testing/demo purposes, so I had it removed. Earlier in the project it also shipped a hero section and footer that weren't properly responsive on mobile/tablet — I caught this after testing on a real phone-sized viewport and had it fixed with proper breakpoints.

What I personally reviewed
Tested the popup flow on mobile and desktop widths myself
Checked phone validation actually rejects invalid numbers (letters, wrong length, numbers not starting 6–9)
Reviewed the /api/claim route's validation and response shapes against the given contract
Confirmed lib/shopData.js is the single source of truth so the shop name/address/offer amount aren't duplicated anywhere