// Generated demo content for UI overlay (no DB writes)
// Keep arrays small by generating programmatically to minimize bundle size

import { Job } from '@/types/job';

const cities = [
  'Miami, FL','Houston, TX','Phoenix, AZ','San Jose, CA','Boston, MA','Seattle, WA','Atlanta, GA','Chicago, IL','Austin, TX','Orlando, FL','San Diego, CA','Charlotte, NC','Nashville, TN','Denver, CO','Las Vegas, NV','Portland, OR','Tampa, FL','Philadelphia, PA','Brooklyn, NY','Irvine, CA'
];

const roles = [
  'Nail Technician','Barber','Lash Artist','Esthetician','Makeup Artist','Massage Therapist','Hair Stylist','Brow Artist','Tattoo Artist'
];

const categories = [
  'Nail Tech','Barber','Lash','Esthetics','Makeup','Massage','Stylist','Brow','Tattoo'
];

function pick<T>(arr: T[], i: number) { return arr[i % arr.length]; }
function daysAgo(n: number) { return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString(); }

let uid = 0;
const id = (p: string) => `${p}-${++uid}`;

export const demoJobsActive: Job[] = Array.from({ length: 16 }).map((_, i) => {
  const title = `${pick(roles, i)} Wanted`;
  const comp = ['$1,200-$1,800/week','60% commission','$25-$40/hr','Base + Tips'][i % 4];
  return {
    id: id('demo-job-active'),
    title,
    company: `${title.split(' ')[0]} Studio`,
    category: pick(categories, i),
    location: pick(cities, i),
    description: 'Join a high-traffic, modern salon. Friendly team and great clientele.',
    compensation_details: comp,
    pricing_tier: ['diamond','premium','gold','featured','free'][i % 5],
    status: 'active',
    created_at: daysAgo(Math.floor(Math.random()*7)+1),
    updated_at: daysAgo(0),
    expires_at: daysAgo(-7), // in future
  };
});

export const demoJobsExpired: Job[] = Array.from({ length: 16 }).map((_, i) => {
  const title = `${pick(roles, i)} Position Filled`;
  const comp = ['$1,000-$1,600/week','55% commission','$20-$35/hr','Day rate + Tips'][i % 4];
  return {
    id: id('demo-job-expired'),
    title,
    company: `${title.split(' ')[0]} Lounge`,
    category: pick(categories, i),
    location: pick(cities.reverse(), i),
    description: 'This popular role was filled recently. New openings post daily — check back!',
    compensation_details: comp,
    pricing_tier: ['featured','free','premium','gold'][i % 4],
    status: 'active',
    created_at: daysAgo(Math.floor(Math.random()*60)+45),
    updated_at: daysAgo(Math.floor(Math.random()*30)+15),
    expires_at: daysAgo(Math.floor(Math.random()*21)+3), // in the past
  };
});

export type DemoSalon = {
  id: string;
  title: string;
  location: string;
  status: 'active';
  created_at: string;
  images: string[];
  asking_price?: string;
};

const salonPlaceholder = '/placeholder.svg';

export const demoSalonsStale: DemoSalon[] = Array.from({ length: 16 }).map((_, i) => ({
  id: id('demo-salon'),
  title: `${pick(['Modern','Boutique','High-Traffic','Turnkey','Upscale'], i)} Nail Salon For Sale`,
  location: pick(cities, i),
  status: 'active',
  created_at: daysAgo(Math.floor(Math.random()*75)+45), // 45–120 days ago
  images: [salonPlaceholder],
  asking_price: ['$95,000','$120,000','$150,000','$200,000'][i % 4]
}));

export type DemoArtist = {
  user_id: string;
  specialties: string | string[] | null;
  location: string | null;
  headline: string | null;
  available_for_work: boolean;
  updated_at: string;
};

export const demoArtistsAvailable: DemoArtist[] = Array.from({ length: 18 }).map((_, i) => ({
  user_id: `demo-artist-${i+1}`,
  specialties: [
    'Nails · Gel · Dip','Hair · Color & Cut','Makeup · Bridal','Lashes · Volume','Brows · Lamination','Tattoo · Fine Line'
  ][i % 6],
  location: pick(cities, i),
  headline: 'Experienced, punctual, and client-obsessed. Portfolio on request.',
  available_for_work: true,
  updated_at: daysAgo(Math.floor(Math.random()*3)+1),
}));
