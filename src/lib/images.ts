export function normalizeJobPhotos(job: any): string[] {
  // Accept image_url (string), image_urls (string[]), photos (string[]), or storage keys
  const urls = new Set<string>();
  const push = (v?: string) => { if (v && typeof v === "string") urls.add(v); };
  if (typeof job?.image_url === "string") push(job.image_url);
  if (Array.isArray(job?.image_urls)) job.image_urls.forEach(push);
  if (Array.isArray(job?.photos)) job.photos.forEach(push);
  // Filter obvious non-URLs
  return Array.from(urls).filter(u => /^https?:\/\//.test(u) || u.startsWith("/"));
}
