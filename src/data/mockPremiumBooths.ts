import { PremiumSalon } from '@/types/salon';

// Helper function to generate random date within the last 30 days
const getRecentDate = (daysBack = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

// Helper function to get a random future date for expiration
const getFutureDate = (daysAhead = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead) + 10);
  return date.toISOString();
};

// High-quality booth images that work reliably
const BOOTH_IMAGES = [
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1607779097040-28d2024f27bd?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80"
];

// Get a random image from the collection
const getRandomBoothImage = () => {
  return BOOTH_IMAGES[Math.floor(Math.random() * BOOTH_IMAGES.length)];
};

// Generate booth title
const getBoothTitle = (salonType: string) => {
  const nailBooths = [
    "Premium Nail Station for Rent", "Luxury Nail Booth Available", "High-End Nail Table Rental",
    "Nail Technician Booth", "Modern Nail Station", "Upscale Nail Artist Position",
    "Private Nail Booth for Rent", "Nail Tech Station Available", "Manicure Table for Rent"
  ];
  
  const hairBooths = [
    "Stylist Chair for Rent", "Premium Hair Styling Booth", "Hair Stylist Station Available",
    "Luxury Stylist Chair Rental", "High-End Hair Booth", "Private Styling Station",
    "Modern Stylist Position", "Upscale Hair Studio Booth", "Hair Artist Chair for Rent"
  ];
  
  const spaBooths = [
    "Esthetician Room for Rent", "Private Treatment Room Available", "Luxury Spa Room Rental",
    "Waxing Specialist Booth", "Premium Spa Treatment Space", "Upscale Esthetician Suite",
    "Modern Therapy Room for Rent", "Spa Practitioner Space", "Private Spa Booth Available"
  ];
  
  const barberBooths = [
    "Barber Chair for Rent", "Premium Barber Station Available", "Traditional Barber Booth",
    "Modern Barber Chair Rental", "High-End Barber Position", "Upscale Barber Station",
    "Private Barber Setup for Rent", "Luxury Barber Chair Available", "Professional Barber Booth"
  ];
  
  const beautyBooths = [
    "Beauty Station for Rent", "Multi-Service Beauty Booth", "Premium Beauty Artist Position",
    "Luxury Beauty Space Available", "Modern Beauty Professional Booth", "Upscale Beauty Station",
    "Full-Service Beauty Booth", "Private Beauty Suite for Rent", "High-End Beauty Position"
  ];
  
  let boothList;
  switch (salonType) {
    case "Nail Salon":
      boothList = nailBooths;
      break;
    case "Hair Studio":
      boothList = hairBooths;
      break;
    case "Spa & Waxing":
      boothList = spaBooths;
      break;
    case "Barber Shop":
      boothList = barberBooths;
      break;
    case "Beauty Lounge":
    default:
      boothList = beautyBooths;
  }
  
  return boothList[Math.floor(Math.random() * boothList.length)];
};

// Generate booth descriptions
const getBoothDescription = (salonType: string, company: string) => {
  const openings = [
    `Beautiful booth available at ${company}, a premier beauty destination.`,
    `Join our team at ${company} with your own rental space in our upscale salon.`,
    `Grow your beauty business with a premium booth rental at ${company}.`,
    `Established ${company} offering a fantastic booth rental opportunity for professionals.`
  ];
  
  const features = [
    "High foot traffic and excellent location",
    "Welcoming atmosphere and supportive salon culture",
    "Modern, clean, and stylish salon environment",
    "Free WiFi and utilities included in rent",
    "Marketing support through our social media channels",
    "Flexible hours with 24/7 access available",
    "Product discounts for booth renters",
    "On-site laundry facilities",
    "Ample parking for you and your clients",
    "Reception services available",
    "Fully stocked retail area",
    "Break room with kitchen amenities",
    "Online booking system available for use",
    "Established clientele with walk-in potential"
  ];
  
  const benefits = [
    "Keep 100% of your service revenue",
    "Build your business on your own terms",
    "Set your own schedule and pricing",
    "Be your own boss while working in a collaborative environment",
    "No long-term commitment required"
  ];
  
  // Select random parts
  const opening = openings[Math.floor(Math.random() * openings.length)];
  
  // Select 4-6 random features
  const shuffledFeatures = [...features].sort(() => 0.5 - Math.random());
  const selectedFeatures = shuffledFeatures.slice(0, 4 + Math.floor(Math.random() * 3));
  
  // Select 2-3 random benefits
  const shuffledBenefits = [...benefits].sort(() => 0.5 - Math.random());
  const selectedBenefits = shuffledBenefits.slice(0, 2 + Math.floor(Math.random() * 2));
  
  // Assemble description
  return `${opening}\n\nBooth Features:\n- ${selectedFeatures.join("\n- ")}\n\nBenefits:\n- ${selectedBenefits.join("\n- ")}`;
};

// Generate rental price
const getRentalPrice = (location: string, salonType: string) => {
  let basePrice = 0;
  
  // Base price by salon type
  switch (salonType) {
    case "Hair Studio":
      basePrice = 250;
      break;
    case "Spa & Waxing":
      basePrice = 300;
      break;
    case "Barber Shop":
      basePrice = 220;
      break;
    case "Beauty Lounge":
      basePrice = 280;
      break;
    case "Nail Salon":
    default:
      basePrice = 200;
  }
  
  // Adjust for location
  if (location.includes("CA")) {
    basePrice *= 1.3; // California premium
  } else if (location.includes("TX") || location.includes("FL")) {
    basePrice *= 1.1; // Texas and Florida premium
  } else if (location.includes("NY")) {
    basePrice *= 1.5; // New York premium
  }
  
  // Add some randomness (±15%)
  const randomFactor = 0.85 + (Math.random() * 0.3);
  const finalPrice = Math.round(basePrice * randomFactor / 10) * 10;
  
  return `$${finalPrice}/week`;
};

