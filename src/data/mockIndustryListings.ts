
import { Job } from "@/types/job";

// Helper function to create a formatted phone number
const formatPhone = (areaCode: string, prefix: string, lineNumber: string): string => {
  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

// Sample booth rental listings
export const boothRentalListings: Job[] = [
  {
    id: "booth-001",
    created_at: new Date().toISOString(),
    title: "Premium Booth Rental Available",
    company: "Luxe Hair Studio",
    location: "San Diego, CA",
    user_id: "sample-booth-1",
    asking_price: "$250/week",
    monthly_rent: "$1,000/month",
    square_feet: "100",
    vietnamese_description: "Cho thuê booth cao cấp tại tiệm tóc đẹp, khu khách sang, đông khách.",
    description: "Premium booth rental in our upscale salon. Great location with high foot traffic and established clientele. All utilities included.",
    contact_info: {
      phone: formatPhone("619", "555", "3344"),
      email: "booths@luxehairstudio.com",
      owner_name: "Michelle"
    },
    salon_features: ["High-end Location", "Free Wifi", "Utilities Included", "Product Discount"],
    employment_type: "Booth Rental",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1000",
    reason_for_selling: "Available Now"
  },
  {
    id: "booth-002",
    created_at: new Date().toISOString(),
    title: "Nail Station Rental - Great Deal!",
    company: "Glam & Glitter Nails",
    location: "Portland, OR",
    user_id: "sample-booth-2",
    asking_price: "$200/week",
    monthly_rent: "$800/month",
    square_feet: "80",
    vietnamese_description: "Cho thuê booth giá tốt, tiệm đông khách sẵn, khu tốt, có chỗ để xe.",
    description: "Affordable nail station rental in busy salon. Plenty of walk-ins and parking. Great opportunity for nail techs looking to build clientele.",
    contact_info: {
      phone: formatPhone("503", "555", "9876"),
      email: "glamglitter@nails.com",
      owner_name: "Jenny"
    },
    salon_features: ["Busy Location", "Free Parking", "Walk-ins Available"],
    employment_type: "Booth Rental",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000",
    reason_for_selling: "Ready to Move In"
  },
  {
    id: "booth-003",
    created_at: new Date().toISOString(),
    title: "Hairstylist Booth - Prime Location",
    company: "Scissors & Styles",
    location: "Boston, MA",
    user_id: "sample-booth-3",
    asking_price: "$300/week",
    monthly_rent: "$1,200/month",
    square_feet: "120",
    vietnamese_description: "",
    description: "Upscale salon in downtown Boston seeking booth renters. Prime location with high-end clientele. Perfect for established stylists.",
    contact_info: {
      phone: formatPhone("617", "555", "2233"),
      email: "info@scissorsandstyles.com",
      owner_name: "Robert"
    },
    salon_features: ["Downtown Location", "Modern Equipment", "Receptionist"],
    employment_type: "Booth Rental",
    image: "https://images.unsplash.com/photo-1595476108038-7f6270733031?q=80&w=1000",
    reason_for_selling: "Limited Availability"
  },
  {
    id: "booth-004",
    created_at: new Date().toISOString(),
    title: "Private Room for Esthetician",
    company: "Glow Spa & Beauty",
    location: "Austin, TX",
    user_id: "sample-booth-4",
    asking_price: "$275/week",
    monthly_rent: "$1,100/month",
    square_feet: "150",
    vietnamese_description: "",
    description: "Private treatment room available in established spa. Perfect for esthetician, lash artist, or massage therapist. All utilities included.",
    contact_info: {
      phone: formatPhone("512", "555", "6789"),
      email: "rooms@glowspabeauty.com",
      owner_name: "Sarah"
    },
    salon_features: ["Private Room", "Laundry Available", "Client Lounge", "Receptionist"],
    employment_type: "Booth Rental",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000",
    reason_for_selling: "New Space Available"
  }
];

// Hair salon job listings
export const hairSalonListings: Job[] = [
  {
    id: "hair-001",
    created_at: new Date().toISOString(),
    title: "Experienced Hair Stylist Needed",
    company: "Avant-Garde Hair Studio",
    location: "Miami, FL",
    user_id: "sample-hair-1",
    salary_range: "$50k-70k/year + tips",
    description: "Avant-Garde Hair Studio is looking for talented stylists to join our team. Minimum 2 years experience required. Specializing in color, cuts, and extensions.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("305", "555", "4488"),
      email: "careers@avantgardehair.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    no_supply_deduction: true,
    specialties: ["Balayage", "Color", "Extensions", "Trendy Cuts"],
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000",
    benefits: ["Commission Structure", "Paid Time Off", "Flexible Schedule", "Product Discount"]
  },
  {
    id: "hair-002",
    created_at: new Date().toISOString(),
    title: "Senior Colorist Position",
    company: "Spectrum Salon",
    location: "Seattle, WA",
    user_id: "sample-hair-2",
    salary_range: "$60k-85k/year + tips",
    description: "High-end salon seeking an experienced colorist with advanced knowledge of color theory and techniques. Must have strong portfolio and 5+ years experience.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("206", "555", "7733"),
      email: "hiring@spectrumsalon.com"
    },
    employment_type: "Full-time",
    weekly_pay: false,
    owner_will_train: false,
    specialties: ["Creative Color", "Color Correction", "Balayage", "Fashion Colors"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
    benefits: ["Health Insurance", "401k", "Commission", "Continuing Education"]
  },
  {
    id: "hair-003",
    created_at: new Date().toISOString(),
    title: "Part-Time Stylist Position",
    company: "Curl & Co",
    location: "Atlanta, GA",
    user_id: "sample-hair-3",
    salary_range: "$25-35/hr + tips",
    description: "Curl & Co is seeking a talented stylist specializing in curly hair. Weekend availability required. Flexible hours for the right candidate.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("404", "555", "9911"),
      email: "join@curlandco.com"
    },
    employment_type: "Part-time",
    weekly_pay: true,
    owner_will_train: true,
    specialties: ["Curly Hair", "Natural Texture", "DevaCut", "Styling"],
    image: "https://images.unsplash.com/photo-1622288432207-901328da5d83?q=80&w=1000",
    benefits: ["Flexible Schedule", "Training Provided", "Product Discount"]
  }
];

