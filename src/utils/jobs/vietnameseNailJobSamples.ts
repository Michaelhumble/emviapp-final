
import { Job } from '@/types/job';

// Sample Vietnamese nail job for testing
export const sampleVietnameseNailJob: Job = {
  id: "vietnamese-sample-1",
  title: "Cần Thợ Nail Gấp",
  role: "Thợ Nail",
  company: "Golden Nails Spa",
  location: "Westminster, CA",
  employment_type: "Full-time",
  description: "Cần gấp thợ nail biết làm bột và chân tay nước. Tiệm đông khách, lương cao.",
  vietnamese_description: "Tiệm nail cần tuyển thợ có kinh nghiệm. Lương từ $800-1200/tuần tùy theo khả năng.",
  salary_range: "$800-1200/tuần",
  created_at: new Date().toISOString(),
  contact_info: {
    phone: "(714) 555-0123",
    owner_name: "Chị Lan"
  },
  specialties: ["Acrylic", "Gel", "Pedicure"],
  tip_range: "$50-100/ngày",
  weekly_pay: true,
  owner_will_train: true,
  has_housing: false,
  no_supply_deduction: true,
  is_vietnamese_listing: true,
  image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
  category: "Nail Tech" // Added category
};

// Helper functions for generating Vietnamese job samples

// Get a random salary range for job listings
const getRandomSalaryRange = () => {
  const ranges = [
    "$800-1200/week", 
    "$1000-1500/week", 
    "$900-1300/week", 
    "$700-1100/week",
    "$1200-1800/week"
  ];
  return ranges[Math.floor(Math.random() * ranges.length)];
};

// Get random specialties for job listings
const getRandomSpecialties = () => {
  const specialties = [
    ["Acrylic", "Gel", "Pedicure"],
    ["Dip Powder", "Nail Art", "Manicure"],
    ["Acrylic", "Pedicure"],
    ["Gel", "Nail Art", "Manicure", "Pedicure"],
    ["Dip Powder", "Acrylic", "Gel"]
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
};

export const generateVietnameseNailSamples = () => {
  // Sample function to generate Vietnamese nail job samples
  // Implementation will be added when needed
  return [];
};

export const generateVietnameseNailJobs = (count = 5) => {
  const jobs = [];
  
  for (let i = 0; i < count; i++) {
    jobs.push({
      salary_range: getRandomSalaryRange(),
      specialties: getRandomSpecialties(),
      category: "Nail Tech" // Added category
    });
  }
  
  return jobs;
};
