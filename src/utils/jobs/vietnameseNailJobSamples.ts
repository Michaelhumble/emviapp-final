
import { Job } from '@/types/job';

// Generate a sample of Vietnamese nail salon job listings
export const generateVietnameseNailJobs = (): Job[] => {
  const jobs: Job[] = [
    {
      id: 'vn-job-1',
      title: 'Vietnamese Nail Technician',
      role: 'Nail Technician',
      company: 'Luxury Nails & Spa',
      location: 'Houston, TX',
      employment_type: 'Full-time',
      description: 'Experienced nail technician needed for busy salon. Great tips and friendly environment.',
      vietnamese_description: 'Cần thợ nail có kinh nghiệm cho tiệm đông khách. Típ cao, môi trường làm việc thân thiện.',
      salary_range: '$700-$1200/week',
      created_at: new Date().toISOString(),
      specialties: ['Acrylic', 'Gel', 'Dip Powder'],
      contact_info: {
        phone: '(713) 555-1234',
        email: 'luxurynails@example.com'
      },
      tip_range: '$200-$400/week',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: true,
      no_supply_deduction: false,
      is_featured: true,
      is_urgent: true,
    },
    {
      id: 'vn-job-2',
      title: 'Cần Thợ Bột, Tay Chân Nước',
      role: 'Nail Technician',
      company: 'Rose Nails',
      location: 'Garden Grove, CA',
      employment_type: 'Full-time',
      description: 'Looking for skilled technicians for acrylic and pedicure services. Good pay and benefits.',
      vietnamese_description: 'Tìm thợ giỏi làm bột và tay chân nước. Lương cao và có nhiều phúc lợi.',
      salary_range: '$800-$1500/week',
      created_at: new Date().toISOString(),
      specialties: ['Acrylic', 'Pedicure', 'Manicure'],
      contact_info: {
        phone: '(714) 555-4567',
        email: 'rosenails@example.com'
      },
      tip_range: '$250-$500/week',
      weekly_pay: true,
      owner_will_train: false,
      has_housing: false,
      no_supply_deduction: true,
      is_featured: false,
      is_urgent: false,
    },
    {
      id: 'vn-job-3',
      title: 'Thợ Nail Biết Làm Đủ Thứ',
      role: 'Nail Technician',
      company: 'Kim Nails',
      location: 'San Jose, CA',
      employment_type: 'Part-time',
      description: 'Part-time position available for a technician who can do all types of nail services.',
      vietnamese_description: 'Cần thợ làm bán thời gian, biết làm tất cả các dịch vụ về nail.',
      salary_range: '$15-$25/hour',
      created_at: new Date().toISOString(),
      specialties: ['All Services'],
      contact_info: {
        phone: '(408) 555-7890',
        email: 'kimnails@example.com'
      },
      tip_range: '$100-$300/week',
      weekly_pay: false,
      owner_will_train: true,
      has_housing: false,
      no_supply_deduction: false,
      is_featured: false,
      is_urgent: false,
    },
  ];
  
  return jobs;
};
