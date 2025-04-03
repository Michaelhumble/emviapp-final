import { Job } from "@/types/job";
import { addDays } from "date-fns";

const vietnameseNailLocations = [
  { city: "Lewisville", state: "TX" },
  { city: "Houston", state: "TX" },
  { city: "San Jose", state: "CA" },
  { city: "Downingtown", state: "PA" },
  { city: "Glen Mills", state: "PA" },
  { city: "Tallahassee", state: "FL" },
  { city: "Lees Summit", state: "MO" },
  { city: "Las Vegas", state: "NV" },
  { city: "Westminster", state: "CA" },
  { city: "Garden Grove", state: "CA" },
  { city: "Atlanta", state: "GA" },
  { city: "Irving", state: "TX" },
  { city: "Arlington", state: "TX" },
  { city: "Philadelphia", state: "PA" },
  { city: "Orlando", state: "FL" }
];

const vietnameseNailSalonNames = [
  "Lucky Nails & Spa",
  "Queen Nails",
  "Diamond Nails",
  "Rose Nails",
  "Paris Nails",
  "Crystal Nails",
  "Happy Nails & Spa",
  "Luxury Nails",
  "Golden Nails",
  "Elegant Nails",
  "VIP Nails & Spa",
  "Royal Nails",
  "Star Nails",
  "Glamour Nails",
  "Perfect Nails & Spa"
];

const generatePhoneNumber = (): string => {
  const area = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${lineNumber}`;
};

const generateOwnerName = (): string => {
  const firstNames = ["Hoa", "Linh", "Minh", "Tuan", "Anh", "Thu", "Lan", "Hai", "Thuy", "Phuong", "Trang", "Van", "Nga", "Thanh", "Huong"];
  const lastNames = ["Nguyen", "Tran", "Le", "Pham", "Vo", "Dang", "Bui", "Do", "Ho", "Ngo", "Duong", "Ly", "Huynh", "Vu", "Mai"];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

const generateSalaryRange = (): string => {
  const minValues = [700, 800, 900, 1000, 1100, 1200];
  const maxValues = [1300, 1400, 1500, 1600, 1800, 2000];
  
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  
  return `$${min}-${max}/tuần`;
};

const generateTipRange = (): string => {
  const minValues = [100, 150, 200];
  const maxValues = [300, 350, 400, 500];
  
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  
  return `$${min}-${max}/ngày`;
};

const generateSpecialties = (): string[] => {
  const allSpecialties = ["Chân tay nước", "Dip", "Bột", "Waxing", "Gel-X", "Làm chân", "Làm tay", "Nail Art"];
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 specialties
  const shuffled = [...allSpecialties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateBenefits = (hasHousing: boolean, noSupplyDeduction: boolean): string[] => {
  const benefits: string[] = ["Tip cao ✨"];
  
  // Random additions
  if (Math.random() > 0.5) benefits.push("Bao lương 💰");
  if (hasHousing) benefits.push("Có chỗ ở 🏠");
  if (noSupplyDeduction) benefits.push("Không trừ supply ✅");
  if (Math.random() > 0.3) benefits.push("Môi trường vui vẻ 😊");
  if (Math.random() > 0.6) benefits.push("Không khí gia đình 👨‍👩‍👧‍👦");
  if (Math.random() > 0.7) benefits.push("Thưởng cuối năm 🎁");
  
  return benefits;
};

const generateExpiredJobDescription = (location: string, specialties: string[]): string => {
  const descriptions = [
    `Tiệm ở khu Mỹ trắng, khách sang, tip cao. Thợ làm trên 2 năm kinh nghiệm. Cần thợ ${specialties.join(", ")}.`,
    `Cần thợ nail gấp tại ${location}. Tiệm rộng rãi khang trang, khu Mỹ trắng, tip hậu.`,
    `Cần thợ có kinh nghiệm ${specialties.join(", ")}. Tiệm làm việc vui vẻ, không áp lực, lương thỏa thuận tùy năng lực.`,
    `Tiệm khu Mỹ sang, lịch sự, khách tip hậu. Giờ làm việc linh động. Cần thợ ${specialties[0]}.`,
    `Cần tuyển thợ nail có kinh nghiệm. Tiệm đông khách, khu sang, công bằng, vui vẻ.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomDateWithinRange = (minDays: number, maxDays: number): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  return addDays(now, -daysAgo);
};

const getRandomLocation = (): string => {
  const locationIndex = Math.floor(Math.random() * vietnameseNailLocations.length);
  return `${vietnameseNailLocations[locationIndex].city}, ${vietnameseNailLocations[locationIndex].state}`;
};

