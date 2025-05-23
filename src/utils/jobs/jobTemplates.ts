import { JobFormValues, JobTemplate, TemplateCategory } from '@/components/posting/job/jobFormSchema';

// Define all job templates
export const jobTemplates: JobTemplate[] = [
  {
    id: 'nail-tech-1',
    title: 'Nail Technician',
    industry: 'nails',
    salonName: 'Elegant Nails',
    description: 'We are looking for experienced nail technicians to join our team. Must be skilled in acrylic, gel, and nail art.',
    vietnamese_description: 'Chúng tôi đang tìm kiếm các kỹ thuật viên làm móng có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Phải có kỹ năng làm bột, gel và nghệ thuật móng.',
    location: 'Los Angeles, CA',
    jobType: 'full-time',
    compensation_type: 'commission',
    compensation_details: 'Commission up to 60% + tips (experienced technicians)',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: true,
    owner_will_train: false,
    no_supply_deduction: true,
    requirements: [
      'At least 2 years experience',
      'Valid cosmetology license',
      'Acrylic and gel nail skills',
      'Nail art experience',
      'Weekend availability required'
    ],
    specialties: [
      'Acrylic', 
      'Gel', 
      'Pedicure', 
      'Nail Art'
    ],
    contactName: 'Jane Smith',
    contactEmail: 'contact@elegantnails.com',
    contactPhone: '(555) 123-4567'
  },
  {
    id: 'nail-tech-2',
    title: 'Nail Technician - High Income',
    industry: 'nails',
    salonName: 'Luxe Nail Bar',
    description: 'Upscale salon seeking skilled nail techs for our busy location. High-end clientele, excellent earning potential.',
    vietnamese_description: 'Salon cao cấp đang tìm kiếm thợ nail có kỹ năng cho chi nhánh đông khách. Khách hàng cao cấp, tiềm năng thu nhập tốt.',
    location: 'Miami, FL',
    jobType: 'full-time',
    compensation_type: 'commission',
    compensation_details: '60-70% commission + tips, $1,200-$1,800/week',
    weekly_pay: true,
    has_housing: true,
    has_wax_room: true,
    owner_will_train: false,
    no_supply_deduction: true,
    requirements: [
      'Minimum 3 years experience',
      'Valid license required',
      'Strong acrylic skills',
      'Must be able to do pink & white',
      'Good English communication'
    ],
    specialties: [
      'Acrylic', 
      'Pink & White',
      'Dipping Powder', 
      'Luxury Pedicures'
    ],
    contactName: 'Michael Johnson',
    contactEmail: 'jobs@luxenailbar.com',
    contactPhone: '(305) 555-7890'
  },
  {
    id: 'hair-stylist-1',
    title: 'Hair Stylist',
    industry: 'hair',
    salonName: 'Salon de Paris',
    description: 'We are looking for talented hair stylists with experience in cutting, coloring, and styling.',
    vietnamese_description: 'Chúng tôi đang tìm kiếm các nhà tạo mẫu tóc tài năng có kinh nghiệm về cắt, nhuộm và tạo kiểu.',
    location: 'New York, NY',
    jobType: 'full-time',
    compensation_type: 'salary',
    compensation_details: '$50,000 - $70,000 per year + benefits',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    requirements: [
      'Cosmetology license required',
      '3+ years experience',
      'Coloring and cutting expertise',
      'Up-to-date on trends'
    ],
    specialties: [
      'Hair Cutting',
      'Hair Coloring',
      'Balayage',
      'Styling'
    ],
    contactName: 'Sophie Dubois',
    contactEmail: 'hr@salondeparis.com',
    contactPhone: '(212) 555-1212'
  },
  {
    id: 'lash-tech-1',
    title: 'Eyelash Technician',
    industry: 'lashes',
    salonName: 'Lash Lounge',
    description: 'Join our team of lash artists! We provide a fun, supportive environment and competitive pay.',
    vietnamese_description: 'Tham gia vào đội ngũ nghệ sĩ làm mi của chúng tôi! Chúng tôi cung cấp một môi trường làm việc vui vẻ, hỗ trợ và mức lương cạnh tranh.',
    location: 'Houston, TX',
    jobType: 'part-time',
    compensation_type: 'hourly',
    compensation_details: '$15 - $25/hour + tips',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: true,
    no_supply_deduction: true,
    requirements: [
      'Eyelash extension certification',
      'Excellent attention to detail',
      'Customer service skills'
    ],
    specialties: [
      'Classic Lashes',
      'Volume Lashes',
      'Hybrid Lashes',
      'Lash Lifts'
    ],
    contactName: 'Emily Carter',
    contactEmail: 'careers@lashlounge.com',
    contactPhone: '(713) 555-2323'
  },
  {
    id: 'barber-1',
    title: 'Barber',
    industry: 'barber',
    salonName: 'The Gents Den',
    description: 'Looking for skilled barbers to provide classic cuts and grooming services in a modern barbershop.',
    vietnamese_description: 'Tìm kiếm thợ cắt tóc lành nghề để cung cấp các dịch vụ cắt và chăm sóc tóc cổ điển trong một tiệm cắt tóc hiện đại.',
    location: 'Chicago, IL',
    jobType: 'full-time',
    compensation_type: 'commission',
    compensation_details: '50% commission + tips',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: true,
    requirements: [
      'Barber license required',
      'Proficiency in fades and tapers',
      'Excellent customer service'
    ],
    specialties: [
      'Fades',
      'Tapers',
      'Beard Trims',
      'Hot Towel Shaves'
    ],
    contactName: 'David Miller',
    contactEmail: 'jobs@thegentsden.com',
    contactPhone: '(312) 555-3434'
  },
  {
    id: 'skincare-1',
    title: 'Esthetician',
    industry: 'skincare',
    salonName: 'Glow Skincare Studio',
    description: 'Passionate estheticians needed to provide facials, waxing, and other skincare treatments.',
    vietnamese_description: 'Cần các chuyên gia thẩm mỹ đam mê để cung cấp các dịch vụ chăm sóc da mặt, tẩy lông và các phương pháp điều trị da khác.',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    compensation_type: 'hourly',
    compensation_details: '$20 - $30/hour + commission',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: true,
    owner_will_train: false,
    no_supply_deduction: true,
    requirements: [
      'Esthetician license required',
      'Experience with facials and waxing',
      'Knowledge of skincare products'
    ],
    specialties: [
      'Facials',
      'Waxing',
      'Microdermabrasion',
      'Chemical Peels'
    ],
    contactName: 'Sarah Chen',
    contactEmail: 'careers@glowskincare.com',
    contactPhone: '(415) 555-4545'
  },
];

// Map a template to form values
export const mapTemplateToFormValues = (template: typeof jobTemplates[0]): Partial<JobFormValues> => {
  return {
    title: template.title,
    salonName: template.salonName,
    description: template.description,
    vietnamese_description: template.vietnamese_description,
    location: template.location,
    jobType: template.jobType,
    compensation_type: template.compensation_type,
    compensation_details: template.compensation_details,
    weekly_pay: template.weekly_pay,
    has_housing: template.has_housing,
    has_wax_room: template.has_wax_room,
    owner_will_train: template.owner_will_train,
    no_supply_deduction: template.no_supply_deduction,
    salary_range: template.salary_range,
    contactName: template.contactName,
    contactEmail: template.contactEmail,
    contactPhone: template.contactPhone,
    requirements: template.requirements,
    specialties: template.specialties,
    experience_level: template.experience_level,
    industry: template.industry as string,
    templateType: template.industry as string,
  };
};
