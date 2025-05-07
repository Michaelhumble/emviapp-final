
import { Job } from '@/types/job';

// Generate a comprehensive sample of Vietnamese nail salon job listings
// These are based on real FB posts with authentic weekly salary formatting and natural Vietnamese tone
export const generateVietnameseNailJobs = (): Job[] => {
  const jobs: Job[] = [
    {
      id: 'vn-job-premium',
      title: 'Magic Nails – Great Falls, MT',
      role: 'Nail Technician',
      company: 'Magic Nails',
      location: 'Great Falls, MT',
      employment_type: 'Full-time',
      description: 'Cần thợ nail gấp. Tiệm đã hoạt động 10 năm, có lượng khách ổn định. Thu nhập $1,200-$1,500/tuần. Làm việc 6 ngày/tuần. Bao ăn ở. Môi trường làm việc thân thiện, owner dễ tính.',
      vietnamese_description: 'Cần thợ nail gấp. Tiệm đã hoạt động 10 năm, có lượng khách ổn định. Thu nhập $1,200-$1,500/tuần. Làm việc 6 ngày/tuần. Bao ăn ở. Môi trường làm việc thân thiện, owner dễ tính.',
      salary_range: '$1,200-$1,500/tuần',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      specialties: ['Acrylic', 'Gel', 'Pedicure'],
      contact_info: {
        phone: '(406) 555-7890',
        email: 'magicnails@example.com',
        owner_name: 'Anh Tùng'
      },
      tip_range: '$300-$500/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: true,
      is_featured: true,
      is_urgent: true,
      image: '/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png',
      trust_indicators: {
        verified: true,
        established: true
      }
    },
    {
      id: 'vn-job-2',
      title: 'Luxury Nails & Spa – Houston, TX',
      role: 'Nail Technician',
      company: 'Luxury Nails & Spa',
      location: 'Houston, TX',
      employment_type: 'Full-time',
      description: 'Cần thợ nail có kinh nghiệm cho tiệm đông khách. Tip cao, môi trường làm việc thân thiện.',
      vietnamese_description: 'Cần thợ nail có kinh nghiệm cho tiệm đông khách. Tip cao, môi trường làm việc thân thiện.',
      salary_range: '$700-$1,200/tuần',
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder'],
      contact_info: {
        phone: '(713) 555-1234',
        email: 'luxurynails@example.com'
      },
      tip_range: '$200-$400/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png'
    },
    {
      id: 'vn-job-3',
      title: 'Cần Thợ Bột, Tay Chân Nước',
      role: 'Nail Technician',
      company: 'Rose Nails',
      location: 'Garden Grove, CA',
      employment_type: 'Full-time',
      description: 'Tìm thợ giỏi làm bột và tay chân nước. Lương cao và có nhiều phúc lợi.',
      vietnamese_description: 'Tìm thợ giỏi làm bột và tay chân nước. Lương cao và có nhiều phúc lợi.',
      salary_range: '$800-$1,500/tuần',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Pedicure', 'Manicure'],
      contact_info: {
        phone: '(714) 555-4567',
        email: 'rosenails@example.com'
      },
      tip_range: '$250-$500/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: false,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: true,
      image: '/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png'
    },
    {
      id: 'vn-job-4',
      title: 'Thợ Nail Biết Làm Đủ Thứ',
      role: 'Nail Technician',
      company: 'Kim Nails',
      location: 'San Jose, CA',
      employment_type: 'Part-time',
      description: 'Cần thợ làm bán thời gian, biết làm tất cả các dịch vụ về nail.',
      vietnamese_description: 'Cần thợ làm bán thời gian, biết làm tất cả các dịch vụ về nail.',
      salary_range: '$600-$900/tuần',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['All Services'],
      contact_info: {
        phone: '(408) 555-7890',
        email: 'kimnails@example.com'
      },
      tip_range: '$100-$300/tuần',
      weekly_pay: false,
      owner_will_train: true,
      has_housing: false,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png'
    },
    {
      id: 'vn-job-5',
      title: 'Cần Thợ Nail Gấp - Orlando, FL',
      role: 'Nail Technician',
      company: 'Crystal Nails',
      location: 'Orlando, FL',
      employment_type: 'Full-time',
      description: 'Tiệm khu Mỹ trắng, tip hậu, cần thợ nail mọi loại. Income $1,200-$1,800/tuần tùy theo khả năng.',
      vietnamese_description: 'Tiệm khu Mỹ trắng, tip hậu, cần thợ nail mọi loại. Income $1,200-$1,800/tuần tùy theo khả năng.',
      salary_range: '$1,200-$1,800/tuần',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder', 'Nail Art'],
      contact_info: {
        phone: '(407) 555-3456',
        email: 'crystalnails@example.com'
      },
      tip_range: '$400-$600/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: true,
      image: '/lovable-uploads/513e8703-1059-4ed5-aef3-9f9b4536b69d.png'
    },
    {
      id: 'vn-job-6',
      title: 'South Lake Tahoe, CA - Cần Thợ',
      role: 'Nail Technician',
      company: 'Golden Nails',
      location: 'South Lake Tahoe, CA',
      employment_type: 'Full-time',
      description: 'Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền.',
      vietnamese_description: 'Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền.',
      salary_range: '$1,600-$2,500/tuần',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['CTN', 'Everything'],
      contact_info: {
        phone: '(530) 555-9012',
        email: 'goldennails@example.com',
        owner_name: 'Chị Linh'
      },
      tip_range: '$500-$800/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png'
    },
    {
      id: 'vn-job-7',
      title: 'Tiệm Vùng Seattle Cần Thợ',
      role: 'Nail Technician',
      company: 'Diamond Nails',
      location: 'Seattle, WA',
      employment_type: 'Full-time',
      description: 'Cần thợ nail biết làm đủ thứ, có kinh nghiệm ít nhất 2 năm. Lương $1,000-$1,400/tuần tùy theo khả năng.',
      vietnamese_description: 'Cần thợ nail biết làm đủ thứ, có kinh nghiệm ít nhất 2 năm. Lương $1,000-$1,400/tuần tùy theo khả năng.',
      salary_range: '$1,000-$1,400/tuần',
      created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder', 'Pedicure'],
      contact_info: {
        phone: '(206) 555-3456',
        email: 'diamondnails@example.com'
      },
      tip_range: '$300-$500/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: false,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/4edfaa59-6542-4bad-9e6b-1cd0d7ae9113.png'
    },
    {
      id: 'vn-job-8',
      title: 'Greenwood Village, CO - Cần Thợ Bột',
      role: 'Nail Technician',
      company: 'Elegant Nails',
      location: 'Greenwood Village, CO',
      employment_type: 'Full-time',
      description: 'Cần thợ bột kinh nghiệm, tay nghề giỏi. Thu nhập từ $1,300-$1,800/tuần. Tiệm khu nhà giàu, khách lịch sự.',
      vietnamese_description: 'Cần thợ bột kinh nghiệm, tay nghề giỏi. Thu nhập từ $1,300-$1,800/tuần. Tiệm khu nhà giàu, khách lịch sự.',
      salary_range: '$1,300-$1,800/tuần',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Design'],
      contact_info: {
        phone: '(720) 555-7890',
        email: 'elegantnails@example.com'
      },
      tip_range: '$400-$600/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: true,
      image: '/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png'
    },
    {
      id: 'vn-job-9',
      title: 'Humble, TX - Milano Nail Spa',
      role: 'Nail Technician',
      company: 'Milano Nail Spa',
      location: 'Humble, TX',
      employment_type: 'Full-time',
      description: 'Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2,000/tuần.',
      vietnamese_description: 'Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2,000/tuần.',
      salary_range: '$2,000+/tuần',
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Design', 'Nail Art'],
      contact_info: {
        phone: '(346) 555-1234',
        email: 'milanonailspa@example.com',
        owner_name: 'Chị Nhi'
      },
      tip_range: '$600-$1,000/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: false,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/6e4b58ff-f4df-48fe-a85b-8d5952944719.png'
    },
    {
      id: 'vn-job-10',
      title: 'Las Vegas, NV - Cần Thợ Nam/Nữ',
      role: 'Nail Technician',
      company: 'Paradise Nails',
      location: 'Las Vegas, NV',
      employment_type: 'Full-time',
      description: 'Cần thợ nam/nữ biết làm đủ thứ hoặc chuyên môn. Bao lương $6,000-$8,000/tháng. Có nhà ở cho thợ ở xa.',
      vietnamese_description: 'Cần thợ nam/nữ biết làm đủ thứ hoặc chuyên môn. Bao lương $6,000-$8,000/tháng. Có nhà ở cho thợ ở xa.',
      salary_range: '$1,500-$2,000/tuần',
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['All Services', 'Design'],
      contact_info: {
        phone: '(702) 555-6789',
        email: 'paradisenails@example.com'
      },
      tip_range: '$500-$800/tuần',
      weekly_pay: true,
      owner_will_train: true,
      has_housing: true,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: true,
      image: '/lovable-uploads/6bb628b4-8daf-4c22-9c03-4c84a54f36a0.png'
    },
    {
      id: 'vn-job-11',
      title: 'Clawson, MI - Nail Bar',
      role: 'Nail Technician',
      company: 'Elegant Nail Bar',
      location: 'Clawson, MI',
      employment_type: 'Full-time',
      description: 'Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần siêng năng, tay nghề tốt.',
      vietnamese_description: 'Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần siêng năng, tay nghề tốt.',
      salary_range: '$1,200-$1,800/tuần',
      created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Dip', 'Gel-X'],
      contact_info: {
        phone: '(248) 555-9012',
        email: 'elegantnailbar@example.com'
      },
      tip_range: '$300-$500/tuần',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: true,
      image: '/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png'
    },
    {
      id: 'vn-job-12',
      title: 'Beavercreek, OH - Tiệm Lớn Cần Thợ',
      role: 'Nail Technician',
      company: 'Royal Nails & Spa',
      location: 'Beavercreek, OH',
      employment_type: 'Full-time',
      description: 'Tiệm lớn cần nhiều thợ nail. Thu nhập $1,200-$1,700/tuần. Có chỗ cho thợ ở xa đến làm.',
      vietnamese_description: 'Tiệm lớn cần nhiều thợ nail. Thu nhập $1,200-$1,700/tuần. Có chỗ cho thợ ở xa đến làm.',
      salary_range: '$1,200-$1,700/tuần',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure', 'Dip Powder'],
      contact_info: {
        phone: '(937) 555-3456',
        email: 'royalnails@example.com'
      },
      tip_range: '$300-$500/tuần',
      weekly_pay: true,
      owner_will_train: true,
      has_housing: true,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: false,
      image: '/lovable-uploads/733d57a9-1f52-4ef1-afa2-59d9507d7f92.png'
    }
  ];
  
  return jobs;
};
