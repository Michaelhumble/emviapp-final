import React from "react";
import { PRESS_OUTLETS } from "@/data/pressLogos";
import PressLogo from "@/components/PressLogo";

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
            <PressLogo 
              publisherName={i.name}
              href={i.href}
              isClickable={true}
            />
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