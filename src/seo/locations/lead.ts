import { CITIES } from './seed';

const usedHashes = new Set<string>();

function hashText(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}

export function findCitySeed(slug?: string) {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return CITIES.find(c => c.slug === s) || null;
}

export function buildLeadCopy(opts: { city: string; state: string; role?: string; countJobs?: number; countArtists?: number; slug?: string; }): string {
  const { city, state, role, countJobs = 0, countArtists = 0, slug } = opts;
  const seed = findCitySeed(slug || '');
  const hoods = seed?.nearby?.slice(0, 3) || [];
  const neighborhoods = hoods.map(h => h.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' '));

  const roleLabel = role ? role.replace(/-/g, ' ') : 'beauty';
  const countText = role ? `${countJobs} openings` : `${countJobs} open roles`;
  const artistsText = countArtists ? ` and ${countArtists} available artists` : '';

  const sentences = [
    `${role ? roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1) : 'Beauty'} hiring in ${city}, ${state} is moving quickly—these listings are updated throughout the day so you never miss a good fit${artistsText}.`,
    `Many employers in ${city} offer competitive pay with clear schedules and steady clientele; typical ranges reflect experience, speed, and service mix.`,
    `Demand clusters around ${neighborhoods[0] || 'central districts'} and ${neighborhoods[1] || 'busy corridors'}, with spillover into ${neighborhoods[2] || 'nearby suburbs'}.`,
    `Browse featured roles, check latest postings, or post a job to reach local talent in minutes.`
  ];

  let text = sentences.join(' ');
  // Keep within 120–180 words by trimming or extending lightly
  const words = text.split(/\s+/);
  if (words.length > 180) text = words.slice(0, 180).join(' ') + '…';
  if (words.length < 120) text += ` We refresh listings frequently to keep opportunities current across ${city}.`;

  const hash = hashText(text);
  if (usedHashes.has(hash)) {
    // simple variation to avoid duplicates
    sentences.unshift(sentences.pop() as string);
    text = sentences.join(' ');
  }
  usedHashes.add(hashText(text));
  return text;
}
