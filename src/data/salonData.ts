import { Job } from "@/types/job";

// Sample salon for sale listings
const salonData: Job[] = [
  {
    id: "101",
    role: "Salon Owner",
    company: "Elegant Nails & Spa",
    location: "Denver, CO",
    posted_at: "2023-12-01T10:00:00Z",
    created_at: "2023-12-01T10:00:00Z",
    description: "Established nail salon for sale in prime Denver location. 7 years in business with loyal clientele. Fully equipped with 8 manicure stations, 6 pedicure chairs, and 2 private treatment rooms. Current owner relocating out of state. Great opportunity for an experienced nail technician looking to own their own business.",
    for_sale: true,
    asking_price: "85000",
    number_of_stations: "8",
    square_feet: "1200",
    reason_for_selling: "Owner relocating",
    salon_features: ["High-end equipment", "Loyal clientele", "Prime location", "Parking available"],
    contact_info: {
      owner_name: "Jennifer Lee",
      phone: "(303) 555-1234",
      email: "jennifer@elegantnailsspa.com"
    },
    is_featured: true,
    status: "active"
  },
  {
    id: "102",
    role: "Salon Owner",
    company: "Luxe Beauty Lounge",
    location: "Miami, FL",
    posted_at: "2023-11-15T14:30:00Z",
    created_at: "2023-11-15T14:30:00Z",
    description: "Upscale beauty salon for sale in trendy Miami neighborhood. Established 5 years ago and has built a strong reputation for quality service. Fully equipped with 6 styling stations, 3 treatment rooms, and a dedicated nail area. Seller is retiring. Perfect opportunity for a stylist or entrepreneur looking to own a successful salon.",
    for_sale: true,
    asking_price: "120000",
    number_of_stations: "6",
    square_feet: "1500",
    reason_for_selling: "Owner retiring",
    salon_features: ["Upscale clientele", "Modern decor", "Full service salon", "Strong social media presence"],
    contact_info: {
      owner_name: "Carlos Rodriguez",
      phone: "(305) 555-6789",
      email: "carlos@luxebeautylounge.com"
    },
    is_featured: true,
    status: "active"
  },
  {
    id: "103",
    role: "Salon Owner",
    company: "Polished Nail Bar",
    location: "Charlotte, NC",
    posted_at: "2023-12-10T09:15:00Z",
    created_at: "2023-12-10T09:15:00Z",
    description: "Profitable nail salon for sale in busy shopping center. Established 3 years with growing clientele. Fully equipped with 5 manicure stations and 4 pedicure chairs. Current owner has other business interests. Great opportunity for a nail technician looking to be their own boss.",
    for_sale: true,
    asking_price: "65000",
    number_of_stations: "5",
    square_feet: "900",
    reason_for_selling: "Owner has other business interests",
    salon_features: ["High foot traffic", "Modern equipment", "Established clientele", "Recently renovated"],
    contact_info: {
      owner_name: "Michelle Kim",
      phone: "(704) 555-4321",
      email: "michelle@polishednailbar.com"
    },
    is_featured: false,
    status: "active"
  },
  {
    id: "104",
    role: "Salon Owner",
    company: "Glamour Hair Studio",
    location: "Seattle, WA",
    posted_at: "2023-10-05T11:45:00Z",
    created_at: "2023-10-05T11:45:00Z",
    description: "Well-established hair salon for sale in upscale Seattle neighborhood. 10 years in business with loyal clientele. Fully equipped with 8 styling stations and a dedicated color area. Current owner moving out of state. Perfect for an experienced stylist ready to own their own salon.",
    for_sale: true,
    asking_price: "95000",
    number_of_stations: "8",
    square_feet: "1300",
    reason_for_selling: "Owner relocating",
    salon_features: ["Premium location", "High-end clientele", "Established brand", "Fully staffed"],
    contact_info: {
      owner_name: "David Wilson",
      phone: "(206) 555-8765",
      email: "david@glamourhairstudio.com"
    },
    is_featured: false,
    status: "expired"
  },
  {
    id: "105",
    role: "Salon Owner",
    company: "Zen Day Spa",
    location: "Austin, TX",
    posted_at: "2023-11-20T13:00:00Z",
    created_at: "2023-11-20T13:00:00Z",
    description: "Profitable day spa for sale in growing Austin neighborhood. Established 4 years ago with excellent reputation. Includes 4 treatment rooms, relaxation area, and retail space. Current owner pursuing new career. Great opportunity for a licensed esthetician or massage therapist looking to own their own business.",
    for_sale: true,
    asking_price: "110000",
    number_of_stations: "4",
    square_feet: "1100",
    reason_for_selling: "Owner changing careers",
    salon_features: ["Relaxing atmosphere", "Loyal clientele", "Strong online presence", "Growing area"],
    contact_info: {
      owner_name: "Sarah Johnson",
      phone: "(512) 555-9876",
      email: "sarah@zendayspa.com"
    },
    is_featured: true,
    status: "active"
  }
];

export default salonData;
