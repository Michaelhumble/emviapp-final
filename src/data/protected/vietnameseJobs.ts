
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-10.png"
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-11.png"
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-12.png"
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-13.png"
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-14.png"
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
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-15.png"
  }
];

// Gold jobs - Vietnamese Jobs
export const goldJobs: Job[] = [
  {
    id: "gold-1",
    title: "Cần Thợ Nail Ở Columbus, GA",
    company: "Luxury Nails and Spa",
    location: "Columbus, GA",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ biết bột, tay chân nước, design. Có chỗ ở cho thợ ở xa – môi trường làm việc vui vẻ, không tranh giành. Tiệm chuyên design – khách lịch sự, dễ thương. Gần Columbus Airport, trong shopping center.",
    contact_info: {
      phone: "(206) 355-5249 | (706) 221-3953"
    },
    salary_range: "$1,500 – $2,200/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(01).png"
  },
  {
    id: "gold-2",
    title: "Cần Thợ Nails Gấp – Houston, TX",
    company: "Nails & Spa",
    location: "Houston, TX",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ nail biết làm bột, tay chân nước. Thợ nam nữ đều ok. Full/Part-time. Tiệm nhỏ, không cạnh tranh. Không khí làm việc vui vẻ, hòa đồng. Chủ nhật nghỉ.",
    contact_info: {
      phone: "(832) 489-6956"
    },
    salary_range: "$800–$1,000/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(04).png"
  },
  {
    id: "gold-3",
    title: "Cần Gấp Thợ – Placerville, CA",
    company: "V Star Nails Spa",
    location: "Placerville, CA",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ biết bột, dip, tay chân nước. Bao lương hoặc ăn chia tùy tay nghề. Khu đông khách, giá cao, típ hậu. Làm vui vẻ, hoà đồng, ổn định quanh năm.",
    contact_info: {
      phone: "(209) 715-9244 | (530) 622-8918"
    },
    salary_range: "$1,200–$1,600/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated02.png"
  },
  {
    id: "gold-4",
    title: "Tuyển Thợ Bột – Houston, TX",
    company: "HK3 Nails",
    location: "Houston, TX",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ bột (có thể design càng tốt). Gần chợ Thắng Hưng, khu khách mix, tip cao. Không trừ supply và clean-up.",
    contact_info: {
      phone: "(832) 513-0833"
    },
    salary_range: "$900–$1,200/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(003).png"
  },
  {
    id: "gold-5",
    title: "Tuyển Gấp Thợ Bột – Gần Bolsa",
    company: "OC Nails",
    location: "Orange County, CA",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ bột, design, Gel X, Builder Gel, Dipping, Waxing. Khu khách dễ thương, có supply design. Bao lương. Không drama, chia công bằng.",
    contact_info: {
      phone: "(714) 330-5950"
    },
    salary_range: "$1,500+ (tuỳ tay nghề)",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated-26.png"
  },
  {
    id: "gold-6",
    title: "Cần Thợ Nail – Champaign, IL",
    company: "Nail Empire",
    location: "Champaign, IL",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần thợ biết làm bột, tay chân nước, wax. 3 tiệm lớn, có manager, chia công bằng. Không trừ supply. Có chỗ ở. Không drama, môi trường thoải mái.",
    contact_info: {
      phone: "(817) 501-6750"
    },
    salary_range: "$1,000–$1,400/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(5).png"
  },
  {
    id: "gold-7",
    title: "Tuyển Thợ Nail – Massachusetts",
    company: "M.A. Nails",
    location: "Massachusetts",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Tiệm Mỹ trắng, không drama. Bao lương nếu biết vẽ, shape chuẩn. Có phòng riêng gần tiệm. Làm lâu dài, ổn định.",
    contact_info: {
      phone: "617-540-2096"
    },
    salary_range: "$1,500–$2,200/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(2).png"
  },
  {
    id: "gold-8",
    title: "Tuyển Thợ – Woodbridge",
    company: "Woodbridge Nail Bar",
    location: "Woodbridge, VA",
    created_at: new Date("2025-05-08").toISOString(),
    description: "Cần nữ thợ biết everything. Bao lương hoặc ăn chia 6/4. Khu da trắng, tip hậu. Có đưa đón North York. Yêu cầu có số SIN.",
    contact_info: {
      phone: "647-998-1488"
    },
    salary_range: "$1,400–$1,600/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated%20(1)0.png"
  }
];

// Export combined listing for convenience
export const allVietnameseListings = [...vietnameseJobs];
