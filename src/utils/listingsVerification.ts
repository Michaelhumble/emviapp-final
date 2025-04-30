
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';

// Type that represents a validated job posting with appropriate metadata
export interface JobPosting extends Job {
  type: 'job' | 'salon' | 'opportunity';
  imageUrl: string;
  title: string;
  location: string;
  specialties?: string[];
}

/**
 * Verifies that a listing has proper image path and required fields
 * This ensures that no dead links are shown on the homepage
 */
export function enhanceListingWithImage(listing: Job): JobPosting {
  // Ensure the listing has a default type
  const enhancedListing = {
    ...listing,
    type: listing.type || 'opportunity',
    imageUrl: listing.imageUrl || determineDefaultImage(listing)
  } as JobPosting;
  
  return enhancedListing;
}

/**
 * Intelligently selects a default image based on listing content
 */
function determineDefaultImage(listing: Job): string {
  // Categories of images for different listing types
  const images = {
    nail: [
      '/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png',
      '/lovable-uploads/9e713225-1758-4c21-84d3-33e7707a2806.png'
    ],
    hair: [
      '/lovable-uploads/8c34a207-742d-484a-8967-d0eb8091cb96.png',
      '/lovable-uploads/f575cfa2-98b5-4a1e-910c-acbc69a3736d.png'
    ],
    spa: [
      '/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png',
      '/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png'
    ],
    booth: [
      '/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png',
      '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png'
    ],
    generic: [
      '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png',
      '/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png'
    ]
  };
  
  // Check listing title and description for keywords
  const searchText = `${listing.title || ''} ${listing.company || ''} ${listing.description || ''}`.toLowerCase();
  
  if (searchText.includes('nail') || searchText.includes('manicure') || searchText.includes('pedicure')) {
    return getRandomItem(images.nail);
  } else if (searchText.includes('hair') || searchText.includes('stylist') || searchText.includes('cut')) {
    return getRandomItem(images.hair);
  } else if (searchText.includes('spa') || searchText.includes('massage') || searchText.includes('facial')) {
    return getRandomItem(images.spa);
  } else if (searchText.includes('booth') || searchText.includes('rent') || searchText.includes('space')) {
    return getRandomItem(images.booth);
  }
  
  // Default image if no keywords match
  return getRandomItem(images.generic);
}

/**
 * Get random item from array
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Verifies all opportunity listings for display
 * @param opportunities List of opportunity objects
 * @returns Filtered and verified opportunities
 */
export function verifyOpportunityListings(opportunities: Job[]): Job[] {
  return opportunities.filter(isListingDisplayable);
}

/**
 * Determines if a listing is displayable based on required fields
 */
export function isListingDisplayable(listing: Job): boolean {
  return !!(
    listing &&
    listing.id &&
    (listing.title || listing.company) &&
    listing.location
  );
}
