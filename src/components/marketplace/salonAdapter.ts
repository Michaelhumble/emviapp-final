import { Salon as AppSalon } from "@/types/salon";
import { Salon as MarketplaceSalon } from "@/components/marketplace/mockData";

// Convert a marketplace salon to the application salon type
export const marketplaceToAppSalon = (marketplaceSalon: MarketplaceSalon): AppSalon => {
  return {
    id: marketplaceSalon.id.toString(),
    name: marketplaceSalon.name,
    location: marketplaceSalon.location,
    price: marketplaceSalon.price,
    imageUrl: marketplaceSalon.image || "",
    description: typeof marketplaceSalon.description === 'object' 
      ? marketplaceSalon.description.en 
      : marketplaceSalon.description || "",
    // Add required properties from Salon type with appropriate defaults
    monthlyRent: marketplaceSalon.monthlyRent,
    staff: marketplaceSalon.staff,
    revenue: marketplaceSalon.revenue,
    willTrain: marketplaceSalon.willTrain,
    // If marketplace salon has Vietnamese description, add it
    vietnamese_description: typeof marketplaceSalon.description === 'object' 
      ? marketplaceSalon.description.vi 
      : undefined,
    // Add other required fields with defaults
    featured: marketplaceSalon.featured,
    is_vietnamese_listing: typeof marketplaceSalon.description === 'object' && !!marketplaceSalon.description.vi,
    // Adding images property to fix TypeScript error
    images: marketplaceSalon.images || (marketplaceSalon.image ? [marketplaceSalon.image] : []),
    // Keep image reference for backward compatibility
    image: marketplaceSalon.image
  };
};

// Convert app salons to marketplace format if needed for display
export const appToMarketplaceSalon = (appSalon: AppSalon): MarketplaceSalon => {
  return {
    id: parseInt(appSalon.id) || Math.floor(Math.random() * 10000),
    name: appSalon.name,
    location: appSalon.location,
    price: typeof appSalon.price === 'number' ? appSalon.price : parseInt(appSalon.price as string) || 0,
    // Marketplace specific fields with defaults
    monthlyRent: appSalon.monthlyRent || 0,
    staff: appSalon.staff || 0,
    revenue: appSalon.revenue || 0,
    willTrain: appSalon.willTrain || false,
    featured: appSalon.featured || false,
    image: appSalon.imageUrl || appSalon.image || "",
    images: appSalon.images || [],
    description: {
      en: appSalon.description || "",
      vi: appSalon.vietnamese_description || ""
    }
  };
};
