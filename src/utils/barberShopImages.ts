
/**
 * Barber shop image utilities
 * This is a minimal replacement for the previously deleted file
 * to maintain compatibility with existing code that depends on it.
 */

// Define placeholder images for barber shops
export const BARBERSHOP_IMAGES = {
  premium1: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
  premium2: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
  premium3: "/lovable-uploads/ac31083b-3861-4851-99ac-ed1bc185c4d9.png",
  standard1: "/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png",
  standard2: "/lovable-uploads/7af46f7a-c8f1-497f-a8e6-271856b882eb.png",
  booth1: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png",
  job1: "/lovable-uploads/11d11587-a1b4-4f8f-a93b-b792a672b16b.png",
};

/**
 * Determines if a business is a barber shop based on its name and description
 */
export const isBarberShop = (name: string = "", description: string = ""): boolean => {
  const combinedText = (name + " " + description).toLowerCase();
  
  return (
    combinedText.includes("barber") ||
    combinedText.includes("barbershop") ||
    combinedText.includes("barbers") ||
    combinedText.includes("mens cut") ||
    combinedText.includes("men's cut") ||
    combinedText.includes("haircut for men")
  );
};

/**
 * Determines if a job listing is for a barber position
 */
export const isBarberJob = (job: any): boolean => {
  if (!job) return false;
  
  const title = (job.title || job.role || "").toLowerCase();
  const description = (job.description || "").toLowerCase();
  const company = (job.company || job.name || "").toLowerCase();
  
  const combinedText = title + " " + description + " " + company;
  
  return (
    combinedText.includes("barber") ||
    combinedText.includes("barbershop") ||
    combinedText.includes("barbers") ||
    combinedText.includes("mens cut") ||
    combinedText.includes("men's cut") ||
    combinedText.includes("haircut for men") ||
    combinedText.includes("shave") && combinedText.includes("hair")
  );
};

/**
 * Returns an appropriate barber shop image URL
 * @param isPremium Whether to use a premium image
 * @param isLuxury Whether to use a luxury image (subset of premium)
 */
export const getBarberShopImage = (isPremium: boolean = false, isLuxury: boolean = false): string => {
  if (isPremium) {
    return isLuxury ? BARBERSHOP_IMAGES.premium1 : BARBERSHOP_IMAGES.premium2;
  }
  return BARBERSHOP_IMAGES.standard1;
};

/**
 * Returns an appropriate barber booth image URL
 */
export const getBarberBoothImage = (): string => {
  return BARBERSHOP_IMAGES.booth1;
};

/**
 * Returns an appropriate barber job image URL
 */
export const getBarberJobImage = (): string => {
  return BARBERSHOP_IMAGES.job1;
};

/**
 * Returns a random barber shop image URL
 */
export const getRandomBarberShopImage = (): string => {
  const images = Object.values(BARBERSHOP_IMAGES);
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
