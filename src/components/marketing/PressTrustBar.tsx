import React from "react";
import { PRESS_LOGOS } from "@/data/pressLogos";
import { PressLogoTile } from "./PressLogo";

export default function PressTrustBar() {
  return (
    <section className="relative py-12 md:py-16 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          {/* TEMP label – remove after QA */}
          <div className="sr-only" data-qaid="pressbar-mounted">Press bar mounted</div>
          
          <h2 className="text-sm font-medium uppercase tracking-widest text-black/60 mb-8">
            As seen in
          </h2>

          <div className="mt-6 grid grid-cols-5 justify-items-center gap-4 sm:grid-cols-6 md:grid-cols-8">
            {PRESS_LOGOS.map((logo) => (
              <PressLogoTile key={logo.name} {...logo} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-black/50">
            <a 
              href="/press" 
              className="underline underline-offset-4 hover:text-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
            >
              Read full press coverage
            </a>
            <span aria-hidden className="hidden sm:inline">•</span>
            <span className="text-center">All trademarks are property of their respective owners.</span>
          </div>

          <p className="sr-only">
            Logos shown indicate editorial coverage and media mentions; they do not imply partnership or endorsement by these organizations.
          </p>
        </div>
      </div>
    </section>
  );
}