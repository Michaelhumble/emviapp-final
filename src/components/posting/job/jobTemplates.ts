
import { JobFormValues } from './jobFormSchema';

// Define template types for easier categorization
type TemplateCategory = 'nails' | 'hair' | 'spa' | 'barber' | 'lashes' | 'brows' | 'makeup' | 'tattoo';

// Define the template interface
export interface JobTemplate {
  id: string;
  title: string;
  industry: TemplateCategory;
  description: string;
  vietnamese_description: string;
  location: string;
  salonName: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  compensation_type: 'hourly' | 'commission' | 'salary' | 'hybrid';
  compensation_details: string;
  weekly_pay: boolean;
  has_housing: boolean;
  has_wax_room: boolean;
  owner_will_train: boolean;
  no_supply_deduction: boolean;
  specialties: string[];
  requirements: string[];
  salary_range?: string;
  experience_level?: string;
  thumbnailUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// Define templates for different job categories
export const jobTemplates: JobTemplate[] = [
  // Nail Tech Template
  {
    id: 'nail-tech-1',
    title: 'Nail Technician',
    industry: 'nails',
    description: 'We are seeking a skilled Nail Technician to join our team. The ideal candidate will have experience in manicures, pedicures, and nail enhancements. You will be responsible for providing high-quality nail services to our clients in a friendly and professional manner.',
    vietnamese_description: 'Chúng tôi đang tìm kiếm một Kỹ thuật viên Móng có kỹ năng để tham gia vào đội ngũ của chúng tôi. Ứng viên lý tưởng sẽ có kinh nghiệm về làm móng tay, móng chân và nối móng. Bạn sẽ chịu trách nhiệm cung cấp dịch vụ móng chất lượng cao cho khách hàng của chúng tôi một cách thân thiện và chuyên nghiệp.',
    location: 'Dallas, TX',
    salonName: 'Glamour Nails & Spa',
    jobType: 'full-time',
    compensation_type: 'commission',
    compensation_details: '60% commission',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: true,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: ['Acrylic', 'Gel', 'Dip Powder', 'Nail Art'],
    requirements: ['2+ years experience', 'License required'],
    salary_range: '$800-1500/week',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/nail-tech.jpg',
    contactName: 'Jenny Nguyen',
    contactEmail: 'jenny@glamournails.com',
    contactPhone: '(214) 555-1234'
  },
  
  // Hair Stylist Template
  {
    id: 'hair-stylist-1',
    title: 'Hair Stylist',
    industry: 'hair',
    description: 'Join our upscale salon as a Hair Stylist! We are looking for creative professionals with experience in cutting, coloring, and styling. You will work with a diverse clientele and have the opportunity to build your own book of business.',
    vietnamese_description: 'Tham gia salon cao cấp của chúng tôi với vị trí Nhà tạo mẫu tóc! Chúng tôi đang tìm kiếm các chuyên gia sáng tạo có kinh nghiệm cắt, nhuộm và tạo kiểu. Bạn sẽ làm việc với nhiều khách hàng đa dạng và có cơ hội xây dựng sổ khách hàng riêng của mình.',
    location: 'Houston, TX',
    salonName: 'Chic Hair Studio',
    jobType: 'full-time',
    compensation_type: 'hybrid',
    compensation_details: '$20/hr base + 35% commission',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: true,
    specialties: ['Cutting', 'Coloring', 'Balayage', 'Extensions'],
    requirements: ['Cosmetology license', '3+ years experience'],
    salary_range: '$1000-2000/week',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/hair-stylist.jpg',
    contactName: 'Michael Jones',
    contactEmail: 'michael@chichairstudio.com',
    contactPhone: '(713) 555-6789'
  },
  
  // Lash Tech Template
  {
    id: 'lash-tech-1',
    title: 'Lash Technician',
    industry: 'lashes',
    description: 'We are seeking a certified Lash Technician to join our beauty studio. The ideal candidate will have experience in classic and volume lash extensions. You will provide exceptional lash services and maintain the highest standards of sanitation.',
    vietnamese_description: 'Chúng tôi đang tìm kiếm một Kỹ thuật viên Mi đã được chứng nhận để tham gia vào studio làm đẹp của chúng tôi. Ứng viên lý tưởng sẽ có kinh nghiệm về nối mi classic và volume. Bạn sẽ cung cấp dịch vụ mi ngoại hạng và duy trì tiêu chuẩn vệ sinh cao nhất.',
    location: 'Austin, TX',
    salonName: 'Flawless Beauty Studio',
    jobType: 'part-time',
    compensation_type: 'commission',
    compensation_details: '55% commission',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: true,
    no_supply_deduction: false,
    specialties: ['Classic Lashes', 'Volume Lashes', 'Lash Lifts'],
    requirements: ['Lash certification', '1+ year experience'],
    salary_range: '$700-1200/week',
    experience_level: 'Entry-Level to Experienced',
    thumbnailUrl: '/images/lash-tech.jpg',
    contactName: 'Sarah Williams',
    contactEmail: 'sarah@flawlessbeauty.com',
    contactPhone: '(512) 555-4321'
  },
  
  // Barber Template
  {
    id: 'barber-1',
    title: 'Barber',
    industry: 'barber',
    description: 'Modern barbershop seeking an experienced Barber. You will provide haircuts, shaves, and beard trims to our diverse clientele. Looking for someone with strong technical skills and excellent customer service.',
    vietnamese_description: 'Tiệm cắt tóc hiện đại đang tìm kiếm một Thợ cắt tóc có kinh nghiệm. Bạn sẽ cung cấp dịch vụ cắt tóc, cạo râu và tỉa râu cho khách hàng đa dạng của chúng tôi. Đang tìm kiếm người có kỹ năng kỹ thuật mạnh mẽ và dịch vụ khách hàng xuất sắc.',
    location: 'San Antonio, TX',
    salonName: 'Classic Cuts Barbershop',
    jobType: 'full-time',
    compensation_type: 'commission',
    compensation_details: '60-65% commission',
    weekly_pay: true,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: true,
    specialties: ['Fades', 'Razor Cuts', 'Beard Grooming', 'Hot Towel Shaves'],
    requirements: ['Barber license', '2+ years experience'],
    salary_range: '$900-1700/week',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/barber.jpg',
    contactName: 'James Rodriguez',
    contactEmail: 'james@classiccuts.com',
    contactPhone: '(210) 555-8765'
  },
  
  // Esthetician Template
  {
    id: 'esthetician-1',
    title: 'Esthetician',
    industry: 'spa',
    description: 'Luxury spa seeking a licensed Esthetician to perform facials, waxing, and skincare treatments. You will assess clients\' skin conditions and recommend appropriate treatments and products.',
    vietnamese_description: 'Spa cao cấp đang tìm kiếm một Chuyên viên thẩm mỹ có giấy phép để thực hiện các dịch vụ chăm sóc da mặt, tẩy lông và điều trị da. Bạn sẽ đánh giá tình trạng da của khách hàng và đề xuất các phương pháp điều trị và sản phẩm thích hợp.',
    location: 'Atlanta, GA',
    salonName: 'Serene Wellness Spa',
    jobType: 'full-time',
    compensation_type: 'hybrid',
    compensation_details: '$18/hr + 40% commission on products',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: true,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing'],
    requirements: ['Esthetician license', '2+ years experience'],
    salary_range: '$800-1500/week',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/esthetician.jpg',
    contactName: 'Elizabeth Chen',
    contactEmail: 'elizabeth@serenewellness.com',
    contactPhone: '(404) 555-2468'
  },
  
  // Massage Therapist Template
  {
    id: 'massage-1',
    title: 'Massage Therapist',
    industry: 'spa',
    description: 'We are looking for a licensed Massage Therapist to join our wellness center. You will provide various massage modalities including Swedish, deep tissue, and hot stone. Part-time and full-time positions available.',
    vietnamese_description: 'Chúng tôi đang tìm kiếm một Chuyên viên Massage có giấy phép để tham gia vào trung tâm sức khỏe của chúng tôi. Bạn sẽ cung cấp các phương pháp massage khác nhau bao gồm Swedish, deep tissue và hot stone. Có vị trí làm việc bán thời gian và toàn thời gian.',
    location: 'Chicago, IL',
    salonName: 'Tranquility Wellness Center',
    jobType: 'part-time',
    compensation_type: 'hybrid',
    compensation_details: '$25/hr + tips',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: true,
    specialties: ['Swedish', 'Deep Tissue', 'Hot Stone', 'Prenatal'],
    requirements: ['Massage Therapy License', 'Insurance'],
    salary_range: '$900-1800/week',
    experience_level: 'All Levels',
    thumbnailUrl: '/images/massage.jpg',
    contactName: 'David Thompson',
    contactEmail: 'david@tranquilitywellness.com',
    contactPhone: '(312) 555-3690'
  },
  
  // Makeup Artist Template
  {
    id: 'makeup-1',
    title: 'Makeup Artist',
    industry: 'makeup',
    description: 'Seeking a talented Makeup Artist for our beauty studio. You will provide makeup services for special events, photoshoots, and regular clients. Experience with various skin tones and makeup styles required.',
    vietnamese_description: 'Đang tìm kiếm một Chuyên gia Trang điểm tài năng cho studio làm đẹp của chúng tôi. Bạn sẽ cung cấp dịch vụ trang điểm cho các sự kiện đặc biệt, chụp ảnh và khách hàng thường xuyên. Yêu cầu có kinh nghiệm với nhiều tông da và phong cách trang điểm khác nhau.',
    location: 'Los Angeles, CA',
    salonName: 'Glam Studio LA',
    jobType: 'part-time',
    compensation_type: 'commission',
    compensation_details: '50% commission',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: ['Bridal', 'Editorial', 'Special Events', 'Airbrush'],
    requirements: ['Portfolio required', '2+ years experience'],
    salary_range: 'Varies based on bookings',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/makeup.jpg',
    contactName: 'Jessica Martinez',
    contactEmail: 'jessica@glamstudiola.com',
    contactPhone: '(323) 555-7890'
  },
  
  // Tattoo Artist Template
  {
    id: 'tattoo-1',
    title: 'Tattoo Artist',
    industry: 'tattoo',
    description: 'Professional tattoo studio seeking an experienced Tattoo Artist to join our team. You should have a strong portfolio showing your versatility and technical skills. Booth rental available with flexible terms.',
    vietnamese_description: 'Studio xăm chuyên nghiệp đang tìm kiếm một Nghệ sĩ Xăm có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Bạn nên có một hồ sơ mạnh mẽ thể hiện sự đa năng và kỹ năng kỹ thuật của mình. Có cho thuê booth với điều khoản linh hoạt.',
    location: 'Miami, FL',
    salonName: 'Ink Masters Studio',
    jobType: 'contract',
    compensation_type: 'commission',
    compensation_details: '50% commission or booth rental',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: true,
    specialties: ['Traditional', 'Realism', 'Japanese', 'Black and Gray'],
    requirements: ['Portfolio required', '3+ years experience', 'Health certification'],
    salary_range: 'Depends on clientele',
    experience_level: 'Experienced',
    thumbnailUrl: '/images/tattoo.jpg',
    contactName: 'Alex Rivera',
    contactEmail: 'alex@inkmasters.com',
    contactPhone: '(305) 555-9876'
  }
];

// Helper function to map template to form values
export const mapTemplateToFormValues = (template: JobTemplate): Partial<JobFormValues> => {
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
    requirements: template.requirements,
    specialties: template.specialties,
    salary_range: template.salary_range,
    experience_level: template.experience_level,
    contactName: template.contactName,
    contactEmail: template.contactEmail,
    contactPhone: template.contactPhone,
    industry: template.industry
  };
};

// Get all templates
export const getAllTemplates = (): JobTemplate[] => jobTemplates;

// Get templates by industry category
export const getTemplatesByIndustry = (industry: string): JobTemplate[] => {
  return jobTemplates.filter(template => template.industry === industry);
};

// Get a specific template by id
export const getTemplateById = (id: string): JobTemplate | undefined => {
  return jobTemplates.find(template => template.id === id);
};
