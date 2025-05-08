
import { Job } from "@/types/job";

// Vietnamese job listings - PROTECTED REAL CONTENT - DO NOT MODIFY
export const vietnameseJobs: Job[] = [
  {
    id: "viet-job-1",
    title: "Cần Thợ Nails Gấp - $1,500-2,500/tuần",
    company: "Beauty Nails & Spa",
    location: "Philadelphia, PA",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail làm bột hoặc chân tay nước, bao lương $1,500-2,500/tuần tùy theo kinh nghiệm. Tiệm khu Mỹ trắng, tip cao, chủ dễ tính, không làm chủ nhật.",
    vietnamese_description: "Cần gấp thợ nail làm bột hoặc chân tay nước, bao lương $1,500-2,500/tuần tùy theo kinh nghiệm. Tiệm khu Mỹ trắng, tip cao, chủ dễ tính, không làm chủ nhật.",
    contact_info: {
      phone: "(215) 123-4567",
      owner_name: "Bác Kim"
    },
    salary_range: "$1,500-$2,500/tuần",
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-1.jpg"
  },
  {
    id: "viet-job-2",
    title: "Tiệm Vùng Boston Cần Thợ Nails",
    company: "Boston Luxury Nails",
    location: "Boston, MA",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm vùng Boston cần thợ nails biết làm đủ thứ, lương cao, đường xa chủ đón, nhà rent ở gần tiệm giá rẻ $400/tháng, tiệm đông khách quanh năm.",
    vietnamese_description: "Tiệm vùng Boston cần thợ nails biết làm đủ thứ, lương cao, đường xa chủ đón, nhà rent ở gần tiệm giá rẻ $400/tháng, tiệm đông khách quanh năm.",
    contact_info: {
      phone: "(617) 456-7890",
      owner_name: "Chị Hương"
    },
    salary_range: "$1,400-$2,000/tuần",
    weekly_pay: true,
    has_housing: true,
    owner_will_train: true,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-2.jpg"
  },
  {
    id: "viet-job-3",
    title: "Tìm Thợ Biết Làm Bột - Los Angeles",
    company: "LA Beautiful Nails",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở Los Angeles gần khu người Việt cần thợ biết làm bột, KHÔNG CẦN KINH NGHIỆM, chủ sẽ training. Lương $1,200-$1,500/tuần tuỳ theo tay nghề.",
    vietnamese_description: "Tiệm ở Los Angeles gần khu người Việt cần thợ biết làm bột, KHÔNG CẦN KINH NGHIỆM, chủ sẽ training. Lương $1,200-$1,500/tuần tuỳ theo tay nghề.",
    contact_info: {
      phone: "(323) 789-0123",
      owner_name: "Anh Tâm"
    },
    salary_range: "$1,200-$1,500/tuần",
    weekly_pay: true,
    has_housing: false,
    owner_will_train: true,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-3.jpg"
  },
  {
    id: "viet-job-4",
    title: "Cần Thợ Nail Toàn Thời Gian/Part Time",
    company: "Chicago Nails & Spa",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm vùng Chicago, cần thợ nails gấp làm full-time hoặc part-time, sẵn sàng cho tập sự, lương hậu, làm ở khu Mỹ 100%.",
    vietnamese_description: "Tiệm vùng Chicago, cần thợ nails gấp làm full-time hoặc part-time, sẵn sàng cho tập sự, lương hậu, làm ở khu Mỹ 100%.",
    contact_info: {
      phone: "(312) 345-6789",
      owner_name: "Cô Linh"
    },
    salary_range: "$1,000-$1,800/tuần",
    weekly_pay: false,
    has_housing: false,
    owner_will_train: true,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-4.jpg"
  },
  {
    id: "viet-job-5",
    title: "Thợ Chân Tay Nước - Dallas, TX",
    company: "Texas Star Nails",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chân tay nước ở Dallas, bao lương tuần $1,300 trở lên tùy theo tay nghề. Tiệm đông khách, tips hậu, có thể share phòng với thợ khác.",
    vietnamese_description: "Cần thợ chân tay nước ở Dallas, bao lương tuần $1,300 trở lên tùy theo tay nghề. Tiệm đông khách, tips hậu, có thể share phòng với thợ khác.",
    contact_info: {
      phone: "(214) 456-7890",
      owner_name: "Anh Quân"
    },
    salary_range: "$1,300+/tuần",
    weekly_pay: true,
    has_housing: true,
    owner_will_train: false,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-5.jpg"
  },
  {
    id: "viet-job-6",
    title: "Cần Người Biết Làm Eyebrow Threading",
    company: "Seattle Beauty & Brows",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm đẹp ở Seattle cần thợ làm eyebrow threading và wax. Có thể đào tạo nếu biết làm nail muốn học thêm. Lương $1,200-$2,000/tuần.",
    vietnamese_description: "Tiệm đẹp ở Seattle cần thợ làm eyebrow threading và wax. Có thể đào tạo nếu biết làm nail muốn học thêm. Lương $1,200-$2,000/tuần.",
    contact_info: {
      phone: "(206) 890-1234",
      owner_name: "Chị Nga"
    },
    salary_range: "$1,200-$2,000/tuần",
    weekly_pay: true,
    has_housing: false,
    owner_will_train: true,
    pricingTier: "featured",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-6.jpg"
  }
];

// Gold jobs - Vietnamese Jobs
export const goldJobs: Job[] = vietnameseJobs;

// Export combined listing for convenience
export const allVietnameseListings = [...vietnameseJobs];
