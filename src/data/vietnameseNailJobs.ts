
import { Job } from "@/types/job";
import { nailSalonImages } from "@/utils/beautyExchangeImages";

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
    type: "job",
    image: nailSalonImages[0]
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
    type: "job",
    image: nailSalonImages[1]
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
    type: "job",
    image: nailSalonImages[2]
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
    type: "job",
    image: nailSalonImages[3]
  },
  {
    id: "vn-job-5",
    title: "Cần Thợ Part-time",
    company: "Ruby Nail Salon",
    location: "Seattle, WA",
    description: "Tiệm đông khách cần thợ làm part-time cuối tuần, làm từ 2-3 ngày.",
    salary_range: "$800-$1,200/tuần",
    contact_info: {
      phone: "(206) 555-8765",
    },
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Part-time", "Tay chân nước", "Waxing"],
    is_vietnamese_listing: true,
    is_featured: false,
    status: "active",
    type: "job",
    image: nailSalonImages[4]
  },
  {
    id: "vn-job-6",
    title: "Thợ Bột Kinh Nghiệm",
    company: "Crystal Nails",
    location: "Denver, CO",
    description: "Tiệm khu sang cần thợ bột có kinh nghiệm làm acrylic và dipping. Thu nhập $1,300-$1,900/tuần.",
    salary_range: "$1,300-$1,900/tuần",
    contact_info: {
      phone: "(303) 555-4321",
    },
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Bột", "Acrylic", "Dipping", "Full-time"],
    is_vietnamese_listing: true,
    is_featured: false,
    status: "active",
    type: "job",
    image: nailSalonImages[0]
  },
  {
    id: "vn-job-7",
    title: "Cần Thợ Nail Gấp",
    company: "Paradise Nails",
    location: "Miami, FL",
    description: "Tiệm khu Miami Beach cần thợ làm đủ thứ hoặc chuyên môn, lương cao, tip hậu.",
    salary_range: "$1,500-$2,000/tuần",
    contact_info: {
      phone: "(305) 555-7890",
    },
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Tay chân nước", "Gel", "Waxing"],
    is_vietnamese_listing: true,
    is_featured: true,
    status: "active",
    type: "job",
    image: nailSalonImages[1]
  },
  {
    id: "vn-job-8",
    title: "Tuyển Thợ Làm Móng",
    company: "Glamour Nails",
    location: "Austin, TX",
    description: "Cần thợ có kinh nghiệm làm móng gel và móng acrylic. Môi trường làm việc tốt, đồng nghiệp thân thiện.",
    salary_range: "$1,000-$1,600/tuần",
    contact_info: {
      phone: "(512) 555-6543",
    },
    created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Gel", "Acrylic", "Nail Art"],
    is_vietnamese_listing: true,
    is_featured: false,
    status: "active",
    type: "job",
    image: nailSalonImages[2]
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
    type: "job",
    image: nailSalonImages[3]
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
    type: "job",
    image: nailSalonImages[4]
  },
  {
    id: "vn-expired-3",
    title: "Tuyển Thợ Nails - Bao Lương",
    company: "Elegant Nails",
    location: "Chicago, IL",
    description: "Tiệm khu Magnificent Mile tuyển thợ bột và tay chân nước, bao lương $5,500/tháng.",
    salary_range: "$5,500/tháng",
    contact_info: {
      phone: "(312) 555-6789",
    },
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[0]
  },
  {
    id: "vn-expired-4",
    title: "Cần Thợ Nam/Nữ",
    company: "Royal Nails",
    location: "Las Vegas, NV",
    description: "Cần thợ nam/nữ biết làm đủ thứ. Thu nhập tốt, có chỗ ở cho thợ ở xa.",
    salary_range: "$1,000-$1,400/tuần",
    contact_info: {
      phone: "(702) 555-8765",
    },
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Tay chân nước", "Bột"],
    is_vietnamese_listing: true,
    status: "expired",
    has_housing: true,
    type: "job",
    image: nailSalonImages[1]
  },
  {
    id: "vn-expired-5",
    title: "Cần Thợ Gel",
    company: "Paris Nails",
    location: "Philadelphia, PA",
    description: "Cần gấp thợ gel và bột, lương cao, tip khủng, chỗ làm lịch sự.",
    salary_range: "$1,200-$1,700/tuần",
    contact_info: {
      phone: "(215) 555-3456",
    },
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Gel", "Bột"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[2]
  },
  {
    id: "vn-expired-6",
    title: "Tìm Thợ Nails Có License",
    company: "Sweet Nails",
    location: "Phoenix, AZ",
    description: "Cần thợ nails có license, biết làm bột và tay chân nước. Chỗ làm vui vẻ, khách sang.",
    salary_range: "$1,300-$1,800/tuần",
    contact_info: {
      phone: "(602) 555-9876",
    },
    created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Licensed", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[3]
  },
  {
    id: "vn-expired-7",
    title: "Cần Thợ Nails Gấp",
    company: "VIP Nails & Spa",
    location: "San Diego, CA",
    description: "Cần thợ nails full-time hoặc part-time, ưu tiên thợ biết làm đủ thứ.",
    salary_range: "$1,100-$1,600/tuần",
    contact_info: {
      phone: "(619) 555-5432",
    },
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Part-time", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[4]
  },
  {
    id: "vn-expired-8",
    title: "Thợ Chân Tay Nước",
    company: "Sunshine Nails",
    location: "Tampa, FL",
    description: "Cần thợ chân tay nước, part-time hoặc full-time đều được. Hoa hồng cao.",
    salary_range: "$800-$1,200/tuần",
    contact_info: {
      phone: "(813) 555-2345",
    },
    created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Tay chân nước", "Part-time", "Full-time"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[0]
  },
  {
    id: "vn-expired-9",
    title: "Tuyển Thợ Làm Dipping",
    company: "Princess Nails",
    location: "Minneapolis, MN",
    description: "Cần thợ chuyên làm dipping powder và gel-x. Thu nhập rất cao, tiệm đông khách quanh năm.",
    salary_range: "$1,400-$1,900/tuần",
    contact_info: {
      phone: "(612) 555-6789",
    },
    created_at: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Dipping", "Gel-X", "Full-time"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[1]
  },
  {
    id: "vn-expired-10",
    title: "Cần Thợ Có Kinh Nghiệm",
    company: "Divine Nails",
    location: "Nashville, TN",
    description: "Tiệm ở khu thương mại cần thợ có kinh nghiệm, ưu tiên người biết làm đủ thứ.",
    salary_range: "$1,000-$1,500/tuần",
    contact_info: {
      phone: "(615) 555-9876",
    },
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Experienced", "Full-time"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[2]
  },
  {
    id: "vn-expired-11",
    title: "Thợ Nail Lương Cao",
    company: "Queen Nails",
    location: "Boston, MA",
    description: "Cần thợ nail lương cao, làm việc 6 ngày/tuần, bao ăn trưa.",
    salary_range: "$1,200-$1,600/tuần",
    contact_info: {
      phone: "(617) 555-3456",
    },
    created_at: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Tay chân nước", "Bột"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[3]
  },
  {
    id: "vn-expired-12",
    title: "Cần Thợ Làm Móng",
    company: "Happy Nails & Spa",
    location: "Detroit, MI",
    description: "Cần thợ làm móng, bao lương $4,800/tháng hoặc chia 6/4. Môi trường làm việc thoải mái.",
    salary_range: "$4,800/tháng",
    contact_info: {
      phone: "(313) 555-7890",
    },
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[4]
  },
  {
    id: "vn-expired-13",
    title: "Tìm Thợ Nail Part-time",
    company: "Luxury Nail Lounge",
    location: "Indianapolis, IN",
    description: "Tiệm cần thợ làm part-time, chủ yếu làm cuối tuần, lương và tip tốt.",
    salary_range: "$600-$900/tuần",
    contact_info: {
      phone: "(317) 555-2345",
    },
    created_at: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Part-time", "Cuối tuần"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[0]
  },
  {
    id: "vn-expired-14",
    title: "Cần Gấp Thợ Bột",
    company: "Golden Nails",
    location: "Columbus, OH",
    description: "Tiệm cần gấp thợ bột làm full-time, tiệm đông và khách tip hậu.",
    salary_range: "$1,100-$1,700/tuần",
    contact_info: {
      phone: "(614) 555-8765",
    },
    created_at: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Bột", "Full-time"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[1]
  },
  {
    id: "vn-expired-15",
    title: "Tuyển Thợ Làm Waxing",
    company: "Perfect Nails",
    location: "Raleigh, NC",
    description: "Cần thợ nails biết làm waxing. Tiệm sẽ training thêm nếu cần.",
    salary_range: "$900-$1,400/tuần",
    contact_info: {
      phone: "(919) 555-6543",
    },
    created_at: new Date(Date.now() - 115 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Waxing", "Training"],
    is_vietnamese_listing: true,
    status: "expired",
    owner_will_train: true,
    type: "job",
    image: nailSalonImages[2]
  },
  {
    id: "vn-expired-16",
    title: "Cần Thợ Biết Làm Đủ Thứ",
    company: "Glamour Nails",
    location: "Charlotte, NC",
    description: "Tiệm khu Mỹ trắng cần thợ biết làm đủ thứ, lương cao, tiệm đông khách.",
    salary_range: "$1,300-$1,800/tuần",
    contact_info: {
      phone: "(704) 555-3456",
    },
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Bột", "Tay chân nước", "Waxing"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[3]
  },
  {
    id: "vn-expired-17",
    title: "Thợ Nail Nam/Nữ",
    company: "Deluxe Nails",
    location: "Sacramento, CA",
    description: "Tiệm cần thợ nam/nữ biết làm bột, lương cao, chỗ làm vui vẻ.",
    salary_range: "$1,200-$1,600/tuần",
    contact_info: {
      phone: "(916) 555-8765",
    },
    created_at: new Date(Date.now() - 125 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Bột", "Full-time", "Nam/Nữ"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[4]
  },
  {
    id: "vn-expired-18",
    title: "Cần Thợ Toàn Thời Gian",
    company: "Bella Nails",
    location: "Tulsa, OK",
    description: "Cần thợ toàn thời gian biết làm bột và tay chân nước. Bao lương hoặc hoa hồng.",
    salary_range: "$1,000-$1,500/tuần",
    contact_info: {
      phone: "(918) 555-1234",
    },
    created_at: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Full-time", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[0]
  },
  {
    id: "vn-expired-19",
    title: "Tuyển Thợ Nail Mới Ra Trường",
    company: "Charming Nails",
    location: "Fort Worth, TX",
    description: "Tiệm cần thợ nail mới ra trường, sẽ training thêm, môi trường thân thiện.",
    salary_range: "$800-$1,200/tuần",
    contact_info: {
      phone: "(817) 555-9876",
    },
    created_at: new Date(Date.now() - 135 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Mới ra trường", "Training"],
    is_vietnamese_listing: true,
    status: "expired",
    owner_will_train: true,
    type: "job",
    image: nailSalonImages[1]
  },
  {
    id: "vn-expired-20",
    title: "Cần Thợ Có Kinh Nghiệm",
    company: "Premier Nails",
    location: "Salt Lake City, UT",
    description: "Tiệm cần thợ có kinh nghiệm làm gel, bột và tay chân nước. Income cao.",
    salary_range: "$1,300-$1,800/tuần",
    contact_info: {
      phone: "(801) 555-5678",
    },
    created_at: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Experienced", "Gel", "Bột", "Tay chân nước"],
    is_vietnamese_listing: true,
    status: "expired",
    type: "job",
    image: nailSalonImages[2]
  }
];
