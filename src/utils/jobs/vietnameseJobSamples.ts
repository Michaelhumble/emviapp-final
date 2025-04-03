import { Job } from "@/types/job";
import { addDays } from "date-fns";

// Sample locations for Vietnamese nail salons
const vietnameseNailLocations = [
  { city: "Houston", state: "TX" },
  { city: "San Jose", state: "CA" },
  { city: "Westminster", state: "CA" },
  { city: "Garden Grove", state: "CA" },
  { city: "Atlanta", state: "GA" },
  { city: "Orlando", state: "FL" },
  { city: "Philadelphia", state: "PA" },
  { city: "Las Vegas", state: "NV" }
];

// Sample salon names
const vietnameseNailSalonNames = [
  "Queen Nails & Spa",
  "Luxe Nails",
  "Diamond Nails",
  "Rose Nails",
  "Paris Nails",
  "Crystal Nails",
  "Happy Nails & Spa",
  "Golden Nails"
];

// Helper function to generate random phone numbers
const generatePhoneNumber = (): string => {
  const area = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${lineNumber}`;
};

// Helper function to generate Vietnamese owner names
const generateOwnerName = (): string => {
  const firstNames = ["Hoa", "Linh", "Minh", "Tuan", "Anh", "Thu", "Lan", "Hai", "Thuy", "Phuong"];
  const lastNames = ["Nguyen", "Tran", "Le", "Pham", "Vo", "Dang", "Bui", "Do", "Ho", "Ngo"];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Generate salary range in Vietnamese format
const generateSalaryRange = (): string => {
  const minValues = [600, 700, 800, 900, 1000, 1100, 1200];
  const maxValues = [1300, 1400, 1500, 1600, 1800, 2000, 2200, 2500];
  
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  
  return `$${min} - $${max}/week`;
};

// Generate Vietnamese tip range
const generateTipRange = (): string => {
  const minValues = [100, 150, 200];
  const maxValues = [300, 350, 400, 500];
  
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  
  return `$${min}-${max}/ngày`;
};

// Generate nail specialties in Vietnamese
const generateSpecialties = (): string[] => {
  const allSpecialties = [
    "Acrylic Nails",
    "Gel Nails",
    "Dipping Powder",
    "Nail Art",
    "Pedicure",
    "Manicure",
    "Shellac",
    "Waxing",
    "Eyelash Extensions",
    "Facial"
  ];
  
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 specialties
  const result = [];
  
  while (result.length < count) {
    const specialty = allSpecialties[Math.floor(Math.random() * allSpecialties.length)];
    if (!result.includes(specialty)) {
      result.push(specialty);
    }
  }
  
  return result;
};

// Generate benefits in Vietnamese
const generateBenefits = (hasHousing: boolean): string[] => {
  const benefits: string[] = ["Tip cao ✨"];
  
  // Random additions
  if (Math.random() > 0.5) benefits.push("Bao lương 💰");
  if (hasHousing) benefits.push("Có chỗ ở 🏠");
  if (Math.random() > 0.3) benefits.push("Môi trường vui vẻ 😊");
  if (Math.random() > 0.6) benefits.push("Không khí gia đình 👨‍👩‍👧‍👦");
  if (Math.random() > 0.7) benefits.push("Thưởng cuối năm 🎁");
  
  return benefits;
};

// Generate Vietnamese job descriptions
const generateVietnameseDescription = (location: string, specialties: string[]): string => {
  const descriptions = [
    `Tiệm ở khu Mỹ trắng, khách sang, tip cao. Thợ làm trên 2 năm kinh nghiệm. Cần thợ ${specialties.join(", ")}.`,
    `Cần thợ nail gấp tại ${location}. Tiệm rộng rãi khang trang, khu Mỹ trắng, tip hậu.`,
    `Cần thợ có kinh nghiệm ${specialties.join(", ")}. Tiệm làm việc vui vẻ, không áp lực, lương thỏa thuận tùy năng lực.`,
    `Tiệm khu Mỹ sang, lịch sự, khách tip hậu. Giờ làm việc linh động. Cần thợ ${specialties[0]}.`,
    `Cần tuyển thợ nail có kinh nghiệm. Tiệm đông khách, khu sang, công bằng, vui vẻ.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Generate work hours in Vietnamese
const generateWorkHours = (): string => {
  const startHours = [9, 10];
  const endHours = [7, 8, 9];
  const start = startHours[Math.floor(Math.random() * startHours.length)];
  const end = endHours[Math.floor(Math.random() * endHours.length)];
  
  return `${start}am-${end}pm`;
};

// Helper function to generate random past date
const getRandomPastDate = (): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return addDays(now, -daysAgo);
};

// Helper function to generate random salon name
const getRandomSalonName = (): string => {
  const salonNameIndex = Math.floor(Math.random() * vietnameseNailSalonNames.length);
  return vietnameseNailSalonNames[salonNameIndex];
};

// Helper function to generate random location
const getRandomLocation = (): string => {
  const locationIndex = Math.floor(Math.random() * vietnameseNailLocations.length);
  return `${vietnameseNailLocations[locationIndex].city}, ${vietnameseNailLocations[locationIndex].state}`;
};

// Helper function to generate random job title
const getRandomJobTitle = (): string => {
  const specialties = generateSpecialties();
  return `CẦN THỢ NAIL ${specialties[0].toUpperCase()}`;
};

// Helper function to generate random description
const getRandomDescription = (): string => {
  return `We are looking for experienced nail technicians to join our salon.`;
};

// Helper function to generate random Vietnamese description
const getRandomVietnameseDescription = (): string => {
  const location = getRandomLocation();
  const specialties = generateSpecialties();
  return generateVietnameseDescription(location, specialties);
};

// Helper function to generate random work hours
const getRandomWorkHours = (): string => {
  return generateWorkHours();
};

// Helper function to generate random benefits
const getRandomBenefits = (): string[] => {
  const hasHousing = Math.random() > 0.7;
  return generateBenefits(hasHousing);
};

// Helper function to generate random owner name
const getRandomOwnerName = (): string => {
  return generateOwnerName();
};

// Helper function to generate random phone number
const getRandomPhone = (): string => {
  return generatePhoneNumber();
};

export const generateVietnameseNailSamples = (count: number): Job[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `sample-vietnamese-job-${i + 1}`;
    const createdDate = getRandomPastDate();
    const company = getRandomSalonName();
    const location = getRandomLocation();
    
    return {
      id,
      title: getRandomJobTitle(),
      company,
      location,
      salary_range: getRandomSalaryRange(),
      description: getRandomDescription(),
      vietnamese_description: getRandomVietnameseDescription(),
      created_at: createdDate.toISOString(),
      specialties: getRandomSpecialties(),
      weekly_pay: Math.random() > 0.5,
      owner_will_train: Math.random() > 0.6,
      has_housing: Math.random() > 0.7,
      work_hours: getRandomWorkHours(),
      benefits: getRandomBenefits(),
      contact_info: {
        owner_name: getRandomOwnerName(),
        phone: getRandomPhone()
      },
      is_sample: true,
      trust_indicators: {
        verified: Math.random() > 0.4,
        activelyHiring: Math.random() > 0.3
      },
      compensation_type: "hourly",
      compensation_details: getRandomSalaryRange(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active"
    };
  });
};
