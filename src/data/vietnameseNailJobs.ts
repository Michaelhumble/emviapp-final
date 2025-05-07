
import { Job } from "@/types/job";

// Pinned job that should always appear at the top
const pinnedJob: Job = {
  id: "magic-nails-mt",
  title: "Tìm Thợ Nails",
  company: "Magic Nails – Great Falls, MT",
  location: "Great Falls, MT",
  description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
  salary_range: "$1,200–$1,500/tuần",
  contact_info: {
    phone: "(406) 770-3070",
  },
  created_at: new Date().toISOString(),
  specialties: ["Bột", "Tay chân nước"],
  is_vietnamese_listing: true,
  isPinned: true,
  status: "active",
  type: "job"
};

// Regular Vietnamese nail job listings
export const vietnameseNailJobs: Job[] = [
  pinnedJob,
  {
    id: "vn-job-1",
    title: "Cần Thợ Nails Gấp",
    company: "Modern Nails & Spa",
    location: "Houston, TX",
    description: "Tiệm cần thợ nails, biết làm đủ thứ càng tốt. Income $1,200-$1,800/tuần.",
    salary_range: "$1,200-$1,800/tuần",
    contact_info: {
      phone: "(713) 555-1234",
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Bột", "Dipping", "Waxing"],
    is_vietnamese_listing: true,
    is_featured: true,
    status: "active",
    type: "job"
  },
  {
    id: "vn-job-2",
    title: "Tuyển Thợ Nail",
    company: "Luxury Nail Bar",
    location: "Atlanta, GA",
    description: "Cần thợ nail có kinh nghiệm làm chân tay nước, full-time hoặc part-time. Lương cao, tip hậu.",
    salary_range: "$900-$1,500/tuần",
    contact_info: {
      phone: "(404) 555-6789",
    },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Tay chân nước", "Part-time", "Full-time"],
    is_vietnamese_listing: true,
    is_featured: false,
    status: "active",
    type: "job"
  },
  {
    id: "vn-job-3",
    title: "Cần Thợ Bột Gấp",
    company: "Diamond Nails",
    location: "San Jose, CA",
    description: "Tiệm vùng San Jose cần thợ bột có kinh nghiệm, lương $7,000-$9,000/tháng, có chỗ ở.",
    salary_range: "$7,000-$9,000/tháng",
    contact_info: {
      phone: "(408) 555-9876",
    },
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Bột", "Gel-X", "Acrylic", "Full-time"],
    is_vietnamese_listing: true,
    is_featured: false,
    status: "active",
    has_housing: true,
    type: "job"
  },
  {
    id: "vn-job-4",
    title: "Thợ Nail Lương Cao",
    company: "Elite Nails & Spa",
    location: "Orlando, FL",
    description: "Cần thợ nail, income từ $1,400-$2,200/tuần. Chỗ làm vui vẻ, khách tip hậu.",
    salary_range: "$1,400-$2,200/tuần",
    contact_info: {
      phone: "(407) 555-3456",
    },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Tay chân nước", "Bột", "Waxing"],
    is_vietnamese_listing: true,
    is_featured: true,
    status: "active",
    type: "job"
  }
];

// Vietnamese nail jobs that have expired
export const vietnameseExpiredJobs: Job[] = [
  {
    id: "vn-expired-1",
    title: "Thợ Nails Full-time",
    company: "Beauty Nails",
    location: "Dallas, TX",
    description: "Cần thợ nail full-time, thu nhập $900-$1,300/tuần.",
    salary_range: "$900-$1,300/tuần",
    contact_info: {
      phone: "(214) 555-7890",
    },
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Tay chân nước", "Waxing"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job"
  },
  {
    id: "vn-expired-2",
    title: "Cần Thợ Part-time",
    company: "Golden Nail Spa",
    location: "Portland, OR",
    description: "Tiệm cần thợ làm part-time cuối tuần, làm từ 3-5 ngày.",
    salary_range: "$700-$900/tuần",
    contact_info: {
      phone: "(503) 555-4321",
    },
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Part-time", "Gel"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job"
  }
];
