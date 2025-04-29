
/**
 * Enhanced salon fallback images using locally uploaded images
 */
const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

// Updated high-quality locally uploaded images that won't break
const enhancedFallbackImages = {
  // Nail salon images
  nail: [
    '/lovable-uploads/8b07a3f5-953b-41da-9826-562c175c4b33.png', // New nail salon image
    '/lovable-uploads/15bcad43-8797-40ed-ae8f-96eedb447b8f.png',
    '/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png',
    '/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png',
    '/lovable-uploads/f34fda1a-6470-49ac-b973-2d1ee4fe0e86.png', // Modern nail station
    '/lovable-uploads/48f68f0e-3f4d-40d2-83e0-af67aeb11046.png', // New premium nail salon
  ],
  // Hair salon images
  hair: [
    '/lovable-uploads/c8d1b9cf-b785-4b35-b0bb-33221678ac65.png', // New hair salon image
    '/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png',
    '/lovable-uploads/264f30fa-7e38-43a5-957e-7171f5e9160e.png',
    '/lovable-uploads/4b908b3b-93ed-4879-95d4-cfa861a1f69f.png',
    '/lovable-uploads/a2001f31-d2ca-485b-b8ca-324f7f0a93e9.png', // Modern salon with mirrors
    '/lovable-uploads/322a70d7-f911-42b6-81e7-a205cc679cb7.png', // Nail bar with stools
    '/lovable-uploads/338c5814-c437-4b4a-abfd-ff088a9bb8e3.png', // New premium hair salon
  ],
  // Spa images
  spa: [
    '/lovable-uploads/ea1c82db-e21e-4b53-9d07-a660139223d0.png', // New spa salon image
    '/lovable-uploads/19ff177d-e137-4d2c-afd1-0b5b69109c44.png',
    '/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png',
    '/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png',
    '/lovable-uploads/e4474f6d-0c06-41b3-a3f6-f9a757313c5f.png', // Premium modern salon lounge
    '/lovable-uploads/20821f05-1d54-4853-b505-c09302440fe1.png', // New premium spa image
  ],
  // Barbershop images
  barber: [
    '/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png', 
    '/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png',
    '/lovable-uploads/9d6f82f3-66a2-4ff3-bdd8-7b7cd561bf8f.png',
    '/lovable-uploads/ad023c9d-dc76-4c3e-8951-11be40460b06.png', // New tattoo/PMU studio
  ],
  // Beauty salon images
  beauty: [
    '/lovable-uploads/1b5ea814-ad33-4a65-b01e-6c406c98ffc1.png',
    '/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png',
    '/lovable-uploads/733d57a9-1f52-4ef1-afa2-59d9507d7f92.png',
    '/lovable-uploads/9ebb0db4-1d49-4ac9-a746-4706af496749.png', // New elegant beauty salon
  ],
  
  // Premium luxury salons category with high-end interiors
  luxury: [
    '/lovable-uploads/f34fda1a-6470-49ac-b973-2d1ee4fe0e86.png', // Premium tattoo/PMU station
    '/lovable-uploads/a2001f31-d2ca-485b-b8ca-324f7f0a93e9.png', // Modern salon with mirrors
    '/lovable-uploads/322a70d7-f911-42b6-81e7-a205cc679cb7.png', // Nail bar with stools
    '/lovable-uploads/e4474f6d-0c06-41b3-a3f6-f9a757313c5f.png', // Premium modern salon lounge
    '/lovable-uploads/48f68f0e-3f4d-40d2-83e0-af67aeb11046.png', // Luxury nail salon
    '/lovable-uploads/338c5814-c437-4b4a-abfd-ff088a9bb8e3.png', // Luxury hair salon
    '/lovable-uploads/20821f05-1d54-4853-b505-c09302440fe1.png', // Luxury spa 
    '/lovable-uploads/ad023c9d-dc76-4c3e-8951-11be40460b06.png', // Luxury tattoo/PMU studio
    '/lovable-uploads/9ebb0db4-1d49-4ac9-a746-4706af496749.png', // Luxury beauty salon
    '/lovable-uploads/b1bada0a-03dd-4a48-bc56-fad4fa216e62.png', // Luxury black and red nail salon
  ],
  
  // New specialized categories based on uploaded images
  tattoo: [
    '/lovable-uploads/ad023c9d-dc76-4c3e-8951-11be40460b06.png', // Tattoo studio
  ],
  
  designerNail: [
    '/lovable-uploads/48f68f0e-3f4d-40d2-83e0-af67aeb11046.png', // Luxury nail salon with pink theme
    '/lovable-uploads/b1bada0a-03dd-4a48-bc56-fad4fa216e62.png', // Luxury black and red nail salon
  ]
};

