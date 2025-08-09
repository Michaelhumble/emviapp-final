// Dev/preview-only demo seeding utilities
// - Seeds demo data into jobs, artist_for_hire_profiles, salon_sales
// - Tags every row with seed_tag='demo' for safe cleanup
// - Auto-runs once per browser in preview to fill the /jobs page

import { supabaseBypass } from '@/types/supabase-bypass';

const SEED_TAG = 'demo';
const SEED_LS_KEY = 'emvi_demo_seeded_v1';

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getProfileIds(limit: number) {
  const { data, error } = await supabaseBypass
    .from('profiles')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    // eslint-disable-next-line no-console
    console.error('[SEED] Failed to load profiles:', error);
    return [] as string[];
  }
  return (data || []).map((r: any) => r.id as string);
}

async function seedJobs() {
  const profileIds = await getProfileIds(40);
  if (profileIds.length === 0) return { inserted: 0 };

  const categories = ['nails', 'hair', 'makeup', 'massage', 'brows-lashes', 'barber'];
  const tiers = ['free', 'standard', 'premium'];
  const cities = [
    { city: 'Houston, TX' },
    { city: 'Atlanta, GA' },
    { city: 'San Jose, CA' },
    { city: 'Orlando, FL' },
    { city: 'Seattle, WA' },
    { city: 'Chicago, IL' },
  ];

  const rows: any[] = [];
  for (let i = 0; i < 60; i++) {
    const isExpired = i >= 30; // first 30 active, next 30 expired
    const cat = categories[i % categories.length];
    const tier = tiers[i % tiers.length];
    const loc = cities[i % cities.length].city;
    const user_id = profileIds[i % profileIds.length];

    const expires_at = isExpired ? daysAgo(randomBetween(45, 120)) : null;
    rows.push({
      title: `${cat === 'nails' ? 'Nail' : cat.charAt(0).toUpperCase() + cat.slice(1)} Technician – ${loc}`,
      description: `Hiring ${cat} professional. Great pay and friendly team. Immediate start available.`,
      location: loc,
      category: cat,
      status: 'active',
      pricing_tier: tier,
      user_id,
      expires_at,
      compensation_details: `$${randomBetween(18, 35)}/hr + tips`,
      seed_tag: SEED_TAG,
    });
  }

  const { error } = await supabaseBypass.from('jobs').insert(rows);
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('[SEED] Jobs insert encountered an error (safe to ignore in preview):', error);
    return { inserted: 0 };
  }
  return { inserted: rows.length };
}

async function seedArtists() {
  const profileIds = await getProfileIds(60);
  if (profileIds.length === 0) return { inserted: 0 };

  const specialties = [
    'Nails · Gel · Dip',
    'Hair · Color · Balayage',
    'Makeup · Bridal',
    'Massage · Deep Tissue',
    'Brows · Lashes',
    'Barber · Fades',
  ];
  const locations = ['GA', 'TX', 'CA', 'FL', 'WA', 'IL'].map((s) => `USA · ${s}`);

  const rows: any[] = [];
  for (let i = 0; i < 40; i++) {
    const uid = profileIds[i % profileIds.length];
    const available = i % 10 < 6; // 60% available
    const stale = i % 10 < 3; // 30% stale
    rows.push({
      user_id: uid,
      specialties: specialties[i % specialties.length],
      location: locations[i % locations.length],
      hourly_rate: `$${randomBetween(20, 60)}/hr`,
      headline: 'Experienced, reliable, and client-focused',
      bio: 'Dedicated professional with a passion for quality and client care.',
      available_for_work: available,
      updated_at: stale ? daysAgo(70) : new Date().toISOString(),
      seed_tag: SEED_TAG,
    });
  }

  const { error } = await supabaseBypass.from('artist_for_hire_profiles').insert(rows);
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('[SEED] Artists insert encountered an error (safe to ignore in preview):', error);
    return { inserted: 0 };
  }
  return { inserted: rows.length };
}

async function seedSalons() {
  const profileIds = await getProfileIds(20);
  if (profileIds.length === 0) return { inserted: 0 };

  const businesses = ['Nail Salon', 'Hair Studio', 'Barbershop', 'Spa'];
  const cities = [
    { city: 'Doraville', state: 'GA' },
    { city: 'Garland', state: 'TX' },
    { city: 'San Jose', state: 'CA' },
    { city: 'Orlando', state: 'FL' },
    { city: 'Seattle', state: 'WA' },
    { city: 'Chicago', state: 'IL' },
  ];

  const rows: any[] = [];
  for (let i = 0; i < 18; i++) {
    const user_id = profileIds[i % profileIds.length];
    const b = businesses[i % businesses.length];
    const loc = cities[i % cities.length];
    const isStale = i % 3 === 0; // ~1/3 stale
    rows.push({
      user_id,
      salon_name: `${b} ${randomBetween(101, 999)}`,
      city: loc.city,
      state: loc.state,
      asking_price: randomBetween(55000, 250000),
      business_type: b,
      description_combined: 'Turnkey location with steady clientele and strong revenue.',
      is_featured: i % 4 === 0,
      is_urgent: i % 5 === 0,
      status: 'active',
      created_at: isStale ? daysAgo(randomBetween(45, 120)) : new Date().toISOString(),
      seed_tag: SEED_TAG,
      images: ['/public/placeholder.svg'],
    });
  }

  const { error } = await supabaseBypass.from('salon_sales').insert(rows);
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('[SEED] Salons insert encountered an error (safe to ignore in preview):', error);
    return { inserted: 0 };
  }
  return { inserted: rows.length };
}

async function clearDemo() {
  // Delete by seed_tag across all tables
  const tables = ['jobs', 'artist_for_hire_profiles', 'salon_sales'];
  let removed = 0;
  for (const table of tables) {
    const { data, error } = await supabaseBypass
      .from(table)
      .delete()
      .eq('seed_tag', SEED_TAG)
      .select('id');
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`[SEED] Clear failed for ${table}:`, error);
    } else if (data) {
      removed += (data as any[]).length;
    }
  }
  // eslint-disable-next-line no-console
  console.info(`[SEED] Cleared ${removed} demo rows.`);
  try { localStorage.removeItem(SEED_LS_KEY); } catch {}
  return { removed };
}

async function seedAll() {
  const [j, a, s] = await Promise.allSettled([seedJobs(), seedArtists(), seedSalons()]);
  // eslint-disable-next-line no-console
  console.info('[SEED] Done:', { jobs: j, artists: a, salons: s });
  return { jobs: j, artists: a, salons: s } as const;
}

// Expose globally (preview only)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w: any = typeof window !== 'undefined' ? window : {};
if (typeof window !== 'undefined') {
  w.__seedDemoContent = async () => await seedAll();
  w.__clearDemoContent = async () => await clearDemo();
}

// Auto-run once in preview
(async () => {
  try {
    if (import.meta.env.MODE === 'production') return;
    if (typeof window === 'undefined') return;
    const alreadySeeded = localStorage.getItem(SEED_LS_KEY);
    if (alreadySeeded) return;
    // eslint-disable-next-line no-console
    console.info('[SEED] Auto-populating preview demo content…');
    await seedAll();
    localStorage.setItem(SEED_LS_KEY, '1');
    // Soft reload to pick up new lists
    setTimeout(() => {
      try { window.location.reload(); } catch {}
    }, 500);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SEED] Auto-seed skipped:', e);
  }
})();

export {};