// Barbershop job listings
export const barbershopListings: Job[] = [
  {
    id: "barber-001",
    created_at: new Date().toISOString(),
    title: "Master Barber Needed",
    company: "Sharp Cuts Barbershop",
    location: "Philadelphia, PA",
    user_id: "sample-barber-1",
    salary_range: "$1,000-1,500/week + tips",
    description: "Upscale barbershop looking for an experienced master barber. Must excel at fades, designs, and straight razor shaves. Clientele a plus but not required.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("215", "555", "3344"),
      email: "careers@sharpcuts.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    has_housing: false,
    specialties: ["Fades", "Designs", "Hot Towel Shaves", "Beard Grooming"],
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000",
    benefits: ["Weekly Pay", "Commission", "Flexible Schedule"]
  },
  {
    id: "barber-002",
    created_at: new Date().toISOString(),
    title: "Barber Apprentice Opportunity",
    company: "Legacy Barbers",
    location: "Chicago, IL",
    user_id: "sample-barber-2",
    salary_range: "Starting at $600/week",
    description: "We're looking for passionate apprentices who want to learn the art of barbering. Great opportunity to train under master barbers while building your skills and clientele.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("312", "555", "6677"),
      email: "apprentice@legacybarbers.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    owner_will_train: true,
    specialties: ["Basic Cuts", "Fades", "Client Service"],
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000",
    benefits: ["Training Program", "Career Advancement", "Tool Kit Provided"]
  }
];

// Restaurant listings
export const restaurantListings: Job[] = [
  {
    id: "rest-001",
    created_at: new Date().toISOString(),
    title: "Restaurant For Sale - Great Location",
    company: "Bistro Milano",
    location: "Denver, CO",
    user_id: "sample-rest-1",
    asking_price: "$250,000",
    monthly_rent: "$4,800/month",
    square_feet: "2,200",
    revenue: "$45,000/month",
    description: "Established Italian restaurant for sale in prime downtown location. Fully equipped kitchen, bar license, and loyal customer base. Owner retiring after 15 years.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("720", "555", "8899"),
      email: "sale@bistromilano.com",
      owner_name: "Frank"
    },
    salon_features: ["Prime Location", "Full Bar", "Outdoor Seating", "Loyal Clientele"],
    employment_type: "For Sale",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000",
    reason_for_selling: "Owner Retirement"
  },
  {
    id: "rest-002",
    created_at: new Date().toISOString(),
    title: "Line Cook Needed ASAP",
    company: "Harvest Table",
    location: "Nashville, TN",
    user_id: "sample-rest-2",
    salary_range: "$18-22/hr + tips",
    description: "Farm-to-table restaurant seeking experienced line cook. Must be able to work efficiently in a fast-paced environment. Health benefits included.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("615", "555", "1234"),
      email: "jobs@harvesttable.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    specialties: ["Hot Line", "Prep", "Plating", "Team Player"],
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1000",
    benefits: ["Health Insurance", "Meal Per Shift", "Paid Time Off"]
  },
  {
    id: "rest-003",
    created_at: new Date().toISOString(),
    title: "Servers Wanted - Opening Soon",
    company: "Ocean Breeze Seafood",
    location: "Virginia Beach, VA",
    user_id: "sample-rest-3",
    salary_range: "$4.25/hr + tips",
    description: "New seafood restaurant opening next month! Hiring friendly and professional servers. Prior experience preferred but willing to train the right candidates.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("757", "555", "6543"),
      email: "apply@oceanbreezeva.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    owner_will_train: true,
    specialties: ["Customer Service", "Wine Knowledge", "Team Work"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
    benefits: ["Flexible Schedule", "Tips", "Employee Discount"]
  }
];