// Generate premium booth listings
export const generatePremiumBooths = (count: number = 25): Job[] => {
  const booths: Job[] = [];
  
  // Use some premium salons as the source for booths
  const boothSalons = [...mockPremiumSalons].sort(() => 0.5 - Math.random()).slice(0, count);
  
  for (let i = 0; i < count; i++) {
    // Use either an existing salon or create a new one
    const useSalon = i < boothSalons.length ? boothSalons[i] : boothSalons[Math.floor(Math.random() * boothSalons.length)];
    const salonType = useSalon.salon_type || "Nail Salon";
    
    const booth: Job = {
      id: `premium-booth-${i + 1}`,
      title: getBoothTitle(salonType),
      company: useSalon.company,
      location: useSalon.location,
      posted_at: getRecentDate(),
      created_at: getRecentDate(),
      description: getBoothDescription(salonType, useSalon.company),
      employment_type: "Booth Rental",
      compensation_details: getRentalPrice(useSalon.location, salonType),
      for_sale: false,
      is_featured: Math.random() > 0.7, // 30% are featured
      status: "active",
      image: getRandomBoothImage(),
      salon_type: salonType,
      expires_at: getFutureDate(),
      has_wax_room: salonType === "Spa & Waxing" || Math.random() > 0.7,
      specialties: salonType === "Nail Salon" 
        ? ["Gel", "Acrylic", "Dip Powder", "Nail Art"].slice(0, 2 + Math.floor(Math.random() * 3)) 
        : undefined
    };
    
    booths.push(booth);
  }
  
  return booths;
};

// Predefined high-quality booth data that can be directly used
export const premiumBooths = generatePremiumBooths(25);

// Get featured booths
export const getFeaturedBooths = (count: number = 3): Job[] => {
  const featured = premiumBooths.filter(booth => booth.is_featured);
  return featured.slice(0, count);
};

// Create a compatible mock function that doesn't use problematic properties
export const createMockPremiumSalons = (): PremiumSalon[] => {
  return [
    {
      id: "prem-1",
      title: "Luxury Nail Spa in Prime Location",
      description: "Established nail salon in a luxury shopping center with high foot traffic. Fully equipped with 10 stations and loyal customer base.",
      vietnameseDescription: "Tiệm nail sang trọng trong trung tâm mua sắm cao cấp với lượng khách đi lại cao. Đầy đủ trang thiết bị với 10 ghế và có sẵn khách hàng trung thành.",
      location: "Los Angeles, California",
      contact: {
        name: "John Smith",
        phone: "555-123-4567",
        email: "john@luxurynails.com"
      },
      price: 250000,
      monthlyRent: 5000,
      numberOfStaff: 8,
      squareFeet: 1800,
      revenue: "25000/month",
      reasonForSelling: "Owner relocating",
      established: 2015,
      images: [
        "/lovable-uploads/salon1-1.png",
        "/lovable-uploads/salon1-2.png",
        "/lovable-uploads/salon1-3.png"
      ],
      isFeatured: true,
      isPremium: true,
      contactInfo: "John Smith - 555-123-4567",
      businessType: "Full-service nail salon",
      facilities: ["10 stations", "3 pedicure chairs", "Waxing room"],
      willTrain: true,
      isNationwide: false,
      createdAt: "2023-07-01T00:00:00.000Z"
    },
    {
      id: "prem-2",
      title: "Profitable Nail Salon with Housing",
      description: "Turn-key nail salon with great reputation and included housing. Perfect for owner-operator looking to live and work in the same location.",
      vietnameseDescription: "Tiệm nail đã hoạt động tốt với danh tiếng lớn và có nhà ở kèm theo. Hoàn hảo cho chủ sở hữu muốn sống và làm việc tại cùng một địa điểm.",
      location: "San Jose, California",
      contact: {
        name: "Maria Garcia",
        phone: "555-987-6543",
        email: "maria@nailprofits.com"
      },
      price: 180000,
      monthlyRent: 3500,
      numberOfStaff: 6,
      squareFeet: 1500,
      revenue: "18000/month",
      reasonForSelling: "Retirement",
      established: 2010,
      images: [
        "/lovable-uploads/salon2-1.png",
        "/lovable-uploads/salon2-2.png"
      ],
      isFeatured: true,
      isPremium: true,
      contactInfo: "Maria Garcia - 555-987-6543",
      businessType: "Nail salon with housing",
      facilities: ["8 stations", "4 pedicure chairs"],
      willTrain: true,
      isNationwide: false,
      hasHousing: true,
      createdAt: "2023-06-15T00:00:00.000Z"
    }
  ];
};

export const mockPremiumBooths = createMockPremiumSalons();

// Additional processing functions if needed (modify these to avoid using salon_type or company)
export const processPremiumBooths = () => {
  return mockPremiumBooths.map(booth => {
    return {
      ...booth,
      processedTitle: `${booth.title} - $${booth.price}`,
      processedLocation: `${booth.location}`,
    };
  });
};
