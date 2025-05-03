
import { Job } from "@/types/job";

/**
 * Authentic Vietnamese nail job listings
 * Only using uploaded high-quality images - no stock photos
 */
export const vietnameseNailJobs: Job[] = [
  {
    id: "vn-nail-job-01",
    title: "Clawson, MI (High Tip, 6 Chairs)",
    vietnamese_description: "Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần siêng năng, tay nghề tốt.\nTiệm ở Clawson, MI 48017\nThu nhập từ $1.200 - $1.800/tuần\nKhách chủ yếu là người Mỹ trắng, lịch sự và tip hậu\nMôi trường làm việc nhẹ nhàng, không cạnh tranh",
    location: "Clawson, MI",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,200 - $1,800/tuần",
    compensation_details: "$1,200 - $1,800/tuần",
    contact_info: {
      phone: "(248) 403-6472 | (248) 525-9911"
    },
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
    company: "Nail Salon Clawson",
    specialties: ["Bột", "Dip", "Gel-X"],
    type: "job"
  },
  {
    id: "vn-nail-job-02",
    title: "Humble, TX (Design Specialist)",
    vietnamese_description: "Tiệm lớn nhất khu Humble cần tuyển thợ chuyên dũa móng dài, chuyên design.\nIncome hiện tại của thợ >$2,000/tuần.\nTiệm có đầy đủ đồ design, tip cao.\nReceptionist: $150/ngày",
    location: "Humble, TX",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: ">$2,000/tuần",
    compensation_details: ">$2,000/tuần | Receptionist: $150/ngày",
    contact_info: {
      owner_name: "Nhi",
      phone: "(346) 398 6868"
    },
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
    company: "Milano Nail Spa",
    specialties: ["Design", "Dũa móng dài"],
    type: "job"
  },
  {
    id: "vn-nail-job-03",
    title: "Loudon, TN (Dip & Acrylic)",
    vietnamese_description: "Cần thợ bột, Dip, làm đủ thứ. Bao lương $1200/tuần và up.\nKhách chủ yếu làm dip, acrylic 100%\nCó chỗ ở. Tiệm nhỏ, không cạnh tranh.",
    location: "Loudon, TN",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,200+/tuần",
    compensation_details: "Bao lương $1,200/tuần và lên",
    contact_info: {
      phone: "865-201-0593"
    },
    has_housing: true,
    image: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
    company: "Nail Salon Loudon",
    specialties: ["Bột", "Dip", "Acrylic"],
    type: "job"
  },
  {
    id: "vn-nail-job-04",
    title: "South Lake Tahoe, CA",
    vietnamese_description: "Cần CTN hoặc làm everything\nGiá cao, típ cao, khách du lịch\nIncome mùa hè $1600-$2500+/tuần\nTiệm cần sức khỏe tốt và biết tiếng Anh",
    location: "South Lake Tahoe, CA",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,600-$2,500+/tuần",
    compensation_details: "$1,600-$2,500+/tuần (mùa hè)",
    contact_info: {
      phone: "916-802-1922"
    },
    preferred_languages: ["Tiếng Anh"],
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
    company: "Lake Tahoe Nails",
    specialties: ["Chân tay nước", "Everything"],
    type: "job"
  },
  {
    id: "vn-nail-job-05",
    title: "Milton, FL (Inside Publix)",
    vietnamese_description: "Cần nhiều anh/chị biết làm TCN, SNS, Bột\nGiá cao, tip cao\nChỉ nhận người có giấy tờ hợp lệ",
    location: "Milton, FL",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    compensation_details: "Giá cao, tip cao",
    contact_info: {
      owner_name: "Cody",
      phone: "404-434-3688"
    },
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    company: "Publix Nail Salon",
    specialties: ["TCN", "SNS", "Bột"],
    type: "job"
  },
  {
    id: "vn-nail-job-06",
    title: "Greenwood Village, CO (Sang Nhượng)",
    vietnamese_description: "Tiệm đẹp, sạch, mới xây, thu nhập cao\n9 bàn, 9 ghế, máy giặt sấy đầy đủ\nRent: $4,800/tháng",
    location: "Greenwood Village, CO",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    price: "$4,800/tháng",
    compensation_details: "Rent: $4,800/tháng",
    contact_info: {
      phone: "720-645-5531"
    },
    for_sale: true,
    salon_type: "Cần Sang",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    company: "Greenwood Nails",
    type: "opportunity",
    number_of_stations: "9"
  },
  {
    id: "vn-nail-job-07",
    title: "Killeen, TX",
    vietnamese_description: "Tiệm lớn, khách đông, làm giá cao, tip nhiều\nThợ làm ít nhất $1500/tuần chưa kể tip",
    location: "Killeen, TX",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,500+/tuần + tip",
    compensation_details: "Ít nhất $1,500/tuần chưa kể tip",
    contact_info: {
      owner_name: "Johnny / Hannah",
      phone: "512-540-6173 | 806-777-0526"
    },
    image: "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png",
    company: "Killeen Nail Spa",
    specialties: ["Nail Technician"],
    type: "job"
  },
  {
    id: "vn-nail-job-08",
    title: "Madison, AL",
    vietnamese_description: "Cần thợ làm chân tay nước, Dip, Waxing\nBao lương $1000+/tuần\nCó training nếu chưa có kinh nghiệm",
    location: "Madison, AL",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,000+/tuần",
    compensation_details: "Bao lương $1,000+/tuần",
    contact_info: {
      phone: "256-924-6402"
    },
    owner_will_train: true,
    image: "/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png",
    company: "Madison Nails",
    specialties: ["Chân tay nước", "Dip", "Waxing"],
    type: "job"
  },
  {
    id: "vn-nail-job-09",
    title: "Kansas City North",
    vietnamese_description: "Cần thợ Bột và Dip full-time\nKhách ổn định, dễ thương, môi trường vui vẻ",
    location: "Kansas City North",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "816-255-4935"
    },
    employment_type: "Full-Time",
    image: "/lovable-uploads/7a58770c-404e-4259-b1a6-f044c8eefdc0.png",
    company: "Kansas City North Nails",
    specialties: ["Bột", "Dip"],
    type: "job"
  },
  {
    id: "vn-nail-job-10",
    title: "Overland Park (Cosmo Nails)",
    vietnamese_description: "Cần thợ CTN biết làm dip\nTiệm khu sang, tip cao",
    location: "Overland Park",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Ava",
      phone: "913-972-0670"
    },
    image: "/lovable-uploads/0a78836f-9528-4119-a387-5442ab284cc7.png",
    company: "Cosmo Nails",
    specialties: ["Chân tay nước", "Dip"],
    type: "job"
  },
  {
    id: "vn-nail-job-11",
    title: "Indian Land, SC",
    vietnamese_description: "Cần thợ bột, SNS, CTN\nTiệm đẹp, đông khách, có chỗ ở\nTiệm bao lương quanh năm $1500-$2000/tuần",
    location: "Indian Land, SC",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$1,500-$2,000/tuần",
    compensation_details: "Bao lương $1,500-$2,000/tuần",
    contact_info: {
      phone: "(213) 595-8686"
    },
    has_housing: true,
    image: "/lovable-uploads/b0eaa611-27a6-42f3-b005-b259d595db96.png",
    company: "Indian Land Nail Salon",
    specialties: ["Bột", "SNS", "CTN"],
    type: "job"
  },
  {
    id: "vn-nail-job-12",
    title: "Kennesaw, GA",
    vietnamese_description: "Thu nhập $7000+ không trừ supply\nCần thợ bột design, CTN, SNS\nChia turn công bằng, tip cao",
    location: "Kennesaw, GA",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    is_vietnamese_listing: true,
    salary_range: "$7,000+/tháng",
    compensation_details: "Thu nhập $7,000+/tháng không trừ supply",
    contact_info: {
      phone: "(626) 409-8366 | (509) 270-7876"
    },
    no_supply_deduction: true,
    image: "/lovable-uploads/0f5c9f01-b448-43dd-8c3a-a48589d6bf08.png",
    company: "Kennesaw Nail Studio",
    specialties: ["Bột design", "CTN", "SNS"],
    type: "job"
  },
];
