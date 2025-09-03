export type PressLogo = {
  name: string;
  href?: string;           // link to the actual article/coverage; omit if none
  logoSrc: string;         // svg or webp (monochrome preferred)
  alt: string;
  verified?: boolean;      // set true only if link exists
};

export const PRESS_LOGOS: PressLogo[] = [
  {
    name: "Associated Press",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M15 10h20l15 30h-15l-2-5H18l-2 5H1L15 10zm10 15l-3-7-3 7h6zm25-5h20c8 0 15 5 15 15s-7 15-15 15H50V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10z'/%3e%3c/svg%3e",
    alt: "Associated Press",
    verified: true
  },
  {
    name: "Benzinga",
    href: "https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h20c8 0 15 5 15 15s-7 15-15 15H10V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10zm25-20h25v10H75v5h15v10H75v5h20v10H60V10zm30 0h15c8 0 15 5 15 15s-7 15-15 15H90V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10z'/%3e%3c/svg%3e",
    alt: "Benzinga",
    verified: true
  },
  {
    name: "NBC",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h15l15 20V10h15v30h-15L25 20v20H10V10zm50 0h15c10 0 15 5 15 15s-5 15-15 15H60V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10zm25-20h25c8 0 15 7 15 15s-7 15-15 15h-25V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10z'/%3e%3c/svg%3e",
    alt: "NBC",
    verified: false
  },
  {
    name: "CBS",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M20 10c11 0 20 9 20 20s-9 20-20 20S0 41 0 30 9 10 20 10zm40 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm40 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z'/%3e%3c/svg%3e",
    alt: "CBS",
    verified: false
  },
  {
    name: "FOX",
    href: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h25v10H25v5h15v10H25v15H10V10zm30 15c0-8 7-15 15-15s15 7 15 15c0 8-7 15-15 15s-15-7-15-15zm15-5c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm25-10l15 15 15-15h15L105 30 85 10h15z'/%3e%3c/svg%3e",
    alt: "FOX",
    verified: true
  },
  {
    name: "Yahoo Finance",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10l10 15 10-15h15l-15 20v10H20V30L5 10h15zm40 0l10 20h15l-20-30h15l15 30h-15l-10-20zm50 15h15v15h-15V25zm0-10h15v5h-15v-5z'/%3e%3c/svg%3e",
    alt: "Yahoo Finance",
    verified: false
  },
  {
    name: "USA Today",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h15v20c0 3 2 5 5 5s5-2 5-5V10h15v20c0 8-7 15-15 15s-15-7-15-15V10zm50 15c0-8 7-15 15-15s15 7 15 15c0 8-7 15-15 15s-15-7-15-15zm15-5c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm25-10h30v10h-7.5v20H115V25h-7.5V10zm50 15h15v10h-30V10h30v10h-15v5h10v10h-10v5z'/%3e%3c/svg%3e",
    alt: "USA Today",
    verified: false
  },
  {
    name: "Business Insider",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h20c8 0 15 5 15 15s-7 15-15 15H10V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10zm25-20h15v30h-15V10zm25 0h15v30h-15V10z'/%3e%3c/svg%3e",
    alt: "Business Insider",
    verified: false
  },
  {
    name: "MarketWatch",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h15l5 15 5-15h15v30h-15V25l-5 10-5-10v15H10V10zm50 0h15l10 15 10-15h15L95 35 80 10zm50 0h30v10h-7.5v20H115V20h-7.5V10z'/%3e%3c/svg%3e",
    alt: "MarketWatch",
    verified: false
  },
  {
    name: "Forbes",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M10 10h25v10H25v5h15v10H25v5h20v10H10V10zm30 0h25c8 0 15 5 15 15s-7 15-15 15H40V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10zm25-20h30v10h-15v5h10v10h-10v15h-15V10z'/%3e%3c/svg%3e",
    alt: "Forbes",
    verified: false
  },
  {
    name: "The Telegraph",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M5 10h40v10h-12.5v20H25V20H12.5V10zm45 0h15v12h10V10h15v30h-15V32h-10v8H50V10zm50 0h15c8 0 15 5 15 15s-7 15-15 15h-15V10zm15 20c3 0 5-2 5-5s-2-5-5-5v10z'/%3e%3c/svg%3e",
    alt: "The Telegraph",
    verified: false
  },
  {
    name: "Google News",
    logoSrc: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3e%3cpath fill='%23000' d='M20 10c11 0 20 9 20 20s-9 20-20 20S0 41 0 30 9 10 20 10zm0 10c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10zm40-10c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm0 30c6 0 10-4 10-10H60c0 6 4 10 10 10zm40-30h30v10h-15v20h-15V10z'/%3e%3c/svg%3e",
    alt: "Google News",
    verified: false
  }
];

export const getFeaturedLogos = () => PRESS_LOGOS.slice(0, 8);
export const getAllLogos = () => PRESS_LOGOS;
export const getLogoBySlug = (slug: string) => PRESS_LOGOS.find(logo => logo.name.toLowerCase().replace(/\s+/g, '-') === slug);