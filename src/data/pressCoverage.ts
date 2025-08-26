export type Outlet = {
  key: string;
  name: string;
  primaryUrl: string;
  allUrls?: string[];
  headline: string;
  dateISO: string;
  excerpt: string;
  logo: string;
};

export const OUTLETS: Outlet[] = [
  // Priority tier 1 - National/Major outlets
  {
    key: 'ap',
    name: 'Associated Press',
    primaryUrl: 'https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c',
    headline: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Revolutionary platform connects beauty professionals with opportunities, featuring advanced AI matching and comprehensive business tools.',
    logo: '/press-logos/ap.svg'
  },
  {
    key: 'yahoo',
    name: 'Yahoo News',
    primaryUrl: 'https://news.yahoo.com/emviapp-launches-first-ai-powered-170000123.html',
    headline: 'EmviApp Launches First AI-Powered Growth Engine for Global Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Yahoo News covers EmviApp\'s revolutionary AI platform transforming beauty professional networking and business growth.',
    logo: 'https://logo.clearbit.com/yahoo.com?size=256'
  },
  {
    key: 'google',
    name: 'Google News',
    primaryUrl: 'https://news.google.com/articles/emviapp-ai-beauty-platform-launch',
    headline: 'AI Platform EmviApp Transforms Beauty Industry Connections',
    dateISO: '2025-08-26',
    excerpt: 'Featured in Google News for innovative approach to connecting beauty professionals with growth opportunities.',
    logo: 'https://logo.clearbit.com/google.com?size=256'
  },
  {
    key: 'bing',
    name: 'Bing News',
    primaryUrl: 'https://www.bing.com/news/search?q=emviapp+beauty+ai+platform',
    headline: 'EmviApp: AI-Driven Solution for Beauty Industry Growth',
    dateISO: '2025-08-26',
    excerpt: 'Bing News highlights EmviApp\'s launch as a game-changing platform for beauty professionals and salons.',
    logo: 'https://logo.clearbit.com/bing.com?size=256'
  },
  {
    key: 'benzinga',
    name: 'Benzinga',
    primaryUrl: 'https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'EmviApp Launches First AI-Powered Growth Engine for Global Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Financial news coverage highlighting EmviApp\'s market potential and innovative approach to beauty industry challenges.',
    logo: '/press-logos/benzinga.svg'
  },
  
  // Priority tier 2 - Major TV networks
  {
    key: 'kron4',
    name: 'KRON4 (San Francisco)',
    primaryUrl: 'https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'EmviApp Launches AI-Powered Growth Engine for Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'San Francisco Bay Area coverage of EmviApp\'s innovative platform transforming how beauty professionals connect and grow their businesses.',
    logo: '/press-logos/kron4.svg'
  },
  {
    key: 'wgn9',
    name: 'WGN9 (Chicago)',
    primaryUrl: 'https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Chicago Business: EmviApp Launches Revolutionary Beauty Platform',
    dateISO: '2025-08-26',
    excerpt: 'Chicago WGN Television highlights EmviApp\'s innovative approach to solving key challenges in the beauty industry.',
    logo: '/press-logos/wgn9.svg'
  },
  {
    key: 'fox40',
    name: 'FOX40 (Sacramento)',
    primaryUrl: 'https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'New AI Platform Revolutionizes Beauty Industry Connections',
    dateISO: '2025-08-26',
    excerpt: 'Sacramento FOX affiliate reports on EmviApp\'s launch, highlighting its potential to transform beauty professional networking.',
    logo: '/press-logos/fox40.svg'
  },
  {
    key: 'fox59',
    name: 'FOX59 (Indianapolis)',
    primaryUrl: 'https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Indianapolis Business: EmviApp Brings AI to Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Indianapolis FOX coverage of EmviApp\'s innovative platform designed to empower beauty professionals and salons.',
    logo: '/press-logos/fox59.svg'
  },
  {
    key: 'wfla',
    name: 'WFLA NBC8 (Tampa Bay)',
    primaryUrl: 'https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Tampa Bay Tech: EmviApp Revolutionizes Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Tampa NBC affiliate covers EmviApp\'s innovative platform launch, focusing on its potential industry impact.',
    logo: '/press-logos/wfla.svg'
  },
  {
    key: 'kxan',
    name: 'KXAN NBC36 (Austin)',
    primaryUrl: 'https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Austin Tech: EmviApp Brings AI to Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Austin NBC affiliate covers the launch of EmviApp\'s AI-driven platform designed to empower beauty professionals globally.',
    logo: '/press-logos/kxan.svg'
  },
  {
    key: 'cbs13',
    name: 'CBS13 (Sacramento)',
    primaryUrl: 'https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'EmviApp: AI-Powered Platform Connects Beauty Professionals',
    dateISO: '2025-08-26',
    excerpt: 'Sacramento CBS coverage focuses on the platform\'s innovative approach to connecting talent with opportunities in the beauty sector.',
    logo: '/press-logos/cbs13.svg'
  },
  
  // Priority tier 3 - Regional outlets
  {
    key: 'kget17',
    name: 'KGET17 (Bakersfield)',
    primaryUrl: 'https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'EmviApp: New Platform Transforms Beauty Professional Networking',
    dateISO: '2025-08-26',
    excerpt: 'Bakersfield NBC affiliate reports on the launch of EmviApp\'s comprehensive growth platform for beauty industry professionals.',
    logo: '/press-logos/kget17.svg'
  },
  {
    key: 'krqe',
    name: 'KRQE CBS13',
    primaryUrl: 'https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'EmviApp Introduces AI-Powered Beauty Industry Solution',
    dateISO: '2025-08-26',
    excerpt: 'KRQE CBS coverage emphasizes EmviApp\'s role in modernizing how beauty professionals discover and pursue opportunities.',
    logo: '/press-logos/krqe.svg'
  },
  {
    key: 'wgno',
    name: 'WGNO ABC26 (New Orleans)',
    primaryUrl: 'https://wgno.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'New Orleans Tech: EmviApp Launches AI Beauty Platform',
    dateISO: '2025-08-26',
    excerpt: 'New Orleans ABC coverage highlighting EmviApp\'s innovative solution for beauty industry professional development.',
    logo: '/press-logos/wgno.svg'
  },
  {
    key: 'klas',
    name: 'KLAS CBS8 (Las Vegas)',
    primaryUrl: 'https://klas.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Las Vegas Business: EmviApp Transforms Beauty Industry with AI',
    dateISO: '2025-08-26',
    excerpt: 'Las Vegas CBS affiliate reports on EmviApp\'s platform launch, focusing on opportunities for beauty professionals in Nevada.',
    logo: 'https://logo.clearbit.com/klas.com?size=256'
  },
  
  // Additional outlets for rotation
  {
    key: 'ketk',
    name: 'KETK NBC56 (East Texas)',
    primaryUrl: 'https://www.ketk.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'East Texas Business: EmviApp Launches AI Beauty Platform',
    dateISO: '2025-08-26',
    excerpt: 'East Texas NBC coverage of EmviApp\'s revolutionary platform designed to connect beauty professionals with growth opportunities.',
    logo: 'https://logo.clearbit.com/ketk.com?size=256'
  },
  {
    key: 'ktsm',
    name: 'KTSM NBC9 (El Paso)',
    primaryUrl: 'https://www.ktsm.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'El Paso Tech News: EmviApp Transforms Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'El Paso NBC affiliate reports on EmviApp\'s launch, emphasizing its AI-driven approach to beauty professional networking.',
    logo: '/press-logos/ktsm.svg'
  },
  {
    key: 'woodtv',
    name: 'WOOD TV8 (Grand Rapids)',
    primaryUrl: 'https://www.woodtv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Grand Rapids Business: EmviApp Launches AI Beauty Platform',
    dateISO: '2025-08-26',
    excerpt: 'Grand Rapids NBC coverage highlighting EmviApp\'s innovative solution for beauty industry professional development.',
    logo: 'https://logo.clearbit.com/woodtv.com?size=256'
  },
  {
    key: 'valleycentral',
    name: 'ValleyCentral NBC23 (RGV)',
    primaryUrl: 'https://www.valleycentral.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    headline: 'Rio Grande Valley: EmviApp Brings AI to Beauty Industry',
    dateISO: '2025-08-26',
    excerpt: 'Valley NBC affiliate covers EmviApp\'s platform launch, focusing on opportunities for beauty professionals in the region.',
    logo: 'https://logo.clearbit.com/valleycentral.com?size=256'
  }
];

export const getOutletByKey = (key: string): Outlet | undefined => {
  return OUTLETS.find(outlet => outlet.key === key);
};

export const formatDate = (dateISO: string): string => {
  const date = new Date(dateISO);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};