
import { Job } from "@/types/job";
import { premiumSalons } from "./mockPremiumSalons";

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

// High-quality job images that work reliably
const JOB_IMAGES = [
  "https://images.unsplash.com/photo-1622288432207-901328f66ffb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1607001443318-2a6b4dece3d3?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595621864030-1d25895f69c5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80"
];

// Get a random image from the collection
const getRandomJobImage = () => {
  return JOB_IMAGES[Math.floor(Math.random() * JOB_IMAGES.length)];
};

// Generate job titles based on salon type
const getJobTitles = (salonType: string) => {
  const nailJobs = [
    "Nail Technician", "Senior Nail Artist", "Gel Specialist", 
    "Nail Salon Manager", "Acrylic Nail Expert", "Nail Art Designer",
    "Manicurist", "Pedicurist", "Nail Salon Front Desk", "Nail Salon Receptionist"
  ];
  
  const hairJobs = [
    "Hair Stylist", "Senior Colorist", "Salon Manager", "Hair Cutting Specialist",
    "Blowout Specialist", "Hair Extension Expert", "Stylist Assistant",
    "Salon Receptionist", "Color Technician", "Bridal Hair Specialist"
  ];
  
  const spaJobs = [
    "Esthetician", "Waxing Specialist", "Spa Manager", "Facial Technician",
    "Spa Receptionist", "Body Treatment Specialist", "Massage Therapist",
    "Spa Coordinator", "Skincare Expert", "Spa Front Desk"
  ];
  
  const barberJobs = [
    "Barber", "Master Barber", "Barbershop Manager", "Beard Specialist",
    "Barbershop Receptionist", "Men's Grooming Expert", "Barber Assistant",
    "Fade Specialist", "Traditional Barber", "Barbershop Coordinator"
  ];
  
  const beautyJobs = [
    "Beauty Technician", "Makeup Artist", "Beauty Lounge Manager", "Multi-Service Stylist",
    "Beauty Receptionist", "Brow & Lash Specialist", "Salon Coordinator",
    "Beauty Consultant", "Full-Service Beautician", "Beauty Lounge Assistant"
  ];
  
  let jobList;
  switch (salonType) {
    case "Nail Salon":
      jobList = nailJobs;
      break;
    case "Hair Studio":
      jobList = hairJobs;
      break;
    case "Spa & Waxing":
      jobList = spaJobs;
      break;
    case "Barber Shop":
      jobList = barberJobs;
      break;
    case "Beauty Lounge":
    default:
      jobList = beautyJobs;
  }
  
  return jobList;
};

// Generate employment types with weights
const getEmploymentType = () => {
  const types = [
    { type: "Full-time", weight: 0.5 },
    { type: "Part-time", weight: 0.3 },
    { type: "Commission", weight: 0.1 },
    { type: "Booth Rental", weight: 0.1 }
  ];
  
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (const empType of types) {
    cumulativeWeight += empType.weight;
    if (random <= cumulativeWeight) {
      return empType.type;
    }
  }
  
  return "Full-time"; // Default
};

// Generate comprehensive job descriptions
const getJobDescription = (title: string, company: string, employmentType: string) => {
  const openings = [
    `${company} is seeking a talented ${title} to join our team.`,
    `Join our team at ${company} as a ${title} and grow your career in beauty.`,
    `Exciting opportunity for a ${title} at ${company}, a premier beauty destination.`,
    `${company} is looking for an experienced ${title} to join our growing team.`
  ];
  
  const responsibilities = [
    "Provide exceptional customer service by understanding and meeting client needs.",
    "Maintain a clean, organized, and safe work environment at all times.",
    "Stay current with industry trends and techniques through continuing education.",
    "Build and maintain a loyal client base through outstanding service.",
    "Collaborate with team members to ensure smooth operations and excellent client experience.",
    "Promote and recommend appropriate products and services to clients.",
    "Adhere to all health and safety regulations and company procedures.",
    "Participate in team meetings and training sessions to enhance skills."
  ];
  
  const qualifications = [
    "Current cosmetology/barber/esthetician license as required by state law.",
    "Proven experience in a similar role, with strong technical skills.",
    "Excellent customer service and communication skills.",
    "Ability to work flexible hours including evenings and weekends.",
    "Team player with a positive attitude and professional appearance.",
    "Strong time management and organizational skills.",
    "Self-motivated with a commitment to ongoing learning and development.",
    "Experience with point of sale systems and booking software a plus."
  ];
  
  // Select random parts
  const opening = openings[Math.floor(Math.random() * openings.length)];
  
  // Select 3-4 random responsibilities
  const shuffledResp = [...responsibilities].sort(() => 0.5 - Math.random());
  const selectedResp = shuffledResp.slice(0, 3 + Math.floor(Math.random() * 2));
  
  // Select 3-4 random qualifications
  const shuffledQual = [...qualifications].sort(() => 0.5 - Math.random());
  const selectedQual = shuffledQual.slice(0, 3 + Math.floor(Math.random() * 2));
  
  // Add employment type specific details
  let empTypeDetails = "";
  if (employmentType === "Booth Rental") {
    empTypeDetails = "\n\nThis is a booth rental position, perfect for established professionals looking for independence while working in a supportive salon environment.";
  } else if (employmentType === "Commission") {
    empTypeDetails = "\n\nThis is a commission-based position with competitive rates and growth opportunities based on performance.";
  } else {
    empTypeDetails = `\n\nThis is a ${employmentType.toLowerCase()} position with a stable schedule and great team environment.`;
  }
  
  // Assemble description
  return `${opening}\n\nResponsibilities:\n- ${selectedResp.join("\n- ")}\n\nQualifications:\n- ${selectedQual.join("\n- ")}${empTypeDetails}`;
};

