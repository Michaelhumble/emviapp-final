
import { Salon } from '@/types/salon';
import { Job } from '@/types/job';
import { v4 as uuidv4 } from 'uuid';

// Mock featured salons for use across the application
const mockFeaturedSalons: Salon[] = [
  {
    id: 'fs-1',
    name: 'Luxe Beauty Salon',
    location: 'New York, NY',
    price: 250000,
    imageUrl: '/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png',
    image: '/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png',
    description: 'A premium luxury salon in the heart of Manhattan, specializing in high-end treatments.',
    city: 'New York',
    neighborhood: 'Upper East Side',
    rating: 4.9,
    reviewCount: 142,
    specialty: 'Full Service',
    services: ['Hair', 'Nails', 'Makeup', 'Facial Treatments'],
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '11:00 AM - 6:00 PM'
    },
    isHiring: true,
    featured: true,
    isPremium: true
  },
  {
    id: 'fs-2',
    name: 'Pink & White Nail Spa',
    location: 'Los Angeles, CA',
    price: 175000,
    imageUrl: '/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png',
    image: '/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png',
    description: 'Upscale nail salon offering premium services in nail art, gel, and acrylic extensions.',
    city: 'Los Angeles',
    neighborhood: 'Beverly Hills',
    rating: 4.8,
    reviewCount: 208,
    specialty: 'Nail Art',
    services: ['Manicure', 'Pedicure', 'Gel Polish', 'Acrylic Extensions', 'Nail Design'],
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    isHiring: true,
    featured: true,
    isPremium: true,
    category: 'nail'
  },
  {
    id: 'fs-3',
    name: 'The Modern Barber',
    location: 'Chicago, IL',
    price: 130000,
    imageUrl: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
    image: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
    description: 'Classic barbershop with a modern twist, offering precision cuts and premium grooming.',
    city: 'Chicago',
    neighborhood: 'River North',
    rating: 4.7,
    reviewCount: 156,
    specialty: 'Men\'s Grooming',
    services: ['Haircuts', 'Beard Trims', 'Hot Towel Shave', 'Hair Styling'],
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 7:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '11:00 AM - 4:00 PM'
    },
    isHiring: false,
    featured: true,
    isPremium: true,
    category: 'barber'
  }
];

// Mock featured jobs
const mockFeaturedJobs: Job[] = [
  {
    id: 'j-1',
    title: 'Senior Nail Technician',
    company: 'Nail Expressions',
    location: 'Miami, FL',
    created_at: new Date().toISOString(),
    description: 'Looking for an experienced nail technician with at least 3 years of experience. Must be proficient in acrylics, gel, and nail art.',
    employment_type: 'Full-time',
    compensation_details: '$70,000 - $90,000/year',
    specialties: ['Nail Art', 'Acrylics', 'Gel'],
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    image: '/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png',
    benefits: ['Health insurance', 'Paid time off', 'Flexible schedule']
  },
  {
    id: 'j-2',
    title: 'Hair Stylist',
    company: 'Luxe Hair Studio',
    location: 'New York, NY',
    created_at: new Date().toISOString(),
    description: 'Luxury hair salon seeking an experienced stylist with color expertise and a loyal client base.',
    employment_type: 'Full-time',
    compensation_details: '$60,000 - $100,000/year',
    specialties: ['Hair Color', 'Cutting', 'Styling'],
    weekly_pay: false,
    has_housing: false,
    owner_will_train: false,
    image: '/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png',
    benefits: ['Commission', 'Product discounts', 'Education']
  },
  {
    id: 'j-3',
    title: 'Spa Manager',
    company: 'Tranquil Wellness Center',
    location: 'Seattle, WA',
    created_at: new Date().toISOString(),
    description: 'High-end spa looking for an experienced manager to oversee daily operations and staff management.',
    employment_type: 'Full-time',
    compensation_details: '$80,000 - $95,000/year',
    specialties: ['Management', 'Customer Service', 'Team Leadership'],
    weekly_pay: false,
    has_housing: false,
    owner_will_train: true,
    image: '/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png',
    benefits: ['Health insurance', 'Paid time off', 'Retirement plan', 'Free spa services']
  },
  {
    id: 'j-4',
    title: 'Barber',
    company: 'Classic Cuts',
    location: 'Austin, TX',
    created_at: new Date().toISOString(),
    description: 'Traditional barbershop looking for a skilled barber with experience in classic cuts and hot towel shaves.',
    employment_type: 'Full-time',
    compensation_details: '$65,000 - $85,000/year',
    specialties: ['Men\'s Cuts', 'Hot Towel Shaves', 'Beard Trimming'],
    weekly_pay: true,
    has_housing: false,
    owner_will_train: false,
    image: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
    benefits: ['Flexible schedule', 'Commission', 'Tips']
  },
  {
    id: 'j-5',
    title: 'Salon Receptionist',
    company: 'Beautiful Day Salon',
    location: 'Denver, CO',
    created_at: new Date().toISOString(),
    description: 'Busy salon needs a friendly, organized receptionist to manage appointments, client check-in, and retail sales.',
    employment_type: 'Part-time',
    compensation_details: '$18 - $22/hour',
    specialties: ['Customer Service', 'Organization', 'Retail Sales'],
    weekly_pay: true,
    has_housing: false,
    owner_will_train: true,
    image: '/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png',
    benefits: ['Flexible schedule', 'Product discounts', 'Growth opportunities']
  }
];

// All salons map for quick lookup by ID
const allSalons = new Map<string, Salon>();
mockFeaturedSalons.forEach(salon => allSalons.set(salon.id, salon));

/**
 * Get featured salons
 * @param limit Maximum number of salons to return
 * @returns Array of featured salons
 */
export const getFeaturedSalons = (limit?: number): Salon[] => {
  if (limit && limit > 0) {
    return mockFeaturedSalons.slice(0, limit);
  }
  return mockFeaturedSalons;
};

/**
 * Get featured jobs
 * @param limit Maximum number of jobs to return
 * @returns Array of featured jobs
 */
export const getFeaturedJobs = (limit?: number): Job[] => {
  if (limit && limit > 0) {
    return mockFeaturedJobs.slice(0, limit);
  }
  return mockFeaturedJobs;
};

/**
 * Get a salon by ID
 * @param id The salon ID to find
 * @returns The salon with the matching ID, or undefined if not found
 */
export const getSalonById = (id: string): Salon | undefined => {
  return allSalons.get(id);
};

/**
 * Get salons for sale
 * @param limit Maximum number of salons to return
 * @returns Array of salons for sale
 */
export const getSalonsForSale = (limit?: number): Salon[] => {
  // In a real application, this would filter salons that are specifically marked for sale
  // For now, just return the featured salons
  if (limit && limit > 0) {
    return mockFeaturedSalons.slice(0, limit);
  }
  return mockFeaturedSalons;
};

/**
 * Get a job by ID
 * @param id The job ID to find
 * @returns The job with the matching ID, or undefined if not found
 */
export const getJobById = (id: string): Job | undefined => {
  return mockFeaturedJobs.find(job => job.id === id);
};
