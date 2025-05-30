
import { Job } from '@/types/job';

export const sampleSalonsForSale: Job[] = [
  {
    id: '1',
    title: 'Established Nail Salon for Sale - Downtown LA',
    company: 'Sunset Nails & Spa',
    location: 'Los Angeles, CA',
    salary: '$125,000',
    type: 'full-time',
    description: 'Profitable nail salon in prime downtown location. 8 stations, loyal clientele, fully equipped.',
    requirements: ['Business license transfer', 'Cash or financing available', 'Immediate possession'],
    posted: '2 days ago',
    logo: '/lovable-uploads/salon-logo-1.png',
    featured: true,
    category: 'salon-for-sale'
  },
  {
    id: '2',
    title: 'High-Traffic Nail Salon - Beverly Hills',
    company: 'Elite Nails Beverly',
    location: 'Beverly Hills, CA',
    salary: '$275,000',
    type: 'full-time',
    description: 'Premium location with established VIP clientele. 12 stations, luxury finishes, parking included.',
    requirements: ['Serious buyers only', 'Proof of funds required', 'Owner financing possible'],
    posted: '5 days ago',
    logo: '/lovable-uploads/salon-logo-2.png',
    featured: false,
    category: 'salon-for-sale'
  },
  {
    id: '3',
    title: 'Family-Owned Nail Salon - Orange County',
    company: 'Golden Nails OC',
    location: 'Irvine, CA',
    salary: '$85,000',
    type: 'full-time',
    description: 'Well-established family business. 6 stations, steady customers, easy to operate.',
    requirements: ['Quick sale needed', 'Training included', 'Equipment included'],
    posted: '1 week ago',
    logo: '/lovable-uploads/salon-logo-3.png',
    featured: false,
    category: 'salon-for-sale'
  }
];
