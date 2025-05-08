
import { Job } from "@/types/job";

// This file contains Vietnamese job listings that must not be modified
export const vietnameseJobs: Job[] = [
  {
    id: "magic-nails-premium",
    title: "Magic Nails - Cần Thợ Bột + Chân Tay Nước",
    company: "Magic Nails",
    location: "Dallas, TX",
    description: "Magic Nails is looking for experienced nail technicians in Dallas.",
    vietnamese_description: "Tiệm Magic Nails cần thợ bột, thợ chân tay nước, thợ có kinh nghiệm, bao lương từ $1,200-$1,600/tuần tùy theo khả năng. Tiệm lớn, khách sang, giá cao, tip hậu. Có chỗ ở cho thợ ở xa. Tiệm đông khách quanh năm, cần thợ ngay.",
    created_at: "2023-09-01T12:00:00Z",
    status: "active",
    image: "/lovable-uploads/9f39ea95-e42c-4f4e-89a9-b44cb4e215e2.png",
    contact_info: {
      phone: "(214) 555-1234",
      email: "info@magicnails.com",
      owner_name: "Lisa"
    },
    is_featured: true,
    pricingTier: "premium",
    salary_range: "$1,200-$1,600/week",
    employment_type: "Full-Time",
    has_housing: true,
    weekly_pay: true
  },
  {
    id: "ruby-nails-gold",
    title: "Ruby Nails - Thợ Bột Full-time/Part-time",
    company: "Ruby Nails",
    location: "Houston, TX",
    description: "Ruby Nails is hiring nail technicians for our busy salon in Houston.",
    vietnamese_description: "Tiệm Ruby Nails ở Houston cần thợ bột full-time hoặc part-time, bao lương $1,100-$1,400/tuần. Khách Mỹ trắng, tip tốt, chỗ làm thoải mái. Liên hệ Amy để biết thêm chi tiết.",
    created_at: "2023-09-10T12:00:00Z",
    status: "active",
    image: "/lovable-uploads/abbd160d-295b-46cd-9777-d590aab8ddb0.png",
    contact_info: {
      phone: "(713) 555-6789",
      email: "ruby@nailshouston.com",
      owner_name: "Amy"
    },
    is_featured: true,
    pricingTier: "gold",
    salary_range: "$1,100-$1,400/week",
    employment_type: "Full-Time",
    has_housing: false,
    weekly_pay: true
  },
  {
    id: "vip-nails-diamond",
    title: "VIP Nails - Cần Thợ Nails Gấp",
    company: "VIP Nails",
    location: "Atlanta, GA",
    description: "VIP Nails is urgently hiring experienced nail technicians. Premium salon with high-end clients.",
    vietnamese_description: "Tiệm VIP Nails khu Buckhead sang trọng cần gấp thợ nails có kinh nghiệm. Lương $1,500-$2,000/tuần tùy khả năng. Bao lương, tip hậu, khách Mỹ trắng sang trọng. Chỗ làm lâu dài, thoải mái như gia đình.",
    created_at: "2023-08-28T12:00:00Z",
    status: "active",
    image: "/lovable-uploads/b1c1466d-1f17-43c4-9f63-16adf1d1a6c1.png",
    contact_info: {
      phone: "(404) 555-7890",
      email: "vipnails@atlantasalon.com",
      owner_name: "John"
    },
    is_featured: true,
    pricingTier: "diamond",
    salary_range: "$1,500-$2,000/week",
    employment_type: "Full-Time",
    has_housing: true,
    weekly_pay: true
  },
  {
    id: "elegant-nails-salon-free",
    title: "Elegant Nails - Cần Thợ Chân Tay Nước",
    company: "Elegant Nails",
    location: "Orlando, FL",
    description: "Elegant Nails is looking for pedicure specialists for our popular salon.",
    vietnamese_description: "Tiệm Elegant Nails cần thợ chân tay nước, bao lương $800-$1,000/tuần. Môi trường làm việc thân thiện, giờ giấc linh động. Không gian tiệm đẹp, khách tip tốt.",
    created_at: "2023-09-20T12:00:00Z",
    status: "active",
    image: "/lovable-uploads/ba3336a6-5d03-4522-85c0-05ff17e56a81.png",
    contact_info: {
      phone: "(407) 555-3456",
      email: "contact@elegantnailsorlando.com",
      owner_name: "Tina"
    },
    pricingTier: "free",
    salary_range: "$800-$1,000/week",
    employment_type: "Full-Time",
    weekly_pay: true
  },
  {
    id: "luxe-nails-spa-salon-for-sale",
    title: "Cần Sang Tiệm Nail - Khu Thương Mại Cao Cấp",
    company: "Luxe Nails & Spa",
    location: "Los Angeles, CA",
    description: "High-end nail salon for sale in premium shopping district with loyal clientele.",
    vietnamese_description: "Cần sang tiệm nail khu Los Angeles - Beverly Hills. Tiệm rộng 2,500sqft, 10 bàn, 8 ghế, đang hoạt động tốt với khách hàng ổn định. Giá sang $250,000 (thương lượng). Tiệm đẹp, mới remodel, thu nhập trung bình $45,000/tháng.",
    created_at: "2023-08-15T12:00:00Z",
    status: "active",
    image: "/lovable-uploads/7a58770c-404e-4259-b1a6-f044c8eefdc0.png",
    contact_info: {
      phone: "(310) 555-9876",
      email: "owner@luxenailsspa.com",
      owner_name: "Kevin"
    },
    pricingTier: "gold",
    is_salon_for_sale: true,
    sale_price: "$250,000",
    station_count: "10",
    monthly_revenue: "$45,000"
  },
  {
    id: "diamond-nails-expired",
    title: "Diamond Nails - Thợ Nails Lương Cao",
    company: "Diamond Nails",
    location: "Chicago, IL",
    description: "Diamond Nails is seeking experienced nail technicians for our high-end salon.",
    vietnamese_description: "Tiệm Diamond Nails khu Chicago cần thợ nails full time, lương cao, tip hậu. Bao lương $1,300-$1,700/tuần theo khả năng. Chỗ làm vui vẻ, nghỉ Chủ Nhật và các ngày lễ.",
    created_at: "2023-07-01T12:00:00Z",
    status: "expired",
    image: "/lovable-uploads/98f473d0-0359-4114-9bcc-c9aea3c6fcf6.png",
    contact_info: {
      phone: "(312) 555-5678",
      email: "info@diamondnailschicago.com",
      owner_name: "David"
    },
    pricingTier: "expired",
    salary_range: "$1,300-$1,700/week",
    employment_type: "Full-Time"
  }
];