// Tattoo shop listings
export const tattooShopListings: Job[] = [
  {
    id: "tattoo-001",
    created_at: new Date().toISOString(),
    title: "Tattoo Shop For Sale",
    company: "Dark Arts Tattoo",
    location: "Las Vegas, NV",
    user_id: "sample-tattoo-1",
    asking_price: "$120,000",
    monthly_rent: "$2,200/month",
    square_feet: "1,100",
    revenue: "$25,000/month",
    description: "Established tattoo shop with loyal clientele for sale. Includes all equipment, furniture, and client database. Great opportunity in high-traffic area.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("702", "555", "7788"),
      email: "owner@darkartstattoo.com",
      owner_name: "Mike"
    },
    salon_features: ["Health Dept Certified", "Prime Location", "Established 8 Years"],
    employment_type: "For Sale",
    image: "https://images.unsplash.com/photo-1598018553943-93e732e28a8a?q=80&w=1000",
    reason_for_selling: "Owner Moving"
  },
  {
    id: "tattoo-002",
    created_at: new Date().toISOString(),
    title: "Tattoo Artist & Piercer Wanted",
    company: "Ink Addiction Studio",
    location: "Austin, TX",
    user_id: "sample-tattoo-2",
    salary_range: "Commission-based (60/40 split)",
    description: "Busy studio looking for experienced tattoo artist and professional piercer. Must have portfolio and minimum 3 years experience. Booth rental option available.",
    vietnamese_description: "",
    contact_info: {
      phone: formatPhone("512", "555", "9900"),
      email: "artists@inkaddiction.com"
    },
    employment_type: "Full-time",
    weekly_pay: false,
    has_housing: false,
    specialties: ["Fine Line", "Color", "Traditional", "Custom Design"],
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=1000",
    benefits: ["Commission", "Flexible Schedule", "Booth Rental Option"]
  }
];

// Nail salon listings
export const nailSalonListings: Job[] = [
  {
    id: "nail-001",
    created_at: new Date().toISOString(),
    title: "Nail Tech Needed - Great Pay",
    company: "Deluxe Nails & Spa",
    location: "Charlotte, NC",
    user_id: "sample-nail-1",
    salary_range: "$800-1,200/week + tips",
    description: "Busy nail salon seeking experienced nail technician. Specializing in acrylic, dip, and gel. Great location with high-end clientele.",
    vietnamese_description: "Cần thợ nail giỏi, làm bột, dip và gel. Tiệm đông khách, khu sang, típ cao.",
    contact_info: {
      phone: formatPhone("704", "555", "2323"),
      email: "jobs@deluxenails.com"
    },
    employment_type: "Full-time",
    weekly_pay: true,
    has_housing: true,
    specialties: ["Acrylic", "Dip", "Gel", "Nail Art"],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000",
    benefits: ["Weekly Pay", "Housing Available", "Tips", "Busy Location"]
  },
  {
    id: "nail-002",
    created_at: new Date().toISOString(),
    title: "Nail Salon For Sale - Turnkey Operation",
    company: "Perfect 10 Nail Bar",
    location: "Minneapolis, MN",
    user_id: "sample-nail-2",
    asking_price: "$110,000",
    monthly_rent: "$2,800/month",
    square_feet: "1,400",
    revenue: "$22,000/month",
    description: "Well-established nail salon for sale in upscale shopping center. Includes all equipment, furniture, and supplies. 6 manicure stations, 5 pedicure chairs. Owner will train.",
    vietnamese_description: "Bán tiệm nail vị trí đẹp trong khu mua sắm cao cấp. Đầy đủ thiết bị, đồ đạc và nguồn cung cấp. 6 bàn làm móng, 5 ghế làm chân. Chủ sẽ hướng dẫn.",
    contact_info: {
      phone: formatPhone("612", "555", "4545"),
      email: "sale@perfect10.com",
      owner_name: "Lisa"
    },
    salon_features: ["Upscale Location", "Loyal Clientele", "Modern Decor", "All Equipment"],
    employment_type: "For Sale",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1000",
    reason_for_selling: "Moving Out of State",
    owner_will_train: true
  }
];

// Combine all listings
export const allIndustryListings = [
  ...boothRentalListings,
  ...hairSalonListings,
  ...barbershopListings,
  ...restaurantListings,
  ...tattooShopListings,
  ...nailSalonListings
];
