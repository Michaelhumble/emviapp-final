export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EmviApp',
    url: 'https://www.emvi.app',
    logo: 'https://www.emvi.app/logo-512.png',
    sameAs: [
      'https://www.youtube.com/@EmviApp',
      'https://www.instagram.com/emvi.app',
      'https://www.facebook.com/EmviApp',
      'https://www.tiktok.com/@emviapp',
      'https://x.com/EmviApp',
    ],
  } as const;
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EmviApp',
    url: 'https://www.emvi.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.emvi.app/jobs?query={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  } as const;
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

// Minimal blog article type used in SEO layer
export interface ArticleInput {
  headline: string;
  description?: string;
  image?: string | string[];
  authorName?: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
  canonicalUrl: string;
}

export function buildArticleJsonLd(post: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.headline,
    description: post.description,
    image: post.image,
    author: { '@type': 'Organization', name: post.authorName || 'EmviApp Editorial' },
    publisher: {
      '@type': 'Organization',
      name: 'EmviApp',
      logo: { '@type': 'ImageObject', url: 'https://www.emvi.app/logo-512.png' },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: post.canonicalUrl,
  } as const;
}
