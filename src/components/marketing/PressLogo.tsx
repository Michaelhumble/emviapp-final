import React from "react";
import type { PressLogo } from "@/data/pressLogos";

interface PressLogoTileProps extends PressLogo {}

export function PressLogoTile({ name, href, logoSrc, alt, verified }: PressLogoTileProps) {
  // TEMP: verification style – remove after QA
  const tileClass = "flex h-18 w-18 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 border border-black/10";
  
  const Tile = (
    <div
      className={`group relative ${tileClass} transition-transform motion-safe:hover:-translate-y-0.5`}
      aria-label={name}
    >
      <img
        src={logoSrc}
        alt={alt}
        width={100}
        height={24}
        loading="lazy"
        decoding="async"
        className="max-h-[22px] w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-200"
        style={{ height: 'auto' }}
      />
      {verified && (
        <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full
                         bg-emerald-500 text-white text-[10px] font-medium ring-2 ring-white shadow-sm"
              aria-label="Verified coverage">✓</span>
      )}
    </div>
  );
  
  return href ? (
    <a 
      href={href} 
      target="_blank" 
      rel="nofollow noopener" 
      className="block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-2xl" 
      aria-label={`Read ${name} article about EmviApp`}
    >
      {Tile}
    </a>
  ) : Tile;
}