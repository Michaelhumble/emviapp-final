import { useState, useCallback, useMemo } from 'react';

// Images from the nails bucket in Supabase
const NAIL_IMAGES = [
  "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
  "/lovable-uploads/955feb1d-3a31-4a0e-b6b2-44f8240519c1.png",
  "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
  "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
  "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
  "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
  "/lovable-uploads/6e6289a0-0f43-4a7e-8517-ba5aadbbf872.png",
  "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
  "/lovable-uploads/f2fa8004-6611-4006-9c47-23797d750523.png",
  "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
  "/lovable-uploads/5f0aa367-9d6b-448b-83d8-021e4cb082af.png",
  "/lovable-uploads/7fa90fdd-d4e6-4d07-9d3b-b00811006d23.png",
  "/lovable-uploads/ac31083b-3861-4851-99ac-ed1bc185c4d9.png",
  "/lovable-uploads/c1533abd-8de5-4ec3-8ee5-868538a5d6dd.png",
  "/lovable-uploads/fd1aa5a5-543c-4bb3-901b-12abeddb24a6.png",
  "/lovable-uploads/f575cfa2-98b5-4a1e-910c-acbc69a3736d.png",
  "/lovable-uploads/fe0bd314-25aa-4296-bf38-80dddf69b992.png",
  "/lovable-uploads/b1c1466d-1f17-43c4-9f63-16adf1d1a6c1.png",
  "/lovable-uploads/cd91684d-63c1-444f-baea-5814694edf50.png"
];

// A mapping of categories to their default images
const CATEGORY_DEFAULTS = {
  nail: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
  hair: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
  barber: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
  salon: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
  default: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png"
};

/**
 * Custom hook for managing random non-repeating images from the nails bucket
 */
export const useRandomNailImages = () => {
  // Keep track of which images have been used
  const [usedImages, setUsedImages] = useState<Set<string>>(new Set());
  
  // Store a mapping of entity IDs to their assigned images
  const [imageAssignments, setImageAssignments] = useState<Record<string, string>>({});
  
  // Initialize the available images pool
  const availableImages = useMemo(() => {
    return NAIL_IMAGES.filter(img => !usedImages.has(img));
  }, [usedImages]);
  
  /**
   * Get a random image that hasn't been used yet
   * If all images have been used, start over from the beginning
   */
  const getRandomImage = useCallback((entityId: string, category?: string): string => {
    // If this entity already has an assigned image, return it
    if (imageAssignments[entityId]) {
      return imageAssignments[entityId];
    }
    
    // If we still have unused images, pick one randomly
    if (availableImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages[randomIndex];
      
      // Mark this image as used and assign it to this entity
      setUsedImages(prev => new Set([...prev, selectedImage]));
      setImageAssignments(prev => ({...prev, [entityId]: selectedImage}));
      
      return selectedImage;
    } 
    
    // If we've used all images, reset and start over
    if (usedImages.size >= NAIL_IMAGES.length) {
      const randomIndex = Math.floor(Math.random() * NAIL_IMAGES.length);
      const selectedImage = NAIL_IMAGES[randomIndex];
      
      setImageAssignments(prev => ({...prev, [entityId]: selectedImage}));
      return selectedImage;
    }
    
    // Fallback to a category default or the general default
    return CATEGORY_DEFAULTS[category as keyof typeof CATEGORY_DEFAULTS] || CATEGORY_DEFAULTS.default;
  }, [availableImages, imageAssignments, usedImages]);
  
  /**
   * Reset the used images tracker
   */
  const resetUsedImages = useCallback(() => {
    setUsedImages(new Set());
    setImageAssignments({});
  }, []);
  
  return { getRandomImage, resetUsedImages };
};

// Helper function to get a random image from the nails bucket
export const getRandomNailImage = (): string => {
  const randomIndex = Math.floor(Math.random() * NAIL_IMAGES.length);
  return NAIL_IMAGES[randomIndex];
};

// Function to assign images to entities with consistent mapping
export const assignImagesToEntities = <T extends { id: string | number }>(
  entities: T[], 
  preserveFirst: boolean = true
): T[] => {
  // Track used images to avoid duplicates
  const usedImages = new Set<string>();
  // Map of entity IDs to assigned images
  const assignments: Record<string, string> = {};
  
  // Helper function to get the next unused random image
  const getNextImage = (): string => {
    // If all images are used, reset
    if (usedImages.size >= NAIL_IMAGES.length) {
      usedImages.clear();
    }
    
    // Find an unused image
    let image: string;
    do {
      const randomIndex = Math.floor(Math.random() * NAIL_IMAGES.length);
      image = NAIL_IMAGES[randomIndex];
    } while (usedImages.has(image));
    
    usedImages.add(image);
    return image;
  };
  
  // Map through entities and assign images
  return entities.map((entity, index) => {
    // If preserveFirst is true and this is the first entity, keep its existing image
    if (preserveFirst && index === 0) {
      return entity;
    }
    
    const id = entity.id.toString();
    
    // If this entity already has an assigned image, use it
    if (assignments[id]) {
      return {...entity, image: assignments[id]};
    }
    
    // Otherwise get a new image and assign it
    const image = getNextImage();
    assignments[id] = image;
    
    return {...entity, image};
  });
};

export default { NAIL_IMAGES, getRandomNailImage, assignImagesToEntities };
