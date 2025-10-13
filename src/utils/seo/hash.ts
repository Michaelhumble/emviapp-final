/**
 * Lightweight content hashers for SEO reindexing
 * Generate stable hashes to detect content changes
 */

/**
 * Simple string hash function (djb2 algorithm)
 */
function simpleHash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Normalize and hash job content
 */
export function hashJob(job: {
  title: string;
  location?: string;
  salary_range?: string;
  status?: string;
  category?: string;
  description?: string;
}): string {
  const parts = [
    job.title || '',
    job.location || '',
    job.salary_range || '',
    job.status || '',
    job.category || '',
    (job.description || '').substring(0, 500) // First 500 chars only
  ];
  
  return simpleHash(parts.join('|'));
}

/**
 * Normalize and hash salon content
 */
export function hashSalon(salon: {
  salon_name?: string;
  city?: string;
  state?: string;
  business_type?: string;
  asking_price?: number;
  status?: string;
}): string {
  const parts = [
    salon.salon_name || '',
    salon.city || '',
    salon.state || '',
    salon.business_type || '',
    String(salon.asking_price || ''),
    salon.status || ''
  ];
  
  return simpleHash(parts.join('|'));
}

/**
 * Normalize and hash artist profile content
 */
export function hashArtist(artist: {
  full_name?: string;
  username?: string;
  role?: string;
  location?: string;
  specialty?: string;
  bio?: string;
}): string {
  const parts = [
    artist.full_name || '',
    artist.username || '',
    artist.role || '',
    artist.location || '',
    artist.specialty || '',
    (artist.bio || '').substring(0, 300)
  ];
  
  return simpleHash(parts.join('|'));
}

/**
 * Normalize and hash blog post content
 */
export function hashBlog(post: {
  slug: string;
  title: string;
  content?: string;
  updated_at?: string;
  published?: boolean;
}): string {
  const parts = [
    post.slug,
    post.title,
    (post.content || '').substring(0, 1000),
    post.updated_at || '',
    String(post.published || false)
  ];
  
  return simpleHash(parts.join('|'));
}

/**
 * Generic hash for simple page content
 */
export function hashPage(content: string): string {
  return simpleHash(content.substring(0, 2000));
}