export type SalonCategory = keyof typeof salonFallbackImages | 'luxury' | 'tattoo' | 'designerNail';

/**
 * Gets a random image from the category's collection
 * 
 * @param collection Array of image URLs
 * @returns A randomly selected URL
 */
const getRandomImage = (collection: string[]): string => {
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
};

/**
 * Gets the appropriate fallback image based on salon category.
 * Returns a high-quality image from our curated local collection.
 * 
 * @param category The salon category
 * @returns URL to the appropriate fallback image
 */
export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  const imageCollection = enhancedFallbackImages[category as keyof typeof enhancedFallbackImages] || enhancedFallbackImages.beauty;
  return getRandomImage(imageCollection);
};

/**
 * Default fallback image for general salon images
 * Each time this is called, it returns a different random beauty salon image
 */
export const fallbackImage = (): string => {
  // Prioritize the new uploaded images
  const allImages = [
    '/lovable-uploads/8b07a3f5-953b-41da-9826-562c175c4b33.png',
    '/lovable-uploads/c8d1b9cf-b785-4b35-b0bb-33221678ac65.png',
    '/lovable-uploads/ea1c82db-e21e-4b53-9d07-a660139223d0.png',
    '/lovable-uploads/f34fda1a-6470-49ac-b973-2d1ee4fe0e86.png',
    '/lovable-uploads/a2001f31-d2ca-485b-b8ca-324f7f0a93e9.png',
    '/lovable-uploads/322a70d7-f911-42b6-81e7-a205cc679cb7.png',
    '/lovable-uploads/e4474f6d-0c06-41b3-a3f6-f9a757313c5f.png',
    '/lovable-uploads/48f68f0e-3f4d-40d2-83e0-af67aeb11046.png',
    '/lovable-uploads/338c5814-c437-4b4a-abfd-ff088a9bb8e3.png',
    '/lovable-uploads/20821f05-1d54-4853-b505-c09302440fe1.png',
    '/lovable-uploads/ad023c9d-dc76-4c3e-8951-11be40460b06.png',
    '/lovable-uploads/9ebb0db4-1d49-4ac9-a746-4706af496749.png',
    '/lovable-uploads/b1bada0a-03dd-4a48-bc56-fad4fa216e62.png',
    ...enhancedFallbackImages.beauty
  ];
  return allImages[Math.floor(Math.random() * allImages.length)];
};

/**
 * Get all available fallback images for a specific category
 * Useful for allowing selection from available options
 * 
 * @param category The salon category
 * @returns Array of image URLs for the category
 */
export const getCategoryFallbackImages = (category: SalonCategory = 'beauty'): string[] => {
  return enhancedFallbackImages[category as keyof typeof enhancedFallbackImages] || enhancedFallbackImages.beauty;
};

/**
 * Get all available fallback images across all categories
 * Useful for displaying a gallery of options
 */
export const getAllFallbackImages = (): Record<string, string[]> => {
  return enhancedFallbackImages;
};

/**
 * Get a luxury salon image for premium listings
 * Returns a high-end salon interior image
 */
export const getLuxurySalonImage = (): string => {
  return getRandomImage(enhancedFallbackImages.luxury);
};

/**
 * Check if an image is from the luxury or designer collection
 * @param src Image source URL
 * @returns Boolean indicating if this is a premium image
 */
export const isPremiumImage = (src: string): boolean => {
  const premiumImages = [
    ...enhancedFallbackImages.luxury,
    ...enhancedFallbackImages.designerNail,
  ];
  
  return premiumImages.some(img => src.includes(img));
};

/**
 * Get a styled salon image specifically for nail services
 * Returns a designer nail salon image
 */
export const getDesignerNailSalonImage = (): string => {
  return getRandomImage(enhancedFallbackImages.designerNail);
};

/**
 * Get a tattoo studio image for PMU and tattoo artists
 */
export const getTattooStudioImage = (): string => {
  return getRandomImage(enhancedFallbackImages.tattoo);
};
