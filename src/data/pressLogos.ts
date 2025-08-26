interface PressLogo {
  name: string;
  slug: string;
  href: string;
  articleUrl: string;
  alt: string;
  market: string;
}

export const pressLogos: PressLogo[] = [
  {
    name: "Associated Press",
    slug: "ap",
    href: "/press",
    articleUrl: "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
    alt: "Associated Press logo",
    market: "National"
  },
  {
    name: "Benzinga",
    slug: "benzinga", 
    href: "/press",
    articleUrl: "https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "Benzinga logo",
    market: "Finance"
  },
  {
    name: "KRON4",
    slug: "kron4",
    href: "/press", 
    articleUrl: "https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "KRON4 News logo",
    market: "Local TV"
  },
  {
    name: "FOX59",
    slug: "fox59",
    href: "/press",
    articleUrl: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    alt: "FOX59 News logo",
    market: "Local TV"
  },
  {
    name: "WGN9",
    slug: "wgn9",
    href: "/press",
    articleUrl: "https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "WGN9 Chicago logo", 
    market: "Local TV"
  },
  {
    name: "KXAN",
    slug: "kxan",
    href: "/press",
    articleUrl: "https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "KXAN NBC 36 logo",
    market: "Local TV"
  },
  {
    name: "CBS13",
    slug: "cbs13", 
    href: "/press",
    articleUrl: "https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "CBS13 News logo",
    market: "Local TV"
  },
  {
    name: "WFLA", 
    slug: "wfla",
    href: "/press",
    articleUrl: "https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "WFLA NBC 8 logo",
    market: "Local TV"
  },
  {
    name: "KGET17",
    slug: "kget17",
    href: "/press", 
    articleUrl: "https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    alt: "KGET 17 News logo",
    market: "Local TV"
  },
  {
    name: "KDVR",
    slug: "kdvr",
    href: "/press",
    articleUrl: "/press", 
    alt: "KDVR FOX31 Denver logo",
    market: "Local TV"
  },
  {
    name: "WGNO",
    slug: "wgno",
    href: "/press",
    articleUrl: "/press",
    alt: "WGNO ABC 26 New Orleans logo", 
    market: "Local TV"
  },
  {
    name: "KTSM",
    slug: "ktsm",
    href: "/press",
    articleUrl: "/press",
    alt: "KTSM 9 News El Paso logo",
    market: "Local TV"
  }
];

export const getFeaturedLogos = () => pressLogos.slice(0, 8);
export const getAllLogos = () => pressLogos;
export const getLogoBySlug = (slug: string) => pressLogos.find(logo => logo.slug === slug);