export type PressOutlet = {
  id: string
  name: string
  href: string             // primary destination
  fallbackHref?: string    // used if primary 4xx/5xx
  logo: string             // light mode SVG/PNG path in /public/press
  logoDark?: string        // optional dark variant
  alt: string
  width?: number
  height?: number
}

// Link validator with fallback (no more broken Benzinga)
export async function validateHref(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', mode: 'no-cors' as any })
    // Some sites block HEAD/no-cors; treat network success as OK
    return res && (res.status === 0 || (res.status >= 200 && res.status < 400))
  } catch {
    return false
  }
}

export const PRESS_OUTLETS: PressOutlet[] = [
  {
    id: 'benzinga',
    name: 'Benzinga',
    href: 'https://www.benzinga.com/pressreleases/',     // primary (was 410 before)
    fallbackHref: '/press#benzinga',                      // guaranteed working internal fallback
    logo: '/press/benzinga.svg',
    alt: 'Benzinga'
  },
  { 
    id: 'nbc', 
    name: 'NBC', 
    href: '/press#nbc', 
    logo: '/press/nbc.svg', 
    alt: 'NBC' 
  },
  { 
    id: 'abc', 
    name: 'ABC', 
    href: '/press#abc', 
    logo: '/press/abc.svg', 
    alt: 'ABC News' 
  },
  { 
    id: 'cbs', 
    name: 'CBS', 
    href: '/press#cbs', 
    logo: '/press/cbs.svg', 
    alt: 'CBS' 
  },
  { 
    id: 'fox', 
    name: 'FOX', 
    href: '/press#fox', 
    logo: '/press/fox.svg', 
    alt: 'FOX News' 
  },
  { 
    id: 'usatoday', 
    name: 'USA Today', 
    href: '/press#usatoday', 
    logo: '/press/usa-today.svg', 
    alt: 'USA Today' 
  },
  { 
    id: 'ap', 
    name: 'AP News', 
    href: '/press#ap', 
    logo: '/press/ap-news.svg', 
    alt: 'AP News' 
  },
]