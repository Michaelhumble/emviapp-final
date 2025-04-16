
import { Job } from "@/types/job";

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

// Generate boosted until date (some will be boosted, some not)
const getBoostedDate = () => {
  if (Math.random() > 0.7) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 15) + 5);
    return date.toISOString();
  }
  return null;
};

// High-quality salon images that work reliably
const SALON_IMAGES = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595621864030-1d25895f69c5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1632154574960-a6d1a4a5f348?w=800&auto=format&fit=crop&q=80"
];

// Get a random image from the collection
const getRandomSalonImage = () => {
  return SALON_IMAGES[Math.floor(Math.random() * SALON_IMAGES.length)];
};

// Premium salon types with weighted probabilities
const SALON_TYPES = [
  { type: "Nail Salon", weight: 0.5 },
  { type: "Hair Studio", weight: 0.2 },
  { type: "Spa & Waxing", weight: 0.15 },
  { type: "Barber Shop", weight: 0.1 },
  { type: "Beauty Lounge", weight: 0.05 }
];

// Get a random salon type with weighted probability
const getRandomSalonType = () => {
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (const salonType of SALON_TYPES) {
    cumulativeWeight += salonType.weight;
    if (random <= cumulativeWeight) {
      return salonType.type;
    }
  }
  
  return SALON_TYPES[0].type; // Default to first type if something goes wrong
};

// High-quality salon names that feel authentic for each type
const getSalonName = (type: string) => {
  const nailSalonNames = [
    "Luxe Nail Bar", "Elite Nails & Spa", "Diamond Nail Studio", 
    "Crystal Nail Lounge", "Polished Nail Boutique", "Glamour Nails",
    "Prestige Nail Spa", "Serenity Nails", "Elegance Nail Studio",
    "Tranquil Nail Retreat", "Allure Nail Lounge", "Radiance Nails",
    "Pure Nail Artistry", "Oasis Nail Spa", "Bella Nails & Spa"
  ];
  
  const hairSalonNames = [
    "Mane Attraction", "Chic Hair Studio", "Haute Hair", "Tress Theory",
    "Salon Envy", "Eclipse Hair Design", "Aura Hair Studio", "Rouge Hair Gallery",
    "Moda Hair Collective", "Lux Hair Lab", "Crown & Mane", "The Cutting Room",
    "Strand Studio", "Salon Nouveau", "Revive Hair House"
  ];
  
  const spaNames = [
    "Bliss Spa & Waxing", "Serene Beauty Spa", "Tranquility Day Spa",
    "Glow Beauty Retreat", "Pure Relaxation Spa", "Oasis Spa & Wellness",
    "Zen Beauty Sanctuary", "Radiance Spa & Waxing", "Harmony Day Spa",
    "Refresh Spa Studio", "Luxe Retreat Spa", "Escape Day Spa",
    "Serenity Wellness Spa", "Rejuvenate Spa House", "Paradise Spa Lounge"
  ];
  
  const barberNames = [
    "Classic Cuts Barber Shop", "The Gentleman's Trim", "Sharp Fades",
    "Royal Razor", "Vintage Barber Co.", "Urban Shave Lounge",
    "Elite Barber House", "The Dapper Den", "Prestige Barber Shop",
    "Modern Man Barbers", "Legacy Cuts", "Stag Barber Co.",
    "Uptown Barber Lounge", "Refined Grooming Co.", "Master Cuts Barber"
  ];
  
  const beautyLoungeNames = [
    "Glamour Beauty House", "The Beauty Collective", "Luxe Beauty Bar",
    "Allure Beauty Lounge", "Chic Beauty Studio", "Glow Up Beauty",
    "Sparkle Beauty Lounge", "Radiant Beauty House", "Blush Beauty Boutique",
    "Elegance Beauty Bar", "Diva Beauty Lounge", "Glam Squad Studio",
    "Prestige Beauty House", "The Vanity Lounge", "Bella Beauty Studio"
  ];
  
  let nameList;
  switch (type) {
    case "Nail Salon":
      nameList = nailSalonNames;
      break;
    case "Hair Studio":
      nameList = hairSalonNames;
      break;
    case "Spa & Waxing":
      nameList = spaNames;
      break;
    case "Barber Shop":
      nameList = barberNames;
      break;
    case "Beauty Lounge":
      nameList = beautyLoungeNames;
      break;
    default:
      nameList = nailSalonNames;
  }
  
  return nameList[Math.floor(Math.random() * nameList.length)];
};

