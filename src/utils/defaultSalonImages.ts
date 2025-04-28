
/**
 * Default Salon Images Library
 * 
 * This file manages the library of high-quality default salon images
 * that are used when a user doesn't upload their own image.
 */

// Define the default salon images paths (these are the images uploaded by the user)
export const defaultSalonImages = [
  "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png",
  "/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png", 
  "/lovable-uploads/4a455b85-c040-4be5-9557-b1e3b0040bf4.png",
  "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
  "/lovable-uploads/5f4b0b9e-d1c2-43ad-a85c-92c4b6c61441.png",
  "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
  "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
  "/lovable-uploads/755e1db4-6ea5-40c4-8007-81b8beba6e2b.png"
];

// Define category-specific image sets
export const salonImagesByCategory: Record<string, string[]> = {
  nail: [
    "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png",
    "/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png",
    "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png"
  ],
  hair: [
    "/lovable-uploads/4a455b85-c040-4be5-9557-b1e3b0040bf4.png",
    "/lovable-uploads/5f4b0b9e-d1c2-43ad-a85c-92c4b6c61441.png"
  ],
  spa: [
    "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png"
  ],
  barber: [
    "/lovable-uploads/755e1db4-6ea5-40c4-8007-81b8beba6e2b.png"
  ]
};

/**
 * Gets a random image from the default salon images library
 * based on the salon category if specified
 * 
 * @param category Optional salon category to get a category-specific image
 * @returns URL path to a default salon image
 */
export const getDefaultSalonImage = (category?: string): string => {
  // Get the appropriate image set based on category
  let imageSet = defaultSalonImages;
  
  if (category) {
    const normalizedCategory = category.toLowerCase();
    
    // Check for each category type
    if (normalizedCategory.includes('nail')) {
      imageSet = salonImagesByCategory.nail;
    } else if (normalizedCategory.includes('hair')) {
      imageSet = salonImagesByCategory.hair;
    } else if (normalizedCategory.includes('spa')) {
      imageSet = salonImagesByCategory.spa;
    } else if (normalizedCategory.includes('barber')) {
      imageSet = salonImagesByCategory.barber;
    }
  }
  
  // Get a random image from the selected image set
  const randomIndex = Math.floor(Math.random() * imageSet.length);
  return imageSet[randomIndex];
};

/**
 * Returns the appropriate image for a salon listing
 * If the provided imageUrl is valid, it returns that
 * Otherwise, it returns a default image based on salon category
 * 
 * @param imageUrl The custom image URL provided by the user
 * @param category Optional salon category
 * @returns The image URL to use
 */
export const getSalonImage = (imageUrl?: string, category?: string): string => {
  if (imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('placeholder')) {
    return imageUrl;
  }
  
  return getDefaultSalonImage(category);
};

