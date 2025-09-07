interface PressOutlet {
  name: string;
  slug: string;
  city?: string;
  logo: string;
  url: string;
  featured: boolean;
  description?: string;
}

export const pressOutlets: PressOutlet[] = [
  {
    name: "KRON4",
    slug: "kron4",
    city: "San Francisco Bay Area",
    logo: "/press-logos/kron4.svg",
    url: "https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    featured: true,
    description: "Bay Area NBC affiliate coverage"
  },
  {
    name: "WGN9", 
    slug: "wgn9",
    city: "Chicago",
    logo: "/press-logos/wgn9.svg",
    url: "https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true,
    description: "Chicago WGN Television coverage"
  },
  {
    name: "FOX59",
    slug: "fox59", 
    city: "Indianapolis",
    logo: "/press-logos/fox59.svg",
    url: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true,
    description: "Indianapolis FOX affiliate coverage"
  },
  {
    name: "KXAN",
    slug: "kxan",
    city: "Austin", 
    logo: "/press-logos/kxan.svg",
    url: "https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true,
    description: "Austin NBC affiliate coverage"
  },
  {
    name: "KRQE CBS13",
    slug: "krqe-cbs13",
    city: "Albuquerque", 
    logo: "/press-logos/krqe.svg",
    url: "https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true,
    description: "Albuquerque CBS affiliate coverage"
  },
  {
    name: "KGET NBC17",
    slug: "kget-nbc17",
    city: "Bakersfield",
    logo: "/press-logos/kget.svg", 
    url: "https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: true,
    description: "Bakersfield NBC affiliate coverage"
  },
  // Additional outlets (not featured on homepage)
  {
    name: "FOX40",
    slug: "fox40",
    city: "Sacramento",
    logo: "/press-logos/fox40.svg",
    url: "https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    featured: false,
    description: "Sacramento FOX affiliate coverage"
  },
  {
    name: "WFLA NBC8",
    slug: "wfla-nbc8",
    city: "Tampa",
    logo: "/press-logos/wfla.svg", 
    url: "https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: false,
    description: "Tampa NBC affiliate coverage"
  },
  {
    name: "WOOD TV NBC8", 
    slug: "wood-tv-nbc8",
    city: "Grand Rapids",
    logo: "/press-logos/wood-tv.svg",
    url: "https://www.woodtv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    featured: false,
    description: "Grand Rapids NBC affiliate coverage"
  }
];

export const getFeaturedOutlets = () => pressOutlets.filter(outlet => outlet.featured);
export const getAllOutlets = () => pressOutlets;
export const getOutletBySlug = (slug: string) => pressOutlets.find(outlet => outlet.slug === slug);