// Premium quality locations focused on areas with significant Vietnamese communities
const PREMIUM_LOCATIONS = [
  "Westminster, CA", "Garden Grove, CA", "Houston, TX", "San Jose, CA",
  "Atlanta, GA", "Orlando, FL", "Seattle, WA", "Philadelphia, PA",
  "Falls Church, VA", "San Diego, CA", "Boston, MA", "Dallas, TX",
  "Austin, TX", "Oklahoma City, OK", "Charlotte, NC", "Denver, CO",
  "New Orleans, LA", "Chicago, IL", "Portland, OR", "Las Vegas, NV"
];

// Get a random location
const getRandomLocation = () => {
  return PREMIUM_LOCATIONS[Math.floor(Math.random() * PREMIUM_LOCATIONS.length)];
};

// Generate premium salon descriptions that are professional and appealing
const getSalonDescription = (type: string, isForSale: boolean) => {
  // Generic premium descriptions
  const nailSalonDesc = [
    "Upscale nail salon offering premium manicures, pedicures, and nail art with a focus on cleanliness and customer satisfaction.",
    "Luxurious nail studio specializing in gel, acrylic, and dip powder services in a relaxing environment with experienced technicians.",
    "High-end nail salon with modern decor and premium products offering a full range of nail care treatments and personalized service.",
    "Contemporary nail bar providing luxury nail treatments with top-tier products and meticulous attention to detail and hygiene."
  ];
  
  const hairSalonDesc = [
    "Sophisticated hair studio offering cutting-edge styles, color treatments, and expert consultations by seasoned stylists.",
    "Premium hair salon specializing in modern cutting techniques, color corrections, and hair extensions in a chic atmosphere.",
    "Luxurious hair design studio featuring expert stylists trained in the latest techniques for cuts, color, and premium treatments.",
    "Upscale hair salon offering precision cuts, creative color, and transformative styling by industry-certified professionals."
  ];
  
  const spaDesc = [
    "Tranquil day spa offering premium waxing services, skincare treatments, and relaxation therapies in an elegant setting.",
    "Luxury spa specializing in professional waxing, facials, and body treatments using high-end organic products.",
    "Premium beauty spa providing exceptional waxing services, skin rejuvenation, and relaxation treatments in a serene environment.",
    "Upscale spa offering expert waxing, comprehensive skincare, and wellness therapies delivered by licensed estheticians."
  ];
  
  const barberDesc = [
    "Distinguished barber shop providing classic cuts, premium hot towel shaves, and modern styling in a refined atmosphere.",
    "Upscale barber lounge offering precision haircuts, beard grooming, and traditional straight razor shaves with attention to detail.",
    "Premium barber establishment specializing in classic techniques combined with contemporary styles for the modern gentleman.",
    "Sophisticated barber shop featuring expert precision cuts, specialty fades, and luxury grooming services in an elegant setting."
  ];
  
  const beautyLoungeDesc = [
    "Full-service beauty lounge offering premium hair styling, makeup application, and nail services in an upscale atmosphere.",
    "Luxury beauty studio specializing in comprehensive beauty treatments from hair transformations to nail artistry and skincare.",
    "High-end beauty destination providing expert hair services, nail treatments, and makeup application by industry professionals.",
    "Premium beauty lounge offering a complete range of beauty services from styling to nail artistry in an elegant setting."
  ];
  
  // For sale extensions
  const forSaleAddition = [
    " Established clientele and fully equipped. Current owner relocating and seeking qualified buyer.",
    " Prime location with loyal customer base. Owner retiring after successful operation and looking to sell to the right entrepreneur.",
    " Turn-key business opportunity with established reputation and steady revenue. Owner pursuing new ventures.",
    " Well-established with strong online presence and consistent bookings. Great opportunity for new ownership."
  ];
  
  let descList;
  switch (type) {
    case "Nail Salon":
      descList = nailSalonDesc;
      break;
    case "Hair Studio":
      descList = hairSalonDesc;
      break;
    case "Spa & Waxing":
      descList = spaDesc;
      break;
    case "Barber Shop":
      descList = barberDesc;
      break;
    case "Beauty Lounge":
      descList = beautyLoungeDesc;
      break;
    default:
      descList = nailSalonDesc;
  }
  
  let description = descList[Math.floor(Math.random() * descList.length)];
  
  if (isForSale) {
    description += forSaleAddition[Math.floor(Math.random() * forSaleAddition.length)];
  }
  
  return description;
};

