interface PressOutlet {
  slug: string;
  name: string;
  market: string;
  url: string;
  featured?: boolean;
}

export const pressOutlets: PressOutlet[] = [
  { 
    slug: "kron4", 
    name: "KRON4 (San Francisco)", 
    market: "Local TV", 
    url: "https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "fox40", 
    name: "FOX40 (Sacramento)", 
    market: "Local TV", 
    url: "https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "fox59", 
    name: "FOX59 (Indianapolis)", 
    market: "Local TV", 
    url: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "wgn9", 
    name: "WGN9 (Chicago)", 
    market: "Local TV", 
    url: "https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "kxan", 
    name: "KXAN NBC 36 (Austin)", 
    market: "Local TV", 
    url: "https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "wfla", 
    name: "WFLA NBC 8 (Tampa)", 
    market: "Local TV", 
    url: "https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "cbs13", 
    name: "CBS 13 (Albuquerque)", 
    market: "Local TV", 
    url: "https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "kget17", 
    name: "KGET 17 (Bakersfield)", 
    market: "Local TV", 
    url: "https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  { 
    slug: "krqe", 
    name: "KRQE CBS 13", 
    market: "Local TV", 
    url: "https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true
  },
  // Additional outlets for the full press page
  { 
    slug: "wood-tv", 
    name: "WOOD TV NBC 8 (Grand Rapids)", 
    market: "Local TV", 
    url: "https://www.woodtv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
  },
  { 
    slug: "ein-presswire", 
    name: "EIN Presswire", 
    market: "Business", 
    url: "https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
  }
];

export const getFeaturedOutlets = () => pressOutlets.filter(outlet => outlet.featured);
export const getAllOutlets = () => pressOutlets;
export const getOutletBySlug = (slug: string) => pressOutlets.find(outlet => outlet.slug === slug);

// Generate SVG placeholder for missing logos
export const generateLogoPlaceholder = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#f1f5f9"/>
      <text x="60" y="22" text-anchor="middle" dominant-baseline="middle" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">${initials}</text>
    </svg>
  `)}`;
};