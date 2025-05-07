
import { Job } from '@/types/job';
import { generateVietnameseNailJobs } from './vietnameseNailJobSamples';

// Get Vietnamese nail job samples
const vietnameseNailJobs = generateVietnameseNailJobs();

// Make sure Magic Nails appears first
const sortedVietnameseJobs = [
  ...vietnameseNailJobs.filter(job => job.id === 'vn-job-premium'), 
  ...vietnameseNailJobs.filter(job => job.id !== 'vn-job-premium')
];

// Sample English jobs
const englishJobs: Job[] = [
  {
    id: 'en-job-1',
    title: 'Senior Nail Technician',
    role: 'Senior Nail Technician',
    company: 'Luxury Nail Spa',
    location: 'Los Angeles, CA',
    employment_type: 'Full-time',
    description: 'We are seeking an experienced nail technician with at least 3 years of experience in acrylic, gel, and nail art. Must have a valid license and excellent customer service skills.',
    salary_range: '$25-35/hr + tips',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ['Acrylic', 'Gel', 'Nail Art'],
    contact_info: {
      phone: '(213) 555-6789',
      email: 'luxurynailspa@example.com'
    },
    is_featured: true,
    image: '/lovable-uploads/5af131ca-038f-40e6-892a-502d1e822395.png'
  },
  {
    id: 'en-job-2',
    title: 'Nail Salon Manager',
    role: 'Manager',
    company: 'Glossy Nails',
    location: 'New York, NY',
    employment_type: 'Full-time',
    description: 'Seeking an experienced salon manager to oversee daily operations, staff scheduling, inventory management, and ensure excellent customer service. Must have previous salon management experience.',
    salary_range: '$55,000-65,000/year',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ['Management', 'Operations', 'Customer Service'],
    contact_info: {
      phone: '(212) 555-1234',
      email: 'glossynails@example.com'
    },
    is_featured: true,
    image: '/lovable-uploads/5f4b0b9e-d1c2-43ad-a85c-92c4b6c61441.png'
  },
  {
    id: 'en-job-3',
    title: 'Part-Time Nail Artist',
    role: 'Nail Artist',
    company: 'Trendy Nails & Spa',
    location: 'Chicago, IL',
    employment_type: 'Part-time',
    description: 'Looking for a creative nail artist for weekend shifts. Expertise in nail art, gel manicures, and pedicures required. Great opportunity for building clientele.',
    salary_range: '$20-25/hr + tips',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ['Nail Art', 'Gel', 'Pedicure'],
    contact_info: {
      phone: '(312) 555-7890',
      email: 'trendynails@example.com'
    },
    image: '/lovable-uploads/1bc30225-0249-44a2-8086-c0a8ecbd57c2.png'
  }
];

// Combine Vietnamese and English jobs for global access
export const mockJobs: Job[] = [
  ...sortedVietnameseJobs,
  ...englishJobs
];
