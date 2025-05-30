import { Job } from '@/types/job';

export const sampleSalonsForSale: Job[] = [
  {
    id: "salon-1",
    title: "Beautiful Nail Salon For Sale",
    company: "Golden Nails & Spa",
    location: "Houston, TX",
    description: "Established nail salon in busy shopping center. Great customer base, modern equipment, and excellent location.",
    price: "$120,000",
    created_at: "2024-01-15T10:30:00Z",
    type: "salon",
  },
  {
    id: "salon-2", 
    title: "Premium Salon & Spa Business",
    company: "Luxury Beauty Lounge",
    location: "Los Angeles, CA",
    description: "High-end salon and spa with established clientele. Prime location in upscale neighborhood.",
    price: "$250,000",
    created_at: "2024-01-14T14:20:00Z",
    type: "salon",
  },
  {
    id: "salon-3",
    title: "Well-Established Nail Studio",
    company: "Perfect Nails Studio", 
    location: "Miami, FL",
    description: "Profitable nail studio with loyal customer base. All equipment included, ready for new owner.",
    price: "$85,000",
    created_at: "2024-01-13T09:15:00Z",
    type: "salon",
  }
];
