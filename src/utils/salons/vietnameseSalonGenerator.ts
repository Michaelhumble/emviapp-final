import { Job } from '@/types/job';

// Sample Vietnamese salon data for testing
export const sampleVietnameseSalon: Job = {
  id: "vietnamese-salon-1",
  title: "Salon Nail Việt Nam - Westminster, CA",
  role: "Salon for Sale",
  company: "Golden Nails & Spa",
  location: "Westminster, CA",
  posted_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  description: "Tiệm nail đông khách, vị trí đẹp, cần bán gấp.",
  vietnamese_description: "Salon nail Việt Nam tại Westminster, California. Vị trí đẹp, khách hàng thường xuyên.",
  for_sale: true,
  asking_price: "$180,000",
  number_of_stations: "12",
  square_feet: "1,800",
  reason_for_selling: "Di chuyển về Việt Nam",
  salon_features: ["Fully equipped", "Established clientele", "Prime location"],
  contact_info: {
    owner_name: "Chị Lan",
    phone: "(714) 555-0123",
    email: "contact@goldennails.com"
  },
  image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
  category: "Salon",
  specialties: ["Acrylic", "Gel", "Pedicure"]
};

export const basicVietnameseSalon: Job = {
  id: "basic-vietnamese-salon-1",
  title: "Tiệm Nail Cần Bán - Los Angeles",
  role: "Salon Owner",
  company: "LA Nails & Spa",
  location: "Los Angeles, CA",
  posted_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  description: "Salon nail cần bán, vị trí tốt.",
  for_sale: true,
  asking_price: "$150,000",
  number_of_stations: "10",
  square_feet: "1,500",
  reason_for_selling: "Nghỉ hưu",
  salon_features: ["Equipment included", "Good location"],
  contact_info: {
    owner_name: "Anh Minh",
    phone: "(323) 555-0456"
  },
  category: "Salon",
  specialties: ["Manicure", "Pedicure"]
};

export const generateVietnameseSalonSample = (): Job => {
  return {
    id: "vietnamese-salon-sample-1",
    title: "Salon Nail Việt Nam - Westminster, CA", // Added missing title
    role: "Salon for Sale",
    company: "Golden Nails & Spa",
    location: "Westminster, CA",
    posted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    description: "Tiệm nail đông khách, vị trí đẹp, cần bán gấp.",
    vietnamese_description: "Salon nail Việt Nam tại Westminster, California. Vị trí đẹp, khách hàng thường xuyên.",
    for_sale: true,
    asking_price: "$180,000",
    number_of_stations: "12",
    square_feet: "1,800",
    reason_for_selling: "Di chuyển về Việt Nam",
    salon_features: ["Fully equipped", "Established clientele", "Prime location"],
    contact_info: {
      owner_name: "Chị Lan",
      phone: "(714) 555-0123",
      email: "contact@goldennails.com"
    },
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Salon",
    specialties: ["Acrylic", "Gel", "Pedicure"]
  };
};

export const generateBasicVietnameseSalon = (): Job => {
  return {
    id: "basic-vietnamese-salon-1",
    title: "Tiệm Nail Cần Bán - Los Angeles", // Added missing title
    role: "Salon Owner",
    company: "LA Nails & Spa",
    location: "Los Angeles, CA",
    posted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    description: "Salon nail cần bán, vị trí tốt.",
    for_sale: true,
    asking_price: "$150,000",
    number_of_stations: "10",
    square_feet: "1,500",
    reason_for_selling: "Nghỉ hưu",
    salon_features: ["Equipment included", "Good location"],
    contact_info: {
      owner_name: "Anh Minh",
      phone: "(323) 555-0456"
    },
    category: "Salon",
    specialties: ["Manicure", "Pedicure"]
  };
};

// Helper functions for generating Vietnamese salon samples

// Get a random asking price for salon listings
const getRandomAskingPrice = () => {
  const prices = ["$120,000", "$150,000", "$180,000", "$200,000", "$250,000"];
  return prices[Math.floor(Math.random() * prices.length)];
};

// Get a random number of stations for salon listings
const getRandomNumberOfStations = () => {
  const stations = ["8", "10", "12", "14", "16"];
  return stations[Math.floor(Math.random() * stations.length)];
};

// Get a random square footage for salon listings
const getRandomSquareFeet = () => {
  const squareFeet = ["1,200", "1,500", "1,800", "2,000", "2,200"];
  return squareFeet[Math.floor(Math.random() * squareFeet.length)];
};

// Get random salon features for salon listings
const getRandomSalonFeatures = () => {
  const features = [
    ["Fully equipped", "Established clientele", "Prime location"],
    ["Equipment included", "Good location"],
    ["Modern decor", "High traffic area"],
    ["Spacious layout", "Ample parking"],
    ["Recently renovated", "Loyal customer base"]
  ];
  return features[Math.floor(Math.random() * features.length)];
};

export const generateVietnameseSalonSamples = () => {
  // Sample function to generate Vietnamese salon samples
  // Implementation will be added when needed
  return [];
};

export const generateVietnameseSalons = (count = 5) => {
  const salons = [];

  for (let i = 0; i < count; i++) {
    salons.push({
      asking_price: getRandomAskingPrice(),
      number_of_stations: getRandomNumberOfStations(),
      square_feet: getRandomSquareFeet(),
      salon_features: getRandomSalonFeatures(),
      category: "Salon"
    });
  }

  return salons;
};
