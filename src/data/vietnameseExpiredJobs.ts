
import { Job } from "@/types/job";

export const vietnameseExpiredJobs: Job[] = [
  {
    id: "vn-expired-job-1",
    title: "Thợ Nail làm ở Westminster",
    location: "Westminster, CA",
    created_at: "2022-11-15T00:00:00Z",
    vietnamese_description: "Cần thợ bột, thợ chân tay nước, có kinh nghiệm, lương cao và chia 6/4, môi trường làm việc tốt.",
    description: "Need experienced acrylic and pedicure technicians, high pay with 60/40 split, good working environment.",
    specialties: ["Bột", "Chân tay nước"],
    image: "/lovable-uploads/nail-salon-expired-1.jpg",
    compensation_details: "$900-1200/tuần tùy theo kinh nghiệm",
    contact_info: {
      phone: "(714) 555-1234"
    },
    status: "expired",
    pricingTier: "expired"
  },
  {
    id: "vn-expired-job-2",
    title: "Cần thợ Nail gấp lương cao tại San Jose",
    location: "San Jose, CA",
    created_at: "2022-12-01T00:00:00Z",
    vietnamese_description: "Tiệm đông khách, cần thợ nail có kinh nghiệm, bao lương $1,200 - $1,500/tuần. Có chỗ ở cho thợ ở xa.",
    description: "Busy salon needs experienced nail technicians, guaranteed $1,200-$1,500/week. Housing available for technicians from out of town.",
    specialties: ["Bột", "Chân tay nước", "Waxing"],
    image: "/lovable-uploads/nail-salon-expired-2.jpg",
    compensation_details: "$1,200-$1,500/tuần bao lương",
    contact_info: {
      phone: "(408) 555-6789"
    },
    status: "expired",
    pricingTier: "expired"
  },
  {
    id: "vn-expired-job-3",
    title: "Sang Tiệm Nail - Vị Trí Đẹp tại Houston",
    location: "Houston, TX",
    created_at: "2022-10-20T00:00:00Z",
    vietnamese_description: "Cần sang gấp tiệm nail vị trí đẹp, đông khách, 8 bàn, 6 ghế, mới remodel. Giá $65,000 (thương lượng).",
    description: "Need to sell nail salon urgently, great location, busy clientele, 8 tables, 6 chairs, newly remodeled. Price $65,000 (negotiable).",
    specialties: ["Tiệm Nail", "Cơ Hội Kinh Doanh"],
    image: "/lovable-uploads/nail-salon-expired-3.jpg",
    price: "$65,000",
    contact_info: {
      phone: "(281) 555-3456"
    },
    status: "expired",
    for_sale: true,
    pricingTier: "expired"
  },
  {
    id: "vn-expired-job-4",
    title: "Thợ làm móng tay kiếm $2,000/tuần - Atlanta",
    location: "Atlanta, GA",
    created_at: "2022-11-05T00:00:00Z",
    vietnamese_description: "Cần gấp thợ nail bột và thợ chân tay nước, thu nhập $1,500-$2,000/tuần, được trả tiền hàng tuần. Tiệm không khí làm việc thoải mái.",
    description: "Urgently need acrylic nail technicians and pedicurists, income $1,500-$2,000/week, weekly pay. Comfortable working atmosphere.",
    specialties: ["Bột", "Chân tay nước", "Waxing"],
    image: "/lovable-uploads/nail-salon-expired-4.jpg",
    compensation_details: "$1,500-$2,000/tuần",
    contact_info: {
      phone: "(404) 555-7890"
    },
    status: "expired",
    weekly_pay: true,
    pricingTier: "expired"
  }
];
