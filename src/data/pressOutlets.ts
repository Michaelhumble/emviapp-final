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
    logo: '/press-logos/benzinga.svg',
    alt: 'Benzinga logo'
  },
  {
    id: 'nbc',
    name: 'NBC',
    href: 'https://who13.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/nbc.svg',
    alt: 'NBC logo'
  },
  {
    id: 'abc',
    name: 'ABC',
    href: 'https://www.wjbf.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/abc.svg',
    alt: 'ABC logo'
  },
  {
    id: 'cbs',
    name: 'CBS',
    href: 'https://www.wrbl.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/cbs.svg',
    alt: 'CBS logo'
  },
  {
    id: 'fox',
    name: 'FOX',
    href: 'https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/fox.svg',
    alt: 'FOX logo'
  },
  {
    id: 'usa-today',
    name: 'USA Today Network',
    href: 'https://www.usatoday.com/story/sponsor-story/emviapp/2024/11/20/emviapp-launches-ai-powered-growth-engine-beauty-industry/76395847007/',
    logo: '/press-logos/usa-today.svg',
    alt: 'USA Today logo'
  },
  {
    id: 'digital-journal',
    name: 'Digital Journal',
    href: 'https://www.digitaljournal.com/pr/news/ein-presswire/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
    logo: '/press-logos/digital-journal.svg',
    alt: 'Digital Journal logo'
  }
];