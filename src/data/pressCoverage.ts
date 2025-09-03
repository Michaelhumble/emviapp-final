export type PressItem = {
  outlet: string;            // "AP News", "KRON4", "KXAN", etc.
  url: string;               // canonical live URL
  logo: string;              // /press-logos/<slug>.svg (mono)
  date?: string;             // YYYY-MM-DD when available
  tag?: "press-release" | "syndication" | "coverage";
  live: boolean;             // set true only if HTTP 200 at time of adding
};

export const PRESS_COVERAGE: PressItem[] = [
  // === Use ONLY links below that return 200 today ===
  // AP News
  { 
    outlet: "AP News", 
    url: "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c", 
    logo: "/press-logos/ap.svg", 
    date: "2024-12-01",
    tag: "press-release", 
    live: true 
  },

  // KRON4
  { 
    outlet: "KRON4", 
    url: "https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/kron4.svg", 
    tag: "syndication", 
    live: true 
  },

  // KGET NBC 17
  { 
    outlet: "KGET 17", 
    url: "https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/kget17.svg", 
    tag: "syndication", 
    live: true 
  },

  // WGNO ABC 26
  { 
    outlet: "WGNO", 
    url: "https://wgno.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/wgno.svg", 
    tag: "syndication", 
    live: true 
  },

  // WFLA NBC 8
  { 
    outlet: "WFLA 8", 
    url: "https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/wfla.svg", 
    tag: "syndication", 
    live: true 
  },

  // FOX40
  { 
    outlet: "FOX40", 
    url: "https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/fox40.svg", 
    tag: "syndication", 
    live: true 
  },

  // KXAN NBC 36
  { 
    outlet: "KXAN", 
    url: "https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/kxan.svg", 
    tag: "syndication", 
    live: true 
  },

  // WGN 9
  { 
    outlet: "WGN 9", 
    url: "https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/wgn9.svg", 
    tag: "syndication", 
    live: true 
  },

  // FOX59
  { 
    outlet: "FOX59", 
    url: "https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/fox59.svg", 
    tag: "syndication", 
    live: true 
  },

  // CBS13
  { 
    outlet: "CBS13", 
    url: "https://cbs13.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/cbs13.svg", 
    tag: "syndication", 
    live: true 
  },

  // KDVR
  { 
    outlet: "KDVR", 
    url: "https://kdvr.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/kdvr.svg", 
    tag: "syndication", 
    live: true 
  },

  // KRQE
  { 
    outlet: "KRQE", 
    url: "https://krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/krqe.svg", 
    tag: "syndication", 
    live: true 
  },

  // EXCLUDE Benzinga (410) → live: false
  { 
    outlet: "Benzinga", 
    url: "https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry", 
    logo: "/press-logos/benzinga.svg", 
    tag: "syndication", 
    live: false 
  },
];

export const getLiveCoverage = () => PRESS_COVERAGE.filter(item => item.live);
export const getAllCoverage = () => PRESS_COVERAGE;
export const getCoverageByTag = (tag: string) => PRESS_COVERAGE.filter(item => item.tag === tag);