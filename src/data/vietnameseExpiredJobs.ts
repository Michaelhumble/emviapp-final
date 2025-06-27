
import { Job } from "@/types/job";

// Expired Vietnamese job listings
export const vietnameseExpiredJobs: Job[] = [
  {
    id: "vn-exp-1",
    title: "Tuyển Thợ Nail – Đã Hết Hạn",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Tiệm nail cần thợ biết làm bột và chân tay nước.",
    specialties: ["Acrylic", "Pedicure", "Manicure"],
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    compensation_details: "$1,400-$1,700/tuần",
    contact_info: {
      phone: "(323) 555-0001"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-2",
    title: "Cần Thợ Làm Móng – Đã Hết Hạn",
    location: "San Diego, CA",
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Salon busy cần thợ nail có kinh nghiệm.",
    specialties: ["Gel", "Nail Art", "French"],
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    compensation_details: "$1,500-$1,800/tuần",
    contact_info: {
      phone: "(619) 555-0002"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-3",
    title: "Sang Tiệm Nail – Đã Bán",
    location: "Orange County, CA",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Tiệm nail established, location tốt, giá reasonable.",
    specialties: ["Full Service", "Pedicure Spa"],
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    price: "$85,000",
    contact_info: {
      phone: "(714) 555-0003"
    },
    status: "expired",
    for_sale: true,
    category: "Nail Tech"
  },
  {
    id: "vn-exp-4",
    title: "Tuyển Thợ Bột – Đã Hết Hạn",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Casino area, tip cao, cần thợ bột giỏi.",
    specialties: ["Acrylic", "Pink & White", "Full Set"],
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    compensation_details: "$1,600-$2,000/tuần",
    contact_info: {
      phone: "(702) 555-0004"
    },
    status: "expired",
    weekly_pay: true,
    category: "Nail Tech"
  },
  {
    id: "vn-exp-5",
    title: "Cần Thợ Nails – Đã Hết Hạn",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Tiệm family business, môi trường thân thiện.",
    specialties: ["Manicure", "Pedicure", "Waxing"],
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    compensation_details: "$1,300-$1,600/tuần",
    contact_info: {
      phone: "(602) 555-0005"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-6",
    title: "Tuyển Thợ Nail – Đã Hết Hạn",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Khu residential, khách regular, stable income.",
    specialties: ["Gel Polish", "Dip Powder", "Nail Repair"],
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    compensation_details: "$1,400-$1,700/tuần",
    contact_info: {
      phone: "(303) 555-0006"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-7",
    title: "Cần Thợ Làm Chân – Đã Hết Hạn",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Chuyên pedicure, spa foot treatment, relaxing environment.",
    specialties: ["Pedicure", "Foot Massage", "Callus Removal"],
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    compensation_details: "$1,200-$1,500/tuần",
    contact_info: {
      phone: "(503) 555-0007"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-8",
    title: "Sang Tiệm Nail – Đã Bán",
    location: "Sacramento, CA",
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Established 10+ years, loyal customers, good location.",
    specialties: ["Full Service Salon", "Waxing"],
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    price: "$120,000",
    contact_info: {
      phone: "(916) 555-0008"
    },
    status: "expired",
    for_sale: true,
    category: "Nail Tech"
  },
  {
    id: "vn-exp-9",
    title: "Tuyển Thợ Nail – Đã Hết Hạn",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "College town, young clientele, trendy nail art.",
    specialties: ["Nail Art", "Gel Extensions", "Chrome Nails"],
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    compensation_details: "$1,350-$1,650/tuần",
    contact_info: {
      phone: "(512) 555-0009"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-10",
    title: "Cần Thợ Nails – Đã Hết Hạn",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Southern hospitality, friendly customers, growing area.",
    specialties: ["Acrylic", "Pedicure", "Eyebrow Threading"],
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    compensation_details: "$1,250-$1,550/tuần",
    contact_info: {
      phone: "(404) 555-0010"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-11",
    title: "Tuyển Thợ Nail Gấp – Đã Hết Hạn",
    location: "Tampa, FL",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Beach area, tourist season busy, overtime opportunities.",
    specialties: ["Vacation Nails", "Beach Designs", "Quick Service"],
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    compensation_details: "$1,400-$1,800/tuần",
    contact_info: {
      phone: "(813) 555-0011"
    },
    status: "expired",
    category: "Nail Tech"
  },
  {
    id: "vn-exp-12",
    title: "Cần Thợ Làm Móng – Đã Hết Hạn",
    location: "Charlotte, NC",
    created_at: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: "Banking city, professional clientele, upscale services.",
    specialties: ["Business Nails", "French Manicure", "Conservative Colors"],
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    compensation_details: "$1,300-$1,600/tuần",
    contact_info: {
      phone: "(704) 555-0012"
    },
    status: "expired",
    category: "Nail Tech"
  }
];
