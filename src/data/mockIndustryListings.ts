
import { Job } from "@/types/job";

// Booth rental listings data
export const boothRentalListings = [
  {
    id: "br1",
    title: "Premium Booth Space Available",
    company: "Kim's Nail & Spa",
    location: "Westminster, CA",
    price: "$200/week",
    features: ["High Traffic Area", "Modern Equipment", "Flexible Hours"],
    contact_info: {
      owner_name: "Sarah Johnson",
      phone: "(305) 555-1234"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Booth Rental",
    compensation_details: "$200 weekly",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Nails", "Pedicure"]
  },
  {
    id: "br2",
    title: "Nail Station for Rent",
    company: "Anh Salon",
    location: "San Diego, CA",
    price: "$180/week",
    features: ["Private Area", "Supply Storage", "Established Clientele"],
    contact_info: {
      owner_name: "Michael Chen",
      phone: "(404) 555-6789"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Booth Rental",
    compensation_details: "$180 weekly",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Nails", "Gel"]
  }
];

// Hair salon listings data
export const hairSalonListings = [
  {
    id: "hs1",
    title: "Stylist Position Available",
    company: "Style & Snip",
    location: "Portland, OR",
    price: "Commission-based",
    features: ["Upscale Salon", "Product Discounts", "Training Provided"],
    contact_info: {
      owner_name: "Emma Roberts",
      phone: "(213) 555-2345"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Commission",
    compensation_details: "60% commission",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Hair", "Styling"]
  },
  {
    id: "hs2",
    title: "Hair Stylist Wanted",
    company: "Bloom Beauty Lounge",
    location: "San Diego, CA",
    price: "$25-35/hour",
    features: ["Full-time", "Benefits Available", "Modern Salon"],
    contact_info: {
      owner_name: "David Wilson",
      phone: "(312) 555-7890"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Hourly",
    compensation_details: "$25-35/hour",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Hair", "Color"]
  }
];

// Barbershop listings data
export const barbershopListings = [
  {
    id: "bs1",
    title: "Barber Chair for Rent",
    company: "CleanFade Studio",
    location: "Brooklyn, NY",
    price: "$250/week",
    features: ["High-End Clientele", "Fully Equipped", "Flexible Schedule"],
    contact_info: {
      owner_name: "Marcus Johnson",
      phone: "(718) 555-3456"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Booth Rental",
    compensation_details: "$250 weekly",
    image: "https://images.unsplash.com/photo-1622288432207-901328f66ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Barber", "Fade"]
  },
  {
    id: "bs2",
    title: "Master Barber Needed",
    company: "Fresh Cut Barbers",
    location: "Chicago, IL",
    price: "Commission or Booth Rental",
    features: ["Established Shop", "Great Location", "Walk-ins Available"],
    contact_info: {
      owner_name: "Kevin Brown",
      phone: "(215) 555-8901"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Flexible",
    compensation_details: "Commission or booth rental options available",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Barber", "Beard"]
  }
];

// Restaurant listings data
export const restaurantListings = [
  {
    id: "r1",
    title: "Restaurant For Sale",
    company: "Pho 88",
    location: "San Jose, CA",
    price: "$275,000",
    features: ["Prime Location", "Fully Equipped", "Established 10 Years"],
    contact_info: {
      owner_name: "Jennifer Lee",
      phone: "(415) 555-4567"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "For Sale",
    compensation_details: "$275,000 asking price",
    image: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Established Vietnamese restaurant in prime San Jose location. Fully equipped with loyal clientele."
  },
  {
    id: "r2",
    title: "Front Staff Wanted",
    company: "Zebra Thai Kitchen",
    location: "Orange County, CA",
    price: "$15-18/hour plus tips",
    features: ["High Traffic Area", "Great Team", "Flexible Hours"],
    contact_info: {
      owner_name: "Robert Garcia",
      phone: "(512) 555-9012"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Part-Time",
    compensation_details: "$15-18/hour plus tips",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Popular Thai restaurant seeking friendly staff for front-of-house positions."
  }
];

// Tattoo shop listings data
export const tattooShopListings = [
  {
    id: "t1",
    title: "Tattoo Studio For Sale",
    company: "Tattoo & Glow",
    location: "Miami, FL",
    price: "$190,000",
    features: ["Turnkey Business", "Popular Location", "Established Clientele"],
    contact_info: {
      owner_name: "Alex Rodriguez",
      phone: "(305) 555-7654"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "For Sale",
    compensation_details: "$190,000 asking price",
    image: "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Well-established tattoo studio in Miami with loyal clientele. Owner retiring."
  },
  {
    id: "t2",
    title: "Booth for Tattoo Artist",
    company: "Ink House Tattoo",
    location: "Denver, CO",
    price: "$200/week",
    features: ["Private Area", "High Foot Traffic", "Marketing Support"],
    contact_info: {
      owner_name: "Samantha Lee",
      phone: "(720) 555-1234"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Booth Rental",
    compensation_details: "$200/week",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Modern tattoo studio offering booth rental for experienced tattoo artists."
  }
];

// Nail salon listings data
export const nailSalonListings = [
  {
    id: "ns1",
    title: "Nail Salon For Sale",
    company: "Modern Nails",
    location: "Atlanta, GA",
    price: "$230,000",
    features: ["Prime Location", "10 Stations", "Established 8 Years"],
    contact_info: {
      owner_name: "Tina Nguyen",
      phone: "(404) 555-9876"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "For Sale",
    compensation_details: "$230,000 asking price",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Well-established nail salon in high-traffic Atlanta location. Owner retiring soon."
  },
  {
    id: "ns2",
    title: "Nail Technicians Needed",
    company: "Luxe Polish",
    location: "Houston, TX",
    price: "Commission (60%)",
    features: ["Flexible Hours", "High Client Volume", "Training Available"],
    contact_info: {
      owner_name: "Jessica Pham",
      phone: "(713) 555-5432"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Commission",
    compensation_details: "60% commission",
    image: "https://images.unsplash.com/photo-1631214528203-b6e20b68efa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Busy Houston nail salon seeking part-time nail artists. Experience preferred but will train the right candidates."
  }
];

// Boba shop listings
export const bobaShopListings = [
  {
    id: "bs1",
    title: "Boba Shop Staff Needed",
    company: "Tea+ Boba",
    location: "Dallas, TX",
    price: "$14-16/hour",
    features: ["Flexible Schedule", "Fun Environment", "Employee Discounts"],
    contact_info: {
      owner_name: "Lily Chen",
      phone: "(214) 555-7890"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Part-Time",
    compensation_details: "$14-16/hour",
    image: "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Popular boba tea shop seeking friendly staff. No experience necessary, will train."
  },
  {
    id: "bs2",
    title: "Cashier + Prep Crew",
    company: "Sip & Chat Boba",
    location: "Fresno, CA",
    price: "$15/hour + tips",
    features: ["Part-Time", "Weekend Hours", "Growth Opportunities"],
    contact_info: {
      owner_name: "Nathan Wong",
      phone: "(559) 555-3456"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    employment_type: "Part-Time",
    compensation_details: "$15/hour + tips",
    image: "https://images.unsplash.com/photo-1558857563-c0c6ee0854fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Growing boba shop hiring enthusiastic team members for cashier and drink preparation positions."
  }
];
