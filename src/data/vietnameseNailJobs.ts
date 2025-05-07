
import { Job } from '@/types/job';

// Current active Vietnamese job listings 
export const vietnameseNailJobs: Job[] = [
  {
    id: 'vn-job-1',
    title: 'Magic Nails – Great Falls, MT',
    company: 'Magic Nails Salon',
    location: 'Great Falls, Montana',
    description: 'Cần thợ nail gấp. Tiệm ở Great Falls, MT 59405. Cách Missoula, MT 3 tiếng lái xe. Tiệm trong mall lớn, làm việc 6 ngày/tuần từ 10am-9pm. Bao lương hoặc ăn chia tùy thợ. Có chỗ ở. Bao làm đủ giờ, chỗ này rất tốt cho thợ muốn tích góp tiền. Tiệm rộng rãi, mới, ghế làm chân mới, đủ 8 bàn. Có thể nhận cả gia đình.',
    salary_range: '$1,200–$2,000/tuần + chỗ ở',
    is_featured: true,
    isPinned: true,
    contact_info: {
      phone: '(406) 781-7589'
    },
    specialties: ['full-time', 'chỗ ở', 'bao lương'],
    image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'vn-job-2',
    title: 'Tuyển Thợ Nail – Las Vegas, NV',
    company: 'Diamond Nails',
    location: 'Las Vegas, Nevada',
    description: 'Cần tuyển thợ nail làm việc tại Las Vegas. Yêu cầu: biết làm bột, dip, và tay chân nước. Thu nhập tốt, tiệm đông khách, tip cao. Làm việc 6 ngày/tuần. Có thể bao ăn ở nếu ở xa. Liên hệ ngay để được tư vấn chi tiết.',
    salary_range: '$1,300–$1,800/tuần',
    is_featured: false,
    is_urgent: true,
    contact_info: {
      phone: '(702) 123-4567'
    },
    specialties: ['bột', 'dip', 'tay chân nước'],
    image: '/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'vn-job-3',
    title: 'Cần Thợ Nail – Orlando, FL',
    company: 'Luxury Nails & Spa',
    location: 'Orlando, Florida',
    description: 'Cần gấp thợ nail kinh nghiệm tại Orlando. Tiệm ở khu Mỹ trắng, giá cao, tip hậu. Có bao lương tùy theo kinh nghiệm và tay nghề. Môi trường làm việc thân thiện, sang trọng. Liên hệ để biết thêm chi tiết.',
    salary_range: '$1,400–$2,200/tuần',
    contact_info: {
      phone: '(407) 987-6543'
    },
    specialties: ['dip', 'gel-x', 'pedicure'],
    image: '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png',
    created_at: new Date().toISOString()
  },
  
  // Adding the 9 new job listings with images
  {
    id: 'vn-job-4',
    title: 'Tuyển Thợ Nail – Clawson, MI',
    company: 'Clawson Nails',
    location: 'Clawson, MI',
    description: 'Tiệm nhỏ khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.',
    salary_range: '$1,200–$1,800/tuần',
    contact_info: {
      phone: '(248) 403-6472 | (248) 525-9911'
    },
    specialties: ['Bột', 'Dip', 'Gel-X'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/858af941-13ac-412a-9747-38bc7a6f0e19.png'
  },
  {
    id: 'vn-job-5',
    title: 'Thợ Nail Design – Milano Nail Spa, Humble, TX',
    company: 'Milano Nail Spa',
    location: '6947 FM 1960 Rd E, Humble, TX',
    description: 'Receptionist $150/ngày. 60 người đang làm chung.',
    salary_range: '>$2,000/tuần',
    contact_info: {
      phone: '(346) 398-6868 (gặp Nhi)'
    },
    specialties: ['Nail Design', 'Receptionist'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/bd877b0a-2f98-45fb-8e1a-37ad868ae786.png'
  },
  {
    id: 'vn-job-6',
    title: 'Tuyển Thợ Nail – South Lake Tahoe, CA',
    company: 'South Lake Tahoe Nails',
    location: 'South Lake Tahoe, CA',
    description: 'Tiệm dễ thương, khách du lịch chịu chi.',
    salary_range: '$1,600–$2,500+/tuần',
    contact_info: {
      phone: '(916) 802-1922'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/abbd160d-295b-46cd-9777-d590aab8ddb0.png'
  },
  {
    id: 'vn-job-7',
    title: 'Cần Thợ Nail – Killeen, TX',
    company: 'Killeen Nails',
    location: 'Killeen, TX',
    description: 'Tiệm lớn, giá cao, tip tốt.',
    salary_range: '$1,500+/tuần',
    contact_info: {
      phone: '(512) 540-6173 | (806) 777-0526'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/59818517-3985-420d-9aa9-3d1af667c11f.png'
  },
  {
    id: 'vn-job-8',
    title: 'Tìm Người Làm Nail – New Jersey',
    company: 'New Jersey Nails',
    location: 'New Jersey',
    description: 'Khách ổn định, ưu tiên biết bột và design đơn giản.',
    salary_range: '$1,600/tuần + tip',
    contact_info: {
      phone: '(551) 333-5678'
    },
    specialties: ['Bột', 'Design'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/b939e509-7f6f-4322-a0f5-b269fa617531.png'
  },
  {
    id: 'vn-job-9',
    title: 'Cần Gấp Thợ Làm Chân Tay Nước – Houston, TX',
    company: 'Houston Nails',
    location: 'Houston, TX',
    description: 'Ưu tiên tay nghề cứng, làm nhẹ nhàng.',
    salary_range: 'Part/Full-time – lương tốt',
    contact_info: {
      phone: '(832) 444-2299'
    },
    specialties: ['Chân Tay Nước'],
    created_at: new Date().toISOString(),
    is_urgent: true,
    image: '/lovable-uploads/858af941-13ac-412a-9747-38bc7a6f0e19.png'
  },
  {
    id: 'vn-job-10',
    title: 'Tuyển Thợ Nail – Seattle, WA',
    company: 'Seattle Nails',
    location: 'Seattle, WA',
    description: 'Tiệm sang, chủ dễ chịu, cần thợ có kinh nghiệm.',
    salary_range: '$1,800–$2,400/tuần',
    contact_info: {
      phone: '(206) 888-1234'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/bd877b0a-2f98-45fb-8e1a-37ad868ae786.png'
  },
  {
    id: 'vn-job-11',
    title: 'Tuyển Thợ Làm Dip Powder – Orlando, FL',
    company: 'Orlando Nails',
    location: 'Orlando, FL',
    description: 'Khách trẻ, chủ yếu là Mỹ trắng.',
    salary_range: '$1,400–$1,900/tuần',
    contact_info: {
      phone: '(407) 777-9898'
    },
    specialties: ['Dip Powder'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/abbd160d-295b-46cd-9777-d590aab8ddb0.png'
  },
  {
    id: 'vn-job-12',
    title: 'Cần Thợ Full Set – Los Angeles, CA',
    company: 'Los Angeles Nails',
    location: 'Los Angeles, CA',
    description: 'Làm việc trong môi trường chuyên nghiệp.',
    salary_range: '$1,800–$2,200/tuần',
    contact_info: {
      phone: '(323) 555-9012'
    },
    specialties: ['Full Set'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/59818517-3985-420d-9aa9-3d1af667c11f.png'
  }
];

// Expired job listings - restored with 26 total expired jobs
export const vietnameseExpiredJobs: Job[] = [
  {
    id: 'vn-expired-1',
    title: 'Cần Thợ Nail - Atlanta, GA',
    company: 'Atlanta Nail Spa',
    location: 'Atlanta, Georgia',
    description: 'Cần thợ nail có kinh nghiệm làm việc tại Atlanta. Lương cao, môi trường làm việc thoải mái. Tiệm đông khách quanh năm.',
    salary_range: '$1,000-$1,500/tuần',
    status: 'expired',
    contact_info: {
      phone: '(404) 555-7890'
    },
    specialties: ['bột', 'gel', 'tay chân nước'],
    image: '/lovable-uploads/f138d312-24eb-4eba-9109-6ead42e2191b.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 35)).toISOString()
  },
  {
    id: 'vn-expired-2',
    title: 'Tuyển Thợ Bột & Chân Tay Nước - Boston',
    company: 'Luxury Boston Nails',
    location: 'Boston, Massachusetts',
    description: 'Tiệm ở khu Mỹ trắng. Cần thợ biết làm bột và chân tay nước, môi trường làm việc thân thiện.',
    salary_range: '$1,200-$1,600/tuần',
    status: 'expired',
    contact_info: {
      phone: '(617) 555-4321'
    },
    specialties: ['bột', 'chân tay nước'],
    image: '/lovable-uploads/ac277b59-f6e7-44b5-892c-17748fe76233.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 32)).toISOString()
  },
  {
    id: 'vn-expired-3',
    title: 'Tuyển Thợ Nail Gấp - Philadelphia',
    company: 'Diamond Nails Philly',
    location: 'Philadelphia, Pennsylvania',
    description: 'Cần thợ nail gấp, bao lương $6,000-$7,000/tháng tùy theo kinh nghiệm. Tiệm đông khách, tips hậu.',
    salary_range: '$6,000-$7,000/tháng',
    status: 'expired',
    is_urgent: true,
    contact_info: {
      phone: '(215) 555-8765'
    },
    specialties: ['nail tech', 'full-time'],
    image: '/lovable-uploads/fd1aa5a5-543c-4bb3-901b-12abeddb24a6.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 40)).toISOString()
  },
  {
    id: 'vn-expired-4',
    title: 'Cần Người Làm Dip & Design - Miami',
    company: 'South Beach Nails',
    location: 'Miami Beach, Florida',
    description: 'Cần thợ nail biết làm dip và design. Tiệm khu du lịch, khách sang, tip cao.',
    salary_range: '$1,300-$2,000/tuần',
    status: 'expired',
    contact_info: {
      phone: '(305) 555-1234'
    },
    specialties: ['dip', 'design', 'nail art'],
    image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 33)).toISOString()
  },
  {
    id: 'vn-expired-5',
    title: 'Cần Thợ Nail - Chicago, IL',
    company: 'Windy City Nails',
    location: 'Chicago, Illinois',
    description: 'Tiệm ở trung tâm Chicago, cần thợ có kinh nghiệm làm đủ loại nail. Income cao, môi trường chuyên nghiệp.',
    salary_range: '$1,400-$1,800/tuần',
    status: 'expired',
    contact_info: {
      phone: '(312) 555-9876'
    },
    specialties: ['full set', 'pedicure', 'gel-x'],
    image: '/lovable-uploads/7c3758f3-e99d-4ce5-8da6-dc0ab8ab0b72.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 35)).toISOString()
  },
  {
    id: 'vn-expired-6',
    title: 'Tìm Thợ Bột - San Diego',
    company: 'Ocean View Nails',
    location: 'San Diego, California',
    description: 'Cần thợ bột có kinh nghiệm. Tiệm view biển, khu khách sạn 5 sao, khách hàng tip hậu.',
    salary_range: '$1,500-$1,900/tuần',
    status: 'expired',
    contact_info: {
      phone: '(619) 555-2468'
    },
    specialties: ['bột', 'acrylic'],
    image: '/lovable-uploads/dad16970-8483-4bbd-876d-2889c121fd7a.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 37)).toISOString()
  },
  {
    id: 'vn-expired-7',
    title: 'Thợ Nail Có Kinh Nghiệm - Denver',
    company: 'Mile High Nails',
    location: 'Denver, Colorado',
    description: 'Cần thợ nail có kinh nghiệm làm việc tại Denver. Bao lương $1,100-$1,600/tuần. Có chỗ ở.',
    salary_range: '$1,100-$1,600/tuần + chỗ ở',
    status: 'expired',
    contact_info: {
      phone: '(720) 555-1357'
    },
    specialties: ['kinh nghiệm', 'chỗ ở', 'bao lương'],
    image: '/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 42)).toISOString()
  },
  {
    id: 'vn-expired-8',
    title: 'Cần Thợ Nail - Seattle, WA',
    company: 'Emerald City Nails',
    location: 'Seattle, Washington',
    description: 'Cần thợ nail làm chân tay nước và wax. Income $5,000-$6,000/tháng, tiệm đóng cửa ngày thứ 2.',
    salary_range: '$5,000-$6,000/tháng',
    status: 'expired',
    contact_info: {
      phone: '(206) 555-3690'
    },
    specialties: ['chân tay nước', 'wax'],
    image: '/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 36)).toISOString()
  },
  {
    id: 'vn-expired-9',
    title: 'Tuyển Thợ Full-time - Houston',
    company: 'Texas Luxury Nails',
    location: 'Houston, Texas',
    description: 'Cần thợ nail full-time, biết làm đủ thứ. Lương $4,800-$6,000/tháng tùy theo khả năng.',
    salary_range: '$4,800-$6,000/tháng',
    status: 'expired',
    contact_info: {
      phone: '(832) 555-2580'
    },
    specialties: ['full-time', 'làm đủ thứ'],
    image: '/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 31)).toISOString()
  },
  {
    id: 'vn-expired-10',
    title: 'Cần Thợ Gel-X - Portland',
    company: 'Rose City Nails',
    location: 'Portland, Oregon',
    description: 'Tìm thợ nail chuyên làm Gel-X, khách hàng cao cấp, tiệm khu downtown.',
    salary_range: '$1,200-$1,700/tuần',
    status: 'expired',
    contact_info: {
      phone: '(503) 555-9753'
    },
    specialties: ['gel-x', 'khu downtown'],
    image: '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 34)).toISOString()
  },
  {
    id: 'vn-expired-11',
    title: 'Tuyển Thợ Nail Gel - Phoenix',
    company: 'Desert Bloom Nails',
    location: 'Phoenix, Arizona',
    description: 'Cần thợ nail biết làm gel, dip, pedicure. Tiệm mới, thiết bị hiện đại, lương cao.',
    salary_range: '$1,300-$1,800/tuần',
    status: 'expired',
    contact_info: {
      phone: '(602) 555-8642'
    },
    specialties: ['gel', 'dip', 'pedicure'],
    image: '/lovable-uploads/f138d312-24eb-4eba-9109-6ead42e2191b.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 39)).toISOString()
  },
  {
    id: 'vn-expired-12',
    title: 'Cần Thợ Pedicure - Minneapolis',
    company: 'North Star Nails',
    location: 'Minneapolis, Minnesota',
    description: 'Tuyển thợ chuyên làm pedicure, lương $1,100-$1,500/tuần tùy theo kinh nghiệm.',
    salary_range: '$1,100-$1,500/tuần',
    status: 'expired',
    contact_info: {
      phone: '(612) 555-7531'
    },
    specialties: ['pedicure'],
    image: '/lovable-uploads/ac277b59-f6e7-44b5-892c-17748fe76233.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 41)).toISOString()
  },
  {
    id: 'vn-expired-13',
    title: 'Thợ Nail Lương Cao - New Orleans',
    company: 'Bayou Nails & Spa',
    location: 'New Orleans, Louisiana',
    description: 'Cần thợ nail full-time hoặc part-time, thu nhập $1,200-$1,600/tuần, khu du lịch.',
    salary_range: '$1,200-$1,600/tuần',
    status: 'expired',
    contact_info: {
      phone: '(504) 555-1598'
    },
    specialties: ['full-time', 'part-time', 'khu du lịch'],
    image: '/lovable-uploads/fd1aa5a5-543c-4bb3-901b-12abeddb24a6.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 43)).toISOString()
  },
  {
    id: 'vn-expired-14',
    title: 'Cần Thợ Nail Full-time - Columbus',
    company: 'Buckeye Nails',
    location: 'Columbus, Ohio',
    description: 'Tuyển thợ nail làm việc full-time, bao lương $4,500-$5,800/tháng. Có chỗ ở thoải mái.',
    salary_range: '$4,500-$5,800/tháng + chỗ ở',
    status: 'expired',
    contact_info: {
      phone: '(614) 555-3579'
    },
    specialties: ['full-time', 'bao lương', 'chỗ ở'],
    image: '/lovable-uploads/7c3758f3-e99d-4ce5-8da6-dc0ab8ab0b72.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 38)).toISOString()
  },
  {
    id: 'vn-expired-15',
    title: 'Tuyển Thợ Nail Gấp - Nashville',
    company: 'Music City Nails',
    location: 'Nashville, Tennessee',
    description: 'Cần gấp thợ nail biết làm đủ thứ. Thu nhập $5,000-$7,000/tháng, tiệm đông khách quanh năm.',
    salary_range: '$5,000-$7,000/tháng',
    status: 'expired',
    is_urgent: true,
    contact_info: {
      phone: '(615) 555-2468'
    },
    specialties: ['làm đủ thứ', 'thu nhập cao'],
    image: '/lovable-uploads/dad16970-8483-4bbd-876d-2889c121fd7a.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 37)).toISOString()
  },
  {
    id: 'vn-expired-16',
    title: 'Cần Thợ Nail - Charlotte',
    company: 'Queen City Nails',
    location: 'Charlotte, North Carolina',
    description: 'Tìm thợ nail có kinh nghiệm, tiệm khu shopping mall, lương $1,000-$1,500/tuần.',
    salary_range: '$1,000-$1,500/tuần',
    status: 'expired',
    contact_info: {
      phone: '(704) 555-8024'
    },
    specialties: ['kinh nghiệm', 'shopping mall'],
    image: '/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 44)).toISOString()
  },
  {
    id: 'vn-expired-17',
    title: 'Thợ Bột & Wax - Kansas City',
    company: 'Midwest Nails',
    location: 'Kansas City, Missouri',
    description: 'Cần thợ bột và wax, thu nhập $1,100-$1,400/tuần, môi trường làm việc vui vẻ.',
    salary_range: '$1,100-$1,400/tuần',
    status: 'expired',
    contact_info: {
      phone: '(816) 555-9632'
    },
    specialties: ['bột', 'wax'],
    image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 32)).toISOString()
  },
  {
    id: 'vn-expired-18',
    title: 'Tuyển Thợ Nails - Salt Lake City',
    company: 'Mountain View Nails',
    location: 'Salt Lake City, Utah',
    description: 'Cần thợ nail biết làm đủ thứ, thu nhập $1,200-$1,600/tuần, tiệm đóng cửa ngày chủ nhật.',
    salary_range: '$1,200-$1,600/tuần',
    status: 'expired',
    contact_info: {
      phone: '(801) 555-7412'
    },
    specialties: ['làm đủ thứ', 'nghỉ chủ nhật'],
    image: '/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 33)).toISOString()
  },
  {
    id: 'vn-expired-19',
    title: 'Cần Thợ Chân Tay Nước - Providence',
    company: 'Ocean State Nails',
    location: 'Providence, Rhode Island',
    description: 'Tuyển thợ làm chân tay nước, part-time hoặc full-time, thu nhập $900-$1,300/tuần.',
    salary_range: '$900-$1,300/tuần',
    status: 'expired',
    contact_info: {
      phone: '(401) 555-3698'
    },
    specialties: ['chân tay nước', 'part-time', 'full-time'],
    image: '/lovable-uploads/f138d312-24eb-4eba-9109-6ead42e2191b.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 40)).toISOString()
  },
  {
    id: 'vn-expired-20',
    title: 'Tuyển Thợ Bột và Gel - Detroit',
    company: 'Motor City Nails',
    location: 'Detroit, Michigan',
    description: 'Cần thợ bột và gel, lương $1,000-$1,400/tuần tùy theo kinh nghiệm, tiệm đông khách.',
    salary_range: '$1,000-$1,400/tuần',
    status: 'expired',
    contact_info: {
      phone: '(313) 555-7896'
    },
    specialties: ['bột', 'gel'],
    image: '/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 41)).toISOString()
  },
  {
    id: 'vn-expired-21',
    title: 'Cần Thợ Nail Biết Design - Richmond',
    company: 'Capital Nails',
    location: 'Richmond, Virginia',
    description: 'Tìm thợ nail biết làm design, lương $1,200-$1,600/tuần, tiệm khu trung tâm.',
    salary_range: '$1,200-$1,600/tuần',
    status: 'expired',
    contact_info: {
      phone: '(804) 555-2583'
    },
    specialties: ['design', 'khu trung tâm'],
    image: '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 36)).toISOString()
  },
  {
    id: 'vn-expired-22',
    title: 'Thợ Nail Full-time - San Antonio',
    company: 'Alamo City Nails',
    location: 'San Antonio, Texas',
    description: 'Cần thợ nail làm việc full-time, ưu tiên người có kinh nghiệm, thu nhập $1,100-$1,500/tuần.',
    salary_range: '$1,100-$1,500/tuần',
    status: 'expired',
    contact_info: {
      phone: '(210) 555-9147'
    },
    specialties: ['full-time', 'kinh nghiệm'],
    image: '/lovable-uploads/ac277b59-f6e7-44b5-892c-17748fe76233.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 39)).toISOString()
  },
  {
    id: 'vn-expired-23',
    title: 'Cần Thợ Nail - Pittsburgh',
    company: 'Steel City Nails',
    location: 'Pittsburgh, Pennsylvania',
    description: 'Tuyển thợ nail biết làm đủ thứ, thu nhập $1,000-$1,400/tuần, tiệm khu Mỹ trắng.',
    salary_range: '$1,000-$1,400/tuần',
    status: 'expired',
    contact_info: {
      phone: '(412) 555-7532'
    },
    specialties: ['làm đủ thứ', 'khu Mỹ trắng'],
    image: '/lovable-uploads/fd1aa5a5-543c-4bb3-901b-12abeddb24a6.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 42)).toISOString()
  },
  {
    id: 'vn-expired-24',
    title: 'Tìm Thợ Gel-X - Milwaukee',
    company: 'Lakefront Nails',
    location: 'Milwaukee, Wisconsin',
    description: 'Cần thợ nail có kinh nghiệm làm Gel-X, thu nhập $1,100-$1,500/tuần, tiệm đông khách.',
    salary_range: '$1,100-$1,500/tuần',
    status: 'expired',
    contact_info: {
      phone: '(414) 555-3698'
    },
    specialties: ['gel-x', 'kinh nghiệm'],
    image: '/lovable-uploads/7c3758f3-e99d-4ce5-8da6-dc0ab8ab0b72.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 38)).toISOString()
  },
  {
    id: 'vn-expired-25',
    title: 'Thợ Nail Lương Cao - Indianapolis',
    company: 'Circle City Nails',
    location: 'Indianapolis, Indiana',
    description: 'Cần thợ nail lương cao, biết làm đủ thứ, thu nhập $1,300-$1,700/tuần.',
    salary_range: '$1,300-$1,700/tuần',
    status: 'expired',
    contact_info: {
      phone: '(317) 555-8024'
    },
    specialties: ['làm đủ thứ', 'lương cao'],
    image: '/lovable-uploads/dad16970-8483-4bbd-876d-2889c121fd7a.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 35)).toISOString()
  },
  {
    id: 'vn-expired-26',
    title: 'Cần Thợ Tay Chân Nước - Cincinnati',
    company: 'Queen City Nails',
    location: 'Cincinnati, Ohio',
    description: 'Tuyển thợ tay chân nước, thu nhập $900-$1,200/tuần, làm việc 6 ngày/tuần.',
    salary_range: '$900-$1,200/tuần',
    status: 'expired',
    contact_info: {
      phone: '(513) 555-9632'
    },
    specialties: ['tay chân nước', '6 ngày/tuần'],
    image: '/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString()
  },
  {
    id: 'vn-expired-27',
    title: 'Tuyển Thợ Nail Gấp - Sacramento',
    company: 'Capital Nails & Spa',
    location: 'Sacramento, California',
    description: 'Cần gấp thợ nail, ưu tiên người biết làm bột và chân tay nước, lương $1,200-$1,600/tuần.',
    salary_range: '$1,200-$1,600/tuần',
    status: 'expired',
    is_urgent: true,
    contact_info: {
      phone: '(916) 555-7412'
    },
    specialties: ['bột', 'chân tay nước'],
    image: '/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 31)).toISOString()
  },
  {
    id: 'vn-expired-28',
    title: 'Cần Thợ Dip & Gel - Tampa',
    company: 'Bay Side Nails',
    location: 'Tampa, Florida',
    description: 'Tuyển thợ nail biết làm dip và gel, thu nhập $1,300-$1,700/tuần, tiệm khu du lịch.',
    salary_range: '$1,300-$1,700/tuần',
    status: 'expired',
    contact_info: {
      phone: '(813) 555-3698'
    },
    specialties: ['dip', 'gel', 'khu du lịch'],
    image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
    created_at: new Date(new Date().setDate(new Date().getDate() - 34)).toISOString()
  }
];