// Generate realistic asking prices based on location and type
const getAskingPrice = (location: string, type: string) => {
  let basePrice = 85000;
  
  // Adjust for location
  if (location.includes("CA")) {
    basePrice += 35000; // California premium
  } else if (location.includes("TX") || location.includes("FL")) {
    basePrice += 15000; // Texas and Florida premium
  } else if (location.includes("NY")) {
    basePrice += 50000; // New York premium
  }
  
  // Adjust for salon type
  if (type === "Hair Studio") {
    basePrice += 25000;
  } else if (type === "Beauty Lounge") {
    basePrice += 30000;
  } else if (type === "Spa & Waxing") {
    basePrice += 20000;
  }
  
  // Add some randomness (±15%)
  const randomFactor = 0.85 + (Math.random() * 0.3);
  const finalPrice = Math.round((basePrice * randomFactor) / 5000) * 5000;
  
  return finalPrice.toString();
};

// Generate salon features based on type
const getSalonFeatures = (type: string) => {
  const commonFeatures = [
    "High foot traffic", "Ample parking", "Recently renovated", 
    "Modern equipment", "Loyal clientele", "Strong online presence"
  ];
  
  const nailFeatures = [
    "Premium pedicure chairs", "High-end nail products", "Dedicated nail art station", 
    "Gel systems", "Luxury manicure tables", "Private treatment rooms"
  ];
  
  const hairFeatures = [
    "Premium styling chairs", "Color bar", "High-end product lines",
    "Advanced hair treatment equipment", "Private consultation room", "Salon management software"
  ];
  
  const spaFeatures = [
    "Private treatment rooms", "Premium waxing equipment", "High-end skincare products",
    "Relaxation area", "Steam facilities", "Specialized massage tables"
  ];
  
  const barberFeatures = [
    "Classic barber chairs", "Premium grooming products", "Traditional hot towel steamers",
    "Dedicated beard station", "Vintage decor", "Specialty razors"
  ];
  
  const beautyFeatures = [
    "Makeup station", "Multi-purpose styling areas", "Premium beauty products",
    "Photography area", "Private VIP section", "Comprehensive service menu"
  ];
  
  let typeFeatures;
  switch (type) {
    case "Nail Salon":
      typeFeatures = nailFeatures;
      break;
    case "Hair Studio":
      typeFeatures = hairFeatures;
      break;
    case "Spa & Waxing":
      typeFeatures = spaFeatures;
      break;
    case "Barber Shop":
      typeFeatures = barberFeatures;
      break;
    case "Beauty Lounge":
      typeFeatures = beautyFeatures;
      break;
    default:
      typeFeatures = nailFeatures;
  }
  
  // Select 3-4 common features and 2-3 type-specific features
  const shuffledCommon = [...commonFeatures].sort(() => 0.5 - Math.random());
  const shuffledType = [...typeFeatures].sort(() => 0.5 - Math.random());
  
  const selectedCommon = shuffledCommon.slice(0, 3 + Math.floor(Math.random() * 2));
  const selectedType = shuffledType.slice(0, 2 + Math.floor(Math.random() * 2));
  
  return [...selectedCommon, ...selectedType];
};

