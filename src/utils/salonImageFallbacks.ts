
export type SalonCategory = 'nail' | 'hair' | 'spa' | 'beauty' | 'luxury' | 'generic';

/**
 * Determine salon category from description and name
 * Used for selecting appropriate fallback images
 */
export function determineSalonCategory(description: string = '', name: string = ''): SalonCategory {
  // Normalize the text for easy keyword checking
  const normalizedText = (description + ' ' + name).toLowerCase();
  
  // Check for various keywords to determine the salon type
  if (normalizedText.includes('nail') || normalizedText.includes('manicure') || normalizedText.includes('pedicure')) {
    return 'nail';
  } else if (normalizedText.includes('hair') || normalizedText.includes('salon') || normalizedText.includes('cut')) {
    return 'hair';
  } else if (normalizedText.includes('spa') || normalizedText.includes('massage') || normalizedText.includes('facial')) {
    return 'spa';
  } else if (normalizedText.includes('luxury') || normalizedText.includes('premium') || normalizedText.includes('high-end')) {
    return 'luxury';
  } else if (normalizedText.includes('beauty') || normalizedText.includes('makeup') || normalizedText.includes('cosmetic')) {
    return 'beauty';
  } else {
    return 'generic';
  }
}

/**
 * Get an appropriate fallback image for a salon based on its category
 */
export function getDefaultSalonImage(category: SalonCategory = 'generic', isPremium: boolean = false): string {
  // Each category has multiple possible images
  const imageMap: Record<SalonCategory, string[]> = {
    nail: [
      '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png',
      '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png'
    ],
    hair: [
      '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
      '/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png'
    ],
    spa: [
      '/lovable-uploads/45fbe8fa-1758-43e5-a8b0-bbf55a601a41.png',
      '/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png'
    ],
    beauty: [
      '/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png',
      '/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png'
    ],
    luxury: [
      '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png',
      '/lovable-uploads/21d69945-acea-4057-9ff0-df824cd3c607.png'
    ],
    generic: [
      '/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png',
      '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png'
    ]
  };
  
  // Select an image from the category, premium listings get the first (typically better) image
  const images = imageMap[category];
  return isPremium ? images[0] : images[Math.floor(Math.random() * images.length)];
}
