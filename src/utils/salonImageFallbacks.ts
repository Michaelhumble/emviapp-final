
// Define the supported salon categories
export type SalonCategory = 
  | 'nail' 
  | 'hair' 
  | 'barber' 
  | 'spa' 
  | 'beauty' 
  | 'lash' 
  | 'brow' 
  | 'makeup' 
  | 'massage'
  | 'skincare'
  | 'generic';

/**
 * Determines the salon category based on description and name
 * @param description Salon description text
 * @param name Salon name
 * @returns The determined salon category
 */
export const determineSalonCategory = (description: string, name: string): SalonCategory => {
  const text = `${description} ${name}`.toLowerCase();
  
  if (text.includes('nail') || text.includes('manicure') || text.includes('pedicure')) return 'nail';
  if (text.includes('hair') || text.includes('stylist') || text.includes('color')) return 'hair';
  if (text.includes('barber') || text.includes('cut') || text.includes('shave')) return 'barber';
  if (text.includes('spa') || text.includes('wellness') || text.includes('relax')) return 'spa';
  if (text.includes('lash') || text.includes('eyelash')) return 'lash';
  if (text.includes('brow') || text.includes('eyebrow')) return 'brow';
  if (text.includes('makeup') || text.includes('cosmetic')) return 'makeup';
  if (text.includes('massage') || text.includes('therapy')) return 'massage';
  if (text.includes('skin') || text.includes('facial') || text.includes('derma')) return 'skincare';
  
  return 'generic';
};

/**
 * Gets the default image URL based on salon category and premium status
 * @param category Salon category
 * @param isPremium Whether the salon is premium
 * @returns URL to the default image
 */
export const getDefaultSalonImage = (category: SalonCategory, isPremium: boolean = false): string => {
  // Base path for fallback images
  const basePath = '/lovable-uploads/';

  // Premium listings get higher quality fallbacks
  if (isPremium) {
    switch (category) {
      case 'nail':
        return `${basePath}9f39ea95-e42c-4f4e-89a9-b44cb4e215e2.png`;
      case 'hair':
        return `${basePath}4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png`;
      case 'barber':
        return `${basePath}ef2533d3-313e-4150-baf2-31d91cd4837b.png`;
      case 'spa':
        return `${basePath}5164a78a-4b28-49b1-8f83-f833c77aff12.png`;
      case 'lash':
      case 'brow':
        return `${basePath}8fe0f798-c1eb-4d74-8a75-eca70a89d788.png`;
      case 'makeup':
        return `${basePath}6af7cc02-b6cf-4c54-9c03-9510d543d3f1.png`;
      case 'massage':
        return `${basePath}c9e52825-c7f4-4923-aecf-a92a8799530b.png`;
      case 'skincare':
        return `${basePath}ac31083b-3861-4851-99ac-ed1bc185c4d9.png`;
      default:
        return `${basePath}f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png`;
    }
  }

  // Standard fallbacks for non-premium listings
  switch (category) {
    case 'nail':
      return `${basePath}f575cfa2-98b5-4a1e-910c-acbc69a3736d.png`;
    case 'hair':
      return `${basePath}5b0dc7b0-886f-4c09-93c1-33f17d236690.png`;
    case 'barber':
      return `${basePath}4edfaa59-6542-4bad-9e6b-1cd0d7ae9113.png`;
    case 'spa':
      return `${basePath}0fcc390c-fc2b-4e72-9fa9-055da1d97ad4.png`;
    case 'lash':
    case 'brow':
      return `${basePath}72f0f6c8-5793-4750-993d-f250b495146d.png`;
    case 'makeup':
      return `${basePath}78b629b2-e8fc-45ba-9955-fe9d0e1266f7.png`;
    case 'massage':
      return `${basePath}81e6d95d-e09b-45f0-a4bc-96358592e462.png`;
    case 'skincare':
      return `${basePath}11e0c15e-b017-43fa-af96-28d679bb1bbc.png`;
    default:
      return `${basePath}f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png`;
  }
};
