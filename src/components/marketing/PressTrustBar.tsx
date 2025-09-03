import React from "react";
import { PRESS_OUTLETS } from "@/data/pressLogos";

export default function PressTrustBar() {
  const items = PRESS_OUTLETS.filter(x => x.live).slice(0, 12);

  return (
    <section
      aria-labelledby="press-title"
      data-qaid="pressbar-mounted"
      className="mx-auto mt-10 w-full max-w-6xl px-4"
    >
      <h2 id="press-title" className="text-center text-sm tracking-[0.3em] text-slate-500">
        AS SEEN ON
      </h2>

      <ul className="mt-6 grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 justify-items-center">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={i.href}
              target="_blank" 
              rel="noopener nofollow"
              className="group block"
              aria-label={`${i.name} coverage`}
            >
              <div className="flex h-16 w-16 md:h-18 md:w-18 items-center justify-center rounded-2xl bg-white shadow-sm border border-black/5 transition-transform motion-safe:hover:-translate-y-0.5">
                <img
                  src={i.src}
                  alt={i.name}
                  className="max-h-[22px] w-auto opacity-80 group-hover:opacity-100"
                  loading="lazy" 
                  decoding="async"
                  width={64}
                  height={64}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <a href="/press" className="text-violet-600 hover:text-violet-700 inline-flex items-center gap-1">
          Read full press coverage <span aria-hidden>→</span>
        </a>
        <p className="mt-2 text-xs text-slate-500">
          All trademarks are property of their respective owners.
        </p>
      </div>
    </section>
  );
}