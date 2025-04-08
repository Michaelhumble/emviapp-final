
import { Job } from "@/types/job";

// Booth rental listings data
export const boothRentalListings = [
  {
    id: "br1",
    title: "Premium Booth Space Available",
    location: "Miami, FL",
    price: "$200/week",
    features: ["High Traffic Area", "Modern Equipment", "Flexible Hours"],
    contact_info: {
      owner_name: "Sarah Johnson",
      phone: "(305) 555-1234"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Rental",
    compensation_details: "$200 weekly"
  },
  {
    id: "br2",
    title: "Nail Station for Rent",
    location: "Atlanta, GA",
    price: "$180/week",
    features: ["Private Area", "Supply Storage", "Established Clientele"],
    contact_info: {
      owner_name: "Michael Chen",
      phone: "(404) 555-6789"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Rental",
    compensation_details: "$180 weekly"
  }
];

// Hair salon listings data
export const hairSalonListings = [
  {
    id: "hs1",
    title: "Stylist Position Available",
    location: "Los Angeles, CA",
    price: "Commission-based",
    features: ["Upscale Salon", "Product Discounts", "Training Provided"],
    contact_info: {
      owner_name: "Emma Roberts",
      phone: "(213) 555-2345"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Commission",
    compensation_details: "60% commission"
  },
  {
    id: "hs2",
    title: "Hair Stylist Wanted",
    location: "Chicago, IL",
    price: "$25-35/hour",
    features: ["Full-time", "Benefits Available", "Modern Salon"],
    contact_info: {
      owner_name: "David Wilson",
      phone: "(312) 555-7890"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Hourly",
    compensation_details: "$25-35/hour"
  }
];

// Barbershop listings data
export const barbershopListings = [
  {
    id: "bs1",
    title: "Barber Chair for Rent",
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
    compensation_type: "Rental",
    compensation_details: "$250 weekly"
  },
  {
    id: "bs2",
    title: "Master Barber Needed",
    location: "Philadelphia, PA",
    price: "Commission or Booth Rental",
    features: ["Established Shop", "Great Location", "Walk-ins Available"],
    contact_info: {
      owner_name: "Kevin Brown",
      phone: "(215) 555-8901"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Flexible",
    compensation_details: "Commission or booth rental options available"
  }
];

// Restaurant listings data
export const restaurantListings = [
  {
    id: "r1",
    title: "Restaurant For Sale",
    location: "San Francisco, CA",
    price: "$275,000",
    features: ["Prime Location", "Fully Equipped", "Established 10 Years"],
    contact_info: {
      owner_name: "Jennifer Lee",
      phone: "(415) 555-4567"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Sale",
    compensation_details: "$275,000 asking price"
  },
  {
    id: "r2",
    title: "Restaurant Space for Lease",
    location: "Austin, TX",
    price: "$4,500/month",
    features: ["High Traffic Area", "Move-in Ready", "Large Dining Space"],
    contact_info: {
      owner_name: "Robert Garcia",
      phone: "(512) 555-9012"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Lease",
    compensation_details: "$4,500 monthly"
  }
];

// Tattoo shop listings data
export const tattooShopListings = [
  {
    id: "ts1",
    title: "Tattoo Artist Position",
    location: "Seattle, WA",
    price: "50% Commission",
    features: ["Award-Winning Shop", "Central Location", "Established Clientele"],
    contact_info: {
      owner_name: "Alex Turner",
      phone: "(206) 555-5678"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Commission",
    compensation_details: "50% commission"
  },
  {
    id: "ts2",
    title: "Tattoo Shop For Sale",
    location: "Portland, OR",
    price: "$150,000",
    features: ["Turnkey Operation", "Loyal Customer Base", "All Equipment Included"],
    contact_info: {
      owner_name: "Samantha Miller",
      phone: "(503) 555-0123"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Sale",
    compensation_details: "$150,000 asking price"
  }
];

// Nail salon listings data
export const nailSalonListings = [
  {
    id: "ns1",
    title: "Nail Technician Needed",
    location: "Denver, CO",
    price: "$800-1200/week",
    features: ["Busy Salon", "Great Tips", "Flexible Hours"],
    contact_info: {
      owner_name: "Linda Nguyen",
      phone: "(303) 555-6789"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Weekly",
    compensation_details: "$800-1200/week"
  },
  {
    id: "ns2",
    title: "Nail Salon For Sale",
    location: "San Diego, CA",
    price: "$120,000",
    features: ["Prime Location", "Established 8 Years", "10 Stations"],
    contact_info: {
      owner_name: "Kim Lee",
      phone: "(619) 555-1234"
    },
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Sale",
    compensation_details: "$120,000 asking price"
  }
];
