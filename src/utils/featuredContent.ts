
import { Salon } from "@/types/salon";
import { Job } from "@/types/job";
import { getRandomCategoryImage } from "./salonImageFallbacks";

/**
 * Get featured salons for display on the home page and other areas
 */
export const getFeaturedSalons = (count: number = 3): Salon[] => {
  const featuredSalons: Salon[] = [
    {
      id: "salon-1",
      name: "Luxe Beauty Salon",
      location: "Miami, FL",
      city: "Miami",
      price: 350000,
      rating: 4.9,
      reviewCount: 124,
      specialty: "Full Service Salon",
      description: "Luxury salon with high-end clientele and premium service offerings.",
      category: "luxury",
      isPremium: true,
      image: "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png",
      isHiring: true,
      imageUrl: "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png",
      features: ["10 stations", "5 pedicure chairs", "High-end clientele"]
    },
    {
      id: "salon-2",
      name: "Pink Nail Studio",
      location: "Los Angeles, CA",
      city: "Los Angeles",
      price: 250000,
      rating: 4.8,
      reviewCount: 86,
      specialty: "Nail Spa",
      description: "Premium nail salon specializing in custom nail art and luxurious treatments.",
      category: "nail",
      isPremium: true,
      image: "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
      isHiring: true,
      imageUrl: "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
      features: ["8 stations", "6 pedicure chairs", "Nail art specialists"]
    },
    {
      id: "salon-3",
      name: "The Hair Atelier",
      location: "New York, NY",
      city: "New York",
      price: 400000,
      rating: 5.0,
      reviewCount: 143,
      specialty: "Hair Styling",
      description: "Upscale hair salon with award-winning stylists and colorists.",
      category: "hair",
      isPremium: true,
      image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
      isHiring: true,
      imageUrl: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
      features: ["12 stations", "Color bar", "VIP treatment rooms"]
    },
    {
      id: "salon-4",
      name: "Modern Barber Co.",
      location: "Chicago, IL",
      city: "Chicago",
      price: 300000,
      rating: 4.7,
      reviewCount: 98,
      specialty: "Barbershop",
      description: "Contemporary barbershop offering premium men's grooming services.",
      category: "barber",
      isPremium: true,
      image: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      isHiring: false,
      imageUrl: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      features: ["8 chairs", "Beard services", "Traditional hot towel treatments"]
    },
    {
      id: "salon-5",
      name: "Serenity Day Spa",
      location: "Seattle, WA",
      city: "Seattle",
      price: 375000,
      rating: 4.9,
      reviewCount: 107,
      specialty: "Spa & Wellness",
      description: "Luxury day spa offering comprehensive wellness and relaxation treatments.",
      category: "spa",
      isPremium: true,
      image: "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png",
      isHiring: true,
      imageUrl: "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png",
      features: ["5 treatment rooms", "Steam room", "Relaxation lounge"]
    }
  ];
  
  return featuredSalons.slice(0, count);
};

/**
 * Get salons for sale to display on the home page and marketplace
 */
export const getSalonsForSale = (count: number = 4): Job[] => {
  const salonsForSale: Job[] = [
    {
      id: "1",
      title: "Established Nail Salon for Sale",
      company: "Prestige Nail Spa",
      location: "Miami, FL",
      description: "Well-established nail salon with 10 years in business. Premium location with high foot traffic.",
      for_sale: true,
      asking_price: "275000",
      salon_features: ["8 stations", "6 pedicure chairs", "2 treatment rooms"],
      image: "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
      created_at: new Date().toISOString(),
      salon_type: "Nail",
      is_featured: true,
      status: "active"
    },
    {
      id: "2",
      title: "Luxury Hair Salon in Prime Location",
      company: "Mane Attraction",
      location: "Los Angeles, CA",
      description: "Upscale hair salon in prime shopping district. Fully equipped with high-end fixtures and equipment.",
      for_sale: true,
      asking_price: "420000",
      salon_features: ["12 stations", "4 washing stations", "VIP styling room"],
      image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
      created_at: new Date().toISOString(),
      salon_type: "Hair",
      is_featured: true,
      status: "active"
    },
    {
      id: "3",
      title: "Modern Barbershop - Turnkey Business",
      company: "Edge Cuts",
      location: "Austin, TX",
      description: "Contemporary barbershop with strong social media presence and loyal clientele. All equipment included.",
      for_sale: true,
      asking_price: "180000",
      salon_features: ["6 chairs", "Beard grooming station", "Retail area"],
      image: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      created_at: new Date().toISOString(),
      salon_type: "Barber",
      status: "active"
    },
    {
      id: "4",
      title: "Full-Service Beauty Salon",
      company: "Total Beauty Experience",
      location: "Chicago, IL",
      description: "Comprehensive beauty salon offering nail, hair, and skincare services. Established clientele and excellent reputation.",
      for_sale: true,
      asking_price: "350000",
      salon_features: ["10 stations", "5 pedicure chairs", "3 treatment rooms", "Retail area"],
      image: "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png",
      created_at: new Date().toISOString(),
      salon_type: "Full-Service",
      status: "active"
    },
    {
      id: "5",
      title: "Upscale Day Spa with Loyal Clientele",
      company: "Tranquility Spa & Wellness",
      location: "Denver, CO",
      description: "Luxury day spa with comprehensive wellness services and premium product lines.",
      for_sale: true,
      asking_price: "390000",
      salon_features: ["6 treatment rooms", "Sauna", "Relaxation lounge", "Retail boutique"],
      image: "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png",
      created_at: new Date().toISOString(),
      salon_type: "Spa",
      status: "active"
    }
  ];
  
  return salonsForSale.slice(0, count);
};

