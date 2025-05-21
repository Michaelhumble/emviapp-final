import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { beautySpecialties, commonRequirements } from '@/data/specialties';

// Define JobTemplateType for better type safety
export type JobTemplateType = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 
  'spa' | 'receptionist' | 'manager' | 'massage' | 'tattoo' | 'makeup' | 'booth' | 
  'beauty' | 'custom';

// Helper function to get a job template based on type
export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  // Map template type to template creation function
  const templates: Record<JobTemplateType, () => JobFormValues> = {
    nails: getNailTechTemplate,
    hair: getHairStylistTemplate,
    lashes: getLashTechTemplate,
    barber: getBarberTemplate,
    skincare: getEstheticianTemplate,
    spa: getSpaTemplate,
    receptionist: getReceptionistTemplate,
    manager: getManagerTemplate,
    massage: getMassageTherapistTemplate,
    tattoo: getTattooArtistTemplate,
    makeup: getMakeupArtistTemplate,
    booth: getBoothRentalTemplate,
    beauty: getBeautyTemplate,
    custom: getCustomTemplate
  };

  return templates[templateType]();
};

// Nail Technician Template
const getNailTechTemplate = (): JobFormValues => {
  return {
    title: 'Nail Technician',
    jobType: 'Full-time',
    location: '',
    description: 'Experienced nail technician needed for busy salon. Skills in manicures, pedicures, gel, acrylic, and nail art required.',
    vietnameseDescription: 'Cần thợ nail có kinh nghiệm cho tiệm đông khách. Yêu cầu biết làm bột, gel, móng tay, móng chân và vẽ móng.',
    compensation_type: 'commission',
    compensation_details: 'Competitive pay with potential for $800-1200/week depending on skills and clientele.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: beautySpecialties.nails,
    templateType: 'nails'
  };
};

// Hair Stylist Template
const getHairStylistTemplate = (): JobFormValues => {
  return {
    title: 'Hair Stylist',
    jobType: 'Full-time',
    location: '',
    description: 'Experienced hair stylist needed for upscale salon. Expertise in cutting, coloring, and styling required.',
    vietnameseDescription: 'Cần thợ tóc có kinh nghiệm cho salon cao cấp. Yêu cầu thành thạo cắt, nhuộm, và tạo kiểu tóc.',
    compensation_type: 'commission',
    compensation_details: 'Competitive commission-based pay with product bonuses and tips.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: beautySpecialties.hair,
    templateType: 'hair'
  };
};

// Lash Technician Template
const getLashTechTemplate = (): JobFormValues => {
  return {
    title: 'Lash Technician',
    jobType: 'Full-time',
    location: '',
    description: 'Skilled lash artist needed for growing beauty studio. Experience with classic and volume lashes required.',
    vietnameseDescription: 'Cần thợ mi có kỹ năng cho studio làm đẹp đang phát triển. Yêu cầu có kinh nghiệm với mi classic và volume.',
    compensation_type: 'commission',
    compensation_details: 'Commission-based pay with guaranteed hourly minimum.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: beautySpecialties.lashes,
    templateType: 'lashes'
  };
};

// Barber Template
const getBarberTemplate = (): JobFormValues => {
  return {
    title: 'Barber',
    jobType: 'Full-time',
    location: '',
    description: 'Experienced barber needed for modern barbershop. Skills in men\'s haircuts, fades, beard grooming, and straight razor shaves required.',
    vietnameseDescription: 'Cần thợ cắt tóc nam có kinh nghiệm cho tiệm hiện đại. Yêu cầu có kỹ năng cắt tóc nam, fade, cạo râu, và cắt tỉa râu.',
    compensation_type: 'commission',
    compensation_details: 'Competitive commission structure with booth rental option for experienced barbers.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: beautySpecialties.barber,
    templateType: 'barber'
  };
};

// Esthetician Template
const getEstheticianTemplate = (): JobFormValues => {
  return {
    title: 'Esthetician',
    jobType: 'Full-time',
    location: '',
    description: 'Licensed esthetician needed for luxury spa. Experience with facials, chemical peels, waxing, and skin treatments required.',
    vietnameseDescription: 'Cần chuyên viên thẩm mỹ có bằng cho spa cao cấp. Yêu cầu có kinh nghiệm với các dịch vụ chăm sóc da mặt, peel hóa học, wax, và điều trị da.',
    compensation_type: 'commission',
    compensation_details: 'Commission-based pay plus retail commission and tips.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: beautySpecialties.skincare,
    templateType: 'skincare'
  };
};

// Spa Technician Template
const getSpaTemplate = (): JobFormValues => {
  return {
    title: 'Spa Technician',
    jobType: 'Full-time',
    location: '',
    description: 'Spa technician needed for wellness center. Experience with body treatments, scrubs, wraps, and relaxation techniques required.',
    vietnameseDescription: 'Cần kỹ thuật viên spa cho trung tâm thư giãn. Yêu cầu có kinh nghiệm với các liệu pháp cơ thể, tẩy da chết, ủ người, và kỹ thuật thư giãn.',
    compensation_type: 'hourly',
    compensation_details: 'Hourly rate plus gratuities and benefits for full-time employees.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: [],
    templateType: 'spa'
  };
};

