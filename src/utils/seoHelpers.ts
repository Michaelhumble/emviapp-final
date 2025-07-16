// SEO utility functions for URL generation and optimization

export function generateSEOSlug(title: string, location?: string, id?: string): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
  
  const locationSlug = location
    ? location
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    : null;
  
  let slug = titleSlug;
  if (locationSlug) {
    slug += `-${locationSlug}`;
  }
  if (id) {
    slug += `-${id}`;
  }
  
  return slug;
}

export function generateJobUrl(job: { title: string; location?: string; id: string; category: string }): string {
  const slug = generateSEOSlug(job.title, job.location, job.id);
  return `/${job.category}/${slug}`;
}

export function generateSalonUrl(salon: { title: string; location?: string; id: string }): string {
  const slug = generateSEOSlug(salon.title, salon.location, salon.id);
  return `/salons/${slug}`;
}

export function generateArtistUrl(artist: { full_name?: string; username: string }): string {
  return `/u/${artist.username}`;
}

export function extractIdFromSlug(slug: string): string | null {
  // Extract ID from the end of SEO-friendly URLs
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Check if it's a valid UUID or ID format
  if (lastPart && (lastPart.length === 36 || /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(lastPart))) {
    return lastPart;
  }
  
  return null;
}

export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (!content) return '';
  
  // Remove HTML tags if any
  const cleanContent = content.replace(/<[^>]*>/g, '');
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Truncate at word boundary
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

export function generateImageAlt(title: string, category?: string): string {
  const categoryText = category ? ` - ${category}` : '';
  return `${title}${categoryText} | EmviApp`;
}

export function generateStructuredBreadcrumb(path: string, baseUrl: string = 'https://emviapp.com') {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];
  
  let currentPath = baseUrl;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": formatBreadcrumbName(segment),
      "item": currentPath
    });
  });
  
  return {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
}

function formatBreadcrumbName(segment: string): string {
  // Convert URL segment to readable name
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}