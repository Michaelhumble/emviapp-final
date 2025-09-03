export type PressLogo = {
  name: string;
  href?: string;           // link to the actual article/coverage; omit if none
  logoSrc: string;         // svg or webp (monochrome preferred)
  alt: string;
  verified?: boolean;      // set true only if link exists
};

export const PRESS_LOGOS: PressLogo[] = [
  {
    name: "AP News",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
    logoSrc: "/press-logos/ap.svg",
    alt: "Associated Press",
    verified: true
  },
  {
    name: "Benzinga",
    href: "https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    logoSrc: "/press-logos/benzinga.svg",
    alt: "Benzinga",
    verified: true
  },
  {
    name: "KRON4",
    logoSrc: "/press-logos/kron4.svg",
    alt: "KRON4 News",
    verified: false
  },
  {
    name: "CBS13",
    logoSrc: "/press-logos/cbs13.svg",
    alt: "CBS13",
    verified: false
  },
  {
    name: "FOX59",
    href: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    logoSrc: "/press-logos/fox59.svg",
    alt: "FOX59",
    verified: true
  },
  {
    name: "KXAN",
    logoSrc: "/press-logos/kxan.svg",
    alt: "KXAN News",
    verified: false
  },
  {
    name: "KRQE",
    logoSrc: "/press-logos/krqe.svg",
    alt: "KRQE News",
    verified: false
  },
  {
    name: "KGET17",
    logoSrc: "/press-logos/kget17.svg",
    alt: "KGET NBC17",
    verified: false
  },
  {
    name: "WGN9",
    logoSrc: "/press-logos/wgn9.svg",
    alt: "WGN9 News",
    verified: false
  },
  {
    name: "WFLA",
    logoSrc: "/press-logos/wfla.svg",
    alt: "WFLA News",
    verified: false
  },
  {
    name: "KDVR",
    logoSrc: "/press-logos/kdvr.svg",
    alt: "KDVR News",
    verified: false
  },
  {
    name: "WGNO",
    logoSrc: "/press-logos/wgno.svg",
    alt: "WGNO News",
    verified: false
  }
];

export const getFeaturedLogos = () => PRESS_LOGOS.slice(0, 8);
export const getAllLogos = () => PRESS_LOGOS;
export const getLogoBySlug = (slug: string) => PRESS_LOGOS.find(logo => logo.name.toLowerCase().replace(/\s+/g, '-') === slug);