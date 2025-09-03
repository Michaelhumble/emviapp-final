// src/data/pressLogos.ts
export type PressOutlet = {
  id: string;
  name: string;
  href: string;
  src: string;   // /press-logos/*.svg
  live: boolean; // homepage shows live===true only
};

export const PRESS_OUTLETS: PressOutlet[] = [
  {
    id: "apnews",
    name: "AP News",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
    src: "/press-logos/apnews.svg",
    live: true,
  },
  {
    id: "yahoo",
    name: "Yahoo",
    href: "https://search.yahoo.com/search?p=%22EmviApp+Launches+the+First+AI-Powered+Growth+Engine+for+the+Global+Beauty+Industry%22",
    src: "/press-logos/yahoo.svg",
    live: true,
  },
  {
    id: "google",
    name: "Google",
    href: "https://www.google.com/search?q=%22EmviApp+Launches+the+First+AI-Powered+Growth+Engine+for+the+Global+Beauty+Industry%22&tbm=nws",
    src: "/press-logos/google.svg",
    live: true,
  },
  {
    id: "cbs",
    name: "CBS",
    href: "https://www.wrbl.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/cbs.svg",
    live: true,
  },
  {
    id: "bing",
    name: "Bing",
    href: "https://www.bing.com/news/search?q=%22EmviApp+Launches+the+First+AI-Powered+Growth+Engine+for+the+Global+Beauty+Industry%22",
    src: "/press-logos/bing.svg",
    live: true,
  },
  {
    id: "kron4",
    name: "KRON 4",
    href: "https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/kron4.svg",
    live: true,
  },
  {
    id: "kget17",
    name: "KGET 17",
    href: "https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/kget17.svg",
    live: true,
  },
  {
    id: "wgn9",
    name: "WGN 9",
    href: "https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/wgn9.svg",
    live: true,
  },
  {
    id: "wfla8",
    name: "WFLA 8",
    href: "https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/wfla8.svg",
    live: true,
  },
  {
    id: "fox40",
    name: "FOX 40",
    href: "https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/fox40.svg",
    live: true,
  },
  {
    id: "kxan",
    name: "KXAN",
    href: "https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/kxan.svg",
    live: true,
  },

  // Keep Benzinga, but mark NOT live (410)
  {
    id: "benzinga",
    name: "Benzinga",
    href: "https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
    src: "/press-logos/benzinga.svg",
    live: false, // 410 – exclude from homepage until restored
  },
];
