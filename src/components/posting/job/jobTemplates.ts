
import { IndustryType, JobTemplate } from './jobFormSchema';

// Industry-specific words keyed by industry type
export const industryKeywords: Record<IndustryType, string[]> = {
  nail: ['manicure', 'pedicure', 'acrylic', 'gel', 'polish', 'nail technician', 'nail art', 'dipping powder'],
  hair: ['stylist', 'cut', 'color', 'highlight', 'balayage', 'blowout', 'extension'],
  spa: ['massage', 'facial', 'treatment', 'therapist', 'esthetician', 'body scrub', 'relaxation'],
  beauty: ['makeup', 'skincare', 'facial', 'waxing', 'lash', 'brow', 'tint'],
  makeup: ['artist', 'bridal', 'editorial', 'airbrush', 'SFX', 'beauty', 'cosmetic'],
  other: ['receptionist', 'manager', 'assistant', 'front desk', 'coordinator', 'trainee', 'apprentice']
};

// Job templates by industry
export const jobTemplates: JobTemplate[] = [
  {
    id: '1',
    icon: '💅',
    title: 'Nail Technician',
    description: 'Skilled nail technician for a busy salon',
    industry: 'nail',
    template: {
      title: 'Experienced Nail Technician',
      description: 'We are seeking a skilled nail technician to join our busy salon. The ideal candidate has experience with acrylic, gel, and nail art, and can provide excellent customer service.',
      location: '',
      jobType: 'full-time',
      contactEmail: '',
      experience_level: 'intermediate'
    }
  },
  {
    id: '2',
    icon: '💇‍♀️',
    title: 'Hair Stylist',
    description: 'Creative hair stylist for upscale salon',
    industry: 'hair',
    template: {
      title: 'Creative Hair Stylist',
      description: 'Join our team of talented stylists in our upscale salon. We are looking for someone with cutting and coloring expertise who can create beautiful, on-trend styles for our clients.',
      location: '',
      jobType: 'full-time',
      contactEmail: '',
      experience_level: 'experienced'
    }
  },
  {
    id: '3',
    icon: '💆‍♀️',
    title: 'Massage Therapist',
    description: 'Licensed massage therapist for spa',
    industry: 'spa',
    template: {
      title: 'Licensed Massage Therapist',
      description: 'We are hiring a licensed massage therapist to provide a variety of massage services to our clients. The ideal candidate has experience in Swedish, deep tissue, and hot stone massage techniques.',
      location: '',
      jobType: 'part-time',
      contactEmail: '',
      experience_level: 'intermediate'
    }
  },
  {
    id: '4',
    icon: '👩‍💼',
    title: 'Front Desk Receptionist',
    description: 'Friendly receptionist for salon',
    industry: 'other',
    template: {
      title: 'Salon Front Desk Receptionist',
      description: 'We are looking for a friendly, organized receptionist to manage our front desk operations. Responsibilities include greeting clients, scheduling appointments, handling payments, and maintaining a clean reception area.',
      location: '',
      jobType: 'full-time',
      contactEmail: '',
      experience_level: 'entry-level'
    }
  }
];

// Keywords used to suggest job templates based on user input
export const templateSuggestionKeywords: Record<string, string[]> = {
  nail: ['nail', 'manicure', 'pedicure', 'acrylic', 'gel', 'polish', 'technician'],
  hair: ['hair', 'stylist', 'cut', 'color', 'barber', 'salon', 'extensions'],
  spa: ['massage', 'therapist', 'spa', 'facial', 'treatment', 'body', 'relax'],
  beauty: ['beauty', 'facial', 'waxing', 'tint', 'lash', 'brow', 'skincare'],
  makeup: ['makeup', 'mua', 'cosmetic', 'bridal', 'artist', 'beauty', 'face'],
  other: ['manager', 'receptionist', 'assistant', 'front desk', 'cleaning', 'admin']
};