// Generate contact info
const getContactInfo = () => {
  const firstNames = ["Kim", "Tina", "David", "Michael", "Jenny", "Lisa", "John", "Sarah", "Jennifer", "Anh", "Tran", "Linh", "Thu", "Nancy"];
  const lastNames = ["Nguyen", "Tran", "Le", "Pham", "Johnson", "Smith", "Hoang", "Williams", "Chen", "Garcia", "Kim", "Park", "Wong"];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    owner_name: `${firstName} ${lastName}`,
    phone: `(${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
  };
};

// Generate square footage based on salon type
const getSquareFootage = (type: string) => {
  let baseSqFt = 0;
  
  switch (type) {
    case "Nail Salon":
      baseSqFt = 1200;
      break;
    case "Hair Studio":
      baseSqFt = 1600;
      break;
    case "Spa & Waxing":
      baseSqFt = 1800;
      break;
    case "Barber Shop":
      baseSqFt = 1000;
      break;
    case "Beauty Lounge":
      baseSqFt = 2000;
      break;
    default:
      baseSqFt = 1200;
  }
  
  // Add some variation (±20%)
  const variation = 0.8 + (Math.random() * 0.4);
  const finalSqFt = Math.round(baseSqFt * variation / 50) * 50;
  
  return finalSqFt.toString();
};

// Generate number of stations based on salon type and square footage
const getStationCount = (type: string, squareFootage: string) => {
  const sqFt = parseInt(squareFootage);
  let stationCount = 0;
  
  switch (type) {
    case "Nail Salon":
      stationCount = Math.floor(sqFt / 150); // 150 sq ft per station
      break;
    case "Hair Studio":
      stationCount = Math.floor(sqFt / 200); // 200 sq ft per station
      break;
    case "Spa & Waxing":
      stationCount = Math.floor(sqFt / 250); // 250 sq ft per station
      break;
    case "Barber Shop":
      stationCount = Math.floor(sqFt / 120); // 120 sq ft per station
      break;
    case "Beauty Lounge":
      stationCount = Math.floor(sqFt / 180); // 180 sq ft per station
      break;
    default:
      stationCount = Math.floor(sqFt / 150);
  }
  
  // Ensure a minimum of 4 stations
  return Math.max(4, stationCount).toString();
};

// Generate reason for selling
const getReasonForSelling = () => {
  const reasons = [
    "Owner relocating",
    "Retirement",
    "Family obligations",
    "Health reasons",
    "New business venture",
    "Career change",
    "Moving out of state",
    "Partnership dissolution"
  ];
  
  return reasons[Math.floor(Math.random() * reasons.length)];
};

// Generate Vietnamese description alternative (for some listings)
const getVietnameseDescription = (salonType: string, forSale: boolean) => {
  if (Math.random() > 0.3) return undefined; // Only 30% of listings get Vietnamese descriptions
  
  const vnNailDesc = [
    "Tiệm nail sang trọng, rộng rãi và sạch sẽ. Có nhiều máy móc hiện đại và đầy đủ. Khách hàng ổn định, thu nhập cao.",
    "Tiệm nail rộng đẹp, khu Mỹ trắng, khách sang, lịch sự. Tiệm có nhiều ghế và bàn nail cao cấp, đầy đủ thiết bị.",
    "Tiệm nail cao cấp trong khu sang. Không gian rộng rãi, trang thiết bị hiện đại và đầy đủ. Khách đông, tip hậu."
  ];
  
  const vnHairDesc = [
    "Tiệm tóc cao cấp, thiết kế sang trọng với thiết bị hiện đại. Khách hàng ổn định và thu nhập cao.",
    "Salon tóc rộng đẹp trong khu thượng lưu. Đầy đủ thiết bị và sản phẩm chăm sóc tóc cao cấp. Khách VIP đông.",
    "Tiệm tóc sang trọng, không gian rộng rãi. Có đội ngũ thợ chuyên nghiệp và thiết bị cao cấp. Thu nhập ổn định."
  ];
  
  const vnSpaDesc = [
    "Tiệm spa và wax cao cấp, không gian yên tĩnh, sang trọng. Dịch vụ đa dạng, khách hàng thường xuyên.",
    "Spa rộng và đẹp, nhiều phòng riêng tư. Trang bị đầy đủ thiết bị hiện đại và sản phẩm cao cấp. Thu nhập tốt.",
    "Tiệm spa sang trọng, khu vực đắt đỏ. Không gian thiết kế thanh lịch, tinh tế. Khách hàng ổn định, doanh thu cao."
  ];
  
  const vnBarberDesc = [
    "Tiệm barber cao cấp cho nam giới. Thiết kế hiện đại, trang bị đầy đủ. Khách hàng nam ổn định, thu nhập tốt.",
    "Tiệm cắt tóc nam sang trọng, phong cách vintage. Đầy đủ thiết bị và sản phẩm cao cấp. Khách VIP đông.",
    "Barber shop hiện đại, không gian rộng rãi. Khách hàng nam thường xuyên, doanh thu ổn định."
  ];
  
  const vnBeautyDesc = [
    "Tiệm làm đẹp tổng hợp cao cấp, dịch vụ đa dạng từ tóc đến móng. Không gian sang trọng, trang thiết bị hiện đại.",
    "Beauty lounge rộng đẹp, nhiều dịch vụ làm đẹp. Thiết kế sang trọng với khu vực riêng cho từng dịch vụ. Thu nhập cao.",
    "Tiệm làm đẹp cao cấp, dịch vụ chuyên nghiệp. Không gian rộng rãi, trang trí hiện đại. Khách hàng VIP ổn định."
  ];
  
  // For sale additions
  const vnForSaleAddition = [
    " Cần bán gấp vì chủ về Việt Nam.",
    " Chủ cần bán vì lý do sức khỏe.",
    " Chủ về hưu nên muốn bán lại cho người có đam mê.",
    " Cần sang nhượng vì chủ chuyển tiểu bang khác.",
    " Chủ bận việc gia đình nên cần sang lại cho người có kinh nghiệm."
  ];
  
  let descList;
  switch (salonType) {
    case "Nail Salon":
      descList = vnNailDesc;
      break;
    case "Hair Studio":
      descList = vnHairDesc;
      break;
    case "Spa & Waxing":
      descList = vnSpaDesc;
      break;
    case "Barber Shop":
      descList = vnBarberDesc;
      break;
    case "Beauty Lounge":
      descList = vnBeautyDesc;
      break;
    default:
      descList = vnNailDesc;
  }
  
  let description = descList[Math.floor(Math.random() * descList.length)];
  
  if (forSale) {
    description += vnForSaleAddition[Math.floor(Math.random() * vnForSaleAddition.length)];
  }
  
  return description;
};

// Generate premium salon listings
export const generatePremiumSalons = (count: number = 30): Job[] => {
  const salons: Job[] = [];
  
  for (let i = 0; i < count; i++) {
    const salonType = getRandomSalonType();
    const location = getRandomLocation();
    const forSale = Math.random() > 0.5; // 50% are for sale
    const squareFootage = getSquareFootage(salonType);
    const Vietnamese = Math.random() < 0.3; // 30% have Vietnamese content
    
    const salon: Job = {
      id: `premium-salon-${i + 1}`,
      role: forSale ? "Salon Owner" : "Salon Manager",
      company: getSalonName(salonType),
      location: location,
      posted_at: getRecentDate(),
      created_at: getRecentDate(),
      description: getSalonDescription(salonType, forSale),
      for_sale: forSale,
      asking_price: forSale ? getAskingPrice(location, salonType) : undefined,
      number_of_stations: getStationCount(salonType, squareFootage),
      square_feet: squareFootage,
      reason_for_selling: forSale ? getReasonForSelling() : undefined,
      salon_features: getSalonFeatures(salonType),
      contact_info: getContactInfo(),
      is_featured: Math.random() > 0.7, // 30% are featured
      status: "active",
      image: getRandomSalonImage(),
      salon_type: salonType,
      vietnamese_description: Vietnamese ? getVietnameseDescription(salonType, forSale) : undefined,
      expires_at: getFutureDate(),
      boosted_until: getBoostedDate(),
      has_wax_room: salonType === "Spa & Waxing" || Math.random() > 0.7,
      has_housing: Math.random() > 0.8,
      specialties: salonType === "Nail Salon" 
        ? ["Gel", "Acrylic", "Dip Powder", "Nail Art"].slice(0, 2 + Math.floor(Math.random() * 3)) 
        : undefined
    };
    
    salons.push(salon);
  }
  
  return salons;
};

// Predefined high-quality salon data that can be directly used
export const premiumSalons = generatePremiumSalons(30);

// Get a filtered set of salons (e.g., only salons for sale)
export const getSalonsForSale = (count?: number): Job[] => {
  const forSale = premiumSalons.filter(salon => salon.for_sale);
  return count ? forSale.slice(0, count) : forSale;
};

// Get a filtered set of featured salons
export const getFeaturedSalons = (count: number = 3): Job[] => {
  const featured = premiumSalons.filter(salon => salon.is_featured);
  return featured.slice(0, count);
};
