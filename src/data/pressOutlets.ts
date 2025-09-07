export type PressOutlet = {
  id: string;         // 'benzinga'
  name: string;       // 'Benzinga'
  href: string;       // canonical article URL
  logo: string;       // '/press-logos/benzinga.svg'
  alt: string;        // 'Benzinga logo'
};

export const PRESS_OUTLETS: PressOutlet[] = [
  {
    id: 'benzinga',
    name: 'Benzinga',
    href: 'https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/benzinga-pro.svg',
    alt: 'Benzinga logo'
  },
  {
    id: 'nbc',
    name: 'NBC',
    href: 'https://who13.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/nbc-premium.svg',
    alt: 'NBC logo'
  },
  {
    id: 'abc',
    name: 'ABC',
    href: 'https://www.wjbf.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/abc-premium.svg',
    alt: 'ABC logo'
  },
  {
    id: 'cbs',
    name: 'CBS',
    href: 'https://www.wrbl.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/professional-cbs.svg',
    alt: 'CBS logo'
  },
  {
    id: 'fox',
    name: 'FOX',
    href: 'https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/fox-premium.svg',
    alt: 'FOX logo'
  },
  {
    id: 'usa-today',
    name: 'USA Today',
    href: 'https://www.usatoday.com/story/sponsor-story/emviapp/2024/11/20/emviapp-launches-ai-powered-growth-engine-beauty-industry/76395847007/',
    logo: '/press-logos/usatoday-premium.svg',
    alt: 'USA Today logo'
  },
  {
    id: 'ap-news',
    name: 'AP News',
    href: 'https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c',
    logo: '/press-logos/apnews-premium.svg',
    alt: 'AP News logo'
  },
  {
    id: 'digital-journal',
    name: 'Digital Journal',
    href: 'https://www.digitaljournal.com/pr/news/ein-presswire/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/professional-digitaljournal.svg',
    alt: 'Digital Journal logo'
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    href: 'https://search.yahoo.com/search?p=%22EmviApp+Launches+the+First+AI-Powered+Growth+Engine+for+the+Global+Beauty+Industry%22',
    logo: '/press-logos/professional-yahoo.svg',
    alt: 'Yahoo logo'
  }
];