const getRandomSpecialty = (): string => {
  const specialties = generateSpecialties();
  return specialties[Math.floor(Math.random() * specialties.length)];
};

const getRandomSalaryRange = (): string => {
  const minValues = [600, 700, 800, 900, 1000, 1100, 1200];
  const maxValues = [1300, 1400, 1500, 1600, 1800, 2000, 2200, 2500];
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  return `$${min} - $${max}/week`;
};

const getRandomTipRange = (): string => {
  const minValues = [100, 150, 200];
  const maxValues = [300, 350, 400, 500];
  
  const min = minValues[Math.floor(Math.random() * minValues.length)];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  
  return `$${min}-${max}/ngày`;
};

const generateRandomBenefits = (): string[] => {
  const benefits: string[] = ["Tip cao ✨"];
  
  // Random additions
  if (Math.random() > 0.5) benefits.push("Bao lương 💰");
  if (Math.random() > 0.6) benefits.push("Có chỗ ở 🏠");
  if (Math.random() > 0.7) benefits.push("Không trừ supply ✅");
  if (Math.random() > 0.3) benefits.push("Môi trường vui vẻ 😊");
  if (Math.random() > 0.6) benefits.push("Không khí gia đình 👨‍👩‍👧‍👦");
  if (Math.random() > 0.7) benefits.push("Thưởng cuối năm 🎁");
  
  return benefits;
};

const generateRandomTitle = (specialty: string): string => {
  return `CẦN THỢ LÀM NAIL ${specialty}`;
};

const generateRandomDescription = (specialty: string): string => {
  return `We are looking for experienced nail technicians to join our salon. Great working environment with high-end clientele.`;
};

const generateRandomVietnameseDescription = (specialty: string, location: string, salary: string): string => {
  return generateExpiredJobDescription(`${location.city}, ${location.state}`, [specialty]);
};

const generateRandomCompanyName = (): string => {
  return "Lucky Nails & Spa";
};

const generateRandomPhone = (): string => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

const generateRandomEmail = (): string => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const names = ["nailsalon", "beautynails", "luxurynails", "vipnails", "starnails", "topnails"];
  const numbers = ["", "1", "2", "123", "88", "99", "777"];
  const name = names[Math.floor(Math.random() * names.length)] + numbers[Math.floor(Math.random() * numbers.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
};

const generateRandomWorkHours = (): string => {
  const startHours = ["9am", "10am", "8am"];
  const endHours = ["7pm", "8pm", "9pm", "10pm"];
  return `${startHours[Math.floor(Math.random() * startHours.length)]} - ${endHours[Math.floor(Math.random() * endHours.length)]}`;
};

const parseCityState = (location: string): {city: string, state: string} => {
  const parts = location.split(',');
  return {
    city: parts[0]?.trim() || '',
    state: parts[1]?.trim() || ''
  };
};

const generateRandomSpecialties = (): string[] => {
  const allSpecialties = ["Chân tay nước", "Dip", "Bột", "Waxing", "Gel-X", "Làm chân", "Làm tay", "Nail Art"];
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 specialties
  const shuffled = [...allSpecialties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateVietnameseNailSampleJobs = (count: number): Job[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `sample-nail-job-${i + 1}`;
    const createdDate = getRandomDateWithinRange(30, 180);
    const location = getRandomLocation();
    const specialty = getRandomSpecialty();
    const salary = getRandomSalaryRange();
    const benefits = generateRandomBenefits();
    const title = generateRandomTitle(specialty);
    
    return {
      id,
      title,
      company: generateRandomCompanyName(),
      location,
      salary_range: salary,
      description: generateRandomDescription(specialty),
      vietnamese_description: generateRandomVietnameseDescription(specialty, location, salary),
      created_at: createdDate.toISOString(),
      specialties: generateRandomSpecialties(),
      weekly_pay: Math.random() > 0.3,
      owner_will_train: Math.random() > 0.4,
      has_housing: Math.random() > 0.6,
      no_supply_deduction: Math.random() > 0.7,
      tip_range: getRandomTipRange(),
      benefits,
      work_hours: getRandomWorkHours(),
      contact_info: {
        owner_name: getRandomOwnerName(),
        phone: getRandomPhone(),
        email: getRandomEmail()
      },
      is_sample: true,
      trust_indicators: {
        verified: Math.random() > 0.3,
        activelyHiring: true,
        chatAvailable: Math.random() > 0.5
      },
      compensation_type: "hourly",
      compensation_details: salary,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active"
    };
  });
};
