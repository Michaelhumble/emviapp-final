
import { Job } from '@/types/job';

export const generateVietnameseNailJobs = (): Job[] => {
  return [
    // Premium featured listing - Magic Nails (Great Falls, MT)
    {
      id: 'vn-job-premium',
      title: 'Magic Nails - Great Falls, MT',
      role: 'Thợ Nail',
      company: 'Magic Nails',
      location: 'Great Falls, MT',
      employment_type: 'Full-time',
      description: 'Cần thợ nail nữ biết làm đủ thứ, bao lương hoặc ăn chia tùy khả năng thợ. Có chỗ ở rất tốt cho thợ muốn tích góp tiền.',
      vietnamese_description: 'Cần thợ nail nữ biết làm đủ thứ, bao lương hoặc ăn chia tùy khả năng thợ. Có chỗ ở rất tốt cho thợ muốn tích góp tiền.',
      salary_range: '$1,200-$1,500/tuần',
      tip_range: '$300-500/tuần',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder', 'Pedicure'],
      contact_info: {
        phone: '(406) 770-3070',
        email: 'magicnails@example.com'
      },
      is_featured: true,
      weekly_pay: true,
      has_housing: true,
      no_supply_deduction: true,
      image: '/lovable-uploads/17e65a2b-10a7-4b2a-a839-340a80da6903.png'
    },
    // Regular Vietnamese job listings
    {
      id: 'vn-job-1',
      title: 'Cali Nails & Spa - Lansing, MI',
      role: 'Thợ Nail',
      company: 'Cali Nails & Spa',
      location: 'Lansing, Michigan',
      employment_type: 'Full-time',
      description: 'Tiệm ở Lansing, Michigan cần thợ nail gấp. Income cao, chủ dễ tính. Bao lương từ $1,300-$1,600/tuần. Có chỗ ở thoải mái.',
      vietnamese_description: 'Tiệm ở Lansing, Michigan cần thợ nail gấp. Income cao, chủ dễ tính. Bao lương từ $1,300-$1,600/tuần. Có chỗ ở thoải mái.',
      salary_range: '$1,300-$1,600/tuần',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure'],
      contact_info: {
        phone: '(517) 555-6789',
        email: 'calinailsspa@example.com'
      },
      weekly_pay: true,
      has_housing: true,
      image: '/lovable-uploads/0d50d1e2-4ac5-4520-8d66-dffc59da9302.png'
    },
    {
      id: 'vn-job-2',
      title: 'Diamond Nails - Louisville, KY',
      role: 'Thợ Bột/Chân Tay Nước',
      company: 'Diamond Nails',
      location: 'Louisville, Kentucky',
      employment_type: 'Full-time',
      description: 'Cần thợ nail nhiều kinh nghiệm, làm được bột và biết làm chân tay nước. Ở Louisville, KY. Chia 6/4, thu nhập $1,200-$1,500/tuần.',
      vietnamese_description: 'Cần thợ nail nhiều kinh nghiệm, làm được bột và biết làm chân tay nước. Ở Louisville, KY. Chia 6/4, thu nhập $1,200-$1,500/tuần.',
      salary_range: '$1,200-$1,500/tuần',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Pedicure', 'Manicure'],
      contact_info: {
        phone: '(502) 555-1234',
        email: 'diamondnails@example.com'
      },
      no_supply_deduction: true,
      image: '/lovable-uploads/b4f26c5f-97b6-4a68-9acf-1b370937ef1a.png'
    },
    {
      id: 'vn-job-3',
      title: 'Luxury Nails - Cedar Rapids, IA',
      role: 'Thợ Nail',
      company: 'Luxury Nails',
      location: 'Cedar Rapids, Iowa',
      employment_type: 'Full-time',
      description: 'Tiệm vùng Cedar Rapids, Iowa cần thợ nail gấp. Bao lương $1,300-$1,600/tuần tùy theo kinh nghiệm. Có chỗ ở thoải mái, chủ lo ăn ở.',
      vietnamese_description: 'Tiệm vùng Cedar Rapids, Iowa cần thợ nail gấp. Bao lương $1,300-$1,600/tuần tùy theo kinh nghiệm. Có chỗ ở thoải mái, chủ lo ăn ở.',
      salary_range: '$1,300-$1,600/tuần',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure', 'Nail Art'],
      contact_info: {
        phone: '(319) 555-9876',
        email: 'luxurynails@example.com'
      },
      has_housing: true,
      weekly_pay: true,
      image: '/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png'
    },
    {
      id: 'vn-job-4',
      title: 'Queen Nails - Tulsa, OK',
      role: 'Thợ Bột',
      company: 'Queen Nails',
      location: 'Tulsa, Oklahoma',
      employment_type: 'Full-time',
      description: 'Tiệm ở Tulsa, Oklahoma cần nhiều thợ bột và thợ chân tay nước. Thu nhập $1,000-$1,300/tuần, tip cao, khách sang.',
      vietnamese_description: 'Tiệm ở Tulsa, Oklahoma cần nhiều thợ bột và thợ chân tay nước. Thu nhập $1,000-$1,300/tuần, tip cao, khách sang.',
      salary_range: '$1,000-$1,300/tuần',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Nail Art'],
      contact_info: {
        phone: '(918) 555-8532',
        email: 'queennails@example.com'
      },
      image: '/lovable-uploads/a59ea036-184e-4057-b4ba-8a0f2ab2c365.png'
    },
    {
      id: 'vn-job-5',
      title: 'Pink & White Nails - Boise, ID',
      role: 'Thợ Nail Nam/Nữ',
      company: 'Pink & White Nails',
      location: 'Boise, Idaho',
      employment_type: 'Full-time',
      description: 'Cần thợ nail nam/nữ làm ở Boise, Idaho - thành phố đẹp và an ninh. Bao lương $1,200-$1,400/tuần. Bao chỗ ở, môi trường làm việc vui vẻ.',
      vietnamese_description: 'Cần thợ nail nam/nữ làm ở Boise, Idaho - thành phố đẹp và an ninh. Bao lương $1,200-$1,400/tuần. Bao chỗ ở, môi trường làm việc vui vẻ.',
      salary_range: '$1,200-$1,400/tuần',
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pink & White'],
      contact_info: {
        phone: '(208) 555-7642',
        email: 'pinkwhitenails@example.com'
      },
      has_housing: true,
      weekly_pay: true,
      image: '/lovable-uploads/5f4b0b9e-d1c2-43ad-a85c-92c4b6c61441.png'
    },
    {
      id: 'vn-job-6',
      title: 'Elegant Nails - Fort Wayne, IN',
      role: 'Thợ Nail Full-time',
      company: 'Elegant Nails',
      location: 'Fort Wayne, Indiana',
      employment_type: 'Full-time',
      description: 'Tiệm mới remodel ở Fort Wayne, IN cần thợ nail nam/nữ full time hoặc part time. Bao lương $1,100-$1,400/tuần + tips. Chỗ làm vui vẻ, khách tip hậu.',
      vietnamese_description: 'Tiệm mới remodel ở Fort Wayne, IN cần thợ nail nam/nữ full time hoặc part time. Bao lương $1,100-$1,400/tuần + tips. Chỗ làm vui vẻ, khách tip hậu.',
      salary_range: '$1,100-$1,400/tuần',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder'],
      contact_info: {
        phone: '(260) 555-3214',
        email: 'elegantnails@example.com'
      },
      weekly_pay: true,
      image: '/lovable-uploads/1bc30225-0249-44a2-8086-c0a8ecbd57c2.png'
    },
    {
      id: 'vn-job-7',
      title: 'Lovely Nails - Des Moines, IA',
      role: 'Thợ Nail Kinh Nghiệm',
      company: 'Lovely Nails',
      location: 'Des Moines, Iowa',
      employment_type: 'Full-time',
      description: 'Cần thợ nail có kinh nghiệm làm việc ở Des Moines, Iowa. Tiệm khách sang, tip cao. Bao lương $1,300-$1,600/tuần cho thợ giỏi. Có housing.',
      vietnamese_description: 'Cần thợ nail có kinh nghiệm làm việc ở Des Moines, Iowa. Tiệm khách sang, tip cao. Bao lương $1,300-$1,600/tuần cho thợ giỏi. Có housing.',
      salary_range: '$1,300-$1,600/tuần',
      created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Nail Art', 'Pedicure'],
      contact_info: {
        phone: '(515) 555-7890',
        email: 'lovelynails@example.com'
      },
      weekly_pay: true,
      has_housing: true,
      image: '/lovable-uploads/5af131ca-038f-40e6-892a-502d1e822395.png'
    },
    {
      id: 'vn-job-8',
      title: 'USA Nails - Omaha, NE',
      role: 'Thợ Nail Tay Chân Nước',
      company: 'USA Nails',
      location: 'Omaha, Nebraska',
      employment_type: 'Full-time',
      description: 'Tiệm ở Omaha, Nebraska cần thợ làm chân tay nước, biết làm wax lông mày càng tốt. Thu nhập ổn định $900-$1,200/tuần, tip tốt.',
      vietnamese_description: 'Tiệm ở Omaha, Nebraska cần thợ làm chân tay nước, biết làm wax lông mày càng tốt. Thu nhập ổn định $900-$1,200/tuần, tip tốt.',
      salary_range: '$900-$1,200/tuần',
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Pedicure', 'Manicure', 'Waxing'],
      contact_info: {
        phone: '(402) 555-6543',
        email: 'usanails@example.com'
      },
      image: '/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png'
    },
    {
      id: 'vn-job-9',
      title: 'Crystal Nails - Wichita, KS',
      role: 'Thợ Nail',
      company: 'Crystal Nails',
      location: 'Wichita, Kansas',
      employment_type: 'Full-time',
      description: 'Cần thợ nail gấp ở Wichita, Kansas. Bao lương từ $1,100-$1,400/tuần và có chỗ ở thoải mái, sạch sẽ. Môi trường làm việc thân thiện.',
      vietnamese_description: 'Cần thợ nail gấp ở Wichita, Kansas. Bao lương từ $1,100-$1,400/tuần và có chỗ ở thoải mái, sạch sẽ. Môi trường làm việc thân thiện.',
      salary_range: '$1,100-$1,400/tuần',
      created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure'],
      contact_info: {
        phone: '(316) 555-9876',
        email: 'crystalnails@example.com'
      },
      weekly_pay: true,
      has_housing: true,
      image: '/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png'
    },
    {
      id: 'vn-job-10',
      title: 'Sunshine Nails - Springfield, IL',
      role: 'Thợ Nail Full/Part Time',
      company: 'Sunshine Nails',
      location: 'Springfield, Illinois',
      employment_type: 'Full-time',
      description: 'Tiệm ở Springfield, IL cần thợ nail full time hoặc part time. Làm việc vui vẻ, khách tip tốt. Thu nhập $1,000-$1,300/tuần.',
      vietnamese_description: 'Tiệm ở Springfield, IL cần thợ nail full time hoặc part time. Làm việc vui vẻ, khách tip tốt. Thu nhập $1,000-$1,300/tuần.',
      salary_range: '$1,000-$1,300/tuần',
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure'],
      contact_info: {
        phone: '(217) 555-1234',
        email: 'sunshinenails@example.com'
      },
      image: '/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png'
    },
    {
      id: 'vn-job-11',
      title: 'Lucky Nails - Columbia, MO',
      role: 'Thợ Nail Nam Nữ',
      company: 'Lucky Nails',
      location: 'Columbia, Missouri',
      employment_type: 'Full-time',
      description: 'Tiệm sang vùng Columbia, MO cần thợ nam/nữ biết làm đủ thứ. Chia 6/4 hoặc bao lương tùy khả năng. Thu nhập $1,200-$1,500/tuần.',
      vietnamese_description: 'Tiệm sang vùng Columbia, MO cần thợ nam/nữ biết làm đủ thứ. Chia 6/4 hoặc bao lương tùy khả năng. Thu nhập $1,200-$1,500/tuần.',
      salary_range: '$1,200-$1,500/tuần',
      created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Pedicure', 'Nail Art'],
      contact_info: {
        phone: '(573) 555-8765',
        email: 'luckynails@example.com'
      },
      image: '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png'
    },
    {
      id: 'vn-job-12',
      title: 'Star Nails - Lincoln, NE',
      role: 'Thợ Nail Giỏi',
      company: 'Star Nails',
      location: 'Lincoln, Nebraska',
      employment_type: 'Full-time',
      description: 'Cần thợ nail giỏi làm ở Lincoln, NE. Chỗ làm thoải mái, không khí gia đình. Bao lương $1,200-$1,500/tuần cho thợ có kinh nghiệm.',
      vietnamese_description: 'Cần thợ nail giỏi làm ở Lincoln, NE. Chỗ làm thoải mái, không khí gia đình. Bao lương $1,200-$1,500/tuần cho thợ có kinh nghiệm.',
      salary_range: '$1,200-$1,500/tuần',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder'],
      contact_info: {
        phone: '(402) 555-3456',
        email: 'starnails@example.com'
      },
      weekly_pay: true,
      image: '/lovable-uploads/e4558475-4b40-4bb4-b3ae-7ade4595c1eb.png'
    },
    // Additional expired Vietnamese job listings
    {
      id: 'vn-job-expired-1',
      title: 'Perfect Nails - Rockford, IL',
      role: 'Thợ Nail',
      company: 'Perfect Nails',
      location: 'Rockford, Illinois',
      employment_type: 'Full-time',
      description: 'Cần thợ bột có kinh nghiệm, chia 6/4, làm ở Rockford, IL. Thu nhập $800-$1,100/tuần.',
      vietnamese_description: 'Cần thợ bột có kinh nghiệm, chia 6/4, làm ở Rockford, IL. Thu nhập $800-$1,100/tuần.',
      salary_range: '$800-$1,100/tuần',
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Gel'],
      contact_info: {
        phone: '(815) 555-9090',
        email: 'perfectnails@example.com'
      },
      status: 'expired',
      image: '/lovable-uploads/ada4c504-75cf-45ce-a673-c81a22b9dbe3.png'
    },
    {
      id: 'vn-job-expired-2',
      title: 'Bella Nails - Peoria, IL',
      role: 'Thợ Nail Full/Part Time',
      company: 'Bella Nails',
      location: 'Peoria, Illinois',
      employment_type: 'Full-time',
      description: 'Tiệm ở Peoria, IL cần thợ nail biết làm đầy đủ. Thu nhập $900-$1,200/tuần. Làm việc vui vẻ.',
      vietnamese_description: 'Tiệm ở Peoria, IL cần thợ nail biết làm đầy đủ. Thu nhập $900-$1,200/tuần. Làm việc vui vẻ.',
      salary_range: '$900-$1,200/tuần',
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      specialties: ['Acrylic', 'Pedicure', 'Manicure'],
      contact_info: {
        phone: '(309) 555-6754',
        email: 'bellanails@example.com'
      },
      status: 'expired',
      image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png'
    },
    // Add more expired jobs to reach 28 total if needed
  ];
};
