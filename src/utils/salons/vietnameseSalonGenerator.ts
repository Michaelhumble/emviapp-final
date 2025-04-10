
import { Job } from "@/types/job";
import { mapSampleJobData } from "@/utils/jobs/sampleJobMapper";

// -------------------------
// Vietnamese salon name generator
// -------------------------
const generateVietnameseSalonName = (): string => {
  const prefixes = [
    "Tiffany", "KT", "Thanh", "Lucky", "Kelly", "Luxury", "VIP", "Diamond", 
    "Crystal", "Kim", "Lilly", "Happy", "Cindy", "Linda", "Anh", "Elegant", 
    "Perfect", "Queen", "Royal", "Elite", "Golden", "Star", "Bella", "Cherry",
    "Deluxe", "Jenny", "Rose", "Sunshine", "Orchid", "Allure"
  ];
  
  const suffixes = [
    "Nails & Spa", "Nails", "Beauty Lounge", "Nail Bar", "Nail Salon", 
    "Beauty Salon", "Nail Studio", "Spa & Beauty", "Nail Lounge", "Beauty",
    "Nails & Beauty", "Spa", "Beauty Studio", "Salon & Spa", "Nail Art Studio"
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${suffix}`;
};

// -------------------------
// Vietnamese owner name generator
// -------------------------
const generateVietnameseOwnerName = (): string => {
  const firstNames = [
    "Nguyen", "Tran", "Le", "Pham", "Hoang", "Huynh", "Vo", "Dang", "Bui", "Do",
    "Vu", "Ngo", "Duong", "Ly", "Trinh", "Dinh", "Ha", "Mai", "Truong", "Lam"
  ];
  
  const middleNames = [
    "Van", "Thi", "Huu", "Dinh", "Quoc", "Thanh", "Tuan", "Kim", "Duc", "Minh",
    "Hong", "Hoai", "Thu", "My", "Ngoc", "Thuy", "Anh", "Tuan", "Quang", "Phuong"
  ];
  
  const lastNames = [
    "Anh", "Linh", "Hoa", "Tuan", "Minh", "Hai", "Hung", "Phuong", "Thao", "Dung",
    "Lan", "Huong", "Trang", "Thuy", "Binh", "Nga", "Phat", "Tam", "Thu", "Trinh",
    "Kim", "Tiffany", "Jenny", "Kelly", "Linda", "Nancy", "Anna", "Lisa", "Cindy", "Amy"
  ];
  
  // For salon owners in America, sometimes they use American names too
  const americanNames = [
    "Amy", "Anna", "Cindy", "Jenny", "Kelly", "Kim", "Linda", "Lisa", "Nancy", "Tiffany",
    "Tony", "Tommy", "Kevin", "Jimmy", "Johnny", "Danny", "Andy", "Henry", "Kenny", "Terry"
  ];
  
  // 40% chance to use American name instead
  if (Math.random() < 0.4) {
    return americanNames[Math.floor(Math.random() * americanNames.length)] + " " + firstNames[Math.floor(Math.random() * firstNames.length)];
  }
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${middleName} ${lastName}`;
};

// -------------------------
// Vietnamese salon locations focused on areas with large Vietnamese communities
// -------------------------
const getVietnameseSalonLocation = (): string => {
  const locations = [
    "San Jose, CA", "Houston, TX", "Westminster, CA", "Garden Grove, CA", 
    "Atlanta, GA", "Boston, MA", "Philadelphia, PA", "Dallas, TX", "Orlando, FL", 
    "Seattle, WA", "Oklahoma City, OK", "San Diego, CA", "Las Vegas, NV", 
    "Chicago, IL", "Portland, OR", "Charlotte, NC", "Phoenix, AZ", 
    "Sacramento, CA", "New Orleans, LA", "Denver, CO", "Minneapolis, MN",
    "Falls Church, VA", "Annandale, VA", "Arlington, VA"
  ];
  
  return locations[Math.floor(Math.random() * locations.length)];
};

// -------------------------
// Generate authentic Vietnamese salon descriptions
// -------------------------
const generateVietnameseDescription = (): string => {
  const descriptions = [
    "Cần bán tiệm nail gấp vì gia đình chuyển về Việt Nam. Tiệm có 8 bàn, 6 ghế, phòng wax, phòng ăn, và máy giặt. Tiệm ở khu Mỹ trắng, giá cao, tip hậu. Có sẵn thợ nếu cần.",
    
    "Sang tiệm nail khu sang, khách tip hậu. Tiệm có 6 bàn, 8 ghế, 1 phòng wax. Tiệm rộng 1,200sqft, giá thuê hợp lý $2,500/tháng, net khoảng $15,000-$20,000/tháng. Cần sang vì gia đình bận việc khác.",
    
    "Tiệm nail cần sang lại gấp vì lý do sức khỏe. Khu Mỹ trắng, đông khách, 10 bàn, 12 ghế, 2 phòng wax. Giá thuê $3,800, tiệm làm $25,000-$30,000/tháng. Bao training nếu cần. Xin để lại tin nhắn.",
    
    "Cần bán tiệm gấp. 6 bàn, 6 ghế, máy giặt, phòng ăn, kho. Khu Mỹ trắng, gần shopping center lớn, đông khách. Giá bán $65,000 (có thể thương lượng). Không trả lời số lạ, xin nhắn tin.",
    
    "Cần sang tiệm nail vì chuyển tiểu bang. Tiệm 8 bàn, 10 ghế, 2 phòng wax, khu Mỹ trắng, giàu. Tiệm mới remodel, trang thiết bị đầy đủ. Giá $85,000. Bao training nếu cần.",
    
    "Bán tiệm vì về hưu. Tiệm 10 năm, khu trung tâm, nhiều văn phòng. Có 8 bàn, 8 ghế, 2 phòng wax, phòng ăn riêng. Có thợ sẵn nếu cần. Giá $120,000 (thương lượng).",
    
    "Cần sang gấp tiệm tại trung tâm quận Cam. Tiệm 5 năm, khách đông, decor đẹp, có chỗ đậu xe rộng. 6 bàn, 8 ghế, 1 phòng wax. Bán giá $70,000. Liên hệ qua text.",
    
    "Sang tiệm nail ở khu shopping center đông khách. Tiệm có 6 bàn, 7 ghế, làm full service. Income ổn định $18,000-$22,000/tháng. Giá thuê $2,800. Bán vì không có người quản lý. Giá $60,000.",
    
    "Tiệm cần sang gấp vì sức khoẻ, khu Mỹ trắng, trung tâm thành phố. Tiệm 8 năm, có chỗ đậu xe rộng, không cạnh tranh. Có 5 bàn, 6 ghế, 1 phòng wax. Giá $55,000.",
    
    "Cần bán tiệm ngay khu thương mại đông đúc. Tiệm có 10 bàn, 8 ghế, máy giặt sấy, phòng ăn rộng. Khách đông, tip hậu. Rent $3,200, income $25,000-$30,000/tháng. Giá $110,000."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// -------------------------
// Generate English translations/summaries for Vietnamese descriptions
// -------------------------
const generateEnglishDescription = (stationsCount: number, yearsEstablished: number, owner: string): string => {
  const templates = [
    `Well-established nail salon with ${stationsCount} stations in a high-traffic area. The salon has been in business for ${yearsEstablished} years with loyal clientele. Owner ${owner} is selling due to family relocation. All equipment included in sale price.`,
    
    `Beautiful nail salon for sale with ${stationsCount} stations. Established ${yearsEstablished} years ago in an upscale neighborhood with great clientele. Current owner needs to relocate. Turnkey operation with all equipment and supplies included.`,
    
    `Prime location nail salon for sale. ${yearsEstablished} years in business with ${stationsCount} stations and room for expansion. Great opportunity for owner-operator. Current owner is selling due to health reasons.`,
    
    `Profitable nail salon with ${stationsCount} stations and strong clientele base. Established ${yearsEstablished} years ago in a busy shopping center. Owner ${owner} is retiring and willing to train new buyer if needed.`,
    
    `High-end nail salon with ${stationsCount} stations located in an affluent area. ${yearsEstablished} years of operation with excellent reputation. Fully staffed with experienced technicians who may stay with new owner.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

// -------------------------
// Generate salon features with a mix of standard and cultural elements
// -------------------------
const generateSalonFeatures = (): string[] => {
  const standardFeatures = [
    "Premium equipment", "Online booking", "Walk-ins welcome", 
    "Free WiFi", "Complimentary beverages", "Loyalty program",
    "Private rooms available", "Wheelchair accessible", "Group bookings", 
    "Gift certificates", "Validated parking"
  ];
  
  const culturalFeatures = [
    "Bilingual staff", "Asian-inspired decor", "Complimentary tea service", 
    "Family-owned business", "Traditional techniques", "Asian magazines available",
    "Asian beauty products for sale", "Cultural celebrations", "Vietnamese music"
  ];
  
  const features: string[] = [];
  
  // Add 3-5 standard features
  const numStandard = Math.floor(Math.random() * 3) + 3;
  const shuffledStandard = [...standardFeatures].sort(() => 0.5 - Math.random());
  features.push(...shuffledStandard.slice(0, numStandard));
  
  // Add 1-3 cultural features
  const numCultural = Math.floor(Math.random() * 3) + 1;
  const shuffledCultural = [...culturalFeatures].sort(() => 0.5 - Math.random());
  features.push(...shuffledCultural.slice(0, numCultural));
  
  return features;
};

// -------------------------
// Generate a realistic asking price based on location
// -------------------------
const generateAskingPrice = (location: string): string => {
  // Base price ranges by region
  let baseMin = 60000;
  let baseMax = 120000;
  
  // Adjust price based on location
  if (location.includes("CA") || location.includes("NY") || location.includes("MA")) {
    // Higher prices in California, New York, Massachusetts
    baseMin = 85000;
    baseMax = 180000;
  } else if (location.includes("TX") || location.includes("GA") || location.includes("NC") || location.includes("FL")) {
    // Lower prices in Texas, Georgia, North Carolina, Florida
    baseMin = 45000;
    baseMax = 95000;
  }
  
  // Add some randomness
  const adjustment = Math.random() * 15000;
  const price = Math.round((baseMin + Math.random() * (baseMax - baseMin) + adjustment) / 5000) * 5000;
  
  return price.toString();
};

// -------------------------
// Generate a realistic monthly rent based on location
// -------------------------
const generateMonthlyRent = (location: string, squareFeet: number): string => {
  // Base rent per sq ft ranges by region
  let baseMin = 1.8;
  let baseMax = 3.0;
  
  // Adjust rent based on location
  if (location.includes("CA") || location.includes("NY") || location.includes("MA")) {
    // Higher rents in California, New York, Massachusetts
    baseMin = 3.0;
    baseMax = 5.0;
  } else if (location.includes("TX") || location.includes("GA") || location.includes("NC") || location.includes("FL")) {
    // Lower rents in Texas, Georgia, North Carolina, Florida
    baseMin = 1.5;
    baseMax = 2.5;
  }
  
  // Calculate monthly rent
  const rentPerSqFt = baseMin + Math.random() * (baseMax - baseMin);
  const monthlyRent = Math.round(squareFeet * rentPerSqFt / 100) * 100;
  
  return monthlyRent.toString();
};

// -------------------------
// Generate realistic phone number with notes
// -------------------------
const generatePhoneWithNotes = (): { phone: string, notes?: string } => {
  const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  
  const notes = [
    "Xin nhắn tin trước khi gọi",
    "Không trả lời số lạ",
    "Vui lòng để lại tin nhắn",
    "Chỉ liên hệ qua tin nhắn",
    "Gọi sau 5 giờ chiều",
    null, // sometimes no notes
    null
  ];
  
  return { 
    phone,
    notes: notes[Math.floor(Math.random() * notes.length)]
  };
};

// -------------------------
// Generate a single Vietnamese salon listing
// -------------------------
export const generateVietnameseSalon = (id: string): Job => {
  const salonName = generateVietnameseSalonName();
  const ownerName = generateVietnameseOwnerName();
  const location = getVietnameseSalonLocation();
  const yearsEstablished = Math.floor(Math.random() * 10) + 3; // 3-12 years
  const stations = Math.floor(Math.random() * 6) + 4; // 4-9 stations
  const askingPrice = generateAskingPrice(location);
  const squareFeet = ((Math.floor(Math.random() * 10) + 8) * 100); // 800-1700 sq ft
  const monthlyRent = generateMonthlyRent(location, squareFeet);
  
  const reasonsForSelling = [
    "Về hưu",
    "Chuyển về Việt Nam",
    "Chuyển tiểu bang",
    "Lý do sức khỏe",
    "Bận việc gia đình",
    "Con cái cần chăm sóc",
    "Muốn đổi ngành nghề"
  ];
  
  const reasonForSelling = reasonsForSelling[Math.floor(Math.random() * reasonsForSelling.length)];
  
  const vietnameseDescription = generateVietnameseDescription();
  const englishDescription = generateEnglishDescription(stations, yearsEstablished, ownerName);
  const features = generateSalonFeatures();
  const phoneInfo = generatePhoneWithNotes();
  
  // Generate realistic revenue numbers based on location and size
  const baseRevenue = stations * 2000; // Base revenue per station
  const locationMultiplier = location.includes("CA") || location.includes("NY") ? 1.5 : 1.2;
  const revenue = Math.round(baseRevenue * locationMultiplier * (0.9 + Math.random() * 0.4) / 1000) * 1000;
  
  // Create the salon listing
  const salon: Job = {
    id,
    role: "Salon Owner",
    company: salonName,
    location,
    posted_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    description: englishDescription,
    vietnamese_description: vietnameseDescription,
    for_sale: true,
    asking_price: `$${parseInt(askingPrice).toLocaleString()}`,
    number_of_stations: stations.toString(),
    square_feet: squareFeet.toString(),
    monthly_rent: `$${parseInt(monthlyRent).toLocaleString()}`,
    revenue: revenue ? `$${revenue.toLocaleString()}/month` : undefined,
    reason_for_selling: reasonForSelling,
    salon_features: features,
    has_wax_room: Math.random() > 0.5,
    has_dining_room: Math.random() > 0.6,
    has_laundry: Math.random() > 0.4,
    image: Math.random() > 0.3 ? `/lovable-uploads/${Math.floor(Math.random() * 30) + 1}f3cfd40-4041-4545-b71e-5a7f484f86e9.png` : undefined,
    contact_info: {
      owner_name: ownerName,
      phone: phoneInfo.phone,
      email: `${salonName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      notes: phoneInfo.notes
    },
    is_featured: Math.random() < 0.2, // 20% chance to be featured
    status: Math.random() < 0.85 ? "active" : "expired", // 15% chance to be expired
    specialties: ["Acrylic", "Gel", "Dipping Powder", "Pedicure", "Manicure"].slice(0, Math.floor(Math.random() * 3) + 2)
  };
  
  return mapSampleJobData(salon);
};

// -------------------------
// Generate multiple Vietnamese salon listings
// -------------------------
export const generateVietnameseSalons = (count: number): Job[] => {
  const salons: Job[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `vn-salon-${Date.now()}-${i}`;
    salons.push(generateVietnameseSalon(id));
  }
  
  return salons;
};

// -------------------------
// Generate a mix of Vietnamese and non-Vietnamese salons
// -------------------------
export const generateMixedSalons = (totalCount: number, vietnamesePercentage: number = 0.7): Job[] => {
  const vietnameseCount = Math.round(totalCount * vietnamesePercentage);
  const nonVietnameseCount = totalCount - vietnameseCount;
  
  // Generate Vietnamese salons
  const vietnameseSalons = generateVietnameseSalons(vietnameseCount);
  
  // Use the existing salon data for non-Vietnamese salons
  // This would normally come from salonData.ts or another source
  // For now, we'll create generic non-Vietnamese salons
  const nonVietnameseSalons: Job[] = [];
  for (let i = 0; i < nonVietnameseCount; i++) {
    nonVietnameseSalons.push(generateNonVietnameseSalon(`nv-salon-${Date.now()}-${i}`));
  }
  
  // Combine and shuffle the lists
  return [...vietnameseSalons, ...nonVietnameseSalons].sort(() => 0.5 - Math.random());
};

// -------------------------
// Generate a single non-Vietnamese salon listing
// -------------------------
const generateNonVietnameseSalon = (id: string): Job => {
  const salonNames = [
    "Elegance Hair & Spa", "Modern Beauty", "Urban Chic Salon", "The Styling Room", 
    "Bella Salon & Spa", "Luxe Beauty Bar", "Serenity Spa", "Pure Bliss Salon",
    "Prestige Hair Studio", "Glamour Salon", "Essence Beauty Lounge", "Fusion Spa"
  ];
  
  const owners = [
    "Sarah Johnson", "Michael Smith", "Emily Davis", "Jessica Brown", 
    "David Wilson", "Amanda Miller", "Robert Taylor", "Jennifer Martinez",
    "Christopher Anderson", "Elizabeth Thomas", "Matthew Jackson", "Ashley White"
  ];
  
  const locations = [
    "Los Angeles, CA", "New York, NY", "Chicago, IL", "Miami, FL", 
    "Austin, TX", "Nashville, TN", "Seattle, WA", "Denver, CO",
    "Portland, OR", "Atlanta, GA", "Dallas, TX", "Boston, MA"
  ];
  
  const salonName = salonNames[Math.floor(Math.random() * salonNames.length)];
  const ownerName = owners[Math.floor(Math.random() * owners.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const yearsEstablished = Math.floor(Math.random() * 10) + 3;
  const stations = Math.floor(Math.random() * 6) + 4;
  const askingPrice = generateAskingPrice(location);
  const squareFeet = ((Math.floor(Math.random() * 10) + 8) * 100);
  const monthlyRent = generateMonthlyRent(location, squareFeet);
  
  const reasonForSelling = [
    "Owner relocating", "Owner retiring", "Moving to a bigger location", 
    "Health reasons", "Family obligations", "Career change", 
    "Other business opportunities"
  ][Math.floor(Math.random() * 7)];
  
  const features = [
    "Premium equipment", "Online booking", "Walk-ins welcome", 
    "Free WiFi", "Complimentary beverages", "Loyalty program",
    "Private rooms available", "Wheelchair accessible", "Group bookings", 
    "Gift certificates", "Validated parking"
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 3);
  
  const description = `${salonName} is a well-established salon with ${yearsEstablished} years in business and a loyal clientele. Featuring ${stations} stations in a ${squareFeet} sq ft space, this turnkey operation includes all equipment and inventory. Currently profitable with growth potential. ${ownerName} is selling due to ${reasonForSelling.toLowerCase()}.`;
  
  // Generate realistic revenue numbers based on location and size
  const baseRevenue = stations * 1800; // Base revenue per station
  const locationMultiplier = location.includes("CA") || location.includes("NY") ? 1.4 : 1.1;
  const revenue = Math.round(baseRevenue * locationMultiplier * (0.9 + Math.random() * 0.3) / 1000) * 1000;
  
  const salon: Job = {
    id,
    role: "Salon Owner",
    company: salonName,
    location,
    posted_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    description,
    for_sale: true,
    asking_price: `$${parseInt(askingPrice).toLocaleString()}`,
    number_of_stations: stations.toString(),
    square_feet: squareFeet.toString(),
    monthly_rent: `$${parseInt(monthlyRent).toLocaleString()}`,
    revenue: revenue ? `$${revenue.toLocaleString()}/month` : undefined,
    reason_for_selling: reasonForSelling,
    salon_features: features,
    has_wax_room: Math.random() > 0.6,
    has_dining_room: Math.random() > 0.7,
    has_laundry: Math.random() > 0.5,
    image: Math.random() > 0.4 ? `/lovable-uploads/${Math.floor(Math.random() * 30) + 1}f3cfd40-4041-4545-b71e-5a7f484f86e9.png` : undefined,
    contact_info: {
      owner_name: ownerName,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${salonName.toLowerCase().replace(/\s+/g, '')}@gmail.com`
    },
    is_featured: Math.random() < 0.2,
    status: Math.random() < 0.85 ? "active" : "expired",
    specialties: ["Hair", "Nails", "Massage", "Facials", "Waxing"].slice(0, Math.floor(Math.random() * 3) + 2)
  };
  
  return mapSampleJobData(salon);
};

export default generateMixedSalons;

