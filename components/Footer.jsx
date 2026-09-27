import { brand, visit, footerLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="visit" className="bg-ink px-6 py-16 text-cream md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <p className="font-display text-2xl">{brand.name}</p>
          <p className="mt-1 text-sm text-fog">{brand.sub}</p>
          <p className="mt-6 max-w-xs text-sm text-fog/80">{visit.address}</p>
          <p className="mt-1 text-sm text-fog/80">{visit.hours}</p>
        </div>

        <div>
          <p className="mb-4 text-xs text-fog/60">Quick links</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-fog transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs text-fog/60">Connect</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.connect.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-fog transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="text-fog">{visit.phone}</li>
          </ul>
        </div>

        <div className="col-span-2 flex items-center gap-3 sm:col-span-3 sm:justify-end md:col-span-1 md:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fog/40 font-display text-sm">
            {brand.name[0]}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-6xl border-t border-fog/10 pt-6 text-xs text-fog/40 md:mt-16">
        © {new Date().getFullYear()} {brand.name} {brand.sub}. All rights reserved.
      </p>
    </footer>
  );
}