// Salon Receptionist Template
const getReceptionistTemplate = (): JobFormValues => {
  return {
    title: 'Salon Receptionist',
    jobType: 'Full-time',
    location: '',
    description: 'Professional salon receptionist needed. Duties include scheduling appointments, greeting clients, answering phones, and managing retail sales.',
    vietnameseDescription: 'Cần lễ tân cho salon chuyên nghiệp. Nhiệm vụ bao gồm lịch hẹn, chào đón khách hàng, trả lời điện thoại, và quản lý bán lẻ sản phẩm.',
    compensation_type: 'hourly',
    compensation_details: 'Competitive hourly rate plus retail commission.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['Customer service experience', 'Computer skills', 'Organized', 'Professional appearance', 'Bilingual preferred'],
    specialties: [],
    templateType: 'receptionist'
  };
};

// Salon Manager Template
const getManagerTemplate = (): JobFormValues => {
  return {
    title: 'Salon Manager',
    jobType: 'Full-time',
    location: '',
    description: 'Experienced salon manager needed to oversee daily operations, staff management, inventory control, and customer service.',
    vietnameseDescription: 'Cần quản lý salon có kinh nghiệm để giám sát hoạt động hàng ngày, quản lý nhân viên, kiểm soát hàng tồn kho, và dịch vụ khách hàng.',
    compensation_type: 'salary',
    compensation_details: 'Competitive salary plus performance bonuses and benefits.',
    has_housing: false,
    weekly_pay: false,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['3+ years salon management experience', 'Leadership skills', 'Inventory management', 'Scheduling experience', 'Staff training abilities'],
    specialties: [],
    templateType: 'manager'
  };
};

// Massage Therapist Template
const getMassageTherapistTemplate = (): JobFormValues => {
  return {
    title: 'Massage Therapist',
    jobType: 'Full-time',
    location: '',
    description: 'Licensed massage therapist needed for busy spa. Experience in various massage techniques including deep tissue, Swedish, and hot stone required.',
    vietnameseDescription: 'Cần chuyên viên massage có giấy phép cho spa đông khách. Yêu cầu có kinh nghiệm với các kỹ thuật massage bao gồm deep tissue, Swedish và đá nóng.',
    compensation_type: 'commission',
    compensation_details: 'Commission structure with guaranteed hourly minimum plus tips.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['Licensed massage therapist', 'Experience with multiple modalities', 'Professional demeanor', 'Comfortable with full-time schedule'],
    specialties: beautySpecialties.massage,
    templateType: 'massage'
  };
};

// Tattoo Artist Template
const getTattooArtistTemplate = (): JobFormValues => {
  return {
    title: 'Tattoo Artist',
    jobType: 'Full-time',
    location: '',
    description: 'Talented tattoo artist needed for established studio. Strong portfolio and experience in various styles required.',
    vietnameseDescription: 'Cần nghệ sĩ xăm có năng khiếu cho studio đã thành lập. Yêu cầu có portfolio mạnh và kinh nghiệm với nhiều phong cách xăm.',
    compensation_type: 'commission',
    compensation_details: 'Competitive commission structure based on experience and clientele.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['2+ years professional experience', 'Strong portfolio', 'Clean work environment practices', 'Customer service skills'],
    specialties: beautySpecialties.tattoo,
    templateType: 'tattoo'
  };
};

// Makeup Artist Template
const getMakeupArtistTemplate = (): JobFormValues => {
  return {
    title: 'Makeup Artist',
    jobType: 'Full-time',
    location: '',
    description: 'Creative makeup artist needed for salon. Experience in bridal, special event, and editorial makeup required.',
    vietnameseDescription: 'Cần nghệ sĩ trang điểm sáng tạo cho salon. Yêu cầu có kinh nghiệm trang điểm cô dâu, sự kiện đặc biệt, và trang điểm theo chủ đề.',
    compensation_type: 'commission',
    compensation_details: 'Commission-based pay with retail product bonuses.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['Portfolio showing range of styles', 'Knowledge of products', 'Available for weekend events', 'Customer-focused'],
    specialties: beautySpecialties.makeup,
    templateType: 'makeup'
  };
};

// Booth Rental Template
const getBoothRentalTemplate = (): JobFormValues => {
  return {
    title: 'Booth Rental Available',
    jobType: 'Independent Contractor',
    location: '',
    description: 'Booth rental available in established salon. Great location with high foot traffic and existing clientele.',
    vietnameseDescription: 'Có chỗ cho thuê trong salon đã thành lập. Vị trí thuận lợi với lưu lượng khách cao và khách hàng sẵn có.',
    compensation_type: 'other',
    compensation_details: 'Weekly booth rental - bring your own supplies and set your own hours.',
    has_housing: false,
    weekly_pay: false,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: ['Must have existing clientele', 'Valid license required', 'Professional attitude', 'Able to work independently'],
    specialties: [],
    templateType: 'booth'
  };
};

// Other Beauty Professional Template
const getBeautyTemplate = (): JobFormValues => {
  return {
    title: 'Beauty Professional',
    jobType: 'Full-time',
    location: '',
    description: 'Skilled beauty professional needed for full-service salon. Experience in specialty services preferred.',
    vietnameseDescription: 'Cần chuyên viên làm đẹp có kỹ năng cho salon đầy đủ dịch vụ. Ưu tiên người có kinh nghiệm với các dịch vụ chuyên biệt.',
    compensation_type: 'commission',
    compensation_details: 'Competitive commission structure based on skills and experience.',
    has_housing: false,
    weekly_pay: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: commonRequirements,
    specialties: [],
    templateType: 'beauty'
  };
};

// Custom/Other Template
const getCustomTemplate = (): JobFormValues => {
  return {
    title: '',
    jobType: '',
    location: '',
    description: '',
    vietnameseDescription: '',
    compensation_type: '',
    compensation_details: '',
    has_housing: false,
    weekly_pay: false,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    requirements: [],
    specialties: [],
    templateType: 'custom'
  };
};
