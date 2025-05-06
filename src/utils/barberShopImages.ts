
/**
 * DEPRECATED: Barber shop image utilities
 * This is a minimal replacement for the previously deleted file
 * to maintain compatibility with existing code that depends on it.
 */

// Define placeholder for barber shop images
export const BARBERSHOP_IMAGES = {
  // Using generic fallback images
  premium1: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  premium2: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  premium3: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  standard1: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  standard2: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  booth1: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  job1: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png"
};

/**
 * DEPRECATED: Determines if a business is a barber shop
 * Always returns false as barber functionality is removed
 */
export const isBarberShop = (): boolean => {
  return false;
};

/**
 * DEPRECATED: Determines if a job listing is for a barber position
 * Always returns false as barber functionality is removed
 */
export const isBarberJob = (jobOrTitle: any, description?: string): boolean => {
  return false;
};

/**
 * DEPRECATED: Returns a generic image URL
 */
export const getBarberShopImage = (): string => {
  return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
};

/**
 * DEPRECATED: Returns a generic image URL
 */
export const getBarberBoothImage = (): string => {
  return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
};

/**
 * DEPRECATED: Returns a generic image URL
 */
export const getBarberJobImage = (): string => {
  return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
};

/**
 * DEPRECATED: Returns a generic image URL
 */
export const getRandomBarberShopImage = (): string => {
  return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
};
