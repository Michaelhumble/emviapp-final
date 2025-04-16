import { Job } from "@/types/job";

// Generate Vietnamese nail job samples
export const generateVietnameseNailJobs = () => {
  // Implementation would go here
  return [];
};

// Sample Vietnamese nail job data
export const vietnameseNailJobs: Job[] = [
  {
    id: "vn-nail-1",
    title: "Thợ Nail Kinh Nghiệm (Experienced Nail Technician)",
    company: "Luxury Nails & Spa",
    location: "Westminster, CA",
    description: "Cần thợ nail có kinh nghiệm, bao lương từ $1,200/tuần trở lên tùy theo khả năng. Tiệm đông khách, tip cao, chỗ làm thoải mái.",
    vietnamese_description: "Cần thợ nail có kinh nghiệm, bao lương từ $1,200/tuần trở lên tùy theo khả năng. Tiệm đông khách, tip cao, chỗ làm thoải mái.",
    employment_type: "Full-time",
    salary_range: "$1,200 - $1,800/week",
    created_at: new Date().toISOString(),
    contact_info: {
      phone: "(714) 555-1234",
      email: "luxurynails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    benefits: ["Bao lương", "Có chỗ ở", "Đón từ phi trường"],
    specialties: ["Acrylic", "Gel-X", "Dip Powder"],
    salon_features: ["Tiệm đông khách", "Tip cao", "Chỗ làm thoải mái"]
  },
  {
    id: "vn-nail-2",
    title: "Cần Thợ Bột (Acrylic Nail Technician)",
    company: "Diamond Nails",
    location: "Garden Grove, CA",
    description: "Cần thợ bột nam/nữ, lương $1,000-$1,400/tuần. Chỗ làm vui vẻ, không khí gia đình, có thể bao ăn ở.",
    vietnamese_description: "Cần thợ bột nam/nữ, lương $1,000-$1,400/tuần. Chỗ làm vui vẻ, không khí gia đình, có thể bao ăn ở.",
    employment_type: "Full-time",
    salary_range: "$1,000 - $1,400/week",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(714) 555-5678",
      email: "diamondnails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    benefits: ["Bao ăn ở", "Lương cao", "Môi trường thân thiện"],
    specialties: ["Bột", "Acrylic", "Pink & White"],
    salon_features: ["Không khí gia đình", "Tiệm rộng rãi", "Khu vực đông dân cư Việt Nam"]
  },
  {
    id: "vn-nail-3",
    title: "Thợ Nail Tay Chân Nước (Manicurist/Pedicurist)",
    company: "Elegant Nails",
    location: "Houston, TX",
    description: "Cần thợ nail biết làm tay chân nước, lương $800-$1,200/tuần. Tiệm mới remodel, khu Mỹ trắng, giá dịch vụ cao.",
    vietnamese_description: "Cần thợ nail biết làm tay chân nước, lương $800-$1,200/tuần. Tiệm mới remodel, khu Mỹ trắng, giá dịch vụ cao.",
    employment_type: "Full-time",
    salary_range: "$800 - $1,200/week",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(281) 555-9012",
      email: "elegantnails@example.com"
    },
    weekly_pay: true,
    has_housing: false,
    owner_will_train: true,
    benefits: ["Bao lương", "Có thể đón từ phi trường", "Giờ làm việc linh hoạt"],
    specialties: ["Tay chân nước", "Waxing", "Facial"],
    salon_features: ["Tiệm mới remodel", "Khu Mỹ trắng", "Giá dịch vụ cao"]
  },
  {
    id: "vn-nail-4",
    title: "Cần Thợ Nail Biết Làm Bột (Nail Tech with Acrylic Skills)",
    company: "Paris Nails & Spa",
    location: "San Jose, CA",
    description: "Cần thợ nail biết làm bột, ombre, gel-x. Lương $1,300-$1,800/tuần. Tiệm khu Mỹ trắng, tip hậu, chủ dễ tính.",
    vietnamese_description: "Cần thợ nail biết làm bột, ombre, gel-x. Lương $1,300-$1,800/tuần. Tiệm khu Mỹ trắng, tip hậu, chủ dễ tính.",
    employment_type: "Full-time",
    salary_range: "$1,300 - $1,800/week",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(408) 555-3456",
      email: "parisnails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    benefits: ["Bao lương", "Có chỗ ở", "Đón từ phi trường"],
    specialties: ["Bột", "Ombre", "Gel-X"],
    salon_features: ["Khu Mỹ trắng", "Tip hậu", "Chủ dễ tính"]
  },
  {
    id: "vn-nail-5",
    title: "Thợ Nail Nam/Nữ (Male/Female Nail Technician)",
    company: "Crystal Nails",
    location: "Atlanta, GA",
    description: "Cần thợ nail nam/nữ, biết làm đủ thứ càng tốt. Lương $900-$1,500/tuần tùy theo khả năng. Bao ăn ở nếu cần.",
    vietnamese_description: "Cần thợ nail nam/nữ, biết làm đủ thứ càng tốt. Lương $900-$1,500/tuần tùy theo khả năng. Bao ăn ở nếu cần.",
    employment_type: "Full-time",
    salary_range: "$900 - $1,500/week",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(404) 555-7890",
      email: "crystalnails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: true,
    benefits: ["Bao ăn ở", "Lương cao", "Môi trường thân thiện"],
    specialties: ["Full set", "Gel polish", "Pedicure"],
    salon_features: ["Tiệm đông khách", "Khu thương mại", "Có chỗ đậu xe rộng rãi"]
  },
  {
    id: "vn-nail-6",
    title: "Cần Thợ Nail Có Kinh Nghiệm (Experienced Nail Tech)",
    company: "Luxury Beauty Lounge",
    location: "Orlando, FL",
    description: "Cần thợ nail có kinh nghiệm, lương $1,100-$1,600/tuần. Tiệm khu Mỹ trắng, khách sang, tip tốt, chỗ làm sạch sẽ.",
    vietnamese_description: "Cần thợ nail có kinh nghiệm, lương $1,100-$1,600/tuần. Tiệm khu Mỹ trắng, khách sang, tip tốt, chỗ làm sạch sẽ.",
    employment_type: "Full-time",
    salary_range: "$1,100 - $1,600/week",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(407) 555-2345",
      email: "luxurybeauty@example.com"
    },
    weekly_pay: true,
    has_housing: false,
    owner_will_train: false,
    benefits: ["Bao lương", "Giờ làm việc linh hoạt", "Không khí làm việc thoải mái"],
    specialties: ["Acrylic", "Gel", "Nail art"],
    salon_features: ["Khu Mỹ trắng", "Khách sang", "Tip tốt", "Chỗ làm sạch sẽ"]
  },
  {
    id: "vn-nail-7",
    title: "Thợ Nail Part-time (Part-time Nail Technician)",
    company: "Glamour Nails",
    location: "Dallas, TX",
    description: "Cần thợ nail part-time, 3-4 ngày/tuần, lương $700-$900/tuần. Tiệm đông khách, khu shopping center.",
    vietnamese_description: "Cần thợ nail part-time, 3-4 ngày/tuần, lương $700-$900/tuần. Tiệm đông khách, khu shopping center.",
    employment_type: "Part-time",
    salary_range: "$700 - $900/week",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(214) 555-6789",
      email: "glamournails@example.com"
    },
    weekly_pay: true,
    has_housing: false,
    owner_will_train: true,
    benefits: ["Giờ làm việc linh hoạt", "Môi trường thân thiện", "Có thể học thêm kỹ năng mới"],
    specialties: ["Basic manicure", "Pedicure", "Gel polish"],
    salon_features: ["Tiệm đông khách", "Khu shopping center", "Dễ đậu xe"]
  },
  {
    id: "vn-nail-8",
    title: "Cần Thợ Nail Mới Ra Trường (Entry-level Nail Tech)",
    company: "Happy Nails & Spa",
    location: "Seattle, WA",
    description: "Cần thợ nail mới ra trường, chủ sẽ đào tạo thêm. Lương $600-$900/tuần tùy theo khả năng. Môi trường làm việc thân thiện.",
    vietnamese_description: "Cần thợ nail mới ra trường, chủ sẽ đào tạo thêm. Lương $600-$900/tuần tùy theo khả năng. Môi trường làm việc thân thiện.",
    employment_type: "Full-time",
    salary_range: "$600 - $900/week",
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(206) 555-0123",
      email: "happynails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: true,
    benefits: ["Đào tạo thêm", "Bao ăn ở", "Môi trường thân thiện"],
    specialties: ["Basic nail care", "Gel polish", "Basic pedicure"],
    salon_features: ["Chủ dễ tính", "Đồng nghiệp thân thiện", "Có cơ hội thăng tiến"]
  },
  {
    id: "vn-nail-9",
    title: "Thợ Nail Chân Tay Nước (Manicurist/Pedicurist)",
    company: "Serene Day Spa",
    location: "Chicago, IL",
    description: "Cần thợ nail biết làm chân tay nước, waxing càng tốt. Lương $800-$1,100/tuần. Tiệm spa cao cấp, khách hàng sang trọng.",
    vietnamese_description: "Cần thợ nail biết làm chân tay nước, waxing càng tốt. Lương $800-$1,100/tuần. Tiệm spa cao cấp, khách hàng sang trọng.",
    employment_type: "Full-time",
    salary_range: "$800 - $1,100/week",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(312) 555-4567",
      email: "serenedayspa@example.com"
    },
    weekly_pay: true,
    has_housing: false,
    owner_will_train: false,
    benefits: ["Bao lương", "Môi trường sang trọng", "Tip cao"],
    specialties: ["Manicure", "Pedicure", "Waxing", "Facial"],
    salon_features: ["Spa cao cấp", "Khách hàng sang trọng", "Dịch vụ đa dạng"]
  },
  {
    id: "vn-nail-10",
    title: "Cần Thợ Nail Biết Làm Bột/Gel (Acrylic/Gel Nail Tech)",
    company: "VIP Nails & Lashes",
    location: "Las Vegas, NV",
    description: "Cần thợ nail biết làm bột/gel, lương $1,200-$1,700/tuần. Tiệm khu casino, khách du lịch, tip rất cao.",
    vietnamese_description: "Cần thợ nail biết làm bột/gel, lương $1,200-$1,700/tuần. Tiệm khu casino, khách du lịch, tip rất cao.",
    employment_type: "Full-time",
    salary_range: "$1,200 - $1,700/week",
    created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    contact_info: {
      phone: "(702) 555-8901",
      email: "vipnails@example.com"
    },
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    benefits: ["Bao lương", "Có chỗ ở", "Tip rất cao"],
    specialties: ["Acrylic", "Gel", "Nail art", "Lashes"],
    salon_features: ["Khu casino", "Khách du lịch", "Giá dịch vụ cao"]
  }
];

// Export the Vietnamese nail jobs
export default vietnameseNailJobs;
