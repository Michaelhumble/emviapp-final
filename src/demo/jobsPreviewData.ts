// src/demo/jobsPreviewData.ts (hardened preview data)
export type PreviewJob = {
  id: string;
  title: string;
  shop: string;
  city: string;
  state?: string;
  salary?: string;
  photo?: string;
  expired?: boolean;
  filled?: boolean;
};

export type PreviewSalon = {
  id: string;
  name: string;
  city: string;
  askingPrice?: string;
  photo?: string;
};

export type PreviewArtist = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  photo?: string;
};

export const previewPremiumJobs: PreviewJob[] = [
  { id: 'pp1', title: 'Lead Nail Tech (Premium)', shop: 'Diamond Nails', city: 'Houston', state: 'TX', salary: '$1,800–$2,400/wk', photo: '/demo/nails-01.svg' },
  { id: 'pp2', title: 'Senior Gel X Artist', shop: 'Lotus Spa', city: 'San Jose', state: 'CA', salary: '$1,900–$2,500/wk', photo: '/demo/nails-02.svg' },
  { id: 'pp3', title: 'Acrylic Specialist', shop: 'Velvet Lounge', city: 'Dallas', state: 'TX', salary: '$1,700–$2,200/wk', photo: '/demo/nails-03.svg' },
  { id: 'pp4', title: 'Nail Art Director', shop: 'Halo Studio', city: 'Miami', state: 'FL', salary: '$2,000–$2,600/wk', photo: '/demo/nails-04.svg' },
  { id: 'pp5', title: 'Spa Pedicure Lead', shop: 'Royal Nails', city: 'Phoenix', state: 'AZ', salary: '$1,600–$2,100/wk', photo: '/demo/nails-05.svg' },
  { id: 'pp6', title: 'Stylist • Nail/Natural', shop: 'Citrine Salon', city: 'Seattle', state: 'WA', salary: '$1,700–$2,300/wk', photo: '/demo/nails-06.svg' },
];

export const previewGoldJobs: PreviewJob[] = [
  { id: 'pg1', title: 'Nail Tech (Gold)', shop: 'Jasmine Nails', city: 'Boston', state: 'MA', salary: '$1,500–$2,000/wk', photo: '/demo/nails-02.svg' },
  { id: 'pg2', title: 'Gel X Artist', shop: 'Azure Spa', city: 'Orlando', state: 'FL', salary: '$1,600–$2,100/wk', photo: '/demo/nails-01.svg' },
  { id: 'pg3', title: 'Pedicure Specialist', shop: 'Coco Lounge', city: 'San Jose', state: 'CA', salary: '$1,400–$1,900/wk', photo: '/demo/nails-03.svg' },
  { id: 'pg4', title: 'Acrylic Master', shop: 'Pearl Nails', city: 'Atlanta', state: 'GA', salary: '$1,600–$2,000/wk', photo: '/demo/nails-04.svg' },
  { id: 'pg5', title: 'Brow/Lash Combo', shop: 'Glow House', city: 'Denver', state: 'CO', salary: '$1,500–$2,000/wk', photo: '/demo/nails-05.svg' },
  { id: 'pg6', title: 'Front Desk + Nail', shop: 'Sunset Spa', city: 'Austin', state: 'TX', salary: '$1,400–$1,800/wk', photo: '/demo/nails-06.svg' },
  { id: 'pg7', title: 'Nail Tech (Part‑Time)', shop: 'Luna Studio', city: 'San Diego', state: 'CA', salary: '$1,200–$1,600/wk', photo: '/demo/nails-01.svg' },
  { id: 'pg8', title: 'Esthetician + Nail', shop: 'Serene Spa', city: 'Chicago', state: 'IL', salary: '$1,400–$1,900/wk', photo: '/demo/nails-02.svg' },
  { id: 'pg9', title: 'Makeup + Nail Hybrid', shop: 'Opal Studio', city: 'Portland', state: 'OR', salary: '$1,300–$1,800/wk', photo: '/demo/nails-03.svg' },
  { id: 'pg10', title: 'Junior Nail Artist', shop: 'Petal Spa', city: 'Tampa', state: 'FL', salary: '$1,200–$1,500/wk', photo: '/demo/nails-04.svg' },
];

export const previewExpiredJobs: PreviewJob[] = [
  { id: 'pe1', title: 'Acrylic Master', shop: 'Royal Nails', city: 'Orlando', state: 'FL', salary: '$1,800/wk', photo: '/demo/nails-05.svg', expired: true },
  { id: 'pe2', title: 'Gel X Artist', shop: 'Halo Studio', city: 'Dallas', state: 'TX', salary: '$1,700/wk', photo: '/demo/nails-06.svg', filled: true },
  { id: 'pe3', title: 'Nail Tech (Filled)', shop: 'Velvet Lounge', city: 'Miami', state: 'FL', salary: '$1,650/wk', photo: '/demo/nails-03.svg', filled: true },
  { id: 'pe4', title: 'Pedicure Lead', shop: 'Diamond Nails', city: 'Houston', state: 'TX', salary: '$1,600/wk', photo: '/demo/nails-04.svg', expired: true },
  { id: 'pe5', title: 'Brow Tech', shop: 'Jasmine Nails', city: 'Boston', state: 'MA', salary: '$1,550/wk', photo: '/demo/nails-02.svg', expired: true },
  { id: 'pe6', title: 'Lash + Nail Hybrid', shop: 'Citrine Salon', city: 'Phoenix', state: 'AZ', salary: '$1,700/wk', photo: '/demo/nails-01.svg', filled: true },
  { id: 'pe7', title: 'Makeup + Nail', shop: 'Glow House', city: 'Seattle', state: 'WA', salary: '$1,650/wk', photo: '/demo/nails-05.svg', expired: true },
];

export const previewSalonsForSale: PreviewSalon[] = [
  { id: 's1', name: 'Velvet Nails', city: 'Boston', askingPrice: '$95,000', photo: '/demo/salon-01.svg' },
  { id: 's2', name: 'Sunshine Nails', city: 'Denver', askingPrice: '$120,000', photo: '/demo/salon-02.svg' },
  { id: 's3', name: 'Azure Spa', city: 'Dallas', askingPrice: '$135,000', photo: '/demo/salon-01.svg' },
  { id: 's4', name: 'Citrine Lounge', city: 'San Jose', askingPrice: '$150,000', photo: '/demo/salon-02.svg' },
];

export const previewArtists: PreviewArtist[] = [
  { id: 'a1', name: 'Jenny N.', specialty: 'Gel X • Design', city: 'Atlanta', photo: '/demo/artist-01.svg' },
  { id: 'a2', name: 'Minh P.', specialty: 'Acrylic • Ombre', city: 'Seattle', photo: '/demo/artist-02.svg' },
  { id: 'a3', name: 'Sofia R.', specialty: 'Brow • Lamination', city: 'Houston', photo: '/demo/artist-01.svg' },
  { id: 'a4', name: 'Alex K.', specialty: 'Lash • Volume', city: 'Phoenix', photo: '/demo/artist-02.svg' },
];
