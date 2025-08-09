// src/demo/jobsPreviewData.ts
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

export const previewJobs: PreviewJob[] = [
  { id: "p1", title: "Nail Tech (Full-Time)", shop: "Diamond Nails", city: "Houston", state: "TX", salary: "$1,600–$2,200/wk", photo: "/demo/nails/diamond-01.jpg" },
  { id: "p2", title: "Pedicure Specialist", shop: "Lotus Spa", city: "San Jose", state: "CA", salary: "$1,500–$2,000/wk", photo: "/demo/nails/lotus-01.jpg" },
];

export const previewExpiredJobs: PreviewJob[] = [
  { id: "e1", title: "Acrylic Master", shop: "Royal Nails", city: "Orlando", state: "FL", salary: "$1,800/wk", photo: "/demo/nails/royal-01.jpg", expired: true },
  { id: "e2", title: "Gel X Artist", shop: "Halo Studio", city: "Dallas", state: "TX", salary: "$1,700/wk", photo: "/demo/nails/halo-01.jpg", filled: true },
];

export const previewSalonsForSale: PreviewSalon[] = [
  { id: "s1", name: "Velvet Nails", city: "Boston", askingPrice: "$95,000", photo: "/demo/salons/velvet.jpg" },
  { id: "s2", name: "Sunshine Nails", city: "Denver", askingPrice: "$120,000", photo: "/demo/salons/sunshine.jpg" },
];

export const previewArtists: PreviewArtist[] = [
  { id: "a1", name: "Jenny N.", specialty: "Gel X • Design", city: "Atlanta", photo: "/demo/artists/jenny.jpg" },
  { id: "a2", name: "Minh P.", specialty: "Acrylic • Ombre", city: "Seattle", photo: "/demo/artists/minh.jpg" },
];
