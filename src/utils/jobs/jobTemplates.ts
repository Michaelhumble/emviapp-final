
import { JobFormValues, IndustryType } from '@/components/posting/job/jobFormSchema';

export type JobTemplateType = IndustryType;

interface JobTemplate extends JobFormValues {
  templateType: JobTemplateType;
}

// Get job template based on industry type
export const getJobTemplate = (industry: JobTemplateType): JobTemplate => {
  switch (industry) {
    case 'nails':
      return nailsTechnicianTemplate;
    case 'hair':
      return hairStylistTemplate;
    case 'lashes':
      return lashTechTemplate;
    case 'massage':
      return massageTherapistTemplate;
    case 'tattoo':
      return tattooArtistTemplate;
    case 'brows':
      return browArtistTemplate;
    case 'skincare':
      return estheticianTemplate;
    case 'barber':
      return barberTemplate;
    case 'makeup':
      return makeupArtistTemplate;
    default:
      return customTemplate;
  }
};

// Base template for custom jobs
const customTemplate: JobTemplate = {
  templateType: 'custom',
  salonName: '',
  title: '',
  description: '',
  vietnameseDescription: '',
  location: '',
  jobType: 'full-time',
  specialties: [],
  requirements: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'hourly',
  compensation_details: '',
  weekly_pay: '',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '',
  experience_level: ''
};