/**
 * Get available booth rentals to display
 */
export const getAllBooths = (): Job[] => {
  return [
    {
      id: "booth-1",
      title: "Premium Nail Station Available",
      company: "Luxe Beauty Salon",
      location: "Miami, FL",
      description: "Luxurious nail station available in our high-end salon. Includes access to premium products and amenities.",
      compensation_details: "$250/week",
      image: "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
      created_at: new Date().toISOString(),
      specialties: ["Nail", "Manicure", "Pedicure"],
      status: "active"
    },
    {
      id: "booth-2",
      title: "Hair Stylist Chair Rental",
      company: "Mane Attraction",
      location: "Los Angeles, CA",
      description: "Fully equipped styling station in busy upscale salon. Great opportunity for established stylists.",
      compensation_details: "$300/week",
      image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
      created_at: new Date().toISOString(),
      specialties: ["Hair", "Color", "Styling"],
      status: "active"
    },
    {
      id: "booth-3",
      title: "Barber Chair Available",
      company: "Edge Cuts",
      location: "Austin, TX",
      description: "Modern barbershop with strong social media presence seeking experienced barbers to rent chair.",
      compensation_details: "$225/week",
      image: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      created_at: new Date().toISOString(),
      specialties: ["Barber", "Men's Cuts", "Beard"],
      status: "active"
    },
    {
      id: "booth-4",
      title: "Spa Treatment Room for Rent",
      company: "Tranquility Spa",
      location: "Denver, CO",
      description: "Private treatment room available in established day spa. Perfect for esthetician, massage therapist, or lash artist.",
      compensation_details: "$350/week",
      image: "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png",
      created_at: new Date().toISOString(),
      specialties: ["Spa", "Facial", "Massage", "Lashes"],
      status: "active"
    },
    {
      id: "booth-5",
      title: "Nail Station in Busy Location",
      company: "Top Nails & Spa",
      location: "Chicago, IL",
      description: "Well-established nail salon with high foot traffic seeking nail technicians. Great income potential.",
      compensation_details: "$200/week or commission",
      image: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
      created_at: new Date().toISOString(),
      specialties: ["Nail", "Manicure", "Pedicure", "Nail Art"],
      status: "active"
    },
    {
      id: "booth-6",
      title: "Luxury Chair Rental for Stylist",
      company: "Uptown Hair Studio",
      location: "New York, NY",
      description: "High-end salon in Manhattan seeking experienced stylists. Strong walk-in clientele and referral network.",
      compensation_details: "$400/week",
      image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
      created_at: new Date().toISOString(),
      specialties: ["Hair", "Color", "Cutting", "Styling"],
      status: "active"
    }
  ];
};

/**
 * Utility function to fetch a job by ID
 */
export const fetchJob = async (id: string): Promise<Job> => {
  // In a real app, this would fetch from an API
  // For now, combine all our content sources to find the matching job
  
  const allSalonsForSale = getSalonsForSale(100);
  const allBooths = getAllBooths();
  
  // Combine all possible listings
  const allListings = [...allSalonsForSale, ...allBooths];
  
  // Find the matching listing
  const foundListing = allListings.find(listing => listing.id === id);
  
  if (!foundListing) {
    throw new Error(`Job with ID ${id} not found`);
  }
  
  // Add appropriate images based on listing type if none exists
  if (!foundListing.image) {
    if (foundListing.for_sale) {
      const salonCategory = foundListing.salon_type?.toLowerCase().includes('nail') ? 'nail' :
        foundListing.salon_type?.toLowerCase().includes('hair') ? 'hair' :
        foundListing.salon_type?.toLowerCase().includes('barber') ? 'barber' : 
        foundListing.salon_type?.toLowerCase().includes('spa') ? 'spa' : 'beauty';
      
      foundListing.image = getRandomCategoryImage(salonCategory as any);
    } else {
      // Determine image based on specialties
      const hasNail = foundListing.specialties?.some(s => s.toLowerCase().includes('nail'));
      const hasHair = foundListing.specialties?.some(s => s.toLowerCase().includes('hair'));
      const hasBarber = foundListing.specialties?.some(s => s.toLowerCase().includes('barber'));
      const hasSpa = foundListing.specialties?.some(s => s.toLowerCase().includes('spa'));
      
      if (hasNail) {
        foundListing.image = getRandomCategoryImage('nail');
      } else if (hasHair) {
        foundListing.image = getRandomCategoryImage('hair');
      } else if (hasBarber) {
        foundListing.image = getRandomCategoryImage('barber');
      } else if (hasSpa) {
        foundListing.image = getRandomCategoryImage('spa');
      } else {
        foundListing.image = getRandomCategoryImage('beauty');
      }
    }
  }
  
  return foundListing;
};
