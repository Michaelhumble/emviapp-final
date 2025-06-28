

import { Job } from '@/types/job';

// Sample Vietnamese salon sale for testing
export const sampleVietnameseSalonSale: Job = {
  id: "vietnamese-sample-sale-1",
  title: "Tiệm Nail Cần Bán Gấp",
  role: "Salon For Sale",
  company: "Golden Nails Spa",
  location: "Westminster, CA",
  posted_at: "2024-01-15T10:00:00Z",
  created_at: "2024-01-15T10:00:00Z",
  description: "Well-established nail salon for sale in busy Westminster location.",
  vietnamese_description: "Tiệm nail đã hoạt động lâu năm cần bán tại Westminster. Vị trí đông khách, doanh thu ổn định.",
  for_sale: true,
  asking_price: "$85,000",
  number_of_stations: "8 stations",
  square_feet: "1,200 sq ft",
  monthly_rent: "$4,500",
  image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
  contact_info: {
    phone: "(714) 555-9876",
    owner_name: "Anh Nguyen"
  },
  is_vietnamese_listing: true,
  category: "Salon Sale",
  employment_type: "Business Sale",
  specialties: ["Acrylic", "Gel", "Pedicure", "Nail Art"]
};

// Helper functions for generating Vietnamese salon sales samples

// Get a random asking price for salon sales
const getRandomAskingPrice = () => {
  const prices = [
    "$80,000",
    "$120,000",
    "$95,000",
    "$110,000",
    "$75,000"
  ];
  return prices[Math.floor(Math.random() * prices.length)];
};

// Get random lease terms for salon sales
const getRandomLeaseTerms = () => {
  const terms = [
    "5 years remaining",
    "3 years remaining",
    "7 years remaining",
    "4 years remaining",
    "6 years remaining"
  ];
  return terms[Math.floor(Math.random() * terms.length)];
};

export const generateVietnameseSalonSales = (): Job[] => {
  return [
    {
      id: "vn-salon-sale-1",
      title: "Tiệm Nail Cần Bán - Westminster",
      role: "Salon For Sale",
      company: "Golden Nails & Spa",
      location: "Westminster, CA",
      posted_at: "2024-01-15T10:00:00Z",
      created_at: "2024-01-15T10:00:00Z",
      description: "Well-established nail salon for sale in busy Westminster location.",
      vietnamese_description: "Tiệm nail đã hoạt động lâu năm cần bán tại Westminster. Vị trí đông khách, doanh thu ổn định.",
      for_sale: true,
      asking_price: "$85,000",
      number_of_stations: "8 stations", 
      square_feet: "1,200 sq ft",
      monthly_rent: "$4,500",
      image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      contact_info: {
        phone: "(714) 555-9876",
        owner_name: "Anh Nguyen"
      },
      is_vietnamese_listing: true,
      category: "Salon Sale",
      employment_type: "Business Sale",
      specialties: ["Acrylic", "Gel", "Pedicure", "Nail Art"]
    },
    {
      id: "vn-salon-sale-2", 
      title: "Tiệm Nail Sang Nhượng - Garden Grove",
      role: "Salon For Sale",
      company: "Lucky Nails",
      location: "Garden Grove, CA",
      posted_at: "2024-01-12T14:30:00Z",
      created_at: "2024-01-12T14:30:00Z",
      description: "Profitable nail salon in prime Garden Grove location. Owner must sell due to family circumstances.",
      for_sale: true,
      asking_price: "$120,000",
      number_of_stations: "10 stations",
      square_feet: "1,500 sq ft", 
      monthly_rent: "$5,200",
      image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      contact_info: {
        phone: "(714) 555-4321", 
        owner_name: "Chị Mai"
      },
      is_vietnamese_listing: true,
      category: "Salon Sale",
      employment_type: "Business Sale",
      specialties: ["Acrylic", "Gel", "Pedicure", "Waxing"]
    }
  ];
};

export const generateRandomVietnameseSalonSales = (count = 5) => {
  const jobs = [];
  
  for (let i = 0; i < count; i++) {
    jobs.push({
      asking_price: getRandomAskingPrice(),
      title: "Tiệm Nail Sang Nhượng"
    });
  }
  
  return jobs;
};

