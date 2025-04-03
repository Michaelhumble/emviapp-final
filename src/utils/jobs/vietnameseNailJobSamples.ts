
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

export const generateVietnameseNailSampleJobs = (count: number = 15): Job[] => {
  const sampleJobs: Job[] = [];
  
  // Create expired dates between 1-60 days ago
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const locationIndex = Math.floor(Math.random() * vietnameseNailLocations.length);
    const location = vietnameseNailLocations[locationIndex];
    const salonNameIndex = Math.floor(Math.random() * vietnameseNailSalonNames.length);
    const salonName = vietnameseNailSalonNames[salonNameIndex];
    
    const hasHousing = Math.random() > 0.6;
    const noSupplyDeduction = Math.random() > 0.5;
    const isFullTime = Math.random() > 0.3;
    const ownerName = generateOwnerName();
    const specialties = generateSpecialties();
    const phone = generatePhoneNumber();
    
    // Create expired date between 1-60 days ago
    const daysAgo = Math.floor(Math.random() * 60) + 1;
    const createdDate = addDays(now, -daysAgo).toISOString();
    
    const vietnameseDescription = generateExpiredJobDescription(`${location.city}, ${location.state}`, specialties);
    
    sampleJobs.push({
      id: `sample-vn-job-${i + 1}`,
      created_at: createdDate,
      title: `CẦN THỢ LÀM NAIL`,
      company: salonName,
      location: `${location.city}, ${location.state}`,
      salary_range: generateSalaryRange(),
      description: `We are looking for experienced nail technicians to join our salon. Great working environment with high-end clientele.`,
      vietnamese_description: vietnameseDescription,
      weekly_pay: true,
      owner_will_train: Math.random() > 0.7,
      employment_type: isFullTime ? "Full-Time" : "Part-Time",
      user_id: `sample-user-${i + 1}`,
      responsibilities: [
        "Perform manicures and pedicures",
        "Apply nail enhancements",
        "Maintain cleanliness of work area",
        "Provide excellent customer service"
      ],
      qualifications: [
        "Valid nail technician license",
        "Minimum 1-2 years experience",
        "Reliable and punctual",
        "Professional demeanor"
      ],
      benefits: generateBenefits(hasHousing, noSupplyDeduction),
      specialties: specialties,
      has_housing: hasHousing,
      no_supply_deduction: noSupplyDeduction,
      tip_range: generateTipRange(),
      company_description: `Tiệm tại khu ${location.city}, không khí làm việc vui vẻ, hòa đồng, không áp lực.`,
      contact_info: {
        phone: phone,
        owner_name: ownerName
      },
      trust_indicators: {
        verified: Math.random() > 0.5,
        activelyHiring: false, // These are expired
        chatAvailable: false // These are expired
      },
      is_sample: true
    });
  }
  
  return sampleJobs;
};
