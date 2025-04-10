import { Job } from '@/types/job';

// Generate Vietnamese nail job listings with appropriate details
export const generateVietnameseNailJobs = (count: number = 5): Job[] => {
  const locations = [
    'Houston, TX',
    'Atlanta, GA',
    'Orlando, FL',
    'Dallas, TX',
    'San Jose, CA',
    'Philadelphia, PA',
    'Seattle, WA',
    'Denver, CO',
    'Charlotte, NC',
    'Las Vegas, NV'
  ];

  const salonNames = [
    'Luxury Nails & Spa',
    'Diamond Nails',
    'VIP Nails',
    'Crystal Nail Salon',
    'Perfect Nails',
    'Queen Nails',
    'Royal Nails',
    'Elite Nails',
    'Golden Nails',
    'Star Nails & Spa'
  ];

  const specialties = [
    ['Acrylic', 'Gel', 'Dipping Powder', 'Nail Art'],
    ['Gel', 'Pedicure', 'Manicure', 'Waxing'],
    ['Acrylic', 'Dipping Powder', 'Nail Design', 'Pedicure'],
    ['Gel-X', 'Acrylic', 'Ombre', 'Nail Art'],
    ['Pedicure', 'Manicure', 'Gel Polish', 'Paraffin Treatment'],
    ['Acrylic', 'Gel', 'Nail Art', 'Massage'],
    ['Dipping Powder', 'Gel', 'Acrylic', 'Nail Repair'],
    ['Acrylic', 'Gel', 'Pedicure', 'Waxing'],
    ['Nail Art', 'Gel', 'Acrylic', 'Pedicure'],
    ['Gel-X', 'Dipping Powder', 'Acrylic', 'Nail Design']
  ];

  const vietnameseDescriptions = [
    'Tiệm nail ở khu Mỹ trắng, đông khách, cần thợ nail biết làm đủ thứ (bột, gel, chân tay nước). Bao lương $1,000-$1,200/tuần, hơn chia 6/4. Chỗ làm vui vẻ, không khí gia đình.',
    'Cần thợ nail gấp, bao lương $900-$1,100/tuần. Tiệm đông khách, tip cao. Chủ lo chỗ ở, có thể đón từ xa tới. Môi trường làm việc thoải mái.',
    'Tiệm rộng rãi, khu Mỹ trắng, giàu, cần thợ nail có kinh nghiệm. Lương $800-$1,000/tuần hơn chia 6/4. Chủ lo nhà ở, có phòng riêng.',
    'Cần thợ bột và chân tay nước, bao lương $900-$1,300 tùy theo khả năng. Tiệm khu Mỹ trắng, giá cao, tip hậu. Chỗ làm vui vẻ, không drama.',
    'Tiệm khu sang, khách tip hậu, cần thợ nail biết làm đủ thứ. Thu nhập $1,200-$1,500/tuần. Bao ăn ở, đón từ xa.',
    'Cần thợ nail nam nữ, bao lương $800-$1,000/tuần. Tiệm lớn, khu Mỹ trắng, tip cao. Chủ lo chỗ ở, có phòng riêng.',
    'Tiệm mới, sang trọng, cần thợ nail có kinh nghiệm. Lương $1,000-$1,300/tuần. Môi trường làm việc thân thiện, vui vẻ.',
    'Cần thợ nail gấp, bao lương $900-$1,100/tuần. Tiệm đông khách, khu Mỹ trắng, tip hậu. Chủ lo chỗ ở, có thể đón từ xa.',
    'Tiệm khu Mỹ trắng, khách sang, cần thợ nail full-time hoặc part-time. Thu nhập $1,000-$1,400/tuần. Chỗ làm vui vẻ, thoải mái.',
    'Cần thợ nail biết làm đủ thứ, bao lương $1,100-$1,400/tuần. Tiệm đẹp, sang trọng, khu Mỹ trắng, tip cao.'
  ];

  const jobs: Job[] = [];

  for (let i = 0; i < count; i++) {
    const index = i % 10;
    const id = `vn-${Date.now()}-${i}`;
    
    const job: Job = {
      id,
      role: 'Nail Technician',
      role_normalized: 'nail_technician',
      title: `Nail Technician / Thợ Nail - ${salonNames[index]}`,
      company: salonNames[index],
      location: locations[index],
      posted_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      experience_level: 'All Levels',
      employment_type: 'Full-Time',
      description: `${salonNames[index]} is looking for experienced nail technicians to join our team. We offer competitive pay, flexible hours, and a friendly work environment. Our salon is located in a busy shopping center with a loyal client base.`,
      vietnamese_description: vietnameseDescriptions[index],
      requirements: ['Experience with acrylic and gel nails', 'Customer service skills', 'Reliable transportation'],
      specialties: specialties[index],
      benefits: ['Competitive pay', 'Flexible schedule', 'Growth opportunities'],
      is_featured: Math.random() > 0.7,
      is_remote: false,
      is_urgent: Math.random() > 0.7,
      weekly_pay: true,
      has_housing: Math.random() > 0.5,
      owner_will_train: Math.random() > 0.7,
      no_supply_deduction: Math.random() > 0.6,
      tip_range: '$100-200/day',
      salary_range: '$900-1,400/week',
      contact_info: {
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `${salonNames[index].toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        owner_name: getRandomVietnameseName()
      },
      trust_indicators: {
        verified: true,
        activelyHiring: true,
        chatAvailable: Math.random() > 0.5
      }
    };
    
    jobs.push(job);
  }
  
  return jobs;
};

// Helper function to generate random Vietnamese names
function getRandomVietnameseName(): string {
  const firstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Huynh', 'Vo', 'Dang', 'Bui', 'Do'];
  const middleNames = ['Van', 'Thi', 'Huu', 'Duc', 'Dinh', 'Minh', 'Quoc', 'Thanh', 'Tuan', 'Kim'];
  const lastNames = ['Anh', 'Linh', 'Hoa', 'Tuan', 'Minh', 'Hai', 'Hung', 'Phuong', 'Thao', 'Dung'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${middleName} ${lastName}`;
}

export default generateVietnameseNailJobs;