// Generate compensation details based on job title and employment type
const getCompensationDetails = (title: string, employmentType: string) => {
  let base = "";
  let range = "";
  
  // Determine base compensation type
  if (employmentType === "Booth Rental") {
    base = `$${200 + Math.floor(Math.random() * 400)}/week booth rental`;
  } else if (employmentType === "Commission") {
    base = `${45 + Math.floor(Math.random() * 25)}% commission`;
  } else {
    // Hourly rate varies by job title
    if (title.includes("Manager") || title.includes("Senior")) {
      base = `$${22 + Math.floor(Math.random() * 13)}/hour`;
    } else if (title.includes("Assistant") || title.includes("Receptionist") || title.includes("Front Desk")) {
      base = `$${15 + Math.floor(Math.random() * 7)}/hour`;
    } else {
      base = `$${18 + Math.floor(Math.random() * 10)}/hour`;
    }
  }
  
  // Add range information
  if (employmentType === "Booth Rental") {
    range = "Flexible schedule, keep 100% of your service revenue";
  } else if (employmentType === "Commission") {
    range = `+ tips, potential to earn $${800 + Math.floor(Math.random() * 700)}-$${1200 + Math.floor(Math.random() * 800)}/week`;
  } else {
    range = `+ tips, ${30 + Math.floor(Math.random() * 10)}-${35 + Math.floor(Math.random() * 10)} hours/week`;
  }
  
  // Add benefits for full-time positions
  let benefits = "";
  if (employmentType === "Full-time") {
    const possibleBenefits = [
      "Paid time off", "Health insurance options", "Product discounts", 
      "Continuing education", "Flexible scheduling", "Career advancement opportunities",
      "Retirement plan", "Commission bonuses"
    ];
    
    // Select 2-3 random benefits
    const shuffledBenefits = [...possibleBenefits].sort(() => 0.5 - Math.random());
    const selectedBenefits = shuffledBenefits.slice(0, 2 + Math.floor(Math.random() * 2));
    benefits = ` | Benefits: ${selectedBenefits.join(", ")}`;
  }
  
  return `${base} ${range}${benefits}`;
};

// Generate premium job listings
export const generatePremiumJobs = (count: number = 40): Job[] => {
  const jobs: Job[] = [];
  
  // Use some premium salons as the source for jobs
  const jobSalons = [...premiumSalons].sort(() => 0.5 - Math.random()).slice(0, count);
  
  for (let i = 0; i < count; i++) {
    // Use either an existing salon or create a new one
    const useSalon = i < jobSalons.length ? jobSalons[i] : jobSalons[Math.floor(Math.random() * jobSalons.length)];
    const salonType = useSalon.salon_type || "Nail Salon";
    
    // Generate job details
    const jobTitles = getJobTitles(salonType);
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const employmentType = getEmploymentType();
    
    const job: Job = {
      id: `premium-job-${i + 1}`,
      title: title,
      company: useSalon.company,
      location: useSalon.location,
      posted_at: getRecentDate(),
      created_at: getRecentDate(),
      description: getJobDescription(title, useSalon.company, employmentType),
      employment_type: employmentType,
      compensation_details: getCompensationDetails(title, employmentType),
      for_sale: false,
      is_featured: Math.random() > 0.7, // 30% are featured
      status: "active",
      image: getRandomJobImage(),
      salon_type: salonType,
      expires_at: getFutureDate(),
      boosted_until: getBoostedDate(),
      weekly_pay: Math.random() > 0.6, // 40% have weekly pay
      has_housing: Math.random() > 0.8, // 20% offer housing
      owner_will_train: Math.random() > 0.5, // 50% offer training
      no_supply_deduction: Math.random() > 0.7, // 30% have no supply deduction
      specialties: salonType === "Nail Salon" 
        ? ["Gel", "Acrylic", "Dip Powder", "Nail Art"].slice(0, 2 + Math.floor(Math.random() * 3)) 
        : undefined
    };
    
    jobs.push(job);
  }
  
  return jobs;
};

// Predefined high-quality job data that can be directly used
export const premiumJobs = generatePremiumJobs(40);

// Get featured jobs
export const getFeaturedJobs = (count: number = 3): Job[] => {
  const featured = premiumJobs.filter(job => job.is_featured);
  return featured.slice(0, count);
};
