/**
 * BILLION-DOLLAR INDUSTRY AUTO-TAGGING SYSTEM
 * Automatically categorizes jobs by industry to ensure proper placement
 */

import { JobDetailsSubmission } from '@/types/job';

/**
 * Auto-tag job with correct industry based on title, description, and other fields
 */
export const autoTagJobIndustry = (jobData: JobDetailsSubmission): string => {
  const title = jobData.title?.toLowerCase() || '';
  const description = jobData.description?.toLowerCase() || '';
  const category = jobData.category?.toLowerCase() || '';
  
  console.log('🏷️ [AUTO-TAG] Auto-tagging job:', { title, category });
  
  // If category is already set and valid, use it
  if (category && isValidIndustryCategory(category)) {
    console.log('✅ [AUTO-TAG] Using existing valid category:', category);
    return normalizeIndustryCategory(category);
  }
  
  // Analyze title and description for industry keywords
  const industryFromContent = detectIndustryFromContent(title, description);
  if (industryFromContent) {
    console.log('✅ [AUTO-TAG] Detected industry from content:', industryFromContent);
    return industryFromContent;
  }
  
  // Check specialties and features for clues
  const industryFromSpecialties = detectIndustryFromSpecialties(jobData);
  if (industryFromSpecialties) {
    console.log('✅ [AUTO-TAG] Detected industry from specialties:', industryFromSpecialties);
    return industryFromSpecialties;
  }
  
  // Fallback to "Other Beauty" if nothing matches
  console.log('⚠️ [AUTO-TAG] No industry detected, using fallback: Other Beauty');
  return 'Other Beauty';
};

/**
 * Detect industry from job title and description content
 */
const detectIndustryFromContent = (title: string, description: string): string | null => {
  const content = `${title} ${description}`.toLowerCase();
  
  const industryKeywords = {
    'nails': [
      'nail', 'nails', 'manicure', 'pedicure', 'nail tech', 'nail technician',
      'gel', 'acrylic', 'dip powder', 'nail art', 'cuticle', 'polish',
      'nail salon', 'nail studio', 'nail bar'
    ],
    'hair': [
      'hair', 'hairstylist', 'hair stylist', 'cosmetologist', 'colorist',
      'cut', 'style', 'blow dry', 'highlights', 'balayage', 'perm',
      'hair salon', 'salon stylist', 'hairdresser', 'shampoo'
    ],
    'barber': [
      'barber', 'barbershop', 'barber shop', 'men\'s hair', 'beard',
      'mustache', 'fade', 'buzz cut', 'straight razor', 'men\'s grooming'
    ],
    'massage': [
      'massage', 'massage therapist', 'therapeutic massage', 'deep tissue',
      'swedish massage', 'spa therapist', 'bodywork', 'relaxation'
    ],
    'skincare': [
      'esthetician', 'esthetics', 'skincare', 'skin care', 'facial',
      'microdermabrasion', 'chemical peel', 'skin treatment', 'anti-aging',
      'acne treatment', 'dermaplane'
    ],
    'makeup': [
      'makeup', 'makeup artist', 'mua', 'cosmetics', 'beauty artist',
      'bridal makeup', 'special effects', 'airbrush', 'contouring'
    ],
    'brows-lashes': [
      'lash', 'lashes', 'eyelash', 'brow', 'brows', 'eyebrow',
      'lash tech', 'lash artist', 'brow tech', 'microblading',
      'lash extensions', 'brow lamination', 'lash lift'
    ],
    'tattoo': [
      'tattoo', 'tattoo artist', 'tattooist', 'ink', 'body art',
      'permanent makeup', 'tattoo studio', 'tattoo parlor'
    ]
  };
  
  // Score each industry based on keyword matches
  const industryScores: Record<string, number> = {};
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        score += keyword.length; // Longer matches get higher scores
      }
    }
    industryScores[industry] = score;
  }
  
  // Return industry with highest score (if any)
  const bestMatch = Object.entries(industryScores)
    .filter(([_, score]) => score > 0)
    .sort(([_, scoreA], [__, scoreB]) => scoreB - scoreA)[0];
  
  return bestMatch ? bestMatch[0] : null;
};

/**
 * Detect industry from job specialties and features
 */
const detectIndustryFromSpecialties = (jobData: JobDetailsSubmission): string | null => {
  const specialties = jobData.specialties?.join(' ').toLowerCase() || '';
  const features = jobData.features?.join(' ').toLowerCase() || '';
  const combined = `${specialties} ${features}`;
  
  if (!combined.trim()) return null;
  
  return detectIndustryFromContent('', combined);
};

/**
 * Check if a category is a valid industry category
 */
const isValidIndustryCategory = (category: string): boolean => {
  const validCategories = [
    'nails', 'nail', 'nail tech', 'nail technician',
    'hair', 'hair stylist', 'hairstylist', 'cosmetology',
    'barber', 'barbershop',
    'massage', 'massage therapist',
    'esthetician', 'skincare', 'skin care',
    'makeup', 'makeup artist', 'mua',
    'lash', 'lash tech', 'brow', 'brow tech', 'brows & lashes',
    'tattoo', 'tattoo artist', 'tattooist'
  ];
  
  return validCategories.some(valid => 
    category.toLowerCase() === valid.toLowerCase() ||
    category.toLowerCase().includes(valid.toLowerCase())
  );
};

/**
 * Normalize industry category to standard format
 */
const normalizeIndustryCategory = (category: string): string => {
  const normalized = category.toLowerCase().trim();
  
  if (normalized.includes('nail')) return 'nails';
  if (normalized.includes('hair') || normalized.includes('cosmetology')) return 'hair';
  if (normalized.includes('barber')) return 'barber';
  if (normalized.includes('massage')) return 'massage';
  if (normalized.includes('esthetic') || normalized.includes('skincare') || normalized.includes('skin care')) return 'skincare';
  if (normalized.includes('makeup') || normalized === 'mua') return 'makeup';
  if (normalized.includes('lash') || normalized.includes('brow')) return 'brows-lashes';
  if (normalized.includes('tattoo')) return 'tattoo';
  
  return category; // Return original if no normalization needed
};

/**
 * Validate and enhance job data with proper industry tagging
 */
export const enhanceJobWithIndustryTag = (jobData: JobDetailsSubmission): JobDetailsSubmission => {
  const autoDetectedIndustry = autoTagJobIndustry(jobData);
  
  return {
    ...jobData,
    category: autoDetectedIndustry,
    // Add industry-specific enhancements
    post_type: 'job'
  };
};