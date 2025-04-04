
import { Job } from "@/types/job";

// Sample Vietnamese nail technician job data
const vietnameseJobTemplate: Partial<Job> = {
  title: "Cần thợ nails gấp (urgently hiring nail techs)",
  description: "Tiệm đông khách, cần thợ bột và thợ chân tay nước. Lương cao, chia 6/4 thợ ăn 6. Bao lương $800-$1200 nếu thợ làm nhiều kinh nghiệm.",
  vietnamese_description: "Tiệm đông khách, cần thợ bột và thợ chân tay nước. Lương cao, chia 6/4 thợ ăn 6. Bao lương $800-$1200 nếu thợ làm nhiều kinh nghiệm.",
  company: "Luxury Nails & Spa",
  location: "Houston, TX",
  employment_type: "Full-time",
  salary_range: "$800-1200/week",
  weekly_pay: true,
  owner_will_train: true,
  has_housing: true,
  no_supply_deduction: true,
  specialties: ["bột", "chân tay nước", "gel", "waxing"],
  contact_info: {
    owner_name: "Hoa Nguyen",
    phone: "(123) 456-7890",
    email: "luxurynails@example.com"
  },
  tip_range: "$150-300/day",
  is_featured: true,
  is_remote: false,
};

// Generate Vietnamese nail jobs with variations
export const generateVietnameseNailJobs = (count: number = 5): Job[] => {
  const cities = [
    "Houston, TX",
    "Dallas, TX",
    "San Jose, CA",
    "Orlando, FL",
    "Atlanta, GA",
    "Philadelphia, PA",
    "Los Angeles, CA",
    "San Diego, CA",
    "Denver, CO"
  ];
  
  const salons = [
    "Luxury Nails & Spa",
    "Diamond Nails",
    "Queen Nails",
    "Crystal Nails",
    "Happy Nails",
    "Lovely Nails",
    "Perfect Nails",
    "Beautiful Nails",
    "VIP Nails"
  ];
  
  const jobTitles = [
    "Cần thợ nail gấp",
    "Cần thợ bột và thợ chân tay nước",
    "Tiệm mới khai trương cần thợ",
    "Thợ có kinh nghiệm lương cao",
    "Bao lương thợ nail"
  ];
  
  const descriptions = [
    "Tiệm đông khách, cần thợ bột và thợ chân tay nước. Lương cao, chia 6/4 thợ ăn 6.",
    "Cần thợ nail có kinh nghiệm, bao lương từ $800-$1200/tuần tùy theo khả năng.",
    "Tiệm mới khai trương, khu Mỹ trắng, cần nhiều thợ nail. Tip cao, chủ dễ tính.",
    "Income cao, chỗ ở thoải mái. Có thể bao lương nếu cần.",
    "Cần thợ biết làm đủ thứ, lương 6/4 hoặc có thể bao lương tùy khả năng."
  ];
  
  const specialtiesList = [
    ["bột", "chân tay nước", "gel"],
    ["bột", "chân tay nước", "waxing"],
    ["bột", "dipping", "gel"],
    ["full set", "pedicure", "waxing"],
    ["nail art", "chân tay nước", "bột"]
  ];
  
  const result: Job[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomNum = Math.floor(Math.random() * 5);
    
    const job: Job = {
      id: `vn-job-${i + 1}`,
      title: jobTitles[randomNum % jobTitles.length],
      company: salons[i % salons.length],
      location: cities[i % cities.length],
      employment_type: Math.random() > 0.3 ? "Full-time" : "Part-time",
      description: descriptions[randomNum],
      vietnamese_description: descriptions[randomNum],
      salary_range: `$${800 + randomNum * 100}-${1100 + randomNum * 100}/week`,
      weekly_pay: Math.random() > 0.3,
      owner_will_train: Math.random() > 0.5,
      has_housing: Math.random() > 0.7,
      no_supply_deduction: Math.random() > 0.6,
      specialties: specialtiesList[randomNum],
      contact_info: {
        owner_name: `Owner ${i + 1}`,
        phone: `(${100 + i}) 555-${1000 + i}`,
        email: `salon${i + 1}@example.com`
      },
      tip_range: `$${100 + randomNum * 20}-${200 + randomNum * 30}/day`,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + (30 + Math.floor(Math.random() * 30)) * 86400000).toISOString(),
      status: "active",
      compensation_type: "commission",
      compensation_details: `${60 + randomNum * 5}/${40 - randomNum * 5} split`,
      is_featured: Math.random() > 0.6,
      is_remote: false,
      experience_level: Math.random() > 0.5 ? "Experienced" : "Any level",
      requirements: "Valid work authorization required",
      posted_date: new Date().toISOString(),
      closing_date: null,
      contact_email: `salon${i + 1}@example.com`,
    };
    
    result.push(job);
  }
  
  return result;
};
