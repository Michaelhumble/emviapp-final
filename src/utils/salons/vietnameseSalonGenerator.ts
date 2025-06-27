import { Job } from '@/types/job';

// Sample Vietnamese nail job for testing
export const sampleVietnameseNailJob: Job = {
  id: "vietnamese-sample-1",
  title: "Cần Thợ Nail Gấp",
  role: "Thợ Nail",
  company: "Golden Nails Spa",
  location: "Westminster, CA",
  employment_type: "Full-time",
  description: "Cần gấp thợ nail biết làm bột và chân tay nước. Tiệm đông khách, lương cao.",
  vietnamese_description: "Tiệm nail cần tuyển thợ có kinh nghiệm. Lương từ $800-1200/tuần tùy theo khả năng.",
  salary_range: "$800-1200/tuần",
  created_at: new Date().toISOString(),
  contact_info: {
    phone: "(714) 555-0123",
    owner_name: "Chị Lan"
  },
  specialties: ["Acrylic", "Gel", "Pedicure"],
  tip_range: "$50-100/ngày",
  weekly_pay: true,
  owner_will_train: true,
  has_housing: false,
  no_supply_deduction: true,
  is_vietnamese_listing: true,
  image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
  category: "Nail Tech" // Added category
};

// Helper functions for generating Vietnamese job samples

// Get a random salary range for job listings
const getRandomSalaryRange = () => {
  const ranges = [
    "$800-1200/week", 
    "$1000-1500/week", 
    "$900-1300/week", 
    "$700-1100/week",
    "$1200-1800/week"
  ];
  return ranges[Math.floor(Math.random() * ranges.length)];
};

