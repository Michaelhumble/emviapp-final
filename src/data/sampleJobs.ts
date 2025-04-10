
import { Job } from "@/types/job";

// Create a unique ID generator for jobs
const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

// Function to generate a recent date within the past 30 days
const getRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Function to generate an expiration date 30 days from creation date
const getExpirationDate = (creationDate: string) => {
  const date = new Date(creationDate);
  date.setDate(date.getDate() + 30);
  return date.toISOString();
};

// Sample job listings
export const sampleJobs: Job[] = [
  {
    id: createId("nail"),
    title: "Senior Nail Technician - Generous Tips",
    compensation_type: "commission",
    compensation_details: "60% commission + tips (averaging $150-250/day)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Minimum 2 years experience in all nail services including acrylics, gel, and nail art.",
    description: "Join our award-winning team at Luxe Nail Atelier in Miami's vibrant Brickell district. We're seeking talented nail technicians who excel in gel extensions, intricate nail art, and luxury pedicures. Our upscale clientele expects exceptional service, and we reward our technicians with industry-leading commission and a supportive, creative environment.",
    company: "Luxe Nail Atelier",
    location: "Miami, FL",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm đẹp khu Mỹ trắng, đông khách, tips cao. Cần thợ nail có kinh nghiệm làm bột, gel, và nail art. Bao lương $6,000-$8,000/tháng tùy theo khả năng.",
    responsibilities: [
      "Perform manicures, pedicures, gel applications, and nail art",
      "Maintain high standards of cleanliness and sanitation",
      "Build relationships with clients to ensure retention",
      "Stay current on latest nail trends and techniques"
    ],
    qualifications: [
      "Minimum 2 years experience in nail services",
      "Expertise in gel extensions and nail art",
      "Strong customer service skills",
      "Florida Cosmetology license required"
    ],
    benefits: [
      "Competitive commission structure (60%)",
      "High-end clientele with exceptional tips",
      "Paid continuing education",
      "Employee discount on services and products",
      "Flexible scheduling"
    ],
    tip_range: "$150-250/day",
    contact_info: {
      owner_name: "Amanda Rodriguez",
      phone: "(305) 555-7890",
      email: "careers@luxenailatelier.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Gel Extensions", "Nail Art", "Luxury Pedicures"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("barber"),
    title: "Experienced Barber - $1,200-1,800/week",
    compensation_type: "commission",
    compensation_details: "70% commission (earning $1,200-1,800/week)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed barber with 3+ years experience in precision cutting, fades, and beard sculpting.",
    description: "Urban Edge Barbers is expanding our team in Brooklyn's Williamsburg neighborhood. Our busy shop combines traditional techniques with modern style, serving a diverse clientele who appreciate quality grooming. We're looking for skilled barbers who can deliver exceptional fades, classic cuts, and expert beard service while contributing to our community-focused culture.",
    company: "Urban Edge Barbers",
    location: "Brooklyn, NY",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide precision haircuts, fades, and beard services",
      "Maintain a clean, professional workspace",
      "Build client relationships and retention",
      "Collaborate with team on shop culture and events"
    ],
    qualifications: [
      "New York State Barber license",
      "3+ years professional experience",
      "Strong technical skills in modern and classic techniques",
      "Portfolio showcasing your work",
      "Excellent customer service skills"
    ],
    benefits: [
      "70% commission structure",
      "Health insurance contribution",
      "Paid vacation after 1 year",
      "Education stipend for classes and conventions",
      "Flexible scheduling"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Marcus Jenkins",
      phone: "(718) 555-4321",
      email: "careers@urbanedgebarbers.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Fades", "Classic Cuts", "Beard Sculpting"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("spa"),
    title: "Licensed Massage Therapist - $35-45/hr + tips",
    compensation_type: "hourly",
    compensation_details: "$35-45/hr + tips and benefits",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed massage therapist with at least 1 year experience in spa environment.",
    description: "Serenity Day Spa in La Jolla is seeking talented massage therapists to join our oceanfront wellness sanctuary. We provide a tranquil environment where you can perfect your craft while helping clients achieve deep relaxation and therapeutic results. Our therapists enjoy steady bookings, competitive pay, and comprehensive benefits in one of San Diego's most beautiful locations.",
    company: "Serenity Day Spa",
    location: "San Diego, CA",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Perform various massage modalities including Swedish, Deep Tissue, and Hot Stone",
      "Customize treatments to address client needs",
      "Maintain detailed treatment notes",
      "Create a peaceful, healing environment for clients"
    ],
    qualifications: [
      "California Massage Therapy license",
      "1+ years professional experience",
      "Proficiency in multiple massage modalities",
      "Excellent communication skills",
      "Ability to perform 5-6 massages per day"
    ],
    benefits: [
      "Competitive hourly rate plus tips",
      "Health insurance for full-time employees",
      "401(k) with company match",
      "Paid time off",
      "Free monthly treatments",
      "Product discounts"
    ],
    tip_range: "$15-25 per service",
    contact_info: {
      owner_name: "Jennifer Chen",
      phone: "(619) 555-8765",
      email: "careers@serenitydayspa.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Swedish Massage", "Deep Tissue", "Hot Stone", "CBD Therapy"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("hair"),
    title: "Hair Color Specialist - $75K+ potential",
    compensation_type: "commission",
    compensation_details: "50% commission + retail bonus (earning $75,000-90,000/year)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed cosmetologist with 3+ years experience specializing in color services.",
    description: "Chroma Hair Studio in Austin's vibrant South Congress neighborhood is seeking an experienced colorist to join our creative team. We're known for our innovative color techniques, from subtle balayage to vibrant fashion colors. Our colorists enjoy creative freedom, continued education, and the support of an established clientele in a sustainable, art-focused salon.",
    company: "Chroma Hair Studio",
    location: "Austin, TX",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Perform all color services including balayage, foiling, and color correction",
      "Consult with clients to determine ideal color formulations",
      "Stay current on color trends and techniques",
      "Maintain detailed client records",
      "Participate in salon education and training"
    ],
    qualifications: [
      "Texas Cosmetology license",
      "3+ years of color experience",
      "Strong portfolio showcasing color work",
      "Excellence in consultation and formulation",
      "Social media presence preferred"
    ],
    benefits: [
      "50% commission structure",
      "Product and retail commission",
      "Health insurance option",
      "Paid continuing education",
      "Flexible scheduling",
      "Sustainable salon environment"
    ],
    tip_range: "$150-300/day",
    contact_info: {
      owner_name: "Sophia Garcia",
      phone: "(512) 555-1234",
      email: "careers@chromahairstudio.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Balayage", "Color Correction", "Fashion Colors"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("lash"),
    title: "Lash Artist - Immediate Opening",
    compensation_type: "commission",
    compensation_details: "55% commission (averaging $4,500-6,000/month)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed esthetician or cosmetologist with lash certification and 1+ year professional experience.",
    description: "Allure Lash & Brow Bar in Chicago's trendy River North neighborhood is seeking skilled lash artists to join our growing team. We specialize in custom lash extensions from natural classics to voluminous sets. Our boutique studio offers a relaxed atmosphere with steady bookings and loyal clients who appreciate premium service.",
    company: "Allure Lash & Brow Bar",
    location: "Chicago, IL",
    employment_type: "Full-Time",
    vietnamese_description: "Cần thợ mi có kinh nghiệm làm classic và volume lashes. Tiệm khu Mỹ trắng, khách tip hậu. Thu nhập ổn định từ $4,500-6,000/tháng.",
    responsibilities: [
      "Provide classic, hybrid, and volume lash extensions",
      "Consult with clients to determine ideal lash styles",
      "Maintain strict hygiene and safety standards",
      "Build relationships with clients for retention",
      "Keep workspace clean and organized"
    ],
    qualifications: [
      "Illinois Esthetician or Cosmetology license",
      "Lash certification required",
      "1+ year professional lash experience",
      "Excellence in both classic and volume techniques",
      "Strong attention to detail"
    ],
    benefits: [
      "Competitive 55% commission",
      "Retail commission opportunities",
      "Flexible scheduling",
      "Advanced training opportunities",
      "Product discounts"
    ],
    tip_range: "$20-40 per service",
    contact_info: {
      owner_name: "Michelle Kim",
      phone: "(312) 555-6789",
      email: "jobs@allurelashbrow.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Classic Lashes", "Volume Lashes", "Hybrid Sets"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Nail Technician - $1,000-1,500/week",
    compensation_type: "weekly",
    compensation_details: "$1,000-1,500/week + tips",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed nail technician with 1+ year experience in all nail services.",
    description: "Phoenix Nail Lounge in Scottsdale is expanding our team with nail technicians who excel in Japanese gel techniques and intricate nail art. Our modern, desert-inspired salon provides a luxurious experience for clients and a supportive, growth-oriented environment for technicians. We offer guaranteed weekly pay, consistent scheduling, and the opportunity to build a loyal clientele.",
    company: "Phoenix Nail Lounge",
    location: "Phoenix, AZ",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm nail sang trọng khu Scottsdale cần thợ nail có kinh nghiệm làm gel Nhật và nail art. Bao lương $1,000-1,500/tuần tùy theo khả năng, thêm tips. Chủ lo mọi chi phí.",
    responsibilities: [
      "Provide full range of nail services including Japanese gel, gel extensions, and nail art",
      "Maintain highest standards of sanitation",
      "Deliver exceptional customer service",
      "Stay current on nail trends and techniques"
    ],
    qualifications: [
      "Arizona Nail Technician license",
      "1+ year professional experience",
      "Proficiency in gel applications and nail art",
      "Knowledge of proper sanitation practices",
      "Reliable and professional demeanor"
    ],
    benefits: [
      "Guaranteed weekly pay",
      "Additional commission on retail",
      "Paid time off after 6 months",
      "Continued education opportunities",
      "Employee discounts",
      "Flexible scheduling"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Lisa Tran",
      phone: "(480) 555-9012",
      email: "careers@phoenixnaillounge.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Japanese Gel", "Nail Art", "Gel Extensions"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("barber"),
    title: "Barber Chair Rental - Prime Location",
    compensation_type: "booth_rental",
    compensation_details: "$250/week booth rental",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed barber with established clientele preferred.",
    description: "Gentleman's Quarter in Seattle's Capitol Hill neighborhood has premium barber chair rentals available. Our sophisticated barbershop offers a refined atmosphere with a loyal clientele. Ideal for experienced barbers with their own book who want the flexibility of booth rental with the support of an established brand. Weekly rent includes utilities, towel service, and use of common areas.",
    company: "Gentleman's Quarter",
    location: "Seattle, WA",
    employment_type: "Independent Contractor",
    vietnamese_description: "",
    responsibilities: [
      "Maintain your own schedule and clientele",
      "Keep your station clean and organized",
      "Uphold shop reputation for quality service",
      "Provide your own tools and supplies"
    ],
    qualifications: [
      "Washington State Barber license",
      "Established clientele preferred",
      "Professional attitude and appearance",
      "Reliable and responsible"
    ],
    benefits: [
      "Premium location with high foot traffic",
      "Flexibility to set your own hours and prices",
      "All utilities included",
      "Towel service provided",
      "Professional environment",
      "Marketing support through shop's social media"
    ],
    tip_range: "Keep 100% of your service fees and tips",
    contact_info: {
      owner_name: "James Wilson",
      phone: "(206) 555-3456",
      email: "info@gentlemansquarter.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: false,
    specialties: ["Booth Rental"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("spa"),
    title: "Esthetician - Medical Spa",
    compensation_type: "hourly",
    compensation_details: "$25-35/hr + commission on products and services",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed esthetician with 2+ years experience, medical spa experience preferred.",
    description: "Glow Skin Studio in Denver's upscale Cherry Creek neighborhood is seeking a skilled esthetician with clinical skincare expertise. Our results-driven med spa specializes in advanced facials, chemical peels, and non-invasive treatments. Join our team of professionals in a beautiful mountain-inspired space where you'll help clients achieve their best skin while advancing your career in medical aesthetics.",
    company: "Glow Skin Studio",
    location: "Denver, CO",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Perform advanced skincare treatments including chemical peels and microdermabrasion",
      "Conduct thorough skin analysis and consultations",
      "Recommend appropriate products and treatment plans",
      "Maintain detailed client records",
      "Stay current on skincare technology and techniques"
    ],
    qualifications: [
      "Colorado Esthetician license",
      "2+ years professional experience",
      "Knowledge of medical-grade skincare",
      "Experience with chemical peels and advanced treatments",
      "Strong communication and sales skills"
    ],
    benefits: [
      "Competitive hourly pay plus commission",
      "Health insurance for full-time employees",
      "401(k) retirement plan",
      "Paid continuing education",
      "Complimentary treatments",
      "Product discounts"
    ],
    tip_range: "$15-30 per service",
    contact_info: {
      owner_name: "Dr. Sarah Johnson",
      phone: "(303) 555-7890",
      email: "careers@glowskinstudio.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Medical Facials", "Chemical Peels", "Microdermabrasion"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("hair"),
    title: "Salon Manager & Stylist - $70K+",
    compensation_type: "salary",
    compensation_details: "$65,000-75,000/year + commission on services",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed cosmetologist with 5+ years experience including 2+ years in management or leadership role.",
    description: "Mane Attraction in Nashville's trendy Gulch district is seeking an experienced salon manager who is also a talented stylist. You'll split your time between managing daily operations and servicing your own clients. The ideal candidate has strong leadership skills, excellent technical abilities, and a passion for building both a team and a personal clientele in our music-inspired salon.",
    company: "Mane Attraction",
    location: "Nashville, TN",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Oversee daily salon operations including scheduling and inventory",
      "Lead and mentor a team of stylists",
      "Maintain your own clientele 3-4 days per week",
      "Drive salon growth through marketing and client retention strategies",
      "Ensure exceptional client experience"
    ],
    qualifications: [
      "Tennessee Cosmetology license",
      "5+ years styling experience",
      "2+ years management experience",
      "Strong technical hair skills",
      "Excellent leadership and communication abilities",
      "Proficiency with salon software"
    ],
    benefits: [
      "Competitive base salary",
      "Commission on personal services",
      "Health insurance",
      "401(k) with company match",
      "Paid vacation",
      "Education budget",
      "Product discounts"
    ],
    tip_range: "Keep 100% of tips on personal services",
    contact_info: {
      owner_name: "Taylor James",
      phone: "(615) 555-9012",
      email: "careers@maneattractionnash.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Management", "Hair Cutting", "Color"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Nail Technician - High-End Boutique",
    compensation_type: "commission",
    compensation_details: "65% commission (averaging $5,000-7,000/month)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed nail technician with 2+ years experience in luxury nail services.",
    description: "Pristine Nails & Spa in Boston's elegant Back Bay neighborhood is seeking skilled nail technicians to join our high-end boutique. We're known for meticulous attention to detail, whether creating minimalist designs or intricate nail art. Our light-filled, serene space attracts discerning clients who value quality and are willing to pay premium prices for exceptional service.",
    company: "Pristine Nails & Spa",
    location: "Boston, MA",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm nail sang trọng khu Back Bay (Boston) cần thợ có kinh nghiệm về gel, nail art. Hoa hồng 65%, thu nhập $5,000-7,000/tháng. Khách tip hậu, môi trường làm việc chuyên nghiệp.",
    responsibilities: [
      "Provide luxury nail services including gel, extensions, and nail art",
      "Maintain immaculate cleanliness and sanitation",
      "Create a serene, upscale experience for clients",
      "Build and maintain a loyal clientele"
    ],
    qualifications: [
      "Massachusetts Nail Technician license",
      "2+ years professional experience",
      "Excellence in gel applications and nail art",
      "Attention to detail and cleanliness",
      "Professional appearance and demeanor",
      "Reliable and punctual"
    ],
    benefits: [
      "High commission rate (65%)",
      "Upscale clientele with excellent tips",
      "Continuing education opportunities",
      "Product discounts",
      "Flexible scheduling options"
    ],
    tip_range: "$150-250/day",
    contact_info: {
      owner_name: "Victoria Chen",
      phone: "(617) 555-3456",
      email: "careers@pristinenailsboston.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Gel", "Extensions", "Nail Art"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("salon"),
    title: "Full Service Salon - Multiple Positions",
    compensation_type: "varies",
    compensation_details: "Commission-based and booth rental options available",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed professionals with at least 1 year experience in respective fields.",
    description: "Salon Nouveau in Portland's Pearl District is growing our eco-conscious beauty team. We're seeking stylists, estheticians, and nail technicians who share our commitment to sustainable beauty practices. Our full-service salon uses organic, cruelty-free products in a beautiful repurposed industrial space with abundant natural light. Join our collaborative team where you'll have creative freedom while contributing to our environmentally responsible mission.",
    company: "Salon Nouveau",
    location: "Portland, OR",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide exceptional services in your specialty area",
      "Educate clients on sustainable beauty practices",
      "Maintain clean, organized workspace",
      "Participate in continued education",
      "Contribute to salon's collaborative culture"
    ],
    qualifications: [
      "Oregon Cosmetology/Esthetics/Nail Technology license",
      "1+ years professional experience",
      "Passion for eco-friendly, sustainable beauty",
      "Team-oriented attitude",
      "Willingness to learn and grow"
    ],
    benefits: [
      "Competitive commission structure",
      "Booth rental options available",
      "Flexible scheduling",
      "Continued education",
      "Product discounts",
      "Collaborative work environment"
    ],
    tip_range: "Varies by position",
    contact_info: {
      owner_name: "Olivia Green",
      phone: "(503) 555-7890",
      email: "careers@salonnouveaupdx.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Hair Styling", "Esthetics", "Nail Services"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("barber"),
    title: "Master Barber - Philadelphia",
    compensation_type: "commission",
    compensation_details: "60% commission (averaging $1,000-1,500/week)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed barber with 3+ years experience in all traditional and modern cutting techniques.",
    description: "Classic Edge Barbers in Philadelphia's vibrant Fishtown neighborhood is expanding our team with experienced master barbers. Our shop honors traditional barbering while incorporating modern techniques to serve a diverse clientele. We offer a relaxed, community-focused atmosphere where barbers can perfect their craft while building lasting client relationships.",
    company: "Classic Edge Barbers",
    location: "Philadelphia, PA",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide precision haircuts, fades, and beard services",
      "Maintain traditional barbering standards with modern expertise",
      "Build and maintain a loyal clientele",
      "Contribute to shop's welcoming, community atmosphere"
    ],
    qualifications: [
      "Pennsylvania Barber license",
      "3+ years professional experience",
      "Proficiency in classic cuts, fades, and shaves",
      "Strong communication skills",
      "Reliable and professional attitude"
    ],
    benefits: [
      "Competitive commission structure (60%)",
      "Guaranteed minimum during building phase",
      "Flexible scheduling",
      "Continuing education opportunities",
      "Professional tools discount"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Anthony Romano",
      phone: "(215) 555-1234",
      email: "careers@classicedgebarbers.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Classic Cuts", "Skin Fades", "Hot Lather Shaves"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("wax"),
    title: "Waxing Specialist - Flexible Hours",
    compensation_type: "commission",
    compensation_details: "50% commission + $20/hr guarantee",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed esthetician with specialized training in body waxing, minimum 1 year experience.",
    description: "Zen Waxing Studio in Minneapolis' trendy North Loop is seeking skilled waxing specialists to join our growing team. Our studio transforms hair removal into a comfortable, dignified experience using proprietary European wax formulas. We provide a calming environment where technicians can perform their best work efficiently and with precision. Part-time and full-time positions available with flexible scheduling.",
    company: "Zen Waxing Studio",
    location: "Minneapolis, MN",
    employment_type: "Part-Time",
    vietnamese_description: "",
    responsibilities: [
      "Perform all types of facial and body waxing services",
      "Create a comfortable, professional experience for clients",
      "Maintain spotless hygiene and treatment rooms",
      "Educate clients on pre and post-care",
      "Build a loyal client base"
    ],
    qualifications: [
      "Minnesota Esthetician license",
      "1+ year waxing experience",
      "Specialized training in Brazilian and full-body waxing",
      "Excellent technique and speed",
      "Professional, calming demeanor"
    ],
    benefits: [
      "50% commission with hourly guarantee",
      "Flexible scheduling",
      "Training in our proprietary techniques",
      "Product discounts",
      "Growth opportunities"
    ],
    tip_range: "$15-30 per service",
    contact_info: {
      owner_name: "Rachel Singh",
      phone: "(612) 555-8901",
      email: "jobs@zenwaxingstudio.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Brazilian Waxing", "Full Body Waxing", "Facial Waxing"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("makeup"),
    title: "Makeup Artist - High-End Studio",
    compensation_type: "commission",
    compensation_details: "55% commission + retail bonus",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Professional makeup artist with 2+ years experience and strong portfolio.",
    description: "Contour Beauty Bar in Atlanta's upscale Buckhead neighborhood is expanding our team of talented makeup artists. Our luxury studio specializes in everything from natural everyday looks to dramatic special occasion makeup. We're seeking artists who excel with all skin tones and textures and who can provide exceptional service to our diverse clientele in a high-end setting.",
    company: "Contour Beauty Bar",
    location: "Atlanta, GA",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide customized makeup services for all occasions",
      "Excel with diverse skin tones and face shapes",
      "Educate clients on makeup techniques and products",
      "Maintain a clean, sanitary workspace",
      "Participate in special events and masterclasses"
    ],
    qualifications: [
      "2+ years professional makeup experience",
      "Strong portfolio showcasing versatile styles",
      "Experience with diverse skin tones and textures",
      "Knowledge of current makeup trends and techniques",
      "Excellent customer service skills",
      "Social media presence preferred"
    ],
    benefits: [
      "Competitive commission structure",
      "Retail product bonuses",
      "Brand partnerships and perks",
      "Continuing education opportunities",
      "Professional makeup discounts",
      "Flexible scheduling"
    ],
    tip_range: "$20-50 per service",
    contact_info: {
      owner_name: "Maya Jackson",
      phone: "(404) 555-6789",
      email: "careers@contourbeautybar.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Bridal Makeup", "Special Occasion", "Editorial"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Nail Tech - NOLA Inspired Salon",
    compensation_type: "weekly",
    compensation_details: "$800-1,200/week + tips",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed nail technician with passion for artistry and at least 1 year experience.",
    description: "Emerald Nail Boutique in New Orleans' charming Garden District is seeking creative nail artists to join our intimate team. Housed in a historic cottage, our boutique specializes in non-toxic nail care and designs inspired by the city's vibrant culture. We offer a cozy atmosphere with only six service stations, allowing for personalized attention to both clients and our nail artists.",
    company: "Emerald Nail Boutique",
    location: "New Orleans, LA",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm nail nhỏ xinh ở khu Garden District (New Orleans) cần thợ nail có óc sáng tạo. Bao lương $800-1,200/tuần cộng với tips. Tiệm chỉ có 6 bàn, không khí gia đình, khách tip hậu.",
    responsibilities: [
      "Perform manicures, pedicures, and nail art",
      "Create NOLA-inspired custom designs",
      "Maintain non-toxic, health-focused approach",
      "Provide exceptional customer experience",
      "Help maintain boutique's charming atmosphere"
    ],
    qualifications: [
      "Louisiana Nail Technician license",
      "1+ year professional experience",
      "Creative nail art abilities",
      "Commitment to non-toxic practices",
      "Friendly, personable demeanor"
    ],
    benefits: [
      "Guaranteed weekly pay",
      "Intimate working environment",
      "Creative freedom with designs",
      "Local refreshments provided",
      "Garden patio access",
      "Flexible scheduling"
    ],
    tip_range: "$80-150/day",
    contact_info: {
      owner_name: "Jasmine Dubois",
      phone: "(504) 555-9012",
      email: "join@emeraldnailboutique.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Natural Nail Care", "Gel Manicures", "Custom Nail Art"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("med"),
    title: "Medical Esthetician - Luxury Med Spa",
    compensation_type: "hourly",
    compensation_details: "$30-40/hr + commission on treatments and products",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed esthetician with medical spa experience and training in advanced treatments.",
    description: "Revive Med Spa in San Francisco's upscale Marina District is seeking experienced medical estheticians to join our physician-directed aesthetic practice. We provide advanced treatments that bridge the gap between traditional spa services and medical procedures. Our sophisticated facility features bay views and state-of-the-art technology. We're looking for skilled professionals who can deliver both results and an exceptional experience.",
    company: "Revive Med Spa",
    location: "San Francisco, CA",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Perform advanced treatments including lasers, chemical peels, and microneedling",
      "Consult with clients to develop customized treatment plans",
      "Work alongside medical professionals in treatment delivery",
      "Maintain detailed client records",
      "Stay current on aesthetic technology and techniques"
    ],
    qualifications: [
      "California Esthetician license",
      "2+ years experience in medical aesthetics",
      "Training in laser, chemical peels, and other advanced modalities",
      "Knowledge of medical-grade skincare",
      "Strong consultative sales skills",
      "Professional demeanor"
    ],
    benefits: [
      "Competitive hourly pay plus commission",
      "Medical, dental, and vision insurance",
      "401(k) with matching",
      "Paid time off",
      "Advanced training opportunities",
      "Complimentary treatments",
      "Product allowance"
    ],
    tip_range: "N/A - Medical setting",
    contact_info: {
      owner_name: "Dr. Rebecca Chen",
      phone: "(415) 555-3456",
      email: "careers@revivemedspa.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Laser Treatments", "Chemical Peels", "Microneedling"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("barber"),
    title: "Barber - Detroit-Inspired Shop",
    compensation_type: "commission",
    compensation_details: "65% commission (averaging $900-1,400/week)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed barber with expertise in diverse hair textures and modern cutting techniques.",
    description: "Crown & Blade in Detroit's historic Corktown neighborhood is seeking skilled barbers to join our team. Housed in a renovated factory, our shop honors the city's industrial heritage while embracing its creative renaissance. We welcome barbers who can work with all hair types and textures while contributing to our shop's position as a cultural hub in the community.",
    company: "Crown & Blade",
    location: "Detroit, MI",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide precision cuts, fades, and beard services for diverse clientele",
      "Maintain highest standards of technique and sanitation",
      "Contribute to shop's community-focused atmosphere",
      "Participate in occasional shop events and initiatives"
    ],
    qualifications: [
      "Michigan Barber license",
      "Experience with diverse hair textures",
      "Proficiency in modern cutting techniques",
      "Professional, team-oriented attitude",
      "Passion for barbering culture and community"
    ],
    benefits: [
      "Competitive commission structure",
      "Guaranteed minimum during building phase",
      "Health insurance contribution",
      "Continuing education opportunities",
      "Professional tool discounts",
      "Flexible scheduling"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Marcus Jones",
      phone: "(313) 555-8901",
      email: "careers@crownandblade.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Precision Cuts", "Designer Fades", "Beard Sculpting"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("hair"),
    title: "Hair Stylist - Mountain Modern Salon",
    compensation_type: "commission",
    compensation_details: "50% commission + retail (averaging $50,000-65,000/year)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed cosmetologist with 1+ years experience in cutting and color.",
    description: "Lustre Hair Collective in Salt Lake City's trendy Sugar House neighborhood brings together independent stylists in a collaborative studio that encourages creativity and continued education. Our bright, mountain-modern space offers individual styling stations where you can express your unique aesthetic while benefiting from a supportive community of professionals.",
    company: "Lustre Hair Collective",
    location: "Salt Lake City, UT",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Provide cutting, coloring, and styling services",
      "Build and maintain personal clientele",
      "Participate in salon education and collaboration",
      "Maintain clean, organized personal station",
      "Contribute to salon's positive atmosphere"
    ],
    qualifications: [
      "Utah Cosmetology license",
      "1+ years professional experience",
      "Passion for continued education",
      "Team-oriented attitude",
      "Social media presence preferred"
    ],
    benefits: [
      "Competitive commission structure",
      "Flexible scheduling",
      "Regular education opportunities",
      "Product discounts",
      "Collaborative environment",
      "Individual creative freedom"
    ],
    tip_range: "$30-60 per service",
    contact_info: {
      owner_name: "Emma Richards",
      phone: "(801) 555-6789",
      email: "join@lustrehaircollective.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Cutting", "Color", "Styling"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("lash"),
    title: "Lash Artist - Luxury Studio",
    compensation_type: "commission",
    compensation_details: "60% commission (averaging $5,000-7,000/month)",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed esthetician or cosmetologist with lash certification and 2+ years experience.",
    description: "Velvet Lash & Brow in Dallas' upscale Uptown neighborhood is expanding our team of lash artists. Our luxury studio offers private suites for each technician, ensuring a comfortable experience for both you and your clients. We specialize in customized lash applications tailored to each client's eye shape and lifestyle. Join our team of professionals in a supportive environment that values both technical excellence and client care.",
    company: "Velvet Lash & Brow",
    location: "Dallas, TX",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm mi và chân mày cao cấp ở khu Uptown (Dallas) cần thợ mi có kinh nghiệm. Hoa hồng 60%, thu nhập $5,000-7,000/tháng. Tiệm có phòng riêng cho mỗi thợ, khách hàng sang trọng.",
    responsibilities: [
      "Perform classic, hybrid, and volume lash extensions",
      "Customize applications for each client's eye shape and preferences",
      "Maintain highest standards of sanitation and safety",
      "Provide excellent customer service and consultations",
      "Build personal clientele"
    ],
    qualifications: [
      "Texas Esthetician or Cosmetology license",
      "Lash certification required",
      "2+ years professional lash experience",
      "Excellence in multiple lash techniques",
      "Attention to detail and cleanliness",
      "Professional demeanor"
    ],
    benefits: [
      "High commission rate",
      "Private suite workspace",
      "Advanced training opportunities",
      "Retail commission incentives",
      "Flexible scheduling",
      "Professional environment"
    ],
    tip_range: "$20-40 per service",
    contact_info: {
      owner_name: "Sophia Carter",
      phone: "(214) 555-1234",
      email: "careers@velvetlashandbrow.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Classic Lashes", "Volume Lashes", "Hybrid Sets"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Nail Technician - Georgetown",
    compensation_type: "commission",
    compensation_details: "55% commission + $100 daily guarantee",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed nail technician with 1+ year experience and strong attention to detail.",
    description: "Jade Nail Atelier brings an architectural approach to nail artistry in historic Georgetown. Our minimalist space features custom-designed furniture and an open concept layout. We specialize in clean, geometric nail designs and impeccable execution of classic styles. Join our team of precision-focused nail artists in a sophisticated setting that attracts DC's discerning clientele.",
    company: "Jade Nail Atelier",
    location: "Washington, DC",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm nail phong cách hiện đại ở khu Georgetown (Washington DC) đang tuyển thợ có tay nghề cao và mắt thẩm mỹ tốt. Hoa hồng 55% với bảo đảm $100/ngày. Tiệm chuyên về nail art tối giản và geometric designs.",
    responsibilities: [
      "Perform manicures, pedicures, and nail extensions",
      "Create clean, architectural nail designs",
      "Maintain immaculate cleanliness standards",
      "Provide consultative service to clients",
      "Contribute to salon's minimalist aesthetic"
    ],
    qualifications: [
      "DC Nail Technician license",
      "1+ year professional experience",
      "Excellent attention to detail",
      "Clean, precise application technique",
      "Ability to create geometric and minimal designs",
      "Professional appearance and demeanor"
    ],
    benefits: [
      "Competitive commission with daily minimum",
      "Upscale clientele",
      "Architectural, design-focused environment",
      "Continued education opportunities",
      "Product discounts",
      "Flexible scheduling"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Grace Lin",
      phone: "(202) 555-3456",
      email: "careers@jadenailatelier.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Minimal Nail Art", "Gel Extensions", "Geometric Designs"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("assistant"),
    title: "Salon Assistant - Training Opportunity",
    compensation_type: "hourly",
    compensation_details: "$15-18/hr + tips + advancement opportunities",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Cosmetology student or recent graduate eager to learn and grow in the industry.",
    description: "Chroma Hair Studio in Austin is seeking salon assistants who are passionate about building a career in hair. This position is perfect for cosmetology students or recent graduates looking to learn from experienced stylists while developing their technical skills. You'll assist with various aspects of salon operations while receiving mentorship and hands-on training that will prepare you for your own chair.",
    company: "Chroma Hair Studio",
    location: "Austin, TX",
    employment_type: "Part-Time",
    vietnamese_description: "",
    responsibilities: [
      "Assist stylists with client preparation and color mixing",
      "Perform shampoo and conditioning treatments",
      "Maintain clean, organized salon environment",
      "Help with inventory and supplies",
      "Greet clients and provide excellent service",
      "Learn salon operations and techniques"
    ],
    qualifications: [
      "Enrollment in cosmetology school or recent graduate",
      "Texas Cosmetology license or apprentice permit",
      "Eager to learn and receive feedback",
      "Reliable, punctual, and hardworking",
      "Excellent customer service skills",
      "Team-oriented attitude"
    ],
    benefits: [
      "Competitive hourly pay plus tips",
      "Hands-on training and mentorship",
      "Advancement to stylist position upon readiness",
      "Flexible scheduling for students",
      "Product discounts",
      "Creative, educational environment"
    ],
    tip_range: "Shared tips with team",
    contact_info: {
      owner_name: "Sophia Garcia",
      phone: "(512) 555-1234",
      email: "careers@chromahairstudio.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Assistant", "Training", "Entry-Level"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("receptionist"),
    title: "Salon Coordinator/Receptionist",
    compensation_type: "hourly",
    compensation_details: "$17-20/hr + tips + benefits",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Previous customer service experience, salon experience preferred but not required.",
    description: "Mane Attraction in Nashville is seeking a charismatic, organized Salon Coordinator to manage our front desk operations. You'll be the face of our salon, creating exceptional first impressions while keeping our daily operations running smoothly. This role is perfect for someone who loves the beauty industry and excels at customer service, organization, and multitasking in our music-inspired salon environment.",
    company: "Mane Attraction",
    location: "Nashville, TN",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Greet clients and manage appointment scheduling",
      "Handle phone calls, emails, and in-person inquiries",
      "Process payments and retail sales",
      "Maintain salon cleanliness and organization",
      "Assist stylists as needed",
      "Manage inventory and supply ordering"
    ],
    qualifications: [
      "Previous customer service experience",
      "Excellent communication skills",
      "Proficient with computers and scheduling software",
      "Ability to multitask in a fast-paced environment",
      "Professional appearance and positive attitude",
      "Salon experience preferred but not required"
    ],
    benefits: [
      "Competitive hourly pay plus share of service tips",
      "Health insurance for full-time employees",
      "Paid time off",
      "Service and product discounts",
      "Fun, creative work environment",
      "Growth opportunities"
    ],
    tip_range: "Share of service tips",
    contact_info: {
      owner_name: "Taylor James",
      phone: "(615) 555-9012",
      email: "careers@maneattractionnash.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Front Desk", "Administration", "Customer Service"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("multiskill"),
    title: "Nail Tech + Lash Artist Combo",
    compensation_type: "commission",
    compensation_details: "60% commission on all services + guaranteed $1,000/week while building",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Dual licensed professional in nail technology and esthetics with lash certification.",
    description: "Phoenix Nail Lounge in Scottsdale is seeking a multi-talented beauty professional skilled in both nail services and lash extensions. This unique position is perfect for someone who enjoys variety in their day and has mastered both skill sets. You'll have the flexibility to offer both services to your clients, maximizing your earning potential while providing comprehensive beauty care in our modern, desert-inspired salon.",
    company: "Phoenix Nail Lounge",
    location: "Phoenix, AZ",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm ở Scottsdale (Phoenix) tìm thợ có bằng nail và mi. Đây là cơ hội tốt cho người thích làm đa dạng dịch vụ. Bao lương $1,000/tuần trong thời gian đầu, hoa hồng 60% trên tất cả các dịch vụ.",
    responsibilities: [
      "Provide full range of nail services including gel, extensions, and art",
      "Perform lash extension applications and fills",
      "Maintain separate sanitary workstations for each service type",
      "Build clientele for both service categories",
      "Educate clients on proper care and maintenance"
    ],
    qualifications: [
      "Arizona Nail Technician license",
      "Arizona Esthetician license or certification",
      "Lash certification required",
      "1+ year experience in both service types",
      "Excellent time management skills",
      "Attention to detail and cleanliness"
    ],
    benefits: [
      "High commission rate",
      "Weekly guarantee while building clientele",
      "Flexible scheduling",
      "Opportunity to maximize earnings with dual skills",
      "Modern, upscale working environment",
      "Continued education opportunities"
    ],
    tip_range: "$100-200/day",
    contact_info: {
      owner_name: "Lisa Tran",
      phone: "(480) 555-9012",
      email: "careers@phoenixnaillounge.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Nails", "Lash Extensions", "Multi-Service"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Thợ Nail Cần Gấp (Nail Tech Needed)",
    compensation_type: "weekly",
    compensation_details: "$1,200-1,600/week + tips",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Experienced nail technician with skills in acrylic, gel, and nail art.",
    description: "Busy nail salon in Houston looking for experienced nail technicians. We offer guaranteed weekly pay, flexible scheduling, and a friendly team environment. Our upscale clientele provides excellent tips, and we have a steady stream of clients year-round. Both full-time and part-time positions available.",
    company: "Luxe Nail Atelier",
    location: "Houston, TX",
    employment_type: "Full-Time",
    vietnamese_description: "Tiệm nail khu sang cần thợ nail gấp. Biết làm đủ thứ: bột, gel, chân tay nước. Bao lương $1,200-$1,600/tuần tùy theo kinh nghiệm. Tiệm đông khách quanh năm, tips hậu. Có chỗ ở cho thợ ở xa.",
    responsibilities: [
      "Cung cấp dịch vụ nail đầy đủ, bao gồm bột, gel, và pedis",
      "Duy trì tiêu chuẩn vệ sinh cao",
      "Giao tiếp hiệu quả với khách hàng",
      "Làm việc như một phần của nhóm"
    ],
    qualifications: [
      "Giấy phép Nail Technician Texas",
      "Có kinh nghiệm làm nail, biết làm bột và gel",
      "Có thể giao tiếp bằng tiếng Anh cơ bản",
      "Đáng tin cậy và chuyên nghiệp"
    ],
    benefits: [
      "Bao lương hàng tuần",
      "Tips cao từ khách hàng sang trọng",
      "Lịch trình linh hoạt",
      "Môi trường làm việc thân thiện",
      "Có thể giúp chỗ ở cho thợ từ xa",
      "Đón từ phi trường nếu cần"
    ],
    tip_range: "$150-250/day",
    contact_info: {
      owner_name: "Amanda Rodriguez",
      phone: "(305) 555-7890",
      email: "careers@luxenailatelier.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: true,
    owner_will_train: true,
    has_housing: true,
    no_supply_deduction: true,
    specialties: ["Acrylic", "Gel", "Pedicure", "Nail Art"],
    is_featured: true,
    posted_date: getRecentDate()
  },
  {
    id: createId("nail"),
    title: "Booth Rental - High-Traffic Nail Salon",
    compensation_type: "booth_rental",
    compensation_details: "$200/week booth rental",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "Licensed nail technician with established clientele preferred.",
    description: "Pristine Nails & Spa in Boston's Back Bay has premium booth rental available for independent nail technicians. Our elegant, well-established salon offers a prime location with high foot traffic and a sophisticated atmosphere. Ideal for experienced professionals with their own clientele who desire the freedom of booth rental with the benefits of a prestigious address.",
    company: "Pristine Nails & Spa",
    location: "Boston, MA",
    employment_type: "Independent Contractor",
    vietnamese_description: "Cho thuê bàn tại tiệm nail sang trọng khu Back Bay (Boston). Địa điểm đắc địa, khách đi bộ nhiều. Thích hợp cho thợ nail có khách sẵn muốn tự kinh doanh. Giá thuê $200/tuần.",
    responsibilities: [
      "Manage your own schedule and clientele",
      "Maintain your station in excellent condition",
      "Provide your own supplies and products",
      "Uphold salon's reputation for quality and cleanliness"
    ],
    qualifications: [
      "Massachusetts Nail Technician license",
      "Established clientele preferred",
      "Professional appearance and demeanor",
      "Reliable and business-minded"
    ],
    benefits: [
      "Prime Back Bay location",
      "Elegant, upscale setting",
      "All utilities included",
      "Flexible hours within salon operating times",
      "Potential for walk-in clients",
      "Front desk reception services"
    ],
    tip_range: "Keep 100% of your service fees and tips",
    contact_info: {
      owner_name: "Victoria Chen",
      phone: "(617) 555-3456",
      email: "careers@pristinenailsboston.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: false,
    specialties: ["Booth Rental", "Independent Contractor"],
    is_featured: false,
    posted_date: getRecentDate()
  },
  {
    id: createId("salon"),
    title: "Salon Manager - Full Service Beauty",
    compensation_type: "salary",
    compensation_details: "$55,000-65,000/year + bonus",
    created_at: getRecentDate(),
    expires_at: getExpirationDate(getRecentDate()),
    status: "active",
    requirements: "3+ years salon experience with at least 1 year in management or leadership role.",
    description: "Salon Nouveau in Portland's Pearl District is seeking an experienced Salon Manager to oversee our eco-conscious, full-service beauty establishment. You'll lead our team of stylists, estheticians, and nail technicians while ensuring exceptional client experiences and operational excellence. The ideal candidate shares our commitment to sustainable beauty practices and has strong leadership skills to help grow our business.",
    company: "Salon Nouveau",
    location: "Portland, OR",
    employment_type: "Full-Time",
    vietnamese_description: "",
    responsibilities: [
      "Oversee daily salon operations and staff scheduling",
      "Recruit, train, and develop service providers",
      "Manage inventory, supplies, and retail sales",
      "Ensure exceptional client experience and retention",
      "Implement marketing initiatives and promotions",
      "Maintain salon's commitment to eco-friendly practices"
    ],
    qualifications: [
      "3+ years salon industry experience",
      "1+ years in salon management or leadership",
      "Strong organizational and interpersonal skills",
      "Experience with salon scheduling software",
      "Passion for sustainable beauty practices",
      "Cosmetology license a plus but not required"
    ],
    benefits: [
      "Competitive base salary",
      "Performance-based quarterly bonuses",
      "Health insurance",
      "Paid time off",
      "401(k) plan",
      "Continued education budget",
      "Service and product discounts"
    ],
    tip_range: "Management position - no tips",
    contact_info: {
      owner_name: "Olivia Green",
      phone: "(503) 555-7890",
      email: "careers@salonnouveaupdx.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    },
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Management", "Operations", "Leadership"],
    is_featured: true,
    posted_date: getRecentDate()
  }
];

export default sampleJobs;
