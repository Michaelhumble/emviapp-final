import { Salon } from "@/types/salon";

export const sampleSalons: Salon[] = [
  {
    id: "salon-1",
    name: "Luxe Nails & Spa",
    location: "Beverly Hills, CA",
    price: 350000,
    imageUrl: "",
    description: "Premium nail salon in high-end location with loyal clientele",
    features: ["6 nail stations", "3 pedicure chairs", "Private waxing room"],
    square_feet: 1200,
    monthly_rent: 3800,
    featured: true,
    category: "nail",
    isPremium: true,
    city: "Beverly Hills",
    neighborhood: "Golden Triangle",
    rating: 4.9,
    reviewCount: 243,
    specialty: "Nail Art",
    services: ["Manicure", "Pedicure", "Gel", "Nail Art", "Waxing"],
    isHiring: true,
    contact_info: {
      owner_name: "Lisa Nguyen",
      phone: "(310) 555-1234",
      email: "luxenails@example.com"
    },
    created_at: "2023-05-15T14:30:00Z"
  },
  {
    id: "salon-2",
    name: "Modern Hair Studio",
    location: "West Hollywood, CA",
    price: 420000,
    imageUrl: "",
    description: "Contemporary hair salon with celebrity clientele and top stylists",
    features: ["8 styling stations", "3 washing stations", "Lounge area"],
    square_feet: 1600,
    monthly_rent: 4500,
    featured: true,
    category: "hair",
    isPremium: true,
    city: "West Hollywood",
    rating: 4.8,
    reviewCount: 187,
    specialty: "Color Treatments",
    services: ["Haircuts", "Color", "Balayage", "Extensions", "Treatments"],
    contact_info: {
      owner_name: "Michael Torres",
      phone: "(323) 555-6789",
      email: "info@modernhairstudio.com"
    },
    created_at: "2023-07-22T11:15:00Z"
  },
  {
    id: "salon-3",
    name: "Elegant Spa & Beauty",
    location: "Santa Monica, CA",
    price: 550000,
    imageUrl: "",
    description: "Full-service luxury spa and beauty center near the beach",
    features: ["4 treatment rooms", "3 nail stations", "2 hair stations", "Sauna"],
    square_feet: 2200,
    monthly_rent: 6800,
    featured: true,
    category: "spa",
    isPremium: true,
    city: "Santa Monica",
    neighborhood: "Ocean Avenue",
    rating: 4.7,
    reviewCount: 329,
    specialty: "Facial Treatments",
    services: ["Massage", "Facials", "Body Treatments", "Nails", "Hair", "Makeup"],
    contact_info: {
      owner_name: "Sarah Johnson",
      phone: "(424) 555-9876",
      email: "contact@elegantspa.com"
    },
    created_at: "2023-03-10T09:45:00Z"
  },
  {
    id: "salon-4",
    name: "Classic Barber Shop",
    location: "Downtown Los Angeles, CA",
    price: 280000,
    imageUrl: "",
    description: "Traditional barber shop with modern twists and loyal clientele",
    features: ["6 barber chairs", "Waiting area", "Beverage service"],
    square_feet: 1100,
    monthly_rent: 3200,
    category: "beauty",
    city: "Los Angeles",
    neighborhood: "Downtown",
    rating: 4.8,
    reviewCount: 412,
    specialty: "Classic Cuts",
    services: ["Haircuts", "Hot Shaves", "Beard Trims", "Styling"],
    contact_info: {
      owner_name: "James Wilson",
      phone: "(213) 555-3456",
      email: "info@classicbarber.com"
    },
    created_at: "2023-09-05T15:20:00Z"
  },
  {
    id: "salon-5",
    name: "Zen Day Spa",
    location: "Pasadena, CA",
    price: 390000,
    imageUrl: "",
    description: "Tranquil day spa focusing on holistic wellness and relaxation",
    features: ["5 treatment rooms", "Meditation space", "Steam room"],
    square_feet: 1800,
    monthly_rent: 4200,
    category: "spa",
    city: "Pasadena",
    rating: 4.6,
    reviewCount: 276,
    specialty: "Holistic Treatments",
    services: ["Massage", "Facials", "Body Scrubs", "Aromatherapy", "Reflexology"],
    contact_info: {
      owner_name: "Emily Chen",
      phone: "(626) 555-7890",
      email: "relax@zendayspa.com"
    },
    created_at: "2023-06-18T13:10:00Z"
  },
  {
    id: "salon-6",
    name: "Polished Nail Boutique",
    location: "Manhattan Beach, CA",
    price: 320000,
    imageUrl: "",
    description: "Upscale nail boutique specializing in organic products and custom designs",
    features: ["8 nail stations", "4 pedicure chairs", "Outdoor patio"],
    square_feet: 1400,
    monthly_rent: 5100,
    category: "nail",
    city: "Manhattan Beach",
    rating: 4.9,
    reviewCount: 198,
    specialty: "Organic Nail Care",
    services: ["Manicure", "Pedicure", "Gel", "Dipping Powder", "Nail Art"],
    contact_info: {
      owner_name: "Sophia Lee",
      phone: "(310) 555-4321",
      email: "hello@polishednail.com"
    },
    created_at: "2023-08-30T10:45:00Z"
  },
  {
    id: "salon-7",
    name: "Glow Beauty Bar",
    location: "Studio City, CA",
    price: 275000,
    imageUrl: "",
    description: "Modern beauty bar offering quick services for busy professionals",
    features: ["4 makeup stations", "3 brow stations", "2 lash stations"],
    square_feet: 950,
    monthly_rent: 3000,
    category: "beauty",
    city: "Studio City",
    rating: 4.7,
    reviewCount: 163,
    specialty: "Makeup & Lashes",
    services: ["Makeup", "Lash Extensions", "Brow Shaping", "Brow Tinting", "Facials"],
    contact_info: {
      owner_name: "Olivia Martinez",
      phone: "(818) 555-2345",
      email: "info@glowbeautybar.com"
    },
    created_at: "2023-10-12T16:30:00Z"
  },
  {
    id: "salon-8",
    name: "The Color Studio",
    location: "Culver City, CA",
    price: 360000,
    imageUrl: "",
    description: "Specialized hair color studio with award-winning colorists",
    features: ["6 styling stations", "Color mixing bar", "Education area"],
    square_feet: 1300,
    monthly_rent: 3900,
    category: "hair",
    city: "Culver City",
    rating: 4.8,
    reviewCount: 241,
    specialty: "Hair Color",
    services: ["Color", "Balayage", "Highlights", "Color Correction", "Ombré"],
    contact_info: {
      owner_name: "Daniel Rodriguez",
      phone: "(310) 555-8765",
      email: "hello@thecolorstudio.com"
    },
    created_at: "2023-04-25T14:05:00Z"
  }
];

// Export vietnameseSalonListings too to keep them available
export { vietnameseSalonListings } from './vietnameseSalonListings';