// Nail technician template
const nailsTechnicianTemplate: JobTemplate = {
  templateType: 'nails',
  salonName: '',
  title: 'Experienced Nail Technician',
  description: 'We are seeking talented and dedicated nail technicians to join our luxury salon. The ideal candidate has exceptional skills in manicures, pedicures, and nail enhancements, with a keen eye for detail and commitment to customer satisfaction.',
  vietnameseDescription: 'Chúng tôi đang tìm kiếm những kỹ thuật viên làm móng tài năng và tận tâm để tham gia vào tiệm salon sang trọng của chúng tôi. Ứng viên lý tưởng có kỹ năng xuất sắc trong dịch vụ làm móng tay, móng chân và đắp móng, có con mắt tinh tế cho từng chi tiết và cam kết với sự hài lòng của khách hàng.',
  location: '',
  jobType: 'full-time',
  specialties: ['Acrylic', 'Gel polish', 'Dipping powder', 'Nail art', 'Pedicure'],
  requirements: ['Valid nail technician license', 'Minimum 1 year experience', 'Excellent customer service skills', 'Ability to work weekends'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'commission',
  compensation_details: '55% - 65% commission based on experience',
  weekly_pay: '$800 - $1,500 per week',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$40,000 - $70,000 annually depending on clientele',
  experience_level: 'experienced'
};

// Hair stylist template
const hairStylistTemplate: JobTemplate = {
  templateType: 'hair',
  salonName: '',
  title: 'Professional Hair Stylist',
  description: 'Join our team of creative hair professionals in a busy, upscale salon. We're looking for passionate stylists with technical excellence in cutting, coloring, and styling who can provide exceptional service to our discerning clientele.',
  vietnameseDescription: 'Tham gia đội ngũ các chuyên gia tóc sáng tạo của chúng tôi trong một salon sang trọng và nhộn nhịp. Chúng tôi đang tìm kiếm những nhà tạo mẫu tóc đam mê với sự xuất sắc về kỹ thuật cắt, nhuộm và tạo kiểu, những người có thể cung cấp dịch vụ đặc biệt cho khách hàng khó tính của chúng tôi.',
  location: '',
  jobType: 'full-time',
  specialties: ['Haircuts', 'Color techniques', 'Balayage', 'Extensions', 'Bridal styling'],
  requirements: ['Cosmetology license', '2+ years salon experience', 'Portfolio of work', 'Strong communication skills', 'Retail sales ability'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'booth-rental',
  compensation_details: '$150-$250 per week booth rental',
  weekly_pay: '$1,000 - $2,000+ potential earnings',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$45,000 - $80,000+ depending on clientele',
  experience_level: 'mid-level'
};

// Lash technician template
const lashTechTemplate: JobTemplate = {
  templateType: 'lashes',
  salonName: '',
  title: 'Certified Lash Technician',
  description: 'We are expanding our beauty team and looking for skilled lash artists. If you are passionate about creating stunning lash looks, have an eye for detail, and enjoy providing a luxury experience for clients, we want to meet you!',
  vietnameseDescription: 'Chúng tôi đang mở rộng đội ngũ làm đẹp và tìm kiếm những nghệ nhân mi tài năng. Nếu bạn đam mê tạo ra những kiểu mi tuyệt đẹp, có con mắt tinh tế cho từng chi tiết và thích cung cấp trải nghiệm sang trọng cho khách hàng, chúng tôi muốn gặp bạn!',
  location: '',
  jobType: 'full-time',
  specialties: ['Classic lashes', 'Volume lashes', 'Hybrid sets', 'Lash lifts', 'Lash removal'],
  requirements: ['Lash certification', '1+ year professional experience', 'Attention to detail', 'Clean and organized work habits'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'commission',
  compensation_details: '50% - 60% commission depending on experience and clientele',
  weekly_pay: '$700 - $1,400 per week',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$35,000 - $65,000 annually based on bookings',
  experience_level: 'experienced'
};

// Massage therapist template
const massageTherapistTemplate: JobTemplate = {
  templateType: 'massage',
  salonName: '',
  title: 'Licensed Massage Therapist',
  description: 'Our wellness center is seeking licensed massage therapists to provide therapeutic treatments to our clients. The ideal candidate will have expertise in various massage modalities and a genuine passion for helping clients achieve wellness through touch therapy.',
  vietnameseDescription: 'Trung tâm wellness của chúng tôi đang tìm kiếm các nhà trị liệu massage có giấy phép để cung cấp các liệu pháp trị liệu cho khách hàng của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn về các phương pháp massage khác nhau và niềm đam mê chân thành giúp khách hàng đạt được sức khỏe tốt thông qua liệu pháp chạm.',
  location: '',
  jobType: 'part-time',
  specialties: ['Swedish', 'Deep tissue', 'Sports massage', 'Hot stone', 'Prenatal'],
  requirements: ['Massage therapy license', 'Liability insurance', 'Minimum 500 hours of training', 'Knowledge of anatomy', 'Professional demeanor'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'per-service',
  compensation_details: '$30 - $45 per service hour plus tips',
  weekly_pay: '$600 - $1,200 depending on schedule',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$30,000 - $60,000 annually based on hours',
  experience_level: 'mid-level'
};

// Tattoo artist template
const tattooArtistTemplate: JobTemplate = {
  templateType: 'tattoo',
  salonName: '',
  title: 'Professional Tattoo Artist',
  description: 'Our established studio is looking for a talented tattoo artist to join our creative team. We value artistic integrity, technical skill, and professional attitude. Bring your unique style and build your clientele with the support of our well-known studio.',
  vietnameseDescription: 'Studio thành danh của chúng tôi đang tìm kiếm một nghệ sĩ xăm tài năng để tham gia vào đội ngũ sáng tạo của chúng tôi. Chúng tôi trân trọng tính chính trực nghệ thuật, kỹ năng kỹ thuật và thái độ chuyên nghiệp. Mang phong cách độc đáo của bạn và xây dựng khách hàng của bạn với sự hỗ trợ của studio nổi tiếng của chúng tôi.',
  location: '',
  jobType: 'full-time',
  specialties: ['Traditional', 'Japanese', 'Realism', 'Black & grey', 'Color work'],
  requirements: ['Strong portfolio', '3+ years professional experience', 'Bloodborne pathogen certification', 'Creative design abilities', 'Client consultation skills'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'booth-rental',
  compensation_details: 'Weekly booth rental or 70/30 commission split',
  weekly_pay: 'Variable based on appointments and rates',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$40,000 - $100,000+ based on clientele and reputation',
  experience_level: 'senior'
};

// Eyebrow artist template
const browArtistTemplate: JobTemplate = {
  templateType: 'brows',
  salonName: '',
  title: 'Eyebrow Specialist/Microblading Artist',
  description: 'Our beauty studio specializes in premium brow services and we're seeking a talented eyebrow artist. The ideal candidate has expertise in microblading, threading, tinting, lamination, and creating the perfect brow shape for each client's face.',
  vietnameseDescription: 'Studio làm đẹp của chúng tôi chuyên về các dịch vụ lông mày cao cấp và chúng tôi đang tìm kiếm một nghệ sĩ lông mày tài năng. Ứng viên lý tưởng có chuyên môn về phun xăm, nhổ chỉ, nhuộm, uốn lông mày và tạo hình dáng lông mày hoàn hảo cho khuôn mặt của từng khách hàng.',
  location: '',
  jobType: 'full-time',
  specialties: ['Microblading', 'Threading', 'Brow tinting', 'Brow lamination', 'Henna brows'],
  requirements: ['Microblading certification', 'Esthetics license', '1+ year experience', 'Attention to symmetry and detail', 'Before/after portfolio'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'commission',
  compensation_details: '45% - 55% commission on services',
  weekly_pay: '$800 - $1,500 depending on bookings',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$40,000 - $70,000 annually with potential for growth',
  experience_level: 'experienced'
};

// Esthetician template
const estheticianTemplate: JobTemplate = {
  templateType: 'skincare',
  salonName: '',
  title: 'Licensed Esthetician/Skincare Specialist',
  description: 'We are looking for a professional esthetician to join our spa team. The ideal candidate will provide exceptional skincare services including facials, chemical peels, and skin assessments while recommending appropriate products and treatment plans.',
  vietnameseDescription: 'Chúng tôi đang tìm kiếm một chuyên viên thẩm mỹ chuyên nghiệp để tham gia vào đội ngũ spa của chúng tôi. Ứng viên lý tưởng sẽ cung cấp các dịch vụ chăm sóc da ngoại hạng bao gồm điều trị da mặt, lột da hóa học và đánh giá da đồng thời giới thiệu các sản phẩm và kế hoạch điều trị phù hợp.',
  location: '',
  jobType: 'full-time',
  specialties: ['Facials', 'Chemical peels', 'Microdermabrasion', 'Extractions', 'LED therapy'],
  requirements: ['Esthetician license', 'Product knowledge', 'Excellent sanitation practices', 'Ability to perform skin analysis', 'Retail sales experience'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'hourly',
  compensation_details: '$18 - $25 per hour plus commission on retail',
  weekly_pay: '$700 - $1,200 including tips',
  has_housing: false,
  has_wax_room: true,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$35,000 - $60,000 annually depending on clientele',
  experience_level: 'mid-level'
};

// Barber template
const barberTemplate: JobTemplate = {
  templateType: 'barber',
  salonName: '',
  title: 'Professional Barber',
  description: 'Our modern barbershop is seeking skilled barbers who excel in precision cutting, fades, beard grooming, and hot towel shaves. We offer a contemporary atmosphere with a traditional barbershop experience where you can showcase your talents.',
  vietnameseDescription: 'Tiệm cắt tóc hiện đại của chúng tôi đang tìm kiếm những thợ cắt tóc nam có kỹ năng xuất sắc trong cắt tóc chính xác, cắt kiểu fade, tỉa râu và cạo râu bằng khăn nóng. Chúng tôi cung cấp một không gian hiện đại với trải nghiệm tiệm cắt tóc nam truyền thống nơi bạn có thể thể hiện tài năng của mình.',
  location: '',
  jobType: 'full-time',
  specialties: ['Fades', 'Razor work', 'Beard trimming', 'Hot towel shaves', 'Hair design'],
  requirements: ['Barber license', 'Minimum 2 years experience', 'Knowledge of current trends', 'Customer service skills', 'Reliable and punctual'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'booth-rental',
  compensation_details: '$200 weekly chair rental',
  weekly_pay: '$1,000 - $1,800 after booth rent',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '$50,000 - $85,000 annually depending on clientele',
  experience_level: 'experienced'
};

// Makeup artist template
const makeupArtistTemplate: JobTemplate = {
  templateType: 'makeup',
  salonName: '',
  title: 'Professional Makeup Artist',
  description: 'We are seeking a creative makeup artist to join our beauty team. The ideal candidate will excel in various makeup techniques for all occasions, with particular expertise in bridal, special event, and editorial looks that enhance each client's unique features.',
  vietnameseDescription: 'Chúng tôi đang tìm kiếm một chuyên viên trang điểm sáng tạo để tham gia vào đội ngũ làm đẹp của chúng tôi. Ứng viên lý tưởng sẽ xuất sắc trong các kỹ thuật trang điểm cho mọi dịp, đặc biệt chuyên về trang điểm cô dâu, sự kiện đặc biệt và phong cách biên tập tôn lên những nét đẹp độc đáo của từng khách hàng.',
  location: '',
  jobType: 'part-time',
  specialties: ['Bridal makeup', 'Special event', 'Airbrush application', 'Natural looks', 'Dramatic/evening makeup'],
  requirements: ['Professional makeup training', 'Well-maintained kit with quality products', 'Portfolio demonstrating range', 'Excellent color theory knowledge', 'Social media presence'],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  compensation_type: 'per-service',
  compensation_details: '$65 - $150 per application depending on type',
  weekly_pay: 'Variable based on bookings',
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: 'Variable based on bookings and availability',
  experience_level: 'mid-level'
};

export {
  customTemplate,
  nailsTechnicianTemplate,
  hairStylistTemplate,
  lashTechTemplate,
  massageTherapistTemplate,
  tattooArtistTemplate,
  browArtistTemplate,
  estheticianTemplate,
  barberTemplate,
  makeupArtistTemplate
};
