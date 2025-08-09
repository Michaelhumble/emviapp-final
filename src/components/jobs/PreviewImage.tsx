import React from "react";

type Kind = "nail-salon" | "job-card" | "salon-sale" | "artist-kit" | "expired";

function gradientFor(seed: string) {
  const colors = [
    ["#d8b4fe","#c4b5fd"], ["#a7f3d0","#6ee7b7"], ["#93c5fd","#bfdbfe"],
    ["#fecaca","#fde68a"], ["#fbcfe8","#e9d5ff"], ["#c7d2fe","#fecdd3"]
  ];
  let h = 0; for (let i=0;i<seed.length;i++) h = (h*31 + seed.charCodeAt(i)) >>> 0;
  return colors[h % colors.length];
}

export default function PreviewImage({
  seed, kind, label, className, rounded = 16,
}: { seed: string; kind: Kind; label?: string; className?: string; rounded?: number; }) {
  const [c1,c2] = gradientFor(seed + kind);
  const title = label || (
    kind === "nail-salon" ? "Salon interior" :
    kind === "salon-sale" ? "Salon for sale" :
    kind === "artist-kit" ? "Artist tools" :
    kind === "expired" ? "Previously listed" : "Beauty industry role"
  );
  return (
    <svg
      viewBox="0 0 1600 1000" role="img" aria-label={title}
      className={className} style={{borderRadius: rounded}}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1}/>
          <stop offset="100%" stopColor={c2}/>
        </linearGradient>
        <filter id={`grain-${seed}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer>
          <feBlend mode="soft-light"/>
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#g-${seed})`} />
      <g opacity="0.15" filter={`url(#grain-${seed})`}>
        <rect x="80" y="640" width="1440" height="220" rx="24" fill="#000"/>
        <rect x="120" y="540" width="540" height="40" rx="12" fill="#000"/>
        <rect x="700" y="300" width="780" height="300" rx="32" fill="#000"/>
        <rect x="120" y="300" width="540" height="200" rx="24" fill="#000"/>
      </g>
      <g>
        <rect x="1120" y="860" width="420" height="80" rx="18" fill="#00000033"/>
        <text x="1138" y="914" fontFamily="ui-sans-serif,system-ui" fontSize="36" fill="#fff">
          emvi.app • generated
        </text>
      </g>
      <text x="80" y="120" fontFamily="ui-sans-serif,system-ui" fontSize="64" fill="#1f2937" opacity="0.5">
        {title}
      </text>
    </svg>
  );
}
