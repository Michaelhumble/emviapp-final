
import { Job } from "@/types/job";

const getRandomOwnerName = () => {
  const names = [
    "Anh Nguyen", "Tuan Pham", "Kim Le", 
    "Linh Tran", "Minh Vu", "Hoa Nguyen"
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomPhone = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNum = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNum}`;
};

const getRandomEmail = () => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const names = ["nail", "beauty", "salon", "spa", "nailtech"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${name}${num}@${domain}`;
};

// Fix the location parsing - parse as string
const parseLocation = (location: string) => {
  const parts = location.split(',');
  if (parts.length === 2) {
    return {
      city: parts[0].trim(),
      state: parts[1].trim()
    };
  }
  return { city: location, state: '' };
};

// Replace getRandomWorkHours with generateRandomWorkHours
const generateRandomWorkHours = () => {
  const days = ["Mon-Sat", "Tue-Sun", "Mon-Fri", "Wed-Sun"];
  const hours = ["9AM-7PM", "10AM-8PM", "9:30AM-7:30PM", "10AM-6PM"];
  return `${days[Math.floor(Math.random() * days.length)]} ${hours[Math.floor(Math.random() * hours.length)]}`;
};

export const generateVietnameseNailJobs = (count: number): Job[] => {
  const jobTitles = [
    "Cần Thợ Bột/Gel Giỏi",
    "Tuyển Thợ Nail Có Kinh Nghiệm",
    "Tìm Thợ Tay Chân Nước",
    "Cần Gấp Thợ Nail Bao Lương",
    "Tuyển Thợ Nail Lương Cao",
    "Tìm Người Phụ Việc Nail",
    "Cần Thợ Nail Biết Vẽ",
    "Tuyển Thợ Nail Làm Full-Time/Part-Time",
    "Tìm Thợ Nail Khu Mỹ Trắng",
    "Cần Thợ Nail Chịu Khó"
  ];

  const descriptions = [
    "Tiệm nail khu Mỹ trắng, cần thợ bột/gel giỏi, có kinh nghiệm. Lương cao, tip hậu, môi trường làm việc thoải mái.",
    "Tuyển thợ nail có kinh nghiệm làm tay chân nước. Tiệm đông khách, khu vực sang trọng, lương thỏa thuận.",
    "Cần gấp thợ nail bao lương hoặc ăn chia. Tiệm mới mở, cần người phụ giúp, có chỗ ở cho thợ ở xa.",
    "Tìm thợ nail lương cao, có tay nghề. Tiệm khu trung tâm, khách hàng lịch sự, có thưởng thêm.",
    "Tuyển thợ nail biết vẽ và làm móng design. Tiệm chuyên về nail art, cần người sáng tạo, lương hấp dẫn.",
    "Cần người phụ việc nail, không cần kinh nghiệm. Sẽ được đào tạo, lương khởi điểm cao, có cơ hội thăng tiến.",
    "Tìm thợ nail khu Mỹ trắng, có bằng cấp. Tiệm nổi tiếng, khách hàng quen thuộc, lương ổn định.",
    "Tuyển thợ nail làm full-time hoặc part-time. Tiệm gần chợ, dễ đi lại, có chỗ đậu xe, lương cạnh tranh.",
    "Cần thợ nail chịu khó, siêng năng. Tiệm gia đình, cần người làm lâu dài, có bảo hiểm và phúc lợi tốt.",
    "Tìm thợ nail có kinh nghiệm làm everything. Tiệm mới renovate, cần người làm chính, lương cao và tip nhiều."
  ];

  const locations = [
    "Houston, TX",
    "Dallas, TX",
    "San Jose, CA",
    "Atlanta, GA",
    "Seattle, WA",
    "Austin, TX",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Miami, FL"
  ];

  const benefits = [
    "Bao Lương",
    "Ăn Chia",
    "Tip Cao",
    "Có Chỗ Ở",
    "Có Thưởng",
    "Có Bảo Hiểm",
    "Làm Trong Môi Trường Thoải Mái",
    "Khách Dễ Thương",
    "Chủ Dễ Tính",
    "Có Cơ Hội Học Hỏi"
  ];

  const sampleJobs: Job[] = [];

  for (let i = 0; i < count; i++) {
    const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomBenefits = benefits.sort(() => 0.5 - Math.random()).slice(0, 3);
    const { city, state } = parseLocation(randomLocation);

    const sampleJob: Job = {
      id: `vjob-${i + 1}`,
      title: randomTitle,
      company: `Tiệm Nail ${city}`,
      location: randomLocation,
      type: Math.random() > 0.5 ? 'Full-time' : 'Part-time',
      description: randomDescription,
      salary: `$${Math.floor(Math.random() * 500 + 700)}-${Math.floor(Math.random() * 500 + 1200)}/week`,
      posted_date: new Date(Date.now() - Math.floor(Math.random() * 20) * 86400000).toISOString(),
      closing_date: Math.random() > 0.3 ? new Date(Date.now() + Math.floor(Math.random() * 30 + 15) * 86400000).toISOString() : null,
      contact_email: getRandomEmail(),
      is_featured: Math.random() > 0.8,
      is_remote: false,
      experience_level: Math.random() > 0.5 ? "Experienced" : "Entry Level",
      created_at: new Date(Date.now() - Math.floor(Math.random() * 20) * 86400000).toISOString(),
      
      // These are required by Job type from types/job.ts
      compensation_type: "weekly",
      compensation_details: `$${Math.floor(Math.random() * 500 + 700)}-${Math.floor(Math.random() * 500 + 1200)}/week`,
      status: "active",
      expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
      requirements: "Cần có kinh nghiệm làm nails",
      is_sample: true,
      
      // Additional properties
      weekly_pay: Math.random() > 0.5,
      owner_will_train: Math.random() > 0.7,
      has_housing: Math.random() > 0.7,
      no_supply_deduction: Math.random() > 0.6,
      specialties: ["Dip Powder", "Acrylic", "Gel"].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
      vietnamese_description: randomDescription,
      tip_range: `$${Math.floor(Math.random() * 50 + 100)}-${Math.floor(Math.random() * 100 + 150)}/day`,
      contact_info: {
        owner_name: getRandomOwnerName(),
        phone: getRandomPhone(),
        email: getRandomEmail(),
      }
    };
    
    sampleJobs.push(sampleJob);
  }

  return sampleJobs;
};

// Helper function for other modules 
export const generateVietnameseNailSamples = () => {
  return generateVietnameseNailJobs(5);
};
