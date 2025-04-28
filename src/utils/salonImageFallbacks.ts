
const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

export type SalonCategory = keyof typeof salonFallbackImages;

export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  return salonFallbackImages[category] || salonFallbackImages.beauty;
};

export const fallbackImage = salonFallbackImages.beauty;