// Get random specialties for job listings
const getRandomSpecialties = () => {
  const specialties = [
    ["Acrylic", "Gel", "Pedicure"],
    ["Dip Powder", "Nail Art", "Manicure"],
    ["Acrylic", "Pedicure"],
    ["Gel", "Nail Art", "Manicure", "Pedicure"],
    ["Dip Powder", "Acrylic", "Gel"]
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
};

export const generateVietnameseNailSamples = () => {
  // Sample function to generate Vietnamese nail job samples
  // Implementation will be added when needed
  return [];
};

export const generateVietnameseNailJobs = (count = 5) => {
  const jobs = [];
  
  for (let i = 0; i < count; i++) {
    jobs.push({
      salary_range: getRandomSalaryRange(),
      specialties: getRandomSpecialties(),
      category: "Nail Tech", // Added category
      title: "Nail Tech Wanted"
    } as Job);
  }
  
  return jobs;
};

export const generateMagicNailsSalonSale = (): Job => {
  return {
    id: "magic-nails-premium-sale",
    title: "Magic Nails Spa - Premium Salon For Sale", // Added required title
    role: "Salon Owner",
    company: "Magic Nails Spa",
    location: "Westminster, CA",
    posted_at: "2024-01-15T08:00:00Z",
    created_at: "2024-01-15T08:00:00Z",
    description: "Established nail salon in prime Westminster location. High foot traffic, loyal customer base, fully equipped with modern stations and premium ventilation system.",
    vietnamese_description: "Tiệm nail đã thành lập tại vị trí đắc địa Westminster. Lưu lượng khách cao, khách hàng trung thành, trang bị đầy đủ với các trạm hiện đại và hệ thống thông gió cao cấp.",
    for_sale: true,
    asking_price: "$180,000",
    number_of_stations: "12",
    square_feet: "2,200",
    reason_for_selling: "Owner retiring after 15 successful years",
    salon_features: [
      "Prime Westminster location",
      "12 modern nail stations",
      "4 pedicure chairs with jets",
      "Professional ventilation system",
      "Established customer base",
      "Profitable for 15+ years"
    ],
    contact_info: {
      owner_name: "Mrs. Linda Nguyen", // Changed from 'name' to 'owner_name'
      phone: "(714) 555-0199",
      email: "magicnails.sale@gmail.com",
      notes: "Serious inquiries only. Financial records available upon request."
    },
    is_featured: true,
    featured: true,
    featured_text: "Premium Showcase",
    status: "active",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Salon For Sale",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    specialties: ["Full Service Nail Salon", "Pedicure", "Manicure", "Nail Art"]
  };
};

export const generateVietnameseSalonSales = (count: number = 8): Job[] => {
  const salonSales: Job[] = [];
  
  const sampleSalons = [
    {
      title: "Luxury Nail Lounge - High Revenue Salon", // Added required title
      role: "Salon Owner",
      company: "Luxury Nail Lounge",
      location: "Garden Grove, CA",
      asking_price: "$220,000",
      number_of_stations: "14",
      square_feet: "2,500",
      reason_for_selling: "Owner relocating to Vietnam",
      description: "High-end nail salon with luxury amenities and VIP rooms. Consistent high revenue with upscale clientele.",
      contact_info: {
        owner_name: "Mr. Tony Tran", // Changed from 'name' to 'owner_name'
        phone: "(714) 555-0188",
        email: "luxurynails.sale@gmail.com"
      }
    },
    {
      title: "Busy Nail Salon - Great Location", // Added required title
      role: "Salon Owner",
      company: "Busy Nails",
      location: "Santa Ana, CA",
      asking_price: "$150,000",
      number_of_stations: "10",
      square_feet: "1,800",
      reason_for_selling: "Partnership dissolution",
      description: "Well-established nail salon in a busy shopping center. High walk-in traffic and loyal customer base.",
      contact_info: {
        owner_name: "David Le", // Changed from 'name' to 'owner_name'
        phone: "(714) 555-0177",
        email: "busynails.sale@gmail.com"
      }
    },
    {
      title: "Upscale Nail Spa - Modern Design", // Added required title
      role: "Salon Owner",
      company: "Elite Nail Spa",
      location: "Irvine, CA",
      asking_price: "$250,000",
      number_of_stations: "16",
      square_feet: "2,800",
      reason_for_selling: "Owner pursuing other business ventures",
      description: "Luxurious nail spa with modern design and high-end equipment. Caters to a discerning clientele.",
      contact_info: {
        owner_name: "Michelle Pham", // Changed from 'name' to 'owner_name'
        phone: "(949) 555-0166",
        email: "elitenails.sale@gmail.com"
      }
    },
    {
      title: "Profitable Nail Salon - Turnkey Operation", // Added required title
      role: "Salon Owner",
      company: "Golden Nails",
      location: "Westminster, CA",
      asking_price: "$190,000",
      number_of_stations: "12",
      square_feet: "2,000",
      reason_for_selling: "Owner retiring",
      description: "Profitable nail salon with a loyal customer base and a strong online presence. Turnkey operation with all systems in place.",
      contact_info: {
        owner_name: "Robert Vo", // Changed from 'name' to 'owner_name'
        phone: "(714) 555-0155",
        email: "goldennails.sale@gmail.com"
      }
    },
    {
      title: "Nail Salon & Spa - Full Service", // Added required title
      role: "Salon Owner",
      company: "Serenity Spa & Nails",
      location: "Fountain Valley, CA",
      asking_price: "$210,000",
      number_of_stations: "14",
      square_feet: "2,400",
      reason_for_selling: "Owner moving out of state",
      description: "Full-service nail salon and spa offering a wide range of services. Well-trained staff and a loyal customer base.",
      contact_info: {
        owner_name: "Jennifer Nguyen", // Changed from 'name' to 'owner_name'
        phone: "(714) 555-0144",
        email: "serenityspa.sale@gmail.com"
      }
    },
    {
      title: "Modern Nail Studio - High-End Clientele", // Added required title
      role: "Salon Owner",
      company: "Luxe Nails Studio",
      location: "Newport Beach, CA",
      asking_price: "$280,000",
      number_of_stations: "16",
      square_feet: "3,000",
      reason_for_selling: "Owner focusing on other ventures",
      description: "Upscale nail studio with a modern design and high-end clientele. Prime location in a affluent area.",
      contact_info: {
        owner_name: "Kevin Tran", // Changed from 'name' to 'owner_name'
        phone: "(949) 555-0133",
        email: "luxenails.sale@gmail.com"
      }
    },
    {
      title: "Established Nail Salon - Loyal Customers", // Added required title
      role: "Salon Owner",
      company: "Classic Nails",
      location: "Huntington Beach, CA",
      asking_price: "$160,000",
      number_of_stations: "10",
      square_feet: "1,900",
      reason_for_selling: "Owner retiring after many years",
      description: "Well-established nail salon with a loyal customer base and a strong reputation in the community.",
      contact_info: {
        owner_name: "Lisa Pham", // Changed from 'name' to 'owner_name'
        phone: "(714) 555-0122",
        email: "classicnails.sale@gmail.com"
      }
    },
    {
      title: "Boutique Nail Salon - Unique Concept", // Added required title
      role: "Salon Owner",
      company: "The Nail Bar",
      location: "Costa Mesa, CA",
      asking_price: "$230,000",
      number_of_stations: "14",
      square_feet: "2,600",
      reason_for_selling: "Owner pursuing new opportunities",
      description: "Boutique nail salon with a unique concept and a trendy atmosphere. Caters to a young and fashionable clientele.",
      contact_info: {
        owner_name: "Michael Le", // Changed from 'name' to 'owner_name'
        phone: "(949) 555-0111",
        email: "thenailbar.sale@gmail.com"
      }
    }
  ];

  for (let i = 0; i < count; i++) {
    const salon = sampleSalons[i % sampleSalons.length];
    salonSales.push({
      ...salon,
      id: `salon-sale-${i + 1}`,
      posted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      is_featured: i < 3,
      featured: i < 3,
      featured_text: i < 3 ? "Premium Showcase" : undefined,
      status: "active",
      image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      category: "Salon For Sale",
      pricingTier: "diamond",
      is_vietnamese_listing: true,
      specialties: ["Full Service Nail Salon", "Pedicure", "Manicure", "Nail Art"]
    } as Job);
  }
  
  return salonSales;
};

export const generateNailSalonForSale = (): Job => {
  return {
    id: "nail-salon-for-sale-1",
    title: "Nail Salon For Sale",
    role: "Salon Owner",
    company: "Nail Salon",
    location: "Westminster, CA",
    posted_at: "2024-01-15T08:00:00Z",
    created_at: "2024-01-15T08:00:00Z",
    description: "Nail salon for sale in Westminster, CA.",
    vietnamese_description: "Tiệm nail cần bán ở Westminster, CA.",
    for_sale: true,
    asking_price: "$150,000",
    number_of_stations: "10",
    square_feet: "1,500",
    reason_for_selling: "Retiring",
    salon_features: [
      "10 nail stations",
      "4 pedicure chairs",
      "Wax room",
      "Facial room",
      "Massage room"
    ],
    contact_info: {
      owner_name: "John Doe",
      phone: "(714) 555-0100",
      email: "john.doe@example.com"
    },
    is_featured: true,
    featured: true,
    featured_text: "Featured",
    status: "active",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Salon For Sale",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    specialties: ["Full Service Nail Salon", "Pedicure", "Manicure", "Nail Art"]
  };
};
