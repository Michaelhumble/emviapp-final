import { Job } from '@/types/job';

/**
 * Validates and provides fallback logic for job images
 */
export const validateJobImage = (job: Job) => {
  const isPaidJob = job.pricing_tier && job.pricing_tier !== 'free';
  const hasImage = !!(job.image || job.imageUrl || job.image_url);
  
  // Get the image URL from any of the possible fields
  const imageUrl = job.image_url || job.imageUrl || job.image;
  
  return {
    isPaidJob,
    hasImage,
    imageUrl,
    shouldShowPlaceholder: isPaidJob && !hasImage,
    shouldShowWarning: isPaidJob && !hasImage
  };
};

/**
 * Get appropriate fallback image for industry
 */
export const getIndustryFallbackImage = (category: string): string => {
  const fallbacks: Record<string, string> = {
    'nail tech': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(27).png',
    'hair stylist': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair/modern-hair-salon-1.png',
    'barber': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber/premium-barbershop-1.png',
    'massage': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage/luxury-spa-1.png',
    'makeup': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup/makeup-studio-1.png',
    'esthetician': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare/premium-facial-spa-1.png',
    'tattoo': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo/tattoo-studio-1.png'
  };
  
  const key = category.toLowerCase();
  return fallbacks[key] || fallbacks['nail tech']; // Default fallback
};

/**
 * Enforce image requirements for paid jobs
 */
export const enforceImageRequirements = (job: Job): string | null => {
  const { isPaidJob, hasImage } = validateJobImage(job);
  
  if (isPaidJob && !hasImage) {
    return 'Premium job listings require at least one photo to showcase your salon.';
  }
  
  return null;
};